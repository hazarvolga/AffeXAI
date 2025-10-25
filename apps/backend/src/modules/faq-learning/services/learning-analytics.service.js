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
exports.LearningAnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const learned_faq_entry_entity_1 = require("../entities/learned-faq-entry.entity");
let LearningAnalyticsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LearningAnalyticsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LearningAnalyticsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        faqRepository;
        patternRepository;
        configRepository;
        ticketRepository;
        chatSessionRepository;
        logger = new common_1.Logger(LearningAnalyticsService.name);
        constructor(faqRepository, patternRepository, configRepository, ticketRepository, chatSessionRepository) {
            this.faqRepository = faqRepository;
            this.patternRepository = patternRepository;
            this.configRepository = configRepository;
            this.ticketRepository = ticketRepository;
            this.chatSessionRepository = chatSessionRepository;
        }
        async getLearningEffectiveness(period = 'week') {
            const dateRange = this.getDateRange(period);
            const [totalFaqs, publishedFaqs, pendingFaqs, rejectedFaqs] = await Promise.all([
                this.faqRepository.count({
                    where: dateRange ? { createdAt: (0, typeorm_1.Between)(dateRange.startDate, dateRange.endDate) } : {},
                }),
                this.faqRepository.count({
                    where: {
                        status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED,
                        ...(dateRange ? { createdAt: (0, typeorm_1.Between)(dateRange.startDate, dateRange.endDate) } : {}),
                    },
                }),
                this.faqRepository.count({
                    where: {
                        status: learned_faq_entry_entity_1.FaqEntryStatus.PENDING_REVIEW,
                        ...(dateRange ? { createdAt: (0, typeorm_1.Between)(dateRange.startDate, dateRange.endDate) } : {}),
                    },
                }),
                this.faqRepository.count({
                    where: {
                        status: learned_faq_entry_entity_1.FaqEntryStatus.REJECTED,
                        ...(dateRange ? { createdAt: (0, typeorm_1.Between)(dateRange.startDate, dateRange.endDate) } : {}),
                    },
                }),
            ]);
            const approvalRate = totalFaqs > 0 ? (publishedFaqs / totalFaqs) * 100 : 0;
            const faqs = await this.faqRepository.find({
                where: dateRange ? { createdAt: (0, typeorm_1.Between)(dateRange.startDate, dateRange.endDate) } : {},
            });
            const avgConfidenceScore = faqs.length > 0
                ? faqs.reduce((sum, faq) => sum + faq.confidence, 0) / faqs.length
                : 0;
            const faqsBySource = {
                chat: faqs.filter(f => f.source === 'chat').length,
                ticket: faqs.filter(f => f.source === 'ticket').length,
            };
            const categoryMap = new Map();
            faqs.forEach(faq => {
                if (faq.category) {
                    categoryMap.set(faq.category, (categoryMap.get(faq.category) || 0) + 1);
                }
            });
            const faqsByCategory = Array.from(categoryMap.entries())
                .map(([category, count]) => ({ category, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10);
            return {
                totalFaqsGenerated: totalFaqs,
                publishedFaqs,
                pendingReview: pendingFaqs,
                rejectedFaqs,
                approvalRate: Math.round(approvalRate * 10) / 10,
                avgConfidenceScore: Math.round(avgConfidenceScore * 10) / 10,
                avgGenerationTime: 0,
                faqsBySource,
                faqsByCategory,
            };
        }
        async getProviderPerformance(period = 'week') {
            const dateRange = this.getDateRange(period);
            const faqs = await this.faqRepository.find({
                where: dateRange ? { createdAt: (0, typeorm_1.Between)(dateRange.startDate, dateRange.endDate) } : {},
            });
            const providerStats = new Map();
            faqs.forEach(faq => {
                const provider = faq.metadata?.aiProvider || 'unknown';
                const stats = providerStats.get(provider) || {
                    total: 0,
                    successful: 0,
                    failed: 0,
                    totalResponseTime: 0,
                    totalTokens: 0,
                    totalConfidence: 0,
                };
                stats.total++;
                if (faq.status === learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED) {
                    stats.successful++;
                }
                else if (faq.status === learned_faq_entry_entity_1.FaqEntryStatus.REJECTED) {
                    stats.failed++;
                }
                stats.totalResponseTime += faq.metadata?.responseTime || 0;
                stats.totalTokens += faq.metadata?.tokensUsed || 0;
                stats.totalConfidence += faq.confidence;
                providerStats.set(provider, stats);
            });
            return Array.from(providerStats.entries()).map(([providerName, stats]) => ({
                providerName,
                totalRequests: stats.total,
                successfulRequests: stats.successful,
                failedRequests: stats.failed,
                avgResponseTime: stats.total > 0 ? Math.round(stats.totalResponseTime / stats.total) : 0,
                avgTokensUsed: stats.total > 0 ? Math.round(stats.totalTokens / stats.total) : 0,
                avgConfidence: stats.total > 0 ? Math.round((stats.totalConfidence / stats.total) * 10) / 10 : 0,
                successRate: stats.total > 0 ? Math.round((stats.successful / stats.total) * 100 * 10) / 10 : 0,
            }));
        }
        async getFaqUsageMetrics(period = 'week') {
            const dateRange = this.getDateRange(period);
            const faqs = await this.faqRepository.find({
                where: {
                    status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED,
                    ...(dateRange ? { createdAt: (0, typeorm_1.Between)(dateRange.startDate, dateRange.endDate) } : {}),
                },
            });
            let totalViews = 0;
            let totalFeedback = 0;
            let positiveFeedback = 0;
            let negativeFeedback = 0;
            faqs.forEach(faq => {
                totalViews += faq.viewCount || 0;
                totalFeedback += faq.feedbackCount || 0;
                positiveFeedback += faq.positiveFeedbackCount || 0;
                negativeFeedback += faq.notHelpfulCount || 0;
            });
            const satisfactionRate = totalFeedback > 0
                ? (positiveFeedback / totalFeedback) * 100
                : 0;
            const topViewedFaqs = faqs
                .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
                .slice(0, 10)
                .map(faq => ({
                id: faq.id,
                question: faq.question,
                views: faq.viewCount || 0,
                satisfaction: faq.feedbackCount > 0
                    ? ((faq.positiveFeedbackCount || 0) / faq.feedbackCount) * 100
                    : 0,
            }));
            const topRatedFaqs = faqs
                .filter(faq => faq.feedbackCount > 0)
                .sort((a, b) => {
                const ratingA = (a.positiveFeedbackCount || 0) / a.feedbackCount;
                const ratingB = (b.positiveFeedbackCount || 0) / b.feedbackCount;
                return ratingB - ratingA;
            })
                .slice(0, 10)
                .map(faq => ({
                id: faq.id,
                question: faq.question,
                rating: faq.feedbackCount > 0
                    ? ((faq.positiveFeedbackCount || 0) / faq.feedbackCount) * 100
                    : 0,
                feedbackCount: faq.feedbackCount,
            }));
            return {
                totalViews,
                totalFeedback,
                positiveFeedback,
                negativeFeedback,
                satisfactionRate: Math.round(satisfactionRate * 10) / 10,
                topViewedFaqs,
                topRatedFaqs,
            };
        }
        async getROIMetrics(period = 'month') {
            const dateRange = this.getDateRange(period);
            const comparisonDate = this.getComparisonDate(period);
            const [currentTickets, previousTickets, currentChats, previousChats] = await Promise.all([
                this.ticketRepository.count({
                    where: dateRange ? { createdAt: (0, typeorm_1.Between)(dateRange.startDate, dateRange.endDate) } : {},
                }),
                this.ticketRepository.count({
                    where: { createdAt: (0, typeorm_1.Between)(comparisonDate.startDate, comparisonDate.endDate) },
                }),
                this.chatSessionRepository.count({
                    where: dateRange ? { createdAt: (0, typeorm_1.Between)(dateRange.startDate, dateRange.endDate) } : {},
                }),
                this.chatSessionRepository.count({
                    where: { createdAt: (0, typeorm_1.Between)(comparisonDate.startDate, comparisonDate.endDate) },
                }),
            ]);
            const daysDiff = dateRange
                ? Math.ceil((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24))
                : 30;
            const avgTicketsPerDayBefore = previousTickets / daysDiff;
            const avgTicketsPerDayAfter = currentTickets / daysDiff;
            const ticketReductionRate = avgTicketsPerDayBefore > 0
                ? ((avgTicketsPerDayBefore - avgTicketsPerDayAfter) / avgTicketsPerDayBefore) * 100
                : 0;
            const estimatedTicketsSaved = Math.max(0, Math.round((avgTicketsPerDayBefore - avgTicketsPerDayAfter) * daysDiff));
            const avgTicketHandlingTime = 30;
            const estimatedTimeSaved = estimatedTicketsSaved * avgTicketHandlingTime;
            const costPerTicket = 10;
            const estimatedCostSavings = estimatedTicketsSaved * costPerTicket;
            const chatResolutionRate = currentChats > 0
                ? ((currentChats - currentTickets) / currentChats) * 100
                : 0;
            const tickets = await this.ticketRepository.find({
                where: dateRange ? { createdAt: (0, typeorm_1.Between)(dateRange.startDate, dateRange.endDate) } : {},
            });
            const avgTicketResolutionTime = tickets.length > 0
                ? tickets.reduce((sum, t) => sum + (t.resolutionTimeHours || 0), 0) / tickets.length
                : 0;
            return {
                ticketReductionRate: Math.round(ticketReductionRate * 10) / 10,
                estimatedTicketsSaved,
                estimatedTimeSaved,
                estimatedCostSavings,
                chatResolutionRate: Math.round(chatResolutionRate * 10) / 10,
                avgTicketResolutionTime: Math.round(avgTicketResolutionTime * 10) / 10,
                beforeAfterComparison: {
                    before: {
                        avgTicketsPerDay: Math.round(avgTicketsPerDayBefore * 10) / 10,
                        avgResolutionTime: 0,
                    },
                    after: {
                        avgTicketsPerDay: Math.round(avgTicketsPerDayAfter * 10) / 10,
                        avgResolutionTime: Math.round(avgTicketResolutionTime * 10) / 10,
                    },
                },
            };
        }
        async getComprehensiveAnalytics(period = 'week') {
            const [effectiveness, providerPerformance, usage, roi] = await Promise.all([
                this.getLearningEffectiveness(period),
                this.getProviderPerformance(period),
                this.getFaqUsageMetrics(period),
                this.getROIMetrics(period),
            ]);
            return {
                period,
                generatedAt: new Date(),
                effectiveness,
                providerPerformance,
                usage,
                roi,
            };
        }
        async getPatternAnalytics(period = 'week') {
            const dateRange = this.getDateRange(period);
            const patterns = await this.patternRepository.find({
                where: dateRange ? { createdAt: (0, typeorm_1.Between)(dateRange.startDate, dateRange.endDate) } : {},
                order: { frequency: 'DESC' },
                take: 20,
            });
            return {
                totalPatterns: patterns.length,
                topPatterns: patterns.map(p => ({
                    id: p.id,
                    pattern: p.patternText,
                    frequency: p.frequency,
                    category: p.category,
                    confidence: p.confidence,
                })),
            };
        }
        getDateRange(period) {
            const now = new Date();
            const startDate = new Date();
            switch (period) {
                case 'day':
                    startDate.setDate(now.getDate() - 1);
                    return { startDate, endDate: now, label: 'Last 24 hours' };
                case 'week':
                    startDate.setDate(now.getDate() - 7);
                    return { startDate, endDate: now, label: 'Last 7 days' };
                case 'month':
                    startDate.setMonth(now.getMonth() - 1);
                    return { startDate, endDate: now, label: 'Last 30 days' };
                case 'all':
                    return null;
                default:
                    startDate.setDate(now.getDate() - 7);
                    return { startDate, endDate: now, label: 'Last 7 days' };
            }
        }
        getComparisonDate(period) {
            const now = new Date();
            const endDate = new Date();
            const startDate = new Date();
            switch (period) {
                case 'day':
                    endDate.setDate(now.getDate() - 1);
                    startDate.setDate(now.getDate() - 2);
                    break;
                case 'week':
                    endDate.setDate(now.getDate() - 7);
                    startDate.setDate(now.getDate() - 14);
                    break;
                case 'month':
                    endDate.setMonth(now.getMonth() - 1);
                    startDate.setMonth(now.getMonth() - 2);
                    break;
                default:
                    endDate.setDate(now.getDate() - 7);
                    startDate.setDate(now.getDate() - 14);
            }
            return { startDate, endDate, label: 'Comparison period' };
        }
    };
    return LearningAnalyticsService = _classThis;
})();
exports.LearningAnalyticsService = LearningAnalyticsService;
//# sourceMappingURL=learning-analytics.service.js.map