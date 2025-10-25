import { ChatSessionStatus } from '../entities/chat-session.entity';
export declare class DashboardStatsResponseDto {
    activeSessions: number;
    waitingSessions: number;
    totalSessionsToday: number;
    avgResponseTime: number;
    avgResolutionTime: number;
    customerSatisfactionScore: number;
    escalationRate: number;
}
export declare class SupportAgentStatsResponseDto {
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
export declare class SessionOverviewResponseDto {
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
export declare class EscalationAlertResponseDto {
    sessionId: string;
    customerName: string;
    escalatedBy: string;
    escalatedByName: string;
    escalationReason: string;
    urgencyLevel: 'high' | 'critical';
    escalatedAt: Date;
    waitingTime: number;
}
export declare class RealTimeMetricsResponseDto {
    activeAgents: number;
    queueLength: number;
    avgWaitTime: number;
    responseRate: number;
}
export declare class DashboardQueryDto {
    dateFrom?: string;
    dateTo?: string;
    agentId?: string;
}
export declare class SessionOverviewQueryDto {
    status?: ChatSessionStatus;
    assignedTo?: string;
    limit?: number;
}
//# sourceMappingURL=support-dashboard.dto.d.ts.map