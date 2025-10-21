"use strict";
// Frontend CMS Menu Service
// This service interacts with the backend CMS Menu API using unified HTTP client
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmsMenuService = exports.CmsMenuService = void 0;
const http_client_1 = require("../api/http-client");
/**
 * CMS Menu Service
 * Handles all CMS Menu and Menu Item operations with unified HTTP client
 */
class CmsMenuService {
    // ==========================================================================
    // Menu Operations
    // ==========================================================================
    /**
     * Get all menus
     */
    async getMenus(params) {
        const queryParams = new URLSearchParams();
        if (params?.location) {
            queryParams.append('location', params.location);
        }
        if (params?.isActive !== undefined) {
            queryParams.append('isActive', params.isActive.toString());
        }
        if (params?.search) {
            queryParams.append('search', params.search);
        }
        const query = queryParams.toString();
        return http_client_1.httpClient.getWrapped(`/cms/menus${query ? `?${query}` : ''}`);
    }
    /**
     * Get menu by ID
     */
    async getMenu(id) {
        return http_client_1.httpClient.getWrapped(`/cms/menus/${id}`);
    }
    /**
     * Get menu by slug
     */
    async getMenuBySlug(slug) {
        return http_client_1.httpClient.getWrapped(`/cms/menus/slug/${slug}`);
    }
    /**
     * Create a new menu
     */
    async createMenu(data) {
        return http_client_1.httpClient.postWrapped('/cms/menus', data);
    }
    /**
     * Update existing menu
     */
    async updateMenu(id, data) {
        return http_client_1.httpClient.patchWrapped(`/cms/menus/${id}`, data);
    }
    /**
     * Delete menu
     */
    async deleteMenu(id) {
        return http_client_1.httpClient.deleteWrapped(`/cms/menus/${id}`);
    }
    // ==========================================================================
    // Menu Item Operations
    // ==========================================================================
    /**
     * Get all menu items for a specific menu (flat list)
     */
    async getMenuItems(menuId) {
        return http_client_1.httpClient.getWrapped(`/cms/menus/${menuId}/items`);
    }
    /**
     * Get menu item tree (hierarchical structure)
     */
    async getMenuItemTree(menuId) {
        return http_client_1.httpClient.getWrapped(`/cms/menus/${menuId}/items/tree`);
    }
    /**
     * Get menu item by ID
     */
    async getMenuItem(id) {
        return http_client_1.httpClient.getWrapped(`/cms/menus/items/${id}`);
    }
    /**
     * Create a new menu item
     */
    async createMenuItem(data) {
        return http_client_1.httpClient.postWrapped('/cms/menus/items', data);
    }
    /**
     * Update existing menu item
     */
    async updateMenuItem(id, data) {
        return http_client_1.httpClient.patchWrapped(`/cms/menus/items/${id}`, data);
    }
    /**
     * Delete menu item
     */
    async deleteMenuItem(id) {
        return http_client_1.httpClient.deleteWrapped(`/cms/menus/items/${id}`);
    }
    /**
     * Reorder menu items
     */
    async reorderMenuItems(data) {
        await http_client_1.httpClient.postWrapped('/cms/menus/items/reorder', data);
    }
}
exports.CmsMenuService = CmsMenuService;
// Export singleton instance
exports.cmsMenuService = new CmsMenuService();
//# sourceMappingURL=menu-service.js.map