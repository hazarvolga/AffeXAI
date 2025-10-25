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
exports.ReviewQueueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const learned_faq_entry_entity_1 = require("../entities/learned-faq-entry.entity");
let ReviewQueueService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ReviewQueueService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ReviewQueueService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        faqRepository;
        configRepository;
        userRepository;
        logger = new common_1.Logger(ReviewQueueService.name);
        constructor(faqRepository, configRepository, userRepository) {
            this.faqRepository = faqRepository;
            this.configRepository = configRepository;
            this.userRepository = userRepository;
        }
        async getReviewQueue(filters = {}) {
            const { status = [learned_faq_entry_entity_1.FaqEntryStatus.PENDING_REVIEW], confidence, source, category, dateRange, reviewedBy, createdBy, page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'DESC' } = filters;
            try {
                const queryBuilder = this.faqRepository.createQueryBuilder('faq')
                    .leftJoinAndSelect('faq.creator', 'creator')
                    .leftJoinAndSelect('faq.reviewer', 'reviewer');
                // Apply filters
                if (status.length > 0) {
                    queryBuilder.andWhere('faq.status IN (:...status)', { status });
                }
                if (confidence) {
                    if (confidence.min !== undefined) {
                        queryBuilder.andWhere('faq.confidence >= :minConfidence', { minConfidence: confidence.min });
                    }
                    if (confidence.max !== undefined) {
                        queryBuilder.andWhere('faq.confidence <= :maxConfidence', { maxConfidence: confidence.max });
                    }
                }
                if (source && source.length > 0) {
                    queryBuilder.andWhere('faq.source IN (:...source)', { source });
                }
                if (category && category.length > 0) {
                    queryBuilder.andWhere('faq.category IN (:...category)', { category });
                }
                if (dateRange) {
                    queryBuilder.andWhere('faq.createdAt BETWEEN :fromDate AND :toDate', {
                        fromDate: dateRange.from,
                        toDate: dateRange.to
                    });
                }
                if (reviewedBy) {
                    queryBuilder.andWhere('faq.reviewedBy = :reviewedBy', { reviewedBy });
                }
                if (createdBy) {
                    queryBuilder.andWhere('faq.createdBy = :createdBy', { createdBy });
                }
                // Apply sorting
                queryBuilder.orderBy(`faq.${sortBy}`, sortOrder);
                // Apply pagination
                const offset = (page - 1) * limit;
                queryBuilder.skip(offset).take(limit);
                const [faqs, total] = await queryBuilder.getManyAndCount();
                const items = faqs.map(faq => ({
                    id: faq.id,
                    question: faq.question,
                    answer: faq.answer,
                    confidence: faq.confidence,
                    status: faq.status,
                    source: faq.source,
                    sourceId: faq.sourceId,
                    category: faq.category,
                    keywords: faq.keywords,
                    usageCount: faq.usageCount,
                    helpfulCount: faq.helpfulCount,
                    notHelpfulCount: faq.notHelpfulCount,
                    createdAt: faq.createdAt,
                    metadata: faq.metadata,
                    creator: faq.creator ? {
                        id: faq.creator.id,
                        firstName: faq.creator.firstName,
                        lastName: faq.creator.lastName,
                        email: faq.creator.email
                    } : undefined,
                    reviewer: faq.reviewer ? {
                        id: faq.reviewer.id,
                        firstName: faq.reviewer.firstName,
                        lastName: faq.reviewer.lastName,
                        email: faq.reviewer.email
                    } : undefined,
                    reviewedAt: faq.reviewedAt
                }));
                const totalPages = Math.ceil(total / limit);
                return {
                    items,
                    total,
                    page,
                    limit,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                };
            }
            catch (error) {
                this.logger.error('Failed to get review queue:', error);
                throw new Error(`Failed to get review queue: ${error.message}`);
            }
        }
        async reviewFaq(decision) {
            const { faqId, action, reviewerId, reason, editedAnswer, editedCategory, editedKeywords } = decision;
            try {
                const faq = await this.faqRepository.findOne({
                    where: { id: faqId },
                    relations: ['creator', 'reviewer']
                });
                if (!faq) {
                    throw new common_1.NotFoundException(`FAQ with ID ${faqId} not found`);
                }
                const reviewer = await this.userRepository.findOne({
                    where: { id: reviewerId }
                });
                if (!reviewer) {
                    throw new common_1.NotFoundException(`Reviewer with ID ${reviewerId} not found`);
                }
                // Update FAQ based on action
                switch (action) {
                    case 'approve':
                        faq.status = learned_faq_entry_entity_1.FaqEntryStatus.APPROVED;
                        break;
                    case 'publish':
                        faq.status = learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED;
                        faq.publishedAt = new Date();
                        break;
                    case 'reject':
                        faq.status = learned_faq_entry_entity_1.FaqEntryStatus.REJECTED;
                        break;
                    case 'edit':
                        if (editedAnswer)
                            faq.answer = editedAnswer;
                        if (editedCategory)
                            faq.category = editedCategory;
                        if (editedKeywords)
                            faq.keywords = editedKeywords;
                        faq.status = learned_faq_entry_entity_1.FaqEntryStatus.APPROVED; // Edited FAQs are approved
                        break;
                    default:
                        throw new common_1.BadRequestException(`Invalid action: ${action}`);
                }
                // Set review metadata
                faq.reviewedBy = reviewerId;
                faq.reviewedAt = new Date();
                faq.reviewer = reviewer;
                // Add review reason to metadata
                if (reason) {
                    faq.metadata = {
                        ...faq.metadata,
                        reviewReason: reason,
                        reviewAction: action,
                        reviewedAt: new Date()
                    };
                }
                const savedFaq = await this.faqRepository.save(faq);
                this.logger.log(`FAQ ${faqId} ${action}ed by reviewer ${reviewerId}`);
                // Send notification if configured
                await this.sendReviewNotification(savedFaq, action, reviewer);
                return savedFaq;
            }
            catch (error) {
                this.logger.error(`Failed to review FAQ ${faqId}:`, error);
                throw error;
            }
        }
        async bulkReview(request) {
            const { faqIds, action, reviewerId, reason } = request;
            const successful = [];
            const failed = [];
            this.logger.log(`Starting bulk review: ${action} for ${faqIds.length} FAQs by reviewer ${reviewerId}`);
            for (const faqId of faqIds) {
                try {
                    await this.reviewFaq({
                        faqId,
                        action,
                        reviewerId,
                        reason
                    });
                    successful.push(faqId);
                }
                catch (error) {
                    failed.push({
                        faqId,
                        error: error.message
                    });
                    this.logger.warn(`Bulk review failed for FAQ ${faqId}:`, error);
                }
            }
            this.logger.log(`Bulk review completed: ${successful.length} successful, ${failed.length} failed`);
            return { successful, failed };
        }
        async getReviewStats() {
            try {
                const [total, pendingReview, approved, rejected, published] = await Promise.all([
                    this.faqRepository.count(),
                    this.faqRepository.count({ where: { status: learned_faq_entry_entity_1.FaqEntryStatus.PENDING_REVIEW } }),
                    this.faqRepository.count({ where: { status: learned_faq_entry_entity_1.FaqEntryStatus.APPROVED } }),
                    this.faqRepository.count({ where: { status: learned_faq_entry_entity_1.FaqEntryStatus.REJECTED } }),
                    this.faqRepository.count({ where: { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED } })
                ]);
                // Calculate average confidence
                const avgResult = await this.faqRepository
                    .createQueryBuilder('faq')
                    .select('AVG(faq.confidence)', 'avg')
                    .getRawOne();
                const averageConfidence = Math.round(parseFloat(avgResult.avg) || 0);
                // Get top categories
                const categoryStats = await this.faqRepository
                    .createQueryBuilder('faq')
                    .select('faq.category', 'category')
                    .addSelect('COUNT(*)', 'count')
                    .where('faq.category IS NOT NULL')
                    .groupBy('faq.category')
                    .orderBy('count', 'DESC')
                    .limit(10)
                    .getRawMany();
                const topCategories = categoryStats.map(stat => ({
                    category: stat.category,
                    count: parseInt(stat.count)
                }));
                // Get reviewer stats
                const reviewerStats = await this.faqRepository
                    .createQueryBuilder('faq')
                    .leftJoin('faq.reviewer', 'reviewer')
                    .select('reviewer.id', 'reviewerId')
                    .addSelect('CONCAT(reviewer.firstName, \' \', reviewer.lastName)', 'reviewerName')
                    .addSelect('COUNT(*)', 'reviewCount')
                    .where('faq.reviewedBy IS NOT NULL')
                    .groupBy('reviewer.id, reviewer.firstName, reviewer.lastName')
                    .orderBy('"reviewCount"', 'DESC')
                    .limit(10)
                    .getRawMany();
                return {
                    total,
                    pendingReview,
                    approved,
                    rejected,
                    published,
                    averageConfidence,
                    topCategories,
                    reviewerStats: reviewerStats.map(stat => ({
                        reviewerId: stat.reviewerId,
                        reviewerName: stat.reviewerName || 'Unknown',
                        reviewCount: parseInt(stat.reviewCount)
                    }))
                };
            }
            catch (error) {
                this.logger.error('Failed to get review stats:', error);
                throw new Error(`Failed to get review stats: ${error.message}`);
            }
        }
        async autoPublishHighConfidenceFaqs() {
            try {
                const config = await this.getAutoPublishConfig();
                if (!config.enableAutoPublishing) {
                    return 0;
                }
                const faqs = await this.faqRepository.find({
                    where: {
                        status: learned_faq_entry_entity_1.FaqEntryStatus.APPROVED,
                        confidence: config.minConfidenceForAutoPublish || 85
                    }
                });
                if (faqs.length === 0) {
                    return 0;
                }
                // Update status to published
                await this.faqRepository.update({ id: (0, typeorm_1.In)(faqs.map(f => f.id)) }, {
                    status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED,
                    publishedAt: new Date()
                });
                this.logger.log(`Auto-published ${faqs.length} high-confidence FAQs`);
                return faqs.length;
            }
            catch (error) {
                this.logger.error('Failed to auto-publish FAQs:', error);
                return 0;
            }
        }
        async getReviewHistory(faqId) {
            try {
                const faq = await this.faqRepository.findOne({
                    where: { id: faqId },
                    relations: ['reviewer']
                });
                if (!faq) {
                    throw new common_1.NotFoundException(`FAQ with ID ${faqId} not found`);
                }
                // For now, return current review info
                // In a full implementation, you'd have a separate review history table
                const history = [];
                if (faq.reviewedAt && faq.reviewer) {
                    history.push({
                        action: faq.status,
                        reviewerId: faq.reviewer.id,
                        reviewerName: `${faq.reviewer.firstName} ${faq.reviewer.lastName}`.trim() || faq.reviewer.email,
                        reviewedAt: faq.reviewedAt,
                        reason: faq.metadata?.reviewReason
                    });
                }
                return history;
            }
            catch (error) {
                this.logger.error(`Failed to get review history for FAQ ${faqId}:`, error);
                throw error;
            }
        }
        async sendReviewNotification(faq, action, reviewer) {
            try {
                // This would integrate with your notification system
                // For now, just log the notification
                this.logger.log(`Notification: FAQ "${faq.question}" was ${action}ed by ${reviewer.email}`);
                // In a real implementation, you might:
                // - Send email notifications
                // - Create in-app notifications
                // - Update dashboard metrics
                // - Trigger webhooks
            }
            catch (error) {
                this.logger.warn('Failed to send review notification:', error);
            }
        }
        async getAutoPublishConfig() {
            try {
                const config = await this.configRepository.findOne({
                    where: { configKey: 'advanced_settings' }
                });
                return config?.configValue || {
                    enableAutoPublishing: false,
                    minConfidenceForAutoPublish: 85
                };
            }
            catch (error) {
                this.logger.error('Failed to load auto-publish config:', error);
                return {
                    enableAutoPublishing: false,
                    minConfidenceForAutoPublish: 85
                };
            }
        }
    };
    return ReviewQueueService = _classThis;
})();
exports.ReviewQueueService = ReviewQueueService;
//# sourceMappingURL=review-queue.service.js.map