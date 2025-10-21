"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleBasedWidget = RoleBasedWidget;
const auth_context_1 = require("@/lib/auth/auth-context");
/**
 * RoleBasedWidget - Conditionally renders widgets based on user roles
 *
 * Examples:
 * - <RoleBasedWidget roles={['customer']}><CustomerWidget /></RoleBasedWidget>
 * - <RoleBasedWidget roles={['customer', 'student']}><SharedWidget /></RoleBasedWidget>
 * - <RoleBasedWidget roles={['admin', 'editor']} requireAll={true}><AdminOnlyWidget /></RoleBasedWidget>
 */
function RoleBasedWidget({ roles, children, requireAll = false }) {
    const { user } = (0, auth_context_1.useAuth)();
    // DEBUG: Log user and role checking
    console.log('🎨 RoleBasedWidget check:', {
        requiredRoles: roles,
        user: user?.email,
        hasUser: !!user,
        userRoles: user?.roles,
        userRolesCount: user?.roles?.length || 0,
    });
    if (!user || !user.roles || user.roles.length === 0) {
        console.log('❌ RoleBasedWidget: No user or no roles');
        return null;
    }
    const userRoleNames = user.roles.map((r) => r.name.toLowerCase());
    const hasAccess = requireAll
        ? roles.every(role => userRoleNames.includes(role.toLowerCase()))
        : roles.some(role => userRoleNames.includes(role.toLowerCase()));
    console.log('🎨 RoleBasedWidget access check:', {
        requiredRoles: roles,
        userRoleNames,
        requireAll,
        hasAccess,
    });
    if (!hasAccess) {
        console.log('❌ RoleBasedWidget: Access denied');
        return null;
    }
    console.log('✅ RoleBasedWidget: Access granted, rendering children');
    return <>{children}</>;
}
//# sourceMappingURL=role-based-widget.js.map