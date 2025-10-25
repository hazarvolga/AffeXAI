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
exports.KnowledgeBaseCategoryService = void 0;
const common_1 = require("@nestjs/common");
const knowledge_base_category_entity_1 = require("../entities/knowledge-base-category.entity");
let KnowledgeBaseCategoryService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var KnowledgeBaseCategoryService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            KnowledgeBaseCategoryService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        categoryRepository;
        logger = new common_1.Logger(KnowledgeBaseCategoryService.name);
        constructor(categoryRepository) {
            this.categoryRepository = categoryRepository;
        }
        /**
         * Create a new category
         */
        async createCategory(dto, userId) {
            // Validate category data
            await this.validateCategoryData(dto);
            // Generate unique slug
            const slug = await this.generateUniqueSlug(dto.name);
            // Validate parent if provided
            if (dto.parentId) {
                await this.validateParentCategory(dto.parentId);
            }
            const category = this.categoryRepository.create({
                ...dto,
                slug,
                createdBy: userId,
                updatedBy: userId,
            });
            await this.categoryRepository.save(category);
            this.logger.log(`Created KB category: ${category.id} - ${category.name}`);
            return category;
        }
        /**
         * Update a category
         */
        async updateCategory(id, dto, userId) {
            const category = await this.categoryRepository.findOne({ where: { id } });
            if (!category) {
                throw new common_1.NotFoundException(`Category ${id} not found`);
            }
            // Validate category data
            await this.validateCategoryData(dto, id);
            // Update slug if name changed
            if (dto.name && dto.name !== category.name) {
                category.slug = await this.generateUniqueSlug(dto.name, id);
            }
            // Validate parent if provided
            if (dto.parentId !== undefined) {
                if (dto.parentId) {
                    await this.validateParentCategory(dto.parentId, id);
                }
            }
            Object.assign(category, { ...dto, updatedBy: userId });
            await this.categoryRepository.save(category);
            this.logger.log(`Updated KB category: ${category.id}`);
            return category;
        }
        /**
         * Delete a category
         */
        async deleteCategory(id) {
            const category = await this.categoryRepository.findOne({
                where: { id },
                relations: ['articles', 'children'],
            });
            if (!category) {
                throw new common_1.NotFoundException(`Category ${id} not found`);
            }
            // Check if category has articles
            if (category.articles && category.articles.length > 0) {
                throw new common_1.BadRequestException(`Cannot delete category with ${category.articles.length} articles. Please move or delete articles first.`);
            }
            // Move child categories to parent or root level
            if (category.children && category.children.length > 0) {
                await this.categoryRepository.update({ parentId: id }, { parentId: category.parentId || null });
            }
            await this.categoryRepository.delete(id);
            this.logger.log(`Deleted KB category: ${id}`);
        }
        /**
         * Get category by ID
         */
        async getCategory(id) {
            const category = await this.categoryRepository.findOne({
                where: { id },
                relations: ['articles'],
            });
            if (!category) {
                throw new common_1.NotFoundException(`Category ${id} not found`);
            }
            return category;
        }
        /**
         * Get all categories
         */
        async getAllCategories() {
            return await this.categoryRepository.find({
                where: { isActive: true },
                order: { sortOrder: 'ASC', name: 'ASC' },
                relations: ['articles'],
            });
        }
        /**
         * Get categories with article counts
         */
        async getCategoriesWithCounts() {
            return await this.categoryRepository
                .createQueryBuilder('category')
                .leftJoinAndSelect('category.articles', 'article', 'article.isPublished = :published', { published: true })
                .where('category.isActive = :active', { active: true })
                .orderBy('category.sortOrder', 'ASC')
                .addOrderBy('category.name', 'ASC')
                .getMany();
        }
        /**
         * Get category tree structure
         */
        async getCategoryTree() {
            const categories = await this.categoryRepository.find({
                where: { isActive: true },
                relations: ['children'],
                order: { sortOrder: 'ASC', name: 'ASC' },
            });
            // Build tree structure
            const categoryMap = new Map();
            const rootCategories = [];
            // First pass: create all nodes
            for (const category of categories) {
                const node = {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    color: category.color,
                    icon: category.icon,
                    articleCount: category.articleCount,
                    children: [],
                    level: 0,
                };
                categoryMap.set(category.id, node);
            }
            // Second pass: build hierarchy and calculate levels
            for (const category of categories) {
                const node = categoryMap.get(category.id);
                if (!node)
                    continue;
                if (category.parentId) {
                    const parent = categoryMap.get(category.parentId);
                    if (parent) {
                        parent.children.push(node);
                        node.level = parent.level + 1;
                    }
                    else {
                        // Parent not found or inactive, treat as root
                        rootCategories.push(node);
                    }
                }
                else {
                    rootCategories.push(node);
                }
            }
            // Sort children recursively
            this.sortCategoryTree(rootCategories);
            return rootCategories;
        }
        /**
         * Move category to new parent
         */
        async moveCategory(categoryId, newParentId) {
            const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
            if (!category) {
                throw new common_1.NotFoundException(`Category ${categoryId} not found`);
            }
            // Validate new parent if provided
            if (newParentId) {
                await this.validateParentCategory(newParentId, categoryId);
            }
            // Update parent
            category.parentId = newParentId || null;
            await this.categoryRepository.save(category);
            this.logger.log(`Moved category ${categoryId} to parent ${newParentId || 'root'}`);
        }
        /**
         * Get category with full hierarchy path
         */
        async getCategoryWithPath(id) {
            const category = await this.getCategory(id);
            const path = await this.getCategoryPath(id);
            return { ...category, path };
        }
        /**
         * Get category path (breadcrumb)
         */
        async getCategoryPath(categoryId) {
            const path = [];
            let currentId = categoryId;
            while (currentId) {
                const category = await this.categoryRepository.findOne({
                    where: { id: currentId },
                    select: ['name', 'parentId'],
                });
                if (!category)
                    break;
                path.unshift(category.name);
                currentId = category.parentId;
            }
            return path;
        }
        /**
         * Get all descendants of a category
         */
        async getCategoryDescendants(categoryId) {
            const descendants = [];
            const queue = [categoryId];
            while (queue.length > 0) {
                const currentId = queue.shift();
                if (!currentId)
                    continue;
                const children = await this.categoryRepository.find({
                    where: { parentId: currentId, isActive: true },
                });
                for (const child of children) {
                    descendants.push(child);
                    queue.push(child.id);
                }
            }
            return descendants;
        }
        /**
         * Get all ancestors of a category
         */
        async getCategoryAncestors(categoryId) {
            const ancestors = [];
            let currentId = categoryId;
            while (currentId) {
                const category = await this.categoryRepository.findOne({
                    where: { id: currentId },
                    relations: ['parent'],
                });
                if (!category || !category.parent)
                    break;
                ancestors.unshift(category.parent);
                currentId = category.parent.id;
            }
            return ancestors;
        }
        /**
         * Validate category hierarchy
         */
        async validateHierarchy(categoryId, parentId) {
            try {
                if (parentId) {
                    await this.validateParentCategory(parentId, categoryId);
                }
                return true;
            }
            catch (error) {
                return false;
            }
        }
        /**
         * Reorder categories within the same parent
         */
        async reorderCategories(categoryIds) {
            const categories = await this.categoryRepository.findByIds(categoryIds);
            if (categories.length !== categoryIds.length) {
                throw new common_1.BadRequestException('Some categories not found');
            }
            // Validate all categories have the same parent
            const parentIds = [...new Set(categories.map(c => c.parentId))];
            if (parentIds.length > 1) {
                throw new common_1.BadRequestException('All categories must have the same parent for reordering');
            }
            // Update sort orders
            const updates = categoryIds.map((id, index) => ({
                id,
                sortOrder: index,
            }));
            await this.categoryRepository.save(updates);
            this.logger.log(`Reordered ${categoryIds.length} categories`);
        }
        /**
         * Update article counts for categories
         */
        async updateArticleCounts() {
            await this.categoryRepository
                .createQueryBuilder()
                .update(knowledge_base_category_entity_1.KnowledgeBaseCategory)
                .set({
                articleCount: () => `(
          SELECT COUNT(*) 
          FROM knowledge_base_articles 
          WHERE category_id = knowledge_base_categories.id 
          AND is_published = true
        )`
            })
                .execute();
            this.logger.log(`Updated article counts for categories`);
        }
        /**
         * Get category statistics
         */
        async getCategoryStats() {
            const totalCategories = await this.categoryRepository.count();
            const activeCategories = await this.categoryRepository.count({ where: { isActive: true } });
            const articleCountResult = await this.categoryRepository
                .createQueryBuilder('category')
                .select('SUM(category.articleCount)', 'totalArticles')
                .where('category.isActive = :active', { active: true })
                .getRawOne();
            const totalArticles = parseInt(articleCountResult?.totalArticles || '0');
            const averageArticlesPerCategory = activeCategories > 0 ? totalArticles / activeCategories : 0;
            const mostPopularCategories = await this.categoryRepository.find({
                where: { isActive: true },
                order: { articleCount: 'DESC' },
                take: 5,
            });
            const unusedCategories = await this.categoryRepository.find({
                where: { isActive: true, articleCount: 0 },
                order: { createdAt: 'DESC' },
                take: 10,
            });
            return {
                totalCategories,
                activeCategories,
                totalArticles,
                averageArticlesPerCategory: Math.round(averageArticlesPerCategory * 100) / 100,
                mostPopularCategories,
                unusedCategories,
            };
        }
        /**
         * Get popular categories
         */
        async getPopularCategories(limit = 10) {
            return await this.categoryRepository.find({
                where: { isActive: true },
                order: { articleCount: 'DESC' },
                take: limit,
            });
        }
        /**
         * Bulk activate/deactivate categories
         */
        async bulkUpdateStatus(categoryIds, isActive) {
            const result = await this.categoryRepository
                .createQueryBuilder()
                .update(knowledge_base_category_entity_1.KnowledgeBaseCategory)
                .set({ isActive })
                .whereInIds(categoryIds)
                .execute();
            this.logger.log(`Bulk updated status for ${result.affected} categories to ${isActive ? 'active' : 'inactive'}`);
        }
        /**
         * Bulk delete categories
         */
        async bulkDeleteCategories(categoryIds) {
            // Check each category for articles and children
            for (const id of categoryIds) {
                const category = await this.categoryRepository.findOne({
                    where: { id },
                    relations: ['articles', 'children'],
                });
                if (!category)
                    continue;
                if (category.articles && category.articles.length > 0) {
                    throw new common_1.BadRequestException(`Cannot delete category "${category.name}" with ${category.articles.length} articles`);
                }
                // Move children to parent or root
                if (category.children && category.children.length > 0) {
                    await this.categoryRepository.update({ parentId: id }, { parentId: category.parentId || null });
                }
            }
            // Delete categories
            await this.categoryRepository.delete(categoryIds);
            this.logger.log(`Bulk deleted ${categoryIds.length} categories`);
        }
        /**
         * Initialize default categories
         */
        async initializeDefaultCategories(userId) {
            const defaultCategories = [
                {
                    name: 'Getting Started',
                    description: 'Basic information and setup guides',
                    color: 'blue',
                    icon: 'info',
                    sortOrder: 0,
                },
                {
                    name: 'Troubleshooting',
                    description: 'Common issues and solutions',
                    color: 'red',
                    icon: 'help',
                    sortOrder: 1,
                },
                {
                    name: 'Features',
                    description: 'Product features and how to use them',
                    color: 'green',
                    icon: 'star',
                    sortOrder: 2,
                },
                {
                    name: 'FAQ',
                    description: 'Frequently asked questions',
                    color: 'yellow',
                    icon: 'help',
                    sortOrder: 3,
                },
            ];
            const createdCategories = [];
            for (const categoryData of defaultCategories) {
                // Check if category already exists
                const existing = await this.categoryRepository.findOne({
                    where: { name: categoryData.name },
                });
                if (!existing) {
                    const category = await this.createCategory(categoryData, userId);
                    createdCategories.push(category);
                }
            }
            this.logger.log(`Initialized ${createdCategories.length} default categories`);
            return createdCategories;
        }
        /**
         * Search categories by name or description
         */
        async searchCategories(query) {
            return await this.categoryRepository
                .createQueryBuilder('category')
                .where('category.isActive = :active', { active: true })
                .andWhere('(LOWER(category.name) LIKE LOWER(:query) OR LOWER(category.description) LIKE LOWER(:query))', { query: `%${query}%` })
                .orderBy('category.sortOrder', 'ASC')
                .addOrderBy('category.name', 'ASC')
                .getMany();
        }
        /**
         * Get categories by parent ID
         */
        async getCategoriesByParent(parentId) {
            return await this.categoryRepository.find({
                where: {
                    parentId: parentId || null,
                    isActive: true
                },
                order: { sortOrder: 'ASC', name: 'ASC' },
            });
        }
        /**
         * Get root categories (no parent)
         */
        async getRootCategories() {
            return await this.getCategoriesByParent();
        }
        /**
         * Generate URL-friendly slug from name
         */
        async generateSlug(name) {
            return name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s]+/g, '')
                .replace(/\s+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
        /**
         * Generate unique slug by checking database
         */
        async generateUniqueSlug(name, excludeId) {
            const baseSlug = await this.generateSlug(name);
            let slug = baseSlug;
            let counter = 1;
            while (await this.isSlugTaken(slug, excludeId)) {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }
            return slug;
        }
        /**
         * Check if slug is already taken
         */
        async isSlugTaken(slug, excludeId) {
            const query = this.categoryRepository.createQueryBuilder('category')
                .where('category.slug = :slug', { slug });
            if (excludeId) {
                query.andWhere('category.id != :excludeId', { excludeId });
            }
            const count = await query.getCount();
            return count > 0;
        }
        /**
         * Validate category data
         */
        async validateCategoryData(dto, excludeId) {
            // Validate name
            if (dto.name) {
                if (dto.name.trim().length < 2) {
                    throw new common_1.BadRequestException('Category name must be at least 2 characters long');
                }
                if (dto.name.trim().length > 255) {
                    throw new common_1.BadRequestException('Category name must not exceed 255 characters');
                }
            }
            // Validate color
            if (dto.color) {
                const validColors = ['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray'];
                if (!validColors.includes(dto.color)) {
                    throw new common_1.BadRequestException(`Invalid color. Must be one of: ${validColors.join(', ')}`);
                }
            }
            // Validate icon
            if (dto.icon) {
                const validIcons = ['folder', 'book', 'file', 'tag', 'star', 'heart', 'info', 'help'];
                if (!validIcons.includes(dto.icon)) {
                    throw new common_1.BadRequestException(`Invalid icon. Must be one of: ${validIcons.join(', ')}`);
                }
            }
            // Validate sort order
            if (dto.sortOrder !== undefined && dto.sortOrder < 0) {
                throw new common_1.BadRequestException('Sort order must be a non-negative number');
            }
        }
        /**
         * Validate parent category
         */
        async validateParentCategory(parentId, categoryId) {
            // Check if parent exists
            const parent = await this.categoryRepository.findOne({ where: { id: parentId } });
            if (!parent) {
                throw new common_1.NotFoundException(`Parent category ${parentId} not found`);
            }
            // Check if parent is active
            if (!parent.isActive) {
                throw new common_1.BadRequestException('Parent category must be active');
            }
            // Prevent self-reference
            if (categoryId && parentId === categoryId) {
                throw new common_1.BadRequestException('Category cannot be its own parent');
            }
            // Check for circular reference
            if (categoryId) {
                await this.checkCircularReference(categoryId, parentId);
            }
            // Check maximum depth
            const depth = await this.getCategoryDepth(parentId);
            if (depth >= 2) { // Maximum 3 levels (0, 1, 2)
                throw new common_1.BadRequestException('Maximum category depth of 3 levels exceeded');
            }
        }
        /**
         * Check for circular reference in hierarchy
         */
        async checkCircularReference(categoryId, parentId) {
            let currentParentId = parentId;
            const visited = new Set();
            while (currentParentId) {
                if (visited.has(currentParentId)) {
                    throw new common_1.BadRequestException('Circular reference detected in category hierarchy');
                }
                if (currentParentId === categoryId) {
                    throw new common_1.BadRequestException('Cannot create circular reference: category cannot be descendant of itself');
                }
                visited.add(currentParentId);
                const parent = await this.categoryRepository.findOne({
                    where: { id: currentParentId },
                    select: ['parentId'],
                });
                currentParentId = parent?.parentId || null;
            }
        }
        /**
         * Get category depth in hierarchy
         */
        async getCategoryDepth(categoryId) {
            let depth = 0;
            let currentId = categoryId;
            while (currentId) {
                const category = await this.categoryRepository.findOne({
                    where: { id: currentId },
                    select: ['parentId'],
                });
                if (!category)
                    break;
                currentId = category.parentId;
                depth++;
                // Prevent infinite loop
                if (depth > 10) {
                    throw new common_1.BadRequestException('Category hierarchy too deep');
                }
            }
            return depth;
        }
        /**
         * Sort category tree recursively
         */
        sortCategoryTree(categories) {
            categories.sort((a, b) => {
                // Sort by name for now, could be extended to use sortOrder
                return a.name.localeCompare(b.name);
            });
            for (const category of categories) {
                if (category.children.length > 0) {
                    this.sortCategoryTree(category.children);
                }
            }
        }
    };
    return KnowledgeBaseCategoryService = _classThis;
})();
exports.KnowledgeBaseCategoryService = KnowledgeBaseCategoryService;
//# sourceMappingURL=knowledge-base-category.service.js.map