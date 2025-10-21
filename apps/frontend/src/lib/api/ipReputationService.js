"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipReputationService = void 0;
const http_client_1 = require("./http-client");
/**
 * IP Reputation Service
 * Handles IP reputation checking operations
 */
class IpReputationService {
    /**
     * Check the reputation of an IP address
     * @param ip The IP address to check
     * @returns IP reputation result
     */
    async checkIpReputation(ip) {
        try {
            const response = await http_client_1.httpClient.getWrapped(`/email-marketing/ip-reputation/${ip}`);
            return response;
        }
        catch (error) {
            console.error('Error checking IP reputation:', error);
            throw error;
        }
    }
}
exports.ipReputationService = new IpReputationService();
exports.default = exports.ipReputationService;
//# sourceMappingURL=ipReputationService.js.map