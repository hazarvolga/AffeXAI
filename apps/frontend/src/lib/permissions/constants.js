"use strict";
/**
 * Permission System Constants
 *
 * Defines all permissions and role mappings for the application.
 * This is the single source of truth for access control.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTE_PERMISSION_MODE = exports.ROUTE_PERMISSIONS = exports.ROLE_PERMISSIONS = exports.Permission = exports.UserRole = void 0;
exports.getRolePermissions = getRolePermissions;
exports.roleHasPermission = roleHasPermission;
exports.roleHasAnyPermission = roleHasAnyPermission;
exports.roleHasAllPermissions = roleHasAllPermissions;
exports.canAccessRoute = canAccessRoute;
exports.isStaffRole = isStaffRole;
exports.isPortalRole = isPortalRole;
exports.getRoleDisplayName = getRoleDisplayName;
exports.getPermissionDisplayName = getPermissionDisplayName;
exports.getDefaultRedirectForRole = getDefaultRedirectForRole;
// ============================================================================
// User Roles
// ============================================================================
var UserRole;
(function (UserRole) {
    // System Administration
    UserRole["ADMIN"] = "Admin";
    // Content Team
    UserRole["CONTENT_EDITOR"] = "Content Editor";
    // Marketing Team
    UserRole["MARKETING_MANAGER"] = "Marketing Manager";
    UserRole["SOCIAL_MEDIA_MANAGER"] = "Social Media Manager";
    // Operations Team
    UserRole["EVENT_COORDINATOR"] = "Event Coordinator";
    // Support Team
    UserRole["SUPPORT_MANAGER"] = "Support Manager";
    UserRole["SUPPORT_AGENT"] = "Support Agent";
    // End Users
    UserRole["CUSTOMER"] = "Customer";
    UserRole["STUDENT"] = "Student";
    UserRole["SUBSCRIBER"] = "Subscriber";
    UserRole["VIEWER"] = "Viewer";
    // Legacy (Deprecated - will be removed in future)
    UserRole["EDITOR"] = "Editor";
})(UserRole || (exports.UserRole = UserRole = {}));
// ============================================================================
// Permissions
// ============================================================================
/**
 * All available permissions in the system
 * Format: RESOURCE_ACTION (e.g., USERS_VIEW, CMS_EDIT)
 */
var Permission;
(function (Permission) {
    // User Management
    Permission["USERS_VIEW"] = "users.view";
    Permission["USERS_CREATE"] = "users.create";
    Permission["USERS_EDIT"] = "users.edit";
    Permission["USERS_DELETE"] = "users.delete";
    Permission["USERS_MANAGE_ROLES"] = "users.manage_roles";
    // Role Management
    Permission["ROLES_VIEW"] = "roles.view";
    Permission["ROLES_CREATE"] = "roles.create";
    Permission["ROLES_EDIT"] = "roles.edit";
    Permission["ROLES_DELETE"] = "roles.delete";
    // CMS Management
    Permission["CMS_VIEW"] = "cms.view";
    Permission["CMS_CREATE"] = "cms.create";
    Permission["CMS_EDIT"] = "cms.edit";
    Permission["CMS_DELETE"] = "cms.delete";
    Permission["CMS_PUBLISH"] = "cms.publish";
    // Support Tickets
    Permission["TICKETS_VIEW_ALL"] = "tickets.view_all";
    Permission["TICKETS_VIEW_OWN"] = "tickets.view_own";
    Permission["TICKETS_CREATE"] = "tickets.create";
    Permission["TICKETS_EDIT"] = "tickets.edit";
    Permission["TICKETS_DELETE"] = "tickets.delete";
    Permission["TICKETS_ASSIGN"] = "tickets.assign";
    Permission["TICKETS_CLOSE"] = "tickets.close";
    // Email Marketing
    Permission["EMAIL_VIEW"] = "email.view";
    Permission["EMAIL_CREATE"] = "email.create";
    Permission["EMAIL_EDIT"] = "email.edit";
    Permission["EMAIL_DELETE"] = "email.delete";
    Permission["EMAIL_SEND"] = "email.send";
    // Events Management
    Permission["EVENTS_VIEW"] = "events.view";
    Permission["EVENTS_CREATE"] = "events.create";
    Permission["EVENTS_EDIT"] = "events.edit";
    Permission["EVENTS_DELETE"] = "events.delete";
    // Certificates Management
    Permission["CERTIFICATES_VIEW"] = "certificates.view";
    Permission["CERTIFICATES_CREATE"] = "certificates.create";
    Permission["CERTIFICATES_EDIT"] = "certificates.edit";
    Permission["CERTIFICATES_DELETE"] = "certificates.delete";
    // Social Media Management
    Permission["SOCIAL_MEDIA_VIEW"] = "social.view";
    Permission["SOCIAL_MEDIA_CREATE"] = "social.create";
    Permission["SOCIAL_MEDIA_EDIT"] = "social.edit";
    Permission["SOCIAL_MEDIA_DELETE"] = "social.delete";
    // Notifications
    Permission["NOTIFICATIONS_VIEW"] = "notifications.view";
    Permission["NOTIFICATIONS_CREATE"] = "notifications.create";
    Permission["NOTIFICATIONS_EDIT"] = "notifications.edit";
    Permission["NOTIFICATIONS_DELETE"] = "notifications.delete";
    // Activity Logs
    Permission["LOGS_VIEW"] = "logs.view";
    // Design System
    Permission["DESIGN_VIEW"] = "design.view";
    Permission["DESIGN_EDIT"] = "design.edit";
    // Analytics & Reports
    Permission["ANALYTICS_VIEW"] = "analytics.view";
    Permission["ANALYTICS_EXPORT"] = "analytics.export";
    // Settings
    Permission["SETTINGS_VIEW"] = "settings.view";
    Permission["SETTINGS_EDIT"] = "settings.edit";
    // System Administration
    Permission["SYSTEM_ADMIN"] = "system.admin";
})(Permission || (exports.Permission = Permission = {}));
// ============================================================================
// Role-Permission Mappings
// ============================================================================
/**
 * Maps each role to its permitted actions
 * This defines what each role can do in the system
 */
