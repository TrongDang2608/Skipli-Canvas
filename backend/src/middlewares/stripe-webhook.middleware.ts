import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import { env } from '../config/env.config';

const stripe = new Stripe(env.stripeSecretKey || '', {
  apiVersion: '2024-12-18.acacia' as any
});

/**
 * Middleware bảo mật chặn đứng các request giả mạo webhook:
 * 1. Kiểm tra sự tồn tại của header 'stripe-signature' -> Nếu thiếu trả 401 Unauthorized
 * 2. Dùng stripe.webhooks.constructEvent() đối soát chuỗi HMAC SHA-256 trên req.rawBody
 * 3. Nếu sai lệch chữ ký hoặc hết hạn timestamp -> Trả 401 Unauthorized
 * 4. Nếu hợp lệ -> Gắn event đã giải mã vào req.stripeEvent và cho đi tiếp
 */
export const verifyStripeWebhookSignature = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const signature = req.headers['stripe-signature'] as string | undefined;

  // Thiếu header chữ ký -> Từ chối ngay lập tức (khớp assertion của T1.5.3)
  if (!signature) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing Stripe webhook signature header'
    });
    return;
  }

  // Thiếu rawBody (do chưa qua hook verify trong app.ts)
  if (!req.rawBody) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error: Missing raw body stream for webhook verification'
    });
    return;
  }

  try {
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      env.stripeWebhookSecret
    );

    // Gắn event hợp lệ vào request context
    req.stripeEvent = event;
    next();
  } catch (err: any) {
    // Chữ ký sai hoặc secret không khớp -> Chặn bằng mã 401
    res.status(401).json({
      success: false,
      error: `Unauthorized: Invalid Stripe webhook signature (${err.message})`
    });
  }
};

