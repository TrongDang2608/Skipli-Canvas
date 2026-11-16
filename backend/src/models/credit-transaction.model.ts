export type CreditTransactionType =
  | 'INITIAL_GRANT'
  | 'AI_HOLD'
  | 'AI_SETTLE'
  | 'AI_REFUND'
  | 'PURCHASE'
  | 'ADMIN_ADJUST';

export type CreditTransactionStatus =
  | 'PENDING'
  | 'COMPLETED'
  | 'REFUNDED'
  | 'FAILED';

export interface CreditTransactionMetadata {
  sessionId?: string;
  tokensUsed?: number;
  inputTokens?: number;
  outputTokens?: number;
  s3Key?: string;
  presignedUrl?: string;
  holdId?: string;
  errorReason?: string;
  adminReason?: string;
  paymentGateway?: string;
  externalTransactionId?: string;
  // Liên kết ngược về payment_sessions để truy vết kế toán / đối soát Stripe sau này
  paymentSessionId?: string;
  planId?: string;
  priceCents?: number;
  currency?: 'usd';
  [key: string]: any;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  type: CreditTransactionType;
  amount: number; // Dương (+) khi nạp/hoàn tiền, Âm (-) khi trừ/hold
  balanceBefore: number;
  balanceAfter: number;
  status: CreditTransactionStatus;
  metadata?: CreditTransactionMetadata;
  createdAt: string;
}

