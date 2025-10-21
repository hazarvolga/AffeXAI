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
exports.TicketTemplatesService = void 0;
const common_1 = require("@nestjs/common");
/**
 * Ticket Templates Service
 * Manages pre-defined ticket templates for common issues
 */
let TicketTemplatesService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TicketTemplatesService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketTemplatesService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        templateRepository;
        logger = new common_1.Logger(TicketTemplatesService.name);
        constructor(templateRepository) {
            this.templateRepository = templateRepository;
        }
        /**
         * Get all active templates
         */
        async findAll(isPublic) {
            const query = { isActive: true };
            if (isPublic !== undefined) {
                query.isPublic = isPublic;
            }
            return this.templateRepository.find({
                where: query,
                relations: ['category', 'createdBy'],
                order: { usageCount: 'DESC', name: 'ASC' },
            });
        }
        /**
         * Get template by ID
         */
        async findOne(id) {
            const template = await this.templateRepository.findOne({
                where: { id },
                relations: ['category', 'createdBy'],
            });
            if (!template) {
                throw new common_1.NotFoundException(`Template not found: ${id}`);
            }
            return template;
        }
        /**
         * Create new template
         */
        async create(data) {
            const template = this.templateRepository.create(data);
            const savedTemplate = await this.templateRepository.save(template);
            this.logger.log(`Created template: ${savedTemplate.name} (${savedTemplate.id})`);
            return this.findOne(savedTemplate.id);
        }
        /**
         * Update template
         */
        async update(id, data) {
            const template = await this.findOne(id);
            Object.assign(template, data);
            await this.templateRepository.save(template);
            this.logger.log(`Updated template: ${template.name} (${id})`);
            return this.findOne(id);
        }
        /**
         * Delete template (soft delete by marking inactive)
         */
        async delete(id) {
            const template = await this.findOne(id);
            template.isActive = false;
            await this.templateRepository.save(template);
            this.logger.log(`Deleted template: ${template.name} (${id})`);
        }
        /**
         * Toggle template active status
         */
        async toggle(id) {
            const template = await this.findOne(id);
            template.isActive = !template.isActive;
            await this.templateRepository.save(template);
            this.logger.log(`Toggled template: ${template.name} (${id}) to ${template.isActive}`);
            return this.findOne(id);
        }
        /**
         * Increment template usage count
         */
        async incrementUsage(id) {
            const template = await this.findOne(id);
            template.usageCount += 1;
            await this.templateRepository.save(template);
            this.logger.log(`Incremented usage count for template: ${template.name} (${id})`);
        }
        /**
         * Get templates by category
         */
        async findByCategory(categoryId) {
            return this.templateRepository.find({
                where: { categoryId, isActive: true },
                relations: ['category', 'createdBy'],
                order: { usageCount: 'DESC', name: 'ASC' },
            });
        }
        /**
         * Get user's private templates
         */
        async findByUser(userId) {
            return this.templateRepository.find({
                where: { createdById: userId, isActive: true },
                relations: ['category'],
                order: { usageCount: 'DESC', name: 'ASC' },
            });
        }
        /**
         * Get popular templates (top 10 by usage)
         */
        async getPopular(limit = 10) {
            return this.templateRepository.find({
                where: { isActive: true, isPublic: true },
                relations: ['category', 'createdBy'],
                order: { usageCount: 'DESC' },
                take: limit,
            });
        }
        /**
         * Search templates by name or content
         */
        async search(query) {
            return this.templateRepository
                .createQueryBuilder('template')
                .leftJoinAndSelect('template.category', 'category')
                .leftJoinAndSelect('template.createdBy', 'createdBy')
                .where('template.isActive = :isActive', { isActive: true })
                .andWhere('(template.name ILIKE :query OR template.subject ILIKE :query OR template.content ILIKE :query)', { query: `%${query}%` })
                .orderBy('template.usageCount', 'DESC')
                .getMany();
        }
    };
    return TicketTemplatesService = _classThis;
})();
exports.TicketTemplatesService = TicketTemplatesService;
//# sourceMappingURL=ticket-templates.service.js.map