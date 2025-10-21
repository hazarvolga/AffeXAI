"use strict";
/**
 * W3C Design Tokens Community Group Specification Implementation
 * @see https://www.w3.org/community/design-tokens/
 * @see https://tr.designtokens.org/format/
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenAlias = isTokenAlias;
exports.resolveTokenPath = resolveTokenPath;
function isTokenAlias(value) {
    return typeof value === 'string' && value.startsWith('{') && value.endsWith('}');
}
function resolveTokenPath(alias) {
    return alias.slice(1, -1); // Remove { and }
}
//# sourceMappingURL=design-tokens.js.map