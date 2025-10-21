/**
 * Design Token Validation Utilities for CMS Templates
 *
 * Validates token references in templates to ensure:
 * - All token references exist in the design system
 * - Token types match expected usage
 * - Template constraints are satisfied
 * - Context compatibility is maintained
 */
import type { DesignTokens, ThemeContext, ThemeMode } from '@/types/design-tokens';
import type { PageTemplate, BlockInstance, TemplateValidationResult, TemplateValidationError } from '@/types/cms-template';
/**
 * Validate all token references in a template
 *
 * @param template - Page template to validate
 * @param tokens - Design tokens to validate against
 * @returns Validation result with errors and warnings
 */
export declare function validateTemplateTokens(template: PageTemplate, tokens: DesignTokens): TemplateValidationResult;
/**
 * Validate token references in a single block
 *
 * @param block - Block instance to validate
 * @param tokens - Design tokens to validate against
 * @returns Array of validation errors
 */
export declare function validateBlockTokens(block: BlockInstance, tokens: DesignTokens): TemplateValidationError[];
/**
 * Validate template constraints
 *
 * @param template - Page template to validate
 * @returns Validation result
 */
export declare function validateTemplateConstraints(template: PageTemplate): TemplateValidationResult;
/**
 * Validate template compatibility with a specific context
 *
 * @param template - Page template
 * @param context - Theme context to check
 * @param mode - Theme mode to check
 * @param tokens - Design tokens for the context/mode
 * @returns Validation result
 */
export declare function validateTemplateContext(template: PageTemplate, context: ThemeContext, mode: ThemeMode, tokens: DesignTokens): TemplateValidationResult;
/**
 * Get detailed token usage report for a template
 *
 * @param template - Page template
 * @returns Token usage report
 */
export interface TokenUsageReport {
    totalReferences: number;
    uniqueTokens: string[];
    tokensByCategory: Record<string, string[]>;
    blocksUsingTokens: Array<{
        blockId: string;
        blockType: string;
        tokenCount: number;
        tokens: string[];
    }>;
}
export declare function getTokenUsageReport(template: PageTemplate): TokenUsageReport;
/**
 * Check if template can be safely applied without token conflicts
 *
 * @param template - Page template
 * @param tokens - Target design tokens
 * @returns Safety check result
 */
export interface TemplateSafetyCheck {
    isSafe: boolean;
    missingTokens: string[];
    recommendations: string[];
}
export declare function checkTemplateSafety(template: PageTemplate, tokens: DesignTokens): TemplateSafetyCheck;
//# sourceMappingURL=token-validator.d.ts.map