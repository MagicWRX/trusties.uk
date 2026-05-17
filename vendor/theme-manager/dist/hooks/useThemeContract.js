"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeContract = useThemeContract;
const react_1 = require("react");
const ThemeContract_1 = require("../types/ThemeContract");
/**
 * Client-side hook for fetching and applying a ThemeContract from Supabase.
 *
 * This hook:
 * 1. Fetches the contract for the given ipSlug (or fallback)
 * 2. Applies the tokens as CSS variables to <html style="...">
 * 3. Handles mode changes automatically if 'mode' is not provided.
 */
function useThemeContract(ipSlug, options = {}) {
    const { supabaseUrl, supabaseAnonKey, defaultIpSlug, mode: providedMode } = options;
    const [contract, setContract] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [activeMode, setActiveMode] = (0, react_1.useState)(providedMode || 'dark');
    const slug = ipSlug || defaultIpSlug;
    // 1. Fetch Contract
    (0, react_1.useEffect)(() => {
        if (!slug || !supabaseUrl || !supabaseAnonKey)
            return;
        async function fetchContract() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${supabaseUrl}/rest/v1/theme_contracts?ip_slug=eq.${encodeURIComponent(slug)}&status=eq.active&limit=1`, {
                    headers: {
                        apikey: supabaseAnonKey,
                        Authorization: `Bearer ${supabaseAnonKey}`,
                    },
                });
                if (!response.ok)
                    throw new Error(`Fetch failed: ${response.status}`);
                const rows = await response.json();
                if (Array.isArray(rows) && rows.length > 0) {
                    setContract(rows[0]);
                }
            }
            catch (err) {
                setError(err.message);
                console.error('[theme-manager] useThemeContract fetch error:', err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchContract();
    }, [slug, supabaseUrl, supabaseAnonKey]);
    // 2. Track Mode (if not provided)
    (0, react_1.useEffect)(() => {
        if (providedMode) {
            setActiveMode(providedMode);
            return;
        }
        const html = document.documentElement;
        const observer = new MutationObserver(() => {
            const mode = html.dataset.theme === 'light' ? 'light' : 'dark';
            setActiveMode(mode);
        });
        observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
        // Initial sync
        const initialMode = html.dataset.theme === 'light' ? 'light' : 'dark';
        setActiveMode(initialMode);
        return () => observer.disconnect();
    }, [providedMode]);
    // 3. Apply Tokens to DOM
    (0, react_1.useEffect)(() => {
        if (!contract)
            return;
        const styles = (0, ThemeContract_1.contractToCssVars)(contract, activeMode);
        const html = document.documentElement;
        for (const [key, value] of Object.entries(styles)) {
            if (typeof value === 'string') {
                html.style.setProperty(key, value);
            }
        }
    }, [contract, activeMode]);
    return { contract, loading, error };
}
