"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = __importDefault(require("./httpClient"));
class EmailCampaignsService {
    async getAllCampaigns() {
        return httpClient_1.default.get('/email-campaigns');
    }
    async getCampaignById(id) {
        return httpClient_1.default.get(`/email-campaigns/${id}`);
    }
    async createCampaign(campaignData) {
        return httpClient_1.default.post('/email-campaigns', campaignData);
    }
    async updateCampaign(id, campaignData) {
        return httpClient_1.default.patch(`/email-campaigns/${id}`, campaignData);
    }
    async deleteCampaign(id) {
        return httpClient_1.default.delete(`/email-campaigns/${id}`);
    }
    async sendCampaign(id) {
        return httpClient_1.default.post(`/email-campaigns/${id}/send`);
    }
    async getCampaignStats(id) {
        return httpClient_1.default.get(`/email-campaigns/${id}/stats`);
    }
}
exports.default = new EmailCampaignsService();
//# sourceMappingURL=emailCampaignsService.js.map