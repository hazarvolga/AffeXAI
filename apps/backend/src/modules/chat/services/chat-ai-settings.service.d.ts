import { SettingsService } from '../../settings/settings.service';
import { AiService } from '../../ai/ai.service';
import { AiModel, AiProvider } from '../../settings/dto/ai-settings.dto';
export interface ChatAiConfiguration {
    apiKey: string;
    model: AiModel;
    provider: AiProvider;
    enabled: boolean;
    priority: number;
    maxRetries: number;
    timeoutMs: number;
}
export interface ProviderFailoverConfig {
    primaryProvider: AiProvider;
    fallbackProviders: AiProvider[];
    maxFailuresBeforeFailover: number;
    failoverCooldownMs: number;
}
export declare class ChatAiSettingsService {
    private readonly settingsService;
    private readonly aiService;
    private readonly logger;
    private providerFailureCount;
    private providerLastFailure;
    constructor(settingsService: SettingsService, aiService: AiService);
    /**
     * Get AI configuration for chat with failover support
     */
    getChatAiConfiguration(): Promise<ChatAiConfiguration>; /**
     
  * Get failover configuration for providers
     */
    getFailoverConfiguration(): Promise<ProviderFailoverConfig>;
    /**
     * Get AI configuration with failover logic
     */
    getConfigurationWithFailover(): Promise<ChatAiConfiguration>;
    /**
     * Get configuration for specific provider
     */
    private getConfigurationForProvider;
    /**
     * Check if provider is available (not in cooldown)
     */
    private isProviderAvailable;
    /**
     * Record provider failure for failover logic
     */
    private recordProviderFailure;
    /**
     * Reset provider failure count (call on successful request)
     */
    resetProviderFailures(provider: AiProvider): void;
    /**
     * Test all configured providers
     */
    testAllProviders(): Promise<Array<{
        provider: AiProvider;
        model: AiModel;
        success: boolean;
        responseTime: number;
        error?: string;
    }>>;
    /**
     * Get provider health status
     */
    getProviderHealthStatus(): Array<{
        provider: AiProvider;
        isAvailable: boolean;
        failureCount: number;
        lastFailure?: Date;
        nextAvailableAt?: Date;
    }>;
    /**
     * Detect provider from model name
     */
    private detectProvider;
    /**
     * Get AI usage tracking and analytics
     */
    getAiUsageAnalytics(timeRange?: 'hour' | 'day' | 'week' | 'month'): Promise<{
        totalRequests: number;
        totalTokens: number;
        totalCost: number;
        providerBreakdown: Record<AiProvider, {
            requests: number;
            tokens: number;
            cost: number;
            averageResponseTime: number;
        }>;
        modelBreakdown: Record<AiModel, {
            requests: number;
            tokens: number;
            cost: number;
        }>;
        errorRate: number;
        averageConfidence: number;
    }>;
    /**
     * Update AI settings with validation
     */
    updateChatAiSettings(settings: {
        supportApiKey?: string;
        supportModel?: AiModel;
        supportEnabled?: boolean;
        globalApiKey?: string;
        globalModel?: AiModel;
        useSingleApiKey?: boolean;
    }): Promise<void>;
    /**
     * Validate API key for a specific model/provider
     */
    private validateApiKey;
}
//# sourceMappingURL=chat-ai-settings.service.d.ts.map