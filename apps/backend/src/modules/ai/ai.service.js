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
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = __importDefault(require("openai"));
const sdk_1 = require("@anthropic-ai/sdk");
const generative_ai_1 = require("@google/generative-ai");
const ai_settings_dto_1 = require("../settings/dto/ai-settings.dto");
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
        logger = new common_1.Logger(AiService.name);
        openaiClients = new Map();
        anthropicClients = new Map();
        googleClients = new Map();
        /**
         * Detect AI provider from model name
         */
        detectProvider(model) {
            if (model.startsWith('gpt-') || model.includes('openai/')) {
                return ai_settings_dto_1.AiProvider.OPENAI;
            }
            if (model.startsWith('claude-') || model.includes('anthropic/')) {
                return ai_settings_dto_1.AiProvider.ANTHROPIC;
            }
            if (model.startsWith('gemini-') || model.includes('google/')) {
                return ai_settings_dto_1.AiProvider.GOOGLE;
            }
            if (model.includes('/') && !model.startsWith('gpt-') && !model.startsWith('claude-')) {
                return ai_settings_dto_1.AiProvider.OPENROUTER;
            }
            if (model === ai_settings_dto_1.AiModel.LOCAL_LLAMA_3_1 || model === ai_settings_dto_1.AiModel.LOCAL_MISTRAL || model === ai_settings_dto_1.AiModel.LOCAL_CODELLAMA) {
                return ai_settings_dto_1.AiProvider.LOCAL;
            }
            // Default fallback
            return ai_settings_dto_1.AiProvider.OPENAI;
        }
        /**
         * Get or create OpenAI client for specific API key
         */
        getOpenAiClient(apiKey) {
            if (!this.openaiClients.has(apiKey)) {
                this.openaiClients.set(apiKey, new openai_1.default({
                    apiKey,
                }));
            }
            return this.openaiClients.get(apiKey);
        }
        /**
         * Get or create Anthropic client for specific API key
         */
        getAnthropicClient(apiKey) {
            if (!this.anthropicClients.has(apiKey)) {
                this.anthropicClients.set(apiKey, new sdk_1.Anthropic({
                    apiKey,
                }));
            }
            return this.anthropicClients.get(apiKey);
        }
        /**
         * Get or create Google AI client for specific API key
         */
        getGoogleClient(apiKey) {
            if (!this.googleClients.has(apiKey)) {
                this.googleClients.set(apiKey, new generative_ai_1.GoogleGenerativeAI(apiKey));
            }
            return this.googleClients.get(apiKey);
        }
        /**
         * Get or create OpenRouter client (uses OpenAI SDK with custom base URL)
         */
        getOpenRouterClient(apiKey) {
            const cacheKey = `openrouter_${apiKey}`;
            if (!this.openaiClients.has(cacheKey)) {
                this.openaiClients.set(cacheKey, new openai_1.default({
                    apiKey,
                    baseURL: 'https://openrouter.ai/api/v1',
                }));
            }
            return this.openaiClients.get(cacheKey);
        }
        /**
         * Generate text completion using specified AI provider
         *
         * @param apiKey - API key for the provider
         * @param prompt - User prompt
         * @param options - Generation options
         * @returns Generated content with metadata
         */
        async generateCompletion(apiKey, prompt, options = {}) {
            const { model = ai_settings_dto_1.AiModel.GPT_4_TURBO, temperature = 0.7, maxTokens = 1000, systemPrompt, } = options;
            const provider = options.provider || this.detectProvider(model);
            this.logger.log(`Generating completion with ${provider}:${model}`);
            try {
                switch (provider) {
                    case ai_settings_dto_1.AiProvider.OPENAI:
                        return await this.generateWithOpenAI(apiKey, prompt, { model, temperature, maxTokens, systemPrompt });
                    case ai_settings_dto_1.AiProvider.ANTHROPIC:
                        return await this.generateWithAnthropic(apiKey, prompt, { model, temperature, maxTokens, systemPrompt });
                    case ai_settings_dto_1.AiProvider.GOOGLE:
                        return await this.generateWithGoogle(apiKey, prompt, { model, temperature, maxTokens, systemPrompt });
                    case ai_settings_dto_1.AiProvider.OPENROUTER:
                        return await this.generateWithOpenRouter(apiKey, prompt, { model, temperature, maxTokens, systemPrompt });
                    case ai_settings_dto_1.AiProvider.LOCAL:
                        return await this.generateWithLocal(apiKey, prompt, { model, temperature, maxTokens, systemPrompt });
                    default:
                        throw new Error(`Unsupported AI provider: ${provider}`);
                }
            }
            catch (error) {
                this.logger.error(`${provider} API error:`, error);
                throw new Error(`AI generation failed with ${provider}: ${error.message}`);
            }
        }
        /**
         * Generate completion using OpenAI
         */
        async generateWithOpenAI(apiKey, prompt, options) {
            const client = this.getOpenAiClient(apiKey);
            const messages = [];
            if (options.systemPrompt) {
                messages.push({
                    role: 'system',
                    content: options.systemPrompt,
                });
            }
            messages.push({
                role: 'user',
                content: prompt,
            });
            const completion = await client.chat.completions.create({
                model: options.model,
                messages,
                temperature: options.temperature,
                max_tokens: options.maxTokens,
            });
            return {
                content: completion.choices[0].message.content || '',
                model: completion.model,
                provider: ai_settings_dto_1.AiProvider.OPENAI,
                tokensUsed: completion.usage?.total_tokens || 0,
                finishReason: completion.choices[0].finish_reason,
            };
        }
        /**
         * Generate completion using Anthropic Claude
         */
        async generateWithAnthropic(apiKey, prompt, options) {
            const client = this.getAnthropicClient(apiKey);
            const message = await client.messages.create({
                model: options.model,
                max_tokens: options.maxTokens,
                temperature: options.temperature,
                system: options.systemPrompt,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            });
            return {
                content: message.content[0].type === 'text' ? message.content[0].text : '',
                model: message.model,
                provider: ai_settings_dto_1.AiProvider.ANTHROPIC,
                tokensUsed: message.usage.input_tokens + message.usage.output_tokens,
                finishReason: message.stop_reason || 'completed',
            };
        }
        /**
         * Generate completion using Google Gemini
         */
        async generateWithGoogle(apiKey, prompt, options) {
            const client = this.getGoogleClient(apiKey);
            const model = client.getGenerativeModel({ model: options.model });
            const fullPrompt = options.systemPrompt
                ? `${options.systemPrompt}\n\nUser: ${prompt}`
                : prompt;
            const result = await model.generateContent({
                contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
                generationConfig: {
                    temperature: options.temperature,
                    maxOutputTokens: options.maxTokens,
                },
            });
            const response = await result.response;
            return {
                content: response.text(),
                model: options.model,
                provider: ai_settings_dto_1.AiProvider.GOOGLE,
                tokensUsed: response.usageMetadata?.totalTokenCount || 0,
                finishReason: response.candidates?.[0]?.finishReason || 'completed',
            };
        }
        /**
         * Generate completion using OpenRouter
         */
        async generateWithOpenRouter(apiKey, prompt, options) {
            const client = this.getOpenRouterClient(apiKey);
            const messages = [];
            if (options.systemPrompt) {
                messages.push({
                    role: 'system',
                    content: options.systemPrompt,
                });
            }
            messages.push({
                role: 'user',
                content: prompt,
            });
            const completion = await client.chat.completions.create({
                model: options.model,
                messages,
                temperature: options.temperature,
                max_tokens: options.maxTokens,
            });
            return {
                content: completion.choices[0].message.content || '',
                model: completion.model,
                provider: ai_settings_dto_1.AiProvider.OPENROUTER,
                tokensUsed: completion.usage?.total_tokens || 0,
                finishReason: completion.choices[0].finish_reason,
            };
        }
        /**
         * Generate completion using Local AI (Ollama)
         */
        async generateWithLocal(apiKey, // Not used for local, but kept for interface consistency
        prompt, options) {
            // Use Ollama API (assuming it's running on localhost:11434)
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: options.model,
                    prompt: options.systemPrompt ? `${options.systemPrompt}\n\n${prompt}` : prompt,
                    stream: false,
                    options: {
                        temperature: options.temperature,
                        num_predict: options.maxTokens,
                    },
                }),
            });
            if (!response.ok) {
                throw new Error(`Local AI API error: ${response.statusText}`);
            }
            const data = await response.json();
            return {
                content: data.response,
                model: options.model,
                provider: ai_settings_dto_1.AiProvider.LOCAL,
                tokensUsed: data.eval_count || 0,
                finishReason: data.done ? 'completed' : 'incomplete',
            };
        }
        /**
         * Test API key validity for any provider
         * Makes a minimal API call to verify the key works
         */
        async testApiKey(apiKey, model = ai_settings_dto_1.AiModel.GPT_4_TURBO, provider) {
            try {
                const detectedProvider = provider || this.detectProvider(model);
                // Make minimal test call
                await this.generateCompletion(apiKey, 'test', {
                    model,
                    provider: detectedProvider,
                    maxTokens: 5,
                });
                return true;
            }
            catch (error) {
                this.logger.warn(`API key test failed for ${provider || 'auto-detected'}: ${error.message}`);
                return false;
            }
        }
        /**
         * Clear cached clients for specific API key or all clients
         * Useful when API keys are updated
         */
        clearClientCache(apiKey) {
            if (apiKey) {
                this.openaiClients.delete(apiKey);
                this.anthropicClients.delete(apiKey);
                this.googleClients.delete(apiKey);
                this.openaiClients.delete(`openrouter_${apiKey}`);
            }
            else {
                this.openaiClients.clear();
                this.anthropicClients.clear();
                this.googleClients.clear();
            }
        }
        /**
         * Get supported models for a provider
         */
        getSupportedModels(provider) {
            switch (provider) {
                case ai_settings_dto_1.AiProvider.OPENAI:
                    return [ai_settings_dto_1.AiModel.GPT_4, ai_settings_dto_1.AiModel.GPT_4_TURBO, ai_settings_dto_1.AiModel.GPT_4O, ai_settings_dto_1.AiModel.GPT_3_5_TURBO];
                case ai_settings_dto_1.AiProvider.ANTHROPIC:
                    return [ai_settings_dto_1.AiModel.CLAUDE_3_5_SONNET, ai_settings_dto_1.AiModel.CLAUDE_3_OPUS, ai_settings_dto_1.AiModel.CLAUDE_3_SONNET, ai_settings_dto_1.AiModel.CLAUDE_3_HAIKU];
                case ai_settings_dto_1.AiProvider.GOOGLE:
                    return [ai_settings_dto_1.AiModel.GEMINI_PRO, ai_settings_dto_1.AiModel.GEMINI_PRO_VISION, ai_settings_dto_1.AiModel.GEMINI_1_5_PRO, ai_settings_dto_1.AiModel.GEMINI_1_5_FLASH];
                case ai_settings_dto_1.AiProvider.OPENROUTER:
                    return [ai_settings_dto_1.AiModel.OPENROUTER_GPT_4, ai_settings_dto_1.AiModel.OPENROUTER_CLAUDE_3_5_SONNET, ai_settings_dto_1.AiModel.OPENROUTER_LLAMA_3_1_70B];
                case ai_settings_dto_1.AiProvider.LOCAL:
                    return [ai_settings_dto_1.AiModel.LOCAL_LLAMA_3_1, ai_settings_dto_1.AiModel.LOCAL_MISTRAL, ai_settings_dto_1.AiModel.LOCAL_CODELLAMA];
                default:
                    return [];
            }
        }
    };
    return AiService = _classThis;
})();
exports.AiService = AiService;
//# sourceMappingURL=ai.service.js.map