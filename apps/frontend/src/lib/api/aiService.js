"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiService = void 0;
const http_client_1 = require("./http-client");
class AiService {
    /**
     * Generate email subject using AI
     */
    async generateEmailSubject(data) {
        return http_client_1.httpClient.postWrapped('/ai/email/subject', data);
    }
    /**
     * Generate email body using AI
     */
    async generateEmailBody(data) {
        return http_client_1.httpClient.postWrapped('/ai/email/body', data);
    }
    /**
     * Generate both subject and body using AI
     */
    async generateEmailBoth(data) {
        return http_client_1.httpClient.postWrapped('/ai/email/both', data);
    }
}
exports.aiService = new AiService();
exports.default = exports.aiService;
//# sourceMappingURL=aiService.js.map