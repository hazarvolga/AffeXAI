"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateService = void 0;
const http_client_1 = require("./http-client");
const API_BASE = '/cms/templates';
/**
 * Template API Service
 * Handles all template-related API calls
 */
exports.templateService = {
    /**
     * Get all templates with optional filtering
     */
    async getAll(options) {
        const params = new URLSearchParams();
        if (options?.category)
            params.append('category', options.category);
        if (options?.isFeatured !== undefined)
            params.append('isFeatured', String(options.isFeatured));
        if (options?.isActive !== undefined)
            params.append('isActive', String(options.isActive));
        const queryString = params.toString();
        const url = queryString ? `${API_BASE}?${queryString}` : API_BASE;
        return await http_client_1.httpClient.getWrapped(url);
    },
    /**
     * Get a single template by ID
     */
    async getById(id) {
        return await http_client_1.httpClient.getWrapped(`${API_BASE}/${id}`);
    },
    /**
     * Create a new template
     */
    async create(template) {
        return await http_client_1.httpClient.postWrapped(API_BASE, template);
    },
    /**
     * Update a template
     */
    async update(id, template) {
        return await http_client_1.httpClient.putWrapped(`${API_BASE}/${id}`, template);
    },
    /**
     * Delete a template (soft delete)
     */
    async delete(id) {
        await http_client_1.httpClient.deleteWrapped(`${API_BASE}/${id}`);
    },
    /**
     * Get template statistics
     */
    async getStats() {
        return await http_client_1.httpClient.getWrapped(`${API_BASE}/stats`);
    },
    /**
     * Increment template usage count
     */
    async incrementUsage(id) {
        return await http_client_1.httpClient.postWrapped(`${API_BASE}/${id}/use`, {});
    },
    /**
     * Import template from JSON
     */
    async import(request) {
        return await http_client_1.httpClient.postWrapped(`${API_BASE}/import`, request);
    },
    /**
     * Export template as JSON
     */
    async export(id) {
        return await http_client_1.httpClient.getWrapped(`${API_BASE}/${id}/export`);
    },
    /**
     * Duplicate a template
     */
    async duplicate(id, newName) {
        return await http_client_1.httpClient.post(`${API_BASE}/${id}/duplicate`, { name: newName });
    },
    /**
     * Import template from file
     */
    async importFromFile(file, authorId) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const templateData = event.target?.result;
                    const result = await this.import({ templateData, authorId });
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            reader.readAsText(file);
        });
    },
    /**
     * Export template to file (download)
     */
    async exportToFile(id, filename) {
        const exportData = await this.export(id);
        const blob = new Blob([JSON.stringify(exportData.data, null, 2)], {
            type: 'application/json',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || `${exportData.name.toLowerCase().replace(/\s+/g, '-')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },
};
//# sourceMappingURL=templateService.js.map