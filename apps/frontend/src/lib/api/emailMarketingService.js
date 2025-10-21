"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailMarketingService = void 0;
const http_client_1 = require("./http-client");
const base_service_1 = require("./base-service");
/**
 * Email Marketing Service
 * Handles campaigns, subscribers, and email templates
 */
class EmailMarketingService extends base_service_1.BaseApiService {
    constructor() {
        super({ endpoint: '/email-campaigns', useWrappedResponses: true });
    }
    /**
     * Get all campaigns
     */
    async getCampaigns() {
        return this.getAll();
    }
    /**
     * Send a campaign
     */
    async sendCampaign(campaignId) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/${campaignId}/send`, undefined);
    }
    /**
     * Schedule a campaign
     */
    async scheduleCampaign(campaignId, scheduledDate) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/${campaignId}/schedule`, { scheduledDate });
    }
    /**
     * Get campaign analytics
     */
    async getCampaignAnalytics(campaignId) {
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/${campaignId}/stats`);
    }
    // Subscribers methods
    async getSubscribers() {
        return http_client_1.httpClient.getWrapped('/email-marketing/subscribers');
    }
    async createSubscriber(data) {
        return http_client_1.httpClient.postWrapped('/email-marketing/subscribers', data);
    }
    async updateSubscriber(id, data) {
        return http_client_1.httpClient.patchWrapped(`/email-marketing/subscribers/${id}`, data);
    }
    async deleteSubscriber(id) {
        return http_client_1.httpClient.delete(`/email-marketing/subscribers/${id}`);
    }
    // Templates methods
    async getTemplates() {
        return http_client_1.httpClient.getWrapped('/email-templates');
    }
    async getTemplateById(id) {
        return http_client_1.httpClient.getWrapped(`/email-templates/${id}`);
    }
    async createTemplate(data) {
        return http_client_1.httpClient.postWrapped('/email-templates', data);
    }
    async updateTemplate(id, data) {
        return http_client_1.httpClient.patchWrapped(`/email-templates/${id}`, data);
    }
    async deleteTemplate(id) {
        return http_client_1.httpClient.delete(`/email-marketing/templates/${id}`);
    }
}
exports.emailMarketingService = new EmailMarketingService();
exports.default = exports.emailMarketingService;
//# sourceMappingURL=emailMarketingService.js.map