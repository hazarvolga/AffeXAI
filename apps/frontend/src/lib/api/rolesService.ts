import { BaseApiService } from './base-service';
import type { 
  Role, 
  CreateRoleDto, 
  UpdateRoleDto,
  RoleQueryParams
} from '@affexai/shared-types';

// Re-export types for backward compatibility
export type { Role, CreateRoleDto, UpdateRoleDto, RoleQueryParams };

/**
 * Roles Service
 * Handles all role-related API operations with type safety
 * Extends BaseApiService for standard CRUD operations
 */
class RolesService extends BaseApiService<Role, CreateRoleDto, UpdateRoleDto> {
  constructor() {
    super({ 
      endpoint: '/roles',
      useWrappedResponses: true // Backend uses global ApiResponse wrapper
    });
  }

  /**
   * Get all roles (no pagination currently on backend)
   */
  async getAllRoles(params?: RoleQueryParams): Promise<Role[]> {
    const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.client.getWrapped<Role[]>(`${this.endpoint}${queryString}`);
  }

  /**
   * Get role by ID
   */
  async getRoleById(id: string): Promise<Role> {
    return this.client.getWrapped<Role>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new role
   */
  async createRole(data: CreateRoleDto): Promise<Role> {
    return this.client.postWrapped<Role>(this.endpoint, data);
  }

  /**
   * Update role
   */
  async updateRole(id: string, data: UpdateRoleDto): Promise<Role> {
    return this.client.patchWrapped<Role>(`${this.endpoint}/${id}`, data);
  }

  /**
   * Delete role (custom roles only, system roles protected)
   */
  async deleteRole(id: string): Promise<void> {
    return this.client.deleteWrapped(`${this.endpoint}/${id}`);
  }

  /**
   * Get role permissions
   */
  async getRolePermissions(id: string): Promise<string[]> {
    return this.client.getWrapped<string[]>(`${this.endpoint}/${id}/permissions`);
  }

  /**
   * Update role permissions
   */
  async updateRolePermissions(id: string, permissions: string[]): Promise<Role> {
    return this.client.patchWrapped<Role>(`${this.endpoint}/${id}/permissions`, { permissions });
  }

  /**
   * Get user count for role
   */
  async getRoleUserCount(id: string): Promise<{ count: number }> {
    return this.client.getWrapped<{ count: number }>(`${this.endpoint}/${id}/user-count`);
  }
}

export const rolesService = new RolesService();
export default rolesService;
