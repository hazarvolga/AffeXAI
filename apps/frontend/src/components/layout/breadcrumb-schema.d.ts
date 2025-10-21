import React from 'react';
import type { BreadcrumbItem } from './breadcrumb';
export interface BreadcrumbSchemaProps {
    /**
     * Custom breadcrumb items
     */
    items?: BreadcrumbItem[];
    /**
     * Base URL for absolute URLs (e.g., 'https://aluplan.com')
     */
    baseUrl?: string;
}
/**
 * Renders Schema.org JSON-LD for breadcrumb navigation
 * Google reads this for Rich Results in search
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 * @see https://schema.org/BreadcrumbList
 */
export declare function BreadcrumbSchema({ items, baseUrl, }: BreadcrumbSchemaProps): React.JSX.Element | null;
export default BreadcrumbSchema;
//# sourceMappingURL=breadcrumb-schema.d.ts.map