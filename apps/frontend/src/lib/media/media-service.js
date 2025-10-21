"use strict";
// Frontend Media Service
// This service interacts with the backend Media API
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaService = exports.MediaService = void 0;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
class MediaService {
    async request(endpoint, options = {}) {
        const url = `${BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    // Media methods
    async getAllMedia(type) {
        const query = type ? `?type=${type}` : '';
        return this.request(`/media${query}`);
    }
    async getMediaById(id) {
        return this.request(`/media/${id}`);
    }
    async createMedia(data) {
        return this.request('/media', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async updateMedia(id, data) {
        return this.request(`/media/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }
    async deleteMedia(id) {
        return this.request(`/media/${id}`, {
            method: 'DELETE',
        });
    }
    // Upload file
    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${BASE_URL}/media/upload`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}
exports.MediaService = MediaService;
exports.mediaService = new MediaService();
//# sourceMappingURL=media-service.js.map