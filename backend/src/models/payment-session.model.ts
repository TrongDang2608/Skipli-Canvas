export type PaymentSessionStatus = 'PENDING' | 'COMPLETED' | 'EXPIRED' | 'FAILED';

// 'manual' dùng khi test/chưa nối Stripe; sau này gắn Stripe chỉ cần đổi thành 'stripe'
export type PaymentProvider = 'manual' | 'stripe';

export interface PaymentSession {
  id: string; // Mã transactionId do server sinh (ps_...)
  userId: string;
  planId: string;
  // Snapshot tại thời điểm checkout: tránh lệch giá nếu admin sửa DB trong lúc khách đang thanh toán
  planNameSnapshot: string;
  creditsSnapshot: number;
  priceUsdSnapshot: number;
  priceCentsSnapshot: number;
  currency: 'usd';
  status: PaymentSessionStatus;
  provider: PaymentProvider;
  providerSessionId?: string | null; // Slot cho Stripe Checkout Session ID (cs_...)
  providerTransactionId?: string | null; // Slot cho Stripe payment_intent / mã đối tác
  creditTransactionId?: string | null; // Liên kết 1-1 tới doc trong credit_transactions
  paidAmountCents?: number | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  completedAt?: string | null;
}

