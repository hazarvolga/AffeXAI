export interface Contact {
    address: string;
    phone: string;
    email: string;
}
export interface SocialMedia {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    pinterest?: string;
    tiktok?: string;
    [key: string]: string | undefined;
}
export interface Seo {
    defaultTitle: string;
    defaultDescription: string;
}
export interface SiteSettings {
    companyName: string;
    logoUrl: string;
    logoDarkUrl: string;
    contact: Contact;
    socialMedia: SocialMedia;
    seo: Seo;
}
declare class SettingsService {
    getSiteSettings(): Promise<SiteSettings>;
}
declare const _default: SettingsService;
export default _default;
//# sourceMappingURL=settingsService.d.ts.map