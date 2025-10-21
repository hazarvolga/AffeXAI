import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
/**
 * UserRolesService
 *
 * Handles multi-role assignment and management for users.
 * Supports primary role designation and audit trail.
 */
export declare class UserRolesService {
    private userRolesRepository;
    private usersRepository;
    private rolesService;
    constructor(userRolesRepository: Repository<UserRole>, usersRepository: Repository<User>, rolesService: RolesService);
    /**
     * Assign roles to a user
     * @param userId User ID
     * @param primaryRoleId Primary role ID
     * @param additionalRoleIds Additional role IDs (optional)
     * @param replaceExisting Replace all existing roles (default: true)
     * @param assignedBy User ID who is assigning roles (for audit trail)
     */
    assignRoles(userId: string, primaryRoleId: string, additionalRoleIds?: string[], replaceExisting?: boolean, assignedBy?: string): Promise<UserRole[]>;
    /**
     * Get all roles for a user
     */
    getUserRoles(userId: string): Promise<UserRole[]>;
    /**
     * Get primary role for a user
     */
    getPrimaryRole(userId: string): Promise<UserRole | null>;
    /**
     * Remove a specific role from a user
     */
    removeRole(userId: string, roleId: string): Promise<void>;
    /**
     * Check if user has a specific role
     */
    userHasRole(userId: string, roleName: string): Promise<boolean>;
    /**
     * Check if user has any of the specified roles
     */
    userHasAnyRole(userId: string, roleNames: string[]): Promise<boolean>;
    /**
     * Get all users with a specific role
     */
    getUsersByRole(roleId: string): Promise<User[]>;
    /**
     * Count users with a specific role
     */
    countUsersByRole(roleId: string): Promise<number>;
}
//# sourceMappingURL=user-roles.service.d.ts.map