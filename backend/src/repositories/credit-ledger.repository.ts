import * as admin from 'firebase-admin';
import { db, isFirebaseInitialized } from '../config/firebase.config';
import {
  CreditTransaction,
  CreditTransactionStatus,
  CreditTransactionMetadata
} from '../models/credit-transaction.model';

export class CreditLedgerRepository {
  private collectionName = 'credit_transactions';

  private getDb(): admin.firestore.Firestore {
    if (!isFirebaseInitialized || !db) {
      throw new Error('Database is unavailable: Firebase Firestore is not initialized');
    }
    return db;
  }

  getDocRef(id: string): admin.firestore.DocumentReference {
    return this.getDb().collection(this.collectionName).doc(id);
  }

  async create(
    tx: CreditTransaction,
    t?: admin.firestore.Transaction
  ): Promise<CreditTransaction> {
    const docRef = this.getDocRef(tx.id);
    if (t) {
      t.set(docRef, tx);
    } else {
      await docRef.set(tx);
    }
    return tx;
  }

  async findById(
    id: string,
    t?: admin.firestore.Transaction
  ): Promise<CreditTransaction | null> {
    const docRef = this.getDocRef(id);
    const doc = t ? await t.get(docRef) : await docRef.get();
    if (!doc.exists) return null;
    return doc.data() as CreditTransaction;
  }

  async updateStatus(
    id: string,
    status: CreditTransactionStatus,
    metadata?: Partial<CreditTransactionMetadata>,
    t?: admin.firestore.Transaction
  ): Promise<void> {
    const docRef = this.getDocRef(id);
    const updatePayload: Record<string, any> = { status };

    if (metadata) {
      for (const [key, value] of Object.entries(metadata)) {
        updatePayload[`metadata.${key}`] = value;
      }
    }

    if (t) {
      t.update(docRef, updatePayload);
    } else {
      await docRef.update(updatePayload);
    }
  }

  async findByExternalTransactionId(externalTxId: string): Promise<CreditTransaction | null> {
    const snapshot = await this.getDb()
      .collection(this.collectionName)
      .where('metadata.externalTransactionId', '==', externalTxId)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as CreditTransaction;
  }

  async getHistoryByUserId(
    userId: string,
    limit = 20,
    offset = 0
  ): Promise<{ transactions: CreditTransaction[]; total: number }> {
    const snapshot = await this.getDb()
      .collection(this.collectionName)
      .where('userId', '==', userId)
      .get();

    if (snapshot.empty) {
      return { transactions: [], total: 0 };
    }

    const all = snapshot.docs.map((doc) => doc.data() as CreditTransaction);
    // Sắp xếp giảm dần theo thời gian tạo createdAt
    all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const paginated = all.slice(offset, offset + limit);
    return {
      transactions: paginated,
      total: all.length
    };
  }
}

export const creditLedgerRepository = new CreditLedgerRepository();

