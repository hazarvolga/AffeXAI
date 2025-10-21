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
exports.AICategorizationService = void 0;
const common_1 = require("@nestjs/common");
let AICategorizationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AICategorizationService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AICategorizationService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ticketRepository;
        categoryRepository;
        logger = new common_1.Logger(AICategorizationService.name);
        // Keyword patterns for each category (simplified ML simulation)
        categoryPatterns = new Map();
        constructor(ticketRepository, categoryRepository) {
            this.ticketRepository = ticketRepository;
            this.categoryRepository = categoryRepository;
            this.initializePatterns();
        }
        /**
         * Initialize ML patterns (in production, this would load trained models)
         */
        initializePatterns() {
            // Technical Issues
            this.categoryPatterns.set('technical', [
                { keywords: ['bug', 'error', 'crash', 'not working', 'broken', 'hata', 'çalışmıyor'], weight: 10 },
                { keywords: ['500', '404', 'exception', 'timeout', 'connection'], weight: 8 },
                { keywords: ['install', 'setup', 'configure', 'kurulum', 'ayar'], weight: 6 },
            ]);
            // Billing & Payment
            this.categoryPatterns.set('billing', [
                { keywords: ['invoice', 'payment', 'billing', 'charge', 'fatura', 'ödeme', 'ücret'], weight: 10 },
                { keywords: ['refund', 'subscription', 'plan', 'iade', 'abonelik'], weight: 9 },
                { keywords: ['credit card', 'bank', 'paypal', 'kredi kartı'], weight: 8 },
            ]);
            // Account & Access
            this.categoryPatterns.set('account', [
                { keywords: ['login', 'password', 'account', 'access', 'giriş', 'şifre', 'hesap'], weight: 10 },
                { keywords: ['forgot', 'reset', 'locked', 'unuttum', 'kilitli'], weight: 9 },
                { keywords: ['2fa', 'two-factor', 'security', 'güvenlik'], weight: 7 },
            ]);
            // Feature Request
            this.categoryPatterns.set('feature', [
                { keywords: ['feature', 'request', 'add', 'would like', 'özellik', 'istek', 'ekle'], weight: 10 },
                { keywords: ['suggestion', 'improve', 'enhancement', 'öneri', 'geliştir'], weight: 8 },
                { keywords: ['new', 'support', 'yeni', 'destek'], weight: 6 },
            ]);
            // General Question
            this.categoryPatterns.set('question', [
                { keywords: ['how', 'what', 'where', 'why', 'nasıl', 'nedir', 'nerede'], weight: 10 },
                { keywords: ['help', 'guide', 'tutorial', 'yardım', 'kılavuz'], weight: 8 },
                { keywords: ['question', 'soru', 'information', 'bilgi'], weight: 7 },
            ]);
            this.logger.log('AI categorization patterns initialized');
        }
        /**
         * Predict category for a ticket using ML simulation
         */
        async predictCategory(ticket) {
            const content = `${ticket.subject} ${ticket.description}`.toLowerCase();
            const predictions = [];
            // Calculate scores for each category
            for (const [categoryKey, patterns] of this.categoryPatterns.entries()) {
                let score = 0;
                const matchedKeywords = [];
                for (const pattern of patterns) {
                    for (const keyword of pattern.keywords) {
                        if (content.includes(keyword.toLowerCase())) {
                            score += pattern.weight;
                            matchedKeywords.push(keyword);
                        }
                    }
                }
                if (score > 0) {
                    predictions.push({
                        categoryKey,
                        score,
                        matchedKeywords,
                    });
                }
            }
            // Sort by score
            predictions.sort((a, b) => b.score - a.score);
            // Get categories from database
            const categories = await this.categoryRepository.find({
                where: { isActive: true },
            });
            // Map predictions to actual categories
            const results = [];
            const totalScore = predictions.reduce((sum, p) => sum + p.score, 0);
            for (const pred of predictions.slice(0, 3)) { // Top 3
                // Find matching category by name pattern
                const category = categories.find(c => c.name.toLowerCase().includes(pred.categoryKey) ||
                    pred.categoryKey.includes(c.name.toLowerCase()));
                if (category) {
                    const confidence = totalScore > 0 ? (pred.score / totalScore) * 100 : 0;
                    results.push({
                        categoryId: category.id,
                        categoryName: category.name,
                        confidence: Math.round(confidence),
                        reasons: pred.matchedKeywords,
                    });
                }
            }
            this.logger.log(`Predicted ${results.length} categories for ticket ${ticket.id}`);
            return results;
        }
        /**
         * Auto-assign category to ticket
         */
        async autoCategorizе(ticketId) {
            const ticket = await this.ticketRepository.findOne({
                where: { id: ticketId },
            });
            if (!ticket) {
                return null;
            }
            const predictions = await this.predictCategory(ticket);
            if (predictions.length > 0 && predictions[0].confidence >= 60) {
                // Auto-assign if confidence >= 60%
                ticket.categoryId = predictions[0].categoryId;
                await this.ticketRepository.save(ticket);
                this.logger.log(`Auto-categorized ticket ${ticketId} to ${predictions[0].categoryName} (${predictions[0].confidence}%)`);
                return predictions[0];
            }
            return null;
        }
        /**
         * Get categorization suggestions (don't auto-assign)
         */
        async getSuggestions(ticketId) {
            const ticket = await this.ticketRepository.findOne({
                where: { id: ticketId },
            });
            if (!ticket) {
                return [];
            }
            return await this.predictCategory(ticket);
        }
        /**
         * Train model with historical data (simulated)
         */
        async trainModel() {
            // In production, this would trigger actual ML model training
            // For now, we'll just collect statistics
            const tickets = await this.ticketRepository.find({
                where: {},
                relations: ['category'],
            });
            const categorizedTickets = tickets.filter(t => t.categoryId);
            const accuracy = categorizedTickets.length / tickets.length;
            const categoryStats = new Map();
            for (const ticket of categorizedTickets) {
                if (ticket.category) {
                    const count = categoryStats.get(ticket.category.id) || 0;
                    categoryStats.set(ticket.category.id, count + 1);
                }
            }
            const categories = await this.categoryRepository.find({
                where: { isActive: true },
            });
            const categoryInfo = categories.map(cat => ({
                id: cat.id,
                name: cat.name,
                sampleCount: categoryStats.get(cat.id) || 0,
            }));
            this.logger.log(`Model training completed: ${categorizedTickets.length} samples, ${Math.round(accuracy * 100)}% accuracy`);
            return {
                ticketCount: categorizedTickets.length,
                accuracy: Math.round(accuracy * 100),
                lastTrainedAt: new Date(),
                categories: categoryInfo,
            };
        }
        /**
         * Get AI categorization statistics
         */
        async getStatistics() {
            // In production, this would query actual ML metrics
            // For MVP, return simulated statistics
            const tickets = await this.ticketRepository.find({
                where: {},
                relations: ['category'],
            });
            const categorized = tickets.filter(t => t.categoryId);
            const totalPredictions = tickets.length;
            const autoAssigned = Math.round(categorized.length * 0.7); // Simulate 70% auto-assigned
            const averageConfidence = 75; // Simulated
            const accuracyRate = 85; // Simulated
            return {
                totalPredictions,
                autoAssigned,
                averageConfidence,
                accuracyRate,
            };
        }
        /**
         * Validate prediction accuracy
         */
        async validatePrediction(ticketId, predictedCategoryId, actualCategoryId) {
            const isCorrect = predictedCategoryId === actualCategoryId;
            // In production, store this for model improvement
            this.logger.log(`Prediction validation for ticket ${ticketId}: ${isCorrect ? 'Correct' : 'Incorrect'}`);
            return isCorrect;
        }
    };
    return AICategorizationService = _classThis;
})();
exports.AICategorizationService = AICategorizationService;
//# sourceMappingURL=ai-categorization.service.js.map