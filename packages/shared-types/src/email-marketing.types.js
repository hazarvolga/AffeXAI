"use strict";
/**
 * Email Marketing Module Types
 * Shared types for email campaigns, subscribers, groups, segments, and templates
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportResultStatus = exports.ExportJobStatus = exports.ImportJobStatus = exports.TemplateType = exports.SubscriberStatus = exports.CampaignStatus = void 0;
// ============================================================================
// Enums
// ============================================================================
var CampaignStatus;
(function (CampaignStatus) {
    CampaignStatus["DRAFT"] = "draft";
    CampaignStatus["SCHEDULED"] = "scheduled";
    CampaignStatus["SENDING"] = "sending";
    CampaignStatus["SENT"] = "sent";
    CampaignStatus["FAILED"] = "failed";
    CampaignStatus["PAUSED"] = "paused";
})(CampaignStatus || (exports.CampaignStatus = CampaignStatus = {}));
var SubscriberStatus;
(function (SubscriberStatus) {
    SubscriberStatus["ACTIVE"] = "active";
    SubscriberStatus["PENDING"] = "pending";
    SubscriberStatus["UNSUBSCRIBED"] = "unsubscribed";
    SubscriberStatus["BOUNCED"] = "bounced";
    SubscriberStatus["COMPLAINED"] = "complained";
})(SubscriberStatus || (exports.SubscriberStatus = SubscriberStatus = {}));
var TemplateType;
(function (TemplateType) {
    TemplateType["FILE_BASED"] = "file_based";
    TemplateType["CUSTOM"] = "custom";
})(TemplateType || (exports.TemplateType = TemplateType = {}));
// ============================================================================
// Bulk Import/Export Types
// ============================================================================
var ImportJobStatus;
(function (ImportJobStatus) {
    ImportJobStatus["PENDING"] = "pending";
    ImportJobStatus["PROCESSING"] = "processing";
    ImportJobStatus["COMPLETED"] = "completed";
    ImportJobStatus["FAILED"] = "failed";
})(ImportJobStatus || (exports.ImportJobStatus = ImportJobStatus = {}));
var ExportJobStatus;
(function (ExportJobStatus) {
    ExportJobStatus["PENDING"] = "pending";
    ExportJobStatus["PROCESSING"] = "processing";
    ExportJobStatus["COMPLETED"] = "completed";
    ExportJobStatus["FAILED"] = "failed";
})(ExportJobStatus || (exports.ExportJobStatus = ExportJobStatus = {}));
var ImportResultStatus;
(function (ImportResultStatus) {
    ImportResultStatus["VALID"] = "valid";
    ImportResultStatus["INVALID"] = "invalid";
    ImportResultStatus["RISKY"] = "risky";
    ImportResultStatus["DUPLICATE"] = "duplicate";
})(ImportResultStatus || (exports.ImportResultStatus = ImportResultStatus = {}));
//# sourceMappingURL=email-marketing.types.js.map