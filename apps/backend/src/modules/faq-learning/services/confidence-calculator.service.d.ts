import { Repository } from 'typeorm';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
import { ExtractedData } from '../interfaces/data-extraction.interface';
export interface ConfidenceFactors {
    sourceQuality: number;
    patternFrequency: number;
    resolutionSuccess: number;
    userSatisfaction: number;
    contextClarity: number;
    answerCompleteness: number;
    similarityToExisting: number;
    aiConfidence: number;
}
export interface ConfidenceResult {
    overallConfidence: number;
    factors: ConfidenceFactors;
    reasoning: string[];
    recommendation: 'auto_publish' | 'needs_review' | 'reject';
}
export declare class ConfidenceCalculatorService {
    private configRepository;
    private readonly logger;
    constructor(configRepository: Repository<FaqLearningConfig>);
    calculateConfidence(data: ExtractedData, patternFrequency?: number, aiConfidence?: number, existingFaqSimilarity?: number): Promise<ConfidenceResult>;
    adjustConfidenceBasedOnFeedback(currentConfidence: number, feedbackType: 'helpful' | 'not_helpful' | 'improved', feedbackCount: number): Promise<number>;
    private calculateSourceQuality;
    private calculatePatternFrequencyScore;
    private calculateResolutionSuccess;
    private calculateUserSatisfactionScore;
    private calculateContextClarity;
    private calculateAnswerCompleteness;
    private calculateSimilarityScore;
    private calculateOverallConfidence;
    private generateReasoning;
    private getRecommendation;
    private getConfidenceThresholds;
    private getConfidenceConfig;
}
//# sourceMappingURL=confidence-calculator.service.d.ts.map