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
exports.TicketMacroService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let TicketMacroService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TicketMacroService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketMacroService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        macroRepository;
        ticketRepository;
        messageRepository;
        ticketsService;
        logger = new common_1.Logger(TicketMacroService.name);
        constructor(macroRepository, ticketRepository, messageRepository, ticketsService) {
            this.macroRepository = macroRepository;
            this.ticketRepository = ticketRepository;
            this.messageRepository = messageRepository;
            this.ticketsService = ticketsService;
        }
        /**
         * Create a new macro
         */
        async createMacro(createdById, dto) {
            const macro = this.macroRepository.create({
                ...dto,
                createdById,
            });
            await this.macroRepository.save(macro);
            this.logger.log(`Created macro: ${macro.id} - ${macro.name}`);
            return macro;
        }
        /**
         * Update a macro
         */
        async updateMacro(id, updates) {
            const macro = await this.macroRepository.findOne({ where: { id } });
            if (!macro) {
                throw new common_1.NotFoundException(`Macro ${id} not found`);
            }
            Object.assign(macro, updates);
            await this.macroRepository.save(macro);
            this.logger.log(`Updated macro: ${macro.id}`);
            return macro;
        }
        /**
         * Delete a macro
         */
        async deleteMacro(id) {
            const result = await this.macroRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Macro ${id} not found`);
            }
            this.logger.log(`Deleted macro: ${id}`);
        }
        /**
         * Get macro by ID
         */
        async getMacro(id) {
            const macro = await this.macroRepository.findOne({
                where: { id },
                relations: ['createdBy'],
            });
            if (!macro) {
                throw new common_1.NotFoundException(`Macro ${id} not found`);
            }
            return macro;
        }
        /**
         * Get all macros
         */
        async getAllMacros(userId) {
            const query = this.macroRepository
                .createQueryBuilder('macro')
                .leftJoinAndSelect('macro.createdBy', 'createdBy')
                .where('macro.isActive = :isActive', { isActive: true });
            if (userId) {
                // Show public macros + user's own macros
                query.andWhere('(macro.isPublic = :isPublic OR macro.createdById = :userId)', {
                    isPublic: true,
                    userId,
                });
            }
            else {
                // Show only public macros
                query.andWhere('macro.isPublic = :isPublic', { isPublic: true });
            }
            query.orderBy('macro.usageCount', 'DESC');
            return await query.getMany();
        }
        /**
         * Execute macro on tickets
         */
        async executeMacro(macroId, ticketIds, userId) {
            const macro = await this.getMacro(macroId);
            const tickets = await this.ticketRepository.find({
                where: { id: (0, typeorm_1.In)(ticketIds) },
                relations: ['customer', 'assignedAgent'],
            });
            if (tickets.length === 0) {
                throw new common_1.NotFoundException('No tickets found');
            }
            const errors = [];
            let successCount = 0;
            for (const ticket of tickets) {
                try {
                    await this.applyMacroActions(ticket, macro.actions, userId);
                    successCount++;
                }
                catch (error) {
                    errors.push(`Ticket ${ticket.id}: ${error.message}`);
                    this.logger.error(`Failed to apply macro to ticket ${ticket.id}: ${error.message}`);
                }
            }
            // Update macro usage count
            macro.usageCount++;
            await this.macroRepository.save(macro);
            this.logger.log(`Executed macro ${macroId} on ${successCount}/${tickets.length} tickets`);
            return {
                success: errors.length === 0,
                ticketsAffected: successCount,
                errors,
            };
        }
        /**
         * Apply macro actions to a ticket
         */
        async applyMacroActions(ticket, actions, userId) {
            for (const action of actions) {
                switch (action.type) {
                    case 'update_status':
                        await this.ticketsService.updateStatus(ticket.id, action.value, userId);
                        break;
                    case 'assign':
                        await this.ticketsService.assignTo(ticket.id, action.value, userId);
                        break;
                    case 'add_tag':
                        if (!ticket.tags)
                            ticket.tags = [];
                        if (!ticket.tags.includes(action.value)) {
                            ticket.tags.push(action.value);
                            await this.ticketRepository.save(ticket);
                        }
                        break;
                    case 'remove_tag':
                        if (ticket.tags) {
                            ticket.tags = ticket.tags.filter(t => t !== action.value);
                            await this.ticketRepository.save(ticket);
                        }
                        break;
                    case 'set_priority':
                        ticket.priority = action.value;
                        await this.ticketRepository.save(ticket);
                        break;
                    case 'add_note':
                        await this.ticketsService.addMessage(ticket.id, userId, {
                            content: action.value,
                            isInternal: true,
                        });
                        break;
                    case 'send_email':
                        // TODO: Implement email sending
                        this.logger.warn('Email action not yet implemented');
                        break;
                    default:
                        this.logger.warn(`Unknown macro action type: ${action.type}`);
                }
            }
        }
        /**
         * Get popular macros
         */
        async getPopularMacros(limit = 10) {
            return await this.macroRepository.find({
                where: { isActive: true, isPublic: true },
                relations: ['createdBy'],
                order: { usageCount: 'DESC' },
                take: limit,
            });
        }
        /**
         * Get macro statistics
         */
        async getStatistics() {
            const [total, active, publicMacros] = await Promise.all([
                this.macroRepository.count(),
                this.macroRepository.count({ where: { isActive: true } }),
                this.macroRepository.count({ where: { isPublic: true } }),
            ]);
            const allMacros = await this.macroRepository.find();
            const totalUsage = allMacros.reduce((sum, m) => sum + m.usageCount, 0);
            return {
                total,
                active,
                public: publicMacros,
                totalUsage,
            };
        }
    };
    return TicketMacroService = _classThis;
})();
exports.TicketMacroService = TicketMacroService;
//# sourceMappingURL=ticket-macro.service.js.map