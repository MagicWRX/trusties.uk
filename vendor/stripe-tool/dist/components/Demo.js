"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StripeToolDemo;
const jsx_runtime_1 = require("react/jsx-runtime");
const CheckoutButton_1 = __importDefault(require("./CheckoutButton"));
const PortalButton_1 = __importDefault(require("./PortalButton"));
function StripeToolDemo() {
    // NOTE: This demo is rendered inside the Shared Hub which may not always
    // emit Tailwind utilities for workspace packages depending on dev/build mode.
    // Inline styles here ensure the demo stays readable on the Hub's dark theme.
    const surfaceStyle = {
        backgroundColor: 'rgba(226, 232, 240, 0.96)', // slate-ish, slightly blue
        color: '#0f172a',
    };
    const cardStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
    };
    const subtleCardStyle = {
        backgroundColor: 'rgba(248, 250, 252, 0.9)',
    };
    const warningCardStyle = {
        backgroundColor: 'rgba(254, 249, 195, 0.85)',
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-300", style: surfaceStyle, children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold mb-2", children: "Stripe Tool Demo" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Demonstration of Stripe payment integration components" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-6", style: cardStyle, children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium mb-4", children: "Checkout Integration" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-600 mb-3", children: [(0, jsx_runtime_1.jsx)("strong", { children: "Note:" }), " This demo button requires a valid Stripe price ID and proper configuration."] }), (0, jsx_runtime_1.jsx)(CheckoutButton_1.default, { priceId: "demo_price_id", className: "w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50", onSuccess: () => alert('Checkout successful!'), onError: (error) => alert('Checkout error: ' + error.message), children: "Start Subscription (Demo)" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-6", style: cardStyle, children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium mb-4", children: "Customer Portal" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-600 mb-3", children: [(0, jsx_runtime_1.jsx)("strong", { children: "Note:" }), " Requires authenticated user session."] }), (0, jsx_runtime_1.jsx)(PortalButton_1.default, { customerId: "demo_customer_id", className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50", children: "Manage Billing" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-6 bg-gray-50", style: subtleCardStyle, children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium mb-2", children: "Features" }), (0, jsx_runtime_1.jsxs)("ul", { className: "text-sm text-gray-600 space-y-1", children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Stripe Checkout session creation" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Customer Portal integration" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Webhook handling utilities" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 TypeScript support" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 React component library" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-6 bg-yellow-50", style: warningCardStyle, children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium mb-2 text-yellow-800", children: "Setup Required" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-yellow-700", children: "To use these components, you need to configure Stripe with your publishable key and ensure proper webhook endpoints are set up." })] })] }) }));
}
