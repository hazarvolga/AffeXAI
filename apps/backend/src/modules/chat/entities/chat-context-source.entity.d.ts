import { BaseEntity } from '../../../database/entities/base.entity';
import { ChatSession } from './chat-session.entity';
import { ChatMessage } from './chat-message.entity';
export declare enum ContextSourceType {
    KNOWLEDGE_BASE = "knowledge_base",
    FAQ_LEARNING = "faq_learning",
    DOCUMENT = "document",
    URL = "url"
}
export declare class ChatContextSource extends BaseEntity {
    sessionId: string;
    messageId: string;
    sourceType: ContextSourceType;
    sourceId: string;
    content: string;
    relevanceScore: number;
    metadata: {
        title?: string;
        url?: string;
        author?: string;
        category?: string;
        tags?: string[];
        extractedAt?: Date;
        confidence?: number;
        matchedKeywords?: string[];
        searchQuery?: string;
        viewCount?: number;
        helpfulCount?: number;
        usageCount?: number;
        fileType?: string;
        fileSize?: number;
        uploadedAt?: Date;
        processingStatus?: string;
        fullContent?: string;
        answer?: string;
        keywords?: string[];
        source?: string;
        status?: string;
        publishedAt?: Date;
        summary?: string;
    };
    session: ChatSession;
    message: ChatMessage;
    get isHighRelevance(): boolean;
    get isMediumRelevance(): boolean;
    get isLowRelevance(): boolean;
    get sourceDisplayName(): string;
}
//# sourceMappingURL=chat-context-source.entity.d.ts.map