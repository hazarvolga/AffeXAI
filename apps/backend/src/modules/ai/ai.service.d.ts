import { AiModel, AiProvider } from '../settings/dto/ai-settings.dto';
export interface AiGenerationOptions {
    model?: AiModel;
    provider?: AiProvider;
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
}
export interface AiGenerationResult {
    content: string;
    model: string;
    provider: AiProvider;
    tokensUsed: number;
    finishReason: string;
}
export declare class AiService {
    private readonly logger;
    private openaiClients;
    private anthropicClients;
    private googleClients;
    /**
     * Detect AI provider from model name
     */
    private detectProvider;
    /**
     * Get or create OpenAI client for specific API key
     */
    private getOpenAiClient;
    /**
     * Get or create Anthropic client for specific API key
     */
    private getAnthropicClient;
    /**
     * Get or create Google AI client for specific API key
     */
    private getGoogleClient;
    /**
     * Get or create OpenRouter client (uses OpenAI SDK with custom base URL)
     */
    private getOpenRouterClient;
    /**
     * Generate text completion using specified AI provider
     *
     * @param apiKey - API key for the provider
     * @param prompt - User prompt
     * @param options - Generation options
     * @returns Generated content with metadata
     */
    generateCompletion(apiKey: string, prompt: string, options?: AiGenerationOptions): Promise<AiGenerationResult>;
    /**
     * Generate completion using OpenAI
     */
    private generateWithOpenAI;
    /**
     * Generate completion using Anthropic Claude
     */
    private generateWithAnthropic;
    /**
     * Generate completion using Google Gemini
     */
    private generateWithGoogle;
    /**
     * Generate completion using OpenRouter
     */
    private generateWithOpenRouter;
    /**
     * Generate completion using Local AI (Ollama)
     */
    private generateWithLocal;
    /**
     * Test API key validity for any provider
     * Makes a minimal API call to verify the key works
     */
    testApiKey(apiKey: string, model?: AiModel, provider?: AiProvider): Promise<boolean>;
    /**
     * Clear cached clients for specific API key or all clients
     * Useful when API keys are updated
     */
    clearClientCache(apiKey?: string): void;
    /**
     * Get supported models for a provider
     */
    getSupportedModels(provider: AiProvider): AiModel[];
}
//# sourceMappingURL=ai.service.d.ts.map