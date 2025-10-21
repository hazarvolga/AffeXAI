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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIProvider = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = __importDefault(require("openai"));
let OpenAIProvider = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OpenAIProvider = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OpenAIProvider = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = new common_1.Logger(OpenAIProvider.name);
        clients = new Map();
        name = 'openai';
        supportedModels = [
            'gpt-4',
            'gpt-4-turbo',
            'gpt-4o',
            'gpt-3.5-turbo',
        ];
        /**
         * Get or create OpenAI client for specific API key
         */
        getClient(apiKey) {
            if (!this.clients.has(apiKey)) {
                this.clients.set(apiKey, new openai_1.default({
                    apiKey,
                }));
            }
            return this.clients.get(apiKey);
        }
        async generateCompletion(apiKey, prompt, options) {
            const { model, temperature = 0.7, maxTokens = 1000, systemPrompt, } = options;
            try {
                const client = this.getClient(apiKey);
                const messages = [];
                if (systemPrompt) {
                    messages.push({
                        role: 'system',
                        content: systemPrompt,
                    });
                }
                messages.push({
                    role: 'user',
                    content: prompt,
                });
                this.logger.log(`Generating completion with OpenAI model: ${model}`);
                const completion = await client.chat.completions.create({
                    model,
                    messages,
                    temperature,
                    max_tokens: maxTokens,
                    top_p: options.topP,
                });
                const result = {
                    content: completion.choices[0].message.content || '',
                    model: completion.model,
                    tokensUsed: completion.usage?.total_tokens || 0,
                    finishReason: completion.choices[0].finish_reason,
                    provider: this.name,
                };
                this.logger.log(`OpenAI completion generated: ${result.tokensUsed} tokens used`);
                return result;
            }
            catch (error) {
                this.logger.error('OpenAI API error:', error);
                if (error.status === 401) {
                    throw new Error('Invalid OpenAI API key');
                }
                if (error.status === 429) {
                    throw new Error('OpenAI API rate limit exceeded');
                }
                if (error.status === 500 || error.status === 503) {
                    throw new Error('OpenAI service temporarily unavailable');
                }
                throw new Error(`OpenAI generation failed: ${error.message}`);
            }
        }
        async testConnection(apiKey, model) {
            try {
                const client = this.getClient(apiKey);
                // Make minimal API call
                await client.chat.completions.create({
                    model,
                    messages: [{ role: 'user', content: 'test' }],
                    max_tokens: 5,
                });
                return true;
            }
            catch (error) {
                this.logger.warn(`OpenAI API key test failed: ${error.message}`);
                return false;
            }
        }
        /**
         * Estimate cost for OpenAI tokens
         * Prices as of 2025 (USD per 1K tokens)
         */
        estimateCost(tokens, model) {
            const pricesPer1K = {
                'gpt-4': { input: 0.03, output: 0.06 },
                'gpt-4-turbo': { input: 0.01, output: 0.03 },
                'gpt-4o': { input: 0.005, output: 0.015 },
                'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
            };
            const prices = pricesPer1K[model] || pricesPer1K['gpt-4-turbo'];
            // Estimate: assume 50/50 split between input and output tokens
            return ((tokens / 1000) * (prices.input + prices.output)) / 2;
        }
        /**
         * Clear cached client for specific API key
         */
        clearCache(apiKey) {
            if (apiKey) {
                this.clients.delete(apiKey);
            }
            else {
                this.clients.clear();
            }
        }
    };
    return OpenAIProvider = _classThis;
})();
exports.OpenAIProvider = OpenAIProvider;
//# sourceMappingURL=openai.provider.js.map