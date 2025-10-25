import { Repository } from 'typeorm';
import { LearnedFaqEntry } from '../entities/learned-faq-entry.entity';
import { KnowledgeBaseArticle } from '../../tickets/entities/knowledge-base-article.entity';
export interface SearchQuery {
    query: string;
    filters?: {
        category?: string[];
        minConfidence?: number;
        source?: ('chat' | 'ticket')[];
        tags?: string[];
    };
    options?: {
        limit?: number;
        offset?: number;
        includeFaqs?: boolean;
        includeArticles?: boolean;
        sortBy?: 'relevance' | 'confidence' | 'popularity' | 'date';
        sortOrder?: 'ASC' | 'DESC';
    };
}
export interface SearchResult {
    id: string;
    type: 'faq' | 'article';
    title: string;
    content: string;
    snippet: string;
    relevanceScore: number;
    confidence?: number;
    category?: string;
    tags: string[];
    url: string;
    metadata: {
        source?: string;
        usageCount?: number;
        helpfulCount?: number;
        createdAt: Date;
        updatedAt: Date;
    };
}
export interface SearchResponse {
    results: SearchResult[];
    total: number;
    page: number;
    limit: number;
    query: string;
    suggestions: string[];
    relatedFaqs: SearchResult[];
    processingTime: number;
}
export interface SearchAnalytics {
    query: string;
    resultCount: number;
    clickedResults: string[];
    timestamp: Date;
    userId?: string;
    sessionId?: string;
}
export declare class FaqEnhancedSearchService {
    private faqRepository;
    private articleRepository;
    private readonly logger;
    private searchCache;
    private readonly CACHE_TTL;
    constructor(faqRepository: Repository<LearnedFaqEntry>, articleRepository: Repository<KnowledgeBaseArticle>);
    search(searchQuery: SearchQuery): Promise<SearchResponse>;
    searchFaqs(searchQuery: SearchQuery): Promise<SearchResult[]>;
    searchArticles(searchQuery: SearchQuery): Promise<SearchResult[]>;
    getRelatedFaqs(results: SearchResult[], limit?: number): Promise<SearchResult[]>;
    private calculateRelevanceScore;
    private generateSnippet;
    private sortResults;
    private generateSuggestions;
    private generateCacheKey;
    private trackSearch;
    getPopularSearches(limit?: number): Promise<Array<{
        query: string;
        count: number;
    }>>;
    getSearchAnalytics(dateRange: {
        from: Date;
        to: Date;
    }): Promise<{
        totalSearches: number;
        uniqueQueries: number;
        averageResults: number;
        topQueries: Array<{
            query: string;
            count: number;
        }>;
        noResultQueries: Array<{
            query: string;
            count: number;
        }>;
    }>;
    clearCache(): void;
}
//# sourceMappingURL=faq-enhanced-search.service.d.ts.map