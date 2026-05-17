"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.resetCompositeTheme = exports.applyCompositeTheme = exports.ThemeManagerUI = exports.ThemeEditor = exports.ThemeBrowser = exports.mapDbRowToThemeComposite = exports.createBlankBlock = exports.mapDbRowToBlock = exports.BLOCK_LAYER_BANDS = exports.useBlockTree = exports.useThemePatch = exports.useLayoutContract = exports.getContainer = exports.getContainersForRegion = exports.mapDbRowToThemeContainer = exports.mapDbRowToLayoutContract = exports.contractToCssVars = exports.mapDbRowToThemeContract = exports.useDynamicTheme = exports.usePlatformBranding = exports.useThemeContract = exports.MAGICWRX_THEME_CONTRACT = exports.THEME_CONFIG = exports.useTheme = exports.MutedSurface = exports.Surface = exports.Container = exports.Dropdown = exports.Select = exports.Button = exports.cn = void 0;
// ─── Utility ──────────────────────────────────────────────────────────────────
var cn_1 = require("./lib/cn");
Object.defineProperty(exports, "cn", { enumerable: true, get: function () { return cn_1.cn; } });
// ─── UI Components ────────────────────────────────────────────────────────────
var Button_1 = require("./components/Button");
Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return Button_1.Button; } });
var components_1 = require("./components");
Object.defineProperty(exports, "Select", { enumerable: true, get: function () { return components_1.Select; } });
Object.defineProperty(exports, "Dropdown", { enumerable: true, get: function () { return components_1.Dropdown; } });
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return components_1.Container; } });
Object.defineProperty(exports, "Surface", { enumerable: true, get: function () { return components_1.Surface; } });
Object.defineProperty(exports, "MutedSurface", { enumerable: true, get: function () { return components_1.MutedSurface; } });
// ─── Theme management utilities ───────────────────────────────────────────────
var useTheme_1 = require("./hooks/useTheme");
Object.defineProperty(exports, "useTheme", { enumerable: true, get: function () { return __importDefault(useTheme_1).default; } });
var useTheme_2 = require("./hooks/useTheme");
Object.defineProperty(exports, "THEME_CONFIG", { enumerable: true, get: function () { return useTheme_2.THEME_CONFIG; } });
Object.defineProperty(exports, "MAGICWRX_THEME_CONTRACT", { enumerable: true, get: function () { return useTheme_2.MAGICWRX_THEME_CONTRACT; } });
var useThemeContract_1 = require("./hooks/useThemeContract");
Object.defineProperty(exports, "useThemeContract", { enumerable: true, get: function () { return useThemeContract_1.useThemeContract; } });
// DB-driven platform branding (TASK-029 Step 5)
var useTheme_3 = require("./hooks/useTheme");
Object.defineProperty(exports, "usePlatformBranding", { enumerable: true, get: function () { return useTheme_3.usePlatformBranding; } });
// DB-driven theme init — replaces setAppSkin() with applyCompositeTheme() (TASK-029 Step 12)
var useTheme_4 = require("./hooks/useTheme");
Object.defineProperty(exports, "useDynamicTheme", { enumerable: true, get: function () { return useTheme_4.useDynamicTheme; } });
var ThemeContract_1 = require("./types/ThemeContract");
Object.defineProperty(exports, "mapDbRowToThemeContract", { enumerable: true, get: function () { return ThemeContract_1.mapDbRowToThemeContract; } });
Object.defineProperty(exports, "contractToCssVars", { enumerable: true, get: function () { return ThemeContract_1.contractToCssVars; } });
var LayoutContract_1 = require("./types/LayoutContract");
Object.defineProperty(exports, "mapDbRowToLayoutContract", { enumerable: true, get: function () { return LayoutContract_1.mapDbRowToLayoutContract; } });
Object.defineProperty(exports, "mapDbRowToThemeContainer", { enumerable: true, get: function () { return LayoutContract_1.mapDbRowToThemeContainer; } });
Object.defineProperty(exports, "getContainersForRegion", { enumerable: true, get: function () { return LayoutContract_1.getContainersForRegion; } });
Object.defineProperty(exports, "getContainer", { enumerable: true, get: function () { return LayoutContract_1.getContainer; } });
// Layout contract client hook (DB-driven layout consumer)
var useLayoutContract_1 = require("./hooks/useLayoutContract");
Object.defineProperty(exports, "useLayoutContract", { enumerable: true, get: function () { return __importDefault(useLayoutContract_1).default; } });
// DB-driven theme patch hook — debounced write + auto-snapshot (TASK-030)
var useThemePatch_1 = require("./hooks/useThemePatch");
Object.defineProperty(exports, "useThemePatch", { enumerable: true, get: function () { return useThemePatch_1.useThemePatch; } });
// ─── Blocks (Bridged from block-system) ──────────────────────────────────────
var useBlockTree_1 = require("./hooks/useBlockTree");
Object.defineProperty(exports, "useBlockTree", { enumerable: true, get: function () { return useBlockTree_1.useBlockTree; } });
var useBlockTree_2 = require("./hooks/useBlockTree");
Object.defineProperty(exports, "BLOCK_LAYER_BANDS", { enumerable: true, get: function () { return useBlockTree_2.BLOCK_LAYER_BANDS; } });
Object.defineProperty(exports, "mapDbRowToBlock", { enumerable: true, get: function () { return useBlockTree_2.mapDbRowToBlock; } });
Object.defineProperty(exports, "createBlankBlock", { enumerable: true, get: function () { return useBlockTree_2.createBlankBlock; } });
var Theme_1 = require("./types/Theme");
Object.defineProperty(exports, "mapDbRowToThemeComposite", { enumerable: true, get: function () { return Theme_1.mapDbRowToThemeComposite; } });
// Theme Manager Full UI (TASK-027)
var ThemeBrowser_1 = require("./components/ThemeBrowser");
Object.defineProperty(exports, "ThemeBrowser", { enumerable: true, get: function () { return ThemeBrowser_1.ThemeBrowser; } });
var ThemeEditor_1 = require("./components/ThemeEditor");
Object.defineProperty(exports, "ThemeEditor", { enumerable: true, get: function () { return ThemeEditor_1.ThemeEditor; } });
var ThemeManagerUI_1 = require("./components/ThemeManagerUI");
Object.defineProperty(exports, "ThemeManagerUI", { enumerable: true, get: function () { return ThemeManagerUI_1.ThemeManagerUI; } });
// Apply utilities
var applyTheme_1 = require("./lib/applyTheme");
Object.defineProperty(exports, "applyCompositeTheme", { enumerable: true, get: function () { return applyTheme_1.applyCompositeTheme; } });
Object.defineProperty(exports, "resetCompositeTheme", { enumerable: true, get: function () { return applyTheme_1.resetCompositeTheme; } });
// Demo component (default export for hub integration)
var Demo_1 = require("./Demo");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(Demo_1).default; } });
