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
exports.ChatSessionService = void 0;
const common_1 = require("@nestjs/common");
const chat_session_entity_1 = require("../entities/chat-session.entity");
let ChatSessionService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChatSessionService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatSessionService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        chatSessionRepository;
        userRepository;
        constructor(chatSessionRepository, userRepository) {
            this.chatSessionRepository = chatSessionRepository;
            this.userRepository = userRepository;
        }
        /**
         * Create a new chat session
         */
        async createSession(createDto) {
            // Validate user exists
            const user = await this.userRepository.findOne({
                where: { id: createDto.userId }
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            // Check if user already has an active session of the same type
            const existingActiveSession = await this.chatSessionRepository.findOne({
                where: {
                    userId: createDto.userId,
                    sessionType: createDto.sessionType || chat_session_entity_1.ChatSessionType.SUPPORT,
                    status: chat_session_entity_1.ChatSessionStatus.ACTIVE
                }
            });
            if (existingActiveSession) {
                // Return existing active session instead of creating a new one
                return existingActiveSession;
            }
            const session = this.chatSessionRepository.create({
                userId: createDto.userId,
                sessionType: createDto.sessionType || chat_session_entity_1.ChatSessionType.SUPPORT,
                title: createDto.title,
                metadata: {
                    ...createDto.metadata,
                    messageCount: 0,
                    supportAssigned: false
                }
            });
            return await this.chatSessionRepository.save(session);
        }
        /**
         * Get a chat session by ID
         */
        async getSession(sessionId, userId) {
            const whereCondition = { id: sessionId };
            // If userId is provided, ensure user can only access their own sessions
            if (userId) {
                whereCondition.userId = userId;
            }
            const session = await this.chatSessionRepository.findOne({
                where: whereCondition,
                relations: ['user', 'messages', 'documents', 'supportAssignments']
            });
            if (!session) {
                throw new common_1.NotFoundException('Chat session not found');
            }
            return session;
        }
        /**
         * Get all sessions for a user
         */
        async getUserSessions(userId, filters) {
            const queryBuilder = this.chatSessionRepository.createQueryBuilder('session')
                .leftJoinAndSelect('session.user', 'user')
                .leftJoinAndSelect('session.messages', 'messages')
                .leftJoinAndSelect('session.supportAssignments', 'assignments')
                .where('session.userId = :userId', { userId });
            if (filters?.status) {
                queryBuilder.andWhere('session.status = :status', { status: filters.status });
            }
            if (filters?.sessionType) {
                queryBuilder.andWhere('session.sessionType = :sessionType', { sessionType: filters.sessionType });
            }
            queryBuilder.orderBy('session.updatedAt', 'DESC');
            if (filters?.limit) {
                queryBuilder.limit(filters.limit);
            }
            if (filters?.offset) {
                queryBuilder.offset(filters.offset);
            }
            return await queryBuilder.getMany();
        }
        /**
         * Update a chat session
         */
        async updateSession(sessionId, updateDto, userId) {
            const session = await this.getSession(sessionId, userId);
            // Update fields
            if (updateDto.title !== undefined) {
                session.title = updateDto.title;
            }
            if (updateDto.status !== undefined) {
                session.status = updateDto.status;
                // Set closedAt when closing session
                if (updateDto.status === chat_session_entity_1.ChatSessionStatus.CLOSED) {
                    session.closedAt = new Date();
                }
            }
            if (updateDto.sessionType !== undefined) {
                session.sessionType = updateDto.sessionType;
            }
            if (updateDto.metadata !== undefined) {
                session.metadata = {
                    ...session.metadata,
                    ...updateDto.metadata
                };
            }
            return await this.chatSessionRepository.save(session);
        }
        /**
         * Close a chat session
         */
        async closeSession(sessionId, userId) {
            return await this.updateSession(sessionId, {
                status: chat_session_entity_1.ChatSessionStatus.CLOSED
            }, userId);
        }
        /**
         * Get active sessions (for support team dashboard)
         */
        async getActiveSessions(filters) {
            const queryBuilder = this.chatSessionRepository.createQueryBuilder('session')
                .leftJoinAndSelect('session.user', 'user')
                .leftJoinAndSelect('session.messages', 'messages')
                .leftJoinAndSelect('session.supportAssignments', 'assignments')
                .leftJoinAndSelect('assignments.supportUser', 'supportUser')
                .where('session.status = :status', { status: chat_session_entity_1.ChatSessionStatus.ACTIVE });
            if (filters?.sessionType) {
                queryBuilder.andWhere('session.sessionType = :sessionType', { sessionType: filters.sessionType });
            }
            queryBuilder.orderBy('session.updatedAt', 'DESC');
            if (filters?.limit) {
                queryBuilder.limit(filters.limit);
            }
            return await queryBuilder.getMany();
        }
        /**
         * Validate session access for user
         */
        async validateSessionAccess(sessionId, userId) {
            const session = await this.chatSessionRepository.findOne({
                where: { id: sessionId, userId }
            });
            return !!session;
        }
        /**
         * Update session metadata
         */
        async updateSessionMetadata(sessionId, metadata, userId) {
            const session = await this.getSession(sessionId, userId);
            session.metadata = {
                ...session.metadata,
                ...metadata
            };
            return await this.chatSessionRepository.save(session);
        }
        /**
         * Get session statistics
         */
        async getSessionStats(userId) {
            const queryBuilder = this.chatSessionRepository.createQueryBuilder('session');
            if (userId) {
                queryBuilder.where('session.userId = :userId', { userId });
            }
            const [total, active, closed, support, general] = await Promise.all([
                queryBuilder.getCount(),
                queryBuilder.clone().andWhere('session.status = :status', { status: chat_session_entity_1.ChatSessionStatus.ACTIVE }).getCount(),
                queryBuilder.clone().andWhere('session.status = :status', { status: chat_session_entity_1.ChatSessionStatus.CLOSED }).getCount(),
                queryBuilder.clone().andWhere('session.sessionType = :type', { type: chat_session_entity_1.ChatSessionType.SUPPORT }).getCount(),
                queryBuilder.clone().andWhere('session.sessionType = :type', { type: chat_session_entity_1.ChatSessionType.GENERAL }).getCount()
            ]);
            return {
                total,
                active,
                closed,
                support,
                general
            };
        }
    };
    return ChatSessionService = _classThis;
})();
exports.ChatSessionService = ChatSessionService;
//# sourceMappingURL=chat-session.service.js.map