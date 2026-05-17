import React from 'react';
import type { Block } from '../types';
export interface BlockRendererProps {
    block: Block;
    /**
     * Override renderer for specific block types.
     * Return `null` to fall back to default rendering.
     */
    renderers?: Partial<Record<string, (block: Block) => React.ReactNode>>;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * BlockRenderer — renders a single Block to its appropriate leaf component.
 *
 * Handles all built-in block types. Extend via the `renderers` prop for
 * custom types (animation, art, pixel-frame, etc.).
 *
 * SSOT: DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md Section 3
 */
export declare function BlockRenderer({ block, renderers, className, style }: BlockRendererProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=BlockRenderer.d.ts.map