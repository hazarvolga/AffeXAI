"use strict";
/**
 * Template Application Utilities
 *
 * Utilities for applying templates to pages with validation and conflict resolution
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyTemplate = applyTemplate;
exports.duplicateTemplate = duplicateTemplate;
exports.createTemplateVersion = createTemplateVersion;
exports.restoreTemplateVersion = restoreTemplateVersion;
exports.extractTemplatePart = extractTemplatePart;
exports.previewTemplateApplication = previewTemplateApplication;
const token_resolver_1 = require("./token-resolver");
const token_validator_1 = require("./token-validator");
/**
 * Default application options
 */
const defaultOptions = {
    strategy: 'replace',
    resolveTokens: true,
    validate: true,
    generateNewIds: true,
    preserveExistingIds: false,
};
/**
 * Generate unique block ID
 */
function generateBlockId(prefix = 'block') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
/**
 * Generate new IDs for all blocks in template
 */
function regenerateBlockIds(blocks) {
    return blocks.map((block) => ({
        ...block,
        id: generateBlockId(block.type),
        children: block.children ? regenerateBlockIds(block.children) : undefined,
    }));
}
/**
 * Apply template to page with specified strategy
 */
function applyTemplate(template, existingBlocks, tokens, options = {}) {
    const opts = { ...defaultOptions, ...options };
    const errors = [];
    const warnings = [];
    // Validation
    if (opts.validate) {
        const context = opts.context || 'public';
        const mode = opts.mode || 'light';
        const validation = (0, token_validator_1.validateTemplateContext)(template, context, mode, tokens);
        if (!validation.isValid) {
            return {
                success: false,
                errors: validation.errors.map((e) => e.message),
                warnings: validation.warnings.map((w) => w.message),
                appliedBlocks: 0,
                resolvedTokens: 0,
            };
        }
        warnings.push(...validation.warnings.map((w) => w.message));
        // Safety check
        const safety = (0, token_validator_1.checkTemplateSafety)(template, tokens);
        if (!safety.isSafe) {
            warnings.push(`Missing ${safety.missingTokens.length} tokens`);
            warnings.push(...safety.recommendations);
        }
    }
    // Get template blocks
    let templateBlocks = [...template.blocks];
    // Generate new IDs if requested
    if (opts.generateNewIds) {
        templateBlocks = regenerateBlockIds(templateBlocks);
    }
    // Resolve tokens if requested
    let resolvedBlocks = templateBlocks;
    let resolvedCount = 0;
    if (opts.resolveTokens) {
        resolvedBlocks = (0, token_resolver_1.resolveBlocks)(templateBlocks, tokens);
        resolvedCount = countTokenReferences(templateBlocks);
    }
    // Apply strategy
    let finalBlocks = [];
    switch (opts.strategy) {
        case 'replace':
            finalBlocks = resolvedBlocks;
            break;
        case 'append':
            finalBlocks = [...existingBlocks, ...resolvedBlocks];
            break;
        case 'prepend':
            finalBlocks = [...resolvedBlocks, ...existingBlocks];
            break;
        case 'merge':
            finalBlocks = mergeBlocks(existingBlocks, resolvedBlocks, opts.preserveExistingIds);
            break;
        default:
            errors.push(`Unknown strategy: ${opts.strategy}`);
            return {
                success: false,
                errors,
                warnings,
                appliedBlocks: 0,
                resolvedTokens: 0,
            };
    }
    return {
        success: true,
        errors,
        warnings,
        appliedBlocks: finalBlocks.length,
        resolvedTokens: resolvedCount,
        validationResults: opts.validate
            ? (0, token_validator_1.validateTemplateContext)(template, opts.context || 'public', opts.mode || 'light', tokens)
            : undefined,
    };
}
/**
 * Intelligent merge of existing and template blocks
 */
