import { db, isFirebaseInitialized } from '../config/firebase.config';

export interface EmailVerificationRecord {
  email: string;
  otpHash: string;
  expiresAt: string;
  createdAt: string;
}

export class EmailVerificationRepository {
  private collectionName = 'email_verifications';

  private getDb() {
    if (!isFirebaseInitialized || !db) {
      throw new Error('Database is unavailable: Firebase Firestore is not initialized');
    }
    return db;
  }

  async saveOtp(email: string, otpHash: string, expiresAt: string): Promise<void> {
    const normalizedEmail = email.toLowerCase().trim();
    const now = new Date().toISOString();
    const record: EmailVerificationRecord = {
      email: normalizedEmail,
      otpHash,
      expiresAt,
      createdAt: now,
    };

    await this.getDb().collection(this.collectionName).doc(normalizedEmail).set(record);
  }

  async findByEmail(email: string): Promise<EmailVerificationRecord | null> {
    const normalizedEmail = email.toLowerCase().trim();
    const doc = await this.getDb().collection(this.collectionName).doc(normalizedEmail).get();
    if (!doc.exists) return null;
    return doc.data() as EmailVerificationRecord;
  }

  async deleteByEmail(email: string): Promise<void> {
    const normalizedEmail = email.toLowerCase().trim();
    await this.getDb().collection(this.collectionName).doc(normalizedEmail).delete();
  }
}

export const emailVerificationRepository = new EmailVerificationRepository();
