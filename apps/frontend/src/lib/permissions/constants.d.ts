/**
 * Permission System Constants
 *
 * Defines all permissions and role mappings for the application.
 * This is the single source of truth for access control.
 */
export declare enum UserRole {
    ADMIN = "Admin",
    CONTENT_EDITOR = "Content Editor",
    MARKETING_MANAGER = "Marketing Manager",
    SOCIAL_MEDIA_MANAGER = "Social Media Manager",
    EVENT_COORDINATOR = "Event Coordinator",
    SUPPORT_MANAGER = "Support Manager",
    SUPPORT_AGENT = "Support Agent",
    CUSTOMER = "Customer",
    STUDENT = "Student",
    SUBSCRIBER = "Subscriber",
    VIEWER = "Viewer",
    EDITOR = "Editor"
}
/**
 * All available permissions in the system
 * Format: RESOURCE_ACTION (e.g., USERS_VIEW, CMS_EDIT)
 */
export declare enum Permission {
    USERS_VIEW = "users.view",
    USERS_CREATE = "users.create",
    USERS_EDIT = "users.edit",
    USERS_DELETE = "users.delete",
    USERS_MANAGE_ROLES = "users.manage_roles",
    ROLES_VIEW = "roles.view",
    ROLES_CREATE = "roles.create",
    ROLES_EDIT = "roles.edit",
    ROLES_DELETE = "roles.delete",
    CMS_VIEW = "cms.view",
    CMS_CREATE = "cms.create",
    CMS_EDIT = "cms.edit",
    CMS_DELETE = "cms.delete",
    CMS_PUBLISH = "cms.publish",
    TICKETS_VIEW_ALL = "tickets.view_all",// View all tickets
    TICKETS_VIEW_OWN = "tickets.view_own",// View only own tickets
    TICKETS_CREATE = "tickets.create",
    TICKETS_EDIT = "tickets.edit",
    TICKETS_DELETE = "tickets.delete",
    TICKETS_ASSIGN = "tickets.assign",
    TICKETS_CLOSE = "tickets.close",
    EMAIL_VIEW = "email.view",
    EMAIL_CREATE = "email.create",
    EMAIL_EDIT = "email.edit",
    EMAIL_DELETE = "email.delete",
    EMAIL_SEND = "email.send",
    EVENTS_VIEW = "events.view",
    EVENTS_CREATE = "events.create",
    EVENTS_EDIT = "events.edit",
    EVENTS_DELETE = "events.delete",
    CERTIFICATES_VIEW = "certificates.view",
    CERTIFICATES_CREATE = "certificates.create",
    CERTIFICATES_EDIT = "certificates.edit",
    CERTIFICATES_DELETE = "certificates.delete",
    SOCIAL_MEDIA_VIEW = "social.view",
    SOCIAL_MEDIA_CREATE = "social.create",
    SOCIAL_MEDIA_EDIT = "social.edit",
    SOCIAL_MEDIA_DELETE = "social.delete",
    NOTIFICATIONS_VIEW = "notifications.view",
    NOTIFICATIONS_CREATE = "notifications.create",
    NOTIFICATIONS_EDIT = "notifications.edit",
    NOTIFICATIONS_DELETE = "notifications.delete",
    LOGS_VIEW = "logs.view",
    DESIGN_VIEW = "design.view",
    DESIGN_EDIT = "design.edit",
    ANALYTICS_VIEW = "analytics.view",
    ANALYTICS_EXPORT = "analytics.export",
    SETTINGS_VIEW = "settings.view",
    SETTINGS_EDIT = "settings.edit",
    SYSTEM_ADMIN = "system.admin"
}
/**
 * Maps each role to its permitted actions
 * This defines what each role can do in the system
 */
export declare const ROLE_PERMISSIONS: Record<UserRole, Permission[]>;
/**
 * Maps routes to required permissions
 * Used by middleware for route-level access control
 */
export declare const ROUTE_PERMISSIONS: Record<string, Permission[]>;
/**
 * Routes that require ANY of the permissions (OR logic)
 * Most routes use this - user needs at least one permission
 */
export declare const ROUTE_PERMISSION_MODE: Record<string, 'any' | 'all'>;
/**
 * Get all permissions for a role
 */
export declare function getRolePermissions(role: UserRole): Permission[];
/**
 * Check if role has specific permission
 */
export declare function roleHasPermission(role: UserRole, permission: Permission): boolean;
/**
 * Check if role has ANY of the permissions
 */
export declare function roleHasAnyPermission(role: UserRole, permissions: Permission[]): boolean;
/**
 * Check if role has ALL of the permissions
 */
export declare function roleHasAllPermissions(role: UserRole, permissions: Permission[]): boolean;
/**
 * Check if route is accessible by role
 */
export declare function canAccessRoute(role: UserRole, route: string): boolean;
/**
 * Check if a role is a staff role (has admin panel access)
 */
export declare function isStaffRole(roleName: string): boolean;
/**
 * Check if a role is a portal role (customer/student/subscriber)
 */
export declare function isPortalRole(roleName: string): boolean;
/**
 * Get user-friendly role name
 */
export declare function getRoleDisplayName(role: UserRole): string;
/**
 * Get user-friendly permission name
 */
export declare function getPermissionDisplayName(permission: Permission): string;
/**
 * Get appropriate redirect path based on user role
 * Returns the default landing page for each role
 */
export declare function getDefaultRedirectForRole(role: UserRole): string;
//# sourceMappingURL=constants.d.ts.map