"use strict";
/**
 * Centralized Permission Definitions
 * All system permissions are defined here for type safety and consistency
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSION_CATEGORY_MAP = exports.PERMISSION_CATEGORIES = exports.PERMISSIONS = void 0;
exports.isValidPermission = isValidPermission;
exports.getPermissionCategory = getPermissionCategory;
exports.PERMISSIONS = {
    // User Management
    USERS_VIEW: 'users.view',
    USERS_CREATE: 'users.create',
    USERS_UPDATE: 'users.update',
    USERS_DELETE: 'users.delete',
    // Role Management
    ROLES_VIEW: 'roles.view',
    ROLES_MANAGE: 'roles.manage',
    // Support Management
    SUPPORT_VIEW: 'support.view',
    SUPPORT_VIEW_ALL: 'support.view_all',
    SUPPORT_RESPOND: 'support.respond',
    SUPPORT_REPLY: 'support.reply',
    SUPPORT_ASSIGN: 'support.assign',
    // Marketing Management
    MARKETING_MANAGE: 'marketing.manage',
    MARKETING_CAMPAIGNS: 'marketing.campaigns',
    MARKETING_MANAGE_CAMPAIGNS: 'marketing.manage_campaigns',
    MARKETING_MANAGE_NEWSLETTERS: 'marketing.manage_newsletters',
    MARKETING_MANAGE_SOCIAL: 'marketing.manage_social',
    // CMS Management
    CMS_VIEW: 'cms.view',
    CMS_PAGES_VIEW: 'cms.pages.view',
    CMS_CREATE: 'cms.create',
    CMS_PAGES_CREATE: 'cms.pages.create',
    CMS_EDIT: 'cms.edit',
    CMS_PAGES_EDIT: 'cms.pages.edit',
    CMS_UPDATE: 'cms.pages.update',
    CMS_DELETE: 'cms.delete',
    CMS_PAGES_DELETE: 'cms.pages.delete',
    CMS_MENUS: 'cms.manage_menus',
    CMS_MENUS_MANAGE: 'cms.menus.manage',
    // Events Management
    EVENTS_VIEW: 'events.view',
    EVENTS_CREATE: 'events.create',
    EVENTS_EDIT: 'events.edit',
    EVENTS_UPDATE: 'events.update',
    EVENTS_DELETE: 'events.delete',
    EVENTS_PARTICIPANTS: 'events.participants',
    EVENTS_MANAGE_ATTENDEES: 'events.manage_attendees',
    // Certificates Management
    CERTIFICATES_VIEW: 'certificates.view',
    CERTIFICATES_CREATE: 'certificates.create',
    CERTIFICATES_EDIT: 'certificates.edit',
    CERTIFICATES_UPDATE: 'certificates.update',
    CERTIFICATES_REVOKE: 'certificates.revoke',
    // System Settings
    SYSTEM_SETTINGS: 'system.settings',
    SYSTEM_LOGS: 'system.logs',
    SETTINGS_MANAGE: 'settings.manage',
    // Newsletter/Subscriber
    NEWSLETTER_VIEW: 'newsletter.view',
    MARKETING_RECEIVE: 'marketing.receive',
    // Courses (for students)
    COURSES_VIEW: 'courses.view',
};
/**
 * Permission Categories for UI grouping
 */
exports.PERMISSION_CATEGORIES = {
    USER_MANAGEMENT: 'Kullanıcı Yönetimi',
    ROLE_MANAGEMENT: 'Rol Yönetimi',
    SUPPORT: 'Destek Yönetimi',
    MARKETING: 'Pazarlama Yönetimi',
    CMS: 'İçerik Yönetimi',
    EVENTS: 'Etkinlik Yönetimi',
    CERTIFICATES: 'Sertifika Yönetimi',
    SYSTEM: 'Sistem Ayarları',
    CONTENT: 'İçerik Erişimi',
};
/**
 * Map permissions to their categories
 */
