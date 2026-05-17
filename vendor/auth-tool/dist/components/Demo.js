"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthToolDemo;
const jsx_runtime_1 = require("react/jsx-runtime");
const LoginButton_1 = __importDefault(require("./LoginButton"));
const LogoutButton_1 = __importDefault(require("./LogoutButton"));
function AuthToolDemo() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold mb-2", children: "Auth Tool Demo" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Demonstration of authentication components" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium mb-4", children: "Login Options" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsx)(LoginButton_1.default, { className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500", children: "Click to sign in with Google OAuth" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium mb-4", children: "Session Management" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsx)(LogoutButton_1.default, {}), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500", children: "Sign out of current session" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-6 bg-gray-50", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium mb-2", children: "Features" }), (0, jsx_runtime_1.jsxs)("ul", { className: "text-sm text-gray-600 space-y-1", children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Google OAuth integration" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Supabase Auth client setup" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Automatic redirect handling" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Session management" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 TypeScript support" })] })] })] }));
}
