export interface WebhookEventHandlers {
    onCheckoutSessionCompleted?: (session: any) => Promise<void>;
    onSubscriptionCreated?: (subscription: any) => Promise<void>;
    onSubscriptionUpdated?: (subscription: any) => Promise<void>;
    onSubscriptionDeleted?: (subscription: any) => Promise<void>;
    onPaymentSucceeded?: (invoice: any) => Promise<void>;
    onPaymentFailed?: (invoice: any) => Promise<void>;
}
export declare const handleStripeWebhook: (body: string, signature: string, webhookSecret: string, handlers?: WebhookEventHandlers) => Promise<{
    received: boolean;
}>;
//# sourceMappingURL=webhooks.d.ts.map