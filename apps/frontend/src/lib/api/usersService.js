"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const base_service_1 = require("./base-service");
/**
 * Users Service
 * Handles all user-related API operations with type safety
 * Extends BaseApiService for standard CRUD operations
 */
class UsersService extends base_service_1.BaseApiService {
    constructor() {
        super({
            endpoint: '/users',
            useWrappedResponses: true // Backend uses global ApiResponse wrapper
        });
    }
    // BaseApiService already provides:
    // - getAll(params?: QueryParams): Promise<User[]>
    // - getList(params?: QueryParams): Promise<{ items: User[]; meta: PaginationMeta }>
    // - getById(id: string): Promise<User>
    // - create(data: CreateUserDto): Promise<User>
    // - update(id: string, data: UpdateUserDto): Promise<User>
    // - delete(id: string): Promise<void>
    /**
     * Get users list with filters and pagination
     * Returns backend format: { data, total, page, limit }
     */
    async getUsersList(params) {
        const response = await this.client.getWrapped(this.endpoint, { params });
        return response;
    }
    /**
     * Get user statistics
     */
    async getStats() {
        return this.client.getWrapped(`${this.endpoint}/stats`);
    }
    /**
     * Get current user profile (self-service)
     * Uses /users/me endpoint which doesn't require admin permissions
     */
    async getCurrentUser() {
        return this.client.getWrapped(`${this.endpoint}/me`);
    }
    /**
     * Get user by ID with role relation
     */
    async getUserById(id) {
        return this.client.getWrapped(`${this.endpoint}/${id}`);
    }
    /**
     * Get user by email
     */
    async getUserByEmail(email) {
        return this.client.getWrapped(`${this.endpoint}/email/${email}`);
    }
    /**
     * Search users
     */
    async searchUsers(query, params) {
        return this.getUsersList({ ...params, search: query });
    }
    /**
     * Change user role
     */
    async changeUserRole(userId, roleId) {
        return this.client.patchWrapped(`${this.endpoint}/${userId}/role`, { roleId });
    }
    /**
     * Toggle user active status
     */
    async toggleUserActive(userId) {
        return this.client.patchWrapped(`${this.endpoint}/${userId}/toggle-active`, {});
    }
    /**
     * Update user profile
     */
    async updateUser(userId, data) {
        return this.client.patchWrapped(`${this.endpoint}/${userId}`, data);
    }
    /**
     * Delete user (soft delete)
     */
    async deleteUser(userId) {
        return this.client.deleteWrapped(`${this.endpoint}/${userId}`);
    }
    /**
     * Permanently delete user (hard delete)
     * WARNING: This action cannot be undone!
     */
    async hardDeleteUser(userId) {
        return this.client.deleteWrapped(`${this.endpoint}/${userId}/permanent`);
    }
    /**
     * Restore soft-deleted user
     */
    async restoreUser(userId) {
        return this.client.postWrapped(`${this.endpoint}/${userId}/restore`, {});
    }
    /**
     * Create new user
     */
    async createUser(data) {
        return this.client.postWrapped(this.endpoint, data);
    }
}
exports.usersService = new UsersService();
exports.default = exports.usersService;
//# sourceMappingURL=usersService.js.map