"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeBrowser = ThemeBrowser;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Theme_1 = require("../types/Theme");
// ─── Status badge helper ──────────────────────────────────────────────────────
const STATUS_COLORS = {
    active: 'background:hsl(142 76% 36%);color:#fff',
    draft: 'background:hsl(39 100% 50%);color:#000',
    deprecated: 'background:hsl(0 0% 50%);color:#fff',
};
function StatusBadge({ status }) {
    var _a, _b, _c;
    const style = (_a = STATUS_COLORS[status]) !== null && _a !== void 0 ? _a : STATUS_COLORS['draft'];
    const parts = {};
    style.split(';').forEach((p) => {
        const [k, v] = p.split(':');
        if (k && v)
            parts[k.trim()] = v.trim();
    });
    return ((0, jsx_runtime_1.jsx)("span", { style: {
            display: 'inline-block',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: '1px 6px',
            borderRadius: 4,
            background: (_b = parts['background']) !== null && _b !== void 0 ? _b : 'hsl(0 0% 60%)',
            color: (_c = parts['color']) !== null && _c !== void 0 ? _c : '#fff',
        }, children: status }));
}
// ─── Theme card ───────────────────────────────────────────────────────────────
function ThemeCard({ theme, isSelected, onLoad, onApply, onDuplicate, onRename, }) {
    const [editing, setEditing] = (0, react_1.useState)(false);
    const [nameInput, setNameInput] = (0, react_1.useState)(theme.displayName || theme.name);
    const commitRename = (0, react_1.useCallback)(() => {
        const trimmed = nameInput.trim();
        if (trimmed && trimmed !== (theme.displayName || theme.name)) {
            onRename(theme, trimmed);
        }
        setEditing(false);
    }, [nameInput, onRename, theme]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            border: isSelected
                ? '2px solid hsl(var(--accent, 221 83% 53%))'
                : '1px solid var(--border)',
            borderRadius: 8,
            padding: 12,
            cursor: 'pointer',
            background: isSelected ? 'var(--muted)' : 'var(--card)',
            transition: 'border-color 0.15s',
        }, onClick: () => onLoad(theme), children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }, children: [editing ? ((0, jsx_runtime_1.jsx)("input", { autoFocus: true, value: nameInput, onChange: (e) => setNameInput(e.target.value), onBlur: commitRename, onKeyDown: (e) => {
                            if (e.key === 'Enter')
                                commitRename();
                            if (e.key === 'Escape')
                                setEditing(false);
                        }, onClick: (e) => e.stopPropagation(), style: {
                            fontSize: 13,
                            fontWeight: 600,
                            border: '1px solid var(--border)',
                            borderRadius: 4,
                            padding: '1px 6px',
                            flex: 1,
                            background: 'var(--background)',
                            color: 'var(--foreground)',
                        } })) : ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: 13, fontWeight: 600, flex: 1, wordBreak: 'break-word' }, onDoubleClick: (e) => { e.stopPropagation(); setEditing(true); }, title: "Double-click to rename", children: theme.displayName || theme.name })), (0, jsx_runtime_1.jsx)(StatusBadge, { status: theme.status })] }), theme.displayName && theme.displayName !== theme.name && ((0, jsx_runtime_1.jsx)("div", { style: { fontSize: 10, color: 'var(--muted-foreground)', marginBottom: 4, fontFamily: 'monospace' }, children: theme.name })), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }, children: [(0, jsx_runtime_1.jsxs)("span", { style: { fontSize: 10, color: 'var(--muted-foreground)', fontFamily: 'monospace' }, children: ["v", theme.version] }), theme.isParentTemplate && ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: 10, background: 'var(--muted)', color: 'var(--muted-foreground)', padding: '1px 5px', borderRadius: 4 }, children: "parent" })), theme.tags.slice(0, 3).map((tag) => ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: 10, background: 'var(--muted)', color: 'var(--muted-foreground)', padding: '1px 5px', borderRadius: 4 }, children: tag }, tag)))] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: 6 }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: (e) => { e.stopPropagation(); onLoad(theme); }, style: btnStyle('primary'), children: "Edit" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: (e) => { e.stopPropagation(); onApply(theme); }, style: btnStyle('ghost'), children: "Apply" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: (e) => { e.stopPropagation(); onDuplicate(theme); }, style: btnStyle('ghost'), children: "Duplicate" })] })] }));
}
function btnStyle(variant) {
    return {
        fontSize: 11,
        fontWeight: 600,
        padding: '3px 10px',
        borderRadius: 4,
        border: variant === 'primary' ? 'none' : '1px solid var(--border)',
        background: variant === 'primary' ? 'hsl(var(--accent, 221 83% 53%))' : 'transparent',
        color: variant === 'primary' ? '#fff' : 'var(--foreground)',
        cursor: 'pointer',
    };
}
function ThemeBrowser({ ipSlug, supabaseUrl, supabaseAnonKey, apiEndpoint, onLoad, onApply, onDuplicate, onRename, selectedThemeId, className, }) {
    const [themes, setThemes] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [search, setSearch] = (0, react_1.useState)('');
    const fetchThemes = (0, react_1.useCallback)(async () => {
        var _a;
        setLoading(true);
        setError(null);
        try {
            let rows = [];
            if (apiEndpoint) {
                const url = new URL(apiEndpoint, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
                if (ipSlug)
                    url.searchParams.set('ip_slug', ipSlug);
                const res = await fetch(url.toString());
                if (!res.ok)
                    throw new Error(`API error ${res.status}`);
                const json = await res.json();
                rows = (_a = json.themes) !== null && _a !== void 0 ? _a : [];
            }
            else if (supabaseUrl && supabaseAnonKey) {
                let endpoint = `${supabaseUrl}/rest/v1/themes?order=is_parent_template.desc,name.asc&select=*`;
                if (ipSlug)
                    endpoint += `&ip_slug=eq.${ipSlug}`;
                const res = await fetch(endpoint, {
                    headers: {
                        apikey: supabaseAnonKey,
                        Authorization: `Bearer ${supabaseAnonKey}`,
                    },
                });
                if (!res.ok)
                    throw new Error(`Supabase error ${res.status}`);
                rows = await res.json();
            }
            else {
                setLoading(false);
                return;
            }
            setThemes(rows.map(Theme_1.mapDbRowToThemeComposite));
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load themes');
        }
        finally {
            setLoading(false);
        }
    }, [apiEndpoint, supabaseUrl, supabaseAnonKey, ipSlug]);
    (0, react_1.useEffect)(() => { fetchThemes(); }, [fetchThemes]);
    const filtered = themes.filter((t) => {
        var _a;
        if (!search)
            return true;
        const q = search.toLowerCase();
        return (t.name.toLowerCase().includes(q) ||
            ((_a = t.displayName) !== null && _a !== void 0 ? _a : '').toLowerCase().includes(q) ||
            t.tags.some((tag) => tag.toLowerCase().includes(q)));
    });
    const handleDuplicate = (0, react_1.useCallback)(async (original) => {
        const copy = Object.assign(Object.assign({}, original), { id: `temp-${Date.now()}`, name: `${original.name}-copy`, displayName: original.displayName ? `${original.displayName} (copy)` : undefined, status: 'draft', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        onDuplicate === null || onDuplicate === void 0 ? void 0 : onDuplicate(original, copy);
        // Optimistic UI: add to list
        setThemes((prev) => [...prev, copy]);
    }, [onDuplicate]);
    const handleRename = (0, react_1.useCallback)((theme, newDisplayName) => {
        setThemes((prev) => prev.map((t) => t.id === theme.id ? Object.assign(Object.assign({}, t), { displayName: newDisplayName }) : t));
        onRename === null || onRename === void 0 ? void 0 : onRename(theme, newDisplayName);
    }, [onRename]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: className, style: { display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)("h2", { style: { fontSize: 14, fontWeight: 700, color: 'var(--foreground)' }, children: ["Theme Browser", ipSlug && (0, jsx_runtime_1.jsx)("span", { style: { fontSize: 11, color: 'var(--muted-foreground)', marginLeft: 6 }, children: ipSlug })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: fetchThemes, title: "Refresh", style: { fontSize: 12, padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--foreground)' }, children: "\u21BA" })] }), (0, jsx_runtime_1.jsx)("input", { type: "search", placeholder: "Search by name or tag\u2026", value: search, onChange: (e) => setSearch(e.target.value), style: {
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid var(--border)',
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                    fontSize: 13,
                    boxSizing: 'border-box',
                } }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }, children: [loading && ((0, jsx_runtime_1.jsx)("div", { style: { textAlign: 'center', padding: 24, color: 'var(--muted-foreground)', fontSize: 13 }, children: "Loading themes\u2026" })), error && ((0, jsx_runtime_1.jsxs)("div", { style: { padding: 12, background: 'hsl(0 100% 95%)', border: '1px solid hsl(0 100% 80%)', borderRadius: 6, fontSize: 12, color: 'hsl(0 72% 40%)' }, children: [error, (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: fetchThemes, style: { marginLeft: 8, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: 12 }, children: "Retry" })] })), !loading && !error && filtered.length === 0 && ((0, jsx_runtime_1.jsx)("div", { style: { textAlign: 'center', padding: 24, color: 'var(--muted-foreground)', fontSize: 13 }, children: search ? `No themes matching "${search}"` : 'No themes found. Check your connection settings or create one.' })), filtered.map((theme) => ((0, jsx_runtime_1.jsx)(ThemeCard, { theme: theme, isSelected: theme.id === selectedThemeId, onLoad: onLoad !== null && onLoad !== void 0 ? onLoad : (() => undefined), onApply: onApply !== null && onApply !== void 0 ? onApply : (() => undefined), onDuplicate: handleDuplicate, onRename: handleRename }, theme.id)))] }), !loading && !error && ((0, jsx_runtime_1.jsxs)("div", { style: { fontSize: 11, color: 'var(--muted-foreground)', textAlign: 'right' }, children: [filtered.length, " of ", themes.length, " theme", themes.length !== 1 ? 's' : ''] }))] }));
}
