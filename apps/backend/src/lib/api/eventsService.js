"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = __importDefault(require("./httpClient"));
class EventsService {
    async getAllEvents() {
        return httpClient_1.default.get('/events');
    }
    async getEventById(id) {
        return httpClient_1.default.get(`/events/${id}`);
    }
    // Add method to fetch dashboard stats
    async getDashboardStats() {
        return httpClient_1.default.get('/events/stats');
    }
    async createEvent(eventData) {
        return httpClient_1.default.post('/events', eventData);
    }
    async updateEvent(id, eventData) {
        return httpClient_1.default.patch(`/events/${id}`, eventData);
    }
    async deleteEvent(id) {
        return httpClient_1.default.delete(`/events/${id}`);
    }
}
exports.default = new EventsService();
//# sourceMappingURL=eventsService.js.map