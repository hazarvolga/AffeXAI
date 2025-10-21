"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketNotificationsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
/**
 * Ticket Notifications Gateway
 * Handles real-time notifications for ticket updates via WebSocket
 */
let TicketNotificationsGateway = (() => {
    let _classDecorators = [(0, websockets_1.WebSocketGateway)({
            cors: {
                origin: '*',
                credentials: true,
            },
            namespace: 'tickets',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _server_decorators;
    let _server_initializers = [];
    let _server_extraInitializers = [];
    let _handleSubscribeToTicket_decorators;
    let _handleUnsubscribeFromTicket_decorators;
    var TicketNotificationsGateway = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _server_decorators = [(0, websockets_1.WebSocketServer)()];
            _handleSubscribeToTicket_decorators = [(0, websockets_1.SubscribeMessage)('subscribe:ticket')];
            _handleUnsubscribeFromTicket_decorators = [(0, websockets_1.SubscribeMessage)('unsubscribe:ticket')];
            __esDecorate(this, null, _handleSubscribeToTicket_decorators, { kind: "method", name: "handleSubscribeToTicket", static: false, private: false, access: { has: obj => "handleSubscribeToTicket" in obj, get: obj => obj.handleSubscribeToTicket }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleUnsubscribeFromTicket_decorators, { kind: "method", name: "handleUnsubscribeFromTicket", static: false, private: false, access: { has: obj => "handleUnsubscribeFromTicket" in obj, get: obj => obj.handleUnsubscribeFromTicket }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: obj => "server" in obj, get: obj => obj.server, set: (obj, value) => { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketNotificationsGateway = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        jwtService = __runInitializers(this, _instanceExtraInitializers);
        server = __runInitializers(this, _server_initializers, void 0);
        logger = (__runInitializers(this, _server_extraInitializers), new common_1.Logger(TicketNotificationsGateway.name));
        userSockets = new Map(); // userId -> Set of socket IDs
        constructor(jwtService) {
            this.jwtService = jwtService;
        }
        /**
         * Handle client connection
         */
        async handleConnection(client) {
            try {
                // Extract token from handshake
                const token = client.handshake.auth.token || client.handshake.headers.authorization?.replace('Bearer ', '');
                if (!token) {
                    this.logger.warn(`Client ${client.id} connected without token`);
                    client.disconnect();
                    return;
                }
                // Verify JWT token
                const payload = await this.jwtService.verifyAsync(token);
                const userId = payload.sub || payload.userId;
                if (!userId) {
                    this.logger.warn(`Client ${client.id} has invalid token payload`);
                    client.disconnect();
                    return;
                }
                // Store user-socket mapping
                if (!this.userSockets.has(userId)) {
                    this.userSockets.set(userId, new Set());
                }
                this.userSockets.get(userId).add(client.id);
                // Store userId in socket data for later use
                client.data.userId = userId;
                // Join user-specific room
                client.join(`user:${userId}`);
                this.logger.log(`Client ${client.id} connected for user ${userId}`);
            }
            catch (error) {
                this.logger.error(`Connection error for client ${client.id}: ${error.message}`);
                client.disconnect();
            }
        }
        /**
         * Handle client disconnection
         */
        handleDisconnect(client) {
            const userId = client.data.userId;
            if (userId) {
                const sockets = this.userSockets.get(userId);
                if (sockets) {
                    sockets.delete(client.id);
                    if (sockets.size === 0) {
                        this.userSockets.delete(userId);
                    }
                }
                this.logger.log(`Client ${client.id} disconnected for user ${userId}`);
            }
        }
        /**
         * Subscribe to ticket updates
         */
        handleSubscribeToTicket(client, ticketId) {
            client.join(`ticket:${ticketId}`);
            this.logger.log(`Client ${client.id} subscribed to ticket ${ticketId}`);
            return { success: true, ticketId };
        }
        /**
         * Unsubscribe from ticket updates
         */
        handleUnsubscribeFromTicket(client, ticketId) {
            client.leave(`ticket:${ticketId}`);
            this.logger.log(`Client ${client.id} unsubscribed from ticket ${ticketId}`);
            return { success: true, ticketId };
        }
        /**
         * Emit ticket created notification
         */
        emitTicketCreated(ticketId, userId, ticket) {
            this.server.to(`user:${userId}`).emit('ticket:created', {
                ticketId,
                ticket,
                timestamp: new Date(),
            });
            this.logger.log(`Emitted ticket:created for ticket ${ticketId} to user ${userId}`);
        }
        /**
         * Emit ticket assigned notification
         */
        emitTicketAssigned(ticketId, assignedToId, ticket) {
            this.server.to(`user:${assignedToId}`).emit('ticket:assigned', {
                ticketId,
                ticket,
                timestamp: new Date(),
            });
            this.logger.log(`Emitted ticket:assigned for ticket ${ticketId} to user ${assignedToId}`);
        }
        /**
         * Emit new message notification
         */
        emitNewMessage(ticketId, message, recipientUserIds) {
            // Emit to ticket room
            this.server.to(`ticket:${ticketId}`).emit('ticket:message', {
                ticketId,
                message,
                timestamp: new Date(),
            });
            // Emit to specific users
            recipientUserIds.forEach((userId) => {
                this.server.to(`user:${userId}`).emit('ticket:message', {
                    ticketId,
                    message,
                    timestamp: new Date(),
                });
            });
            this.logger.log(`Emitted ticket:message for ticket ${ticketId}`);
        }
        /**
         * Emit ticket status changed notification
         */
        emitStatusChanged(ticketId, oldStatus, newStatus, userIds) {
            const payload = {
                ticketId,
                oldStatus,
                newStatus,
                timestamp: new Date(),
            };
            // Emit to ticket room
            this.server.to(`ticket:${ticketId}`).emit('ticket:status_changed', payload);
            // Emit to specific users
            userIds.forEach((userId) => {
                this.server.to(`user:${userId}`).emit('ticket:status_changed', payload);
            });
            this.logger.log(`Emitted ticket:status_changed for ticket ${ticketId}`);
        }
        /**
         * Emit SLA breach warning
         */
        emitSLABreachWarning(ticketId, assignedToId, ticket) {
            this.server.to(`user:${assignedToId}`).emit('ticket:sla_warning', {
                ticketId,
                ticket,
                timestamp: new Date(),
            });
            this.logger.log(`Emitted ticket:sla_warning for ticket ${ticketId} to user ${assignedToId}`);
        }
        /**
         * Emit SLA breach alert
         */
        emitSLABreach(ticketId, userIds, ticket) {
            const payload = {
                ticketId,
                ticket,
                timestamp: new Date(),
            };
            userIds.forEach((userId) => {
                this.server.to(`user:${userId}`).emit('ticket:sla_breach', payload);
            });
            this.logger.log(`Emitted ticket:sla_breach for ticket ${ticketId}`);
        }
        /**
         * Emit ticket escalated notification
         */
        emitTicketEscalated(ticketId, escalatedToIds, ticket) {
            const payload = {
                ticketId,
                ticket,
                timestamp: new Date(),
            };
            escalatedToIds.forEach((userId) => {
                this.server.to(`user:${userId}`).emit('ticket:escalated', payload);
            });
            this.logger.log(`Emitted ticket:escalated for ticket ${ticketId}`);
        }
        /**
         * Emit message edited notification
         */
        emitMessageEdited(ticketId, messageId, userIds) {
            const payload = {
                ticketId,
                messageId,
                timestamp: new Date(),
            };
            // Emit to ticket room
            this.server.to(`ticket:${ticketId}`).emit('ticket:message_edited', payload);
            // Emit to specific users
            userIds.forEach((userId) => {
                this.server.to(`user:${userId}`).emit('ticket:message_edited', payload);
            });
            this.logger.log(`Emitted ticket:message_edited for message ${messageId}`);
        }
        /**
         * Emit message deleted notification
         */
        emitMessageDeleted(ticketId, messageId, userIds) {
            const payload = {
                ticketId,
                messageId,
                timestamp: new Date(),
            };
            // Emit to ticket room
            this.server.to(`ticket:${ticketId}`).emit('ticket:message_deleted', payload);
            // Emit to specific users
            userIds.forEach((userId) => {
                this.server.to(`user:${userId}`).emit('ticket:message_deleted', payload);
            });
            this.logger.log(`Emitted ticket:message_deleted for message ${messageId}`);
        }
        /**
         * Get online users count
         */
        getOnlineUsersCount() {
            return this.userSockets.size;
        }
        /**
         * Check if user is online
         */
        isUserOnline(userId) {
            return this.userSockets.has(userId);
        }
        /**
         * Get user's active socket count
         */
        getUserSocketCount(userId) {
            return this.userSockets.get(userId)?.size || 0;
        }
    };
    return TicketNotificationsGateway = _classThis;
})();
exports.TicketNotificationsGateway = TicketNotificationsGateway;
//# sourceMappingURL=ticket-notifications.gateway.js.map