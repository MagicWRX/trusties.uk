"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPortalSession = exports.createCheckoutSession = void 0;
const stripe_1 = require("./stripe");
// Create Stripe checkout session
const createCheckoutSession = async (options) => {
    if (!stripe_1.stripe) {
        throw new Error('Stripe is not configured. Please check your environment variables (STRIPE_SECRET_KEY or STRIPE_SANDBOX_SECRET_KEY).');
    }
    const { priceId, customerEmail, userId, plan, successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`, cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`, metadata = {} } = options;
    try {
        const session = await stripe_1.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: successUrl,
            cancel_url: cancelUrl,
            customer_email: customerEmail,
            metadata: Object.assign({ userId,
                plan }, metadata),
        });
        return session;
    }
    catch (error) {
        console.error('Error creating checkout session:', error);
        throw error;
    }
};
exports.createCheckoutSession = createCheckoutSession;
// Create customer portal session
const createPortalSession = async (customerId, returnUrl) => {
    if (!stripe_1.stripe) {
        throw new Error('Stripe is not configured. Please check your environment variables (STRIPE_SECRET_KEY or STRIPE_SANDBOX_SECRET_KEY).');
    }
    const url = returnUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`;
    try {
        const session = await stripe_1.stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: url,
        });
        return session;
    }
    catch (error) {
        console.error('Error creating portal session:', error);
        throw error;
    }
};
exports.createPortalSession = createPortalSession;
