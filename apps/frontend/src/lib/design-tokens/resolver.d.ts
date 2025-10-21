/**
 * Design Tokens Resolver & Transformer Utilities
 * Handles alias resolution, format conversion, and token transformations
 */
import type { DesignTokens, DesignToken, TokenAlias, TokenType, CSSExportOptions, SCSSExportOptions, TokenExportFormat } from '@/types/design-tokens';
/**
 * Check if a value is a token alias
 */
export declare function isAlias(value: unknown): value is TokenAlias;
/**
 * Extract path from alias
 * {color.primary} -> color.primary
 */
export declare function getAliasPath(alias: TokenAlias): string;
/**
 * Get nested token value by path
 * getTokenByPath(tokens, 'color.primary.500')
 */
export declare function getTokenByPath(tokens: DesignTokens, path: string): DesignToken | undefined;
/**
 * Resolve token aliases recursively
 */
export declare function resolveToken(value: any, tokens: DesignTokens, visited?: Set<string>): any;
/**
 * Resolve all tokens in a token collection
 */
export declare function resolveAllTokens(tokens: DesignTokens): DesignTokens;
/**
 * Convert token path to CSS variable name
 * color.primary -> --color-primary
 * spacing.base -> --spacing-base
 */
export declare function toCSSVariableName(path: string, prefix?: string): string;
/**
 * Convert token value to CSS value
 */
export declare function toCSSValue(token: DesignToken, tokens: DesignTokens): string;
/**
 * Export tokens to CSS custom properties
 */
export declare function exportToCSS(tokens: DesignTokens, options?: CSSExportOptions): string;
/**
 * Convert to SCSS variable name
 */
export declare function toSCSSVariableName(path: string, prefix?: string): string;
/**
 * Export tokens to SCSS variables
 */
export declare function exportToSCSS(tokens: DesignTokens, options?: SCSSExportOptions): string;
/**
 * Export tokens to W3C JSON format
 */
export declare function exportToJSON(tokens: DesignTokens, metadata: TokenExportFormat['metadata']): TokenExportFormat;
/**
 * Import tokens from W3C JSON format
 */
export declare function importFromJSON(json: TokenExportFormat): DesignTokens;
/**
 * Validate token structure
 */
export declare function validateToken(token: any): token is DesignToken;
/**
 * Validate entire token collection
 */
export declare function validateTokens(tokens: DesignTokens): {
    valid: boolean;
    errors: string[];
};
/**
 * Flatten tokens to path-value pairs
 */
export declare function flattenTokens(tokens: DesignTokens): Array<{
    path: string;
    token: DesignToken;
}>;
/**
 * Unflatten tokens from path-value pairs
 */
export declare function unflattenTokens(flattened: Array<{
    path: string;
    token: DesignToken;
}>): DesignTokens;
/**
 * Merge multiple token collections (for theme composition)
 */
export declare function mergeTokens(...tokenSets: DesignTokens[]): DesignTokens;
/**
 * Filter tokens by type
 */
export declare function filterTokensByType(tokens: DesignTokens, type: TokenType): DesignTokens;
//# sourceMappingURL=resolver.d.ts.map