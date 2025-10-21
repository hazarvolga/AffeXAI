"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailLogoUrl = getEmailLogoUrl;
exports.getCompanyName = getCompanyName;
exports.getContactInfo = getContactInfo;
exports.getSocialMediaLinks = getSocialMediaLinks;
const site_settings_data_1 = require("../site-settings-data");
const mediaService_1 = __importDefault(require("../api/mediaService"));
/**
 * Get the logo URL for email templates (server-side version)
 * This function can handle both media IDs and direct URLs
 * @param isDarkMode Whether to get the dark mode logo
 * @returns The logo URL or a fallback placeholder
 */
async function getEmailLogoUrl(isDarkMode = false) {
    try {
        // Check if we have a media ID for the logo
        const logoId = isDarkMode ? site_settings_data_1.siteSettingsData.logoDarkId : site_settings_data_1.siteSettingsData.logoId;
        if (logoId) {
            // Try to get the media URL from the media service
            try {
                const media = await mediaService_1.default.getMediaById(logoId);
                return `http://localhost:9005${media.url}`;
            }
            catch (mediaError) {
                console.error('Error fetching media:', mediaError);
                // Fall through to direct URL fallback
            }
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
/**
 * Get contact information from site settings
 * @returns Contact information
 */
function getContactInfo() {
    return site_settings_data_1.siteSettingsData.contact;
}
/**
 * Get social media links from site settings
 * @returns Social media links object
 */
function getSocialMediaLinks() {
    return site_settings_data_1.siteSettingsData.socialMedia || {};
}
//# sourceMappingURL=siteSettings.js.map