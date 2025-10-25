"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiConnectionTestDto = exports.AiSettingsMaskedDto = exports.AiSettingsDto = exports.AiModuleSettingsDto = exports.AiModel = exports.AiProvider = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
/**
 * Supported AI Providers
 */
var AiProvider;
(function (AiProvider) {
    AiProvider["OPENAI"] = "openai";
    AiProvider["ANTHROPIC"] = "anthropic";
    AiProvider["GOOGLE"] = "google";
    AiProvider["OPENROUTER"] = "openrouter";
    AiProvider["LOCAL"] = "local";
})(AiProvider || (exports.AiProvider = AiProvider = {}));
/**
 * Supported AI Models
 */
var AiModel;
(function (AiModel) {
    // OpenAI Models
    AiModel["GPT_4"] = "gpt-4";
    AiModel["GPT_4_TURBO"] = "gpt-4-turbo";
    AiModel["GPT_4O"] = "gpt-4o";
    AiModel["GPT_3_5_TURBO"] = "gpt-3.5-turbo";
    // Anthropic Models
    AiModel["CLAUDE_3_5_SONNET"] = "claude-3-5-sonnet-20241022";
    AiModel["CLAUDE_3_OPUS"] = "claude-3-opus-20240229";
    AiModel["CLAUDE_3_SONNET"] = "claude-3-sonnet-20240229";
    AiModel["CLAUDE_3_HAIKU"] = "claude-3-haiku-20240307";
    // Google Models
    AiModel["GEMINI_PRO"] = "gemini-pro";
    AiModel["GEMINI_PRO_VISION"] = "gemini-pro-vision";
    AiModel["GEMINI_1_5_PRO"] = "gemini-1.5-pro";
    AiModel["GEMINI_1_5_FLASH"] = "gemini-1.5-flash";
    // OpenRouter Models (Popular ones)
    AiModel["OPENROUTER_GPT_4"] = "openai/gpt-4";
    AiModel["OPENROUTER_CLAUDE_3_5_SONNET"] = "anthropic/claude-3.5-sonnet";
    AiModel["OPENROUTER_LLAMA_3_1_70B"] = "meta-llama/llama-3.1-70b-instruct";
    // Local Models (Ollama)
    AiModel["LOCAL_LLAMA_3_1"] = "llama3.1";
    AiModel["LOCAL_MISTRAL"] = "mistral";
    AiModel["LOCAL_CODELLAMA"] = "codellama";
})(AiModel || (exports.AiModel = AiModel = {}));
/**
 * AI Module Settings
 * Used for each AI-powered module (emailMarketing, social, support, analytics)
 */
let AiModuleSettingsDto = (() => {
    let _apiKey_decorators;
    let _apiKey_initializers = [];
    let _apiKey_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _enabled_decorators;
    let _enabled_initializers = [];
    let _enabled_extraInitializers = [];
    let _provider_decorators;
    let _provider_initializers = [];
    let _provider_extraInitializers = [];
    return class AiModuleSettingsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _apiKey_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _model_decorators = [(0, class_validator_1.IsEnum)(AiModel)];
            _enabled_decorators = [(0, class_validator_1.IsBoolean)()];
            _provider_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(AiProvider)];
            __esDecorate(null, null, _apiKey_decorators, { kind: "field", name: "apiKey", static: false, private: false, access: { has: obj => "apiKey" in obj, get: obj => obj.apiKey, set: (obj, value) => { obj.apiKey = value; } }, metadata: _metadata }, _apiKey_initializers, _apiKey_extraInitializers);
            __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(null, null, _enabled_decorators, { kind: "field", name: "enabled", static: false, private: false, access: { has: obj => "enabled" in obj, get: obj => obj.enabled, set: (obj, value) => { obj.enabled = value; } }, metadata: _metadata }, _enabled_initializers, _enabled_extraInitializers);
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: obj => "provider" in obj, get: obj => obj.provider, set: (obj, value) => { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        apiKey = __runInitializers(this, _apiKey_initializers, void 0); // Module-specific API key (optional if using global)
        model = (__runInitializers(this, _apiKey_extraInitializers), __runInitializers(this, _model_initializers, void 0));
        enabled = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _enabled_initializers, void 0));
        provider = (__runInitializers(this, _enabled_extraInitializers), __runInitializers(this, _provider_initializers, void 0)); // Auto-detected from model, but can override
        constructor() {
            __runInitializers(this, _provider_extraInitializers);
        }
    };
})();
exports.AiModuleSettingsDto = AiModuleSettingsDto;
/**
 * Complete AI Settings
 */
