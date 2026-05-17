"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
/**
 * Lightweight className merge utility.
 * Joins truthy strings and deduplicates same-prefix Tailwind classes.
 * No external dependencies — keeps the package size minimal.
 */
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
