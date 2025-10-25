import { Repository } from 'typeorm';
import { ChatSession } from '../entities/chat-session.entity';
import { ChatMessage } from '../entities/chat-message.entity';
import { ChatSupportAssignment } from '../entities/chat-support-assignment.entity';
import { ChatSessionService } from './chat-session.service';
import { ChatMessageService } from './chat-message.service';
import { ChatSupportAssignmentService } from './chat-support-assignment.service';
export interface EscalationRequest {
    sessionId: string;
    userId: string;
    reason: string;
    notes?: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    category?: string;
}
export interface EscalationResult {
    success: boolean;
    session: ChatSession;
    assignment?: ChatSupportAssignment;
    escalationMessage: ChatMessage;
    notificationsSent: string[];
}
export interface EscalationAnalysis {
    shouldEscalate: boolean;
    reason: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category?: string;
    confidence: number;
}
export declare class ChatEscalationService {
    private readonly sessionRepository;
    private readonly messageRepository;
    private readonly chatSessionService;
    private readonly chatMessageService;
    private readonly supportAssignmentService;
    private readonly logger;
    constructor(sessionRepository: Repository<ChatSession>, messageRepository: Repository<ChatMessage>, chatSessionService: ChatSessionService, chatMessageService: ChatMessageService, supportAssignmentService: ChatSupportAssignmentService);
    /**
     * Escalate a general communication session to support
     */
    escalateToSupport(escalationRequest: EscalationRequest): Promise<EscalationResult>;
    /**
     * Analyze if a conversation should be escalated based on content and context
     */
    analyzeEscalationNeed(sessionId: string, recentMessages?: ChatMessage[]): Promise<EscalationAnalysis>;
    /**
     * Get escalation statistics
     */
    getEscalationStatistics(timeframe?: {
        from: Date;
        to: Date;
    }): Promise<{
        totalEscalations: number;
        escalationsByReason: Record<string, number>;
        escalationsByPriority: Record<string, number>;
        averageEscalationTime: number;
        escalationRate: number;
    }>;
    /**
     * Perform escalation analysis on messages
     */
    private performEscalationAnalysis;
    /**
     * Generate escalation message based on reason and priority
     */
    private generateEscalationMessage;
    /**
     * Send escalation notifications to relevant parties
     */
    private sendEscalationNotifications;
    /**
     * Get escalation history for a session
     */
    getSessionEscalationHistory(sessionId: string): Promise<{
        escalations: Array<{
            escalatedAt: Date;
            escalatedBy: string;
            reason: string;
            priority: string;
            category?: string;
            notes?: string;
        }>;
        currentStatus: string;
    }>;
}
//# sourceMappingURL=chat-escalation.service.d.ts.map