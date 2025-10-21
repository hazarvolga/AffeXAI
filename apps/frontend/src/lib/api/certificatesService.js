"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificatesService = void 0;
const http_client_1 = require("./http-client");
const base_service_1 = require("./base-service");
class CertificatesService extends base_service_1.BaseApiService {
    constructor() {
        super({ endpoint: '/certificates/v2', useWrappedResponses: true });
    }
    async getAllCertificates(filters) {
        const params = new URLSearchParams();
        if (filters?.status)
            params.append('status', filters.status);
        if (filters?.userId)
            params.append('userId', filters.userId);
        const url = params.toString() ? `${this.endpoint}?${params}` : this.endpoint;
        return http_client_1.httpClient.getWrapped(url);
    }
    async getStatistics() {
        return http_client_1.httpClient.getWrapped(`${this.endpoint}/statistics`);
    }
    async getTemplates() {
        return http_client_1.httpClient.getWrapped('/certificates/templates');
    }
    async getTemplate(id) {
        return http_client_1.httpClient.getWrapped(`/certificates/templates/${id}`);
    }
    async updateTemplate(id, data) {
        return http_client_1.httpClient.putWrapped(`/certificates/templates/${id}`, data);
    }
    async generatePdf(id) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/${id}/generate-pdf`);
    }
    async sendEmail(id) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/${id}/send-email`);
    }
    async generateAndSend(id) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/${id}/generate-and-send`);
    }
}
exports.certificatesService = new CertificatesService();
exports.default = exports.certificatesService;
//# sourceMappingURL=certificatesService.js.map