"use strict";
// ─── block-system/server ─────────────────────────────────────────────────────
// Server Component + Route Handler safe. No React, no hooks.
// SSOT: DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlankBlock = exports.mapDbRowToBlock = exports.BLOCK_LAYER_BANDS = exports.fetchBlock = exports.fetchBlocks = void 0;
var fetchBlocks_1 = require("./fetchBlocks");
Object.defineProperty(exports, "fetchBlocks", { enumerable: true, get: function () { return fetchBlocks_1.fetchBlocks; } });
Object.defineProperty(exports, "fetchBlock", { enumerable: true, get: function () { return fetchBlocks_1.fetchBlock; } });
var types_1 = require("../types");
Object.defineProperty(exports, "BLOCK_LAYER_BANDS", { enumerable: true, get: function () { return types_1.BLOCK_LAYER_BANDS; } });
Object.defineProperty(exports, "mapDbRowToBlock", { enumerable: true, get: function () { return types_1.mapDbRowToBlock; } });
Object.defineProperty(exports, "createBlankBlock", { enumerable: true, get: function () { return types_1.createBlankBlock; } });
