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
exports.RealTimeProcessorService = void 0;
const common_1 = require("@nestjs/common");
const ticket_status_enum_1 = require("../../tickets/enums/ticket-status.enum");
let RealTimeProcessorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RealTimeProcessorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            RealTimeProcessorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        chatSessionRepository;
        chatMessageRepository;
        ticketRepository;
        configRepository;
        faqLearningService;
        chatFaqIntegration;
        eventEmitter;
        logger = new common_1.Logger(RealTimeProcessorService.name);
        processingQueue = new Map();
        constructor(chatSessionRepository, chatMessageRepository, ticketRepository, configRepository, faqLearningService, chatFaqIntegration, eventEmitter) {
            this.chatSessionRepository = chatSessionRepository;
            this.chatMessageRepository = chatMessageRepository;
            this.ticketRepository = ticketRepository;
            this.configRepository = configRepository;
            this.faqLearningService = faqLearningService;
            this.chatFaqIntegration = chatFaqIntegration;
            this.eventEmitter = eventEmitter;
        }
        async processChatSession(sessionId) {
            try {
                const config = await this.getProcessingConfig();
                if (!config.enableChatProcessing) {
                    return { processed: false, reason: 'Chat processing is disabled' };
                }
                this.logger.log(`Processing chat session ${sessionId} for FAQ learning`);
                const session = await this.chatSessionRepository.findOne({
                    where: { id: sessionId },
                    relations: ['messages'],
                });
                if (!session) {
                    return { processed: false, reason: 'Session not found' };
                }
                if (!this.shouldProcessChatSession(session, config)) {
                    return { processed: false, reason: 'Session does not meet processing criteria' };
                }
                await this.scheduleProcessing(`chat-${sessionId}`, config.processingDelay, async () => {
                    await this.executeChatProcessing(session);
                });
                return { processed: true, reason: 'Chat session scheduled for processing' };
            }
            catch (error) {
                this.logger.error(`Failed to process chat session ${sessionId}:`, error);
                return { processed: false, reason: error.message };
            }
        }
        async processTicket(ticketId) {
            try {
                const config = await this.getProcessingConfig();
                if (!config.enableTicketProcessing) {
                    return { processed: false, reason: 'Ticket processing is disabled' };
                }
                this.logger.log(`Processing ticket ${ticketId} for FAQ learning`);
                const ticket = await this.ticketRepository.findOne({
                    where: { id: ticketId },
                    relations: ['messages', 'messages.author'],
                });
                if (!ticket) {
                    return { processed: false, reason: 'Ticket not found' };
                }
                if (!this.shouldProcessTicket(ticket, config)) {
                    return { processed: false, reason: 'Ticket does not meet processing criteria' };
                }
                await this.scheduleProcessing(`ticket-${ticketId}`, config.processingDelay, async () => {
                    await this.executeTicketProcessing(ticket);
                });
                return { processed: true, reason: 'Ticket scheduled for processing' };
            }
            catch (error) {
                this.logger.error(`Failed to process ticket ${ticketId}:`, error);
                return { processed: false, reason: error.message };
            }
        }
        async processChatMessageFeedback(messageId, isHelpful) {
            try {
                if (!isHelpful) {
                    return { processed: false, reason: 'Only positive feedback triggers processing' };
                }
                const message = await this.chatMessageRepository.findOne({
                    where: { id: messageId },
                    relations: ['session', 'session.messages'],
                });
                if (!message || !message.session) {
                    return { processed: false, reason: 'Message or session not found' };
                }
                this.logger.log(`Processing chat message ${messageId} with positive feedback`);
                return await this.processChatSession(message.session.id);
            }
            catch (error) {
                this.logger.error(`Failed to process chat message feedback ${messageId}:`, error);
                return { processed: false, reason: error.message };
            }
        }
        shouldProcessChatSession(session, config) {
            if (!session.messages || session.messages.length < config.minChatMessagesForProcessing) {
                return false;
            }
            const hasPositiveFeedback = session.messages.some(msg => msg.isHelpful === true);
            if (!hasPositiveFeedback) {
                return false;
            }
            const avgConfidence = this.calculateAverageConfidence(session.messages);
            if (avgConfidence < config.chatFeedbackThreshold) {
                return false;
            }
            return true;
        }
        shouldProcessTicket(ticket, config) {
            if (ticket.status !== ticket_status_enum_1.TicketStatus.RESOLVED) {
                return false;
            }
            if (!ticket.messages || ticket.messages.length < config.minTicketMessagesForProcessing) {
                return false;
            }
            if (ticket.resolutionTimeHours && ticket.resolutionTimeHours > config.ticketResolutionTimeThreshold) {
                return false;
            }
            if (ticket.isSLABreached) {
                return false;
            }
            return true;
        }
        calculateAverageConfidence(messages) {
            const botMessages = messages.filter(msg => msg.confidenceScore !== null);
            if (botMessages.length === 0)
                return 0;
            const sum = botMessages.reduce((acc, msg) => acc + (msg.confidenceScore || 0), 0);
            return sum / botMessages.length;
        }
        async scheduleProcessing(key, delay, processor) {
            const existing = this.processingQueue.get(key);
            if (existing) {
                clearTimeout(existing);
            }
            const timeout = setTimeout(async () => {
                try {
                    await processor();
                    this.processingQueue.delete(key);
                }
                catch (error) {
                    this.logger.error(`Scheduled processing failed for ${key}:`, error);
                    this.processingQueue.delete(key);
                }
            }, delay);
            this.processingQueue.set(key, timeout);
        }
        async executeChatProcessing(session) {
            this.logger.log(`Executing FAQ learning for chat session ${session.id}`);
            try {
                await this.faqLearningService.processRealTimeData('chat', session.id);
                this.logger.log(`Chat session ${session.id} processed successfully`);
            }
            catch (error) {
                this.logger.error(`Chat processing failed for session ${session.id}:`, error);
            }
        }
        async executeTicketProcessing(ticket) {
            this.logger.log(`Executing FAQ learning for ticket ${ticket.id}`);
            try {
                await this.faqLearningService.processRealTimeData('ticket', ticket.id);
                this.logger.log(`Ticket ${ticket.id} processed successfully`);
            }
            catch (error) {
                this.logger.error(`Ticket processing failed for ticket ${ticket.id}:`, error);
            }
        }
        async getProcessingConfig() {
            try {
                const configs = await this.configRepository.find({
                    where: [
                        { configKey: 'advanced_settings' },
                        { configKey: 'data_processing' },
                    ],
                });
                const advancedSettings = configs.find(c => c.configKey === 'advanced_settings')?.configValue || {};
                const dataProcessing = configs.find(c => c.configKey === 'data_processing')?.configValue || {};
                return {
                    enableChatProcessing: advancedSettings.enableRealTimeProcessing || false,
                    enableTicketProcessing: advancedSettings.enableRealTimeProcessing || false,
                    minChatMessagesForProcessing: dataProcessing.minChatMessages || 3,
                    minTicketMessagesForProcessing: dataProcessing.minTicketMessages || 2,
                    processingDelay: dataProcessing.processingDelay || 5000,
                    chatFeedbackThreshold: advancedSettings.chatFeedbackThreshold || 70,
                    ticketResolutionTimeThreshold: advancedSettings.ticketResolutionTimeThreshold || 24,
                };
            }
            catch (error) {
                this.logger.error('Failed to load processing config:', error);
                return {
                    enableChatProcessing: false,
                    enableTicketProcessing: false,
                    minChatMessagesForProcessing: 3,
                    minTicketMessagesForProcessing: 2,
                    processingDelay: 5000,
                    chatFeedbackThreshold: 70,
                    ticketResolutionTimeThreshold: 24,
                };
            }
        }
        getQueueStatus() {
            return {
                queueSize: this.processingQueue.size,
                pendingItems: Array.from(this.processingQueue.keys()),
            };
        }
        clearQueue() {
            for (const timeout of this.processingQueue.values()) {
                clearTimeout(timeout);
            }
            this.processingQueue.clear();
            this.logger.log('Processing queue cleared');
        }
    };
    return RealTimeProcessorService = _classThis;
})();
exports.RealTimeProcessorService = RealTimeProcessorService;
//# sourceMappingURL=real-time-processor.service.js.map