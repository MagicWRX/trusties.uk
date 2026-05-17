"use strict";
// ─── block-system/types ──────────────────────────────────────────────────────
// Types-only export — safe to import anywhere (client, server, edge).
// No React, no hooks, no side effects.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlankBlock = exports.mapDbRowToBlock = exports.BLOCK_LAYER_BANDS = void 0;
var index_1 = require("./index");
Object.defineProperty(exports, "BLOCK_LAYER_BANDS", { enumerable: true, get: function () { return index_1.BLOCK_LAYER_BANDS; } });
Object.defineProperty(exports, "mapDbRowToBlock", { enumerable: true, get: function () { return index_1.mapDbRowToBlock; } });
Object.defineProperty(exports, "createBlankBlock", { enumerable: true, get: function () { return index_1.createBlankBlock; } });
