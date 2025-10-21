import { Repository } from 'typeorm';
import { KnowledgeBaseArticle } from '../entities/knowledge-base-article.entity';
/**
 * Knowledge Base Service
 * Manages self-service help articles
 */
export interface CreateArticleDto {
    title: string;
    content: string;
    summary?: string;
    categoryId?: string;
    tags?: string[];
    isFeatured?: boolean;
    status?: 'draft' | 'published' | 'archived';
}
export interface UpdateArticleDto {
    title?: string;
    content?: string;
    summary?: string;
    categoryId?: string;
    tags?: string[];
    isFeatured?: boolean;
    status?: 'draft' | 'published' | 'archived';
}
export interface ArticleSearchFilters {
    query?: string;
    categoryId?: string;
    tags?: string[];
    status?: string;
    isFeatured?: boolean;
    limit?: number;
    offset?: number;
}
export declare class KnowledgeBaseService {
    private readonly articleRepository;
    private readonly logger;
    constructor(articleRepository: Repository<KnowledgeBaseArticle>);
    /**
     * Create a new article
     */
    createArticle(authorId: string, dto: CreateArticleDto): Promise<KnowledgeBaseArticle>;
    /**
     * Update an article
     */
    updateArticle(id: string, dto: UpdateArticleDto): Promise<KnowledgeBaseArticle>;
    /**
     * Delete an article
     */
    deleteArticle(id: string): Promise<void>;
    /**
     * Get article by ID
     */
    getArticle(id: string): Promise<KnowledgeBaseArticle>;
    /**
     * Get article by slug
     */
    getArticleBySlug(slug: string): Promise<KnowledgeBaseArticle>;
    /**
     * Search articles
     */
    searchArticles(filters: ArticleSearchFilters): Promise<{
        articles: KnowledgeBaseArticle[];
        total: number;
    }>;
    /**
     * Get featured articles
     */
    getFeaturedArticles(limit?: number): Promise<KnowledgeBaseArticle[]>;
    /**
     * Get popular articles
     */
    getPopularArticles(limit?: number): Promise<KnowledgeBaseArticle[]>;
    /**
     * Get related articles
     */
    getRelatedArticles(articleId: string, limit?: number): Promise<KnowledgeBaseArticle[]>;
    /**
     * Mark article as helpful
     */
    markHelpful(id: string, isHelpful: boolean): Promise<KnowledgeBaseArticle>;
    /**
     * Get article statistics
     */
    getStatistics(): Promise<{
        total: number;
        published: number;
        draft: number;
        archived: number;
        totalViews: number;
        avgHelpfulness: number;
    }>;
    /**
     * Generate URL-friendly slug from title
     */
    private generateSlug;
}
//# sourceMappingURL=knowledge-base.service.d.ts.map