"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abTestService = void 0;
const http_client_1 = require("./http-client");
/**
 * A/B Test Service
 * Handles A/B testing operations for email campaigns
 */
class AbTestService {
    endpoint = '/email-marketing/ab-test';
    /**
     * Create a new A/B test for a campaign
     */
    async createAbTest(data) {
        return http_client_1.httpClient.postWrapped(this.endpoint, data);
    }
    /**
     * Get A/B test results with statistical analysis
     */
    async getResults(campaignId) {
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/${campaignId}/results`);
    }
    /**
     * Get A/B test summary
     */
    async getSummary(campaignId) {
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/${campaignId}/summary`);
    }
    /**
     * Update a variant's content
     */
    async updateVariant(campaignId, variantId, data) {
        return http_client_1.httpClient.putWrapped(`${this.endpoint}/${campaignId}/variants/${variantId}`, data);
    }
    /**
     * Send A/B test (start the test)
     */
    async sendAbTest(data) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/${data.campaignId}/send`, data);
    }
    /**
     * Manually select winner
     */
    async selectWinner(campaignId, variantId) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/${campaignId}/select-winner`, { variantId });
    }
    /**
     * Delete A/B test
     */
    async deleteAbTest(campaignId) {
        return http_client_1.httpClient.deleteWrapped(`${this.endpoint}/${campaignId}`);
    }
}
exports.abTestService = new AbTestService();
exports.default = exports.abTestService;
//# sourceMappingURL=abTestService.js.map