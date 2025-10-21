/**
 * AI Provider Interface
 *
 * All AI providers (OpenAI, Anthropic, Google) must implement this interface
 * to ensure consistent behavior across different AI services.
 */
export interface AiGenerationOptions {
    model: string;
    systemPrompt?: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    stream?: boolean;
}
export interface AiGenerationResult {
    content: string;
    tokensUsed: number;
    finishReason: string;
    model: string;
    provider: string;
}
export interface IAiProvider {
    /**
     * Provider name identifier
     */
    readonly name: 'openai' | 'anthropic' | 'google';
    /**
     * List of supported models
     */
    readonly supportedModels: string[];
    /**
     * Generate AI completion
     */
    generateCompletion(apiKey: string, prompt: string, options: AiGenerationOptions): Promise<AiGenerationResult>;
    /**
     * Generate streaming AI completion
     */
    generateStream?(apiKey: string, prompt: string, options: AiGenerationOptions): AsyncIterator<string>;
    /**
     * Test API key connection
     */
    testConnection(apiKey: string, model: string): Promise<boolean>;
    /**
     * Estimate cost for tokens (optional)
     */
    estimateCost?(tokens: number, model: string): number;
}
//# sourceMappingURL=ai-provider.interface.d.ts.map