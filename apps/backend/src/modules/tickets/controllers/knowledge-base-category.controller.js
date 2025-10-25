"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeBaseCategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
/**
 * Knowledge Base Category Controller
 * Manages KB article categories
 */
let KnowledgeBaseCategoryController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Knowledge Base Categories'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('knowledge-base/categories'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createCategory_decorators;
    let _getCategoryTree_decorators;
    let _getCategoryStats_decorators;
    let _searchCategories_decorators;
    let _getAllCategories_decorators;
    let _updateCategory_decorators;
    let _deleteCategory_decorators;
    let _getRootCategories_decorators;
    let _getCategoriesByParent_decorators;
    let _getCategoryWithPath_decorators;
    let _getCategoryDescendants_decorators;
    let _getCategoryAncestors_decorators;
    let _reorderCategories_decorators;
    let _moveCategory_decorators;
    let _bulkUpdateStatus_decorators;
    let _bulkDeleteCategories_decorators;
    let _updateArticleCounts_decorators;
    let _initializeDefaultCategories_decorators;
    let _getCategory_decorators;
    var KnowledgeBaseCategoryController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createCategory_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Create new KB category' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Category created successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid category data' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions' }), (0, swagger_1.ApiResponse)({ status: 409, description: 'Category name already exists' })];
            _getCategoryTree_decorators = [(0, common_1.Get)('tree'), (0, swagger_1.ApiOperation)({ summary: 'Get KB category tree structure' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Category tree retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' })];
            _getCategoryStats_decorators = [(0, common_1.Get)('stats'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get KB category statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Category statistics retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Admin or Editor access required' })];
            _searchCategories_decorators = [(0, common_1.Get)('search'), (0, swagger_1.ApiOperation)({ summary: 'Search KB categories' }), (0, swagger_1.ApiQuery)({ name: 'q', description: 'Search query', required: true }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Search results retrieved successfully' })];
            _getAllCategories_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all KB categories' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Categories retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' })];
            _updateCategory_decorators = [(0, common_1.Put)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Update KB category' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Category updated successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid category data' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' })];
            _deleteCategory_decorators = [(0, common_1.Delete)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Delete KB category' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Category deleted successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Category has articles or other dependencies' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' })];
            _getRootCategories_decorators = [(0, common_1.Get)('by-parent'), (0, swagger_1.ApiOperation)({ summary: 'Get root categories' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Categories retrieved successfully' })];
            _getCategoriesByParent_decorators = [(0, common_1.Get)('by-parent/:parentId'), (0, swagger_1.ApiOperation)({ summary: 'Get categories by parent ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Categories retrieved successfully' })];
            _getCategoryWithPath_decorators = [(0, common_1.Get)(':id/path'), (0, swagger_1.ApiOperation)({ summary: 'Get category with breadcrumb path' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Category with path retrieved successfully' })];
            _getCategoryDescendants_decorators = [(0, common_1.Get)(':id/descendants'), (0, swagger_1.ApiOperation)({ summary: 'Get all descendants of a category' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Category descendants retrieved successfully' })];
            _getCategoryAncestors_decorators = [(0, common_1.Get)(':id/ancestors'), (0, swagger_1.ApiOperation)({ summary: 'Get all ancestors of a category' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Category ancestors retrieved successfully' })];
            _reorderCategories_decorators = [(0, common_1.Post)('reorder'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Reorder categories within same parent' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Categories reordered successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid category IDs or different parents' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions' })];
            _moveCategory_decorators = [(0, common_1.Put)(':id/move'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Move category to new parent' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Category moved successfully' })];
            _bulkUpdateStatus_decorators = [(0, common_1.Put)('bulk/status'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Bulk update category active status' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Categories updated successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid category IDs' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions' })];
            _bulkDeleteCategories_decorators = [(0, common_1.Delete)('bulk'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Bulk delete categories' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Categories deleted successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Categories have articles or dependencies' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Admin access required' })];
            _updateArticleCounts_decorators = [(0, common_1.Post)('update-counts'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Update article counts for all categories' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Article counts updated successfully' })];
            _initializeDefaultCategories_decorators = [(0, common_1.Post)('initialize'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Initialize default KB categories' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Default categories created' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Admin access required' })];
            _getCategory_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get KB category by ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Category retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' })];
            __esDecorate(this, null, _createCategory_decorators, { kind: "method", name: "createCategory", static: false, private: false, access: { has: obj => "createCategory" in obj, get: obj => obj.createCategory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCategoryTree_decorators, { kind: "method", name: "getCategoryTree", static: false, private: false, access: { has: obj => "getCategoryTree" in obj, get: obj => obj.getCategoryTree }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCategoryStats_decorators, { kind: "method", name: "getCategoryStats", static: false, private: false, access: { has: obj => "getCategoryStats" in obj, get: obj => obj.getCategoryStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _searchCategories_decorators, { kind: "method", name: "searchCategories", static: false, private: false, access: { has: obj => "searchCategories" in obj, get: obj => obj.searchCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAllCategories_decorators, { kind: "method", name: "getAllCategories", static: false, private: false, access: { has: obj => "getAllCategories" in obj, get: obj => obj.getAllCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateCategory_decorators, { kind: "method", name: "updateCategory", static: false, private: false, access: { has: obj => "updateCategory" in obj, get: obj => obj.updateCategory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteCategory_decorators, { kind: "method", name: "deleteCategory", static: false, private: false, access: { has: obj => "deleteCategory" in obj, get: obj => obj.deleteCategory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getRootCategories_decorators, { kind: "method", name: "getRootCategories", static: false, private: false, access: { has: obj => "getRootCategories" in obj, get: obj => obj.getRootCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCategoriesByParent_decorators, { kind: "method", name: "getCategoriesByParent", static: false, private: false, access: { has: obj => "getCategoriesByParent" in obj, get: obj => obj.getCategoriesByParent }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCategoryWithPath_decorators, { kind: "method", name: "getCategoryWithPath", static: false, private: false, access: { has: obj => "getCategoryWithPath" in obj, get: obj => obj.getCategoryWithPath }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCategoryDescendants_decorators, { kind: "method", name: "getCategoryDescendants", static: false, private: false, access: { has: obj => "getCategoryDescendants" in obj, get: obj => obj.getCategoryDescendants }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCategoryAncestors_decorators, { kind: "method", name: "getCategoryAncestors", static: false, private: false, access: { has: obj => "getCategoryAncestors" in obj, get: obj => obj.getCategoryAncestors }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _reorderCategories_decorators, { kind: "method", name: "reorderCategories", static: false, private: false, access: { has: obj => "reorderCategories" in obj, get: obj => obj.reorderCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _moveCategory_decorators, { kind: "method", name: "moveCategory", static: false, private: false, access: { has: obj => "moveCategory" in obj, get: obj => obj.moveCategory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _bulkUpdateStatus_decorators, { kind: "method", name: "bulkUpdateStatus", static: false, private: false, access: { has: obj => "bulkUpdateStatus" in obj, get: obj => obj.bulkUpdateStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _bulkDeleteCategories_decorators, { kind: "method", name: "bulkDeleteCategories", static: false, private: false, access: { has: obj => "bulkDeleteCategories" in obj, get: obj => obj.bulkDeleteCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateArticleCounts_decorators, { kind: "method", name: "updateArticleCounts", static: false, private: false, access: { has: obj => "updateArticleCounts" in obj, get: obj => obj.updateArticleCounts }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _initializeDefaultCategories_decorators, { kind: "method", name: "initializeDefaultCategories", static: false, private: false, access: { has: obj => "initializeDefaultCategories" in obj, get: obj => obj.initializeDefaultCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCategory_decorators, { kind: "method", name: "getCategory", static: false, private: false, access: { has: obj => "getCategory" in obj, get: obj => obj.getCategory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            KnowledgeBaseCategoryController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        categoryService = __runInitializers(this, _instanceExtraInitializers);
        constructor(categoryService) {
            this.categoryService = categoryService;
        }
        /**
         * Create new category
         */
        async createCategory(dto, user) {
            const category = await this.categoryService.createCategory(dto, user.id);
            return {
                success: true,
                data: category,
            };
        }
        /**
         * Get category tree structure
         */
        async getCategoryTree() {
            const tree = await this.categoryService.getCategoryTree();
            return {
                success: true,
                data: tree,
            };
        }
        /**
         * Get category statistics
         */
        async getCategoryStats() {
            const stats = await this.categoryService.getCategoryStats();
            return {
                success: true,
                data: stats,
            };
        }
        /**
         * Search categories
         */
        async searchCategories(query) {
            if (!query || query.trim().length < 2) {
                return {
                    success: false,
                    message: 'Search query must be at least 2 characters long',
                    data: [],
                };
            }
            const categories = await this.categoryService.searchCategories(query.trim());
            return {
                success: true,
                data: categories,
            };
        }
        /**
         * Get all categories
         */
        async getAllCategories() {
            const categories = await this.categoryService.getCategoriesWithCounts();
            return {
                success: true,
                data: categories,
            };
        }
        /**
         * Update category
         */
        async updateCategory(id, dto, user) {
            const category = await this.categoryService.updateCategory(id, dto, user.id);
            return {
                success: true,
                data: category,
            };
        }
        /**
         * Delete category
         */
        async deleteCategory(id) {
            await this.categoryService.deleteCategory(id);
            return {
                success: true,
                message: 'Category deleted successfully',
            };
        }
        /**
         * Get categories by parent
         */
        async getRootCategories() {
            const categories = await this.categoryService.getCategoriesByParent(undefined);
            return {
                success: true,
                data: categories,
            };
        }
        /**
         * Get categories by parent ID
         */
        async getCategoriesByParent(parentId) {
            const categories = await this.categoryService.getCategoriesByParent(parentId);
            return {
                success: true,
                data: categories,
            };
        }
        /**
         * Get category with full path
         */
        async getCategoryWithPath(id) {
            const categoryWithPath = await this.categoryService.getCategoryWithPath(id);
            return {
                success: true,
                data: categoryWithPath,
            };
        }
        /**
         * Get category descendants
         */
        async getCategoryDescendants(id) {
            const descendants = await this.categoryService.getCategoryDescendants(id);
            return {
                success: true,
                data: descendants,
            };
        }
        /**
         * Get category ancestors
         */
        async getCategoryAncestors(id) {
            const ancestors = await this.categoryService.getCategoryAncestors(id);
            return {
                success: true,
                data: ancestors,
            };
        }
        /**
         * Reorder categories
         */
        async reorderCategories(dto) {
            await this.categoryService.reorderCategories(dto.categoryIds);
            return {
                success: true,
                message: 'Categories reordered successfully',
            };
        }
        /**
         * Move category to new parent
         */
        async moveCategory(id, dto) {
            await this.categoryService.moveCategory(id, dto.newParentId);
            return {
                success: true,
                message: 'Category moved successfully',
            };
        }
        /**
         * Bulk update category status
         */
        async bulkUpdateStatus(dto) {
            await this.categoryService.bulkUpdateStatus(dto.categoryIds, dto.isActive);
            return {
                success: true,
                message: `${dto.categoryIds.length} categories updated successfully`,
            };
        }
        /**
         * Bulk delete categories
         */
        async bulkDeleteCategories(dto) {
            await this.categoryService.bulkDeleteCategories(dto.categoryIds);
            return {
                success: true,
                message: `${dto.categoryIds.length} categories deleted successfully`,
            };
        }
        /**
         * Update article counts
         */
        async updateArticleCounts() {
            await this.categoryService.updateArticleCounts();
            return {
                success: true,
                message: 'Article counts updated successfully',
            };
        }
        /**
         * Initialize default categories (for setup)
         */
        async initializeDefaultCategories(user) {
            const createdCategories = await this.categoryService.initializeDefaultCategories(user.id);
            return {
                success: true,
                data: createdCategories,
                message: `${createdCategories.length} default categories created`,
            };
        }
        /**
         * Get category by ID
         */
        async getCategory(id) {
            const category = await this.categoryService.getCategory(id);
            return {
                success: true,
                data: category,
            };
        }
    };
    return KnowledgeBaseCategoryController = _classThis;
})();
exports.KnowledgeBaseCategoryController = KnowledgeBaseCategoryController;
//# sourceMappingURL=knowledge-base-category.controller.js.map