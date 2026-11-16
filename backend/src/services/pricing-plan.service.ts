import { PricingPlan, PricingPlanSeed } from '../models/pricing-plan.model';
import { pricingPlanRepository } from '../repositories/pricing-plan.repository';

export interface SeedPlansResult {
  created: string[];
  skipped: string[];
  updated: string[];
}

export class PricingPlanService {
  private readonly cacheTtlMs = 60_000;
  private cachedActivePlans: PricingPlan[] | null = null;
  private cacheExpiresAt = 0;

  async listActivePlans(bypassCache = false): Promise<PricingPlan[]> {
    if (!bypassCache && this.cachedActivePlans && Date.now() < this.cacheExpiresAt) {
      return [...this.cachedActivePlans];
    }

    const plans = await pricingPlanRepository.findAllActive();
    this.cachedActivePlans = plans;
    this.cacheExpiresAt = Date.now() + this.cacheTtlMs;
    return [...plans];
  }

  /**
   * Always reads directly from Firestore without touching the in-memory cache
   * so top-up / payment validation never uses stale pricing data.
   */
  async getPlanByIdFresh(planId: string): Promise<PricingPlan | null> {
    const normalized = planId.trim().toLowerCase();
    if (!normalized) return null;
    return await pricingPlanRepository.findById(normalized);
  }

  async seedPlans(
    seeds: readonly PricingPlanSeed[],
    options: { force?: boolean } = {}
  ): Promise<SeedPlansResult> {
    const result: SeedPlansResult = {
      created: [],
      skipped: [],
      updated: []
    };

    const force = Boolean(options.force);

    for (const seed of seeds) {
      const normalizedId = seed.id.trim().toLowerCase();
      const now = new Date().toISOString();

      if (force) {
        const existing = await pricingPlanRepository.findById(normalizedId);
        await pricingPlanRepository.upsert({
          ...seed,
          id: normalizedId,
          createdAt: existing?.createdAt || now,
          updatedAt: now
        });
        result.updated.push(normalizedId);
      } else {
        const created = await pricingPlanRepository.createIfMissing({
          ...seed,
          id: normalizedId,
          createdAt: now,
          updatedAt: now
        });
        if (created) {
          result.created.push(normalizedId);
        } else {
          result.skipped.push(normalizedId);
        }
      }
    }

    this.invalidateCache();
    return result;
  }

  invalidateCache(): void {
    this.cachedActivePlans = null;
    this.cacheExpiresAt = 0;
  }
}

export const pricingPlanService = new PricingPlanService();

