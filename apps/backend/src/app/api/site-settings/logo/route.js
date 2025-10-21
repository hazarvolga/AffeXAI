"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
const siteSettings_1 = require("@/lib/server/siteSettings");
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const isDarkMode = searchParams.get('dark') === 'true';
    try {
        const logoUrl = await (0, siteSettings_1.getEmailLogoUrl)(isDarkMode);
        return server_1.NextResponse.json({ logoUrl });
    }
    catch (error) {
        console.error('Error getting logo URL:', error);
        return server_1.NextResponse.json({ error: 'Failed to get logo URL' }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map