exports.PERMISSION_CATEGORY_MAP = {
    // User Management
    [exports.PERMISSIONS.USERS_VIEW]: 'USER_MANAGEMENT',
    [exports.PERMISSIONS.USERS_CREATE]: 'USER_MANAGEMENT',
    [exports.PERMISSIONS.USERS_UPDATE]: 'USER_MANAGEMENT',
    [exports.PERMISSIONS.USERS_DELETE]: 'USER_MANAGEMENT',
    // Role Management
    [exports.PERMISSIONS.ROLES_VIEW]: 'ROLE_MANAGEMENT',
    [exports.PERMISSIONS.ROLES_MANAGE]: 'ROLE_MANAGEMENT',
    // Support
    [exports.PERMISSIONS.SUPPORT_VIEW]: 'SUPPORT',
    [exports.PERMISSIONS.SUPPORT_VIEW_ALL]: 'SUPPORT',
    [exports.PERMISSIONS.SUPPORT_RESPOND]: 'SUPPORT',
    [exports.PERMISSIONS.SUPPORT_REPLY]: 'SUPPORT',
    [exports.PERMISSIONS.SUPPORT_ASSIGN]: 'SUPPORT',
    // Marketing
    [exports.PERMISSIONS.MARKETING_MANAGE]: 'MARKETING',
    [exports.PERMISSIONS.MARKETING_CAMPAIGNS]: 'MARKETING',
    [exports.PERMISSIONS.MARKETING_MANAGE_CAMPAIGNS]: 'MARKETING',
    [exports.PERMISSIONS.MARKETING_MANAGE_NEWSLETTERS]: 'MARKETING',
    [exports.PERMISSIONS.MARKETING_MANAGE_SOCIAL]: 'MARKETING',
    // CMS
    [exports.PERMISSIONS.CMS_VIEW]: 'CMS',
    [exports.PERMISSIONS.CMS_PAGES_VIEW]: 'CMS',
    [exports.PERMISSIONS.CMS_CREATE]: 'CMS',
    [exports.PERMISSIONS.CMS_PAGES_CREATE]: 'CMS',
    [exports.PERMISSIONS.CMS_EDIT]: 'CMS',
    [exports.PERMISSIONS.CMS_PAGES_EDIT]: 'CMS',
    [exports.PERMISSIONS.CMS_UPDATE]: 'CMS',
    [exports.PERMISSIONS.CMS_DELETE]: 'CMS',
    [exports.PERMISSIONS.CMS_PAGES_DELETE]: 'CMS',
    [exports.PERMISSIONS.CMS_MENUS]: 'CMS',
    [exports.PERMISSIONS.CMS_MENUS_MANAGE]: 'CMS',
    // Events
    [exports.PERMISSIONS.EVENTS_VIEW]: 'EVENTS',
    [exports.PERMISSIONS.EVENTS_CREATE]: 'EVENTS',
    [exports.PERMISSIONS.EVENTS_EDIT]: 'EVENTS',
    [exports.PERMISSIONS.EVENTS_UPDATE]: 'EVENTS',
    [exports.PERMISSIONS.EVENTS_DELETE]: 'EVENTS',
    [exports.PERMISSIONS.EVENTS_PARTICIPANTS]: 'EVENTS',
    [exports.PERMISSIONS.EVENTS_MANAGE_ATTENDEES]: 'EVENTS',
    // Certificates
    [exports.PERMISSIONS.CERTIFICATES_VIEW]: 'CERTIFICATES',
    [exports.PERMISSIONS.CERTIFICATES_CREATE]: 'CERTIFICATES',
    [exports.PERMISSIONS.CERTIFICATES_EDIT]: 'CERTIFICATES',
    [exports.PERMISSIONS.CERTIFICATES_UPDATE]: 'CERTIFICATES',
    [exports.PERMISSIONS.CERTIFICATES_REVOKE]: 'CERTIFICATES',
    // System
    [exports.PERMISSIONS.SYSTEM_SETTINGS]: 'SYSTEM',
    [exports.PERMISSIONS.SYSTEM_LOGS]: 'SYSTEM',
    [exports.PERMISSIONS.SETTINGS_MANAGE]: 'SYSTEM',
    // Content
    [exports.PERMISSIONS.NEWSLETTER_VIEW]: 'CONTENT',
    [exports.PERMISSIONS.MARKETING_RECEIVE]: 'CONTENT',
    [exports.PERMISSIONS.COURSES_VIEW]: 'CONTENT',
};
/**
 * Helper function to check if a permission exists
 */
function isValidPermission(permission) {
    return Object.values(exports.PERMISSIONS).includes(permission);
}
/**
 * Helper function to get permission category
 */
function getPermissionCategory(permission) {
    const categoryKey = exports.PERMISSION_CATEGORY_MAP[permission];
    return categoryKey ? exports.PERMISSION_CATEGORIES[categoryKey] : undefined;
}
//# sourceMappingURL=permissions.js.map