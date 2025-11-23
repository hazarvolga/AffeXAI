import { GeneralCommunicationAiService } from '../services/general-communication-ai.service';
import { GeneralCommunicationContextService } from '../services/general-communication-context.service';
import { ChatSessionService } from '../services/chat-session.service';
import { ChatSessionType } from '../entities/chat-session.entity';
import { ChatEscalationService } from '../services/chat-escalation.service';
export declare class CreateGeneralSessionDto {
    title?: string;
    language?: 'tr' | 'en';
    metadata?: Record<string, any>;
}
export declare class GeneralQueryDto {
    query: string;
    sessionId: string;
    includeContextSources?: boolean;
    maxResponseLength?: number;
    tone?: 'friendly' | 'professional' | 'helpful';
    language?: 'tr' | 'en';
}
export declare class GetSuggestedTopicsDto {
    limit?: number;
}
export declare class GeneralCommunicationController {
    private readonly generalCommunicationAiService;
    private readonly generalContextService;
    private readonly chatSessionService;
    private readonly chatEscalationService;
    private readonly logger;
    constructor(generalCommunicationAiService: GeneralCommunicationAiService, generalContextService: GeneralCommunicationContextService, chatSessionService: ChatSessionService, chatEscalationService: ChatEscalationService);
    /**
     * Create a new general communication session
     */
    createGeneralSession(req: any, createSessionDto: CreateGeneralSessionDto): Promise<{
        session: import("../entities/chat-session.entity").ChatSession;
        conversationStarters: string[];
        suggestedTopics: {
            title: string;
            category: string;
            description: string;
            url?: string;
        }[];
    }>;
    /**
     * Generate AI response for general communication query
     */
    handleGeneralQuery(req: any, queryDto: GeneralQueryDto): Promise<{
        response: string;
        confidence: number;
        responseType: "informational" | "guidance" | "escalation-suggested" | "clarification-needed";
        suggestedActions: string[] | undefined;
        contextSources: import("../services/general-communication-context.service").PlatformInfoSource[] | undefined;
        escalationReason: string | undefined;
        timestamp: Date;
    }>;
    /**
     * Get conversation starters for general communication
     */
    getConversationStarters(language?: string): Promise<{
        starters: string[];
        language: string;
        timestamp: Date;
    }>;
    /**
     * Get suggested topics for general communication
     */
    getSuggestedTopics(getSuggestedTopicsDto: GetSuggestedTopicsDto): Promise<{
        topics: {
            title: string;
            category: string;
            description: string;
            url?: string;
        }[];
        timestamp: Date;
    }>;
    /**
     * Check if a query is platform information related
     */
    analyzeQuery(body: {
        query: string;
    }): Promise<{
        query: string;
        isPlatformInformationQuery: boolean;
        timestamp: Date;
    }>;
    /**
     * Get general communication context for a query
     */
    getGeneralContext(req: any, body: {
        query: string;
        sessionId: string;
        maxSources?: number;
        minRelevanceScore?: number;
        focusOnPlatformInfo?: boolean;
    }): Promise<{
        timestamp: Date;
        sources: import("../services/chat-context-engine.service").ContextSource[];
        totalRelevanceScore: number;
        searchQuery: string;
        processingTime: number;
    }>;
    /**
     * Get general communication session statistics
     */
    getSessionStats(req: any, sessionId: string): Promise<{
        sessionId: string;
        sessionType: ChatSessionType.GENERAL;
        messageCount: number;
        contextStats: {
            totalSources: number;
            sourcesByType: Record<import("../entities/chat-context-source.entity").ContextSourceType, number>;
            averageRelevanceScore: number;
            topCategories: Array<{
                category: string;
                count: number;
            }>;
        };
        sessionDuration: number;
        isActive: boolean;
        timestamp: Date;
    }>;
    /**
     * Escalate general communication session to support
     */
    escalateToSupport(req: any, sessionId: string, body: {
        reason?: string;
        notes?: string;
        priority?: 'low' | 'medium' | 'high' | 'urgent';
        category?: string;
    }): Promise<{
        success: boolean;
        session: import("../entities/chat-session.entity").ChatSession;
        assignment: import("../entities/chat-support-assignment.entity").ChatSupportAssignment | undefined;
        escalationMessage: import("../entities/chat-message.entity").ChatMessage;
        notificationsSent: string[];
        timestamp: Date;
    }>;
    /**
     * Analyze if session needs escalation
     */
    analyzeEscalationNeed(req: any, sessionId: string): Promise<{
        sessionId: string;
        timestamp: Date;
        shouldEscalate: boolean;
        reason: string;
        priority: "low" | "medium" | "high" | "urgent";
        category?: string;
        confidence: number;
    }>;
    /**
     * Get escalation history for a session
     */
    getEscalationHistory(req: any, sessionId: string): Promise<{
        sessionId: string;
        timestamp: Date;
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
    /**
     * Get escalation statistics
     */
    getEscalationStatistics(from?: string, to?: string): Promise<{
        timeframe: {
            from: Date;
            to: Date;
        } | undefined;
        timestamp: Date;
        totalEscalations: number;
        escalationsByReason: Record<string, number>;
        escalationsByPriority: Record<string, number>;
        averageEscalationTime: number;
        escalationRate: number;
    }>;
}
//# sourceMappingURL=general-communication.controller.d.ts.map