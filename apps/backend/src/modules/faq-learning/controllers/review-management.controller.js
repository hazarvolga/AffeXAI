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
exports.ReviewManagementController = exports.BulkReviewDto = exports.ReviewDecisionDto = exports.ReviewQueueQueryDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let ReviewQueueQueryDto = (() => {
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _confidence_min_decorators;
    let _confidence_min_initializers = [];
    let _confidence_min_extraInitializers = [];
    let _confidence_max_decorators;
    let _confidence_max_initializers = [];
    let _confidence_max_extraInitializers = [];
    let _source_decorators;
    let _source_initializers = [];
    let _source_extraInitializers = [];
    let _category_decorators;
    let _category_initializers = [];
    let _category_extraInitializers = [];
    let _date_from_decorators;
    let _date_from_initializers = [];
    let _date_from_extraInitializers = [];
    let _date_to_decorators;
    let _date_to_initializers = [];
    let _date_to_extraInitializers = [];
    let _reviewed_by_decorators;
    let _reviewed_by_initializers = [];
    let _reviewed_by_extraInitializers = [];
    let _created_by_decorators;
    let _created_by_initializers = [];
    let _created_by_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    let _sort_by_decorators;
    let _sort_by_initializers = [];
    let _sort_by_extraInitializers = [];
    let _sort_order_decorators;
    let _sort_order_initializers = [];
    let _sort_order_extraInitializers = [];
    return class ReviewQueueQueryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _confidence_min_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(() => Number)];
            _confidence_max_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(() => Number)];
            _source_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _category_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _date_from_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _date_to_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _reviewed_by_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _created_by_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(() => Number)];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(() => Number)];
            _sort_by_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['createdAt', 'confidence', 'usageCount', 'helpfulCount'])];
            _sort_order_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['ASC', 'DESC'])];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _confidence_min_decorators, { kind: "field", name: "confidence_min", static: false, private: false, access: { has: obj => "confidence_min" in obj, get: obj => obj.confidence_min, set: (obj, value) => { obj.confidence_min = value; } }, metadata: _metadata }, _confidence_min_initializers, _confidence_min_extraInitializers);
            __esDecorate(null, null, _confidence_max_decorators, { kind: "field", name: "confidence_max", static: false, private: false, access: { has: obj => "confidence_max" in obj, get: obj => obj.confidence_max, set: (obj, value) => { obj.confidence_max = value; } }, metadata: _metadata }, _confidence_max_initializers, _confidence_max_extraInitializers);
            __esDecorate(null, null, _source_decorators, { kind: "field", name: "source", static: false, private: false, access: { has: obj => "source" in obj, get: obj => obj.source, set: (obj, value) => { obj.source = value; } }, metadata: _metadata }, _source_initializers, _source_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: obj => "category" in obj, get: obj => obj.category, set: (obj, value) => { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _date_from_decorators, { kind: "field", name: "date_from", static: false, private: false, access: { has: obj => "date_from" in obj, get: obj => obj.date_from, set: (obj, value) => { obj.date_from = value; } }, metadata: _metadata }, _date_from_initializers, _date_from_extraInitializers);
            __esDecorate(null, null, _date_to_decorators, { kind: "field", name: "date_to", static: false, private: false, access: { has: obj => "date_to" in obj, get: obj => obj.date_to, set: (obj, value) => { obj.date_to = value; } }, metadata: _metadata }, _date_to_initializers, _date_to_extraInitializers);
            __esDecorate(null, null, _reviewed_by_decorators, { kind: "field", name: "reviewed_by", static: false, private: false, access: { has: obj => "reviewed_by" in obj, get: obj => obj.reviewed_by, set: (obj, value) => { obj.reviewed_by = value; } }, metadata: _metadata }, _reviewed_by_initializers, _reviewed_by_extraInitializers);
            __esDecorate(null, null, _created_by_decorators, { kind: "field", name: "created_by", static: false, private: false, access: { has: obj => "created_by" in obj, get: obj => obj.created_by, set: (obj, value) => { obj.created_by = value; } }, metadata: _metadata }, _created_by_initializers, _created_by_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _sort_by_decorators, { kind: "field", name: "sort_by", static: false, private: false, access: { has: obj => "sort_by" in obj, get: obj => obj.sort_by, set: (obj, value) => { obj.sort_by = value; } }, metadata: _metadata }, _sort_by_initializers, _sort_by_extraInitializers);
            __esDecorate(null, null, _sort_order_decorators, { kind: "field", name: "sort_order", static: false, private: false, access: { has: obj => "sort_order" in obj, get: obj => obj.sort_order, set: (obj, value) => { obj.sort_order = value; } }, metadata: _metadata }, _sort_order_initializers, _sort_order_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        status = __runInitializers(this, _status_initializers, void 0); // comma-separated values
        confidence_min = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _confidence_min_initializers, void 0));
        confidence_max = (__runInitializers(this, _confidence_min_extraInitializers), __runInitializers(this, _confidence_max_initializers, void 0));
        source = (__runInitializers(this, _confidence_max_extraInitializers), __runInitializers(this, _source_initializers, void 0)); // comma-separated values
        category = (__runInitializers(this, _source_extraInitializers), __runInitializers(this, _category_initializers, void 0)); // comma-separated values
        date_from = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _date_from_initializers, void 0));
        date_to = (__runInitializers(this, _date_from_extraInitializers), __runInitializers(this, _date_to_initializers, void 0));
        reviewed_by = (__runInitializers(this, _date_to_extraInitializers), __runInitializers(this, _reviewed_by_initializers, void 0));
        created_by = (__runInitializers(this, _reviewed_by_extraInitializers), __runInitializers(this, _created_by_initializers, void 0));
        page = (__runInitializers(this, _created_by_extraInitializers), __runInitializers(this, _page_initializers, void 0));
        limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
        sort_by = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _sort_by_initializers, void 0));
        sort_order = (__runInitializers(this, _sort_by_extraInitializers), __runInitializers(this, _sort_order_initializers, void 0));
        constructor() {
            __runInitializers(this, _sort_order_extraInitializers);
        }
    };
})();
exports.ReviewQueueQueryDto = ReviewQueueQueryDto;
class ReviewDecisionDto {
    action;
    reason;
    editedAnswer;
    editedCategory;
    editedKeywords;
}
exports.ReviewDecisionDto = ReviewDecisionDto;
class BulkReviewDto {
    faqIds;
    action;
    reason;
}
exports.BulkReviewDto = BulkReviewDto;
let ReviewManagementController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Review Management'), (0, common_1.Controller)('review'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getReviewQueue_decorators;
    let _getReviewStats_decorators;
    let _reviewFaq_decorators;
    let _bulkReview_decorators;
    let _getReviewHistory_decorators;
    let _autoPublishHighConfidenceFaqs_decorators;
    let _getAvailableCategories_decorators;
    let _getReviewers_decorators;
    let _getReviewAnalytics_decorators;
    let _setReviewPriority_decorators;
    let _assignReviewer_decorators;
    var ReviewManagementController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getReviewQueue_decorators = [(0, common_1.Get)('queue'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.SUPPORT_AGENT), (0, swagger_1.ApiOperation)({ summary: 'Get review queue with filters' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Review queue retrieved successfully' }), (0, swagger_1.ApiQuery)({ name: 'status', required: false, description: 'Comma-separated status values' }), (0, swagger_1.ApiQuery)({ name: 'confidence_min', required: false, type: Number }), (0, swagger_1.ApiQuery)({ name: 'confidence_max', required: false, type: Number }), (0, swagger_1.ApiQuery)({ name: 'source', required: false, description: 'Comma-separated source values (chat,ticket)' }), (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Comma-separated category values' }), (0, swagger_1.ApiQuery)({ name: 'date_from', required: false, description: 'ISO date string' }), (0, swagger_1.ApiQuery)({ name: 'date_to', required: false, description: 'ISO date string' }), (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 20)' }), (0, swagger_1.ApiQuery)({ name: 'sort_by', required: false, enum: ['createdAt', 'confidence', 'usageCount', 'helpfulCount'] }), (0, swagger_1.ApiQuery)({ name: 'sort_order', required: false, enum: ['ASC', 'DESC'] })];
            _getReviewStats_decorators = [(0, common_1.Get)('stats'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER), (0, swagger_1.ApiOperation)({ summary: 'Get review queue statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Review statistics retrieved successfully' })];
            _reviewFaq_decorators = [(0, common_1.Post)(':faqId/review'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.SUPPORT_AGENT), (0, swagger_1.ApiOperation)({ summary: 'Review a single FAQ entry' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'FAQ reviewed successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'FAQ not found' })];
            _bulkReview_decorators = [(0, common_1.Post)('bulk-review'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER), (0, swagger_1.ApiOperation)({ summary: 'Bulk review multiple FAQ entries' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Bulk review completed' })];
            _getReviewHistory_decorators = [(0, common_1.Get)(':faqId/history'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.SUPPORT_AGENT), (0, swagger_1.ApiOperation)({ summary: 'Get review history for a FAQ' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Review history retrieved successfully' })];
            _autoPublishHighConfidenceFaqs_decorators = [(0, common_1.Post)('auto-publish'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER), (0, swagger_1.ApiOperation)({ summary: 'Auto-publish high confidence FAQs' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Auto-publish completed' })];
            _getAvailableCategories_decorators = [(0, common_1.Get)('categories'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER, user_role_enum_1.UserRole.SUPPORT_AGENT), (0, swagger_1.ApiOperation)({ summary: 'Get available FAQ categories for filtering' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Categories retrieved successfully' })];
            _getReviewers_decorators = [(0, common_1.Get)('reviewers'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER), (0, swagger_1.ApiOperation)({ summary: 'Get list of reviewers for filtering' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Reviewers retrieved successfully' })];
            _getReviewAnalytics_decorators = [(0, common_1.Get)('analytics'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER), (0, swagger_1.ApiOperation)({ summary: 'Get review analytics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Analytics retrieved successfully' }), (0, swagger_1.ApiQuery)({ name: 'period', required: false, enum: ['day', 'week', 'month', 'year'] })];
            _setReviewPriority_decorators = [(0, common_1.Put)(':faqId/priority'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER), (0, swagger_1.ApiOperation)({ summary: 'Set review priority for a FAQ' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Priority updated successfully' })];
            _assignReviewer_decorators = [(0, common_1.Post)(':faqId/assign'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER), (0, swagger_1.ApiOperation)({ summary: 'Assign FAQ to a specific reviewer' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'FAQ assigned successfully' })];
            __esDecorate(this, null, _getReviewQueue_decorators, { kind: "method", name: "getReviewQueue", static: false, private: false, access: { has: obj => "getReviewQueue" in obj, get: obj => obj.getReviewQueue }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getReviewStats_decorators, { kind: "method", name: "getReviewStats", static: false, private: false, access: { has: obj => "getReviewStats" in obj, get: obj => obj.getReviewStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _reviewFaq_decorators, { kind: "method", name: "reviewFaq", static: false, private: false, access: { has: obj => "reviewFaq" in obj, get: obj => obj.reviewFaq }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _bulkReview_decorators, { kind: "method", name: "bulkReview", static: false, private: false, access: { has: obj => "bulkReview" in obj, get: obj => obj.bulkReview }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getReviewHistory_decorators, { kind: "method", name: "getReviewHistory", static: false, private: false, access: { has: obj => "getReviewHistory" in obj, get: obj => obj.getReviewHistory }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _autoPublishHighConfidenceFaqs_decorators, { kind: "method", name: "autoPublishHighConfidenceFaqs", static: false, private: false, access: { has: obj => "autoPublishHighConfidenceFaqs" in obj, get: obj => obj.autoPublishHighConfidenceFaqs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAvailableCategories_decorators, { kind: "method", name: "getAvailableCategories", static: false, private: false, access: { has: obj => "getAvailableCategories" in obj, get: obj => obj.getAvailableCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getReviewers_decorators, { kind: "method", name: "getReviewers", static: false, private: false, access: { has: obj => "getReviewers" in obj, get: obj => obj.getReviewers }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getReviewAnalytics_decorators, { kind: "method", name: "getReviewAnalytics", static: false, private: false, access: { has: obj => "getReviewAnalytics" in obj, get: obj => obj.getReviewAnalytics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _setReviewPriority_decorators, { kind: "method", name: "setReviewPriority", static: false, private: false, access: { has: obj => "setReviewPriority" in obj, get: obj => obj.setReviewPriority }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _assignReviewer_decorators, { kind: "method", name: "assignReviewer", static: false, private: false, access: { has: obj => "assignReviewer" in obj, get: obj => obj.assignReviewer }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ReviewManagementController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        reviewQueueService = __runInitializers(this, _instanceExtraInitializers);
        logger = new common_1.Logger(ReviewManagementController.name);
        constructor(reviewQueueService) {
            this.reviewQueueService = reviewQueueService;
        }
        async getReviewQueue(query) {
            try {
                this.logger.log('📋 Review queue request received with query:', JSON.stringify(query));
                const filters = {};
                // Parse status filter
                if (query.status) {
                    const statusValues = query.status.split(',').map(s => s.trim());
                    filters.status = statusValues;
                }
                // Parse confidence range
                if (query.confidence_min !== undefined || query.confidence_max !== undefined) {
                    filters.confidence = {
                        min: query.confidence_min,
                        max: query.confidence_max
                    };
                }
                // Parse source filter
                if (query.source) {
                    const sourceValues = query.source.split(',').map(s => s.trim());
                    filters.source = sourceValues;
                }
                // Parse category filter
                if (query.category) {
                    filters.category = query.category.split(',').map(c => c.trim());
                }
                // Parse date range
                if (query.date_from && query.date_to) {
                    filters.dateRange = {
                        from: new Date(query.date_from),
                        to: new Date(query.date_to)
                    };
                }
                else if (query.date_from) {
                    filters.dateRange = {
                        from: new Date(query.date_from),
                        to: new Date()
                    };
                }
                else if (query.date_to) {
                    filters.dateRange = {
                        from: new Date(0),
                        to: new Date(query.date_to)
                    };
                }
                // Other filters
                if (query.reviewed_by)
                    filters.reviewedBy = query.reviewed_by;
                if (query.created_by)
                    filters.createdBy = query.created_by;
                if (query.page)
                    filters.page = query.page;
                if (query.limit)
                    filters.limit = query.limit;
                if (query.sort_by)
                    filters.sortBy = query.sort_by;
                if (query.sort_order)
                    filters.sortOrder = query.sort_order;
                this.logger.log('📋 Parsed filters:', JSON.stringify(filters));
                const result = await this.reviewQueueService.getReviewQueue(filters);
                this.logger.log(`📋 Returning ${result.items.length} items, page ${result.page}/${result.totalPages}`);
                return result;
            }
            catch (error) {
                this.logger.error('Failed to get review queue:', error);
                throw new common_1.HttpException(`Failed to get review queue: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getReviewStats() {
            try {
                return await this.reviewQueueService.getReviewStats();
            }
            catch (error) {
                this.logger.error('Failed to get review stats:', error);
                throw new common_1.HttpException(`Failed to get review stats: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async reviewFaq(faqId, dto, user) {
            try {
                const decision = {
                    faqId,
                    action: dto.action,
                    reviewerId: user.id,
                    reason: dto.reason,
                    editedAnswer: dto.editedAnswer,
                    editedCategory: dto.editedCategory,
                    editedKeywords: dto.editedKeywords
                };
                const reviewedFaq = await this.reviewQueueService.reviewFaq(decision);
                this.logger.log(`FAQ ${faqId} ${dto.action}ed by user ${user.id}`);
                return {
                    success: true,
                    message: `FAQ successfully ${dto.action}ed`,
                    faq: {
                        id: reviewedFaq.id,
                        status: reviewedFaq.status,
                        reviewedAt: reviewedFaq.reviewedAt,
                        reviewedBy: reviewedFaq.reviewedBy
                    }
                };
            }
            catch (error) {
                this.logger.error(`Failed to review FAQ ${faqId}:`, error);
                if (error.message.includes('not found')) {
                    throw new common_1.HttpException('FAQ not found', common_1.HttpStatus.NOT_FOUND);
                }
                throw new common_1.HttpException(`Failed to review FAQ: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async bulkReview(dto, user) {
            try {
                if (!dto.faqIds || dto.faqIds.length === 0) {
                    throw new common_1.HttpException('No FAQ IDs provided', common_1.HttpStatus.BAD_REQUEST);
                }
                if (dto.faqIds.length > 100) {
                    throw new common_1.HttpException('Maximum 100 FAQs can be reviewed at once', common_1.HttpStatus.BAD_REQUEST);
                }
                const request = {
                    faqIds: dto.faqIds,
                    action: dto.action,
                    reviewerId: user.id,
                    reason: dto.reason
                };
                const results = await this.reviewQueueService.bulkReview(request);
                this.logger.log(`Bulk review completed: ${results.successful.length} successful, ${results.failed.length} failed`);
                return {
                    success: true,
                    message: `Bulk review completed: ${results.successful.length}/${dto.faqIds.length} successful`,
                    results
                };
            }
            catch (error) {
                this.logger.error('Failed to perform bulk review:', error);
                throw new common_1.HttpException(`Failed to perform bulk review: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getReviewHistory(faqId) {
            try {
                const history = await this.reviewQueueService.getReviewHistory(faqId);
                return {
                    faqId,
                    history
                };
            }
            catch (error) {
                this.logger.error(`Failed to get review history for FAQ ${faqId}:`, error);
                if (error.message.includes('not found')) {
                    throw new common_1.HttpException('FAQ not found', common_1.HttpStatus.NOT_FOUND);
                }
                throw new common_1.HttpException(`Failed to get review history: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async autoPublishHighConfidenceFaqs() {
            try {
                const publishedCount = await this.reviewQueueService.autoPublishHighConfidenceFaqs();
                return {
                    success: true,
                    message: `Auto-published ${publishedCount} high-confidence FAQs`,
                    publishedCount
                };
            }
            catch (error) {
                this.logger.error('Failed to auto-publish FAQs:', error);
                throw new common_1.HttpException(`Failed to auto-publish FAQs: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getAvailableCategories() {
            try {
                // This would be implemented to get unique categories from FAQs
                // For now, returning empty structure
                return {
                    categories: []
                };
            }
            catch (error) {
                this.logger.error('Failed to get available categories:', error);
                throw new common_1.HttpException(`Failed to get available categories: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getReviewers() {
            try {
                // This would be implemented to get users with reviewer roles
                // For now, returning empty structure
                return {
                    reviewers: []
                };
            }
            catch (error) {
                this.logger.error('Failed to get reviewers:', error);
                throw new common_1.HttpException(`Failed to get reviewers: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getReviewAnalytics(period = 'week') {
            try {
                // This would be implemented with proper analytics queries
                // For now, returning mock structure
                return {
                    period,
                    totalReviews: 0,
                    approvalRate: 0,
                    rejectionRate: 0,
                    averageReviewTime: 0,
                    topReviewers: [],
                    reviewTrends: []
                };
            }
            catch (error) {
                this.logger.error('Failed to get review analytics:', error);
                throw new common_1.HttpException(`Failed to get review analytics: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async setReviewPriority(faqId, body) {
            try {
                // This would be implemented to update FAQ priority in metadata
                // For now, just logging
                this.logger.log(`FAQ ${faqId} priority set to ${body.priority}`);
                return {
                    success: true,
                    message: `Priority set to ${body.priority}`
                };
            }
            catch (error) {
                this.logger.error(`Failed to set priority for FAQ ${faqId}:`, error);
                throw new common_1.HttpException(`Failed to set priority: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async assignReviewer(faqId, body) {
            try {
                // This would be implemented to assign FAQ to a reviewer
                // For now, just logging
                this.logger.log(`FAQ ${faqId} assigned to reviewer ${body.reviewerId}`);
                return {
                    success: true,
                    message: 'FAQ assigned successfully'
                };
            }
            catch (error) {
                this.logger.error(`Failed to assign FAQ ${faqId}:`, error);
                throw new common_1.HttpException(`Failed to assign FAQ: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    };
    return ReviewManagementController = _classThis;
})();
exports.ReviewManagementController = ReviewManagementController;
//# sourceMappingURL=review-management.controller.js.map