import { Repository } from 'typeorm';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
import { FaqAiInterface, FaqGenerationRequest, FaqGenerationResponse, PatternAnalysisRequest, PatternAnalysisResponse, ProviderStatus } from '../interfaces/faq-ai.interface';
import { AiService } from '../../ai/ai.service';
import { SettingsService } from '../../settings/settings.service';
/**
 * FAQ AI Service
 * Integrates with global AI service for FAQ generation and analysis
 */
export declare class FaqAiService implements FaqAiInterface {
    private configRepository;
    private aiService;
    private settingsService;
    private readonly logger;
    constructor(configRepository: Repository<FaqLearningConfig>, aiService: AiService, settingsService: SettingsService);
    /**
     * Generate FAQ answer using global AI service
     */
    generateFaqAnswer(request: FaqGenerationRequest): Promise<FaqGenerationResponse>;
    /**
     * Analyze patterns in conversation data
     */
    analyzePatterns(request: PatternAnalysisRequest): Promise<PatternAnalysisResponse>;
    /**
     * Get current AI provider status and statistics
     */
    getProviderStatus(): Promise<ProviderStatus>;
    /**
     * Build FAQ generation prompt
     */
    private buildFaqPrompt;
    /**
     * Build pattern analysis prompt
     */
    private buildPatternAnalysisPrompt;
    /**
     * Extract keywords from text (fallback method)
     */
    private extractKeywords;
    /**
     * Improve existing FAQ answer (compatibility method)
     */
    improveAnswer(question: string, answer: string, feedback?: string[]): Promise<FaqGenerationResponse>;
    /**
     * Categorize question (compatibility method)
     */
    categorizeQuestion(question: string, availableCategories: string[]): Promise<string>;
    /**
     * Get provider name from AI model
     */
    private getProviderFromModel;
}
//# sourceMappingURL=faq-ai.service.d.ts.map