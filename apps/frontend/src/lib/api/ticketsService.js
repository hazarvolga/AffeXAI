"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketsService = exports.TicketStatus = exports.TicketPriority = void 0;
const base_service_1 = require("./base-service");
/**
 * Ticket Priority Enum
 */
var TicketPriority;
(function (TicketPriority) {
    TicketPriority["LOW"] = "low";
    TicketPriority["MEDIUM"] = "medium";
    TicketPriority["HIGH"] = "high";
    TicketPriority["URGENT"] = "urgent";
})(TicketPriority || (exports.TicketPriority = TicketPriority = {}));
/**
 * Ticket Status Enum
 */
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "open";
    TicketStatus["IN_PROGRESS"] = "in_progress";
    TicketStatus["WAITING_CUSTOMER"] = "waiting_customer";
    TicketStatus["PENDING_THIRD_PARTY"] = "pending_third_party";
    TicketStatus["RESOLVED"] = "resolved";
    TicketStatus["CLOSED"] = "closed";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
/**
 * Tickets Service
 * Handles all ticket-related API operations with type safety
 */
class TicketsService extends base_service_1.BaseApiService {
    constructor() {
        super({
            endpoint: '/tickets',
            useWrappedResponses: true // Backend uses global ApiResponse wrapper
        });
    }
    /**
     * Get all tickets with optional filters
     */
    async getTickets(filters) {
        const queryString = filters
            ? `?${new URLSearchParams(filters).toString()}`
            : '';
        return this.client.getWrapped(`${this.endpoint}${queryString}`);
    }
    /**
     * Get ticket by ID with full details (messages, attachments, etc.)
     */
    async getTicketById(id) {
        return this.client.getWrapped(`${this.endpoint}/${id}`);
    }
    /**
     * Create new ticket
     */
    async createTicket(data) {
        return this.client.postWrapped(this.endpoint, data);
    }
    /**
     * Update ticket
     */
    async updateTicket(id, data) {
        return this.client.patchWrapped(`${this.endpoint}/${id}`, data);
    }
    /**
     * Update ticket status
     */
    async updateTicketStatus(id, data) {
        return this.client.patchWrapped(`${this.endpoint}/${id}/status`, data);
    }
    /**
     * Assign ticket to user
     */
    async assignTicket(id, data) {
        return this.client.patchWrapped(`${this.endpoint}/${id}/assign`, data);
    }
    /**
     * Add message to ticket
     */
    async addMessage(id, data) {
        return this.client.postWrapped(`${this.endpoint}/${id}/messages`, data);
    }
    /**
     * Get all ticket categories (hierarchical)
     */
    async getCategories() {
        return this.client.getWrapped(`${this.endpoint}/categories/list`);
    }
    /**
     * Get ticket statistics
     */
    async getStats() {
        return this.client.getWrapped(`${this.endpoint}/stats/overview`);
    }
    /**
     * Close ticket (convenience method)
     */
    async closeTicket(id, notes) {
        return this.updateTicketStatus(id, {
            status: TicketStatus.CLOSED,
            notes
        });
    }
    /**
     * Resolve ticket (convenience method)
     */
    async resolveTicket(id, notes) {
        return this.updateTicketStatus(id, {
            status: TicketStatus.RESOLVED,
            notes
        });
    }
    /**
     * Reopen ticket (convenience method)
     */
    async reopenTicket(id, notes) {
        return this.updateTicketStatus(id, {
            status: TicketStatus.OPEN,
            notes
        });
    }
    /**
     * Merge tickets
     */
    async mergeTickets(ticketIds, targetTicketId, mergeNote) {
        return this.client.postWrapped(`${this.endpoint}/merge`, {
            ticketIds,
            targetTicketId,
            mergeNote,
        });
    }
    /**
     * Split ticket
     */
    async splitTicket(originalTicketId, splitData) {
        return this.client.postWrapped(`${this.endpoint}/split`, {
            originalTicketId,
            ...splitData,
        });
    }
    /**
     * Get my tickets (current user's tickets)
     */
    async getMyTickets(filters) {
        return this.getTickets(filters);
    }
    /**
     * Get priority label in Turkish
     */
    getPriorityLabel(priority) {
        const labels = {
            [TicketPriority.LOW]: 'Düşük',
            [TicketPriority.MEDIUM]: 'Orta',
            [TicketPriority.HIGH]: 'Yüksek',
            [TicketPriority.URGENT]: 'Acil'
        };
        return labels[priority] || priority;
    }
    /**
     * Get status label in Turkish
     */
    getStatusLabel(status) {
        const labels = {
            [TicketStatus.OPEN]: 'Açık',
            [TicketStatus.IN_PROGRESS]: 'İşleniyor',
            [TicketStatus.WAITING_CUSTOMER]: 'Müşteri Bekliyor',
            [TicketStatus.PENDING_THIRD_PARTY]: 'Üçüncü Taraf Bekliyor',
            [TicketStatus.RESOLVED]: 'Çözüldü',
            [TicketStatus.CLOSED]: 'Kapalı'
        };
        return labels[status] || status;
    }
    /**
     * Get priority color for UI
     */
    getPriorityColor(priority) {
        const colors = {
            [TicketPriority.LOW]: 'text-blue-600 bg-blue-50',
            [TicketPriority.MEDIUM]: 'text-yellow-600 bg-yellow-50',
            [TicketPriority.HIGH]: 'text-orange-600 bg-orange-50',
            [TicketPriority.URGENT]: 'text-red-600 bg-red-50'
        };
        return colors[priority] || 'text-gray-600 bg-gray-50';
    }
    /**
     * Get status color for UI
     */
    getStatusColor(status) {
        const colors = {
            [TicketStatus.OPEN]: 'text-blue-600 bg-blue-50',
            [TicketStatus.IN_PROGRESS]: 'text-purple-600 bg-purple-50',
            [TicketStatus.WAITING_CUSTOMER]: 'text-yellow-600 bg-yellow-50',
            [TicketStatus.PENDING_THIRD_PARTY]: 'text-orange-600 bg-orange-50',
            [TicketStatus.RESOLVED]: 'text-green-600 bg-green-50',
            [TicketStatus.CLOSED]: 'text-gray-600 bg-gray-50'
        };
        return colors[status] || 'text-gray-600 bg-gray-50';
    }
}
exports.ticketsService = new TicketsService();
exports.default = exports.ticketsService;
//# sourceMappingURL=ticketsService.js.map