"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const http_client_1 = require("./http-client");
class EmailMarketingStatsService {
    basePath = '/api/email-marketing/stats';
    async getRecipientStats() {
        try {
            const response = await http_client_1.httpClient.get(`${this.basePath}/recipients`);
            return response.data;
        }
        catch (error) {
            // Fallback to fetching data separately if stats endpoint doesn't exist
            console.warn('Stats endpoint not available, fetching data separately');
            // Import services dynamically to avoid circular dependencies
            const { default: subscribersService } = await Promise.resolve().then(() => __importStar(require('./subscribersService')));
            const { default: groupsService } = await Promise.resolve().then(() => __importStar(require('./groupsService')));
            const { default: segmentsService } = await Promise.resolve().then(() => __importStar(require('./segmentsService')));
            const [subscribers, groups, segments] = await Promise.all([
                subscribersService.getAll().catch(() => []),
                groupsService.getAll().catch(() => []),
                segmentsService.getAll().catch(() => [])
            ]);
            return {
                totalActiveSubscribers: Array.isArray(subscribers)
                    ? subscribers.filter((s) => s.status === 'subscribed').length
                    : 0,
                groups: Array.isArray(groups) ? groups : [],
                segments: Array.isArray(segments) ? segments : []
            };
        }
    }
    async getCampaignStats(campaignId) {
        const response = await http_client_1.httpClient.get(`${this.basePath}/campaigns/${campaignId}`);
        return response.data;
    }
    async getOverallStats(startDate, endDate) {
        const params = {};
        if (startDate)
            params.startDate = startDate;
        if (endDate)
            params.endDate = endDate;
        const response = await http_client_1.httpClient.get(`${this.basePath}/overall`, { params });
        return response.data;
    }
}
const emailMarketingStatsService = new EmailMarketingStatsService();
exports.default = emailMarketingStatsService;
//# sourceMappingURL=emailMarketingStatsService.js.map