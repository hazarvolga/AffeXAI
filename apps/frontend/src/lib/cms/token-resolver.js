"use strict";
/**
 * Design Token Resolution Utilities for CMS Templates
 *
 * Resolves design token references in template blocks to actual CSS values.
 * Supports W3C Design Tokens format with nested token structures.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenValue = getTokenValue;
exports.resolveBlockTokens = resolveBlockTokens;
exports.resolveBlockInstance = resolveBlockInstance;
exports.resolveColorScheme = resolveColorScheme;
exports.getCSSVariableName = getCSSVariableName;
exports.toCSSVariables = toCSSVariables;
exports.resolveBlocks = resolveBlocks;
exports.usesTokenReference = usesTokenReference;
exports.extractUsedTokens = extractUsedTokens;
exports.getCachedTokenValue = getCachedTokenValue;
exports.clearTokenCache = clearTokenCache;
exports.getTokenCacheStats = getTokenCacheStats;
const design_tokens_1 = require("@/types/design-tokens");
const cms_template_1 = require("@/types/cms-template");
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
function getTokenValue(tokens, path) {
    const parts = path.split('.');
    let current = tokens;
    for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
            current = current[part];
        }
        else {
            console.warn(`[TokenResolver] Token not found: ${path}`);
            return undefined;
        }
    }
    // If we found a token object with $value, return the value
    if (current && typeof current === 'object' && '$value' in current) {
        const tokenValue = current.$value;
        // Check if the value itself is a token alias (nested reference)
        if ((0, design_tokens_1.isTokenAlias)(tokenValue)) {
            const nestedPath = (0, design_tokens_1.resolveTokenPath)(tokenValue);
            return getTokenValue(tokens, nestedPath);
        }
        return tokenValue;
    }
    // For composite tokens (like typography, shadow), return the entire object
    if (current && typeof current === 'object') {
        return resolveCompositeToken(current, tokens);
    }
    return current;
}
/**
 * Resolve composite tokens (typography, shadow, border, etc.)
 * that may contain token aliases in their values
 *
 * @param compositeToken - Token object with multiple properties
 * @param tokens - Full design tokens for resolving nested aliases
 * @returns Resolved composite token object
 */
function resolveCompositeToken(compositeToken, tokens) {
    if (!compositeToken || typeof compositeToken !== 'object') {
        return compositeToken;
    }
    const resolved = {};
    for (const [key, value] of Object.entries(compositeToken)) {
        if (key === '$type' || key === '$description') {
            resolved[key] = value;
            continue;
        }
        if (typeof value === 'string' && (0, design_tokens_1.isTokenAlias)(value)) {
            const nestedPath = (0, design_tokens_1.resolveTokenPath)(value);
            resolved[key] = getTokenValue(tokens, nestedPath);
        }
        else if (typeof value === 'object' && value !== null) {
            resolved[key] = resolveCompositeToken(value, tokens);
        }
        else {
            resolved[key] = value;
        }
    }
    return resolved;
}
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
function resolveBlockTokens(properties, tokens) {
    // Defensive check for undefined/null properties
    if (!properties || typeof properties !== 'object') {
        return {};
    }
    const resolved = {};
    for (const [key, value] of Object.entries(properties)) {
        if (typeof value === 'string' && (0, cms_template_1.isTokenAlias)(value)) {
            // This is a token alias like "{color.primary}"
            const tokenPath = (0, cms_template_1.extractTokenPath)(value);
            const resolvedValue = getTokenValue(tokens, tokenPath);
            if (resolvedValue !== undefined) {
                resolved[key] = resolvedValue;
            }
            else {
                // Keep original value if token not found
                console.warn(`[TokenResolver] Failed to resolve token in ${key}: ${value}`);
                resolved[key] = value;
            }
        }
        else if (Array.isArray(value)) {
            // Recursively resolve array items
            resolved[key] = value.map(item => typeof item === 'object' && item !== null
                ? resolveBlockTokens(item, tokens)
                : item);
        }
        else if (typeof value === 'object' && value !== null) {
            // Recursively resolve nested objects
            resolved[key] = resolveBlockTokens(value, tokens);
        }
        else {
            // Keep primitive values as-is
            resolved[key] = value;
        }
    }
    return resolved;
}
/**
 * Resolve all token references in a block instance
 *
 * @param block - Block instance with properties
 * @param tokens - Design tokens to resolve against
 * @returns Block with resolved token values
 */
