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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("../entities/category.entity");
let CategoryService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CategoryService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CategoryService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        categoryRepository;
        constructor(categoryRepository) {
            this.categoryRepository = categoryRepository;
        }
        /**
         * Generate slug from category name
         */
        generateSlug(name) {
            return name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
        }
        /**
         * Create a new category
         */
        async create(createDto) {
            // Generate slug if not provided
            const slug = createDto.slug || this.generateSlug(createDto.name);
            // Check if slug already exists
            const existingCategory = await this.categoryRepository.findOne({
                where: { slug },
            });
            if (existingCategory) {
                throw new common_1.ConflictException(`Category with slug "${slug}" already exists`);
            }
            // Validate parent category if provided
            if (createDto.parentId) {
                const parentCategory = await this.categoryRepository.findOne({
                    where: { id: createDto.parentId },
                });
                if (!parentCategory) {
                    throw new common_1.NotFoundException(`Parent category with ID ${createDto.parentId} not found`);
                }
            }
            const category = this.categoryRepository.create({
                ...createDto,
                slug,
            });
            return this.categoryRepository.save(category);
        }
        /**
         * Find all categories (flat list)
         */
        async findAll(params) {
            const queryBuilder = this.categoryRepository
                .createQueryBuilder('category')
                .orderBy('category.orderIndex', 'ASC')
                .addOrderBy('category.name', 'ASC');
            // Filter by parent
            if (params?.parentId !== undefined) {
                if (params.parentId === null) {
                    queryBuilder.where('category.parentId IS NULL');
                }
                else {
                    queryBuilder.where('category.parentId = :parentId', {
                        parentId: params.parentId,
                    });
                }
            }
            // Filter by active status
            if (params?.isActive !== undefined) {
                queryBuilder.andWhere('category.isActive = :isActive', {
                    isActive: params.isActive,
                });
            }
            // Search by name or description
            if (params?.search) {
                queryBuilder.andWhere('(category.name ILIKE :search OR category.description ILIKE :search)', { search: `%${params.search}%` });
            }
            return queryBuilder.getMany();
        }
        /**
         * Find one category by ID
         */
        async findOne(id) {
            const category = await this.categoryRepository.findOne({
                where: { id },
                relations: ['parent', 'children'],
            });
            if (!category) {
                throw new common_1.NotFoundException(`Category with ID ${id} not found`);
            }
            return category;
        }
        /**
         * Find category by slug
         */
        async findBySlug(slug) {
            const category = await this.categoryRepository.findOne({
                where: { slug },
                relations: ['parent', 'children'],
            });
            if (!category) {
                throw new common_1.NotFoundException(`Category with slug "${slug}" not found`);
            }
            return category;
        }
        /**
         * Build hierarchical tree structure
         */
        async getTree() {
            // Get all categories
            const categories = await this.categoryRepository.find({
                order: {
                    orderIndex: 'ASC',
                    name: 'ASC',
                },
            });
            // Build a map for quick access
            const categoryMap = new Map();
            categories.forEach((cat) => categoryMap.set(cat.id, cat));
            // Build tree structure
            const buildTree = (parentId, level = 0) => {
                return categories
                    .filter((cat) => cat.parentId === parentId)
                    .map((cat) => ({
                    id: cat.id,
                    slug: cat.slug,
                    name: cat.name,
                    description: cat.description || undefined,
                    parentId: cat.parentId,
                    orderIndex: cat.orderIndex,
                    isActive: cat.isActive,
                    pageCount: 0, // Will be populated if needed
                    children: buildTree(cat.id, level + 1),
                    level,
                }));
            };
            return buildTree(null, 0);
        }
        /**
         * Update a category
         */
        async update(id, updateDto) {
            const category = await this.findOne(id);
            // Check slug uniqueness if slug is being updated
            if (updateDto.slug && updateDto.slug !== category.slug) {
                const existingCategory = await this.categoryRepository.findOne({
                    where: { slug: updateDto.slug },
                });
                if (existingCategory && existingCategory.id !== id) {
                    throw new common_1.ConflictException(`Category with slug "${updateDto.slug}" already exists`);
                }
            }
            // Validate parent category change
            if (updateDto.parentId !== undefined) {
                if (updateDto.parentId === id) {
                    throw new common_1.BadRequestException('Category cannot be its own parent');
                }
                if (updateDto.parentId) {
                    // Check if parent exists
                    const parentCategory = await this.categoryRepository.findOne({
                        where: { id: updateDto.parentId },
                    });
                    if (!parentCategory) {
                        throw new common_1.NotFoundException(`Parent category with ID ${updateDto.parentId} not found`);
                    }
                    // Check for circular reference
                    const wouldCreateCircular = await this.wouldCreateCircularReference(id, updateDto.parentId);
                    if (wouldCreateCircular) {
                        throw new common_1.BadRequestException('Cannot set parent: would create circular reference');
                    }
                }
            }
            // Update category
            await this.categoryRepository.update(id, updateDto);
            return this.findOne(id);
        }
        /**
         * Check if setting parentId would create a circular reference
         */
        async wouldCreateCircularReference(categoryId, newParentId) {
            let currentId = newParentId;
            while (currentId) {
                if (currentId === categoryId) {
                    return true;
                }
                const category = await this.categoryRepository.findOne({
                    where: { id: currentId },
                });
                currentId = category?.parentId || null;
            }
            return false;
        }
        /**
         * Delete a category
         */
        async remove(id) {
            const category = await this.findOne(id);
            // Check if category has children
            const childrenCount = await this.categoryRepository.count({
                where: { parentId: id },
            });
            if (childrenCount > 0) {
                throw new common_1.BadRequestException('Cannot delete category with child categories. Delete or move child categories first.');
            }
            // Check if category has associated pages
            // Note: This will be enforced by database ON DELETE SET NULL constraint
            // Pages will have their categoryId set to null
            await this.categoryRepository.delete(id);
        }
        /**
         * Reorder categories
         */
        async reorder(dto) {
            if (dto.categoryIds.length !== dto.orderIndexes.length) {
                throw new common_1.BadRequestException('Category IDs and order indexes arrays must have the same length');
            }
            // Update order indexes in a transaction
            await this.categoryRepository.manager.transaction(async (manager) => {
                for (let i = 0; i < dto.categoryIds.length; i++) {
                    await manager.update(category_entity_1.Category, dto.categoryIds[i], {
                        orderIndex: dto.orderIndexes[i],
                    });
                }
            });
        }
        /**
         * Get category with page count
         */
        async getCategoryWithPageCount(id) {
            const category = await this.findOne(id);
            const pageCount = await this.categoryRepository.manager
                .createQueryBuilder()
                .select('COUNT(*)', 'count')
                .from('cms_pages', 'page')
                .where('page.category_id = :categoryId', { categoryId: id })
                .getRawOne()
                .then((result) => parseInt(result.count, 10));
            return {
                ...category,
                pageCount,
            };
        }
    };
    return CategoryService = _classThis;
})();
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map