let AiSettingsDto = (() => {
    let _useSingleApiKey_decorators;
    let _useSingleApiKey_initializers = [];
    let _useSingleApiKey_extraInitializers = [];
    let _global_decorators;
    let _global_initializers = [];
    let _global_extraInitializers = [];
    let _emailMarketing_decorators;
    let _emailMarketing_initializers = [];
    let _emailMarketing_extraInitializers = [];
    let _social_decorators;
    let _social_initializers = [];
    let _social_extraInitializers = [];
    let _support_decorators;
    let _support_initializers = [];
    let _support_extraInitializers = [];
    let _analytics_decorators;
    let _analytics_initializers = [];
    let _analytics_extraInitializers = [];
    return class AiSettingsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _useSingleApiKey_decorators = [(0, class_validator_1.IsBoolean)()];
            _global_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => AiModuleSettingsDto)];
            _emailMarketing_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => AiModuleSettingsDto)];
            _social_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => AiModuleSettingsDto)];
            _support_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => AiModuleSettingsDto)];
            _analytics_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => AiModuleSettingsDto)];
            __esDecorate(null, null, _useSingleApiKey_decorators, { kind: "field", name: "useSingleApiKey", static: false, private: false, access: { has: obj => "useSingleApiKey" in obj, get: obj => obj.useSingleApiKey, set: (obj, value) => { obj.useSingleApiKey = value; } }, metadata: _metadata }, _useSingleApiKey_initializers, _useSingleApiKey_extraInitializers);
            __esDecorate(null, null, _global_decorators, { kind: "field", name: "global", static: false, private: false, access: { has: obj => "global" in obj, get: obj => obj.global, set: (obj, value) => { obj.global = value; } }, metadata: _metadata }, _global_initializers, _global_extraInitializers);
            __esDecorate(null, null, _emailMarketing_decorators, { kind: "field", name: "emailMarketing", static: false, private: false, access: { has: obj => "emailMarketing" in obj, get: obj => obj.emailMarketing, set: (obj, value) => { obj.emailMarketing = value; } }, metadata: _metadata }, _emailMarketing_initializers, _emailMarketing_extraInitializers);
            __esDecorate(null, null, _social_decorators, { kind: "field", name: "social", static: false, private: false, access: { has: obj => "social" in obj, get: obj => obj.social, set: (obj, value) => { obj.social = value; } }, metadata: _metadata }, _social_initializers, _social_extraInitializers);
            __esDecorate(null, null, _support_decorators, { kind: "field", name: "support", static: false, private: false, access: { has: obj => "support" in obj, get: obj => obj.support, set: (obj, value) => { obj.support = value; } }, metadata: _metadata }, _support_initializers, _support_extraInitializers);
            __esDecorate(null, null, _analytics_decorators, { kind: "field", name: "analytics", static: false, private: false, access: { has: obj => "analytics" in obj, get: obj => obj.analytics, set: (obj, value) => { obj.analytics = value; } }, metadata: _metadata }, _analytics_initializers, _analytics_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        useSingleApiKey = __runInitializers(this, _useSingleApiKey_initializers, void 0); // If true, all modules use global.apiKey
        global = (__runInitializers(this, _useSingleApiKey_extraInitializers), __runInitializers(this, _global_initializers, void 0)); // Global AI settings (used when useSingleApiKey=true)
        emailMarketing = (__runInitializers(this, _global_extraInitializers), __runInitializers(this, _emailMarketing_initializers, void 0));
        social = (__runInitializers(this, _emailMarketing_extraInitializers), __runInitializers(this, _social_initializers, void 0));
        support = (__runInitializers(this, _social_extraInitializers), __runInitializers(this, _support_initializers, void 0));
        analytics = (__runInitializers(this, _support_extraInitializers), __runInitializers(this, _analytics_initializers, void 0));
        constructor() {
            __runInitializers(this, _analytics_extraInitializers);
        }
    };
})();
exports.AiSettingsDto = AiSettingsDto;
/**
 * Masked AI Settings (for frontend - API keys hidden)
 */
class AiSettingsMaskedDto extends AiSettingsDto {
    static mask(settings) {
        const masked = JSON.parse(JSON.stringify(settings));
        // Mask global API key
        if (masked.global?.apiKey) {
            masked.global.apiKey = '***' + masked.global.apiKey.slice(-4);
        }
        // Mask module-specific API keys
        if (masked.emailMarketing?.apiKey) {
            masked.emailMarketing.apiKey = '***' + masked.emailMarketing.apiKey.slice(-4);
        }
        if (masked.social?.apiKey) {
            masked.social.apiKey = '***' + masked.social.apiKey.slice(-4);
        }
        if (masked.support?.apiKey) {
            masked.support.apiKey = '***' + masked.support.apiKey.slice(-4);
        }
        if (masked.analytics?.apiKey) {
            masked.analytics.apiKey = '***' + masked.analytics.apiKey.slice(-4);
        }
        return masked;
    }
}
exports.AiSettingsMaskedDto = AiSettingsMaskedDto;
/**
 * AI Connection Test Result
 */
let AiConnectionTestDto = (() => {
    let _success_decorators;
    let _success_initializers = [];
    let _success_extraInitializers = [];
    let _message_decorators;
    let _message_initializers = [];
    let _message_extraInitializers = [];
    let _provider_decorators;
    let _provider_initializers = [];
    let _provider_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    return class AiConnectionTestDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _success_decorators = [(0, class_validator_1.IsBoolean)()];
            _message_decorators = [(0, class_validator_1.IsString)()];
            _provider_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _model_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _success_decorators, { kind: "field", name: "success", static: false, private: false, access: { has: obj => "success" in obj, get: obj => obj.success, set: (obj, value) => { obj.success = value; } }, metadata: _metadata }, _success_initializers, _success_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: obj => "message" in obj, get: obj => obj.message, set: (obj, value) => { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: obj => "provider" in obj, get: obj => obj.provider, set: (obj, value) => { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        success = __runInitializers(this, _success_initializers, void 0);
        message = (__runInitializers(this, _success_extraInitializers), __runInitializers(this, _message_initializers, void 0));
        provider = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _provider_initializers, void 0)); // openai, anthropic
        model = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _model_initializers, void 0)); // actual model tested
        constructor() {
            __runInitializers(this, _model_extraInitializers);
        }
    };
})();
exports.AiConnectionTestDto = AiConnectionTestDto;
//# sourceMappingURL=ai-settings.dto.js.map