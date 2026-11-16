import crypto from 'crypto';
import Stripe from 'stripe';
import { env } from '../config/env.config';
import { DEFAULT_INITIAL_CREDITS } from '../config/pricing.config';
import { PaymentProvider, PaymentSession } from '../models/payment-session.model';
import { paymentSessionRepository } from '../repositories/payment-session.repository';
import { userRepository } from '../repositories/user.repository';
import { HttpError } from '../utils/http-error.util';
import { pricingPlanService } from './pricing-plan.service';
import { quotaService, round4 } from './quota.service';

export const PAYMENT_SESSION_TTL_MS = 35 * 60 * 1000; // Hết hạn sau 35 phút (đảm bảo >= 30m của Stripe)

// Khởi tạo Stripe SDK client bằng Secret Key từ file .env
const stripe = new Stripe(env.stripeSecretKey || '', {
  apiVersion: '2024-12-18.acacia' as any
});

export interface CreateCheckoutInput {
  userId: string;
  planId: string;
}

export interface CreateCheckoutResult {
  transactionId: string;
  planId: string;
  planName: string;
  credits: number;
  priceUsd: number;
  priceCents: number;
  currency: 'usd';
  status: 'PENDING';
  provider: PaymentProvider;
  providerSessionId: string | null;
  checkoutUrl: string | null;
  expiresAt: string;
}

export interface FulfillPaymentInput {
  transactionId: string;
  planId: string;
  paidAmountCents?: number;
  providerTransactionId?: string;
  provider?: PaymentProvider;
}

export interface FulfillPaymentResult {
  transactionId: string;
  userId: string;
  planId: string;
  creditsAdded: number;
  newBalance: number;
  status: 'COMPLETED';
  isDuplicate: boolean;
  creditTransactionId: string | null;
}

type TransactionOutcome =
  | { kind: 'expired' }
  | { kind: 'completed'; result: FulfillPaymentResult };

export class PaymentService {
  /**
   * Bước 1: Tạo payment_session trạng thái PENDING và snapshot giá/credit từ Firestore.
   */
  async createCheckoutSession(input: CreateCheckoutInput): Promise<CreateCheckoutResult> {
    const normalizedPlanId = input.planId.trim().toLowerCase();

    // Bỏ qua cache 60s (getPlanByIdFresh) để luôn lấy giá mới nhất trên DB
    const [user, plan] = await Promise.all([
      userRepository.findById(input.userId),
      pricingPlanService.getPlanByIdFresh(normalizedPlanId)
    ]);

    if (!user) {
      throw new HttpError(404, 'User not found in database');
    }
    if (!plan || !plan.isActive) {
      throw new HttpError(400, 'Invalid or inactive pricing plan');
    }
    // Chặn gói miễn phí (starter có isPurchasable=false, priceCents=0)
    if (!plan.isPurchasable || plan.priceCents <= 0) {
      throw new HttpError(400, 'Selected plan is not available for purchase');
    }

    const nowMs = Date.now();
    const nowIso = new Date(nowMs).toISOString();
    const expiresAt = new Date(nowMs + PAYMENT_SESSION_TTL_MS).toISOString();
    const transactionId = `ps_${nowMs}_${crypto.randomBytes(6).toString('hex')}`;

    // 1. Chuẩn bị session Stripe Checkout nếu có cấu hình STRIPE_SECRET_KEY
    let checkoutUrl: string | null = null;
    let providerSessionId: string | null = null;

    if (env.stripeSecretKey) {
      // Tính thời gian hết hạn theo chuẩn Unix timestamp (giây) cho Stripe
      const expiresAtUnixSeconds = Math.floor((nowMs + PAYMENT_SESSION_TTL_MS) / 1000);

      // Cấu hình line_items: Ưu tiên dùng stripePriceId đã chốt trên Stripe Dashboard, nếu chưa gắn thì fallback sang price_data
      const lineItem = plan.stripePriceId
        ? { price: plan.stripePriceId, quantity: 1 }
        : {
            price_data: {
              currency: 'usd',
              product_data: {
                name: plan.name,
                description: plan.description || undefined
              },
              unit_amount: plan.priceCents
            },
            quantity: 1
          };

      const stripeSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [lineItem],
        client_reference_id: transactionId,
        customer_email: user.email,
        metadata: {
          transactionId,
          planId: plan.id,
          userId: user.id
        },
        expires_at: expiresAtUnixSeconds,
        success_url: `${env.frontendUrl}/workspace?payment=success&session_id={CHECKOUT_SESSION_ID}&plan_id=${plan.id}&plan_name=${encodeURIComponent(plan.name)}&credits=${plan.credits}`,
        cancel_url: `${env.frontendUrl}/workspace?payment=cancelled`
      });

