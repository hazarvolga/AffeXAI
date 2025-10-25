import { MessageEvent } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { ChatAiService } from '../services/chat-ai.service';
import { ChatAiRequestDto, ChatAiTestRequestDto } from '../dto/chat-ai-request.dto';
import { ChatAiResponseDto, ChatAiTestResponseDto, ChatAiUsageStatsDto } from '../dto/chat-ai-response.dto';
import { Observable } from 'rxjs';
export declare class ChatAiController {
    private readonly chatAiService;
    private readonly logger;
    constructor(chatAiService: ChatAiService);
    generateResponse(request: ChatAiRequestDto, user: User): Promise<ChatAiResponseDto>;
    streamResponse(prompt: string, sessionId: string, messageId?: string, includeContext?: boolean, maxSources?: number, minRelevanceScore?: number, user?: User): Observable<MessageEvent>;
    testConfiguration(request: ChatAiTestRequestDto, user: User): Promise<ChatAiTestResponseDto>;
    getUsageStats(sessionId?: string, user?: User): Promise<ChatAiUsageStatsDto>;
    previewContext(sessionId: string, query: string, maxSources?: number, minRelevanceScore?: number, includeKnowledgeBase?: boolean, includeFaqLearning?: boolean, includeDocuments?: boolean, user?: User): Promise<{
        message: string;
        sessionId: string;
        query: string;
        options: {
            maxSources: number | undefined;
            minRelevanceScore: number | undefined;
            includeKnowledgeBase: boolean | undefined;
            includeFaqLearning: boolean | undefined;
            includeDocuments: boolean | undefined;
        };
    }>;
}
//# sourceMappingURL=chat-ai.controller.d.ts.map