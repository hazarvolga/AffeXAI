/**
 * TemplatePartsLibrary Component
 *
 * Browse and manage reusable template parts (header, footer, sidebar, etc.)
 */
import React from 'react';
import type { TemplatePart } from '@/types/cms-template';
interface TemplatePartsLibraryProps {
    parts: TemplatePart[];
    onSelectPart?: (part: TemplatePart) => void;
    onApplyPart?: (part: TemplatePart) => void;
    onPreviewPart?: (part: TemplatePart) => void;
}
/**
 * Main TemplatePartsLibrary Component
 */
export declare function TemplatePartsLibrary({ parts, onSelectPart, onApplyPart, onPreviewPart, }: TemplatePartsLibraryProps): React.JSX.Element;
/**
 * Compact Parts Sidebar
 */
export declare function CompactPartsLibrary({ parts, onSelectPart, type, }: {
    parts: TemplatePart[];
    onSelectPart?: (part: TemplatePart) => void;
    type?: TemplatePart['type'];
}): React.JSX.Element;
export {};
//# sourceMappingURL=template-parts-library.d.ts.map