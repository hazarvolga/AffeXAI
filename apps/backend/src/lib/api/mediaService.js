"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = __importDefault(require("./httpClient"));
class MediaService {
    async getAllMedia(type) {
        const url = type ? `/media?type=${type}` : '/media';
        return httpClient_1.default.get(url);
    }
    async getMediaById(id) {
        return httpClient_1.default.get(`/media/${id}`);
    }
    async createMedia(mediaData) {
        return httpClient_1.default.post('/media', mediaData);
    }
    async updateMedia(id, mediaData) {
        return httpClient_1.default.patch(`/media/${id}`, mediaData);
    }
    async deleteMedia(id) {
        return httpClient_1.default.delete(`/media/${id}`);
    }
    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('http://localhost:9005/api/media/upload', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('File upload failed');
        }
        return response.json();
    }
}
exports.default = new MediaService();
//# sourceMappingURL=mediaService.js.map