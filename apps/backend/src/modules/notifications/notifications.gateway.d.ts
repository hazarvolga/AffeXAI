import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    private connectedUsers;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoin(data: {
        userId: string;
    }, client: Socket): void;
    handleLeave(data: {
        userId: string;
    }, client: Socket): void;
    sendNotificationToUser(userId: string, notification: any): Promise<void>;
    sendNotificationToAll(notification: any): Promise<void>;
    sendNotificationToAdmins(notification: any): Promise<void>;
    handleJoinAdmins(client: Socket): void;
    handleSendNotification(data: {
        userId?: string;
        message: string;
        type: string;
    }): Promise<{
        success: boolean;
        notification: {
            id: string;
            message: string;
            type: string;
            timestamp: Date;
        };
    }>;
}
//# sourceMappingURL=notifications.gateway.d.ts.map