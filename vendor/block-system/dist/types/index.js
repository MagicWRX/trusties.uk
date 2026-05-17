"use strict";
// ─── Block System Types ────────────────────────────────────────────────────────
// SSOT: DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md
//
// Architecture:
//   ThemeContract → LayoutContract → BlockTree → LayoutElement
//        colors         grid           atoms        leaves
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOCK_LAYER_BANDS = void 0;
exports.mapDbRowToBlock = mapDbRowToBlock;
exports.createBlankBlock = createBlankBlock;
exports.BLOCK_LAYER_BANDS = [
    { name: 'hud', label: 'HUD', zRange: [90, 100] },
    { name: 'overlay', label: 'Overlay', zRange: [50, 90] },
    { name: 'content', label: 'Content', zRange: [10, 50] },
    { name: 'background', label: 'Background', zRange: [0, 10] },
];
/** DB row mapper — snake_case DB → camelCase Block */
function mapDbRowToBlock(row) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return {
        id: String((_a = row['id']) !== null && _a !== void 0 ? _a : ''),
        parentId: row['parent_id'] ? String(row['parent_id']) : null,
        containerId: row['container_id'] ? String(row['container_id']) : null,
        displayName: String((_b = row['display_name']) !== null && _b !== void 0 ? _b : 'New Block'),
        type: (_c = row['type']) !== null && _c !== void 0 ? _c : 'blank',
        position: (_d = row['position']) !== null && _d !== void 0 ? _d : 'in-flow',
        coords: row['coords'] ? row['coords'] : undefined,
        layer: (_e = row['layer']) !== null && _e !== void 0 ? _e : 'content',
        // DB column is TEXT[] — join array elements into a space-separated class string
        classes: Array.isArray(row['classes'])
            ? row['classes'].join(' ')
            : String((_f = row['classes']) !== null && _f !== void 0 ? _f : ''),
        styleOverrides: (_g = row['style_overrides']) !== null && _g !== void 0 ? _g : {},
        customCss: row['custom_css'] ? String(row['custom_css']) : undefined,
        content: (_h = row['content']) !== null && _h !== void 0 ? _h : {},
        children: Array.isArray(row['children']) ? row['children'] : [],
        visible: row['visible'] !== false,
        locked: row['locked'] === true,
        sortOrder: Number((_j = row['sort_order']) !== null && _j !== void 0 ? _j : 0),
        createdAt: String((_k = row['created_at']) !== null && _k !== void 0 ? _k : ''),
        updatedAt: String((_l = row['updated_at']) !== null && _l !== void 0 ? _l : ''),
    };
}
/** Creates a minimal blank block with sensible defaults */
function createBlankBlock(id, layer = 'content', overrides = {}) {
    const now = new Date().toISOString();
    return Object.assign({ id, parentId: null, containerId: null, displayName: 'New Block', type: 'blank', position: 'in-flow', layer, classes: '', styleOverrides: {}, children: [], visible: true, locked: false, sortOrder: 0, createdAt: now, updatedAt: now }, overrides);
}
