"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = __importDefault(require("./httpClient"));
class TemplatesService {
    async getAllTemplates() {
        return httpClient_1.default.get('/email-templates');
    }
    async getTemplateById(id) {
        return httpClient_1.default.get(`/email-templates/${id}`);
    }
    async createTemplate(templateData) {
        return httpClient_1.default.post('/email-templates', templateData);
    }
    async createTemplateFromFile(fileTemplateName, name) {
        return httpClient_1.default.post(`/email-templates/from-file/${fileTemplateName}`, { name });
    }
    async updateTemplate(id, templateData) {
        return httpClient_1.default.patch(`/email-templates/${id}`, templateData);
    }
    async deleteTemplate(id) {
        return httpClient_1.default.delete(`/email-templates/${id}`);
    }
}
exports.default = new TemplatesService();
//# sourceMappingURL=templatesService.js.map