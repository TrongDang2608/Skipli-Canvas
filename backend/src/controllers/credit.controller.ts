import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import { quotaService } from '../services/quota.service';
import { pricingPlanService } from '../services/pricing-plan.service';
import { paymentService } from '../services/payment.service';
import { AuthenticatedRequest } from '../types/auth.types';
import { HttpError } from '../utils/http-error.util';
import {
  CreateCheckoutDto,
  CreditHistoryQueryDto,
  creditHistoryQuerySchema
} from '../dtos/credit.dto';

export class CreditController {
  /**
   * GET /api/credits/plans
   * Retrieve active pricing plans catalog from Firestore database.
   */
  public getPlans = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const plans = await pricingPlanService.listActivePlans();
      res.status(200).json({
        success: true,
        data: { plans }
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * GET /api/credits/balance
   * Retrieve current user credit balance and out-of-credit status in O(1).
   */
  public getBalance = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized: User authentication required'
        });
        return;
      }

      const balanceProfile = await quotaService.getUserBalance(userId);

      res.status(200).json({
        success: true,
        data: balanceProfile
      });
    } catch (error: any) {
      if (error?.message?.includes('USER_NOT_FOUND')) {
        res.status(404).json({
          success: false,
          error: 'User profile not found in database'
        });
        return;
      }
      next(error);
    }
  };

  /**
   * GET /api/credits/history?page=1&limit=10
   * Retrieve paginated immutable ledger transaction audit logs.
   */
  public getHistory = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized: User authentication required'
        });
        return;
      }

      // Parse and sanitize query parameters with Zod schema (validated via validateQuery middleware)
      const query =
        (res.locals.validatedQuery as CreditHistoryQueryDto | undefined) ??
        creditHistoryQuerySchema.parse(req.query);
      const page = query.page;
      const limit = query.limit;
      const offset = (page - 1) * limit;

      const { transactions, total } = await quotaService.getHistory(userId, limit, offset);
      const totalPages = Math.ceil(total / limit) || 1;

      res.status(200).json({
        success: true,
        data: {
          transactions,
          pagination: {
            page,
            limit,
            total,
            totalPages
          }
        }
      });
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * POST /api/credits/checkout
   * Bước 1: Tạo payment_session PENDING theo gói trên DB; userId lấy hoàn toàn từ JWT.
   */
  public createCheckout = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError(401, 'Unauthorized: User authentication required');
      }

      const { planId } = req.body as CreateCheckoutDto;
      const checkoutData = await paymentService.createCheckoutSession({
        userId,
        planId
      });

      res.status(201).json({
        success: true,
        data: checkoutData
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/webhooks/topup
   * Tiếp nhận các sự kiện chính thức từ Stripe sau khi đã qua middleware xác thực chữ ký verifyStripeWebhookSignature.
   */
  public handlePaymentWebhook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const event = req.stripeEvent as Stripe.Event;

      if (!event) {
        throw new HttpError(400, 'Webhook event payload is missing');
      }

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;

          // ⚠️ CHỈ CỘNG TIỀN KHI TIỀN THỰC SỰ ĐÃ VÀO TÀI KHOẢN (paid)
          if (session.payment_status === 'paid') {
            const transactionId =
              session.metadata?.transactionId || session.client_reference_id;
            const planId = session.metadata?.planId;

            if (!transactionId || !planId) {
              console.warn(
                `[Stripe Webhook] Session ${session.id} missing transactionId/planId in metadata.`
              );
              res.status(200).json({ received: true, warning: 'Missing metadata' });
              return;
            }

            const result = await paymentService.fulfillPaymentSession({
              transactionId,
              planId,
              paidAmountCents: session.amount_total ?? undefined,
              providerTransactionId: (session.payment_intent as string) || session.id,
              provider: 'stripe'
            });

            res.status(200).json({
              success: true,
              message: result.isDuplicate
                ? 'Transaction has already been processed (Idempotent replay)'
                : 'Payment fulfilled and credits added successfully',
              data: result
            });
            return;
          }

          // Trường hợp thanh toán chậm (Async Payment) chưa trả tiền ngay
          res.status(200).json({ received: true, status: session.payment_status });
          return;
        }

        case 'checkout.session.expired': {
          const session = event.data.object as Stripe.Checkout.Session;
          const transactionId =
            session.metadata?.transactionId || session.client_reference_id;
          if (transactionId) {
            await paymentService.markSessionExpired(transactionId);
          }
          res.status(200).json({ received: true, status: 'marked_expired' });
          return;
        }

        default:
          // Trả về 200 OK cho mọi sự kiện khác để Stripe biết server đã nhận và không gửi lại (retry)
          res.status(200).json({ received: true, unhandledType: event.type });
      }
    } catch (error) {
      next(error);
    }
  };
}

export const creditController = new CreditController();

