// frontend/src/types/payment.types.ts

export interface PricingPlan {
  id: string;
  name: string;
  credits: number;
  priceUsd: number;
  priceCents: number;
  currency: string;
  description: string | null;
  badge: string | null;
  isActive: boolean;
  isPurchasable: boolean;
  sortOrder: number;
  stripePriceId: string | null;
}

export interface CreditBalance {
  credits: number;
  currency: string;
  hasNotifiedOutOfCredits: boolean;
}

export interface PaymentCheckoutResult {
  transactionId: string;
  planId: string;
  planName: string;
  credits: number;
  priceUsd: number;
  priceCents: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';
  provider: 'stripe' | 'manual';
  providerSessionId: string | null;
  checkoutUrl: string | null;
  expiresAt: string;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  type: 'INITIAL_GRANT' | 'TOPUP' | 'AI_GENERATION' | 'AI_REFUND';
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface CreditHistoryPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CreditHistoryResponse {
  transactions: CreditTransaction[];
  pagination: CreditHistoryPagination;
}

