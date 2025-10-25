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
exports.ChatAiSettingsService = void 0;
const common_1 = require("@nestjs/common");
const ai_settings_dto_1 = require("../../settings/dto/ai-settings.dto");
let ChatAiSettingsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChatAiSettingsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatAiSettingsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        settingsService;
        aiService;
        logger = new common_1.Logger(ChatAiSettingsService.name);
        providerFailureCount = new Map();
        providerLastFailure = new Map();
        constructor(settingsService, aiService) {
            this.settingsService = settingsService;
            this.aiService = aiService;
        }
        /**
         * Get AI configuration for chat with failover support
         */
        async getChatAiConfiguration() {
            try {
                // Get support-specific settings first
                const supportApiKey = await this.settingsService.getAiApiKeyForModule('support');
                const supportModel = await this.settingsService.getAiModelForModule('support');
                if (supportApiKey) {
                    const provider = this.detectProvider(supportModel);
                    return {
                        apiKey: supportApiKey,
                        model: supportModel,
                        provider,
                        enabled: true,
                        priority: 1,
                        maxRetries: 3,
                        timeoutMs: 30000
                    };
                }
                // Fallback to global settings
                const aiSettings = await this.settingsService.getAiSettings();
                if (aiSettings.useSingleApiKey && aiSettings.global?.apiKey) {
                    const provider = this.detectProvider(aiSettings.global.model);
                    return {
                        apiKey: aiSettings.global.apiKey,
                        model: aiSettings.global.model,
                        provider,
                        enabled: true,
                        priority: 2,
                        maxRetries: 3,
                        timeoutMs: 30000
                    };
                }
                throw new Error('No AI configuration available for chat');
            }
            catch (error) {
                this.logger.error(`Failed to get chat AI configuration: ${error.message}`);
                throw error;
            }
        } /**
         
      * Get failover configuration for providers
         */
        async getFailoverConfiguration() {
            const aiSettings = await this.settingsService.getAiSettings();
            // Determine primary provider from support settings
            const supportModel = await this.settingsService.getAiModelForModule('support');
            const primaryProvider = this.detectProvider(supportModel);
            // Build fallback providers list based on available configurations
            const fallbackProviders = [];
            if (aiSettings.useSingleApiKey && aiSettings.global?.apiKey) {
                const globalProvider = this.detectProvider(aiSettings.global.model);
                if (globalProvider !== primaryProvider) {
                    fallbackProviders.push(globalProvider);
                }
            }
            // Add other configured providers
            if (aiSettings.emailMarketing.enabled && aiSettings.emailMarketing.apiKey) {
                const emailProvider = this.detectProvider(aiSettings.emailMarketing.model);
                if (!fallbackProviders.includes(emailProvider) && emailProvider !== primaryProvider) {
                    fallbackProviders.push(emailProvider);
                }
            }
            return {
                primaryProvider,
                fallbackProviders,
                maxFailuresBeforeFailover: 3,
                failoverCooldownMs: 300000 // 5 minutes
            };
        }
        /**
         * Get AI configuration with failover logic
         */
        async getConfigurationWithFailover() {
            const failoverConfig = await this.getFailoverConfiguration();
            // Check if primary provider is available
            if (this.isProviderAvailable(failoverConfig.primaryProvider)) {
                try {
                    return await this.getChatAiConfiguration();
                }
                catch (error) {
                    this.recordProviderFailure(failoverConfig.primaryProvider);
                    this.logger.warn(`Primary provider ${failoverConfig.primaryProvider} failed, trying fallback`);
                }
            }
            // Try fallback providers
            for (const provider of failoverConfig.fallbackProviders) {
                if (this.isProviderAvailable(provider)) {
                    try {
                        const config = await this.getConfigurationForProvider(provider);
                        this.logger.log(`Using fallback provider: ${provider}`);
                        return config;
                    }
                    catch (error) {
                        this.recordProviderFailure(provider);
                        this.logger.warn(`Fallback provider ${provider} failed: ${error.message}`);
                    }
                }
            }
            throw new Error('All AI providers are unavailable');
        }
        /**
         * Get configuration for specific provider
         */
        async getConfigurationForProvider(provider) {
            const aiSettings = await this.settingsService.getAiSettings();
            // Find configuration for the specified provider
            let apiKey;
            let model;
            if (aiSettings.useSingleApiKey && aiSettings.global?.apiKey) {
                const globalProvider = this.detectProvider(aiSettings.global.model);
                if (globalProvider === provider) {
                    apiKey = aiSettings.global.apiKey;
                    model = aiSettings.global.model;
                }
            }
            // Check module-specific configurations
            if (!apiKey) {
                const modules = ['support', 'emailMarketing', 'social', 'analytics'];
                for (const module of modules) {
                    const moduleSettings = aiSettings[module];
                    if (moduleSettings.enabled && moduleSettings.apiKey) {
                        const moduleProvider = this.detectProvider(moduleSettings.model);
                        if (moduleProvider === provider) {
                            apiKey = moduleSettings.apiKey;
                            model = moduleSettings.model;
                            break;
                        }
                    }
                }
            }
            if (!apiKey) {
                throw new Error(`No API key found for provider: ${provider}`);
            }
            return {
                apiKey,
                model,
                provider,
                enabled: true,
                priority: provider === (await this.getFailoverConfiguration()).primaryProvider ? 1 : 2,
                maxRetries: 3,
                timeoutMs: 30000
            };
        }
        /**
         * Check if provider is available (not in cooldown)
         */
        isProviderAvailable(provider) {
            const failureCount = this.providerFailureCount.get(provider) || 0;
            const lastFailure = this.providerLastFailure.get(provider) || 0;
            const now = Date.now();
            // If provider has failed too many times, check cooldown
            if (failureCount >= 3) {
                const cooldownPeriod = 300000; // 5 minutes
                if (now - lastFailure < cooldownPeriod) {
                    return false;
                }
                else {
                    // Reset failure count after cooldown
                    this.providerFailureCount.set(provider, 0);
                }
            }
            return true;
        }
        /**
         * Record provider failure for failover logic
         */
        recordProviderFailure(provider) {
            const currentCount = this.providerFailureCount.get(provider) || 0;
            this.providerFailureCount.set(provider, currentCount + 1);
            this.providerLastFailure.set(provider, Date.now());
            this.logger.warn(`Provider ${provider} failure count: ${currentCount + 1}`);
        }
        /**
         * Reset provider failure count (call on successful request)
         */
        resetProviderFailures(provider) {
            this.providerFailureCount.set(provider, 0);
            this.providerLastFailure.delete(provider);
        }
        /**
         * Test all configured providers
         */
        async testAllProviders() {
            const results = [];
            try {
                const aiSettings = await this.settingsService.getAiSettings();
                const providersToTest = new Set();
                // Collect all configured providers
                if (aiSettings.useSingleApiKey && aiSettings.global?.apiKey) {
                    providersToTest.add(this.detectProvider(aiSettings.global.model));
                }
                const modules = ['support', 'emailMarketing', 'social', 'analytics'];
                for (const module of modules) {
                    const moduleSettings = aiSettings[module];
                    if (moduleSettings.enabled && moduleSettings.apiKey) {
                        providersToTest.add(this.detectProvider(moduleSettings.model));
                    }
                }
                // Test each provider
                for (const provider of providersToTest) {
                    const startTime = Date.now();
                    try {
                        const config = await this.getConfigurationForProvider(provider);
                        // Test with a simple prompt
                        await this.aiService.generateCompletion(config.apiKey, 'Test message', {
                            model: config.model,
                            provider: config.provider,
                            maxTokens: 10,
                            temperature: 0.1
                        });
                        results.push({
                            provider,
                            model: config.model,
                            success: true,
                            responseTime: Date.now() - startTime
                        });
                        // Reset failure count on success
                        this.resetProviderFailures(provider);
                    }
                    catch (error) {
                        results.push({
                            provider,
                            model: ai_settings_dto_1.AiModel.GPT_4_TURBO, // Default model for error case
                            success: false,
                            responseTime: Date.now() - startTime,
                            error: error.message
                        });
                        this.recordProviderFailure(provider);
                    }
                }
            }
            catch (error) {
                this.logger.error(`Error testing providers: ${error.message}`, error.stack);
            }
            return results;
        }
        /**
         * Get provider health status
         */
        getProviderHealthStatus() {
            const allProviders = Object.values(ai_settings_dto_1.AiProvider);
            return allProviders.map(provider => {
                const failureCount = this.providerFailureCount.get(provider) || 0;
                const lastFailure = this.providerLastFailure.get(provider);
                const isAvailable = this.isProviderAvailable(provider);
                let nextAvailableAt;
                if (!isAvailable && lastFailure) {
                    nextAvailableAt = new Date(lastFailure + 300000); // 5 minutes cooldown
                }
                return {
                    provider,
                    isAvailable,
                    failureCount,
                    lastFailure: lastFailure ? new Date(lastFailure) : undefined,
                    nextAvailableAt
                };
            });
        }
        /**
         * Detect provider from model name
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
            return ai_settings_dto_1.AiProvider.OPENAI; // default fallback
        }
        /**
         * Get AI usage tracking and analytics
         */
        async getAiUsageAnalytics(timeRange = 'day') {
            // This would typically query a usage tracking database
            // For now, return mock data structure
            return {
                totalRequests: 0,
                totalTokens: 0,
                totalCost: 0,
                providerBreakdown: {},
                modelBreakdown: {},
                errorRate: 0,
                averageConfidence: 0
            };
        }
        /**
         * Update AI settings with validation
         */
        async updateChatAiSettings(settings) {
            try {
                // Validate settings before updating
                if (settings.supportApiKey && settings.supportModel) {
                    await this.validateApiKey(settings.supportApiKey, settings.supportModel);
                }
                if (settings.globalApiKey && settings.globalModel) {
                    await this.validateApiKey(settings.globalApiKey, settings.globalModel);
                }
                // Update settings through the settings service
                const currentSettings = await this.settingsService.getAiSettings();
                const updatedSettings = {
                    ...currentSettings,
                    useSingleApiKey: settings.useSingleApiKey ?? currentSettings.useSingleApiKey,
                    support: {
                        ...currentSettings.support,
                        apiKey: settings.supportApiKey ?? currentSettings.support.apiKey,
                        model: settings.supportModel ?? currentSettings.support.model,
                        enabled: settings.supportEnabled ?? currentSettings.support.enabled,
                    },
                    global: settings.useSingleApiKey ? {
                        ...currentSettings.global,
                        apiKey: settings.globalApiKey ?? currentSettings.global?.apiKey,
                        model: settings.globalModel ?? currentSettings.global?.model,
                        enabled: true,
                    } : currentSettings.global
                };
                await this.settingsService.updateAiSettings(updatedSettings);
                // Clear AI service cache to use new settings
                this.aiService.clearClientCache();
                this.logger.log('Chat AI settings updated successfully');
            }
            catch (error) {
                this.logger.error(`Failed to update chat AI settings: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Validate API key for a specific model/provider
         */
        async validateApiKey(apiKey, model) {
            try {
                const provider = this.detectProvider(model);
                return await this.aiService.testApiKey(apiKey, model, provider);
            }
            catch (error) {
                this.logger.warn(`API key validation failed: ${error.message}`);
                return false;
            }
        }
    };
    return ChatAiSettingsService = _classThis;
})();
exports.ChatAiSettingsService = ChatAiSettingsService;
//# sourceMappingURL=chat-ai-settings.service.js.map