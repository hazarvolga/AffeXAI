"use strict";
/**
 * Token Resolution and Validation Integration Tests
 *
 * Tests the complete token integration workflow:
 * 1. Token resolution in block properties
 * 2. Token validation against design system
 * 3. Template validation with design tokens
 * 4. Context compatibility checking
 */
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const token_resolver_1 = require("../token-resolver");
const token_validator_1 = require("../token-validator");
// Mock design tokens for testing
const mockDesignTokens = {
    color: {
        primary: { $type: 'color', $value: '222 47% 11%' },
        secondary: { $type: 'color', $value: '210 40% 96%' },
        background: { $type: 'color', $value: '0 0% 100%' },
        foreground: { $type: 'color', $value: '222 47% 11%' },
        muted: { $type: 'color', $value: '210 40% 96%' },
        'muted-foreground': { $type: 'color', $value: '215 16% 47%' },
        accent: { $type: 'color', $value: '210 40% 96%' },
        border: { $type: 'color', $value: '214 32% 91%' },
        card: { $type: 'color', $value: '0 0% 100%' },
    },
    spacing: {
        xs: { $type: 'dimension', $value: '4px' },
        sm: { $type: 'dimension', $value: '8px' },
        md: { $type: 'dimension', $value: '16px' },
        lg: { $type: 'dimension', $value: '32px' },
        xl: { $type: 'dimension', $value: '64px' },
        section: { $type: 'dimension', $value: '80px' },
        component: { $type: 'dimension', $value: '24px' },
    },
    typography: {
        heading1: {
            $type: 'typography',
            fontSize: { $value: '48px' },
            lineHeight: { $value: '1.2' },
            fontWeight: { $value: '700' },
        },
        body: {
            $type: 'typography',
            fontSize: { $value: '16px' },
            lineHeight: { $value: '1.5' },
            fontWeight: { $value: '400' },
        },
    },
    shadow: {
        card: {
            $type: 'shadow',
            $value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
    },
};
(0, globals_1.describe)('Token Resolution', () => {
    (0, globals_1.describe)('getTokenValue', () => {
        (0, globals_1.it)('should resolve simple token path', () => {
            const value = (0, token_resolver_1.getTokenValue)(mockDesignTokens, 'color.primary');
            (0, globals_1.expect)(value).toBe('222 47% 11%');
        });
        (0, globals_1.it)('should resolve nested token path', () => {
            const value = (0, token_resolver_1.getTokenValue)(mockDesignTokens, 'spacing.section');
            (0, globals_1.expect)(value).toBe('80px');
        });
        (0, globals_1.it)('should return undefined for non-existent token', () => {
            const value = (0, token_resolver_1.getTokenValue)(mockDesignTokens, 'color.nonexistent');
            (0, globals_1.expect)(value).toBeUndefined();
        });
        (0, globals_1.it)('should resolve composite token', () => {
            const value = (0, token_resolver_1.getTokenValue)(mockDesignTokens, 'typography.heading1');
            (0, globals_1.expect)(value).toEqual({
                $type: 'typography',
                fontSize: '48px',
                lineHeight: '1.2',
                fontWeight: '700',
            });
        });
    });
    (0, globals_1.describe)('resolveBlockTokens', () => {
        (0, globals_1.it)('should resolve token aliases in block properties', () => {
            const properties = {
                backgroundColor: '{color.background}',
                textColor: '{color.foreground}',
                padding: '{spacing.md}',
                title: 'Test Title',
            };
            const resolved = (0, token_resolver_1.resolveBlockTokens)(properties, mockDesignTokens);
            (0, globals_1.expect)(resolved).toEqual({
                backgroundColor: '0 0% 100%',
                textColor: '222 47% 11%',
                padding: '16px',
                title: 'Test Title',
            });
        });
        (0, globals_1.it)('should handle nested objects', () => {
            const properties = {
                style: {
                    color: '{color.primary}',
                    margin: '{spacing.lg}',
                },
                title: 'Nested Test',
            };
            const resolved = (0, token_resolver_1.resolveBlockTokens)(properties, mockDesignTokens);
            (0, globals_1.expect)(resolved.style).toEqual({
                color: '222 47% 11%',
                margin: '32px',
            });
        });
        (0, globals_1.it)('should handle arrays with token references', () => {
            const properties = {
                items: [
                    { color: '{color.primary}' },
                    { color: '{color.secondary}' },
                ],
            };
            const resolved = (0, token_resolver_1.resolveBlockTokens)(properties, mockDesignTokens);
            (0, globals_1.expect)(resolved.items).toEqual([
                { color: '222 47% 11%' },
                { color: '210 40% 96%' },
            ]);
        });
        (0, globals_1.it)('should preserve non-token values', () => {
            const properties = {
                tokenValue: '{color.primary}',
                directValue: '#ff0000',
                numberValue: 42,
                booleanValue: true,
            };
            const resolved = (0, token_resolver_1.resolveBlockTokens)(properties, mockDesignTokens);
            (0, globals_1.expect)(resolved).toEqual({
                tokenValue: '222 47% 11%',
                directValue: '#ff0000',
                numberValue: 42,
                booleanValue: true,
            });
        });
    });
    (0, globals_1.describe)('extractUsedTokens', () => {
        (0, globals_1.it)('should extract all unique token paths', () => {
            const properties = {
                backgroundColor: '{color.background}',
                textColor: '{color.foreground}',
                padding: '{spacing.md}',
                nested: {
                    color: '{color.primary}',
                    margin: '{spacing.lg}',
                },
            };
            const tokens = (0, token_resolver_1.extractUsedTokens)(properties);
            (0, globals_1.expect)(tokens).toContain('color.background');
            (0, globals_1.expect)(tokens).toContain('color.foreground');
            (0, globals_1.expect)(tokens).toContain('spacing.md');
            (0, globals_1.expect)(tokens).toContain('color.primary');
            (0, globals_1.expect)(tokens).toContain('spacing.lg');
            (0, globals_1.expect)(tokens).toHaveLength(5);
        });
    });
    (0, globals_1.describe)('usesTokenReference', () => {
        (0, globals_1.it)('should detect token aliases in strings', () => {
            (0, globals_1.expect)((0, token_resolver_1.usesTokenReference)('{color.primary}')).toBe(true);
            (0, globals_1.expect)((0, token_resolver_1.usesTokenReference)('#ff0000')).toBe(false);
        });
        (0, globals_1.it)('should detect token aliases in objects', () => {
            (0, globals_1.expect)((0, token_resolver_1.usesTokenReference)({ color: '{color.primary}' })).toBe(true);
            (0, globals_1.expect)((0, token_resolver_1.usesTokenReference)({ color: '#ff0000' })).toBe(false);
        });
        (0, globals_1.it)('should detect token aliases in arrays', () => {
            (0, globals_1.expect)((0, token_resolver_1.usesTokenReference)(['{color.primary}', '#ff0000'])).toBe(true);
            (0, globals_1.expect)((0, token_resolver_1.usesTokenReference)(['#ff0000', '#00ff00'])).toBe(false);
        });
    });
});
(0, globals_1.describe)('Token Validation', () => {
    (0, globals_1.describe)('validateBlockTokens', () => {
        (0, globals_1.it)('should validate block with valid tokens', () => {
            const block = {
                id: 'test-block',
                type: 'hero',
                category: 'hero',
                properties: {
                    backgroundColor: '{color.background}',
                    textColor: '{color.foreground}',
                },
            };
            const errors = (0, token_validator_1.validateBlockTokens)(block, mockDesignTokens);
            (0, globals_1.expect)(errors).toHaveLength(0);
        });
        (0, globals_1.it)('should detect missing tokens', () => {
            const block = {
                id: 'test-block',
                type: 'hero',
                category: 'hero',
                properties: {
                    backgroundColor: '{color.nonexistent}',
                    textColor: '{color.foreground}',
                },
            };
            const errors = (0, token_validator_1.validateBlockTokens)(block, mockDesignTokens);
            (0, globals_1.expect)(errors).toHaveLength(1);
            (0, globals_1.expect)(errors[0].type).toBe('token_not_found');
            (0, globals_1.expect)(errors[0].tokenPath).toBe('color.nonexistent');
        });
    });
    (0, globals_1.describe)('validateTemplateTokens', () => {
        (0, globals_1.it)('should validate template with valid design system', () => {
            const template = {
                id: 'test-template',
                name: 'Test Template',
                description: 'Test',
                category: 'landing',
                blocks: [],
                layoutOptions: { maxWidth: 'wide' },
                designSystem: {
                    supportedContexts: ['public'],
                    colorScheme: {
                        primary: '{color.primary}',
                        background: '{color.background}',
                        foreground: '{color.foreground}',
                        accent: '{color.accent}',
                    },
                    typography: {
                        heading: '{typography.heading1}',
                        body: '{typography.body}',
                    },
                    spacing: {
                        section: '{spacing.section}',
                        component: '{spacing.component}',
                    },
                },
                preview: { thumbnail: '' },
                usageCount: 0,
                version: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                isPublished: false,
            };
            const result = (0, token_validator_1.validateTemplateTokens)(template, mockDesignTokens);
            (0, globals_1.expect)(result.isValid).toBe(true);
            (0, globals_1.expect)(result.errors).toHaveLength(0);
        });
        (0, globals_1.it)('should detect missing design system tokens', () => {
            const template = {
                id: 'test-template',
                name: 'Test Template',
                description: 'Test',
                category: 'landing',
                blocks: [],
                layoutOptions: { maxWidth: 'wide' },
                designSystem: {
                    supportedContexts: ['public'],
                    colorScheme: {
                        primary: '{color.nonexistent}',
                        background: '{color.background}',
                        foreground: '{color.foreground}',
                        accent: '{color.accent}',
                    },
                    typography: {
                        heading: '{typography.heading1}',
                        body: '{typography.body}',
                    },
                    spacing: {
                        section: '{spacing.section}',
                        component: '{spacing.component}',
                    },
                },
                preview: { thumbnail: '' },
                usageCount: 0,
                version: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                isPublished: false,
            };
            const result = (0, token_validator_1.validateTemplateTokens)(template, mockDesignTokens);
            (0, globals_1.expect)(result.isValid).toBe(false);
            (0, globals_1.expect)(result.errors.length).toBeGreaterThan(0);
            (0, globals_1.expect)(result.errors[0].type).toBe('token_not_found');
        });
    });
    (0, globals_1.describe)('getTokenUsageReport', () => {
        (0, globals_1.it)('should generate comprehensive token usage report', () => {
            const template = {
                id: 'test-template',
                name: 'Test Template',
                description: 'Test',
                category: 'landing',
                blocks: [
                    {
                        id: 'block-1',
                        type: 'hero',
                        category: 'hero',
                        properties: {
                            backgroundColor: '{color.background}',
                            textColor: '{color.foreground}',
                            padding: '{spacing.section}',
                        },
                    },
                ],
                layoutOptions: { maxWidth: 'wide' },
                designSystem: {
                    supportedContexts: ['public'],
                    colorScheme: {
                        primary: '{color.primary}',
                        background: '{color.background}',
                        foreground: '{color.foreground}',
                        accent: '{color.accent}',
                    },
                    typography: {
                        heading: '{typography.heading1}',
                        body: '{typography.body}',
                    },
                    spacing: {
                        section: '{spacing.section}',
                        component: '{spacing.component}',
                    },
                },
                preview: { thumbnail: '' },
                usageCount: 0,
                version: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                isPublished: false,
            };
            const report = (0, token_validator_1.getTokenUsageReport)(template);
            (0, globals_1.expect)(report.uniqueTokens.length).toBeGreaterThan(0);
            (0, globals_1.expect)(report.tokensByCategory.color).toBeDefined();
            (0, globals_1.expect)(report.tokensByCategory.spacing).toBeDefined();
            (0, globals_1.expect)(report.tokensByCategory.typography).toBeDefined();
            (0, globals_1.expect)(report.blocksUsingTokens).toHaveLength(1);
            (0, globals_1.expect)(report.blocksUsingTokens[0].blockId).toBe('block-1');
        });
    });
    (0, globals_1.describe)('checkTemplateSafety', () => {
        (0, globals_1.it)('should pass safety check for valid template', () => {
            const template = {
                id: 'test-template',
                name: 'Test Template',
                description: 'Test',
                category: 'landing',
                blocks: [],
                layoutOptions: { maxWidth: 'wide' },
                designSystem: {
                    supportedContexts: ['public'],
                    colorScheme: {
                        primary: '{color.primary}',
                        background: '{color.background}',
                        foreground: '{color.foreground}',
                        accent: '{color.accent}',
                    },
                    typography: {
                        heading: '{typography.heading1}',
                        body: '{typography.body}',
                    },
                    spacing: {
                        section: '{spacing.section}',
                        component: '{spacing.component}',
                    },
                },
                preview: { thumbnail: '' },
                usageCount: 0,
                version: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                isPublished: false,
            };
            const safetyCheck = (0, token_validator_1.checkTemplateSafety)(template, mockDesignTokens);
            (0, globals_1.expect)(safetyCheck.isSafe).toBe(true);
            (0, globals_1.expect)(safetyCheck.missingTokens).toHaveLength(0);
        });
        (0, globals_1.it)('should fail safety check for template with missing tokens', () => {
            const template = {
                id: 'test-template',
                name: 'Test Template',
                description: 'Test',
                category: 'landing',
                blocks: [],
                layoutOptions: { maxWidth: 'wide' },
                designSystem: {
                    supportedContexts: ['public'],
                    colorScheme: {
                        primary: '{color.missing}',
                        background: '{color.background}',
                        foreground: '{color.foreground}',
                        accent: '{color.accent}',
                    },
                    typography: {
                        heading: '{typography.heading1}',
                        body: '{typography.body}',
                    },
                    spacing: {
                        section: '{spacing.section}',
                        component: '{spacing.component}',
                    },
                },
                preview: { thumbnail: '' },
                usageCount: 0,
                version: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                isPublished: false,
            };
            const safetyCheck = (0, token_validator_1.checkTemplateSafety)(template, mockDesignTokens);
            (0, globals_1.expect)(safetyCheck.isSafe).toBe(false);
            (0, globals_1.expect)(safetyCheck.missingTokens).toContain('color.missing');
            (0, globals_1.expect)(safetyCheck.recommendations.length).toBeGreaterThan(0);
        });
    });
});
//# sourceMappingURL=token-integration.test.js.map