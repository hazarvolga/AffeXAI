"use strict";
/**
 * usePermissions Hook
 *
 * Provides permission checking capabilities based on current user's role.
 * Works with the authentication context to determine access rights.
 */
'use client';
/**
 * usePermissions Hook
 *
 * Provides permission checking capabilities based on current user's role.
 * Works with the authentication context to determine access rights.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePermissions = usePermissions;
exports.useCanPerform = useCanPerform;
exports.useCanAccessRoute = useCanAccessRoute;
const react_1 = require("react");
const auth_context_1 = require("@/lib/auth/auth-context");
const constants_1 = require("@/lib/permissions/constants");
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
function usePermissions() {
    const { user, isLoading } = (0, auth_context_1.useAuth)();
    // DEBUG: Log user data
    console.log('🔍 usePermissions - user data:', {
        email: user?.email,
        roleId: user?.roleId,
        primaryRole: user?.primaryRole,
        roles: user?.roles,
        rolesCount: user?.roles?.length
    });
    // Get user's PRIMARY role (for role shortcuts like isAdmin)
    const userRole = (0, react_1.useMemo)(() => {
        // NEW: Try primaryRole first (from multi-role system)
        if (user?.primaryRole?.name) {
            const roleName = user.primaryRole.name;
            const matchingRole = Object.values(constants_1.UserRole).find(role => role === roleName || role.toLowerCase() === roleName.toLowerCase());
            if (matchingRole)
                return matchingRole;
        }
        // FALLBACK: Use legacy roleId for backward compatibility
        if (user?.roleId) {
            const roleValue = user.roleId;
            const matchingRole = Object.values(constants_1.UserRole).find(role => role === roleValue || role.toLowerCase() === roleValue.toLowerCase());
            return matchingRole || null;
        }
        return null;
    }, [user?.primaryRole, user?.roleId]);
    // Get COMBINED permissions from ALL user roles (multi-role support)
    const permissions = (0, react_1.useMemo)(() => {
        const allPermissions = new Set();
        console.log('🔍 usePermissions - calculating permissions...');
        // NEW: Get permissions from ALL roles (not just primary)
        if (user?.roles && user.roles.length > 0) {
            user.roles.forEach(role => {
                const roleName = role.name;
                const matchingRole = Object.values(constants_1.UserRole).find(r => r === roleName || r.toLowerCase() === roleName.toLowerCase());
                console.log('🔍 Processing role:', { roleName, matchingRole });
                if (matchingRole) {
                    const rolePerms = (0, constants_1.getRolePermissions)(matchingRole);
                    console.log('🔍 Role permissions:', { role: matchingRole, perms: rolePerms.length });
                    rolePerms.forEach(perm => allPermissions.add(perm));
                }
            });
            const finalPermissions = Array.from(allPermissions);
            console.log('🔍 Final combined permissions:', finalPermissions.length);
            return finalPermissions;
        }
        // FALLBACK: Single role (backward compatibility)
        if (userRole) {
            const rolePerms = (0, constants_1.getRolePermissions)(userRole);
            console.log('🔍 Using fallback single role:', { userRole, perms: rolePerms.length });
            return rolePerms;
        }
        console.log('⚠️ No permissions found!');
        return [];
    }, [user?.roles, userRole]);
    // Permission checking functions - now check against COMBINED permissions
    const hasPermission = (0, react_1.useMemo)(() => (permission) => {
        return permissions.includes(permission);
    }, [permissions]);
    const hasAnyPermission = (0, react_1.useMemo)(() => (requiredPermissions) => {
        return requiredPermissions.some(perm => permissions.includes(perm));
    }, [permissions]);
    const hasAllPermissions = (0, react_1.useMemo)(() => (requiredPermissions) => {
        return requiredPermissions.every(perm => permissions.includes(perm));
    }, [permissions]);
    const canAccess = (0, react_1.useMemo)(() => (route) => {
        // Admin has access to everything
        if (userRole === constants_1.UserRole.ADMIN)
            return true;
        // Check if user has any role that can access this route
        if (user?.roles && user.roles.length > 0) {
            return user.roles.some(role => {
                const roleName = role.name;
                const matchingRole = Object.values(constants_1.UserRole).find(r => r === roleName || r.toLowerCase() === roleName.toLowerCase());
                return matchingRole ? (0, constants_1.canAccessRoute)(matchingRole, route) : false;
            });
        }
        // Fallback to primary role
        if (!userRole)
            return false;
        return (0, constants_1.canAccessRoute)(userRole, route);
    }, [userRole, user?.roles]);
    // Role shortcuts
    const isAdmin = userRole === constants_1.UserRole.ADMIN;
    const isEditor = userRole === constants_1.UserRole.EDITOR;
    const isViewer = userRole === constants_1.UserRole.VIEWER;
    const isCustomer = userRole === constants_1.UserRole.CUSTOMER;
    const isSupportManager = userRole === constants_1.UserRole.SUPPORT_MANAGER;
    const isSupportAgent = userRole === constants_1.UserRole.SUPPORT_AGENT;
    return {
        userRole,
        permissions,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        canAccessRoute: canAccess,
        isAdmin,
        isEditor,
        isViewer,
        isCustomer,
        isSupportManager,
        isSupportAgent,
        isLoading,
    };
}
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
function useCanPerform(permission) {
    const { hasPermission } = usePermissions();
    return hasPermission(permission);
}
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
function useCanAccessRoute(route) {
    const { canAccessRoute } = usePermissions();
    return canAccessRoute(route);
}
//# sourceMappingURL=usePermissions.js.map