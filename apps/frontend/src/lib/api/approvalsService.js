"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approvalsService = void 0;
const http_client_1 = require("./http-client");
exports.approvalsService = {
    /**
     * Get all approval requests
     */
    async getAll() {
        return http_client_1.httpClient.get('/automation/approvals');
    },
    /**
     * Get pending approval requests
     */
    async getPending() {
        return http_client_1.httpClient.get('/automation/approvals/pending');
    },
    /**
     * Get a single approval request
     */
    async getOne(id) {
        return http_client_1.httpClient.get(`/automation/approvals/${id}`);
    },
    /**
     * Approve an approval request
     */
    async approve(id, userId, userName, comment) {
        return http_client_1.httpClient.post(`/automation/approvals/${id}/approve`, {
            userId,
            userName,
            comment,
        });
    },
    /**
     * Reject an approval request
     */
    async reject(id, userId, userName, comment) {
        return http_client_1.httpClient.post(`/automation/approvals/${id}/reject`, {
            userId,
            userName,
            comment,
        });
    },
    /**
     * Get approval statistics
     */
    async getStats() {
        return http_client_1.httpClient.get('/automation/approvals/stats/overview');
    },
};
//# sourceMappingURL=approvalsService.js.map