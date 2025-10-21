"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = __importDefault(require("./httpClient"));
class GroupsService {
    async getAllGroups() {
        return httpClient_1.default.get('/email-marketing/groups');
    }
    async getGroupById(id) {
        return httpClient_1.default.get(`/email-marketing/groups/${id}`);
    }
    async createGroup(groupData) {
        return httpClient_1.default.post('/email-marketing/groups', groupData);
    }
    async updateGroup(id, groupData) {
        return httpClient_1.default.patch(`/email-marketing/groups/${id}`, groupData);
    }
    async deleteGroup(id) {
        return httpClient_1.default.delete(`/email-marketing/groups/${id}`);
    }
}
exports.default = new GroupsService();
//# sourceMappingURL=groupsService.js.map