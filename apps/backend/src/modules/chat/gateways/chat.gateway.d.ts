import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatSessionService } from '../services/chat-session.service';
import { ChatMessageService } from '../services/chat-message.service';
import { ChatMessageType } from '../entities/chat-message.entity';
import { GeneralCommunicationAiService } from '../services/general-communication-ai.service';
export interface SendMessageData {
    sessionId: string;
    content: string;
    messageType?: ChatMessageType;
    metadata?: any;
}
export interface FileUploadData {
    sessionId: string;
    filename: string;
    fileType: string;
    fileSize: number;
    fileData: string;
}
export interface UrlProcessData {
    sessionId: string;
    url: string;
}
export interface TypingIndicatorData {
    sessionId: string;
    userId: string;
    userName: string;
    isTyping: boolean;
}
export interface FileProcessingStatus {
    sessionId: string;
    documentId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress?: number;
    error?: string;
}
export interface UrlProcessingStatus {
    sessionId: string;
    url: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    title?: string;
    error?: string;
}
export interface SupportJoinedData {
    sessionId: string;
    supportUserId: string;
    supportUserName: string;
}
export interface SupportLeftData {
    sessionId: string;
    supportUserId: string;
    supportUserName: string;
}
export interface SupportAssignmentData {
    sessionId: string;
    supportUserId: string;
    assignedBy?: string;
    assignmentType: 'manual' | 'auto' | 'escalated';
    notes?: string;
}
export interface SupportTransferData {
    sessionId: string;
    fromSupportUserId: string;
    toSupportUserId: string;
    transferredBy: string;
    notes?: string;
}
export interface SupportEscalationData {
    sessionId: string;
    escalatedBy: string;
    escalatedTo: string;
    notes?: string;
}
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    private readonly chatSessionService;
    private readonly chatMessageService;
    private readonly generalCommunicationAiService;
    server: Server;
    private readonly logger;
    private connectedUsers;
    private typingUsers;
    private heartbeatIntervals;
    constructor(jwtService: JwtService, chatSessionService: ChatSessionService, chatMessageService: ChatMessageService, generalCommunicationAiService: GeneralCommunicationAiService);
    afterInit(server: Server): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleJoinSession(client: Socket, data: {
        sessionId: string;
    }): Promise<void>;
    handleLeaveSession(client: Socket, data: {
        sessionId: string;
    }): Promise<void>;
    handleSendMessage(client: Socket, data: SendMessageData): Promise<void>;
    handleTypingStart(client: Socket, data: {
        sessionId: string;
    }): Promise<void>;
    handleTypingStop(client: Socket, data: {
        sessionId: string;
    }): Promise<void>;
    handleFileUpload(client: Socket, data: FileUploadData): Promise<void>;
    handleUrlProcess(client: Socket, data: UrlProcessData): Promise<void>;
    handleRequestSupport(client: Socket, data: {
        sessionId: string;
        notes?: string;
    }): Promise<void>;
    handleJoinSupport(client: Socket, data: {
        sessionId: string;
    }): Promise<void>;
    handleLeaveSupport(client: Socket, data: {
        sessionId: string;
    }): Promise<void>;
    /**
     * Broadcast AI response to session
     */
    broadcastAIResponse(sessionId: string, message: any): Promise<void>;
    /**
     * Broadcast AI response start
     */
    broadcastAIResponseStart(sessionId: string): Promise<void>;
    /**
     * Broadcast AI response chunk (for streaming)
     */
    broadcastAIResponseChunk(sessionId: string, chunk: string): Promise<void>;
    /**
     * Broadcast AI response complete
     */
    broadcastAIResponseComplete(sessionId: string, message: any): Promise<void>;
    /**
     * Broadcast file processing status
     */
    broadcastFileProcessingStatus(status: FileProcessingStatus): Promise<void>;
    /**
     * Emit file processing status for a specific session
     */
    emitFileProcessingStatus(sessionId: string, data: {
        documentId: string;
        filename: string;
        status: string;
        fileSize: number;
        progress?: number;
        error?: string;
    }): Promise<void>;
    /**
     * Broadcast URL processing status
     */
    broadcastUrlProcessingStatus(status: UrlProcessingStatus): Promise<void>;
    /**
     * Broadcast support team joined
     */
    broadcastSupportJoined(data: SupportJoinedData): Promise<void>;
    /**
     * Broadcast support team left
     */
    broadcastSupportLeft(data: SupportLeftData): Promise<void>;
    /**
     * Broadcast session update
     */
    broadcastSessionUpdate(sessionId: string, session: any): Promise<void>;
    /**
     * Broadcast support assignment notification
     */
    broadcastSupportAssignment(data: SupportAssignmentData): Promise<void>;
    /**
     * Broadcast support transfer notification
     */
    broadcastSupportTransfer(data: SupportTransferData): Promise<void>;
    /**
     * Broadcast support escalation notification
     */
    broadcastSupportEscalation(data: SupportEscalationData): Promise<void>;
    /**
     * Send notification to specific user
     */
    sendUserNotification(userId: string, notification: any): Promise<void>;
    /**
     * Send notification to users with specific roles
     */
    sendRoleNotification(roles: string[], notification: any): Promise<void>;
    private addToTyping;
    private removeFromTyping;
    /**
     * Get connected users count for a session
     */
    getSessionUserCount(sessionId: string): number;
    /**
     * Get all connected users
     */
    getConnectedUsersCount(): number;
    handleHeartbeat(client: Socket, data: {
        timestamp: string;
    }): Promise<void>;
    handleGetSessionInfo(client: Socket, data: {
        sessionId: string;
    }): Promise<void>;
    handlePing(client: Socket, data: {
        timestamp: string;
    }): Promise<void>;
    /**
     * Set up heartbeat monitoring for a client
     */
    private setupHeartbeat;
    /**
     * Broadcast connection status to session participants
     */
    broadcastConnectionStatus(sessionId: string, userId: string, status: 'online' | 'offline'): Promise<void>;
    /**
     * Get session statistics
     */
    getSessionStats(sessionId: string): {
        participantCount: number;
        typingUserCount: number;
        typingUsers: string[];
    };
    /**
     * Cleanup stale connections
     */
    private cleanupStaleConnections;
    /**
     * Initialize cleanup interval
     */
    private initializeCleanup;
    /**
     * Handle general communication AI response
     */
    private handleGeneralCommunicationResponse;
    handleGetConversationStarters(client: Socket, data: {
        language?: string;
    }): Promise<void>;
    handleEscalateToSupport(client: Socket, data: {
        sessionId: string;
        reason?: string;
        notes?: string;
    }): Promise<void>;
    handleGetSuggestedTopics(client: Socket, data: {
        limit?: number;
    }): Promise<void>;
}
//# sourceMappingURL=chat.gateway.d.ts.map