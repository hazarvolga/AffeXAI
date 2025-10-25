import { Repository } from 'typeorm';
import { ChatSession } from '../entities/chat-session.entity';
import { ChatMessage } from '../entities/chat-message.entity';
import { ChatSupportAssignment } from '../entities/chat-support-assignment.entity';
import { User } from '../../users/entities/user.entity';
import { ChatGateway } from '../gateways/chat.gateway';
import { ChatSupportAssignmentService } from './chat-support-assignment.service';
import { ChatMessageService } from './chat-message.service';
export interface HandoffContext {
    sessionId: string;
    previousMessages: ChatMessage[];
    contextSummary: string;
    customerInfo: {
        userId: string;
        userName: string;
        email: string;
    };
    previousAssignments: ChatSupportAssignment[];
    sessionMetadata: any;
    handoffReason: string;
    urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
}
export interface HandoffNote {
    id: string;
    sessionId: string;
    authorId: string;
    authorName: string;
    content: string;
    isPrivate: boolean;
    createdAt: Date;
    tags?: string[];
}
export declare class ChatHandoffService {
    private readonly sessionRepository;
    private readonly messageRepository;
    private readonly userRepository;
    private readonly chatGateway;
    private readonly supportAssignmentService;
    private readonly chatMessageService;
    private readonly logger;
    constructor(sessionRepository: Repository<ChatSession>, messageRepository: Repository<ChatMessage>, userRepository: Repository<User>, chatGateway: ChatGateway, supportAssignmentService: ChatSupportAssignmentService, chatMessageService: ChatMessageService);
    /**
     * Prepare handoff context for smooth transition
     */
    prepareHandoffContext(sessionId: string): Promise<HandoffContext>;
    /**
     * Execute handoff with context preservation
     */
    executeHandoff(sessionId: string, fromSupportUserId: string, toSupportUserId: string, handoffReason: string, privateNotes?: string, transferredBy?: string): Promise<void>;
    /**
     * Execute escalation with enhanced context
     */
    executeEscalation(sessionId: string, escalatedBy: string, escalationReason: string, urgencyLevel?: 'high' | 'critical', privateNotes?: string): Promise<void>;
    /**
     * Add handoff note (private or public)
     */
    addHandoffNote(sessionId: string, authorId: string, content: string, isPrivate?: boolean, tags?: string[]): Promise<HandoffNote>;
    /**
     * Get handoff notes for a session
     */
    getHandoffNotes(sessionId: string, includePrivate?: boolean): Promise<HandoffNote[]>;
    /**
     * Get session handoff history
     */
    getHandoffHistory(sessionId: string): Promise<{
        transfers: any[];
        escalations: any[];
        notes: HandoffNote[];
    }>;
    /**
     * Generate context summary for handoff
     */
    private generateContextSummary;
    /**
     * Determine urgency level based on session data
     */
    private determineUrgencyLevel;
    /**
     * Send handoff notification to new support agent
     */
    private sendHandoffNotification;
    /**
     * Send escalation notification to manager
     */
    private sendEscalationNotification;
}
//# sourceMappingURL=chat-handoff.service.d.ts.map