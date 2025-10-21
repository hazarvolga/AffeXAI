"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceContentName = exports.socialPosts = exports.getPlatformIcon = exports.socialAccounts = void 0;
const lucide_react_1 = require("lucide-react");
const events_data_1 = require("./events-data");
const cms_data_1 = require("./cms-data");
const site_settings_data_1 = require("./site-settings-data");
// --- DYNAMIC ACCOUNT GENERATION ---
// This part now reads from siteSettingsData to create the accounts dynamically.
// The connection status is still mocked here, but the list of accounts is dynamic.
// Mock connection status. In a real app, this would come from a database.
const connectionStatus = {
    facebook: true,
    twitter: true,
    linkedin: false,
    youtube: false,
    instagram: true,
};
const extractUsername = (platform, url) => {
    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        if (platform.toLowerCase() === 'linkedin' && pathParts.includes('company')) {
            return pathParts[pathParts.indexOf('company') + 1] || 'Aluplan';
        }
        return pathParts.pop() || `Aluplan ${platform}`;
    }
    catch (e) {
        return `Aluplan ${platform}`;
    }
};
exports.socialAccounts = Object.entries(site_settings_data_1.siteSettingsData.socialMedia)
    .filter(([_, url]) => url) // Filter out empty URLs
    .map(([platform, url], index) => {
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
    return {
        id: `acc-${platform.substring(0, 2)}-${String(index + 1).padStart(3, '0')}`,
        platform: platformName,
        username: extractUsername(platform, url),
        avatarUrl: `https://i.pravatar.cc/150?u=${platform}`,
        isConnected: connectionStatus[platform] || false,
    };
});
// --- ICON MAPPING ---
const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
        case 'facebook': return lucide_react_1.Facebook;
        case 'twitter': return lucide_react_1.Twitter;
        case 'linkedin': return lucide_react_1.Linkedin;
        case 'youtube': return lucide_react_1.Youtube;
        case 'instagram': return lucide_react_1.Instagram;
        case 'pinterest': return lucide_react_1.Share2;
        case 'tiktok': return lucide_react_1.Component;
        default: return lucide_react_1.Share2;
    }
};
exports.getPlatformIcon = getPlatformIcon;
// --- MOCKED POST DATA (Remains the same for now) ---
exports.socialPosts = [
    {
        id: 'post-001',
        accountId: exports.socialAccounts.find(a => a.platform === 'Facebook')?.id || 'acc-fb-001',
        status: 'Yayınlandı',
        content: `Allplan'ın en yeni sürümü olan 2025'in getirdiği çığır açan özellikleri kaçırmayın! Uzmanlarımızdan canlı demolar izleyin, sektör liderleriyle tanışın.`,
        sourceContentId: 'evt-001',
        sourceContentType: 'event',
        publishedAt: '2024-07-28T10:00:00.000Z',
    },
    {
        id: 'post-002',
        accountId: exports.socialAccounts.find(a => a.platform === 'Twitter')?.id || 'acc-tw-001',
        status: 'Yayınlandı',
        content: `Allplan 2025 Lansmanı için geri sayım başladı! 🚀 Yeni özellikler, canlı demolar ve daha fazlası... #Allplan #BIM #AEC`,
        sourceContentId: 'evt-001',
        sourceContentType: 'event',
        publishedAt: '2024-07-28T10:05:00.000Z',
    },
    {
        id: 'post-003',
        accountId: exports.socialAccounts.find(a => a.platform === 'Facebook')?.id || 'acc-fb-001',
        status: 'Planlandı',
        content: `Ücretsiz webinarımıza katılın: Allplan Bridge ile Parametrik Köprü Tasarımı. Projelerinizi nasıl hızlandırabileceğinizi keşfedin.`,
        sourceContentId: 'evt-002',
        sourceContentType: 'event',
        scheduledAt: '2024-08-20T14:00:00.000Z',
    },
    {
        id: 'post-004',
        accountId: exports.socialAccounts.find(a => a.platform === 'LinkedIn')?.id || 'acc-li-001',
        status: 'Hata',
        content: `Yeni sayfamız yayında: "Bina Tasarımı Çözümleri". Mimari, strüktürel ve MEP için entegre BIM çözümlerimizi keşfedin.`,
        sourceContentId: 'page-solutions-building-design',
        sourceContentType: 'page',
        scheduledAt: '2024-07-30T11:00:00.000Z',
    }
];
const getSourceContentName = (type, id) => {
    if (type === 'event') {
        return events_data_1.events.find(e => e.id === id)?.title || 'Bilinmeyen Etkinlik';
    }
    if (type === 'page') {
        return cms_data_1.pages.find(p => p.id === id)?.title || 'Bilinmeyen Sayfa';
    }
    return 'Bilinmeyen İçerik';
};
exports.getSourceContentName = getSourceContentName;
//# sourceMappingURL=social-media-data.js.map