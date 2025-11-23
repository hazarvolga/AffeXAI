"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHandoffService = void 0;
const common_1 = require("@nestjs/common");
const chat_message_entity_1 = require("../entities/chat-message.entity");
let ChatHandoffService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChatHandoffService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatHandoffService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        sessionRepository;
        messageRepository;
        userRepository;
        chatGateway;
        supportAssignmentService;
        chatMessageService;
        logger = new common_1.Logger(ChatHandoffService.name);
        constructor(sessionRepository, messageRepository, userRepository, chatGateway, supportAssignmentService, chatMessageService) {
            this.sessionRepository = sessionRepository;
            this.messageRepository = messageRepository;
            this.userRepository = userRepository;
            this.chatGateway = chatGateway;
            this.supportAssignmentService = supportAssignmentService;
            this.chatMessageService = chatMessageService;
        }
        /**
         * Prepare handoff context for smooth transition
         */
        async prepareHandoffContext(sessionId) {
            // Get session with user info
            const session = await this.sessionRepository.findOne({
                where: { id: sessionId },
                relations: ['user']
            });
            if (!session) {
                throw new common_1.NotFoundException(`Session ${sessionId} not found`);
            }
            // Get recent messages (last 20 for context)
            const recentMessages = await this.messageRepository.find({
                where: { sessionId },
                order: { createdAt: 'DESC' },
                take: 20,
                relations: ['contextSources']
            });
            // Get all previous assignments
            const previousAssignments = await this.supportAssignmentService.getSessionAssignments(sessionId);
            // Generate context summary
            const contextSummary = await this.generateContextSummary(recentMessages, session);
            // Determine urgency level based on session metadata and history
            const urgencyLevel = this.determineUrgencyLevel(session, recentMessages, previousAssignments);
            return {
                sessionId,
                previousMessages: recentMessages.reverse(), // Chronological order
                contextSummary,
                customerInfo: {
                    userId: session.userId,
                    userName: session.user?.fullName || 'Unknown User',
                    email: session.user?.email || 'unknown@example.com',
                },
                previousAssignments,
                sessionMetadata: session.metadata,
                handoffReason: 'Transfer requested', // Default reason
                urgencyLevel,
            };
        }
        /**
         * Execute handoff with context preservation
         */
        async executeHandoff(sessionId, fromSupportUserId, toSupportUserId, handoffReason, privateNotes, transferredBy) {
            // Prepare handoff context
            const context = await this.prepareHandoffContext(sessionId);
            context.handoffReason = handoffReason;
            // Get support user details
            const [fromUser, toUser] = await Promise.all([
                this.userRepository.findOne({ where: { id: fromSupportUserId } }),
                this.userRepository.findOne({ where: { id: toSupportUserId } })
            ]);
            if (!fromUser || !toUser) {
                throw new common_1.NotFoundException('Support user not found');
            }
            // Create handoff message for session history
            const handoffMessage = await this.chatMessageService.sendMessage({
                sessionId,
                senderType: chat_message_entity_1.ChatMessageSenderType.SUPPORT,
                content: `Chat transferred from ${fromUser.fullName} to ${toUser.fullName}. Reason: ${handoffReason}`,
                messageType: chat_message_entity_1.ChatMessageType.SYSTEM,
                metadata: {
                    handoffContext: {
                        fromUserId: fromSupportUserId,
                        toUserId: toSupportUserId,
                        reason: handoffReason,
                        contextSummary: context.contextSummary,
                        urgencyLevel: context.urgencyLevel,
                    }
                }
            });
            // Add private notes if provided
            if (privateNotes) {
                await this.addHandoffNote(sessionId, fromSupportUserId, privateNotes, true);
            }
            // Transfer the assignment
            await this.supportAssignmentService.transferAssignment({
                sessionId,
                fromSupportUserId,
                toSupportUserId,
                transferredBy: transferredBy || fromSupportUserId,
                notes: `Handoff: ${handoffReason}. ${privateNotes || ''}`.trim(),
            });
            // Send handoff context to new support agent
            await this.sendHandoffNotification(toSupportUserId, context);
            // Broadcast handoff to session participants
            await this.chatGateway.broadcastSupportTransfer({
                sessionId,
                fromSupportUserId,
                toSupportUserId,
                transferredBy: transferredBy || fromSupportUserId,
                notes: handoffReason,
            });
            this.logger.log(`Executed handoff for session ${sessionId} from ${fromSupportUserId} to ${toSupportUserId}`);
        }
        /**
         * Execute escalation with enhanced context
         */
        async executeEscalation(sessionId, escalatedBy, escalationReason, urgencyLevel = 'high', privateNotes) {
            // Prepare handoff context
            const context = await this.prepareHandoffContext(sessionId);
            context.handoffReason = `Escalation: ${escalationReason}`;
            context.urgencyLevel = urgencyLevel;
            // Get escalating user details
            const escalatingUser = await this.userRepository.findOne({ where: { id: escalatedBy } });
            if (!escalatingUser) {
                throw new common_1.NotFoundException('Escalating user not found');
            }
            // Create escalation message for session history
            const escalationMessage = await this.chatMessageService.sendMessage({
                sessionId,
                senderType: chat_message_entity_1.ChatMessageSenderType.SUPPORT,
                content: `Chat escalated by ${escalatingUser.fullName}. Reason: ${escalationReason}`,
                messageType: chat_message_entity_1.ChatMessageType.SYSTEM,
                metadata: {
                    escalationContext: {
                        escalatedBy,
                        reason: escalationReason,
                        urgencyLevel,
                        contextSummary: context.contextSummary,
                        escalatedAt: new Date(),
                    }
                }
            });
            // Add private escalation notes
            if (privateNotes) {
                await this.addHandoffNote(sessionId, escalatedBy, `Escalation notes: ${privateNotes}`, true);
            }
            // Escalate the assignment
            const newAssignment = await this.supportAssignmentService.escalateAssignment(sessionId, escalatedBy, `Escalation: ${escalationReason}. ${privateNotes || ''}`.trim());
            // Send escalation context to assigned manager
            await this.sendEscalationNotification(newAssignment.supportUserId, context);
            // Broadcast escalation
            await this.chatGateway.broadcastSupportEscalation({
                sessionId,
                escalatedBy,
                escalatedTo: newAssignment.supportUserId,
                notes: escalationReason,
            });
            this.logger.log(`Executed escalation for session ${sessionId} by ${escalatedBy}`);
        }
        /**
         * Add handoff note (private or public)
         */
        async addHandoffNote(sessionId, authorId, content, isPrivate = false, tags) {
            const author = await this.userRepository.findOne({ where: { id: authorId } });
            if (!author) {
                throw new common_1.NotFoundException('Author not found');
            }
            // Create note as a system message with special metadata
            const noteMessage = await this.chatMessageService.sendMessage({
                sessionId,
                senderType: chat_message_entity_1.ChatMessageSenderType.SUPPORT,
                senderId: authorId,
                content: isPrivate ? '[Private Note]' : content,
                messageType: chat_message_entity_1.ChatMessageType.SYSTEM,
                metadata: {
                    handoffNote: {
                        isPrivate,
                        actualContent: content,
                        authorName: author.fullName,
                        tags: tags || [],
                        noteType: 'handoff',
                    }
                }
            });
            const handoffNote = {
                id: noteMessage.id,
                sessionId,
                authorId,
                authorName: author.fullName,
                content,
                isPrivate,
                createdAt: noteMessage.createdAt,
                tags,
            };
            // Only broadcast to support team if private
            if (isPrivate) {
                // TODO: Send only to support team members
                this.logger.log(`Added private handoff note for session ${sessionId}`);
            }
            else {
                await this.chatGateway.broadcastSessionUpdate(sessionId, { type: 'handoff-note', note: handoffNote });
            }
            return handoffNote;
        }
        /**
         * Get handoff notes for a session
         */
        async getHandoffNotes(sessionId, includePrivate = false) {
            const messages = await this.messageRepository.find({
                where: {
                    sessionId,
                    messageType: chat_message_entity_1.ChatMessageType.SYSTEM,
                },
                order: { createdAt: 'ASC' }
            });
            const handoffNotes = [];
            for (const message of messages) {
                const noteMetadata = message.metadata?.handoffNote;
                if (noteMetadata && noteMetadata.noteType === 'handoff') {
                    if (!noteMetadata.isPrivate || includePrivate) {
                        handoffNotes.push({
                            id: message.id,
                            sessionId,
                            authorId: message.senderId,
                            authorName: noteMetadata.authorName,
                            content: noteMetadata.actualContent,
                            isPrivate: noteMetadata.isPrivate,
                            createdAt: message.createdAt,
                            tags: noteMetadata.tags,
                        });
                    }
                }
            }
            return handoffNotes;
        }
        /**
         * Get session handoff history
         */
        async getHandoffHistory(sessionId) {
            const [assignments, notes] = await Promise.all([
                this.supportAssignmentService.getSessionAssignments(sessionId),
                this.getHandoffNotes(sessionId, true) // Include private notes for support team
            ]);
            const transfers = assignments.filter(a => a.assignmentType === 'manual' && a.notes?.includes('Handoff'));
            const escalations = assignments.filter(a => a.assignmentType === 'escalated');
            return {
                transfers,
                escalations,
                notes,
            };
        }
        /**
         * Generate context summary for handoff
         */
        async generateContextSummary(messages, session) {
            if (messages.length === 0) {
                return 'No previous conversation history.';
            }
            // Extract key information from recent messages
            const userMessages = messages.filter(m => m.senderType === chat_message_entity_1.ChatMessageSenderType.USER);
            const aiMessages = messages.filter(m => m.senderType === chat_message_entity_1.ChatMessageSenderType.AI);
            const supportMessages = messages.filter(m => m.senderType === chat_message_entity_1.ChatMessageSenderType.SUPPORT);
            let summary = `Session started ${session.createdAt.toLocaleDateString()}. `;
            if (userMessages.length > 0) {
                const lastUserMessage = userMessages[0];
                summary += `Customer's latest concern: "${lastUserMessage.content.substring(0, 100)}${lastUserMessage.content.length > 100 ? '...' : ''}". `;
            }
            if (supportMessages.length > 0) {
                summary += `Previous support interaction provided. `;
            }
            if (aiMessages.length > 0) {
                summary += `AI assistance was provided with context from knowledge base. `;
            }
            // Add document/URL context if available
            const documentsUploaded = messages.some(m => m.messageType === chat_message_entity_1.ChatMessageType.FILE);
            const urlsProcessed = messages.some(m => m.messageType === chat_message_entity_1.ChatMessageType.URL);
            if (documentsUploaded) {
                summary += `Customer uploaded documents for analysis. `;
            }
            if (urlsProcessed) {
                summary += `URLs were processed for additional context. `;
            }
            return summary.trim();
        }
        /**
         * Determine urgency level based on session data
         */
        determineUrgencyLevel(session, messages, assignments) {
            // Check for escalation keywords in recent messages
            const urgentKeywords = ['urgent', 'critical', 'emergency', 'asap', 'immediately', 'broken', 'down', 'not working'];
            const recentContent = messages.slice(0, 5).map(m => m.content.toLowerCase()).join(' ');
            if (urgentKeywords.some(keyword => recentContent.includes(keyword))) {
                return 'high';
            }
            // Check session age
            const sessionAge = Date.now() - session.createdAt.getTime();
            const hoursOld = sessionAge / (1000 * 60 * 60);
            if (hoursOld > 24) {
                return 'high';
            }
            // Check number of previous assignments (multiple transfers indicate complexity)
            if (assignments.length > 2) {
                return 'medium';
            }
            // Check message frequency (high activity might indicate urgency)
            if (messages.length > 20) {
                return 'medium';
            }
            return 'low';
        }
        /**
         * Send handoff notification to new support agent
         */
        async sendHandoffNotification(supportUserId, context) {
            await this.chatGateway.sendUserNotification(supportUserId, {
                type: 'handoff-received',
                sessionId: context.sessionId,
                customerInfo: context.customerInfo,
                contextSummary: context.contextSummary,
                urgencyLevel: context.urgencyLevel,
                handoffReason: context.handoffReason,
                messageCount: context.previousMessages.length,
                timestamp: new Date(),
            });
        }
        /**
         * Send escalation notification to manager
         */
        async sendEscalationNotification(managerId, context) {
            await this.chatGateway.sendUserNotification(managerId, {
                type: 'escalation-received',
                sessionId: context.sessionId,
                customerInfo: context.customerInfo,
                contextSummary: context.contextSummary,
                urgencyLevel: context.urgencyLevel,
                escalationReason: context.handoffReason,
                messageCount: context.previousMessages.length,
                timestamp: new Date(),
            });
            // Also send to role-based notification for all managers
            await this.chatGateway.sendRoleNotification(['manager', 'admin'], {
                type: 'escalation-alert',
                sessionId: context.sessionId,
                customerInfo: context.customerInfo,
                urgencyLevel: context.urgencyLevel,
                escalationReason: context.handoffReason,
                timestamp: new Date(),
            });
        }
    };
    return ChatHandoffService = _classThis;
})();
exports.ChatHandoffService = ChatHandoffService;
//# sourceMappingURL=chat-handoff.service.js.map