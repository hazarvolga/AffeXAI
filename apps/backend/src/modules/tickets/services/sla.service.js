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
exports.SlaService = void 0;
const common_1 = require("@nestjs/common");
const ticket_priority_enum_1 = require("../enums/ticket-priority.enum");
const ticket_status_enum_1 = require("../enums/ticket-status.enum");
/**
 * SLA Service
 * Handles all SLA-related calculations and tracking
 */
let SlaService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SlaService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SlaService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ticketRepository;
        businessHoursService;
        // Default SLA times in hours by priority
        DEFAULT_SLA_CONFIG = {
            [ticket_priority_enum_1.TicketPriority.URGENT]: {
                firstResponse: 1, // 1 hour
                resolution: 4, // 4 hours
            },
            [ticket_priority_enum_1.TicketPriority.HIGH]: {
                firstResponse: 4, // 4 hours
                resolution: 24, // 1 day
            },
            [ticket_priority_enum_1.TicketPriority.MEDIUM]: {
                firstResponse: 8, // 8 hours
                resolution: 72, // 3 days
            },
            [ticket_priority_enum_1.TicketPriority.LOW]: {
                firstResponse: 24, // 1 day
                resolution: 168, // 1 week
            },
        };
        constructor(ticketRepository, businessHoursService) {
            this.ticketRepository = ticketRepository;
            this.businessHoursService = businessHoursService;
        }
        /**
         * Calculate and set SLA due dates for a ticket based on priority
         */
        calculateSLADueDates(ticket) {
            const config = this.DEFAULT_SLA_CONFIG[ticket.priority];
            const createdAt = ticket.createdAt || new Date();
            return {
                slaFirstResponseDueAt: this.businessHoursService.calculateSLADueDate(createdAt, config.firstResponse, true),
                slaResolutionDueAt: this.businessHoursService.calculateSLADueDate(createdAt, config.resolution, true),
            };
        }
        /**
         * Check if SLA is breached for a ticket
         */
        checkSLABreach(ticket) {
            const now = new Date();
            // Check first response SLA
            if (!ticket.firstResponseAt && ticket.slaFirstResponseDueAt) {
                if (now > ticket.slaFirstResponseDueAt) {
                    return true;
                }
            }
            // Check resolution SLA
            if (!ticket.resolvedAt && ticket.slaResolutionDueAt) {
                if (now > ticket.slaResolutionDueAt) {
                    return true;
                }
            }
            return false;
        }
        /**
         * Calculate response time in hours
         */
        calculateResponseTime(ticket) {
            if (!ticket.firstResponseAt) {
                return 0;
            }
            const createdAt = ticket.createdAt || new Date();
            const diffMs = ticket.firstResponseAt.getTime() - createdAt.getTime();
            return Math.round(diffMs / (1000 * 60 * 60) * 10) / 10; // Round to 1 decimal
        }
        /**
         * Calculate resolution time in hours
         */
        calculateResolutionTime(ticket) {
            if (!ticket.resolvedAt) {
                return 0;
            }
            const createdAt = ticket.createdAt || new Date();
            const diffMs = ticket.resolvedAt.getTime() - createdAt.getTime();
            return Math.round(diffMs / (1000 * 60 * 60) * 10) / 10; // Round to 1 decimal
        }
        /**
         * Check if a date is within business hours
         */
        isWithinBusinessHours(date) {
            return this.businessHoursService.isBusinessHours(date);
        }
        /**
         * Get SLA status for a ticket
         */
        getSLAStatus(ticket) {
            const now = new Date();
            const firstResponse = {
                isDue: !!ticket.slaFirstResponseDueAt && !ticket.firstResponseAt,
                isBreached: !!ticket.slaFirstResponseDueAt &&
                    !ticket.firstResponseAt &&
                    now > ticket.slaFirstResponseDueAt,
                remainingHours: ticket.slaFirstResponseDueAt
                    ? Math.max(0, Math.round((ticket.slaFirstResponseDueAt.getTime() - now.getTime()) /
                        (1000 * 60 * 60)))
                    : 0,
            };
            const resolution = {
                isDue: !!ticket.slaResolutionDueAt && !ticket.resolvedAt,
                isBreached: !!ticket.slaResolutionDueAt &&
                    !ticket.resolvedAt &&
                    now > ticket.slaResolutionDueAt,
                remainingHours: ticket.slaResolutionDueAt
                    ? Math.max(0, Math.round((ticket.slaResolutionDueAt.getTime() - now.getTime()) /
                        (1000 * 60 * 60)))
                    : 0,
            };
            return { firstResponse, resolution };
        }
        /**
         * Update ticket with SLA calculations
         */
        async updateTicketSLA(ticketId) {
            const ticket = await this.ticketRepository.findOne({
                where: { id: ticketId },
            });
            if (!ticket) {
                throw new Error(`Ticket ${ticketId} not found`);
            }
            // Calculate SLA due dates if not set
            if (!ticket.slaFirstResponseDueAt || !ticket.slaResolutionDueAt) {
                const slaDates = this.calculateSLADueDates(ticket);
                ticket.slaFirstResponseDueAt = slaDates.slaFirstResponseDueAt;
                ticket.slaResolutionDueAt = slaDates.slaResolutionDueAt;
            }
            // Update SLA breach status
            ticket.isSLABreached = this.checkSLABreach(ticket);
            // Update response and resolution times
            ticket.responseTimeHours = this.calculateResponseTime(ticket);
            ticket.resolutionTimeHours = this.calculateResolutionTime(ticket);
            return await this.ticketRepository.save(ticket);
        }
        /**
         * Get tickets approaching SLA breach (within threshold hours)
         */
        async getTicketsApproachingSLABreach(thresholdHours = 2) {
            const tickets = await this.ticketRepository.find({
                where: [
                    { status: ticket_status_enum_1.TicketStatus.NEW },
                    { status: ticket_status_enum_1.TicketStatus.OPEN },
                    { status: ticket_status_enum_1.TicketStatus.PENDING_CUSTOMER },
                ],
            });
            const now = new Date();
            const thresholdMs = thresholdHours * 60 * 60 * 1000;
            return tickets.filter((ticket) => {
                // Check first response SLA
                if (!ticket.firstResponseAt && ticket.slaFirstResponseDueAt) {
                    const timeToBreachMs = ticket.slaFirstResponseDueAt.getTime() - now.getTime();
                    if (timeToBreachMs > 0 && timeToBreachMs <= thresholdMs) {
                        return true;
                    }
                }
                // Check resolution SLA
                if (!ticket.resolvedAt && ticket.slaResolutionDueAt) {
                    const timeToBreachMs = ticket.slaResolutionDueAt.getTime() - now.getTime();
                    if (timeToBreachMs > 0 && timeToBreachMs <= thresholdMs) {
                        return true;
                    }
                }
                return false;
            });
        }
    };
    return SlaService = _classThis;
})();
exports.SlaService = SlaService;
//# sourceMappingURL=sla.service.js.map