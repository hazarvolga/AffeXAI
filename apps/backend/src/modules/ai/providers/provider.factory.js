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
exports.AiProviderFactory = void 0;
const common_1 = require("@nestjs/common");
let AiProviderFactory = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AiProviderFactory = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AiProviderFactory = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        openaiProvider;
        anthropicProvider;
        logger = new common_1.Logger(AiProviderFactory.name);
        providers = new Map();
        constructor(openaiProvider, anthropicProvider) {
            this.openaiProvider = openaiProvider;
            this.anthropicProvider = anthropicProvider;
            // Register providers
            this.providers.set('openai', openaiProvider);
            this.providers.set('anthropic', anthropicProvider);
            // Note: Google provider will be added when dependency is resolved
        }
        /**
         * Get provider by type
         */
        getProvider(providerType) {
            const provider = this.providers.get(providerType);
            if (!provider) {
                throw new Error(`Provider '${providerType}' not found or not supported yet`);
            }
            return provider;
        }
        /**
         * Detect provider from model name
         */
        detectProvider(model) {
            // OpenAI models
            if (model.startsWith('gpt-')) {
                return 'openai';
            }
            // Anthropic models
            if (model.startsWith('claude-')) {
                return 'anthropic';
            }
            // Google models
            if (model.startsWith('gemini-') || model.includes('googleai/')) {
                return 'google';
            }
            // Default fallback
            this.logger.warn(`Unknown model '${model}', defaulting to OpenAI`);
            return 'openai';
        }
        /**
         * Get all available providers
         */
        getAllProviders() {
            return Array.from(this.providers.entries()).map(([type, provider]) => ({
                type,
                name: provider.name,
                models: provider.supportedModels,
            }));
        }
        /**
         * Check if provider is supported
         */
        isProviderSupported(providerType) {
            return this.providers.has(providerType);
        }
    };
    return AiProviderFactory = _classThis;
})();
exports.AiProviderFactory = AiProviderFactory;
//# sourceMappingURL=provider.factory.js.map