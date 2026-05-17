/**
 * ThemeContract — TypeScript interface for the Supabase theme_contracts table.
 * SSOT: DOCs/BUSINESS/BUSINESS_THEME_CONTRACT.md Section 7
 * DB SSOT: Supabase theme_contracts table (migration 013)
 */
export interface ThemeContract {
    ipSlug: string;
    displayName: string;
    regid: string;
    tokens: {
        light: Record<string, string>;
        dark: Record<string, string>;
    };
    layout: {
        spacing?: Record<string, string>;
        radius?: Record<string, string>;
        typography?: Record<string, string>;
    };
    version: string;
    status: 'active' | 'deprecated';
    updatedAt: string;
}
/**
 * Convert a DB row (snake_case) to the ThemeContract interface (camelCase).
 */
export declare function mapDbRowToThemeContract(row: Record<string, unknown>): ThemeContract;
/**
 * Convert ThemeContract tokens for a given mode to React CSSProperties.
 * Injects CSS custom properties onto an element (typically <html>).
 *
 * Returns {} if contract is null (graceful fallback to theme-manager defaults).
 */
export declare function contractToCssVars(contract: ThemeContract | null, mode: 'light' | 'dark'): React.CSSProperties;
//# sourceMappingURL=ThemeContract.d.ts.map