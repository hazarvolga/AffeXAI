import { Injectable, NotFoundException, ForbiddenException, Logger, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketMessage } from './entities/ticket-message.entity';
import { TicketCategory } from './entities/ticket-category.entity';
import { TicketAuditLog } from './entities/ticket-audit-log.entity';
import { User } from '../users/entities/user.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketFiltersDto } from './dto/ticket-filters.dto';
import { AddMessageDto } from './dto/add-message.dto';
import { TicketStatus } from './enums/ticket-status.enum';
import { MailService } from '../mail/mail.service';
import { MailChannel, MailPriority } from '../mail/interfaces/mail-service.interface';
import { SlaService } from './services/sla.service';
import { TicketEmailService } from './services/ticket-email.service';
import { TicketAutoTaggingService } from './services/ticket-auto-tagging.service';
import { TicketNotificationsGateway } from './gateways/ticket-notifications.gateway';
import { SettingsService } from '../settings/settings.service';
import { AiService } from '../ai/ai.service';
import { AppLoggerService } from '../../common/logging/app-logger.service';
import { LogContext } from '../../common/entities/system-log.entity';
import { FaqEnhancedSearchService } from '../faq-learning/services/faq-enhanced-search.service';
import { KnowledgeBaseService } from './services/knowledge-base.service';

/**
 * Tickets Service
 * Business logic for ticket management
 */
