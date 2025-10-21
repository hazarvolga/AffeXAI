"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhooksService = void 0;
const http_client_1 = require("./http-client");
exports.webhooksService = {
    /**
     * Get all webhooks
     */
    async getAll() {
        const response = await http_client_1.httpClient.get('/automation/webhooks');
        return response.data;
    },
    /**
     * Get active webhooks
     */
    async getActive() {
        const response = await http_client_1.httpClient.get('/automation/webhooks/active');
        return response.data;
    },
    /**
     * Get a single webhook
     */
    async getOne(id) {
        const response = await http_client_1.httpClient.get(`/automation/webhooks/${id}`);
        return response.data;
    },
    /**
     * Create a new webhook
     */
    async create(data) {
        const response = await http_client_1.httpClient.post('/automation/webhooks', data);
        return response.data;
    },
    /**
     * Update a webhook
     */
    async update(id, data) {
        const response = await http_client_1.httpClient.put(`/automation/webhooks/${id}`, data);
        return response.data;
    },
    /**
     * Delete a webhook
     */
    async delete(id) {
        await http_client_1.httpClient.delete(`/automation/webhooks/${id}`);
    },
    /**
     * Test webhook connection
     */
    async test(id) {
        const response = await http_client_1.httpClient.post(`/automation/webhooks/${id}/test`);
        return response.data;
    },
    /**
     * Get webhook statistics
     */
    async getStats(id) {
        const response = await http_client_1.httpClient.get(`/automation/webhooks/${id}/stats`);
        return response.data;
    },
    /**
     * Get overall webhook statistics
     */
    async getOverallStats() {
        const response = await http_client_1.httpClient.get('/automation/webhooks/stats/overall');
        return response.data;
    },
};
//# sourceMappingURL=webhooksService.js.map