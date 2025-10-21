"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesService = void 0;
const base_service_1 = require("./base-service");
/**
 * Roles Service
 * Handles all role-related API operations with type safety
 * Extends BaseApiService for standard CRUD operations
 */
class RolesService extends base_service_1.BaseApiService {
    constructor() {
        super({
            endpoint: '/roles',
            useWrappedResponses: true // Backend uses global ApiResponse wrapper
        });
    }
    /**
     * Get all roles (no pagination currently on backend)
     */
    async getAllRoles(params) {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return this.client.getWrapped(`${this.endpoint}${queryString}`);
    }
    /**
     * Get role by ID
     */
    async getRoleById(id) {
        return this.client.getWrapped(`${this.endpoint}/${id}`);
    }
    /**
     * Create new role
     */
    async createRole(data) {
        return this.client.postWrapped(this.endpoint, data);
    }
    /**
     * Update role
     */
    async updateRole(id, data) {
        return this.client.patchWrapped(`${this.endpoint}/${id}`, data);
    }
    /**
     * Delete role (custom roles only, system roles protected)
     */
    async deleteRole(id) {
        return this.client.deleteWrapped(`${this.endpoint}/${id}`);
    }
    /**
     * Get role permissions
     */
    async getRolePermissions(id) {
        return this.client.getWrapped(`${this.endpoint}/${id}/permissions`);
    }
    /**
     * Update role permissions
     */
    async updateRolePermissions(id, permissions) {
        return this.client.patchWrapped(`${this.endpoint}/${id}/permissions`, { permissions });
    }
    /**
     * Get user count for role
     */
    async getRoleUserCount(id) {
        return this.client.getWrapped(`${this.endpoint}/${id}/user-count`);
    }
}
exports.rolesService = new RolesService();
exports.default = exports.rolesService;
//# sourceMappingURL=rolesService.js.map