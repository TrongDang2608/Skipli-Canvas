import * as admin from 'firebase-admin';
import { db, isFirebaseInitialized } from '../config/firebase.config';
import { PaymentSession } from '../models/payment-session.model';

export class PaymentSessionRepository {
  private readonly collectionName = 'payment_sessions';

  getDb(): admin.firestore.Firestore {
    if (!isFirebaseInitialized || !db) {
      throw new Error('Database is unavailable: Firebase Firestore is not initialized');
    }
    return db;
  }

  getDocRef(id: string): admin.firestore.DocumentReference {
    return this.getDb().collection(this.collectionName).doc(id);
  }

  async create(
    session: PaymentSession,
    t?: admin.firestore.Transaction
  ): Promise<PaymentSession> {
    const docRef = this.getDocRef(session.id);
    if (t) {
      t.set(docRef, session);
    } else {
      await docRef.set(session);
    }
    return session;
  }

  async findById(
    id: string,
    t?: admin.firestore.Transaction
  ): Promise<PaymentSession | null> {
    const normalizedId = id.trim();
    if (!normalizedId) return null;

    const docRef = this.getDocRef(normalizedId);
    const doc = t ? await t.get(docRef) : await docRef.get();
    if (!doc.exists) return null;
    return doc.data() as PaymentSession;
  }

  async update(
    id: string,
    updates: Partial<PaymentSession>,
    t?: admin.firestore.Transaction
  ): Promise<void> {
    const docRef = this.getDocRef(id);
    if (t) {
      t.update(docRef, updates as any);
    } else {
      await docRef.update(updates as any);
    }
  }

  /**
   * Dọn sạch toàn bộ payment_sessions của 1 user (phục vụ cleanup sau test audit).
   */
  async deleteByUserId(userId: string): Promise<number> {
    const firestore = this.getDb();
    const snapshot = await firestore
      .collection(this.collectionName)
      .where('userId', '==', userId)
      .get();

    if (snapshot.empty) return 0;

    const batch = firestore.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    return snapshot.size;
  }
}

export const paymentSessionRepository = new PaymentSessionRepository();

