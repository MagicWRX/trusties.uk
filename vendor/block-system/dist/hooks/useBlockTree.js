"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBlockTree = useBlockTree;
const react_1 = require("react");
const types_1 = require("../types");
// ─── Hook ─────────────────────────────────────────────────────────────────────
/**
 * useBlockTree — client hook for fetching + managing all blocks for an IP.
 *
 * Two fetch modes:
 *   1. Direct Supabase (`supabaseUrl` + `supabaseAnonKey`) — for non-ADMIN apps
 *   2. API endpoint (`apiEndpoint`) — for ADMIN
 *
 * Graceful fallback: if fetch fails, `blocks` returns `{}` — no crash.
 *
 * SSOT: DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md
 */
function useBlockTree(ipSlug, options = {}) {
    const { supabaseUrl, supabaseAnonKey, apiEndpoint, context = 'default', disabled = false, } = options;
    const [blocks, setBlocks] = (0, react_1.useState)({});
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const abortRef = (0, react_1.useRef)(null);
    const fetchBlocks = (0, react_1.useCallback)(async () => {
        var _a, _b;
        if (disabled || (!supabaseUrl && !apiEndpoint))
            return;
        (_a = abortRef.current) === null || _a === void 0 ? void 0 : _a.abort();
        const ctrl = new AbortController();
        abortRef.current = ctrl;
        setLoading(true);
        setError(null);
        try {
            let rows = [];
            if (apiEndpoint) {
                const url = `${apiEndpoint}?ip_slug=${encodeURIComponent(ipSlug)}&context=${encodeURIComponent(context)}`;
                const res = await fetch(url, { signal: ctrl.signal });
                if (!res.ok)
                    throw new Error(`Blocks API ${res.status}`);
                const data = await res.json();
                rows = (_b = data.blocks) !== null && _b !== void 0 ? _b : [];
            }
            else if (supabaseUrl && supabaseAnonKey) {
                const url = `${supabaseUrl}/rest/v1/blocks?ip_slug=eq.${encodeURIComponent(ipSlug)}&context=eq.${encodeURIComponent(context)}&order=sort_order.asc`;
                const res = await fetch(url, {
                    signal: ctrl.signal,
                    headers: {
                        apikey: supabaseAnonKey,
                        Authorization: `Bearer ${supabaseAnonKey}`,
                        Accept: 'application/json',
                    },
                });
                if (!res.ok)
                    throw new Error(`Supabase blocks ${res.status}`);
                rows = (await res.json());
            }
            const index = {};
            for (const row of rows) {
                const block = (0, types_1.mapDbRowToBlock)(row);
                index[block.id] = block;
            }
            setBlocks(index);
        }
        catch (err) {
            if (err.name === 'AbortError')
                return;
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg);
        }
        finally {
            setLoading(false);
        }
    }, [ipSlug, context, supabaseUrl, supabaseAnonKey, apiEndpoint, disabled]);
    (0, react_1.useEffect)(() => {
        void fetchBlocks();
        return () => { var _a; return (_a = abortRef.current) === null || _a === void 0 ? void 0 : _a.abort(); };
    }, [fetchBlocks]);
    // ── Mutations (optimistic-first) ──────────────────────────────────────────
    const addBlock = (0, react_1.useCallback)(async (layer, overrides = {}) => {
        const id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const block = (0, types_1.createBlankBlock)(id, layer, overrides);
        // Optimistic update
        setBlocks(prev => (Object.assign(Object.assign({}, prev), { [id]: block })));
        // Persist via API if available
        if (apiEndpoint) {
            try {
                const res = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ip_slug: ipSlug, context, block }),
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.block) {
                        const saved = (0, types_1.mapDbRowToBlock)(data.block);
                        setBlocks(prev => {
                            const next = Object.assign({}, prev);
                            delete next[id];
                            next[saved.id] = saved;
                            return next;
                        });
                        return saved;
                    }
                }
            }
            catch (_a) {
                // Keep optimistic block on error
            }
        }
        return block;
    }, [ipSlug, context, apiEndpoint]);
    const updateBlock = (0, react_1.useCallback)((id, patch) => {
        setBlocks(prev => prev[id]
            ? Object.assign(Object.assign({}, prev), { [id]: Object.assign(Object.assign(Object.assign({}, prev[id]), patch), { updatedAt: new Date().toISOString() }) }) : prev);
    }, []);
    const toggleVisible = (0, react_1.useCallback)((id, visible) => {
        updateBlock(id, { visible });
    }, [updateBlock]);
    const toggleLocked = (0, react_1.useCallback)((id, locked) => {
        updateBlock(id, { locked });
    }, [updateBlock]);
    const removeBlock = (0, react_1.useCallback)((id) => {
        setBlocks(prev => {
            const next = Object.assign({}, prev);
            delete next[id];
            return next;
        });
    }, []);
    return {
        blocks,
        loading,
        error,
        refetch: fetchBlocks,
        addBlock,
        updateBlock,
        toggleVisible,
        toggleLocked,
        removeBlock,
    };
}
