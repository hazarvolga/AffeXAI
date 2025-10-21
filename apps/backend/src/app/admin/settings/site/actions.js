"use strict";
'use server';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSiteSettings = saveSiteSettings;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const zod_1 = require("zod");
const cache_1 = require("next/cache");
// This defines the shape of the data we expect from the form.
const SettingsSchema = zod_1.z.object({
    companyName: zod_1.z.string().min(1, 'Şirket adı boş olamaz.'),
    logoUrl: zod_1.z.string(),
    logoDarkUrl: zod_1.z.string(),
    address: zod_1.z.string(),
    phone: zod_1.z.string(),
    email: zod_1.z.string().email('Geçerli bir e-posta adresi girin.'),
    defaultTitle: zod_1.z.string(),
    defaultDescription: zod_1.z.string(),
    // Social media fields are dynamic, so we'll handle them separately.
});
// Function to update settings in the backend database
async function updateBackendSettings(settings) {
    try {
        console.log('Sending settings to backend:', JSON.stringify(settings, null, 2));
        const response = await fetch('http://localhost:9005/api/settings/site', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Backend error response:', errorText);
            throw new Error(`Failed to update backend settings: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Failed to update backend settings:', error);
        throw error;
    }
}
async function saveSiteSettings(prevState, formData) {
    const socialMedia = {};
    const allEntries = Array.from(formData.entries());
    console.log('Form data entries:', allEntries);
    for (const [key, value] of allEntries) {
        if (key.startsWith('social-')) {
            const platform = key.replace('social-', '');
            if (typeof value === 'string') {
                socialMedia[platform] = value;
            }
        }
    }
    console.log('Extracted social media:', socialMedia);
    // Get form values and provide defaults for null values
    const getFormValue = (key) => {
        const value = formData.get(key);
        return value === null ? '' : String(value);
    };
    // Provide default values for all fields to prevent null values
    const companyName = getFormValue('companyName') || 'Aluplan Program Sistemleri 2026';
    const logoUrl = getFormValue('logoUrl') || '';
    const logoDarkUrl = getFormValue('logoDarkUrl') || '';
    const address = getFormValue('address') || '';
    const phone = getFormValue('phone') || '';
    const email = getFormValue('email') || 'info@aluplan.com.tr';
    const defaultTitle = getFormValue('defaultTitle') || 'Aluplan Digital - AEC Çözümleri';
    const defaultDescription = getFormValue('defaultDescription') || 'AEC profesyonelleri için en gelişmiş dijital çözümler ve uzman desteği.';
    const validatedFields = SettingsSchema.safeParse({
        companyName,
        logoUrl,
        logoDarkUrl,
        address,
        phone,
        email,
        defaultTitle,
        defaultDescription,
    });
    console.log('Frontend validation result:', validatedFields);
    if (!validatedFields.success) {
        console.error('Frontend validation errors:', validatedFields.error);
        return {
            message: 'Form verileri geçersiz. Lütfen tüm alanları kontrol edin.',
            success: false,
        };
    }
    // Process logo URLs - if they look like file IDs, keep them as is
    // Otherwise, they should be valid URLs
    const processLogoUrl = (url) => {
        if (!url)
            return undefined;
        // If it looks like a file ID (contains a dot and doesn't start with http), keep as is
        if (url.includes('.') && !url.startsWith('http')) {
            return url;
        }
        // Otherwise, it should be a valid URL
        return url;
    };
    const newSettings = {
        companyName: validatedFields.data.companyName,
        logoUrl: processLogoUrl(validatedFields.data.logoUrl),
        logoDarkUrl: processLogoUrl(validatedFields.data.logoDarkUrl),
        contact: {
            address: validatedFields.data.address,
            phone: validatedFields.data.phone,
            email: validatedFields.data.email,
        },
        socialMedia,
        seo: {
            defaultTitle: validatedFields.data.defaultTitle,
            defaultDescription: validatedFields.data.defaultDescription,
        },
    };
    console.log('Settings to be sent to backend:', newSettings);
    try {
        // Update settings in the backend database
        await updateBackendSettings(newSettings);
        // Also update the static file for backward compatibility
        const fileContent = `
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

export const siteSettingsData: SiteSettings = ${JSON.stringify(newSettings, null, 4)};
`;
        const filePath = path_1.default.join(process.cwd(), 'src', 'lib', 'site-settings-data.ts');
        await fs_1.promises.writeFile(filePath, fileContent.trim());
        // Revalidate paths to reflect changes immediately across the app
        (0, cache_1.revalidatePath)('/', 'layout');
        return {
            message: 'Site ayarları başarıyla kaydedildi!',
            success: true,
        };
    }
    catch (error) {
        console.error('Failed to save site settings:', error);
        return {
            message: 'Ayarlar kaydedilirken bir sunucu hatası oluştu: ' + error.message,
            success: false,
        };
    }
}
//# sourceMappingURL=actions.js.map