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
exports.ChatContextEngineService = void 0;
const common_1 = require("@nestjs/common");
const chat_context_source_entity_1 = require("../entities/chat-context-source.entity");
const learned_faq_entry_entity_1 = require("../../faq-learning/entities/learned-faq-entry.entity");
let ChatContextEngineService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChatContextEngineService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatContextEngineService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        contextSourceRepository;
        documentRepository;
        knowledgeBaseRepository;
        faqRepository;
        patternRepository;
        faqEnhancedSearchService;
        logger = new common_1.Logger(ChatContextEngineService.name);
        constructor(contextSourceRepository, documentRepository, knowledgeBaseRepository, faqRepository, patternRepository, faqEnhancedSearchService) {
            this.contextSourceRepository = contextSourceRepository;
            this.documentRepository = documentRepository;
            this.knowledgeBaseRepository = knowledgeBaseRepository;
            this.faqRepository = faqRepository;
            this.patternRepository = patternRepository;
            this.faqEnhancedSearchService = faqEnhancedSearchService;
        }
        /**
         * Build comprehensive context from multiple sources
         */
        async buildContext(query, sessionId, options) {
            const startTime = Date.now();
            const maxSources = options?.maxSources || 10;
            const minRelevanceScore = options?.minRelevanceScore || 0.3;
            this.logger.log(`Building context for query: "${query}" in session: ${sessionId}`);
            const allSources = [];
            try {
                // Search Knowledge Base if enabled (default: true)
                if (options?.includeKnowledgeBase !== false) {
                    const kbResults = await this.searchKnowledgeBase(query, Math.ceil(maxSources * 0.4));
                    allSources.push(...kbResults.map(result => this.mapKnowledgeBaseToContextSource(result)));
                }
                // Search FAQ Learning if enabled (default: true)
                if (options?.includeFaqLearning !== false) {
                    const faqResults = await this.searchFaqLearning(query, Math.ceil(maxSources * 0.4));
                    allSources.push(...faqResults.map(result => this.mapFaqLearningToContextSource(result)));
                }
                // Search Documents if enabled (default: true)
                if (options?.includeDocuments !== false) {
                    const docResults = await this.searchDocuments(query, sessionId, Math.ceil(maxSources * 0.2));
                    allSources.push(...docResults.map(result => this.mapDocumentToContextSource(result)));
                }
                // Filter by minimum relevance score
                const filteredSources = allSources.filter(source => source.relevanceScore >= minRelevanceScore);
                // Rank and limit sources
                const rankedSources = await this.rankSources(filteredSources, query);
                const finalSources = rankedSources.slice(0, maxSources);
                // Store context sources for this session
                await this.storeContextSources(sessionId, finalSources, query);
                const totalRelevanceScore = finalSources.reduce((sum, source) => sum + source.relevanceScore, 0);
                const processingTime = Date.now() - startTime;
                this.logger.log(`Context built: ${finalSources.length} sources, total relevance: ${totalRelevanceScore.toFixed(2)}, time: ${processingTime}ms`);
                return {
                    sources: finalSources,
                    totalRelevanceScore,
                    searchQuery: query,
                    processingTime
                };
            }
            catch (error) {
                this.logger.error(`Error building context: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Search Knowledge Base articles for relevant content
         */
        async searchKnowledgeBase(query, limit = 5) {
            try {
                this.logger.debug(`Searching Knowledge Base for: "${query}"`);
                const searchQuery = this.knowledgeBaseRepository
                    .createQueryBuilder('article')
                    .leftJoinAndSelect('article.category', 'category')
                    .leftJoinAndSelect('article.author', 'author')
                    .where('article.isPublished = :isPublished', { isPublished: true })
                    .andWhere('article.status = :status', { status: 'published' });
                // Full-text search across title, content, and summary
                searchQuery.andWhere('(article.title ILIKE :query OR article.content ILIKE :query OR article.summary ILIKE :query OR array_to_string(article.tags, \' \') ILIKE :query)', { query: `%${query}%` });
                // Order by relevance factors
                searchQuery
                    .orderBy('article.searchScore', 'DESC')
                    .addOrderBy('article.viewCount', 'DESC')
                    .addOrderBy('article.helpfulCount', 'DESC')
                    .take(limit);
                const articles = await searchQuery.getMany();
                const results = [];
                for (const article of articles) {
                    const relevanceScore = await this.calculateKnowledgeBaseRelevance(article, query);
                    const matchedContent = this.extractMatchedContent(article.content, query);
                    results.push({
                        article,
                        relevanceScore,
                        matchedContent
                    });
                }
                // Sort by relevance score
                results.sort((a, b) => b.relevanceScore - a.relevanceScore);
                this.logger.debug(`Found ${results.length} Knowledge Base results`);
                return results;
            }
            catch (error) {
                this.logger.error(`Error searching Knowledge Base: ${error.message}`, error.stack);
                return [];
            }
        }
        /**
         * Search FAQ Learning entries for relevant content using enhanced search
         */
        async searchFaqLearning(query, limit = 5) {
            try {
                this.logger.debug(`Searching FAQ Learning for: "${query}"`);
                // Use the enhanced search service for better results
                const searchQuery = {
                    query,
                    options: {
                        limit,
                        includeFaqs: true,
                        includeArticles: false, // Only FAQs for this method
                        sortBy: 'relevance',
                        sortOrder: 'DESC'
                    },
                    filters: {
                        minConfidence: 50 // Only include FAQs with reasonable confidence
                    }
                };
                const searchResponse = await this.faqEnhancedSearchService.search(searchQuery);
                const results = [];
                // Convert search results to FaqLearningResult format
                for (const result of searchResponse.results) {
                    if (result.type === 'faq') {
                        // Get the full FAQ entry for additional data
                        const faqEntry = await this.faqRepository.findOne({
                            where: { id: result.id }
                        });
                        if (faqEntry) {
                            results.push({
                                faqEntry,
                                relevanceScore: result.relevanceScore / 100, // Normalize to 0-1 range
                                matchedContent: result.snippet,
                                confidence: result.confidence || faqEntry.confidence
                            });
                        }
                    }
                }
                this.logger.debug(`Found ${results.length} FAQ Learning results using enhanced search`);
                return results;
            }
            catch (error) {
                this.logger.error(`Error searching FAQ Learning: ${error.message}`, error.stack);
                // Fallback to basic search if enhanced search fails
                return this.searchFaqLearningBasic(query, limit);
            }
        }
        /**
         * Fallback basic FAQ search method
         */
        async searchFaqLearningBasic(query, limit = 5) {
            try {
                this.logger.debug(`Using basic FAQ search for: "${query}"`);
                const searchQuery = this.faqRepository
                    .createQueryBuilder('faq')
                    .where('faq.status IN (:...statuses)', {
                    statuses: [learned_faq_entry_entity_1.FaqEntryStatus.APPROVED, learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED]
                });
                // Search in question, answer, and keywords
                searchQuery.andWhere('(faq.question ILIKE :query OR faq.answer ILIKE :query OR array_to_string(faq.keywords, \' \') ILIKE :query)', { query: `%${query}%` });
                // Order by confidence and usage
                searchQuery
                    .orderBy('faq.confidence', 'DESC')
                    .addOrderBy('faq.usageCount', 'DESC')
                    .addOrderBy('faq.helpfulCount', 'DESC')
                    .take(limit);
                const faqEntries = await searchQuery.getMany();
                const results = [];
                for (const faqEntry of faqEntries) {
                    const relevanceScore = await this.calculateFaqLearningRelevance(faqEntry, query);
                    const matchedContent = this.extractMatchedContent(`${faqEntry.question} ${faqEntry.answer}`, query);
                    results.push({
                        faqEntry,
                        relevanceScore,
                        matchedContent,
                        confidence: faqEntry.confidence
                    });
                }
                // Sort by relevance score
                results.sort((a, b) => b.relevanceScore - a.relevanceScore);
                this.logger.debug(`Found ${results.length} FAQ Learning results using basic search`);
                return results;
            }
            catch (error) {
                this.logger.error(`Error in basic FAQ search: ${error.message}`, error.stack);
                return [];
            }
        }
        /**
         * Search documents within chat session for relevant content
         */
        async searchDocuments(query, sessionId, limit = 3) {
            try {
                this.logger.debug(`Searching documents for session ${sessionId} with query: "${query}"`);
                const searchQuery = this.documentRepository
                    .createQueryBuilder('doc')
                    .where('doc.sessionId = :sessionId', { sessionId })
                    .andWhere('doc.processingStatus = :status', { status: 'completed' })
                    .andWhere('doc.extractedContent IS NOT NULL');
                // Search in extracted content
                searchQuery.andWhere('doc.extractedContent ILIKE :query', { query: `%${query}%` });
                // Order by file size (smaller files might be more focused) and creation date
                searchQuery
                    .orderBy('doc.createdAt', 'DESC')
                    .addOrderBy('doc.fileSize', 'ASC')
                    .take(limit);
                const documents = await searchQuery.getMany();
                const results = [];
                for (const document of documents) {
                    const relevanceScore = await this.calculateDocumentRelevance(document, query);
                    const matchedContent = this.extractMatchedContent(document.extractedContent, query);
                    results.push({
                        document,
                        relevanceScore,
                        matchedContent
                    });
                }
                // Sort by relevance score
                results.sort((a, b) => b.relevanceScore - a.relevanceScore);
                this.logger.debug(`Found ${results.length} document results`);
                return results;
            }
            catch (error) {
                this.logger.error(`Error searching documents: ${error.message}`, error.stack);
                return [];
            }
        }
        /**
         * Calculate relevance score for Knowledge Base articles
         */
        async calculateKnowledgeBaseRelevance(article, query) {
            let score = 0;
            const queryLower = query.toLowerCase();
            const titleLower = article.title.toLowerCase();
            const contentLower = article.content.toLowerCase();
            const summaryLower = (article.summary || '').toLowerCase();
            // Title match (highest weight)
            if (titleLower.includes(queryLower)) {
                score += 0.4;
            }
            // Summary match (high weight)
            if (summaryLower.includes(queryLower)) {
                score += 0.3;
            }
            // Content match (medium weight)
            if (contentLower.includes(queryLower)) {
                score += 0.2;
            }
            // Tags match
            if (article.tags && article.tags.some(tag => tag.toLowerCase().includes(queryLower))) {
                score += 0.15;
            }
            // Quality factors
            const qualityScore = this.calculateQualityScore(article.viewCount, article.helpfulCount, article.notHelpfulCount, article.searchScore);
            score += qualityScore * 0.1;
            // Normalize to 0-1 range
            return Math.min(1, Math.max(0, score));
        }
        /**
         * Calculate relevance score for FAQ Learning entries
         */
        async calculateFaqLearningRelevance(faqEntry, query) {
            let score = 0;
            const queryLower = query.toLowerCase();
            const questionLower = faqEntry.question.toLowerCase();
            const answerLower = faqEntry.answer.toLowerCase();
            // Question match (highest weight)
            if (questionLower.includes(queryLower)) {
                score += 0.5;
            }
            // Answer match (high weight)
            if (answerLower.includes(queryLower)) {
                score += 0.3;
            }
            // Keywords match
            if (faqEntry.keywords && faqEntry.keywords.some(keyword => keyword.toLowerCase().includes(queryLower))) {
                score += 0.2;
            }
            // Confidence factor (FAQ system's own confidence)
            score += (faqEntry.confidence / 100) * 0.15;
            // Usage and feedback factors
            const usageScore = Math.min(1, faqEntry.usageCount / 10) * 0.05;
            const feedbackScore = faqEntry.feedbackCount > 0 ? faqEntry.helpfulnessRatio * 0.05 : 0;
            score += usageScore + feedbackScore;
            // Normalize to 0-1 range
            return Math.min(1, Math.max(0, score));
        }
        /**
         * Calculate relevance score for documents
         */
        async calculateDocumentRelevance(document, query) {
            let score = 0;
            const queryLower = query.toLowerCase();
            const contentLower = (document.extractedContent || '').toLowerCase();
            const filenameLower = document.filename.toLowerCase();
            // Filename match (high weight)
            if (filenameLower.includes(queryLower)) {
                score += 0.3;
            }
            // Content match frequency
            const matches = (contentLower.match(new RegExp(queryLower, 'g')) || []).length;
            const contentLength = contentLower.length;
            if (contentLength > 0) {
                const matchDensity = matches / (contentLength / 1000); // matches per 1000 characters
                score += Math.min(0.5, matchDensity * 0.1);
            }
            // File type relevance (some file types might be more relevant)
            const fileTypeScore = this.getFileTypeRelevanceScore(document.fileType);
            score += fileTypeScore * 0.1;
            // Recency factor (newer documents might be more relevant)
            const daysSinceCreation = (Date.now() - document.createdAt.getTime()) / (1000 * 60 * 60 * 24);
            const recencyScore = Math.max(0, 1 - (daysSinceCreation / 30)); // Decay over 30 days
            score += recencyScore * 0.1;
            // Normalize to 0-1 range
            return Math.min(1, Math.max(0, score));
        }
        /**
         * Rank context sources by relevance and diversity
         */
        async rankSources(sources, _query) {
            // Sort by relevance score first
            const sortedSources = sources.sort((a, b) => b.relevanceScore - a.relevanceScore);
            // Apply diversity scoring to avoid too many sources of the same type
            const rankedSources = [];
            const typeCount = {
                [chat_context_source_entity_1.ContextSourceType.KNOWLEDGE_BASE]: 0,
                [chat_context_source_entity_1.ContextSourceType.FAQ_LEARNING]: 0,
                [chat_context_source_entity_1.ContextSourceType.DOCUMENT]: 0,
                [chat_context_source_entity_1.ContextSourceType.URL]: 0
            };
            for (const source of sortedSources) {
                // Apply diversity penalty if we have too many of this type
                let diversityPenalty = 0;
                const currentTypeCount = typeCount[source.type];
                if (currentTypeCount >= 3) {
                    diversityPenalty = 0.1 * (currentTypeCount - 2);
                }
                const adjustedScore = Math.max(0, source.relevanceScore - diversityPenalty);
                rankedSources.push({
                    ...source,
                    relevanceScore: adjustedScore
                });
                typeCount[source.type]++;
            }
            // Final sort by adjusted scores
            return rankedSources.sort((a, b) => b.relevanceScore - a.relevanceScore);
        }
        /**
         * Extract matched content snippet around the query
         */
        extractMatchedContent(content, query, maxLength = 300) {
            const queryLower = query.toLowerCase();
            const contentLower = content.toLowerCase();
            const matchIndex = contentLower.indexOf(queryLower);
            if (matchIndex === -1) {
                // No direct match, return beginning of content
                return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
            }
            // Extract content around the match
            const start = Math.max(0, matchIndex - 100);
            const end = Math.min(content.length, matchIndex + query.length + 200);
            let snippet = content.substring(start, end);
            // Add ellipsis if we truncated
            if (start > 0)
                snippet = '...' + snippet;
            if (end < content.length)
                snippet = snippet + '...';
            return snippet;
        }
        /**
         * Calculate quality score based on engagement metrics
         */
        calculateQualityScore(viewCount, helpfulCount, notHelpfulCount, searchScore) {
            const totalFeedback = helpfulCount + notHelpfulCount;
            const helpfulnessRatio = totalFeedback > 0 ? helpfulCount / totalFeedback : 0.5;
            const viewScore = Math.min(1, viewCount / 100); // Normalize views
            const feedbackScore = helpfulnessRatio;
            const searchScoreNormalized = searchScore / 100;
            return (viewScore * 0.3 + feedbackScore * 0.4 + searchScoreNormalized * 0.3);
        }
        /**
         * Get relevance score based on file type
         */
        getFileTypeRelevanceScore(fileType) {
            const typeScores = {
                'pdf': 0.9,
                'docx': 0.8,
                'txt': 0.7,
                'md': 0.8,
                'xlsx': 0.6
            };
            return typeScores[fileType.toLowerCase()] || 0.5;
        }
        /**
         * Store context sources for tracking and analytics
         */
        async storeContextSources(sessionId, sources, query) {
            try {
                const contextSources = sources.map(source => {
                    const contextSource = new chat_context_source_entity_1.ChatContextSource();
                    contextSource.sessionId = sessionId;
                    contextSource.sourceType = source.type;
                    contextSource.sourceId = source.sourceId || source.id;
                    contextSource.content = source.content;
                    contextSource.relevanceScore = source.relevanceScore;
                    contextSource.metadata = {
                        title: source.title,
                        url: source.url,
                        ...source.metadata,
                        searchQuery: query
                    };
                    return contextSource;
                });
                await this.contextSourceRepository.save(contextSources);
                this.logger.debug(`Stored ${contextSources.length} context sources for session ${sessionId}`);
            }
            catch (error) {
                this.logger.error(`Error storing context sources: ${error.message}`, error.stack);
                // Don't throw error as this is not critical for the main functionality
            }
        }
        /**
         * Map Knowledge Base result to ContextSource
         */
        mapKnowledgeBaseToContextSource(result) {
            return {
                id: result.article.id,
                type: chat_context_source_entity_1.ContextSourceType.KNOWLEDGE_BASE,
                title: result.article.title,
                content: result.matchedContent,
                relevanceScore: result.relevanceScore,
                sourceId: result.article.id,
                url: `/knowledge-base/${result.article.slug}`,
                metadata: {
                    category: result.article.category?.name,
                    author: result.article.author?.firstName + ' ' + result.article.author?.lastName,
                    viewCount: result.article.viewCount,
                    helpfulCount: result.article.helpfulCount,
                    tags: result.article.tags,
                    publishedAt: result.article.publishedAt,
                    summary: result.article.summary
                }
            };
        }
        /**
         * Map FAQ Learning result to ContextSource
         */
        mapFaqLearningToContextSource(result) {
            return {
                id: result.faqEntry.id,
                type: chat_context_source_entity_1.ContextSourceType.FAQ_LEARNING,
                title: result.faqEntry.question,
                content: result.matchedContent,
                relevanceScore: result.relevanceScore,
                sourceId: result.faqEntry.id,
                metadata: {
                    answer: result.faqEntry.answer,
                    category: result.faqEntry.category,
                    confidence: result.faqEntry.confidence,
                    usageCount: result.faqEntry.usageCount,
                    helpfulCount: result.faqEntry.helpfulCount,
                    keywords: result.faqEntry.keywords,
                    source: result.faqEntry.source,
                    status: result.faqEntry.status
                }
            };
        }
        /**
         * Map Document result to ContextSource
         */
        mapDocumentToContextSource(result) {
            return {
                id: result.document.id,
                type: chat_context_source_entity_1.ContextSourceType.DOCUMENT,
                title: result.document.filename,
                content: result.matchedContent,
                relevanceScore: result.relevanceScore,
                sourceId: result.document.id,
                metadata: {
                    fileType: result.document.fileType,
                    fileSize: result.document.fileSize,
                    uploadedAt: result.document.createdAt,
                    processingStatus: result.document.processingStatus,
                    fullContent: result.document.extractedContent
                }
            };
        }
        /**
         * Get context sources for a specific session
         */
        async getSessionContextSources(sessionId, messageId) {
            const query = this.contextSourceRepository
                .createQueryBuilder('source')
                .where('source.sessionId = :sessionId', { sessionId });
            if (messageId) {
                query.andWhere('source.messageId = :messageId', { messageId });
            }
            query.orderBy('source.relevanceScore', 'DESC')
                .addOrderBy('source.createdAt', 'DESC');
            return await query.getMany();
        }
        /**
         * Get context statistics for analytics
         */
        async getContextStatistics(sessionId) {
            const query = this.contextSourceRepository.createQueryBuilder('source');
            if (sessionId) {
                query.where('source.sessionId = :sessionId', { sessionId });
            }
            const sources = await query.getMany();
            const sourcesByType = sources.reduce((acc, source) => {
                acc[source.sourceType] = (acc[source.sourceType] || 0) + 1;
                return acc;
            }, {});
            const averageRelevanceScore = sources.length > 0
                ? sources.reduce((sum, source) => sum + source.relevanceScore, 0) / sources.length
                : 0;
            // Extract categories from metadata
            const categoryCount = {};
            sources.forEach(source => {
                const category = source.metadata?.category;
                if (category) {
                    categoryCount[category] = (categoryCount[category] || 0) + 1;
                }
            });
            const topCategories = Object.entries(categoryCount)
                .map(([category, count]) => ({ category, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10);
            return {
                totalSources: sources.length,
                sourcesByType,
                averageRelevanceScore,
                topCategories
            };
        }
    };
    return ChatContextEngineService = _classThis;
})();
exports.ChatContextEngineService = ChatContextEngineService;
//# sourceMappingURL=chat-context-engine.service.js.map