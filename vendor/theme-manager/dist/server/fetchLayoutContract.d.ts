/**
 * Server-side layout contract fetching.
 * DO NOT import this in client components — server-only.
 *
 * Fetches layout contracts and their containers from Supabase.
 * Falls back to null on error (graceful degradation).
 *
 * DB SSOT: Supabase layout_contracts + theme_containers tables (migration 014)
 */
import { LayoutContract } from '../types/LayoutContract';
/**
 * Fetch all layout contracts for a given IP slug, with their containers.
 *
 * @param ipSlug - The IP identifier (e.g. 'pixelextreme', 'admin', 'mxn')
 * @param supabaseUrl - Supabase project URL
 * @param supabaseAnonKey - Supabase anon key
 * @returns Array of LayoutContracts with populated containers, or empty array on error
 */
export declare function fetchLayoutContracts(ipSlug: string, supabaseUrl?: string, supabaseAnonKey?: string): Promise<LayoutContract[]>;
/**
 * Fetch a single layout contract by IP slug and template name.
 *
 * @param ipSlug - The IP identifier
 * @param templateName - The template name (e.g. 'pixel-editor-3panel')
 * @returns LayoutContract with containers, or null
 */
export declare function fetchLayoutContract(ipSlug: string, templateName: string, supabaseUrl?: string, supabaseAnonKey?: string): Promise<LayoutContract | null>;
//# sourceMappingURL=fetchLayoutContract.d.ts.map