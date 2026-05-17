"use strict";
/**
 * LayoutContract — TypeScript interfaces for the Supabase layout system.
 * DB SSOT: Supabase layout_contracts + theme_containers tables (migration 014)
 *
 * Architecture:
 *   layout_contracts → Named layout templates with region definitions
 *   theme_containers → Styled component containers placed within regions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDbRowToLayoutContract = mapDbRowToLayoutContract;
exports.mapDbRowToThemeContainer = mapDbRowToThemeContainer;
exports.getContainersForRegion = getContainersForRegion;
exports.getContainer = getContainer;
// ─── DB Row Mappers ──────────────────────────────────────────────────────────
/**
 * Convert a DB row (snake_case) to LayoutContract (camelCase).
 */
function mapDbRowToLayoutContract(row, containers) {
    var _a, _b, _c, _d, _e, _f;
    return {
        id: row.id,
        ipSlug: row.ip_slug,
        templateName: row.template_name,
        displayName: row.display_name,
        description: (_a = row.description) !== null && _a !== void 0 ? _a : '',
        regions: (_b = row.regions) !== null && _b !== void 0 ? _b : [],
        gridTemplate: (_c = row.grid_template) !== null && _c !== void 0 ? _c : '',
        responsive: (_d = row.responsive) !== null && _d !== void 0 ? _d : {},
        version: (_e = row.version) !== null && _e !== void 0 ? _e : '1.0.0',
        status: (_f = row.status) !== null && _f !== void 0 ? _f : 'active',
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        containers,
    };
}
/**
 * Convert a DB row (snake_case) to ThemeContainer (camelCase).
 */
function mapDbRowToThemeContainer(row) {
    var _a, _b, _c, _d, _e;
    return {
        id: row.id,
        layoutId: row.layout_id,
        regionName: row.region_name,
        containerName: row.container_name,
        displayName: row.display_name,
        classes: (_a = row.classes) !== null && _a !== void 0 ? _a : '',
        styleOverrides: (_b = row.style_overrides) !== null && _b !== void 0 ? _b : {},
        sortOrder: (_c = row.sort_order) !== null && _c !== void 0 ? _c : 0,
        isDraggable: (_d = row.is_draggable) !== null && _d !== void 0 ? _d : false,
        status: (_e = row.status) !== null && _e !== void 0 ? _e : 'active',
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}
/**
 * Get containers for a specific region from a layout contract.
 */
function getContainersForRegion(contract, regionName) {
    var _a;
    return ((_a = contract.containers) !== null && _a !== void 0 ? _a : [])
        .filter((c) => c.regionName === regionName && c.status === 'active')
        .sort((a, b) => a.sortOrder - b.sortOrder);
}
/**
 * Get a specific container by name from a layout contract.
 */
function getContainer(contract, regionName, containerName) {
    var _a;
    return ((_a = contract.containers) !== null && _a !== void 0 ? _a : []).find((c) => c.regionName === regionName && c.containerName === containerName);
}
