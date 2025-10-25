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
exports.TicketEmailService = void 0;
const common_1 = require("@nestjs/common");
const mail_service_interface_1 = require("../../mail/interfaces/mail-service.interface");
/**
 * Ticket Email Service
 * Handles all email notifications for ticket-related events
 */
let TicketEmailService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TicketEmailService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketEmailService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        mailService;
        logger = new common_1.Logger(TicketEmailService.name);
        baseUrl;
        constructor(mailService) {
            this.mailService = mailService;
            this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
        }
        /**
         * Send email when a new ticket is created
         */
        async sendTicketCreatedEmail(ticket, customer) {
            try {
                const ticketUrl = `${this.baseUrl}/portal/support/${ticket.id}`;
                await this.mailService.sendMail({
                    to: { email: customer.email, name: `${customer.firstName} ${customer.lastName}` },
                    subject: `Ticket Created: ${ticket.subject}`,
                    template: 'ticket-created',
                    channel: mail_service_interface_1.MailChannel.TRANSACTIONAL,
                    context: {
                        customerName: `${customer.firstName} ${customer.lastName}` || customer.email,
                        ticketId: ticket.id,
                        ticketSubject: ticket.subject,
                        ticketDescription: ticket.description,
                        ticketPriority: ticket.priority,
                        ticketStatus: ticket.status,
                        ticketUrl,
                        supportEmail: process.env.SUPPORT_EMAIL || 'support@example.com',
                    },
                });
                this.logger.log(`Ticket created email sent to ${customer.email}`);
            }
            catch (error) {
                this.logger.error(`Failed to send ticket created email: ${error.message}`, error.stack);
            }
        }
        /**
         * Send email when a ticket is assigned to an agent
         */
        async sendTicketAssignedEmail(ticket, assignedTo, assignedBy) {
            try {
                const ticketUrl = `${this.baseUrl}/admin/support/${ticket.id}`;
                await this.mailService.sendMail({
                    to: { email: assignedTo.email, name: `${assignedTo.firstName} ${assignedTo.lastName}` },
                    subject: `Ticket Assigned: ${ticket.subject}`,
                    template: 'ticket-assigned',
                    channel: mail_service_interface_1.MailChannel.TRANSACTIONAL,
                    context: {
                        agentName: `${assignedTo.firstName} ${assignedTo.lastName}` || assignedTo.email,
                        ticketId: ticket.id,
                        ticketSubject: ticket.subject,
                        ticketPriority: ticket.priority,
                        ticketStatus: ticket.status,
                        assignedByName: `${assignedBy.firstName} ${assignedBy.lastName}` || assignedBy.email,
                        ticketUrl,
                    },
                });
                this.logger.log(`Ticket assigned email sent to ${assignedTo.email}`);
            }
            catch (error) {
                this.logger.error(`Failed to send ticket assigned email: ${error.message}`, error.stack);
            }
        }
        /**
         * Send email when a new message is added to a ticket
         */
        async sendNewMessageEmail(ticket, message, recipient, isCustomerMessage) {
            try {
                const ticketUrl = isCustomerMessage
                    ? `${this.baseUrl}/admin/support/${ticket.id}`
                    : `${this.baseUrl}/portal/support/${ticket.id}`;
                const subject = isCustomerMessage
                    ? `New Customer Message: ${ticket.subject}`
                    : `New Response: ${ticket.subject}`;
                await this.mailService.sendMail({
                    to: { email: recipient.email, name: `${recipient.firstName} ${recipient.lastName}` },
                    subject,
                    template: 'ticket-new-message',
                    channel: mail_service_interface_1.MailChannel.TRANSACTIONAL,
                    context: {
                        recipientName: `${recipient.firstName} ${recipient.lastName}` || recipient.email,
                        ticketId: ticket.id,
                        ticketSubject: ticket.subject,
                        messageContent: message.content,
                        messageAuthor: message.author ? `${message.author.firstName} ${message.author.lastName}` : 'Support Team',
                        isCustomerMessage,
                        ticketUrl,
                    },
                });
                this.logger.log(`New message email sent to ${recipient.email}`);
            }
            catch (error) {
                this.logger.error(`Failed to send new message email: ${error.message}`, error.stack);
            }
        }
        /**
         * Send email when a ticket is resolved (with CSAT survey)
         */
        async sendTicketResolved(ticket, surveyToken) {
            try {
                const customer = ticket.user; // ticket.user is the creator (customer)
                const ticketUrl = `${this.baseUrl}/portal/support/${ticket.id}`;
                const surveyUrl = surveyToken
                    ? `${this.baseUrl}/survey/${surveyToken}`
                    : null;
                await this.mailService.sendMail({
                    to: { email: customer.email, name: `${customer.firstName} ${customer.lastName}` },
                    subject: `Ticket Resolved: ${ticket.subject}`,
                    template: 'csat-survey',
                    channel: mail_service_interface_1.MailChannel.TRANSACTIONAL,
                    context: {
                        customerName: `${customer.firstName} ${customer.lastName}` || customer.email,
                        ticketTitle: ticket.subject,
                        ticketId: ticket.id,
                        surveyUrl,
                        agentName: ticket.assignedTo ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}` : 'Destek Ekibi',
                        siteSettings: {
                            siteName: process.env.SITE_NAME || 'Aluplan',
                            siteUrl: this.baseUrl,
                            supportEmail: process.env.SUPPORT_EMAIL || 'support@example.com',
                        },
                    },
                });
                this.logger.log(`Ticket resolved email with CSAT survey sent to ${customer.email}`);
            }
            catch (error) {
                this.logger.error(`Failed to send ticket resolved email: ${error.message}`, error.stack);
            }
        }
        /**
         * DEPRECATED: Use sendTicketResolved instead
         * Send email when a ticket is resolved
         */
        async sendTicketResolvedEmail(ticket, customer, resolvedBy) {
            try {
                const ticketUrl = `${this.baseUrl}/portal/support/${ticket.id}`;
                const feedbackUrl = `${this.baseUrl}/portal/support/${ticket.id}/feedback`;
                await this.mailService.sendMail({
                    to: { email: customer.email, name: `${customer.firstName} ${customer.lastName}` },
                    subject: `Ticket Resolved: ${ticket.subject}`,
                    template: 'ticket-resolved',
                    channel: mail_service_interface_1.MailChannel.TRANSACTIONAL,
                    context: {
                        customerName: `${customer.firstName} ${customer.lastName}` || customer.email,
                        ticketId: ticket.id,
                        ticketSubject: ticket.subject,
                        resolvedByName: `${resolvedBy.firstName} ${resolvedBy.lastName}` || 'Support Team',
                        resolutionTime: ticket.resolutionTimeHours,
                        ticketUrl,
                        feedbackUrl,
                    },
                });
                this.logger.log(`Ticket resolved email sent to ${customer.email}`);
            }
            catch (error) {
                this.logger.error(`Failed to send ticket resolved email: ${error.message}`, error.stack);
            }
        }
        /**
         * Send SLA breach alert to support team
         */
        async sendSLABreachAlert(ticket, breachType) {
            try {
                const supportEmail = process.env.SUPPORT_TEAM_EMAIL || 'support@example.com';
                const ticketUrl = `${this.baseUrl}/admin/support/${ticket.id}`;
                await this.mailService.sendMail({
                    to: { email: supportEmail, name: 'Support Team' },
                    subject: `⚠️ SLA Breach Alert: ${ticket.subject}`,
                    template: 'sla-breach-alert',
                    channel: mail_service_interface_1.MailChannel.TRANSACTIONAL,
                    context: {
                        ticketId: ticket.id,
                        ticketSubject: ticket.subject,
                        ticketPriority: ticket.priority,
                        breachType,
                        ticketUrl,
                        assignedTo: ticket.assignedTo ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}` : 'Unassigned',
                    },
                });
                this.logger.log(`SLA breach alert sent for ticket ${ticket.id}`);
            }
            catch (error) {
                this.logger.error(`Failed to send SLA breach alert: ${error.message}`, error.stack);
            }
        }
        /**
         * Send SLA approaching alert (proactive notification)
         */
        async sendSLAApproachingAlert(ticket, remainingHours) {
            try {
                if (!ticket.assignedTo) {
                    this.logger.warn(`Ticket ${ticket.id} has no assigned agent for SLA alert`);
                    return;
                }
                const ticketUrl = `${this.baseUrl}/admin/support/${ticket.id}`;
                await this.mailService.sendMail({
                    to: { email: ticket.assignedTo.email, name: `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}` },
                    subject: `⏰ SLA Alert: ${ticket.subject} - ${remainingHours}h remaining`,
                    template: 'sla-approaching-alert',
                    channel: mail_service_interface_1.MailChannel.TRANSACTIONAL,
                    context: {
                        agentName: `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}` || ticket.assignedTo.email,
                        ticketId: ticket.id,
                        ticketSubject: ticket.subject,
                        ticketPriority: ticket.priority,
                        remainingHours,
                        ticketUrl,
                    },
                });
                this.logger.log(`SLA approaching alert sent to ${ticket.assignedTo.email}`);
            }
            catch (error) {
                this.logger.error(`Failed to send SLA approaching alert: ${error.message}`, error.stack);
            }
        }
        /**
         * Send email when ticket is escalated
         */
        async sendTicketEscalatedEmail(ticket, escalatedTo, escalationLevel, reason) {
            try {
                const ticketUrl = `${this.baseUrl}/admin/support/${ticket.id}`;
                await this.mailService.sendMail({
                    to: { email: escalatedTo.email, name: `${escalatedTo.firstName} ${escalatedTo.lastName}` },
                    subject: `🚨 Escalated Ticket (Level ${escalationLevel}): ${ticket.subject}`,
                    template: 'ticket-escalated',
                    channel: mail_service_interface_1.MailChannel.TRANSACTIONAL,
                    context: {
                        agentName: `${escalatedTo.firstName} ${escalatedTo.lastName}` || escalatedTo.email,
                        ticketId: ticket.id,
                        ticketSubject: ticket.subject,
                        ticketPriority: ticket.priority,
                        escalationLevel,
                        reason,
                        ticketUrl,
                    },
                });
                this.logger.log(`Ticket escalation email sent to ${escalatedTo.email}`);
            }
            catch (error) {
                this.logger.error(`Failed to send ticket escalation email: ${error.message}`, error.stack);
            }
        }
    };
    return TicketEmailService = _classThis;
})();
exports.TicketEmailService = TicketEmailService;
//# sourceMappingURL=ticket-email.service.js.map