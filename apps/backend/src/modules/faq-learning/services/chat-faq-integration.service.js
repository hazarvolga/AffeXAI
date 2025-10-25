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
exports.ChatFaqIntegrationService = void 0;
const common_1 = require("@nestjs/common");
const learned_faq_entry_entity_1 = require("../entities/learned-faq-entry.entity");
let ChatFaqIntegrationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChatFaqIntegrationService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatFaqIntegrationService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        faqRepository;
        searchService;
        logger = new common_1.Logger(ChatFaqIntegrationService.name);
        chatContexts = new Map();
        constructor(faqRepository, searchService) {
            this.faqRepository = faqRepository;
            this.searchService = searchService;
        }
        async suggestFaqsForMessage(message, sessionId, options) {
            try {
                this.logger.log(`Suggesting FAQs for message in session ${sessionId}`);
                const maxSuggestions = options?.maxSuggestions || 3;
                const minRelevance = options?.minRelevance || 60;
                // Get chat context if available
                let context = this.chatContexts.get(sessionId);
                if (!context) {
                    context = {
                        sessionId,
                        messages: [],
                        suggestedFaqs: []
                    };
                    this.chatContexts.set(sessionId, context);
                }
                // Add current message to context
                context.messages.push({
                    id: Date.now().toString(),
                    content: message,
                    role: 'user',
                    timestamp: new Date()
                });
                // Extract intent and keywords from message
                const intent = await this.extractUserIntent(message, context);
                const keywords = this.extractKeywords(message);
                // Build search query
                const searchQuery = {
                    query: message,
                    options: {
                        limit: maxSuggestions * 2, // Get more to filter
                        includeFaqs: true,
                        includeArticles: false,
                        sortBy: 'relevance'
                    }
                };
                // Search for relevant FAQs
                const searchResults = await this.searchService.search(searchQuery);
                // Convert to FAQ suggestions
                const suggestions = [];
                for (const result of searchResults.results) {
                    if (result.type !== 'faq')
                        continue;
                    if (result.relevanceScore < minRelevance)
                        continue;
                    const faq = await this.faqRepository.findOne({
                        where: { id: result.id }
                    });
                    if (!faq)
                        continue;
                    suggestions.push({
                        faqId: faq.id,
                        question: faq.question,
                        answer: faq.answer,
                        relevanceScore: result.relevanceScore,
                        confidence: faq.confidence,
                        category: faq.category,
                        keywords: faq.keywords,
                        reasoning: this.generateReasoning(message, faq, result.relevanceScore)
                    });
                    if (suggestions.length >= maxSuggestions)
                        break;
                }
                // Update context with suggestions
                context.suggestedFaqs = suggestions;
                context.userIntent = intent;
                // Track suggestion event
                await this.trackSuggestion(sessionId, message, suggestions);
                return suggestions;
            }
            catch (error) {
                this.logger.error('Failed to suggest FAQs:', error);
                return [];
            }
        }
        /**
         * Get FAQ suggestions for a query (alias for suggestFaqsForMessage)
         */
        async getSuggestionsForQuery(query, sessionId, options) {
            return this.suggestFaqsForMessage(query, sessionId, options);
        }
        async getAutoResponse(message, sessionId, config) {
            try {
                const defaultConfig = {
                    enabled: true,
                    minConfidence: 85,
                    minRelevance: 80,
                    maxSuggestions: 1,
                    requireUserConfirmation: true,
                    ...config
                };
                if (!defaultConfig.enabled) {
                    return { shouldRespond: false, confidence: 0 };
                }
                // Get FAQ suggestions
                const suggestions = await this.suggestFaqsForMessage(message, sessionId, {
                    maxSuggestions: 1,
                    minRelevance: defaultConfig.minRelevance
                });
                if (suggestions.length === 0) {
                    return { shouldRespond: false, confidence: 0 };
                }
                const topSuggestion = suggestions[0];
                // Check if confidence is high enough for auto-response
                if (topSuggestion.confidence < defaultConfig.minConfidence ||
                    topSuggestion.relevanceScore < defaultConfig.minRelevance) {
                    return { shouldRespond: false, confidence: topSuggestion.confidence };
                }
                // Generate response
                let response = '';
                if (defaultConfig.requireUserConfirmation) {
                    response = `Bu sorunuzla ilgili bir FAQ buldum. İşinize yarayabilir mi?\n\n`;
                    response += `**${topSuggestion.question}**\n\n`;
                    response += `${topSuggestion.answer}\n\n`;
                    response += `Bu cevap yardımcı oldu mu?`;
                }
                else {
                    response = topSuggestion.answer;
                }
                // Track auto-response
                await this.trackAutoResponse(sessionId, message, topSuggestion);
                return {
                    shouldRespond: true,
                    response,
                    faq: topSuggestion,
                    confidence: topSuggestion.confidence
                };
            }
            catch (error) {
                this.logger.error('Failed to get auto-response:', error);
                return { shouldRespond: false, confidence: 0 };
            }
        }
        async processFeedback(feedback) {
            try {
                this.logger.log(`Processing feedback for FAQ ${feedback.faqId}`);
                const faq = await this.faqRepository.findOne({
                    where: { id: feedback.faqId }
                });
                if (!faq) {
                    this.logger.warn(`FAQ ${feedback.faqId} not found`);
                    return;
                }
                // Update FAQ metrics
                if (feedback.wasHelpful) {
                    faq.helpfulCount += 1;
                }
                else {
                    faq.notHelpfulCount += 1;
                }
                faq.usageCount += 1;
                // Store feedback in metadata
                if (!faq.metadata) {
                    faq.metadata = {};
                }
                if (!faq.metadata.chatFeedback) {
                    faq.metadata.chatFeedback = [];
                }
                faq.metadata.chatFeedback.push({
                    sessionId: feedback.sessionId,
                    userId: feedback.userId,
                    wasHelpful: feedback.wasHelpful,
                    comment: feedback.userComment,
                    timestamp: feedback.timestamp
                });
                // Keep only last 100 feedback entries
                if (faq.metadata.chatFeedback.length > 100) {
                    faq.metadata.chatFeedback = faq.metadata.chatFeedback.slice(-100);
                }
                await this.faqRepository.save(faq);
                this.logger.log(`Feedback processed for FAQ ${feedback.faqId}`);
            }
            catch (error) {
                this.logger.error('Failed to process feedback:', error);
            }
        }
        async getChatContext(sessionId) {
            return this.chatContexts.get(sessionId) || null;
        }
        async updateChatContext(sessionId, update) {
            const context = this.chatContexts.get(sessionId);
            if (context) {
                Object.assign(context, update);
            }
        }
        async clearChatContext(sessionId) {
            this.chatContexts.delete(sessionId);
        }
        async getRealtimeSuggestions(partialMessage, sessionId) {
            try {
                if (partialMessage.length < 3)
                    return [];
                // Get quick FAQ matches
                const faqs = await this.faqRepository
                    .createQueryBuilder('faq')
                    .where('faq.status = :status', { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED })
                    .andWhere('LOWER(faq.question) LIKE :query', {
                    query: `%${partialMessage.toLowerCase()}%`
                })
                    .orderBy('faq.usageCount', 'DESC')
                    .take(5)
                    .getMany();
                return faqs.map(faq => ({
                    text: faq.question,
                    type: 'faq'
                }));
            }
            catch (error) {
                this.logger.error('Failed to get realtime suggestions:', error);
                return [];
            }
        }
        async getLearningFeedbackLoop(sessionId) {
            try {
                const context = this.chatContexts.get(sessionId);
                if (!context || context.messages.length < 4) {
                    return { shouldLearn: false };
                }
                // Check if conversation resulted in a resolution
                const lastMessages = context.messages.slice(-4);
                const hasUserQuestion = lastMessages.some(m => m.role === 'user' && m.content.includes('?'));
                const hasAssistantAnswer = lastMessages.some(m => m.role === 'assistant');
                if (!hasUserQuestion || !hasAssistantAnswer) {
                    return { shouldLearn: false };
                }
                // Extract Q&A pair
                const questionMsg = lastMessages.find(m => m.role === 'user' && m.content.includes('?'));
                const answerMsg = lastMessages.find(m => m.role === 'assistant');
                if (!questionMsg || !answerMsg) {
                    return { shouldLearn: false };
                }
                // Build context
                const contextStr = lastMessages
                    .map(m => `${m.role}: ${m.content}`)
                    .join('\n');
                // Calculate confidence based on conversation quality
                const confidence = this.calculateConversationConfidence(lastMessages);
                return {
                    shouldLearn: confidence >= 60,
                    data: {
                        question: questionMsg.content,
                        answer: answerMsg.content,
                        context: contextStr,
                        confidence
                    }
                };
            }
            catch (error) {
                this.logger.error('Failed to get learning feedback loop:', error);
                return { shouldLearn: false };
            }
        }
        async extractUserIntent(message, context) {
            // Simple intent extraction based on keywords and patterns
            const messageLower = message.toLowerCase();
            if (messageLower.includes('nasıl') || messageLower.includes('how')) {
                return 'how_to';
            }
            if (messageLower.includes('nedir') || messageLower.includes('what')) {
                return 'definition';
            }
            if (messageLower.includes('problem') || messageLower.includes('sorun') || messageLower.includes('hata')) {
                return 'troubleshooting';
            }
            if (messageLower.includes('?')) {
                return 'question';
            }
            return 'general';
        }
        extractKeywords(message) {
            // Simple keyword extraction
            const words = message
                .toLowerCase()
                .replace(/[^\w\s]/g, '')
                .split(/\s+/)
                .filter(word => word.length > 3);
            // Remove common stop words
            const stopWords = ['nasıl', 'nedir', 'neden', 'için', 'gibi', 'kadar', 'daha', 'çok'];
            return words.filter(word => !stopWords.includes(word));
        }
        generateReasoning(message, faq, relevanceScore) {
            const reasons = [];
            if (relevanceScore >= 90) {
                reasons.push('Sorunuzla çok yüksek eşleşme');
            }
            else if (relevanceScore >= 75) {
                reasons.push('Sorunuzla yüksek eşleşme');
            }
            if (faq.confidence >= 85) {
                reasons.push('Yüksek güvenilirlik skoru');
            }
            if (faq.usageCount > 50) {
                reasons.push('Sıkça kullanılan FAQ');
            }
            if (faq.helpfulCount > faq.notHelpfulCount * 2) {
                reasons.push('Kullanıcılar tarafından faydalı bulunmuş');
            }
            return reasons.join(', ') || 'İlgili içerik';
        }
        calculateConversationConfidence(messages) {
            let confidence = 50; // Base confidence
            // More messages = more context = higher confidence
            confidence += Math.min(20, messages.length * 5);
            // Check for positive indicators
            const lastUserMessage = messages.filter(m => m.role === 'user').pop();
            if (lastUserMessage) {
                const content = lastUserMessage.content.toLowerCase();
                if (content.includes('teşekkür') || content.includes('thank')) {
                    confidence += 20;
                }
                if (content.includes('anladım') || content.includes('understand')) {
                    confidence += 15;
                }
            }
            return Math.min(100, confidence);
        }
        async trackSuggestion(sessionId, message, suggestions) {
            try {
                this.logger.log(`Tracked ${suggestions.length} suggestions for session ${sessionId}`);
                // In real implementation, save to analytics table
            }
            catch (error) {
                this.logger.warn('Failed to track suggestion:', error);
            }
        }
        async trackAutoResponse(sessionId, message, faq) {
            try {
                this.logger.log(`Tracked auto-response for session ${sessionId}: FAQ ${faq.faqId}`);
                // In real implementation, save to analytics table
            }
            catch (error) {
                this.logger.warn('Failed to track auto-response:', error);
            }
        }
        async getIntegrationStats() {
            // This would aggregate from analytics tables in real implementation
            return {
                totalSuggestions: 0,
                totalAutoResponses: 0,
                averageRelevance: 0,
                feedbackStats: {
                    helpful: 0,
                    notHelpful: 0,
                    ratio: 0
                }
            };
        }
    };
    return ChatFaqIntegrationService = _classThis;
})();
exports.ChatFaqIntegrationService = ChatFaqIntegrationService;
//# sourceMappingURL=chat-faq-integration.service.js.map