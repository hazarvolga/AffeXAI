import { Repository } from 'typeorm';
import { LearnedFaqEntry } from '../entities/learned-faq-entry.entity';
import { LearningPattern } from '../entities/learning-pattern.entity';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { ChatSession } from '../../chat/entities/chat-session.entity';
export interface LearningEffectivenessMetrics {
    totalFaqsGenerated: number;
    publishedFaqs: number;
    pendingReview: number;
    rejectedFaqs: number;
    approvalRate: number;
    avgConfidenceScore: number;
    avgGenerationTime: number;
    faqsBySource: {
        chat: number;
        ticket: number;
    };
    faqsByCategory: Array<{
        category: string;
        count: number;
    }>;
}
export interface ProviderPerformanceMetrics {
    providerName: string;
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    avgResponseTime: number;
    avgTokensUsed: number;
    avgConfidence: number;
    successRate: number;
    costEstimate?: number;
}
export interface FaqUsageMetrics {
    totalViews: number;
    totalFeedback: number;
    positiveFeedback: number;
    negativeFeedback: number;
    satisfactionRate: number;
    topViewedFaqs: Array<{
        id: string;
        question: string;
        views: number;
        satisfaction: number;
    }>;
    topRatedFaqs: Array<{
        id: string;
        question: string;
        rating: number;
        feedbackCount: number;
    }>;
}
export interface ROIMetrics {
    ticketReductionRate: number;
    estimatedTicketsSaved: number;
    estimatedTimeSaved: number;
    estimatedCostSavings: number;
    chatResolutionRate: number;
    avgTicketResolutionTime: number;
    beforeAfterComparison: {
        before: {
            avgTicketsPerDay: number;
            avgResolutionTime: number;
        };
        after: {
            avgTicketsPerDay: number;
            avgResolutionTime: number;
        };
    };
}
export interface AnalyticsPeriod {
    startDate: Date;
    endDate: Date;
    label: string;
}
export declare class LearningAnalyticsService {
    private faqRepository;
    private patternRepository;
    private configRepository;
    private ticketRepository;
    private chatSessionRepository;
    private readonly logger;
    constructor(faqRepository: Repository<LearnedFaqEntry>, patternRepository: Repository<LearningPattern>, configRepository: Repository<FaqLearningConfig>, ticketRepository: Repository<Ticket>, chatSessionRepository: Repository<ChatSession>);
    getLearningEffectiveness(period?: 'day' | 'week' | 'month' | 'all'): Promise<LearningEffectivenessMetrics>;
    getProviderPerformance(period?: 'day' | 'week' | 'month' | 'all'): Promise<ProviderPerformanceMetrics[]>;
    getFaqUsageMetrics(period?: 'day' | 'week' | 'month' | 'all'): Promise<FaqUsageMetrics>;
    getROIMetrics(period?: 'day' | 'week' | 'month' | 'all'): Promise<ROIMetrics>;
    getComprehensiveAnalytics(period?: 'day' | 'week' | 'month' | 'all'): Promise<{
        period: "all" | "week" | "day" | "month";
        generatedAt: Date;
        effectiveness: LearningEffectivenessMetrics;
        providerPerformance: ProviderPerformanceMetrics[];
        usage: FaqUsageMetrics;
        roi: ROIMetrics;
    }>;
    getPatternAnalytics(period?: 'day' | 'week' | 'month' | 'all'): Promise<{
        totalPatterns: number;
        topPatterns: {
            id: string;
            pattern: string;
            frequency: number;
            category: string;
            confidence: number;
        }[];
    }>;
    private getDateRange;
    private getComparisonDate;
}
//# sourceMappingURL=learning-analytics.service.d.ts.map