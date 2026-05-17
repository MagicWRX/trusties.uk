"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchThemeContract = fetchThemeContract;
/**
 * Server-side theme contract fetching.
 * DO NOT import this in client components — server-only.
 *
 * Fetches the theme contract for a given IP from Supabase.
 * Falls back to null on error (graceful degradation to theme-manager localStorage defaults).
 *
 * SSOT: DOCs/BUSINESS/BUSINESS_THEME_CONTRACT.md Section 7
 */
const ThemeContract_1 = require("../types/ThemeContract");
/**
 * Fetch a theme contract from Supabase by IP slug.
 *
 * @param ipSlug - The IP identifier (e.g. 'admin', 'mxn', 'magicwrx')
 * @param supabaseUrl - The Supabase project URL (NEXT_PUBLIC_SUPABASE_URL)
 * @param supabaseAnonKey - The Supabase anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
 * @returns ThemeContract or null on error
 *
 * Usage in Server Components:
 * ```tsx
 * const contract = await fetchThemeContract('mxn', process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
 * ```
 */
async function fetchThemeContract(ipSlug, supabaseUrl, supabaseAnonKey) {
    const url = supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = supabaseAnonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
        console.warn('[theme-manager] Missing Supabase credentials for fetchThemeContract');
        return null;
    }
    try {
        // Build fetch options — Next.js extends RequestInit with a `next` key for caching.
        // We assign it dynamically to avoid TS errors in non-Next.js contexts.
        const fetchOptions = {
            headers: {
                apikey: key,
                Authorization: `Bearer ${key}`,
                'Content-Type': 'application/json',
            },
            cache: 'force-cache',
        };
        fetchOptions.next = { revalidate: 3600 };
        // 1. Try to find the mapped theme from tenant_child_sites (Option B)
        const tenantResponse = await fetch(`${url}/rest/v1/tenant_child_sites?slug=eq.${encodeURIComponent(ipSlug)}&select=*,theme_contracts(*)&limit=1`, fetchOptions);
        if (tenantResponse.ok) {
            const tenantRows = await tenantResponse.json();
            if (Array.isArray(tenantRows) && tenantRows.length > 0 && tenantRows[0].theme_contracts) {
                return (0, ThemeContract_1.mapDbRowToThemeContract)(tenantRows[0].theme_contracts);
            }
        }
        // 2. Try to find the mapped theme from ip_platforms (Universal Theme adoption)
        const ipResponse = await fetch(`${url}/rest/v1/ip_platforms?slug=eq.${encodeURIComponent(ipSlug)}&select=*,theme_contracts(*)&limit=1`, fetchOptions);
        if (ipResponse.ok) {
            const ipRows = await ipResponse.json();
            if (Array.isArray(ipRows) && ipRows.length > 0 && ipRows[0].theme_contracts) {
                return (0, ThemeContract_1.mapDbRowToThemeContract)(ipRows[0].theme_contracts);
            }
        }
        // 3. Fallback: Direct lookup by ip_slug (legacy logic)
        const response = await fetch(`${url}/rest/v1/theme_contracts?ip_slug=eq.${encodeURIComponent(ipSlug)}&status=eq.active&limit=1`, fetchOptions);
        if (!response.ok) {
            console.warn(`[theme-manager] Failed to fetch theme contract for "${ipSlug}": ${response.status}`);
            return null;
        }
        const rows = await response.json();
        if (!Array.isArray(rows) || rows.length === 0) {
            return null;
        }
        return (0, ThemeContract_1.mapDbRowToThemeContract)(rows[0]);
    }
    catch (error) {
        console.warn(`[theme-manager] Error fetching theme contract for "${ipSlug}":`, error);
        return null;
    }
}
