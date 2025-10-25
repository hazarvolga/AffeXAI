/**
 * Centralized Permission Definitions
 * All system permissions are defined here for type safety and consistency
 */
export declare const PERMISSIONS: {
    readonly USERS_VIEW: "users.view";
    readonly USERS_CREATE: "users.create";
    readonly USERS_UPDATE: "users.update";
    readonly USERS_DELETE: "users.delete";
    readonly ROLES_VIEW: "roles.view";
    readonly ROLES_MANAGE: "roles.manage";
    readonly SUPPORT_VIEW: "support.view";
    readonly SUPPORT_VIEW_ALL: "support.view_all";
    readonly SUPPORT_RESPOND: "support.respond";
    readonly SUPPORT_REPLY: "support.reply";
    readonly SUPPORT_ASSIGN: "support.assign";
    readonly MARKETING_MANAGE: "marketing.manage";
    readonly MARKETING_CAMPAIGNS: "marketing.campaigns";
    readonly MARKETING_MANAGE_CAMPAIGNS: "marketing.manage_campaigns";
    readonly MARKETING_MANAGE_NEWSLETTERS: "marketing.manage_newsletters";
    readonly MARKETING_MANAGE_SOCIAL: "marketing.manage_social";
    readonly CMS_VIEW: "cms.view";
    readonly CMS_PAGES_VIEW: "cms.pages.view";
    readonly CMS_CREATE: "cms.create";
    readonly CMS_PAGES_CREATE: "cms.pages.create";
    readonly CMS_EDIT: "cms.edit";
    readonly CMS_PAGES_EDIT: "cms.pages.edit";
    readonly CMS_UPDATE: "cms.pages.update";
    readonly CMS_DELETE: "cms.delete";
    readonly CMS_PAGES_DELETE: "cms.pages.delete";
    readonly CMS_MENUS: "cms.manage_menus";
    readonly CMS_MENUS_MANAGE: "cms.menus.manage";
    readonly EVENTS_VIEW: "events.view";
    readonly EVENTS_CREATE: "events.create";
    readonly EVENTS_EDIT: "events.edit";
    readonly EVENTS_UPDATE: "events.update";
    readonly EVENTS_DELETE: "events.delete";
    readonly EVENTS_PARTICIPANTS: "events.participants";
    readonly EVENTS_MANAGE_ATTENDEES: "events.manage_attendees";
    readonly CERTIFICATES_VIEW: "certificates.view";
    readonly CERTIFICATES_CREATE: "certificates.create";
    readonly CERTIFICATES_EDIT: "certificates.edit";
    readonly CERTIFICATES_UPDATE: "certificates.update";
    readonly CERTIFICATES_REVOKE: "certificates.revoke";
    readonly SYSTEM_SETTINGS: "system.settings";
    readonly SYSTEM_LOGS: "system.logs";
    readonly SETTINGS_MANAGE: "settings.manage";
    readonly NEWSLETTER_VIEW: "newsletter.view";
    readonly MARKETING_RECEIVE: "marketing.receive";
    readonly COURSES_VIEW: "courses.view";
};
/**
 * Permission type for type safety
 */
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
/**
 * Permission Categories for UI grouping
 */
export declare const PERMISSION_CATEGORIES: {
    readonly USER_MANAGEMENT: "Kullanıcı Yönetimi";
    readonly ROLE_MANAGEMENT: "Rol Yönetimi";
    readonly SUPPORT: "Destek Yönetimi";
    readonly MARKETING: "Pazarlama Yönetimi";
    readonly CMS: "İçerik Yönetimi";
    readonly EVENTS: "Etkinlik Yönetimi";
    readonly CERTIFICATES: "Sertifika Yönetimi";
    readonly SYSTEM: "Sistem Ayarları";
    readonly CONTENT: "İçerik Erişimi";
};
/**
 * Map permissions to their categories
 */
export declare const PERMISSION_CATEGORY_MAP: Record<string, keyof typeof PERMISSION_CATEGORIES>;
/**
 * Helper function to check if a permission exists
 */
export declare function isValidPermission(permission: string): permission is Permission;
/**
 * Helper function to get permission category
 */
export declare function getPermissionCategory(permission: string): string | undefined;
//# sourceMappingURL=permissions.d.ts.map