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
exports.ChatSupportAssignmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const chat_support_assignment_entity_1 = require("../entities/chat-support-assignment.entity");
let ChatSupportAssignmentService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChatSupportAssignmentService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ChatSupportAssignmentService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        assignmentRepository;
        sessionRepository;
        userRepository;
        chatGateway;
        logger = new common_1.Logger(ChatSupportAssignmentService.name);
        constructor(assignmentRepository, sessionRepository, userRepository, chatGateway) {
            this.assignmentRepository = assignmentRepository;
            this.sessionRepository = sessionRepository;
            this.userRepository = userRepository;
            this.chatGateway = chatGateway;
        }
        /**
         * Create a new support assignment
         */
        async createAssignment(createDto) {
            const { sessionId, supportUserId, assignedBy, assignmentType = chat_support_assignment_entity_1.AssignmentType.MANUAL, notes } = createDto;
            // Validate session exists
            const session = await this.sessionRepository.findOne({ where: { id: sessionId } });
            if (!session) {
                throw new common_1.NotFoundException(`Chat session ${sessionId} not found`);
            }
            // Validate support user exists and has support role
            const supportUser = await this.userRepository.findOne({
                where: { id: supportUserId },
                relations: ['userRoles', 'userRoles.role']
            });
            if (!supportUser) {
                throw new common_1.NotFoundException(`Support user ${supportUserId} not found`);
            }
            // Check if user has support role (support, manager, or admin)
            const supportRoles = ['support', 'manager', 'admin'];
            const userRoles = supportUser.userRoles?.map(ur => ur.role?.name) || [];
            const hasSupportRole = userRoles.some(role => supportRoles.includes(role));
            if (!hasSupportRole) {
                throw new common_1.BadRequestException(`User ${supportUserId} does not have support permissions`);
            }
            // Check if there's already an active assignment for this session
            const existingAssignment = await this.assignmentRepository.findOne({
                where: {
                    sessionId,
                    status: chat_support_assignment_entity_1.AssignmentStatus.ACTIVE
                }
            });
            if (existingAssignment) {
                throw new common_1.BadRequestException(`Session ${sessionId} already has an active assignment`);
            }
            // Create the assignment
            const assignment = this.assignmentRepository.create({
                sessionId,
                supportUserId,
                assignedBy,
                assignmentType,
                notes,
                status: chat_support_assignment_entity_1.AssignmentStatus.ACTIVE,
                assignedAt: new Date(),
            });
            const savedAssignment = await this.assignmentRepository.save(assignment);
            // Load the assignment with relations for notification
            const assignmentWithRelations = await this.assignmentRepository.findOne({
                where: { id: savedAssignment.id },
                relations: ['supportUser', 'assignedByUser', 'session']
            });
            // Send WebSocket notification
            await this.sendAssignmentNotification({
                type: 'assignment',
                sessionId,
                supportUserId,
                supportUserName: supportUser.fullName,
                assignedBy,
                assignedByName: assignmentWithRelations?.assignedByUser?.fullName,
                notes,
                timestamp: new Date(),
            });
            // Notify the support user about the assignment
            await this.chatGateway.broadcastSupportJoined({
                sessionId,
                supportUserId,
                supportUserName: supportUser.fullName,
            });
            this.logger.log(`Created assignment for session ${sessionId} to support user ${supportUserId}`);
            return assignmentWithRelations;
        }
        /**
         * Transfer assignment from one support user to another
         */
        async transferAssignment(transferDto) {
            const { sessionId, fromSupportUserId, toSupportUserId, transferredBy, notes } = transferDto;
            // Find the current active assignment
            const currentAssignment = await this.assignmentRepository.findOne({
                where: {
                    sessionId,
                    supportUserId: fromSupportUserId,
                    status: chat_support_assignment_entity_1.AssignmentStatus.ACTIVE
                },
                relations: ['supportUser']
            });
            if (!currentAssignment) {
                throw new common_1.NotFoundException(`No active assignment found for session ${sessionId} and support user ${fromSupportUserId}`);
            }
            // Validate the new support user
            const newSupportUser = await this.userRepository.findOne({
                where: { id: toSupportUserId },
                relations: ['userRoles', 'userRoles.role']
            });
            if (!newSupportUser) {
                throw new common_1.NotFoundException(`Support user ${toSupportUserId} not found`);
            }
            // Check if new user has support role
            const supportRoles = ['support', 'manager', 'admin'];
            const userRoles = newSupportUser.userRoles?.map(ur => ur.role?.name) || [];
            const hasSupportRole = userRoles.some(role => supportRoles.includes(role));
            if (!hasSupportRole) {
                throw new common_1.BadRequestException(`User ${toSupportUserId} does not have support permissions`);
            }
            // Complete the current assignment
            currentAssignment.status = chat_support_assignment_entity_1.AssignmentStatus.TRANSFERRED;
            currentAssignment.completedAt = new Date();
            currentAssignment.notes = notes ? `${currentAssignment.notes || ''}\nTransferred: ${notes}` : currentAssignment.notes;
            await this.assignmentRepository.save(currentAssignment);
            // Create new assignment
            const newAssignment = await this.createAssignment({
                sessionId,
                supportUserId: toSupportUserId,
                assignedBy: transferredBy,
                assignmentType: chat_support_assignment_entity_1.AssignmentType.MANUAL,
                notes: `Transferred from ${currentAssignment.supportUser.fullName}. ${notes || ''}`.trim(),
            });
            // Send transfer notifications
            await this.sendAssignmentNotification({
                type: 'transfer',
                sessionId,
                supportUserId: toSupportUserId,
                supportUserName: newSupportUser.fullName,
                assignedBy: transferredBy,
                notes: `Transferred from ${currentAssignment.supportUser.fullName}`,
                timestamp: new Date(),
            });
            // Notify about support user change
            await this.chatGateway.broadcastSupportLeft({
                sessionId,
                supportUserId: fromSupportUserId,
                supportUserName: currentAssignment.supportUser.fullName,
            });
            this.logger.log(`Transferred assignment for session ${sessionId} from ${fromSupportUserId} to ${toSupportUserId}`);
            return newAssignment;
        }
        /**
         * Escalate assignment to manager
         */
        async escalateAssignment(sessionId, escalatedBy, notes) {
            // Find available managers
            const managers = await this.userRepository.find({
                where: {
                    userRoles: {
                        role: {
                            name: (0, typeorm_1.In)(['manager', 'admin'])
                        }
                    },
                    isActive: true
                },
                relations: ['userRoles', 'userRoles.role']
            });
            if (managers.length === 0) {
                throw new common_1.NotFoundException('No available managers for escalation');
            }
            // Find manager with least active assignments
            const managerAvailability = await this.getSupportTeamAvailability(managers.map(m => m.id));
            const availableManager = managerAvailability
                .filter(m => m.isAvailable)
                .sort((a, b) => a.activeAssignments - b.activeAssignments)[0];
            if (!availableManager) {
                throw new common_1.BadRequestException('No available managers for escalation');
            }
            // Get current assignment if exists
            const currentAssignment = await this.assignmentRepository.findOne({
                where: { sessionId, status: chat_support_assignment_entity_1.AssignmentStatus.ACTIVE },
                relations: ['supportUser']
            });
            let newAssignment;
            if (currentAssignment) {
                // Transfer to manager
                newAssignment = await this.transferAssignment({
                    sessionId,
                    fromSupportUserId: currentAssignment.supportUserId,
                    toSupportUserId: availableManager.userId,
                    transferredBy: escalatedBy,
                    notes: `Escalated to manager. ${notes || ''}`.trim(),
                });
            }
            else {
                // Create new assignment to manager
                newAssignment = await this.createAssignment({
                    sessionId,
                    supportUserId: availableManager.userId,
                    assignedBy: escalatedBy,
                    assignmentType: chat_support_assignment_entity_1.AssignmentType.ESCALATED,
                    notes: `Escalated to manager. ${notes || ''}`.trim(),
                });
            }
            // Send escalation notification
            await this.sendAssignmentNotification({
                type: 'escalation',
                sessionId,
                supportUserId: availableManager.userId,
                supportUserName: availableManager.userName,
                assignedBy: escalatedBy,
                notes: `Escalated to manager. ${notes || ''}`.trim(),
                timestamp: new Date(),
            });
            this.logger.log(`Escalated assignment for session ${sessionId} to manager ${availableManager.userId}`);
            return newAssignment;
        }
        /**
         * Complete an assignment
         */
        async completeAssignment(sessionId, supportUserId, notes) {
            const assignment = await this.assignmentRepository.findOne({
                where: {
                    sessionId,
                    supportUserId,
                    status: chat_support_assignment_entity_1.AssignmentStatus.ACTIVE
                },
                relations: ['supportUser']
            });
            if (!assignment) {
                throw new common_1.NotFoundException(`No active assignment found for session ${sessionId} and support user ${supportUserId}`);
            }
            assignment.status = chat_support_assignment_entity_1.AssignmentStatus.COMPLETED;
            assignment.completedAt = new Date();
            assignment.notes = notes ? `${assignment.notes || ''}\nCompleted: ${notes}` : assignment.notes;
            const completedAssignment = await this.assignmentRepository.save(assignment);
            // Send completion notification
            await this.sendAssignmentNotification({
                type: 'completion',
                sessionId,
                supportUserId,
                supportUserName: assignment.supportUser.fullName,
                notes,
                timestamp: new Date(),
            });
            // Notify about support user leaving
            await this.chatGateway.broadcastSupportLeft({
                sessionId,
                supportUserId,
                supportUserName: assignment.supportUser.fullName,
            });
            this.logger.log(`Completed assignment for session ${sessionId} by support user ${supportUserId}`);
            return completedAssignment;
        }
        /**
         * Get active assignment for a session
         */
        async getActiveAssignment(sessionId) {
            return this.assignmentRepository.findOne({
                where: { sessionId, status: chat_support_assignment_entity_1.AssignmentStatus.ACTIVE },
                relations: ['supportUser', 'assignedByUser', 'session']
            });
        }
        /**
         * Get all assignments for a session
         */
        async getSessionAssignments(sessionId) {
            return this.assignmentRepository.find({
                where: { sessionId },
                relations: ['supportUser', 'assignedByUser'],
                order: { assignedAt: 'DESC' }
            });
        }
        /**
         * Get active assignments for a support user
         */
        async getSupportUserAssignments(supportUserId) {
            return this.assignmentRepository.find({
                where: { supportUserId, status: chat_support_assignment_entity_1.AssignmentStatus.ACTIVE },
                relations: ['session', 'assignedByUser'],
                order: { assignedAt: 'DESC' }
            });
        }
        /**
         * Get support team availability
         */
        async getSupportTeamAvailability(userIds) {
            // Get all support team members
            let supportUsers;
            if (userIds) {
                supportUsers = await this.userRepository.find({
                    where: { id: (0, typeorm_1.In)(userIds) },
                    relations: ['userRoles', 'userRoles.role']
                });
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
            const availability = [];
            for (const user of supportUsers) {
                // Count active assignments
                const activeAssignments = await this.assignmentRepository.count({
                    where: { supportUserId: user.id, status: chat_support_assignment_entity_1.AssignmentStatus.ACTIVE }
                });
                // Determine max assignments based on role
                const userRoles = user.userRoles?.map(ur => ur.role?.name) || [];
                const isManager = userRoles.includes('manager') || userRoles.includes('admin');
                const maxAssignments = isManager ? 10 : 5; // Managers can handle more
                // Check if user is online (this would need to be implemented with actual presence tracking)
                const isOnline = true; // Placeholder - would check WebSocket connections or last activity
                availability.push({
                    userId: user.id,
                    userName: user.fullName,
                    email: user.email,
                    isOnline,
                    activeAssignments,
                    maxAssignments,
                    isAvailable: isOnline && activeAssignments < maxAssignments,
                    lastActivity: user.lastLoginAt,
                });
            }
            return availability.sort((a, b) => a.activeAssignments - b.activeAssignments);
        }
        /**
         * Auto-assign support user to session
         */
        async autoAssignSupport(sessionId) {
            try {
                // Get available support team members
                const availability = await this.getSupportTeamAvailability();
                const availableSupport = availability.filter(s => s.isAvailable);
                if (availableSupport.length === 0) {
                    this.logger.warn(`No available support users for auto-assignment to session ${sessionId}`);
                    return null;
                }
                // Select the support user with the least active assignments
                const selectedSupport = availableSupport[0];
                // Create auto assignment
                const assignment = await this.createAssignment({
                    sessionId,
                    supportUserId: selectedSupport.userId,
                    assignmentType: chat_support_assignment_entity_1.AssignmentType.AUTO,
                    notes: 'Auto-assigned based on availability',
                });
                this.logger.log(`Auto-assigned session ${sessionId} to support user ${selectedSupport.userId}`);
                return assignment;
            }
            catch (error) {
                this.logger.error(`Failed to auto-assign support for session ${sessionId}:`, error);
                return null;
            }
        }
        /**
         * Send assignment notification via WebSocket
         */
        async sendAssignmentNotification(notification) {
            try {
                // Broadcast to the session
                await this.chatGateway.server.to(notification.sessionId).emit('assignment-notification', notification);
                // Send to specific support user (if they're connected)
                const supportUserSockets = await this.chatGateway.server.fetchSockets();
                const supportSocket = supportUserSockets.find(socket => socket.data.userId === notification.supportUserId);
                if (supportSocket) {
                    supportSocket.emit('support-assignment-notification', notification);
                }
                // Send to managers for escalations
                if (notification.type === 'escalation') {
                    const managerSockets = supportUserSockets.filter(socket => {
                        // This would need to check user roles - placeholder implementation
                        return socket.data.userRoles?.includes('manager') || socket.data.userRoles?.includes('admin');
                    });
                    managerSockets.forEach(socket => {
                        socket.emit('escalation-notification', notification);
                    });
                }
            }
            catch (error) {
                this.logger.error('Failed to send assignment notification:', error);
            }
        }
        /**
         * Get assignment statistics
         */
        async getAssignmentStats(supportUserId, dateFrom, dateTo) {
            const whereConditions = {};
            if (supportUserId) {
                whereConditions.supportUserId = supportUserId;
            }
            if (dateFrom) {
                whereConditions.assignedAt = { $gte: dateFrom };
            }
            if (dateTo) {
                whereConditions.assignedAt = { ...whereConditions.assignedAt, $lte: dateTo };
            }
            const [totalAssignments, activeAssignments, completedAssignments, transferredAssignments, escalatedAssignments, autoAssignments,] = await Promise.all([
                this.assignmentRepository.count({ where: whereConditions }),
                this.assignmentRepository.count({ where: { ...whereConditions, status: chat_support_assignment_entity_1.AssignmentStatus.ACTIVE } }),
                this.assignmentRepository.count({ where: { ...whereConditions, status: chat_support_assignment_entity_1.AssignmentStatus.COMPLETED } }),
                this.assignmentRepository.count({ where: { ...whereConditions, status: chat_support_assignment_entity_1.AssignmentStatus.TRANSFERRED } }),
                this.assignmentRepository.count({ where: { ...whereConditions, assignmentType: chat_support_assignment_entity_1.AssignmentType.ESCALATED } }),
                this.assignmentRepository.count({ where: { ...whereConditions, assignmentType: chat_support_assignment_entity_1.AssignmentType.AUTO } }),
            ]);
            // Calculate average resolution time for completed assignments
            const completedWithDuration = await this.assignmentRepository.find({
                where: { ...whereConditions, status: chat_support_assignment_entity_1.AssignmentStatus.COMPLETED },
                select: ['assignedAt', 'completedAt']
            });
            const avgResolutionTime = completedWithDuration.length > 0
                ? completedWithDuration.reduce((sum, assignment) => {
                    const duration = assignment.completedAt.getTime() - assignment.assignedAt.getTime();
                    return sum + duration;
                }, 0) / completedWithDuration.length / 1000 / 60 // Convert to minutes
                : 0;
            return {
                totalAssignments,
                activeAssignments,
                completedAssignments,
                transferredAssignments,
                escalatedAssignments,
                autoAssignments,
                avgResolutionTimeMinutes: Math.round(avgResolutionTime),
            };
        }
    };
    return ChatSupportAssignmentService = _classThis;
})();
exports.ChatSupportAssignmentService = ChatSupportAssignmentService;
//# sourceMappingURL=chat-support-assignment.service.js.map