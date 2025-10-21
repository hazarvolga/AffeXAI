"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogoUrl = getLogoUrl;
exports.getCompanyName = getCompanyName;
const site_settings_data_1 = require("@/lib/site-settings-data");
/**
 * Get the logo URL for the client components
 * This function handles both media IDs and direct URLs
 * @param isDarkMode Whether to get the dark mode logo
 * @returns The logo URL or a fallback placeholder
 */
function getLogoUrl(isDarkMode = false) {
    try {
        // Check if we have a media ID for the logo
        const logoId = isDarkMode ? site_settings_data_1.siteSettingsData.logoDarkId : site_settings_data_1.siteSettingsData.logoId;
        if (logoId) {
            // Return the media URL directly
            return `http://localhost:9006/uploads/${logoId}`;
        }
        // Fallback to the direct URL if available
        if (isDarkMode && site_settings_data_1.siteSettingsData.logoDarkUrl) {
            return site_settings_data_1.siteSettingsData.logoDarkUrl;
        }
        if (!isDarkMode && site_settings_data_1.siteSettingsData.logoUrl) {
            return site_settings_data_1.siteSettingsData.logoUrl;
        }
        // Default placeholder
        return isDarkMode
            ? 'https://placehold.co/140x40/171717/f0f0f0?text=Logo'
            : 'https://placehold.co/140x40/f7f7f7/1a1a1a?text=Logo';
    }
    catch (error) {
        console.error('Error getting logo URL:', error);
        // Return fallback placeholder
        return isDarkMode
            ? 'https://placehold.co/140x40/171717/f0f0f0?text=Logo'
            : 'https://placehold.co/140x40/f7f7f7/1a1a1a?text=Logo';
    }
}
/**
 * Get the company name from site settings
 * @returns The company name
 */
function getCompanyName() {
    return site_settings_data_1.siteSettingsData.companyName || 'Aluplan';
}
//# sourceMappingURL=siteSettings.js.map