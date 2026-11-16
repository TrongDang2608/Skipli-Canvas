import { db, isFirebaseInitialized } from '../config/firebase.config';
import { Session, SessionMessage } from '../models/session.model';

export class SessionRepository {
  private sessionsCollection = 'sessions';
  private messagesCollection = 'session_messages';

  private getDb() {
    if (!isFirebaseInitialized || !db) {
      throw new Error('Database is unavailable: Firebase Firestore is not initialized');
    }
    return db;
  }

  async findSessionsByUserId(userId: string): Promise<Session[]> {
    const snapshot = await this.getDb()
      .collection(this.sessionsCollection)
      .where('userId', '==', userId)
      .get();

    const sessions = snapshot.docs.map((doc) => doc.data() as Session);
    return sessions.sort((a, b) => {
      const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });
  }

  async findSessionById(id: string, userId: string): Promise<Session | null> {
    if (!id || typeof id !== 'string' || !id.trim()) {
      return null;
    }

    const cleanId = id.trim();
    const doc = await this.getDb().collection(this.sessionsCollection).doc(cleanId).get();
    if (!doc.exists) return null;

    const data = doc.data() as Session;
    if (data.userId !== userId) return null;
    return data;
  }

  async createSession(session: Session): Promise<Session> {
    const cleanSessionData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(session)) {
      if (value !== undefined) {
        cleanSessionData[key] = value;
      }
    }

    await this.getDb().collection(this.sessionsCollection).doc(session.id).set(cleanSessionData);
    return session;
  }

  async updateSession(id: string, userId: string, updates: Partial<Session>): Promise<Session | null> {
    if (!id || typeof id !== 'string' || !id.trim()) return null;
    const cleanId = id.trim();

    const existing = await this.findSessionById(cleanId, userId);
    if (!existing) return null;

    const now = new Date().toISOString();
    const updatedData = { ...existing, ...updates, updatedAt: now };

    const cleanUpdateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(updatedData)) {
      if (value !== undefined) {
        cleanUpdateData[key] = value;
      }
    }

    await this.getDb().collection(this.sessionsCollection).doc(cleanId).update(cleanUpdateData);
    return updatedData;
  }

  async deleteSession(id: string, userId: string): Promise<boolean> {
    if (!id || typeof id !== 'string' || !id.trim()) return false;
    const cleanId = id.trim();

    const existing = await this.findSessionById(cleanId, userId);
    if (!existing) return false;

    await this.getDb().collection(this.sessionsCollection).doc(cleanId).delete();

    const msgsSnapshot = await this.getDb()
      .collection(this.messagesCollection)
      .where('sessionId', '==', cleanId)
      .get();

    if (!msgsSnapshot.empty) {
      const batch = this.getDb().batch();
      msgsSnapshot.docs.forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }

    return true;
  }

  async findMessagesBySessionId(sessionId: string, userId: string): Promise<SessionMessage[]> {
    if (!sessionId || typeof sessionId !== 'string' || !sessionId.trim()) return [];
    const cleanId = sessionId.trim();

    const snapshot = await this.getDb()
      .collection(this.messagesCollection)
      .where('sessionId', '==', cleanId)
      .get();

    const messages = snapshot.docs
      .map((doc) => doc.data() as SessionMessage)
      .filter((m) => m.userId === userId);

    const senderWeight = (s: string) => (s === 'user' ? 1 : s === 'ai' ? 2 : 3);
    return messages.sort((a, b) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      if (timeA !== timeB) return timeA - timeB;
      return senderWeight(a.sender) - senderWeight(b.sender);
    });
  }

  async createMessage(message: SessionMessage): Promise<SessionMessage> {
    await this.getDb().collection(this.messagesCollection).doc(message.id).set(message);
    return message;
  }

  async deleteMessagesByIds(sessionId: string, userId: string, messageIds: string[]): Promise<number> {
    if (!messageIds || messageIds.length === 0) return 0;
    const idSet = new Set(messageIds);

    const batch = this.getDb().batch();
    for (const id of idSet) {
      const docRef = this.getDb().collection(this.messagesCollection).doc(id);
      batch.delete(docRef);
    }
    await batch.commit();

    return idSet.size;
  }
}

export const sessionRepository = new SessionRepository();
