import { Repository } from 'typeorm';
import { ChatMessage, ChatMessageSenderType, ChatMessageType } from '../entities/chat-message.entity';
import { ChatSession } from '../entities/chat-session.entity';
import { ChatSessionService } from './chat-session.service';
export interface CreateChatMessageDto {
    sessionId: string;
    senderType: ChatMessageSenderType;
    senderId?: string;
    content: string;
    messageType?: ChatMessageType;
    metadata?: any;
}
export interface UpdateChatMessageDto {
    content?: string;
    metadata?: any;
}
export interface MessageFilters {
    sessionId?: string;
    senderType?: ChatMessageSenderType;
    messageType?: ChatMessageType;
    limit?: number;
    offset?: number;
    fromDate?: Date;
    toDate?: Date;
}
export interface PaginationDto {
    limit?: number;
    offset?: number;
    page?: number;
}
export declare class ChatMessageService {
    private readonly chatMessageRepository;
    private readonly chatSessionRepository;
    private readonly chatSessionService;
    constructor(chatMessageRepository: Repository<ChatMessage>, chatSessionRepository: Repository<ChatSession>, chatSessionService: ChatSessionService);
    /**
     * Send a new message
     */
    sendMessage(createDto: CreateChatMessageDto, userId?: string): Promise<ChatMessage>;
    /**
     * Get messages for a session
     */
    getMessages(sessionId: string, pagination?: PaginationDto, userId?: string): Promise<ChatMessage[]>;
    /**
     * Get a specific message
     */
    getMessage(messageId: string, userId?: string): Promise<ChatMessage>;
    /**
     * Update a message (for editing)
     */
    updateMessage(messageId: string, updateDto: UpdateChatMessageDto, userId?: string): Promise<ChatMessage>;
    /**
     * Delete a message
     */
    deleteMessage(messageId: string, userId?: string): Promise<void>;
    /**
     * Get messages with filters
     */
    getMessagesWithFilters(filters: MessageFilters): Promise<ChatMessage[]>;
    /**
     * Get message statistics
     */
    getMessageStats(sessionId?: string): Promise<{
        total: number;
        userMessages: number;
        aiMessages: number;
        supportMessages: number;
        systemMessages: number;
    }>;
    /**
     * Search messages by content
     */
    searchMessages(query: string, sessionId?: string, limit?: number): Promise<ChatMessage[]>;
    /**
     * Get recent messages across all sessions
     */
    getRecentMessages(limit?: number): Promise<ChatMessage[]>;
    /**
     * Private helper methods
     */
    private filterContent;
    private updateSessionMessageCount;
}
//# sourceMappingURL=chat-message.service.d.ts.map