import { LearnedFaqEntry } from '../entities/learned-faq-entry.entity';
import { LearningPattern } from '../entities/learning-pattern.entity';
import { ExtractedData } from './data-extraction.interface';
export interface ConfidenceFactors {
    sourceReliability: number;
    userSatisfaction?: number;
    resolutionSuccess: boolean;
    responseTime?: number;
    questionClarity: number;
    answerCompleteness: number;
    languageQuality: number;
    frequency: number;
    consistency: number;
    sourceVariety: number;
    positiveVotes: number;
    negativeVotes: number;
    usageCount: number;
    aiConfidence?: number;
    processingSuccess: boolean;
    categoryMatch: boolean;
    keywordRelevance: number;
    contextRichness: number;
}
export interface ConfidenceCalculationResult {
    finalConfidence: number;
    factorBreakdown: {
        sourceQuality: number;
        contentQuality: number;
        patternStrength: number;
        userFeedback: number;
        aiProcessing: number;
        contextualRelevance: number;
    };
    confidenceLevel: 'low' | 'medium' | 'high' | 'very_high';
    recommendations: string[];
    adjustmentHistory?: Array<{
        timestamp: Date;
        previousConfidence: number;
        newConfidence: number;
        reason: string;
        factors: Partial<ConfidenceFactors>;
    }>;
}
export interface FeedbackImpact {
    confidenceChange: number;
    newConfidence: number;
    feedbackWeight: number;
    reasoning: string;
}
export interface IConfidenceCalculatorService {
    /**
     * Calculate initial confidence for new FAQ entry
     */
    calculateInitialConfidence(extractedData: ExtractedData, pattern?: LearningPattern): Promise<ConfidenceCalculationResult>;
    /**
     * Recalculate confidence based on new factors
     */
    recalculateConfidence(faqEntry: LearnedFaqEntry, newFactors: Partial<ConfidenceFactors>): Promise<ConfidenceCalculationResult>;
    /**
     * Adjust confidence based on user feedback
     */
    adjustConfidenceFromFeedback(faqEntry: LearnedFaqEntry, feedbackType: 'helpful' | 'not_helpful', feedbackComment?: string): Promise<FeedbackImpact>;
    /**
     * Calculate pattern confidence
     */
    calculatePatternConfidence(pattern: LearningPattern): Promise<number>;
    /**
     * Bulk recalculate confidence for multiple entries
     */
    bulkRecalculateConfidence(faqEntries: LearnedFaqEntry[]): Promise<Map<string, ConfidenceCalculationResult>>;
    /**
     * Get confidence statistics for analysis
     */
    getConfidenceStatistics(): Promise<{
        averageConfidence: number;
        confidenceDistribution: {
            [key: string]: number;
        };
        topFactors: Array<{
            factor: string;
            impact: number;
        }>;
        improvementSuggestions: string[];
    }>;
    /**
     * Predict confidence for hypothetical FAQ
     */
    predictConfidence(factors: ConfidenceFactors): Promise<number>;
    /**
     * Get confidence threshold recommendations
     */
    getThresholdRecommendations(): Promise<{
        autoPublish: number;
        requireReview: number;
        reject: number;
        reasoning: string;
    }>;
}
//# sourceMappingURL=confidence-calculation.interface.d.ts.map