import React from 'react';
import type { PageTemplate, BlockInstance } from '@/types/cms-template';
interface TemplateRendererProps {
    template: PageTemplate;
    pageId: string;
    enableTracking?: boolean;
    className?: string;
}
/**
 * TemplateRenderer - Renders a complete page template with all blocks
 *
 * Features:
 * - Renders all blocks in sequence
 * - Optional analytics tracking per block
 * - Design token resolution
 * - Responsive layout with template constraints
 *
 * Usage:
 * ```tsx
 * <TemplateRenderer
 *   template={pageTemplate}
 *   pageId="home-page"
 *   enableTracking={true}
 * />
 * ```
 */
export declare function TemplateRenderer({ template, pageId, enableTracking, className }: TemplateRendererProps): React.JSX.Element;
/**
 * BlockRenderer - Renders a single block with optional tracking
 */
interface BlockRendererProps {
    block: BlockInstance;
    pageId: string;
    enableTracking?: boolean;
}
export declare function BlockRenderer({ block, pageId, enableTracking }: BlockRendererProps): React.JSX.Element;
export {};
//# sourceMappingURL=template-renderer.d.ts.map