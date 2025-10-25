import { Repository } from 'typeorm';
import { LearnedFaqEntry, FaqEntryStatus } from '../entities/learned-faq-entry.entity';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
import { User } from '../../users/entities/user.entity';
export interface ReviewQueueFilters {
    status?: FaqEntryStatus[];
    confidence?: {
        min?: number;
        max?: number;
    };
    source?: ('chat' | 'ticket')[];
    category?: string[];
    dateRange?: {
        from: Date;
        to: Date;
    };
    reviewedBy?: string;
    createdBy?: string;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'confidence' | 'usageCount' | 'helpfulCount';
    sortOrder?: 'ASC' | 'DESC';
}
export interface ReviewQueueItem {
    id: string;
    question: string;
    answer: string;
    confidence: number;
    status: FaqEntryStatus;
    source: string;
    sourceId: string;
    category?: string;
    keywords: string[];
    usageCount: number;
    helpfulCount: number;
    notHelpfulCount: number;
    createdAt: Date;
    metadata?: any;
    creator?: {
        id: string;
        firstName?: string;
        lastName?: string;
        email: string;
    };
    reviewer?: {
        id: string;
        firstName?: string;
        lastName?: string;
        email: string;
    };
    reviewedAt?: Date;
}
export interface ReviewQueueResponse {
    items: ReviewQueueItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export interface BulkReviewRequest {
    faqIds: string[];
    action: 'approve' | 'reject' | 'publish';
    reviewerId: string;
    reason?: string;
}
export interface ReviewDecision {
    faqId: string;
    action: 'approve' | 'reject' | 'publish' | 'edit';
    reviewerId: string;
    reason?: string;
    editedAnswer?: string;
    editedCategory?: string;
    editedKeywords?: string[];
}
export declare class ReviewQueueService {
    private faqRepository;
    private configRepository;
    private userRepository;
    private readonly logger;
    constructor(faqRepository: Repository<LearnedFaqEntry>, configRepository: Repository<FaqLearningConfig>, userRepository: Repository<User>);
    getReviewQueue(filters?: ReviewQueueFilters): Promise<ReviewQueueResponse>;
    reviewFaq(decision: ReviewDecision): Promise<LearnedFaqEntry>;
    bulkReview(request: BulkReviewRequest): Promise<{
        successful: string[];
        failed: Array<{
            faqId: string;
            error: string;
        }>;
    }>;
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
    autoPublishHighConfidenceFaqs(): Promise<number>;
    getReviewHistory(faqId: string): Promise<Array<{
        action: string;
        reviewerId: string;
        reviewerName: string;
        reviewedAt: Date;
        reason?: string;
    }>>;
    private sendReviewNotification;
    private getAutoPublishConfig;
}
//# sourceMappingURL=review-queue.service.d.ts.map