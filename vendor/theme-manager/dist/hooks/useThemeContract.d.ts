import type { ThemeContract } from '../types/ThemeContract';
export interface UseThemeContractOptions {
    /** Supabase project URL (NEXT_PUBLIC_SUPABASE_URL) */
    supabaseUrl?: string;
    /** Supabase anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY) */
    supabaseAnonKey?: string;
    /** Fallback IP slug if none detected */
    defaultIpSlug?: string;
    /** Current mode ('light' | 'dark'). If omitted, data-theme attribute is used. */
    mode?: 'light' | 'dark';
}
/**
 * Client-side hook for fetching and applying a ThemeContract from Supabase.
 *
 * This hook:
 * 1. Fetches the contract for the given ipSlug (or fallback)
 * 2. Applies the tokens as CSS variables to <html style="...">
 * 3. Handles mode changes automatically if 'mode' is not provided.
 */
export declare function useThemeContract(ipSlug: string | undefined, options?: UseThemeContractOptions): {
    contract: ThemeContract | null;
    loading: boolean;
    error: string | null;
};
//# sourceMappingURL=useThemeContract.d.ts.map