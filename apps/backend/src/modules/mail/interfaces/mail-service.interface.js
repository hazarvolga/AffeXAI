"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailPriority = exports.MailChannel = void 0;
/**
 * Mail Channel Types
 * Defines different types of emails for routing and rate limiting
 */
var MailChannel;
(function (MailChannel) {
    MailChannel["TRANSACTIONAL"] = "transactional";
    MailChannel["MARKETING"] = "marketing";
    MailChannel["CERTIFICATE"] = "certificate";
    MailChannel["EVENT"] = "event";
    MailChannel["SUPPORT"] = "support";
    MailChannel["SYSTEM"] = "system";
})(MailChannel || (exports.MailChannel = MailChannel = {}));
/**
 * Email Priority Levels
 */
var MailPriority;
(function (MailPriority) {
    MailPriority["HIGH"] = "high";
    MailPriority["NORMAL"] = "normal";
    MailPriority["LOW"] = "low";
})(MailPriority || (exports.MailPriority = MailPriority = {}));
//# sourceMappingURL=mail-service.interface.js.map