@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(TicketMessage)
    private readonly messageRepository: Repository<TicketMessage>,
    @InjectRepository(TicketCategory)
    private readonly categoryRepository: Repository<TicketCategory>,
    @InjectRepository(TicketAuditLog)
    private readonly auditLogRepository: Repository<TicketAuditLog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
    private readonly slaService: SlaService,
    private readonly ticketEmailService: TicketEmailService,
    private readonly autoTaggingService: TicketAutoTaggingService,
    @Inject(forwardRef(() => TicketNotificationsGateway))
    private readonly notificationsGateway: TicketNotificationsGateway,
    private readonly settingsService: SettingsService,
    private readonly aiService: AiService,
    private readonly appLoggerService: AppLoggerService,
    private readonly faqSearchService: FaqEnhancedSearchService,
    private readonly knowledgeBaseService: KnowledgeBaseService,
  ) {}

  /**
   * Create a new support ticket
   * @param userId - ID of the user creating the ticket (from @CurrentUser)
   * @param dto - Ticket creation data
   */
  async create(userId: string, dto: CreateTicketDto): Promise<Ticket> {
    // Create the ticket
    const ticket = this.ticketRepository.create({
      ...dto,
      userId,
      status: TicketStatus.NEW,
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
    } catch (error) {
      this.logger.error(`Failed to auto-tag ticket ${savedTicket.id}: ${error.message}`);
      // Continue even if auto-tagging fails
    }

    // Create audit log for ticket creation
    await this.createAuditLog(
      savedTicket.id,
      userId,
      'ticket_created',
      'ticket',
      savedTicket.id,
      null,
      {
        subject: savedTicket.subject,
        priority: savedTicket.priority,
        status: savedTicket.status,
        categoryId: savedTicket.categoryId,
      },
      `Ticket created by user ${userId}`,
    );

    // Create the initial message (same as description)
    const initialMessage = this.messageRepository.create({
      ticketId: savedTicket.id,
      authorId: userId,
      content: dto.description,
      isInternal: false,
    });

    await this.messageRepository.save(initialMessage);

    // Create audit log for initial message
    await this.createAuditLog(
      savedTicket.id,
      userId,
      'message_added',
      'message',
      initialMessage.id,
      null,
      { content: dto.description },
      'Initial ticket message',
    );

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
  async findAll(filters: TicketFiltersDto): Promise<Ticket[]> {
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
      query.andWhere(
        '(ticket.subject ILIKE :search OR ticket.description ILIKE :search)',
        { search: `%${filters.search}%` },
      );
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
  async findOne(id: string): Promise<Ticket> {
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
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return ticket;
  }

  /**
   * Update ticket status
   * @param id - Ticket ID
   * @param status - New status
   * @param userId - ID of user making the change
   */
  async updateStatus(
    id: string,
    status: TicketStatus,
    userId: string,
  ): Promise<Ticket> {
    const ticket = await this.findOne(id);
    const oldStatus = ticket.status;

    ticket.status = status;

    // Track first response time with SLA calculation
    if (
      oldStatus === TicketStatus.NEW &&
      status === TicketStatus.OPEN &&
      !ticket.firstResponseAt
    ) {
      ticket.firstResponseAt = new Date();
      ticket.responseTimeHours = this.slaService.calculateResponseTime(ticket);
      ticket.isSLABreached = this.slaService.checkSLABreach(ticket);
    }

    // Track resolution time with SLA calculation
    if (status === TicketStatus.RESOLVED && !ticket.resolvedAt) {
      ticket.resolvedAt = new Date();
      ticket.resolutionTimeHours = this.slaService.calculateResolutionTime(ticket);
      ticket.isSLABreached = this.slaService.checkSLABreach(ticket);
    }

    // Track closure time
    if (status === TicketStatus.CLOSED && !ticket.closedAt) {
      ticket.closedAt = new Date();
    }

    await this.ticketRepository.save(ticket);

    // Create audit log for status change
    await this.createAuditLog(
      id,
      userId,
      'status_changed',
      'ticket',
      id,
      { status: oldStatus },
      { status },
      `Status changed from ${oldStatus} to ${status}`,
    );

    // Get ticket with relations for email
    const ticketWithRelations = await this.findOne(id);

    // Send resolved email when ticket is resolved
    if (status === TicketStatus.RESOLVED) {
      const customer = await this.userRepository.findOne({ where: { id: ticket.userId } });
      const resolver = await this.userRepository.findOne({ where: { id: userId } });

      if (customer && resolver) {
        await this.ticketEmailService.sendTicketResolvedEmail(
          ticketWithRelations,
          customer,
          resolver,
        );
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
  async assignTo(id: string, assignedToId: string, assignerId: string): Promise<Ticket> {
    const ticket = await this.findOne(id);
    const oldAssignedToId = ticket.assignedToId;

    ticket.assignedToId = assignedToId;
    ticket.status = TicketStatus.OPEN;

    await this.ticketRepository.save(ticket);

    // Create audit log for assignment
    await this.createAuditLog(
      id,
      assignerId,
      'assigned',
      'ticket',
      id,
      { assignedToId: oldAssignedToId },
      { assignedToId },
      `Ticket assigned to user ${assignedToId}`,
    );

    // Get users for email
    const ticketWithRelations = await this.findOne(id);
    const assignedUser = await this.userRepository.findOne({ where: { id: assignedToId } });
    const assigner = await this.userRepository.findOne({ where: { id: assignerId } });

    // Send assignment email
    if (assignedUser && assigner) {
      await this.ticketEmailService.sendTicketAssignedEmail(
        ticketWithRelations,
        assignedUser,
        assigner,
      );
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
  async addMessage(
    ticketId: string,
    userId: string,
    dto: AddMessageDto,
  ): Promise<TicketMessage> {
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
    await this.createAuditLog(
      ticketId,
      userId,
      'message_added',
      'message',
      savedMessage.id,
      null,
      {
        content: dto.content,
        isInternal: dto.isInternal,
      },
      `Message added to ticket`,
    );

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
        await this.ticketEmailService.sendNewMessageEmail(
          ticket,
          messageWithAuthor,
          recipient,
          isCustomerMessage,
        );
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

    return messageWithAuthor!;
  }

  /**
   * Get ticket statistics (basic)
   */
  async getStats() {
    const [
      total,
      newCount,
      openCount,
      resolvedCount,
      closedCount,
    ] = await Promise.all([
      this.ticketRepository.count(),
      this.ticketRepository.count({ where: { status: TicketStatus.NEW } }),
      this.ticketRepository.count({ where: { status: TicketStatus.OPEN } }),
      this.ticketRepository.count({ where: { status: TicketStatus.RESOLVED } }),
      this.ticketRepository.count({ where: { status: TicketStatus.CLOSED } }),
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
  async findAllCategories(): Promise<TicketCategory[]> {
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
  async escalateTicket(
    ticketId: string,
    escalatedById: string,
    reason?: string,
    escalateTo?: string,
  ): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
      relations: ['user', 'assignedTo', 'category'],
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket ${ticketId} not found`);
    }

    const oldPriority = ticket.priority;
    const oldAssignedAgent = ticket.assignedTo;

    // Escalate priority (unless already URGENT)
    const priorityOrder = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
    const currentIndex = priorityOrder.indexOf(ticket.priority);
    if (currentIndex < priorityOrder.length - 1) {
      ticket.priority = priorityOrder[currentIndex + 1] as any;
    }

    // Reassign if escalateTo is provided
    if (escalateTo) {
      const newAgent = await this.userRepository.findOne({
        where: { id: escalateTo },
      });

      if (!newAgent) {
        throw new NotFoundException(`User ${escalateTo} not found`);
      }

      ticket.assignedToId = escalateTo;
      ticket.assignedTo = newAgent;
    }

    // Update ticket
    await this.ticketRepository.save(ticket);

    // Create audit log
    await this.createAuditLog(
      ticketId,
      escalatedById,
      'escalated',
      'ticket',
      ticketId,
      {
        priority: oldPriority,
        assignedToId: oldAssignedAgent?.id,
      },
      {
        priority: ticket.priority,
        assignedToId: ticket.assignedToId,
        reason,
      },
      `Ticket manually escalated${reason ? `: ${reason}` : ''}`,
    );

    // Send escalation notification
    if (escalateTo && ticket.assignedTo) {
      try {
        await this.ticketEmailService.sendTicketEscalatedEmail(
          ticket,
          ticket.assignedTo, // escalatedTo: User
          1, // escalationLevel
          reason || 'Manual escalation'
        );
        this.logger.log(`Escalation notification sent for ticket ${ticketId}`);
      } catch (error) {
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
  private async createAuditLog(
    ticketId: string,
    userId: string | null,
    action: string,
    entityType: string,
    entityId: string | null,
    oldValues: Record<string, any> | null,
    newValues: Record<string, any> | null,
    description: string | null = null,
  ): Promise<void> {
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
      } as any); // Type assertion needed due to TypeORM create() overload ambiguity
    } catch (error) {
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
  async editMessage(
    ticketId: string,
    messageId: string,
    userId: string,
    newContent: string,
  ): Promise<TicketMessage> {
    const message = await this.messageRepository.findOne({
      where: { id: messageId, ticketId },
      relations: ['author'],
    });

    if (!message) {
      throw new NotFoundException('Message not found');
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
    await this.createAuditLog(
      ticketId,
      userId,
      'message_edited',
      'message',
      messageId,
      { content: oldContent },
      { content: newContent },
      `Message edited by user ${userId}`,
    );

    const updatedMessage = await this.messageRepository.findOne({
      where: { id: messageId },
      relations: ['author', 'editedBy'],
    });

    if (!updatedMessage) {
      throw new NotFoundException('Message not found after update');
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
  async deleteMessage(
    ticketId: string,
    messageId: string,
    userId: string,
  ): Promise<void> {
    const message = await this.messageRepository.findOne({
      where: { id: messageId, ticketId },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    message.isDeleted = true;
    message.deletedAt = new Date();
    message.deletedById = userId;

    await this.messageRepository.save(message);

    // Create audit log
    await this.createAuditLog(
      ticketId,
      userId,
      'message_deleted',
      'message',
      messageId,
      { content: message.content },
      null,
      `Message deleted by user ${userId}`,
    );

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
  async mergeTickets(
    ticketIds: string[],
    targetTicketId: string,
    userId: string,
    mergeNote?: string,
  ): Promise<Ticket> {
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
      throw new NotFoundException(`Target ticket ${targetTicketId} not found`);
    }

    const sourceTickets = await this.ticketRepository.find({
      where: ticketIds.map(id => ({ id })),
      relations: ['messages', 'user'],
    });

    if (sourceTickets.length !== ticketIds.length) {
      throw new NotFoundException('One or more source tickets not found');
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
      await this.messageRepository.update(
        { ticketId: sourceTicket.id },
        { ticketId: targetTicketId },
      );

      // Add a note message about the merge
      const transferNote = this.messageRepository.create({
        ticketId: targetTicketId,
        authorId: userId,
        content: `--- Messages transferred from ticket #${sourceTicket.id.substring(0, 8)} (${sourceTicket.subject}) ---`,
        isInternal: true,
      });
      await this.messageRepository.save(transferNote);

      // Close the source ticket with reference to target
      sourceTicket.status = TicketStatus.CLOSED;
      sourceTicket.resolvedAt = new Date();
      await this.ticketRepository.save(sourceTicket);

      // Create audit log
      await this.createAuditLog(
        sourceTicket.id,
        userId,
        'ticket_merged',
        'ticket',
        sourceTicket.id,
        { status: sourceTicket.status },
        { status: TicketStatus.CLOSED, mergedInto: targetTicketId },
        `Ticket merged into ${targetTicketId}`,
      );
    }

    // Update target ticket audit log
    await this.createAuditLog(
      targetTicketId,
      userId,
      'tickets_merged_in',
      'ticket',
      targetTicketId,
      null,
      { mergedTickets: ticketIds },
      `${ticketIds.length} tickets merged into this ticket`,
    );

    // Reload target ticket with updated messages
    const updatedTicket = await this.ticketRepository.findOne({
      where: { id: targetTicketId },
      relations: ['user', 'category', 'assignedTo', 'messages', 'messages.author'],
    });

    this.logger.log(`Merged ${ticketIds.length} tickets into ${targetTicketId} by user ${userId}`);

    return updatedTicket!;
  }

  /**
   * Split a ticket into two separate tickets
   * Moves selected messages to a new ticket
   */
  async splitTicket(
    originalTicketId: string,
    splitData: {
      newTicketSubject: string;
      newTicketDescription: string;
      newTicketPriority: string;
      newTicketCategoryId?: string;
      messageIds: string[];
      splitNote?: string;
    },
    userId: string,
  ): Promise<{ originalTicket: Ticket; newTicket: Ticket }> {
    // Fetch original ticket
    const originalTicket = await this.ticketRepository.findOne({
      where: { id: originalTicketId },
      relations: ['user', 'category', 'assignedTo', 'messages'],
    });

    if (!originalTicket) {
      throw new NotFoundException(`Ticket ${originalTicketId} not found`);
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
      priority: splitData.newTicketPriority as any,
      categoryId: splitData.newTicketCategoryId || originalTicket.categoryId,
      userId: originalTicket.userId,
      assignedToId: originalTicket.assignedToId,
      status: TicketStatus.NEW,
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
    await this.messageRepository.update(
      { id: { $in: splitData.messageIds } as any },
      { ticketId: savedNewTicket.id },
    );

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
    await this.createAuditLog(
      originalTicketId,
      userId,
      'ticket_split',
      'ticket',
      originalTicketId,
      null,
      { newTicketId: savedNewTicket.id, movedMessages: splitData.messageIds.length },
      `Ticket split: ${messagesToMove.length} messages moved to new ticket`,
    );

    await this.createAuditLog(
      savedNewTicket.id,
      userId,
      'ticket_created_from_split',
      'ticket',
      savedNewTicket.id,
      null,
      { originalTicketId, subject: savedNewTicket.subject },
      `Created from split of ticket ${originalTicketId}`,
    );

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
      originalTicket: updatedOriginalTicket!,
      newTicket: updatedNewTicket!,
    };
  }

  /**
   * DEPRECATED - Use TicketEmailService instead
   * Send ticket created email notification
   * @private
   */
  private async sendTicketCreatedEmail(ticket: Ticket): Promise<void> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
      const ticketUrl = `${baseUrl}/portal/support/tickets/${ticket.id}`;
      const ticketNumber = `#${ticket.id.substring(0, 8).toUpperCase()}`;
      const customerName = ticket.user?.firstName ? `${ticket.user.firstName} ${ticket.user.lastName}` : 'Değerli Müşterimiz';
      
      const priorityLabels: Record<string, string> = {
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
        channel: MailChannel.SUPPORT,
        priority: ticket.priority === 'urgent' ? MailPriority.HIGH : MailPriority.NORMAL,
        tags: ['ticket-created', `ticket-${ticket.id}`],
      });

      this.logger.log(`Ticket created email sent to ${ticket.user.email} for ticket ${ticket.id}`);
    } catch (error) {
      this.logger.error(`Failed to send ticket created email: ${error.message}`, error.stack);
    }
  }

  /**
   * Send ticket assigned email notification
   * @private
   */
  private async sendTicketAssignedEmail(ticket: Ticket): Promise<void> {
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
        channel: MailChannel.SUPPORT,
        priority: MailPriority.NORMAL,
        tags: ['ticket-assigned', `ticket-${ticket.id}`],
      });

      this.logger.log(`Ticket assigned email sent to ${ticket.user.email} for ticket ${ticket.id}`);
    } catch (error) {
      this.logger.error(`Failed to send ticket assigned email: ${error.message}`, error.stack);
    }
  }

  /**
   * Send new message email notification
   * @private
   */
  private async sendNewMessageEmail(
    ticket: Ticket,
    message: TicketMessage,
    isFromSupport: boolean
  ): Promise<void> {
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
        channel: MailChannel.SUPPORT,
        priority: MailPriority.NORMAL,
        tags: ['ticket-message', `ticket-${ticket.id}`],
      });

      this.logger.log(`New message email sent to ${recipientEmail} for ticket ${ticket.id}`);
    } catch (error) {
      this.logger.error(`Failed to send new message email: ${error.message}`, error.stack);
    }
  }

  /**
   * Send ticket resolved email notification
   * @private
   */
  private async sendTicketResolvedEmail(ticket: Ticket): Promise<void> {
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
        channel: MailChannel.SUPPORT,
        priority: MailPriority.NORMAL,
        tags: ['ticket-resolved', `ticket-${ticket.id}`],
      });

      this.logger.log(`Ticket resolved email sent to ${ticket.user.email} for ticket ${ticket.id}`);
    } catch (error) {
      this.logger.error(`Failed to send ticket resolved email: ${error.message}`, error.stack);
    }
  }

  /**
   * Analyze ticket description with AI before creation
   * Now with context from FAQ Learning, Knowledge Base, and Knowledge Sources
   * @param problemDescription - The user's problem description
   * @param category - The selected category
   */
  async analyzeTicketWithAI(problemDescription: string, category: string) {
    const startTime = Date.now();

    try {
      this.logger.log('🔍 [AI ANALYSIS] Starting ticket analysis with knowledge base context...');

      // Get AI configuration from settings (using support module config)
      const apiKey = await this.settingsService.getAiApiKeyForModule('support');
      const model = await this.settingsService.getAiModelForModule('support');
      const provider = await this.settingsService.getAiProviderForModule('support');

      this.logger.log(`🔍 [AI ANALYSIS] Config retrieved: { hasApiKey: ${!!apiKey}, model: ${model}, provider: ${provider} }`);

      if (!apiKey) {
        this.logger.error('❌ [AI ANALYSIS] No API key found for support module');

        // Log error to database
        await this.appLoggerService.logError(
          LogContext.AI,
          'AI API key not configured for support module',
          new Error('Missing AI API key'),
          {
            module: 'support',
            provider,
            model,
            category,
            problemDescriptionPreview: problemDescription.substring(0, 100),
          },
        );

        throw new Error('AI API key not configured for support module');
      }

      // Step 1: Gather context from FAQ Learning System and Knowledge Base
      this.logger.log('📚 [AI ANALYSIS] Gathering context from FAQ and Knowledge Base...');

      let contextSnippets: string[] = [];

      try {
        // Search FAQ for relevant entries
        const faqResults = await this.faqSearchService.search({
          query: problemDescription,
          options: {
            limit: 5,
            includeFaqs: true,
            includeArticles: true,
          },
        });

        this.logger.log(`📚 [AI ANALYSIS] Found ${faqResults.results.length} relevant FAQ/KB entries`);

        // Extract context from search results
        contextSnippets = faqResults.results.map((result) => {
          return `[${result.type.toUpperCase()}] ${result.title}: ${result.snippet}`;
        });
      } catch (faqError) {
        this.logger.warn(`⚠️ [AI ANALYSIS] Failed to fetch FAQ context: ${faqError.message}`);
        // Continue without FAQ context
      }

      // Construct the enhanced analysis prompt with context
      const contextSection = contextSnippets.length > 0
        ? `\n\nRelevant Knowledge Base Context:\n${contextSnippets.join('\n')}\n`
        : '\n\nNo specific knowledge base context found for this issue.\n';

      const prompt = `You are an AI support assistant analyzing a customer support ticket. Use the provided knowledge base context to give accurate and helpful responses.

${contextSection}

Customer Problem:
${problemDescription}

Category: ${category}

Based on the customer's problem and the knowledge base context above, analyze the ticket and provide:

1. A concise summary of the issue (2-3 sentences in Turkish)
2. Suggested priority level based on urgency and impact
3. A helpful, specific suggestion or solution for the customer (in Turkish)

Respond ONLY with valid JSON in this exact format:
{
  "summary": "brief summary of the issue in Turkish",
  "priority": "low|medium|high|urgent",
  "suggestion": "specific, helpful suggestion or solution in Turkish based on knowledge base context"
}

IMPORTANT: Return ONLY the JSON object, no additional text, no markdown formatting, no code blocks.`;

      this.logger.log('🤖 [AI ANALYSIS] Sending request to AI service...');
      this.logger.debug(`📝 [AI ANALYSIS] Prompt length: ${prompt.length} chars, Context snippets: ${contextSnippets.length}`);

      // Call AI service with the support module's provider/model
      const result = await this.aiService.generateCompletion(apiKey, prompt, {
        model,
        temperature: 0.3, // Lower temperature for more deterministic JSON output
        maxTokens: 2000, // Increased to prevent truncation (Gemini sometimes cuts off)
      });

      const duration = Date.now() - startTime;

      this.logger.log(`✅ [AI ANALYSIS] Received AI response in ${duration}ms`);
      this.logger.debug(`📄 [AI ANALYSIS] Raw response length: ${result.content.length} chars`);

      // Log successful AI call
      await this.appLoggerService.logAiCall(
        provider,
        model,
        duration,
        true,
      );

      // Parse the AI response with improved error handling
      try {
        // Log the raw response for debugging
        this.logger.debug(`🔍 [AI ANALYSIS] Raw AI response: ${result.content.substring(0, 500)}...`);

        // Remove markdown code blocks if present
        let cleanedResponse = result.content.trim();

        // Remove ```json prefix
        if (cleanedResponse.startsWith('```json')) {
          cleanedResponse = cleanedResponse.slice(7);
        }
        // Remove ``` prefix
        if (cleanedResponse.startsWith('```')) {
          cleanedResponse = cleanedResponse.slice(3);
        }
        // Remove ``` suffix
        if (cleanedResponse.endsWith('```')) {
          cleanedResponse = cleanedResponse.slice(0, -3);
        }

        cleanedResponse = cleanedResponse.trim();

        // Validate the cleaned response is not empty
        if (!cleanedResponse || cleanedResponse.length < 10) {
          throw new Error('AI returned empty or incomplete response');
        }

        // Check if response looks truncated (common with Gemini)
        if (!cleanedResponse.endsWith('}')) {
          this.logger.warn(`⚠️ [AI ANALYSIS] Response appears truncated, attempting to fix...`);
          // Try to close unclosed braces
          const openBraces = (cleanedResponse.match(/{/g) || []).length;
          const closeBraces = (cleanedResponse.match(/}/g) || []).length;
          if (openBraces > closeBraces) {
            cleanedResponse += '}';
            this.logger.debug(`🔧 [AI ANALYSIS] Added missing closing brace`);
          }
          // Try to close unclosed quotes
          if ((cleanedResponse.match(/"/g) || []).length % 2 !== 0) {
            cleanedResponse += '"';
            this.logger.debug(`🔧 [AI ANALYSIS] Added missing closing quote`);
          }
        }

        this.logger.debug(`🔍 [AI ANALYSIS] Cleaned response: ${cleanedResponse.substring(0, 300)}...`);

        // Parse JSON
        const analysis = JSON.parse(cleanedResponse);

        // Validate required fields
        if (!analysis.summary || !analysis.priority || !analysis.suggestion) {
          throw new Error('AI response missing required fields');
        }

        this.logger.log('✅ [AI ANALYSIS] Successfully parsed AI response');

        return {
          summary: analysis.summary || 'AI analizi tamamlandı.',
          priority: analysis.priority || 'medium',
          suggestion: analysis.suggestion || 'Destek ekibimiz en kısa sürede size yardımcı olacaktır.',
        };
      } catch (parseError) {
        this.logger.error(`❌ [AI ANALYSIS] Failed to parse AI response: ${parseError.message}`);
        this.logger.error(`📄 [AI ANALYSIS] Problematic response: ${result.content}`);

        // Log parse error to database
        await this.appLoggerService.logError(
          LogContext.AI,
          `Failed to parse AI response: ${parseError.message}`,
          parseError,
          {
            provider,
            model,
            rawResponse: result.content.substring(0, 1000),
            category,
            problemDescriptionPreview: problemDescription.substring(0, 100),
          },
        );

        // Return a safe fallback response
        return {
          summary: 'Destek talebiniz alındı. Ekibimiz inceleyecektir.',
          priority: 'medium',
          suggestion: 'Destek ekibimiz en kısa sürede size yardımcı olacaktır.',
        };
      }
    } catch (error) {
      const duration = Date.now() - startTime;

      this.logger.error(`❌ [AI ANALYSIS] AI ticket analysis failed: ${error.message}`, error.stack);

      try {
        const provider = await this.settingsService.getAiProviderForModule('support');
        const model = await this.settingsService.getAiModelForModule('support');

        // Log detailed error to database
        await this.appLoggerService.logError(
          LogContext.AI,
          `AI ticket analysis failed: ${error.message}`,
          error,
          {
            provider,
            model,
            category,
            problemDescriptionPreview: problemDescription.substring(0, 100),
            duration,
          },
        );

        // Log failed AI call
        await this.appLoggerService.logAiCall(
          provider,
          model,
          duration,
          false,
          error.message,
        );
      } catch (loggingError) {
        this.logger.error(`Failed to log error: ${loggingError.message}`);
      }

      // Return fallback instead of throwing to prevent blocking ticket creation
      return {
        summary: 'Destek talebiniz alındı. Ekibimiz inceleyecektir.',
        priority: 'medium',
        suggestion: 'Destek ekibimiz en kısa sürede size yardımcı olacaktır.',
      };
    }
  }
}
