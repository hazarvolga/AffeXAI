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
exports.TicketAssignmentRulesService = void 0;
const common_1 = require("@nestjs/common");
/**
 * Ticket Assignment Rules Service
 *
 * Manages ticket assignment rules and executes automatic assignments
 */
let TicketAssignmentRulesService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TicketAssignmentRulesService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketAssignmentRulesService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ruleRepository;
        logger = new common_1.Logger(TicketAssignmentRulesService.name);
        constructor(ruleRepository) {
            this.ruleRepository = ruleRepository;
        }
        /**
         * Get all active assignment rules ordered by priority
         */
        async getActiveRules() {
            return this.ruleRepository.find({
                where: { isActive: true },
                order: { priority: 'DESC' },
            });
        }
        /**
         * Get assignment rule by ID
         */
        async findOne(id) {
            const rule = await this.ruleRepository.findOne({ where: { id } });
            if (!rule) {
                throw new Error(`Ticket assignment rule not found: ${id}`);
            }
            return rule;
        }
        /**
         * Create new assignment rule
         */
        async create(data) {
            const rule = this.ruleRepository.create(data);
            return this.ruleRepository.save(rule);
        }
        /**
         * Update assignment rule
         */
        async update(id, data) {
            await this.ruleRepository.update(id, data);
            const rule = await this.ruleRepository.findOne({ where: { id } });
            if (!rule) {
                throw new Error(`Ticket assignment rule not found: ${id}`);
            }
            return rule;
        }
        /**
         * Delete assignment rule
         */
        async delete(id) {
            await this.ruleRepository.delete(id);
        }
        /**
         * Toggle rule active status
         */
        async toggle(id) {
            const rule = await this.ruleRepository.findOne({ where: { id } });
            if (!rule) {
                throw new Error(`Rule not found: ${id}`);
            }
            rule.isActive = !rule.isActive;
            return this.ruleRepository.save(rule);
        }
        /**
         * Automatically assign ticket based on rules
         * Returns the assigned user ID or null if no rule matched
         */
        async autoAssignTicket(ticket) {
            // Get all active rules ordered by priority
            const rules = await this.getActiveRules();
            // Check each rule in priority order
            for (const rule of rules) {
                // Skip if ticket is already assigned and rule is configured to skip
                if (ticket.assignedToId && rule.skipIfAssigned) {
                    continue;
                }
                // Check if rule should trigger for this ticket
                if (rule.shouldTrigger(ticket)) {
                    this.logger.log(`Auto-assigning ticket ${ticket.id} to user ${rule.assignToId} based on rule: ${rule.name}`, { ruleId: rule.id, ticketId: ticket.id });
                    return rule.assignToId;
                }
            }
            // No matching rule found
            return null;
        }
        /**
         * Get all assignment rules
         */
        async findAll() {
            return this.ruleRepository.find({
                order: { createdAt: 'DESC' },
            });
        }
    };
    return TicketAssignmentRulesService = _classThis;
})();
exports.TicketAssignmentRulesService = TicketAssignmentRulesService;
//# sourceMappingURL=ticket-assignment-rules.service.js.map