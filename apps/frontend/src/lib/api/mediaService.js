"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaService = void 0;
const http_client_1 = require("./http-client");
const base_service_1 = require("./base-service");
/**
 * Media Service
 * Handles all media-related API operations extending BaseApiService
 */
class MediaService extends base_service_1.BaseApiService {
    constructor() {
        super({ endpoint: '/media', useWrappedResponses: true });
    }
    /**
     * Get all media, optionally filtered by type
     */
    async getAllMedia(type) {
        const url = type ? `${this.endpoint}?type=${type}` : this.endpoint;
        if (this.useWrappedResponses) {
            return http_client_1.httpClient.getWrapped(url);
        }
        return http_client_1.httpClient.get(url);
    }
    /**
     * Upload file with multipart/form-data
     */
    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        // Use axios instance for file upload with proper headers
        const response = await http_client_1.httpClient.getAxiosInstance().post('/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
    /**
     * Get media URL by ID
     * If the input is already a URL, return it as is
     * If it's a media ID (UUID), fetch the media and return its URL
     */
    async getMediaUrl(mediaIdOrUrl) {
        console.log('[MediaService] getMediaUrl input:', mediaIdOrUrl);
        // If already a full URL, return it
        if (mediaIdOrUrl.startsWith('http://') || mediaIdOrUrl.startsWith('https://')) {
            console.log('[MediaService] Already a full URL, returning as-is');
            return mediaIdOrUrl;
        }
        // If it looks like a file path with extension, construct upload URL
        if (mediaIdOrUrl.includes('.') && !mediaIdOrUrl.includes('/')) {
            // Remove /api suffix since /uploads is at root level
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9006/api';
            const cleanBaseUrl = baseUrl.replace('/api', '');
            const constructedUrl = `${cleanBaseUrl}/uploads/${mediaIdOrUrl}`;
            console.log('[MediaService] File path detected, constructed URL:', constructedUrl);
            return constructedUrl;
        }
        // If it's a UUID (media ID), fetch the media object
        try {
            console.log('[MediaService] Fetching media by ID:', mediaIdOrUrl);
            const media = await this.getById(mediaIdOrUrl);
            console.log('[MediaService] Media fetched, URL:', media.url);
            // If the URL from backend is relative, make it absolute
            if (media.url && !media.url.startsWith('http://') && !media.url.startsWith('https://')) {
                // Backend returns /uploads/... but NEXT_PUBLIC_API_URL already has /api
                // So we need to use base URL without /api suffix
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9006/api';
                const cleanBaseUrl = baseUrl.replace('/api', ''); // Remove /api suffix
                const absoluteUrl = `${cleanBaseUrl}${media.url.startsWith('/') ? '' : '/'}${media.url}`;
                console.log('[MediaService] Converted relative to absolute URL:', absoluteUrl);
                return absoluteUrl;
            }
            return media.url;
        }
        catch (error) {
            console.error('[MediaService] Failed to get media URL:', error);
            // Return a placeholder if we can't get the URL
            return 'https://placehold.co/140x40/f7f7f7/1a1a1a?text=Logo';
        }
    }
}
exports.mediaService = new MediaService();
exports.default = exports.mediaService;
//# sourceMappingURL=mediaService.js.map