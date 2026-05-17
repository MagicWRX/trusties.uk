export type ThemeMode = 'light' | 'dark';
export type ThemePref = ThemeMode | 'system';
export type AppSkin = string;
export type ToolSurface = 'auto' | 'card' | 'transparent';
export type ThemeState = {
    themePref: ThemePref;
    appliedTheme: ThemeMode;
    appSkin: AppSkin;
    toolSurface: ToolSurface;
};
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
export default function useTheme(): ThemeState & {
    setThemePref: (pref: ThemePref) => void;
    setAppSkin: (skin: AppSkin) => void;
    setToolSurface: (surface: ToolSurface) => void;
};
export type PlatformBrand = {
    slug: string;
    displayName: string;
    brandColor: string | null;
    brandTailwindClass: string | null;
    icon: string;
    status: string;
};
export type UsePlatformBrandingOptions = {
    /** ADMIN API endpoint, e.g. '/api/admin/ip-platforms' */
    apiEndpoint?: string;
    /** Supabase project URL for direct REST fetch */
    supabaseUrl?: string;
    /** Supabase anon key */
    supabaseAnonKey?: string;
};
export type UsePlatformBrandingReturn = {
    brands: PlatformBrand[];
    /** slug → brand_tailwind_class (falls back to THEME_CONFIG.skinColors if empty) */
    skinColors: Record<string, string>;
    /** slug → display_name */
    skinLabels: Record<string, string>;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};
/**
 * Fetches IP platform brand data from ADMIN DB.
 * Returns DB-driven slugs, display names, and Tailwind color classes.
 * Falls back to static THEME_CONFIG values when no credentials provided or fetch fails.
 *
 * TASK-029 Step 5: Replaces hardcoded SKIN_COLORS / THEME_CONFIG.skinColors usage.
 * @see ADMIN/app/api/admin/ip-platforms/route.ts
 */
export declare function usePlatformBranding(options?: UsePlatformBrandingOptions): UsePlatformBrandingReturn;
export type UseDynamicThemeOptions = {
    /** ADMIN Supabase URL to fetch composite theme contract */
    supabaseUrl?: string;
    /** ADMIN Supabase anon key */
    supabaseAnonKey?: string;
};
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
export declare function useDynamicTheme(ipSlug: AppSkin, options?: UseDynamicThemeOptions): {
    loaded: boolean;
    error: string | null;
};
export declare const THEME_CONFIG: {
    skins: readonly ["hub", "admin", "magicwrx", "pix", "pixelextreme", "mxn", "ams"];
    skinLabels: {
        hub: string;
        admin: string;
        magicwrx: string;
        pix: string;
        pixelextreme: string;
        mxn: string;
        ams: string;
    };
    skinColors: {
        hub: string;
        admin: string;
        magicwrx: string;
        pix: string;
        pixelextreme: string;
        mxn: string;
        ams: string;
    };
};
export declare const MAGICWRX_THEME_CONTRACT: {
    name: string;
    gradient: {
        from: string;
        to: string;
        css: string;
    };
    colors: {
        primary: string;
        secondary: string;
        black: string;
        white: string;
    };
    usage: {
        heroCallout: string;
        heroCards: string;
        belowHeroBackground: string;
        belowHeroCards: string;
        textOnPrimary: string;
    };
    footerBar: {
        background: string;
        text: string;
        usage: string;
    };
};
//# sourceMappingURL=useTheme.d.ts.map