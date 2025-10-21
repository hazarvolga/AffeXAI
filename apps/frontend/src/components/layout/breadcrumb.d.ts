import React from 'react';
export interface BreadcrumbItem {
    label: string;
    href: string;
    isCurrentPage?: boolean;
}
export interface BreadcrumbProps {
    /**
     * Custom breadcrumb items (overrides auto-generation)
     */
    items?: BreadcrumbItem[];
    /**
     * Show home icon instead of text
     */
    showHomeIcon?: boolean;
    /**
     * Custom separator (default: ChevronRight)
     */
    separator?: React.ReactNode;
    /**
     * Style variant
     */
    variant?: 'default' | 'minimal' | 'accent';
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Hide breadcrumb on specific paths
     */
    hiddenPaths?: string[];
}
export declare function Breadcrumb({ items: customItems, showHomeIcon, separator, variant, className, hiddenPaths, }: BreadcrumbProps): React.JSX.Element | null;
export default Breadcrumb;
//# sourceMappingURL=breadcrumb.d.ts.map