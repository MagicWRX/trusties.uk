"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PortalButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function PortalButton({ customerId, children, className = '', onSuccess, onError }) {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handlePortal = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/stripe/portal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customerId }),
            });
            const { url, error } = await response.json();
            if (error) {
                throw new Error(error);
            }
            window.location.href = url;
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
        }
        catch (error) {
            console.error('Portal error:', error);
            onError === null || onError === void 0 ? void 0 : onError(error);
        }
        finally {
            setLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)("button", { onClick: handlePortal, disabled: loading, className: className, children: loading ? 'Loading...' : children }));
}
