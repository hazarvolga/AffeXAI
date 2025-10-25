"use strict";
/**
 * FAQ Learning Service
 * Handles all API calls for FAQ Learning system
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqLearningService = void 0;
const http_client_1 = require("@/lib/api/http-client");
class FaqLearningService {
    static BASE_URL = '/faq-learning';
    /**
     * Get dashboard statistics and data
     */
    static async getDashboardStats() {
        console.log('🔗 Calling dashboard API:', `${this.BASE_URL}/dashboard`);
        const response = await http_client_1.httpClient.get(`${this.BASE_URL}/dashboard`);
        console.log('🔗 Raw response:', response);
        // Handle wrapped response (success, data, meta structure)
        const data = response.data || response;
        console.log('🔗 Extracted data:', data);
        // Convert date strings to Date objects with null checks
        if (data.stats && data.stats.lastRun) {
            data.stats.lastRun = new Date(data.stats.lastRun);
        }
        if (data.stats && data.stats.nextRun) {
            data.stats.nextRun = new Date(data.stats.nextRun);
        }
        if (data.providers && Array.isArray(data.providers)) {
            data.providers = data.providers.map((p) => ({
                ...p,
                lastChecked: new Date(p.lastChecked)
            }));
        }
        if (data.recentActivity && Array.isArray(data.recentActivity)) {
            data.recentActivity = data.recentActivity.map((a) => ({
                ...a,
                timestamp: new Date(a.timestamp)
            }));
        }
        return data;
    }
    /**
     * Start the learning pipeline
     */
    static async startPipeline() {
        return await http_client_1.httpClient.post(`${this.BASE_URL}/pipeline/start`, {});
    }
    /**
     * Stop the learning pipeline
     */
    static async stopPipeline() {
        return await http_client_1.httpClient.post(`${this.BASE_URL}/pipeline/stop`, {});
    }
    /**
     * Get pipeline status
     */
    static async getPipelineStatus() {
        const response = await http_client_1.httpClient.get(`${this.BASE_URL}/status`);
        return {
            isProcessing: response.isProcessing,
            dailyProcessingCount: response.dailyProcessingCount,
            lastRun: response.lastRun ? new Date(response.lastRun) : undefined,
            nextScheduledRun: response.nextScheduledRun ? new Date(response.nextScheduledRun) : undefined
        };
    }
    /**
     * Get system health status
     */
    static async getHealthStatus() {
        const response = await http_client_1.httpClient.get(`${this.BASE_URL}/health`);
        return {
            ...response,
            lastHealthCheck: new Date(response.lastHealthCheck)
        };
    }
    // ============================================================================
    // Review Queue Methods
    // ============================================================================
    /**
     * Get review queue with filters
     */
    static async getReviewQueue(filters) {
        const params = new URLSearchParams();
        if (filters.status && filters.status.length > 0) {
            params.append('status', filters.status.join(','));
        }
        if (filters.confidence?.min !== undefined) {
            params.append('confidence_min', filters.confidence.min.toString());
        }
        if (filters.confidence?.max !== undefined) {
            params.append('confidence_max', filters.confidence.max.toString());
        }
        if (filters.source && filters.source.length > 0) {
            params.append('source', filters.source.join(','));
        }
        if (filters.category && filters.category.length > 0) {
            params.append('category', filters.category.join(','));
        }
        if (filters.page) {
            params.append('page', filters.page.toString());
        }
        if (filters.limit) {
            params.append('limit', filters.limit.toString());
        }
        const response = await http_client_1.httpClient.get(`/review/queue?${params.toString()}`);
        console.log('📋 Review queue response:', response);
        // Handle wrapped response (success, data, meta structure)
        const data = response.data || response;
        console.log('📋 Extracted review queue data:', data);
        // Convert date strings to Date objects
        if (data.items && Array.isArray(data.items)) {
            data.items = data.items.map((item) => ({
                ...item,
                createdAt: new Date(item.createdAt)
            }));
        }
        return data;
    }
    /**
     * Review a single FAQ
     */
    static async reviewFaq(faqId, action, data) {
        return await http_client_1.httpClient.post(`/review/${faqId}/review`, {
            action,
            ...data
        });
    }
    /**
     * Bulk review multiple FAQs
     */
    static async bulkReview(faqIds, action, reason) {
        return await http_client_1.httpClient.post('/review/bulk-review', {
            faqIds,
            action,
            reason
        });
    }
    /**
     * Get review queue statistics
     */
    static async getReviewStats() {
        const response = await http_client_1.httpClient.get('/review/stats');
        console.log('📊 Review stats response:', response);
        // Handle wrapped response
        const data = response.data || response;
        return data;
    }
    /**
     * Get current AI provider information
     */
    static async getAiProviderInfo() {
        const response = await http_client_1.httpClient.get(`${this.BASE_URL}/ai-provider-info`);
        console.log('🤖 AI Provider info response:', response);
        // Handle wrapped response
        const data = response.data || response;
        return data;
    }
    /**
     * Get AI usage statistics for FAQ Learning
     */
    static async getAiUsageStats() {
        return await http_client_1.httpClient.get(`${this.BASE_URL}/ai-usage-stats`);
    }
    /**
     * Get FAQ Learning performance metrics
     */
    static async getPerformanceMetrics() {
        return await http_client_1.httpClient.get(`${this.BASE_URL}/performance-metrics`);
    }
    // ============================================================================
    // Configuration Methods
    // ============================================================================
    /**
     * Get all configuration sections
     */
    static async getConfig() {
        const response = await http_client_1.httpClient.get(`${this.BASE_URL}/config`);
        console.log('🔧 Config response:', response);
        // Handle wrapped response (success, data, meta structure)
        const data = response.data || response;
        console.log('🔧 Extracted config data:', data);
        // Handle both response formats: { configurations: [] } or direct array
        const configs = data.configurations || data || [];
        return {
            configurations: Array.isArray(configs) ? configs.map((c) => ({
                ...c,
                updatedAt: c.updatedAt ? new Date(c.updatedAt) : new Date()
            })) : []
        };
    }
    /**
     * Update configuration
     */
    static async updateConfig(config) {
        const response = await http_client_1.httpClient.put(`${this.BASE_URL}/config`, config);
        // Handle wrapped response
        const data = response.data || response;
        return data;
    }
    /**
     * Bulk update configurations
     */
    static async bulkUpdateConfig(configs) {
        const response = await http_client_1.httpClient.put(`${this.BASE_URL}/config/bulk`, { configs });
        console.log('💾 Bulk config update response:', response);
        // Handle wrapped response
        const data = response.data || response;
        return data;
    }
    /**
     * Reset configuration section to defaults
     */
    static async resetConfigSection(sectionKey) {
        return await http_client_1.httpClient.post(`${this.BASE_URL}/config/reset/${sectionKey}`, {});
    }
}
exports.FaqLearningService = FaqLearningService;
//# sourceMappingURL=faq-learning.service.js.map