import { Repository } from 'typeorm';
import { LearnedFaqEntry } from '../entities/learned-faq-entry.entity';
import { LearningPattern } from '../entities/learning-pattern.entity';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
import { FaqAiService } from './faq-ai.service';
import { ConfidenceCalculatorService } from './confidence-calculator.service';
import { NormalizedData } from '../interfaces/data-extraction.interface';
export interface FaqTemplate {
    id: string;
    name: string;
    category: string;
    template: string;
    variables: string[];
    tone: 'professional' | 'friendly' | 'technical';
    language: string;
}
export interface FaqGenerationOptions {
    useTemplates: boolean;
    enableCategoryAutoAssignment: boolean;
    enableDuplicateDetection: boolean;
    enableQualityValidation: boolean;
    mergeSimilarFaqs: boolean;
    similarityThreshold: number;
    minConfidenceThreshold: number;
}
export interface GeneratedFaq {
    question: string;
    answer: string;
    category?: string;
    keywords: string[];
    confidence: number;
    template?: string;
    relatedQuestions?: string[];
    metadata: {
        generationMethod: 'ai' | 'template' | 'merged';
        sourcePatterns: string[];
        qualityScore: number;
        duplicateOf?: string;
        mergedFrom?: string[];
    };
}
export interface DuplicateDetectionResult {
    isDuplicate: boolean;
    similarFaqs: Array<{
        id: string;
        question: string;
        similarity: number;
    }>;
    recommendation: 'merge' | 'keep_separate' | 'discard';
}
export declare class FaqGeneratorService {
    private faqRepository;
    private patternRepository;
    private configRepository;
    private faqAiService;
    private confidenceCalculator;
    private readonly logger;
    private templates;
    constructor(faqRepository: Repository<LearnedFaqEntry>, patternRepository: Repository<LearningPattern>, configRepository: Repository<FaqLearningConfig>, faqAiService: FaqAiService, confidenceCalculator: ConfidenceCalculatorService);
    generateFaq(data: NormalizedData, patterns: LearningPattern[], options?: Partial<FaqGenerationOptions>): Promise<GeneratedFaq>;
    generateBatch(dataList: NormalizedData[], options?: Partial<FaqGenerationOptions>): Promise<{
        successful: GeneratedFaq[];
        failed: Array<{
            data: NormalizedData;
            error: string;
        }>;
    }>;
    detectDuplicates(question: string, threshold?: number): Promise<DuplicateDetectionResult>;
    mergeFaqs(newFaq: GeneratedFaq, similarFaqs: Array<{
        id: string;
        question: string;
        similarity: number;
    }>): Promise<GeneratedFaq>;
    private generateWithAi;
    private generateFromTemplate;
    private findBestTemplate;
    private extractTemplateVariables;
    private extractProduct;
    private extractAction;
    private extractIssue;
    private autoAssignCategory;
    private validateQuality;
    private calculateSimilarity;
    private findRelevantPatterns;
    private getRelatedFaqs;
    private getGenerationConfig;
    private initializeTemplates;
}
//# sourceMappingURL=faq-generator.service.d.ts.map