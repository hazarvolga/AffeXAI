"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbSchema = BreadcrumbSchema;
const react_1 = __importDefault(require("react"));
const navigation_1 = require("next/navigation");
// ============================================================================
// SCHEMA GENERATION
// ============================================================================
/**
 * Generate Schema.org BreadcrumbList JSON-LD
 */
function generateBreadcrumbSchema(items, baseUrl) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => {
            const isLast = index === items.length - 1;
            // Build absolute URL
            const absoluteUrl = item.href.startsWith('http')
                ? item.href
                : `${baseUrl}${item.href}`;
            // Schema.org spec: omit "item" for last element
            const schemaItem = {
                '@type': 'ListItem',
                position: index + 1,
                name: item.label,
            };
            if (!isLast) {
                schemaItem.item = absoluteUrl;
            }
            return schemaItem;
        }),
    };
}
// ============================================================================
// BREADCRUMB SCHEMA COMPONENT (SEO)
// ============================================================================
/**
 * Renders Schema.org JSON-LD for breadcrumb navigation
 * Google reads this for Rich Results in search
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 * @see https://schema.org/BreadcrumbList
 */
function BreadcrumbSchema({ items, baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://aluplan.com', }) {
    const pathname = (0, navigation_1.usePathname)();
    // If no custom items, skip (Breadcrumb component will generate them)
    // This component is only for SEO markup
    if (!items || items.length <= 1) {
        return null;
    }
    const schema = generateBreadcrumbSchema(items, baseUrl);
    return (<script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2),
        }}/>);
}
// ============================================================================
// EXPORT
// ============================================================================
exports.default = BreadcrumbSchema;
//# sourceMappingURL=breadcrumb-schema.js.map