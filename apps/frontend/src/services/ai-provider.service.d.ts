/**
 * AI Provider Service
 * Handles all API calls for AI Provider management
 */
export interface AiProvider {
    name: string;
    available: boolean;
    responseTime?: number;
    lastChecked: Date;
    error?: string;
}
export interface ProviderConfig {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    timeout?: number;
    retryAttempts?: number;
}
export interface TestResult {
    success: boolean;
    provider: string;
    available: boolean;
    responseTime?: number;
    testResult?: {
        prompt: string;
        response: string;
        tokensUsed?: number;
    };
    error?: string;
}
export declare class AiProviderService {
    private static readonly BASE_URL;
    /**
     * Get status of all AI providers
     */
    static getProviderStatus(): Promise<{
        currentProvider: string;
        providers: AiProvider[];
        totalProviders: number;
        availableProviders: number;
    }>;
    /**
     * Switch to a different AI provider
     */
    static switchProvider(provider: 'openai' | 'anthropic' | 'google' | 'openrouter'): Promise<{
        success: boolean;
        previousProvider: string;
        currentProvider: string;
        message: string;
    }>;
    /**
     * Test connection to a specific AI provider
     */
    static testProvider(provider: string, testPrompt?: string): Promise<TestResult>;
    /**
     * Test all providers
     */
    static testAllProviders(testPrompt?: string): Promise<TestResult[]>;
    /**
     * Update provider configuration
     */
    static updateProviderConfig(provider: 'openai' | 'anthropic' | 'google' | 'openrouter', config: ProviderConfig): Promise<{
        success: boolean;
        message: string;
        provider: string;
        updatedConfig: ProviderConfig;
    }>;
    /**
     * Get available models for each provider
     */
    static getAvailableModels(): Promise<{
        providers: Array<{
            name: string;
            models: Array<{
                id: string;
                name: string;
                description?: string;
                isDefault: boolean;
                capabilities: string[];
            }>;
        }>;
    }>;
    /**
     * Test FAQ generation with a specific provider
     */
    static testFaqGeneration(question: string, context?: string, category?: string, provider?: string): Promise<{
        success: boolean;
        provider: string;
        question: string;
        result?: {
            answer: string;
            confidence: number;
            category?: string;
            keywords: string[];
            processingTime: number;
            tokensUsed?: number;
        };
        error?: string;
    }>;
    /**
     * Compare FAQ generation across multiple providers
     */
    static compareProviders(question: string, context?: string, providers?: string[]): Promise<{
        success: boolean;
        question: string;
        results: Array<{
            provider: string;
            success: boolean;
            answer?: string;
            confidence?: number;
            processingTime?: number;
            tokensUsed?: number;
            error?: string;
        }>;
        recommendation?: {
            bestProvider: string;
            reason: string;
        };
    }>;
    /**
     * Get AI provider usage statistics
     */
    static getUsageStats(period?: 'day' | 'week' | 'month' | 'year'): Promise<{
        period: string;
        totalRequests: number;
        totalTokens: number;
        averageResponseTime: number;
        providerBreakdown: Array<{
            provider: string;
            requests: number;
            tokens: number;
            averageResponseTime: number;
            successRate: number;
        }>;
        costEstimate?: {
            total: number;
            currency: string;
            breakdown: Array<{
                provider: string;
                cost: number;
            }>;
        };
    }>;
    /**
     * Perform health check on all providers
     */
    static performHealthCheck(): Promise<{
        success: boolean;
        timestamp: Date;
        results: Array<{
            provider: string;
            healthy: boolean;
            responseTime?: number;
            error?: string;
        }>;
        overallHealth: 'healthy' | 'degraded' | 'unhealthy';
    }>;
}
//# sourceMappingURL=ai-provider.service.d.ts.map