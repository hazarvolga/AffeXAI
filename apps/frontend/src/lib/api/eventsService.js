"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsService = void 0;
const http_client_1 = require("./http-client");
const base_service_1 = require("./base-service");
/**
 * Events Service
 * Handles event operations extending BaseApiService
 */
class EventsService extends base_service_1.BaseApiService {
    constructor() {
        super({ endpoint: '/events', useWrappedResponses: true });
    }
    /**
     * Get dashboard statistics
     */
    async getDashboardStats() {
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/stats`);
    }
    /**
     * Generate certificates for all event attendees
     */
    async generateBulkCertificates(request) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/${request.eventId}/certificates/bulk`, request);
    }
    /**
     * Get events with query parameters
     */
    async getEvents(params) {
        return this.getAll(params);
    }
}
exports.eventsService = new EventsService();
exports.default = exports.eventsService;
//# sourceMappingURL=eventsService.js.map