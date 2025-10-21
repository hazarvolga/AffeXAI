"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templatesService = void 0;
const http_client_1 = require("./http-client");
const base_service_1 = require("./base-service");
/**
 * Email Templates Service
 * Handles email template operations extending BaseApiService
 */
class TemplatesService extends base_service_1.BaseApiService {
    constructor() {
        super({ endpoint: '/email-templates', useWrappedResponses: true });
    }
    /**
     * Get all templates (override to return custom response type)
     */
    async getAll() {
        const response = await http_client_1.httpClient.getWrapped(this.endpoint);
        // Return dbTemplates for compatibility with BaseApiService
        return response.dbTemplates;
    }
    /**
     * Get all templates with file templates included
     */
    async getAllTemplates() {
        return http_client_1.httpClient.getWrapped(this.endpoint);
    }
    /**
     * Create template from file
     */
    async createTemplateFromFile(fileTemplateName, name) {
        return http_client_1.httpClient.postWrapped(`${this.endpoint}/from-file/${fileTemplateName}`, { name });
    }
}
exports.templatesService = new TemplatesService();
exports.default = exports.templatesService;
//# sourceMappingURL=templatesService.js.map