"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateService = void 0;
const common_1 = require("@nestjs/common");
let TemplateService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TemplateService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TemplateService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        templateRepository;
        constructor(templateRepository) {
            this.templateRepository = templateRepository;
        }
        /**
         * Create a new template
         */
        async create(createTemplateDto) {
            const template = this.templateRepository.create(createTemplateDto);
            return await this.templateRepository.save(template);
        }
        /**
         * Find all templates with optional filtering
         */
        async findAll(options) {
            const query = this.templateRepository.createQueryBuilder('template')
                .leftJoinAndSelect('template.author', 'author')
                .orderBy('template.isFeatured', 'DESC')
                .addOrderBy('template.createdAt', 'DESC');
            if (options?.category) {
                query.andWhere('template.category = :category', { category: options.category });
            }
            if (options?.isFeatured !== undefined) {
                query.andWhere('template.isFeatured = :isFeatured', { isFeatured: options.isFeatured });
            }
            if (options?.isActive !== undefined) {
                query.andWhere('template.isActive = :isActive', { isActive: options.isActive });
            }
            return await query.getMany();
        }
        /**
         * Find one template by ID
         */
        async findOne(id) {
            const template = await this.templateRepository.findOne({
                where: { id },
                relations: ['author'],
            });
            if (!template) {
                throw new common_1.NotFoundException(`Template with ID ${id} not found`);
            }
            return template;
        }
        /**
         * Update a template
         */
        async update(id, updateTemplateDto) {
            const template = await this.findOne(id);
            Object.assign(template, updateTemplateDto);
            return await this.templateRepository.save(template);
        }
        /**
         * Delete a template (soft delete by setting isActive = false)
         */
        async remove(id) {
            const template = await this.findOne(id);
            template.isActive = false;
            await this.templateRepository.save(template);
        }
        /**
         * Hard delete a template
         */
        async hardDelete(id) {
            const template = await this.findOne(id);
            await this.templateRepository.remove(template);
        }
        /**
         * Increment usage count
         */
        async incrementUsage(id) {
            await this.templateRepository.increment({ id }, 'usageCount', 1);
        }
        /**
         * Import template from JSON
         */
        async import(importTemplateDto) {
            try {
                const templateData = JSON.parse(importTemplateDto.templateData);
                // Validate required fields
                if (!templateData.name || !templateData.category || !templateData.designSystem || !templateData.blocks) {
                    throw new common_1.BadRequestException('Invalid template data: missing required fields');
                }
                // Create template from imported data
                const createDto = {
                    name: templateData.name,
                    description: templateData.description,
                    category: templateData.category,
                    designSystem: templateData.designSystem,
                    blocks: templateData.blocks,
                    layoutOptions: templateData.layoutOptions,
                    metadata: templateData.metadata,
                    preview: templateData.preview,
                    constraints: templateData.constraints,
                    isFeatured: templateData.isFeatured || false,
                    authorId: importTemplateDto.authorId,
                };
                return await this.create(createDto);
            }
            catch (error) {
                if (error instanceof SyntaxError) {
                    throw new common_1.BadRequestException('Invalid JSON format');
                }
                throw error;
            }
        }
        /**
         * Export template as JSON
         */
        async export(id) {
            const template = await this.findOne(id);
            const exportData = {
                id: template.id,
                name: template.name,
                description: template.description,
                category: template.category,
                designSystem: template.designSystem,
                blocks: template.blocks,
                layoutOptions: template.layoutOptions,
                metadata: template.metadata,
                preview: template.preview,
                constraints: template.constraints,
                usageCount: template.usageCount,
                isFeatured: template.isFeatured,
                createdAt: template.createdAt,
                updatedAt: template.updatedAt,
            };
            return {
                id: template.id,
                name: template.name,
                data: exportData,
                exportedAt: new Date(),
            };
        }
        /**
         * Get template statistics
         */
        async getStats() {
            const templates = await this.findAll({ isActive: true });
            const stats = {
                total: templates.length,
                byCategory: templates.reduce((acc, t) => {
                    acc[t.category] = (acc[t.category] || 0) + 1;
                    return acc;
                }, {}),
                featured: templates.filter(t => t.isFeatured).length,
                totalUsage: templates.reduce((sum, t) => sum + t.usageCount, 0),
            };
            return stats;
        }
        /**
         * Duplicate a template
         */
        async duplicate(id, newName) {
            const original = await this.findOne(id);
            const createDto = {
                name: newName || `${original.name} (Copy)`,
                description: original.description,
                category: original.category,
                designSystem: original.designSystem,
                blocks: original.blocks,
                layoutOptions: original.layoutOptions,
                metadata: original.metadata,
                preview: original.preview,
                constraints: original.constraints,
                isFeatured: false,
                authorId: original.authorId,
            };
            return await this.create(createDto);
        }
    };
    return TemplateService = _classThis;
})();
exports.TemplateService = TemplateService;
//# sourceMappingURL=template.service.js.map