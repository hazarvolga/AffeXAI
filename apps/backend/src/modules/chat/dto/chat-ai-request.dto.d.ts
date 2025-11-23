import { AiModel, AiProvider } from '../../settings/dto/ai-settings.dto';
export declare class ChatContextOptionsDto {
    maxSources?: number;
    minRelevanceScore?: number;
    includeKnowledgeBase?: boolean;
    includeFaqLearning?: boolean;
    includeDocuments?: boolean;
}
export declare class ChatAiRequestDto {
    prompt: string;
    sessionId: string;
    messageId?: string;
    includeContext?: boolean;
    contextOptions?: ChatContextOptionsDto;
    streamResponse?: boolean;
    model?: AiModel;
    provider?: AiProvider;
    temperature?: number;
    maxTokens?: number;
}
export declare class ChatAiTestRequestDto {
    testMessage?: string;
    model?: AiModel;
    provider?: AiProvider;
}
//# sourceMappingURL=chat-ai-request.dto.d.ts.map