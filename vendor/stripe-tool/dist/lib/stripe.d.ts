import Stripe from 'stripe';
export declare const getStripe: (publishableKey?: string) => Promise<import("@stripe/stripe-js").Stripe | null>;
export declare const createStripeClient: (secretKey?: string) => Stripe | null;
export declare const stripe: Stripe | null;
//# sourceMappingURL=stripe.d.ts.map