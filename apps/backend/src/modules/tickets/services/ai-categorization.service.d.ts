import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { TicketCategory } from '../entities/ticket-category.entity';
/**
 * AI Categorization Service
 * ML-based automatic ticket categorization
 */
export interface CategoryPrediction {
    categoryId: string;
    categoryName: string;
    confidence: number;
    reasons: string[];
}
export interface CategoryTrainingData {
    ticketCount: number;
    accuracy: number;
    lastTrainedAt: Date;
    categories: Array<{
        id: string;
        name: string;
        sampleCount: number;
    }>;
}
export declare class AICategorizationService {
    private readonly ticketRepository;
    private readonly categoryRepository;
    private readonly logger;
    private categoryPatterns;
    constructor(ticketRepository: Repository<Ticket>, categoryRepository: Repository<TicketCategory>);
    /**
     * Initialize ML patterns (in production, this would load trained models)
     */
    private initializePatterns;
    /**
     * Predict category for a ticket using ML simulation
     */
    predictCategory(ticket: Ticket): Promise<CategoryPrediction[]>;
    /**
     * Auto-assign category to ticket
     */
    autoCategorizе(ticketId: string): Promise<CategoryPrediction | null>;
    /**
     * Get categorization suggestions (don't auto-assign)
     */
    getSuggestions(ticketId: string): Promise<CategoryPrediction[]>;
    /**
     * Train model with historical data (simulated)
     */
    trainModel(): Promise<CategoryTrainingData>;
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
    validatePrediction(ticketId: string, predictedCategoryId: string, actualCategoryId: string): Promise<boolean>;
}
//# sourceMappingURL=ai-categorization.service.d.ts.map