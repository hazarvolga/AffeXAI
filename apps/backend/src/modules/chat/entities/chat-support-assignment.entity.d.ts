import { BaseEntity } from '../../../database/entities/base.entity';
import { ChatSession } from './chat-session.entity';
import { User } from '../../users/entities/user.entity';
export declare enum AssignmentType {
    MANUAL = "manual",
    AUTO = "auto",
    ESCALATED = "escalated"
}
export declare enum AssignmentStatus {
    ACTIVE = "active",
    COMPLETED = "completed",
    TRANSFERRED = "transferred"
}
export declare class ChatSupportAssignment extends BaseEntity {
    sessionId: string;
    supportUserId: string;
    assignedBy: string;
    assignmentType: AssignmentType;
    status: AssignmentStatus;
    assignedAt: Date;
    completedAt: Date;
    notes: string;
    session: ChatSession;
    supportUser: User;
    assignedByUser: User;
    get isActive(): boolean;
    get isCompleted(): boolean;
    get duration(): number | null;
    get durationInMinutes(): number | null;
    get wasEscalated(): boolean;
}
//# sourceMappingURL=chat-support-assignment.entity.d.ts.map