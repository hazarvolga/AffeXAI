import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ChatMessage } from './chat-message.entity';
export declare enum ChatSessionStatus {
    ACTIVE = "active",
    ENDED = "ended",
    TRANSFERRED = "transferred"
}
export declare class ChatSession extends BaseEntity {
    sessionId: string;
    userId: string;
    agentId: string;
    status: ChatSessionStatus;
    startedAt: Date;
    endedAt: Date;
    duration: number;
    satisfactionScore: number;
    feedback: string;
    metadata: {
        userAgent?: string;
        ipAddress?: string;
        referrer?: string;
        tags?: string[];
    };
    user: User;
    agent: User;
    messages: ChatMessage[];
    get messageCount(): number;
    get isResolved(): boolean;
    get hasPositiveFeedback(): boolean;
    get durationSeconds(): number;
    get satisfactionRating(): number;
}
//# sourceMappingURL=chat-session.entity.d.ts.map