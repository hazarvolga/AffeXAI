"use strict";
/**
 * Automation Queue Definitions
 * Job types and data interfaces for automation queue
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationJobPriority = exports.AUTOMATION_JOB_OPTIONS = exports.AUTOMATION_QUEUE_NAME = exports.AutomationJobType = void 0;
/**
 * Job types for automation queue
 */
var AutomationJobType;
(function (AutomationJobType) {
    AutomationJobType["EXECUTE_AUTOMATION"] = "execute-automation";
    AutomationJobType["PROCESS_SCHEDULED_STEP"] = "process-scheduled-step";
    AutomationJobType["RETRY_FAILED_STEP"] = "retry-failed-step";
    AutomationJobType["PROCESS_TRIGGER"] = "process-trigger";
})(AutomationJobType || (exports.AutomationJobType = AutomationJobType = {}));
/**
 * Queue name constant
 */
exports.AUTOMATION_QUEUE_NAME = 'automation';
/**
 * Job options
 */
exports.AUTOMATION_JOB_OPTIONS = {
    // Default retry strategy
    attempts: 3,
    backoff: {
        type: 'exponential',
        delay: 2000, // 2 seconds initial delay
    },
    // Remove completed jobs after 24 hours
    removeOnComplete: {
        age: 86400, // 24 hours in seconds
        count: 1000, // Keep last 1000 completed jobs
    },
    // Remove failed jobs after 7 days
    removeOnFail: {
        age: 604800, // 7 days in seconds
        count: 5000, // Keep last 5000 failed jobs
    },
};
/**
 * Priority levels
 */
var AutomationJobPriority;
(function (AutomationJobPriority) {
    AutomationJobPriority[AutomationJobPriority["CRITICAL"] = 1] = "CRITICAL";
    AutomationJobPriority[AutomationJobPriority["HIGH"] = 2] = "HIGH";
    AutomationJobPriority[AutomationJobPriority["NORMAL"] = 3] = "NORMAL";
    AutomationJobPriority[AutomationJobPriority["LOW"] = 4] = "LOW";
})(AutomationJobPriority || (exports.AutomationJobPriority = AutomationJobPriority = {}));
//# sourceMappingURL=automation.queue.js.map