"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailCampaignsService = void 0;
const http_client_1 = require("./http-client");
const base_service_1 = require("./base-service");
/**
 * Email Campaigns Service
 * Handles email campaign operations extending BaseApiService
 */
class EmailCampaignsService extends base_service_1.BaseApiService {
    constructor() {
        super({ endpoint: '/email-campaigns', useWrappedResponses: true });
    }
    /**
     * Send campaign to recipients
     */
    async sendCampaign(id) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/${id}/send`);
    }
    /**
     * Get campaign statistics
     */
    async getCampaignStats(id) {
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/${id}/stats`);
    }
    /**
     * Schedule a campaign for future sending
     */
    async scheduleCampaign(id, scheduledAt) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/${id}/schedule`, {
            scheduledAt,
        });
    }
    /**
     * Cancel a scheduled campaign
     */
    async cancelSchedule(id) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/${id}/cancel-schedule`);
    }
    /**
     * Reschedule a campaign
     */
    async rescheduleCampaign(id, scheduledAt) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/${id}/reschedule`, {
            scheduledAt,
        });
    }
    /**
     * Get all scheduled campaigns
     */
    async getScheduledCampaigns() {
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/scheduled/list`);
    }
    /**
     * Get scheduling statistics
     */
    async getSchedulingStats() {
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/scheduled/stats`);
    }
}
exports.emailCampaignsService = new EmailCampaignsService();
exports.default = exports.emailCampaignsService;
//# sourceMappingURL=emailCampaignsService.js.map