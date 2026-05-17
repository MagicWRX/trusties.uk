"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeEditor = ThemeEditor;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const applyTheme_1 = require("../lib/applyTheme");
const useThemePatch_1 = require("../hooks/useThemePatch");
const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'layout', label: 'Layout' },
    { id: 'fonts', label: 'Fonts' },
    { id: 'colors', label: 'Colors' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'design', label: 'Design' },
    { id: 'pages', label: 'Pages' },
    { id: 'apply', label: 'Apply' },
];
/** Layer Navigation Bar — 6 icon shortcuts (keys 1-6) for primary tool layers */
const LAYER_NAV = [
    { key: '1', icon: '⊞', label: '1', tab: 'layout', title: 'Structure — Layout builder (1)' },
    { key: '2', icon: 'T', label: '2', tab: 'fonts', title: 'Typography — Text styles (2)' },
    { key: '3', icon: '🎨', label: '3', tab: 'colors', title: 'Color — Color palette (3)' },
    { key: '4', icon: 'Aa', label: '4', tab: 'fonts', title: 'Font — Font families (4)' },
    { key: '5', icon: '⬜', label: '5', tab: 'buttons', title: 'Button — Button styles (5)' },
    { key: '6', icon: '⚙', label: '6', tab: 'design', title: 'Design — Effects & tokens (6)' },
];
// ─── Overview tab content ─────────────────────────────────────────────────────
function OverviewTab({ theme }) {
    var _a, _b, _c;
    const rows = [
        ['ID', theme.id.slice(0, 8) + '…'],
        ['Name', theme.name],
        ['Display Name', (_a = theme.displayName) !== null && _a !== void 0 ? _a : '—'],
        ['Status', theme.status],
        ['Version', theme.version],
        ['IP Slug', (_b = theme.ipSlug) !== null && _b !== void 0 ? _b : 'universal (parent)'],
        ['Parent Template', theme.isParentTemplate ? 'Yes' : 'No'],
        ['Parent Theme ID', theme.parentThemeId ? theme.parentThemeId.slice(0, 8) + '…' : '—'],
        ['Tags', theme.tags.join(', ') || '—'],
        ['Layout Template', (_c = theme.layoutTemplate) !== null && _c !== void 0 ? _c : '—'],
        ['Created', new Date(theme.createdAt).toLocaleDateString()],
        ['Updated', new Date(theme.updatedAt).toLocaleDateString()],
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { children: [theme.description && ((0, jsx_runtime_1.jsx)("p", { style: { fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 16, lineHeight: 1.5 }, children: theme.description })), (0, jsx_runtime_1.jsx)("table", { style: { width: '100%', borderCollapse: 'collapse', fontSize: 12 }, children: (0, jsx_runtime_1.jsx)("tbody", { children: rows.map(([key, val]) => ((0, jsx_runtime_1.jsxs)("tr", { style: { borderBottom: '1px solid var(--border)' }, children: [(0, jsx_runtime_1.jsx)("td", { style: { padding: '6px 8px', color: 'var(--muted-foreground)', fontWeight: 600, whiteSpace: 'nowrap', width: 150 }, children: key }), (0, jsx_runtime_1.jsx)("td", { style: { padding: '6px 8px', color: 'var(--foreground)', fontFamily: 'monospace', wordBreak: 'break-all' }, children: val })] }, key))) }) })] }));
}
// ─── Apply tab content ────────────────────────────────────────────────────────
function ApplyTab({ theme, designState, onApply, onReset, }) {
    var _a, _b;
    const hasTokenOverrides = Object.keys((_a = theme.tokenOverrides) !== null && _a !== void 0 ? _a : {}).length > 0;
    const hasDesignState = Object.keys(designState).length > 0;
    return ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: 13 }, children: [(0, jsx_runtime_1.jsxs)("p", { style: { color: 'var(--muted-foreground)', marginBottom: 16, lineHeight: 1.5 }, children: ["Applying a theme injects CSS custom properties onto ", (0, jsx_runtime_1.jsx)("code", { children: "<html>" }), ", immediately changing colors, fonts, and design tokens across the page."] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 16 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 700, marginBottom: 8 }, children: "Token Overrides" }), hasTokenOverrides ? ((0, jsx_runtime_1.jsx)("div", { style: { maxHeight: 180, overflowY: 'auto', background: 'var(--muted)', borderRadius: 6, padding: '8px 12px', fontFamily: 'monospace', fontSize: 11 }, children: Object.entries(theme.tokenOverrides).map(([mode, tokens]) => ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 8 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 700, marginBottom: 4, color: 'var(--muted-foreground)' }, children: mode }), Object.entries(tokens).map(([k, v]) => ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: 'var(--muted-foreground)' }, children: k }), (0, jsx_runtime_1.jsx)("span", { children: v }), v.startsWith('#') || v.startsWith('hsl') || v.startsWith('rgb') ? ((0, jsx_runtime_1.jsx)("span", { style: { width: 14, height: 14, borderRadius: 2, background: v, display: 'inline-block', flexShrink: 0, marginTop: 1, border: '1px solid var(--border)' } })) : null] }, k)))] }, mode))) })) : ((0, jsx_runtime_1.jsx)("p", { style: { color: 'var(--muted-foreground)', fontSize: 12 }, children: "No token overrides defined on this theme." }))] }), hasDesignState && ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: 16 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 700, marginBottom: 8 }, children: "Pending Design Changes" }), (0, jsx_runtime_1.jsx)("div", { style: { background: 'var(--muted)', borderRadius: 6, padding: '8px 12px', fontFamily: 'monospace', fontSize: 11, maxHeight: 140, overflowY: 'auto' }, children: (0, jsx_runtime_1.jsx)("pre", { style: { margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }, children: JSON.stringify(designState, null, 2) }) })] })), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, marginTop: 8 }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onApply, style: {
                            padding: '8px 20px',
                            borderRadius: 6,
                            border: 'none',
                            background: 'hsl(var(--accent, 221 83% 53%))',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: 'pointer',
                        }, children: "Apply Theme to Page" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onReset, style: {
                            padding: '8px 16px',
                            borderRadius: 6,
                            border: '1px solid var(--border)',
                            background: 'transparent',
                            color: 'var(--foreground)',
                            fontSize: 13,
                            cursor: 'pointer',
                        }, children: "Reset" })] }), (0, jsx_runtime_1.jsxs)("p", { style: { fontSize: 11, color: 'var(--muted-foreground)', marginTop: 8 }, children: ["Applied: ", (0, jsx_runtime_1.jsx)("code", { "data-applied": "", style: { fontFamily: 'monospace' }, children: typeof document !== 'undefined'
                            ? (_b = document.documentElement.getAttribute('data-applied-theme')) !== null && _b !== void 0 ? _b : 'none'
                            : 'none' })] })] }));
}
// ─── Tool placeholder (when a tool is not injected) ───────────────────────────
function ToolPlaceholder({ name }) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { textAlign: 'center', padding: '40px 16px', color: 'var(--muted-foreground)', fontSize: 13 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: 24, marginBottom: 8 }, children: "\u2699\uFE0F" }), (0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 600, marginBottom: 4 }, children: name }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: 12 }, children: ["Pass this tool component via the ", (0, jsx_runtime_1.jsx)("code", { children: "tools" }), " prop to enable editing."] })] }));
}
function ThemeEditor({ theme, tools = {}, onSave, onApply, onClose, autoSaveEndpoint, previewUrl, className, }) {
    const [activeTab, setActiveTab] = (0, react_1.useState)('overview');
    const [designState, setDesignState] = (0, react_1.useState)({});
    const [saving, setSaving] = (0, react_1.useState)(false);
    const [saveMsg, setSaveMsg] = (0, react_1.useState)(null);
    const [applyMsg, setApplyMsg] = (0, react_1.useState)(null);
    // Save timestamp used to cache-bust the preview iframe
    const [previewTs, setPreviewTs] = (0, react_1.useState)(Date.now());
    // Keyboard shortcuts 1-6 for Layer Navigation Bar
    (0, react_1.useEffect)(() => {
        const handler = (e) => {
            var _a, _b;
            // Only fire when no input/textarea is focused
            const tag = (_a = e.target) === null || _a === void 0 ? void 0 : _a.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || ((_b = e.target) === null || _b === void 0 ? void 0 : _b.isContentEditable))
                return;
            const layer = LAYER_NAV.find((l) => l.key === e.key);
            if (layer)
                setActiveTab(layer.tab);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);
    // Auto-save via useThemePatch when autoSaveEndpoint is provided
    const autoSave = (0, useThemePatch_1.useThemePatch)(theme.id, autoSaveEndpoint
        ? {
            apiEndpoint: autoSaveEndpoint,
            snapshotEndpoint: autoSaveEndpoint.replace('/themes', '/themes/snapshot'),
            debounceMs: 500,
            onSaved: () => setPreviewTs(Date.now()),
        }
        : undefined);
    // Only use auto-save state when the endpoint is configured
    const isAutoSave = Boolean(autoSaveEndpoint);
    const merge = (0, react_1.useCallback)((partial) => {
        setDesignState((prev) => (Object.assign(Object.assign({}, prev), partial)));
    }, []);
    /**
     * mergeAndPatch — merges into local designState AND queues a debounced
     * auto-save patch when autoSaveEndpoint is configured.
     */
    const mergeAndPatch = (0, react_1.useCallback)((partial, dbFields) => {
        merge(partial);
        if (isAutoSave) {
            autoSave.patch(dbFields);
        }
    }, [merge, isAutoSave, autoSave]);
    const handleSave = (0, react_1.useCallback)(async () => {
        if (!onSave) {
            setSaveMsg('Save handler not configured.');
            setTimeout(() => setSaveMsg(null), 3000);
            return;
        }
        setSaving(true);
        setSaveMsg(null);
        try {
            await onSave(theme, designState);
            setSaveMsg('Saved ✓');
            setPreviewTs(Date.now());
        }
        catch (err) {
            setSaveMsg(`Save failed: ${err instanceof Error ? err.message : String(err)}`);
        }
        finally {
            setSaving(false);
            setTimeout(() => setSaveMsg(null), 4000);
        }
    }, [onSave, theme, designState]);
    const handleApply = (0, react_1.useCallback)(() => {
        var _a, _b, _c, _d;
        // Always apply to the page (theme token overrides + designState colors/fonts)
        (0, applyTheme_1.applyCompositeTheme)(theme, 'dark');
        // Also apply pending designState colors
        if (typeof document !== 'undefined') {
            const root = document.documentElement;
            const primary = (_a = designState.colorPalette) === null || _a === void 0 ? void 0 : _a.primary;
            const accent = (_b = designState.colorPalette) === null || _b === void 0 ? void 0 : _b.accent;
            if (primary)
                root.style.setProperty('--preview-primary', primary);
            if (accent)
                root.style.setProperty('--preview-accent', accent);
            const fontFamily = (_d = (_c = designState.fontSelection) === null || _c === void 0 ? void 0 : _c.primary) === null || _d === void 0 ? void 0 : _d.family;
            if (fontFamily)
                root.style.setProperty('--font-primary', fontFamily);
        }
        onApply === null || onApply === void 0 ? void 0 : onApply(theme, designState);
        setApplyMsg(`Applied "${theme.displayName || theme.name}" to page ✓`);
        setTimeout(() => setApplyMsg(null), 4000);
    }, [theme, designState, onApply]);
    const handleReset = (0, react_1.useCallback)(() => {
        (0, applyTheme_1.resetCompositeTheme)();
        setApplyMsg('Reset applied ✓');
        setTimeout(() => setApplyMsg(null), 3000);
    }, []);
    // ─── Tab content ─────────────────────────────────────────────────────────────
    const renderTab = () => {
        switch (activeTab) {
            case 'overview':
                return (0, jsx_runtime_1.jsx)(OverviewTab, { theme: theme });
            case 'layout':
                return tools.LayoutManager ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(tools.LayoutManager, { designState: designState }), isAutoSave && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                                        if (theme.layoutTemplate) {
                                            autoSave.patch({ layout_template: theme.layoutTemplate });
                                        }
                                    }, style: {
                                        padding: '6px 16px',
                                        borderRadius: 5,
                                        border: 'none',
                                        background: 'hsl(var(--accent, 221 83% 53%))',
                                        color: '#fff',
                                        fontSize: 12,
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                    }, children: "Apply Layout" }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: 11, color: 'var(--muted-foreground)' }, children: "Saves layout_template to DB" })] }))] })) : ((0, jsx_runtime_1.jsx)(ToolPlaceholder, { name: "Layout Manager" }));
            case 'fonts':
                return tools.FontManager ? ((0, jsx_runtime_1.jsx)(tools.FontManager, { onStateChange: (p) => mergeAndPatch(p, { font_selection: p.fontSelection }) })) : ((0, jsx_runtime_1.jsx)(ToolPlaceholder, { name: "Font Manager" }));
            case 'colors':
                return tools.ColorPalette ? ((0, jsx_runtime_1.jsx)(tools.ColorPalette, { onStateChange: (p) => mergeAndPatch(p, {
                        color_palette: p.colorPalette,
                        // token_overrides cascade is handled server-side on next load
                    }) })) : ((0, jsx_runtime_1.jsx)(ToolPlaceholder, { name: "Color Palette" }));
            case 'buttons':
                return tools.ButtonDesigner ? ((0, jsx_runtime_1.jsx)(tools.ButtonDesigner, { onStateChange: (p) => mergeAndPatch(p, { button_variants: p.buttonVariants }) })) : ((0, jsx_runtime_1.jsx)(ToolPlaceholder, { name: "Button Designer" }));
            case 'design':
                return tools.BubbleDesigner ? ((0, jsx_runtime_1.jsx)(tools.BubbleDesigner, { onStateChange: (p) => mergeAndPatch(p, { design_settings: p.designSettings }) })) : ((0, jsx_runtime_1.jsx)(ToolPlaceholder, { name: "Design Tool" }));
            case 'pages':
                return tools.PageEditor ? ((0, jsx_runtime_1.jsx)(tools.PageEditor, {})) : ((0, jsx_runtime_1.jsx)(ToolPlaceholder, { name: "Page Editor (read-only MVP)" }));
            case 'apply':
                return ((0, jsx_runtime_1.jsx)(ApplyTab, { theme: theme, designState: designState, onApply: handleApply, onReset: handleReset }));
            default:
                return null;
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: className, style: { display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'system-ui, sans-serif' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: 8,
                    marginBottom: 0,
                }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: 700, fontSize: 14, color: 'var(--foreground)' }, children: theme.displayName || theme.name }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'monospace' }, children: [theme.name, " \u00B7 v", theme.version] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 8, alignItems: 'center' }, children: [saveMsg && ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: 11, color: saveMsg.includes('fail') ? 'hsl(0 72% 50%)' : 'hsl(142 76% 36%)' }, children: saveMsg })), applyMsg && ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: 11, color: 'hsl(142 76% 36%)' }, children: applyMsg })), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: handleSave, disabled: saving, style: {
                                    padding: '4px 14px',
                                    borderRadius: 5,
                                    border: '1px solid var(--border)',
                                    background: 'transparent',
                                    color: 'var(--foreground)',
                                    fontSize: 12,
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    opacity: saving ? 0.5 : 1,
                                }, children: saving ? 'Saving…' : 'Save' }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: handleApply, style: {
                                    padding: '4px 14px',
                                    borderRadius: 5,
                                    border: 'none',
                                    background: 'hsl(var(--accent, 221 83% 53%))',
                                    color: '#fff',
                                    fontSize: 12,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                }, children: "Apply" }), onClose && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClose, title: "Close editor", style: {
                                    padding: '4px 8px',
                                    borderRadius: 5,
                                    border: '1px solid var(--border)',
                                    background: 'transparent',
                                    color: 'var(--muted-foreground)',
                                    fontSize: 14,
                                    cursor: 'pointer',
                                    lineHeight: 1,
                                }, children: "\u2715" }))] })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    gap: 4,
                    padding: '6px 12px',
                    borderBottom: '1px solid var(--border)',
                    background: 'var(--muted, #f8f8f8)',
                    flexShrink: 0,
                }, children: [LAYER_NAV.map((layer) => {
                        const isActive = activeTab === layer.tab;
                        return ((0, jsx_runtime_1.jsxs)("button", { type: "button", title: layer.title, onClick: () => setActiveTab(layer.tab), style: {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 1,
                                padding: '4px 10px',
                                borderRadius: 6,
                                border: `1px solid ${isActive ? 'hsl(var(--accent, 221 83% 53%))' : 'var(--border)'}`,
                                background: isActive ? 'hsl(var(--accent, 221 83% 53%) / 0.12)' : 'var(--background)',
                                cursor: 'pointer',
                                color: isActive ? 'hsl(var(--accent, 221 83% 53%))' : 'var(--muted-foreground)',
                                fontSize: 14,
                                lineHeight: 1,
                                minWidth: 40,
                            }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: 16 }, children: layer.icon }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: 9, fontFamily: 'monospace', opacity: 0.7 }, children: layer.key })] }, layer.key));
                    }), (0, jsx_runtime_1.jsx)("div", { style: { marginLeft: 'auto', display: 'flex', alignItems: 'center', fontSize: 10, color: 'var(--muted-foreground)', gap: 4 }, children: (0, jsx_runtime_1.jsx)("span", { children: "Press 1\u20136 to switch layers" }) })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                    display: 'flex',
                    gap: 0,
                    borderBottom: '1px solid var(--border)',
                    overflowX: 'auto',
                    flexShrink: 0,
                }, children: TABS.map((tab) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setActiveTab(tab.id), style: {
                        padding: '8px 14px',
                        fontSize: 12,
                        fontWeight: activeTab === tab.id ? 700 : 400,
                        color: activeTab === tab.id ? 'hsl(var(--accent, 221 83% 53%))' : 'var(--muted-foreground)',
                        borderBottom: activeTab === tab.id ? '2px solid hsl(var(--accent, 221 83% 53%))' : '2px solid transparent',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.1s, border-color 0.1s',
                    }, children: [tab.label, tab.id === 'apply' && Object.keys(designState).length > 0 && ((0, jsx_runtime_1.jsx)("span", { style: { marginLeft: 4, width: 6, height: 6, borderRadius: '50%', background: 'hsl(39 100% 50%)', display: 'inline-block', verticalAlign: 'middle' } }))] }, tab.id))) }), (0, jsx_runtime_1.jsx)("div", { style: {
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px 0 0',
                }, children: renderTab() }), isAutoSave && ((0, jsx_runtime_1.jsxs)("div", { style: {
                    borderTop: '1px solid var(--border)',
                    padding: '6px 12px',
                    fontSize: 11,
                    color: 'var(--muted-foreground)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                    background: 'var(--background)',
                }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                            color: autoSave.error
                                ? 'hsl(0 72% 50%)'
                                : autoSave.saving
                                    ? 'var(--muted-foreground)'
                                    : autoSave.lastSaved
                                        ? 'hsl(142 76% 36%)'
                                        : 'var(--muted-foreground)',
                        }, children: autoSave.error
                            ? `Error — ${autoSave.error}`
                            : autoSave.saving
                                ? 'Saving…'
                                : autoSave.lastSaved
                                    ? `Saved ✓ ${autoSave.lastSaved.toLocaleTimeString()}`
                                    : 'Auto-save enabled' }), Object.keys(designState).length > 0 && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setDesignState({}), style: { fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', textDecoration: 'underline' }, children: "Clear local state" }))] })), !isAutoSave && Object.keys(designState).length > 0 && activeTab !== 'apply' && ((0, jsx_runtime_1.jsxs)("div", { style: {
                    borderTop: '1px solid var(--border)',
                    padding: '6px 12px',
                    fontSize: 11,
                    color: 'var(--muted-foreground)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                }, children: [(0, jsx_runtime_1.jsxs)("span", { children: ["Unsaved changes in:", ' ', Object.keys(designState)
                                .map((k) => k.replace(/([A-Z])/g, ' $1').toLowerCase())
                                .join(', ')] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setDesignState({}), style: { fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', textDecoration: 'underline' }, children: "Clear" })] })), previewUrl && ((0, jsx_runtime_1.jsxs)("div", { style: {
                    borderTop: '1px solid var(--border)',
                    padding: '10px 0 0',
                    flexShrink: 0,
                }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: 11, color: 'var(--muted-foreground)', padding: '0 0 6px', fontWeight: 600 }, children: "Live Preview" }), (0, jsx_runtime_1.jsx)("iframe", { src: `${previewUrl}?_preview=1&_ts=${previewTs}`, style: { width: '100%', height: 300, border: '1px solid var(--border)', borderRadius: 6 }, title: "Live theme preview" }, previewTs)] }))] }));
}
