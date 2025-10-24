import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChatSessionService } from '../services/chat-session.service';
import { ChatMessageService } from '../services/chat-message.service';
import { ChatMessageSenderType, ChatMessageType } from '../entities/chat-message.entity';

// WebSocket event interfaces
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
  fileData: string; // base64 encoded
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

@Injectable()
@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private connectedUsers = new Map<string, { socket: Socket; userId: string; sessionId?: string }>();
  private typingUsers = new Map<string, Set<string>>(); // sessionId -> Set of userIds

  constructor(
    private readonly jwtService: JwtService,
    private readonly chatSessionService: ChatSessionService,
    private readonly chatMessageService: ChatMessageService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('Chat WebSocket Gateway initialized');
  }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.replace('Bearer ', '');
      
      if (!token) {
        this.logger.warn(`Client ${client.id} connected without token`);
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token);
      const userId = payload.sub || payload.userId;

      if (!userId) {
        this.logger.warn(`Invalid token for client ${client.id}`);
        client.disconnect();
        return;
      }

      this.connectedUsers.set(client.id, { socket: client, userId });
      client.data.userId = userId;

      this.logger.log(`User ${userId} connected with socket ${client.id}`);
      
      // Emit connection success
      client.emit('connection-established', { userId, socketId: client.id });

    } catch (error) {
      this.logger.error(`Authentication failed for client ${client.id}:`, error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const connection = this.connectedUsers.get(client.id);
    if (connection) {
      const { userId, sessionId } = connection;
      
      // Remove from typing indicators
      if (sessionId) {
        this.removeFromTyping(sessionId, userId);
      }

      this.connectedUsers.delete(client.id);
      this.logger.log(`User ${userId} disconnected (socket ${client.id})`);
    }
  }

  @SubscribeMessage('join-session')
  async handleJoinSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string }
  ) {
    try {
      const userId = client.data.userId;
      const { sessionId } = data;

      // Validate session access
      const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
      if (!hasAccess) {
        client.emit('error', { message: 'Access denied to session' });
        return;
      }

      // Join the session room
      await client.join(sessionId);
      
      // Update connection info
      const connection = this.connectedUsers.get(client.id);
      if (connection) {
        connection.sessionId = sessionId;
      }

      // Notify others in the session
      client.to(sessionId).emit('user-joined', { userId, sessionId });
      
      // Confirm join to the user
      client.emit('session-joined', { sessionId });

      this.logger.log(`User ${userId} joined session ${sessionId}`);

    } catch (error) {
      this.logger.error('Error joining session:', error);
      client.emit('error', { message: 'Failed to join session' });
    }
  }

  @SubscribeMessage('leave-session')
  async handleLeaveSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string }
  ) {
    try {
      const userId = client.data.userId;
      const { sessionId } = data;

      // Leave the session room
      await client.leave(sessionId);
      
      // Remove from typing indicators
      this.removeFromTyping(sessionId, userId);

      // Update connection info
      const connection = this.connectedUsers.get(client.id);
      if (connection) {
        connection.sessionId = undefined;
      }

      // Notify others in the session
      client.to(sessionId).emit('user-left', { userId, sessionId });

      this.logger.log(`User ${userId} left session ${sessionId}`);

    } catch (error) {
      this.logger.error('Error leaving session:', error);
    }
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: SendMessageData
  ) {
    try {
      const userId = client.data.userId;
      const { sessionId, content, messageType, metadata } = data;

      // Send the message
      const message = await this.chatMessageService.sendMessage({
        sessionId,
        senderType: ChatMessageSenderType.USER,
        senderId: userId,
        content,
        messageType: messageType || ChatMessageType.TEXT,
        metadata
      }, userId);

      // Broadcast to all users in the session
      this.server.to(sessionId).emit('message-received', message);

      this.logger.log(`Message sent in session ${sessionId} by user ${userId}`);

    } catch (error) {
      this.logger.error('Error sending message:', error);
      client.emit('error', { message: 'Failed to send message' });
    }
  }

  @SubscribeMessage('typing-start')
  async handleTypingStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string }
  ) {
    try {
      const userId = client.data.userId;
      const { sessionId } = data;

      this.addToTyping(sessionId, userId);

      // Broadcast typing indicator to others in the session
      client.to(sessionId).emit('typing-indicator', {
        sessionId,
        userId,
        isTyping: true
      });

    } catch (error) {
      this.logger.error('Error handling typing start:', error);
    }
  }

  @SubscribeMessage('typing-stop')
  async handleTypingStop(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string }
  ) {
    try {
      const userId = client.data.userId;
      const { sessionId } = data;

      this.removeFromTyping(sessionId, userId);

      // Broadcast typing stop to others in the session
      client.to(sessionId).emit('typing-indicator', {
        sessionId,
        userId,
        isTyping: false
      });

    } catch (error) {
      this.logger.error('Error handling typing stop:', error);
    }
  }

  @SubscribeMessage('upload-file')
  async handleFileUpload(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: FileUploadData
  ) {
    try {
      const userId = client.data.userId;
      const { sessionId, filename, fileType, fileSize, fileData } = data;

      // Validate session access
      const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
      if (!hasAccess) {
        client.emit('error', { message: 'Access denied to session' });
        return;
      }

      // Emit processing status
      this.server.to(sessionId).emit('file-processing-status', {
        sessionId,
        documentId: 'temp-id', // Will be replaced with actual document ID
        status: 'pending',
        filename
      });

      // TODO: Implement actual file processing in document processor service
      // For now, just acknowledge the upload
      client.emit('file-upload-acknowledged', {
        sessionId,
        filename,
        status: 'received'
      });

      this.logger.log(`File upload initiated in session ${sessionId}: ${filename}`);

    } catch (error) {
      this.logger.error('Error handling file upload:', error);
      client.emit('error', { message: 'Failed to process file upload' });
    }
  }

  @SubscribeMessage('process-url')
  async handleUrlProcess(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: UrlProcessData
  ) {
    try {
      const userId = client.data.userId;
      const { sessionId, url } = data;

      // Validate session access
      const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
      if (!hasAccess) {
        client.emit('error', { message: 'Access denied to session' });
        return;
      }

      // Emit processing status
      this.server.to(sessionId).emit('url-processing-status', {
        sessionId,
        url,
        status: 'pending'
      });

      // TODO: Implement actual URL processing in URL processor service
      // For now, just acknowledge the request
      client.emit('url-process-acknowledged', {
        sessionId,
        url,
        status: 'received'
      });

      this.logger.log(`URL processing initiated in session ${sessionId}: ${url}`);

    } catch (error) {
      this.logger.error('Error handling URL processing:', error);
      client.emit('error', { message: 'Failed to process URL' });
    }
  }

  @SubscribeMessage('request-support')
  async handleRequestSupport(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; notes?: string }
  ) {
    try {
      const userId = client.data.userId;
      const { sessionId, notes } = data;

      // Validate session access
      const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
      if (!hasAccess) {
        client.emit('error', { message: 'Access denied to session' });
        return;
      }

      // Emit support request to managers/admins
      this.server.emit('support-requested', {
        sessionId,
        userId,
        notes,
        timestamp: new Date(),
      });

      // Acknowledge the request
      client.emit('support-request-acknowledged', { sessionId });

      this.logger.log(`Support requested for session ${sessionId} by user ${userId}`);

    } catch (error) {
      this.logger.error('Error handling support request:', error);
      client.emit('error', { message: 'Failed to request support' });
    }
  }

  @SubscribeMessage('join-support')
  async handleJoinSupport(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string }
  ) {
    try {
      const userId = client.data.userId;
      const { sessionId } = data;

      // TODO: Validate user has support role
      // For now, assume validation is done at controller level

      // Join the session as support
      await client.join(sessionId);

      // Notify session participants
      client.to(sessionId).emit('support-joined', {
        sessionId,
        supportUserId: userId,
        supportUserName: 'Support Agent', // TODO: Get actual user name
      });

      this.logger.log(`Support user ${userId} joined session ${sessionId}`);

    } catch (error) {
      this.logger.error('Error handling support join:', error);
      client.emit('error', { message: 'Failed to join as support' });
    }
  }

  @SubscribeMessage('leave-support')
  async handleLeaveSupport(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string }
  ) {
    try {
      const userId = client.data.userId;
      const { sessionId } = data;

      // Leave the session
      await client.leave(sessionId);

      // Notify session participants
      client.to(sessionId).emit('support-left', {
        sessionId,
        supportUserId: userId,
        supportUserName: 'Support Agent', // TODO: Get actual user name
      });

      this.logger.log(`Support user ${userId} left session ${sessionId}`);

    } catch (error) {
      this.logger.error('Error handling support leave:', error);
    }
  }

  // Public methods for other services to emit events

  /**
   * Broadcast AI response to session
   */
  async broadcastAIResponse(sessionId: string, message: any) {
    this.server.to(sessionId).emit('message-received', message);
  }

  /**
   * Broadcast AI response start
   */
  async broadcastAIResponseStart(sessionId: string) {
    this.server.to(sessionId).emit('ai-response-start', { sessionId });
  }

  /**
   * Broadcast AI response chunk (for streaming)
   */
  async broadcastAIResponseChunk(sessionId: string, chunk: string) {
    this.server.to(sessionId).emit('ai-response-chunk', { sessionId, chunk });
  }

  /**
   * Broadcast AI response complete
   */
  async broadcastAIResponseComplete(sessionId: string, message: any) {
    this.server.to(sessionId).emit('ai-response-complete', message);
  }

  /**
   * Broadcast file processing status
   */
  async broadcastFileProcessingStatus(status: FileProcessingStatus) {
    this.server.to(status.sessionId).emit('file-processing-status', status);
  }

  /**
   * Emit file processing status for a specific session
   */
  async emitFileProcessingStatus(sessionId: string, data: {
    documentId: string;
    filename: string;
    status: string;
    fileSize: number;
    progress?: number;
    error?: string;
  }) {
    this.server.to(sessionId).emit('file-processing-status', {
      sessionId,
      ...data
    });
  }

  /**
   * Broadcast URL processing status
   */
  async broadcastUrlProcessingStatus(status: UrlProcessingStatus) {
    this.server.to(status.sessionId).emit('url-processing-status', status);
  }

  /**
   * Broadcast support team joined
   */
  async broadcastSupportJoined(data: SupportJoinedData) {
    this.server.to(data.sessionId).emit('support-joined', data);
  }

  /**
   * Broadcast support team left
   */
  async broadcastSupportLeft(data: SupportLeftData) {
    this.server.to(data.sessionId).emit('support-left', data);
  }

  /**
   * Broadcast session update
   */
  async broadcastSessionUpdate(sessionId: string, session: any) {
    this.server.to(sessionId).emit('session-updated', session);
  }

  /**
   * Broadcast support assignment notification
   */
  async broadcastSupportAssignment(data: SupportAssignmentData) {
    this.server.to(data.sessionId).emit('support-assigned', data);
  }

  /**
   * Broadcast support transfer notification
   */
  async broadcastSupportTransfer(data: SupportTransferData) {
    this.server.to(data.sessionId).emit('support-transferred', data);
  }

  /**
   * Broadcast support escalation notification
   */
  async broadcastSupportEscalation(data: SupportEscalationData) {
    this.server.to(data.sessionId).emit('support-escalated', data);
    
    // Also notify managers/admins
    this.server.emit('escalation-alert', data);
  }

  /**
   * Send notification to specific user
   */
  async sendUserNotification(userId: string, notification: any) {
    const userSockets = await this.server.fetchSockets();
    const userSocket = userSockets.find(socket => socket.data.userId === userId);
    
    if (userSocket) {
      userSocket.emit('notification', notification);
    }
  }

  /**
   * Send notification to users with specific roles
   */
  async sendRoleNotification(roles: string[], notification: any) {
    const sockets = await this.server.fetchSockets();
    
    sockets.forEach(socket => {
      // TODO: Check user roles from socket data
      // For now, send to all connected users
      socket.emit('role-notification', notification);
    });
  }

  // Private helper methods

  private addToTyping(sessionId: string, userId: string) {
    if (!this.typingUsers.has(sessionId)) {
      this.typingUsers.set(sessionId, new Set());
    }
    this.typingUsers.get(sessionId)!.add(userId);
  }

  private removeFromTyping(sessionId: string, userId: string) {
    const typingInSession = this.typingUsers.get(sessionId);
    if (typingInSession) {
      typingInSession.delete(userId);
      if (typingInSession.size === 0) {
        this.typingUsers.delete(sessionId);
      }
    }
  }

  /**
   * Get connected users count for a session
   */
  getSessionUserCount(sessionId: string): number {
    return this.server.sockets.adapter.rooms.get(sessionId)?.size || 0;
  }

  /**
   * Get all connected users
   */
  getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }
}