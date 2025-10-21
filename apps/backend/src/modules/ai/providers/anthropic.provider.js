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
exports.AnthropicProvider = void 0;
const common_1 = require("@nestjs/common");
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
let AnthropicProvider = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnthropicProvider = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AnthropicProvider = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = new common_1.Logger(AnthropicProvider.name);
        clients = new Map();
        name = 'anthropic';
        supportedModels = [
            'claude-3-opus-20240229',
            'claude-3-sonnet-20240229',
            'claude-3-haiku-20240307',
            'claude-3-5-sonnet-20241022',
        ];
        /**
         * Get or create Anthropic client for specific API key
         */
        getClient(apiKey) {
            if (!this.clients.has(apiKey)) {
                this.clients.set(apiKey, new sdk_1.default({
                    apiKey,
                }));
            }
            return this.clients.get(apiKey);
        }
        async generateCompletion(apiKey, prompt, options) {
            const { model, temperature = 0.7, maxTokens = 1000, systemPrompt, } = options;
            try {
                const client = this.getClient(apiKey);
                this.logger.log(`Generating completion with Anthropic model: ${model}`);
                const message = await client.messages.create({
                    model,
                    max_tokens: maxTokens,
                    temperature,
                    top_p: options.topP,
                    system: systemPrompt,
                    messages: [
                        {
                            role: 'user',
                            content: prompt,
                        },
                    ],
                });
                const result = {
                    content: message.content[0].type === 'text' ? message.content[0].text : '',
                    model: message.model,
                    tokensUsed: message.usage.input_tokens + message.usage.output_tokens,
                    finishReason: message.stop_reason || 'end_turn',
                    provider: this.name,
                };
                this.logger.log(`Anthropic completion generated: ${result.tokensUsed} tokens used (in: ${message.usage.input_tokens}, out: ${message.usage.output_tokens})`);
                return result;
            }
            catch (error) {
                this.logger.error('Anthropic API error:', error);
                if (error.status === 401) {
                    throw new Error('Invalid Anthropic API key');
                }
                if (error.status === 429) {
                    throw new Error('Anthropic API rate limit exceeded');
                }
                if (error.status === 500 || error.status === 503) {
                    throw new Error('Anthropic service temporarily unavailable');
                }
                throw new Error(`Anthropic generation failed: ${error.message}`);
            }
        }
        async testConnection(apiKey, model) {
            try {
                const client = this.getClient(apiKey);
                // Make minimal API call
                await client.messages.create({
                    model,
                    max_tokens: 10,
                    messages: [
                        {
                            role: 'user',
                            content: 'test',
                        },
                    ],
                });
                return true;
            }
            catch (error) {
                this.logger.warn(`Anthropic API key test failed: ${error.message}`);
                return false;
            }
        }
        /**
         * Estimate cost for Anthropic tokens
         * Prices as of 2025 (USD per 1M tokens)
         */
        estimateCost(tokens, model) {
            const pricesPer1M = {
                'claude-3-opus-20240229': { input: 15, output: 75 },
                'claude-3-sonnet-20240229': { input: 3, output: 15 },
                'claude-3-haiku-20240307': { input: 0.25, output: 1.25 },
                'claude-3-5-sonnet-20241022': { input: 3, output: 15 },
            };
            const prices = pricesPer1M[model] || pricesPer1M['claude-3-sonnet-20240229'];
            // Estimate: assume 50/50 split between input and output tokens
            return ((tokens / 1000000) * (prices.input + prices.output)) / 2;
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
    return AnthropicProvider = _classThis;
})();
exports.AnthropicProvider = AnthropicProvider;
//# sourceMappingURL=anthropic.provider.js.map