import { KnowledgeBaseService } from '../services/knowledge-base.service';
import type { CreateArticleDto, UpdateArticleDto, ArticleSearchFilters } from '../services/knowledge-base.service';
/**
 * Knowledge Base Controller
 * Manages self-service help articles
 */
export declare class KnowledgeBaseController {
    private readonly knowledgeBaseService;
    constructor(knowledgeBaseService: KnowledgeBaseService);
    /**
     * Create a new article (ADMIN/EDITOR only)
     */
    createArticle(dto: CreateArticleDto, authorId: string): Promise<import("../entities/knowledge-base-article.entity").KnowledgeBaseArticle>;
    /**
     * Update an article (ADMIN/EDITOR only)
     */
    updateArticle(id: string, dto: UpdateArticleDto): Promise<import("../entities/knowledge-base-article.entity").KnowledgeBaseArticle>;
    /**
     * Delete an article (ADMIN only)
     */
    deleteArticle(id: string): Promise<{
        message: string;
    }>;
    /**
     * Get article by ID (Public for published, auth for draft)
     */
    getArticle(id: string): Promise<import("../entities/knowledge-base-article.entity").KnowledgeBaseArticle>;
    /**
     * Get article by slug (Public)
     */
    getArticleBySlug(slug: string): Promise<import("../entities/knowledge-base-article.entity").KnowledgeBaseArticle>;
    /**
     * Search articles (Public)
     */
    searchArticles(filters: ArticleSearchFilters): Promise<{
        articles: import("../entities/knowledge-base-article.entity").KnowledgeBaseArticle[];
        total: number;
    }>;
    /**
     * Get featured articles (Public)
     */
    getFeaturedArticles(limit?: string): Promise<import("../entities/knowledge-base-article.entity").KnowledgeBaseArticle[]>;
    /**
     * Get popular articles (Public)
     */
    getPopularArticles(limit?: string): Promise<import("../entities/knowledge-base-article.entity").KnowledgeBaseArticle[]>;
    /**
     * Get related articles (Public)
     */
    getRelatedArticles(id: string, limit?: string): Promise<import("../entities/knowledge-base-article.entity").KnowledgeBaseArticle[]>;
    /**
     * Mark article as helpful/not helpful (Public)
     */
    markHelpful(id: string, body: {
        isHelpful: boolean;
    }): Promise<import("../entities/knowledge-base-article.entity").KnowledgeBaseArticle>;
    /**
     * Get knowledge base statistics (ADMIN/EDITOR only)
     */
    getStatistics(): Promise<{
        total: number;
        published: number;
        draft: number;
        archived: number;
        totalViews: number;
        avgHelpfulness: number;
    }>;
}
//# sourceMappingURL=knowledge-base.controller.d.ts.map