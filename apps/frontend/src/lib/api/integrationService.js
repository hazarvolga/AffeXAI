"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integrationService = void 0;
const http_client_1 = require("./http-client");
exports.integrationService = {
    /**
     * Get all platform events
     */
    async getEvents(limit) {
        const response = await http_client_1.httpClient.get('/integration/events', {
            params: { limit },
        });
        return response.data;
    },
    /**
     * Get events by type
     */
    async getEventsByType(eventType, limit) {
        const response = await http_client_1.httpClient.get(`/integration/events/type/${eventType}`, {
            params: { limit },
        });
        return response.data;
    },
    /**
     * Get events by source
     */
    async getEventsBySource(source, limit) {
        const response = await http_client_1.httpClient.get(`/integration/events/source/${source}`, {
            params: { limit },
        });
        return response.data;
    },
    /**
     * Get events that triggered automation
     */
    async getEventsWithAutomation(limit) {
        const response = await http_client_1.httpClient.get('/integration/events/automated', {
            params: { limit },
        });
        return response.data;
    },
    /**
     * Get event statistics
     */
    async getStats(startDate, endDate) {
        const response = await http_client_1.httpClient.get('/integration/events/stats', {
            params: { startDate, endDate },
        });
        return response.data;
    },
};
//# sourceMappingURL=integrationService.js.map