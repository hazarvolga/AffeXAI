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
exports.ChatMessageService = void 0;
const common_1 = require("@nestjs/common");
const chat_message_entity_1 = require("../entities/chat-message.entity");
let ChatMessageService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChatMessageService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatMessageService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        chatMessageRepository;
        chatSessionRepository;
        chatSessionService;
        constructor(chatMessageRepository, chatSessionRepository, chatSessionService) {
            this.chatMessageRepository = chatMessageRepository;
            this.chatSessionRepository = chatSessionRepository;
            this.chatSessionService = chatSessionService;
        }
        /**
         * Send a new message
         */
        async sendMessage(createDto, userId) {
            // Validate session exists and user has access
            const session = await this.chatSessionService.getSession(createDto.sessionId, userId);
            if (!session.isActive) {
                throw new common_1.BadRequestException('Cannot send message to inactive session');
            }
            // Validate content
            if (!createDto.content || createDto.content.trim().length === 0) {
                throw new common_1.BadRequestException('Message content cannot be empty');
            }
            // Content filtering and validation
            const filteredContent = this.filterContent(createDto.content);
            const message = this.chatMessageRepository.create({
                sessionId: createDto.sessionId,
                senderType: createDto.senderType,
                senderId: createDto.senderId,
                content: filteredContent,
                messageType: createDto.messageType || chat_message_entity_1.ChatMessageType.TEXT,
                metadata: createDto.metadata || {}
            });
            const savedMessage = await this.chatMessageRepository.save(message);
            // Update session metadata
            await this.updateSessionMessageCount(createDto.sessionId);
            return savedMessage;
        }
        /**
         * Get messages for a session
         */
        async getMessages(sessionId, pagination, userId) {
            // Validate session access
            await this.chatSessionService.getSession(sessionId, userId);
            const queryBuilder = this.chatMessageRepository.createQueryBuilder('message')
                .leftJoinAndSelect('message.sender', 'sender')
                .leftJoinAndSelect('message.contextSources', 'contextSources')
                .where('message.sessionId = :sessionId', { sessionId })
                .orderBy('message.createdAt', 'ASC');
            if (pagination?.limit) {
                queryBuilder.limit(pagination.limit);
            }
            if (pagination?.offset) {
                queryBuilder.offset(pagination.offset);
            }
            else if (pagination?.page && pagination?.limit) {
                queryBuilder.offset((pagination.page - 1) * pagination.limit);
            }
            return await queryBuilder.getMany();
        }
        /**
         * Get a specific message
         */
        async getMessage(messageId, userId) {
            const message = await this.chatMessageRepository.findOne({
                where: { id: messageId },
                relations: ['session', 'sender', 'contextSources']
            });
            if (!message) {
                throw new common_1.NotFoundException('Message not found');
            }
            // Validate user has access to the session
            if (userId) {
                await this.chatSessionService.validateSessionAccess(message.sessionId, userId);
            }
            return message;
        }
        /**
         * Update a message (for editing)
         */
        async updateMessage(messageId, updateDto, userId) {
            const message = await this.getMessage(messageId, userId);
            // Only allow updating user messages
            if (message.senderType !== chat_message_entity_1.ChatMessageSenderType.USER) {
                throw new common_1.ForbiddenException('Only user messages can be edited');
            }
            // Validate user is the sender
            if (userId && message.senderId !== userId) {
                throw new common_1.ForbiddenException('You can only edit your own messages');
            }
            if (updateDto.content !== undefined) {
                message.content = this.filterContent(updateDto.content);
                message.metadata = {
                    ...message.metadata,
                    isEdited: true,
                    editedAt: new Date()
                };
            }
            if (updateDto.metadata !== undefined) {
                message.metadata = {
                    ...message.metadata,
                    ...updateDto.metadata
                };
            }
            return await this.chatMessageRepository.save(message);
        }
        /**
         * Delete a message
         */
        async deleteMessage(messageId, userId) {
            const message = await this.getMessage(messageId, userId);
            // Only allow deleting user messages
            if (message.senderType !== chat_message_entity_1.ChatMessageSenderType.USER) {
                throw new common_1.ForbiddenException('Only user messages can be deleted');
            }
            // Validate user is the sender
            if (userId && message.senderId !== userId) {
                throw new common_1.ForbiddenException('You can only delete your own messages');
            }
            await this.chatMessageRepository.remove(message);
            // Update session message count
            await this.updateSessionMessageCount(message.sessionId);
        }
        /**
         * Get messages with filters
         */
        async getMessagesWithFilters(filters) {
            const queryBuilder = this.chatMessageRepository.createQueryBuilder('message')
                .leftJoinAndSelect('message.sender', 'sender')
                .leftJoinAndSelect('message.session', 'session')
                .leftJoinAndSelect('message.contextSources', 'contextSources');
            if (filters.sessionId) {
                queryBuilder.andWhere('message.sessionId = :sessionId', { sessionId: filters.sessionId });
            }
            if (filters.senderType) {
                queryBuilder.andWhere('message.senderType = :senderType', { senderType: filters.senderType });
            }
            if (filters.messageType) {
                queryBuilder.andWhere('message.messageType = :messageType', { messageType: filters.messageType });
            }
            if (filters.fromDate) {
                queryBuilder.andWhere('message.createdAt >= :fromDate', { fromDate: filters.fromDate });
            }
            if (filters.toDate) {
                queryBuilder.andWhere('message.createdAt <= :toDate', { toDate: filters.toDate });
            }
            queryBuilder.orderBy('message.createdAt', 'DESC');
            if (filters.limit) {
                queryBuilder.limit(filters.limit);
            }
            if (filters.offset) {
                queryBuilder.offset(filters.offset);
            }
            return await queryBuilder.getMany();
        }
        /**
         * Get message statistics
         */
        async getMessageStats(sessionId) {
            const queryBuilder = this.chatMessageRepository.createQueryBuilder('message');
            if (sessionId) {
                queryBuilder.where('message.sessionId = :sessionId', { sessionId });
            }
            const [total, userMessages, aiMessages, supportMessages, systemMessages] = await Promise.all([
                queryBuilder.getCount(),
                queryBuilder.clone().andWhere('message.senderType = :type', { type: chat_message_entity_1.ChatMessageSenderType.USER }).getCount(),
                queryBuilder.clone().andWhere('message.senderType = :type', { type: chat_message_entity_1.ChatMessageSenderType.AI }).getCount(),
                queryBuilder.clone().andWhere('message.senderType = :type', { type: chat_message_entity_1.ChatMessageSenderType.SUPPORT }).getCount(),
                queryBuilder.clone().andWhere('message.messageType = :type', { type: chat_message_entity_1.ChatMessageType.SYSTEM }).getCount()
            ]);
            return {
                total,
                userMessages,
                aiMessages,
                supportMessages,
                systemMessages
            };
        }
        /**
         * Search messages by content
         */
        async searchMessages(query, sessionId, limit = 50) {
            const queryBuilder = this.chatMessageRepository.createQueryBuilder('message')
                .leftJoinAndSelect('message.sender', 'sender')
                .leftJoinAndSelect('message.session', 'session')
                .where('message.content ILIKE :query', { query: `%${query}%` });
            if (sessionId) {
                queryBuilder.andWhere('message.sessionId = :sessionId', { sessionId });
            }
            queryBuilder
                .orderBy('message.createdAt', 'DESC')
                .limit(limit);
            return await queryBuilder.getMany();
        }
        /**
         * Get recent messages across all sessions
         */
        async getRecentMessages(limit = 100) {
            return await this.chatMessageRepository.find({
                relations: ['sender', 'session', 'session.user'],
                order: { createdAt: 'DESC' },
                take: limit
            });
        }
        /**
         * Private helper methods
         */
        filterContent(content) {
            // Basic content filtering
            let filtered = content.trim();
            // Remove excessive whitespace
            filtered = filtered.replace(/\s+/g, ' ');
            // Basic XSS prevention (remove script tags)
            filtered = filtered.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            // Limit length
            if (filtered.length > 10000) {
                filtered = filtered.substring(0, 10000) + '...';
            }
            return filtered;
        }
        async updateSessionMessageCount(sessionId) {
            const messageCount = await this.chatMessageRepository.count({
                where: { sessionId }
            });
            await this.chatSessionRepository.update(sessionId, {
                metadata: () => `jsonb_set(metadata, '{messageCount}', '${messageCount}')`
            });
        }
    };
    return ChatMessageService = _classThis;
})();
exports.ChatMessageService = ChatMessageService;
//# sourceMappingURL=chat-message.service.js.map