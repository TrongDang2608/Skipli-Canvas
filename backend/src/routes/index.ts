import { Router } from 'express';
import authRoutes from './auth.routes';
import chatRoutes from './chat.routes';
import sessionRoutes from './session.routes';
import storageRoutes from './storage.routes';
import creditRoutes from './credit.routes';
import { creditController } from '../controllers/credit.controller';
import { verifyStripeWebhookSignature } from '../middlewares/stripe-webhook.middleware';

const router = Router();

// Mount Auth routes
router.use('/auth', authRoutes);

// Mount Chat / AI Stream routes
router.use('/chat', chatRoutes);

// Mount Session / History routes
router.use('/sessions', sessionRoutes);

// Mount Storage / File Download routes
router.use('/storage', storageRoutes);

// Mount Credit Quota & Ledger routes
router.use('/credits', creditRoutes);

// Mount Payment Webhook endpoint (accessible via /api/webhooks/topup)
// Được bảo vệ bởi middleware xác thực chữ ký HMAC SHA-256 từ Stripe server
router.post('/webhooks/topup', verifyStripeWebhookSignature, creditController.handlePaymentWebhook);

export default router;


