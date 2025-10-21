/**
 * usePermissions Hook
 *
 * Provides permission checking capabilities based on current user's role.
 * Works with the authentication context to determine access rights.
 */
import { Permission, UserRole } from '@/lib/permissions/constants';
export interface UsePermissionsReturn {
    userRole: UserRole | null;
    permissions: Permission[];
    hasPermission: (permission: Permission) => boolean;
    hasAnyPermission: (permissions: Permission[]) => boolean;
    hasAllPermissions: (permissions: Permission[]) => boolean;
    canAccessRoute: (route: string) => boolean;
    isAdmin: boolean;
    isEditor: boolean;
    isViewer: boolean;
    isCustomer: boolean;
    isSupportManager: boolean;
    isSupportAgent: boolean;
    isLoading: boolean;
}
/**
 * Hook to check user permissions based on their role
 *
 * @example
 * ```tsx
 * function AdminButton() {
 *   const { hasPermission, isAdmin } = usePermissions();
 *
 *   if (!hasPermission(Permission.USERS_CREATE)) {
 *     return null;
 *   }
 *
 *   return <Button>Create User</Button>;
 * }
 * ```
 */
export declare function usePermissions(): UsePermissionsReturn;
/**
 * Helper hook to check if user can perform specific action
 *
 * @example
 * ```tsx
 * function DeleteButton() {
 *   const canDelete = useCanPerform(Permission.USERS_DELETE);
 *
 *   if (!canDelete) return null;
 *
 *   return <Button variant="destructive">Delete</Button>;
 * }
 * ```
 */
export declare function useCanPerform(permission: Permission): boolean;
/**
 * Helper hook to check if user can access a route
 *
 * @example
 * ```tsx
 * function AdminLink() {
 *   const canAccess = useCanAccessRoute('/admin/users');
 *
 *   if (!canAccess) return null;
 *
 *   return <Link href="/admin/users">Users</Link>;
 * }
 * ```
 */
export declare function useCanAccessRoute(route: string): boolean;
//# sourceMappingURL=usePermissions.d.ts.map