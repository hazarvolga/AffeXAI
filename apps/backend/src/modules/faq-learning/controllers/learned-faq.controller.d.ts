import { Repository } from 'typeorm';
import { LearnedFaqEntry } from '../entities/learned-faq-entry.entity';
import { FeedbackProcessorService } from '../services/feedback-processor.service';
export declare class SearchFaqsDto {
    query?: string;
    category?: string;
    categories?: string;
    limit?: number;
    offset?: number;
    sort_by?: 'relevance' | 'popularity' | 'recent' | 'helpful';
    include_related?: boolean;
}
export declare class FaqFeedbackDto {
    feedbackType: 'helpful' | 'not_helpful' | 'suggestion' | 'correction';
    rating?: number;
    comment?: string;
    suggestedAnswer?: string;
    suggestedCategory?: string;
    suggestedKeywords?: string[];
}
export declare class FaqSearchResult {
    id: string;
    question: string;
    answer: string;
    category?: string;
    keywords: string[];
    usageCount: number;
    helpfulCount: number;
    notHelpfulCount: number;
    helpfulnessRatio: number;
    confidence: number;
    createdAt: Date;
    relatedFaqs?: Array<{
        id: string;
        question: string;
        similarity: number;
    }>;
}
export declare class LearnedFaqController {
    private faqRepository;
    private feedbackProcessor;
    private readonly logger;
    constructor(faqRepository: Repository<LearnedFaqEntry>, feedbackProcessor: FeedbackProcessorService);
    searchFaqs(dto: SearchFaqsDto): Promise<{
        faqs: FaqSearchResult[];
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    }>;
    getCategories(): Promise<{
        categories: Array<{
            name: string;
            count: number;
            description?: string;
        }>;
    }>;
    getPopularFaqs(limit?: number, category?: string): Promise<{
        faqs: FaqSearchResult[];
    }>;
    getRecentFaqs(limit?: number, category?: string): Promise<{
        faqs: FaqSearchResult[];
    }>;
    getFaqById(id: string): Promise<{
        faq: FaqSearchResult & {
            relatedFaqs: Array<{
                id: string;
                question: string;
                similarity: number;
            }>;
        };
    }>;
    submitFeedback(faqId: string, dto: FaqFeedbackDto, user?: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getRelatedFaqs(faqId: string, limit?: number): Promise<{
        relatedFaqs: Array<{
            id: string;
            question: string;
            answer: string;
            category?: string;
            similarity: number;
            usageCount: number;
        }>;
    }>;
    getFaqStats(): Promise<{
        totalFaqs: number;
        totalCategories: number;
        mostPopularCategory: string;
        averageHelpfulness: number;
        recentlyAdded: number;
    }>;
    private findRelatedFaqs;
}
//# sourceMappingURL=learned-faq.controller.d.ts.map