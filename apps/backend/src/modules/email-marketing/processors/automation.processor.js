"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const automation_queue_1 = require("../queues/automation.queue");
/**
 * Automation Queue Processor
 * Processes automation jobs from the queue
 */
let AutomationProcessor = (() => {
    let _classDecorators = [(0, bullmq_1.Processor)(automation_queue_1.AUTOMATION_QUEUE_NAME)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = bullmq_1.WorkerHost;
    let _instanceExtraInitializers = [];
    let _onCompleted_decorators;
    let _onFailed_decorators;
    let _onProgress_decorators;
    let _onActive_decorators;
    var AutomationProcessor = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _onCompleted_decorators = [(0, bullmq_1.OnWorkerEvent)('completed')];
            _onFailed_decorators = [(0, bullmq_1.OnWorkerEvent)('failed')];
            _onProgress_decorators = [(0, bullmq_1.OnWorkerEvent)('progress')];
            _onActive_decorators = [(0, bullmq_1.OnWorkerEvent)('active')];
            __esDecorate(this, null, _onCompleted_decorators, { kind: "method", name: "onCompleted", static: false, private: false, access: { has: obj => "onCompleted" in obj, get: obj => obj.onCompleted }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onFailed_decorators, { kind: "method", name: "onFailed", static: false, private: false, access: { has: obj => "onFailed" in obj, get: obj => obj.onFailed }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onProgress_decorators, { kind: "method", name: "onProgress", static: false, private: false, access: { has: obj => "onProgress" in obj, get: obj => obj.onProgress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onActive_decorators, { kind: "method", name: "onActive", static: false, private: false, access: { has: obj => "onActive" in obj, get: obj => obj.onActive }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AutomationProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        workflowExecutor = __runInitializers(this, _instanceExtraInitializers);
        executionRepo;
        scheduleRepo;
        logger = new common_1.Logger(AutomationProcessor.name);
        constructor(workflowExecutor, executionRepo, scheduleRepo) {
            super();
            this.workflowExecutor = workflowExecutor;
            this.executionRepo = executionRepo;
            this.scheduleRepo = scheduleRepo;
        }
        /**
         * Main process method - routes to specific handlers
         */
        async process(job) {
            this.logger.log(`Processing job ${job.id} of type ${job.name}`);
            try {
                switch (job.name) {
                    case automation_queue_1.AutomationJobType.EXECUTE_AUTOMATION:
                        return await this.handleExecuteAutomation(job);
                    case automation_queue_1.AutomationJobType.PROCESS_SCHEDULED_STEP:
                        return await this.handleProcessScheduledStep(job);
                    case automation_queue_1.AutomationJobType.RETRY_FAILED_STEP:
                        return await this.handleRetryFailedStep(job);
                    case automation_queue_1.AutomationJobType.PROCESS_TRIGGER:
                        return await this.handleProcessTrigger(job);
                    default:
                        throw new Error(`Unknown job type: ${job.name}`);
                }
            }
            catch (error) {
                this.logger.error(`Error processing job ${job.id}:`, error);
                throw error;
            }
        }
        /**
         * Handle execute automation job
         */
        async handleExecuteAutomation(job) {
            const { automationId, subscriberId, triggerId, metadata } = job.data;
            this.logger.log(`Executing automation ${automationId} for subscriber ${subscriberId}`);
            // Update job progress
            await job.updateProgress(10);
            // Execute workflow
            const execution = await this.workflowExecutor.executeWorkflow(automationId, subscriberId, triggerId);
            await job.updateProgress(50);
            // Wait for execution to complete (with timeout)
            await this.waitForExecution(execution.id, 300000); // 5 minutes timeout
            await job.updateProgress(100);
            this.logger.log(`Completed automation ${automationId} for subscriber ${subscriberId}`);
        }
        /**
         * Handle process scheduled step job
         */
        async handleProcessScheduledStep(job) {
            const { scheduleId, automationId, subscriberId, stepIndex, metadata } = job.data;
            this.logger.log(`Processing scheduled step ${stepIndex} for automation ${automationId}`);
            await job.updateProgress(10);
            // Resume execution from schedule
            await this.workflowExecutor.resumeExecution(scheduleId);
            await job.updateProgress(100);
            this.logger.log(`Completed scheduled step ${scheduleId}`);
        }
        /**
         * Handle retry failed step job
         */
        async handleRetryFailedStep(job) {
            const { executionId, stepId, attemptNumber, error } = job.data;
            this.logger.log(`Retrying failed step ${stepId} for execution ${executionId} (attempt ${attemptNumber})`);
            await job.updateProgress(10);
            // Load execution
            const execution = await this.executionRepo.findOne({
                where: { id: executionId },
                relations: ['automation', 'subscriber'],
            });
            if (!execution) {
                throw new Error(`Execution ${executionId} not found`);
            }
            // Find the failed step
            const step = execution.automation.getStepById(stepId);
            if (!step) {
                throw new Error(`Step ${stepId} not found`);
            }
            await job.updateProgress(50);
            // Reset execution to retry from this step
            execution.status = 'running';
            execution.currentStepIndex = execution.automation.workflowSteps.findIndex((s) => s.id === stepId);
            await this.executionRepo.save(execution);
            // Continue execution
            await this.workflowExecutor.processExecution(executionId);
            await job.updateProgress(100);
            this.logger.log(`Completed retry for step ${stepId} (attempt ${attemptNumber})`);
        }
        /**
         * Handle process trigger job
         */
        async handleProcessTrigger(job) {
            const { triggerId, automationId, subscriberId, triggerType, triggerData } = job.data;
            this.logger.log(`Processing trigger ${triggerId} for automation ${automationId}`);
            await job.updateProgress(10);
            // Execute automation from trigger
            const execution = await this.workflowExecutor.executeWorkflow(automationId, subscriberId, triggerId);
            await job.updateProgress(50);
            // Wait for execution to complete
            await this.waitForExecution(execution.id, 300000);
            await job.updateProgress(100);
            this.logger.log(`Completed trigger ${triggerId}`);
        }
        /**
         * Wait for execution to complete
         */
        async waitForExecution(executionId, timeoutMs) {
            const startTime = Date.now();
            const pollInterval = 1000; // 1 second
            while (Date.now() - startTime < timeoutMs) {
                const execution = await this.executionRepo.findOne({
                    where: { id: executionId },
                });
                if (!execution) {
                    throw new Error(`Execution ${executionId} not found`);
                }
                if (execution.status === 'completed' ||
                    execution.status === 'failed' ||
                    execution.status === 'cancelled') {
                    return;
                }
                // Wait before next poll
                await new Promise((resolve) => setTimeout(resolve, pollInterval));
            }
            throw new Error(`Execution ${executionId} timed out after ${timeoutMs}ms`);
        }
        /**
         * Handle job completion
         */
        onCompleted(job) {
            this.logger.log(`Job ${job.id} (${job.name}) completed successfully`);
        }
        /**
         * Handle job failure
         */
        onFailed(job, error) {
            this.logger.error(`Job ${job.id} (${job.name}) failed after ${job.attemptsMade} attempts:`, error);
        }
        /**
         * Handle job progress
         */
        onProgress(job, progress) {
            this.logger.debug(`Job ${job.id} (${job.name}) progress: ${progress}%`);
        }
        /**
         * Handle job active
         */
        onActive(job) {
            this.logger.log(`Job ${job.id} (${job.name}) started processing`);
        }
    };
    return AutomationProcessor = _classThis;
})();
exports.AutomationProcessor = AutomationProcessor;
//# sourceMappingURL=automation.processor.js.map