exports.ROLE_PERMISSIONS = {
    [UserRole.ADMIN]: [
        // Full system access
        Permission.SYSTEM_ADMIN,
        // Users
        Permission.USERS_VIEW,
        Permission.USERS_CREATE,
        Permission.USERS_EDIT,
        Permission.USERS_DELETE,
        Permission.USERS_MANAGE_ROLES,
        // Roles
        Permission.ROLES_VIEW,
        Permission.ROLES_CREATE,
        Permission.ROLES_EDIT,
        Permission.ROLES_DELETE,
        // CMS
        Permission.CMS_VIEW,
        Permission.CMS_CREATE,
        Permission.CMS_EDIT,
        Permission.CMS_DELETE,
        Permission.CMS_PUBLISH,
        // Tickets
        Permission.TICKETS_VIEW_ALL,
        Permission.TICKETS_CREATE,
        Permission.TICKETS_EDIT,
        Permission.TICKETS_DELETE,
        Permission.TICKETS_ASSIGN,
        Permission.TICKETS_CLOSE,
        // Email
        Permission.EMAIL_VIEW,
        Permission.EMAIL_CREATE,
        Permission.EMAIL_EDIT,
        Permission.EMAIL_DELETE,
        Permission.EMAIL_SEND,
        // Events
        Permission.EVENTS_VIEW,
        Permission.EVENTS_CREATE,
        Permission.EVENTS_EDIT,
        Permission.EVENTS_DELETE,
        // Certificates
        Permission.CERTIFICATES_VIEW,
        Permission.CERTIFICATES_CREATE,
        Permission.CERTIFICATES_EDIT,
        Permission.CERTIFICATES_DELETE,
        // Social Media
        Permission.SOCIAL_MEDIA_VIEW,
        Permission.SOCIAL_MEDIA_CREATE,
        Permission.SOCIAL_MEDIA_EDIT,
        Permission.SOCIAL_MEDIA_DELETE,
        // Notifications
        Permission.NOTIFICATIONS_VIEW,
        Permission.NOTIFICATIONS_CREATE,
        Permission.NOTIFICATIONS_EDIT,
        Permission.NOTIFICATIONS_DELETE,
        // Logs
        Permission.LOGS_VIEW,
        // Design System
        Permission.DESIGN_VIEW,
        Permission.DESIGN_EDIT,
        // Analytics
        Permission.ANALYTICS_VIEW,
        Permission.ANALYTICS_EXPORT,
        // Settings
        Permission.SETTINGS_VIEW,
        Permission.SETTINGS_EDIT,
    ],
    [UserRole.SUPPORT_MANAGER]: [
        // Tickets - Full access
        Permission.TICKETS_VIEW_ALL,
        Permission.TICKETS_CREATE,
        Permission.TICKETS_EDIT,
        Permission.TICKETS_DELETE,
        Permission.TICKETS_ASSIGN,
        Permission.TICKETS_CLOSE,
        // Users - View only
        Permission.USERS_VIEW,
        // Analytics
        Permission.ANALYTICS_VIEW,
        Permission.ANALYTICS_EXPORT,
        // Settings - View only
        Permission.SETTINGS_VIEW,
    ],
    [UserRole.SUPPORT_AGENT]: [
        // Tickets - Limited access
        Permission.TICKETS_VIEW_ALL,
        Permission.TICKETS_CREATE,
        Permission.TICKETS_EDIT,
        Permission.TICKETS_CLOSE,
        // Users - View only (no Logs access)
        Permission.USERS_VIEW,
        // Settings - View only
        Permission.SETTINGS_VIEW,
    ],
    [UserRole.EDITOR]: [
        // CMS - Full access
        Permission.CMS_VIEW,
        Permission.CMS_CREATE,
        Permission.CMS_EDIT,
        Permission.CMS_DELETE,
        Permission.CMS_PUBLISH,
        // Email - Full access
        Permission.EMAIL_VIEW,
        Permission.EMAIL_CREATE,
        Permission.EMAIL_EDIT,
        Permission.EMAIL_DELETE,
        Permission.EMAIL_SEND,
        // Events - Create/Edit access
        Permission.EVENTS_VIEW,
        Permission.EVENTS_CREATE,
        Permission.EVENTS_EDIT,
        // Certificates - Create/Edit access
        Permission.CERTIFICATES_VIEW,
        Permission.CERTIFICATES_CREATE,
        Permission.CERTIFICATES_EDIT,
        // Social Media - Create/Edit access
        Permission.SOCIAL_MEDIA_VIEW,
        Permission.SOCIAL_MEDIA_CREATE,
        Permission.SOCIAL_MEDIA_EDIT,
        // Notifications - Create/Edit access
        Permission.NOTIFICATIONS_VIEW,
        Permission.NOTIFICATIONS_CREATE,
        Permission.NOTIFICATIONS_EDIT,
        // Analytics - View only
        Permission.ANALYTICS_VIEW,
        // NO access to: Users Management, Settings, Design, Logs
    ],
    [UserRole.CONTENT_EDITOR]: [
        // CMS - Full access (Content creation focus)
        Permission.CMS_VIEW,
        Permission.CMS_CREATE,
        Permission.CMS_EDIT,
        Permission.CMS_DELETE,
        Permission.CMS_PUBLISH,
        // Analytics - View only (to see content performance)
        Permission.ANALYTICS_VIEW,
        // NO access to: Email, Social Media, Events, Users, Settings
    ],
    [UserRole.MARKETING_MANAGER]: [
        // Email Marketing - Full access
        Permission.EMAIL_VIEW,
        Permission.EMAIL_CREATE,
        Permission.EMAIL_EDIT,
        Permission.EMAIL_DELETE,
        Permission.EMAIL_SEND,
        // Analytics - Full access (marketing analytics focus)
        Permission.ANALYTICS_VIEW,
        Permission.ANALYTICS_EXPORT,
        // NO access to: CMS, Social Media, Events, Users, Settings
    ],
    [UserRole.SOCIAL_MEDIA_MANAGER]: [
        // Social Media - Full access
        Permission.SOCIAL_MEDIA_VIEW,
        Permission.SOCIAL_MEDIA_CREATE,
        Permission.SOCIAL_MEDIA_EDIT,
        Permission.SOCIAL_MEDIA_DELETE,
        // Notifications - For social media announcements
        Permission.NOTIFICATIONS_VIEW,
        Permission.NOTIFICATIONS_CREATE,
        Permission.NOTIFICATIONS_EDIT,
        // Analytics - View only (social media metrics)
        Permission.ANALYTICS_VIEW,
        // NO access to: CMS, Email, Events, Users, Settings
    ],
    [UserRole.EVENT_COORDINATOR]: [
        // Events - Full access
        Permission.EVENTS_VIEW,
        Permission.EVENTS_CREATE,
        Permission.EVENTS_EDIT,
        Permission.EVENTS_DELETE,
        // Certificates - Full access (event certificates)
        Permission.CERTIFICATES_VIEW,
        Permission.CERTIFICATES_CREATE,
        Permission.CERTIFICATES_EDIT,
        Permission.CERTIFICATES_DELETE,
        // Notifications - For event reminders
        Permission.NOTIFICATIONS_VIEW,
        Permission.NOTIFICATIONS_CREATE,
        Permission.NOTIFICATIONS_EDIT,
        // Analytics - View only (event metrics)
        Permission.ANALYTICS_VIEW,
        // NO access to: CMS, Email, Social Media, Users, Settings
    ],
    [UserRole.VIEWER]: [
        // Portal access only - no admin panel permissions
        Permission.TICKETS_VIEW_OWN,
    ],
    [UserRole.STUDENT]: [
        // Student portal access
        Permission.TICKETS_VIEW_OWN,
        Permission.TICKETS_CREATE,
    ],
    [UserRole.SUBSCRIBER]: [
        // Subscriber portal access
        Permission.TICKETS_VIEW_OWN,
    ],
    [UserRole.CUSTOMER]: [
        // Own tickets only
        Permission.TICKETS_VIEW_OWN,
        Permission.TICKETS_CREATE,
        // Own profile
        Permission.USERS_VIEW,
    ],
};
// ============================================================================
// Route Access Control
// ============================================================================
/**
 * Maps routes to required permissions
 * Used by middleware for route-level access control
 */
