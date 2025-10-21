/**
 * TemplateImportExport Component
 *
 * Import and export templates in JSON format
 * Includes validation and error handling
 */
import React from 'react';
import type { PageTemplate } from '@/types/cms-template';
interface TemplateImportExportProps {
    onImport?: (template: PageTemplate) => void;
    templates?: PageTemplate[];
}
/**
 * Main TemplateImportExport Component
 */
export declare function TemplateImportExport({ onImport, templates }: TemplateImportExportProps): React.JSX.Element;
/**
 * Template Import/Export Dialog Modal
 */
export declare function TemplateImportExportModal({ open, onOpenChange, onImport, templates, }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onImport?: (template: PageTemplate) => void;
    templates?: PageTemplate[];
}): React.JSX.Element;
export {};
//# sourceMappingURL=template-import-export.d.ts.map