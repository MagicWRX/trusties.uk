"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAGICWRX_THEME_CONTRACT = exports.THEME_CONFIG = void 0;
exports.default = useTheme;
exports.usePlatformBranding = usePlatformBranding;
exports.useDynamicTheme = useDynamicTheme;
const react_1 = require("react");
const STORAGE_KEYS = {
    themePref: 'mw.themePref',
    appSkin: 'mw.appSkin',
    toolSurface: 'mw.toolSurface',
};
function isThemeMode(value) {
    return value === 'light' || value === 'dark';
}
function isThemePref(value) {
    return value === 'system' || isThemeMode(value);
}
function isAppSkin(value) {
    return typeof value === 'string' && value.length > 0;
}
function isToolSurface(value) {
    return value === 'auto' || value === 'card' || value === 'transparent';
}
function getSystemTheme() {
    const w = globalThis.window;
    if (!(w === null || w === void 0 ? void 0 : w.matchMedia))
        return 'dark';
    return w.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
/**
 * Theme Token Definitions - SSOT for all IP themes
 * Each skin has light and dark variants
 */
function getThemeTokens(appSkin, mode) {
    // Professional dark base (shared across dark themes)
    const darkBase = {
        '--background': '0 0% 6%',
        '--foreground': '0 0% 98%',
        '--card': '0 0% 9%',
        '--card-foreground': '0 0% 98%',
        '--popover': '0 0% 9%',
        '--popover-foreground': '0 0% 98%',
        '--muted': '0 0% 15%',
        '--muted-foreground': '0 0% 64%',
        '--border': '0 0% 15%',
        '--input': '0 0% 15%',
        '--radius': '0.5rem',
    };
    // Professional light base
    const lightBase = {
        '--background': '0 0% 100%',
        '--foreground': '0 0% 9%',
        '--card': '0 0% 100%',
        '--card-foreground': '0 0% 9%',
        '--popover': '0 0% 100%',
        '--popover-foreground': '0 0% 9%',
        '--muted': '0 0% 96%',
        '--muted-foreground': '0 0% 45%',
        '--border': '0 0% 90%',
        '--input': '0 0% 90%',
        '--radius': '0.5rem',
    };
    // === ADMIN - Indigo accent ===
    if (appSkin === 'admin') {
        if (mode === 'dark') {
            return Object.assign(Object.assign({}, darkBase), { '--primary': '239 84% 67%', '--primary-foreground': '0 0% 100%', '--secondary': '0 0% 15%', '--secondary-foreground': '0 0% 98%', '--accent': '239 84% 67%', '--accent-foreground': '0 0% 100%', '--destructive': '0 84% 60%', '--destructive-foreground': '0 0% 98%', '--ring': '239 84% 67%' });
        }
        return Object.assign(Object.assign({}, lightBase), { '--primary': '239 84% 67%', '--primary-foreground': '0 0% 100%', '--secondary': '0 0% 96%', '--secondary-foreground': '0 0% 9%', '--accent': '239 84% 67%', '--accent-foreground': '0 0% 100%', '--destructive': '0 84% 60%', '--destructive-foreground': '0 0% 98%', '--ring': '239 84% 67%' });
    }
    // === MAGICWRX - Blue/Purple accent ===
    if (appSkin === 'magicwrx') {
        if (mode === 'dark') {
            return Object.assign(Object.assign({}, darkBase), { '--primary': '217 91% 60%', '--primary-foreground': '0 0% 100%', '--secondary': '263 70% 50%', '--secondary-foreground': '0 0% 98%', '--accent': '217 91% 60%', '--accent-foreground': '0 0% 100%', '--magicwrx-footer-bg': '#000000', '--magicwrx-footer-fg': '#ffffff', '--destructive': '0 63% 31%', '--destructive-foreground': '0 0% 98%', '--ring': '217 91% 60%' });
        }
        return Object.assign(Object.assign({}, lightBase), { '--primary': '221 83% 53%', '--primary-foreground': '0 0% 100%', '--secondary': '262 83% 58%', '--secondary-foreground': '0 0% 100%', '--accent': '221 83% 53%', '--accent-foreground': '0 0% 100%', '--magicwrx-footer-bg': '#000000', '--magicwrx-footer-fg': '#ffffff', '--destructive': '0 84% 60%', '--destructive-foreground': '0 0% 98%', '--ring': '221 83% 53%' });
    }
    // === PIX - Cyan/Teal accent (media-focused) ===
    if (appSkin === 'pix') {
        if (mode === 'dark') {
            return Object.assign(Object.assign({}, darkBase), { '--primary': '187 85% 53%', '--primary-foreground': '0 0% 9%', '--secondary': '172 66% 50%', '--secondary-foreground': '0 0% 9%', '--accent': '187 85% 53%', '--accent-foreground': '0 0% 9%', '--destructive': '0 84% 60%', '--destructive-foreground': '0 0% 98%', '--ring': '187 85% 53%' });
        }
        return Object.assign(Object.assign({}, lightBase), { '--primary': '187 85% 43%', '--primary-foreground': '0 0% 100%', '--secondary': '172 66% 40%', '--secondary-foreground': '0 0% 100%', '--accent': '187 85% 43%', '--accent-foreground': '0 0% 100%', '--destructive': '0 84% 60%', '--destructive-foreground': '0 0% 98%', '--ring': '187 85% 43%' });
    }
    // === PIXELEXTREME - Pink/Magenta accent (creative) ===
    if (appSkin === 'pixelextreme') {
        if (mode === 'dark') {
            return Object.assign(Object.assign({}, darkBase), { '--primary': '330 81% 60%', '--primary-foreground': '0 0% 100%', '--secondary': '280 68% 60%', '--secondary-foreground': '0 0% 100%', '--accent': '330 81% 60%', '--accent-foreground': '0 0% 100%', '--destructive': '0 84% 60%', '--destructive-foreground': '0 0% 98%', '--ring': '330 81% 60%' });
        }
        return Object.assign(Object.assign({}, lightBase), { '--primary': '330 81% 50%', '--primary-foreground': '0 0% 100%', '--secondary': '280 68% 50%', '--secondary-foreground': '0 0% 100%', '--accent': '330 81% 50%', '--accent-foreground': '0 0% 100%', '--destructive': '0 84% 60%', '--destructive-foreground': '0 0% 98%', '--ring': '330 81% 50%' });
    }
    // === MXN - Green accent (chat/communication) ===
    if (appSkin === 'mxn') {
        if (mode === 'dark') {
            return Object.assign(Object.assign({}, darkBase), { '--primary': '142 71% 45%', '--primary-foreground': '0 0% 100%', '--secondary': '160 60% 45%', '--secondary-foreground': '0 0% 100%', '--accent': '142 71% 45%', '--accent-foreground': '0 0% 100%', '--destructive': '0 84% 60%', '--destructive-foreground': '0 0% 98%', '--ring': '142 71% 45%' });
        }
        return Object.assign(Object.assign({}, lightBase), { '--primary': '142 71% 35%', '--primary-foreground': '0 0% 100%', '--secondary': '160 60% 35%', '--secondary-foreground': '0 0% 100%', '--accent': '142 71% 35%', '--accent-foreground': '0 0% 100%', '--destructive': '0 84% 60%', '--destructive-foreground': '0 0% 98%', '--ring': '142 71% 35%' });
    }
    // === AMS (AmazinglyStrange) - Foam Green / Purple / Yellow brand palette ===
    if (appSkin === 'ams') {
        if (mode === 'dark') {
            return {
                // AMS brand background: deep blue
                '--background': '201 100% 35%', // #0069B1 - AMS blue
                '--foreground': '0 0% 100%', // White text
                '--card': '0 0% 7%', // #111111 - card surface
                '--card-foreground': '0 0% 100%',
                '--popover': '0 0% 9%',
                '--popover-foreground': '0 0% 100%',
                '--muted': '201 60% 22%', // Deep blue-muted
                '--muted-foreground': '0 0% 65%',
                '--border': '0 0% 20%',
                '--input': '0 0% 20%',
                '--radius': '0.5rem',
                // Brand accent colors
                '--primary': '168 65% 56%', // #47D7AC - Foam Green
                '--primary-foreground': '0 0% 100%',
                '--secondary': '301 67% 30%', // #981D97 - Purple
                '--secondary-foreground': '0 0% 100%',
                '--accent': '50 100% 50%', // #FEDB00 - Yellow
                '--accent-foreground': '0 0% 0%',
                '--destructive': '0 84% 60%',
                '--destructive-foreground': '0 0% 98%',
                '--ring': '168 65% 56%', // Foam green focus ring
            };
        }
        return {
            // AMS light — softer blue tint, same brand accents
            '--background': '201 60% 96%', // Very light blue-white
            '--foreground': '201 50% 12%', // Dark blue text
            '--card': '0 0% 100%',
            '--card-foreground': '201 50% 12%',
            '--popover': '0 0% 100%',
            '--popover-foreground': '201 50% 12%',
            '--muted': '201 30% 92%',
            '--muted-foreground': '201 20% 46%',
            '--border': '201 20% 82%',
            '--input': '201 20% 82%',
            '--radius': '0.5rem',
            '--primary': '168 65% 40%', // Darker foam green for contrast
            '--primary-foreground': '0 0% 100%',
            '--secondary': '301 67% 30%', // Purple
            '--secondary-foreground': '0 0% 100%',
            '--accent': '50 100% 42%', // Darker yellow for readability
            '--accent-foreground': '0 0% 0%',
            '--destructive': '0 84% 55%',
            '--destructive-foreground': '0 0% 98%',
            '--ring': '168 65% 40%',
        };
    }
    // === TRUSTIES — Indigo/Violet accent (AI assistant, dark-first) ===
    if (appSkin === 'trusties') {
        if (mode === 'dark') {
            return {
                '--background': '222 47% 6%',
                '--foreground': '210 40% 96%',
                '--card': '222 47% 9%',
                '--card-foreground': '210 40% 96%',
                '--popover': '222 47% 9%',
                '--popover-foreground': '210 40% 96%',
                '--muted': '215 28% 17%',
                '--muted-foreground': '215 20% 65%',
                '--border': '215 28% 15%',
                '--input': '215 28% 15%',
                '--radius': '0.75rem',
                '--primary': '231 96% 63%', // trusties-500 indigo-blue
                '--primary-foreground': '0 0% 100%',
                '--secondary': '262 80% 60%', // violet
                '--secondary-foreground': '0 0% 100%',
                '--accent': '262 80% 60%',
                '--accent-foreground': '0 0% 100%',
                '--destructive': '0 84% 60%',
                '--destructive-foreground': '0 0% 98%',
                '--ring': '231 96% 63%',
            };
        }
        return {
            '--background': '222 40% 98%',
            '--foreground': '222 47% 9%',
            '--card': '0 0% 100%',
            '--card-foreground': '222 47% 9%',
            '--popover': '0 0% 100%',
            '--popover-foreground': '222 47% 9%',
            '--muted': '215 28% 93%',
            '--muted-foreground': '215 28% 42%',
            '--border': '215 28% 87%',
            '--input': '215 28% 87%',
            '--radius': '0.75rem',
            '--primary': '231 96% 55%',
            '--primary-foreground': '0 0% 100%',
            '--secondary': '262 80% 52%',
            '--secondary-foreground': '0 0% 100%',
            '--accent': '262 80% 52%',
            '--accent-foreground': '0 0% 100%',
            '--destructive': '0 84% 60%',
            '--destructive-foreground': '0 0% 98%',
            '--ring': '231 96% 55%',
        };
    }
    // === HUB (default) - Cyan accent ===
    if (mode === 'dark') {
        return Object.assign(Object.assign({}, darkBase), { '--primary': '199 95% 74%', '--primary-foreground': '0 0% 9%', '--secondary': '0 0% 15%', '--secondary-foreground': '0 0% 98%', '--accent': '199 95% 74%', '--accent-foreground': '0 0% 9%', '--destructive': '0 63% 31%', '--destructive-foreground': '0 0% 98%', '--ring': '199 95% 74%' });
    }
    return Object.assign(Object.assign({}, lightBase), { '--primary': '199 95% 45%', '--primary-foreground': '0 0% 100%', '--secondary': '0 0% 96%', '--secondary-foreground': '0 0% 9%', '--accent': '199 95% 74%', '--accent-foreground': '0 0% 9%', '--destructive': '0 84% 60%', '--destructive-foreground': '0 0% 98%', '--ring': '199 95% 45%' });
}
function applyThemeToDocument(next) {
    const html = document.documentElement;
    html.dataset.theme = next.appliedTheme;
    html.dataset.themePref = next.themePref;
    html.dataset.app = next.appSkin;
    html.dataset.toolSurface = next.toolSurface;
    // Set color-scheme for native elements
    html.style.colorScheme = next.appliedTheme;
    const tokens = getThemeTokens(next.appSkin, next.appliedTheme);
    for (const [key, value] of Object.entries(tokens)) {
        if (!key.startsWith('--'))
            continue;
        html.style.setProperty(key, value);
    }
}
function loadInitialState() {
    var _a, _b, _c, _d, _e;
    const defaults = {
        themePref: 'system',
        appSkin: 'hub',
        toolSurface: 'auto',
    };
    try {
        const prefRaw = (_a = globalThis.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(STORAGE_KEYS.themePref);
        const skinRaw = (_b = globalThis.localStorage) === null || _b === void 0 ? void 0 : _b.getItem(STORAGE_KEYS.appSkin);
        const surfaceRaw = (_c = globalThis.localStorage) === null || _c === void 0 ? void 0 : _c.getItem(STORAGE_KEYS.toolSurface);
        const themePref = isThemePref(prefRaw) ? prefRaw : defaults.themePref;
        const appSkin = isAppSkin(skinRaw) ? skinRaw : defaults.appSkin;
        const toolSurface = isToolSurface(surfaceRaw) ? surfaceRaw : defaults.toolSurface;
        // Back-compat: old keys
        const legacyTheme = (_d = globalThis.localStorage) === null || _d === void 0 ? void 0 : _d.getItem('hub-theme');
        const legacySurface = (_e = globalThis.localStorage) === null || _e === void 0 ? void 0 : _e.getItem('tool-surface');
        const themePrefCompat = isThemeMode(legacyTheme) ? legacyTheme : themePref;
        const toolSurfaceCompat = legacySurface === 'transparent' ? 'transparent' : toolSurface;
        return { themePref: themePrefCompat, appSkin, toolSurface: toolSurfaceCompat };
    }
    catch (_f) {
        return defaults;
    }
}
/**
 * Client-side theme hook providing skin switching, mode toggling, and tool surface control.
 *
 * **TASK-022 Note:** The Supabase `theme_contracts` table is the SSOT for IP skin tokens.
 * Server Components fetch the contract at SSR time via `fetchThemeContract()` and inject
 * CSS vars on `<html>`. This hook sets the initial skin as a **client-side fallback only**
 * and handles runtime mode/skin switching. The DB contract governs the canonical token values.
 *
 * @see DOCs/BUSINESS/BUSINESS_THEME_CONTRACT.md Section 8
 * @see SHARED/theme-manager/src/server/fetchThemeContract.ts
 */
function useTheme() {
    const [themePref, setThemePrefState] = (0, react_1.useState)('system');
    const [appSkin, setAppSkinState] = (0, react_1.useState)('hub');
    const [toolSurface, setToolSurfaceState] = (0, react_1.useState)('auto');
    (0, react_1.useEffect)(() => {
        const initial = loadInitialState();
        setThemePrefState(initial.themePref);
        setAppSkinState(initial.appSkin);
        setToolSurfaceState(initial.toolSurface);
    }, []);
    const appliedTheme = (0, react_1.useMemo)(() => {
        return themePref === 'system' ? getSystemTheme() : themePref;
    }, [themePref]);
    (0, react_1.useEffect)(() => {
        var _a, _b, _c;
        try {
            (_a = globalThis.localStorage) === null || _a === void 0 ? void 0 : _a.setItem(STORAGE_KEYS.themePref, themePref);
            (_b = globalThis.localStorage) === null || _b === void 0 ? void 0 : _b.setItem(STORAGE_KEYS.appSkin, appSkin);
            (_c = globalThis.localStorage) === null || _c === void 0 ? void 0 : _c.setItem(STORAGE_KEYS.toolSurface, toolSurface);
        }
        catch (_d) {
            // ignore
        }
        applyThemeToDocument({ themePref, appliedTheme, appSkin, toolSurface });
    }, [themePref, appliedTheme, appSkin, toolSurface]);
    (0, react_1.useEffect)(() => {
        if (themePref !== 'system')
            return;
        const w = globalThis.window;
        if (!(w === null || w === void 0 ? void 0 : w.matchMedia))
            return;
        const media = w.matchMedia('(prefers-color-scheme: dark)');
        const onChange = () => {
            applyThemeToDocument({ themePref, appliedTheme: getSystemTheme(), appSkin, toolSurface });
        };
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, [themePref, appSkin, toolSurface]);
    return {
        themePref,
        appliedTheme,
        appSkin,
        toolSurface,
        setThemePref: setThemePrefState,
        setAppSkin: setAppSkinState,
        setToolSurface: setToolSurfaceState,
    };
}
/**
 * Fetches IP platform brand data from ADMIN DB.
 * Returns DB-driven slugs, display names, and Tailwind color classes.
 * Falls back to static THEME_CONFIG values when no credentials provided or fetch fails.
 *
 * TASK-029 Step 5: Replaces hardcoded SKIN_COLORS / THEME_CONFIG.skinColors usage.
 * @see ADMIN/app/api/admin/ip-platforms/route.ts
 */
function usePlatformBranding(options = {}) {
    const { apiEndpoint, supabaseUrl, supabaseAnonKey } = options;
    const [brands, setBrands] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(!!(apiEndpoint || (supabaseUrl && supabaseAnonKey)));
    const [error, setError] = (0, react_1.useState)(null);
    const fetchBrands = async () => {
        var _a;
        if (!apiEndpoint && !(supabaseUrl && supabaseAnonKey)) {
            // No credentials — stay on static fallback
            return;
        }
        setLoading(true);
        setError(null);
        try {
            let rows = [];
            if (apiEndpoint) {
                const res = await fetch(apiEndpoint);
                if (!res.ok)
                    throw new Error(`API error ${res.status}`);
                const json = await res.json();
                rows = (_a = json.platforms) !== null && _a !== void 0 ? _a : [];
            }
            else if (supabaseUrl && supabaseAnonKey) {
                const res = await fetch(`${supabaseUrl}/rest/v1/ip_platforms?order=sort_order.asc&select=slug,display_name,icon,status,brand_color,brand_tailwind_class`, {
                    headers: {
                        apikey: supabaseAnonKey,
                        Authorization: `Bearer ${supabaseAnonKey}`,
                    },
                });
                if (!res.ok)
                    throw new Error(`Supabase error ${res.status}`);
                rows = await res.json();
            }
            setBrands(rows.map((r) => {
                var _a, _b, _c, _d, _e;
                return ({
                    slug: r.slug,
                    displayName: (_a = r.display_name) !== null && _a !== void 0 ? _a : r.slug,
                    brandColor: (_b = r.brand_color) !== null && _b !== void 0 ? _b : null,
                    brandTailwindClass: (_c = r.brand_tailwind_class) !== null && _c !== void 0 ? _c : null,
                    icon: (_d = r.icon) !== null && _d !== void 0 ? _d : '',
                    status: (_e = r.status) !== null && _e !== void 0 ? _e : 'active',
                });
            }));
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load platform brands');
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchBrands();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiEndpoint, supabaseUrl, supabaseAnonKey]);
    const skinColors = (0, react_1.useMemo)(() => {
        var _a, _b;
        if (brands.length === 0)
            return Object.assign({}, exports.THEME_CONFIG.skinColors);
        const map = {};
        for (const b of brands) {
            map[b.slug] = (_b = (_a = b.brandTailwindClass) !== null && _a !== void 0 ? _a : exports.THEME_CONFIG.skinColors[b.slug]) !== null && _b !== void 0 ? _b : '';
        }
        return map;
    }, [brands]);
    const skinLabels = (0, react_1.useMemo)(() => {
        if (brands.length === 0)
            return Object.assign({}, exports.THEME_CONFIG.skinLabels);
        const map = {};
        for (const b of brands) {
            map[b.slug] = b.displayName;
        }
        return map;
    }, [brands]);
    return { brands, skinColors, skinLabels, loading, error, refresh: fetchBrands };
}
/**
 * Replaces direct `setAppSkin()` calls in platform ThemeInit components (TASK-029 Step 12).
 *
 * 1. Immediately applies static fallback via `setAppSkin(ipSlug)` for zero-flash startup.
 * 2. Asynchronously fetches the composite theme from Supabase.
 * 3. When loaded → applies DB token overrides via `applyCompositeTheme()`.
 *
 * Progressive: if DB unavailable, the static skin fallback keeps the page styled.
 *
 * @see SHARED/theme-manager/src/lib/applyTheme.ts
 */
function useDynamicTheme(ipSlug, options = {}) {
    const { setAppSkin, appliedTheme } = useTheme();
    const { supabaseUrl, supabaseAnonKey } = options;
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    // Step 1: immediate static fallback
    (0, react_1.useEffect)(() => {
        setAppSkin(ipSlug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ipSlug]);
    // Step 2: async DB override
    (0, react_1.useEffect)(() => {
        if (!supabaseUrl || !supabaseAnonKey)
            return;
        const controller = new AbortController();
        (async () => {
            var _a, _b, _c, _d;
            try {
                const fetchOptions = {
                    headers: {
                        apikey: supabaseAnonKey,
                        Authorization: `Bearer ${supabaseAnonKey}`,
                    },
                    signal: controller.signal,
                };
                // Step A: Resolution Pipeline - Check if Site or Tenant exists to resolve Theme ID
                let targetThemeId = null;
                // 1. Try Top-Level IP Platforms
                const ipRes = await fetch(`${supabaseUrl}/rest/v1/ip_platforms?slug=eq.${ipSlug}&limit=1&select=equipped_theme_id`, fetchOptions);
                if (ipRes.ok) {
                    const ipRows = await ipRes.json();
                    if (ipRows.length > 0 && ipRows[0].equipped_theme_id) {
                        targetThemeId = ipRows[0].equipped_theme_id;
                    }
                }
                // 2. Fallback to Customer Child Tenants
                if (!targetThemeId) {
                    const tenantRes = await fetch(`${supabaseUrl}/rest/v1/tenant_child_sites?slug=eq.${ipSlug}&limit=1&select=equipped_theme_id`, fetchOptions);
                    if (tenantRes.ok) {
                        const tenantRows = await tenantRes.json();
                        if (tenantRows.length > 0 && tenantRows[0].equipped_theme_id) {
                            targetThemeId = tenantRows[0].equipped_theme_id;
                        }
                    }
                }
                // 3. Absolute Legacy Fallback if needed for unmigrated setups
                const themeQuery = targetThemeId
                    ? `id=eq.${targetThemeId}`
                    : `ip_slug=eq.${ipSlug}`;
                // Step B: Fetch the actual theme payload
                const res = await fetch(`${supabaseUrl}/rest/v1/themes?${themeQuery}&status=eq.active&order=updated_at.desc&limit=1&select=*`, fetchOptions);
                if (!res.ok)
                    throw new Error(`Supabase error ${res.status}`);
                const rows = await res.json();
                if (!rows.length)
                    return;
                const row = rows[0];
                // Inline applyCompositeTheme without importing to avoid SSR boundaries
                const tokenOverrides = (_a = row.token_overrides) !== null && _a !== void 0 ? _a : {};
                const modeOverrides = (_b = tokenOverrides[appliedTheme]) !== null && _b !== void 0 ? _b : {};
                if (typeof document !== 'undefined' && Object.keys(modeOverrides).length > 0) {
                    const root = document.documentElement;
                    for (const [key, value] of Object.entries(modeOverrides)) {
                        root.style.setProperty(key.startsWith('--') ? key : `--${key}`, value);
                    }
                    const fontFamily = (_d = (_c = row.font_selection) === null || _c === void 0 ? void 0 : _c.primary) === null || _d === void 0 ? void 0 : _d.family;
                    if (fontFamily)
                        root.style.setProperty('--font-primary', fontFamily);
                    root.setAttribute('data-applied-theme', row.name);
                }
                setLoaded(true);
            }
            catch (err) {
                if (err.name === 'AbortError')
                    return;
                setError(err instanceof Error ? err.message : 'Theme fetch failed');
            }
        })();
        return () => controller.abort();
    }, [ipSlug, supabaseUrl, supabaseAnonKey, appliedTheme]);
    return { loaded, error };
}
// Export theme config for external use
exports.THEME_CONFIG = {
    skins: ['hub', 'admin', 'magicwrx', 'pix', 'pixelextreme', 'mxn', 'ams'],
    skinLabels: {
        hub: 'Hub',
        admin: 'Admin',
        magicwrx: 'MagicWRX',
        pix: 'Pix',
        pixelextreme: 'PixelExtreme',
        mxn: 'MXN.Chat',
        ams: 'AmazinglyStrange',
    },
    skinColors: {
        hub: '#06b6d4', // Cyan
        admin: '#6366f1', // Indigo
        magicwrx: '#3b82f6', // Blue
        pix: '#14b8a6', // Teal
        pixelextreme: '#ec4899', // Pink
        mxn: '#22c55e', // Green
        ams: '#47d7ac', // Foam green
    },
};
// Extended theme contract for MagicWRX (SSOT for MagicWRX visual identity)
exports.MAGICWRX_THEME_CONTRACT = {
    name: 'magicwrx',
    gradient: {
        from: '#3b82f6', // blue-500
        to: '#8b5cf6', // purple-500
        css: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    },
    colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        black: '#000000',
        white: '#ffffff',
    },
    usage: {
        heroCallout: 'gradient',
        heroCards: 'white',
        belowHeroBackground: 'black',
        belowHeroCards: 'primary',
        textOnPrimary: 'white',
    },
    footerBar: {
        background: '#000000',
        text: '#ffffff',
        usage: 'siteFooter',
    },
};
