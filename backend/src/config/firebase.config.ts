import * as admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';
import { env } from './env.config';

let db: admin.firestore.Firestore | null = null;
let isFirebaseInitialized = false;

try {
  let serviceAccount: admin.ServiceAccount | null = null;
  let credentialSource = '';

  // 1. Try loading credentials from FIREBASE_SERVICE_ACCOUNT_JSON env var (Heroku / Cloud)
  if (env.firebaseServiceAccountJson) {
    try {
      const raw = env.firebaseServiceAccountJson.trim();
      const jsonStr = raw.startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf-8');
      serviceAccount = JSON.parse(jsonStr);
      credentialSource = 'FIREBASE_SERVICE_ACCOUNT_JSON';
    } catch (parseErr) {
      console.error('[Firebase Error] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', parseErr);
    }
  }

  // 2. Fallback to local file path (Local development)
  if (!serviceAccount && env.firebaseServiceAccountPath) {
    const serviceAccountPath = path.resolve(__dirname, '../../', env.firebaseServiceAccountPath);
    if (fs.existsSync(serviceAccountPath)) {
      serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      credentialSource = `File path (${env.firebaseServiceAccountPath})`;
    } else {
      console.warn(`[Firebase Warning] File not found at ${serviceAccountPath}.`);
    }
  }

  // 3. Initialize Firebase Admin SDK
  if (serviceAccount) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }

    db = admin.firestore();
    db.settings({ ignoreUndefinedProperties: true });
    isFirebaseInitialized = true;
    console.log(`[Firebase] Initialized successfully using ${credentialSource}.`);
  } else {
    console.error('[Firebase Fatal] No valid credentials provided.');
  }
} catch (err) {
  console.error('[Firebase Fatal] Failed to initialize Firebase:', err);
  isFirebaseInitialized = false;
}

// Fail-fast on production if database connection failed
if (!isFirebaseInitialized) {
  console.error('[Firebase Fatal] Database is required. In-memory fallback has been removed.');
  if (env.nodeEnv === 'production') {
    process.exit(1);
  }
}

export { db, isFirebaseInitialized };
