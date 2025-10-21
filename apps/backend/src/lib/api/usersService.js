"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = __importDefault(require("./httpClient"));
class UsersService {
    async getAllUsers() {
        return httpClient_1.default.get('/users');
    }
    async getUserById(id) {
        return httpClient_1.default.get(`/users/${id}`);
    }
    async createUser(userData) {
        return httpClient_1.default.post('/users', userData);
    }
    async updateUser(id, userData) {
        return httpClient_1.default.patch(`/users/${id}`, userData);
    }
    async deleteUser(id) {
        return httpClient_1.default.delete(`/users/${id}`);
    }
}
exports.default = new UsersService();
//# sourceMappingURL=usersService.js.map