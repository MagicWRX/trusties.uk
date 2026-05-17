/**
 * ThemeComposite — Full composite theme type for the themes table (migration 015).
 *
 * A ThemeComposite stores a named, versioned theme including:
 *   - token overrides (CSS vars)
 *   - font selection
 *   - color palette
 *   - button variants
 *   - design settings
 *   - layout template reference + overrides
 *   - page definitions
 *   - site structure / navigation
 *   - saved components
 *
 * Governance model:
 *   - ADMIN creates parent templates (ipSlug = null, isParentTemplate = true).
 *   - Each IP child inherits (parentThemeId set) or stands alone.
 *   - Siblings are unaware of each other.
 *
 * SSOT: DOCs/BUSINESS/BUSINESS_THEME_CONTRACT.md Section 10
 * DB:   ADMIN Supabase `themes` table (migration 015)
 */
export interface FontSelection {
    family: string;
    weights: number[];
    googleFontsUrl?: string;
}
export interface ColorPalette {
    /** Hex color values — design data, mapped to CSS tokens at apply-time */
    colors: string[];
    primary: string;
    accent: string;
}
export interface ThemeButtonVariant {
    name: string;
    variant: string;
    size: string;
    classes: string;
}
export interface DesignSettings {
    borderRadius?: string;
    shadows?: Record<string, string>;
    effects?: Record<string, unknown>;
    animations?: Record<string, string>;
}
export interface ThemePage {
    id: string;
    name: string;
    /** 'landing' | 'blog' | 'product' | 'custom' | ... */
    type: string;
    slug: string;
    template?: string;
    sections: unknown[];
}
export interface ThemeComponent {
    name: string;
    /** 'card' | 'header' | 'footer' | 'navbar' | 'blog' | ... */
    type: string;
    props: Record<string, unknown>;
    classes: string;
}
/**
 * Aggregated design state produced by Layer 1 tools and consumed by Layer 2.
 * Each Layer 1 tool fires `onStateChange(partial)` with its own key.
 * Layer 2 (layout-manager, hub demo) merges partials into one ThemeDesignState.
 *
 * SSOT: DOCs/BUSINESS/BUSINESS_THEME_CONTRACT.md Section 9
 */
export interface ThemeDesignState {
    fontSelection?: {
        primary?: FontSelection;
        secondary?: FontSelection;
    };
    colorPalette?: Partial<ColorPalette>;
    buttonVariants?: ThemeButtonVariant[];
    designSettings?: Partial<DesignSettings>;
}
export interface ThemeComposite {
    id: string;
    name: string;
    displayName?: string;
    description?: string;
    thumbnailUrl?: string;
    tags: string[];
    version: string;
    status: 'draft' | 'active' | 'deprecated';
    /** null = ADMIN universal parent template */
    ipSlug?: string | null;
    isParentTemplate: boolean;
    /** null = standalone (no inheritance / broke-away) */
    parentThemeId?: string | null;
    /** { light: { "--primary": "...", ... }, dark: { ... } } */
    tokenOverrides: Record<string, Record<string, string>>;
    fontSelection: {
        primary?: FontSelection;
        secondary?: FontSelection;
    };
    colorPalette: Partial<ColorPalette>;
    buttonVariants: ThemeButtonVariant[];
    designSettings: Partial<DesignSettings>;
    layoutTemplate?: string | null;
    layoutOverrides: Record<string, unknown>;
    pages: ThemePage[];
    siteStructure: Record<string, unknown>;
    components: ThemeComponent[];
    createdAt: string;
    updatedAt: string;
}
export declare function mapDbRowToThemeComposite(row: Record<string, any>): ThemeComposite;
//# sourceMappingURL=Theme.d.ts.map