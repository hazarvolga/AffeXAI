import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', // Configure this appropriately for production
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);
  private connectedUsers = new Map<string, string>(); // userId -> socketId

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    
    // In a real implementation, you would authenticate the user here
    // For now, we'll just log the connection
    client.emit('connected', { message: 'Connected to notification service' });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    
    // Remove user from connected users map
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    this.connectedUsers.set(data.userId, client.id);
    client.join(`user-${data.userId}`);
    this.logger.log(`User ${data.userId} joined room user-${data.userId}`);
    
    client.emit('joined', { message: `Joined room for user ${data.userId}` });
  }

  @SubscribeMessage('leave')
  handleLeave(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    this.connectedUsers.delete(data.userId);
    client.leave(`user-${data.userId}`);
    this.logger.log(`User ${data.userId} left room user-${data.userId}`);
    
    client.emit('left', { message: `Left room for user ${data.userId}` });
  }

  // Method to send notification to a specific user
  async sendNotificationToUser(userId: string, notification: any) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(`user-${userId}`).emit('notification', notification);
      this.logger.log(`Notification sent to user ${userId}`);
    } else {
      this.logger.warn(`User ${userId} is not connected`);
    }
  }

  // Method to send notification to all users
  async sendNotificationToAll(notification: any) {
    this.server.emit('notification', notification);
    this.logger.log('Notification sent to all users');
  }

  // Method to send notification to admins
  async sendNotificationToAdmins(notification: any) {
    this.server.to('admins').emit('admin-notification', notification);
    this.logger.log('Notification sent to admins');
  }

  @SubscribeMessage('join-admins')
  handleJoinAdmins(@ConnectedSocket() client: Socket) {
    client.join('admins');
    this.logger.log(`Client ${client.id} joined admins room`);
    
    client.emit('joined-admins', { message: 'Joined admins room' });
  }

  @SubscribeMessage('send-notification')
  async handleSendNotification(@MessageBody() data: { userId?: string, message: string, type: string }) {
    const notification = {
      id: Date.now().toString(),
      message: data.message,
      type: data.type,
      timestamp: new Date(),
    };

    if (data.userId) {
      await this.sendNotificationToUser(data.userId, notification);
    } else {
      await this.sendNotificationToAll(notification);
    }

    return { success: true, notification };
  }
}
