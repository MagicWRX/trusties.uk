"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockTreeRenderer = BlockTreeRenderer;
const jsx_runtime_1 = require("react/jsx-runtime");
const useBlockTree_1 = require("../hooks/useBlockTree");
const BlockRenderer_1 = require("./BlockRenderer");
function BlockNode({ blockId, blocks, renderers }) {
    const block = blocks[blockId];
    if (!block || !block.visible)
        return null;
    // Ordered children for this block
    const childBlocks = Object.values(blocks)
        .filter((b) => b.parentId === blockId)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    const childNodes = ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: childBlocks.map((child) => ((0, jsx_runtime_1.jsx)(BlockNode, { blockId: child.id, blocks: blocks, renderers: renderers }, child.id))) }));
    // Custom renderer — receives the block + pre-built childNodes
    if (renderers === null || renderers === void 0 ? void 0 : renderers[block.type]) {
        const result = renderers[block.type](block, childNodes);
        if (result !== undefined)
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: result });
    }
    // Container / Columns — wrapper that renders children recursively
    if (block.type === 'container' || block.type === 'columns') {
        return ((0, jsx_runtime_1.jsxs)("div", { "data-block-id": block.id, "data-block-type": block.type, className: block.classes, style: block.styleOverrides, children: [block.customCss && ((0, jsx_runtime_1.jsx)("style", { children: `[data-block-id="${block.id}"] { ${block.customCss} }` })), childNodes] }));
    }
    // All other types — delegate to the leaf BlockRenderer
    return (0, jsx_runtime_1.jsx)(BlockRenderer_1.BlockRenderer, { block: block, renderers: renderers }, block.id);
}
// ─── BlockTreeRenderer ────────────────────────────────────────────────────────
/**
 * BlockTreeRenderer — the canonical top-level component for block-driven pages.
 *
 * 1. Fetches a BlockTree for the given IP + context
 * 2. Walks root → children recursively via BlockNode
 * 3. Renders each block via BlockRenderer (leaf) or the container pattern
 *
 * Progressive enhancement: if Supabase is unconfigured or fetch fails,
 * renders `fallback` — the page never crashes.
 *
 * Every IP landing page should use this directly.
 * SSOT: TASK-075, DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md
 */
function BlockTreeRenderer({ ipSlug, context = 'default', options, renderers, skeleton, fallback, className, }) {
    const { blocks, loading } = (0, useBlockTree_1.useBlockTree)(ipSlug, Object.assign(Object.assign({}, options), { context }));
    // ── Loading state ──────────────────────────────────────────────────────────
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: skeleton !== null && skeleton !== void 0 ? skeleton : ((0, jsx_runtime_1.jsx)("div", { className: "p-8 text-center opacity-50 animate-pulse", "aria-label": "Loading content", role: "status", children: (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Loading blocks..." }) })) }));
    }
    // ── Empty / error — progressive enhancement ───────────────────────────────
    const rootBlocks = Object.values(blocks)
        .filter((b) => b.parentId === null)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    if (rootBlocks.length === 0) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: fallback !== null && fallback !== void 0 ? fallback : null });
    }
    // ── Render the tree ────────────────────────────────────────────────────────
    return ((0, jsx_runtime_1.jsx)("div", { className: className, "data-block-tree": ipSlug, "data-block-context": context, children: rootBlocks.map((block) => ((0, jsx_runtime_1.jsx)(BlockNode, { blockId: block.id, blocks: blocks, renderers: renderers }, block.id))) }));
}
