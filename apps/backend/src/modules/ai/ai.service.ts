import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { AiModel } from '../settings/dto/ai-settings.dto';
import { AiProviderFactory, ProviderType } from './providers/provider.factory';
import {
  AiGenerationOptions,
  AiGenerationResult,
} from './interfaces/ai-provider.interface';
import { UserAiPreferencesService } from '../user-ai-preferences/services/user-ai-preferences.service';
import { AiModule } from '../user-ai-preferences/entities/user-ai-preference.entity';

// Re-export for backward compatibility and module integration
export { AiGenerationOptions, AiGenerationResult };
export { AiModule as AiModuleType } from '../user-ai-preferences/entities/user-ai-preference.entity';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly providerFactory: AiProviderFactory,
    private readonly userPreferencesService: UserAiPreferencesService,
  ) {}

  /**
   * Generate text completion using user's AI preferences
   * This is the RECOMMENDED method for all modules (Email, Social, Support, Analytics)
   *
   * @param userId - User ID to fetch AI preferences
   * @param module - Module name (email, social, support, analytics)
   * @param prompt - User prompt
   * @param options - Optional generation options (temperature, maxTokens, etc.)
   * @param fallbackApiKey - Optional fallback API key if user has no preference
   * @returns Generated content with metadata
   */
  async generateCompletionForUser(
    userId: string,
    module: AiModule,
    prompt: string,
    options?: Partial<AiGenerationOptions>,
    fallbackApiKey?: string,
  ): Promise<AiGenerationResult> {
    this.logger.log(
      `Generating completion for user ${userId}, module: ${module}`,
    );

    // 1. Fetch user's AI preference for this module
    const preference = await this.userPreferencesService.getUserPreferenceForModule(
      userId,
      module,
    );

    if (!preference || !preference.enabled) {
      throw new BadRequestException(
        `User ${userId} has no active AI preference for module: ${module}. Please configure AI preferences at /admin/profile/ai-preferences`,
      );
    }

    // 2. Get decrypted API key (user-specific or fallback to global)
    let apiKey = await this.userPreferencesService.getDecryptedApiKey(
      userId,
      module,
    );

    if (!apiKey && fallbackApiKey) {
      this.logger.log(
        `User ${userId} has no API key for ${module}, using fallback`,
      );
      apiKey = fallbackApiKey;
    }

    if (!apiKey) {
      throw new BadRequestException(
        `No API key available for user ${userId}, module: ${module}. Please add an API key in AI preferences.`,
      );
    }

    // 3. Prepare generation options with user's preferred model
    const generationOptions: AiGenerationOptions = {
      model: preference.model,
      temperature: options?.temperature,
      maxTokens: options?.maxTokens,
      systemPrompt: options?.systemPrompt,
    };

    // 4. Detect provider and generate
    const providerType = this.providerFactory.detectProvider(preference.model);
    const provider = this.providerFactory.getProvider(providerType);

    this.logger.log(
      `Using ${providerType} provider with model: ${preference.model} for user ${userId}`,
    );

    try {
      return await provider.generateCompletion(apiKey, prompt, generationOptions);
    } catch (error) {
      this.logger.error(
        `AI generation failed for user ${userId}, module ${module}: ${error.message}`,
      );
      throw error;
    }
  }

  /**
   * Generate text completion using configured AI provider (LEGACY)
   * @deprecated Use generateCompletionForUser() instead for better user preference integration
   *
   * @param apiKey - AI provider API key
   * @param prompt - User prompt
   * @param options - Generation options (must include model)
   * @returns Generated content with metadata
   */
  async generateCompletion(
    apiKey: string,
    prompt: string,
    options: AiGenerationOptions,
  ): Promise<AiGenerationResult> {
    if (!options.model) {
      throw new Error('Model must be specified in options');
    }

    // Detect provider from model name
    const providerType = this.providerFactory.detectProvider(options.model);
    const provider = this.providerFactory.getProvider(providerType);

    this.logger.log(
      `Generating completion with ${providerType} provider, model: ${options.model}`,
    );

    try {
      return await provider.generateCompletion(apiKey, prompt, options);
    } catch (error) {
      this.logger.error(`AI generation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Test AI provider API key validity
   * Makes a minimal API call to verify the key works
   */
  async testApiKey(
    apiKey: string,
    model: AiModel | string,
  ): Promise<boolean> {
    try {
      // Detect provider from model
      const providerType = this.providerFactory.detectProvider(model);
      const provider = this.providerFactory.getProvider(providerType);

      return await provider.testConnection(apiKey, model);
    } catch (error) {
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
  detectProviderForModel(model: string): ProviderType {
    return this.providerFactory.detectProvider(model);
  }

  /**
   * Clear provider client caches
   * Useful when API keys are updated
   */
  clearClientCache(apiKey?: string): void {
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
    } catch (e) {
      // Anthropic provider might not be available yet
    }

    // Clear Google cache
    try {
      const googleProvider = this.providerFactory.getProvider('google');
      if ('clearCache' in googleProvider && typeof googleProvider.clearCache === 'function') {
        googleProvider.clearCache(apiKey);
      }
    } catch (e) {
      // Google provider might not be available yet
    }
  }
}
