"use strict";
/**
 * Button — Themed button component for the Amazing Business ecosystem.
 *
 * Uses semantic CSS variable tokens (shadcn-style) so it inherits
 * Light/Dark mode and app skin from the parent app automatically.
 * No hardcoded colors. Follows BUSINESS_THEME_CONTRACT Section 5.
 */
'use client';
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const cn_1 = require("../lib/cn");
// ─── Variant styles ───────────────────────────────────────────────────────────
// All colors come from CSS variables via Tailwind semantic utilities.
// The consuming app sets these variables through theme-manager's setAppSkin().
const variantClasses = {
    primary: [
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90 active:bg-primary/80',
        'border border-primary',
        'shadow-sm',
    ].join(' '),
    secondary: [
        'bg-secondary text-secondary-foreground',
        'hover:bg-secondary/80 active:bg-secondary/70',
        'border border-secondary',
    ].join(' '),
    outline: [
        'bg-transparent text-foreground',
        'border border-border',
        'hover:bg-accent hover:text-accent-foreground',
        'active:bg-accent/70',
    ].join(' '),
    ghost: [
        'bg-transparent text-foreground',
        'border border-transparent',
        'hover:bg-accent hover:text-accent-foreground',
        'active:bg-accent/70',
    ].join(' '),
    destructive: [
        'bg-destructive text-destructive-foreground',
        'hover:bg-destructive/90 active:bg-destructive/80',
        'border border-destructive',
        'shadow-sm',
    ].join(' '),
    link: [
        'bg-transparent text-primary underline-offset-4',
        'hover:underline hover:text-primary/80',
        'border border-transparent',
        'p-0 h-auto',
    ].join(' '),
};
const sizeClasses = {
    xs: 'h-7 px-2.5 text-xs gap-1.5 rounded',
    sm: 'h-8 px-3 text-sm gap-2 rounded-md',
    md: 'h-9 px-4 text-sm gap-2 rounded-md',
    lg: 'h-10 px-5 text-base gap-2 rounded-lg',
    xl: 'h-12 px-6 text-base gap-2.5 rounded-lg',
};
// ─── Loading spinner ──────────────────────────────────────────────────────────
function Spinner() {
    return ((0, jsx_runtime_1.jsxs)("svg", { className: "animate-spin h-4 w-4 shrink-0", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), (0, jsx_runtime_1.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })] }));
}
// ─── Component ────────────────────────────────────────────────────────────────
exports.Button = react_1.default.forwardRef((_a, ref) => {
    var { variant = 'primary', size = 'md', fullWidth = false, loading = false, iconLeft, iconRight, className, disabled, children } = _a, rest = __rest(_a, ["variant", "size", "fullWidth", "loading", "iconLeft", "iconRight", "className", "disabled", "children"]);
    const isDisabled = disabled || loading;
    return ((0, jsx_runtime_1.jsxs)("button", Object.assign({ ref: ref, disabled: isDisabled, "aria-busy": loading || undefined, className: (0, cn_1.cn)(
        // Base — layout, transitions, focus ring
        'inline-flex items-center justify-center', 'font-medium whitespace-nowrap', 'transition-colors duration-150', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background', 'select-none', 
        // Variant
        variantClasses[variant], 
        // Size (skip if link variant uses its own padding)
        variant !== 'link' && sizeClasses[size], 
        // State
        fullWidth && 'w-full', isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none', 
        // Consumer override
        className) }, rest, { children: [loading ? (0, jsx_runtime_1.jsx)(Spinner, {}) : iconLeft, children, !loading && iconRight] })));
});
exports.Button.displayName = 'Button';
exports.default = exports.Button;
