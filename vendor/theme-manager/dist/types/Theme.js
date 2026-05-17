"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDbRowToThemeComposite = mapDbRowToThemeComposite;
// ─── DB Row Mapper ────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbRowToThemeComposite(row) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    return {
        id: row.id,
        name: row.name,
        displayName: (_a = row.display_name) !== null && _a !== void 0 ? _a : undefined,
        description: (_b = row.description) !== null && _b !== void 0 ? _b : undefined,
        thumbnailUrl: (_c = row.thumbnail_url) !== null && _c !== void 0 ? _c : undefined,
        tags: (_d = row.tags) !== null && _d !== void 0 ? _d : [],
        version: (_e = row.version) !== null && _e !== void 0 ? _e : '1.0.0',
        status: (_f = row.status) !== null && _f !== void 0 ? _f : 'draft',
        ipSlug: (_g = row.ip_slug) !== null && _g !== void 0 ? _g : null,
        isParentTemplate: (_h = row.is_parent_template) !== null && _h !== void 0 ? _h : false,
        parentThemeId: (_j = row.parent_theme_id) !== null && _j !== void 0 ? _j : null,
        tokenOverrides: (_k = row.token_overrides) !== null && _k !== void 0 ? _k : {},
        fontSelection: (_l = row.font_selection) !== null && _l !== void 0 ? _l : {},
        colorPalette: (_m = row.color_palette) !== null && _m !== void 0 ? _m : {},
        buttonVariants: (_o = row.button_variants) !== null && _o !== void 0 ? _o : [],
        designSettings: (_p = row.design_settings) !== null && _p !== void 0 ? _p : {},
        layoutTemplate: (_q = row.layout_template) !== null && _q !== void 0 ? _q : null,
        layoutOverrides: (_r = row.layout_overrides) !== null && _r !== void 0 ? _r : {},
        pages: (_s = row.pages) !== null && _s !== void 0 ? _s : [],
        siteStructure: (_t = row.site_structure) !== null && _t !== void 0 ? _t : {},
        components: (_u = row.components) !== null && _u !== void 0 ? _u : [],
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
