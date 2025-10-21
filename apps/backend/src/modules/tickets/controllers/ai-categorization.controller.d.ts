import { AICategorizationService } from '../services/ai-categorization.service';
/**
 * AI Categorization Controller
 * ML-powered ticket categorization
 */
export declare class AICategorizationController {
    private readonly aiCategorizationService;
    constructor(aiCategorizationService: AICategorizationService);
    /**
     * Get category suggestions for a ticket
     */
    getSuggestions(ticketId: string): Promise<import("../services/ai-categorization.service").CategoryPrediction[]>;
    /**
     * Auto-categorize a ticket
     */
    autoCategorizе(ticketId: string): Promise<{
        success: boolean;
        message: string;
        category?: undefined;
    } | {
        success: boolean;
        category: import("../services/ai-categorization.service").CategoryPrediction;
        message?: undefined;
    }>;
    /**
     * Train AI model with historical data
     */
    trainModel(): Promise<import("../services/ai-categorization.service").CategoryTrainingData>;
    /**
     * Get AI categorization statistics
     */
    getStatistics(): Promise<{
        totalPredictions: number;
        autoAssigned: number;
        averageConfidence: number;
        accuracyRate: number;
    }>;
    /**
     * Validate prediction accuracy
     */
    validatePrediction(ticketId: string, body: {
        predictedCategoryId: string;
        actualCategoryId: string;
    }): Promise<{
        ticketId: string;
        isCorrect: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=ai-categorization.controller.d.ts.map