exports.ROUTE_PERMISSIONS = {
    // Admin Dashboard
    '/admin': [Permission.SYSTEM_ADMIN, Permission.CMS_VIEW, Permission.EMAIL_VIEW, Permission.TICKETS_VIEW_ALL, Permission.ANALYTICS_VIEW],
    // User Management
    '/admin/users': [Permission.USERS_VIEW],
    '/admin/users/new': [Permission.USERS_CREATE],
    '/admin/users/roles': [Permission.ROLES_VIEW],
    // CMS
    '/admin/cms': [Permission.CMS_VIEW],
    '/admin/cms/new': [Permission.CMS_CREATE],
    '/admin/cms/editor': [Permission.CMS_EDIT],
    // Support
    '/admin/support': [Permission.TICKETS_VIEW_ALL],
    '/admin/support/new': [Permission.TICKETS_CREATE],
    '/admin/support/ai-insights': [Permission.TICKETS_VIEW_ALL, Permission.ANALYTICS_VIEW],
    '/admin/support/knowledge-base': [Permission.TICKETS_VIEW_ALL],
    '/admin/support/macros': [Permission.TICKETS_VIEW_ALL],
    // Email Marketing
    '/admin/email-marketing': [Permission.EMAIL_VIEW],
    '/admin/email-marketing/campaigns': [Permission.EMAIL_VIEW],
    '/admin/email-marketing/templates': [Permission.EMAIL_VIEW],
    '/admin/email-marketing/subscribers': [Permission.EMAIL_VIEW],
    // Analytics
    '/admin/analytics': [Permission.ANALYTICS_VIEW],
    // Settings
    '/admin/settings': [Permission.SETTINGS_VIEW],
    // Portal (Customer area)
    '/portal': [Permission.TICKETS_VIEW_OWN],
    '/portal/support': [Permission.TICKETS_VIEW_OWN],
    '/portal/support/new': [Permission.TICKETS_CREATE],
};
/**
 * Routes that require ANY of the permissions (OR logic)
 * Most routes use this - user needs at least one permission
 */
