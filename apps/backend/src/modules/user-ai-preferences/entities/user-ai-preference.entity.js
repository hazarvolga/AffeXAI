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
exports.UserAiPreference = exports.AiModule = exports.AiProvider = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../database/entities/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
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
let UserAiPreference = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('user_ai_preferences'), (0, typeorm_1.Index)('idx_user_module_unique', ['userId', 'module'], { unique: true }), (0, typeorm_1.Index)('idx_user_ai_preferences_user_id', ['userId'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _module_decorators;
    let _module_initializers = [];
    let _module_extraInitializers = [];
    let _provider_decorators;
    let _provider_initializers = [];
    let _provider_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _apiKey_decorators;
    let _apiKey_initializers = [];
    let _apiKey_extraInitializers = [];
    let _enabled_decorators;
    let _enabled_initializers = [];
    let _enabled_extraInitializers = [];
    var UserAiPreference = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _userId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', name: 'user_id' })];
            _user_decorators = [(0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'user_id' })];
            _module_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 50,
                    comment: 'AI module: email, social, support, analytics',
                })];
            _provider_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 50,
                    comment: 'AI provider: openai, anthropic, google',
                })];
            _model_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 100,
                    comment: 'Specific model: gpt-4, claude-3-sonnet, gemini-pro',
                })];
            _apiKey_decorators = [(0, typeorm_1.Column)({
                    type: 'text',
                    nullable: true,
                    comment: 'Encrypted API key (user-specific, optional)',
                })];
            _enabled_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true })];
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _module_decorators, { kind: "field", name: "module", static: false, private: false, access: { has: obj => "module" in obj, get: obj => obj.module, set: (obj, value) => { obj.module = value; } }, metadata: _metadata }, _module_initializers, _module_extraInitializers);
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: obj => "provider" in obj, get: obj => obj.provider, set: (obj, value) => { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(null, null, _apiKey_decorators, { kind: "field", name: "apiKey", static: false, private: false, access: { has: obj => "apiKey" in obj, get: obj => obj.apiKey, set: (obj, value) => { obj.apiKey = value; } }, metadata: _metadata }, _apiKey_initializers, _apiKey_extraInitializers);
            __esDecorate(null, null, _enabled_decorators, { kind: "field", name: "enabled", static: false, private: false, access: { has: obj => "enabled" in obj, get: obj => obj.enabled, set: (obj, value) => { obj.enabled = value; } }, metadata: _metadata }, _enabled_initializers, _enabled_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UserAiPreference = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        userId = __runInitializers(this, _userId_initializers, void 0);
        user = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _user_initializers, void 0));
        module = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _module_initializers, void 0));
        provider = (__runInitializers(this, _module_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
        model = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _model_initializers, void 0));
        apiKey = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _apiKey_initializers, void 0));
        enabled = (__runInitializers(this, _apiKey_extraInitializers), __runInitializers(this, _enabled_initializers, void 0));
        constructor() {
            super(...arguments);
            __runInitializers(this, _enabled_extraInitializers);
        }
    };
    return UserAiPreference = _classThis;
})();
exports.UserAiPreference = UserAiPreference;
//# sourceMappingURL=user-ai-preference.entity.js.map