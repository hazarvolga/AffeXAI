/**
 * Get the logo URL for email templates (server-side version)
 * This function can handle both media IDs and direct URLs
 * @param isDarkMode Whether to get the dark mode logo
 * @returns The logo URL or a fallback placeholder
 */
export declare function getEmailLogoUrl(isDarkMode?: boolean): Promise<string>;
/**
 * Get the company name from site settings
 * @returns The company name
 */
export declare function getCompanyName(): string;
/**
 * Get contact information from site settings
 * @returns Contact information
 */
export declare function getContactInfo(): {
    address: string;
    phone: string;
    email: string;
};
/**
 * Get social media links from site settings
 * @returns Social media links object
 */
export declare function getSocialMediaLinks(): {
    [key: string]: string;
};
//# sourceMappingURL=siteSettings.d.ts.map