      checkoutUrl = stripeSession.url;
      providerSessionId = stripeSession.id;
    }

    // 2. Lưu phiên vào Firestore với provider='stripe' và providerSessionId
    const session: PaymentSession = {
      id: transactionId,
      userId: input.userId,
      planId: plan.id,
      planNameSnapshot: plan.name,
      creditsSnapshot: plan.credits,
      priceUsdSnapshot: plan.priceUsd,
      priceCentsSnapshot: plan.priceCents,
      currency: 'usd',
      status: 'PENDING',
      provider: env.stripeSecretKey ? 'stripe' : 'manual',
      providerSessionId,
      providerTransactionId: null,
      creditTransactionId: null,
      paidAmountCents: null,
      createdAt: nowIso,
      updatedAt: nowIso,
      expiresAt,
      completedAt: null
    };

    await paymentSessionRepository.create(session);

    return {
      transactionId: session.id,
      planId: session.planId,
      planName: session.planNameSnapshot,
      credits: session.creditsSnapshot,
      priceUsd: session.priceUsdSnapshot,
      priceCents: session.priceCentsSnapshot,
      currency: session.currency,
      status: 'PENDING',
      provider: session.provider,
      providerSessionId,
      checkoutUrl,
      expiresAt: session.expiresAt
    };
  }

  /**
   * Bước 2: Đối soát payment_sessions và cộng credit từ snapshot trong 1 ACID Transaction duy nhất.
   */
  async fulfillPaymentSession(input: FulfillPaymentInput): Promise<FulfillPaymentResult> {
    const normalizedTxId = input.transactionId.trim();
    if (!normalizedTxId) {
      throw new HttpError(400, 'transactionId is required');
    }
    const normalizedPlanId = input.planId.trim().toLowerCase();

    const firestore = paymentSessionRepository.getDb();
    const sessionRef = paymentSessionRepository.getDocRef(normalizedTxId);

    const outcome = await firestore.runTransaction<TransactionOutcome>(async (t) => {
      // --- PHA 1: TOÀN BỘ READ TRƯỚC ---
      const sessionDoc = await t.get(sessionRef);
      if (!sessionDoc.exists) {
        throw new HttpError(404, 'Payment session not found');
      }

      const session = sessionDoc.data() as PaymentSession;

      // Kiểm tra chống đổi gói / sửa giá (chạy trước cả nhánh idempotent để không cho qua payload bị sửa)
      if (session.planId !== normalizedPlanId) {
        throw new HttpError(400, 'Plan ID mismatch with payment session');
      }
      if (
        input.paidAmountCents !== undefined &&
        input.paidAmountCents !== session.priceCentsSnapshot
      ) {
        throw new HttpError(400, 'Paid amount mismatch with payment session');
      }
      if (session.status === 'FAILED' || session.status === 'EXPIRED') {
        throw new HttpError(400, `Payment session is already ${session.status}`);
      }

      const userRef = userRepository.getDocRef(session.userId);
      const userDoc = await t.get(userRef);

      // Nếu đã COMPLETED (webhook trùng hoặc 2 request đua song song): thoát êm, KHÔNG cộng tiền lại
      if (session.status === 'COMPLETED') {
        const currentBalance = round4(
          userDoc.exists ? (userDoc.data()?.credits ?? DEFAULT_INITIAL_CREDITS) : 0
        );
        return {
          kind: 'completed',
          result: {
            transactionId: session.id,
            userId: session.userId,
            planId: session.planId,
            creditsAdded: 0,
            newBalance: currentBalance,
            status: 'COMPLETED',
            isDuplicate: true,
            creditTransactionId: session.creditTransactionId ?? null
          }
        };
      }

      if (!userDoc.exists) {
        throw new HttpError(404, 'User not found in database');
      }

      const nowMs = Date.now();
      const nowIso = new Date(nowMs).toISOString();

      // Quá hạn: lưu status EXPIRED trước rồi return để transaction commit xong mới ném lỗi 400
      if (Date.parse(session.expiresAt) <= nowMs) {
        t.update(sessionRef, { status: 'EXPIRED', updatedAt: nowIso });
        return { kind: 'expired' };
      }

      // --- PHA 2: TOÀN BỘ WRITE SAU (Dùng helper chung từ QuotaService) ---
      const providerUsed: PaymentProvider = input.provider || session.provider;
      const ledgerResult = quotaService.applyCreditAdditionInTransaction(
        t,
        userRef,
        userDoc,
        {
          userId: session.userId,
          amount: session.creditsSnapshot,
          type: 'PURCHASE',
          fixedTransactionId: `ctx_purchase_${session.id}`,
          externalTransactionId: input.providerTransactionId || session.id,
          metadata: {
            paymentGateway: providerUsed,
            paymentSessionId: session.id,
            planId: session.planId,
            priceCents: session.priceCentsSnapshot,
            currency: session.currency
          }
        },
        nowIso
      );

      t.update(sessionRef, {
        status: 'COMPLETED',
        provider: providerUsed,
        providerTransactionId:
          input.providerTransactionId ?? session.providerTransactionId ?? null,
        creditTransactionId: ledgerResult.transactionId,
        paidAmountCents: input.paidAmountCents ?? session.priceCentsSnapshot,
        completedAt: nowIso,
        updatedAt: nowIso
      });

      return {
        kind: 'completed',
        result: {
          transactionId: session.id,
          userId: session.userId,
          planId: session.planId,
          creditsAdded: session.creditsSnapshot,
          newBalance: ledgerResult.newBalance,
          status: 'COMPLETED',
          isDuplicate: false,
          creditTransactionId: ledgerResult.transactionId
        }
      };
    });

    if (outcome.kind === 'expired') {
      throw new HttpError(400, 'Payment session has expired');
    }

    return outcome.result;
  }

  /**
   * Đánh dấu phiên hết hạn khi nhận webhook checkout.session.expired từ Stripe.
   */
  async markSessionExpired(transactionId: string): Promise<void> {
    const session = await paymentSessionRepository.findById(transactionId);
    if (session && session.status === 'PENDING') {
      await paymentSessionRepository.update(transactionId, {
        status: 'EXPIRED',
        updatedAt: new Date().toISOString()
      });
    }
  }
}

export const paymentService = new PaymentService();

