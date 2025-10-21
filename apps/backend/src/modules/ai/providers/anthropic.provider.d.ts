import { IAiProvider, AiGenerationOptions, AiGenerationResult } from '../interfaces/ai-provider.interface';
export declare class AnthropicProvider implements IAiProvider {
    private readonly logger;
    private clients;
    readonly name: "anthropic";
    readonly supportedModels: string[];
    /**
     * Get or create Anthropic client for specific API key
     */
    private getClient;
    generateCompletion(apiKey: string, prompt: string, options: AiGenerationOptions): Promise<AiGenerationResult>;
    testConnection(apiKey: string, model: string): Promise<boolean>;
    /**
     * Estimate cost for Anthropic tokens
     * Prices as of 2025 (USD per 1M tokens)
     */
    estimateCost(tokens: number, model: string): number;
    /**
     * Clear cached client for specific API key
     */
    clearCache(apiKey?: string): void;
}
//# sourceMappingURL=anthropic.provider.d.ts.map