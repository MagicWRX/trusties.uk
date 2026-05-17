"use strict";
// ─── @magicwrxtools/block-system ──────────────────────────────────────────────
// Universal block container system for the AMS Ecosystem.
//
// Architecture:
//   ThemeContract → LayoutContract → BlockTree → LayoutElement
//        colors         grid           atoms        leaves
//
// SSOT: DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md
//
// Subpath exports:
//   '@magicwrxtools/block-system'         — client (hooks + components + types)
//   '@magicwrxtools/block-system/server'  — server (fetchBlocks, fetchBlock)
//   '@magicwrxtools/block-system/types'   — types only (safe in both)
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockTreeRenderer = exports.BlockRenderer = exports.BlockLayerPortal = exports.useBlockTree = exports.createBlankBlock = exports.mapDbRowToBlock = exports.BLOCK_LAYER_BANDS = void 0;
var types_1 = require("./types");
Object.defineProperty(exports, "BLOCK_LAYER_BANDS", { enumerable: true, get: function () { return types_1.BLOCK_LAYER_BANDS; } });
Object.defineProperty(exports, "mapDbRowToBlock", { enumerable: true, get: function () { return types_1.mapDbRowToBlock; } });
Object.defineProperty(exports, "createBlankBlock", { enumerable: true, get: function () { return types_1.createBlankBlock; } });
// ─── Client Hooks ─────────────────────────────────────────────────────────────
var useBlockTree_1 = require("./hooks/useBlockTree");
Object.defineProperty(exports, "useBlockTree", { enumerable: true, get: function () { return useBlockTree_1.useBlockTree; } });
// ─── Components ───────────────────────────────────────────────────────────────
// BlockLayerPortal — renders animation/art blocks outside the React tree
var BlockLayerPortal_1 = require("./components/BlockLayerPortal");
Object.defineProperty(exports, "BlockLayerPortal", { enumerable: true, get: function () { return BlockLayerPortal_1.BlockLayerPortal; } });
// BlockRenderer — renders a single block to its leaf component
var BlockRenderer_1 = require("./components/BlockRenderer");
Object.defineProperty(exports, "BlockRenderer", { enumerable: true, get: function () { return BlockRenderer_1.BlockRenderer; } });
// BlockTreeRenderer — top-level tree-walking renderer for block-driven pages
// Usage: <BlockTreeRenderer ipSlug="myip" context="landing" options={{ supabaseUrl, supabaseAnonKey }} />
var BlockTreeRenderer_1 = require("./components/BlockTreeRenderer");
Object.defineProperty(exports, "BlockTreeRenderer", { enumerable: true, get: function () { return BlockTreeRenderer_1.BlockTreeRenderer; } });
