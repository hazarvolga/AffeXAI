"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsService = void 0;
const http_client_1 = require("./http-client");
/**
 * Settings Service
 * Handles site settings API operations with unified HTTP client
 * Note: Uses getWrapped() because backend uses global ApiResponse wrapper
 */
class SettingsService {
    /**
     * Get site settings
     */
    async getSiteSettings() {
        return http_client_1.httpClient.getWrapped('/settings/site');
    }
    /**
     * Get AI settings (returns masked API keys)
     */
    async getAiSettings() {
        return http_client_1.httpClient.getWrapped('/settings/ai');
    }
    /**
     * Update AI settings
     */
    async updateAiSettings(settings) {
        return http_client_1.httpClient.patchWrapped('/settings/ai', settings);
    }
    /**
     * Test AI connection for specific module
     */
    async testAiConnection(module) {
        return http_client_1.httpClient.postWrapped(`/settings/ai/test/${module}`, {});
    }
}
exports.settingsService = new SettingsService();
exports.default = exports.settingsService;
//# sourceMappingURL=settingsService.js.map