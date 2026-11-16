import {
  CreditTransactionType,
  CreditTransactionMetadata
} from '../models/credit-transaction.model';

export * from '../models/credit-transaction.model';

/**
 * Tham số đầu vào nội bộ khi cộng credit vào tài khoản người dùng (dùng cho PURCHASE / ADMIN_ADJUST / INITIAL_GRANT).
 */
export interface CreditAdditionOptions {
  userId: string;
  amount: number;
  type: CreditTransactionType;
  metadata?: CreditTransactionMetadata;
  externalTransactionId?: string;
  // Gắn ID cố định (vd: ctx_purchase_<sessionId>) để đảm bảo quan hệ 1-1 với payment_sessions
  fixedTransactionId?: string;
}

export interface UserCreditProfile {
  credits: number;
  hasNotifiedOutOfCredits: boolean;
}
