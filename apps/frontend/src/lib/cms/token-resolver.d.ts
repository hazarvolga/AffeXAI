/**
 * Design Token Resolution Utilities for CMS Templates
 *
 * Resolves design token references in template blocks to actual CSS values.
 * Supports W3C Design Tokens format with nested token structures.
 */
import type { DesignTokens } from '@/types/design-tokens';
/**
 * Get token value from design tokens object using dot notation path
 *
 * @param tokens - Design tokens object
 * @param path - Dot notation path (e.g., "color.primary", "spacing.lg")
 * @returns Token value or undefined if not found
 *
 * @example
 * const tokens = { color: { primary: { $value: "222 47% 11%" } } };
 * getTokenValue(tokens, "color.primary") // Returns "222 47% 11%"
 */
export declare function getTokenValue(tokens: DesignTokens, path: string): any;
/**
 * Resolve all token references in block properties
 *
 * @param properties - Block properties that may contain token aliases
 * @param tokens - Design tokens to resolve against
 * @returns Properties with all token aliases resolved to actual values
 *
 * @example
 * const props = {
 *   backgroundColor: "{color.background}",
 *   padding: "{spacing.lg}",
 *   nested: { color: "{color.primary}" }
 * };
 * const resolved = resolveBlockTokens(props, tokens);
 * // Returns: { backgroundColor: "0 0% 100%", padding: "32px", nested: { color: "222 47% 11%" } }
 */
export declare function resolveBlockTokens(properties: Record<string, any>, tokens: DesignTokens): Record<string, any>;
/**
 * Resolve all token references in a block instance
 *
 * @param block - Block instance with properties
 * @param tokens - Design tokens to resolve against
 * @returns Block with resolved token values
 */
export declare function resolveBlockInstance(block: any, tokens: DesignTokens): any;
/**
 * Resolve design system color scheme
 *
 * @param colorScheme - Color scheme with token references
 * @param tokens - Design tokens to resolve against
 * @returns Resolved color scheme
 */
export declare function resolveColorScheme(colorScheme: Record<string, string>, tokens: DesignTokens): Record<string, string>;
/**
 * Get CSS variable value from token path
 * Useful for generating CSS custom properties from tokens
 *
 * @param tokenPath - Dot notation path
 * @returns CSS variable name (e.g., "--color-primary")
 */
export declare function getCSSVariableName(tokenPath: string): string;
/**
 * Convert resolved token values to CSS variables object
 *
 * @param resolvedProperties - Properties with resolved token values
 * @param originalProperties - Original properties to detect which were tokens
 * @returns Object mapping CSS variable names to values
 *
 * @example
 * const original = { backgroundColor: "{color.primary}" };
 * const resolved = { backgroundColor: "222 47% 11%" };
 * toCSSVariables(resolved, original)
 * // Returns: { "--background-color": "222 47% 11%" }
 */
export declare function toCSSVariables(resolvedProperties: Record<string, any>, originalProperties: Record<string, any>): Record<string, string>;
/**
 * Batch resolve multiple blocks efficiently
 *
 * @param blocks - Array of block instances
 * @param tokens - Design tokens to resolve against
 * @returns Array of blocks with resolved tokens
 */
export declare function resolveBlocks(blocks: any[], tokens: DesignTokens): any[];
/**
 * Check if a property value uses a token reference
 *
 * @param value - Property value to check
 * @returns True if value is a token alias
 */
export declare function usesTokenReference(value: any): boolean;
/**
 * Extract all unique token paths used in properties
 *
 * @param properties - Block properties
 * @returns Array of unique token paths
 */
export declare function extractUsedTokens(properties: Record<string, any>): string[];
/**
 * Get token value with caching
 *
 * @param tokens - Design tokens
 * @param path - Token path
 * @param useCache - Whether to use cache (default: true)
 * @returns Token value
 */
export declare function getCachedTokenValue(tokens: DesignTokens, path: string, useCache?: boolean): any;
/**
 * Clear token resolution cache
 * Call this when design tokens are updated
 */
export declare function clearTokenCache(): void;
/**
 * Get cache statistics
 */
export declare function getTokenCacheStats(): {
    size: number;
    keys: string[];
};
//# sourceMappingURL=token-resolver.d.ts.map