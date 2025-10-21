import { AiModel } from '../settings/dto/ai-settings.dto';
import { AiProviderFactory, ProviderType } from './providers/provider.factory';
import { AiGenerationOptions, AiGenerationResult } from './interfaces/ai-provider.interface';
export { AiGenerationOptions, AiGenerationResult };
export declare class AiService {
    private readonly providerFactory;
    private readonly logger;
    constructor(providerFactory: AiProviderFactory);
    /**
     * Generate text completion using configured AI provider
     *
     * @param apiKey - AI provider API key
     * @param prompt - User prompt
     * @param options - Generation options (must include model)
     * @returns Generated content with metadata
     */
    generateCompletion(apiKey: string, prompt: string, options: AiGenerationOptions): Promise<AiGenerationResult>;
    /**
     * Test AI provider API key validity
     * Makes a minimal API call to verify the key works
     */
    testApiKey(apiKey: string, model: AiModel | string): Promise<boolean>;
    /**
     * Get all available AI providers and their models
     */
    getAvailableProviders(): {
        type: ProviderType;
        name: string;
        models: string[];
    }[];
    /**
     * Detect which provider to use for a given model
     */
    detectProviderForModel(model: string): ProviderType;
    /**
     * Clear provider client caches
     * Useful when API keys are updated
     */
    clearClientCache(apiKey?: string): void;
}
//# sourceMappingURL=ai.service.d.ts.map