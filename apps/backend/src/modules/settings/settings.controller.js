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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
let SettingsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('settings')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _remove_decorators;
    let _getSiteSettings_decorators;
    let _updateSiteSettings_decorators;
    let _getEmailSettings_decorators;
    let _getEmailSettingsMasked_decorators;
    let _updateEmailSettings_decorators;
    let _getAiSettings_decorators;
    let _updateAiSettings_decorators;
    let _testAiConnection_decorators;
    var SettingsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)()];
            _findAll_decorators = [(0, common_1.Get)()];
            _findOne_decorators = [(0, common_1.Get)('individual/:id')];
            _update_decorators = [(0, common_1.Put)('individual/:id')];
            _remove_decorators = [(0, common_1.Delete)('individual/:id')];
            _getSiteSettings_decorators = [(0, common_1.Get)('site')];
            _updateSiteSettings_decorators = [(0, common_1.Put)('site')];
            _getEmailSettings_decorators = [(0, common_1.Get)('email')];
            _getEmailSettingsMasked_decorators = [(0, common_1.Get)('email/masked')];
            _updateEmailSettings_decorators = [(0, common_1.Put)('email')];
            _getAiSettings_decorators = [(0, common_1.Get)('ai')];
            _updateAiSettings_decorators = [(0, common_1.Patch)('ai')];
            _testAiConnection_decorators = [(0, common_1.Post)('ai/test/:module')];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSiteSettings_decorators, { kind: "method", name: "getSiteSettings", static: false, private: false, access: { has: obj => "getSiteSettings" in obj, get: obj => obj.getSiteSettings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateSiteSettings_decorators, { kind: "method", name: "updateSiteSettings", static: false, private: false, access: { has: obj => "updateSiteSettings" in obj, get: obj => obj.updateSiteSettings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEmailSettings_decorators, { kind: "method", name: "getEmailSettings", static: false, private: false, access: { has: obj => "getEmailSettings" in obj, get: obj => obj.getEmailSettings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getEmailSettingsMasked_decorators, { kind: "method", name: "getEmailSettingsMasked", static: false, private: false, access: { has: obj => "getEmailSettingsMasked" in obj, get: obj => obj.getEmailSettingsMasked }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateEmailSettings_decorators, { kind: "method", name: "updateEmailSettings", static: false, private: false, access: { has: obj => "updateEmailSettings" in obj, get: obj => obj.updateEmailSettings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAiSettings_decorators, { kind: "method", name: "getAiSettings", static: false, private: false, access: { has: obj => "getAiSettings" in obj, get: obj => obj.getAiSettings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateAiSettings_decorators, { kind: "method", name: "updateAiSettings", static: false, private: false, access: { has: obj => "updateAiSettings" in obj, get: obj => obj.updateAiSettings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _testAiConnection_decorators, { kind: "method", name: "testAiConnection", static: false, private: false, access: { has: obj => "testAiConnection" in obj, get: obj => obj.testAiConnection }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SettingsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        settingsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(settingsService) {
            this.settingsService = settingsService;
        }
        create(createSettingDto) {
            return this.settingsService.create(createSettingDto);
        }
        findAll() {
            return this.settingsService.findAll();
        }
        findOne(id) {
            return this.settingsService.findOne(id);
        }
        update(id, updateSettingDto) {
            return this.settingsService.update(id, updateSettingDto);
        }
        remove(id) {
            return this.settingsService.remove(id);
        }
        // Site settings specific endpoints
        getSiteSettings() {
            return this.settingsService.getSiteSettings();
        }
        updateSiteSettings(siteSettingsDto) {
            return this.settingsService.updateSiteSettings(siteSettingsDto);
        }
        // Email settings endpoints
        async getEmailSettings() {
            return this.settingsService.getEmailSettings();
        }
        async getEmailSettingsMasked() {
            return this.settingsService.getEmailSettingsMasked();
        }
        async updateEmailSettings(emailSettingsDto) {
            return this.settingsService.updateEmailSettings(emailSettingsDto);
        }
        // AI settings endpoints
        async getAiSettings() {
            // Return masked version for frontend (hides API keys)
            return this.settingsService.getAiSettingsMasked();
        }
        async updateAiSettings(aiSettingsDto) {
            await this.settingsService.updateAiSettings(aiSettingsDto);
            return { message: 'AI settings updated successfully' };
        }
        async testAiConnection(module) {
            // TODO: Implement OpenAI API test in next phase
            // For now, just verify settings exist
            const apiKey = await this.settingsService.getAiApiKeyForModule(module);
            const model = await this.settingsService.getAiModelForModule(module);
            if (!apiKey) {
                return {
                    success: false,
                    message: `No API key configured for ${module}`,
                };
            }
            return {
                success: true,
                message: 'API key configured (connection test not yet implemented)',
                model,
            };
        }
    };
    return SettingsController = _classThis;
})();
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map