/**
 * Template Application Utilities
 *
 * Utilities for applying templates to pages with validation and conflict resolution
 */
import type { PageTemplate, BlockInstance, TemplateApplicationResult } from '@/types/cms-template';
import type { DesignTokens, ThemeContext, ThemeMode } from '@/types/design-tokens';
/**
 * Application strategy for handling existing content
 */
export type ApplicationStrategy = 'replace' | 'append' | 'prepend' | 'merge';
/**
 * Application options
 */
export interface TemplateApplicationOptions {
    /**
     * How to handle existing content on the page
     */
    strategy: ApplicationStrategy;
    /**
     * Whether to resolve tokens before applying
     */
    resolveTokens?: boolean;
    /**
     * Whether to validate before applying
     */
    validate?: boolean;
    /**
     * Context to apply template in
     */
    context?: ThemeContext;
    /**
     * Mode to apply template in
     */
    mode?: ThemeMode;
    /**
     * Generate new IDs for blocks
     */
    generateNewIds?: boolean;
    /**
     * Preserve existing block IDs where possible
     */
    preserveExistingIds?: boolean;
}
/**
 * Apply template to page with specified strategy
 */
export declare function applyTemplate(template: PageTemplate, existingBlocks: BlockInstance[], tokens: DesignTokens, options?: Partial<TemplateApplicationOptions>): TemplateApplicationResult;
/**
 * Duplicate template with new ID and updated metadata
 */
export declare function duplicateTemplate(template: PageTemplate, nameSuffix?: string): PageTemplate;
/**
 * Create new version of template
 */
export declare function createTemplateVersion(template: PageTemplate, changelog?: string): PageTemplate;
/**
 * Restore template to specific version
 */
export declare function restoreTemplateVersion(template: PageTemplate, versionNumber: number): PageTemplate | null;
/**
 * Extract template part from template
 */
export declare function extractTemplatePart(template: PageTemplate, blockIds: string[], partName: string, partType: 'header' | 'footer' | 'sidebar' | 'section' | 'custom'): {
    id: string;
    name: string;
    description: string;
    type: "header" | "footer" | "sidebar" | "custom" | "section";
    blocks: any;
    designSystem: {
        colorScheme: any;
        typography: any;
        spacing: any;
    };
    preview: {
        thumbnail: string;
    };
    usageCount: number;
    createdAt: Date;
    updatedAt: Date;
};
/**
 * Get application preview (dry run)
 */
export declare function previewTemplateApplication(template: PageTemplate, existingBlocks: BlockInstance[], tokens: DesignTokens, options?: Partial<TemplateApplicationOptions>): {
    finalBlocks: BlockInstance[];
    result: TemplateApplicationResult;
};
//# sourceMappingURL=template-application.d.ts.map