import { BaseEntity } from '../../../database/entities/base.entity';
import { KnowledgeBaseArticle } from './knowledge-base-article.entity';
import { User } from '../../users/entities/user.entity';
/**
 * Knowledge Base Category Entity
 * Organizes KB articles into hierarchical categories
 */
export declare class KnowledgeBaseCategory extends BaseEntity {
    name: string;
    description?: string;
    slug: string;
    color: string;
    icon: string;
    sortOrder: number;
    isActive: boolean;
    parentId?: string;
    parent?: KnowledgeBaseCategory;
    children: KnowledgeBaseCategory[];
    articleCount: number;
    createdBy: string;
    updatedBy: string;
    createdByUser: User;
    updatedByUser: User;
    articles: KnowledgeBaseArticle[];
}
//# sourceMappingURL=knowledge-base-category.entity.d.ts.map