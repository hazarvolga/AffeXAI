import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
export declare enum FaqEntryStatus {
    DRAFT = "draft",
    PENDING_REVIEW = "pending_review",
    APPROVED = "approved",
    REJECTED = "rejected",
    PUBLISHED = "published"
}
export declare enum FaqEntrySource {
    CHAT = "chat",
    TICKET = "ticket",
    USER_SUGGESTION = "user_suggestion"
}
export declare class LearnedFaqEntry extends BaseEntity {
    question: string;
    answer: string;
    category: string;
    confidence: number;
    status: FaqEntryStatus;
    source: FaqEntrySource;
    sourceId: string;
    keywords: string[];
    metadata: {
        originalConversation?: string;
        resolutionTime?: number;
        userSatisfaction?: number;
        similarityScore?: number;
        occurrenceCount?: number;
        aiProvider?: string;
        modelUsed?: string;
        processingTime?: number;
        reviewReason?: string;
        reviewAction?: string;
        reviewedAt?: Date;
    };
    usageCount: number;
    viewCount: number;
    helpfulCount: number;
    notHelpfulCount: number;
    reviewedAt: Date;
    publishedAt: Date;
    reviewer: User;
    reviewedBy: string;
    creator: User;
    createdBy: string;
    get positiveFeedbackCount(): number;
    get feedbackCount(): number;
    get helpfulnessRatio(): number;
    get isHighConfidence(): boolean;
    get needsReview(): boolean;
}
//# sourceMappingURL=learned-faq-entry.entity.d.ts.map