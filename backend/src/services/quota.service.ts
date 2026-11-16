import crypto from 'crypto';
import * as admin from 'firebase-admin';
import { db, isFirebaseInitialized } from '../config/firebase.config';
import { userRepository } from '../repositories/user.repository';
import { creditLedgerRepository } from '../repositories/credit-ledger.repository';
import {
  BASE_HOLD_CREDITS,
  CREDIT_PER_1K_TOKENS,
  DEFAULT_INITIAL_CREDITS
} from '../config/pricing.config';
import {
  CreditTransaction,
  CreditTransactionStatus,
  CreditTransactionType
} from '../models/credit-transaction.model';
import { CreditAdditionOptions, UserCreditProfile } from '../types/credit.types';
import { emailService } from './email.service';

export interface HoldCreditResult {
  holdId: string;
  newBalance: number;
  baseHoldAmount: number;
}

export interface SettleCreditResult {
  holdId: string;
  actualCost: number;
  delta: number;
  newBalance: number;
}

export interface RefundCreditResult {
  holdId: string;
  refundAmount: number;
  newBalance: number;
}

export interface AddCreditsResult {
  success: boolean;
  transactionId: string;
  newBalance: number;
  isDuplicate: boolean;
}

export function round4(num: number): number {
  return Math.round(num * 10000) / 10000;
}

export class QuotaService {
  private getDb(): admin.firestore.Firestore {
    if (!isFirebaseInitialized || !db) {
      throw new Error('Database is unavailable: Firebase Firestore is not initialized');
    }
    return db;
  }

  calculateDynamicCost(tokensUsed: number): number {
    const rawCost = (tokensUsed * CREDIT_PER_1K_TOKENS) / 1000;
    // Tối thiểu 0.1 credit cho mỗi lượt sinh
    return Math.max(0.1, round4(rawCost));
  }

  /**
   * Pha 1: Tạm giữ (Hold) 1.0 credit sàn trước khi gọi AI.
   * Chạy trong Firestore ACID Transaction (OCC) để chống race-condition.
   */
  async holdCredit(
    userId: string,
    sessionId: string,
    baseHoldAmount: number = BASE_HOLD_CREDITS
  ): Promise<HoldCreditResult> {
    const firestore = this.getDb();
    const userRef = userRepository.getDocRef(userId);

    return await firestore.runTransaction(async (t) => {
      // 1. TẤT CẢ READS TRƯỚC
      const userDoc = await t.get(userRef);
      if (!userDoc.exists) {
        throw new Error('USER_NOT_FOUND: User not found in database');
      }

      const userData = userDoc.data();
      const currentCredits = round4(userData?.credits ?? DEFAULT_INITIAL_CREDITS);

      if (currentCredits < baseHoldAmount) {
        throw new Error(`INSUFFICIENT_CREDITS: Balance is insufficient for AI generation (minimum ${baseHoldAmount} credit required)`);
      }

      const newBalance = round4(currentCredits - baseHoldAmount);
      const holdId = `ctx_hold_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
      const holdTxRef = creditLedgerRepository.getDocRef(holdId);

      // 2. TẤT CẢ WRITES SAU
      t.update(userRef, {
        credits: newBalance,
        updatedAt: new Date().toISOString()
      });

      const holdTx: CreditTransaction = {
        id: holdId,
        userId,
        type: 'AI_HOLD',
        amount: -baseHoldAmount,
        balanceBefore: currentCredits,
        balanceAfter: newBalance,
        status: 'PENDING',
        metadata: {
          sessionId,
          holdId,
          baseHoldAmount
        },
        createdAt: new Date().toISOString()
      };

      t.set(holdTxRef, holdTx);

      return {
        holdId,
        newBalance,
        baseHoldAmount
      };
    });
  }

  /**
   * Pha 2: Quyết toán (Settle) theo số token AI thực tế tiêu thụ.
   * Tính toán delta = actualCost - baseHoldAmount. Bù hoặc trừ thêm tương ứng.
   */
  async settleCredit(
    userId: string,
    holdId: string,
    tokensUsed: number
  ): Promise<SettleCreditResult> {
    const actualCost = this.calculateDynamicCost(tokensUsed);
    const firestore = this.getDb();
    const holdTxRef = creditLedgerRepository.getDocRef(holdId);
    const userRef = userRepository.getDocRef(userId);

    let shouldSendOutOfCreditsEmail = false;
    let targetEmail = '';
    let targetDisplayName = '';

    const result = await firestore.runTransaction(async (t) => {
      // 1. TẤT CẢ READS TRƯỚC
      const [holdDoc, userDoc] = await Promise.all([t.get(holdTxRef), t.get(userRef)]);

      if (!holdDoc.exists) {
        throw new Error('HOLD_NOT_FOUND: Hold ticket not found');
      }

      const holdTx = holdDoc.data() as CreditTransaction;
      if (holdTx.status !== 'PENDING') {
        throw new Error('INVALID_HOLD_STATUS: Hold ticket is already settled or refunded');
      }

      if (!userDoc.exists) {
        throw new Error('USER_NOT_FOUND: User not found in database');
      }

      const userData = userDoc.data();
      const currentCredits = round4(userData?.credits ?? 0);
      const baseHold = Math.abs(holdTx.amount);
      const delta = round4(actualCost - baseHold);

      // Chính sách bảo trợ trải nghiệm người dùng:
      // Nếu delta > 0 (cần trừ thêm) nhưng số dư còn lại không đủ (ví dụ user chỉ có 1 credit ban đầu, đã hold 1 credit còn 0),
      // hệ thống chỉ trừ tối đa về đúng 0.0 credit, phần dôi dư hệ thống tự gánh bảo trợ (tuyệt đối không bao giờ để âm điểm).
      const newBalance = Math.max(0, round4(currentCredits - delta));
      const actualDeducted = round4(currentCredits - newBalance);
      const absorbedBySystem = delta > 0 ? round4(delta - actualDeducted) : 0;

      // 2. TẤT CẢ WRITES SAU
      // Đóng trạng thái ticket hold thành COMPLETED
      t.update(holdTxRef, {
        status: 'COMPLETED',
        'metadata.tokensUsed': tokensUsed,
        'metadata.actualCost': actualCost,
        'metadata.absorbedBySystem': absorbedBySystem,
        'metadata.settledAt': new Date().toISOString()
      });

      // Nếu có chênh lệch delta thì ghi thêm dòng Settle vào Sổ cái
      if (delta !== 0) {
        const settleId = `ctx_settle_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
        const settleTxRef = creditLedgerRepository.getDocRef(settleId);

        const settleTx: CreditTransaction = {
          id: settleId,
          userId,
          type: 'AI_SETTLE',
          amount: delta > 0 ? -actualDeducted : -delta,
          balanceBefore: currentCredits,
          balanceAfter: newBalance,
          status: 'COMPLETED',
          metadata: {
            holdId,
            tokensUsed,
            actualCost,
            baseHold,
            delta,
            absorbedBySystem
          },
          createdAt: new Date().toISOString()
        };

        t.set(settleTxRef, settleTx);
      }

      const isFirstTimeOutOfCredits =
        newBalance < BASE_HOLD_CREDITS && !userData?.hasNotifiedOutOfCredits;
      if (isFirstTimeOutOfCredits && userData?.email) {
        shouldSendOutOfCreditsEmail = true;
        targetEmail = userData.email;
        targetDisplayName = userData.displayName || 'Creator';
      }

      // Cập nhật số dư người dùng
      t.update(userRef, {
        credits: newBalance,
        hasNotifiedOutOfCredits: newBalance < BASE_HOLD_CREDITS,
        updatedAt: new Date().toISOString()
      });

      return {
        holdId,
        actualCost,
        delta,
        newBalance
      };
    });

