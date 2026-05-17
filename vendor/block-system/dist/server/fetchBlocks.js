"use strict";
// ─── Server-side Block Fetching ───────────────────────────────────────────────
// Server Component / Route Handler safe — no React, no hooks.
// SSOT: DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md
//
// Usage (Server Component):
//   import { fetchBlocks } from '@magicwrxtools/block-system/server';
//   const tree = await fetchBlocks('pixelextreme', 'editor');
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBlocks = fetchBlocks;
exports.fetchBlock = fetchBlock;
const types_1 = require("../types");
/**
 * fetchBlocks — server-side fetcher for all blocks belonging to an IP slug.
 *
 * Returns a BlockTree (all blocks keyed by id) or null on error.
 * Designed for Server Components and API Route Handlers.
 */
async function fetchBlocks(ipSlug, context = 'default', options) {
    var _a;
    const { supabaseUrl, supabaseKey, cache } = options;
    const url = `${supabaseUrl}/rest/v1/blocks?ip_slug=eq.${encodeURIComponent(ipSlug)}&context=eq.${encodeURIComponent(context)}&order=sort_order.asc&select=*`;
    let fetchOptions;
    if (cache && typeof cache === 'object' && 'revalidate' in cache) {
        fetchOptions = { next: cache };
    }
    else {
        fetchOptions = { cache: (_a = cache) !== null && _a !== void 0 ? _a : 'default' };
    }
    try {
        const res = await fetch(url, Object.assign(Object.assign({}, fetchOptions), { headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                Accept: 'application/json',
            } }));
        if (!res.ok) {
            console.error(`[block-system] fetchBlocks ${res.status} for ${ipSlug}/${context}`);
            return null;
        }
        const rows = (await res.json());
        const blocks = {};
        for (const row of rows) {
            const block = (0, types_1.mapDbRowToBlock)(row);
            blocks[block.id] = block;
        }
        return {
            ipSlug,
            context,
            blocks,
            fetchedAt: new Date().toISOString(),
        };
    }
    catch (err) {
        console.error('[block-system] fetchBlocks error:', err);
        return null;
    }
}
/**
 * fetchBlock — server-side fetcher for a single block by ID.
 * Returns null when not found or on error.
 */
async function fetchBlock(blockId, options) {
    var _a;
    const { supabaseUrl, supabaseKey, cache } = options;
    const url = `${supabaseUrl}/rest/v1/blocks?id=eq.${encodeURIComponent(blockId)}&select=*&limit=1`;
    let fetchOptions;
    if (cache && typeof cache === 'object' && 'revalidate' in cache) {
        fetchOptions = { next: cache };
    }
    else {
        fetchOptions = { cache: (_a = cache) !== null && _a !== void 0 ? _a : 'default' };
    }
    try {
        const res = await fetch(url, Object.assign(Object.assign({}, fetchOptions), { headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                Accept: 'application/json',
            } }));
        if (!res.ok)
            return null;
        const rows = (await res.json());
        return rows.length > 0 ? (0, types_1.mapDbRowToBlock)(rows[0]) : null;
    }
    catch (_b) {
        return null;
    }
}
