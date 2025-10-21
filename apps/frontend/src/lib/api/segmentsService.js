"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.segmentsService = void 0;
const base_service_1 = require("./base-service");
/**
 * Segments Service
 * Handles email marketing segment operations extending BaseApiService
 */
class SegmentsService extends base_service_1.BaseApiService {
    constructor() {
        super({ endpoint: '/email-marketing/segments', useWrappedResponses: true });
    }
}
exports.segmentsService = new SegmentsService();
exports.default = exports.segmentsService;
//# sourceMappingURL=segmentsService.js.map