    if (shouldSendOutOfCreditsEmail && targetEmail) {
      setImmediate(() => {
        emailService.sendOutOfCreditsEmail(targetEmail, targetDisplayName).catch((err) => {
          console.error('[QuotaService] Failed to send out-of-credits email:', err);
        });
      });
    }

    return result;
  }

  /**
   * Hoàn tiền (Refund) 100% khi AI gặp lỗi hoặc không lưu được S3.
   * Khôi phục lại đúng số tiền đã hold, chuyển ticket sang REFUNDED.
   */
  async refundCredit(
    userId: string,
    holdId: string,
    errorReason: string
  ): Promise<RefundCreditResult> {
    const firestore = this.getDb();
    const holdTxRef = creditLedgerRepository.getDocRef(holdId);
    const userRef = userRepository.getDocRef(userId);

    return await firestore.runTransaction(async (t) => {
      // 1. TẤT CẢ READS TRƯỚC
      const [holdDoc, userDoc] = await Promise.all([t.get(holdTxRef), t.get(userRef)]);

      if (!holdDoc.exists) {
        throw new Error('HOLD_NOT_FOUND: Hold ticket not found');
      }

      const holdTx = holdDoc.data() as CreditTransaction;
      if (holdTx.status !== 'PENDING') {
        throw new Error('INVALID_HOLD_STATUS: Hold ticket is already settled or refunded');
      }

      if (!userDoc.exists) {
        throw new Error('USER_NOT_FOUND: User not found in database');
      }

      const userData = userDoc.data();
      const currentCredits = round4(userData?.credits ?? 0);
      const refundAmount = Math.abs(holdTx.amount);
      const newBalance = round4(currentCredits + refundAmount);

      // 2. TẤT CẢ WRITES SAU
      t.update(holdTxRef, {
        status: 'REFUNDED',
        'metadata.errorReason': errorReason,
        'metadata.refundedAt': new Date().toISOString()
      });

      const refundId = `ctx_refund_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
      const refundTxRef = creditLedgerRepository.getDocRef(refundId);

      const refundTx: CreditTransaction = {
        id: refundId,
        userId,
        type: 'AI_REFUND',
        amount: refundAmount,
        balanceBefore: currentCredits,
        balanceAfter: newBalance,
        status: 'COMPLETED',
        metadata: {
          holdId,
          errorReason
        },
        createdAt: new Date().toISOString()
      };

      t.set(refundTxRef, refundTx);

      t.update(userRef, {
        credits: newBalance,
        updatedAt: new Date().toISOString()
      });

      return {
        holdId,
        refundAmount,
        newBalance
      };
    });
  }

  /**
   * Tìm và hoàn tiền vé hold PENDING gần nhất của user (nếu có).
   * Dùng làm chốt chặn an toàn khi người dùng bấm nút Stop hoặc tạo project mới.
   */
  async refundLatestPendingHold(
    userId: string,
    reason: string = 'USER_EXPLICIT_STOP'
  ): Promise<RefundCreditResult | null> {
    const firestore = this.getDb();
    const snap = await firestore
      .collection('credit_transactions')
      .where('userId', '==', userId)
      .where('status', '==', 'PENDING')
      .limit(5)
      .get();

    if (snap.empty) {
      return null;
    }

    const holdDoc = snap.docs.find((d) => d.data().type === 'AI_HOLD');
    if (!holdDoc) {
      return null;
    }

    return await this.refundCredit(userId, holdDoc.id, reason);
  }

  /**
   * Helper dùng chung bên trong một Firestore Transaction đã mở sẵn:
   * Cộng credit vào userDoc, reset hasNotifiedOutOfCredits và ghi 1 record vào credit_transactions.
   */
  applyCreditAdditionInTransaction(
    t: admin.firestore.Transaction,
    userRef: admin.firestore.DocumentReference,
    userDoc: admin.firestore.DocumentSnapshot,
    options: CreditAdditionOptions,
    timestampIso: string = new Date().toISOString()
  ): AddCreditsResult {
    if (!Number.isFinite(options.amount) || options.amount <= 0) {
      throw new Error('INVALID_AMOUNT: Credit addition amount must be greater than 0');
    }
    if (!userDoc.exists) {
      throw new Error('USER_NOT_FOUND: User not found in database');
    }

    const userData = userDoc.data();
    const currentCredits = round4(userData?.credits ?? DEFAULT_INITIAL_CREDITS);
    const newBalance = round4(currentCredits + options.amount);
    const txId =
      options.fixedTransactionId ||
      `ctx_add_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const txRef = creditLedgerRepository.getDocRef(txId);

    // 2. TẤT CẢ WRITES SAU
    const newTx: CreditTransaction = {
      id: txId,
      userId: options.userId,
      type: options.type || 'PURCHASE',
      amount: options.amount,
      balanceBefore: currentCredits,
      balanceAfter: newBalance,
      status: 'COMPLETED',
      metadata: {
        ...options.metadata,
        ...(options.externalTransactionId
          ? { externalTransactionId: options.externalTransactionId }
          : {})
      },
      createdAt: timestampIso
    };

    t.set(txRef, newTx);

    t.update(userRef, {
      credits: newBalance,
      hasNotifiedOutOfCredits: false, // Reset cờ cạn điểm khi vừa nạp thêm
      updatedAt: timestampIso
    });

    return {
      success: true,
      transactionId: txId,
      newBalance,
      isDuplicate: false
    };
  }

  /**
   * Nạp/cộng Credit nội bộ (ADMIN_ADJUST, test T1.4.1...) có Idempotent qua externalTransactionId.
   * Các luồng thanh toán HTTP từ người dùng/webhook PHẢI đi qua PaymentService.
   */
  async addCredits(options: CreditAdditionOptions): Promise<AddCreditsResult> {
    // 1. Kiểm tra Idempotency nếu có externalTransactionId (chống nạp đúp)
    if (options.externalTransactionId) {
      const existingTx = await creditLedgerRepository.findByExternalTransactionId(
        options.externalTransactionId
      );
      if (existingTx) {
        return {
          success: true,
          transactionId: existingTx.id,
          newBalance: existingTx.balanceAfter,
          isDuplicate: true
        };
      }
    }

    const firestore = this.getDb();
    const userRef = userRepository.getDocRef(options.userId);

    return await firestore.runTransaction(async (t) => {
      // 1. TẤT CẢ READS TRƯỚC
      const userDoc = await t.get(userRef);
      return this.applyCreditAdditionInTransaction(t, userRef, userDoc, options);
    });
  }

  /**
   * Lấy số dư hiện tại và cờ cảnh báo của người dùng với độ phức tạp O(1).
   */
  async getUserBalance(userId: string): Promise<UserCreditProfile> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('USER_NOT_FOUND: User not found in database');
    }

    return {
      credits: round4(user.credits ?? DEFAULT_INITIAL_CREDITS),
      hasNotifiedOutOfCredits: user.hasNotifiedOutOfCredits ?? false
    };
  }

  /**
   * Lấy lịch sử biến động sổ cái phân trang.
   */
  async getHistory(
    userId: string,
    limit = 20,
    offset = 0
  ): Promise<{ transactions: CreditTransaction[]; total: number }> {
    return await creditLedgerRepository.getHistoryByUserId(userId, limit, offset);
  }
}

export const quotaService = new QuotaService();

