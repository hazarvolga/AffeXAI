/**
 * TemplateLibrary Component
 *
 * Browse, filter, and apply page templates
 * Includes context filtering and search functionality
 */
import React from 'react';
import type { PageTemplate } from '@/types/cms-template';
interface TemplateLibraryProps {
    templates: PageTemplate[];
    onApplyTemplate?: (template: PageTemplate) => void;
    onPreviewTemplate?: (template: PageTemplate) => void;
    filterByContext?: boolean;
}
export declare function TemplateLibrary({ templates, onApplyTemplate, onPreviewTemplate, filterByContext, }: TemplateLibraryProps): React.JSX.Element;
/**
 * Template Library Dialog/Modal Version
 */
export declare function TemplateLibraryModal({ templates, open, onOpenChange, onApplyTemplate, }: {
    templates: PageTemplate[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onApplyTemplate?: (template: PageTemplate) => void;
}): React.JSX.Element;
export {};
//# sourceMappingURL=template-library.d.ts.map