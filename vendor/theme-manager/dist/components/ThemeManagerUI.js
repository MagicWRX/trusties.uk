"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeManagerUI = ThemeManagerUI;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ThemeBrowser_1 = require("./ThemeBrowser");
const ThemeEditor_1 = require("./ThemeEditor");
const useLayoutContract_1 = __importDefault(require("../hooks/useLayoutContract"));
function ThemeManagerUI({ ipSlug, supabaseUrl, supabaseAnonKey, apiEndpoint, tools, onApply, onSave, onDuplicate, onRename, className, }) {
    const [selectedTheme, setSelectedTheme] = (0, react_1.useState)(null);
    // 1. Fetch the majestic Layout Contract (template: theme-manager-layout)
    // Jareth demands sophisticated architectural scaling.
    const { layout, loading, gridStyle, orderedRegions } = (0, useLayoutContract_1.default)(ipSlug !== null && ipSlug !== void 0 ? ipSlug : '', {
        defaultTemplate: 'theme-manager-layout',
        supabaseUrl,
        supabaseAnonKey,
        apiEndpoint,
    });
    const handleLoad = (0, react_1.useCallback)((theme) => {
        setSelectedTheme(theme);
    }, []);
    const handleApply = (0, react_1.useCallback)((theme) => {
        // Quick-apply from browser card (no pending designState)
        onApply === null || onApply === void 0 ? void 0 : onApply(theme, {});
    }, [onApply]);
    const handleEditorApply = (0, react_1.useCallback)((theme, designState) => {
        onApply === null || onApply === void 0 ? void 0 : onApply(theme, designState);
    }, [onApply]);
    // If loading, let them wait in respectful silence.
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { className: "p-8 text-center text-hub-muted animate-pulse", children: "Loading architectural brilliance..." });
    }
    // Graceful Fallback for missing DB setup
    const finalGridStyle = layout
        ? gridStyle
        : {
            display: 'grid',
            gridTemplateColumns: selectedTheme ? '280px 1fr' : '1fr',
        };
    return ((0, jsx_runtime_1.jsx)("div", { className: className, style: Object.assign(Object.assign({}, finalGridStyle), { gap: 16, height: '100%', minHeight: 500, fontFamily: 'system-ui, sans-serif' }), children: layout ? (orderedRegions.map((region) => {
            // Left Panel -> ThemeBrowser
            if (region.name === 'left-panel') {
                return ((0, jsx_runtime_1.jsx)("div", { style: { gridArea: region.gridArea }, className: region.classes, children: (0, jsx_runtime_1.jsx)(ThemeBrowser_1.ThemeBrowser, { ipSlug: ipSlug, supabaseUrl: supabaseUrl, supabaseAnonKey: supabaseAnonKey, apiEndpoint: apiEndpoint, selectedThemeId: selectedTheme === null || selectedTheme === void 0 ? void 0 : selectedTheme.id, onLoad: handleLoad, onApply: handleApply, onDuplicate: onDuplicate, onRename: onRename }) }, region.name));
            }
            // Right Panel -> ThemeEditor
            if (region.name === 'right-panel' && selectedTheme) {
                return ((0, jsx_runtime_1.jsx)("div", { style: { gridArea: region.gridArea }, className: region.classes, children: (0, jsx_runtime_1.jsx)(ThemeEditor_1.ThemeEditor, { theme: selectedTheme, tools: tools, onApply: handleEditorApply, onSave: onSave, onClose: () => setSelectedTheme(null) }) }, region.name));
            }
            return null;
        })) : (
        // Fallback for peasant-tier hardcoded reality
        (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: {
                        border: '1px solid var(--border)',
                        borderRadius: 10,
                        padding: 16,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }, children: (0, jsx_runtime_1.jsx)(ThemeBrowser_1.ThemeBrowser, { ipSlug: ipSlug, supabaseUrl: supabaseUrl, supabaseAnonKey: supabaseAnonKey, apiEndpoint: apiEndpoint, selectedThemeId: selectedTheme === null || selectedTheme === void 0 ? void 0 : selectedTheme.id, onLoad: handleLoad, onApply: handleApply, onDuplicate: onDuplicate, onRename: onRename }) }), selectedTheme && ((0, jsx_runtime_1.jsx)("div", { style: {
                        border: '1px solid var(--border)',
                        borderRadius: 10,
                        padding: 16,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }, children: (0, jsx_runtime_1.jsx)(ThemeEditor_1.ThemeEditor, { theme: selectedTheme, tools: tools, onApply: handleEditorApply, onSave: onSave, onClose: () => setSelectedTheme(null) }) }))] })) }));
}
