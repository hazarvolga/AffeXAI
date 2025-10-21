"use strict";
/**
 * Automation Types
 * TypeScript types for marketing automation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerEvent = exports.ExecutionStatus = exports.WorkflowStepType = exports.TriggerType = exports.AutomationStatus = void 0;
// Enums
var AutomationStatus;
(function (AutomationStatus) {
    AutomationStatus["DRAFT"] = "draft";
    AutomationStatus["ACTIVE"] = "active";
    AutomationStatus["PAUSED"] = "paused";
    AutomationStatus["COMPLETED"] = "completed";
    AutomationStatus["ARCHIVED"] = "archived";
})(AutomationStatus || (exports.AutomationStatus = AutomationStatus = {}));
var TriggerType;
(function (TriggerType) {
    TriggerType["EVENT"] = "event";
    TriggerType["BEHAVIOR"] = "behavior";
    TriggerType["TIME_BASED"] = "time_based";
    TriggerType["ATTRIBUTE"] = "attribute";
})(TriggerType || (exports.TriggerType = TriggerType = {}));
var WorkflowStepType;
(function (WorkflowStepType) {
    WorkflowStepType["SEND_EMAIL"] = "send_email";
    WorkflowStepType["DELAY"] = "delay";
    WorkflowStepType["CONDITION"] = "condition";
    WorkflowStepType["SPLIT"] = "split";
    WorkflowStepType["EXIT"] = "exit";
})(WorkflowStepType || (exports.WorkflowStepType = WorkflowStepType = {}));
var ExecutionStatus;
(function (ExecutionStatus) {
    ExecutionStatus["PENDING"] = "pending";
    ExecutionStatus["RUNNING"] = "running";
    ExecutionStatus["COMPLETED"] = "completed";
    ExecutionStatus["FAILED"] = "failed";
    ExecutionStatus["CANCELLED"] = "cancelled";
})(ExecutionStatus || (exports.ExecutionStatus = ExecutionStatus = {}));
var TriggerEvent;
(function (TriggerEvent) {
    TriggerEvent["SUBSCRIBER_CREATED"] = "subscriber.created";
    TriggerEvent["SUBSCRIBER_UPDATED"] = "subscriber.updated";
    TriggerEvent["SUBSCRIBER_SEGMENT_ADDED"] = "subscriber.segment_added";
    TriggerEvent["SUBSCRIBER_SEGMENT_REMOVED"] = "subscriber.segment_removed";
    TriggerEvent["EMAIL_OPENED"] = "email.opened";
    TriggerEvent["EMAIL_CLICKED"] = "email.clicked";
    TriggerEvent["PURCHASE_MADE"] = "purchase.made";
    TriggerEvent["CART_ABANDONED"] = "cart.abandoned";
    TriggerEvent["PRODUCT_VIEWED"] = "product.viewed";
})(TriggerEvent || (exports.TriggerEvent = TriggerEvent = {}));
//# sourceMappingURL=automation.js.map