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
exports.LearnedFaqController = exports.FaqSearchResult = exports.FaqFeedbackDto = exports.SearchFaqsDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const typeorm_1 = require("typeorm");
const learned_faq_entry_entity_1 = require("../entities/learned-faq-entry.entity");
class SearchFaqsDto {
    query;
    category;
    categories; // comma-separated
    limit;
    offset;
    sort_by;
    include_related;
}
exports.SearchFaqsDto = SearchFaqsDto;
class FaqFeedbackDto {
    feedbackType;
    rating; // 1-5 scale
    comment;
    suggestedAnswer;
    suggestedCategory;
    suggestedKeywords;
}
exports.FaqFeedbackDto = FaqFeedbackDto;
class FaqSearchResult {
    id;
    question;
    answer;
    category;
    keywords;
    usageCount;
    helpfulCount;
    notHelpfulCount;
    helpfulnessRatio;
    confidence;
    createdAt;
    relatedFaqs;
}
exports.FaqSearchResult = FaqSearchResult;
let LearnedFaqController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Learned FAQs (Public)'), (0, common_1.Controller)('faqs')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _searchFaqs_decorators;
    let _getCategories_decorators;
    let _getPopularFaqs_decorators;
    let _getRecentFaqs_decorators;
    let _getFaqById_decorators;
    let _submitFeedback_decorators;
    let _getRelatedFaqs_decorators;
    let _getFaqStats_decorators;
    var LearnedFaqController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _searchFaqs_decorators = [(0, common_1.Get)('search'), (0, swagger_1.ApiOperation)({ summary: 'Search published FAQs' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'FAQs retrieved successfully' }), (0, swagger_1.ApiQuery)({ name: 'query', required: false, description: 'Search query' }), (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Filter by category' }), (0, swagger_1.ApiQuery)({ name: 'categories', required: false, description: 'Filter by multiple categories (comma-separated)' }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Number of results (default: 20, max: 100)' }), (0, swagger_1.ApiQuery)({ name: 'offset', required: false, type: Number, description: 'Offset for pagination (default: 0)' }), (0, swagger_1.ApiQuery)({ name: 'sort_by', required: false, enum: ['relevance', 'popularity', 'recent', 'helpful'] }), (0, swagger_1.ApiQuery)({ name: 'include_related', required: false, type: Boolean, description: 'Include related FAQs' })];
            _getCategories_decorators = [(0, common_1.Get)('categories'), (0, swagger_1.ApiOperation)({ summary: 'Get available FAQ categories' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Categories retrieved successfully' })];
            _getPopularFaqs_decorators = [(0, common_1.Get)('popular'), (0, swagger_1.ApiOperation)({ summary: 'Get most popular FAQs' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Popular FAQs retrieved successfully' }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Number of results (default: 10, max: 50)' }), (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Filter by category' })];
            _getRecentFaqs_decorators = [(0, common_1.Get)('recent'), (0, swagger_1.ApiOperation)({ summary: 'Get recently added FAQs' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Recent FAQs retrieved successfully' }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Number of results (default: 10, max: 50)' }), (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Filter by category' })];
            _getFaqById_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get a specific FAQ by ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'FAQ retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'FAQ not found' })];
            _submitFeedback_decorators = [(0, common_1.Post)(':id/feedback'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Submit feedback for a FAQ' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Feedback submitted successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'FAQ not found' })];
            _getRelatedFaqs_decorators = [(0, common_1.Get)(':id/related'), (0, swagger_1.ApiOperation)({ summary: 'Get related FAQs for a specific FAQ' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Related FAQs retrieved successfully' }), (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Number of results (default: 5, max: 20)' })];
            _getFaqStats_decorators = [(0, common_1.Get)('stats/overview'), (0, swagger_1.ApiOperation)({ summary: 'Get public FAQ statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved successfully' })];
            __esDecorate(this, null, _searchFaqs_decorators, { kind: "method", name: "searchFaqs", static: false, private: false, access: { has: obj => "searchFaqs" in obj, get: obj => obj.searchFaqs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCategories_decorators, { kind: "method", name: "getCategories", static: false, private: false, access: { has: obj => "getCategories" in obj, get: obj => obj.getCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getPopularFaqs_decorators, { kind: "method", name: "getPopularFaqs", static: false, private: false, access: { has: obj => "getPopularFaqs" in obj, get: obj => obj.getPopularFaqs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getRecentFaqs_decorators, { kind: "method", name: "getRecentFaqs", static: false, private: false, access: { has: obj => "getRecentFaqs" in obj, get: obj => obj.getRecentFaqs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getFaqById_decorators, { kind: "method", name: "getFaqById", static: false, private: false, access: { has: obj => "getFaqById" in obj, get: obj => obj.getFaqById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _submitFeedback_decorators, { kind: "method", name: "submitFeedback", static: false, private: false, access: { has: obj => "submitFeedback" in obj, get: obj => obj.submitFeedback }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getRelatedFaqs_decorators, { kind: "method", name: "getRelatedFaqs", static: false, private: false, access: { has: obj => "getRelatedFaqs" in obj, get: obj => obj.getRelatedFaqs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getFaqStats_decorators, { kind: "method", name: "getFaqStats", static: false, private: false, access: { has: obj => "getFaqStats" in obj, get: obj => obj.getFaqStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LearnedFaqController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        faqRepository = __runInitializers(this, _instanceExtraInitializers);
        feedbackProcessor;
        logger = new common_1.Logger(LearnedFaqController.name);
        constructor(faqRepository, feedbackProcessor) {
            this.faqRepository = faqRepository;
            this.feedbackProcessor = feedbackProcessor;
        }
        async searchFaqs(dto) {
            try {
                const limit = Math.min(dto.limit || 20, 100);
                const offset = dto.offset || 0;
                const queryBuilder = this.faqRepository.createQueryBuilder('faq')
                    .where('faq.status = :status', { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED });
                // Text search
                if (dto.query) {
                    queryBuilder.andWhere('(faq.question ILIKE :query OR faq.answer ILIKE :query OR :query = ANY(faq.keywords))', { query: `%${dto.query}%` });
                }
                // Category filter
                if (dto.category) {
                    queryBuilder.andWhere('faq.category = :category', { category: dto.category });
                }
                else if (dto.categories) {
                    const categoryList = dto.categories.split(',').map(c => c.trim());
                    queryBuilder.andWhere('faq.category IN (:...categories)', { categories: categoryList });
                }
                // Sorting
                switch (dto.sort_by) {
                    case 'popularity':
                        queryBuilder.orderBy('faq.usageCount', 'DESC');
                        break;
                    case 'recent':
                        queryBuilder.orderBy('faq.createdAt', 'DESC');
                        break;
                    case 'helpful':
                        queryBuilder.orderBy('faq.helpfulCount', 'DESC');
                        break;
                    case 'relevance':
                    default:
                        // For relevance, we'd use full-text search scoring
                        // For now, order by confidence and usage
                        queryBuilder.orderBy('faq.confidence', 'DESC')
                            .addOrderBy('faq.usageCount', 'DESC');
                        break;
                }
                // Get total count
                const total = await queryBuilder.getCount();
                // Apply pagination
                const faqs = await queryBuilder
                    .skip(offset)
                    .take(limit)
                    .getMany();
                // Convert to search results
                const results = [];
                for (const faq of faqs) {
                    const result = {
                        id: faq.id,
                        question: faq.question,
                        answer: faq.answer,
                        category: faq.category,
                        keywords: faq.keywords,
                        usageCount: faq.usageCount,
                        helpfulCount: faq.helpfulCount,
                        notHelpfulCount: faq.notHelpfulCount,
                        helpfulnessRatio: faq.helpfulnessRatio,
                        confidence: faq.confidence,
                        createdAt: faq.createdAt
                    };
                    // Include related FAQs if requested
                    if (dto.include_related) {
                        result.relatedFaqs = await this.findRelatedFaqs(faq.id, faq.keywords, faq.category);
                    }
                    results.push(result);
                }
                return {
                    faqs: results,
                    total,
                    limit,
                    offset,
                    hasMore: offset + limit < total
                };
            }
            catch (error) {
                this.logger.error('Failed to search FAQs:', error);
                throw new common_1.HttpException(`Failed to search FAQs: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getCategories() {
            try {
                const categoryStats = await this.faqRepository
                    .createQueryBuilder('faq')
                    .select('faq.category', 'name')
                    .addSelect('COUNT(*)', 'count')
                    .where('faq.status = :status', { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED })
                    .andWhere('faq.category IS NOT NULL')
                    .groupBy('faq.category')
                    .orderBy('count', 'DESC')
                    .getRawMany();
                const categories = categoryStats.map(stat => ({
                    name: stat.name,
                    count: parseInt(stat.count),
                    description: `${stat.count} FAQs in ${stat.name} category`
                }));
                return { categories };
            }
            catch (error) {
                this.logger.error('Failed to get categories:', error);
                throw new common_1.HttpException(`Failed to get categories: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getPopularFaqs(limit = 10, category) {
            try {
                const queryLimit = Math.min(limit, 50);
                const queryBuilder = this.faqRepository.createQueryBuilder('faq')
                    .where('faq.status = :status', { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED });
                if (category) {
                    queryBuilder.andWhere('faq.category = :category', { category });
                }
                const faqs = await queryBuilder
                    .orderBy('faq.usageCount', 'DESC')
                    .addOrderBy('faq.helpfulCount', 'DESC')
                    .take(queryLimit)
                    .getMany();
                const results = faqs.map(faq => ({
                    id: faq.id,
                    question: faq.question,
                    answer: faq.answer,
                    category: faq.category,
                    keywords: faq.keywords,
                    usageCount: faq.usageCount,
                    helpfulCount: faq.helpfulCount,
                    notHelpfulCount: faq.notHelpfulCount,
                    helpfulnessRatio: faq.helpfulnessRatio,
                    confidence: faq.confidence,
                    createdAt: faq.createdAt
                }));
                return { faqs: results };
            }
            catch (error) {
                this.logger.error('Failed to get popular FAQs:', error);
                throw new common_1.HttpException(`Failed to get popular FAQs: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getRecentFaqs(limit = 10, category) {
            try {
                const queryLimit = Math.min(limit, 50);
                const queryBuilder = this.faqRepository.createQueryBuilder('faq')
                    .where('faq.status = :status', { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED });
                if (category) {
                    queryBuilder.andWhere('faq.category = :category', { category });
                }
                const faqs = await queryBuilder
                    .orderBy('faq.publishedAt', 'DESC')
                    .addOrderBy('faq.createdAt', 'DESC')
                    .take(queryLimit)
                    .getMany();
                const results = faqs.map(faq => ({
                    id: faq.id,
                    question: faq.question,
                    answer: faq.answer,
                    category: faq.category,
                    keywords: faq.keywords,
                    usageCount: faq.usageCount,
                    helpfulCount: faq.helpfulCount,
                    notHelpfulCount: faq.notHelpfulCount,
                    helpfulnessRatio: faq.helpfulnessRatio,
                    confidence: faq.confidence,
                    createdAt: faq.createdAt
                }));
                return { faqs: results };
            }
            catch (error) {
                this.logger.error('Failed to get recent FAQs:', error);
                throw new common_1.HttpException(`Failed to get recent FAQs: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getFaqById(id) {
            try {
                const faq = await this.faqRepository.findOne({
                    where: {
                        id,
                        status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED
                    }
                });
                if (!faq) {
                    throw new common_1.HttpException('FAQ not found', common_1.HttpStatus.NOT_FOUND);
                }
                // Increment usage count
                await this.faqRepository.update(id, {
                    usageCount: faq.usageCount + 1
                });
                // Get related FAQs
                const relatedFaqs = await this.findRelatedFaqs(faq.id, faq.keywords, faq.category);
                const result = {
                    id: faq.id,
                    question: faq.question,
                    answer: faq.answer,
                    category: faq.category,
                    keywords: faq.keywords,
                    usageCount: faq.usageCount + 1, // Include the increment
                    helpfulCount: faq.helpfulCount,
                    notHelpfulCount: faq.notHelpfulCount,
                    helpfulnessRatio: faq.helpfulnessRatio,
                    confidence: faq.confidence,
                    createdAt: faq.createdAt,
                    relatedFaqs
                };
                return { faq: result };
            }
            catch (error) {
                this.logger.error(`Failed to get FAQ ${id}:`, error);
                if (error.status === common_1.HttpStatus.NOT_FOUND) {
                    throw error;
                }
                throw new common_1.HttpException(`Failed to get FAQ: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async submitFeedback(faqId, dto, user) {
            try {
                // Verify FAQ exists and is published
                const faq = await this.faqRepository.findOne({
                    where: {
                        id: faqId,
                        status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED
                    }
                });
                if (!faq) {
                    throw new common_1.HttpException('FAQ not found', common_1.HttpStatus.NOT_FOUND);
                }
                // Prepare feedback data
                const feedbackData = {
                    faqId,
                    userId: user?.id,
                    feedbackType: dto.feedbackType,
                    rating: dto.rating,
                    comment: dto.comment,
                    suggestedAnswer: dto.suggestedAnswer,
                    suggestedCategory: dto.suggestedCategory,
                    suggestedKeywords: dto.suggestedKeywords,
                    context: {
                        userAgent: 'web', // This would come from request headers
                        sessionId: user?.sessionId
                    }
                };
                // Process feedback
                const result = await this.feedbackProcessor.processFeedback(feedbackData);
                if (result.processed) {
                    this.logger.log(`Feedback submitted for FAQ ${faqId} by user ${user?.id || 'anonymous'}`);
                    return {
                        success: true,
                        message: 'Feedback submitted successfully'
                    };
                }
                else {
                    throw new common_1.HttpException('Failed to process feedback', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            catch (error) {
                this.logger.error(`Failed to submit feedback for FAQ ${faqId}:`, error);
                if (error.status === common_1.HttpStatus.NOT_FOUND) {
                    throw error;
                }
                throw new common_1.HttpException(`Failed to submit feedback: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getRelatedFaqs(faqId, limit = 5) {
            try {
                const queryLimit = Math.min(limit, 20);
                // Get the source FAQ
                const sourceFaq = await this.faqRepository.findOne({
                    where: {
                        id: faqId,
                        status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED
                    }
                });
                if (!sourceFaq) {
                    throw new common_1.HttpException('FAQ not found', common_1.HttpStatus.NOT_FOUND);
                }
                const relatedFaqs = await this.findRelatedFaqs(sourceFaq.id, sourceFaq.keywords, sourceFaq.category, queryLimit);
                // Get full FAQ details for related FAQs
                const relatedIds = relatedFaqs.map(r => r.id);
                const fullRelatedFaqs = await this.faqRepository.find({
                    where: {
                        id: (0, typeorm_1.In)(relatedIds),
                        status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED
                    }
                });
                const results = relatedFaqs.map(related => {
                    const fullFaq = fullRelatedFaqs.find(f => f.id === related.id);
                    return {
                        id: related.id,
                        question: related.question,
                        answer: fullFaq?.answer || '',
                        category: fullFaq?.category,
                        similarity: related.similarity,
                        usageCount: fullFaq?.usageCount || 0
                    };
                });
                return { relatedFaqs: results };
            }
            catch (error) {
                this.logger.error(`Failed to get related FAQs for ${faqId}:`, error);
                if (error.status === common_1.HttpStatus.NOT_FOUND) {
                    throw error;
                }
                throw new common_1.HttpException(`Failed to get related FAQs: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async getFaqStats() {
            try {
                const totalFaqs = await this.faqRepository.count({
                    where: { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED }
                });
                const categoryStats = await this.faqRepository
                    .createQueryBuilder('faq')
                    .select('COUNT(DISTINCT faq.category)', 'totalCategories')
                    .addSelect('faq.category', 'mostPopular')
                    .addSelect('COUNT(*)', 'count')
                    .where('faq.status = :status', { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED })
                    .andWhere('faq.category IS NOT NULL')
                    .groupBy('faq.category')
                    .orderBy('count', 'DESC')
                    .getRawMany();
                const totalCategories = categoryStats.length;
                const mostPopularCategory = categoryStats[0]?.mostPopular || 'General';
                // Calculate average helpfulness
                const helpfulnessStats = await this.faqRepository
                    .createQueryBuilder('faq')
                    .select('AVG(CASE WHEN (faq.helpfulCount + faq.notHelpfulCount) > 0 THEN faq.helpfulCount::float / (faq.helpfulCount + faq.notHelpfulCount) ELSE 0 END)', 'avgHelpfulness')
                    .where('faq.status = :status', { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED })
                    .getRawOne();
                const averageHelpfulness = Math.round((parseFloat(helpfulnessStats.avgHelpfulness) || 0) * 100);
                // Recently added (last 30 days)
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                const recentlyAdded = await this.faqRepository.count({
                    where: {
                        status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED,
                        publishedAt: (0, typeorm_1.MoreThanOrEqual)(thirtyDaysAgo)
                    }
                });
                return {
                    totalFaqs,
                    totalCategories,
                    mostPopularCategory,
                    averageHelpfulness,
                    recentlyAdded
                };
            }
            catch (error) {
                this.logger.error('Failed to get FAQ stats:', error);
                throw new common_1.HttpException(`Failed to get FAQ stats: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        async findRelatedFaqs(faqId, keywords, category, limit = 5) {
            try {
                const queryBuilder = this.faqRepository.createQueryBuilder('faq')
                    .where('faq.status = :status', { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED })
                    .andWhere('faq.id != :faqId', { faqId });
                // Prefer same category
                if (category) {
                    queryBuilder.andWhere('faq.category = :category', { category });
                }
                // Find FAQs with overlapping keywords
                if (keywords && keywords.length > 0) {
                    queryBuilder.andWhere('faq.keywords && :keywords', { keywords });
                }
                const relatedFaqs = await queryBuilder
                    .orderBy('faq.usageCount', 'DESC')
                    .addOrderBy('faq.helpfulCount', 'DESC')
                    .take(limit)
                    .getMany();
                // Calculate simple similarity based on keyword overlap
                return relatedFaqs.map(faq => {
                    const overlap = faq.keywords.filter(k => keywords.includes(k)).length;
                    const similarity = keywords.length > 0 ? overlap / keywords.length : 0;
                    return {
                        id: faq.id,
                        question: faq.question,
                        similarity: Math.round(similarity * 100) / 100
                    };
                }).sort((a, b) => b.similarity - a.similarity);
            }
            catch (error) {
                this.logger.warn('Failed to find related FAQs:', error);
                return [];
            }
        }
    };
    return LearnedFaqController = _classThis;
})();
exports.LearnedFaqController = LearnedFaqController;
//# sourceMappingURL=learned-faq.controller.js.map