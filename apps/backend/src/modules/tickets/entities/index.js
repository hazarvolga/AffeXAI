"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = exports.ChatSession = exports.TicketCategory = exports.TicketMessage = exports.Ticket = void 0;
/**
 * Tickets Module Entities
 * Centralized export for all ticket-related entities
 */
var ticket_entity_1 = require("./ticket.entity");
Object.defineProperty(exports, "Ticket", { enumerable: true, get: function () { return ticket_entity_1.Ticket; } });
var ticket_message_entity_1 = require("./ticket-message.entity");
Object.defineProperty(exports, "TicketMessage", { enumerable: true, get: function () { return ticket_message_entity_1.TicketMessage; } });
var ticket_category_entity_1 = require("./ticket-category.entity");
Object.defineProperty(exports, "TicketCategory", { enumerable: true, get: function () { return ticket_category_entity_1.TicketCategory; } });
var chat_session_entity_1 = require("./chat-session.entity");
Object.defineProperty(exports, "ChatSession", { enumerable: true, get: function () { return chat_session_entity_1.ChatSession; } });
var chat_message_entity_1 = require("./chat-message.entity");
Object.defineProperty(exports, "ChatMessage", { enumerable: true, get: function () { return chat_message_entity_1.ChatMessage; } });
//# sourceMappingURL=index.js.map