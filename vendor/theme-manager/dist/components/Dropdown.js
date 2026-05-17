"use strict";
/**
 * Dropdown — Themed dropdown components for the Amazing Business ecosystem.
 *
 * Exports two components:
 *   <Select>     — Themed native <select> wrapper. Accessible, mobile-friendly.
 *   <Dropdown>   — Custom floating menu for navigation/action items.
 *
 * Both use semantic CSS variable tokens (no hardcoded colors) and inherit
 * Light/Dark mode from the parent app's theme-manager contract.
 * Follows BUSINESS_THEME_CONTRACT Section 5.
 */
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dropdown = exports.Select = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const cn_1 = require("../lib/cn");
// ─── Select ───────────────────────────────────────────────────────────────────
const selectSizeClasses = {
    sm: 'h-8 px-3 text-sm rounded-md',
    md: 'h-9 px-3 text-sm rounded-md',
    lg: 'h-10 px-4 text-base rounded-lg',
};
/**
 * Select — accessible themed <select> wrapper.
 *
 * @example
 * <Select label="Status" value={val} onChange={e => setVal(e.target.value)}>
 *   <option value="active">Active</option>
 *   <option value="archived">Archived</option>
 * </Select>
 */
exports.Select = react_1.default.forwardRef((_a, ref) => {
    var { label, helperText, error, size = 'md', iconLeft, fullWidth = false, className, disabled, children, id } = _a, rest = __rest(_a, ["label", "helperText", "error", "size", "iconLeft", "fullWidth", "className", "disabled", "children", "id"]);
    const inputId = id !== null && id !== void 0 ? id : react_1.default.useId();
    const hasError = Boolean(error);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-1', fullWidth && 'w-full'), children: [label && ((0, jsx_runtime_1.jsx)("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground", children: label })), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative flex items-center', fullWidth && 'w-full'), children: [iconLeft && ((0, jsx_runtime_1.jsx)("span", { className: "pointer-events-none absolute left-3 flex items-center text-muted-foreground", children: iconLeft })), (0, jsx_runtime_1.jsx)("select", Object.assign({ ref: ref, id: inputId, disabled: disabled, "aria-invalid": hasError || undefined, "aria-describedby": error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined, className: (0, cn_1.cn)(
                        // Base
                        'w-full appearance-none cursor-pointer font-medium', 'bg-background text-foreground', 'border transition-colors duration-150', 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background', 
                        // Border state
                        hasError
                            ? 'border-destructive focus:ring-destructive'
                            : 'border-border focus:border-primary', 
                        // Size
                        selectSizeClasses[size], 
                        // Icon padding
                        !!iconLeft && 'pl-9', 
                        // Arrow icon room
                        'pr-9', 
                        // Disabled
                        disabled && 'opacity-50 cursor-not-allowed', className) }, rest, { children: children })), (0, jsx_runtime_1.jsx)("span", { className: "pointer-events-none absolute right-3 flex items-center text-muted-foreground", children: (0, jsx_runtime_1.jsx)("svg", { className: "h-4 w-4", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z", clipRule: "evenodd" }) }) })] }), (helperText || error) && ((0, jsx_runtime_1.jsx)("p", { id: error ? `${inputId}-error` : `${inputId}-helper`, className: (0, cn_1.cn)('text-xs', error ? 'text-destructive' : 'text-muted-foreground'), children: error !== null && error !== void 0 ? error : helperText }))] }));
});
exports.Select.displayName = 'Select';
// ─── Dropdown (custom floating menu) ─────────────────────────────────────────
/**
 * Dropdown — click-trigger floating action menu.
 *
 * @example
 * <Dropdown
 *   trigger={<Button variant="outline">Options ▾</Button>}
 *   items={[
 *     { label: 'Edit', icon: <PencilIcon />, onClick: () => handleEdit() },
 *     { label: 'Delete', destructive: true, onClick: () => handleDelete() },
 *   ]}
 * />
 */
const Dropdown = ({ trigger, items, align = 'left', className, }) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const wrapperRef = (0, react_1.useRef)(null);
    // Close on outside click
    (0, react_1.useEffect)(() => {
        if (!open)
            return;
        function handleOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, [open]);
    // Close on Escape
    (0, react_1.useEffect)(() => {
        if (!open)
            return;
        function handleKey(e) {
            if (e.key === 'Escape')
                setOpen(false);
        }
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: wrapperRef, className: (0, cn_1.cn)('relative inline-block', className), children: [(0, jsx_runtime_1.jsx)("div", { onClick: () => setOpen((prev) => !prev), className: "cursor-pointer", role: "button", "aria-haspopup": "menu", "aria-expanded": open, tabIndex: 0, onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setOpen((prev) => !prev);
                    }
                }, children: trigger }), open && ((0, jsx_runtime_1.jsx)("div", { role: "menu", className: (0, cn_1.cn)(
                // Position
                'absolute z-50 mt-1 min-w-[180px]', align === 'right' ? 'right-0' : 'left-0', 
                // Surface — uses semantic tokens
                'bg-popover text-popover-foreground', 'border border-border', 'rounded-lg shadow-lg', 
                // Animation
                'animate-in fade-in-0 zoom-in-95', 'origin-top-left'), children: (0, jsx_runtime_1.jsx)("div", { className: "py-1", children: items.map((item, idx) => ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [item.separator && ((0, jsx_runtime_1.jsx)("div", { className: "my-1 border-t border-border", role: "separator" })), (0, jsx_runtime_1.jsxs)("button", { role: "menuitem", disabled: item.disabled, onClick: () => {
                                    var _a;
                                    if (!item.disabled) {
                                        (_a = item.onClick) === null || _a === void 0 ? void 0 : _a.call(item);
                                        setOpen(false);
                                    }
                                }, className: (0, cn_1.cn)('flex w-full items-center gap-2 px-3 py-2 text-sm text-left', 'transition-colors duration-100', 'focus:outline-none focus-visible:bg-accent', item.destructive
                                    ? 'text-destructive hover:bg-destructive/10 focus:bg-destructive/10'
                                    : 'text-foreground hover:bg-accent hover:text-accent-foreground', item.disabled && 'opacity-40 cursor-not-allowed'), children: [item.icon && ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 h-4 w-4 text-muted-foreground", children: item.icon })), item.label] })] }, idx))) }) }))] }));
};
exports.Dropdown = Dropdown;
exports.Dropdown.displayName = 'Dropdown';
exports.default = exports.Dropdown;
