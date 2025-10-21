"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidationService = void 0;
const http_client_1 = require("./http-client");
/**
 * Email Validation Service
 * Handles email validation operations
 */
class EmailValidationService {
    async validateEmail(email, ip) {
        try {
            const params = new URLSearchParams({ email });
            if (ip) {
                params.append('ip', ip);
            }
            const response = await http_client_1.httpClient.getWrapped(`/email-marketing/subscribers/validate-email?${params.toString()}`);
            return response;
        }
        catch (error) {
            console.error('Error validating email:', error);
            return {
                email,
                isValid: false,
                status: 'unknown',
                confidence: 0,
                error: error.message || 'Validation failed'
            };
        }
    }
}
exports.emailValidationService = new EmailValidationService();
exports.default = exports.emailValidationService;
//# sourceMappingURL=emailValidationService.js.map