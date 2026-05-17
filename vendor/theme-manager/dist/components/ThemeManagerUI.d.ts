import type { ThemeComposite, ThemeDesignState } from '../types/Theme';
import type { ThemeBrowserProps } from './ThemeBrowser';
import type { ThemeEditorTools } from './ThemeEditor';
/**
 * Top-level orchestrator composing ThemeBrowser + ThemeEditor side by side.
 * Now driven by Layout Contract instead of primitive React grids.
 *
 * Accepts all ThemeBrowser connection props plus injected sub-tool components.
 * The Apply button calls `onApply` (provided by the host, e.g. hub page) so
 * CSS var injection logic stays in the consumer and is not hard-wired here.
 *
 * SSOT: DOCs/BUSINESS/BUSINESS_THEME_CONTRACT.md Section 9
 * Task:  BUSINESS_ROADMAP_TASK_027.md
 */
export interface ThemeManagerUIProps extends Pick<ThemeBrowserProps, 'ipSlug' | 'supabaseUrl' | 'supabaseAnonKey' | 'apiEndpoint'> {
    /** Sub-tool components rendered in ThemeEditor tabs */
    tools?: ThemeEditorTools;
    /** Called when the Apply button is clicked */
    onApply?: (theme: ThemeComposite, designState: ThemeDesignState) => void;
    /** Called when Save is clicked — host must handle DB write */
    onSave?: (theme: ThemeComposite, designState: ThemeDesignState) => Promise<void>;
    /** Called when the browser duplicates a theme — host must persist to DB */
    onDuplicate?: (original: ThemeComposite, copy: ThemeComposite) => void;
    /** Called when the browser renames a theme — host must persist display_name to DB */
    onRename?: (theme: ThemeComposite, newDisplayName: string) => void;
    className?: string;
}
export declare function ThemeManagerUI({ ipSlug, supabaseUrl, supabaseAnonKey, apiEndpoint, tools, onApply, onSave, onDuplicate, onRename, className, }: ThemeManagerUIProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ThemeManagerUI.d.ts.map