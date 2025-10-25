export declare enum UrgencyLevel {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    CRITICAL = "critical"
}
export type UrgencyLevelType = 'low' | 'medium' | 'high' | 'critical';
export declare class ExecuteHandoffDto {
    sessionId: string;
    fromSupportUserId: string;
    toSupportUserId: string;
    handoffReason: string;
    privateNotes?: string;
    transferredBy?: string;
}
export declare class ExecuteEscalationDto {
    sessionId: string;
    escalatedBy: string;
    escalationReason: string;
    urgencyLevel?: UrgencyLevel;
    privateNotes?: string;
}
export declare class AddHandoffNoteDto {
    sessionId: string;
    content: string;
    isPrivate?: boolean;
    tags?: string[];
}
export declare class HandoffContextResponseDto {
    sessionId: string;
    previousMessages: any[];
    contextSummary: string;
    customerInfo: {
        userId: string;
        userName: string;
        email: string;
    };
    previousAssignments: any[];
    sessionMetadata: any;
    handoffReason: string;
    urgencyLevel: UrgencyLevel;
}
export declare class HandoffNoteResponseDto {
    id: string;
    sessionId: string;
    authorId: string;
    authorName: string;
    content: string;
    isPrivate: boolean;
    createdAt: Date;
    tags?: string[];
}
export declare class HandoffHistoryResponseDto {
    transfers: any[];
    escalations: any[];
    notes: HandoffNoteResponseDto[];
}
export declare class HandoffNotificationDto {
    type: 'handoff-received' | 'escalation-received' | 'escalation-alert';
    sessionId: string;
    customerInfo: {
        userId: string;
        userName: string;
        email: string;
    };
    contextSummary: string;
    urgencyLevel: UrgencyLevel;
    handoffReason?: string;
    escalationReason?: string;
    messageCount: number;
    timestamp: Date;
}
//# sourceMappingURL=chat-handoff.dto.d.ts.map