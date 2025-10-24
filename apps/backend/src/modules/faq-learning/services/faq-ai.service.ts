import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
import { AiProvider, AiProviderConfig, FaqGenerationRequest, FaqGenerationResponse } from '../interfaces/ai-provider.interface';
import { OpenAiProvider } from './ai-providers/openai.provider';
import { AnthropicProvider } from './ai-providers/anthropic.provider';

@Injectable()
export class FaqAiService {
  private readonly logger = new Logger(FaqAiService.name);
  private providers: Map<string, AiProvider> = new Map();
  private currentProvider: string = 'openai';

  constructor(
    @InjectRepository(FaqLearningConfig)
    private configRepository: Repository<FaqLearningConfig>,
  ) {
    this.initializeProviders();
  }

  async generateFaqAnswer(request: FaqGenerationRequest): Promise<FaqGenerationResponse> {
    const provider = await this.getActiveProvider();
    
    if (!provider) {
      throw new Error('No AI provider available');
    }

    try {
      this.logger.log(`Generating FAQ answer using ${provider.name} provider`);
      return await provider.generateFaqAnswer(request);
    } catch (error) {
      this.logger.error(`FAQ generation failed with ${provider.name}:`, error);
      
      // Try fallback provider
      const fallbackProvider = await this.getFallbackProvider();
      if (fallbackProvider && fallbackProvider.name !== provider.name) {
        this.logger.log(`Trying fallback provider: ${fallbackProvider.name}`);
        try {
          return await fallbackProvider.generateFaqAnswer(request);
        } catch (fallbackError) {
          this.logger.error(`Fallback provider also failed:`, fallbackError);
        }
      }
      
      throw new Error(`FAQ generation failed: ${error.message}`);
    }
  }

  async improveAnswer(originalAnswer: string, feedback: string): Promise<string> {
    const provider = await this.getActiveProvider();
    
    if (!provider) {
      throw new Error('No AI provider available');
    }

    return await provider.improveAnswer(originalAnswer, feedback);
  }

  async categorizeQuestion(question: string, availableCategories: string[]): Promise<string> {
    const provider = await this.getActiveProvider();
    
    if (!provider) {
      return 'General';
    }

    return await provider.categorizeQuestion(question, availableCategories);
  }

  async extractKeywords(text: string): Promise<string[]> {
    const provider = await this.getActiveProvider();
    
    if (!provider) {
      return [];
    }

    return await provider.extractKeywords(text);
  }

  async generateRelatedQuestions(question: string, answer: string): Promise<string[]> {
    const provider = await this.getActiveProvider();
    
    if (!provider) {
      return [];
    }

    return await provider.generateRelatedQuestions(question, answer);
  }

  async switchProvider(providerName: string): Promise<boolean> {
    const provider = this.providers.get(providerName);
    
    if (!provider) {
      this.logger.error(`Provider ${providerName} not found`);
      return false;
    }

    const isAvailable = await provider.isAvailable();
    if (!isAvailable) {
      this.logger.error(`Provider ${providerName} is not available`);
      return false;
    }

    this.currentProvider = providerName;
    
    // Update configuration
    await this.updateProviderConfig(providerName);
    
    this.logger.log(`Switched to provider: ${providerName}`);
    return true;
  }

  async testProvider(providerName: string): Promise<boolean> {
    const provider = this.providers.get(providerName);
    
    if (!provider) {
      return false;
    }

    return await provider.testConnection();
  }

  async getProviderStatus(): Promise<Array<{name: string, available: boolean}>> {
    const status = [];
    
    for (const [name, provider] of this.providers) {
      const available = await provider.isAvailable();
      status.push({ name, available });
    }
    
    return status;
  }

  private async initializeProviders(): Promise<void> {
    try {
      // Load AI configuration
      const aiConfig = await this.getAiConfig();
      const providerSettings = await this.getProviderSettings();

      // Initialize OpenAI provider
      if (providerSettings.openai) {
        const openaiConfig: AiProviderConfig = {
          provider: 'openai',
          apiKey: process.env.OPENAI_API_KEY || '',
          model: providerSettings.openai.defaultModel || 'gpt-4',
          temperature: aiConfig.temperature || 0.7,
          maxTokens: aiConfig.maxTokens || 1000
        };
        this.providers.set('openai', new OpenAiProvider(openaiConfig));
      }

      // Initialize Anthropic provider
      if (providerSettings.anthropic) {
        const anthropicConfig: AiProviderConfig = {
          provider: 'anthropic',
          apiKey: process.env.ANTHROPIC_API_KEY || '',
          model: providerSettings.anthropic.defaultModel || 'claude-3-sonnet',
          temperature: aiConfig.temperature || 0.7,
          maxTokens: aiConfig.maxTokens || 1000
        };
        this.providers.set('anthropic', new AnthropicProvider(anthropicConfig));
      }

      // Set current provider from config
      this.currentProvider = aiConfig.aiProvider || 'openai';
      
      this.logger.log(`Initialized ${this.providers.size} AI providers`);
    } catch (error) {
      this.logger.error('Failed to initialize AI providers:', error);
    }
  }

  private async getActiveProvider(): Promise<AiProvider | null> {
    const provider = this.providers.get(this.currentProvider);
    
    if (!provider) {
      this.logger.error(`Current provider ${this.currentProvider} not found`);
      return null;
    }

    const isAvailable = await provider.isAvailable();
    if (!isAvailable) {
      this.logger.warn(`Current provider ${this.currentProvider} is not available`);
      return null;
    }

    return provider;
  }

  private async getFallbackProvider(): Promise<AiProvider | null> {
    // Try to find any available provider that's not the current one
    for (const [name, provider] of this.providers) {
      if (name !== this.currentProvider) {
        const isAvailable = await provider.isAvailable();
        if (isAvailable) {
          return provider;
        }
      }
    }
    
    return null;
  }

  private async getAiConfig(): Promise<any> {
    try {
      const config = await this.configRepository.findOne({
        where: { configKey: 'ai_model_settings' }
      });
      
      return config?.configValue || {
        aiProvider: 'openai',
        temperature: 0.7,
        maxTokens: 1000
      };
    } catch (error) {
      this.logger.error('Failed to load AI config:', error);
      return {
        aiProvider: 'openai',
        temperature: 0.7,
        maxTokens: 1000
      };
    }
  }

  private async getProviderSettings(): Promise<any> {
    try {
      const config = await this.configRepository.findOne({
        where: { configKey: 'provider_settings' }
      });
      
      return config?.configValue || {
        openai: {
          models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
          defaultModel: 'gpt-4'
        },
        anthropic: {
          models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
          defaultModel: 'claude-3-sonnet'
        }
      };
    } catch (error) {
      this.logger.error('Failed to load provider settings:', error);
      return {};
    }
  }

  private async updateProviderConfig(providerName: string): Promise<void> {
    try {
      const config = await this.configRepository.findOne({
        where: { configKey: 'ai_model_settings' }
      });
      
      if (config) {
        config.configValue = {
          ...config.configValue,
          aiProvider: providerName as any
        };
        await this.configRepository.save(config);
      }
    } catch (error) {
      this.logger.error('Failed to update provider config:', error);
    }
  }
}