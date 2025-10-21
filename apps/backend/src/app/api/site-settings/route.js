"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
const settingsService_1 = __importDefault(require("@/lib/api/settingsService"));
async function GET() {
    try {
        const settings = await settingsService_1.default.getSiteSettings();
        return server_1.NextResponse.json(settings);
    }
    catch (error) {
        console.error('Error fetching site settings:', error);
        return server_1.NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map