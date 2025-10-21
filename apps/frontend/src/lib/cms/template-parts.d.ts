/**
 * Template Parts Utilities
 *
 * Utilities for managing reusable template sections (header, footer, sidebar, etc.)
 */
import type { TemplatePart, BlockInstance, PageTemplate } from '@/types/cms-template';
import type { DesignTokens } from '@/types/design-tokens';
/**
 * Create a new template part
 */
export declare function createTemplatePart(name: string, type: TemplatePart['type'], blocks: BlockInstance[], options?: {
    description?: string;
    designSystem?: TemplatePart['designSystem'];
    preview?: TemplatePart['preview'];
}): TemplatePart;
/**
 * Extract template part from existing template
 */
export declare function extractPartFromTemplate(template: PageTemplate, blockIds: string[], partName: string, partType: TemplatePart['type']): TemplatePart;
/**
 * Insert template part into template
 */
export declare function insertPartIntoTemplate(template: PageTemplate, part: TemplatePart, position: 'start' | 'end' | number): PageTemplate;
/**
 * Replace blocks in template with template part
 */
export declare function replaceBlocksWithPart(template: PageTemplate, blockIds: string[], part: TemplatePart): PageTemplate;
/**
 * Validate template part compatibility with template
 */
export declare function validatePartCompatibility(part: TemplatePart, template: PageTemplate, tokens: DesignTokens): {
    isCompatible: boolean;
    errors: string[];
    warnings: string[];
};
/**
 * Duplicate template part
 */
export declare function duplicateTemplatePart(part: TemplatePart, nameSuffix?: string): TemplatePart;
/**
 * Merge multiple parts into single part
 */
export declare function mergeTemplateParts(parts: TemplatePart[], name: string, type: TemplatePart['type']): TemplatePart;
/**
 * Find parts by type
 */
export declare function filterPartsByType(parts: TemplatePart[], type: TemplatePart['type'] | TemplatePart['type'][]): TemplatePart[];
/**
 * Search parts by name or description
 */
export declare function searchParts(parts: TemplatePart[], query: string): TemplatePart[];
/**
 * Sort parts by usage count
 */
export declare function sortPartsByPopularity(parts: TemplatePart[]): TemplatePart[];
/**
 * Sort parts by creation date
 */
export declare function sortPartsByDate(parts: TemplatePart[], order?: 'asc' | 'desc'): TemplatePart[];
/**
 * Get part statistics
 */
export declare function getPartStatistics(part: TemplatePart): {
    blockCount: number;
    tokenReferences: number;
    hasDesignSystem: boolean;
    hasPreview: boolean;
};
/**
 * Apply design system tokens to part
 */
export declare function applyTokensToPart(part: TemplatePart, tokens: DesignTokens): TemplatePart;
/**
 * Convert template part to template
 */
export declare function partToTemplate(part: TemplatePart, category: PageTemplate['category'], additionalOptions?: Partial<Omit<PageTemplate, 'id' | 'blocks' | 'designSystem'>>): PageTemplate;
//# sourceMappingURL=template-parts.d.ts.map