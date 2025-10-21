import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
/**
 * Ticket Notifications Gateway
 * Handles real-time notifications for ticket updates via WebSocket
 */
export declare class TicketNotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    server: Server;
    private readonly logger;
    private userSockets;
    constructor(jwtService: JwtService);
    /**
     * Handle client connection
     */
    handleConnection(client: Socket): Promise<void>;
    /**
     * Handle client disconnection
     */
    handleDisconnect(client: Socket): void;
    /**
     * Subscribe to ticket updates
     */
    handleSubscribeToTicket(client: Socket, ticketId: string): {
        success: boolean;
        ticketId: string;
    };
    /**
     * Unsubscribe from ticket updates
     */
    handleUnsubscribeFromTicket(client: Socket, ticketId: string): {
        success: boolean;
        ticketId: string;
    };
    /**
     * Emit ticket created notification
     */
    emitTicketCreated(ticketId: string, userId: string, ticket: any): void;
    /**
     * Emit ticket assigned notification
     */
    emitTicketAssigned(ticketId: string, assignedToId: string, ticket: any): void;
    /**
     * Emit new message notification
     */
    emitNewMessage(ticketId: string, message: any, recipientUserIds: string[]): void;
    /**
     * Emit ticket status changed notification
     */
    emitStatusChanged(ticketId: string, oldStatus: string, newStatus: string, userIds: string[]): void;
    /**
     * Emit SLA breach warning
     */
    emitSLABreachWarning(ticketId: string, assignedToId: string, ticket: any): void;
    /**
     * Emit SLA breach alert
     */
    emitSLABreach(ticketId: string, userIds: string[], ticket: any): void;
    /**
     * Emit ticket escalated notification
     */
    emitTicketEscalated(ticketId: string, escalatedToIds: string[], ticket: any): void;
    /**
     * Emit message edited notification
     */
    emitMessageEdited(ticketId: string, messageId: string, userIds: string[]): void;
    /**
     * Emit message deleted notification
     */
    emitMessageDeleted(ticketId: string, messageId: string, userIds: string[]): void;
    /**
     * Get online users count
     */
    getOnlineUsersCount(): number;
    /**
     * Check if user is online
     */
    isUserOnline(userId: string): boolean;
    /**
     * Get user's active socket count
     */
    getUserSocketCount(userId: string): number;
}
//# sourceMappingURL=ticket-notifications.gateway.d.ts.map