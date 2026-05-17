/**
 * Block types — what a blank Block can become once the user defines it.
 * 'blank' is the default; all others render specific leaf components.
 */
export type BlockType = 'blank' | 'text' | 'heading' | 'image' | 'card' | 'link-group' | 'form' | 'button' | 'divider' | 'container' | 'columns' | 'video' | 'gallery' | 'art' | 'animation' | 'code' | 'canvas' | 'blog-preview' | 'thread-preview' | 'pixel-frame';
/**
 * Block position — how the block interacts with the document flow.
 * 'in-flow' is the default (inside a Container / Region).
 * Other values produce floating blocks (absolute/fixed/sticky).
 */
export type BlockPosition = 'in-flow' | 'absolute' | 'fixed' | 'sticky';
/**
 * Block layer — Photoshop-style z-index band.
 * Maps to the LayersPanel UI groupings.
 */
export type BlockLayerName = 'background' | 'content' | 'overlay' | 'hud';
/**
 * Block coordinate descriptor — used when position !== 'in-flow'.
 */
export interface BlockCoords {
    x: number;
    y: number;
    width?: number;
    height?: number;
    xUnit?: 'px' | '%' | 'vw';
    yUnit?: 'px' | '%' | 'vh';
}
/**
 * Block — the universal content atom of the AMS Ecosystem.
 *
 * A Block starts as 'blank' and is promoted to a typed content node.
 * Blocks can be in-flow (inside layout regions) or floating (in LayerStack).
 *
 * DB: ip_slug → blocks table (migration 017)
 * SSOT: DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md
 */
export interface Block {
    id: string;
    /** Parent block ID — null means root-level */
    parentId: string | null;
    /** Which ThemeContainer hosts this block — null for floating blocks */
    containerId: string | null;
    /** Human label shown in the Layers Panel */
    displayName: string;
    type: BlockType;
    position: BlockPosition;
    /** Position coordinates — only relevant when position !== 'in-flow' */
    coords?: BlockCoords;
    /** Photoshop-style z-index band */
    layer: BlockLayerName;
    /** Tailwind class bundle */
    classes: string;
    /** Inline CSS overrides merged on top of classes */
    styleOverrides: Record<string, string>;
    /** Freeform custom CSS injected into a scoped <style> tag */
    customCss?: string;
    /** Type-specific content payload */
    content?: Record<string, unknown>;
    /** Ordered child block IDs */
    children: string[];
    visible: boolean;
    locked: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
}
/** Layer band metadata used by the LayersPanel UI */
export interface BlockLayerBand {
    name: BlockLayerName;
    label: string;
    zRange: [number, number];
    /** Optional layer-scoped CSS (keyframes, filters, etc.) */
    layerCss?: string;
}
export declare const BLOCK_LAYER_BANDS: BlockLayerBand[];
/**
 * BlockTree — the full in-memory representation of all blocks for a given
 * IP page/view. Keyed by block ID for O(1) lookup.
 */
export interface BlockTree {
    /** IP this tree belongs to */
    ipSlug: string;
    /** Page/view context — e.g. 'home', 'editor', 'gallery' */
    context: string;
    /** All blocks keyed by id */
    blocks: Record<string, Block>;
    /** Last fetched / updated at */
    fetchedAt: string;
}
/** DB row mapper — snake_case DB → camelCase Block */
export declare function mapDbRowToBlock(row: Record<string, unknown>): Block;
/** Creates a minimal blank block with sensible defaults */
export declare function createBlankBlock(id: string, layer?: BlockLayerName, overrides?: Partial<Block>): Block;
//# sourceMappingURL=index.d.ts.map