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
exports.KnowledgeBaseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const public_decorator_1 = require("../../../auth/decorators/public.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
/**
 * Knowledge Base Controller
 * Manages self-service help articles
 */
let KnowledgeBaseController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Knowledge Base'), (0, common_1.Controller)('knowledge-base')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createArticle_decorators;
    let _updateArticle_decorators;
    let _deleteArticle_decorators;
    let _getArticle_decorators;
    let _getArticleBySlug_decorators;
    let _searchArticles_decorators;
    let _getFeaturedArticles_decorators;
    let _getPopularArticles_decorators;
    let _getRelatedArticles_decorators;
    let _markHelpful_decorators;
    let _getStatistics_decorators;
    var KnowledgeBaseController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createArticle_decorators = [(0, common_1.Post)('articles'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Create a new knowledge base article' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Article created successfully' })];
            _updateArticle_decorators = [(0, common_1.Patch)('articles/:id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Update a knowledge base article' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Article updated successfully' })];
            _deleteArticle_decorators = [(0, common_1.Delete)('articles/:id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Delete a knowledge base article' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Article deleted successfully' })];
            _getArticle_decorators = [(0, common_1.Get)('articles/:id'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Get article by ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Article retrieved successfully' })];
            _getArticleBySlug_decorators = [(0, common_1.Get)('articles/slug/:slug'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Get article by slug' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Article retrieved successfully' })];
            _searchArticles_decorators = [(0, common_1.Get)('search'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Search knowledge base articles' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Search results retrieved' })];
            _getFeaturedArticles_decorators = [(0, common_1.Get)('featured'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Get featured articles' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Featured articles retrieved' })];
            _getPopularArticles_decorators = [(0, common_1.Get)('popular'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Get popular articles' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Popular articles retrieved' })];
            _getRelatedArticles_decorators = [(0, common_1.Get)('articles/:id/related'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Get related articles' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Related articles retrieved' })];
            _markHelpful_decorators = [(0, common_1.Post)('articles/:id/feedback'), (0, public_decorator_1.Public)(), (0, swagger_1.ApiOperation)({ summary: 'Provide feedback on article helpfulness' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Feedback recorded' })];
            _getStatistics_decorators = [(0, common_1.Get)('stats/overview'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get knowledge base statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved' })];
            __esDecorate(this, null, _createArticle_decorators, { kind: "method", name: "createArticle", static: false, private: false, access: { has: obj => "createArticle" in obj, get: obj => obj.createArticle }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateArticle_decorators, { kind: "method", name: "updateArticle", static: false, private: false, access: { has: obj => "updateArticle" in obj, get: obj => obj.updateArticle }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteArticle_decorators, { kind: "method", name: "deleteArticle", static: false, private: false, access: { has: obj => "deleteArticle" in obj, get: obj => obj.deleteArticle }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getArticle_decorators, { kind: "method", name: "getArticle", static: false, private: false, access: { has: obj => "getArticle" in obj, get: obj => obj.getArticle }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getArticleBySlug_decorators, { kind: "method", name: "getArticleBySlug", static: false, private: false, access: { has: obj => "getArticleBySlug" in obj, get: obj => obj.getArticleBySlug }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _searchArticles_decorators, { kind: "method", name: "searchArticles", static: false, private: false, access: { has: obj => "searchArticles" in obj, get: obj => obj.searchArticles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getFeaturedArticles_decorators, { kind: "method", name: "getFeaturedArticles", static: false, private: false, access: { has: obj => "getFeaturedArticles" in obj, get: obj => obj.getFeaturedArticles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getPopularArticles_decorators, { kind: "method", name: "getPopularArticles", static: false, private: false, access: { has: obj => "getPopularArticles" in obj, get: obj => obj.getPopularArticles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getRelatedArticles_decorators, { kind: "method", name: "getRelatedArticles", static: false, private: false, access: { has: obj => "getRelatedArticles" in obj, get: obj => obj.getRelatedArticles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _markHelpful_decorators, { kind: "method", name: "markHelpful", static: false, private: false, access: { has: obj => "markHelpful" in obj, get: obj => obj.markHelpful }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStatistics_decorators, { kind: "method", name: "getStatistics", static: false, private: false, access: { has: obj => "getStatistics" in obj, get: obj => obj.getStatistics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            KnowledgeBaseController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        knowledgeBaseService = __runInitializers(this, _instanceExtraInitializers);
        constructor(knowledgeBaseService) {
            this.knowledgeBaseService = knowledgeBaseService;
        }
        /**
         * Create a new article (ADMIN/EDITOR only)
         */
        async createArticle(dto, authorId) {
            return await this.knowledgeBaseService.createArticle(authorId, dto);
        }
        /**
         * Update an article (ADMIN/EDITOR only)
         */
        async updateArticle(id, dto) {
            return await this.knowledgeBaseService.updateArticle(id, dto);
        }
        /**
         * Delete an article (ADMIN only)
         */
        async deleteArticle(id) {
            await this.knowledgeBaseService.deleteArticle(id);
            return { message: 'Article deleted successfully' };
        }
        /**
         * Get article by ID (Public for published, auth for draft)
         */
        async getArticle(id) {
            return await this.knowledgeBaseService.getArticle(id);
        }
        /**
         * Get article by slug (Public)
         */
        async getArticleBySlug(slug) {
            return await this.knowledgeBaseService.getArticleBySlug(slug);
        }
        /**
         * Search articles (Public)
         */
        async searchArticles(filters) {
            return await this.knowledgeBaseService.searchArticles(filters);
        }
        /**
         * Get featured articles (Public)
         */
        async getFeaturedArticles(limit) {
            return await this.knowledgeBaseService.getFeaturedArticles(limit ? parseInt(limit, 10) : 5);
        }
        /**
         * Get popular articles (Public)
         */
        async getPopularArticles(limit) {
            return await this.knowledgeBaseService.getPopularArticles(limit ? parseInt(limit, 10) : 10);
        }
        /**
         * Get related articles (Public)
         */
        async getRelatedArticles(id, limit) {
            return await this.knowledgeBaseService.getRelatedArticles(id, limit ? parseInt(limit, 10) : 5);
        }
        /**
         * Mark article as helpful/not helpful (Public)
         */
        async markHelpful(id, body) {
            return await this.knowledgeBaseService.markHelpful(id, body.isHelpful);
        }
        /**
         * Get knowledge base statistics (ADMIN/EDITOR only)
         */
        async getStatistics() {
            return await this.knowledgeBaseService.getStatistics();
        }
    };
    return KnowledgeBaseController = _classThis;
})();
exports.KnowledgeBaseController = KnowledgeBaseController;
//# sourceMappingURL=knowledge-base.controller.js.map