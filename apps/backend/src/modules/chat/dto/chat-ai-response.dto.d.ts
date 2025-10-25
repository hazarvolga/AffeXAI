import { AiModel, AiProvider } from '../../settings/dto/ai-settings.dto';
import { ContextSourceType } from '../entities/chat-context-source.entity';
export declare class ContextSourceResponseDto {
    id: string;
    type: ContextSourceType;
    title: string;
    content: string;
    relevanceScore: number;
    url?: string;
    sourceId?: string;
    metadata: Record<string, any>;
}
export declare class ContextResultResponseDto {
    sources: ContextSourceResponseDto[];
    totalRelevanceScore: number;
    searchQuery: string;
    processingTime: number;
}
export declare class ChatAiResponseDto {
    content: string;
    model: string;
    provider: AiProvider;
    tokensUsed: number;
    finishReason: string;
    contextUsed?: ContextResultResponseDto;
    contextSources?: ContextSourceResponseDto[];
    confidenceScore?: number;
    citations?: string[];
    streamingSupported?: boolean;
}
export declare class StreamingChunkResponseDto {
    content: string;
    isComplete: boolean;
    metadata?: {
        tokensGenerated?: number;
        processingTime?: number;
    };
}
export declare class ChatAiTestResponseDto {
    success: boolean;
    provider: AiProvider;
    model: AiModel;
    streamingSupported: boolean;
    responseTime: number;
    error?: string;
    testResponse?: string;
}
export declare class ChatAiUsageStatsDto {
    totalRequests: number;
    totalTokens: number;
    averageResponseTime: number;
    averageConfidence: number;
    providerUsage: Record<AiProvider, number>;
    modelUsage: Record<AiModel, number>;
    sessionStats?: {
        sessionId: string;
        requestCount: number;
        totalTokens: number;
        averageConfidence: number;
    };
}
//# sourceMappingURL=chat-ai-response.dto.d.ts.map