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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const chat_message_entity_1 = require("../entities/chat-message.entity");
const chat_session_entity_1 = require("../entities/chat-session.entity");
let ChatGateway = (() => {
    let _classDecorators = [(0, common_1.Injectable)(), (0, websockets_1.WebSocketGateway)({
            cors: {
                origin: process.env.FRONTEND_URL || 'http://localhost:3000',
                credentials: true,
            },
            namespace: '/chat',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _server_decorators;
    let _server_initializers = [];
    let _server_extraInitializers = [];
    let _handleJoinSession_decorators;
    let _handleLeaveSession_decorators;
    let _handleSendMessage_decorators;
    let _handleTypingStart_decorators;
    let _handleTypingStop_decorators;
    let _handleFileUpload_decorators;
    let _handleUrlProcess_decorators;
    let _handleRequestSupport_decorators;
    let _handleJoinSupport_decorators;
    let _handleLeaveSupport_decorators;
    let _handleHeartbeat_decorators;
    let _handleGetSessionInfo_decorators;
    let _handlePing_decorators;
    let _handleGetConversationStarters_decorators;
    let _handleEscalateToSupport_decorators;
    let _handleGetSuggestedTopics_decorators;
    var ChatGateway = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _server_decorators = [(0, websockets_1.WebSocketServer)()];
            _handleJoinSession_decorators = [(0, websockets_1.SubscribeMessage)('join-session')];
            _handleLeaveSession_decorators = [(0, websockets_1.SubscribeMessage)('leave-session')];
            _handleSendMessage_decorators = [(0, websockets_1.SubscribeMessage)('send-message')];
            _handleTypingStart_decorators = [(0, websockets_1.SubscribeMessage)('typing-start')];
            _handleTypingStop_decorators = [(0, websockets_1.SubscribeMessage)('typing-stop')];
            _handleFileUpload_decorators = [(0, websockets_1.SubscribeMessage)('upload-file')];
            _handleUrlProcess_decorators = [(0, websockets_1.SubscribeMessage)('process-url')];
            _handleRequestSupport_decorators = [(0, websockets_1.SubscribeMessage)('request-support')];
            _handleJoinSupport_decorators = [(0, websockets_1.SubscribeMessage)('join-support')];
            _handleLeaveSupport_decorators = [(0, websockets_1.SubscribeMessage)('leave-support')];
            _handleHeartbeat_decorators = [(0, websockets_1.SubscribeMessage)('heartbeat')];
            _handleGetSessionInfo_decorators = [(0, websockets_1.SubscribeMessage)('get-session-info')];
            _handlePing_decorators = [(0, websockets_1.SubscribeMessage)('ping')];
            _handleGetConversationStarters_decorators = [(0, websockets_1.SubscribeMessage)('get-conversation-starters')];
            _handleEscalateToSupport_decorators = [(0, websockets_1.SubscribeMessage)('escalate-to-support')];
            _handleGetSuggestedTopics_decorators = [(0, websockets_1.SubscribeMessage)('get-suggested-topics')];
            __esDecorate(this, null, _handleJoinSession_decorators, { kind: "method", name: "handleJoinSession", static: false, private: false, access: { has: obj => "handleJoinSession" in obj, get: obj => obj.handleJoinSession }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleLeaveSession_decorators, { kind: "method", name: "handleLeaveSession", static: false, private: false, access: { has: obj => "handleLeaveSession" in obj, get: obj => obj.handleLeaveSession }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleSendMessage_decorators, { kind: "method", name: "handleSendMessage", static: false, private: false, access: { has: obj => "handleSendMessage" in obj, get: obj => obj.handleSendMessage }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleTypingStart_decorators, { kind: "method", name: "handleTypingStart", static: false, private: false, access: { has: obj => "handleTypingStart" in obj, get: obj => obj.handleTypingStart }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleTypingStop_decorators, { kind: "method", name: "handleTypingStop", static: false, private: false, access: { has: obj => "handleTypingStop" in obj, get: obj => obj.handleTypingStop }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleFileUpload_decorators, { kind: "method", name: "handleFileUpload", static: false, private: false, access: { has: obj => "handleFileUpload" in obj, get: obj => obj.handleFileUpload }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleUrlProcess_decorators, { kind: "method", name: "handleUrlProcess", static: false, private: false, access: { has: obj => "handleUrlProcess" in obj, get: obj => obj.handleUrlProcess }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleRequestSupport_decorators, { kind: "method", name: "handleRequestSupport", static: false, private: false, access: { has: obj => "handleRequestSupport" in obj, get: obj => obj.handleRequestSupport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleJoinSupport_decorators, { kind: "method", name: "handleJoinSupport", static: false, private: false, access: { has: obj => "handleJoinSupport" in obj, get: obj => obj.handleJoinSupport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleLeaveSupport_decorators, { kind: "method", name: "handleLeaveSupport", static: false, private: false, access: { has: obj => "handleLeaveSupport" in obj, get: obj => obj.handleLeaveSupport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleHeartbeat_decorators, { kind: "method", name: "handleHeartbeat", static: false, private: false, access: { has: obj => "handleHeartbeat" in obj, get: obj => obj.handleHeartbeat }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleGetSessionInfo_decorators, { kind: "method", name: "handleGetSessionInfo", static: false, private: false, access: { has: obj => "handleGetSessionInfo" in obj, get: obj => obj.handleGetSessionInfo }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handlePing_decorators, { kind: "method", name: "handlePing", static: false, private: false, access: { has: obj => "handlePing" in obj, get: obj => obj.handlePing }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleGetConversationStarters_decorators, { kind: "method", name: "handleGetConversationStarters", static: false, private: false, access: { has: obj => "handleGetConversationStarters" in obj, get: obj => obj.handleGetConversationStarters }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleEscalateToSupport_decorators, { kind: "method", name: "handleEscalateToSupport", static: false, private: false, access: { has: obj => "handleEscalateToSupport" in obj, get: obj => obj.handleEscalateToSupport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _handleGetSuggestedTopics_decorators, { kind: "method", name: "handleGetSuggestedTopics", static: false, private: false, access: { has: obj => "handleGetSuggestedTopics" in obj, get: obj => obj.handleGetSuggestedTopics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: obj => "server" in obj, get: obj => obj.server, set: (obj, value) => { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatGateway = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        jwtService = __runInitializers(this, _instanceExtraInitializers);
        chatSessionService;
        chatMessageService;
        generalCommunicationAiService;
        server = __runInitializers(this, _server_initializers, void 0);
        logger = (__runInitializers(this, _server_extraInitializers), new common_1.Logger(ChatGateway.name));
        connectedUsers = new Map();
        typingUsers = new Map(); // sessionId -> Set of userIds
        heartbeatIntervals = new Map(); // socketId -> interval
        constructor(jwtService, chatSessionService, chatMessageService, generalCommunicationAiService) {
            this.jwtService = jwtService;
            this.chatSessionService = chatSessionService;
            this.chatMessageService = chatMessageService;
            this.generalCommunicationAiService = generalCommunicationAiService;
        }
        afterInit(server) {
            this.logger.log('Chat WebSocket Gateway initialized');
            this.initializeCleanup();
        }
        async handleConnection(client) {
            try {
                const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.replace('Bearer ', '');
                if (!token) {
                    this.logger.warn(`Client ${client.id} connected without token`);
                    client.emit('error', {
                        code: 'AUTHENTICATION_REQUIRED',
                        message: 'Authentication token required',
                        retryable: false,
                        timestamp: new Date()
                    });
                    client.disconnect();
                    return;
                }
                const payload = await this.jwtService.verifyAsync(token);
                const userId = payload.sub || payload.userId;
                if (!userId) {
                    this.logger.warn(`Invalid token for client ${client.id}`);
                    client.emit('error', {
                        code: 'INVALID_TOKEN',
                        message: 'Invalid authentication token',
                        retryable: false,
                        timestamp: new Date()
                    });
                    client.disconnect();
                    return;
                }
                // Check for existing connections from the same user
                const existingConnection = Array.from(this.connectedUsers.values())
                    .find(conn => conn.userId === userId);
                if (existingConnection) {
                    this.logger.log(`User ${userId} reconnecting, closing previous connection`);
                    existingConnection.socket.disconnect();
                    this.connectedUsers.delete(existingConnection.socket.id);
                }
                this.connectedUsers.set(client.id, { socket: client, userId });
                client.data.userId = userId;
                this.logger.log(`User ${userId} connected with socket ${client.id}`);
                // Emit connection success with user info
                client.emit('connection-established', {
                    userId,
                    socketId: client.id,
                    timestamp: new Date(),
                    serverTime: new Date().toISOString()
                });
                // Set up heartbeat for connection monitoring
                this.setupHeartbeat(client);
            }
            catch (error) {
                this.logger.error(`Authentication failed for client ${client.id}:`, error.message);
                client.emit('error', {
                    code: 'AUTHENTICATION_FAILED',
                    message: 'Authentication failed',
                    retryable: false,
                    timestamp: new Date()
                });
                client.disconnect();
            }
        }
        handleDisconnect(client) {
            const connection = this.connectedUsers.get(client.id);
            if (connection) {
                const { userId, sessionId } = connection;
                // Remove from typing indicators
                if (sessionId) {
                    this.removeFromTyping(sessionId, userId);
                    // Notify session participants about user leaving
                    client.to(sessionId).emit('user-left', {
                        userId,
                        sessionId,
                        timestamp: new Date()
                    });
                }
                // Clear heartbeat interval
                const heartbeatInterval = this.heartbeatIntervals.get(client.id);
                if (heartbeatInterval) {
                    clearInterval(heartbeatInterval);
                    this.heartbeatIntervals.delete(client.id);
                }
                this.connectedUsers.delete(client.id);
                this.logger.log(`User ${userId} disconnected (socket ${client.id})`);
            }
        }
        async handleJoinSession(client, data) {
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
            }
            catch (error) {
                this.logger.error('Error joining session:', error);
                client.emit('error', { message: 'Failed to join session' });
            }
        }
        async handleLeaveSession(client, data) {
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
            }
            catch (error) {
                this.logger.error('Error leaving session:', error);
            }
        }
        async handleSendMessage(client, data) {
            try {
                const userId = client.data.userId;
                const { sessionId, content, messageType, metadata } = data;
                // Get session to determine type
                const session = await this.chatSessionService.getSession(sessionId);
                if (!session) {
                    client.emit('error', { message: 'Session not found' });
                    return;
                }
                // Send the message
                const message = await this.chatMessageService.sendMessage({
                    sessionId,
                    senderType: chat_message_entity_1.ChatMessageSenderType.USER,
                    senderId: userId,
                    content,
                    messageType: messageType || chat_message_entity_1.ChatMessageType.TEXT,
                    metadata
                }, userId);
                // Broadcast to all users in the session
                this.server.to(sessionId).emit('message-received', message);
                // Handle AI response based on session type
                if (session.sessionType === chat_session_entity_1.ChatSessionType.GENERAL) {
                    // Use general communication AI service
                    this.handleGeneralCommunicationResponse(sessionId, content, userId);
                }
                // Support sessions are handled by existing support AI service
                this.logger.log(`Message sent in session ${sessionId} by user ${userId}`);
            }
            catch (error) {
                this.logger.error('Error sending message:', error);
                client.emit('error', { message: 'Failed to send message' });
            }
        }
        async handleTypingStart(client, data) {
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
            }
            catch (error) {
                this.logger.error('Error handling typing start:', error);
            }
        }
        async handleTypingStop(client, data) {
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
            }
            catch (error) {
                this.logger.error('Error handling typing stop:', error);
            }
        }
        async handleFileUpload(client, data) {
            try {
                const userId = client.data.userId;
                const { sessionId, filename, fileType, fileSize, fileData } = data;
                // Validate session access
                const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
                if (!hasAccess) {
                    client.emit('error', {
                        code: 'ACCESS_DENIED',
                        message: 'Access denied to session',
                        retryable: false,
                        timestamp: new Date()
                    });
                    return;
                }
                // Validate file size (10MB limit)
                const maxFileSize = 10 * 1024 * 1024; // 10MB
                if (fileSize > maxFileSize) {
                    client.emit('error', {
                        code: 'FILE_TOO_LARGE',
                        message: `File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`,
                        retryable: false,
                        timestamp: new Date()
                    });
                    return;
                }
                // Validate file type
                const allowedTypes = ['pdf', 'docx', 'xlsx', 'txt', 'md'];
                const fileExtension = filename.split('.').pop()?.toLowerCase();
                if (!fileExtension || !allowedTypes.includes(fileExtension)) {
                    client.emit('error', {
                        code: 'INVALID_FILE_FORMAT',
                        message: `File type not supported. Allowed types: ${allowedTypes.join(', ')}`,
                        retryable: false,
                        timestamp: new Date()
                    });
                    return;
                }
                // Generate temporary document ID
                const tempDocumentId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                // Emit processing status to all session participants
                this.server.to(sessionId).emit('file-processing-status', {
                    sessionId,
                    documentId: tempDocumentId,
                    status: 'pending',
                    filename,
                    fileSize,
                    progress: 0
                });
                // Acknowledge the upload to sender
                client.emit('file-upload-acknowledged', {
                    sessionId,
                    documentId: tempDocumentId,
                    filename,
                    status: 'received'
                });
                this.logger.log(`File upload initiated in session ${sessionId}: ${filename} (${fileSize} bytes)`);
            }
            catch (error) {
                this.logger.error('Error handling file upload:', error);
                client.emit('error', {
                    code: 'FILE_PROCESSING_FAILED',
                    message: 'Failed to process file upload',
                    retryable: true,
                    timestamp: new Date()
                });
            }
        }
        async handleUrlProcess(client, data) {
            try {
                const userId = client.data.userId;
                const { sessionId, url } = data;
                // Validate session access
                const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
                if (!hasAccess) {
                    client.emit('error', {
                        code: 'ACCESS_DENIED',
                        message: 'Access denied to session',
                        retryable: false,
                        timestamp: new Date()
                    });
                    return;
                }
                // Basic URL validation
                try {
                    new URL(url);
                }
                catch (urlError) {
                    client.emit('error', {
                        code: 'INVALID_URL',
                        message: 'Invalid URL format',
                        retryable: false,
                        timestamp: new Date()
                    });
                    return;
                }
                // Check for supported protocols
                const urlObj = new URL(url);
                if (!['http:', 'https:'].includes(urlObj.protocol)) {
                    client.emit('error', {
                        code: 'INVALID_URL',
                        message: 'Only HTTP and HTTPS URLs are supported',
                        retryable: false,
                        timestamp: new Date()
                    });
                    return;
                }
                // Emit processing status to all session participants
                this.server.to(sessionId).emit('url-processing-status', {
                    sessionId,
                    url,
                    status: 'pending'
                });
                // Acknowledge the request to sender
                client.emit('url-process-acknowledged', {
                    sessionId,
                    url,
                    status: 'received'
                });
                this.logger.log(`URL processing initiated in session ${sessionId}: ${url}`);
            }
            catch (error) {
                this.logger.error('Error handling URL processing:', error);
                client.emit('error', {
                    code: 'URL_PROCESSING_FAILED',
                    message: 'Failed to process URL',
                    retryable: true,
                    timestamp: new Date()
                });
            }
        }
        async handleRequestSupport(client, data) {
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
            }
            catch (error) {
                this.logger.error('Error handling support request:', error);
                client.emit('error', { message: 'Failed to request support' });
            }
        }
        async handleJoinSupport(client, data) {
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
            }
            catch (error) {
                this.logger.error('Error handling support join:', error);
                client.emit('error', { message: 'Failed to join as support' });
            }
        }
        async handleLeaveSupport(client, data) {
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
            }
            catch (error) {
                this.logger.error('Error handling support leave:', error);
            }
        }
        // Public methods for other services to emit events
        /**
         * Broadcast AI response to session
         */
        async broadcastAIResponse(sessionId, message) {
            this.server.to(sessionId).emit('message-received', message);
        }
        /**
         * Broadcast AI response start
         */
        async broadcastAIResponseStart(sessionId) {
            this.server.to(sessionId).emit('ai-response-start', { sessionId });
        }
        /**
         * Broadcast AI response chunk (for streaming)
         */
        async broadcastAIResponseChunk(sessionId, chunk) {
            this.server.to(sessionId).emit('ai-response-chunk', { sessionId, chunk });
        }
        /**
         * Broadcast AI response complete
         */
        async broadcastAIResponseComplete(sessionId, message) {
            this.server.to(sessionId).emit('ai-response-complete', message);
        }
        /**
         * Broadcast file processing status
         */
        async broadcastFileProcessingStatus(status) {
            this.server.to(status.sessionId).emit('file-processing-status', status);
        }
        /**
         * Emit file processing status for a specific session
         */
        async emitFileProcessingStatus(sessionId, data) {
            this.server.to(sessionId).emit('file-processing-status', {
                sessionId,
                ...data
            });
        }
        /**
         * Broadcast URL processing status
         */
        async broadcastUrlProcessingStatus(status) {
            this.server.to(status.sessionId).emit('url-processing-status', status);
        }
        /**
         * Broadcast support team joined
         */
        async broadcastSupportJoined(data) {
            this.server.to(data.sessionId).emit('support-joined', data);
        }
        /**
         * Broadcast support team left
         */
        async broadcastSupportLeft(data) {
            this.server.to(data.sessionId).emit('support-left', data);
        }
        /**
         * Broadcast session update
         */
        async broadcastSessionUpdate(sessionId, session) {
            this.server.to(sessionId).emit('session-updated', session);
        }
        /**
         * Broadcast support assignment notification
         */
        async broadcastSupportAssignment(data) {
            this.server.to(data.sessionId).emit('support-assigned', data);
        }
        /**
         * Broadcast support transfer notification
         */
        async broadcastSupportTransfer(data) {
            this.server.to(data.sessionId).emit('support-transferred', data);
        }
        /**
         * Broadcast support escalation notification
         */
        async broadcastSupportEscalation(data) {
            this.server.to(data.sessionId).emit('support-escalated', data);
            // Also notify managers/admins
            this.server.emit('escalation-alert', data);
        }
        /**
         * Send notification to specific user
         */
        async sendUserNotification(userId, notification) {
            const userSockets = await this.server.fetchSockets();
            const userSocket = userSockets.find(socket => socket.data.userId === userId);
            if (userSocket) {
                userSocket.emit('notification', notification);
            }
        }
        /**
         * Send notification to users with specific roles
         */
        async sendRoleNotification(roles, notification) {
            const sockets = await this.server.fetchSockets();
            sockets.forEach(socket => {
                // TODO: Check user roles from socket data
                // For now, send to all connected users
                socket.emit('role-notification', notification);
            });
        }
        // Private helper methods
        addToTyping(sessionId, userId) {
            if (!this.typingUsers.has(sessionId)) {
                this.typingUsers.set(sessionId, new Set());
            }
            this.typingUsers.get(sessionId).add(userId);
        }
        removeFromTyping(sessionId, userId) {
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
        getSessionUserCount(sessionId) {
            return this.server.sockets.adapter.rooms.get(sessionId)?.size || 0;
        }
        /**
         * Get all connected users
         */
        getConnectedUsersCount() {
            return this.connectedUsers.size;
        }
        // Additional event handlers for enhanced functionality
        async handleHeartbeat(client, data) {
            const connection = this.connectedUsers.get(client.id);
            if (connection) {
                connection.lastHeartbeat = new Date();
                client.emit('heartbeat-ack', {
                    timestamp: new Date().toISOString(),
                    clientTimestamp: data.timestamp
                });
            }
        }
        async handleGetSessionInfo(client, data) {
            try {
                const userId = client.data.userId;
                const { sessionId } = data;
                // Validate session access
                const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
                if (!hasAccess) {
                    client.emit('error', {
                        code: 'ACCESS_DENIED',
                        message: 'Access denied to session',
                        retryable: false,
                        timestamp: new Date()
                    });
                    return;
                }
                // Get session info
                const session = await this.chatSessionService.getSession(sessionId);
                const participantCount = this.getSessionUserCount(sessionId);
                const typingUsers = this.typingUsers.get(sessionId) || new Set();
                client.emit('session-info', {
                    session,
                    participantCount,
                    typingUserCount: typingUsers.size,
                    timestamp: new Date()
                });
            }
            catch (error) {
                this.logger.error('Error getting session info:', error);
                client.emit('error', {
                    code: 'SESSION_INFO_FAILED',
                    message: 'Failed to get session information',
                    retryable: true,
                    timestamp: new Date()
                });
            }
        }
        async handlePing(client, data) {
            client.emit('pong', {
                timestamp: new Date().toISOString(),
                clientTimestamp: data.timestamp
            });
        }
        // Private helper methods
        /**
         * Set up heartbeat monitoring for a client
         */
        setupHeartbeat(client) {
            const heartbeatInterval = setInterval(() => {
                const connection = this.connectedUsers.get(client.id);
                if (!connection) {
                    clearInterval(heartbeatInterval);
                    return;
                }
                const now = new Date();
                const lastHeartbeat = connection.lastHeartbeat || now;
                const timeSinceLastHeartbeat = now.getTime() - lastHeartbeat.getTime();
                // If no heartbeat for 60 seconds, disconnect
                if (timeSinceLastHeartbeat > 60000) {
                    this.logger.warn(`Client ${client.id} heartbeat timeout, disconnecting`);
                    client.disconnect();
                    clearInterval(heartbeatInterval);
                    return;
                }
                // Send heartbeat request
                client.emit('heartbeat-request', { timestamp: now.toISOString() });
            }, 30000); // Check every 30 seconds
            this.heartbeatIntervals.set(client.id, heartbeatInterval);
        }
        /**
         * Broadcast connection status to session participants
         */
        async broadcastConnectionStatus(sessionId, userId, status) {
            this.server.to(sessionId).emit('user-connection-status', {
                sessionId,
                userId,
                status,
                timestamp: new Date()
            });
        }
        /**
         * Get session statistics
         */
        getSessionStats(sessionId) {
            const participantCount = this.getSessionUserCount(sessionId);
            const typingUsers = this.typingUsers.get(sessionId) || new Set();
            return {
                participantCount,
                typingUserCount: typingUsers.size,
                typingUsers: Array.from(typingUsers)
            };
        }
        /**
         * Cleanup stale connections
         */
        cleanupStaleConnections() {
            const now = new Date();
            const staleThreshold = 5 * 60 * 1000; // 5 minutes
            for (const [socketId, connection] of this.connectedUsers.entries()) {
                const lastHeartbeat = connection.lastHeartbeat || now;
                const timeSinceLastHeartbeat = now.getTime() - lastHeartbeat.getTime();
                if (timeSinceLastHeartbeat > staleThreshold) {
                    this.logger.warn(`Cleaning up stale connection for user ${connection.userId}`);
                    connection.socket.disconnect();
                    this.connectedUsers.delete(socketId);
                    const heartbeatInterval = this.heartbeatIntervals.get(socketId);
                    if (heartbeatInterval) {
                        clearInterval(heartbeatInterval);
                        this.heartbeatIntervals.delete(socketId);
                    }
                }
            }
        }
        /**
         * Initialize cleanup interval
         */
        initializeCleanup() {
            setInterval(() => {
                this.cleanupStaleConnections();
            }, 5 * 60 * 1000); // Run every 5 minutes
        }
        // General Communication Methods
        /**
         * Handle general communication AI response
         */
        async handleGeneralCommunicationResponse(sessionId, query, userId) {
            try {
                this.logger.log(`Generating general communication response for session ${sessionId}`);
                // Emit AI response start
                this.server.to(sessionId).emit('ai-response-start', { sessionId });
                // Generate AI response
                const aiResponse = await this.generalCommunicationAiService.generateGeneralResponse(query, sessionId, {
                    includeContextSources: true,
                    tone: 'friendly',
                    language: 'tr'
                });
                // Create AI message
                const aiMessage = await this.chatMessageService.sendMessage({
                    sessionId,
                    senderType: chat_message_entity_1.ChatMessageSenderType.AI,
                    content: aiResponse.content,
                    messageType: chat_message_entity_1.ChatMessageType.TEXT,
                    metadata: {
                        aiModel: 'general-communication',
                        confidence: aiResponse.confidence,
                        responseType: aiResponse.responseType,
                        contextSources: aiResponse.contextSources,
                        suggestedActions: aiResponse.suggestedActions,
                        escalationReason: aiResponse.escalationReason
                    }
                });
                // Broadcast AI response
                this.server.to(sessionId).emit('ai-response-complete', aiMessage);
                // If escalation is suggested, emit escalation event
                if (aiResponse.responseType === 'escalation-suggested') {
                    this.server.to(sessionId).emit('escalation-suggested', {
                        sessionId,
                        reason: aiResponse.escalationReason,
                        message: 'AI suggests escalating to support team'
                    });
                }
                this.logger.log(`General communication response generated for session ${sessionId} with confidence: ${aiResponse.confidence}`);
            }
            catch (error) {
                this.logger.error(`Error generating general communication response: ${error.message}`, error.stack);
                // Send error message to session
                const errorMessage = await this.chatMessageService.sendMessage({
                    sessionId,
                    senderType: chat_message_entity_1.ChatMessageSenderType.AI,
                    content: 'Üzgünüm, şu anda sorununuza uygun bir yanıt oluşturamıyorum. Lütfen sorunuzu daha detaylı açıklayın veya destek ekibimizle iletişime geçin.',
                    messageType: chat_message_entity_1.ChatMessageType.TEXT,
                    metadata: {
                        aiModel: 'general-communication',
                        confidence: 0.3,
                        responseType: 'error',
                        error: true
                    }
                });
                this.server.to(sessionId).emit('ai-response-complete', errorMessage);
            }
        }
        async handleGetConversationStarters(client, data) {
            try {
                const { language = 'tr' } = data;
                const starters = await this.generalCommunicationAiService.getConversationStarters(language);
                client.emit('conversation-starters', {
                    starters,
                    language,
                    timestamp: new Date()
                });
            }
            catch (error) {
                this.logger.error('Error getting conversation starters:', error);
                client.emit('error', {
                    code: 'CONVERSATION_STARTERS_FAILED',
                    message: 'Failed to get conversation starters',
                    retryable: true,
                    timestamp: new Date()
                });
            }
        }
        async handleEscalateToSupport(client, data) {
            try {
                const userId = client.data.userId;
                const { sessionId, reason, notes } = data;
                // Validate session access
                const hasAccess = await this.chatSessionService.validateSessionAccess(sessionId, userId);
                if (!hasAccess) {
                    client.emit('error', {
                        code: 'ACCESS_DENIED',
                        message: 'Access denied to session',
                        retryable: false,
                        timestamp: new Date()
                    });
                    return;
                }
                // Get current session
                const session = await this.chatSessionService.getSession(sessionId);
                if (!session) {
                    client.emit('error', { message: 'Session not found' });
                    return;
                }
                // Update session type to support if it's currently general
                if (session.sessionType === chat_session_entity_1.ChatSessionType.GENERAL) {
                    await this.chatSessionService.updateSession(sessionId, {
                        sessionType: chat_session_entity_1.ChatSessionType.SUPPORT,
                        metadata: {
                            ...session.metadata,
                            escalatedFrom: 'general',
                            escalationReason: reason,
                            escalationNotes: notes,
                            escalatedAt: new Date(),
                            escalatedBy: userId
                        }
                    });
                    // Create system message about escalation
                    const escalationMessage = await this.chatMessageService.sendMessage({
                        sessionId,
                        senderType: chat_message_entity_1.ChatMessageSenderType.AI,
                        content: 'Sohbet destek ekibine yönlendirildi. Bir destek temsilcisi kısa süre içinde size yardımcı olacak.',
                        messageType: chat_message_entity_1.ChatMessageType.SYSTEM,
                        metadata: {
                            escalation: true,
                            reason,
                            notes
                        }
                    });
                    // Broadcast escalation to session
                    this.server.to(sessionId).emit('session-escalated', {
                        sessionId,
                        reason,
                        notes,
                        escalatedBy: userId,
                        timestamp: new Date()
                    });
                    // Broadcast system message
                    this.server.to(sessionId).emit('message-received', escalationMessage);
                    // Notify support team
                    this.server.emit('support-escalation-alert', {
                        sessionId,
                        userId,
                        reason,
                        notes,
                        timestamp: new Date()
                    });
                }
                client.emit('escalation-acknowledged', { sessionId });
                this.logger.log(`Session ${sessionId} escalated to support by user ${userId}`);
            }
            catch (error) {
                this.logger.error('Error handling escalation to support:', error);
                client.emit('error', {
                    code: 'ESCALATION_FAILED',
                    message: 'Failed to escalate to support',
                    retryable: true,
                    timestamp: new Date()
                });
            }
        }
        async handleGetSuggestedTopics(client, data) {
            try {
                const { limit = 6 } = data;
                const topics = await this.generalCommunicationAiService['generalContextService'].getSuggestedTopics(limit);
                client.emit('suggested-topics', {
                    topics,
                    timestamp: new Date()
                });
            }
            catch (error) {
                this.logger.error('Error getting suggested topics:', error);
                client.emit('error', {
                    code: 'SUGGESTED_TOPICS_FAILED',
                    message: 'Failed to get suggested topics',
                    retryable: true,
                    timestamp: new Date()
                });
            }
        }
    };
    return ChatGateway = _classThis;
})();
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map