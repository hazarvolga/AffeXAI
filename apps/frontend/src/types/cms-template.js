"use strict";
/**
 * CMS Template System - Enhanced Type Definitions with Design Token Integration
 *
 * Implements W3C Design Tokens integration with page templates for:
 * - Theme-aware templates supporting multiple contexts (public/admin/portal)
 * - Design token references using {tokenPath} alias format
 * - Template versioning and validation
 * - Component-level template parts for reusability
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenAlias = isTokenAlias;
exports.extractTokenPath = extractTokenPath;
exports.createTokenAlias = createTokenAlias;
/**
 * Type guard to check if a value is a token alias
 */
function isTokenAlias(value) {
    return typeof value === 'string' && value.startsWith('{') && value.endsWith('}');
}
/**
 * Extract token path from alias format
 * @example "{color.primary}" -> "color.primary"
 */
function extractTokenPath(alias) {
    if (isTokenAlias(alias)) {
        return alias.slice(1, -1);
    }
    return alias;
}
/**
 * Create token alias from path
 * @example "color.primary" -> "{color.primary}"
 */
function createTokenAlias(path) {
    if (isTokenAlias(path)) {
        return path;
    }
    return `{${path}}`;
}
//# sourceMappingURL=cms-template.js.map