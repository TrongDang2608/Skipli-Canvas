import { Router } from 'express';
import { creditController } from '../controllers/credit.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateBody, validateQuery } from '../middlewares/validate.middleware';
import { creditHistoryQuerySchema, createCheckoutSchema } from '../dtos/credit.dto';

const router = Router();

/**
 * @route   GET /api/credits/plans
 * @desc    Get active pricing plans catalog from Firestore database
 * @access  Public
 */
router.get('/plans', creditController.getPlans);

/**
 * @route   GET /api/credits/balance
 * @desc    Get current user credit balance and out-of-credit status
 * @access  Private (Requires Bearer token)
 */
router.get('/balance', authenticate, creditController.getBalance);

/**
 * @route   GET /api/credits/history
 * @desc    Get paginated credit ledger transaction history
 * @access  Private (Requires Bearer token)
 */
router.get('/history', authenticate, validateQuery(creditHistoryQuerySchema), creditController.getHistory);

/**
 * @route   POST /api/credits/checkout
 * @desc    Initiate a server-controlled payment session from DB pricing plans
 * @access  Private (Requires Bearer token)
 */
router.post('/checkout', authenticate, validateBody(createCheckoutSchema), creditController.createCheckout);

export default router;

