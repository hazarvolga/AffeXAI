import { IAiProvider } from '../interfaces/ai-provider.interface';
import { OpenAIProvider } from './openai.provider';
import { AnthropicProvider } from './anthropic.provider';
export type ProviderType = 'openai' | 'anthropic' | 'google';
export declare class AiProviderFactory {
    private readonly openaiProvider;
    private readonly anthropicProvider;
    private readonly logger;
    private providers;
    constructor(openaiProvider: OpenAIProvider, anthropicProvider: AnthropicProvider);
    /**
     * Get provider by type
     */
    getProvider(providerType: ProviderType): IAiProvider;
    /**
     * Detect provider from model name
     */
    detectProvider(model: string): ProviderType;
    /**
     * Get all available providers
     */
    getAllProviders(): Array<{
        type: ProviderType;
        name: string;
        models: string[];
    }>;
    /**
     * Check if provider is supported
     */
    isProviderSupported(providerType: ProviderType): boolean;
}
//# sourceMappingURL=provider.factory.d.ts.map