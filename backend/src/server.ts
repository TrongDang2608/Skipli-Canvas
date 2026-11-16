import app from './app';
import { env } from './config/env.config';
import { s3Service } from './services/s3.service';

const PORT = env.port;

const server = app.listen(PORT, async () => {
  console.log(`[Server] Skipli Canvas Backend running on http://localhost:${PORT}`);

  // Safely initialize S3 bucket configuration without crashing the server
  try {
    await s3Service.ensureBucketVersioningEnabled();
    await s3Service.ensurePublicBucketPolicyEnabled();
  } catch (s3Err) {
    console.warn('[S3 Warning] S3 bucket initialization failed on startup:', s3Err);
  }
});

server.setTimeout(0);
server.keepAliveTimeout = 0;
