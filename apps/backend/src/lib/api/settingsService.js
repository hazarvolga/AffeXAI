"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SettingsService {
    async getSiteSettings() {
        // Directly call the backend API
        const response = await fetch('http://localhost:9005/api/settings/site');
        if (!response.ok) {
            throw new Error('Failed to fetch site settings');
        }
        return response.json();
    }
}
exports.default = new SettingsService();
//# sourceMappingURL=settingsService.js.map