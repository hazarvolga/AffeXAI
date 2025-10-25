"use strict";
/**
 * AI Provider Service
 * Handles all API calls for AI Provider management
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiProviderService = void 0;
const http_client_1 = require("@/lib/api/http-client");
class AiProviderService {
    static BASE_URL = '/ai-providers';
    /**
     * Get status of all AI providers
     */
    static async getProviderStatus() {
        const response = await http_client_1.httpClient.get(`${this.BASE_URL}/status`);
        // Ensure providers array exists
        const providers = response.providers || [];
        return {
            ...response,
            providers: Array.isArray(providers) ? providers.map(p => ({
                ...p,
                lastChecked: p.lastChecked ? new Date(p.lastChecked) : new Date()
            })) : []
        };
    }
    /**
     * Switch to a different AI provider
     */
    static async switchProvider(provider) {
        return await http_client_1.httpClient.post(`${this.BASE_URL}/switch`, { provider });
    }
    /**
     * Test connection to a specific AI provider
     */
    static async testProvider(provider, testPrompt) {
        return await http_client_1.httpClient.post(`${this.BASE_URL}/test`, {
            provider,
            testPrompt
        });
    }
    /**
     * Test all providers
     */
    static async testAllProviders(testPrompt) {
        const { providers } = await this.getProviderStatus();
        const results = [];
        for (const provider of providers) {
            try {
                const result = await this.testProvider(provider.name, testPrompt);
                results.push(result);
            }
            catch (error) {
                results.push({
                    success: false,
                    provider: provider.name,
                    available: false,
                    error: error instanceof Error ? error.message : 'Test failed'
                });
            }
        }
        return results;
    }
    /**
     * Update provider configuration
     */
    static async updateProviderConfig(provider, config) {
        return await http_client_1.httpClient.put(`${this.BASE_URL}/config`, {
            provider,
            config
        });
    }
    /**
     * Get available models for each provider
     */
    static async getAvailableModels() {
        return await http_client_1.httpClient.get(`${this.BASE_URL}/models`);
    }
    /**
     * Test FAQ generation with a specific provider
     */
    static async testFaqGeneration(question, context, category, provider) {
        return await http_client_1.httpClient.post(`${this.BASE_URL}/test-faq-generation`, {
            question,
            context,
            category,
            provider
        });
    }
    /**
     * Compare FAQ generation across multiple providers
     */
    static async compareProviders(question, context, providers) {
        return await http_client_1.httpClient.post(`${this.BASE_URL}/compare`, {
            question,
            context,
            providers
        });
    }
    /**
     * Get AI provider usage statistics
     */
    static async getUsageStats(period = 'week') {
        return await http_client_1.httpClient.get(`${this.BASE_URL}/usage-stats?period=${period}`);
    }
    /**
     * Perform health check on all providers
     */
    static async performHealthCheck() {
        const response = await http_client_1.httpClient.post(`${this.BASE_URL}/health-check`, {});
        return {
            ...response,
            timestamp: new Date(response.timestamp)
        };
    }
}
exports.AiProviderService = AiProviderService;
//# sourceMappingURL=ai-provider.service.js.map