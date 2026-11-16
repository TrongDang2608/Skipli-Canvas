import { AuthUserPayload } from './auth.types';
import Stripe from 'stripe';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
      rawBody?: Buffer;
      stripeEvent?: Stripe.Event;
    }
  }
}
