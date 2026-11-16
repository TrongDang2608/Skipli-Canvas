export interface PricingPlan {
  id: string;
  name: string;
  credits: number;
  priceUsd: number;
  priceCents: number;
  currency: 'usd';
  description: string;
  badge?: string | null;
  isActive: boolean;
  isPurchasable: boolean;
  sortOrder: number;
  stripePriceId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type PricingPlanSeed = Omit<PricingPlan, 'createdAt' | 'updatedAt'>;

