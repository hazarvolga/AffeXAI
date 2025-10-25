import { Repository } from 'typeorm';
import { ChatContextEngineService, ContextResult, ContextSource } from './chat-context-engine.service';
import { KnowledgeBaseArticle } from '../../tickets/entities/knowledge-base-article.entity';
export interface GeneralContextOptions {
    maxSources?: number;
    minRelevanceScore?: number;
    focusOnPlatformInfo?: boolean;
    includeGettingStarted?: boolean;
    includeFeatureGuides?: boolean;
    includeTroubleshooting?: boolean;
}
export interface PlatformInfoSource extends ContextSource {
    category: 'getting-started' | 'features' | 'troubleshooting' | 'general-help' | 'platform-docs';
    priority: number;
}
export declare class GeneralCommunicationContextService {
    private readonly knowledgeBaseRepository;
    private readonly chatContextEngineService;
    private readonly logger;
    private readonly PLATFORM_CATEGORIES;
    private readonly PLATFORM_KEYWORDS;
    constructor(knowledgeBaseRepository: Repository<KnowledgeBaseArticle>, chatContextEngineService: ChatContextEngineService);
    /**
     * Build context specifically for general communication
     * Focuses on platform information, getting started guides, and general help
     */
    buildGeneralContext(query: string, sessionId: string, options?: GeneralContextOptions): Promise<ContextResult>;
    /**
     * Search Knowledge Base specifically for platform information
     */
    private searchPlatformKnowledgeBase;
    /**
     * Calculate relevance score specifically for platform content
     */
    private calculatePlatformRelevance;
    /**
     * Categorize platform content for better organization
     */
    private categorizePlatformContent;
    /**
     * Get priority score for different types of platform content
     */
    private getPlatformContentPriority;
    /**
     * Map FAQ results to general communication sources
     */
    private mapFaqToGeneralSource;
    /**
     * Rank sources specifically for general communication
     */
    private rankGeneralSources;
    /**
     * Extract matched content snippet around the query
     */
    private extractMatchedContent;
    /**
     * Calculate quality score based on engagement metrics
     */
    private calculateQualityScore;
    /**
     * Detect if a query is asking for general platform information
     */
    isPlatformInformationQuery(query: string): boolean;
    /**
     * Get suggested topics for general communication
     */
    getSuggestedTopics(limit?: number): Promise<Array<{
        title: string;
        category: string;
        description: string;
        url?: string;
    }>>;
}
//# sourceMappingURL=general-communication-context.service.d.ts.map