"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockRenderer = BlockRenderer;
const jsx_runtime_1 = require("react/jsx-runtime");
// ─── Default Leaf Renderers ───────────────────────────────────────────────────
function TextBlock({ block }) {
    var _a, _b;
    const content = block.content;
    return ((0, jsx_runtime_1.jsx)("p", { className: block.classes, style: Object.assign({ textAlign: (_a = content === null || content === void 0 ? void 0 : content.align) !== null && _a !== void 0 ? _a : 'left' }, block.styleOverrides), children: (_b = content === null || content === void 0 ? void 0 : content.text) !== null && _b !== void 0 ? _b : '' }));
}
function HeadingBlock({ block }) {
    var _a, _b, _c;
    const content = block.content;
    const Tag = ((_a = content === null || content === void 0 ? void 0 : content.level) !== null && _a !== void 0 ? _a : 'h2');
    return ((0, jsx_runtime_1.jsx)(Tag, { className: block.classes, style: Object.assign({ textAlign: (_b = content === null || content === void 0 ? void 0 : content.align) !== null && _b !== void 0 ? _b : 'left' }, block.styleOverrides), children: (_c = content === null || content === void 0 ? void 0 : content.text) !== null && _c !== void 0 ? _c : '' }));
}
function ImageBlock({ block }) {
    var _a, _b;
    const content = block.content;
    const img = (
    // eslint-disable-next-line @next/next/no-img-element
    (0, jsx_runtime_1.jsx)("img", { src: (_a = content === null || content === void 0 ? void 0 : content.src) !== null && _a !== void 0 ? _a : '', alt: (_b = content === null || content === void 0 ? void 0 : content.alt) !== null && _b !== void 0 ? _b : '', className: block.classes, style: Object.assign({ display: 'block', maxWidth: '100%' }, block.styleOverrides) }));
    if (content === null || content === void 0 ? void 0 : content.href) {
        return (0, jsx_runtime_1.jsx)("a", { href: content.href, style: { display: 'inline-block' }, children: img });
    }
    return img;
}
function CardBlock({ block }) {
    const content = block.content;
    return ((0, jsx_runtime_1.jsxs)("div", { className: block.classes || 'bg-card border border-border rounded-xl p-5', style: block.styleOverrides, children: [(content === null || content === void 0 ? void 0 : content.image) && (
            // eslint-disable-next-line @next/next/no-img-element
            (0, jsx_runtime_1.jsx)("img", { src: content.image, alt: "", style: { borderRadius: 8, marginBottom: 12, width: '100%' } })), (content === null || content === void 0 ? void 0 : content.title) && ((0, jsx_runtime_1.jsx)("h3", { style: { margin: '0 0 6px', fontSize: 16, fontWeight: 600, color: 'hsl(var(--foreground))' }, children: content.title })), (content === null || content === void 0 ? void 0 : content.description) && ((0, jsx_runtime_1.jsx)("p", { style: { margin: '0 0 8px', fontSize: 14, color: 'hsl(var(--muted-foreground))' }, children: content.description })), (content === null || content === void 0 ? void 0 : content.body) && ((0, jsx_runtime_1.jsx)("p", { style: { margin: 0, fontSize: 14, color: 'hsl(var(--foreground))' }, children: content.body }))] }));
}
function ButtonBlock({ block }) {
    var _a, _b, _c, _d;
    const content = block.content;
    const variantStyles = {
        primary: { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' },
        secondary: { background: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))' },
        ghost: { background: 'transparent', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' },
        link: { background: 'transparent', color: 'hsl(var(--primary))', textDecoration: 'underline' },
    };
    const variantStyle = (_b = variantStyles[(_a = content === null || content === void 0 ? void 0 : content.variant) !== null && _a !== void 0 ? _a : 'primary']) !== null && _b !== void 0 ? _b : variantStyles['primary'];
    return ((0, jsx_runtime_1.jsx)("a", { href: (_c = content === null || content === void 0 ? void 0 : content.href) !== null && _c !== void 0 ? _c : '#', className: block.classes, style: Object.assign(Object.assign({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '8px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }, variantStyle), block.styleOverrides), children: (_d = content === null || content === void 0 ? void 0 : content.text) !== null && _d !== void 0 ? _d : 'Click' }));
}
function DividerBlock({ block }) {
    return ((0, jsx_runtime_1.jsx)("hr", { className: block.classes, style: Object.assign({ border: 'none', borderTop: '1px solid hsl(var(--border))', margin: '16px 0' }, block.styleOverrides) }));
}
function LinkGroupBlock({ block }) {
    var _a;
    const content = block.content;
    return ((0, jsx_runtime_1.jsx)("nav", { className: block.classes, style: block.styleOverrides, children: (0, jsx_runtime_1.jsx)("ul", { style: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }, children: ((_a = content === null || content === void 0 ? void 0 : content.links) !== null && _a !== void 0 ? _a : []).map((link, i) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: link.href, style: {
                        fontSize: 14, color: 'hsl(var(--foreground))',
                        textDecoration: 'none', padding: '4px 8px',
                        borderRadius: 4, background: 'hsl(var(--muted) / 0.4)',
                    }, children: link.text }) }, i))) }) }));
}
/** Container / blank — just render children */
function ContainerBlock({ block, children }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: block.classes, style: block.styleOverrides, children: children }));
}
/** Blank block — visible placeholder in editor, invisible in production */
function BlankBlock({ block }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: block.classes, "data-block-type": "blank", style: Object.assign({ minHeight: 40, border: '1px dashed hsl(var(--border))', borderRadius: 6, background: 'hsl(var(--muted) / 0.2)' }, block.styleOverrides) }));
}
/** Code block */
function CodeBlock({ block }) {
    var _a;
    const content = block.content;
    return ((0, jsx_runtime_1.jsx)("pre", { className: block.classes, style: Object.assign({ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 6, padding: '12px 16px', overflow: 'auto', fontSize: 13, fontFamily: 'monospace' }, block.styleOverrides), children: (0, jsx_runtime_1.jsx)("code", { "data-language": content === null || content === void 0 ? void 0 : content.language, children: (_a = content === null || content === void 0 ? void 0 : content.code) !== null && _a !== void 0 ? _a : '' }) }));
}
/** Video block */
function VideoBlock({ block }) {
    var _a, _b;
    const content = block.content;
    return ((0, jsx_runtime_1.jsx)("video", { src: content === null || content === void 0 ? void 0 : content.src, poster: content === null || content === void 0 ? void 0 : content.poster, autoPlay: (_a = content === null || content === void 0 ? void 0 : content.autoplay) !== null && _a !== void 0 ? _a : false, controls: (_b = content === null || content === void 0 ? void 0 : content.controls) !== null && _b !== void 0 ? _b : true, className: block.classes, style: Object.assign({ width: '100%', borderRadius: 8 }, block.styleOverrides), playsInline: true }));
}
/** Gallery block — responsive image grid */
function GalleryBlock({ block }) {
    var _a, _b;
    const content = block.content;
    const cols = (_a = content === null || content === void 0 ? void 0 : content.columns) !== null && _a !== void 0 ? _a : 3;
    return ((0, jsx_runtime_1.jsx)("div", { className: block.classes, style: Object.assign({ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }, block.styleOverrides), children: ((_b = content === null || content === void 0 ? void 0 : content.images) !== null && _b !== void 0 ? _b : []).map((img, i) => {
            var _a;
            return (
            // eslint-disable-next-line @next/next/no-img-element
            (0, jsx_runtime_1.jsx)("img", { src: img.src, alt: (_a = img.alt) !== null && _a !== void 0 ? _a : '', style: { width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 6 } }, i));
        }) }));
}
/** Form block — renders labelled fields with a submit button */
function FormBlock({ block }) {
    var _a, _b, _c;
    const content = block.content;
    return ((0, jsx_runtime_1.jsxs)("form", { action: (_a = content === null || content === void 0 ? void 0 : content.action) !== null && _a !== void 0 ? _a : '#', className: block.classes, style: Object.assign({ display: 'flex', flexDirection: 'column', gap: 12 }, block.styleOverrides), children: [((_b = content === null || content === void 0 ? void 0 : content.fields) !== null && _b !== void 0 ? _b : []).map((field, i) => {
                var _a;
                return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: 4 }, children: [field.label && ((0, jsx_runtime_1.jsx)("label", { htmlFor: field.name, style: { fontSize: 13, fontWeight: 500, color: 'hsl(var(--foreground))' }, children: field.label })), (0, jsx_runtime_1.jsx)("input", { id: field.name, name: field.name, type: (_a = field.type) !== null && _a !== void 0 ? _a : 'text', placeholder: field.placeholder, required: field.required, style: {
                                padding: '8px 12px', borderRadius: 6, fontSize: 14,
                                border: '1px solid hsl(var(--border))', background: 'hsl(var(--background))',
                                color: 'hsl(var(--foreground))',
                            } })] }, i));
            }), (0, jsx_runtime_1.jsx)("button", { type: "submit", style: {
                    padding: '9px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600,
                    background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))',
                    border: 'none', cursor: 'pointer', alignSelf: 'flex-start',
                }, children: (_c = content === null || content === void 0 ? void 0 : content.submitLabel) !== null && _c !== void 0 ? _c : 'Submit' })] }));
}
// ─── BlockRenderer ────────────────────────────────────────────────────────────
/**
 * BlockRenderer — renders a single Block to its appropriate leaf component.
 *
 * Handles all built-in block types. Extend via the `renderers` prop for
 * custom types (animation, art, pixel-frame, etc.).
 *
 * SSOT: DOCs/TOOLS/TOOLS_BLOCKS_SYSTEM.md Section 3
 */
