import { Repository } from 'typeorm';
import { LearnedFaqEntry } from '../entities/learned-faq-entry.entity';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
import { ConfidenceCalculatorService } from './confidence-calculator.service';
import { FaqAiService } from './faq-ai.service';
export interface FeedbackData {
    faqId: string;
    userId?: string;
    feedbackType: 'helpful' | 'not_helpful' | 'suggestion' | 'correction';
    rating?: number;
    comment?: string;
    suggestedAnswer?: string;
    suggestedCategory?: string;
    suggestedKeywords?: string[];
    context?: {
        userAgent?: string;
        referrer?: string;
        sessionId?: string;
        searchQuery?: string;
    };
}
export interface FeedbackAnalysis {
    overallSentiment: 'positive' | 'negative' | 'neutral';
    confidenceAdjustment: number;
    suggestedImprovements: string[];
    actionRequired: boolean;
    priority: 'low' | 'medium' | 'high';
}
export interface FeedbackStats {
    totalFeedback: number;
    helpfulCount: number;
    notHelpfulCount: number;
    suggestionCount: number;
    correctionCount: number;
    averageRating: number;
    helpfulnessRatio: number;
    topIssues: Array<{
        issue: string;
        count: number;
        percentage: number;
    }>;
    improvementSuggestions: Array<{
        suggestion: string;
        frequency: number;
        impact: 'high' | 'medium' | 'low';
    }>;
}
export interface PerformanceMetrics {
    faqId: string;
    question: string;
    totalViews: number;
    totalFeedback: number;
    helpfulnessRatio: number;
    averageRating: number;
    confidenceScore: number;
    lastUpdated: Date;
    performanceScore: number;
    trend: 'improving' | 'declining' | 'stable';
    recommendations: string[];
}
export declare class FeedbackProcessorService {
    private faqRepository;
    private configRepository;
    private confidenceCalculator;
    private faqAiService;
    private readonly logger;
    constructor(faqRepository: Repository<LearnedFaqEntry>, configRepository: Repository<FaqLearningConfig>, confidenceCalculator: ConfidenceCalculatorService, faqAiService: FaqAiService);
    processFeedback(feedback: FeedbackData): Promise<{
        processed: boolean;
        analysis: FeedbackAnalysis;
        updatedFaq?: LearnedFaqEntry;
    }>;
    getFeedbackStats(faqId: string): Promise<FeedbackStats>;
    getPerformanceMetrics(faqId?: string): Promise<PerformanceMetrics[]>;
    generateImprovementSuggestions(faqId: string): Promise<string[]>;
    private analyzeFeedback;
    private updateFaqMetrics;
    private processSuggestion;
    private triggerImprovementAction;
    private analyzeComment;
    private extractIssues;
    private countOccurrences;
    private calculatePerformanceScore;
    private calculateTrend;
    private calculateHelpfulRatio;
    private generateRecommendations;
    private generateDetailedImprovementSuggestions;
    private getTotalFeedbackCount;
    private analyzeCommonIssues;
}
//# sourceMappingURL=feedback-processor.service.d.ts.map