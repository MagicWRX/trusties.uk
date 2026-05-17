"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LogoutButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("../lib/supabase/client");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
function LogoutButton() {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const router = (0, navigation_1.useRouter)();
    const supabase = (0, client_1.createClient)();
    const handleLogout = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error.message);
                alert('Error logging out: ' + error.message);
            }
            else {
                router.push('/login');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred');
        }
        finally {
            setLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)("button", { onClick: handleLogout, disabled: loading, className: "w-full flex justify-center py-3 px-4 rounded-lg border border-rose-500/60 bg-rose-600/90 text-sm font-medium text-white shadow-[0_8px_30px_-12px_rgba(244,63,94,0.7)] transition hover:border-rose-400 hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400/70 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsxs)("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), (0, jsx_runtime_1.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Signing out..."] })) : ('Sign Out') }));
}
