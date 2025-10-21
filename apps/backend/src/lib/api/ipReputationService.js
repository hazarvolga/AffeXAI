"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = __importDefault(require("./httpClient"));
class IpReputationService {
    /**
     * Check the reputation of an IP address
     * @param ip The IP address to check
     * @returns IP reputation result
     */
    async checkIpReputation(ip) {
        try {
            const response = await httpClient_1.default.get(`/email-marketing/ip-reputation/${ip}`);
            return response;
        }
        catch (error) {
            console.error('Error checking IP reputation:', error);
            throw error;
        }
    }
}
exports.default = new IpReputationService();
//# sourceMappingURL=ipReputationService.js.map