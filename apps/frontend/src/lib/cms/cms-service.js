"use strict";
// Frontend CMS Service
// This service interacts with the backend CMS API using unified HTTP client
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmsService = exports.CmsService = void 0;
const http_client_1 = require("../api/http-client");
/**
 * CMS Service
 * Handles all CMS-related API operations with unified HTTP client
 * Note: Uses wrapped methods because backend uses global ApiResponse wrapper
 */
class CmsService {
    // ==========================================================================
    // Page Methods
    // ==========================================================================
    /**
     * Get all pages, optionally filtered by status
     */
    async getPages(status) {
        const query = status ? `?status=${status}` : '';
        return http_client_1.httpClient.getWrapped(`/cms/pages${query}`);
    }
    /**
     * Get page by ID
     */
    async getPage(id) {
        return http_client_1.httpClient.getWrapped(`/cms/pages/${id}`);
    }
    /**
     * Get page by slug
     */
    async getPageBySlug(slug) {
        return http_client_1.httpClient.getWrapped(`/cms/pages/slug/${slug}`);
    }
    /**
     * Create a new page
     */
    async createPage(data) {
        return http_client_1.httpClient.postWrapped('/cms/pages', data);
    }
    /**
     * Update existing page
     */
    /**
     * Update existing page
     */
    async updatePage(id, data) {
        return http_client_1.httpClient.patchWrapped(`/cms/pages/${id}`, data);
    }
    /**
     * Delete page
     */
    async deletePage(id) {
        return http_client_1.httpClient.deleteWrapped(`/cms/pages/${id}`);
    }
    /**
     * Publish page
     */
    async publishPage(id) {
        return http_client_1.httpClient.postWrapped(`/cms/pages/${id}/publish`);
    }
    /**
     * Unpublish page
     */
    async unpublishPage(id) {
        return http_client_1.httpClient.postWrapped(`/cms/pages/${id}/unpublish`);
    }
    // ==========================================================================
    // Component Methods
    // ==========================================================================
    /**
     * Get all components, optionally filtered by page ID
     */
    async getComponents(pageId) {
        const query = pageId ? `?pageId=${pageId}` : '';
        return http_client_1.httpClient.getWrapped(`/cms/components${query}`);
    }
    /**
     * Get component by ID
     */
    async getComponent(id) {
        return http_client_1.httpClient.getWrapped(`/cms/components/${id}`);
    }
    /**
     * Create a new component
     */
    async createComponent(data) {
        return http_client_1.httpClient.postWrapped('/cms/components', data);
    }
    /**
     * Update existing component
     */
    async updateComponent(id, data) {
        return http_client_1.httpClient.patchWrapped(`/cms/components/${id}`, data);
    }
    /**
     * Delete component
     */
    async deleteComponent(id) {
        return http_client_1.httpClient.deleteWrapped(`/cms/components/${id}`);
    }
    /**
     * Reorder components
     */
    async reorderComponents(data) {
        return http_client_1.httpClient.postWrapped('/cms/components/reorder', data);
    }
    // ==========================================================================
    // Category Methods
    // ==========================================================================
    /**
     * Get all categories
     */
    async getCategories() {
        return http_client_1.httpClient.getWrapped('/cms/categories');
    }
    /**
     * Get category by ID
     */
    async getCategory(id) {
        return http_client_1.httpClient.getWrapped(`/cms/categories/${id}`);
    }
    /**
     * Create a new category
     */
    async createCategory(data) {
        return http_client_1.httpClient.postWrapped('/cms/categories', data);
    }
    // ==========================================================================
    // Menu Methods
    // ==========================================================================
    /**
     * Get all menus
     */
    async getMenus() {
        return http_client_1.httpClient.getWrapped('/cms/menus');
    }
    /**
     * Get menu by ID
     */
    async getMenu(id) {
        return http_client_1.httpClient.getWrapped(`/cms/menus/${id}`);
    }
    /**
     * Add page to menu with hierarchical placement support
     */
    async addPageToMenu(menuId, pageId, label, orderIndex, parentId) {
        return http_client_1.httpClient.postWrapped(`/cms/menus/${menuId}/items`, {
            pageId,
            label,
            orderIndex,
            parentId: parentId || undefined,
        });
    }
    /**
     * Remove page from menu
     */
    async removePageFromMenu(menuId, itemId) {
        return http_client_1.httpClient.deleteWrapped(`/cms/menus/${menuId}/items/${itemId}`);
    }
}
exports.CmsService = CmsService;
exports.cmsService = new CmsService();
//# sourceMappingURL=cms-service.js.map