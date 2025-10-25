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
exports.ConfidenceCalculatorService = void 0;
const common_1 = require("@nestjs/common");
let ConfidenceCalculatorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ConfidenceCalculatorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ConfidenceCalculatorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        configRepository;
        logger = new common_1.Logger(ConfidenceCalculatorService.name);
        constructor(configRepository) {
            this.configRepository = configRepository;
        }
        async calculateConfidence(data, patternFrequency, aiConfidence, existingFaqSimilarity) {
            const factors = {
                sourceQuality: this.calculateSourceQuality(data),
                patternFrequency: this.calculatePatternFrequencyScore(patternFrequency || 1),
                resolutionSuccess: this.calculateResolutionSuccess(data),
                userSatisfaction: this.calculateUserSatisfactionScore(data),
                contextClarity: this.calculateContextClarity(data),
                answerCompleteness: this.calculateAnswerCompleteness(data),
                similarityToExisting: this.calculateSimilarityScore(existingFaqSimilarity || 0),
                aiConfidence: aiConfidence || 70
            };
            const overallConfidence = await this.calculateOverallConfidence(factors);
            const reasoning = this.generateReasoning(factors);
            const recommendation = await this.getRecommendation(overallConfidence);
            return {
                overallConfidence,
                factors,
                reasoning,
                recommendation
            };
        }
        async adjustConfidenceBasedOnFeedback(currentConfidence, feedbackType, feedbackCount) {
            const config = await this.getConfidenceConfig();
            const adjustmentFactor = config.feedbackAdjustmentFactor || 0.1;
            let adjustment = 0;
            switch (feedbackType) {
                case 'helpful':
                    // Positive feedback increases confidence
                    adjustment = Math.min(5, feedbackCount * adjustmentFactor);
                    break;
                case 'not_helpful':
                    // Negative feedback decreases confidence
                    adjustment = -Math.min(10, feedbackCount * adjustmentFactor * 2);
                    break;
                case 'improved':
                    // FAQ was improved, moderate increase
                    adjustment = Math.min(3, feedbackCount * adjustmentFactor * 0.5);
                    break;
            }
            const newConfidence = Math.max(0, Math.min(100, currentConfidence + adjustment));
            this.logger.log(`Confidence adjusted from ${currentConfidence} to ${newConfidence} based on ${feedbackType} feedback`);
            return newConfidence;
        }
        calculateSourceQuality(data) {
            let score = 50; // Base score
            if (data.source === 'ticket') {
                score += 20; // Tickets generally have higher quality
                // Check resolution time - longer resolution might indicate complexity/quality
                if (data.metadata.resolutionTime) {
                    if (data.metadata.resolutionTime > 1800) { // > 30 minutes
                        score += 10;
                    }
                }
            }
            else if (data.source === 'chat') {
                score += 10; // Chat is good but less structured
                // Check session duration
                if (data.metadata.sessionDuration) {
                    if (data.metadata.sessionDuration > 300) { // > 5 minutes
                        score += 10;
                    }
                }
            }
            // Check if there are tags/categories (indicates better organization)
            if (data.metadata.category || (data.metadata.tags && data.metadata.tags.length > 0)) {
                score += 10;
            }
            return Math.min(100, score);
        }
        calculatePatternFrequencyScore(frequency) {
            // Higher frequency = higher confidence
            if (frequency >= 10)
                return 95;
            if (frequency >= 5)
                return 85;
            if (frequency >= 3)
                return 70;
            if (frequency >= 2)
                return 55;
            return 40; // Single occurrence
        }
        calculateResolutionSuccess(data) {
            let score = 60; // Default assumption
            // For tickets, check if it was resolved
            if (data.source === 'ticket' && data.metadata.isResolved) {
                score = 85;
            }
            // For chat, check satisfaction or session completion
            if (data.source === 'chat') {
                if (data.metadata.satisfactionScore && data.metadata.satisfactionScore >= 4) {
                    score = 80;
                }
                else if (data.metadata.sessionDuration && data.metadata.sessionDuration > 180) {
                    score = 70; // Longer sessions might indicate resolution
                }
            }
            return score;
        }
        calculateUserSatisfactionScore(data) {
            if (data.metadata.satisfactionScore) {
                // Convert 1-5 scale to 0-100
                return (data.metadata.satisfactionScore - 1) * 25;
            }
            // Default score if no satisfaction data
            return 60;
        }
        calculateContextClarity(data) {
            let score = 50;
            // Check if context is provided
            if (data.context && data.context.length > 50) {
                score += 20;
            }
            // Check question clarity (length, structure)
            if (data.question.length >= 20 && data.question.length <= 200) {
                score += 15;
            }
            // Check for question marks (indicates proper questions)
            if (data.question.includes('?')) {
                score += 10;
            }
            // Check for common question words
            const questionWords = ['how', 'what', 'why', 'when', 'where', 'can', 'could', 'should', 'would'];
            const hasQuestionWords = questionWords.some(word => data.question.toLowerCase().includes(word));
            if (hasQuestionWords) {
                score += 15;
            }
            return Math.min(100, score);
        }
        calculateAnswerCompleteness(data) {
            let score = 50;
            // Check answer length
            if (data.answer.length >= 50 && data.answer.length <= 1000) {
                score += 20;
            }
            else if (data.answer.length < 20) {
                score -= 20; // Too short
            }
            else if (data.answer.length > 2000) {
                score -= 10; // Too long
            }
            // Check for actionable content
            const actionWords = ['click', 'go to', 'navigate', 'select', 'choose', 'enter', 'type'];
            const hasActionWords = actionWords.some(word => data.answer.toLowerCase().includes(word));
            if (hasActionWords) {
                score += 15;
            }
            // Check for structured content (lists, steps)
            if (data.answer.includes('\n') || data.answer.includes('1.') || data.answer.includes('-')) {
                score += 10;
            }
            return Math.min(100, score);
        }
        calculateSimilarityScore(similarity) {
            // Convert similarity (0-1) to confidence impact
            // High similarity might indicate duplicate (bad) or validation (good)
            // We'll treat moderate similarity as good validation
            if (similarity > 0.9) {
                return 30; // Too similar, might be duplicate
            }
            else if (similarity > 0.7) {
                return 80; // Good validation from existing content
            }
            else if (similarity > 0.5) {
                return 70; // Some validation
            }
            else {
                return 60; // Unique content
            }
        }
        async calculateOverallConfidence(factors) {
            const config = await this.getConfidenceConfig();
            // Weighted average of all factors
            const weights = {
                sourceQuality: config.sourceQualityWeight || 0.15,
                patternFrequency: config.patternFrequencyWeight || 0.20,
                resolutionSuccess: config.resolutionSuccessWeight || 0.15,
                userSatisfaction: config.userSatisfactionWeight || 0.15,
                contextClarity: config.contextClarityWeight || 0.10,
                answerCompleteness: config.answerCompletenessWeight || 0.15,
                similarityToExisting: config.similarityWeight || 0.05,
                aiConfidence: config.aiConfidenceWeight || 0.05
            };
            const weightedSum = factors.sourceQuality * weights.sourceQuality +
                factors.patternFrequency * weights.patternFrequency +
                factors.resolutionSuccess * weights.resolutionSuccess +
                factors.userSatisfaction * weights.userSatisfaction +
                factors.contextClarity * weights.contextClarity +
                factors.answerCompleteness * weights.answerCompleteness +
                factors.similarityToExisting * weights.similarityToExisting +
                factors.aiConfidence * weights.aiConfidence;
            return Math.round(weightedSum);
        }
        generateReasoning(factors) {
            const reasoning = [];
            if (factors.sourceQuality >= 80) {
                reasoning.push('High source quality from structured data');
            }
            else if (factors.sourceQuality < 50) {
                reasoning.push('Low source quality, needs verification');
            }
            if (factors.patternFrequency >= 80) {
                reasoning.push('Frequently occurring pattern indicates reliability');
            }
            else if (factors.patternFrequency < 50) {
                reasoning.push('Rare pattern, limited validation data');
            }
            if (factors.userSatisfaction >= 80) {
                reasoning.push('High user satisfaction indicates quality');
            }
            else if (factors.userSatisfaction < 40) {
                reasoning.push('Low user satisfaction raises concerns');
            }
            if (factors.contextClarity >= 80) {
                reasoning.push('Clear context and well-formed question');
            }
            else if (factors.contextClarity < 50) {
                reasoning.push('Unclear context or poorly formed question');
            }
            if (factors.answerCompleteness >= 80) {
                reasoning.push('Complete and actionable answer');
            }
            else if (factors.answerCompleteness < 50) {
                reasoning.push('Incomplete or unclear answer');
            }
            return reasoning;
        }
        async getRecommendation(confidence) {
            const config = await this.getConfidenceThresholds();
            if (confidence >= config.autoPublishThreshold) {
                return 'auto_publish';
            }
            else if (confidence >= config.reviewThreshold) {
                return 'needs_review';
            }
            else {
                return 'reject';
            }
        }
        async getConfidenceThresholds() {
            try {
                const config = await this.configRepository.findOne({
                    where: { configKey: 'confidence_thresholds' }
                });
                return config?.configValue || {
                    autoPublishThreshold: 85,
                    reviewThreshold: 60
                };
            }
            catch (error) {
                this.logger.error('Failed to load confidence thresholds:', error);
                return {
                    autoPublishThreshold: 85,
                    reviewThreshold: 60
                };
            }
        }
        async getConfidenceConfig() {
            try {
                const config = await this.configRepository.findOne({
                    where: { configKey: 'confidence_calculation' }
                });
                return config?.configValue || {
                    sourceQualityWeight: 0.15,
                    patternFrequencyWeight: 0.20,
                    resolutionSuccessWeight: 0.15,
                    userSatisfactionWeight: 0.15,
                    contextClarityWeight: 0.10,
                    answerCompletenessWeight: 0.15,
                    similarityWeight: 0.05,
                    aiConfidenceWeight: 0.05,
                    feedbackAdjustmentFactor: 0.1
                };
            }
            catch (error) {
                this.logger.error('Failed to load confidence config:', error);
                return {};
            }
        }
    };
    return ConfidenceCalculatorService = _classThis;
})();
exports.ConfidenceCalculatorService = ConfidenceCalculatorService;
//# sourceMappingURL=confidence-calculator.service.js.map