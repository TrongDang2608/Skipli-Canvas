import { db, isFirebaseInitialized } from '../config/firebase.config';
import { User } from '../models/user.model';

export class UserRepository {
  private collectionName = 'users';

  private getDb() {
    if (!isFirebaseInitialized || !db) {
      throw new Error('Database is unavailable: Firebase Firestore is not initialized');
    }
    return db;
  }

  getDocRef(id: string) {
    return this.getDb().collection(this.collectionName).doc(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.toLowerCase().trim();
    const snapshot = await this.getDb()
      .collection(this.collectionName)
      .where('email', '==', normalizedEmail)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as User;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.getDb().collection(this.collectionName).doc(id).get();
    if (!doc.exists) return null;
    return doc.data() as User;
  }

  async create(user: User): Promise<User> {
    await this.getDb().collection(this.collectionName).doc(user.id).set(user);
    return user;
  }

  async updateRefreshToken(userId: string, refreshTokenHash: string | null): Promise<void> {
    const now = new Date().toISOString();
    await this.getDb().collection(this.collectionName).doc(userId).update({
      refreshTokenHash,
      updatedAt: now,
    });
  }

  async savePasswordResetToken(
    userId: string,
    tokenHash: string | null,
    expiresAt: string | null
  ): Promise<void> {
    const now = new Date().toISOString();
    await this.getDb().collection(this.collectionName).doc(userId).update({
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpiresAt: expiresAt,
      updatedAt: now,
    });
  }

  async findByResetTokenHash(tokenHash: string): Promise<User | null> {
    const snapshot = await this.getDb()
      .collection(this.collectionName)
      .where('resetPasswordTokenHash', '==', tokenHash)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as User;
  }

  async savePasswordChangeOtp(
    userId: string,
    otpHash: string | null,
    expiresAt: string | null
  ): Promise<void> {
    const now = new Date().toISOString();
    await this.getDb().collection(this.collectionName).doc(userId).update({
      passwordChangeOtpHash: otpHash,
      passwordChangeOtpExpiresAt: expiresAt,
      updatedAt: now,
    });
  }

  async saveLoginOtp(
    userId: string,
    otpHash: string | null,
    expiresAt: string | null
  ): Promise<void> {
    const now = new Date().toISOString();
    await this.getDb().collection(this.collectionName).doc(userId).update({
      loginOtpHash: otpHash,
      loginOtpExpiresAt: expiresAt,
      updatedAt: now,
    });
  }

  async clearLoginOtp(userId: string): Promise<void> {
    const now = new Date().toISOString();
    await this.getDb().collection(this.collectionName).doc(userId).update({
      loginOtpHash: null,
      loginOtpExpiresAt: null,
      updatedAt: now,
    });
  }

  async update(id: string, updates: Partial<User>): Promise<User | null> {
    const now = new Date().toISOString();
    const updateData = { ...updates, updatedAt: now };

    const docRef = this.getDb().collection(this.collectionName).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return null;

    await docRef.update(updateData);
    const updatedDoc = await docRef.get();
    return updatedDoc.data() as User;
  }
}

export const userRepository = new UserRepository();
