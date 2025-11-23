import { Repository } from 'typeorm';
import { LearnedFaqEntry } from '../entities/learned-faq-entry.entity';
import { KnowledgeBaseArticle } from '../../tickets/entities/knowledge-base-article.entity';
import { KnowledgeBaseCategory } from '../../tickets/entities/knowledge-base-category.entity';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
export interface FaqToArticleMapping {
    faqId: string;
    articleId: string;
    mappingType: 'direct' | 'merged' | 'referenced';
    createdAt: Date;
}
export interface CategorySuggestion {
    categoryId: string;
    categoryName: string;
    confidence: number;
    reasoning: string[];
}
export interface ArticleConversionResult {
    success: boolean;
    articleId?: string;
    article?: KnowledgeBaseArticle;
    mapping?: FaqToArticleMapping;
    error?: string;
    warnings?: string[];
}
export interface IntegrationStats {
    totalFaqs: number;
    convertedToArticles: number;
    pendingConversion: number;
    categorySuggestions: number;
    lastSync: Date;
}
export declare class KnowledgeBaseIntegratorService {
    private faqRepository;
    private articleRepository;
    private categoryRepository;
    private configRepository;
    private readonly logger;
    constructor(faqRepository: Repository<LearnedFaqEntry>, articleRepository: Repository<KnowledgeBaseArticle>, categoryRepository: Repository<KnowledgeBaseCategory>, configRepository: Repository<FaqLearningConfig>);
    convertFaqToArticle(faqId: string, options?: {
        categoryId?: string;
        authorId?: string;
        publishImmediately?: boolean;
        customTitle?: string;
        customContent?: string;
    }): Promise<ArticleConversionResult>;
    suggestCategory(question: string, answer: string, currentCategory?: string): Promise<CategorySuggestion | null>;
    bulkConvertFaqs(faqIds: string[], options?: {
        authorId?: string;
        publishImmediately?: boolean;
        defaultCategoryId?: string;
    }): Promise<{
        successful: ArticleConversionResult[];
        failed: Array<{
            faqId: string;
            error: string;
        }>;
    }>;
    syncFaqUpdates(): Promise<{
        updated: number;
        errors: Array<{
            faqId: string;
            error: string;
        }>;
    }>;
    getIntegrationStats(): Promise<IntegrationStats>;
    getCategorySuggestions(limit?: number): Promise<Array<{
        faq: LearnedFaqEntry;
        suggestions: CategorySuggestion[];
    }>>;
    private findExistingMapping;
    private buildArticleContent;
    private generateArticleTitle;
    private generateSummary;
    private generateSlug;
    private checkCategoryPatterns;
}
//# sourceMappingURL=knowledge-base-integrator.service.d.ts.map