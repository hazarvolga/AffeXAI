"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAiPreferencesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let UserAiPreferencesController = (() => {
    let _classDecorators = [(0, common_1.Controller)('user-ai-preferences'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getUserPreferences_decorators;
    let _getPreferenceForModule_decorators;
    let _upsertPreference_decorators;
    let _updatePreference_decorators;
    let _deletePreference_decorators;
    let _deleteAllPreferences_decorators;
    var UserAiPreferencesController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getUserPreferences_decorators = [(0, common_1.Get)()];
            _getPreferenceForModule_decorators = [(0, common_1.Get)(':module')];
            _upsertPreference_decorators = [(0, common_1.Post)()];
            _updatePreference_decorators = [(0, common_1.Put)(':id')];
            _deletePreference_decorators = [(0, common_1.Delete)(':id'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT)];
            _deleteAllPreferences_decorators = [(0, common_1.Delete)(), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT)];
            __esDecorate(this, null, _getUserPreferences_decorators, { kind: "method", name: "getUserPreferences", static: false, private: false, access: { has: obj => "getUserPreferences" in obj, get: obj => obj.getUserPreferences }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getPreferenceForModule_decorators, { kind: "method", name: "getPreferenceForModule", static: false, private: false, access: { has: obj => "getPreferenceForModule" in obj, get: obj => obj.getPreferenceForModule }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _upsertPreference_decorators, { kind: "method", name: "upsertPreference", static: false, private: false, access: { has: obj => "upsertPreference" in obj, get: obj => obj.upsertPreference }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updatePreference_decorators, { kind: "method", name: "updatePreference", static: false, private: false, access: { has: obj => "updatePreference" in obj, get: obj => obj.updatePreference }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deletePreference_decorators, { kind: "method", name: "deletePreference", static: false, private: false, access: { has: obj => "deletePreference" in obj, get: obj => obj.deletePreference }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteAllPreferences_decorators, { kind: "method", name: "deleteAllPreferences", static: false, private: false, access: { has: obj => "deleteAllPreferences" in obj, get: obj => obj.deleteAllPreferences }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UserAiPreferencesController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        preferencesService = __runInitializers(this, _instanceExtraInitializers);
        constructor(preferencesService) {
            this.preferencesService = preferencesService;
        }
        /**
         * Get all AI preferences for current user
         */
        async getUserPreferences(req) {
            const userId = req.user.userId;
            const preferences = await this.preferencesService.getUserPreferences(userId);
            // Mask API keys in response
            return preferences.map((pref) => ({
                ...pref,
                apiKey: pref.apiKey ? this.maskApiKey(pref.apiKey) : null,
            }));
        }
        /**
         * Get AI preference for specific module
         */
        async getPreferenceForModule(req, module) {
            const userId = req.user.userId;
            const preference = await this.preferencesService.getUserPreferenceForModule(userId, module);
            if (!preference) {
                return null;
            }
            // Mask API key in response
            return {
                ...preference,
                apiKey: preference.apiKey ? this.maskApiKey(preference.apiKey) : null,
            };
        }
        /**
         * Create or update AI preference
         */
        async upsertPreference(req, dto) {
            const userId = req.user.userId;
            const preference = await this.preferencesService.upsertPreference(userId, dto);
            // Mask API key in response
            return {
                ...preference,
                apiKey: preference.apiKey ? this.maskApiKey(preference.apiKey) : null,
            };
        }
        /**
         * Update AI preference by ID
         */
        async updatePreference(id, dto) {
            const preference = await this.preferencesService.updatePreference(id, dto);
            // Mask API key in response
            return {
                ...preference,
                apiKey: preference.apiKey ? this.maskApiKey(preference.apiKey) : null,
            };
        }
        /**
         * Delete AI preference by ID
         */
        async deletePreference(id) {
            await this.preferencesService.deletePreference(id);
        }
        /**
         * Delete all AI preferences for current user
         */
        async deleteAllPreferences(req) {
            const userId = req.user.userId;
            await this.preferencesService.deleteAllUserPreferences(userId);
        }
        /**
         * Mask API key for display (show only last 4 characters)
         */
        maskApiKey(apiKey) {
            if (apiKey.length <= 4) {
                return '***';
            }
            // For encrypted keys, just show masked
            if (apiKey.includes(':')) {
                return '***••••';
            }
            const last4 = apiKey.slice(-4);
            return `***${last4}`;
        }
    };
    return UserAiPreferencesController = _classThis;
})();
exports.UserAiPreferencesController = UserAiPreferencesController;
//# sourceMappingURL=user-ai-preferences.controller.js.map