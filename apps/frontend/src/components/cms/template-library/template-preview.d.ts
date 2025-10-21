/**
 * TemplatePreview Component
 *
 * Live preview of templates with resolved design tokens
 * Shows responsive views and token usage analytics
 */
import React from 'react';
import type { PageTemplate } from '@/types/cms-template';
interface TemplatePreviewProps {
    template: PageTemplate;
    onApply?: (template: PageTemplate) => void;
    onClose?: () => void;
}
/**
 * Main TemplatePreview Component
 */
export declare function TemplatePreview({ template, onApply, onClose }: TemplatePreviewProps): React.JSX.Element;
/**
 * Full-screen Template Preview Modal
 */
export declare function TemplatePreviewModal({ template, open, onOpenChange, onApply, }: {
    template: PageTemplate | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onApply?: (template: PageTemplate) => void;
}): React.JSX.Element | null;
export {};
//# sourceMappingURL=template-preview.d.ts.map