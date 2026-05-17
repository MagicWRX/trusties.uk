import type { ThemeComposite } from '../types/Theme';
/**
 * Injects CSS custom properties from a ThemeComposite onto <html>.
 * Parent token overrides are applied first; child overrides win (shallow merge).
 * No-ops in SSR (document undefined).
 *
 * SSOT: DOCs/BUSINESS/BUSINESS_THEME_CONTRACT.md Section 9 — Parent-Child Merge
 */
export declare function applyCompositeTheme(theme: ThemeComposite, mode?: 'light' | 'dark', parentTheme?: ThemeComposite): void;
/**
 * Remove all inline CSS vars set by applyCompositeTheme.
 * Resets the applied-theme marker.
 */
export declare function resetCompositeTheme(): void;
//# sourceMappingURL=applyTheme.d.ts.map