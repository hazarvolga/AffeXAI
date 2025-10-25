import { FaqLearningService, LearningPipelineResult } from '../services/faq-learning.service';
import { BatchProcessorService } from '../services/batch-processor.service';
import { FaqAiService } from '../services/faq-ai.service';
export declare class StartLearningDto {
    criteria?: {
        minSessionDuration?: number;
        minResolutionTime?: number;
        requiredSatisfactionScore?: number;
        excludedCategories?: string[];
        dateRange?: {
            from: string;
            to: string;
        };
        maxResults?: number;
    };
    options?: {
        enableRealTimeProcessing?: boolean;
        enableAutoPublishing?: boolean;
    };
}
export declare class UpdateConfigDto {
    configKey: string;
    configValue: any;
    description?: string;
    category?: string;
}
export declare class BulkUpdateConfigDto {
    configs: UpdateConfigDto[];
}
export declare class ResetConfigDto {
    category: string;
}
export declare class FaqLearningController {
    private readonly faqLearningService;
    private readonly batchProcessor;
    private readonly faqAiService;
    private readonly logger;
    constructor(faqLearningService: FaqLearningService, batchProcessor: BatchProcessorService, faqAiService: FaqAiService);
    startLearning(dto: StartLearningDto): Promise<{
        success: boolean;
        result: LearningPipelineResult;
    }>;
    startPipeline(): Promise<{
        success: boolean;
        message: string;
        status: string;
    }>;
    stopPipeline(): Promise<{
        success: boolean;
        message: string;
        status: string;
    }>;
    getDashboard(): Promise<{
        stats: {
            totalFaqs: number;
            newFaqsToday: number;
            pendingReview: number;
            averageConfidence: number;
            processingStatus: 'running' | 'stopped' | 'error';
            lastRun?: Date;
            nextRun?: Date;
        };
        learningProgress: {
            fromChat: number;
            fromTickets: number;
            fromSuggestions: number;
        };
        qualityMetrics: {
            highConfidence: number;
            mediumConfidence: number;
            lowConfidence: number;
        };
        providers: Array<{
            name: string;
            available: boolean;
            responseTime?: number;
            lastChecked: Date;
        }>;
        recentActivity: Array<{
            id: string;
            type: 'faq_generated' | 'review_completed' | 'feedback_received';
            description: string;
            timestamp: Date;
            status: 'success' | 'warning' | 'error';
        }>;
    }>;
    getProviderStatus(): Promise<{
        success: boolean;
        data: {
            provider: string;
            model: string;
            available: boolean;
            responseTime?: number;
        };
    }>;
    getAiUsageStats(): Promise<{
        totalRequests: number;
        successRate: number;
        averageResponseTime: number;
        totalTokens: number;
        estimatedCost: number;
        last24Hours: {
            requests: number;
            tokens: number;
            cost: number;
        };
    }>;
    getPerformanceMetrics(): Promise<{
        faqsGenerated: number;
        averageConfidence: number;
        processingTime: number;
        errorRate: number;
    }>;
    getAiProviderInfo(): Promise<{
        currentProvider: string;
        currentModel: string;
        available: boolean;
        isReadOnly: boolean;
        globalSettingsUrl: string;
    }>;
    getConfig(): Promise<{
        configurations: Array<{
            key: string;
            value: any;
            description?: string;
            category?: string;
            isActive: boolean;
            updatedAt: Date;
            type?: string;
            min?: number;
            max?: number;
            step?: number;
            unit?: string;
            options?: Array<{
                value: any;
                label: string;
            }>;
        }>;
    }>;
    updateConfig(dto: UpdateConfigDto): Promise<{
        success: boolean;
        message: string;
    }>;
    bulkUpdateConfig(dto: BulkUpdateConfigDto): Promise<{
        success: boolean;
        message: string;
        results: Array<{
            configKey: string;
            success: boolean;
            error?: string;
        }>;
    }>;
    resetConfigSection(sectionKey: string): Promise<{
        success: boolean;
        message: string;
        resetConfigs: Array<{
            key: string;
            oldValue: any;
            newValue: any;
        }>;
    }>;
    private validateConfigValue;
    private getConfigMetadata;
    private getDefaultConfigsForCategory;
}
//# sourceMappingURL=faq-learning.controller.d.ts.map