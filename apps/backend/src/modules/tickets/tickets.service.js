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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const ticket_status_enum_1 = require("./enums/ticket-status.enum");
const mail_service_interface_1 = require("../mail/interfaces/mail-service.interface");
/**
 * Tickets Service
 * Business logic for ticket management
 */
let TicketsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TicketsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ticketRepository;
        messageRepository;
        categoryRepository;
        auditLogRepository;
        userRepository;
        mailService;
        slaService;
        ticketEmailService;
        autoTaggingService;
        notificationsGateway;
        logger = new common_1.Logger(TicketsService.name);
        constructor(ticketRepository, messageRepository, categoryRepository, auditLogRepository, userRepository, mailService, slaService, ticketEmailService, autoTaggingService, notificationsGateway) {
            this.ticketRepository = ticketRepository;
            this.messageRepository = messageRepository;
            this.categoryRepository = categoryRepository;
            this.auditLogRepository = auditLogRepository;
            this.userRepository = userRepository;
            this.mailService = mailService;
            this.slaService = slaService;
            this.ticketEmailService = ticketEmailService;
            this.autoTaggingService = autoTaggingService;
            this.notificationsGateway = notificationsGateway;
        }
        /**
         * Create a new support ticket
         * @param userId - ID of the user creating the ticket (from @CurrentUser)
         * @param dto - Ticket creation data
         */
        async create(userId, dto) {
            // Create the ticket
            const ticket = this.ticketRepository.create({
                ...dto,
                userId,
                status: ticket_status_enum_1.TicketStatus.NEW,
            });
            // Calculate SLA deadlines using SlaService
            const slaDates = this.slaService.calculateSLADueDates(ticket);
            ticket.slaFirstResponseDueAt = slaDates.slaFirstResponseDueAt;
            ticket.slaResolutionDueAt = slaDates.slaResolutionDueAt;
            const savedTicket = await this.ticketRepository.save(ticket);
            // Apply auto-tagging
            try {
                const autoTags = await this.autoTaggingService.autoTag(savedTicket);
                if (autoTags.length > 0) {
                    savedTicket.tags = Array.from(new Set([...(savedTicket.tags || []), ...autoTags]));
                    await this.ticketRepository.save(savedTicket);
                    this.logger.log(`Auto-tagged ticket ${savedTicket.id} with: ${autoTags.join(', ')}`);
                }
            }
            catch (error) {
                this.logger.error(`Failed to auto-tag ticket ${savedTicket.id}: ${error.message}`);
                // Continue even if auto-tagging fails
            }
            // Create audit log for ticket creation
            await this.createAuditLog(savedTicket.id, userId, 'ticket_created', 'ticket', savedTicket.id, null, {
                subject: savedTicket.subject,
                priority: savedTicket.priority,
                status: savedTicket.status,
                categoryId: savedTicket.categoryId,
            }, `Ticket created by user ${userId}`);
            // Create the initial message (same as description)
            const initialMessage = this.messageRepository.create({
                ticketId: savedTicket.id,
                authorId: userId,
                content: dto.description,
                isInternal: false,
            });
            await this.messageRepository.save(initialMessage);
            // Create audit log for initial message
            await this.createAuditLog(savedTicket.id, userId, 'message_added', 'message', initialMessage.id, null, { content: dto.description }, 'Initial ticket message');
            // Send email notification using TicketEmailService
            const ticketWithRelations = await this.findOne(savedTicket.id);
            const customer = await this.userRepository.findOne({ where: { id: userId } });
            if (customer) {
                await this.ticketEmailService.sendTicketCreatedEmail(ticketWithRelations, customer);
            }
            // Send real-time notification via WebSocket
            this.notificationsGateway.emitTicketCreated(savedTicket.id, userId, ticketWithRelations);
            return ticketWithRelations;
        }
        /**
         * Find all tickets with filters
         * @param filters - Filter criteria
         */
        async findAll(filters) {
            const query = this.ticketRepository
                .createQueryBuilder('ticket')
                .leftJoinAndSelect('ticket.user', 'user')
                .leftJoinAndSelect('ticket.assignedTo', 'assignedTo')
                .leftJoinAndSelect('ticket.category', 'category')
                .orderBy('ticket.createdAt', 'DESC');
            if (filters.status) {
                query.andWhere('ticket.status = :status', { status: filters.status });
            }
            if (filters.priority) {
                query.andWhere('ticket.priority = :priority', { priority: filters.priority });
            }
            if (filters.userId) {
                query.andWhere('ticket.userId = :userId', { userId: filters.userId });
            }
            if (filters.assignedToId) {
                query.andWhere('ticket.assignedToId = :assignedToId', {
                    assignedToId: filters.assignedToId,
                });
            }
            if (filters.categoryId) {
                query.andWhere('ticket.categoryId = :categoryId', {
                    categoryId: filters.categoryId,
                });
            }
            if (filters.search) {
                query.andWhere('(ticket.subject ILIKE :search OR ticket.description ILIKE :search)', { search: `%${filters.search}%` });
            }
            if (filters.tags && filters.tags.length > 0) {
                query.andWhere('ticket.tags && :tags', { tags: filters.tags });
            }
            return query.getMany();
        }
        /**
         * Find a single ticket by ID
         * @param id - Ticket ID
         */
        async findOne(id) {
            const ticket = await this.ticketRepository.findOne({
                where: { id },
                relations: ['user', 'assignedTo', 'category', 'messages', 'messages.author'],
                order: {
                    messages: {
                        createdAt: 'ASC',
                    },
                },
            });
            if (!ticket) {
                throw new common_1.NotFoundException(`Ticket with ID ${id} not found`);
            }
            return ticket;
        }
        /**
         * Update ticket status
         * @param id - Ticket ID
         * @param status - New status
         * @param userId - ID of user making the change
         */
        async updateStatus(id, status, userId) {
            const ticket = await this.findOne(id);
            const oldStatus = ticket.status;
            ticket.status = status;
            // Track first response time with SLA calculation
            if (oldStatus === ticket_status_enum_1.TicketStatus.NEW &&
                status === ticket_status_enum_1.TicketStatus.OPEN &&
                !ticket.firstResponseAt) {
                ticket.firstResponseAt = new Date();
                ticket.responseTimeHours = this.slaService.calculateResponseTime(ticket);
                ticket.isSLABreached = this.slaService.checkSLABreach(ticket);
            }
            // Track resolution time with SLA calculation
            if (status === ticket_status_enum_1.TicketStatus.RESOLVED && !ticket.resolvedAt) {
                ticket.resolvedAt = new Date();
                ticket.resolutionTimeHours = this.slaService.calculateResolutionTime(ticket);
                ticket.isSLABreached = this.slaService.checkSLABreach(ticket);
            }
            // Track closure time
            if (status === ticket_status_enum_1.TicketStatus.CLOSED && !ticket.closedAt) {
                ticket.closedAt = new Date();
            }
            await this.ticketRepository.save(ticket);
            // Create audit log for status change
            await this.createAuditLog(id, userId, 'status_changed', 'ticket', id, { status: oldStatus }, { status }, `Status changed from ${oldStatus} to ${status}`);
            // Get ticket with relations for email
            const ticketWithRelations = await this.findOne(id);
            // Send resolved email when ticket is resolved
            if (status === ticket_status_enum_1.TicketStatus.RESOLVED) {
                const customer = await this.userRepository.findOne({ where: { id: ticket.userId } });
                const resolver = await this.userRepository.findOne({ where: { id: userId } });
                if (customer && resolver) {
                    await this.ticketEmailService.sendTicketResolvedEmail(ticketWithRelations, customer, resolver);
                }
            }
            // Send real-time notification via WebSocket
            const userIds = [ticket.userId];
            if (ticket.assignedToId) {
                userIds.push(ticket.assignedToId);
            }
            this.notificationsGateway.emitStatusChanged(id, oldStatus, status, userIds);
            return ticketWithRelations;
        }
        /**
         * Assign ticket to a support agent
         * @param id - Ticket ID
         * @param assignedToId - Support agent user ID
         */
        async assignTo(id, assignedToId, assignerId) {
            const ticket = await this.findOne(id);
            const oldAssignedToId = ticket.assignedToId;
            ticket.assignedToId = assignedToId;
            ticket.status = ticket_status_enum_1.TicketStatus.OPEN;
            await this.ticketRepository.save(ticket);
            // Create audit log for assignment
            await this.createAuditLog(id, assignerId, 'assigned', 'ticket', id, { assignedToId: oldAssignedToId }, { assignedToId }, `Ticket assigned to user ${assignedToId}`);
            // Get users for email
            const ticketWithRelations = await this.findOne(id);
            const assignedUser = await this.userRepository.findOne({ where: { id: assignedToId } });
            const assigner = await this.userRepository.findOne({ where: { id: assignerId } });
            // Send assignment email
            if (assignedUser && assigner) {
                await this.ticketEmailService.sendTicketAssignedEmail(ticketWithRelations, assignedUser, assigner);
            }
            // Send real-time notification via WebSocket
            this.notificationsGateway.emitTicketAssigned(id, assignedToId, ticketWithRelations);
            return ticketWithRelations;
        }
        /**
         * Add a message to a ticket
         * @param ticketId - Ticket ID
         * @param userId - Author user ID
         * @param dto - Message data
         */
        async addMessage(ticketId, userId, dto) {
            const ticket = await this.findOne(ticketId);
            const message = this.messageRepository.create({
                ticketId,
                authorId: userId,
                content: dto.content,
                isInternal: dto.isInternal || false,
                attachmentIds: dto.attachmentIds || [],
            });
            const savedMessage = await this.messageRepository.save(message);
            // Create audit log for message
            await this.createAuditLog(ticketId, userId, 'message_added', 'message', savedMessage.id, null, {
                content: dto.content,
                isInternal: dto.isInternal,
            }, `Message added to ticket`);
            // Send message email notification (only if not internal)
            if (!dto.isInternal) {
                const messageWithAuthor = await this.messageRepository.findOne({
                    where: { id: savedMessage.id },
                    relations: ['author'],
                });
                // Check if message author is customer or support
                const isCustomerMessage = userId === ticket.userId;
                const recipient = isCustomerMessage
                    ? ticket.assignedTo || await this.userRepository.findOne({ where: { id: ticket.userId } })
                    : await this.userRepository.findOne({ where: { id: ticket.userId } });
                if (messageWithAuthor && recipient) {
                    await this.ticketEmailService.sendNewMessageEmail(ticket, messageWithAuthor, recipient, isCustomerMessage);
                }
            }
            const messageWithAuthor = await this.messageRepository.findOne({
                where: { id: savedMessage.id },
                relations: ['author'],
            });
            // Send real-time notification via WebSocket
            const recipientUserIds = [ticket.userId];
            if (ticket.assignedToId && ticket.assignedToId !== userId) {
                recipientUserIds.push(ticket.assignedToId);
            }
            this.notificationsGateway.emitNewMessage(ticketId, messageWithAuthor, recipientUserIds);
            return messageWithAuthor;
        }
        /**
         * Get ticket statistics (basic)
         */
        async getStats() {
            const [total, newCount, openCount, resolvedCount, closedCount,] = await Promise.all([
                this.ticketRepository.count(),
                this.ticketRepository.count({ where: { status: ticket_status_enum_1.TicketStatus.NEW } }),
                this.ticketRepository.count({ where: { status: ticket_status_enum_1.TicketStatus.OPEN } }),
                this.ticketRepository.count({ where: { status: ticket_status_enum_1.TicketStatus.RESOLVED } }),
                this.ticketRepository.count({ where: { status: ticket_status_enum_1.TicketStatus.CLOSED } }),
            ]);
            return {
                total,
                byStatus: {
                    new: newCount,
                    open: openCount,
                    resolved: resolvedCount,
                    closed: closedCount,
                },
            };
        }
        /**
         * Find all ticket categories
         */
        async findAllCategories() {
            return this.categoryRepository.find({
                where: { isActive: true },
                relations: ['parent', 'children'],
                order: { name: 'ASC' },
            });
        }
        /**
         * Manually escalate a ticket
         * Increases priority and sends escalation notifications
         */
        async escalateTicket(ticketId, escalatedById, reason, escalateTo) {
            const ticket = await this.ticketRepository.findOne({
                where: { id: ticketId },
                relations: ['user', 'assignedTo', 'category'],
            });
            if (!ticket) {
                throw new common_1.NotFoundException(`Ticket ${ticketId} not found`);
            }
            const oldPriority = ticket.priority;
            const oldAssignedAgent = ticket.assignedTo;
            // Escalate priority (unless already URGENT)
            const priorityOrder = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
            const currentIndex = priorityOrder.indexOf(ticket.priority);
            if (currentIndex < priorityOrder.length - 1) {
                ticket.priority = priorityOrder[currentIndex + 1];
            }
            // Reassign if escalateTo is provided
            if (escalateTo) {
                const newAgent = await this.userRepository.findOne({
                    where: { id: escalateTo },
                });
                if (!newAgent) {
                    throw new common_1.NotFoundException(`User ${escalateTo} not found`);
                }
                ticket.assignedToId = escalateTo;
                ticket.assignedTo = newAgent;
            }
            // Update ticket
            await this.ticketRepository.save(ticket);
            // Create audit log
            await this.createAuditLog(ticketId, escalatedById, 'escalated', 'ticket', ticketId, {
                priority: oldPriority,
                assignedToId: oldAssignedAgent?.id,
            }, {
                priority: ticket.priority,
                assignedToId: ticket.assignedToId,
                reason,
            }, `Ticket manually escalated${reason ? `: ${reason}` : ''}`);
            // Send escalation notification
            if (escalateTo && ticket.assignedTo) {
                try {
                    await this.ticketEmailService.sendTicketEscalatedEmail(ticket, ticket.assignedTo, // escalatedTo: User
                    1, // escalationLevel
                    reason || 'Manual escalation');
                    this.logger.log(`Escalation notification sent for ticket ${ticketId}`);
                }
                catch (error) {
                    this.logger.error(`Failed to send escalation notification: ${error.message}`);
                }
                // Emit real-time notification
                this.notificationsGateway.emitTicketEscalated(ticketId, [escalateTo], ticket);
            }
            this.logger.log(`Ticket ${ticketId} escalated from ${oldPriority} to ${ticket.priority}`);
            return ticket;
        }
        /**
         * Create audit log entry
         * @private
         */
        async createAuditLog(ticketId, userId, action, entityType, entityId, oldValues, newValues, description = null) {
            try {
                await this.auditLogRepository.save({
                    ticketId,
                    userId,
                    action,
                    entityType,
                    entityId,
                    oldValues,
                    newValues,
                    description,
                }); // Type assertion needed due to TypeORM create() overload ambiguity
            }
            catch (error) {
                this.logger.error(`Failed to create audit log: ${error.message}`, error.stack);
            }
        }
        /**
         * Edit a message
         * @param ticketId - Ticket ID
         * @param messageId - Message ID to edit
         * @param userId - ID of user editing the message
         * @param newContent - New message content
         */
        async editMessage(ticketId, messageId, userId, newContent) {
            const message = await this.messageRepository.findOne({
                where: { id: messageId, ticketId },
                relations: ['author'],
            });
            if (!message) {
                throw new common_1.NotFoundException('Message not found');
            }
            // Store original content if not already stored
            if (!message.originalContent) {
                message.originalContent = message.content;
            }
            const oldContent = message.content;
            message.content = newContent;
            message.isEdited = true;
            message.editedAt = new Date();
            message.editedById = userId;
            await this.messageRepository.save(message);
            // Create audit log
            await this.createAuditLog(ticketId, userId, 'message_edited', 'message', messageId, { content: oldContent }, { content: newContent }, `Message edited by user ${userId}`);
            const updatedMessage = await this.messageRepository.findOne({
                where: { id: messageId },
                relations: ['author', 'editedBy'],
            });
            if (!updatedMessage) {
                throw new common_1.NotFoundException('Message not found after update');
            }
            // Send real-time notification via WebSocket
            const ticket = await this.findOne(ticketId);
            const userIds = [ticket.userId];
            if (ticket.assignedToId) {
                userIds.push(ticket.assignedToId);
            }
            this.notificationsGateway.emitMessageEdited(ticketId, messageId, userIds);
            return updatedMessage;
        }
        /**
         * Delete a message (soft delete)
         * @param ticketId - Ticket ID
         * @param messageId - Message ID to delete
         * @param userId - ID of user deleting the message
         */
        async deleteMessage(ticketId, messageId, userId) {
            const message = await this.messageRepository.findOne({
                where: { id: messageId, ticketId },
            });
            if (!message) {
                throw new common_1.NotFoundException('Message not found');
            }
            message.isDeleted = true;
            message.deletedAt = new Date();
            message.deletedById = userId;
            await this.messageRepository.save(message);
            // Create audit log
            await this.createAuditLog(ticketId, userId, 'message_deleted', 'message', messageId, { content: message.content }, null, `Message deleted by user ${userId}`);
            // Send real-time notification via WebSocket
            const ticket = await this.findOne(ticketId);
            const userIds = [ticket.userId];
            if (ticket.assignedToId) {
                userIds.push(ticket.assignedToId);
            }
            this.notificationsGateway.emitMessageDeleted(ticketId, messageId, userIds);
        }
        /**
         * Merge multiple tickets into one target ticket
         * All messages from source tickets are moved to target ticket
         * Source tickets are closed with reference to target ticket
         */
        async mergeTickets(ticketIds, targetTicketId, userId, mergeNote) {
            // Validate input
            if (ticketIds.length < 1) {
                throw new Error('At least one source ticket is required');
            }
            if (ticketIds.includes(targetTicketId)) {
                throw new Error('Target ticket cannot be in the source tickets list');
            }
            // Fetch all tickets
            const targetTicket = await this.ticketRepository.findOne({
                where: { id: targetTicketId },
                relations: ['user', 'category', 'messages'],
            });
            if (!targetTicket) {
                throw new common_1.NotFoundException(`Target ticket ${targetTicketId} not found`);
            }
            const sourceTickets = await this.ticketRepository.find({
                where: ticketIds.map(id => ({ id })),
                relations: ['messages', 'user'],
            });
            if (sourceTickets.length !== ticketIds.length) {
                throw new common_1.NotFoundException('One or more source tickets not found');
            }
            // Create merge note message in target ticket
            const mergeNoteMessage = this.messageRepository.create({
                ticketId: targetTicketId,
                authorId: userId,
                content: mergeNote || `Merged tickets: ${ticketIds.map(id => `#${id.substring(0, 8)}`).join(', ')}`,
                isInternal: true,
            });
            await this.messageRepository.save(mergeNoteMessage);
            // Move all messages from source tickets to target ticket
            for (const sourceTicket of sourceTickets) {
                // Update all messages to point to target ticket
                await this.messageRepository.update({ ticketId: sourceTicket.id }, { ticketId: targetTicketId });
                // Add a note message about the merge
                const transferNote = this.messageRepository.create({
                    ticketId: targetTicketId,
                    authorId: userId,
                    content: `--- Messages transferred from ticket #${sourceTicket.id.substring(0, 8)} (${sourceTicket.subject}) ---`,
                    isInternal: true,
                });
                await this.messageRepository.save(transferNote);
                // Close the source ticket with reference to target
                sourceTicket.status = ticket_status_enum_1.TicketStatus.CLOSED;
                sourceTicket.resolvedAt = new Date();
                await this.ticketRepository.save(sourceTicket);
                // Create audit log
                await this.createAuditLog(sourceTicket.id, userId, 'ticket_merged', 'ticket', sourceTicket.id, { status: sourceTicket.status }, { status: ticket_status_enum_1.TicketStatus.CLOSED, mergedInto: targetTicketId }, `Ticket merged into ${targetTicketId}`);
            }
            // Update target ticket audit log
            await this.createAuditLog(targetTicketId, userId, 'tickets_merged_in', 'ticket', targetTicketId, null, { mergedTickets: ticketIds }, `${ticketIds.length} tickets merged into this ticket`);
            // Reload target ticket with updated messages
            const updatedTicket = await this.ticketRepository.findOne({
                where: { id: targetTicketId },
                relations: ['user', 'category', 'assignedTo', 'messages', 'messages.author'],
            });
            this.logger.log(`Merged ${ticketIds.length} tickets into ${targetTicketId} by user ${userId}`);
            return updatedTicket;
        }
        /**
         * Split a ticket into two separate tickets
         * Moves selected messages to a new ticket
         */
        async splitTicket(originalTicketId, splitData, userId) {
            // Fetch original ticket
            const originalTicket = await this.ticketRepository.findOne({
                where: { id: originalTicketId },
                relations: ['user', 'category', 'assignedTo', 'messages'],
            });
            if (!originalTicket) {
                throw new common_1.NotFoundException(`Ticket ${originalTicketId} not found`);
            }
            // Validate that message IDs belong to this ticket
            const messagesToMove = await this.messageRepository.find({
                where: splitData.messageIds.map(id => ({ id, ticketId: originalTicketId })),
            });
            if (messagesToMove.length !== splitData.messageIds.length) {
                throw new Error('Some messages not found or do not belong to this ticket');
            }
            // Create new ticket
            const newTicketData = {
                subject: splitData.newTicketSubject,
                description: splitData.newTicketDescription,
                priority: splitData.newTicketPriority,
                categoryId: splitData.newTicketCategoryId || originalTicket.categoryId,
                userId: originalTicket.userId,
                assignedToId: originalTicket.assignedToId,
                status: ticket_status_enum_1.TicketStatus.NEW,
            };
            const newTicket = this.ticketRepository.create(newTicketData);
            // Calculate SLA for new ticket
            const slaDates = this.slaService.calculateSLADueDates(newTicket);
            newTicket.slaFirstResponseDueAt = slaDates.slaFirstResponseDueAt;
            newTicket.slaResolutionDueAt = slaDates.slaResolutionDueAt;
            const savedNewTicket = await this.ticketRepository.save(newTicket);
            // Create initial message in new ticket
            const initialMessage = this.messageRepository.create({
                ticketId: savedNewTicket.id,
                authorId: userId,
                content: splitData.newTicketDescription,
                isInternal: false,
            });
            await this.messageRepository.save(initialMessage);
            // Move selected messages to new ticket
            await this.messageRepository.update({ id: { $in: splitData.messageIds } }, { ticketId: savedNewTicket.id });
            // Add split notes to both tickets
            const originalTicketNote = this.messageRepository.create({
                ticketId: originalTicketId,
                authorId: userId,
                content: splitData.splitNote || `Ticket split: ${messagesToMove.length} messages moved to new ticket #${savedNewTicket.id.substring(0, 8)}`,
                isInternal: true,
            });
            await this.messageRepository.save(originalTicketNote);
            const newTicketNote = this.messageRepository.create({
                ticketId: savedNewTicket.id,
                authorId: userId,
                content: `Split from ticket #${originalTicketId.substring(0, 8)} - ${originalTicket.subject}`,
                isInternal: true,
            });
            await this.messageRepository.save(newTicketNote);
            // Create audit logs
            await this.createAuditLog(originalTicketId, userId, 'ticket_split', 'ticket', originalTicketId, null, { newTicketId: savedNewTicket.id, movedMessages: splitData.messageIds.length }, `Ticket split: ${messagesToMove.length} messages moved to new ticket`);
            await this.createAuditLog(savedNewTicket.id, userId, 'ticket_created_from_split', 'ticket', savedNewTicket.id, null, { originalTicketId, subject: savedNewTicket.subject }, `Created from split of ticket ${originalTicketId}`);
            // Reload tickets with updated data
            const updatedOriginalTicket = await this.ticketRepository.findOne({
                where: { id: originalTicketId },
                relations: ['user', 'category', 'assignedTo', 'messages', 'messages.author'],
            });
            const updatedNewTicket = await this.ticketRepository.findOne({
                where: { id: savedNewTicket.id },
                relations: ['user', 'category', 'assignedTo', 'messages', 'messages.author'],
            });
            this.logger.log(`Split ticket ${originalTicketId} into new ticket ${savedNewTicket.id} by user ${userId}`);
            return {
                originalTicket: updatedOriginalTicket,
                newTicket: updatedNewTicket,
            };
        }
        /**
         * DEPRECATED - Use TicketEmailService instead
         * Send ticket created email notification
         * @private
         */
        async sendTicketCreatedEmail(ticket) {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
                const ticketUrl = `${baseUrl}/portal/support/tickets/${ticket.id}`;
                const ticketNumber = `#${ticket.id.substring(0, 8).toUpperCase()}`;
                const customerName = ticket.user?.firstName ? `${ticket.user.firstName} ${ticket.user.lastName}` : 'Değerli Müşterimiz';
                const priorityLabels = {
                    low: 'Düşük',
                    medium: 'Orta',
                    high: 'Yüksek',
                    urgent: 'Acil',
                };
                const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #334155; background: #f6f9fc; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; background: white; }
              .header { background: #1e40af; color: white; padding: 32px 24px; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { padding: 48px; }
              .content h2 { color: #1e293b; font-size: 24px; margin-bottom: 24px; }
              .content p { margin-bottom: 16px; }
              .ticket-box { background: #f1f5f9; border-radius: 8px; padding: 24px; margin: 24px 0; }
              .ticket-label { color: #64748b; font-size: 14px; font-weight: 500; margin-bottom: 4px; }
              .ticket-value { color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; }
              .divider { border: 0; border-top: 1px solid #cbd5e1; margin: 16px 0; }
              .button-container { text-align: center; margin: 32px 0; }
              .button { background: #1e40af; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; display: inline-block; font-weight: 600; }
              .help-text { text-align: center; color: #64748b; font-size: 14px; font-style: italic; margin-top: 24px; }
              .footer { text-align: center; color: #64748b; font-size: 14px; padding: 32px 48px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Aluplan</h1>
              </div>
              <div class="content">
                <h2>Destek Talebiniz Alındı</h2>
                <p>Merhaba ${customerName},</p>
                <p>Destek talebiniz başarıyla oluşturuldu ve ekibimiz en kısa sürede size dönüş yapacaktır.</p>
                
                <div class="ticket-box">
                  <div class="ticket-label">Talep Numarası:</div>
                  <div class="ticket-value">${ticketNumber}</div>
                  <hr class="divider">
                  <div class="ticket-label">Konu:</div>
                  <div class="ticket-value">${ticket.subject}</div>
                  <hr class="divider">
                  <div class="ticket-label">Öncelik:</div>
                  <div class="ticket-value">${priorityLabels[ticket.priority] || ticket.priority}</div>
                </div>

                <p>Talebinizin detaylarını görüntülemek ve mesajlaşmak için aşağıdaki butona tıklayabilirsiniz:</p>
                
                <div class="button-container">
                  <a href="${ticketUrl}" class="button">Talebi Görüntüle</a>
                </div>

                <p class="help-text">Ortalama yanıt süresi: ${ticket.priority === 'urgent' ? '1-2 saat' : ticket.priority === 'high' ? '4-6 saat' : '24 saat'}</p>
                
                <hr class="divider">
                
                <div class="footer">
                  Bu e-posta Aluplan destek sistemi tarafından otomatik olarak gönderilmiştir.<br>
                  Talep numaranızı her zaman belirtiniz: ${ticketNumber}
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
                await this.mailService.sendMail({
                    to: { email: ticket.user.email, name: `${ticket.user.firstName} ${ticket.user.lastName}` },
                    subject: `Destek Talebiniz Oluşturuldu - ${ticketNumber}`,
                    html: emailHtml,
                    channel: mail_service_interface_1.MailChannel.SUPPORT,
                    priority: ticket.priority === 'urgent' ? mail_service_interface_1.MailPriority.HIGH : mail_service_interface_1.MailPriority.NORMAL,
                    tags: ['ticket-created', `ticket-${ticket.id}`],
                });
                this.logger.log(`Ticket created email sent to ${ticket.user.email} for ticket ${ticket.id}`);
            }
            catch (error) {
                this.logger.error(`Failed to send ticket created email: ${error.message}`, error.stack);
            }
        }
        /**
         * Send ticket assigned email notification
         * @private
         */
        async sendTicketAssignedEmail(ticket) {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
                const ticketUrl = `${baseUrl}/portal/support/tickets/${ticket.id}`;
                const ticketNumber = `#${ticket.id.substring(0, 8).toUpperCase()}`;
                const customerName = ticket.user?.firstName ? `${ticket.user.firstName} ${ticket.user.lastName}` : 'Değerli Müşterimiz';
                const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #334155; background: #f6f9fc; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; background: white; }
              .header { background: #1e40af; color: white; padding: 32px 24px; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { padding: 48px; }
              .content h2 { color: #1e293b; font-size: 24px; margin-bottom: 24px; }
              .content p { margin-bottom: 16px; }
              .ticket-box { background: #f1f5f9; border-radius: 8px; padding: 24px; margin: 24px 0; }
              .ticket-label { color: #64748b; font-size: 14px; font-weight: 500; margin-bottom: 4px; }
              .ticket-value { color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 4px 0; }
              .email-text { color: #64748b; font-size: 14px; margin: 0 0 16px 0; }
              .divider { border: 0; border-top: 1px solid #cbd5e1; margin: 16px 0; }
              .button-container { text-align: center; margin: 32px 0; }
              .button { background: #1e40af; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; display: inline-block; font-weight: 600; }
              .footer { text-align: center; color: #64748b; font-size: 14px; padding: 32px 48px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Aluplan</h1>
              </div>
              <div class="content">
                <h2>Destek Talebiniz Üstlenildi</h2>
                <p>Merhaba ${customerName},</p>
                <p><strong>${ticketNumber}</strong> numaralı destek talebiniz ekibimizden <strong>${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}</strong> tarafından üstlenildi.</p>
                
                <div class="ticket-box">
                  <div class="ticket-label">Konu:</div>
                  <div class="ticket-value">${ticket.subject}</div>
                  <hr class="divider">
                  <div class="ticket-label">Sorumlu Destek Uzmanı:</div>
                  <div class="ticket-value">${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}</div>
                  <div class="email-text">${ticket.assignedTo.email}</div>
                </div>

                <p>${ticket.assignedTo.firstName}, talebinizi inceleyecek ve size en kısa sürede dönüş yapacaktır.</p>
                
                <div class="button-container">
                  <a href="${ticketUrl}" class="button">Talebi Görüntüle</a>
                </div>

                <hr class="divider">
                
                <div class="footer">
                  Bu e-posta Aluplan destek sistemi tarafından otomatik olarak gönderilmiştir.<br>
                  Talep numaranızı her zaman belirtiniz: ${ticketNumber}
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
                await this.mailService.sendMail({
                    to: { email: ticket.user.email, name: `${ticket.user.firstName} ${ticket.user.lastName}` },
                    subject: `Destek Talebiniz Üstlenildi - ${ticketNumber}`,
                    html: emailHtml,
                    channel: mail_service_interface_1.MailChannel.SUPPORT,
                    priority: mail_service_interface_1.MailPriority.NORMAL,
                    tags: ['ticket-assigned', `ticket-${ticket.id}`],
                });
                this.logger.log(`Ticket assigned email sent to ${ticket.user.email} for ticket ${ticket.id}`);
            }
            catch (error) {
                this.logger.error(`Failed to send ticket assigned email: ${error.message}`, error.stack);
            }
        }
        /**
         * Send new message email notification
         * @private
         */
        async sendNewMessageEmail(ticket, message, isFromSupport) {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
                const ticketUrl = `${baseUrl}/portal/support/tickets/${ticket.id}`;
                const ticketNumber = `#${ticket.id.substring(0, 8).toUpperCase()}`;
                const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #334155; background: #f6f9fc; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; background: white; }
              .header { background: #1e40af; color: white; padding: 32px 24px; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { padding: 48px; }
              .content h2 { color: #1e293b; font-size: 24px; margin-bottom: 24px; }
              .content p { margin-bottom: 16px; }
              .info-box { background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 20px 0; }
              .info-label { color: #64748b; font-size: 14px; font-weight: 500; margin-bottom: 4px; }
              .info-value { color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; }
              .message-box { background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 24px; margin: 24px 0; }
              .message-label { color: #64748b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
              .message-content { color: #1e293b; font-size: 16px; line-height: 1.8; margin: 0; white-space: pre-wrap; }
              .divider { border: 0; border-top: 1px solid #cbd5e1; margin: 12px 0; }
              .button-container { text-align: center; margin: 32px 0; }
              .button { background: #1e40af; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; display: inline-block; font-weight: 600; }
              .footer { text-align: center; color: #64748b; font-size: 14px; padding: 32px 48px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Aluplan</h1>
              </div>
              <div class="content">
                <h2>${isFromSupport ? 'Destek Ekibinden Yeni Mesaj' : 'Talebinize Yeni Mesaj'}</h2>
                <p><strong>${ticketNumber}</strong> numaralı destek talebinize yeni bir mesaj eklendi.</p>
                
                <div class="info-box">
                  <div class="info-label">Konu:</div>
                  <div class="info-value">${ticket.subject}</div>
                  <hr class="divider">
                  <div class="info-label">Gönderen:</div>
                  <div class="info-value">${message.author.firstName} ${message.author.lastName}</div>
                </div>

                <div class="message-box">
                  <div class="message-label">Mesaj:</div>
                  <div class="message-content">${message.content}</div>
                </div>

                <p>${isFromSupport ? 'Yanıtlamak için aşağıdaki butona tıklayın:' : 'Mesajı görüntülemek için aşağıdaki butona tıklayın:'}</p>
                
                <div class="button-container">
                  <a href="${ticketUrl}" class="button">${isFromSupport ? 'Yanıtla' : 'Mesajı Görüntüle'}</a>
                </div>

                <hr class="divider">
                
                <div class="footer">
                  Bu e-posta Aluplan destek sistemi tarafından otomatik olarak gönderilmiştir.<br>
                  Talep numaranızı her zaman belirtiniz: ${ticketNumber}
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
                const recipientEmail = ticket.user.email;
                const recipientName = `${ticket.user.firstName} ${ticket.user.lastName}`;
                await this.mailService.sendMail({
                    to: { email: recipientEmail, name: recipientName },
                    subject: `Yeni Mesaj - ${ticketNumber}`,
                    html: emailHtml,
                    channel: mail_service_interface_1.MailChannel.SUPPORT,
                    priority: mail_service_interface_1.MailPriority.NORMAL,
                    tags: ['ticket-message', `ticket-${ticket.id}`],
                });
                this.logger.log(`New message email sent to ${recipientEmail} for ticket ${ticket.id}`);
            }
            catch (error) {
                this.logger.error(`Failed to send new message email: ${error.message}`, error.stack);
            }
        }
        /**
         * Send ticket resolved email notification
         * @private
         */
        async sendTicketResolvedEmail(ticket) {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
                const ticketUrl = `${baseUrl}/portal/support/tickets/${ticket.id}`;
                const feedbackUrl = `${baseUrl}/portal/support/tickets/${ticket.id}/feedback`;
                const ticketNumber = `#${ticket.id.substring(0, 8).toUpperCase()}`;
                const customerName = ticket.user?.firstName ? `${ticket.user.firstName} ${ticket.user.lastName}` : 'Değerli Müşterimiz';
                const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #334155; background: #f6f9fc; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; background: white; }
              .header { background: #1e40af; color: white; padding: 32px 24px; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { padding: 48px; }
              .icon-container { text-align: center; margin: 24px 0; }
              .success-icon { display: inline-block; width: 64px; height: 64px; border-radius: 50%; background: #10b981; color: white; font-size: 36px; line-height: 64px; font-weight: 700; }
              .content h2 { color: #1e293b; font-size: 24px; margin-bottom: 24px; text-align: center; }
              .content p { margin-bottom: 16px; }
              .ticket-box { background: #f1f5f9; border-radius: 8px; padding: 24px; margin: 24px 0; }
              .ticket-label { color: #64748b; font-size: 14px; font-weight: 500; margin-bottom: 4px; }
              .ticket-value { color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; }
              .divider { border: 0; border-top: 1px solid #cbd5e1; margin: 16px 0; }
              .button-container { text-align: center; margin: 24px 0; }
              .button-primary { background: #1e40af; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; display: inline-block; font-weight: 600; }
              .button-secondary { background: #10b981; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; display: inline-block; font-weight: 600; }
              .feedback-section { background: #fefce8; border-radius: 8px; padding: 32px 24px; margin-top: 32px; }
              .feedback-section h3 { color: #1e293b; font-size: 20px; text-align: center; margin-bottom: 16px; }
              .feedback-text { color: #334155; font-size: 15px; text-align: center; margin-bottom: 20px; }
              .footer { text-align: center; color: #64748b; font-size: 14px; padding: 32px 48px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Aluplan</h1>
              </div>
              <div class="content">
                <div class="icon-container">
                  <div class="success-icon">✓</div>
                </div>
                
                <h2>Destek Talebiniz Çözümlendi</h2>
                <p>Merhaba ${customerName},</p>
                <p><strong>${ticketNumber}</strong> numaralı destek talebiniz başarıyla çözümlendi.</p>
                
                <div class="ticket-box">
                  <div class="ticket-label">Konu:</div>
                  <div class="ticket-value">${ticket.subject}</div>
                  <hr class="divider">
                  <div class="ticket-label">Çözümleyen:</div>
                  <div class="ticket-value">${ticket.assignedTo ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}` : 'Destek Ekibi'}</div>
                </div>

                <p>Eğer sorununuz tam olarak çözülmediyse, talebi yeniden açabilir veya yeni bir destek talebi oluşturabilirsiniz.</p>
                
                <div class="button-container">
                  <a href="${ticketUrl}" class="button-primary">Talebi Görüntüle</a>
                </div>

                <hr class="divider">

                <div class="feedback-section">
                  <h3>Hizmetimizi Değerlendirin</h3>
                  <p class="feedback-text">Aldığınız hizmet hakkında görüşleriniz bizim için çok değerli. Lütfen birkaç dakikanızı ayırarak bizi değerlendirin.</p>
                  <div class="button-container">
                    <a href="${feedbackUrl}" class="button-secondary">Geri Bildirim Verin</a>
                  </div>
                </div>

                <hr class="divider">
                
                <div class="footer">
                  Bu e-posta Aluplan destek sistemi tarafından otomatik olarak gönderilmiştir.<br>
                  Talep numaranızı her zaman belirtiniz: ${ticketNumber}
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
                await this.mailService.sendMail({
                    to: { email: ticket.user.email, name: `${ticket.user.firstName} ${ticket.user.lastName}` },
                    subject: `Destek Talebiniz Çözümlendi - ${ticketNumber}`,
                    html: emailHtml,
                    channel: mail_service_interface_1.MailChannel.SUPPORT,
                    priority: mail_service_interface_1.MailPriority.NORMAL,
                    tags: ['ticket-resolved', `ticket-${ticket.id}`],
                });
                this.logger.log(`Ticket resolved email sent to ${ticket.user.email} for ticket ${ticket.id}`);
            }
            catch (error) {
                this.logger.error(`Failed to send ticket resolved email: ${error.message}`, error.stack);
            }
        }
    };
    return TicketsService = _classThis;
})();
exports.TicketsService = TicketsService;
//# sourceMappingURL=tickets.service.js.map