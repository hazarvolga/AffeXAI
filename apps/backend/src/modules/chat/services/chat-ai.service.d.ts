import { AiService, AiGenerationOptions, AiGenerationResult } from '../../ai/ai.service';
import { SettingsService } from '../../settings/settings.service';
import { ChatContextEngineService, ContextResult, ContextSource } from './chat-context-engine.service';
import { ChatAiSettingsService } from './chat-ai-settings.service';
import { AiModel, AiProvider } from '../../settings/dto/ai-settings.dto';
export interface ChatAiOptions extends AiGenerationOptions {
    includeContext?: boolean;
    contextOptions?: {
        maxSources?: number;
        minRelevanceScore?: number;
        includeKnowledgeBase?: boolean;
        includeFaqLearning?: boolean;
        includeDocuments?: boolean;
    };
    streamResponse?: boolean;
    sessionId?: string;
    messageId?: string;
}
export interface ChatAiResult extends AiGenerationResult {
    contextUsed?: ContextResult;
    contextSources?: ContextSource[];
    confidenceScore?: number;
    citations?: string[];
    streamingSupported?: boolean;
}
export interface StreamingChunk {
    content: string;
    isComplete: boolean;
    metadata?: {
        tokensGenerated?: number;
        processingTime?: number;
    };
}
export declare class ChatAiService {
    private readonly aiService;
    private readonly settingsService;
    private readonly contextEngine;
    private readonly chatAiSettingsService;
    private readonly logger;
    constructor(aiService: AiService, settingsService: SettingsService, contextEngine: ChatContextEngineService, chatAiSettingsService: ChatAiSettingsService);
    /**
     * Generate AI response with chat context integration
     */
    generateChatResponse(prompt: string, options?: ChatAiOptions): Promise<ChatAiResult>;
    /**
     * Generate streaming AI response with context
     */
    generateStreamingChatResponse(prompt: string, options?: ChatAiOptions): AsyncGenerator<StreamingChunk, ChatAiResult, unknown>;
    /**
     * Build context-aware prompt with sources
     */
    private buildContextAwarePrompt;
    /**
     * Build system prompt based on chat type
     */
    private buildSystemPrompt;
    /**
     * Calculate confidence score based on multiple factors
     */
    private calculateConfidenceScore;
    /**
     * Extract citations from AI response
     */
    private extractCitations;
    /**
     * Check if streaming is supported for provider/model
     */
    private isStreamingSupported;
    /**
     * Generate streaming completion (internal method)
     */
    private generateStreamingCompletion;
    /**
     * OpenAI streaming implementation
     */
    private generateOpenAIStreaming;
    /**
     * Anthropic streaming implementation
     */
    private generateAnthropicStreaming;
    /**
     * Generate AI response with retry logic and failover
     */
    private generateWithRetry;
    /**
     * Test AI configuration for chat
     */
    testChatAiConfiguration(): Promise<{
        success: boolean;
        provider: AiProvider;
        model: AiModel;
        streamingSupported: boolean;
        responseTime: number;
        error?: string;
    }>;
    /**
     * Get AI usage statistics for chat
     */
    getChatAiUsageStats(sessionId?: string): Promise<{
        totalRequests: number;
        totalTokens: number;
        averageResponseTime: number;
        averageConfidence: number;
        providerUsage: Record<AiProvider, number>;
        modelUsage: Record<AiModel, number>;
    }>;
    /**
     * Get provider health status
     */
    getProviderHealthStatus(): Promise<{
        provider: AiProvider;
        isAvailable: boolean;
        failureCount: number;
        lastFailure?: Date;
        nextAvailableAt?: Date;
    }[]>;
    /**
     * Test all configured providers
     */
    testAllProviders(): Promise<{
        provider: AiProvider;
        model: AiModel;
        success: boolean;
        responseTime: number;
        error?: string;
    }[]>;
}
//# sourceMappingURL=chat-ai.service.d.ts.map