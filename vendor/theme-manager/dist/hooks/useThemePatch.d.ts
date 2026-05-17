export interface UseThemePatchOptions {
    /**
     * PATCH endpoint for the themes API.
     * Defaults to '/api/admin/themes'.
     * The route reads `id` from the request body (not the URL path).
     */
    apiEndpoint?: string;
    /**
     * Snapshot endpoint — called BEFORE each PATCH to create a pre-save backup.
     * Defaults to '/api/admin/themes/snapshot'.
     * A 503 response (migration pending) is swallowed silently so saves still proceed.
     */
    snapshotEndpoint?: string;
    /**
     * Debounce delay in milliseconds before flushing pending patches to the API.
     * Default: 500ms.
     */
    debounceMs?: number;
    /** Called after each successful save with the timestamp of the save. */
    onSaved?: (savedAt: Date) => void;
    /** Called after a save failure with the error message. */
    onError?: (error: string) => void;
}
export interface UseThemePatchReturn {
    /**
     * Queue a partial update for this theme. Calls are debounced — rapid
     * successive calls merge and flush as a single PATCH after `debounceMs`.
     *
     * Keys map to the `themes` table column names (snake_case accepted),
     * e.g. { font_selection: { primary: { family: 'Inter' } } }
     */
    patch: (fields: Record<string, unknown>) => void;
    /** True while a debounced flush is pending or the network call is in flight. */
    saving: boolean;
    /** Timestamp of the most recent successful save, or null if not yet saved. */
    lastSaved: Date | null;
    /** Error message from the most recent failed save, or null. */
    error: string | null;
}
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
export declare function useThemePatch(themeId: string, options?: UseThemePatchOptions): UseThemePatchReturn;
//# sourceMappingURL=useThemePatch.d.ts.map