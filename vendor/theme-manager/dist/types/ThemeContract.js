"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDbRowToThemeContract = mapDbRowToThemeContract;
exports.contractToCssVars = contractToCssVars;
/**
 * Convert a DB row (snake_case) to the ThemeContract interface (camelCase).
 */
function mapDbRowToThemeContract(row) {
    var _a;
    return {
        ipSlug: row.ip_slug,
        displayName: row.display_name,
        regid: row.regid,
        tokens: row.tokens,
        layout: (_a = row.layout) !== null && _a !== void 0 ? _a : {},
        version: row.version,
        status: row.status,
        updatedAt: row.updated_at,
    };
}
/**
 * Convert ThemeContract tokens for a given mode to React CSSProperties.
 * Injects CSS custom properties onto an element (typically <html>).
 *
 * Returns {} if contract is null (graceful fallback to theme-manager defaults).
 */
function contractToCssVars(contract, mode) {
    if (!contract)
        return {};
    const modeTokens = contract.tokens[mode];
    if (!modeTokens)
        return {};
    const vars = {};
    for (const [key, value] of Object.entries(modeTokens)) {
        if (key.startsWith('--')) {
            vars[key] = value;
        }
    }
    // Also inject layout tokens if present
    if (contract.layout) {
        const layoutSections = ['spacing', 'radius', 'typography'];
        for (const section of layoutSections) {
            const sectionTokens = contract.layout[section];
            if (sectionTokens) {
                for (const [key, value] of Object.entries(sectionTokens)) {
                    const varName = key.startsWith('--') ? key : `--${section}-${key}`;
                    vars[varName] = value;
                }
            }
        }
    }
    return vars;
}
