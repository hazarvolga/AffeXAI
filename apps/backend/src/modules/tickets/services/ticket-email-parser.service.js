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
exports.TicketEmailParserService = void 0;
const common_1 = require("@nestjs/common");
const ticket_priority_enum_1 = require("../enums/ticket-priority.enum");
const ticket_status_enum_1 = require("../enums/ticket-status.enum");
let TicketEmailParserService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TicketEmailParserService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketEmailParserService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ticketRepository;
        messageRepository;
        ticketsService;
        logger = new common_1.Logger(TicketEmailParserService.name);
        constructor(ticketRepository, messageRepository, ticketsService) {
            this.ticketRepository = ticketRepository;
            this.messageRepository = messageRepository;
            this.ticketsService = ticketsService;
        }
        /**
         * Parse and process inbound email
         */
        async processInboundEmail(email) {
            try {
                this.logger.log(`Processing inbound email from: ${email.from}`);
                // Find or get user ID from email - in real implementation would look up user by email
                // For now, using a placeholder that would need to be implemented
                const userId = 'system-email-user'; // TODO: Implement user lookup by email
                // Check if this is a reply to existing ticket
                const existingTicket = await this.findTicketByEmail(email);
                if (existingTicket) {
                    // Add message to existing ticket
                    return await this.addMessageToTicket(existingTicket, email);
                }
                else {
                    // Create new ticket
                    return await this.createTicketFromEmail(email, userId);
                }
            }
            catch (error) {
                this.logger.error(`Failed to process email: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Find ticket by email threading headers or subject
         */
        async findTicketByEmail(email) {
            // Method 1: Check In-Reply-To header
            if (email.inReplyTo) {
                const ticket = await this.findTicketByMessageId(email.inReplyTo);
                if (ticket)
                    return ticket;
            }
            // Method 2: Check References header
            if (email.references && email.references.length > 0) {
                for (const ref of email.references) {
                    const ticket = await this.findTicketByMessageId(ref);
                    if (ticket)
                        return ticket;
                }
            }
            // Method 3: Parse ticket ID from subject line
            const ticketId = this.extractTicketIdFromSubject(email.subject);
            if (ticketId) {
                const ticket = await this.ticketRepository.findOne({
                    where: { id: ticketId },
                    relations: ['customer', 'assignedAgent', 'category'],
                });
                if (ticket)
                    return ticket;
            }
            return null;
        }
        /**
         * Find ticket by message ID stored in metadata
         */
        async findTicketByMessageId(messageId) {
            const message = await this.messageRepository.findOne({
                where: { emailMessageId: messageId },
                relations: ['ticket'],
            });
            return message?.ticket || null;
        }
        /**
         * Extract ticket ID from subject line
         * Supports formats: [#TICKET-123], Ticket #123, Re: #123, etc.
         */
        extractTicketIdFromSubject(subject) {
            const patterns = [
                /#([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i, // UUID
                /\[#([^\]]+)\]/i, // [#ID]
                /ticket[:\s]+#?([^\s,]+)/i, // Ticket: #ID
                /#(\d+)/i, // #ID
            ];
            for (const pattern of patterns) {
                const match = subject.match(pattern);
                if (match && match[1]) {
                    return match[1];
                }
            }
            return null;
        }
        /**
         * Create new ticket from email
         */
        async createTicketFromEmail(email, userId) {
            this.logger.log(`Creating new ticket from email: ${email.subject}`);
            // Extract or determine customer (simplified - would need user lookup)
            const customerEmail = email.from;
            // Determine priority from subject/content
            const priority = this.detectPriority(email.subject, email.textBody);
            // Create ticket
            const ticket = await this.ticketsService.create(userId, {
                subject: this.cleanSubject(email.subject),
                description: this.extractDescription(email),
                priority,
                categoryId: null, // Would need to auto-categorize
                tags: this.extractTags(email.subject, email.textBody),
                customFields: {
                    source: 'email',
                    originalFrom: email.from,
                    originalSubject: email.subject,
                    receivedAt: email.receivedAt.toISOString(),
                },
            });
            // Store email message ID for threading
            await this.messageRepository.update({ ticketId: ticket.id }, { emailMessageId: email.messageId });
            this.logger.log(`Created ticket ${ticket.id} from email`);
            return ticket;
        }
        /**
         * Add message to existing ticket
         */
        async addMessageToTicket(ticket, email) {
            this.logger.log(`Adding message to ticket ${ticket.id}`);
            // Add message
            const message = this.messageRepository.create({
                ticketId: ticket.id,
                content: this.extractDescription(email),
                isInternal: false,
                authorId: ticket.userId, // Customer sent this
                emailMessageId: email.messageId,
            });
            await this.messageRepository.save(message);
            // Update ticket status if it was closed
            if (ticket.status === ticket_status_enum_1.TicketStatus.CLOSED) {
                ticket.status = ticket_status_enum_1.TicketStatus.OPEN;
                ticket.responseTimeHours = 0; // Reset metrics
                await this.ticketRepository.save(ticket);
            }
            this.logger.log(`Added message to ticket ${ticket.id}`);
            return ticket;
        }
        /**
         * Detect priority from email content
         */
        detectPriority(subject, body) {
            const urgentKeywords = [
                'urgent',
                'critical',
                'emergency',
                'asap',
                'immediately',
                'acil',
                'kritik',
                'acele',
            ];
            const highKeywords = [
                'important',
                'high priority',
                'önemli',
                'yüksek öncelik',
            ];
            const text = `${subject} ${body}`.toLowerCase();
            for (const keyword of urgentKeywords) {
                if (text.includes(keyword)) {
                    return ticket_priority_enum_1.TicketPriority.URGENT;
                }
            }
            for (const keyword of highKeywords) {
                if (text.includes(keyword)) {
                    return ticket_priority_enum_1.TicketPriority.HIGH;
                }
            }
            return ticket_priority_enum_1.TicketPriority.MEDIUM;
        }
        /**
         * Clean email subject (remove Re:, Fwd:, etc.)
         */
        cleanSubject(subject) {
            return subject
                .replace(/^(re|fwd|fw|ynt|ilet):\s*/gi, '')
                .replace(/\[#[^\]]+\]/gi, '')
                .trim();
        }
        /**
         * Extract description from email
         */
        extractDescription(email) {
            // Use HTML if available, otherwise text
            let content = email.htmlBody || email.textBody;
            // Remove email signatures
            content = this.removeEmailSignature(content);
            // Remove quoted replies
            content = this.removeQuotedReplies(content);
            return content.trim();
        }
        /**
         * Remove email signature
         */
        removeEmailSignature(content) {
            const signaturePatterns = [
                /--\s*$/m,
                /^--\s*\n/m,
                /\n--\s*\n/m,
                /Sent from my/i,
                /Best regards/i,
                /Saygılarımla/i,
            ];
            for (const pattern of signaturePatterns) {
                const match = content.match(pattern);
                if (match) {
                    content = content.substring(0, match.index);
                }
            }
            return content;
        }
        /**
         * Remove quoted replies (> lines)
         */
        removeQuotedReplies(content) {
            const lines = content.split('\n');
            const filteredLines = lines.filter((line) => !line.trim().startsWith('>'));
            return filteredLines.join('\n');
        }
        /**
         * Extract tags from subject/body
         */
        extractTags(subject, body) {
            const tags = [];
            const text = `${subject} ${body}`.toLowerCase();
            // Common support topics
            const tagPatterns = [
                { pattern: /billing|payment|invoice|fatura|ödeme/i, tag: 'billing' },
                { pattern: /bug|error|hata|sorun/i, tag: 'bug' },
                { pattern: /feature|request|özellik|istek/i, tag: 'feature-request' },
                { pattern: /question|soru/i, tag: 'question' },
                { pattern: /login|password|şifre|giriş/i, tag: 'authentication' },
            ];
            for (const { pattern, tag } of tagPatterns) {
                if (pattern.test(text)) {
                    tags.push(tag);
                }
            }
            return tags;
        }
        /**
         * Validate email format
         */
        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    };
    return TicketEmailParserService = _classThis;
})();
exports.TicketEmailParserService = TicketEmailParserService;
//# sourceMappingURL=ticket-email-parser.service.js.map