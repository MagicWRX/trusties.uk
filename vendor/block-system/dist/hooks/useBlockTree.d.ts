import type { Block, BlockLayerName, BlockTree } from '../types';
export interface UseBlockTreeOptions {
    /**
     * Direct Supabase access (preferred for non-ADMIN apps).
     * The hook talks directly to Supabase REST without a proxy.
     */
    supabaseUrl?: string;
    supabaseAnonKey?: string;
    /**
     * API endpoint (preferred for ADMIN, avoids exposing anon key).
     * e.g. '/api/admin/blocks'
     */
    apiEndpoint?: string;
    /** Page/view context — filters blocks fetched. Default: 'default' */
    context?: string;
    /** Disable auto-fetch on mount */
    disabled?: boolean;
}
export interface UseBlockTreeReturn {
    /** The full block index keyed by id */
    blocks: Record<string, Block>;
    /** Whether a fetch is in progress */
    loading: boolean;
    /** Last fetch error, if any */
    error: string | null;
    /** Re-fetch blocks from Supabase / API */
    refetch: () => Promise<void>;
    /** Add a new blank block to a given layer (optimistic + persisted) */
    addBlock: (layer: BlockLayerName, overrides?: Partial<Block>) => Promise<Block | null>;
    /** Update a single block field (optimistic) */
    updateBlock: (id: string, patch: Partial<Block>) => void;
    /** Toggle visibility */
    toggleVisible: (id: string, visible: boolean) => void;
    /** Toggle lock state */
    toggleLocked: (id: string, locked: boolean) => void;
    /** Remove a block */
    removeBlock: (id: string) => void;
}
/**
 * useBlockTree — client hook for fetching + managing all blocks for an IP.
 *
 * Two fetch modes:
 *   1. Direct Supabase (`supabaseUrl` + `supabaseAnonKey`) — for non-ADMIN apps
 *   2. API endpoint (`apiEndpoint`) — for ADMIN
 *
 * Graceful fallback: if fetch fails, `blocks` returns `{}` — no crash.
 *
 * SSOT: DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md
 */
export declare function useBlockTree(ipSlug: string, options?: UseBlockTreeOptions): UseBlockTreeReturn;
export type { BlockTree };
//# sourceMappingURL=useBlockTree.d.ts.map