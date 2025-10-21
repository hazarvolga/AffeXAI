"use strict";
// Media Service
// This service handles media uploads and management for the CMS
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaService = exports.MediaService = void 0;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
class MediaService {
    async request(endpoint, options = {}) {
        const url = `${BASE_URL}${endpoint}`;
        const config = {
            credentials: 'include',
            ...options,
        };
        const response = await fetch(url, config);
        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            }
            catch (e) {
                errorMessage = response.statusText || errorMessage;
            }
            throw new Error(errorMessage);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
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
    // Media methods
    async getMediaItems() {
        return this.request('/cms/media');
    }
    async getMediaItem(id) {
        return this.request(`/cms/media/${id}`);
    }
    async uploadMedia(data) {
        const formData = new FormData();
        formData.append('file', data.file);
        if (data.altText) {
            formData.append('altText', data.altText);
        }
        if (data.caption) {
            formData.append('caption', data.caption);
        }
        return this.request('/cms/media', {
            method: 'POST',
            body: formData,
        });
    }
    async updateMedia(id, data) {
        return this.request(`/cms/media/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    async deleteMedia(id) {
        return this.request(`/cms/media/${id}`, {
            method: 'DELETE',
        });
    }
}
exports.MediaService = MediaService;
exports.mediaService = new MediaService();
//# sourceMappingURL=media-service.js.map