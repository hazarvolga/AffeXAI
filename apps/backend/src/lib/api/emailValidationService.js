"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = __importDefault(require("./httpClient"));
class EmailValidationService {
    async validateEmail(email, ip) {
        try {
            const params = new URLSearchParams({ email });
            if (ip) {
                params.append('ip', ip);
            }
            const response = await httpClient_1.default.get(`/email-marketing/subscribers/validate-email?${params.toString()}`);
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
exports.default = new EmailValidationService();
//# sourceMappingURL=emailValidationService.js.map