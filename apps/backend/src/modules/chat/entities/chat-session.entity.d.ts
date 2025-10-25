import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ChatMessage } from './chat-message.entity';
import { ChatDocument } from './chat-document.entity';
import { ChatSupportAssignment } from './chat-support-assignment.entity';
export declare enum ChatSessionType {
    SUPPORT = "support",
    GENERAL = "general"
}
export declare enum ChatSessionStatus {
    ACTIVE = "active",
    CLOSED = "closed",
    TRANSFERRED = "transferred"
}
export declare class ChatSession extends BaseEntity {
    userId: string;
    sessionType: ChatSessionType;
    status: ChatSessionStatus;
    title: string;
    metadata: {
        aiProvider?: string;
        modelUsed?: string;
        contextSources?: number;
        messageCount?: number;
        supportAssigned?: boolean;
        customerSatisfaction?: number;
        userAgent?: string;
        ipAddress?: string;
        referrer?: string;
        tags?: string[];
        escalatedFrom?: string;
        escalationReason?: string;
        escalationNotes?: string;
        escalationPriority?: string;
        escalationCategory?: string;
        escalatedAt?: Date;
        escalatedBy?: string;
        originalSessionType?: string;
    };
    closedAt: Date;
    user: User;
    messages: ChatMessage[];
    documents: ChatDocument[];
    supportAssignments: ChatSupportAssignment[];
    get messageCount(): number;
    get isActive(): boolean;
    get isClosed(): boolean;
    get hasSupport(): boolean;
    get currentAssignment(): ChatSupportAssignment | undefined;
}
//# sourceMappingURL=chat-session.entity.d.ts.map