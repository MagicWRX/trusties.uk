"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLayoutContracts = fetchLayoutContracts;
exports.fetchLayoutContract = fetchLayoutContract;
/**
 * Server-side layout contract fetching.
 * DO NOT import this in client components — server-only.
 *
 * Fetches layout contracts and their containers from Supabase.
 * Falls back to null on error (graceful degradation).
 *
 * DB SSOT: Supabase layout_contracts + theme_containers tables (migration 014)
 */
const LayoutContract_1 = require("../types/LayoutContract");
/**
 * Build fetch options for Supabase REST API (Next.js compatible).
 */
function buildFetchOptions(key) {
    const opts = {
        headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
        },
        cache: 'force-cache',
    };
    opts.next = { revalidate: 3600 };
    return opts;
}
/**
 * Fetch all layout contracts for a given IP slug, with their containers.
 *
 * @param ipSlug - The IP identifier (e.g. 'pixelextreme', 'admin', 'mxn')
 * @param supabaseUrl - Supabase project URL
 * @param supabaseAnonKey - Supabase anon key
 * @returns Array of LayoutContracts with populated containers, or empty array on error
 */
async function fetchLayoutContracts(ipSlug, supabaseUrl, supabaseAnonKey) {
    var _a;
    const url = supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = supabaseAnonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
        console.warn('[theme-manager] Missing Supabase credentials for fetchLayoutContracts');
        return [];
    }
    try {
        const fetchOptions = buildFetchOptions(key);
        let layoutRows = [];
        // 1. Try tenant_child_sites
        const tenantRes = await fetch(`${url}/rest/v1/tenant_child_sites?slug=eq.${encodeURIComponent(ipSlug)}&select=*,layout_contracts(*)&limit=1`, fetchOptions);
        if (tenantRes.ok) {
            const rows = await tenantRes.json();
            if (Array.isArray(rows) && rows.length > 0 && rows[0].layout_contracts) {
                layoutRows = [rows[0].layout_contracts];
            }
        }
        // 2. Try ip_platforms
        if (layoutRows.length === 0) {
            const ipRes = await fetch(`${url}/rest/v1/ip_platforms?slug=eq.${encodeURIComponent(ipSlug)}&select=*,layout_contracts(*)&limit=1`, fetchOptions);
            if (ipRes.ok) {
                const rows = await ipRes.json();
                if (Array.isArray(rows) && rows.length > 0 && rows[0].layout_contracts) {
                    layoutRows = [rows[0].layout_contracts];
                }
            }
        }
        // 3. Fallback: Direct lookup by ip_slug
        if (layoutRows.length === 0) {
            const layoutRes = await fetch(`${url}/rest/v1/layout_contracts?ip_slug=eq.${encodeURIComponent(ipSlug)}&status=eq.active&order=template_name`, fetchOptions);
            if (layoutRes.ok) {
                const rows = await layoutRes.json();
                if (Array.isArray(rows) && rows.length > 0) {
                    layoutRows = rows;
                }
            }
        }
        if (layoutRows.length === 0) {
            return [];
        }
        // Fetch all containers for these layouts
        const layoutIds = layoutRows.map((r) => r.id);
        const idsFilter = layoutIds.map((id) => `"${id}"`).join(',');
        const containerRes = await fetch(`${url}/rest/v1/theme_containers?layout_id=in.(${idsFilter})&status=eq.active&order=sort_order`, fetchOptions);
        let containers = [];
        if (containerRes.ok) {
            const containerRows = await containerRes.json();
            if (Array.isArray(containerRows)) {
                containers = containerRows.map(LayoutContract_1.mapDbRowToThemeContainer);
            }
        }
        // Group containers by layout_id
        const containersByLayout = new Map();
        for (const c of containers) {
            const existing = (_a = containersByLayout.get(c.layoutId)) !== null && _a !== void 0 ? _a : [];
            existing.push(c);
            containersByLayout.set(c.layoutId, existing);
        }
        // Build LayoutContract objects with their containers
        return layoutRows.map((row) => { var _a; return (0, LayoutContract_1.mapDbRowToLayoutContract)(row, (_a = containersByLayout.get(row.id)) !== null && _a !== void 0 ? _a : []); });
    }
    catch (error) {
        console.warn(`[theme-manager] Error fetching layout contracts for "${ipSlug}":`, error);
        return [];
    }
}
/**
 * Fetch a single layout contract by IP slug and template name.
 *
 * @param ipSlug - The IP identifier
 * @param templateName - The template name (e.g. 'pixel-editor-3panel')
 * @returns LayoutContract with containers, or null
 */
async function fetchLayoutContract(ipSlug, templateName, supabaseUrl, supabaseAnonKey) {
    const layouts = await fetchLayoutContracts(ipSlug, supabaseUrl, supabaseAnonKey);
    if (!layouts || layouts.length === 0)
        return null;
    // Since a tenant site might equip a specific layout, it may not match the old 'templateName' expected by the caller.
    // We prefer the exact match by templateName, but fallback to the first returned layout.
    const exactMatch = layouts.find(l => l.templateName === templateName);
    return exactMatch || layouts[0];
}
