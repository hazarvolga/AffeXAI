"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaUrl = getMediaUrl;
exports.getMedia = getMedia;
exports.clearMediaCache = clearMediaCache;
const mediaService_1 = __importDefault(require("@/lib/api/mediaService"));
// Cache for media items to avoid repeated API calls
const mediaCache = new Map();
/**
 * Get media URL from media ID
 * @param mediaId The ID of the media item
 * @returns The URL of the media item or null if not found
 */
async function getMediaUrl(mediaId) {
    // Check cache first
    if (mediaCache.has(mediaId)) {
        const media = mediaCache.get(mediaId);
        return `http://localhost:9005${media.url}`;
    }
    try {
        // Fetch media from API
        const media = await mediaService_1.default.getMediaById(mediaId);
        // Cache the media item
        mediaCache.set(mediaId, media);
        return `http://localhost:9005${media.url}`;
    }
    catch (error) {
        console.error('Error fetching media:', error);
        return null;
    }
}
/**
 * Get media item from media ID
 * @param mediaId The ID of the media item
 * @returns The media item or null if not found
 */
async function getMedia(mediaId) {
    // Check cache first
    if (mediaCache.has(mediaId)) {
        return mediaCache.get(mediaId);
    }
    try {
        // Fetch media from API
        const media = await mediaService_1.default.getMediaById(mediaId);
        // Cache the media item
        mediaCache.set(mediaId, media);
        return media;
    }
    catch (error) {
        console.error('Error fetching media:', error);
        return null;
    }
}
/**
 * Clear the media cache
 */
function clearMediaCache() {
    mediaCache.clear();
}
//# sourceMappingURL=media.js.map