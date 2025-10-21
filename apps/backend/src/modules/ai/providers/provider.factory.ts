import { Injectable, Logger } from '@nestjs/common';
import { IAiProvider } from '../interfaces/ai-provider.interface';
import { OpenAIProvider } from './openai.provider';
import { AnthropicProvider } from './anthropic.provider';
import { GoogleProvider } from './google.provider';

export type ProviderType = 'openai' | 'anthropic' | 'google';

@Injectable()
export class AiProviderFactory {
  private readonly logger = new Logger(AiProviderFactory.name);
  private providers: Map<ProviderType, IAiProvider> = new Map();

  constructor(
    private readonly openaiProvider: OpenAIProvider,
    private readonly anthropicProvider: AnthropicProvider,
    private readonly googleProvider: GoogleProvider,
  ) {
    // Register providers
    this.providers.set('openai', openaiProvider);
    this.providers.set('anthropic', anthropicProvider);
    this.providers.set('google', googleProvider);

    this.logger.log('AI Provider Factory initialized with OpenAI, Anthropic, and Google providers');
  }

  /**
   * Get provider by type
   */
  getProvider(providerType: ProviderType): IAiProvider {
    const provider = this.providers.get(providerType);

    if (!provider) {
      throw new Error(`Provider '${providerType}' not found or not supported yet`);
    }

    return provider;
  }

  /**
   * Detect provider from model name
   */
  detectProvider(model: string): ProviderType {
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
  getAllProviders(): Array<{ type: ProviderType; name: string; models: string[] }> {
    return Array.from(this.providers.entries()).map(([type, provider]) => ({
      type,
      name: provider.name,
      models: provider.supportedModels,
    }));
  }

  /**
   * Check if provider is supported
   */
  isProviderSupported(providerType: ProviderType): boolean {
    return this.providers.has(providerType);
  }
}
