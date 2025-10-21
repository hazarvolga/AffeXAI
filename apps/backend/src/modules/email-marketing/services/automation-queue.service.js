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
exports.AutomationQueueService = void 0;
const common_1 = require("@nestjs/common");
const automation_queue_1 = require("../queues/automation.queue");
/**
 * Automation Queue Service
 * Manages automation job queue operations
 */
let AutomationQueueService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AutomationQueueService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AutomationQueueService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        automationQueue;
        logger = new common_1.Logger(AutomationQueueService.name);
        constructor(automationQueue) {
            this.automationQueue = automationQueue;
        }
        /**
         * Add execute automation job
         */
        async addExecuteAutomationJob(data, priority = automation_queue_1.AutomationJobPriority.NORMAL, delayMs) {
            this.logger.log(`Adding execute automation job for automation ${data.automationId}, subscriber ${data.subscriberId}`);
            await this.automationQueue.add(automation_queue_1.AutomationJobType.EXECUTE_AUTOMATION, data, {
                ...automation_queue_1.AUTOMATION_JOB_OPTIONS,
                priority,
                delay: delayMs,
            });
        }
        /**
         * Add process scheduled step job
         */
        async addProcessScheduledStepJob(data, scheduledFor) {
            const delayMs = scheduledFor.getTime() - Date.now();
            if (delayMs < 0) {
                this.logger.warn(`Scheduled time is in the past for schedule ${data.scheduleId}, executing immediately`);
            }
            this.logger.log(`Adding scheduled step job for schedule ${data.scheduleId}, delay: ${Math.max(0, delayMs)}ms`);
            await this.automationQueue.add(automation_queue_1.AutomationJobType.PROCESS_SCHEDULED_STEP, data, {
                ...automation_queue_1.AUTOMATION_JOB_OPTIONS,
                priority: automation_queue_1.AutomationJobPriority.NORMAL,
                delay: Math.max(0, delayMs),
            });
        }
        /**
         * Add retry failed step job
         */
        async addRetryFailedStepJob(data, delayMs = 5000) {
            this.logger.log(`Adding retry job for step ${data.stepId}, execution ${data.executionId} (attempt ${data.attemptNumber})`);
            await this.automationQueue.add(automation_queue_1.AutomationJobType.RETRY_FAILED_STEP, data, {
                ...automation_queue_1.AUTOMATION_JOB_OPTIONS,
                priority: automation_queue_1.AutomationJobPriority.HIGH,
                delay: delayMs,
                attempts: 3 - (data.attemptNumber - 1), // Reduce attempts for retries
            });
        }
        /**
         * Add process trigger job
         */
        async addProcessTriggerJob(data, priority = automation_queue_1.AutomationJobPriority.NORMAL) {
            this.logger.log(`Adding process trigger job for trigger ${data.triggerId}, automation ${data.automationId}`);
            await this.automationQueue.add(automation_queue_1.AutomationJobType.PROCESS_TRIGGER, data, {
                ...automation_queue_1.AUTOMATION_JOB_OPTIONS,
                priority,
            });
        }
        /**
         * Get queue metrics
         */
        async getQueueMetrics() {
            const [waiting, active, completed, failed, delayed] = await Promise.all([
                this.automationQueue.getWaitingCount(),
                this.automationQueue.getActiveCount(),
                this.automationQueue.getCompletedCount(),
                this.automationQueue.getFailedCount(),
                this.automationQueue.getDelayedCount(),
            ]);
            return {
                waiting,
                active,
                completed,
                failed,
                delayed,
                paused: 0, // BullMQ doesn't have getPausedCount in this version
            };
        }
        /**
         * Get queue jobs
         */
        async getQueueJobs(status, start = 0, end = 10) {
            switch (status) {
                case 'waiting':
                    return this.automationQueue.getWaiting(start, end);
                case 'active':
                    return this.automationQueue.getActive(start, end);
                case 'completed':
                    return this.automationQueue.getCompleted(start, end);
                case 'failed':
                    return this.automationQueue.getFailed(start, end);
                case 'delayed':
                    return this.automationQueue.getDelayed(start, end);
                default:
                    return [];
            }
        }
        /**
         * Pause queue
         */
        async pauseQueue() {
            this.logger.log('Pausing automation queue');
            await this.automationQueue.pause();
        }
        /**
         * Resume queue
         */
        async resumeQueue() {
            this.logger.log('Resuming automation queue');
            await this.automationQueue.resume();
        }
        /**
         * Clean queue
         */
        async cleanQueue(grace = 86400000, // 24 hours in milliseconds
        status = 'completed') {
            this.logger.log(`Cleaning ${status} jobs older than ${grace}ms`);
            const jobIds = await this.automationQueue.clean(grace, 1000, status);
            this.logger.log(`Cleaned ${jobIds.length} ${status} jobs`);
            return jobIds.length;
        }
        /**
         * Drain queue (remove all jobs)
         */
        async drainQueue() {
            this.logger.warn('Draining automation queue - all jobs will be removed');
            await this.automationQueue.drain();
        }
        /**
         * Obliterate queue (remove all jobs and keys)
         */
        async obliterateQueue() {
            this.logger.warn('Obliterating automation queue - all data will be removed');
            await this.automationQueue.obliterate();
        }
    };
    return AutomationQueueService = _classThis;
})();
exports.AutomationQueueService = AutomationQueueService;
//# sourceMappingURL=automation-queue.service.js.map