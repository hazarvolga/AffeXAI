"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAiService = void 0;
const common_1 = require("@nestjs/common");
const ai_settings_dto_1 = require("../../settings/dto/ai-settings.dto");
let ChatAiService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChatAiService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatAiService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        aiService;
        settingsService;
        contextEngine;
        chatAiSettingsService;
        logger = new common_1.Logger(ChatAiService.name);
        constructor(aiService, settingsService, contextEngine, chatAiSettingsService) {
            this.aiService = aiService;
            this.settingsService = settingsService;
            this.contextEngine = contextEngine;
            this.chatAiSettingsService = chatAiSettingsService;
        }
        /**
         * Generate AI response with chat context integration
         */
        async generateChatResponse(prompt, options = {}) {
            const startTime = Date.now();
            try {
                // Get AI configuration with failover support
                const config = await this.chatAiSettingsService.getConfigurationWithFailover();
                // Build context if requested
                let contextResult;
                let enhancedPrompt = prompt;
                if (options.includeContext && options.sessionId) {
                    contextResult = await this.contextEngine.buildContext(prompt, options.sessionId, options.contextOptions);
                    enhancedPrompt = this.buildContextAwarePrompt(prompt, contextResult);
                }
                // Prepare AI generation options
                const aiOptions = {
                    model: options.model || config.model,
                    provider: options.provider || config.provider,
                    temperature: options.temperature || 0.7,
                    maxTokens: options.maxTokens || 2000,
                    systemPrompt: this.buildSystemPrompt(options.sessionId ? 'support' : 'general')
                };
                // Generate AI response with retry logic
                const aiResult = await this.generateWithRetry(config, enhancedPrompt, aiOptions);
                // Calculate confidence score based on context and AI response
                const confidenceScore = this.calculateConfidenceScore(aiResult, contextResult, prompt);
                // Extract citations from the response
                const citations = this.extractCitations(aiResult.content, contextResult?.sources || []);
                const processingTime = Date.now() - startTime;
                this.logger.log(`Generated chat response: ${aiResult.content.length} chars, ` +
                    `confidence: ${confidenceScore.toFixed(2)}, ` +
                    `context sources: ${contextResult?.sources.length || 0}, ` +
                    `time: ${processingTime}ms`);
                return {
                    ...aiResult,
                    contextUsed: contextResult,
                    contextSources: contextResult?.sources,
                    confidenceScore,
                    citations,
                    streamingSupported: this.isStreamingSupported(aiResult.provider, aiResult.model)
                };
            }
            catch (error) {
                this.logger.error(`Error generating chat response: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Generate streaming AI response with context
         */
        async *generateStreamingChatResponse(prompt, options = {}) {
            const startTime = Date.now();
            try {
                // Get AI configuration with failover support
                const config = await this.chatAiSettingsService.getConfigurationWithFailover();
                // Build context if requested
                let contextResult;
                let enhancedPrompt = prompt;
                if (options.includeContext && options.sessionId) {
                    contextResult = await this.contextEngine.buildContext(prompt, options.sessionId, options.contextOptions);
                    enhancedPrompt = this.buildContextAwarePrompt(prompt, contextResult);
                }
                // Check if streaming is supported for this provider/model
                if (!this.isStreamingSupported(config.provider, config.model)) {
                    // Fallback to non-streaming response
                    const result = await this.generateChatResponse(prompt, options);
                    yield {
                        content: result.content,
                        isComplete: true,
                        metadata: {
                            tokensGenerated: result.tokensUsed,
                            processingTime: Date.now() - startTime
                        }
                    };
                    return result;
                }
                // Generate streaming response
                let fullContent = '';
                let tokensGenerated = 0;
                for await (const chunk of this.generateStreamingCompletion(config.apiKey, enhancedPrompt, {
                    model: options.model || config.model,
                    provider: options.provider || config.provider,
                    temperature: options.temperature || 0.7,
                    maxTokens: options.maxTokens || 2000,
                    systemPrompt: this.buildSystemPrompt(options.sessionId ? 'support' : 'general')
                })) {
                    fullContent += chunk.content;
                    tokensGenerated += chunk.tokensGenerated || 0;
                    yield {
                        content: chunk.content,
                        isComplete: chunk.isComplete,
                        metadata: {
                            tokensGenerated,
                            processingTime: Date.now() - startTime
                        }
                    };
                }
                // Calculate final metrics
                const confidenceScore = this.calculateConfidenceScore({ content: fullContent, tokensUsed: tokensGenerated }, contextResult, prompt);
                const citations = this.extractCitations(fullContent, contextResult?.sources || []);
                const processingTime = Date.now() - startTime;
                this.logger.log(`Generated streaming chat response: ${fullContent.length} chars, ` +
                    `confidence: ${confidenceScore.toFixed(2)}, ` +
                    `context sources: ${contextResult?.sources.length || 0}, ` +
                    `time: ${processingTime}ms`);
                return {
                    content: fullContent,
                    model: config.model,
                    provider: config.provider,
                    tokensUsed: tokensGenerated,
                    finishReason: 'completed',
                    contextUsed: contextResult,
                    contextSources: contextResult?.sources,
                    confidenceScore,
                    citations,
                    streamingSupported: true
                };
            }
            catch (error) {
                this.logger.error(`Error generating streaming chat response: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Build context-aware prompt with sources
         */
        buildContextAwarePrompt(userPrompt, contextResult) {
            if (!contextResult.sources.length) {
                return userPrompt;
            }
            let contextSection = '\n\n=== CONTEXT INFORMATION ===\n';
            contextSection += `Found ${contextResult.sources.length} relevant sources:\n\n`;
            contextResult.sources.forEach((source, index) => {
                contextSection += `[${index + 1}] ${source.type.toUpperCase()}: ${source.title}\n`;
                contextSection += `Relevance: ${(source.relevanceScore * 100).toFixed(1)}%\n`;
                contextSection += `Content: ${source.content}\n`;
                if (source.url) {
                    contextSection += `URL: ${source.url}\n`;
                }
                contextSection += '\n';
            });
            contextSection += '=== END CONTEXT ===\n\n';
            contextSection += 'Please use the above context information to provide a comprehensive and accurate response. ';
            contextSection += 'Include citations using [1], [2], etc. format when referencing specific sources. ';
            contextSection += 'If the context doesn\'t contain relevant information, please indicate that and provide general guidance.\n\n';
            contextSection += `User Question: ${userPrompt}`;
            return contextSection;
        }
        /**
         * Build system prompt based on chat type
         */
        buildSystemPrompt(chatType) {
            const basePrompt = `You are an AI assistant integrated into a professional support system. `;
            if (chatType === 'support') {
                return basePrompt +
                    `Your role is to provide helpful, accurate, and professional support responses. ` +
                    `You have access to knowledge base articles, FAQ entries, and uploaded documents. ` +
                    `Always cite your sources using [1], [2], etc. format when referencing specific information. ` +
                    `If you cannot find relevant information in the provided context, clearly state this and offer general guidance. ` +
                    `Be concise but thorough, and maintain a professional and helpful tone. ` +
                    `If the question requires human intervention or is outside your capabilities, suggest escalating to a support team member.`;
            }
            else {
                return basePrompt +
                    `Your role is to provide general information and guidance about the platform and services. ` +
                    `Be helpful and informative while maintaining a friendly and professional tone. ` +
                    `If users need specific technical support, guide them to the appropriate support channels. ` +
                    `Keep responses concise and actionable.`;
            }
        }
        /**
         * Calculate confidence score based on multiple factors
         */
        calculateConfidenceScore(aiResult, contextResult, originalPrompt) {
            let confidence = 0.5; // Base confidence
            // Context quality factor (0-0.3)
            if (contextResult) {
                const avgRelevance = contextResult.sources.length > 0
                    ? contextResult.sources.reduce((sum, s) => sum + s.relevanceScore, 0) / contextResult.sources.length
                    : 0;
                confidence += avgRelevance * 0.3;
            }
            // Response length factor (0-0.1)
            if (aiResult.content) {
                const responseLength = aiResult.content.length;
                if (responseLength > 100 && responseLength < 2000) {
                    confidence += 0.1; // Optimal length
                }
                else if (responseLength >= 50) {
                    confidence += 0.05; // Acceptable length
                }
            }
            // Finish reason factor (0-0.1)
            if (aiResult.finishReason === 'stop' || aiResult.finishReason === 'completed') {
                confidence += 0.1;
            }
            // Citation factor (0-0.1)
            if (aiResult.content && contextResult?.sources.length) {
                const citationCount = (aiResult.content.match(/\[\d+\]/g) || []).length;
                if (citationCount > 0) {
                    confidence += Math.min(0.1, citationCount * 0.02);
                }
            }
            // Normalize to 0-1 range
            return Math.min(1, Math.max(0, confidence));
        }
        /**
         * Extract citations from AI response
         */
        extractCitations(content, sources) {
            const citations = [];
            const citationMatches = content.match(/\[(\d+)\]/g) || [];
            citationMatches.forEach((match) => {
                const index = parseInt(match.replace(/[\[\]]/g, '')) - 1;
                if (index >= 0 && index < sources.length) {
                    const source = sources[index];
                    let citation = `${source.title}`;
                    if (source.url) {
                        citation += ` (${source.url})`;
                    }
                    if (!citations.includes(citation)) {
                        citations.push(citation);
                    }
                }
            });
            return citations;
        }
        /**
         * Check if streaming is supported for provider/model
         */
        isStreamingSupported(provider, model) {
            switch (provider) {
                case ai_settings_dto_1.AiProvider.OPENAI:
                case ai_settings_dto_1.AiProvider.OPENROUTER:
                    return true;
                case ai_settings_dto_1.AiProvider.ANTHROPIC:
                    return true;
                case ai_settings_dto_1.AiProvider.GOOGLE:
                    return false; // Google doesn't support streaming in current implementation
                case ai_settings_dto_1.AiProvider.LOCAL:
                    return false; // Local models don't support streaming in current implementation
                default:
                    return false;
            }
        }
        /**
         * Generate streaming completion (internal method)
         */
        async *generateStreamingCompletion(apiKey, prompt, options) {
            // This is a simplified implementation - in a real scenario, you'd need to implement
            // streaming for each provider separately using their streaming APIs
            try {
                switch (options.provider) {
                    case ai_settings_dto_1.AiProvider.OPENAI:
                    case ai_settings_dto_1.AiProvider.OPENROUTER:
                        yield* this.generateOpenAIStreaming(apiKey, prompt, options);
                        break;
                    case ai_settings_dto_1.AiProvider.ANTHROPIC:
                        yield* this.generateAnthropicStreaming(apiKey, prompt, options);
                        break;
                    default:
                        // Fallback to non-streaming
                        const result = await this.aiService.generateCompletion(apiKey, prompt, options);
                        yield {
                            content: result.content,
                            isComplete: true,
                            tokensGenerated: result.tokensUsed
                        };
                }
            }
            catch (error) {
                this.logger.error(`Streaming generation error: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * OpenAI streaming implementation
         */
        async *generateOpenAIStreaming(apiKey, prompt, options) {
            // Import OpenAI dynamically to avoid circular dependencies
            const OpenAI = (await Promise.resolve().then(() => __importStar(require('openai')))).default;
            const client = new OpenAI({ apiKey });
            const messages = [];
            if (options.systemPrompt) {
                messages.push({ role: 'system', content: options.systemPrompt });
            }
            messages.push({ role: 'user', content: prompt });
            const stream = await client.chat.completions.create({
                model: options.model,
                messages,
                temperature: options.temperature,
                max_tokens: options.maxTokens,
                stream: true,
            });
            let tokensGenerated = 0;
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                const isComplete = chunk.choices[0]?.finish_reason !== null;
                if (content) {
                    tokensGenerated += 1; // Approximate token count
                }
                yield {
                    content,
                    isComplete,
                    tokensGenerated
                };
                if (isComplete)
                    break;
            }
        }
        /**
         * Anthropic streaming implementation
         */
        async *generateAnthropicStreaming(apiKey, prompt, options) {
            // Import Anthropic dynamically
            const { Anthropic } = await Promise.resolve().then(() => __importStar(require('@anthropic-ai/sdk')));
            const client = new Anthropic({ apiKey });
            const stream = await client.messages.create({
                model: options.model,
                max_tokens: options.maxTokens,
                temperature: options.temperature,
                system: options.systemPrompt,
                messages: [{ role: 'user', content: prompt }],
                stream: true,
            });
            let tokensGenerated = 0;
            for await (const chunk of stream) {
                if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
                    const content = chunk.delta.text;
                    tokensGenerated += 1; // Approximate token count
                    yield {
                        content,
                        isComplete: false,
                        tokensGenerated
                    };
                }
                else if (chunk.type === 'message_stop') {
                    yield {
                        content: '',
                        isComplete: true,
                        tokensGenerated
                    };
                    break;
                }
            }
        }
        /**
         * Generate AI response with retry logic and failover
         */
        async generateWithRetry(config, prompt, options, retryCount = 0) {
            try {
                const result = await this.aiService.generateCompletion(config.apiKey, prompt, options);
                // Reset failure count on success
                this.chatAiSettingsService.resetProviderFailures(config.provider);
                return result;
            }
            catch (error) {
                this.logger.warn(`AI generation attempt ${retryCount + 1} failed: ${error.message}`);
                // If we haven't exceeded max retries, try again
                if (retryCount < config.maxRetries) {
                    // Wait before retry (exponential backoff)
                    const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return this.generateWithRetry(config, prompt, options, retryCount + 1);
                }
                // If all retries failed, try failover
                if (retryCount >= config.maxRetries) {
                    this.logger.warn(`All retries failed for ${config.provider}, attempting failover`);
                    try {
                        const fallbackConfig = await this.chatAiSettingsService.getConfigurationWithFailover();
                        // Only try failover if we get a different provider
                        if (fallbackConfig.provider !== config.provider) {
                            return await this.aiService.generateCompletion(fallbackConfig.apiKey, prompt, {
                                ...options,
                                model: fallbackConfig.model,
                                provider: fallbackConfig.provider
                            });
                        }
                    }
                    catch (failoverError) {
                        this.logger.error(`Failover also failed: ${failoverError.message}`);
                    }
                }
                throw error;
            }
        }
        /**
         * Test AI configuration for chat
         */
        async testChatAiConfiguration() {
            const startTime = Date.now();
            try {
                const config = await this.chatAiSettingsService.getConfigurationWithFailover();
                const streamingSupported = this.isStreamingSupported(config.provider, config.model);
                // Test with a simple prompt
                const testResult = await this.aiService.generateCompletion(config.apiKey, 'Hello, this is a test message. Please respond with "Test successful".', {
                    model: config.model,
                    provider: config.provider,
                    maxTokens: 50,
                    temperature: 0.1
                });
                const responseTime = Date.now() - startTime;
                return {
                    success: true,
                    provider: config.provider,
                    model: config.model,
                    streamingSupported,
                    responseTime,
                };
            }
            catch (error) {
                return {
                    success: false,
                    provider: ai_settings_dto_1.AiProvider.OPENAI,
                    model: ai_settings_dto_1.AiModel.GPT_4_TURBO,
                    streamingSupported: false,
                    responseTime: Date.now() - startTime,
                    error: error.message
                };
            }
        }
        /**
         * Get AI usage statistics for chat
         */
        async getChatAiUsageStats(sessionId) {
            // Get analytics from the settings service
            const analytics = await this.chatAiSettingsService.getAiUsageAnalytics();
            return {
                totalRequests: analytics.totalRequests,
                totalTokens: analytics.totalTokens,
                averageResponseTime: Object.values(analytics.providerBreakdown)
                    .reduce((sum, provider) => sum + provider.averageResponseTime, 0) /
                    Object.keys(analytics.providerBreakdown).length || 0,
                averageConfidence: analytics.averageConfidence,
                providerUsage: Object.fromEntries(Object.entries(analytics.providerBreakdown).map(([provider, data]) => [provider, data.requests])),
                modelUsage: Object.fromEntries(Object.entries(analytics.modelBreakdown).map(([model, data]) => [model, data.requests]))
            };
        }
        /**
         * Get provider health status
         */
        async getProviderHealthStatus() {
            return this.chatAiSettingsService.getProviderHealthStatus();
        }
        /**
         * Test all configured providers
         */
        async testAllProviders() {
            return this.chatAiSettingsService.testAllProviders();
        }
    };
    return ChatAiService = _classThis;
})();
exports.ChatAiService = ChatAiService;
//# sourceMappingURL=chat-ai.service.js.map