import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
export interface LearningConfigValue {
    minConfidenceForReview?: number;
    minConfidenceForAutoPublish?: number;
    minPatternFrequency?: number;
    similarityThreshold?: number;
    batchSize?: number;
    processingInterval?: number;
    minQuestionLength?: number;
    maxQuestionLength?: number;
    minAnswerLength?: number;
    chatSessionMinDuration?: number;
    ticketMinResolutionTime?: number;
    requiredSatisfactionScore?: number;
    excludedCategories?: string[];
    autoCategorizationEnabled?: boolean;
    aiProvider?: 'openai' | 'anthropic' | 'google' | 'openrouter';
    modelName?: string;
    temperature?: number;
    maxTokens?: number;
    providerSettings?: {
        openai?: {
            models: string[];
            defaultModel: string;
            apiKey?: string;
        };
        anthropic?: {
            models: string[];
            defaultModel: string;
            apiKey?: string;
        };
        google?: {
            models: string[];
            defaultModel: string;
            apiKey?: string;
        };
        openrouter?: {
            models: string[];
            defaultModel: string;
            apiKey?: string;
        };
    };
    enableRealTimeProcessing?: boolean;
    enableAutoPublishing?: boolean;
    maxDailyProcessingLimit?: number;
    retentionPeriodDays?: number;
    [key: string]: any;
}
export declare class FaqLearningConfig extends BaseEntity {
    configKey: string;
    configValue: LearningConfigValue;
    description: string;
    isActive: boolean;
    category: string;
    updater: User;
    updatedBy: string;
    static getDefaultConfig(): Partial<LearningConfigValue>;
    get minConfidenceForReview(): number;
    get minConfidenceForAutoPublish(): number;
    get aiProvider(): string;
    get batchSize(): number;
    get isAutoPublishingEnabled(): boolean;
}
//# sourceMappingURL=faq-learning-config.entity.d.ts.map