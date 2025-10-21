"use strict";
// Frontend CMS Service
// This service interacts with the backend CMS API
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmsService = exports.CmsService = void 0;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9005/api';
class CmsService {
    async request(endpoint, options = {}) {
        const url = `${BASE_URL}${endpoint}`;
        const config = {
            credentials: 'include', // Include cookies in cross-origin requests
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };
        const response = await fetch(url, config);
        if (!response.ok) {
            // Try to parse error response, but handle case where there's no body
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            }
            catch (e) {
                // If we can't parse JSON, use the status text
                errorMessage = response.statusText || errorMessage;
            }
            throw new Error(errorMessage);
        }
        // Handle case where response is empty (204 No Content, etc.)
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            // If response is not JSON, return null cast to T
            return null;
        }
        try {
            return await response.json();
        }
        catch (error) {
            console.error('Failed to parse JSON response:', error);
            throw new Error('Failed to parse server response');
        }
    }
    // Page methods
    async getPages(status) {
        const query = status ? `?status=${status}` : '';
        return this.request(`/cms/pages${query}`);
    }
    async getPage(id, withComponents = false) {
        const headers = {};
        if (withComponents) {
            headers['x-version'] = 'with-components';
        }
        return this.request(`/cms/pages/${id}`, { headers });
    }
    async getPageBySlug(slug, withComponents = false) {
        const headers = {};
        if (withComponents) {
            headers['x-version'] = 'with-components';
        }
        return this.request(`/cms/pages/slug/${slug}`, { headers });
    }
    async createPage(data) {
        return this.request('/cms/pages', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async updatePage(id, data) {
        return this.request(`/cms/pages/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
    async deletePage(id) {
        return this.request(`/cms/pages/${id}`, {
            method: 'DELETE',
        });
    }
    async publishPage(id) {
        return this.request(`/cms/pages/${id}/publish`, {
            method: 'POST',
        });
    }
    async unpublishPage(id) {
        return this.request(`/cms/pages/${id}/unpublish`, {
            method: 'POST',
        });
    }
    // Versioning methods
    async createPageVersion(id) {
        return this.request(`/cms/pages/${id}/version`, {
            method: 'POST',
        });
    }
    async getPageVersion(id, version) {
        return this.request(`/cms/pages/${id}/version/${version}`);
    }
    async getPageVersions(id) {
        return this.request(`/cms/pages/${id}/versions`);
    }
    async rollbackPageToVersion(id, version) {
        return this.request(`/cms/pages/${id}/rollback/${version}`, {
            method: 'POST',
        });
    }
    // Component methods
    async getComponents(pageId) {
        const query = pageId ? `?pageId=${pageId}` : '';
        return this.request(`/cms/components${query}`);
    }
    async getComponent(id) {
        return this.request(`/cms/components/${id}`);
    }
    async createComponent(data) {
        return this.request('/cms/components', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async updateComponent(id, data) {
        return this.request(`/cms/components/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
    async deleteComponent(id) {
        return this.request(`/cms/components/${id}`, {
            method: 'DELETE',
        });
    }
    async reorderComponents(componentIds, orderIndexes) {
        return this.request('/cms/components/reorder', {
            method: 'POST',
            body: JSON.stringify({ componentIds, orderIndexes }),
        });
    }
    // Batch operations
    async batchCreateComponents(components) {
        return this.request('/cms/components/batch', {
            method: 'POST',
            body: JSON.stringify(components),
        });
    }
    async batchUpdateComponents(updates) {
        return this.request('/cms/components/batch', {
            method: 'PATCH',
            body: JSON.stringify(updates),
        });
    }
    async batchDeleteComponents(ids) {
        return this.request('/cms/components/batch', {
            method: 'DELETE',
            body: JSON.stringify(ids),
        });
    }
    // Batch page operations
    async batchCreatePages(pages) {
        return this.request('/cms/pages/batch', {
            method: 'POST',
            body: JSON.stringify(pages),
        });
    }
    async batchUpdatePages(updates) {
        return this.request('/cms/pages/batch', {
            method: 'PATCH',
            body: JSON.stringify(updates),
        });
    }
    // Category methods
    async getCategories() {
        return this.request('/cms/categories');
    }
    async getCategory(id) {
        return this.request(`/cms/categories/${id}`);
    }
    async createCategory(data) {
        return this.request('/cms/categories', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    // Menu methods
    async getMenus() {
        return this.request('/cms/menus');
    }
    async getMenu(id) {
        return this.request(`/cms/menus/${id}`);
    }
    async addPageToMenu(menuId, pageId, label, orderIndex) {
        return this.request(`/cms/menus/${menuId}/items`, {
            method: 'POST',
            body: JSON.stringify({ pageId, label, orderIndex }),
        });
    }
    async removePageFromMenu(menuId, itemId) {
        return this.request(`/cms/menus/${menuId}/items/${itemId}`, {
            method: 'DELETE',
        });
    }
}
exports.CmsService = CmsService;
exports.cmsService = new CmsService();
//# sourceMappingURL=cms-service.js.map