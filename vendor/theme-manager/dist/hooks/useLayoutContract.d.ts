import type { LayoutContract, LayoutRegion, ThemeContainer } from '../types/LayoutContract';
export type UseLayoutContractOptions = {
    /** Default template name to load first (if no stored preference) */
    defaultTemplate?: string;
    /**
     * Supabase project URL (e.g. from process.env.NEXT_PUBLIC_SUPABASE_URL).
     * When provided with supabaseAnonKey, fetches directly from Supabase REST API.
     * This is the preferred mode for non-ADMIN apps.
     */
    supabaseUrl?: string;
    /** Supabase anon key (e.g. from process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) */
    supabaseAnonKey?: string;
    /**
     * Custom API endpoint (e.g. '/api/admin/layout-contracts').
     * Used when Supabase credentials are not provided.
     * The endpoint must return { layouts: [...], containers: [...] }.
     */
    apiEndpoint?: string;
};
export type LayoutContractState = {
    /** The active layout contract (null if loading or no data) */
    layout: LayoutContract | null;
    /** All layouts for this IP (for template switching) */
    layouts: LayoutContract[];
    /** Loading state */
    loading: boolean;
    /** Error message */
    error: string | null;
    /** The active template name */
    activeTemplate: string | null;
};
export type UseLayoutContractReturn = LayoutContractState & {
    /** Switch to a different layout template */
    setActiveTemplate: (templateName: string) => void;
    /** Get containers for a specific region in the active layout */
    getRegionContainers: (regionName: string) => ThemeContainer[];
    /** Get a specific container by region and name */
    getContainerByName: (regionName: string, containerName: string) => ThemeContainer | undefined;
    /** Get the CSS grid style object for the active layout */
    gridStyle: React.CSSProperties;
    /** Get responsive grid style for a breakpoint */
    responsiveGridStyle: (breakpoint: 'mobile' | 'tablet') => React.CSSProperties;
    /** Get classes for a specific region */
    regionClasses: (regionName: string) => string;
    /** Get classes for a specific container */
    containerClasses: (regionName: string, containerName: string) => string;
    /** Refresh layout data from API */
    refresh: () => Promise<void>;
    /** All regions in display order */
    orderedRegions: LayoutRegion[];
};
/**
 * Client-side hook for consuming layout contracts from Supabase.
 *
 * Supports two fetch modes:
 * 1. **Direct Supabase** (preferred) — provide `supabaseUrl` + `supabaseAnonKey`
 * 2. **API endpoint** — provide `apiEndpoint` (e.g. within ADMIN)
 *
 * Usage:
 * ```tsx
 * const {
 *   layout, loading, gridStyle, orderedRegions,
 *   getRegionContainers, containerClasses
 * } = useLayoutContract('pixelextreme', {
 *   defaultTemplate: 'pixel-editor-3panel',
 *   supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
 *   supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
 * });
 * ```
 *
 * @param ipSlug - IP identifier (e.g. 'pixelextreme', 'admin', 'mxn')
 * @param options - Configuration options (Supabase credentials or API endpoint)
 */
export default function useLayoutContract(ipSlug: string, options?: UseLayoutContractOptions): UseLayoutContractReturn;
//# sourceMappingURL=useLayoutContract.d.ts.map