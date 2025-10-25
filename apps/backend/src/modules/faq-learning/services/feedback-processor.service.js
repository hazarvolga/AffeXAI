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
exports.FeedbackProcessorService = void 0;
const common_1 = require("@nestjs/common");
let FeedbackProcessorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FeedbackProcessorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FeedbackProcessorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        faqRepository;
        configRepository;
        confidenceCalculator;
        faqAiService;
        logger = new common_1.Logger(FeedbackProcessorService.name);
        constructor(faqRepository, configRepository, confidenceCalculator, faqAiService) {
            this.faqRepository = faqRepository;
            this.configRepository = configRepository;
            this.confidenceCalculator = confidenceCalculator;
            this.faqAiService = faqAiService;
        }
        async processFeedback(feedback) {
            try {
                this.logger.log(`Processing feedback for FAQ ${feedback.faqId}: ${feedback.feedbackType}`);
                const faq = await this.faqRepository.findOne({
                    where: { id: feedback.faqId }
                });
                if (!faq) {
                    throw new Error(`FAQ with ID ${feedback.faqId} not found`);
                }
                // Analyze the feedback
                const analysis = await this.analyzeFeedback(feedback, faq);
                // Update FAQ metrics
                const updatedFaq = await this.updateFaqMetrics(faq, feedback);
                // Adjust confidence based on feedback
                if (analysis.confidenceAdjustment !== 0) {
                    const newConfidence = await this.confidenceCalculator.adjustConfidenceBasedOnFeedback(updatedFaq.confidence, feedback.feedbackType, this.getTotalFeedbackCount(updatedFaq));
                    updatedFaq.confidence = newConfidence;
                }
                // Process suggestions and corrections
                if (feedback.feedbackType === 'suggestion' || feedback.feedbackType === 'correction') {
                    await this.processSuggestion(updatedFaq, feedback);
                }
                // Save updated FAQ
                const savedFaq = await this.faqRepository.save(updatedFaq);
                // Check if action is required
                if (analysis.actionRequired) {
                    await this.triggerImprovementAction(savedFaq, analysis);
                }
                this.logger.log(`Feedback processed successfully for FAQ ${feedback.faqId}`);
                return {
                    processed: true,
                    analysis,
                    updatedFaq: savedFaq
                };
            }
            catch (error) {
                this.logger.error(`Failed to process feedback for FAQ ${feedback.faqId}:`, error);
                return {
                    processed: false,
                    analysis: {
                        overallSentiment: 'neutral',
                        confidenceAdjustment: 0,
                        suggestedImprovements: [],
                        actionRequired: false,
                        priority: 'low'
                    }
                };
            }
        }
        async getFeedbackStats(faqId) {
            try {
                const faq = await this.faqRepository.findOne({
                    where: { id: faqId }
                });
                if (!faq) {
                    throw new Error(`FAQ with ID ${faqId} not found`);
                }
                const totalFeedback = faq.helpfulCount + faq.notHelpfulCount;
                const helpfulnessRatio = totalFeedback > 0 ? faq.helpfulCount / totalFeedback : 0;
                // Extract feedback data from metadata
                const feedbackHistory = faq.metadata?.feedbackHistory || [];
                const suggestionCount = feedbackHistory.filter((f) => f.type === 'suggestion').length;
                const correctionCount = feedbackHistory.filter((f) => f.type === 'correction').length;
                const ratings = feedbackHistory
                    .filter((f) => f.rating)
                    .map((f) => f.rating);
                const averageRating = ratings.length > 0 ?
                    ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;
                // Analyze common issues
                const issues = feedbackHistory
                    .filter((f) => f.comment)
                    .map((f) => this.extractIssues(f.comment))
                    .flat();
                const issueCount = this.countOccurrences(issues);
                const topIssues = Object.entries(issueCount)
                    .map(([issue, count]) => ({
                    issue,
                    count: count,
                    percentage: (count / totalFeedback) * 100
                }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5);
                // Generate improvement suggestions
                const improvementSuggestions = await this.generateDetailedImprovementSuggestions(faq, feedbackHistory);
                return {
                    totalFeedback,
                    helpfulCount: faq.helpfulCount,
                    notHelpfulCount: faq.notHelpfulCount,
                    suggestionCount,
                    correctionCount,
                    averageRating,
                    helpfulnessRatio,
                    topIssues,
                    improvementSuggestions
                };
            }
            catch (error) {
                this.logger.error(`Failed to get feedback stats for FAQ ${faqId}:`, error);
                throw error;
            }
        }
        async getPerformanceMetrics(faqId) {
            try {
                const queryBuilder = this.faqRepository.createQueryBuilder('faq');
                if (faqId) {
                    queryBuilder.where('faq.id = :faqId', { faqId });
                }
                const faqs = await queryBuilder.getMany();
                const metrics = [];
                for (const faq of faqs) {
                    const totalFeedback = faq.helpfulCount + faq.notHelpfulCount;
                    const helpfulnessRatio = totalFeedback > 0 ? faq.helpfulCount / totalFeedback : 0;
                    const feedbackHistory = faq.metadata?.feedbackHistory || [];
                    const ratings = feedbackHistory
                        .filter((f) => f.rating)
                        .map((f) => f.rating);
                    const averageRating = ratings.length > 0 ?
                        ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;
                    // Calculate performance score (weighted combination of metrics)
                    const performanceScore = this.calculatePerformanceScore({
                        helpfulnessRatio,
                        averageRating,
                        confidence: faq.confidence,
                        usageCount: faq.usageCount,
                        totalFeedback
                    });
                    // Determine trend
                    const trend = this.calculateTrend(faq);
                    // Generate recommendations
                    const recommendations = this.generateRecommendations(faq, {
                        helpfulnessRatio,
                        averageRating,
                        performanceScore,
                        totalFeedback
                    });
                    metrics.push({
                        faqId: faq.id,
                        question: faq.question,
                        totalViews: faq.usageCount,
                        totalFeedback,
                        helpfulnessRatio,
                        averageRating,
                        confidenceScore: faq.confidence,
                        lastUpdated: faq.updatedAt,
                        performanceScore,
                        trend,
                        recommendations
                    });
                }
                return metrics.sort((a, b) => b.performanceScore - a.performanceScore);
            }
            catch (error) {
                this.logger.error('Failed to get performance metrics:', error);
                throw error;
            }
        }
        async generateImprovementSuggestions(faqId) {
            try {
                const faq = await this.faqRepository.findOne({
                    where: { id: faqId }
                });
                if (!faq) {
                    throw new Error(`FAQ with ID ${faqId} not found`);
                }
                const suggestions = [];
                const feedbackHistory = faq.metadata?.feedbackHistory || [];
                const totalFeedback = faq.helpfulCount + faq.notHelpfulCount;
                const helpfulnessRatio = totalFeedback > 0 ? faq.helpfulCount / totalFeedback : 0;
                // Analyze performance and generate suggestions
                if (helpfulnessRatio < 0.6 && totalFeedback >= 5) {
                    suggestions.push('Consider rewriting the answer to be clearer and more actionable');
                }
                if (faq.confidence < 70) {
                    suggestions.push('Review and validate the answer accuracy');
                }
                if (faq.usageCount > 50 && helpfulnessRatio < 0.7) {
                    suggestions.push('This is a popular FAQ with low satisfaction - prioritize improvement');
                }
                // Analyze feedback comments for specific issues
                const comments = feedbackHistory
                    .filter((f) => f.comment)
                    .map((f) => f.comment);
                if (comments.length > 0) {
                    const commonIssues = this.analyzeCommonIssues(comments);
                    suggestions.push(...commonIssues);
                }
                // Check for outdated content
                const daysSinceUpdate = Math.floor((Date.now() - new Date(faq.updatedAt).getTime()) / (1000 * 60 * 60 * 24));
                if (daysSinceUpdate > 90 && faq.usageCount > 20) {
                    suggestions.push('Content may be outdated - consider reviewing for accuracy');
                }
                return suggestions;
            }
            catch (error) {
                this.logger.error(`Failed to generate improvement suggestions for FAQ ${faqId}:`, error);
                return [];
            }
        }
        async analyzeFeedback(feedback, faq) {
            let sentiment = 'neutral';
            let confidenceAdjustment = 0;
            const suggestedImprovements = [];
            let actionRequired = false;
            let priority = 'low';
            // Determine sentiment and confidence adjustment
            switch (feedback.feedbackType) {
                case 'helpful':
                    sentiment = 'positive';
                    confidenceAdjustment = 2;
                    break;
                case 'not_helpful':
                    sentiment = 'negative';
                    confidenceAdjustment = -3;
                    actionRequired = true;
                    priority = 'medium';
                    break;
                case 'suggestion':
                    sentiment = 'neutral';
                    if (feedback.suggestedAnswer) {
                        suggestedImprovements.push('User provided alternative answer');
                        actionRequired = true;
                        priority = 'medium';
                    }
                    break;
                case 'correction':
                    sentiment = 'negative';
                    confidenceAdjustment = -5;
                    actionRequired = true;
                    priority = 'high';
                    suggestedImprovements.push('User reported incorrect information');
                    break;
            }
            // Analyze rating if provided
            if (feedback.rating) {
                if (feedback.rating <= 2) {
                    sentiment = 'negative';
                    confidenceAdjustment -= 2;
                    actionRequired = true;
                    priority = 'high';
                }
                else if (feedback.rating >= 4) {
                    sentiment = 'positive';
                    confidenceAdjustment += 1;
                }
            }
            // Analyze comment for additional insights
            if (feedback.comment) {
                const commentAnalysis = this.analyzeComment(feedback.comment);
                suggestedImprovements.push(...commentAnalysis.improvements);
                if (commentAnalysis.severity === 'high') {
                    priority = 'high';
                    actionRequired = true;
                }
            }
            return {
                overallSentiment: sentiment,
                confidenceAdjustment,
                suggestedImprovements,
                actionRequired,
                priority
            };
        }
        async updateFaqMetrics(faq, feedback) {
            // Update counters
            switch (feedback.feedbackType) {
                case 'helpful':
                    faq.helpfulCount += 1;
                    break;
                case 'not_helpful':
                    faq.notHelpfulCount += 1;
                    break;
            }
            // Update usage count
            faq.usageCount += 1;
            // Update metadata with feedback history
            if (!faq.metadata) {
                faq.metadata = {};
            }
            if (!faq.metadata.feedbackHistory) {
                faq.metadata.feedbackHistory = [];
            }
            faq.metadata.feedbackHistory.push({
                type: feedback.feedbackType,
                rating: feedback.rating,
                comment: feedback.comment,
                userId: feedback.userId,
                timestamp: new Date(),
                context: feedback.context
            });
            // Keep only last 100 feedback entries to prevent metadata bloat
            if (faq.metadata.feedbackHistory.length > 100) {
                faq.metadata.feedbackHistory = faq.metadata.feedbackHistory.slice(-100);
            }
            return faq;
        }
        async processSuggestion(faq, feedback) {
            try {
                // If user provided a suggested answer, analyze it
                if (feedback.suggestedAnswer) {
                    // Use AI to evaluate the suggestion
                    const evaluation = await this.faqAiService.improveAnswer(faq.answer, `User suggested this alternative: ${feedback.suggestedAnswer}. Evaluate and potentially incorporate improvements.`);
                    // Store the suggestion for review
                    if (!faq.metadata.suggestions) {
                        faq.metadata.suggestions = [];
                    }
                    faq.metadata.suggestions.push({
                        originalAnswer: faq.answer,
                        suggestedAnswer: feedback.suggestedAnswer,
                        aiEvaluation: evaluation,
                        userId: feedback.userId,
                        timestamp: new Date()
                    });
                }
                // Process category suggestions
                if (feedback.suggestedCategory && feedback.suggestedCategory !== faq.category) {
                    if (!faq.metadata.categorySuggestions) {
                        faq.metadata.categorySuggestions = [];
                    }
                    faq.metadata.categorySuggestions.push({
                        currentCategory: faq.category,
                        suggestedCategory: feedback.suggestedCategory,
                        userId: feedback.userId,
                        timestamp: new Date()
                    });
                }
                // Process keyword suggestions
                if (feedback.suggestedKeywords && feedback.suggestedKeywords.length > 0) {
                    if (!faq.metadata.keywordSuggestions) {
                        faq.metadata.keywordSuggestions = [];
                    }
                    faq.metadata.keywordSuggestions.push({
                        currentKeywords: faq.keywords,
                        suggestedKeywords: feedback.suggestedKeywords,
                        userId: feedback.userId,
                        timestamp: new Date()
                    });
                }
            }
            catch (error) {
                this.logger.warn('Failed to process suggestion:', error);
            }
        }
        async triggerImprovementAction(faq, analysis) {
            try {
                // Log the action requirement
                this.logger.log(`Action required for FAQ ${faq.id}: ${analysis.priority} priority`);
                // Update FAQ status if needed
                if (analysis.priority === 'high') {
                    // Mark for urgent review
                    faq.metadata = {
                        ...faq.metadata,
                        needsUrgentReview: true,
                        urgentReviewReason: analysis.suggestedImprovements.join('; '),
                        flaggedAt: new Date()
                    };
                }
                // In a real implementation, you might:
                // - Send notifications to admins
                // - Create review tasks
                // - Update dashboard alerts
                // - Trigger automated improvements
            }
            catch (error) {
                this.logger.error('Failed to trigger improvement action:', error);
            }
        }
        analyzeComment(comment) {
            const improvements = [];
            let severity = 'low';
            const lowerComment = comment.toLowerCase();
            // Check for specific issues
            if (lowerComment.includes('wrong') || lowerComment.includes('incorrect') || lowerComment.includes('error')) {
                improvements.push('User reported incorrect information');
                severity = 'high';
            }
            if (lowerComment.includes('outdated') || lowerComment.includes('old')) {
                improvements.push('Content may be outdated');
                severity = 'medium';
            }
            if (lowerComment.includes('unclear') || lowerComment.includes('confusing')) {
                improvements.push('Answer needs clarification');
                severity = 'medium';
            }
            if (lowerComment.includes('missing') || lowerComment.includes('incomplete')) {
                improvements.push('Answer is incomplete');
                severity = 'medium';
            }
            return { improvements, severity };
        }
        extractIssues(comment) {
            const issues = [];
            const lowerComment = comment.toLowerCase();
            const issuePatterns = [
                { pattern: /wrong|incorrect|error/i, issue: 'Incorrect information' },
                { pattern: /outdated|old/i, issue: 'Outdated content' },
                { pattern: /unclear|confusing/i, issue: 'Unclear explanation' },
                { pattern: /missing|incomplete/i, issue: 'Incomplete information' },
                { pattern: /too long|verbose/i, issue: 'Too lengthy' },
                { pattern: /too short|brief/i, issue: 'Too brief' }
            ];
            for (const { pattern, issue } of issuePatterns) {
                if (pattern.test(comment)) {
                    issues.push(issue);
                }
            }
            return issues;
        }
        countOccurrences(items) {
            return items.reduce((acc, item) => {
                acc[item] = (acc[item] || 0) + 1;
                return acc;
            }, {});
        }
        calculatePerformanceScore(metrics) {
            const { helpfulnessRatio, averageRating, confidence, usageCount, totalFeedback } = metrics;
            // Weighted score calculation
            let score = 0;
            // Helpfulness ratio (40% weight)
            score += helpfulnessRatio * 40;
            // Average rating (25% weight) - convert 1-5 scale to 0-100
            score += (averageRating / 5) * 25;
            // Confidence (20% weight)
            score += (confidence / 100) * 20;
            // Usage popularity (10% weight) - logarithmic scale
            const popularityScore = Math.min(100, Math.log10(usageCount + 1) * 20);
            score += (popularityScore / 100) * 10;
            // Feedback engagement (5% weight)
            const engagementScore = Math.min(100, totalFeedback * 2);
            score += (engagementScore / 100) * 5;
            return Math.round(score);
        }
        calculateTrend(faq) {
            const feedbackHistory = faq.metadata?.feedbackHistory || [];
            if (feedbackHistory.length < 10) {
                return 'stable';
            }
            // Analyze recent vs older feedback
            const recentFeedback = feedbackHistory.slice(-5);
            const olderFeedback = feedbackHistory.slice(-10, -5);
            const recentHelpfulRatio = this.calculateHelpfulRatio(recentFeedback);
            const olderHelpfulRatio = this.calculateHelpfulRatio(olderFeedback);
            const difference = recentHelpfulRatio - olderHelpfulRatio;
            if (difference > 0.1)
                return 'improving';
            if (difference < -0.1)
                return 'declining';
            return 'stable';
        }
        calculateHelpfulRatio(feedback) {
            const helpful = feedback.filter(f => f.type === 'helpful').length;
            const notHelpful = feedback.filter(f => f.type === 'not_helpful').length;
            const total = helpful + notHelpful;
            return total > 0 ? helpful / total : 0;
        }
        generateRecommendations(faq, metrics) {
            const recommendations = [];
            if (metrics.helpfulnessRatio < 0.6 && metrics.totalFeedback >= 5) {
                recommendations.push('Low helpfulness ratio - consider rewriting the answer');
            }
            if (metrics.averageRating < 3 && metrics.totalFeedback >= 3) {
                recommendations.push('Low average rating - review content quality');
            }
            if (metrics.performanceScore < 50) {
                recommendations.push('Overall poor performance - needs immediate attention');
            }
            if (faq.usageCount > 100 && metrics.helpfulnessRatio < 0.8) {
                recommendations.push('High-traffic FAQ with room for improvement');
            }
            return recommendations;
        }
        async generateDetailedImprovementSuggestions(faq, feedbackHistory) {
            const suggestions = [];
            // Analyze feedback patterns
            const issues = feedbackHistory
                .filter(f => f.comment)
                .map(f => this.extractIssues(f.comment))
                .flat();
            const issueCount = this.countOccurrences(issues);
            for (const [issue, count] of Object.entries(issueCount)) {
                let impact = 'low';
                if (count >= 5)
                    impact = 'high';
                else if (count >= 3)
                    impact = 'medium';
                suggestions.push({
                    suggestion: `Address: ${issue}`,
                    frequency: count,
                    impact
                });
            }
            return suggestions.sort((a, b) => b.frequency - a.frequency);
        }
        getTotalFeedbackCount(faq) {
            return faq.helpfulCount + faq.notHelpfulCount;
        }
        analyzeCommonIssues(comments) {
            const issues = [];
            const allIssues = comments.map(comment => this.extractIssues(comment)).flat();
            const issueCount = this.countOccurrences(allIssues);
            // Return issues that appear in multiple comments
            for (const [issue, count] of Object.entries(issueCount)) {
                if (count >= 2) {
                    issues.push(`Multiple users reported: ${issue}`);
                }
            }
            return issues;
        }
    };
    return FeedbackProcessorService = _classThis;
})();
exports.FeedbackProcessorService = FeedbackProcessorService;
//# sourceMappingURL=feedback-processor.service.js.map