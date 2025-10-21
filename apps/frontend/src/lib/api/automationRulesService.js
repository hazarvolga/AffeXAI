"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.automationRulesService = void 0;
const http_client_1 = require("./http-client");
exports.automationRulesService = {
    /**
     * Get all automation rules
     */
    async getAll() {
        const response = await http_client_1.httpClient.get('/automation/rules');
        return response.data;
    },
    /**
     * Get active automation rules
     */
    async getActive() {
        const response = await http_client_1.httpClient.get('/automation/rules/active');
        return response.data;
    },
    /**
     * Get a single automation rule
     */
    async getOne(id) {
        const response = await http_client_1.httpClient.get(`/automation/rules/${id}`);
        return response.data;
    },
    /**
     * Create a new automation rule
     */
    async create(data) {
        const response = await http_client_1.httpClient.post('/automation/rules', data);
        return response.data;
    },
    /**
     * Update an automation rule
     */
    async update(id, data) {
        const response = await http_client_1.httpClient.put(`/automation/rules/${id}`, data);
        return response.data;
    },
    /**
     * Delete an automation rule
     */
    async delete(id) {
        await http_client_1.httpClient.delete(`/automation/rules/${id}`);
    },
    /**
     * Toggle automation rule active status
     */
    async toggle(id) {
        const response = await http_client_1.httpClient.put(`/automation/rules/${id}/toggle`);
        return response.data;
    },
};
//# sourceMappingURL=automationRulesService.js.map