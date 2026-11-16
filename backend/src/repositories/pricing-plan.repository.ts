import { db, isFirebaseInitialized } from '../config/firebase.config';
import { PricingPlan } from '../models/pricing-plan.model';

export class PricingPlanRepository {
  private readonly collectionName = 'pricing_plans';

  private getDb() {
    if (!isFirebaseInitialized || !db) {
      throw new Error('Database is unavailable: Firebase Firestore is not initialized');
    }
    return db;
  }

  private normalizePlanId(planId: string): string {
    return planId.trim().toLowerCase();
  }

  private sortByOrder(plans: PricingPlan[]): PricingPlan[] {
    return [...plans].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }

  getDocRef(planId: string) {
    return this.getDb().collection(this.collectionName).doc(this.normalizePlanId(planId));
  }

  async findAll(): Promise<PricingPlan[]> {
    const snapshot = await this.getDb().collection(this.collectionName).get();
    if (snapshot.empty) return [];
    const plans = snapshot.docs.map((doc) => doc.data() as PricingPlan);
    return this.sortByOrder(plans);
  }

  async findAllActive(): Promise<PricingPlan[]> {
    const snapshot = await this.getDb()
      .collection(this.collectionName)
      .where('isActive', '==', true)
      .get();

    if (snapshot.empty) return [];
    const plans = snapshot.docs.map((doc) => doc.data() as PricingPlan);
    return this.sortByOrder(plans);
  }

  async findById(planId: string): Promise<PricingPlan | null> {
    const normalizedId = this.normalizePlanId(planId);
    if (!normalizedId) return null;

    const doc = await this.getDocRef(normalizedId).get();
    if (!doc.exists) return null;
    return doc.data() as PricingPlan;
  }

  /**
   * Atomically creates the pricing plan document only if it does not already exist.
   * Prevents accidental overwrites of manual price/description edits in Production.
   */
  async createIfMissing(plan: PricingPlan): Promise<boolean> {
    const firestore = this.getDb();
    const docRef = this.getDocRef(plan.id);

    return await firestore.runTransaction(async (t) => {
      const doc = await t.get(docRef);
      if (doc.exists) {
        return false;
      }
      t.set(docRef, { ...plan, id: this.normalizePlanId(plan.id) });
      return true;
    });
  }

  async upsert(plan: PricingPlan): Promise<PricingPlan> {
    const normalizedPlan: PricingPlan = {
      ...plan,
      id: this.normalizePlanId(plan.id)
    };
    await this.getDocRef(normalizedPlan.id).set(normalizedPlan, { merge: false });
    return normalizedPlan;
  }

  async deleteById(planId: string): Promise<void> {
    const normalizedId = this.normalizePlanId(planId);
    if (!normalizedId) return;
    await this.getDocRef(normalizedId).delete();
  }
}

export const pricingPlanRepository = new PricingPlanRepository();

