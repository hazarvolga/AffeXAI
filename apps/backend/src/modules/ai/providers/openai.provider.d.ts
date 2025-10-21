import { IAiProvider, AiGenerationOptions, AiGenerationResult } from '../interfaces/ai-provider.interface';
export declare class OpenAIProvider implements IAiProvider {
    private readonly logger;
    private clients;
    readonly name: "openai";
    readonly supportedModels: string[];
    /**
     * Get or create OpenAI client for specific API key
     */
    private getClient;
    generateCompletion(apiKey: string, prompt: string, options: AiGenerationOptions): Promise<AiGenerationResult>;
    testConnection(apiKey: string, model: string): Promise<boolean>;
    /**
     * Estimate cost for OpenAI tokens
     * Prices as of 2025 (USD per 1K tokens)
     */
    estimateCost(tokens: number, model: string): number;
    /**
     * Clear cached client for specific API key
     */
    clearCache(apiKey?: string): void;
}
//# sourceMappingURL=openai.provider.d.ts.map