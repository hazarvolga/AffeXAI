export type SiteSettings = {
    companyName: string;
    logoId?: string;
    logoDarkId?: string;
    logoUrl?: string;
    logoDarkUrl?: string;
    contact: {
        address: string;
        phone: string;
        email: string;
    };
    socialMedia: {
        [key: string]: string;
    };
    seo: {
        defaultTitle: string;
        defaultDescription: string;
    };
};
export declare const siteSettingsData: SiteSettings;
//# sourceMappingURL=site-settings-data.d.ts.map