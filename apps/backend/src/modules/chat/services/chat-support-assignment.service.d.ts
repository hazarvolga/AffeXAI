import { Repository } from 'typeorm';
import { ChatSupportAssignment, AssignmentType } from '../entities/chat-support-assignment.entity';
import { ChatSession } from '../entities/chat-session.entity';
import { User } from '../../users/entities/user.entity';
import { ChatGateway } from '../gateways/chat.gateway';
export interface CreateAssignmentDto {
    sessionId: string;
    supportUserId: string;
    assignedBy?: string;
    assignmentType?: AssignmentType;
    notes?: string;
}
export interface TransferAssignmentDto {
    sessionId: string;
    fromSupportUserId: string;
    toSupportUserId: string;
    transferredBy: string;
    notes?: string;
}
export interface SupportTeamAvailability {
    userId: string;
    userName: string;
    email: string;
    isOnline: boolean;
    activeAssignments: number;
    maxAssignments: number;
    isAvailable: boolean;
    lastActivity?: Date;
}
export interface AssignmentNotification {
    type: 'assignment' | 'transfer' | 'escalation' | 'completion';
    sessionId: string;
    supportUserId: string;
    supportUserName: string;
    assignedBy?: string;
    assignedByName?: string;
    notes?: string;
    timestamp: Date;
}
export declare class ChatSupportAssignmentService {
    private readonly assignmentRepository;
    private readonly sessionRepository;
    private readonly userRepository;
    private readonly chatGateway;
    private readonly logger;
    constructor(assignmentRepository: Repository<ChatSupportAssignment>, sessionRepository: Repository<ChatSession>, userRepository: Repository<User>, chatGateway: ChatGateway);
    /**
     * Create a new support assignment
     */
    createAssignment(createDto: CreateAssignmentDto): Promise<ChatSupportAssignment>;
    /**
     * Transfer assignment from one support user to another
     */
    transferAssignment(transferDto: TransferAssignmentDto): Promise<ChatSupportAssignment>;
    /**
     * Escalate assignment to manager
     */
    escalateAssignment(sessionId: string, escalatedBy: string, notes?: string): Promise<ChatSupportAssignment>;
    /**
     * Complete an assignment
     */
    completeAssignment(sessionId: string, supportUserId: string, notes?: string): Promise<ChatSupportAssignment>;
    /**
     * Get active assignment for a session
     */
    getActiveAssignment(sessionId: string): Promise<ChatSupportAssignment | null>;
    /**
     * Get all assignments for a session
     */
    getSessionAssignments(sessionId: string): Promise<ChatSupportAssignment[]>;
    /**
     * Get active assignments for a support user
     */
    getSupportUserAssignments(supportUserId: string): Promise<ChatSupportAssignment[]>;
    /**
     * Get support team availability
     */
    getSupportTeamAvailability(userIds?: string[]): Promise<SupportTeamAvailability[]>;
    /**
     * Auto-assign support user to session
     */
    autoAssignSupport(sessionId: string): Promise<ChatSupportAssignment | null>;
    /**
     * Send assignment notification via WebSocket
     */
    private sendAssignmentNotification;
    /**
     * Get assignment statistics
     */
    getAssignmentStats(supportUserId?: string, dateFrom?: Date, dateTo?: Date): Promise<{
        totalAssignments: number;
        activeAssignments: number;
        completedAssignments: number;
        transferredAssignments: number;
        escalatedAssignments: number;
        autoAssignments: number;
        avgResolutionTimeMinutes: number;
    }>;
}
//# sourceMappingURL=chat-support-assignment.service.d.ts.map