function BlockRenderer({ block, renderers, className, style }) {
    if (!block.visible)
        return null;
    // Custom renderer override
    if (renderers === null || renderers === void 0 ? void 0 : renderers[block.type]) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: renderers[block.type](block) });
    }
    // Custom CSS injection (scoped)
    const css = block.customCss ? ((0, jsx_runtime_1.jsx)("style", { children: `[data-block-id="${block.id}"] { ${block.customCss} }` })) : null;
    let content = null;
    switch (block.type) {
        case 'blank':
            content = (0, jsx_runtime_1.jsx)(BlankBlock, { block: block });
            break;
        case 'text':
            content = (0, jsx_runtime_1.jsx)(TextBlock, { block: block });
            break;
        case 'heading':
            content = (0, jsx_runtime_1.jsx)(HeadingBlock, { block: block });
            break;
        case 'image':
            content = (0, jsx_runtime_1.jsx)(ImageBlock, { block: block });
            break;
        case 'card':
            content = (0, jsx_runtime_1.jsx)(CardBlock, { block: block });
            break;
        case 'button':
            content = (0, jsx_runtime_1.jsx)(ButtonBlock, { block: block });
            break;
        case 'divider':
            content = (0, jsx_runtime_1.jsx)(DividerBlock, { block: block });
            break;
        case 'link-group':
            content = (0, jsx_runtime_1.jsx)(LinkGroupBlock, { block: block });
            break;
        case 'container':
        case 'columns':
            content = (0, jsx_runtime_1.jsx)(ContainerBlock, { block: block });
            break;
        case 'code':
            content = (0, jsx_runtime_1.jsx)(CodeBlock, { block: block });
            break;
        case 'video':
            content = (0, jsx_runtime_1.jsx)(VideoBlock, { block: block });
            break;
        case 'gallery':
            content = (0, jsx_runtime_1.jsx)(GalleryBlock, { block: block });
            break;
        case 'form':
            content = (0, jsx_runtime_1.jsx)(FormBlock, { block: block });
            break;
        // animation, art, canvas, pixel-frame, blog-preview, thread-preview
        // → rendered via BlockLayerPortal or wired via `renderers` prop
        default:
            content = ((0, jsx_runtime_1.jsx)("div", { className: block.classes, "data-block-type": block.type, style: Object.assign({}, block.styleOverrides) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { "data-block-id": block.id, "data-block-type": block.type, className: className, style: style, children: [css, content] }));
}
