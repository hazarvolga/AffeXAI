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
exports.SupportDashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const chat_session_entity_1 = require("../entities/chat-session.entity");
const chat_message_entity_1 = require("../entities/chat-message.entity");
const chat_support_assignment_entity_1 = require("../entities/chat-support-assignment.entity");
let SupportDashboardService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SupportDashboardService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SupportDashboardService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        sessionRepository;
        messageRepository;
        assignmentRepository;
        userRepository;
        supportAssignmentService;
        logger = new common_1.Logger(SupportDashboardService.name);
        constructor(sessionRepository, messageRepository, assignmentRepository, userRepository, supportAssignmentService) {
            this.sessionRepository = sessionRepository;
            this.messageRepository = messageRepository;
            this.assignmentRepository = assignmentRepository;
            this.userRepository = userRepository;
            this.supportAssignmentService = supportAssignmentService;
        }
        /**
         * Get overall dashboard statistics
         */
        async getDashboardStats(dateFrom, dateTo) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const fromDate = dateFrom || today;
            const toDate = dateTo || tomorrow;
            // Get active sessions
            const activeSessions = await this.sessionRepository.count({
                where: { status: chat_session_entity_1.ChatSessionStatus.ACTIVE }
            });
            // Get sessions waiting for support (no active assignment)
            const allActiveSessions = await this.sessionRepository.find({
                where: { status: chat_session_entity_1.ChatSessionStatus.ACTIVE },
                relations: ['supportAssignments']
            });
            const waitingSessions = allActiveSessions.filter(session => !session.supportAssignments?.some(assignment => assignment.status === chat_support_assignment_entity_1.AssignmentStatus.ACTIVE)).length;
            // Get total sessions created today
            const totalSessionsToday = await this.sessionRepository.count({
                where: {
                    createdAt: (0, typeorm_1.Between)(fromDate, toDate)
                }
            });
            // Calculate average response time (time from session creation to first support message)
            const avgResponseTime = await this.calculateAverageResponseTime(fromDate, toDate);
            // Calculate average resolution time (time from assignment to completion)
            const avgResolutionTime = await this.calculateAverageResolutionTime(fromDate, toDate);
            // Calculate customer satisfaction (placeholder - would need actual rating system)
            const customerSatisfactionScore = 4.2; // Placeholder
            // Calculate escalation rate
            const escalationRate = await this.calculateEscalationRate(fromDate, toDate);
            return {
                activeSessions,
                waitingSessions,
                totalSessionsToday,
                avgResponseTime,
                avgResolutionTime,
                customerSatisfactionScore,
                escalationRate,
            };
        }
        /**
         * Get support agent statistics
         */
        async getSupportAgentStats(userId) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            // Get support team members
            let supportUsers;
            if (userId) {
                const user = await this.userRepository.findOne({
                    where: { id: userId },
                    relations: ['userRoles', 'userRoles.role']
                });
                supportUsers = user ? [user] : [];
            }
            else {
                supportUsers = await this.userRepository.find({
                    where: {
                        userRoles: {
                            role: {
                                name: (0, typeorm_1.In)(['support', 'manager', 'admin'])
                            }
                        },
                        isActive: true
                    },
                    relations: ['userRoles', 'userRoles.role']
                });
            }
            const agentStats = [];
            for (const user of supportUsers) {
                // Get active assignments
                const activeAssignments = await this.assignmentRepository.count({
                    where: { supportUserId: user.id, status: chat_support_assignment_entity_1.AssignmentStatus.ACTIVE }
                });
                // Get completed assignments today
                const completedToday = await this.assignmentRepository.count({
                    where: {
                        supportUserId: user.id,
                        status: chat_support_assignment_entity_1.AssignmentStatus.COMPLETED,
                        completedAt: (0, typeorm_1.Between)(today, tomorrow)
                    }
                });
                // Calculate average response time for this agent
                const avgResponseTime = await this.calculateAgentResponseTime(user.id, today, tomorrow);
                // Calculate average resolution time for this agent
                const avgResolutionTime = await this.calculateAgentResolutionTime(user.id, today, tomorrow);
                // Determine workload capacity
                const userRoles = user.userRoles?.map(ur => ur.role?.name) || [];
                const isManager = userRoles.includes('manager') || userRoles.includes('admin');
                const maxAssignments = isManager ? 10 : 5;
                const workloadCapacity = (activeAssignments / maxAssignments) * 100;
                agentStats.push({
                    userId: user.id,
                    userName: user.fullName,
                    email: user.email,
                    activeSessions: activeAssignments,
                    completedToday,
                    avgResponseTime,
                    avgResolutionTime,
                    customerRating: 4.5, // Placeholder
                    isOnline: true, // Placeholder - would check WebSocket connections
                    lastActivity: user.lastLoginAt || new Date(),
                    workloadCapacity: Math.min(workloadCapacity, 100),
                });
            }
            return agentStats.sort((a, b) => b.activeSessions - a.activeSessions);
        }
        /**
         * Get session overview for dashboard
         */
        async getSessionOverview(status, assignedTo, limit = 50) {
            const whereConditions = {};
            if (status) {
                whereConditions.status = status;
            }
            let sessions = await this.sessionRepository.find({
                where: whereConditions,
                relations: ['user', 'supportAssignments', 'supportAssignments.supportUser', 'messages'],
                order: { updatedAt: 'DESC' },
                take: limit
            });
            // Filter by assigned support user if specified
            if (assignedTo) {
                sessions = sessions.filter(session => session.supportAssignments?.some(assignment => assignment.supportUserId === assignedTo && assignment.status === chat_support_assignment_entity_1.AssignmentStatus.ACTIVE));
            }
            const sessionOverviews = [];
            for (const session of sessions) {
                // Get last message timestamp
                const lastMessage = session.messages?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
                // Get active assignment
                const activeAssignment = session.supportAssignments?.find(assignment => assignment.status === chat_support_assignment_entity_1.AssignmentStatus.ACTIVE);
                // Calculate waiting time
                const waitingTime = activeAssignment
                    ? 0
                    : Math.floor((Date.now() - session.createdAt.getTime()) / (1000 * 60));
                // Determine urgency level (simplified logic)
                const urgencyLevel = this.determineSessionUrgency(session, waitingTime);
                // Check for unread messages (placeholder logic)
                const hasUnreadMessages = lastMessage?.senderType === chat_message_entity_1.ChatMessageSenderType.USER;
                // Extract tags from session metadata
                const tags = session.metadata?.tags || [];
                sessionOverviews.push({
                    id: session.id,
                    userId: session.userId,
                    customerName: session.user?.fullName || 'Unknown User',
                    customerEmail: session.user?.email || 'unknown@example.com',
                    status: session.status,
                    createdAt: session.createdAt,
                    lastMessageAt: lastMessage?.createdAt || session.createdAt,
                    messageCount: session.messages?.length || 0,
                    assignedSupport: activeAssignment ? {
                        userId: activeAssignment.supportUserId,
                        userName: activeAssignment.supportUser?.fullName || 'Unknown',
                        assignedAt: activeAssignment.assignedAt,
                    } : undefined,
                    urgencyLevel,
                    hasUnreadMessages,
                    waitingTime,
                    tags,
                });
            }
            return sessionOverviews;
        }
        /**
         * Get escalation alerts
         */
        async getEscalationAlerts() {
            const escalatedAssignments = await this.assignmentRepository.find({
                where: {
                    assignmentType: chat_support_assignment_entity_1.AssignmentType.ESCALATED,
                    status: chat_support_assignment_entity_1.AssignmentStatus.ACTIVE
                },
                relations: ['session', 'session.user', 'assignedByUser'],
                order: { assignedAt: 'DESC' }
            });
            const alerts = [];
            for (const assignment of escalatedAssignments) {
                const waitingTime = Math.floor((Date.now() - assignment.assignedAt.getTime()) / (1000 * 60));
                // Determine urgency based on waiting time and notes
                const urgencyLevel = assignment.notes?.toLowerCase().includes('critical') || waitingTime > 60
                    ? 'critical'
                    : 'high';
                alerts.push({
                    sessionId: assignment.sessionId,
                    customerName: assignment.session?.user?.fullName || 'Unknown User',
                    escalatedBy: assignment.assignedBy || 'Unknown',
                    escalatedByName: assignment.assignedByUser?.fullName || 'Unknown',
                    escalationReason: assignment.notes || 'No reason provided',
                    urgencyLevel,
                    escalatedAt: assignment.assignedAt,
                    waitingTime,
                });
            }
            return alerts;
        }
        /**
         * Get real-time metrics for dashboard
         */
        async getRealTimeMetrics() {
            // Count active support agents (placeholder - would check WebSocket connections)
            const activeAgents = await this.userRepository.count({
                where: {
                    userRoles: {
                        role: {
                            name: (0, typeorm_1.In)(['support', 'manager', 'admin'])
                        }
                    },
                    isActive: true
                }
            });
            // Get queue length (sessions waiting for assignment)
            const allActiveSessions = await this.sessionRepository.find({
                where: { status: chat_session_entity_1.ChatSessionStatus.ACTIVE },
                relations: ['supportAssignments']
            });
            const queueLength = allActiveSessions.filter(session => !session.supportAssignments?.some(assignment => assignment.status === chat_support_assignment_entity_1.AssignmentStatus.ACTIVE)).length;
            // Calculate average wait time for queued sessions
            const queuedSessions = allActiveSessions.filter(session => !session.supportAssignments?.some(assignment => assignment.status === chat_support_assignment_entity_1.AssignmentStatus.ACTIVE));
            const avgWaitTime = queuedSessions.length > 0
                ? queuedSessions.reduce((sum, session) => {
                    const waitTime = (Date.now() - session.createdAt.getTime()) / (1000 * 60);
                    return sum + waitTime;
                }, 0) / queuedSessions.length
                : 0;
            // Calculate response rate (sessions responded to within 5 minutes)
            const responseRate = 85; // Placeholder
            return {
                activeAgents,
                queueLength,
                avgWaitTime: Math.round(avgWaitTime),
                responseRate,
            };
        }
        /**
         * Calculate average response time
         */
        async calculateAverageResponseTime(fromDate, toDate) {
            // This would need complex query to calculate time from session creation to first support response
            // Placeholder implementation
            return 8; // 8 minutes average
        }
        /**
         * Calculate average resolution time
         */
        async calculateAverageResolutionTime(fromDate, toDate) {
            const completedAssignments = await this.assignmentRepository.find({
                where: {
                    status: chat_support_assignment_entity_1.AssignmentStatus.COMPLETED,
                    completedAt: (0, typeorm_1.Between)(fromDate, toDate)
                }
            });
            if (completedAssignments.length === 0)
                return 0;
            const totalTime = completedAssignments.reduce((sum, assignment) => {
                const duration = assignment.completedAt.getTime() - assignment.assignedAt.getTime();
                return sum + duration;
            }, 0);
            return Math.round(totalTime / completedAssignments.length / (1000 * 60)); // Convert to minutes
        }
        /**
         * Calculate escalation rate
         */
        async calculateEscalationRate(fromDate, toDate) {
            const totalAssignments = await this.assignmentRepository.count({
                where: { assignedAt: (0, typeorm_1.Between)(fromDate, toDate) }
            });
            const escalatedAssignments = await this.assignmentRepository.count({
                where: {
                    assignmentType: chat_support_assignment_entity_1.AssignmentType.ESCALATED,
                    assignedAt: (0, typeorm_1.Between)(fromDate, toDate)
                }
            });
            return totalAssignments > 0 ? (escalatedAssignments / totalAssignments) * 100 : 0;
        }
        /**
         * Calculate agent-specific response time
         */
        async calculateAgentResponseTime(userId, fromDate, toDate) {
            // Placeholder implementation
            return 6; // 6 minutes average
        }
        /**
         * Calculate agent-specific resolution time
         */
        async calculateAgentResolutionTime(userId, fromDate, toDate) {
            const completedAssignments = await this.assignmentRepository.find({
                where: {
                    supportUserId: userId,
                    status: chat_support_assignment_entity_1.AssignmentStatus.COMPLETED,
                    completedAt: (0, typeorm_1.Between)(fromDate, toDate)
                }
            });
            if (completedAssignments.length === 0)
                return 0;
            const totalTime = completedAssignments.reduce((sum, assignment) => {
                const duration = assignment.completedAt.getTime() - assignment.assignedAt.getTime();
                return sum + duration;
            }, 0);
            return Math.round(totalTime / completedAssignments.length / (1000 * 60));
        }
        /**
         * Determine session urgency level
         */
        determineSessionUrgency(session, waitingTime) {
            // Check for urgent keywords in session metadata or recent messages
            const urgentKeywords = ['urgent', 'critical', 'emergency', 'broken', 'down'];
            const sessionContent = JSON.stringify(session.metadata || {}).toLowerCase();
            if (urgentKeywords.some(keyword => sessionContent.includes(keyword))) {
                return 'critical';
            }
            // Check waiting time
            if (waitingTime > 60)
                return 'critical';
            if (waitingTime > 30)
                return 'high';
            if (waitingTime > 15)
                return 'medium';
            return 'low';
        }
    };
    return SupportDashboardService = _classThis;
})();
exports.SupportDashboardService = SupportDashboardService;
//# sourceMappingURL=support-dashboard.service.js.map