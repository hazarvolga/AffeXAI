import { ReviewQueueService, ReviewQueueResponse } from '../services/review-queue.service';
export declare class ReviewQueueQueryDto {
    status?: string;
    confidence_min?: number;
    confidence_max?: number;
    source?: string;
    category?: string;
    date_from?: string;
    date_to?: string;
    reviewed_by?: string;
    created_by?: string;
    page?: number;
    limit?: number;
    sort_by?: 'createdAt' | 'confidence' | 'usageCount' | 'helpfulCount';
    sort_order?: 'ASC' | 'DESC';
}
export declare class ReviewDecisionDto {
    action: 'approve' | 'reject' | 'publish' | 'edit';
    reason?: string;
    editedAnswer?: string;
    editedCategory?: string;
    editedKeywords?: string[];
}
export declare class BulkReviewDto {
    faqIds: string[];
    action: 'approve' | 'reject' | 'publish';
    reason?: string;
}
export declare class ReviewManagementController {
    private readonly reviewQueueService;
    private readonly logger;
    constructor(reviewQueueService: ReviewQueueService);
    getReviewQueue(query: ReviewQueueQueryDto): Promise<ReviewQueueResponse>;
    getReviewStats(): Promise<{
        total: number;
        pendingReview: number;
        approved: number;
        rejected: number;
        published: number;
        averageConfidence: number;
        topCategories: Array<{
            category: string;
            count: number;
        }>;
        reviewerStats: Array<{
            reviewerId: string;
            reviewerName: string;
            reviewCount: number;
        }>;
    }>;
    reviewFaq(faqId: string, dto: ReviewDecisionDto, user: any): Promise<{
        success: boolean;
        message: string;
        faq: {
            id: string;
            status: string;
            reviewedAt: Date;
            reviewedBy: string;
        };
    }>;
    bulkReview(dto: BulkReviewDto, user: any): Promise<{
        success: boolean;
        message: string;
        results: {
            successful: string[];
            failed: Array<{
                faqId: string;
                error: string;
            }>;
        };
    }>;
    getReviewHistory(faqId: string): Promise<{
        faqId: string;
        history: Array<{
            action: string;
            reviewerId: string;
            reviewerName: string;
            reviewedAt: Date;
            reason?: string;
        }>;
    }>;
    autoPublishHighConfidenceFaqs(): Promise<{
        success: boolean;
        message: string;
        publishedCount: number;
    }>;
    getAvailableCategories(): Promise<{
        categories: Array<{
            name: string;
            count: number;
        }>;
    }>;
    getReviewers(): Promise<{
        reviewers: Array<{
            id: string;
            name: string;
            email: string;
            reviewCount: number;
        }>;
    }>;
    getReviewAnalytics(period?: 'day' | 'week' | 'month' | 'year'): Promise<{
        period: string;
        totalReviews: number;
        approvalRate: number;
        rejectionRate: number;
        averageReviewTime: number;
        topReviewers: Array<{
            reviewerId: string;
            reviewerName: string;
            reviewCount: number;
        }>;
        reviewTrends: Array<{
            date: string;
            approved: number;
            rejected: number;
            published: number;
        }>;
    }>;
    setReviewPriority(faqId: string, body: {
        priority: 'low' | 'medium' | 'high' | 'urgent';
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    assignReviewer(faqId: string, body: {
        reviewerId: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=review-management.controller.d.ts.map