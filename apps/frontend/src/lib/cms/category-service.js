"use strict";
// Frontend CMS Category Service
// This service interacts with the backend CMS Category API using unified HTTP client
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmsCategoryService = exports.CmsCategoryService = void 0;
const http_client_1 = require("../api/http-client");
/**
 * CMS Category Service
 * Handles all CMS Category operations with unified HTTP client
 */
class CmsCategoryService {
    /**
     * Get all categories (flat list)
     */
    async getCategories(params) {
        const queryParams = new URLSearchParams();
        if (params?.parentId !== undefined) {
            queryParams.append('parentId', params.parentId === null ? 'null' : params.parentId);
        }
        if (params?.isActive !== undefined) {
            queryParams.append('isActive', params.isActive.toString());
        }
        if (params?.search) {
            queryParams.append('search', params.search);
        }
        const query = queryParams.toString();
        return http_client_1.httpClient.getWrapped(`/cms/categories${query ? `?${query}` : ''}`);
    }
    /**
     * Get category tree (hierarchical structure)
     */
    async getCategoryTree() {
        return http_client_1.httpClient.getWrapped('/cms/categories/tree');
    }
    /**
     * Get category by ID
     */
    async getCategory(id) {
        return http_client_1.httpClient.getWrapped(`/cms/categories/${id}`);
    }
    /**
     * Get category by slug
     */
    async getCategoryBySlug(slug) {
        return http_client_1.httpClient.getWrapped(`/cms/categories/slug/${slug}`);
    }
    /**
     * Create a new category
     */
    async createCategory(data) {
        return http_client_1.httpClient.postWrapped('/cms/categories', data);
    }
    /**
     * Update existing category
     */
    async updateCategory(id, data) {
        return http_client_1.httpClient.patchWrapped(`/cms/categories/${id}`, data);
    }
    /**
     * Delete category
     */
    async deleteCategory(id) {
        return http_client_1.httpClient.deleteWrapped(`/cms/categories/${id}`);
    }
    /**
     * Reorder categories
     */
    async reorderCategories(data) {
        await http_client_1.httpClient.postWrapped('/cms/categories/reorder', data);
    }
}
exports.CmsCategoryService = CmsCategoryService;
// Export singleton instance
exports.cmsCategoryService = new CmsCategoryService();
//# sourceMappingURL=category-service.js.map