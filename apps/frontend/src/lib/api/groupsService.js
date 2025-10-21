"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsService = void 0;
const base_service_1 = require("./base-service");
/**
 * Groups Service
 * Handles email marketing group operations extending BaseApiService
 */
class GroupsService extends base_service_1.BaseApiService {
    constructor() {
        super({ endpoint: '/email-marketing/groups', useWrappedResponses: true });
    }
}
exports.groupsService = new GroupsService();
exports.default = exports.groupsService;
//# sourceMappingURL=groupsService.js.map