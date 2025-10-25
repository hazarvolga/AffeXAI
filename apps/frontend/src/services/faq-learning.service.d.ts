/**
 * FAQ Learning Service
 * Handles all API calls for FAQ Learning system
 */
export interface DashboardStats {
    totalFaqs: number;
    newFaqsToday: number;
    pendingReview: number;
    averageConfidence: number;
    processingStatus: 'running' | 'stopped' | 'error';
    lastRun?: Date;
    nextRun?: Date;
}
export interface ProviderStatus {
    name: string;
    available: boolean;
    responseTime?: number;
    lastChecked: Date;
}
export interface RecentActivity {
    id: string;
    type: 'faq_generated' | 'review_completed' | 'feedback_received';
    description: string;
    timestamp: Date;
    status: 'success' | 'warning' | 'error';
}
export interface LearningProgress {
    fromChat: number;
    fromTickets: number;
    fromSuggestions: number;
}
export interface QualityMetrics {
    highConfidence: number;
    mediumConfidence: number;
    lowConfidence: number;
}
export interface DashboardData {
    stats: DashboardStats;
    learningProgress: LearningProgress;
    qualityMetrics: QualityMetrics;
    providers: ProviderStatus[];
    recentActivity: RecentActivity[];
}
export declare class FaqLearningService {
    private static readonly BASE_URL;
    /**
     * Get dashboard statistics and data
     */
    static getDashboardStats(): Promise<DashboardData>;
    /**
     * Start the learning pipeline
     */
    static startPipeline(): Promise<{
        success: boolean;
        message: string;
        status: string;
    }>;
    /**
     * Stop the learning pipeline
     */
    static stopPipeline(): Promise<{
        success: boolean;
        message: string;
        status: string;
    }>;
    /**
     * Get pipeline status
     */
    static getPipelineStatus(): Promise<{
        isProcessing: boolean;
        dailyProcessingCount: number;
        lastRun?: Date;
        nextScheduledRun?: Date;
    }>;
    /**
     * Get system health status
     */
    static getHealthStatus(): Promise<{
        status: 'healthy' | 'degraded' | 'unhealthy';
        components: {
            pipeline: 'up' | 'down';
            aiProviders: 'up' | 'down' | 'partial';
            database: 'up' | 'down';
        };
        lastHealthCheck: Date;
    }>;
    /**
     * Get review queue with filters
     */
    static getReviewQueue(filters: {
        status?: string[];
        confidence?: {
            min?: number;
            max?: number;
        };
        source?: string[];
        category?: string[];
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: Array<{
            id: string;
            question: string;
            answer: string;
            confidence: number;
            status: 'pending_review' | 'approved' | 'rejected' | 'published';
            source: 'chat' | 'ticket';
            sourceId: string;
            category?: string;
            keywords: string[];
            usageCount: number;
            helpfulCount: number;
            notHelpfulCount: number;
            createdAt: Date;
            creator?: {
                id: string;
                name: string;
                email: string;
            };
        }>;
        total: number;
        page: number;
        totalPages: number;
    }>;
    /**
     * Review a single FAQ
     */
    static reviewFaq(faqId: string, action: 'approve' | 'reject' | 'publish' | 'edit', data: {
        reason?: string;
        editedAnswer?: string;
        editedCategory?: string;
        editedKeywords?: string[];
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Bulk review multiple FAQs
     */
    static bulkReview(faqIds: string[], action: 'approve' | 'reject' | 'publish', reason?: string): Promise<{
        success: boolean;
        message: string;
        results: {
            successful: string[];
            failed: Array<{
                faqId: string;
                error: string;
            }>;
        };
    }>;
    /**
     * Get review queue statistics
     */
    static getReviewStats(): Promise<{
        total: number;
        pendingReview: number;
        approved: number;
        rejected: number;
        published: number;
        averageConfidence: number;
    }>;
    /**
     * Get current AI provider information
     */
    static getAiProviderInfo(): Promise<{
        currentProvider: string;
        currentModel: string;
        available: boolean;
        isReadOnly: boolean;
        globalSettingsUrl: string;
    }>;
    /**
     * Get AI usage statistics for FAQ Learning
     */
    static getAiUsageStats(): Promise<{
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
    /**
     * Get FAQ Learning performance metrics
     */
    static getPerformanceMetrics(): Promise<{
        faqsGenerated: number;
        averageConfidence: number;
        processingTime: number;
        errorRate: number;
    }>;
    /**
     * Get all configuration sections
     */
    static getConfig(): Promise<{
        configurations: Array<{
            key: string;
            value: any;
            description?: string;
            category?: string;
            isActive: boolean;
            updatedAt: Date;
        }>;
    }>;
    /**
     * Update configuration
     */
    static updateConfig(config: {
        configKey: string;
        configValue: any;
        description?: string;
        category?: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Bulk update configurations
     */
    static bulkUpdateConfig(configs: Array<{
        configKey: string;
        configValue: any;
        description?: string;
        category?: string;
    }>): Promise<{
        success: boolean;
        message: string;
        results?: {
            successful: string[];
            failed: Array<{
                configKey: string;
                error: string;
            }>;
        };
    }>;
    /**
     * Reset configuration section to defaults
     */
    static resetConfigSection(sectionKey: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=faq-learning.service.d.ts.map