import React from 'react';
import type { Block } from '../types';
export interface BlockLayerPortalProps {
    /**
     * Blocks to render in the portal.
     * Only 'animation' and 'art' typed blocks are injected via portal by default.
     * Pass `includeTypes` to override which types use portal rendering.
     */
    blocks: Record<string, Block>;
    /**
     * Block types that should be rendered via portal (outside React tree).
     * Defaults to ['animation', 'art'].
     */
    includeTypes?: string[];
    /**
     * Render function for a single block.
     * If not provided, falls back to a minimal placeholder div.
     */
    renderBlock?: (block: Block) => React.ReactNode;
    /**
     * Target DOM element to portal into. Defaults to document.body.
     */
    target?: HTMLElement | null;
    className?: string;
}
/**
 * BlockLayerPortal — renders floating blocks (animation, art) outside the React
 * tree by portaling into document.body (or a custom target).
 *
 * This is the Glam Move:
 * - Put a glitter particle field behind every IP without touching layout grid.
 * - All `animation` and `art` blocks live in overlay / background bands.
 * - `pointer-events: none` ensures they never capture user interactions.
 *
 * Usage:
 *   <BlockLayerPortal blocks={blockTree.blocks} renderBlock={myRenderer} />
 *
 * SSOT: DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md Section 4
 */
export declare function BlockLayerPortal({ blocks, includeTypes, renderBlock, target, className, }: BlockLayerPortalProps): React.ReactPortal | null;
//# sourceMappingURL=BlockLayerPortal.d.ts.map