"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockLayerPortal = BlockLayerPortal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const types_1 = require("../types");
// ─── Per-layer CSS injector ───────────────────────────────────────────────────
function LayerCssInjector({ layer, css }) {
    (0, react_1.useEffect)(() => {
        if (!css)
            return;
        const el = document.createElement('style');
        el.setAttribute('data-block-layer-css', layer);
        el.textContent = css;
        document.head.appendChild(el);
        return () => {
            document.head.removeChild(el);
        };
    }, [layer, css]);
    return null;
}
// ─── Default placeholder renderer ────────────────────────────────────────────
function DefaultBlockPlaceholder({ block }) {
    var _a, _b, _c, _d, _e, _f, _g;
    const band = types_1.BLOCK_LAYER_BANDS.find(b => b.name === block.layer);
    const zBase = (_a = band === null || band === void 0 ? void 0 : band.zRange[0]) !== null && _a !== void 0 ? _a : 0;
    const zIndex = zBase + block.sortOrder;
    const style = Object.assign({ position: block.position === 'fixed' ? 'fixed' : 'absolute', left: block.coords ? `${block.coords.x}${(_b = block.coords.xUnit) !== null && _b !== void 0 ? _b : 'px'}` : 0, top: block.coords ? `${block.coords.y}${(_c = block.coords.yUnit) !== null && _c !== void 0 ? _c : 'px'}` : 0, width: ((_d = block.coords) === null || _d === void 0 ? void 0 : _d.width) != null ? `${block.coords.width}${(_e = block.coords.xUnit) !== null && _e !== void 0 ? _e : 'px'}` : '100%', height: ((_f = block.coords) === null || _f === void 0 ? void 0 : _f.height) != null ? `${block.coords.height}${(_g = block.coords.yUnit) !== null && _g !== void 0 ? _g : 'px'}` : '100%', zIndex, pointerEvents: 'none', display: block.visible ? 'block' : 'none' }, block.styleOverrides);
    return ((0, jsx_runtime_1.jsx)("div", { "data-block-id": block.id, "data-block-type": block.type, "data-block-layer": block.layer, className: block.classes, style: style }));
}
// ─── BlockLayerPortal ─────────────────────────────────────────────────────────
/**
 * BlockLayerPortal — renders floating blocks (animation, art) outside the React
 * tree by portaling into document.body (or a custom target).
 *
 * This is the Glam Move:
 * - Put a glitter particle field behind every IP without touching layout grid.
 * - All `animation` and `art` blocks live in overlay / background bands.
 * - `pointer-events: none` ensures they never capture user interactions.
 *
 * Usage:
 *   <BlockLayerPortal blocks={blockTree.blocks} renderBlock={myRenderer} />
 *
 * SSOT: DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md Section 4
 */
function BlockLayerPortal({ blocks, includeTypes = ['animation', 'art'], renderBlock, target, className, }) {
    var _a;
    const mountRef = (0, react_1.useRef)(null);
    const portalTarget = target !== null && target !== void 0 ? target : (typeof document !== 'undefined' ? document.body : null);
    // Collect custom CSS from blocks, grouped by layer
    const layerCssMap = {};
    const portalBlocks = Object.values(blocks).filter(b => {
        if (!includeTypes.includes(b.type))
            return false;
        if (!b.visible)
            return false;
        return true;
    });
    for (const block of portalBlocks) {
        if (block.customCss) {
            layerCssMap[block.layer] = ((_a = layerCssMap[block.layer]) !== null && _a !== void 0 ? _a : '') + '\n' + block.customCss;
        }
    }
    if (!portalTarget || portalBlocks.length === 0)
        return null;
    const content = ((0, jsx_runtime_1.jsxs)("div", { ref: mountRef, "data-block-portal": "true", className: className, style: { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }, children: [Object.entries(layerCssMap).map(([layer, css]) => css ? (0, jsx_runtime_1.jsx)(LayerCssInjector, { layer: layer, css: css }, layer) : null), portalBlocks
                .slice()
                .sort((a, b) => {
                var _a, _b, _c, _d;
                const aBase = (_b = (_a = types_1.BLOCK_LAYER_BANDS.find(l => l.name === a.layer)) === null || _a === void 0 ? void 0 : _a.zRange[0]) !== null && _b !== void 0 ? _b : 0;
                const bBase = (_d = (_c = types_1.BLOCK_LAYER_BANDS.find(l => l.name === b.layer)) === null || _c === void 0 ? void 0 : _c.zRange[0]) !== null && _d !== void 0 ? _d : 0;
                if (aBase !== bBase)
                    return aBase - bBase;
                return a.sortOrder - b.sortOrder;
            })
                .map(block => renderBlock ? ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: renderBlock(block) }, block.id)) : ((0, jsx_runtime_1.jsx)(DefaultBlockPlaceholder, { block: block }, block.id)))] }));
    return (0, react_dom_1.createPortal)(content, portalTarget);
}
