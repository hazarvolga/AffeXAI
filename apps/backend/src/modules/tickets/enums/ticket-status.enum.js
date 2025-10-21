"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketStatus = void 0;
/**
 * Ticket Status Enum
 * Defines the lifecycle states of a support ticket
 */
var TicketStatus;
(function (TicketStatus) {
    /** Ticket just created, not yet assigned or reviewed */
    TicketStatus["NEW"] = "new";
    /** Ticket is being worked on by a support agent */
    TicketStatus["OPEN"] = "open";
    /** Waiting for customer response or action */
    TicketStatus["PENDING_CUSTOMER"] = "pending_customer";
    /** Waiting for internal team response (different department) */
    TicketStatus["PENDING_INTERNAL"] = "pending_internal";
    /** Waiting for third party response or action */
    TicketStatus["PENDING_THIRD_PARTY"] = "pending_third_party";
    /** Solution provided, waiting for customer confirmation */
    TicketStatus["RESOLVED"] = "resolved";
    /** Ticket is closed and completed */
    TicketStatus["CLOSED"] = "closed";
    /** Ticket was cancelled (invalid or duplicate) */
    TicketStatus["CANCELLED"] = "cancelled";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
//# sourceMappingURL=ticket-status.enum.js.map