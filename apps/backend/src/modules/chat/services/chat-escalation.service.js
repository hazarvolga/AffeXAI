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
exports.ChatEscalationService = void 0;
const common_1 = require("@nestjs/common");
const chat_session_entity_1 = require("../entities/chat-session.entity");
const chat_message_entity_1 = require("../entities/chat-message.entity");
let ChatEscalationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChatEscalationService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatEscalationService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        sessionRepository;
        messageRepository;
        chatSessionService;
        chatMessageService;
        supportAssignmentService;
        logger = new common_1.Logger(ChatEscalationService.name);
        constructor(sessionRepository, messageRepository, chatSessionService, chatMessageService, supportAssignmentService) {
            this.sessionRepository = sessionRepository;
            this.messageRepository = messageRepository;
            this.chatSessionService = chatSessionService;
            this.chatMessageService = chatMessageService;
            this.supportAssignmentService = supportAssignmentService;
        }
        /**
         * Escalate a general communication session to support
         */
        async escalateToSupport(escalationRequest) {
            const { sessionId, userId, reason, notes, priority = 'medium', category } = escalationRequest;
            this.logger.log(`Escalating session ${sessionId} to support. Reason: ${reason}`);
            try {
                // Get current session
                const session = await this.sessionRepository.findOne({
                    where: { id: sessionId },
                    relations: ['messages']
                });
                if (!session) {
                    throw new Error('Session not found');
                }
                if (session.sessionType === chat_session_entity_1.ChatSessionType.SUPPORT) {
                    throw new Error('Session is already a support session');
                }
                // Update session to support type
                const updatedSession = await this.chatSessionService.updateSession(sessionId, {
                    sessionType: chat_session_entity_1.ChatSessionType.SUPPORT,
                    status: chat_session_entity_1.ChatSessionStatus.ACTIVE,
                    metadata: {
                        ...session.metadata,
                        escalatedFrom: session.sessionType,
                        escalationReason: reason,
                        escalationNotes: notes,
                        escalationPriority: priority,
                        escalationCategory: category,
                        escalatedAt: new Date(),
                        escalatedBy: userId,
                        originalSessionType: session.sessionType
                    }
                });
                // Create escalation system message
                const escalationMessage = await this.chatMessageService.sendMessage({
                    sessionId,
                    senderType: chat_message_entity_1.ChatMessageSenderType.AI,
                    content: this.generateEscalationMessage(reason, priority),
                    messageType: chat_message_entity_1.ChatMessageType.SYSTEM,
                    metadata: {
                        escalation: true,
                        escalationReason: reason,
                        escalationPriority: priority,
                        escalationCategory: category,
                        escalatedBy: userId,
                        escalatedAt: new Date()
                    }
                });
                // Try to assign support agent if auto-assignment is enabled
                let assignment;
                try {
                    assignment = await this.supportAssignmentService.autoAssignSupport(sessionId);
                }
                catch (assignmentError) {
                    this.logger.warn(`Failed to auto-assign support for session ${sessionId}: ${assignmentError.message}`);
                    // Continue without assignment - manual assignment can be done later
                }
                // Send notifications
                const notificationsSent = await this.sendEscalationNotifications({
                    session: updatedSession,
                    reason,
                    priority,
                    category,
                    escalatedBy: userId,
                    assignment
                });
                this.logger.log(`Session ${sessionId} successfully escalated to support`);
                return {
                    success: true,
                    session: updatedSession,
                    assignment,
                    escalationMessage,
                    notificationsSent
                };
            }
            catch (error) {
                this.logger.error(`Failed to escalate session ${sessionId}: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Analyze if a conversation should be escalated based on content and context
         */
        async analyzeEscalationNeed(sessionId, recentMessages) {
            try {
                // Get recent messages if not provided
                if (!recentMessages) {
                    recentMessages = await this.messageRepository
                        .createQueryBuilder('message')
                        .where('message.sessionId = :sessionId', { sessionId })
                        .orderBy('message.createdAt', 'DESC')
                        .take(10)
                        .getMany();
                }
                const analysis = this.performEscalationAnalysis(recentMessages);
                this.logger.debug(`Escalation analysis for session ${sessionId}: ${JSON.stringify(analysis)}`);
                return analysis;
            }
            catch (error) {
                this.logger.error(`Error analyzing escalation need for session ${sessionId}: ${error.message}`, error.stack);
                // Return safe default
                return {
                    shouldEscalate: false,
                    reason: 'analysis-failed',
                    priority: 'medium',
                    confidence: 0.1
                };
            }
        }
        /**
         * Get escalation statistics
         */
        async getEscalationStatistics(timeframe) {
            try {
                const query = this.sessionRepository
                    .createQueryBuilder('session')
                    .where('session.sessionType = :supportType', { supportType: chat_session_entity_1.ChatSessionType.SUPPORT })
                    .andWhere('session.metadata->>\'escalatedFrom\' IS NOT NULL');
                if (timeframe) {
                    query.andWhere('session.createdAt BETWEEN :from AND :to', {
                        from: timeframe.from,
                        to: timeframe.to
                    });
                }
                const escalatedSessions = await query.getMany();
                const totalEscalations = escalatedSessions.length;
                const escalationsByReason = {};
                const escalationsByPriority = {};
                let totalEscalationTime = 0;
                escalatedSessions.forEach(session => {
                    const reason = session.metadata?.escalationReason || 'unknown';
                    const priority = session.metadata?.escalationPriority || 'medium';
                    escalationsByReason[reason] = (escalationsByReason[reason] || 0) + 1;
                    escalationsByPriority[priority] = (escalationsByPriority[priority] || 0) + 1;
                    if (session.metadata?.escalatedAt) {
                        const escalationTime = new Date(session.metadata.escalatedAt).getTime() - session.createdAt.getTime();
                        totalEscalationTime += escalationTime;
                    }
                });
                const averageEscalationTime = totalEscalations > 0 ? totalEscalationTime / totalEscalations : 0;
                // Calculate escalation rate (escalated sessions vs total sessions)
                const totalSessionsQuery = this.sessionRepository
                    .createQueryBuilder('session');
                if (timeframe) {
                    totalSessionsQuery.andWhere('session.createdAt BETWEEN :from AND :to', {
                        from: timeframe.from,
                        to: timeframe.to
                    });
                }
                const totalSessions = await totalSessionsQuery.getCount();
                const escalationRate = totalSessions > 0 ? (totalEscalations / totalSessions) * 100 : 0;
                return {
                    totalEscalations,
                    escalationsByReason,
                    escalationsByPriority,
                    averageEscalationTime,
                    escalationRate
                };
            }
            catch (error) {
                this.logger.error(`Error getting escalation statistics: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Perform escalation analysis on messages
         */
        performEscalationAnalysis(messages) {
            let shouldEscalate = false;
            let reason = 'no-escalation-needed';
            let priority = 'medium';
            let category;
            let confidence = 0.5;
            if (messages.length === 0) {
                return { shouldEscalate, reason, priority, confidence };
            }
            const userMessages = messages.filter(m => m.senderType === chat_message_entity_1.ChatMessageSenderType.USER);
            const aiMessages = messages.filter(m => m.senderType === chat_message_entity_1.ChatMessageSenderType.AI);
            // Analyze user message content
            const allUserContent = userMessages.map(m => m.content.toLowerCase()).join(' ');
            // Technical problem indicators
            const technicalPatterns = [
                /çalışmıyor|not working|broken|bozuk/i,
                /hata|error|bug|sorun/i,
                /yavaş|slow|performance|performans/i,
                /erişemiyorum|can't access|cannot access/i,
                /giriş yapamıyorum|can't login|cannot login/i,
                /kayıt olamıyorum|can't register|cannot register/i
            ];
            const technicalMatches = technicalPatterns.filter(pattern => pattern.test(allUserContent)).length;
            if (technicalMatches >= 2) {
                shouldEscalate = true;
                reason = 'technical-problem';
                priority = 'high';
                category = 'technical';
                confidence = Math.min(0.9, 0.6 + (technicalMatches * 0.1));
            }
            // Account/billing issues
            const accountPatterns = [
                /hesap|account/i,
                /fatura|billing|payment|ödeme/i,
                /subscription|abonelik/i,
                /iptal|cancel/i,
                /upgrade|downgrade/i,
                /para|money|ücret|fee/i
            ];
            const accountMatches = accountPatterns.filter(pattern => pattern.test(allUserContent)).length;
            if (accountMatches >= 2) {
                shouldEscalate = true;
                reason = 'account-billing';
                priority = 'high';
                category = 'billing';
                confidence = Math.min(0.9, 0.7 + (accountMatches * 0.1));
            }
            // Urgent language
            const urgentPatterns = [
                /acil|urgent|emergency/i,
                /hemen|immediately|asap/i,
                /kritik|critical/i,
                /önemli|important/i
            ];
            const urgentMatches = urgentPatterns.filter(pattern => pattern.test(allUserContent)).length;
            if (urgentMatches >= 1) {
                shouldEscalate = true;
                reason = 'urgent-request';
                priority = 'urgent';
                confidence = Math.min(0.95, confidence + 0.2);
            }
            // Frustration indicators
            const frustrationPatterns = [
                /sinirli|angry|frustrated/i,
                /berbat|terrible|awful/i,
                /işe yaramıyor|useless|doesn't work/i,
                /memnun değilim|not satisfied|unhappy/i
            ];
            const frustrationMatches = frustrationPatterns.filter(pattern => pattern.test(allUserContent)).length;
            if (frustrationMatches >= 1) {
                shouldEscalate = true;
                reason = 'customer-frustration';
                priority = 'high';
                confidence = Math.min(0.8, confidence + 0.15);
            }
            // Repetitive questions (user asking same thing multiple times)
            if (userMessages.length >= 3) {
                const uniqueQuestions = new Set(userMessages.map(m => m.content.toLowerCase().replace(/[^\w\s]/g, '').trim()));
                if (uniqueQuestions.size < userMessages.length * 0.7) {
                    shouldEscalate = true;
                    reason = 'repetitive-questions';
                    priority = 'medium';
                    confidence = Math.min(0.7, confidence + 0.1);
                }
            }
            // AI confidence analysis
            const lowConfidenceAiMessages = aiMessages.filter(m => m.metadata?.confidence && m.metadata.confidence < 0.5);
            if (lowConfidenceAiMessages.length >= 2) {
                shouldEscalate = true;
                reason = 'low-ai-confidence';
                priority = 'medium';
                confidence = Math.min(0.6, confidence + 0.1);
            }
            // Long conversation without resolution
            if (messages.length >= 10 && !shouldEscalate) {
                shouldEscalate = true;
                reason = 'long-conversation';
                priority = 'low';
                confidence = 0.4;
            }
            return {
                shouldEscalate,
                reason,
                priority,
                category,
                confidence
            };
        }
        /**
         * Generate escalation message based on reason and priority
         */
        generateEscalationMessage(reason, priority) {
            const messages = {
                'technical-problem': 'Teknik sorun nedeniyle sohbet destek ekibine yönlendirildi. Bir teknik uzman size yardımcı olacak.',
                'account-billing': 'Hesap/fatura konusu nedeniyle sohbet destek ekibine yönlendirildi. Uzman ekibimiz size yardımcı olacak.',
                'urgent-request': 'Acil talep nedeniyle sohbet öncelikli olarak destek ekibine yönlendirildi.',
                'customer-frustration': 'Daha iyi hizmet verebilmek için sohbet destek ekibine yönlendirildi.',
                'repetitive-questions': 'Sorularınıza daha detaylı yanıt verebilmek için destek ekibine yönlendirildi.',
                'low-ai-confidence': 'Size daha iyi yardımcı olabilmek için destek ekibine yönlendirildi.',
                'long-conversation': 'Uzun sohbet nedeniyle destek ekibine yönlendirildi.',
                'user-requested': 'Kullanıcı talebi üzerine destek ekibine yönlendirildi.'
            };
            const baseMessage = messages[reason] || messages['user-requested'];
            if (priority === 'urgent') {
                return `🚨 ${baseMessage} Acil öncelikle işleme alınacaktır.`;
            }
            else if (priority === 'high') {
                return `⚡ ${baseMessage} Yüksek öncelikle işleme alınacaktır.`;
            }
            return baseMessage;
        }
        /**
         * Send escalation notifications to relevant parties
         */
        async sendEscalationNotifications(data) {
            const notifications = [];
            try {
                // This would integrate with your notification system
                // For now, we'll just log the notifications that would be sent
                this.logger.log(`Would send escalation notification for session ${data.session.id}`);
                notifications.push('escalation-alert-sent');
                if (data.assignment) {
                    this.logger.log(`Would notify assigned support agent: ${data.assignment.supportUserId}`);
                    notifications.push('support-agent-notified');
                }
                if (data.priority === 'urgent') {
                    this.logger.log('Would send urgent escalation alert to managers');
                    notifications.push('manager-alert-sent');
                }
                return notifications;
            }
            catch (error) {
                this.logger.error(`Error sending escalation notifications: ${error.message}`, error.stack);
                return notifications;
            }
        }
        /**
         * Get escalation history for a session
         */
        async getSessionEscalationHistory(sessionId) {
            try {
                const session = await this.sessionRepository.findOne({
                    where: { id: sessionId }
                });
                if (!session) {
                    throw new Error('Session not found');
                }
                const escalations = [];
                // Check if session was escalated
                if (session.metadata?.escalatedFrom) {
                    escalations.push({
                        escalatedAt: new Date(session.metadata.escalatedAt),
                        escalatedBy: session.metadata.escalatedBy,
                        reason: session.metadata.escalationReason,
                        priority: session.metadata.escalationPriority,
                        category: session.metadata.escalationCategory,
                        notes: session.metadata.escalationNotes
                    });
                }
                return {
                    escalations,
                    currentStatus: session.sessionType
                };
            }
            catch (error) {
                this.logger.error(`Error getting escalation history for session ${sessionId}: ${error.message}`, error.stack);
                throw error;
            }
        }
    };
    return ChatEscalationService = _classThis;
})();
exports.ChatEscalationService = ChatEscalationService;
//# sourceMappingURL=chat-escalation.service.js.map