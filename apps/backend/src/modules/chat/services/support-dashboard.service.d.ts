import { Repository } from 'typeorm';
import { ChatSession, ChatSessionStatus } from '../entities/chat-session.entity';
import { ChatMessage } from '../entities/chat-message.entity';
import { ChatSupportAssignment } from '../entities/chat-support-assignment.entity';
import { User } from '../../users/entities/user.entity';
import { ChatSupportAssignmentService } from './chat-support-assignment.service';
export interface DashboardStats {
    activeSessions: number;
    waitingSessions: number;
    totalSessionsToday: number;
    avgResponseTime: number;
    avgResolutionTime: number;
    customerSatisfactionScore: number;
    escalationRate: number;
}
export interface SupportAgentStats {
    userId: string;
    userName: string;
    email: string;
    activeSessions: number;
    completedToday: number;
    avgResponseTime: number;
    avgResolutionTime: number;
    customerRating: number;
    isOnline: boolean;
    lastActivity: Date;
    workloadCapacity: number;
}
export interface SessionOverview {
    id: string;
    userId: string;
    customerName: string;
    customerEmail: string;
    status: ChatSessionStatus;
    createdAt: Date;
    lastMessageAt: Date;
    messageCount: number;
    assignedSupport?: {
        userId: string;
        userName: string;
        assignedAt: Date;
    };
    urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
    hasUnreadMessages: boolean;
    waitingTime: number;
    tags: string[];
}
export interface EscalationAlert {
    sessionId: string;
    customerName: string;
    escalatedBy: string;
    escalatedByName: string;
    escalationReason: string;
    urgencyLevel: 'high' | 'critical';
    escalatedAt: Date;
    waitingTime: number;
}
export declare class SupportDashboardService {
    private readonly sessionRepository;
    private readonly messageRepository;
    private readonly assignmentRepository;
    private readonly userRepository;
    private readonly supportAssignmentService;
    private readonly logger;
    constructor(sessionRepository: Repository<ChatSession>, messageRepository: Repository<ChatMessage>, assignmentRepository: Repository<ChatSupportAssignment>, userRepository: Repository<User>, supportAssignmentService: ChatSupportAssignmentService);
    /**
     * Get overall dashboard statistics
     */
    getDashboardStats(dateFrom?: Date, dateTo?: Date): Promise<DashboardStats>;
    /**
     * Get support agent statistics
     */
    getSupportAgentStats(userId?: string): Promise<SupportAgentStats[]>;
    /**
     * Get session overview for dashboard
     */
    getSessionOverview(status?: ChatSessionStatus, assignedTo?: string, limit?: number): Promise<SessionOverview[]>;
    /**
     * Get escalation alerts
     */
    getEscalationAlerts(): Promise<EscalationAlert[]>;
    /**
     * Get real-time metrics for dashboard
     */
    getRealTimeMetrics(): Promise<{
        activeAgents: number;
        queueLength: number;
        avgWaitTime: number;
        responseRate: number;
    }>;
    /**
     * Calculate average response time
     */
    private calculateAverageResponseTime;
    /**
     * Calculate average resolution time
     */
    private calculateAverageResolutionTime;
    /**
     * Calculate escalation rate
     */
    private calculateEscalationRate;
    /**
     * Calculate agent-specific response time
     */
    private calculateAgentResponseTime;
    /**
     * Calculate agent-specific resolution time
     */
    private calculateAgentResolutionTime;
    /**
     * Determine session urgency level
     */
    private determineSessionUrgency;
}
//# sourceMappingURL=support-dashboard.service.d.ts.map