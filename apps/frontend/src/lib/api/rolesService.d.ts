import { BaseApiService } from './base-service';
import type { Role, CreateRoleDto, UpdateRoleDto, RoleQueryParams } from '@affexai/shared-types';
export type { Role, CreateRoleDto, UpdateRoleDto, RoleQueryParams };
/**
 * Roles Service
 * Handles all role-related API operations with type safety
 * Extends BaseApiService for standard CRUD operations
 */
declare class RolesService extends BaseApiService<Role, CreateRoleDto, UpdateRoleDto> {
    constructor();
    /**
     * Get all roles (no pagination currently on backend)
     */
    getAllRoles(params?: RoleQueryParams): Promise<Role[]>;
    /**
     * Get role by ID
     */
    getRoleById(id: string): Promise<Role>;
    /**
     * Create new role
     */
    createRole(data: CreateRoleDto): Promise<Role>;
    /**
     * Update role
     */
    updateRole(id: string, data: UpdateRoleDto): Promise<Role>;
    /**
     * Delete role (custom roles only, system roles protected)
     */
    deleteRole(id: string): Promise<void>;
    /**
     * Get role permissions
     */
    getRolePermissions(id: string): Promise<string[]>;
    /**
     * Update role permissions
     */
    updateRolePermissions(id: string, permissions: string[]): Promise<Role>;
    /**
     * Get user count for role
     */
    getRoleUserCount(id: string): Promise<{
        count: number;
    }>;
}
export declare const rolesService: RolesService;
export default rolesService;
//# sourceMappingURL=rolesService.d.ts.map