"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthCallback;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const client_1 = require("../lib/supabase/client");
function getSafeNextPath(raw) {
    if (!raw)
        return '/dashboard';
    if (!raw.startsWith('/') || raw.startsWith('//'))
        return '/dashboard';
    return raw;
}
function AuthCallbackInner({ fallbackPath = '/dashboard', errorPath = '/login' }) {
    const router = (0, navigation_1.useRouter)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const supabase = (0, react_1.useMemo)(() => (0, client_1.createClient)(), []);
    const [status, setStatus] = (0, react_1.useState)('working');
    const [message, setMessage] = (0, react_1.useState)('Completing sign-in…');
    const nextPath = (0, react_1.useMemo)(() => {
        const nextParam = searchParams.get('next') || searchParams.get('redirect_to');
        return getSafeNextPath(nextParam) || fallbackPath;
    }, [searchParams, fallbackPath]);
    (0, react_1.useEffect)(() => {
        const run = async () => {
            const error = searchParams.get('error') || searchParams.get('error_description');
            if (error) {
                setStatus('error');
                setMessage(error);
                return;
            }
            const code = searchParams.get('code');
            let resolvedNextPath = nextPath;
            if (!(searchParams.get('next') || searchParams.get('redirect_to'))) {
                try {
                    const stored = globalThis.sessionStorage?.getItem('mw_oauth_next');
                    if (stored) {
                        resolvedNextPath = getSafeNextPath(stored);
                        globalThis.sessionStorage?.removeItem('mw_oauth_next');
                    }
                }
                catch {
                    // ignore storage failures
                }
            }
            try {
                // If there is no code, just continue to the destination.
                if (!code) {
                    router.replace(resolvedNextPath);
                    router.refresh();
                    return;
                }
                const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
                if (exchangeError) {
                    const msg = exchangeError?.message || '';
                    // If the PKCE verifier is missing (often due to storage/cookie oddities),
                    // but the user is already signed in, proceed normally.
                    if (msg.includes('PKCE code verifier not found')) {
                        const { data: sessionData } = await supabase.auth.getSession();
                        if (sessionData?.session) {
                            router.replace(resolvedNextPath);
                            router.refresh();
                            return;
                        }
                    }
                    throw exchangeError;
                }
                router.replace(resolvedNextPath);
                router.refresh();
            }
            catch (e) {
                setStatus('error');
                setMessage(e?.message || 'Authentication failed');
            }
        };
        void run();
    }, [nextPath, router, searchParams, supabase, fallbackPath]);
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center bg-background px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-md w-full space-y-4 rounded-lg border border-border bg-white p-6", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-semibold text-foreground", children: "Auth Callback" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: message }), status === 'error' && ((0, jsx_runtime_1.jsx)("div", { className: "text-sm", children: (0, jsx_runtime_1.jsx)(link_1.default, { className: "underline", href: errorPath, children: "Back to Sign In" }) }))] }) }));
}
function AuthCallback({ fallbackPath, errorPath }) {
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center bg-background px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-md w-full space-y-4 rounded-lg border border-border bg-white p-6", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-semibold text-foreground", children: "Auth Callback" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: "Completing sign-in\u2026" })] }) }), children: (0, jsx_runtime_1.jsx)(AuthCallbackInner, { fallbackPath: fallbackPath, errorPath: errorPath }) }));
}
