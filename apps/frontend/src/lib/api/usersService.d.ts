import { BaseApiService } from './base-service';
import type { User, CreateUserDto, UpdateUserDto, UserQueryParams, UserStats, UsersListResponse, ChangeUserRoleDto } from '@affexai/shared-types';
export type { User, CreateUserDto, UpdateUserDto, UserQueryParams, UserStats, UsersListResponse, ChangeUserRoleDto };
/**
 * Users Service
 * Handles all user-related API operations with type safety
 * Extends BaseApiService for standard CRUD operations
 */
declare class UsersService extends BaseApiService<User, CreateUserDto, UpdateUserDto> {
    constructor();
    /**
     * Get users list with filters and pagination
     * Returns backend format: { data, total, page, limit }
     */
    getUsersList(params?: UserQueryParams): Promise<UsersListResponse>;
    /**
     * Get user statistics
     */
    getStats(): Promise<UserStats>;
    /**
     * Get current user profile (self-service)
     * Uses /users/me endpoint which doesn't require admin permissions
     */
    getCurrentUser(): Promise<User>;
    /**
     * Get user by ID with role relation
     */
    getUserById(id: string): Promise<User>;
    /**
     * Get user by email
     */
    getUserByEmail(email: string): Promise<User>;
    /**
     * Search users
     */
    searchUsers(query: string, params?: Omit<UserQueryParams, 'search'>): Promise<UsersListResponse>;
    /**
     * Change user role
     */
    changeUserRole(userId: string, roleId: string): Promise<User>;
    /**
     * Toggle user active status
     */
    toggleUserActive(userId: string): Promise<User>;
    /**
     * Update user profile
     */
    updateUser(userId: string, data: UpdateUserDto): Promise<User>;
    /**
     * Delete user (soft delete)
     */
    deleteUser(userId: string): Promise<void>;
    /**
     * Permanently delete user (hard delete)
     * WARNING: This action cannot be undone!
     */
    hardDeleteUser(userId: string): Promise<void>;
    /**
     * Restore soft-deleted user
     */
    restoreUser(userId: string): Promise<User>;
    /**
     * Create new user
     */
    createUser(data: CreateUserDto): Promise<User>;
}
export declare const usersService: UsersService;
export default usersService;
//# sourceMappingURL=usersService.d.ts.map