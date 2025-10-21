/**
 * TemplateCard Component
 *
 * Displays template preview with color scheme and metadata
 * Shows design token color scheme visually
 */
import React from 'react';
import type { PageTemplate } from '@/types/cms-template';
interface TemplateCardProps {
    template: PageTemplate;
    onPreview?: (template: PageTemplate) => void;
    onApply?: (template: PageTemplate) => void;
    onSelect?: (template: PageTemplate) => void;
    selected?: boolean;
}
/**
 * Main TemplateCard Component
 */
export declare function TemplateCard({ template, onPreview, onApply, onSelect, selected, }: TemplateCardProps): React.JSX.Element;
/**
 * Compact Template Card for sidebar
 */
export declare function CompactTemplateCard({ template, onSelect, selected, }: Pick<TemplateCardProps, 'template' | 'onSelect' | 'selected'>): React.JSX.Element;
export {};
//# sourceMappingURL=template-card.d.ts.map