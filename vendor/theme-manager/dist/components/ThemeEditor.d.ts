import type { ThemeComposite, ThemeDesignState, ThemeButtonVariant } from '../types/Theme';
/**
 * A renderable tool component — typed as a plain function (not React.ComponentType)
 * so consumers on React 18 don't hit contextType $$typeof mismatch across
 * @types/react versions.
 */
type ToolFn<P = Record<string, unknown>> = (props: P) => any;
/**
 * Minimum props each sub-tool must satisfy when injected via `tools`.
 * Use forward-declared interfaces at the call site so builds don't depend
 * on the installed published types.
 */
export interface ThemeEditorTools {
    LayoutManager?: ToolFn<{
        designState?: {
            fontSelection?: {
                primary?: {
                    family: string;
                };
            };
            colorPalette?: {
                primary?: string;
                accent?: string;
            };
        };
    }>;
    FontManager?: ToolFn<{
        onStateChange?: (partial: {
            fontSelection: {
                primary: {
                    family: string;
                    weights: number[];
                };
                secondary: {
                    family: string;
                    weights: number[];
                };
            };
        }) => void;
    }>;
    ColorPalette?: ToolFn<{
        onStateChange?: (partial: {
            colorPalette: {
                colors: string[];
                primary: string;
                accent: string;
            };
        }) => void;
    }>;
    ButtonDesigner?: ToolFn<{
        onStateChange?: (partial: {
            buttonVariants: ThemeButtonVariant[];
        }) => void;
    }>;
    BubbleDesigner?: ToolFn<{
        onStateChange?: (partial: {
            designSettings: {
                effects: Record<string, unknown>;
            };
        }) => void;
    }>;
    PageEditor?: ToolFn<Record<string, never>>;
}
export interface ThemeEditorProps {
    theme: ThemeComposite;
    /** Sub-tool components to render inside each tab */
    tools?: ThemeEditorTools;
    /** Called when designer saves current state to DB */
    onSave?: (theme: ThemeComposite, designState: ThemeDesignState) => Promise<void>;
    /** Called when designer applies theme to the page */
    onApply?: (theme: ThemeComposite, designState: ThemeDesignState) => void;
    /** Called to close the editor */
    onClose?: () => void;
    /**
     * When set, enables auto-save: each sub-tool onStateChange debounce-patches
     * the theme via useThemePatch. Should be the full ADMIN API base URL,
     * e.g. 'https://admin.example.com/api/admin/themes'.
     * SSOT: DOCs/BUSINESS/BUSINESS_THEME_CONTRACT.md Section 9
     */
    autoSaveEndpoint?: string;
    /**
     * URL of a deployed IP website for the live preview iframe.
     * After each successful auto-save, the iframe is reloaded with a cache-bust
     * query param so designers can see theme changes without a redeploy.
     */
    previewUrl?: string;
    className?: string;
}
export declare function ThemeEditor({ theme, tools, onSave, onApply, onClose, autoSaveEndpoint, previewUrl, className, }: ThemeEditorProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ThemeEditor.d.ts.map