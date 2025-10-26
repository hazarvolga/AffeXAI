import { AiProvider, AiModel } from '../dto/ai-settings.dto';

/**
 * API Key Detection Result
 */
export interface ApiKeyDetectionResult {
  provider: AiProvider;
  defaultModel: AiModel;
  isValid: boolean; // Format validation only, not API validation
  detectionMethod: 'prefix' | 'pattern' | 'unknown';
}

/**
 * Detect AI provider from API key format
 * This provides automatic provider detection for better UX
 */
export class ApiKeyDetector {
  /**
   * Detect provider and suggest default model from API key
   */
  static detect(apiKey: string): ApiKeyDetectionResult {
    if (!apiKey || apiKey.trim().length === 0) {
      return {
        provider: AiProvider.OPENAI,
        defaultModel: AiModel.GPT_4O,
        isValid: false,
        detectionMethod: 'unknown',
      };
    }

    const trimmedKey = apiKey.trim();

    // OpenAI: sk-... or sk-proj-...
    if (trimmedKey.startsWith('sk-')) {
      return {
        provider: AiProvider.OPENAI,
        defaultModel: AiModel.GPT_4O,
        isValid: trimmedKey.length > 20,
        detectionMethod: 'prefix',
      };
    }

    // Anthropic: sk-ant-...
    if (trimmedKey.startsWith('sk-ant-')) {
      return {
        provider: AiProvider.ANTHROPIC,
        defaultModel: AiModel.CLAUDE_3_5_SONNET,
        isValid: trimmedKey.length > 20,
        detectionMethod: 'prefix',
      };
    }

    // Google AI: AIzaSy...
    if (trimmedKey.startsWith('AIzaSy')) {
      return {
        provider: AiProvider.GOOGLE,
        defaultModel: AiModel.GEMINI_PRO,
        isValid: trimmedKey.length === 39, // Google API keys are exactly 39 characters
        detectionMethod: 'prefix',
      };
    }

    // OpenRouter: sk-or-v1-...
    if (trimmedKey.startsWith('sk-or-v1-')) {
      return {
        provider: AiProvider.OPENROUTER,
        defaultModel: AiModel.OPENROUTER_GPT_4,
        isValid: trimmedKey.length > 20,
        detectionMethod: 'prefix',
      };
    }

    // Unknown format - default to OpenAI
    return {
      provider: AiProvider.OPENAI,
      defaultModel: AiModel.GPT_4O,
      isValid: false,
      detectionMethod: 'unknown',
    };
  }

  /**
   * Validate API key format (not actual API validation)
   */
  static validateFormat(apiKey: string, expectedProvider?: AiProvider): boolean {
    const detection = this.detect(apiKey);

    if (!detection.isValid) {
      return false;
    }

    // If expectedProvider specified, ensure it matches
    if (expectedProvider && detection.provider !== expectedProvider) {
      return false;
    }

    return true;
  }

  /**
   * Get provider name for display
   */
  static getProviderDisplayName(provider: AiProvider): string {
    switch (provider) {
      case AiProvider.OPENAI:
        return 'OpenAI';
      case AiProvider.ANTHROPIC:
        return 'Anthropic';
      case AiProvider.GOOGLE:
        return 'Google AI';
      case AiProvider.OPENROUTER:
        return 'OpenRouter';
      case AiProvider.LOCAL:
        return 'Local (Ollama)';
      default:
        return 'Unknown';
    }
  }

  /**
   * Get available models for a provider
   */
  static getAvailableModels(provider: AiProvider): AiModel[] {
    switch (provider) {
      case AiProvider.OPENAI:
        return [
          AiModel.GPT_4O,
          AiModel.GPT_4_TURBO,
          AiModel.GPT_4,
          AiModel.GPT_3_5_TURBO,
        ];

      case AiProvider.ANTHROPIC:
        return [
          AiModel.CLAUDE_3_5_SONNET,
          AiModel.CLAUDE_3_OPUS,
          AiModel.CLAUDE_3_SONNET,
          AiModel.CLAUDE_3_HAIKU,
        ];

      case AiProvider.GOOGLE:
        return [
          AiModel.GEMINI_PRO,
          AiModel.GEMINI_PRO_VISION,
          // Note: gemini-1.5-pro requires v1 API, not v1beta
          // Commented out until SDK is updated
          // AiModel.GEMINI_1_5_PRO,
          // AiModel.GEMINI_1_5_FLASH,
        ];

      case AiProvider.OPENROUTER:
        return [
          AiModel.OPENROUTER_GPT_4,
          AiModel.OPENROUTER_CLAUDE_3_5_SONNET,
          AiModel.OPENROUTER_LLAMA_3_1_70B,
        ];

      case AiProvider.LOCAL:
        return [
          AiModel.LOCAL_LLAMA_3_1,
          AiModel.LOCAL_MISTRAL,
          AiModel.LOCAL_CODELLAMA,
        ];

      default:
        return [AiModel.GPT_4O];
    }
  }
}
