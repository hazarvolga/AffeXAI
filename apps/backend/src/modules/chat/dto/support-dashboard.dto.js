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
exports.SessionOverviewQueryDto = exports.DashboardQueryDto = exports.RealTimeMetricsResponseDto = exports.EscalationAlertResponseDto = exports.SessionOverviewResponseDto = exports.SupportAgentStatsResponseDto = exports.DashboardStatsResponseDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const chat_session_entity_1 = require("../entities/chat-session.entity");
let DashboardStatsResponseDto = (() => {
    let _activeSessions_decorators;
    let _activeSessions_initializers = [];
    let _activeSessions_extraInitializers = [];
    let _waitingSessions_decorators;
    let _waitingSessions_initializers = [];
    let _waitingSessions_extraInitializers = [];
    let _totalSessionsToday_decorators;
    let _totalSessionsToday_initializers = [];
    let _totalSessionsToday_extraInitializers = [];
    let _avgResponseTime_decorators;
    let _avgResponseTime_initializers = [];
    let _avgResponseTime_extraInitializers = [];
    let _avgResolutionTime_decorators;
    let _avgResolutionTime_initializers = [];
    let _avgResolutionTime_extraInitializers = [];
    let _customerSatisfactionScore_decorators;
    let _customerSatisfactionScore_initializers = [];
    let _customerSatisfactionScore_extraInitializers = [];
    let _escalationRate_decorators;
    let _escalationRate_initializers = [];
    let _escalationRate_extraInitializers = [];
    return class DashboardStatsResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _activeSessions_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of active chat sessions' })];
            _waitingSessions_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of sessions waiting for support assignment' })];
            _totalSessionsToday_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total sessions created today' })];
            _avgResponseTime_decorators = [(0, swagger_1.ApiProperty)({ description: 'Average response time in minutes' })];
            _avgResolutionTime_decorators = [(0, swagger_1.ApiProperty)({ description: 'Average resolution time in minutes' })];
            _customerSatisfactionScore_decorators = [(0, swagger_1.ApiProperty)({ description: 'Customer satisfaction score (1-5)' })];
            _escalationRate_decorators = [(0, swagger_1.ApiProperty)({ description: 'Escalation rate as percentage' })];
            __esDecorate(null, null, _activeSessions_decorators, { kind: "field", name: "activeSessions", static: false, private: false, access: { has: obj => "activeSessions" in obj, get: obj => obj.activeSessions, set: (obj, value) => { obj.activeSessions = value; } }, metadata: _metadata }, _activeSessions_initializers, _activeSessions_extraInitializers);
            __esDecorate(null, null, _waitingSessions_decorators, { kind: "field", name: "waitingSessions", static: false, private: false, access: { has: obj => "waitingSessions" in obj, get: obj => obj.waitingSessions, set: (obj, value) => { obj.waitingSessions = value; } }, metadata: _metadata }, _waitingSessions_initializers, _waitingSessions_extraInitializers);
            __esDecorate(null, null, _totalSessionsToday_decorators, { kind: "field", name: "totalSessionsToday", static: false, private: false, access: { has: obj => "totalSessionsToday" in obj, get: obj => obj.totalSessionsToday, set: (obj, value) => { obj.totalSessionsToday = value; } }, metadata: _metadata }, _totalSessionsToday_initializers, _totalSessionsToday_extraInitializers);
            __esDecorate(null, null, _avgResponseTime_decorators, { kind: "field", name: "avgResponseTime", static: false, private: false, access: { has: obj => "avgResponseTime" in obj, get: obj => obj.avgResponseTime, set: (obj, value) => { obj.avgResponseTime = value; } }, metadata: _metadata }, _avgResponseTime_initializers, _avgResponseTime_extraInitializers);
            __esDecorate(null, null, _avgResolutionTime_decorators, { kind: "field", name: "avgResolutionTime", static: false, private: false, access: { has: obj => "avgResolutionTime" in obj, get: obj => obj.avgResolutionTime, set: (obj, value) => { obj.avgResolutionTime = value; } }, metadata: _metadata }, _avgResolutionTime_initializers, _avgResolutionTime_extraInitializers);
            __esDecorate(null, null, _customerSatisfactionScore_decorators, { kind: "field", name: "customerSatisfactionScore", static: false, private: false, access: { has: obj => "customerSatisfactionScore" in obj, get: obj => obj.customerSatisfactionScore, set: (obj, value) => { obj.customerSatisfactionScore = value; } }, metadata: _metadata }, _customerSatisfactionScore_initializers, _customerSatisfactionScore_extraInitializers);
            __esDecorate(null, null, _escalationRate_decorators, { kind: "field", name: "escalationRate", static: false, private: false, access: { has: obj => "escalationRate" in obj, get: obj => obj.escalationRate, set: (obj, value) => { obj.escalationRate = value; } }, metadata: _metadata }, _escalationRate_initializers, _escalationRate_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        activeSessions = __runInitializers(this, _activeSessions_initializers, void 0);
        waitingSessions = (__runInitializers(this, _activeSessions_extraInitializers), __runInitializers(this, _waitingSessions_initializers, void 0));
        totalSessionsToday = (__runInitializers(this, _waitingSessions_extraInitializers), __runInitializers(this, _totalSessionsToday_initializers, void 0));
        avgResponseTime = (__runInitializers(this, _totalSessionsToday_extraInitializers), __runInitializers(this, _avgResponseTime_initializers, void 0));
        avgResolutionTime = (__runInitializers(this, _avgResponseTime_extraInitializers), __runInitializers(this, _avgResolutionTime_initializers, void 0));
        customerSatisfactionScore = (__runInitializers(this, _avgResolutionTime_extraInitializers), __runInitializers(this, _customerSatisfactionScore_initializers, void 0));
        escalationRate = (__runInitializers(this, _customerSatisfactionScore_extraInitializers), __runInitializers(this, _escalationRate_initializers, void 0));
        constructor() {
            __runInitializers(this, _escalationRate_extraInitializers);
        }
    };
})();
exports.DashboardStatsResponseDto = DashboardStatsResponseDto;
let SupportAgentStatsResponseDto = (() => {
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _userName_decorators;
    let _userName_initializers = [];
    let _userName_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _activeSessions_decorators;
    let _activeSessions_initializers = [];
    let _activeSessions_extraInitializers = [];
    let _completedToday_decorators;
    let _completedToday_initializers = [];
    let _completedToday_extraInitializers = [];
    let _avgResponseTime_decorators;
    let _avgResponseTime_initializers = [];
    let _avgResponseTime_extraInitializers = [];
    let _avgResolutionTime_decorators;
    let _avgResolutionTime_initializers = [];
    let _avgResolutionTime_extraInitializers = [];
    let _customerRating_decorators;
    let _customerRating_initializers = [];
    let _customerRating_extraInitializers = [];
    let _isOnline_decorators;
    let _isOnline_initializers = [];
    let _isOnline_extraInitializers = [];
    let _lastActivity_decorators;
    let _lastActivity_initializers = [];
    let _lastActivity_extraInitializers = [];
    let _workloadCapacity_decorators;
    let _workloadCapacity_initializers = [];
    let _workloadCapacity_extraInitializers = [];
    return class SupportAgentStatsResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _userId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Support agent user ID' })];
            _userName_decorators = [(0, swagger_1.ApiProperty)({ description: 'Support agent full name' })];
            _email_decorators = [(0, swagger_1.ApiProperty)({ description: 'Support agent email' })];
            _activeSessions_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of active sessions assigned' })];
            _completedToday_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of sessions completed today' })];
            _avgResponseTime_decorators = [(0, swagger_1.ApiProperty)({ description: 'Average response time in minutes' })];
            _avgResolutionTime_decorators = [(0, swagger_1.ApiProperty)({ description: 'Average resolution time in minutes' })];
            _customerRating_decorators = [(0, swagger_1.ApiProperty)({ description: 'Customer rating (1-5)' })];
            _isOnline_decorators = [(0, swagger_1.ApiProperty)({ description: 'Whether agent is currently online' })];
            _lastActivity_decorators = [(0, swagger_1.ApiProperty)({ description: 'Last activity timestamp' })];
            _workloadCapacity_decorators = [(0, swagger_1.ApiProperty)({ description: 'Workload capacity as percentage' })];
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _userName_decorators, { kind: "field", name: "userName", static: false, private: false, access: { has: obj => "userName" in obj, get: obj => obj.userName, set: (obj, value) => { obj.userName = value; } }, metadata: _metadata }, _userName_initializers, _userName_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _activeSessions_decorators, { kind: "field", name: "activeSessions", static: false, private: false, access: { has: obj => "activeSessions" in obj, get: obj => obj.activeSessions, set: (obj, value) => { obj.activeSessions = value; } }, metadata: _metadata }, _activeSessions_initializers, _activeSessions_extraInitializers);
            __esDecorate(null, null, _completedToday_decorators, { kind: "field", name: "completedToday", static: false, private: false, access: { has: obj => "completedToday" in obj, get: obj => obj.completedToday, set: (obj, value) => { obj.completedToday = value; } }, metadata: _metadata }, _completedToday_initializers, _completedToday_extraInitializers);
            __esDecorate(null, null, _avgResponseTime_decorators, { kind: "field", name: "avgResponseTime", static: false, private: false, access: { has: obj => "avgResponseTime" in obj, get: obj => obj.avgResponseTime, set: (obj, value) => { obj.avgResponseTime = value; } }, metadata: _metadata }, _avgResponseTime_initializers, _avgResponseTime_extraInitializers);
            __esDecorate(null, null, _avgResolutionTime_decorators, { kind: "field", name: "avgResolutionTime", static: false, private: false, access: { has: obj => "avgResolutionTime" in obj, get: obj => obj.avgResolutionTime, set: (obj, value) => { obj.avgResolutionTime = value; } }, metadata: _metadata }, _avgResolutionTime_initializers, _avgResolutionTime_extraInitializers);
            __esDecorate(null, null, _customerRating_decorators, { kind: "field", name: "customerRating", static: false, private: false, access: { has: obj => "customerRating" in obj, get: obj => obj.customerRating, set: (obj, value) => { obj.customerRating = value; } }, metadata: _metadata }, _customerRating_initializers, _customerRating_extraInitializers);
            __esDecorate(null, null, _isOnline_decorators, { kind: "field", name: "isOnline", static: false, private: false, access: { has: obj => "isOnline" in obj, get: obj => obj.isOnline, set: (obj, value) => { obj.isOnline = value; } }, metadata: _metadata }, _isOnline_initializers, _isOnline_extraInitializers);
            __esDecorate(null, null, _lastActivity_decorators, { kind: "field", name: "lastActivity", static: false, private: false, access: { has: obj => "lastActivity" in obj, get: obj => obj.lastActivity, set: (obj, value) => { obj.lastActivity = value; } }, metadata: _metadata }, _lastActivity_initializers, _lastActivity_extraInitializers);
            __esDecorate(null, null, _workloadCapacity_decorators, { kind: "field", name: "workloadCapacity", static: false, private: false, access: { has: obj => "workloadCapacity" in obj, get: obj => obj.workloadCapacity, set: (obj, value) => { obj.workloadCapacity = value; } }, metadata: _metadata }, _workloadCapacity_initializers, _workloadCapacity_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        userId = __runInitializers(this, _userId_initializers, void 0);
        userName = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _userName_initializers, void 0));
        email = (__runInitializers(this, _userName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
        activeSessions = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _activeSessions_initializers, void 0));
        completedToday = (__runInitializers(this, _activeSessions_extraInitializers), __runInitializers(this, _completedToday_initializers, void 0));
        avgResponseTime = (__runInitializers(this, _completedToday_extraInitializers), __runInitializers(this, _avgResponseTime_initializers, void 0));
        avgResolutionTime = (__runInitializers(this, _avgResponseTime_extraInitializers), __runInitializers(this, _avgResolutionTime_initializers, void 0));
        customerRating = (__runInitializers(this, _avgResolutionTime_extraInitializers), __runInitializers(this, _customerRating_initializers, void 0));
        isOnline = (__runInitializers(this, _customerRating_extraInitializers), __runInitializers(this, _isOnline_initializers, void 0));
        lastActivity = (__runInitializers(this, _isOnline_extraInitializers), __runInitializers(this, _lastActivity_initializers, void 0));
        workloadCapacity = (__runInitializers(this, _lastActivity_extraInitializers), __runInitializers(this, _workloadCapacity_initializers, void 0));
        constructor() {
            __runInitializers(this, _workloadCapacity_extraInitializers);
        }
    };
})();
exports.SupportAgentStatsResponseDto = SupportAgentStatsResponseDto;
let SessionOverviewResponseDto = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _customerName_decorators;
    let _customerName_initializers = [];
    let _customerName_extraInitializers = [];
    let _customerEmail_decorators;
    let _customerEmail_initializers = [];
    let _customerEmail_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _lastMessageAt_decorators;
    let _lastMessageAt_initializers = [];
    let _lastMessageAt_extraInitializers = [];
    let _messageCount_decorators;
    let _messageCount_initializers = [];
    let _messageCount_extraInitializers = [];
    let _assignedSupport_decorators;
    let _assignedSupport_initializers = [];
    let _assignedSupport_extraInitializers = [];
    let _urgencyLevel_decorators;
    let _urgencyLevel_initializers = [];
    let _urgencyLevel_extraInitializers = [];
    let _hasUnreadMessages_decorators;
    let _hasUnreadMessages_initializers = [];
    let _hasUnreadMessages_extraInitializers = [];
    let _waitingTime_decorators;
    let _waitingTime_initializers = [];
    let _waitingTime_extraInitializers = [];
    let _tags_decorators;
    let _tags_initializers = [];
    let _tags_extraInitializers = [];
    return class SessionOverviewResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Session ID' })];
            _userId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Customer user ID' })];
            _customerName_decorators = [(0, swagger_1.ApiProperty)({ description: 'Customer full name' })];
            _customerEmail_decorators = [(0, swagger_1.ApiProperty)({ description: 'Customer email' })];
            _status_decorators = [(0, swagger_1.ApiProperty)({ description: 'Session status', enum: chat_session_entity_1.ChatSessionStatus })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Session creation timestamp' })];
            _lastMessageAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Last message timestamp' })];
            _messageCount_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total number of messages' })];
            _assignedSupport_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Assigned support agent info' })];
            _urgencyLevel_decorators = [(0, swagger_1.ApiProperty)({ description: 'Session urgency level' })];
            _hasUnreadMessages_decorators = [(0, swagger_1.ApiProperty)({ description: 'Whether session has unread messages' })];
            _waitingTime_decorators = [(0, swagger_1.ApiProperty)({ description: 'Waiting time in minutes' })];
            _tags_decorators = [(0, swagger_1.ApiProperty)({ description: 'Session tags' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _customerName_decorators, { kind: "field", name: "customerName", static: false, private: false, access: { has: obj => "customerName" in obj, get: obj => obj.customerName, set: (obj, value) => { obj.customerName = value; } }, metadata: _metadata }, _customerName_initializers, _customerName_extraInitializers);
            __esDecorate(null, null, _customerEmail_decorators, { kind: "field", name: "customerEmail", static: false, private: false, access: { has: obj => "customerEmail" in obj, get: obj => obj.customerEmail, set: (obj, value) => { obj.customerEmail = value; } }, metadata: _metadata }, _customerEmail_initializers, _customerEmail_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _lastMessageAt_decorators, { kind: "field", name: "lastMessageAt", static: false, private: false, access: { has: obj => "lastMessageAt" in obj, get: obj => obj.lastMessageAt, set: (obj, value) => { obj.lastMessageAt = value; } }, metadata: _metadata }, _lastMessageAt_initializers, _lastMessageAt_extraInitializers);
            __esDecorate(null, null, _messageCount_decorators, { kind: "field", name: "messageCount", static: false, private: false, access: { has: obj => "messageCount" in obj, get: obj => obj.messageCount, set: (obj, value) => { obj.messageCount = value; } }, metadata: _metadata }, _messageCount_initializers, _messageCount_extraInitializers);
            __esDecorate(null, null, _assignedSupport_decorators, { kind: "field", name: "assignedSupport", static: false, private: false, access: { has: obj => "assignedSupport" in obj, get: obj => obj.assignedSupport, set: (obj, value) => { obj.assignedSupport = value; } }, metadata: _metadata }, _assignedSupport_initializers, _assignedSupport_extraInitializers);
            __esDecorate(null, null, _urgencyLevel_decorators, { kind: "field", name: "urgencyLevel", static: false, private: false, access: { has: obj => "urgencyLevel" in obj, get: obj => obj.urgencyLevel, set: (obj, value) => { obj.urgencyLevel = value; } }, metadata: _metadata }, _urgencyLevel_initializers, _urgencyLevel_extraInitializers);
            __esDecorate(null, null, _hasUnreadMessages_decorators, { kind: "field", name: "hasUnreadMessages", static: false, private: false, access: { has: obj => "hasUnreadMessages" in obj, get: obj => obj.hasUnreadMessages, set: (obj, value) => { obj.hasUnreadMessages = value; } }, metadata: _metadata }, _hasUnreadMessages_initializers, _hasUnreadMessages_extraInitializers);
            __esDecorate(null, null, _waitingTime_decorators, { kind: "field", name: "waitingTime", static: false, private: false, access: { has: obj => "waitingTime" in obj, get: obj => obj.waitingTime, set: (obj, value) => { obj.waitingTime = value; } }, metadata: _metadata }, _waitingTime_initializers, _waitingTime_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: obj => "tags" in obj, get: obj => obj.tags, set: (obj, value) => { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        customerName = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _customerName_initializers, void 0));
        customerEmail = (__runInitializers(this, _customerName_extraInitializers), __runInitializers(this, _customerEmail_initializers, void 0));
        status = (__runInitializers(this, _customerEmail_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        createdAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        lastMessageAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _lastMessageAt_initializers, void 0));
        messageCount = (__runInitializers(this, _lastMessageAt_extraInitializers), __runInitializers(this, _messageCount_initializers, void 0));
        assignedSupport = (__runInitializers(this, _messageCount_extraInitializers), __runInitializers(this, _assignedSupport_initializers, void 0));
        urgencyLevel = (__runInitializers(this, _assignedSupport_extraInitializers), __runInitializers(this, _urgencyLevel_initializers, void 0));
        hasUnreadMessages = (__runInitializers(this, _urgencyLevel_extraInitializers), __runInitializers(this, _hasUnreadMessages_initializers, void 0));
        waitingTime = (__runInitializers(this, _hasUnreadMessages_extraInitializers), __runInitializers(this, _waitingTime_initializers, void 0));
        tags = (__runInitializers(this, _waitingTime_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
        constructor() {
            __runInitializers(this, _tags_extraInitializers);
        }
    };
})();
exports.SessionOverviewResponseDto = SessionOverviewResponseDto;
let EscalationAlertResponseDto = (() => {
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _customerName_decorators;
    let _customerName_initializers = [];
    let _customerName_extraInitializers = [];
    let _escalatedBy_decorators;
    let _escalatedBy_initializers = [];
    let _escalatedBy_extraInitializers = [];
    let _escalatedByName_decorators;
    let _escalatedByName_initializers = [];
    let _escalatedByName_extraInitializers = [];
    let _escalationReason_decorators;
    let _escalationReason_initializers = [];
    let _escalationReason_extraInitializers = [];
    let _urgencyLevel_decorators;
    let _urgencyLevel_initializers = [];
    let _urgencyLevel_extraInitializers = [];
    let _escalatedAt_decorators;
    let _escalatedAt_initializers = [];
    let _escalatedAt_extraInitializers = [];
    let _waitingTime_decorators;
    let _waitingTime_initializers = [];
    let _waitingTime_extraInitializers = [];
    return class EscalationAlertResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Session ID' })];
            _customerName_decorators = [(0, swagger_1.ApiProperty)({ description: 'Customer name' })];
            _escalatedBy_decorators = [(0, swagger_1.ApiProperty)({ description: 'User ID who escalated' })];
            _escalatedByName_decorators = [(0, swagger_1.ApiProperty)({ description: 'Name of user who escalated' })];
            _escalationReason_decorators = [(0, swagger_1.ApiProperty)({ description: 'Reason for escalation' })];
            _urgencyLevel_decorators = [(0, swagger_1.ApiProperty)({ description: 'Urgency level' })];
            _escalatedAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Escalation timestamp' })];
            _waitingTime_decorators = [(0, swagger_1.ApiProperty)({ description: 'Waiting time since escalation in minutes' })];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _customerName_decorators, { kind: "field", name: "customerName", static: false, private: false, access: { has: obj => "customerName" in obj, get: obj => obj.customerName, set: (obj, value) => { obj.customerName = value; } }, metadata: _metadata }, _customerName_initializers, _customerName_extraInitializers);
            __esDecorate(null, null, _escalatedBy_decorators, { kind: "field", name: "escalatedBy", static: false, private: false, access: { has: obj => "escalatedBy" in obj, get: obj => obj.escalatedBy, set: (obj, value) => { obj.escalatedBy = value; } }, metadata: _metadata }, _escalatedBy_initializers, _escalatedBy_extraInitializers);
            __esDecorate(null, null, _escalatedByName_decorators, { kind: "field", name: "escalatedByName", static: false, private: false, access: { has: obj => "escalatedByName" in obj, get: obj => obj.escalatedByName, set: (obj, value) => { obj.escalatedByName = value; } }, metadata: _metadata }, _escalatedByName_initializers, _escalatedByName_extraInitializers);
            __esDecorate(null, null, _escalationReason_decorators, { kind: "field", name: "escalationReason", static: false, private: false, access: { has: obj => "escalationReason" in obj, get: obj => obj.escalationReason, set: (obj, value) => { obj.escalationReason = value; } }, metadata: _metadata }, _escalationReason_initializers, _escalationReason_extraInitializers);
            __esDecorate(null, null, _urgencyLevel_decorators, { kind: "field", name: "urgencyLevel", static: false, private: false, access: { has: obj => "urgencyLevel" in obj, get: obj => obj.urgencyLevel, set: (obj, value) => { obj.urgencyLevel = value; } }, metadata: _metadata }, _urgencyLevel_initializers, _urgencyLevel_extraInitializers);
            __esDecorate(null, null, _escalatedAt_decorators, { kind: "field", name: "escalatedAt", static: false, private: false, access: { has: obj => "escalatedAt" in obj, get: obj => obj.escalatedAt, set: (obj, value) => { obj.escalatedAt = value; } }, metadata: _metadata }, _escalatedAt_initializers, _escalatedAt_extraInitializers);
            __esDecorate(null, null, _waitingTime_decorators, { kind: "field", name: "waitingTime", static: false, private: false, access: { has: obj => "waitingTime" in obj, get: obj => obj.waitingTime, set: (obj, value) => { obj.waitingTime = value; } }, metadata: _metadata }, _waitingTime_initializers, _waitingTime_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        customerName = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _customerName_initializers, void 0));
        escalatedBy = (__runInitializers(this, _customerName_extraInitializers), __runInitializers(this, _escalatedBy_initializers, void 0));
        escalatedByName = (__runInitializers(this, _escalatedBy_extraInitializers), __runInitializers(this, _escalatedByName_initializers, void 0));
        escalationReason = (__runInitializers(this, _escalatedByName_extraInitializers), __runInitializers(this, _escalationReason_initializers, void 0));
        urgencyLevel = (__runInitializers(this, _escalationReason_extraInitializers), __runInitializers(this, _urgencyLevel_initializers, void 0));
        escalatedAt = (__runInitializers(this, _urgencyLevel_extraInitializers), __runInitializers(this, _escalatedAt_initializers, void 0));
        waitingTime = (__runInitializers(this, _escalatedAt_extraInitializers), __runInitializers(this, _waitingTime_initializers, void 0));
        constructor() {
            __runInitializers(this, _waitingTime_extraInitializers);
        }
    };
})();
exports.EscalationAlertResponseDto = EscalationAlertResponseDto;
let RealTimeMetricsResponseDto = (() => {
    let _activeAgents_decorators;
    let _activeAgents_initializers = [];
    let _activeAgents_extraInitializers = [];
    let _queueLength_decorators;
    let _queueLength_initializers = [];
    let _queueLength_extraInitializers = [];
    let _avgWaitTime_decorators;
    let _avgWaitTime_initializers = [];
    let _avgWaitTime_extraInitializers = [];
    let _responseRate_decorators;
    let _responseRate_initializers = [];
    let _responseRate_extraInitializers = [];
    return class RealTimeMetricsResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _activeAgents_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of currently active support agents' })];
            _queueLength_decorators = [(0, swagger_1.ApiProperty)({ description: 'Number of sessions in queue waiting for assignment' })];
            _avgWaitTime_decorators = [(0, swagger_1.ApiProperty)({ description: 'Average wait time for queued sessions in minutes' })];
            _responseRate_decorators = [(0, swagger_1.ApiProperty)({ description: 'Response rate percentage (sessions responded to within SLA)' })];
            __esDecorate(null, null, _activeAgents_decorators, { kind: "field", name: "activeAgents", static: false, private: false, access: { has: obj => "activeAgents" in obj, get: obj => obj.activeAgents, set: (obj, value) => { obj.activeAgents = value; } }, metadata: _metadata }, _activeAgents_initializers, _activeAgents_extraInitializers);
            __esDecorate(null, null, _queueLength_decorators, { kind: "field", name: "queueLength", static: false, private: false, access: { has: obj => "queueLength" in obj, get: obj => obj.queueLength, set: (obj, value) => { obj.queueLength = value; } }, metadata: _metadata }, _queueLength_initializers, _queueLength_extraInitializers);
            __esDecorate(null, null, _avgWaitTime_decorators, { kind: "field", name: "avgWaitTime", static: false, private: false, access: { has: obj => "avgWaitTime" in obj, get: obj => obj.avgWaitTime, set: (obj, value) => { obj.avgWaitTime = value; } }, metadata: _metadata }, _avgWaitTime_initializers, _avgWaitTime_extraInitializers);
            __esDecorate(null, null, _responseRate_decorators, { kind: "field", name: "responseRate", static: false, private: false, access: { has: obj => "responseRate" in obj, get: obj => obj.responseRate, set: (obj, value) => { obj.responseRate = value; } }, metadata: _metadata }, _responseRate_initializers, _responseRate_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        activeAgents = __runInitializers(this, _activeAgents_initializers, void 0);
        queueLength = (__runInitializers(this, _activeAgents_extraInitializers), __runInitializers(this, _queueLength_initializers, void 0));
        avgWaitTime = (__runInitializers(this, _queueLength_extraInitializers), __runInitializers(this, _avgWaitTime_initializers, void 0));
        responseRate = (__runInitializers(this, _avgWaitTime_extraInitializers), __runInitializers(this, _responseRate_initializers, void 0));
        constructor() {
            __runInitializers(this, _responseRate_extraInitializers);
        }
    };
})();
exports.RealTimeMetricsResponseDto = RealTimeMetricsResponseDto;
let DashboardQueryDto = (() => {
    let _dateFrom_decorators;
    let _dateFrom_initializers = [];
    let _dateFrom_extraInitializers = [];
    let _dateTo_decorators;
    let _dateTo_initializers = [];
    let _dateTo_extraInitializers = [];
    let _agentId_decorators;
    let _agentId_initializers = [];
    let _agentId_extraInitializers = [];
    return class DashboardQueryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _dateFrom_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Start date for statistics (ISO string)' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _dateTo_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'End date for statistics (ISO string)' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _agentId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Specific support agent ID to filter by' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _dateFrom_decorators, { kind: "field", name: "dateFrom", static: false, private: false, access: { has: obj => "dateFrom" in obj, get: obj => obj.dateFrom, set: (obj, value) => { obj.dateFrom = value; } }, metadata: _metadata }, _dateFrom_initializers, _dateFrom_extraInitializers);
            __esDecorate(null, null, _dateTo_decorators, { kind: "field", name: "dateTo", static: false, private: false, access: { has: obj => "dateTo" in obj, get: obj => obj.dateTo, set: (obj, value) => { obj.dateTo = value; } }, metadata: _metadata }, _dateTo_initializers, _dateTo_extraInitializers);
            __esDecorate(null, null, _agentId_decorators, { kind: "field", name: "agentId", static: false, private: false, access: { has: obj => "agentId" in obj, get: obj => obj.agentId, set: (obj, value) => { obj.agentId = value; } }, metadata: _metadata }, _agentId_initializers, _agentId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        dateFrom = __runInitializers(this, _dateFrom_initializers, void 0);
        dateTo = (__runInitializers(this, _dateFrom_extraInitializers), __runInitializers(this, _dateTo_initializers, void 0));
        agentId = (__runInitializers(this, _dateTo_extraInitializers), __runInitializers(this, _agentId_initializers, void 0));
        constructor() {
            __runInitializers(this, _agentId_extraInitializers);
        }
    };
})();
exports.DashboardQueryDto = DashboardQueryDto;
let SessionOverviewQueryDto = (() => {
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _assignedTo_decorators;
    let _assignedTo_initializers = [];
    let _assignedTo_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    return class SessionOverviewQueryDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by session status', enum: chat_session_entity_1.ChatSessionStatus }), (0, class_validator_1.IsEnum)(chat_session_entity_1.ChatSessionStatus), (0, class_validator_1.IsOptional)()];
            _assignedTo_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Filter by assigned support user ID' }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Maximum number of sessions to return', minimum: 1, maximum: 100 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _assignedTo_decorators, { kind: "field", name: "assignedTo", static: false, private: false, access: { has: obj => "assignedTo" in obj, get: obj => obj.assignedTo, set: (obj, value) => { obj.assignedTo = value; } }, metadata: _metadata }, _assignedTo_initializers, _assignedTo_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        status = __runInitializers(this, _status_initializers, void 0);
        assignedTo = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _assignedTo_initializers, void 0));
        limit = (__runInitializers(this, _assignedTo_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
        constructor() {
            __runInitializers(this, _limit_extraInitializers);
        }
    };
})();
exports.SessionOverviewQueryDto = SessionOverviewQueryDto;
//# sourceMappingURL=support-dashboard.dto.js.map