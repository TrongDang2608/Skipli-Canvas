import { z } from 'zod';

/**
 * Validation schema for credit history pagination query parameters.
 * Uses z.coerce to safely parse string query parameters (e.g., ?page=2&limit=10) into integers.
 */
export const creditHistoryQuerySchema = z.object({
  page: z.coerce
    .number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .default(1),
  limit: z.coerce
    .number()
    .int('Limit must be an integer')
    .min(1, 'Limit must be at least 1')
    .max(50, 'Limit cannot exceed 50 items per page')
    .default(10)
});

export type CreditHistoryQueryDto = z.infer<typeof creditHistoryQuerySchema>;

const planIdSchema = z
  .string()
  .trim()
  .min(1, 'planId is required')
  .regex(
    /^[a-z0-9_]+$/,
    'Invalid planId format: only lowercase letters, numbers, and underscores are allowed'
  );

/**
 * Validation schema cho Bước 1 (Checkout): chỉ nhận { planId },
 * dùng .strict() để chặn đứng mọi field dư thừa như amount, credits hay userId.
 */
export const createCheckoutSchema = z
  .object({
    planId: planIdSchema
  })
  .strict();

export type CreateCheckoutDto = z.infer<typeof createCheckoutSchema>;

/**
 * @deprecated Legacy validation schema từ T1.5.4 (dùng cho mock topup).
 * Từ T1.5.3, Webhook chính thức của Stripe được bảo vệ bằng chữ ký HMAC SHA-256
 * qua middleware verifyStripeWebhookSignature và parse tự động thành Stripe.Event.
 */
export const paymentWebhookSchema = z
  .object({
    transactionId: z.string().trim().min(1, 'transactionId is required'),
    planId: planIdSchema,
    paidAmountCents: z
      .number()
      .int('paidAmountCents must be an integer (USD cents)')
      .nonnegative('paidAmountCents cannot be negative')
      .optional(),
    providerTransactionId: z.string().trim().min(1).optional(),
    provider: z.enum(['manual', 'stripe']).optional()
  })
  .strict();

export type PaymentWebhookDto = z.infer<typeof paymentWebhookSchema>;
