"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketPriority = void 0;
/**
 * Ticket Priority Enum
 * Defines the urgency level of a support ticket
 */
var TicketPriority;
(function (TicketPriority) {
    /** Minor issue, no immediate impact */
    TicketPriority["LOW"] = "low";
    /** Regular issue, normal handling */
    TicketPriority["MEDIUM"] = "medium";
    /** Important issue, requires quick attention */
    TicketPriority["HIGH"] = "high";
    /** Critical issue, system down or blocking work */
    TicketPriority["URGENT"] = "urgent";
})(TicketPriority || (exports.TicketPriority = TicketPriority = {}));
//# sourceMappingURL=ticket-priority.enum.js.map