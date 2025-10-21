/**
 * Get the logo URL for email templates (server-side version)
 * This function can handle both media IDs and direct URLs
 * @param isDarkMode Whether to get the dark mode logo
 * @returns The logo URL or a fallback placeholder
 */
export declare function getEmailLogoUrl(isDarkMode?: boolean): Promise<string>;
/**
 * Get complete site settings for email templates
 * Returns all site configuration including company info, logos, and social links
 */
export declare function getSiteSettings(): Promise<{
    companyName: any;
    logoUrl: string;
    logoDarkUrl: string;
    tagline: any;
    address: any;
    phone: any;
    email: any;
    contactEmail: any;
    socialMedia: {
        facebook: any;
        twitter: any;
        instagram: any;
        linkedin: any;
        youtube: any;
    };
}>;
/**
 * Get the logo URL synchronously for email templates
 * Uses only the static data without media service
 * @param isDarkMode Whether to get the dark mode logo
 * @returns The logo URL or a fallback placeholder
 */
export declare function getLogoUrl(isDarkMode?: boolean): string;
/**
 * Get the company name from site settings
 * @returns The company name
 */
export declare function getCompanyName(): string;
/**
 * Get contact information from site settings
 * @returns Contact information
 */
export declare function getContactInfo(): any;
/**
 * Get social media links from site settings
 * @returns Social media links object
 */
export declare function getSocialMediaLinks(): any;
//# sourceMappingURL=siteSettings.d.ts.map