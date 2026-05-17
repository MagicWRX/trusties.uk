import type { ThemeComposite } from '../types/Theme';
export interface ThemeBrowserProps {
    /** Filter themes to this IP slug; show all when undefined */
    ipSlug?: string;
    /** Supabase anon key for direct fetch */
    supabaseUrl?: string;
    supabaseAnonKey?: string;
    /** ADMIN API route, e.g. '/api/admin/themes' */
    apiEndpoint?: string;
    /** Called when designer clicks Edit on a theme */
    onLoad?: (theme: ThemeComposite) => void;
    /** Called when designer clicks Apply on a theme card */
    onApply?: (theme: ThemeComposite) => void;
    /** Called when designer duplicates a theme */
    onDuplicate?: (original: ThemeComposite, copy: ThemeComposite) => void;
    /** Called when designer renames a theme (display_name change) */
    onRename?: (theme: ThemeComposite, newDisplayName: string) => void;
    selectedThemeId?: string;
    className?: string;
}
export declare function ThemeBrowser({ ipSlug, supabaseUrl, supabaseAnonKey, apiEndpoint, onLoad, onApply, onDuplicate, onRename, selectedThemeId, className, }: ThemeBrowserProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ThemeBrowser.d.ts.map