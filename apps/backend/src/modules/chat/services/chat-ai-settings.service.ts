import { Injectable, Logger } from '@nestjs/common';
import { SettingsService } from '../../settings/settings.service';
import { AiService } from '../../ai/ai.service';
import { AiModel, AiProvider } from '../../settings/dto/ai-settings.dto';

export interface ChatAiConfiguration {
  apiKey: string;
  model: AiModel;
  provider: AiProvider;
  enabled: boolean;
  priority: number;
  maxRetries: number;
  timeoutMs: number;
}

export interface ProviderFailoverConfig {
  primaryProvider: AiProvider;
  fallbackProviders: AiProvider[];
  maxFailuresBeforeFailover: number;
  failoverCooldownMs: number;
}

@Injectable()
export class ChatAiSettingsService {
  private readonly logger = new Logger(ChatAiSettingsService.name);
  private providerFailureCount: Map<AiProvider, number> = new Map();
  private providerLastFailure: Map<AiProvider, number> = new Map();

  constructor(
    private readonly settingsService: SettingsService,
    private readonly aiService: AiService,
  ) {}

  /**
   * Get AI configuration for chat with failover support
   */
  async getChatAiConfiguration(): Promise<ChatAiConfiguration> {
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

    } catch (error) {
      this.logger.error(`Failed to get chat AI configuration: ${error.message}`);
      throw error;
    }
  }  /**
   
* Get failover configuration for providers
   */
  async getFailoverConfiguration(): Promise<ProviderFailoverConfig> {
    const aiSettings = await this.settingsService.getAiSettings();
    
    // Determine primary provider from support settings
    const supportModel = await this.settingsService.getAiModelForModule('support');
    const primaryProvider = this.detectProvider(supportModel);
    
    // Build fallback providers list based on available configurations
    const fallbackProviders: AiProvider[] = [];
    
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
  async getConfigurationWithFailover(): Promise<ChatAiConfiguration> {
    const failoverConfig = await this.getFailoverConfiguration();
    
    // Check if primary provider is available
    if (this.isProviderAvailable(failoverConfig.primaryProvider)) {
      try {
        return await this.getChatAiConfiguration();
      } catch (error) {
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
        } catch (error) {
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
  private async getConfigurationForProvider(provider: AiProvider): Promise<ChatAiConfiguration> {
    const aiSettings = await this.settingsService.getAiSettings();
    
    // Find configuration for the specified provider
    let apiKey: string | undefined;
    let model: AiModel;

    if (aiSettings.useSingleApiKey && aiSettings.global?.apiKey) {
      const globalProvider = this.detectProvider(aiSettings.global.model);
      if (globalProvider === provider) {
        apiKey = aiSettings.global.apiKey;
        model = aiSettings.global.model;
      }
    }

    // Check module-specific configurations
    if (!apiKey) {
      const modules = ['support', 'emailMarketing', 'social', 'analytics'] as const;
      
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
  private isProviderAvailable(provider: AiProvider): boolean {
    const failureCount = this.providerFailureCount.get(provider) || 0;
    const lastFailure = this.providerLastFailure.get(provider) || 0;
    const now = Date.now();
    
    // If provider has failed too many times, check cooldown
    if (failureCount >= 3) {
      const cooldownPeriod = 300000; // 5 minutes
      if (now - lastFailure < cooldownPeriod) {
        return false;
      } else {
        // Reset failure count after cooldown
        this.providerFailureCount.set(provider, 0);
      }
    }

    return true;
  }

  /**
   * Record provider failure for failover logic
   */
  private recordProviderFailure(provider: AiProvider): void {
    const currentCount = this.providerFailureCount.get(provider) || 0;
    this.providerFailureCount.set(provider, currentCount + 1);
    this.providerLastFailure.set(provider, Date.now());
    
    this.logger.warn(`Provider ${provider} failure count: ${currentCount + 1}`);
  }

  /**
   * Reset provider failure count (call on successful request)
   */
  resetProviderFailures(provider: AiProvider): void {
    this.providerFailureCount.set(provider, 0);
    this.providerLastFailure.delete(provider);
  }

  /**
   * Test all configured providers
   */
  async testAllProviders(): Promise<Array<{
    provider: AiProvider;
    model: AiModel;
    success: boolean;
    responseTime: number;
    error?: string;
  }>> {
    const results: Array<{
      provider: AiProvider;
      model: AiModel;
      success: boolean;
      responseTime: number;
      error?: string;
    }> = [];

    try {
      const aiSettings = await this.settingsService.getAiSettings();
      const providersToTest = new Set<AiProvider>();

      // Collect all configured providers
      if (aiSettings.useSingleApiKey && aiSettings.global?.apiKey) {
        providersToTest.add(this.detectProvider(aiSettings.global.model));
      }

      const modules = ['support', 'emailMarketing', 'social', 'analytics'] as const;
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
          await this.aiService.generateCompletion(
            config.apiKey,
            'Test message',
            {
              model: config.model,
              provider: config.provider,
              maxTokens: 10,
              temperature: 0.1
            }
          );

          results.push({
            provider,
            model: config.model,
            success: true,
            responseTime: Date.now() - startTime
          });

          // Reset failure count on success
          this.resetProviderFailures(provider);

        } catch (error) {
          results.push({
            provider,
            model: AiModel.GPT_4_TURBO, // Default model for error case
            success: false,
            responseTime: Date.now() - startTime,
            error: error.message
          });

          this.recordProviderFailure(provider);
        }
      }

    } catch (error) {
      this.logger.error(`Error testing providers: ${error.message}`, error.stack);
    }

    return results;
  }

  /**
   * Get provider health status
   */
  getProviderHealthStatus(): Array<{
    provider: AiProvider;
    isAvailable: boolean;
    failureCount: number;
    lastFailure?: Date;
    nextAvailableAt?: Date;
  }> {
    const allProviders = Object.values(AiProvider);
    
    return allProviders.map(provider => {
      const failureCount = this.providerFailureCount.get(provider) || 0;
      const lastFailure = this.providerLastFailure.get(provider);
      const isAvailable = this.isProviderAvailable(provider);
      
      let nextAvailableAt: Date | undefined;
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
  private detectProvider(model: AiModel): AiProvider {
    if (model.startsWith('gpt-') || model.includes('openai/')) {
      return AiProvider.OPENAI;
    }
    if (model.startsWith('claude-') || model.includes('anthropic/')) {
      return AiProvider.ANTHROPIC;
    }
    if (model.startsWith('gemini-') || model.includes('google/')) {
      return AiProvider.GOOGLE;
    }
    if (model.includes('/') && !model.startsWith('gpt-') && !model.startsWith('claude-')) {
      return AiProvider.OPENROUTER;
    }
    if (model === AiModel.LOCAL_LLAMA_3_1 || model === AiModel.LOCAL_MISTRAL || model === AiModel.LOCAL_CODELLAMA) {
      return AiProvider.LOCAL;
    }
    
    return AiProvider.OPENAI; // default fallback
  }

  /**
   * Get AI usage tracking and analytics
   */
  async getAiUsageAnalytics(timeRange: 'hour' | 'day' | 'week' | 'month' = 'day'): Promise<{
    totalRequests: number;
    totalTokens: number;
    totalCost: number;
    providerBreakdown: Record<AiProvider, {
      requests: number;
      tokens: number;
      cost: number;
      averageResponseTime: number;
    }>;
    modelBreakdown: Record<AiModel, {
      requests: number;
      tokens: number;
      cost: number;
    }>;
    errorRate: number;
    averageConfidence: number;
  }> {
    // This would typically query a usage tracking database
    // For now, return mock data structure
    return {
      totalRequests: 0,
      totalTokens: 0,
      totalCost: 0,
      providerBreakdown: {} as Record<AiProvider, any>,
      modelBreakdown: {} as Record<AiModel, any>,
      errorRate: 0,
      averageConfidence: 0
    };
  }

  /**
   * Update AI settings with validation
   */
  async updateChatAiSettings(settings: {
    supportApiKey?: string;
    supportModel?: AiModel;
    supportEnabled?: boolean;
    globalApiKey?: string;
    globalModel?: AiModel;
    useSingleApiKey?: boolean;
  }): Promise<void> {
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

    } catch (error) {
      this.logger.error(`Failed to update chat AI settings: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Validate API key for a specific model/provider
   */
  private async validateApiKey(apiKey: string, model: AiModel): Promise<boolean> {
    try {
      const provider = this.detectProvider(model);
      return await this.aiService.testApiKey(apiKey, model, provider);
    } catch (error) {
      this.logger.warn(`API key validation failed: ${error.message}`);
      return false;
    }
  }
}