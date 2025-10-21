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
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
let AiService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AiService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AiService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        providerFactory;
        logger = new common_1.Logger(AiService.name);
        constructor(providerFactory) {
            this.providerFactory = providerFactory;
        }
        /**
         * Generate text completion using configured AI provider
         *
         * @param apiKey - AI provider API key
         * @param prompt - User prompt
         * @param options - Generation options (must include model)
         * @returns Generated content with metadata
         */
        async generateCompletion(apiKey, prompt, options) {
            if (!options.model) {
                throw new Error('Model must be specified in options');
            }
            // Detect provider from model name
            const providerType = this.providerFactory.detectProvider(options.model);
            const provider = this.providerFactory.getProvider(providerType);
            this.logger.log(`Generating completion with ${providerType} provider, model: ${options.model}`);
            try {
                return await provider.generateCompletion(apiKey, prompt, options);
            }
            catch (error) {
                this.logger.error(`AI generation failed: ${error.message}`);
                throw error;
            }
        }
        /**
         * Test AI provider API key validity
         * Makes a minimal API call to verify the key works
         */
        async testApiKey(apiKey, model) {
            try {
                // Detect provider from model
                const providerType = this.providerFactory.detectProvider(model);
                const provider = this.providerFactory.getProvider(providerType);
                return await provider.testConnection(apiKey, model);
            }
            catch (error) {
                this.logger.warn(`API key test failed: ${error.message}`);
                return false;
            }
        }
        /**
         * Get all available AI providers and their models
         */
        getAvailableProviders() {
            return this.providerFactory.getAllProviders();
        }
        /**
         * Detect which provider to use for a given model
         */
        detectProviderForModel(model) {
            return this.providerFactory.detectProvider(model);
        }
        /**
         * Clear provider client caches
         * Useful when API keys are updated
         */
        clearClientCache(apiKey) {
            // Clear OpenAI cache
            const openaiProvider = this.providerFactory.getProvider('openai');
            if ('clearCache' in openaiProvider && typeof openaiProvider.clearCache === 'function') {
                openaiProvider.clearCache(apiKey);
            }
            // Clear Anthropic cache
            try {
                const anthropicProvider = this.providerFactory.getProvider('anthropic');
                if ('clearCache' in anthropicProvider && typeof anthropicProvider.clearCache === 'function') {
                    anthropicProvider.clearCache(apiKey);
                }
            }
            catch (e) {
                // Anthropic provider might not be available yet
            }
        }
    };
    return AiService = _classThis;
})();
exports.AiService = AiService;
//# sourceMappingURL=ai.service.js.map