import { AssignmentType } from '../entities/chat-support-assignment.entity';
export declare class CreateSupportAssignmentDto {
    sessionId: string;
    supportUserId: string;
    assignedBy?: string;
    assignmentType?: AssignmentType;
    notes?: string;
}
export declare class TransferSupportAssignmentDto {
    sessionId: string;
    fromSupportUserId: string;
    toSupportUserId: string;
    transferredBy: string;
    notes?: string;
}
export declare class EscalateSupportAssignmentDto {
    sessionId: string;
    escalatedBy: string;
    notes?: string;
}
export declare class CompleteSupportAssignmentDto {
    sessionId: string;
    supportUserId: string;
    notes?: string;
}
export declare class SupportAssignmentQueryDto {
    supportUserId?: string;
    sessionId?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
}
export declare class SupportTeamAvailabilityResponseDto {
    userId: string;
    userName: string;
    email: string;
    isOnline: boolean;
    activeAssignments: number;
    maxAssignments: number;
    isAvailable: boolean;
    lastActivity?: Date;
}
export declare class AssignmentStatsResponseDto {
    totalAssignments: number;
    activeAssignments: number;
    completedAssignments: number;
    transferredAssignments: number;
    escalatedAssignments: number;
    autoAssignments: number;
    avgResolutionTimeMinutes: number;
}
export declare class AssignmentNotificationDto {
    type: 'assignment' | 'transfer' | 'escalation' | 'completion';
    sessionId: string;
    supportUserId: string;
    supportUserName: string;
    assignedBy?: string;
    assignedByName?: string;
    notes?: string;
    timestamp: Date;
}
//# sourceMappingURL=support-assignment.dto.d.ts.map