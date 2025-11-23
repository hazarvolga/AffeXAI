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
exports.FaqEnhancedSearchService = void 0;
const common_1 = require("@nestjs/common");
const learned_faq_entry_entity_1 = require("../entities/learned-faq-entry.entity");
let FaqEnhancedSearchService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FaqEnhancedSearchService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FaqEnhancedSearchService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        faqRepository;
        articleRepository;
        logger = new common_1.Logger(FaqEnhancedSearchService.name);
        searchCache = new Map();
        CACHE_TTL = 5 * 60 * 1000; // 5 minutes
        constructor(faqRepository, articleRepository) {
            this.faqRepository = faqRepository;
            this.articleRepository = articleRepository;
        }
        async search(searchQuery) {
            const startTime = Date.now();
            try {
                this.logger.log(`Searching for: "${searchQuery.query}"`);
                // Check cache
                const cacheKey = this.generateCacheKey(searchQuery);
                const cached = this.searchCache.get(cacheKey);
                if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
                    this.logger.log('Returning cached results');
                    return cached.results;
                }
                const options = {
                    limit: searchQuery.options?.limit || 10,
                    offset: searchQuery.options?.offset || 0,
                    includeFaqs: searchQuery.options?.includeFaqs !== false,
                    includeArticles: searchQuery.options?.includeArticles !== false,
                    sortBy: searchQuery.options?.sortBy || 'relevance',
                    sortOrder: searchQuery.options?.sortOrder || 'DESC'
                };
                // Search FAQs and Articles in parallel
                const [faqResults, articleResults] = await Promise.all([
                    options.includeFaqs ? this.searchFaqs(searchQuery) : Promise.resolve([]),
                    options.includeArticles ? this.searchArticles(searchQuery) : Promise.resolve([])
                ]);
                // Combine and rank results
                let allResults = [...faqResults, ...articleResults];
                // Apply sorting
                allResults = this.sortResults(allResults, options.sortBy, options.sortOrder);
                // Apply pagination
                const total = allResults.length;
                const paginatedResults = allResults.slice(options.offset, options.offset + options.limit);
                // Generate suggestions
                const suggestions = await this.generateSuggestions(searchQuery.query, allResults);
                // Get related FAQs
                const relatedFaqs = await this.getRelatedFaqs(paginatedResults, 3);
                const response = {
                    results: paginatedResults,
                    total,
                    page: Math.floor(options.offset / options.limit) + 1,
                    limit: options.limit,
                    query: searchQuery.query,
                    suggestions,
                    relatedFaqs,
                    processingTime: Date.now() - startTime
                };
                // Cache results
                this.searchCache.set(cacheKey, { results: response, timestamp: Date.now() });
                // Track analytics
                await this.trackSearch(searchQuery, response);
                return response;
            }
            catch (error) {
                this.logger.error('Search failed:', error);
                return {
                    results: [],
                    total: 0,
                    page: 1,
                    limit: searchQuery.options?.limit || 10,
                    query: searchQuery.query,
                    suggestions: [],
                    relatedFaqs: [],
                    processingTime: Date.now() - startTime
                };
            }
        }
        async searchFaqs(searchQuery) {
            try {
                const queryBuilder = this.faqRepository.createQueryBuilder('faq')
                    .where('faq.status = :status', { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED });
                // Full-text search on question and answer
                if (searchQuery.query) {
                    queryBuilder.andWhere(`(
            to_tsvector('english', faq.question) @@ plainto_tsquery('english', :query) OR
            to_tsvector('english', faq.answer) @@ plainto_tsquery('english', :query) OR
            :query = ANY(faq.keywords)
          )`, { query: searchQuery.query });
                }
                // Apply filters
                if (searchQuery.filters?.category && searchQuery.filters.category.length > 0) {
                    queryBuilder.andWhere('faq.category IN (:...categories)', {
                        categories: searchQuery.filters.category
                    });
                }
                if (searchQuery.filters?.minConfidence) {
                    queryBuilder.andWhere('faq.confidence >= :minConfidence', {
                        minConfidence: searchQuery.filters.minConfidence
                    });
                }
                if (searchQuery.filters?.source && searchQuery.filters.source.length > 0) {
                    queryBuilder.andWhere('faq.source IN (:...sources)', {
                        sources: searchQuery.filters.source
                    });
                }
                const faqs = await queryBuilder.getMany();
                // Convert to SearchResult format with relevance scoring
                return faqs.map(faq => {
                    const relevanceScore = this.calculateRelevanceScore(searchQuery.query, faq.question, faq.answer, faq.keywords, faq.confidence, faq.usageCount);
                    return {
                        id: faq.id,
                        type: 'faq',
                        title: faq.question,
                        content: faq.answer,
                        snippet: this.generateSnippet(faq.answer, searchQuery.query),
                        relevanceScore,
                        confidence: faq.confidence,
                        category: faq.category,
                        tags: faq.keywords,
                        url: `/help/faq/${faq.id}`,
                        metadata: {
                            source: faq.source,
                            usageCount: faq.usageCount,
                            helpfulCount: faq.helpfulCount,
                            createdAt: faq.createdAt,
                            updatedAt: faq.updatedAt
                        }
                    };
                });
            }
            catch (error) {
                this.logger.error('FAQ search failed:', error);
                return [];
            }
        }
        async searchArticles(searchQuery) {
            try {
                const queryBuilder = this.articleRepository.createQueryBuilder('article')
                    .where('article.isPublished = :published', { published: true });
                // Full-text search on title and content
                if (searchQuery.query) {
                    queryBuilder.andWhere(`(
            to_tsvector('english', article.title) @@ plainto_tsquery('english', :query) OR
            to_tsvector('english', article.content) @@ plainto_tsquery('english', :query) OR
            to_tsvector('english', article.summary) @@ plainto_tsquery('english', :query)
          )`, { query: searchQuery.query });
                }
                // Apply category filter
                if (searchQuery.filters?.category && searchQuery.filters.category.length > 0) {
                    queryBuilder.andWhere('article.categoryId IN (:...categories)', {
                        categories: searchQuery.filters.category
                    });
                }
                const articles = await queryBuilder.getMany();
                // Convert to SearchResult format
                return articles.map(article => {
                    const relevanceScore = this.calculateRelevanceScore(searchQuery.query, article.title, article.content, article.tags || [], 100, // Articles don't have confidence, use max
                    article.viewCount);
                    return {
                        id: article.id,
                        type: 'article',
                        title: article.title,
                        content: article.content,
                        snippet: this.generateSnippet(article.summary || article.content, searchQuery.query),
                        relevanceScore,
                        category: article.categoryId,
                        tags: article.tags || [],
                        url: `/help/article/${article.id}`,
                        metadata: {
                            usageCount: article.viewCount,
                            helpfulCount: article.helpfulCount,
                            createdAt: article.createdAt,
                            updatedAt: article.updatedAt
                        }
                    };
                });
            }
            catch (error) {
                this.logger.error('Article search failed:', error);
                return [];
            }
        }
        async getRelatedFaqs(results, limit = 5) {
            try {
                if (results.length === 0)
                    return [];
                // Extract keywords from top results
                const keywords = results
                    .slice(0, 3)
                    .flatMap(r => r.tags)
                    .filter((tag, index, self) => self.indexOf(tag) === index)
                    .slice(0, 10);
                if (keywords.length === 0)
                    return [];
                // Find FAQs with similar keywords
                const relatedFaqs = await this.faqRepository
                    .createQueryBuilder('faq')
                    .where('faq.status = :status', { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED })
                    .andWhere('faq.keywords && ARRAY[:...keywords]::text[]', { keywords })
                    .andWhere('faq.id NOT IN (:...excludeIds)', {
                    excludeIds: results.filter(r => r.type === 'faq').map(r => r.id)
                })
                    .orderBy('faq.usageCount', 'DESC')
                    .take(limit)
                    .getMany();
                return relatedFaqs.map(faq => ({
                    id: faq.id,
                    type: 'faq',
                    title: faq.question,
                    content: faq.answer,
                    snippet: this.generateSnippet(faq.answer, ''),
                    relevanceScore: faq.confidence,
                    confidence: faq.confidence,
                    category: faq.category,
                    tags: faq.keywords,
                    url: `/help/faq/${faq.id}`,
                    metadata: {
                        source: faq.source,
                        usageCount: faq.usageCount,
                        helpfulCount: faq.helpfulCount,
                        createdAt: faq.createdAt,
                        updatedAt: faq.updatedAt
                    }
                }));
            }
            catch (error) {
                this.logger.error('Failed to get related FAQs:', error);
                return [];
            }
        }
        calculateRelevanceScore(query, title, content, keywords, confidence, usageCount) {
            let score = 0;
            const queryLower = query.toLowerCase();
            const titleLower = title.toLowerCase();
            const contentLower = content.toLowerCase();
            // Title match (highest weight)
            if (titleLower.includes(queryLower)) {
                score += 50;
            }
            else {
                // Partial word matches in title
                const queryWords = queryLower.split(' ');
                const titleWords = titleLower.split(' ');
                const titleMatches = queryWords.filter(qw => titleWords.some(tw => tw.includes(qw)));
                score += (titleMatches.length / queryWords.length) * 30;
            }
            // Content match
            if (contentLower.includes(queryLower)) {
                score += 20;
            }
            // Keyword match
            const keywordMatches = keywords.filter(k => k.toLowerCase().includes(queryLower) || queryLower.includes(k.toLowerCase()));
            score += Math.min(15, keywordMatches.length * 5);
            // Confidence/quality boost
            score += (confidence / 100) * 10;
            // Popularity boost
            const popularityScore = Math.min(5, Math.log10(usageCount + 1));
            score += popularityScore;
            return Math.min(100, Math.round(score));
        }
        generateSnippet(text, query, maxLength = 200) {
            if (!text)
                return '';
            const queryLower = query.toLowerCase();
            const textLower = text.toLowerCase();
            // Find the position of the query in the text
            const queryIndex = textLower.indexOf(queryLower);
            if (queryIndex === -1) {
                // Query not found, return beginning of text
                return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
            }
            // Calculate snippet boundaries
            const start = Math.max(0, queryIndex - Math.floor(maxLength / 2));
            const end = Math.min(text.length, start + maxLength);
            let snippet = text.substring(start, end);
            // Add ellipsis
            if (start > 0)
                snippet = '...' + snippet;
            if (end < text.length)
                snippet = snippet + '...';
            return snippet;
        }
        sortResults(results, sortBy, sortOrder) {
            const multiplier = sortOrder === 'ASC' ? 1 : -1;
            return results.sort((a, b) => {
                switch (sortBy) {
                    case 'relevance':
                        return (b.relevanceScore - a.relevanceScore) * multiplier;
                    case 'confidence':
                        return ((b.confidence || 0) - (a.confidence || 0)) * multiplier;
                    case 'popularity':
                        return ((b.metadata.usageCount || 0) - (a.metadata.usageCount || 0)) * multiplier;
                    case 'date':
                        return (b.metadata.createdAt.getTime() - a.metadata.createdAt.getTime()) * multiplier;
                    default:
                        return (b.relevanceScore - a.relevanceScore) * multiplier;
                }
            });
        }
        async generateSuggestions(query, results) {
            try {
                const suggestions = [];
                // If no results, suggest similar queries
                if (results.length === 0) {
                    // Get popular FAQs
                    const popularFaqs = await this.faqRepository.find({
                        where: { status: learned_faq_entry_entity_1.FaqEntryStatus.PUBLISHED },
                        order: { usageCount: 'DESC' },
                        take: 5
                    });
                    return popularFaqs.map(faq => faq.question).slice(0, 3);
                }
                // Extract common keywords from top results
                const topResults = results.slice(0, 5);
                const keywordFrequency = {};
                topResults.forEach(result => {
                    result.tags.forEach(tag => {
                        keywordFrequency[tag] = (keywordFrequency[tag] || 0) + 1;
                    });
                });
                // Get most common keywords
                const commonKeywords = Object.entries(keywordFrequency)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([keyword]) => keyword);
                // Generate suggestion queries
                commonKeywords.forEach(keyword => {
                    if (!query.toLowerCase().includes(keyword.toLowerCase())) {
                        suggestions.push(`${query} ${keyword}`);
                    }
                });
                return suggestions.slice(0, 3);
            }
            catch (error) {
                this.logger.error('Failed to generate suggestions:', error);
                return [];
            }
        }
        generateCacheKey(searchQuery) {
            return JSON.stringify({
                query: searchQuery.query,
                filters: searchQuery.filters,
                options: searchQuery.options
            });
        }
        async trackSearch(searchQuery, response) {
            try {
                // In a real implementation, this would save to a search analytics table
                this.logger.log(`Search tracked: "${searchQuery.query}" - ${response.total} results`);
            }
            catch (error) {
                this.logger.warn('Failed to track search:', error);
            }
        }
        async getPopularSearches(limit = 10) {
            // This would query a search analytics table in a real implementation
            return [];
        }
        async getSearchAnalytics(dateRange) {
            // This would aggregate search analytics data in a real implementation
            return {
                totalSearches: 0,
                uniqueQueries: 0,
                averageResults: 0,
                topQueries: [],
                noResultQueries: []
            };
        }
        clearCache() {
            this.searchCache.clear();
            this.logger.log('Search cache cleared');
        }
    };
    return FaqEnhancedSearchService = _classThis;
})();
exports.FaqEnhancedSearchService = FaqEnhancedSearchService;
//# sourceMappingURL=faq-enhanced-search.service.js.map