function mergeBlocks(existing, template, preserveIds = false) {
    const merged = [];
    const existingByType = new Map();
    // Group existing blocks by type
    existing.forEach((block) => {
        if (!existingByType.has(block.type)) {
            existingByType.set(block.type, []);
        }
        existingByType.get(block.type).push(block);
    });
    // Process template blocks
    template.forEach((templateBlock) => {
        const existingOfType = existingByType.get(templateBlock.type);
        if (existingOfType && existingOfType.length > 0 && preserveIds) {
            // Use existing block with merged properties
            const existingBlock = existingOfType.shift();
            merged.push({
                ...existingBlock,
                properties: {
                    ...templateBlock.properties,
                    ...existingBlock.properties, // Existing properties take precedence
                },
            });
        }
        else {
            // Add template block as-is
            merged.push(templateBlock);
        }
    });
    // Add remaining existing blocks that weren't matched
    existingByType.forEach((blocks) => {
        merged.push(...blocks);
    });
    return merged;
}
/**
 * Count token references in blocks
 */
function countTokenReferences(blocks) {
    let count = 0;
    const countInValue = (value) => {
        if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
            count++;
        }
        else if (Array.isArray(value)) {
            value.forEach(countInValue);
        }
        else if (typeof value === 'object' && value !== null) {
            Object.values(value).forEach(countInValue);
        }
    };
    blocks.forEach((block) => {
        countInValue(block.properties);
        if (block.children) {
            count += countTokenReferences(block.children);
        }
    });
    return count;
}
/**
 * Duplicate template with new ID and updated metadata
 */
function duplicateTemplate(template, nameSuffix = ' (Copy)') {
    const newId = `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return {
        ...template,
        id: newId,
        name: `${template.name}${nameSuffix}`,
        blocks: regenerateBlockIds(template.blocks),
        usageCount: 0,
        version: 1,
        versionHistory: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: false,
        isFeatured: false,
    };
}
/**
 * Create new version of template
 */
function createTemplateVersion(template, changelog) {
    const newVersion = {
        ...template,
        version: template.version + 1,
        updatedAt: new Date(),
        versionHistory: [
            ...(template.versionHistory || []),
            {
                version: template.version,
                createdAt: template.updatedAt,
                changelog: changelog || `Version ${template.version}`,
                blocks: template.blocks,
                designSystem: template.designSystem,
            },
        ],
    };
    return newVersion;
}
/**
 * Restore template to specific version
 */
function restoreTemplateVersion(template, versionNumber) {
    if (!template.versionHistory)
        return null;
    const version = template.versionHistory.find((v) => v.version === versionNumber);
    if (!version)
        return null;
    return {
        ...template,
        blocks: version.blocks,
        designSystem: version.designSystem,
        updatedAt: new Date(),
    };
}
/**
 * Extract template part from template
 */
function extractTemplatePart(template, blockIds, partName, partType) {
    const extractedBlocks = template.blocks.filter((block) => blockIds.includes(block.id));
    if (extractedBlocks.length === 0) {
        throw new Error('No blocks found with specified IDs');
    }
    return {
        id: `part-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: partName,
        description: `Extracted from ${template.name}`,
        type: partType,
        blocks: extractedBlocks,
        designSystem: {
            colorScheme: template.designSystem.colorScheme,
            typography: template.designSystem.typography,
            spacing: template.designSystem.spacing,
        },
        preview: {
            thumbnail: '',
        },
        usageCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}
/**
 * Get application preview (dry run)
 */
function previewTemplateApplication(template, existingBlocks, tokens, options = {}) {
    const opts = { ...defaultOptions, ...options };
    // Get template blocks
    let templateBlocks = [...template.blocks];
    // Resolve tokens if requested
    const resolvedBlocks = opts.resolveTokens
        ? (0, token_resolver_1.resolveBlocks)(templateBlocks, tokens)
        : templateBlocks;
    // Apply strategy
    let finalBlocks = [];
    switch (opts.strategy) {
        case 'replace':
            finalBlocks = resolvedBlocks;
            break;
        case 'append':
            finalBlocks = [...existingBlocks, ...resolvedBlocks];
            break;
        case 'prepend':
            finalBlocks = [...resolvedBlocks, ...existingBlocks];
            break;
        case 'merge':
            finalBlocks = mergeBlocks(existingBlocks, resolvedBlocks, opts.preserveExistingIds);
            break;
    }
    const result = {
        success: true,
        errors: [],
        warnings: [],
        appliedBlocks: finalBlocks.length,
        resolvedTokens: opts.resolveTokens ? countTokenReferences(templateBlocks) : 0,
    };
    return { finalBlocks, result };
}
//# sourceMappingURL=template-application.js.map