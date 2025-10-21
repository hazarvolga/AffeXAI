"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsService = void 0;
const http_client_1 = require("./http-client");
class AnalyticsCache {
    cache = new Map();
    TTL = 5 * 60 * 1000; // 5 minutes
    get(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return null;
        const isExpired = Date.now() - entry.timestamp > this.TTL;
        if (isExpired) {
            this.cache.delete(key);
            return null;
        }
        return entry.data;
    }
    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
        });
    }
    clear() {
        this.cache.clear();
    }
}
/**
 * Analytics Service
 * Handles all analytics and reporting API calls with caching and retry logic
 */
class AnalyticsService {
    endpoint = '/email-marketing/analytics';
    cache = new AnalyticsCache();
    /**
     * ✅ OPTIMIZATION: Retry logic for failed requests
     */
    async fetchWithRetry(url, retries = 2, delay = 1000) {
        try {
            return await http_client_1.httpClient.getWrapped(url);
        }
        catch (error) {
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.fetchWithRetry(url, retries - 1, delay * 2);
            }
            throw error;
        }
    }
    /**
     * ✅ OPTIMIZATION: Generic cached fetch method
     */
    async cachedFetch(cacheKey, url, skipCache = false) {
        if (!skipCache) {
            const cached = this.cache.get(cacheKey);
            if (cached)
                return cached;
        }
        const data = await this.fetchWithRetry(url);
        this.cache.set(cacheKey, data);
        return data;
    }
    /**
     * Get complete dashboard data
     */
    async getDashboardData(startDate, endDate, period = 'month', skipCache = false) {
        const params = new URLSearchParams({
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            period,
        });
        const cacheKey = `dashboard:${params.toString()}`;
        return this.cachedFetch(cacheKey, `${this.endpoint}/dashboard?${params}`, skipCache);
    }
    /**
     * Get overview metrics
     */
    async getOverviewMetrics(startDate, endDate, skipCache = false) {
        const params = new URLSearchParams({
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
        });
        const cacheKey = `overview:${params.toString()}`;
        return this.cachedFetch(cacheKey, `${this.endpoint}/overview?${params}`, skipCache);
    }
    /**
     * Get campaign analytics
     */
    async getCampaignAnalytics(startDate, endDate, limit = 50, skipCache = false) {
        const params = new URLSearchParams({
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            limit: limit.toString(),
        });
        const cacheKey = `campaigns:${params.toString()}`;
        return this.cachedFetch(cacheKey, `${this.endpoint}/campaigns?${params}`, skipCache);
    }
    /**
     * Get subscriber growth data
     */
    async getSubscriberGrowth(startDate, endDate, period = 'day', skipCache = false) {
        const params = new URLSearchParams({
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            period,
        });
        const cacheKey = `subscriber-growth:${params.toString()}`;
        return this.cachedFetch(cacheKey, `${this.endpoint}/subscriber-growth?${params}`, skipCache);
    }
    /**
     * Get email engagement data
     */
    async getEmailEngagement(startDate, endDate, period = 'day', skipCache = false) {
        const params = new URLSearchParams({
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            period,
        });
        const cacheKey = `engagement:${params.toString()}`;
        return this.cachedFetch(cacheKey, `${this.endpoint}/engagement?${params}`, skipCache);
    }
    /**
     * Get revenue metrics
     */
    async getRevenueMetrics(startDate, endDate, period = 'day', skipCache = false) {
        const params = new URLSearchParams({
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            period,
        });
        const cacheKey = `revenue:${params.toString()}`;
        return this.cachedFetch(cacheKey, `${this.endpoint}/revenue?${params}`, skipCache);
    }
    /**
     * Get top performing campaigns
     */
    async getTopCampaigns(startDate, endDate, limit = 10, sortBy = 'score', skipCache = false) {
        const params = new URLSearchParams({
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            limit: limit.toString(),
            sortBy,
        });
        const cacheKey = `top-campaigns:${params.toString()}`;
        return this.cachedFetch(cacheKey, `${this.endpoint}/top-campaigns?${params}`, skipCache);
    }
    /**
     * Get A/B test summary
     */
    async getAbTestSummary(startDate, endDate, limit = 20, skipCache = false) {
        const params = new URLSearchParams({
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            limit: limit.toString(),
        });
        const cacheKey = `ab-tests:${params.toString()}`;
        return this.cachedFetch(cacheKey, `${this.endpoint}/ab-tests?${params}`, skipCache);
    }
    /**
     * Compare multiple campaigns
     */
    async compareCampaigns(campaignIds, metrics) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/compare-campaigns`, { campaignIds, metrics });
    }
    /**
     * Export analytics data
     */
    async exportData(type, format = 'csv', startDate, endDate) {
        const params = new URLSearchParams({
            type,
            format,
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
        });
        const response = await fetch(`/api${this.endpoint}/export?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to export data');
        }
        return response.blob();
    }
    /**
     * ✅ OPTIMIZATION: Download exported data
     */
    async downloadExport(type, format = 'csv', startDate, endDate) {
        const blob = await this.exportData(type, format, startDate, endDate);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}-analytics-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
    }
    /**
     * Get debug data status
     */
    async getDataStatus() {
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/debug/data-status`);
    }
}
// Export singleton instance
exports.analyticsService = new AnalyticsService();
//# sourceMappingURL=analyticsService.optimized.js.map