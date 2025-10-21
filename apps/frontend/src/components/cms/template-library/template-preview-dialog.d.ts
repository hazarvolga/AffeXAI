import React from 'react';
import type { PageTemplate } from '@/types/cms-template';
interface TemplatePreviewDialogProps {
    template: PageTemplate | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onApply?: (template: PageTemplate) => void;
}
/**
 * Template Preview Dialog
 *
 * Displays a comprehensive preview of a page template with:
 * - Responsive viewport preview
 * - Block structure view
 * - Design tokens view
 * - Template metadata
 */
export declare function TemplatePreviewDialog({ template, open, onOpenChange, onApply, }: TemplatePreviewDialogProps): React.JSX.Element | null;
export {};
//# sourceMappingURL=template-preview-dialog.d.ts.map