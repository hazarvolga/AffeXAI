import { Repository } from 'typeorm';
import { ChatSession, ChatSessionType, ChatSessionStatus } from '../entities/chat-session.entity';
import { User } from '../../users/entities/user.entity';
export interface CreateChatSessionDto {
    userId: string;
    sessionType?: ChatSessionType;
    title?: string;
    metadata?: any;
}
export interface UpdateChatSessionDto {
    title?: string;
    status?: ChatSessionStatus;
    sessionType?: ChatSessionType;
    metadata?: any;
}
export interface ChatSessionFilters {
    userId?: string;
    status?: ChatSessionStatus;
    sessionType?: ChatSessionType;
    limit?: number;
    offset?: number;
}
export declare class ChatSessionService {
    private readonly chatSessionRepository;
    private readonly userRepository;
    constructor(chatSessionRepository: Repository<ChatSession>, userRepository: Repository<User>);
    /**
     * Create a new chat session
     */
    createSession(createDto: CreateChatSessionDto): Promise<ChatSession>;
    /**
     * Get a chat session by ID
     */
    getSession(sessionId: string, userId?: string): Promise<ChatSession>;
    /**
     * Get all sessions for a user
     */
    getUserSessions(userId: string, filters?: ChatSessionFilters): Promise<ChatSession[]>;
    /**
     * Update a chat session
     */
    updateSession(sessionId: string, updateDto: UpdateChatSessionDto, userId?: string): Promise<ChatSession>;
    /**
     * Close a chat session
     */
    closeSession(sessionId: string, userId?: string): Promise<ChatSession>;
    /**
     * Get active sessions (for support team dashboard)
     */
    getActiveSessions(filters?: ChatSessionFilters): Promise<ChatSession[]>;
    /**
     * Validate session access for user
     */
    validateSessionAccess(sessionId: string, userId: string): Promise<boolean>;
    /**
     * Update session metadata
     */
    updateSessionMetadata(sessionId: string, metadata: any, userId?: string): Promise<ChatSession>;
    /**
     * Get session statistics
     */
    getSessionStats(userId?: string): Promise<{
        total: number;
        active: number;
        closed: number;
        support: number;
        general: number;
    }>;
}
//# sourceMappingURL=chat-session.service.d.ts.map