"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAiPreferencesService = exports.AiModule = exports.AiProvider = void 0;
const http_client_1 = __importDefault(require("./http-client"));
var AiProvider;
(function (AiProvider) {
    AiProvider["OPENAI"] = "openai";
    AiProvider["ANTHROPIC"] = "anthropic";
    AiProvider["GOOGLE"] = "google";
})(AiProvider || (exports.AiProvider = AiProvider = {}));
var AiModule;
(function (AiModule) {
    AiModule["EMAIL"] = "email";
    AiModule["SOCIAL"] = "social";
    AiModule["SUPPORT"] = "support";
    AiModule["ANALYTICS"] = "analytics";
})(AiModule || (exports.AiModule = AiModule = {}));
class UserAiPreferencesService {
    baseUrl = '/user-ai-preferences';
    /**
     * Get all AI preferences for current user
     */
    async getUserPreferences() {
        const response = await http_client_1.default.get(this.baseUrl);
        return response;
    }
    /**
     * Get AI preference for specific module
     */
    async getPreferenceForModule(module) {
        try {
            const response = await http_client_1.default.get(`${this.baseUrl}/${module}`);
            return response;
        }
        catch (error) {
            if (error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }
    /**
     * Create or update AI preference
     */
    async upsertPreference(dto) {
        const response = await http_client_1.default.post(this.baseUrl, dto);
        return response;
    }
    /**
     * Update AI preference by ID
     */
    async updatePreference(id, dto) {
        const response = await http_client_1.default.put(`${this.baseUrl}/${id}`, dto);
        return response;
    }
    /**
     * Delete AI preference by ID
     */
    async deletePreference(id) {
        await http_client_1.default.delete(`${this.baseUrl}/${id}`);
    }
    /**
     * Delete all AI preferences for current user
     */
    async deleteAllPreferences() {
        await http_client_1.default.delete(this.baseUrl);
    }
}
exports.userAiPreferencesService = new UserAiPreferencesService();
exports.default = exports.userAiPreferencesService;
//# sourceMappingURL=user-ai-preferences.js.map