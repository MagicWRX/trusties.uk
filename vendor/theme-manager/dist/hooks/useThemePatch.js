"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemePatch = useThemePatch;
const react_1 = require("react");
// ─── Hook ────────────────────────────────────────────────────────────────────
/**
 * useThemePatch — debounced, auto-snapshotting theme PATCH hook.
 *
 * Usage (in ThemeEditor or any component that has access to the selected theme):
 *
 * ```tsx
 * const { patch, saving, lastSaved, error } = useThemePatch(theme.id, {
 *   apiEndpoint: `${adminUrl}/api/admin/themes`,
 *   snapshotEndpoint: `${adminUrl}/api/admin/themes/snapshot`,
 * });
 *
 * // Wire to sub-tool onStateChange:
 * <FontManager onStateChange={(s) => patch({ font_selection: s.fontSelection })} />
 * ```
 *
 * SSOT: DOCs/BUSINESS/BUSINESS_THEME_CONTRACT.md Section 9 (Save Cycle)
 * Task: BUSINESS_ROADMAP_TASK_030.md
 */
function useThemePatch(themeId, options = {}) {
    const { apiEndpoint = '/api/admin/themes', snapshotEndpoint = '/api/admin/themes/snapshot', debounceMs = 500, onSaved, onError, } = options;
    const [saving, setSaving] = (0, react_1.useState)(false);
    const [lastSaved, setLastSaved] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    // Accumulate pending field updates between debounce flushes
    const pendingRef = (0, react_1.useRef)({});
    const timerRef = (0, react_1.useRef)(null);
    // Track the themeId in a ref so the flush closure always reads the latest
    const themeIdRef = (0, react_1.useRef)(themeId);
    (0, react_1.useEffect)(() => { themeIdRef.current = themeId; }, [themeId]);
    const flush = (0, react_1.useCallback)(async () => {
        const fields = pendingRef.current;
        if (Object.keys(fields).length === 0)
            return;
        // Reset pending before async work so any updates queued during the flight
        // accumulate in a fresh object
        pendingRef.current = {};
        const currentThemeId = themeIdRef.current;
        setSaving(true);
        setError(null);
        try {
            // Step 1 — pre-save snapshot (swallow 503 gracefully)
            try {
                await fetch(snapshotEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ themeId: currentThemeId, reason: 'pre-save' }),
                });
                // 503 = migration pending, any other error = non-blocking
            }
            catch (_a) {
                // Network error on snapshot — proceed with save anyway
            }
            // Step 2 — PATCH the theme (ID in body, not URL)
            const res = await fetch(apiEndpoint, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.assign({ id: currentThemeId }, fields)),
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Save failed (${res.status}): ${text}`);
            }
            const savedAt = new Date();
            setLastSaved(savedAt);
            onSaved === null || onSaved === void 0 ? void 0 : onSaved(savedAt);
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg);
            onError === null || onError === void 0 ? void 0 : onError(msg);
        }
        finally {
            setSaving(false);
        }
    }, [apiEndpoint, snapshotEndpoint, onSaved, onError]);
    const patch = (0, react_1.useCallback)((fields) => {
        // Merge incoming fields into the pending accumulator
        pendingRef.current = Object.assign(Object.assign({}, pendingRef.current), fields);
        // Show "saving" indicator immediately so the UI feels responsive
        setSaving(true);
        setError(null);
        // Debounce the network flush
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            timerRef.current = null;
            flush();
        }, debounceMs);
    }, [debounceMs, flush]);
    // Clear the debounce timer on unmount to prevent setState on unmounted component
    (0, react_1.useEffect)(() => {
        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);
    return { patch, saving, lastSaved, error };
}
