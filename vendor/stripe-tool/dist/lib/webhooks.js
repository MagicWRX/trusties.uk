"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhook = void 0;
const stripe_1 = require("./stripe");
const handleStripeWebhook = async (body, signature, webhookSecret, handlers = {}) => {
    if (!stripe_1.stripe) {
        throw new Error('Stripe is not configured');
    }
    let event;
    try {
        event = stripe_1.stripe.webhooks.constructEvent(body, signature, webhookSecret);
    }
    catch (error) {
        console.error('Webhook signature verification failed:', error);
        throw new Error('Invalid signature');
    }
    try {
        switch (event.type) {
            case 'checkout.session.completed':
                if (handlers.onCheckoutSessionCompleted) {
                    await handlers.onCheckoutSessionCompleted(event.data.object);
                }
                break;
            case 'customer.subscription.created':
                if (handlers.onSubscriptionCreated) {
                    await handlers.onSubscriptionCreated(event.data.object);
                }
                break;
            case 'customer.subscription.updated':
                if (handlers.onSubscriptionUpdated) {
                    await handlers.onSubscriptionUpdated(event.data.object);
                }
                break;
            case 'customer.subscription.deleted':
                if (handlers.onSubscriptionDeleted) {
                    await handlers.onSubscriptionDeleted(event.data.object);
                }
                break;
            case 'invoice.payment_succeeded':
                if (handlers.onPaymentSucceeded) {
                    await handlers.onPaymentSucceeded(event.data.object);
                }
                break;
            case 'invoice.payment_failed':
                if (handlers.onPaymentFailed) {
                    await handlers.onPaymentFailed(event.data.object);
                }
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
        return { received: true };
    }
    catch (error) {
        console.error('Webhook handler error:', error);
        throw error;
    }
};
exports.handleStripeWebhook = handleStripeWebhook;
