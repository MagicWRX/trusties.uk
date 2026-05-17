"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = Container;
exports.Surface = Surface;
exports.MutedSurface = MutedSurface;
const jsx_runtime_1 = require("react/jsx-runtime");
function Container({ children, className }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `bg-card text-card-foreground border border-border rounded-lg p-6 shadow-sm ${className}`, children: children }));
}
function Surface({ children, className }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `bg-background text-foreground ${className}`, children: children }));
}
function MutedSurface({ children, className }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `bg-muted text-muted-foreground p-4 rounded ${className}`, children: children }));
}