function resolveBlockInstance(block, tokens) {
    return {
        ...block,
        properties: resolveBlockTokens(block.properties, tokens),
        children: block.children?.map((child) => resolveBlockInstance(child, tokens)),
    };
}
/**
 * Resolve design system color scheme
 *
 * @param colorScheme - Color scheme with token references
 * @param tokens - Design tokens to resolve against
 * @returns Resolved color scheme
 */
function resolveColorScheme(colorScheme, tokens) {
    return resolveBlockTokens(colorScheme, tokens);
}
/**
 * Get CSS variable value from token path
 * Useful for generating CSS custom properties from tokens
 *
 * @param tokenPath - Dot notation path
 * @returns CSS variable name (e.g., "--color-primary")
 */
function getCSSVariableName(tokenPath) {
    return `--${tokenPath.replace(/\./g, '-')}`;
}
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
function toCSSVariables(resolvedProperties, originalProperties) {
    const cssVars = {};
    for (const [key, originalValue] of Object.entries(originalProperties)) {
        if (typeof originalValue === 'string' && (0, cms_template_1.isTokenAlias)(originalValue)) {
            const tokenPath = (0, cms_template_1.extractTokenPath)(originalValue);
            const resolvedValue = resolvedProperties[key];
            if (resolvedValue !== undefined) {
                cssVars[getCSSVariableName(tokenPath)] = resolvedValue;
            }
        }
    }
    return cssVars;
}
/**
 * Batch resolve multiple blocks efficiently
 *
 * @param blocks - Array of block instances
 * @param tokens - Design tokens to resolve against
 * @returns Array of blocks with resolved tokens
 */
function resolveBlocks(blocks, tokens) {
    return blocks.map(block => resolveBlockInstance(block, tokens));
}
/**
 * Check if a property value uses a token reference
 *
 * @param value - Property value to check
 * @returns True if value is a token alias
 */
function usesTokenReference(value) {
    if (typeof value === 'string') {
        return (0, cms_template_1.isTokenAlias)(value);
    }
    if (Array.isArray(value)) {
        return value.some(usesTokenReference);
    }
    if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(usesTokenReference);
    }
    return false;
}
/**
 * Extract all unique token paths used in properties
 *
 * @param properties - Block properties
 * @returns Array of unique token paths
 */
function extractUsedTokens(properties) {
    const tokens = new Set();
    function extractFromValue(value) {
        if (typeof value === 'string' && (0, cms_template_1.isTokenAlias)(value)) {
            tokens.add((0, cms_template_1.extractTokenPath)(value));
        }
        else if (Array.isArray(value)) {
            value.forEach(extractFromValue);
        }
        else if (typeof value === 'object' && value !== null) {
            Object.values(value).forEach(extractFromValue);
        }
    }
    if (properties && typeof properties === 'object') {
        Object.values(properties).forEach(extractFromValue);
    }
    return Array.from(tokens);
}
/**
 * Performance optimization: Memoize token resolution results
 */
const tokenCache = new Map();
/**
 * Get token value with caching
 *
 * @param tokens - Design tokens
 * @param path - Token path
 * @param useCache - Whether to use cache (default: true)
 * @returns Token value
 */
function getCachedTokenValue(tokens, path, useCache = true) {
    if (!useCache) {
        return getTokenValue(tokens, path);
    }
    const cacheKey = `${JSON.stringify(tokens)}-${path}`;
    if (tokenCache.has(cacheKey)) {
        return tokenCache.get(cacheKey);
    }
    const value = getTokenValue(tokens, path);
    tokenCache.set(cacheKey, value);
    return value;
}
/**
 * Clear token resolution cache
 * Call this when design tokens are updated
 */
function clearTokenCache() {
    tokenCache.clear();
}
/**
 * Get cache statistics
 */
function getTokenCacheStats() {
    return {
        size: tokenCache.size,
        keys: Array.from(tokenCache.keys()),
    };
}
//# sourceMappingURL=token-resolver.js.map