"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmsAnalyticsService = exports.ABTestStatus = exports.DeviceType = exports.InteractionType = void 0;
const http_client_1 = require("./http-client");
// Enums matching backend
var InteractionType;
(function (InteractionType) {
    InteractionType["CLICK"] = "click";
    InteractionType["HOVER"] = "hover";
    InteractionType["SCROLL"] = "scroll";
    InteractionType["FOCUS"] = "focus";
    InteractionType["INPUT"] = "input";
    InteractionType["SUBMIT"] = "submit";
    InteractionType["VIEW"] = "view";
    InteractionType["EXIT"] = "exit";
})(InteractionType || (exports.InteractionType = InteractionType = {}));
var DeviceType;
(function (DeviceType) {
    DeviceType["MOBILE"] = "mobile";
    DeviceType["TABLET"] = "tablet";
    DeviceType["DESKTOP"] = "desktop";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
var ABTestStatus;
(function (ABTestStatus) {
    ABTestStatus["DRAFT"] = "draft";
    ABTestStatus["RUNNING"] = "running";
    ABTestStatus["PAUSED"] = "paused";
    ABTestStatus["COMPLETED"] = "completed";
})(ABTestStatus || (exports.ABTestStatus = ABTestStatus = {}));
/**
 * CMS Analytics Service
 * Handles CMS component event tracking, dashboard data, heatmaps, and A/B testing
 */
class CmsAnalyticsService {
    endpoint = '/analytics';
    abTestEndpoint = '/ab-tests';
    // Event Tracking (Public endpoints)
    async trackEvent(dto) {
        try {
            await http_client_1.httpClient.postWrapped(`${this.endpoint}/track`, dto);
        }
        catch (error) {
            console.error('Failed to track CMS event:', error);
        }
    }
    async trackEventsBatch(dto) {
        try {
            return await http_client_1.httpClient.postWrapped(`${this.endpoint}/track/batch`, dto);
        }
        catch (error) {
            console.error('Failed to track batch CMS events:', error);
            return { success: false, count: 0 };
        }
    }
    async getVariantForUser(testId) {
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/ab-test/${testId}/variant`);
    }
    async trackImpression(variantId) {
        try {
            await http_client_1.httpClient.postWrapped(`${this.endpoint}/ab-test/impression`, {
                variantId,
            });
        }
        catch (error) {
            console.error('Failed to track AB test impression:', error);
        }
    }
    async trackConversion(variantId, engagementTime) {
        try {
            await http_client_1.httpClient.postWrapped(`${this.endpoint}/ab-test/conversion`, {
                variantId,
                engagementTime,
            });
        }
        catch (error) {
            console.error('Failed to track AB test conversion:', error);
        }
    }
    // Dashboard (Admin endpoints - require JWT)
    async getDashboardData(query) {
        const params = new URLSearchParams();
        params.append('timeRange', query.timeRange);
        if (query.customStartDate)
            params.append('customStartDate', query.customStartDate);
        if (query.customEndDate)
            params.append('customEndDate', query.customEndDate);
        if (query.pageUrl)
            params.append('pageUrl', query.pageUrl);
        if (query.componentType)
            params.append('componentType', query.componentType);
        if (query.deviceTypes) {
            query.deviceTypes.forEach(dt => params.append('deviceTypes[]', dt));
        }
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/dashboard?${params.toString()}`);
    }
    async getHeatmap(query) {
        const params = new URLSearchParams();
        params.append('componentId', query.componentId);
        params.append('timeRange', query.timeRange);
        if (query.pageUrl)
            params.append('pageUrl', query.pageUrl);
        if (query.customStartDate)
            params.append('customStartDate', query.customStartDate);
        if (query.customEndDate)
            params.append('customEndDate', query.customEndDate);
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/heatmap?${params.toString()}`);
    }
    // A/B Testing (Admin endpoints - require JWT)
    async createABTest(dto) {
        return http_client_1.httpClient.postWrapped(this.abTestEndpoint, dto);
    }
    async getAllABTests(status) {
        const params = status ? `?status=${status}` : '';
        return http_client_1.httpClient.getWrapped(`${this.abTestEndpoint}${params}`);
    }
    async getABTestById(id) {
        return http_client_1.httpClient.getWrapped(`${this.abTestEndpoint}/${id}`);
    }
    async updateABTest(id, dto) {
        return http_client_1.httpClient.putWrapped(`${this.abTestEndpoint}/${id}`, dto);
    }
    async deleteABTest(id) {
        return http_client_1.httpClient.deleteWrapped(`${this.abTestEndpoint}/${id}`);
    }
    async startABTest(id) {
        return http_client_1.httpClient.postWrapped(`${this.abTestEndpoint}/${id}/start`, {});
    }
    async pauseABTest(id) {
        return http_client_1.httpClient.postWrapped(`${this.abTestEndpoint}/${id}/pause`, {});
    }
    async completeABTest(id, winnerVariantId) {
        return http_client_1.httpClient.postWrapped(`${this.abTestEndpoint}/${id}/complete`, {
            winnerVariantId,
        });
    }
}
exports.cmsAnalyticsService = new CmsAnalyticsService();
//# sourceMappingURL=cmsAnalyticsService.js.map