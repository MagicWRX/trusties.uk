/**
 * Server-side theme contract fetching.
 * DO NOT import this in client components — server-only.
 *
 * Fetches the theme contract for a given IP from Supabase.
 * Falls back to null on error (graceful degradation to theme-manager localStorage defaults).
 *
 * SSOT: DOCs/BUSINESS/BUSINESS_THEME_CONTRACT.md Section 7
 */
import { ThemeContract } from '../types/ThemeContract';
/**
 * Fetch a theme contract from Supabase by IP slug.
 *
 * @param ipSlug - The IP identifier (e.g. 'admin', 'mxn', 'magicwrx')
 * @param supabaseUrl - The Supabase project URL (NEXT_PUBLIC_SUPABASE_URL)
 * @param supabaseAnonKey - The Supabase anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
 * @returns ThemeContract or null on error
 *
 * Usage in Server Components:
 * ```tsx
 * const contract = await fetchThemeContract('mxn', process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
 * ```
 */
export declare function fetchThemeContract(ipSlug: string, supabaseUrl?: string, supabaseAnonKey?: string): Promise<ThemeContract | null>;
//# sourceMappingURL=fetchThemeContract.d.ts.map