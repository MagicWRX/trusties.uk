"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCompositeTheme = applyCompositeTheme;
exports.resetCompositeTheme = resetCompositeTheme;
/**
 * Injects CSS custom properties from a ThemeComposite onto <html>.
 * Parent token overrides are applied first; child overrides win (shallow merge).
 * No-ops in SSR (document undefined).
 *
 * SSOT: DOCs/BUSINESS/BUSINESS_THEME_CONTRACT.md Section 9 — Parent-Child Merge
 */
function applyCompositeTheme(theme, mode = 'dark', parentTheme) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (typeof document === 'undefined')
        return;
    const parentOverrides = (_b = (_a = parentTheme === null || parentTheme === void 0 ? void 0 : parentTheme.tokenOverrides) === null || _a === void 0 ? void 0 : _a[mode]) !== null && _b !== void 0 ? _b : {};
    const childOverrides = (_d = (_c = theme.tokenOverrides) === null || _c === void 0 ? void 0 : _c[mode]) !== null && _d !== void 0 ? _d : {};
    const merged = Object.assign(Object.assign({}, parentOverrides), childOverrides);
    const root = document.documentElement;
    for (const [key, value] of Object.entries(merged)) {
        root.style.setProperty(key.startsWith('--') ? key : `--${key}`, value);
    }
    // Font family injection
    const primaryFont = (_f = (_e = theme.fontSelection) === null || _e === void 0 ? void 0 : _e.primary) === null || _f === void 0 ? void 0 : _f.family;
    if (primaryFont) {
        root.style.setProperty('--font-primary', primaryFont);
    }
    // Color token injection from colorPalette
    const { primary, accent } = (_g = theme.colorPalette) !== null && _g !== void 0 ? _g : {};
    if (primary)
        root.style.setProperty('--preview-primary', primary);
    if (accent)
        root.style.setProperty('--preview-accent', accent);
    root.setAttribute('data-applied-theme', theme.name);
}
/**
 * Remove all inline CSS vars set by applyCompositeTheme.
 * Resets the applied-theme marker.
 */
function resetCompositeTheme() {
    if (typeof document === 'undefined')
        return;
    const root = document.documentElement;
    root.removeAttribute('style');
    root.removeAttribute('data-applied-theme');
}
