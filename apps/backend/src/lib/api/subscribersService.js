"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = __importDefault(require("./httpClient"));
class SubscribersService {
    async getAllSubscribers() {
        return httpClient_1.default.get('/email-marketing/subscribers');
    }
    async getSubscriberById(id) {
        return httpClient_1.default.get(`/email-marketing/subscribers/${id}`);
    }
    async createSubscriber(subscriberData) {
        return httpClient_1.default.post('/email-marketing/subscribers', subscriberData);
    }
    async updateSubscriber(id, subscriberData) {
        return httpClient_1.default.patch(`/email-marketing/subscribers/${id}`, subscriberData);
    }
    async deleteSubscriber(id) {
        return httpClient_1.default.delete(`/email-marketing/subscribers/${id}`);
    }
    async subscribe(email) {
        return httpClient_1.default.post('/email-marketing/subscribers/subscribe', { email });
    }
    async unsubscribe(email) {
        return httpClient_1.default.post('/email-marketing/subscribers/unsubscribe', { email });
    }
}
exports.default = new SubscribersService();
//# sourceMappingURL=subscribersService.js.map