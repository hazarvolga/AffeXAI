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
exports.TicketAnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const ticket_status_enum_1 = require("../enums/ticket-status.enum");
/**
 * Ticket Analytics Service
 * Provides comprehensive analytics and reporting for support tickets
 */
let TicketAnalyticsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TicketAnalyticsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketAnalyticsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ticketRepository;
        messageRepository;
        logger = new common_1.Logger(TicketAnalyticsService.name);
        constructor(ticketRepository, messageRepository) {
            this.ticketRepository = ticketRepository;
            this.messageRepository = messageRepository;
        }
        /**
         * Get overall ticket statistics
         */
        async getOverallStats() {
            const tickets = await this.ticketRepository.find();
            const total = tickets.length;
            const byStatus = tickets.reduce((acc, ticket) => {
                acc[ticket.status] = (acc[ticket.status] || 0) + 1;
                return acc;
            }, {});
            const byPriority = tickets.reduce((acc, ticket) => {
                acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
                return acc;
            }, {});
            const respondedTickets = tickets.filter(t => t.responseTimeHours > 0);
            const avgResponseTime = respondedTickets.length > 0
                ? respondedTickets.reduce((sum, t) => sum + t.responseTimeHours, 0) / respondedTickets.length
                : 0;
            const resolvedTickets = tickets.filter(t => t.resolutionTimeHours > 0);
            const avgResolutionTime = resolvedTickets.length > 0
                ? resolvedTickets.reduce((sum, t) => sum + t.resolutionTimeHours, 0) / resolvedTickets.length
                : 0;
            const ticketsWithSLA = tickets.filter(t => t.slaResolutionDueAt);
            const slaCompliant = ticketsWithSLA.filter(t => !t.isSLABreached).length;
            const slaCompliance = ticketsWithSLA.length > 0
                ? (slaCompliant / ticketsWithSLA.length) * 100
                : 0;
            return {
                total,
                byStatus,
                byPriority,
                avgResponseTime: Math.round(avgResponseTime * 10) / 10,
                avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
                slaCompliance: Math.round(slaCompliance * 10) / 10,
                satisfactionScore: 0, // TODO: Implement CSAT tracking
            };
        }
        /**
         * Get time-based analytics (daily, weekly, monthly)
         */
        async getTimeBasedStats(period = 'week') {
            const now = new Date();
            const periodDays = period === 'day' ? 7 : period === 'week' ? 28 : 90;
            const startDate = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
            const tickets = await this.ticketRepository
                .createQueryBuilder('ticket')
                .where('ticket.createdAt >= :startDate', { startDate })
                .getMany();
            const groupByDate = (items, dateField) => {
                const grouped = new Map();
                items.forEach(item => {
                    const date = item[dateField];
                    if (date) {
                        const key = date.toISOString().split('T')[0];
                        if (!grouped.has(key)) {
                            grouped.set(key, []);
                        }
                        grouped.get(key).push(item);
                    }
                });
                return Array.from(grouped.entries()).map(([date, tickets]) => ({
                    date,
                    count: tickets.length,
                })).sort((a, b) => a.date.localeCompare(b.date));
            };
            const createdTickets = groupByDate(tickets, 'createdAt');
            const resolvedTickets = groupByDate(tickets.filter(t => t.resolvedAt), 'resolvedAt');
            const avgResponseTimeData = Array.from(tickets
                .filter(t => t.responseTimeHours > 0)
                .reduce((map, ticket) => {
                const key = ticket.createdAt.toISOString().split('T')[0];
                if (!map.has(key)) {
                    map.set(key, []);
                }
                map.get(key).push(ticket.responseTimeHours);
                return map;
            }, new Map())).map(([date, times]) => ({
                date,
                hours: Math.round((times.reduce((a, b) => a + b, 0) / times.length) * 10) / 10,
            })).sort((a, b) => a.date.localeCompare(b.date));
            const slaBreaches = groupByDate(tickets.filter(t => t.isSLABreached), 'createdAt');
            return {
                createdTickets,
                resolvedTickets,
                avgResponseTime: avgResponseTimeData,
                slaBreaches,
            };
        }
        /**
         * Get agent performance statistics
         */
        async getAgentPerformance(agentId) {
            const query = this.ticketRepository
                .createQueryBuilder('ticket')
                .leftJoinAndSelect('ticket.assignedTo', 'assignedTo')
                .where('ticket.assignedToId IS NOT NULL');
            if (agentId) {
                query.andWhere('ticket.assignedToId = :agentId', { agentId });
            }
            const tickets = await query.getMany();
            const agentStats = new Map();
            tickets.forEach(ticket => {
                if (!ticket.assignedToId)
                    return;
                if (!agentStats.has(ticket.assignedToId)) {
                    agentStats.set(ticket.assignedToId, {
                        agentName: ticket.assignedTo
                            ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}`
                            : 'Unknown',
                        tickets: [],
                    });
                }
                agentStats.get(ticket.assignedToId).tickets.push(ticket);
            });
            return Array.from(agentStats.entries()).map(([agentId, data]) => {
                const assignedTickets = data.tickets.length;
                const resolvedTickets = data.tickets.filter(t => t.status === ticket_status_enum_1.TicketStatus.RESOLVED || t.status === ticket_status_enum_1.TicketStatus.CLOSED).length;
                const respondedTickets = data.tickets.filter(t => t.responseTimeHours > 0);
                const avgResponseTime = respondedTickets.length > 0
                    ? respondedTickets.reduce((sum, t) => sum + t.responseTimeHours, 0) / respondedTickets.length
                    : 0;
                const resolvedWithTime = data.tickets.filter(t => t.resolutionTimeHours > 0);
                const avgResolutionTime = resolvedWithTime.length > 0
                    ? resolvedWithTime.reduce((sum, t) => sum + t.resolutionTimeHours, 0) / resolvedWithTime.length
                    : 0;
                const ticketsWithSLA = data.tickets.filter(t => t.slaResolutionDueAt);
                const slaCompliant = ticketsWithSLA.filter(t => !t.isSLABreached).length;
                const slaCompliance = ticketsWithSLA.length > 0
                    ? (slaCompliant / ticketsWithSLA.length) * 100
                    : 0;
                const activeTickets = data.tickets.filter(t => t.status === ticket_status_enum_1.TicketStatus.NEW || t.status === ticket_status_enum_1.TicketStatus.OPEN).length;
                return {
                    agentId,
                    agentName: data.agentName,
                    assignedTickets,
                    resolvedTickets,
                    avgResponseTime: Math.round(avgResponseTime * 10) / 10,
                    avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
                    slaCompliance: Math.round(slaCompliance * 10) / 10,
                    activeTickets,
                };
            }).sort((a, b) => b.resolvedTickets - a.resolvedTickets);
        }
        /**
         * Get category statistics
         */
        async getCategoryStats() {
            const tickets = await this.ticketRepository.find({
                relations: ['category'],
                where: { categoryId: Not(null) },
            });
            const categoryMap = new Map();
            tickets.forEach(ticket => {
                if (!ticket.categoryId)
                    return;
                if (!categoryMap.has(ticket.categoryId)) {
                    categoryMap.set(ticket.categoryId, {
                        name: ticket.category?.name || 'Unknown',
                        tickets: [],
                    });
                }
                categoryMap.get(ticket.categoryId).tickets.push(ticket);
            });
            return Array.from(categoryMap.entries()).map(([categoryId, data]) => {
                const totalTickets = data.tickets.length;
                const openTickets = data.tickets.filter(t => t.status === ticket_status_enum_1.TicketStatus.NEW || t.status === ticket_status_enum_1.TicketStatus.OPEN).length;
                const resolvedTickets = data.tickets.filter(t => t.status === ticket_status_enum_1.TicketStatus.RESOLVED || t.status === ticket_status_enum_1.TicketStatus.CLOSED).length;
                const resolvedWithTime = data.tickets.filter(t => t.resolutionTimeHours > 0);
                const avgResolutionTime = resolvedWithTime.length > 0
                    ? resolvedWithTime.reduce((sum, t) => sum + t.resolutionTimeHours, 0) / resolvedWithTime.length
                    : 0;
                return {
                    categoryId,
                    categoryName: data.name,
                    totalTickets,
                    openTickets,
                    resolvedTickets,
                    avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
                };
            }).sort((a, b) => b.totalTickets - a.totalTickets);
        }
        /**
         * Get tag analytics
         */
        async getTagStats() {
            const tickets = await this.ticketRepository.find({
                where: { tags: Not(null) },
            });
            const tagMap = new Map();
            tickets.forEach(ticket => {
                if (!ticket.tags)
                    return;
                ticket.tags.forEach(tag => {
                    if (!tagMap.has(tag)) {
                        tagMap.set(tag, []);
                    }
                    tagMap.get(tag).push(ticket);
                });
            });
            return Array.from(tagMap.entries()).map(([tag, tickets]) => {
                const resolvedWithTime = tickets.filter(t => t.resolutionTimeHours > 0);
                const avgResolutionTime = resolvedWithTime.length > 0
                    ? resolvedWithTime.reduce((sum, t) => sum + t.resolutionTimeHours, 0) / resolvedWithTime.length
                    : 0;
                return {
                    tag,
                    count: tickets.length,
                    avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
                };
            }).sort((a, b) => b.count - a.count);
        }
        /**
         * Get customer statistics
         */
        async getCustomerStats(userId) {
            const query = this.ticketRepository
                .createQueryBuilder('ticket')
                .leftJoinAndSelect('ticket.category', 'category');
            if (userId) {
                query.where('ticket.userId = :userId', { userId });
            }
            const tickets = await query.getMany();
            const totalTickets = tickets.length;
            const openTickets = tickets.filter(t => t.status === ticket_status_enum_1.TicketStatus.NEW || t.status === ticket_status_enum_1.TicketStatus.OPEN).length;
            const resolvedTickets = tickets.filter(t => t.status === ticket_status_enum_1.TicketStatus.RESOLVED || t.status === ticket_status_enum_1.TicketStatus.CLOSED).length;
            const resolvedWithTime = tickets.filter(t => t.resolutionTimeHours > 0);
            const avgResolutionTime = resolvedWithTime.length > 0
                ? resolvedWithTime.reduce((sum, t) => sum + t.resolutionTimeHours, 0) / resolvedWithTime.length
                : 0;
            const categoryCount = new Map();
            tickets.forEach(ticket => {
                if (ticket.category) {
                    const name = ticket.category.name;
                    categoryCount.set(name, (categoryCount.get(name) || 0) + 1);
                }
            });
            const tagCount = new Map();
            tickets.forEach(ticket => {
                if (ticket.tags) {
                    ticket.tags.forEach(tag => {
                        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
                    });
                }
            });
            return {
                totalTickets,
                openTickets,
                resolvedTickets,
                avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
                mostUsedCategories: Array.from(categoryCount.entries())
                    .map(([category, count]) => ({ category, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5),
                mostUsedTags: Array.from(tagCount.entries())
                    .map(([tag, count]) => ({ tag, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5),
            };
        }
    };
    return TicketAnalyticsService = _classThis;
})();
exports.TicketAnalyticsService = TicketAnalyticsService;
// Helper to avoid TypeORM Not import issues
function Not(value) {
    return value;
}
//# sourceMappingURL=ticket-analytics.service.js.map