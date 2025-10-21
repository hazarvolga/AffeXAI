"use strict";
/**
 * Event & Certificate Types
 *
 * Shared types for event management and certificate system
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCategory = exports.EventStatus = void 0;
// ============================================================================
// Enums
// ============================================================================
var EventStatus;
(function (EventStatus) {
    EventStatus["DRAFT"] = "draft";
    EventStatus["PUBLISHED"] = "published";
    EventStatus["CANCELLED"] = "cancelled";
    EventStatus["COMPLETED"] = "completed";
})(EventStatus || (exports.EventStatus = EventStatus = {}));
var EventCategory;
(function (EventCategory) {
    EventCategory["WEBINAR"] = "Webinar";
    EventCategory["WORKSHOP"] = "Workshop";
    EventCategory["CONFERENCE"] = "Conference";
    EventCategory["TRAINING"] = "Training";
    EventCategory["MEETUP"] = "Meetup";
    EventCategory["OTHER"] = "Other";
})(EventCategory || (exports.EventCategory = EventCategory = {}));
//# sourceMappingURL=event.types.js.map