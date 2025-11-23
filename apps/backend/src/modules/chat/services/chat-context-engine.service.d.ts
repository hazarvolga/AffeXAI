import { Repository } from 'typeorm';
import { ChatContextSource, ContextSourceType } from '../entities/chat-context-source.entity';
import { ChatDocument } from '../entities/chat-document.entity';
import { KnowledgeBaseArticle } from '../../tickets/entities/knowledge-base-article.entity';
import { LearnedFaqEntry } from '../../faq-learning/entities/learned-faq-entry.entity';
import { LearningPattern } from '../../faq-learning/entities/learning-pattern.entity';
import { FaqEnhancedSearchService } from '../../faq-learning/services/faq-enhanced-search.service';
export interface ContextResult {
    sources: ContextSource[];
    totalRelevanceScore: number;
    searchQuery: string;
    processingTime: number;
}
export interface ContextSource {
    id: string;
    type: ContextSourceType;
    title: string;
    content: string;
    relevanceScore: number;
    metadata: Record<string, any>;
    url?: string;
    sourceId?: string;
}
export interface KnowledgeBaseResult {
    article: KnowledgeBaseArticle;
    relevanceScore: number;
    matchedContent: string;
}
export interface FaqLearningResult {
    faqEntry: LearnedFaqEntry;
    relevanceScore: number;
    matchedContent: string;
    confidence: number;
}
export interface DocumentResult {
    document: ChatDocument;
    relevanceScore: number;
    matchedContent: string;
}
export declare class ChatContextEngineService {
    private readonly contextSourceRepository;
    private readonly documentRepository;
    private readonly knowledgeBaseRepository;
    private readonly faqRepository;
    private readonly patternRepository;
    private readonly faqEnhancedSearchService;
    private readonly logger;
    constructor(contextSourceRepository: Repository<ChatContextSource>, documentRepository: Repository<ChatDocument>, knowledgeBaseRepository: Repository<KnowledgeBaseArticle>, faqRepository: Repository<LearnedFaqEntry>, patternRepository: Repository<LearningPattern>, faqEnhancedSearchService: FaqEnhancedSearchService);
    /**
     * Build comprehensive context from multiple sources
     */
    buildContext(query: string, sessionId: string, options?: {
        maxSources?: number;
        minRelevanceScore?: number;
        includeKnowledgeBase?: boolean;
        includeFaqLearning?: boolean;
        includeDocuments?: boolean;
    }): Promise<ContextResult>;
    /**
     * Search Knowledge Base articles for relevant content
     */
    searchKnowledgeBase(query: string, limit?: number): Promise<KnowledgeBaseResult[]>;
    /**
     * Search FAQ Learning entries for relevant content using enhanced search
     */
    searchFaqLearning(query: string, limit?: number): Promise<FaqLearningResult[]>;
    /**
     * Fallback basic FAQ search method
     */
    private searchFaqLearningBasic;
    /**
     * Search documents within chat session for relevant content
     */
    searchDocuments(query: string, sessionId: string, limit?: number): Promise<DocumentResult[]>;
    /**
     * Calculate relevance score for Knowledge Base articles
     */
    private calculateKnowledgeBaseRelevance;
    /**
     * Calculate relevance score for FAQ Learning entries
     */
    private calculateFaqLearningRelevance;
    /**
     * Calculate relevance score for documents
     */
    private calculateDocumentRelevance;
    /**
     * Rank context sources by relevance and diversity
     */
    rankSources(sources: ContextSource[], _query: string): Promise<ContextSource[]>;
    /**
     * Extract matched content snippet around the query
     */
    private extractMatchedContent;
    /**
     * Calculate quality score based on engagement metrics
     */
    private calculateQualityScore;
    /**
     * Get relevance score based on file type
     */
    private getFileTypeRelevanceScore;
    /**
     * Store context sources for tracking and analytics
     */
    private storeContextSources;
    /**
     * Map Knowledge Base result to ContextSource
     */
    private mapKnowledgeBaseToContextSource;
    /**
     * Map FAQ Learning result to ContextSource
     */
    private mapFaqLearningToContextSource;
    /**
     * Map Document result to ContextSource
     */
    private mapDocumentToContextSource;
    /**
     * Get context sources for a specific session
     */
    getSessionContextSources(sessionId: string, messageId?: string): Promise<ChatContextSource[]>;
    /**
     * Get context statistics for analytics
     */
    getContextStatistics(sessionId?: string): Promise<{
        totalSources: number;
        sourcesByType: Record<ContextSourceType, number>;
        averageRelevanceScore: number;
        topCategories: Array<{
            category: string;
            count: number;
        }>;
    }>;
}
//# sourceMappingURL=chat-context-engine.service.d.ts.map