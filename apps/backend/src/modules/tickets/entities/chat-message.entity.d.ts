import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ChatSession } from './chat-session.entity';
export declare enum MessageType {
    USER = "user",
    AGENT = "agent",
    SYSTEM = "system",
    BOT = "bot"
}
export declare enum MessageStatus {
    SENT = "sent",
    DELIVERED = "delivered",
    READ = "read",
    FAILED = "failed"
}
export declare class ChatMessage extends BaseEntity {
    sessionId: string;
    senderId: string;
    type: MessageType;
    content: string;
    status: MessageStatus;
    readAt: Date;
    metadata: {
        attachments?: Array<{
            type: string;
            url: string;
            name: string;
            size: number;
        }>;
        mentions?: string[];
        isEdited?: boolean;
        editedAt?: Date;
        replyTo?: string;
        sentiment?: 'positive' | 'negative' | 'neutral';
        confidence?: number;
    };
    isHelpful: boolean;
    helpfulnessScore: number;
    session: ChatSession;
    sender: User;
    get isFromUser(): boolean;
    get isFromAgent(): boolean;
    get isFromBot(): boolean;
    get hasAttachments(): boolean;
    get wordCount(): number;
    get messageType(): MessageType;
    get confidenceScore(): number;
}
//# sourceMappingURL=chat-message.entity.d.ts.map