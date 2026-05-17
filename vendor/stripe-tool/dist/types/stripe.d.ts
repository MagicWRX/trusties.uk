export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    interval: 'month' | 'year';
    features: string[];
    stripePriceId?: string;
    popular?: boolean;
}
export interface StripeCustomer {
    id: string;
    email: string;
    name?: string;
}
export interface SubscriptionStatus {
    id: string;
    status: 'active' | 'canceled' | 'past_due' | 'unpaid';
    current_period_start: number;
    current_period_end: number;
    plan: SubscriptionPlan;
}
//# sourceMappingURL=stripe.d.ts.map