exports.ROUTE_PERMISSION_MODE = {
    '/admin': 'any', // Any admin permission grants dashboard access
    '/admin/users': 'any',
    '/admin/support': 'any',
};
// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Get all permissions for a role
 */
function getRolePermissions(role) {
    return exports.ROLE_PERMISSIONS[role] || [];
}
/**
 * Check if role has specific permission
 */
function roleHasPermission(role, permission) {
    const permissions = exports.ROLE_PERMISSIONS[role] || [];
    return permissions.includes(permission) || permissions.includes(Permission.SYSTEM_ADMIN);
}
/**
 * Check if role has ANY of the permissions
 */
function roleHasAnyPermission(role, permissions) {
    const rolePermissions = exports.ROLE_PERMISSIONS[role] || [];
    // System admin has all permissions
    if (rolePermissions.includes(Permission.SYSTEM_ADMIN)) {
        return true;
    }
    return permissions.some(permission => rolePermissions.includes(permission));
}
/**
 * Check if role has ALL of the permissions
 */
function roleHasAllPermissions(role, permissions) {
    const rolePermissions = exports.ROLE_PERMISSIONS[role] || [];
    // System admin has all permissions
    if (rolePermissions.includes(Permission.SYSTEM_ADMIN)) {
        return true;
    }
    return permissions.every(permission => rolePermissions.includes(permission));
}
/**
 * Check if route is accessible by role
 */
