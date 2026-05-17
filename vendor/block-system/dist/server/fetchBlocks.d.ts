import type { Block, BlockTree } from '../types';
export interface FetchBlocksOptions {
    /** Supabase project URL */
    supabaseUrl: string;
    /** Supabase service-role or anon key (server-side: use service-role) */
    supabaseKey: string;
    /** Page/view context filter — e.g. 'home', 'editor'. Default: 'default' */
    context?: string;
    /**
     * Next.js cache strategy.
     * - 'no-store'  → always fresh (use for editor views that need live data)
     * - 'force-cache' → cache forever (use for static marketing pages)
     * - { revalidate: N } → ISR-style (default: 300s)
     */
    cache?: RequestCache | {
        revalidate: number;
    };
}
/**
 * fetchBlocks — server-side fetcher for all blocks belonging to an IP slug.
 *
 * Returns a BlockTree (all blocks keyed by id) or null on error.
 * Designed for Server Components and API Route Handlers.
 */
export declare function fetchBlocks(ipSlug: string, context: string | undefined, options: FetchBlocksOptions): Promise<BlockTree | null>;
/**
 * fetchBlock — server-side fetcher for a single block by ID.
 * Returns null when not found or on error.
 */
export declare function fetchBlock(blockId: string, options: FetchBlocksOptions): Promise<Block | null>;
//# sourceMappingURL=fetchBlocks.d.ts.map