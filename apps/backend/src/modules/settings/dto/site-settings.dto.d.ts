export declare class ContactDto {
    address: string;
    phone: string;
    email: string;
}
export declare class SocialMediaDto {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    pinterest?: string;
    tiktok?: string;
    [key: string]: string | undefined;
}
export declare class SeoDto {
    defaultTitle: string;
    defaultDescription: string;
}
export declare class SiteSettingsDto {
    companyName: string;
    logoUrl: string;
    logoDarkUrl: string;
    contact: ContactDto;
    socialMedia: SocialMediaDto;
    seo: SeoDto;
}
//# sourceMappingURL=site-settings.dto.d.ts.map