function canAccessRoute(role, route) {
    // Block non-staff roles from accessing admin panel
    if (route.startsWith('/admin')) {
        // All staff roles can access admin panel (permissions determine what they see)
        const allowedAdminRoles = [
            // System Administration
            UserRole.ADMIN,
            // Content Team
            UserRole.CONTENT_EDITOR,
            // Marketing Team
            UserRole.MARKETING_MANAGER,
            UserRole.SOCIAL_MEDIA_MANAGER,
            // Operations Team
            UserRole.EVENT_COORDINATOR,
            // Support Team
            UserRole.SUPPORT_MANAGER,
            UserRole.SUPPORT_AGENT,
            // Legacy (Deprecated)
            UserRole.EDITOR,
        ];
        if (!allowedAdminRoles.includes(role)) {
            console.log(`🚫 Role ${role} blocked from admin panel - redirecting to portal`);
            return false;
        }
    }
    // Find matching route pattern
    const routePattern = Object.keys(exports.ROUTE_PERMISSIONS).find(pattern => {
        if (pattern === route)
            return true;
        if (route.startsWith(pattern + '/'))
            return true;
        return false;
    });
    if (!routePattern) {
        // No explicit permission required
        return true;
    }
    const requiredPermissions = exports.ROUTE_PERMISSIONS[routePattern];
    const mode = exports.ROUTE_PERMISSION_MODE[routePattern] || 'any';
    if (mode === 'any') {
        return roleHasAnyPermission(role, requiredPermissions);
    }
    else {
        return roleHasAllPermissions(role, requiredPermissions);
    }
}
/**
 * Check if a role is a staff role (has admin panel access)
 */
function isStaffRole(roleName) {
    const staffRoles = [
        'admin',
        'editor', // Legacy
        'content editor',
        'marketing manager',
        'social media manager',
        'event coordinator',
        'support manager',
        'support agent',
        'support',
        'support team',
    ];
    return staffRoles.includes(roleName.toLowerCase());
}
/**
 * Check if a role is a portal role (customer/student/subscriber)
 */
function isPortalRole(roleName) {
    const portalRoles = ['customer', 'student', 'subscriber', 'viewer'];
    return portalRoles.includes(roleName.toLowerCase());
}
/**
 * Get user-friendly role name
 */
function getRoleDisplayName(role) {
    return role;
}
/**
 * Get user-friendly permission name
 */
function getPermissionDisplayName(permission) {
    const parts = permission.split('.');
    const resource = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    const action = parts[1].replace(/_/g, ' ');
    return `${resource}: ${action}`;
}
/**
 * Get appropriate redirect path based on user role
 * Returns the default landing page for each role
 */
function getDefaultRedirectForRole(role) {
    switch (role) {
        case UserRole.ADMIN:
            return '/admin';
        // Content Team
        case UserRole.CONTENT_EDITOR:
            return '/admin/cms';
        // Marketing Team
        case UserRole.MARKETING_MANAGER:
            return '/admin/email-marketing';
        case UserRole.SOCIAL_MEDIA_MANAGER:
            return '/admin/social-media';
        // Operations Team
        case UserRole.EVENT_COORDINATOR:
            return '/admin/events';
        // Support Team
        case UserRole.SUPPORT_MANAGER:
        case UserRole.SUPPORT_AGENT:
            return '/admin/support';
        // End Users
        case UserRole.CUSTOMER:
        case UserRole.STUDENT:
        case UserRole.SUBSCRIBER:
        case UserRole.VIEWER:
            return '/portal';
        // Legacy
        case UserRole.EDITOR:
            return '/admin/cms'; // Redirect to CMS (legacy behavior)
        default:
            return '/portal';
    }
}
//# sourceMappingURL=constants.js.map