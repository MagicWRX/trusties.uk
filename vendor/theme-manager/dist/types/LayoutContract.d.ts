/**
 * LayoutContract — TypeScript interfaces for the Supabase layout system.
 * DB SSOT: Supabase layout_contracts + theme_containers tables (migration 014)
 *
 * Architecture:
 *   layout_contracts → Named layout templates with region definitions
 *   theme_containers → Styled component containers placed within regions
 */
export interface LayoutRegion {
    /** Unique region identifier within the layout (e.g. "header", "left-sidebar") */
    name: string;
    /** Human-readable label (e.g. "Tool Panel") */
    displayName: string;
    /** CSS Grid area name for grid-template-areas */
    gridArea: string;
    /** Tailwind/CSS classes applied to the region container */
    classes: string;
    /** Sort order for rendering */
    order: number;
}
export interface ResponsiveConfig {
    mobile?: {
        gridTemplate?: string;
        layout?: 'stack' | '2col' | '3col';
        sidebarCollapsed?: boolean;
        controlBarOverlay?: boolean;
    };
    tablet?: {
        gridTemplate?: string;
        layout?: 'stack' | '2col' | '3col';
    };
}
export interface LayoutContract {
    id: string;
    ipSlug: string;
    templateName: string;
    displayName: string;
    description: string;
    regions: LayoutRegion[];
    gridTemplate: string;
    responsive: ResponsiveConfig;
    version: string;
    status: 'active' | 'deprecated';
    createdAt: string;
    updatedAt: string;
    /** Populated from joined theme_containers rows */
    containers?: ThemeContainer[];
}
export interface ThemeContainer {
    id: string;
    layoutId: string;
    regionName: string;
    containerName: string;
    displayName: string;
    /** Tailwind class bundle */
    classes: string;
    /** Optional inline CSS overrides */
    styleOverrides: React.CSSProperties;
    sortOrder: number;
    isDraggable: boolean;
    status: 'active' | 'deprecated';
    createdAt: string;
    updatedAt: string;
}
/**
 * Convert a DB row (snake_case) to LayoutContract (camelCase).
 */
export declare function mapDbRowToLayoutContract(row: Record<string, unknown>, containers?: ThemeContainer[]): LayoutContract;
/**
 * Convert a DB row (snake_case) to ThemeContainer (camelCase).
 */
export declare function mapDbRowToThemeContainer(row: Record<string, unknown>): ThemeContainer;
/**
 * Get containers for a specific region from a layout contract.
 */
export declare function getContainersForRegion(contract: LayoutContract, regionName: string): ThemeContainer[];
/**
 * Get a specific container by name from a layout contract.
 */
export declare function getContainer(contract: LayoutContract, regionName: string, containerName: string): ThemeContainer | undefined;
//# sourceMappingURL=LayoutContract.d.ts.map