"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmsMetricsService = void 0;
const http_client_1 = require("./http-client");
/**
 * CMS Metrics Service
 * Tracks page views, link clicks, and content activity
 */
class CmsMetricsService {
    endpoint = '/cms-metrics';
    async getMetrics(period = 'week') {
        return http_client_1.httpClient.getWrapped(`${this.endpoint}?period=${period}`);
    }
    async trackPageView(pageId, pageTitle) {
        try {
            await http_client_1.httpClient.postWrapped(`${this.endpoint}/view`, {
                pageId,
                pageTitle,
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            console.error('Failed to track page view:', error);
        }
    }
    async trackLinkClick(linkUrl, linkText, pageId) {
        try {
            await http_client_1.httpClient.postWrapped(`${this.endpoint}/click`, {
                linkUrl,
                linkText,
                pageId,
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            console.error('Failed to track link click:', error);
        }
    }
    async trackActivity(action, pageId) {
        try {
            await http_client_1.httpClient.postWrapped(`${this.endpoint}/activity`, {
                action,
                pageId,
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            console.error('Failed to track activity:', error);
        }
    }
}
exports.cmsMetricsService = new CmsMetricsService();
//# sourceMappingURL=cmsMetricsService.js.map