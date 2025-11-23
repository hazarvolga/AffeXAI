import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ChatSession } from './chat-session.entity';
import { ChatContextSource } from './chat-context-source.entity';
export declare enum ChatMessageSenderType {
    USER = "user",
    AI = "ai",
    SUPPORT = "support"
}
export declare enum ChatMessageType {
    TEXT = "text",
    FILE = "file",
    URL = "url",
    SYSTEM = "system"
}
export declare class ChatMessage extends BaseEntity {
    sessionId: string;
    senderType: ChatMessageSenderType;
    senderId: string;
    content: string;
    messageType: ChatMessageType;
    metadata: {
        aiModel?: string;
        processingTime?: number;
        contextSources?: string[];
        confidence?: number;
        supportUserId?: string;
        supportUserName?: string;
        attachments?: Array<{
            type: string;
            url: string;
            name: string;
            size: number;
        }>;
        urlData?: {
            url: string;
            title: string;
            description: string;
        };
        isEdited?: boolean;
        editedAt?: Date;
        handoffContext?: {
            fromUserId: string;
            toUserId: string;
            reason: string;
            contextSummary: string;
            urgencyLevel: string;
        };
        escalationContext?: {
            escalatedBy: string;
            reason: string;
            urgencyLevel: string;
            contextSummary: string;
            escalatedAt: Date;
        };
        handoffNote?: {
            isPrivate: boolean;
            actualContent: string;
            authorName: string;
            tags: string[];
            noteType: string;
        };
    };
    session: ChatSession;
    sender: User;
    contextSources: ChatContextSource[];
    get isFromUser(): boolean;
    get isFromAI(): boolean;
    get isFromSupport(): boolean;
    get hasContextSources(): boolean;
    get hasAttachments(): boolean;
    get wordCount(): number;
}
//# sourceMappingURL=chat-message.entity.d.ts.map