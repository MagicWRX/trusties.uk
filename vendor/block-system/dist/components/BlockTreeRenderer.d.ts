import React from 'react';
import type { Block } from '../types';
import type { UseBlockTreeOptions } from '../hooks/useBlockTree';
export interface BlockTreeRendererProps {
    /** IP slug — identifies which site's blocks to fetch */
    ipSlug: string;
    /** Page/view context — e.g. 'landing', 'editor', 'about'. Default: 'default' */
    context?: string;
    /** Fetch options: direct Supabase or API endpoint */
    options: UseBlockTreeOptions;
    /**
     * Per-type custom renderers.
     * The second argument is pre-rendered children (for container-type blocks).
     * Return `undefined` to fall back to the default renderer.
     */
    renderers?: Partial<Record<string, (block: Block, children: React.ReactNode) => React.ReactNode>>;
    /** Shown during fetch */
    skeleton?: React.ReactNode;
    /**
     * Shown when blocks are empty, fetch fails, or Supabase is not configured.
     * Progressive enhancement: the page still loads, just with fallback content.
     */
    fallback?: React.ReactNode;
    /** Optional class on the root wrapper div */
    className?: string;
}
/**
 * BlockTreeRenderer — the canonical top-level component for block-driven pages.
 *
 * 1. Fetches a BlockTree for the given IP + context
 * 2. Walks root → children recursively via BlockNode
 * 3. Renders each block via BlockRenderer (leaf) or the container pattern
 *
 * Progressive enhancement: if Supabase is unconfigured or fetch fails,
 * renders `fallback` — the page never crashes.
 *
 * Every IP landing page should use this directly.
 * SSOT: TASK-075, DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md
 */
export declare function BlockTreeRenderer({ ipSlug, context, options, renderers, skeleton, fallback, className, }: BlockTreeRendererProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=BlockTreeRenderer.d.ts.map