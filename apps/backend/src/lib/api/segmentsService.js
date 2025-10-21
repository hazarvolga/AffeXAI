"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = __importDefault(require("./httpClient"));
class SegmentsService {
    async getAllSegments() {
        return httpClient_1.default.get('/email-marketing/segments');
    }
    async getSegmentById(id) {
        return httpClient_1.default.get(`/email-marketing/segments/${id}`);
    }
    async createSegment(segmentData) {
        return httpClient_1.default.post('/email-marketing/segments', segmentData);
    }
    async updateSegment(id, segmentData) {
        return httpClient_1.default.patch(`/email-marketing/segments/${id}`, segmentData);
    }
    async deleteSegment(id) {
        return httpClient_1.default.delete(`/email-marketing/segments/${id}`);
    }
}
exports.default = new SegmentsService();
//# sourceMappingURL=segmentsService.js.map