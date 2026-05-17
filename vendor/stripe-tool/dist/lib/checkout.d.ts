export interface ProductConfig {
    name: string;
    price: number;
    interval: 'month' | 'year';
    features: string[];
    stripePriceId?: string;
}
export interface CheckoutSessionOptions {
    priceId: string;
    customerEmail?: string;
    userId?: string;
    plan?: string;
    successUrl?: string;
    cancelUrl?: string;
    metadata?: Record<string, string>;
}
export declare const createCheckoutSession: (options: CheckoutSessionOptions) => Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Checkout.Session>>;
export declare const createPortalSession: (customerId: string, returnUrl?: string) => Promise<import("stripe").Stripe.Response<import("stripe").Stripe.BillingPortal.Session>>;
//# sourceMappingURL=checkout.d.ts.map