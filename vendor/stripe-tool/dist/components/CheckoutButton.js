"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CheckoutButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const stripe_1 = require("../lib/stripe");
function CheckoutButton({ priceId, children, className = '', onSuccess, onError }) {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleCheckout = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceId }),
            });
            const { sessionId, error } = await response.json();
            if (error) {
                throw new Error(error);
            }
            const stripe = await (0, stripe_1.getStripe)();
            if (!stripe) {
                throw new Error('Stripe not initialized');
            }
            const { error: stripeError } = await stripe.redirectToCheckout({
                sessionId,
            });
            if (stripeError) {
                throw stripeError;
            }
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
        }
        catch (error) {
            console.error('Checkout error:', error);
            onError === null || onError === void 0 ? void 0 : onError(error);
        }
        finally {
            setLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)("button", { onClick: handleCheckout, disabled: loading, className: className, children: loading ? 'Processing...' : children }));
}
