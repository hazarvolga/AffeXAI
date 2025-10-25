"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketAutomationService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const ticket_status_enum_1 = require("../enums/ticket-status.enum");
/**
 * Ticket Automation Service
 * Handles automatic ticket processing and status transitions
 */
let TicketAutomationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _checkForAutoClose_decorators;
    let _checkForPendingThirdPartyTransition_decorators;
    let _checkForEscalation_decorators;
    var TicketAutomationService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _checkForAutoClose_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR)];
            _checkForPendingThirdPartyTransition_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_6_HOURS)];
            _checkForEscalation_decorators = [(0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES)];
            __esDecorate(this, null, _checkForAutoClose_decorators, { kind: "method", name: "checkForAutoClose", static: false, private: false, access: { has: obj => "checkForAutoClose" in obj, get: obj => obj.checkForAutoClose }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _checkForPendingThirdPartyTransition_decorators, { kind: "method", name: "checkForPendingThirdPartyTransition", static: false, private: false, access: { has: obj => "checkForPendingThirdPartyTransition" in obj, get: obj => obj.checkForPendingThirdPartyTransition }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _checkForEscalation_decorators, { kind: "method", name: "checkForEscalation", static: false, private: false, access: { has: obj => "checkForEscalation" in obj, get: obj => obj.checkForEscalation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketAutomationService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ticketsService = __runInitializers(this, _instanceExtraInitializers);
        escalationRulesService;
        ticketRepository;
        messageRepository;
        logger = new common_1.Logger(TicketAutomationService.name);
        constructor(ticketsService, escalationRulesService, ticketRepository, messageRepository) {
            this.ticketsService = ticketsService;
            this.escalationRulesService = escalationRulesService;
            this.ticketRepository = ticketRepository;
            this.messageRepository = messageRepository;
        }
        /**
         * Check for tickets that need auto-closing (resolved for 72+ hours)
         */
        async checkForAutoClose() {
            this.logger.log('Checking for tickets to auto-close...');
            try {
                // Find resolved tickets that haven't had activity for 72 hours
                const resolvedTickets = await this.ticketsService.findAll({
                    status: ticket_status_enum_1.TicketStatus.RESOLVED,
                });
                const now = new Date();
                let closedCount = 0;
                for (const ticket of resolvedTickets) {
                    // Calculate hours since last update
                    const hoursSinceUpdate = this.getHoursSinceDate(ticket.updatedAt, now);
                    if (hoursSinceUpdate >= 72) {
                        await this.ticketsService.updateStatus(ticket.id, ticket_status_enum_1.TicketStatus.CLOSED, 'system');
                        closedCount++;
                        this.logger.log(`Auto-closed ticket ${ticket.id} after ${hoursSinceUpdate} hours of inactivity`);
                    }
                }
                if (closedCount > 0) {
                    this.logger.log(`Auto-closed ${closedCount} tickets`);
                }
            }
            catch (error) {
                this.logger.error('Error during auto-close check:', error);
            }
        }
        /**
         * Check for tickets that need auto-transition from pending third party
         */
        async checkForPendingThirdPartyTransition() {
            this.logger.log('Checking for tickets in pending third party status...');
            try {
                // Find tickets that have been pending third party for more than 72 hours
                const pendingThirdPartyTickets = await this.ticketsService.findAll({
                    status: ticket_status_enum_1.TicketStatus.PENDING_THIRD_PARTY,
                });
                const now = new Date();
                let transitionedCount = 0;
                for (const ticket of pendingThirdPartyTickets) {
                    // Calculate hours since ticket was last updated
                    const hoursSinceUpdate = this.getHoursSinceDate(ticket.updatedAt, now);
                    // If pending third party for more than 72 hours, transition back to open
                    if (hoursSinceUpdate >= 72) {
                        await this.ticketsService.updateStatus(ticket.id, ticket_status_enum_1.TicketStatus.OPEN, 'system');
                        transitionedCount++;
                        this.logger.log(`Auto-transitioned ticket ${ticket.id} from pending third party to open after ${hoursSinceUpdate} hours`);
                    }
                }
                if (transitionedCount > 0) {
                    this.logger.log(`Auto-transitioned ${transitionedCount} tickets from pending third party to open`);
                }
            }
            catch (error) {
                this.logger.error('Error during pending third party check:', error);
            }
        }
        /**
         * Check for tickets that need escalation
         */
        async checkForEscalation() {
            this.logger.log('Checking for tickets requiring escalation...');
            try {
                // Get all active escalation rules
                const rules = await this.escalationRulesService.getActiveRules();
                // Find all tickets that could potentially need escalation
                const tickets = await this.ticketsService.findAll({});
                const now = new Date();
                let escalatedCount = 0;
                for (const ticket of tickets) {
                    const hoursSinceCreation = this.getHoursSinceDate(ticket.createdAt, now);
                    const hoursSinceUpdate = this.getHoursSinceDate(ticket.updatedAt, now);
                    // Check each rule to see if it should trigger for this ticket
                    for (const rule of rules) {
                        // Skip if rule has already been applied max times
                        if (this.escalationRulesService.hasReachedMaxApplications(rule, ticket)) {
                            continue;
                        }
                        // Check if rule should trigger
                        if (rule.shouldTrigger(ticket, {
                            hoursSinceCreation,
                            hoursSinceUpdate,
                            escalationLevel: ticket.escalationLevel || 0
                        })) {
                            // Apply escalation actions
                            await this.applyEscalationActions(ticket, rule);
                            escalatedCount++;
                            this.logger.log(`Escalated ticket ${ticket.id} based on rule: ${rule.name}`);
                            break; // Only apply one rule per ticket per check
                        }
                    }
                }
                if (escalatedCount > 0) {
                    this.logger.log(`Escalated ${escalatedCount} tickets`);
                }
            }
            catch (error) {
                this.logger.error('Error during escalation check:', error);
            }
        }
        /**
         * Calculate hours between two dates
         * @private
         */
        getHoursSinceDate(date, now) {
            const diffMs = now.getTime() - date.getTime();
            return Math.floor(diffMs / (1000 * 60 * 60));
        }
        /**
         * Apply escalation actions to a ticket based on rule
         * @private
         */
        async applyEscalationActions(ticket, rule) {
            // Update ticket with escalation information
            const escalationEntry = {
                level: ticket.escalationLevel + 1,
                escalatedAt: new Date(),
                escalatedBy: 'system',
                reason: `Escalated by rule: ${rule.name}`,
                ruleId: rule.id
            };
            // Initialize escalation history if not exists
            if (!ticket.escalationHistory) {
                ticket.escalationHistory = [];
            }
            // Add to escalation history
            ticket.escalationHistory.push(escalationEntry);
            // Update escalation level
            ticket.escalationLevel = ticket.escalationLevel + 1;
            ticket.lastEscalatedAt = new Date();
            // Apply rule actions
            if (rule.actions.assignToId) {
                ticket.assignedToId = rule.actions.assignToId;
                escalationEntry.assignedToId = rule.actions.assignToId;
            }
            if (rule.actions.setPriority) {
                ticket.priority = rule.actions.setPriority;
            }
            if (rule.actions.addNote) {
                // Create escalation note
                const note = this.messageRepository.create({
                    ticketId: ticket.id,
                    authorId: 'system',
                    content: rule.actions.addNote,
                    isInternal: true,
                });
                await this.messageRepository.save(note);
            }
            // Save updated ticket
            await this.ticketRepository.save(ticket);
            // Notify supervisors if requested
            if (rule.actions.notifySupervisors) {
                this.logger.log(`Notification sent to supervisors for ticket ${ticket.id}`);
                // In a real implementation, this would integrate with notification system
            }
            this.logger.log(`Applied escalation rule '${rule.name}' to ticket ${ticket.id}`);
        }
        /**
         * Escalate ticket by notifying supervisors
         * @private
         */
        async escalateTicket(ticket) {
            // In a real implementation, this would:
            // 1. Send notification to supervisors
            // 2. Re-assign to higher tier support
            // 3. Add escalation note to ticket
            // 4. Update ticket priority if needed
            this.logger.log(`Ticket ${ticket.id} escalated - notification sent to supervisors`);
            // For now, we'll just log the escalation
            // A real implementation would integrate with notification system
        }
    };
    return TicketAutomationService = _classThis;
})();
exports.TicketAutomationService = TicketAutomationService;
//# sourceMappingURL=ticket-automation.service.js.map