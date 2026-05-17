"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLayoutContract;
const react_1 = require("react");
const LayoutContract_1 = require("../types/LayoutContract");
// ─── Storage ─────────────────────────────────────────────────────────────────
const STORAGE_KEY_PREFIX = 'mw.layout.activeTemplate.';
function loadStoredTemplate(ipSlug) {
    var _a, _b;
    try {
        return (_b = (_a = globalThis.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(`${STORAGE_KEY_PREFIX}${ipSlug}`)) !== null && _b !== void 0 ? _b : null;
    }
    catch (_c) {
        return null;
    }
}
function saveStoredTemplate(ipSlug, templateName) {
    var _a;
    try {
        (_a = globalThis.localStorage) === null || _a === void 0 ? void 0 : _a.setItem(`${STORAGE_KEY_PREFIX}${ipSlug}`, templateName);
    }
    catch (_b) {
        // ignore
    }
}
// ─── Grid Style Helpers ──────────────────────────────────────────────────────
function parseGridTemplate(template) {
    if (!template)
        return {};
    // If it looks like a shorthand (contains "/" for columns), use grid-template
    if (template.includes('/')) {
        return { display: 'grid', gridTemplate: template };
    }
    // Treat as grid-template-columns
    return { display: 'grid', gridTemplateColumns: template };
}
// ─── Hook ────────────────────────────────────────────────────────────────────
/**
 * Client-side hook for consuming layout contracts from Supabase.
 *
 * Supports two fetch modes:
 * 1. **Direct Supabase** (preferred) — provide `supabaseUrl` + `supabaseAnonKey`
 * 2. **API endpoint** — provide `apiEndpoint` (e.g. within ADMIN)
 *
 * Usage:
 * ```tsx
 * const {
 *   layout, loading, gridStyle, orderedRegions,
 *   getRegionContainers, containerClasses
 * } = useLayoutContract('pixelextreme', {
 *   defaultTemplate: 'pixel-editor-3panel',
 *   supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
 *   supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
 * });
 * ```
 *
 * @param ipSlug - IP identifier (e.g. 'pixelextreme', 'admin', 'mxn')
 * @param options - Configuration options (Supabase credentials or API endpoint)
 */
function useLayoutContract(ipSlug, options) {
    const [layouts, setLayouts] = (0, react_1.useState)([]);
    const [activeTemplate, setActiveTemplateState] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    // Stabilise options to avoid re-running effect on every render
    const defaultTemplate = options === null || options === void 0 ? void 0 : options.defaultTemplate;
    const supabaseUrl = options === null || options === void 0 ? void 0 : options.supabaseUrl;
    const supabaseAnonKey = options === null || options === void 0 ? void 0 : options.supabaseAnonKey;
    const apiEndpoint = options === null || options === void 0 ? void 0 : options.apiEndpoint;
    // ── Fetch via Supabase REST API (direct) ────────────────────────────────
    const fetchFromSupabase = (0, react_1.useCallback)(async (url, key) => {
        const headers = {
            apikey: key,
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
        };
        let layoutRows = [];
        // 1. Try tenant_child_sites
        const tenantRes = await fetch(`${url}/rest/v1/tenant_child_sites?slug=eq.${encodeURIComponent(ipSlug)}&select=*,layout_contracts(*)&limit=1`, { headers });
        if (tenantRes.ok) {
            const rows = await tenantRes.json();
            if (Array.isArray(rows) && rows.length > 0 && rows[0].layout_contracts) {
                layoutRows = [rows[0].layout_contracts];
            }
        }
        // 2. Try ip_platforms
        if (layoutRows.length === 0) {
            const ipRes = await fetch(`${url}/rest/v1/ip_platforms?slug=eq.${encodeURIComponent(ipSlug)}&select=*,layout_contracts(*)&limit=1`, { headers });
            if (ipRes.ok) {
                const rows = await ipRes.json();
                if (Array.isArray(rows) && rows.length > 0 && rows[0].layout_contracts) {
                    layoutRows = [rows[0].layout_contracts];
                }
            }
        }
        // 3. Fallback
        if (layoutRows.length === 0) {
            const fallbackRes = await fetch(`${url}/rest/v1/layout_contracts?ip_slug=eq.${encodeURIComponent(ipSlug)}&status=eq.active&order=template_name`, { headers });
            if (!fallbackRes.ok)
                throw new Error(`Supabase layout fetch failed: ${fallbackRes.status}`);
            layoutRows = await fallbackRes.json();
        }
        if (!Array.isArray(layoutRows) || layoutRows.length === 0) {
            return { layoutRows: [], containerRows: [] };
        }
        // Fetch containers for these layouts
        const ids = layoutRows.map((r) => `"${r.id}"`).join(',');
        const containerRes = await fetch(`${url}/rest/v1/theme_containers?layout_id=in.(${ids})&status=eq.active&order=sort_order`, { headers });
        const containerRows = containerRes.ok ? await containerRes.json() : [];
        return { layoutRows, containerRows: Array.isArray(containerRows) ? containerRows : [] };
    }, [ipSlug]);
    // ── Fetch via custom API endpoint ───────────────────────────────────────
    const fetchFromApi = (0, react_1.useCallback)(async (endpoint) => {
        var _a, _b;
        const res = await fetch(`${endpoint}?ip_slug=${encodeURIComponent(ipSlug)}`);
        if (!res.ok)
            throw new Error(`API layout fetch failed: ${res.status}`);
        const data = await res.json();
        return {
            layoutRows: ((_a = data.layouts) !== null && _a !== void 0 ? _a : []),
            containerRows: ((_b = data.containers) !== null && _b !== void 0 ? _b : []),
        };
    }, [ipSlug]);
    // ── Main fetch orchestrator ─────────────────────────────────────────────
    const fetchLayouts = (0, react_1.useCallback)(async () => {
        var _a, _b, _c;
        setLoading(true);
        setError(null);
        try {
            let layoutRows;
            let containerRows;
            if (supabaseUrl && supabaseAnonKey) {
                // Direct Supabase mode (preferred for non-ADMIN apps)
                ({ layoutRows, containerRows } = await fetchFromSupabase(supabaseUrl, supabaseAnonKey));
            }
            else if (apiEndpoint) {
                // API endpoint mode (ADMIN or custom backend)
                ({ layoutRows, containerRows } = await fetchFromApi(apiEndpoint));
            }
            else {
                // No credentials and no endpoint — graceful degrade
                console.warn('[useLayoutContract] No supabaseUrl/supabaseAnonKey or apiEndpoint provided');
                setLayouts([]);
                setLoading(false);
                return;
            }
            const mappedContainers = containerRows.map(LayoutContract_1.mapDbRowToThemeContainer);
            const mappedLayouts = layoutRows.map((row) => {
                const layout = (0, LayoutContract_1.mapDbRowToLayoutContract)(row);
                const containers = mappedContainers.filter((c) => c.layoutId === layout.id);
                return Object.assign(Object.assign({}, layout), { containers });
            });
            setLayouts(mappedLayouts);
            // Set active template: stored preference > default > first available
            const stored = loadStoredTemplate(ipSlug);
            const target = (_c = (_a = stored !== null && stored !== void 0 ? stored : defaultTemplate) !== null && _a !== void 0 ? _a : (_b = mappedLayouts[0]) === null || _b === void 0 ? void 0 : _b.templateName) !== null && _c !== void 0 ? _c : null;
            setActiveTemplateState(target);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : String(err));
            setLayouts([]);
        }
        finally {
            setLoading(false);
        }
    }, [ipSlug, defaultTemplate, supabaseUrl, supabaseAnonKey, apiEndpoint, fetchFromSupabase, fetchFromApi]);
    (0, react_1.useEffect)(() => {
        fetchLayouts();
    }, [fetchLayouts]);
    const setActiveTemplate = (0, react_1.useCallback)((templateName) => {
        setActiveTemplateState(templateName);
        saveStoredTemplate(ipSlug, templateName);
    }, [ipSlug]);
    // Active layout
    const layout = (0, react_1.useMemo)(() => {
        var _a, _b;
        return (_b = (_a = layouts.find((l) => l.templateName === activeTemplate)) !== null && _a !== void 0 ? _a : layouts[0]) !== null && _b !== void 0 ? _b : null;
    }, [layouts, activeTemplate]);
    // Ordered regions
    const orderedRegions = (0, react_1.useMemo)(() => {
        if (!layout)
            return [];
        return [...layout.regions].sort((a, b) => a.order - b.order);
    }, [layout]);
    // Grid style for the active layout
    const gridStyle = (0, react_1.useMemo)(() => {
        if (!(layout === null || layout === void 0 ? void 0 : layout.gridTemplate))
            return {};
        return parseGridTemplate(layout.gridTemplate);
    }, [layout]);
    // Responsive grid style
    const responsiveGridStyle = (0, react_1.useCallback)((breakpoint) => {
        var _a;
        const config = (_a = layout === null || layout === void 0 ? void 0 : layout.responsive) === null || _a === void 0 ? void 0 : _a[breakpoint];
        if (!(config === null || config === void 0 ? void 0 : config.gridTemplate))
            return {};
        return parseGridTemplate(config.gridTemplate);
    }, [layout]);
    // Region class getter
    const regionClasses = (0, react_1.useCallback)((regionName) => {
        var _a;
        const region = layout === null || layout === void 0 ? void 0 : layout.regions.find((r) => r.name === regionName);
        return (_a = region === null || region === void 0 ? void 0 : region.classes) !== null && _a !== void 0 ? _a : '';
    }, [layout]);
    // Container lookups
    const getRegionContainers = (0, react_1.useCallback)((regionName) => {
        if (!layout)
            return [];
        return (0, LayoutContract_1.getContainersForRegion)(layout, regionName);
    }, [layout]);
    const getContainerByName = (0, react_1.useCallback)((regionName, containerName) => {
        if (!layout)
            return undefined;
        return (0, LayoutContract_1.getContainer)(layout, regionName, containerName);
    }, [layout]);
    const containerClasses = (0, react_1.useCallback)((regionName, containerName) => {
        var _a, _b;
        return (_b = (_a = getContainerByName(regionName, containerName)) === null || _a === void 0 ? void 0 : _a.classes) !== null && _b !== void 0 ? _b : '';
    }, [getContainerByName]);
    return {
        layout,
        layouts,
        loading,
        error,
        activeTemplate,
        setActiveTemplate,
        getRegionContainers,
        getContainerByName,
        gridStyle,
        responsiveGridStyle,
        regionClasses,
        containerClasses,
        refresh: fetchLayouts,
        orderedRegions,
    };
}
