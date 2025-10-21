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
exports.NotificationsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
let NotificationsGateway = (() => {
    let _classDecorators = [(0, websockets_1.WebSocketGateway)({
            cors: {
                origin: '*', // Configure this appropriately for production
            },
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _server_decorators;
    let _server_initializers = [];
    let _server_extraInitializers = [];
    let _handleJoin_decorators;
    let _handleLeave_decorators;
    let _handleJoinAdmins_decorators;
    let _handleSendNotification_decorators;
    var NotificationsGateway = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _server_decorators = [(0, websockets_1.WebSocketServer)()];
            _handleJoin_decorators = [(0, websockets_1.SubscribeMessage)('join')];
            _handleLeave_decorators = [(0, websockets_1.SubscribeMessage)('leave')];
            _handleJoinAdmins_decorators = [(0, websockets_1.SubscribeMessage)('join-admins')];
            _handleSendNotification_decorators = [(0, websockets_1.SubscribeMessage)('send-notification')];
            __esDecorate(this, null, _handleJoin_decorators, { kind: "method", name: "handleJoin", static: false, private: false, access: { has: obj => "handleJoin" in obj, get: obj => obj.handleJoin }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleLeave_decorators, { kind: "method", name: "handleLeave", static: false, private: false, access: { has: obj => "handleLeave" in obj, get: obj => obj.handleLeave }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleJoinAdmins_decorators, { kind: "method", name: "handleJoinAdmins", static: false, private: false, access: { has: obj => "handleJoinAdmins" in obj, get: obj => obj.handleJoinAdmins }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleSendNotification_decorators, { kind: "method", name: "handleSendNotification", static: false, private: false, access: { has: obj => "handleSendNotification" in obj, get: obj => obj.handleSendNotification }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: obj => "server" in obj, get: obj => obj.server, set: (obj, value) => { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            NotificationsGateway = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        server = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _server_initializers, void 0));
        logger = (__runInitializers(this, _server_extraInitializers), new common_1.Logger(NotificationsGateway.name));
        connectedUsers = new Map(); // userId -> socketId
        handleConnection(client) {
            this.logger.log(`Client connected: ${client.id}`);
            // In a real implementation, you would authenticate the user here
            // For now, we'll just log the connection
            client.emit('connected', { message: 'Connected to notification service' });
        }
        handleDisconnect(client) {
            this.logger.log(`Client disconnected: ${client.id}`);
            // Remove user from connected users map
            for (const [userId, socketId] of this.connectedUsers.entries()) {
                if (socketId === client.id) {
                    this.connectedUsers.delete(userId);
                    break;
                }
            }
        }
        handleJoin(data, client) {
            this.connectedUsers.set(data.userId, client.id);
            client.join(`user-${data.userId}`);
            this.logger.log(`User ${data.userId} joined room user-${data.userId}`);
            client.emit('joined', { message: `Joined room for user ${data.userId}` });
        }
        handleLeave(data, client) {
            this.connectedUsers.delete(data.userId);
            client.leave(`user-${data.userId}`);
            this.logger.log(`User ${data.userId} left room user-${data.userId}`);
            client.emit('left', { message: `Left room for user ${data.userId}` });
        }
        // Method to send notification to a specific user
        async sendNotificationToUser(userId, notification) {
            const socketId = this.connectedUsers.get(userId);
            if (socketId) {
                this.server.to(`user-${userId}`).emit('notification', notification);
                this.logger.log(`Notification sent to user ${userId}`);
            }
            else {
                this.logger.warn(`User ${userId} is not connected`);
            }
        }
        // Method to send notification to all users
        async sendNotificationToAll(notification) {
            this.server.emit('notification', notification);
            this.logger.log('Notification sent to all users');
        }
        // Method to send notification to admins
        async sendNotificationToAdmins(notification) {
            this.server.to('admins').emit('admin-notification', notification);
            this.logger.log('Notification sent to admins');
        }
        handleJoinAdmins(client) {
            client.join('admins');
            this.logger.log(`Client ${client.id} joined admins room`);
            client.emit('joined-admins', { message: 'Joined admins room' });
        }
        async handleSendNotification(data) {
            const notification = {
                id: Date.now().toString(),
                message: data.message,
                type: data.type,
                timestamp: new Date(),
            };
            if (data.userId) {
                await this.sendNotificationToUser(data.userId, notification);
            }
            else {
                await this.sendNotificationToAll(notification);
            }
            return { success: true, notification };
        }
    };
    return NotificationsGateway = _classThis;
})();
exports.NotificationsGateway = NotificationsGateway;
//# sourceMappingURL=notifications.gateway.js.map