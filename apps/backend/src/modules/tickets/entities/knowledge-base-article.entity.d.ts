import { User } from '../../users/entities/user.entity';
import { TicketCategory } from './ticket-category.entity';
/**
 * Knowledge Base Article Entity
 * Self-service articles for customers
 */
export declare class KnowledgeBaseArticle {
    id: string;
    title: string;
    content: string;
    summary: string;
    slug: string;
    categoryId: string;
    category: TicketCategory;
    authorId: string;
    author: User;
    tags: string[];
    isPublished: boolean;
    isFeatured: boolean;
    viewCount: number;
    helpfulCount: number;
    notHelpfulCount: number;
    searchScore: number;
    relatedArticleIds: string[];
    metadata: Record<string, any>;
    status: 'draft' | 'published' | 'archived';
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=knowledge-base-article.entity.d.ts.map