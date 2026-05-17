"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = exports.createStripeClient = exports.getStripe = void 0;
const stripe_js_1 = require("@stripe/stripe-js");
const stripe_1 = __importDefault(require("stripe"));
// Client-side Stripe instance
const getStripe = (publishableKey) => {
    const mode = process.env.STRIPE_MODE;
    const isSandbox = mode === 'sandbox' || mode === 'test';
    const key = publishableKey || (isSandbox
        ? process.env.NEXT_PUBLIC_STRIPE_SANDBOX_PUBLISHABLE_KEY
        : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    if (!key) {
        throw new Error(`Stripe ${isSandbox ? 'sandbox ' : ''}publishable key not found`);
    }
    return (0, stripe_js_1.loadStripe)(key);
};
exports.getStripe = getStripe;
// Server-side Stripe instance
const createStripeClient = (secretKey) => {
    const mode = process.env.STRIPE_MODE;
    const isSandbox = mode === 'sandbox' || mode === 'test';
    const key = secretKey || (isSandbox
        ? process.env.STRIPE_SANDBOX_SECRET_KEY
        : process.env.STRIPE_SECRET_KEY);
    if (!key) {
        return null;
    }
    return new stripe_1.default(key, {
        apiVersion: '2025-02-24.acacia',
    });
};
exports.createStripeClient = createStripeClient;
// Default server-side instance
exports.stripe = (0, exports.createStripeClient)();
