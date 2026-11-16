import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  goclawUrl: process.env.GOCLAW_URL || '',
  goclawGatewayToken: process.env.GOCLAW_GATEWAY_TOKEN || '',
  goclawAgentId: process.env.GOCLAW_AGENT_ID || '',
  goclawWorkspaceDir: process.env.GOCLAW_WORKSPACE_DIR || '',
  firebaseServiceAccountJson: process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '',
  firebaseServiceAccountPath: process.env.FIREBASE_SERVICE_ACCOUNT_PATH || '',

  // JWT Configuration
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || '',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || '',
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

  // S3 / MinIO Storage Configuration
  s3Endpoint: process.env.S3_ENDPOINT || '',
  s3Region: process.env.S3_REGION || 'us-east-1',
  s3BucketName: process.env.S3_BUCKET_NAME || 'skipli-canvas-storage',
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID || '',
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  s3ForcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true' || process.env.S3_FORCE_PATH_STYLE === '1',

  // Client & Cookie Configuration
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  cookieName: process.env.COOKIE_NAME || 'refreshToken',
  cookieSecure: process.env.COOKIE_SECURE === 'true' || (process.env.NODE_ENV === 'production' && process.env.COOKIE_SECURE !== 'false'),
  cookieSameSite: (process.env.COOKIE_SAME_SITE as 'lax' | 'strict' | 'none') || 'lax',
  cookiePath: process.env.COOKIE_PATH || '/api/auth',
  cookieMaxAgeMs: parseInt(process.env.COOKIE_MAX_AGE_DAYS || '7', 10) * 24 * 60 * 60 * 1000,

  // Rate Limiter Configuration
  trustProxy: process.env.TRUST_PROXY === 'true' || process.env.TRUST_PROXY === '1',
  rateLimitGlobalWindowMs: parseInt(process.env.RATE_LIMIT_GLOBAL_WINDOW_MS || '900000', 10),
  rateLimitGlobalMax: parseInt(process.env.RATE_LIMIT_GLOBAL_MAX || '300', 10),
  rateLimitAuthWindowMs: parseInt(process.env.RATE_LIMIT_AUTH_WINDOW_MS || '900000', 10),
  rateLimitAuthMax: parseInt(process.env.RATE_LIMIT_AUTH_MAX || '60', 10),
  rateLimitAiWindowMs: parseInt(process.env.RATE_LIMIT_AI_WINDOW_MS || '60000', 10),
  rateLimitAiMax: parseInt(process.env.RATE_LIMIT_AI_MAX || '15', 10),

  // CORS Configuration
  corsAllowedOrigins: (process.env.CORS_ALLOWED_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  corsMaxAge: parseInt(process.env.CORS_MAX_AGE || '86400', 10),

  // Email & Password Reset Configuration
  smtpHost: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  smtpPort: parseInt(process.env.SMTP_PORT || '587', 10),
  smtpSecure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_SECURE === '1',
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  emailFrom: process.env.EMAIL_FROM || 'Skipli Canvas <no-reply@skipli.com>',
  passwordResetTokenExpiresIn: process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN || '15m',
  rateLimitForgotPasswordWindowMs: parseInt(process.env.RATE_LIMIT_FORGOT_PASSWORD_WINDOW_MS || '900000', 10),
  rateLimitForgotPasswordMax: parseInt(process.env.RATE_LIMIT_FORGOT_PASSWORD_MAX || '5', 10),

  // Stripe Payment Gateway Configuration
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
};

// Validate critical secrets during startup
function validateCriticalEnv(): void {
  const missingSecrets: string[] = [];
  if (!env.jwtAccessSecret) missingSecrets.push('JWT_ACCESS_SECRET');
  if (!env.jwtRefreshSecret) missingSecrets.push('JWT_REFRESH_SECRET');

  if (missingSecrets.length > 0) {
    console.error(`[Config Fatal] Missing critical environment variables: ${missingSecrets.join(', ')}`);
    if (env.nodeEnv === 'production') {
      console.error('[Config Fatal] Server startup aborted to prevent insecure authentication in production.');
      process.exit(1);
    } else {
      console.warn('[Config Warning] Missing JWT secrets in development. Auth tokens will fail until configured.');
    }
  }

  if (!env.stripeSecretKey && env.nodeEnv === 'production') {
    console.error('[Config Fatal] Missing STRIPE_SECRET_KEY in production.');
    process.exit(1);
  }
}

validateCriticalEnv();
