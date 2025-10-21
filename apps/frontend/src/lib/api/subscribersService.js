"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribersService = void 0;
const http_client_1 = require("./http-client");
const base_service_1 = require("./base-service");
/**
 * Subscribers Service
 * Handles email marketing subscriber operations extending BaseApiService
 */
class SubscribersService extends base_service_1.BaseApiService {
    constructor() {
        super({ endpoint: '/email-marketing/subscribers', useWrappedResponses: true });
    }
    async subscribe(email) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/subscribe`, { email });
    }
    async unsubscribe(email) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/unsubscribe`, { email });
    }
}
exports.subscribersService = new SubscribersService();
exports.default = exports.subscribersService;
//# sourceMappingURL=subscribersService.js.map