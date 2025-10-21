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
exports.WorkflowExecutorService = void 0;
const common_1 = require("@nestjs/common");
const automation_execution_entity_1 = require("../entities/automation-execution.entity");
const automation_schedule_entity_1 = require("../entities/automation-schedule.entity");
/**
 * Workflow Executor Service
 * Executes automation workflow steps
 */
let WorkflowExecutorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var WorkflowExecutorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            WorkflowExecutorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        automationRepo;
        executionRepo;
        scheduleRepo;
        subscriberRepo;
        emailCampaignService;
        logger = new common_1.Logger(WorkflowExecutorService.name);
        constructor(automationRepo, executionRepo, scheduleRepo, subscriberRepo, emailCampaignService) {
            this.automationRepo = automationRepo;
            this.executionRepo = executionRepo;
            this.scheduleRepo = scheduleRepo;
            this.subscriberRepo = subscriberRepo;
            this.emailCampaignService = emailCampaignService;
        }
        /**
         * Execute automation workflow for a subscriber
         */
        async executeWorkflow(automationId, subscriberId, triggerId) {
            this.logger.log(`Starting workflow execution for automation ${automationId}, subscriber ${subscriberId}`);
            const automation = await this.automationRepo.findOne({
                where: { id: automationId },
            });
            if (!automation) {
                throw new Error(`Automation ${automationId} not found`);
            }
            const subscriber = await this.subscriberRepo.findOne({
                where: { id: subscriberId },
            });
            if (!subscriber) {
                throw new Error(`Subscriber ${subscriberId} not found`);
            }
            // Create execution record
            const execution = this.executionRepo.create({
                automationId,
                subscriberId,
                triggerId,
                status: automation_execution_entity_1.ExecutionStatus.PENDING,
                currentStepIndex: 0,
                stepResults: [],
            });
            const savedExecution = await this.executionRepo.save(execution);
            // Start execution asynchronously
            this.processExecution(savedExecution.id).catch((error) => {
                this.logger.error(`Failed to process execution ${savedExecution.id}:`, error);
            });
            return savedExecution;
        }
        /**
         * Process execution (main workflow loop)
         */
        async processExecution(executionId) {
            const execution = await this.executionRepo.findOne({
                where: { id: executionId },
                relations: ['automation', 'subscriber'],
            });
            if (!execution) {
                this.logger.error(`Execution ${executionId} not found`);
                return;
            }
            const { automation, subscriber } = execution;
            try {
                execution.start();
                await this.executionRepo.save(execution);
                let currentStep = automation.getFirstStep();
                let stepIndex = 0;
                while (currentStep) {
                    this.logger.debug(`Executing step ${currentStep.id} (${currentStep.type})`);
                    const stepResult = await this.executeStep(currentStep, automation, subscriber, execution);
                    execution.addStepResult(stepResult);
                    await this.executionRepo.save(execution);
                    // Check if step failed
                    if (stepResult.status === 'failed') {
                        execution.fail(stepResult.error || 'Step execution failed');
                        await this.executionRepo.save(execution);
                        break;
                    }
                    // Check for exit step
                    if (currentStep.type === 'exit') {
                        break;
                    }
                    // Get next step
                    const conditionResult = stepResult.data?.conditionResult;
                    currentStep = automation.getNextStep(currentStep.id, conditionResult);
                    stepIndex++;
                    // Safety check for infinite loops
                    if (stepIndex > 100) {
                        execution.fail('Maximum step limit reached (100 steps)');
                        await this.executionRepo.save(execution);
                        break;
                    }
                }
                // Mark as completed if no errors
                if (execution.status === automation_execution_entity_1.ExecutionStatus.RUNNING) {
                    execution.complete();
                    await this.executionRepo.save(execution);
                    this.logger.log(`Execution ${executionId} completed successfully`);
                }
                // Update automation statistics
                automation.updateStatistics(execution);
                await this.automationRepo.save(automation);
            }
            catch (error) {
                this.logger.error(`Error processing execution ${executionId}:`, error);
                execution.fail(error.message || 'Unknown error');
                await this.executionRepo.save(execution);
            }
        }
        /**
         * Execute single workflow step
         */
        async executeStep(step, automation, subscriber, execution) {
            const startedAt = new Date();
            try {
                let result = {};
                switch (step.type) {
                    case 'send_email':
                        result = await this.executeSendEmail(step, subscriber);
                        break;
                    case 'delay':
                        result = await this.executeDelay(step, automation, subscriber, execution);
                        break;
                    case 'condition':
                        result = await this.executeCondition(step, subscriber);
                        break;
                    case 'split':
                        result = await this.executeSplit(step, subscriber);
                        break;
                    case 'exit':
                        result = { message: 'Workflow exit' };
                        break;
                    default:
                        throw new Error(`Unknown step type: ${step.type}`);
                }
                const completedAt = new Date();
                const executionTime = completedAt.getTime() - startedAt.getTime();
                return {
                    stepId: step.id,
                    stepType: step.type,
                    status: 'completed',
                    startedAt,
                    completedAt,
                    executionTime,
                    data: result,
                };
            }
            catch (error) {
                const completedAt = new Date();
                const executionTime = completedAt.getTime() - startedAt.getTime();
                return {
                    stepId: step.id,
                    stepType: step.type,
                    status: 'failed',
                    startedAt,
                    completedAt,
                    executionTime,
                    error: error.message || 'Step execution failed',
                };
            }
        }
        /**
         * Execute send_email step
         */
        async executeSendEmail(step, subscriber) {
            const { templateId, subject, content, fromName } = step.config;
            // Send email using EmailCampaignService
            // This is simplified - you'd integrate with your actual email sending logic
            this.logger.debug(`Sending email to ${subscriber.email}: ${subject || 'from template'}`);
            // Simulate email sending
            const emailId = `email-${Date.now()}`;
            return {
                emailId,
                recipient: subscriber.email,
                subject,
                templateId,
                sentAt: new Date(),
            };
        }
        /**
         * Execute delay step
         */
        async executeDelay(step, automation, subscriber, execution) {
            const { duration } = step.config; // duration in minutes
            if (!duration || duration <= 0) {
                throw new Error('Invalid delay duration');
            }
            const scheduledFor = new Date();
            scheduledFor.setMinutes(scheduledFor.getMinutes() + duration);
            // Create schedule record
            const schedule = this.scheduleRepo.create({
                automationId: automation.id,
                subscriberId: subscriber.id,
                stepIndex: execution.currentStepIndex,
                scheduledFor,
                status: automation_schedule_entity_1.ScheduleStatus.PENDING,
            });
            await this.scheduleRepo.save(schedule);
            this.logger.debug(`Scheduled next step for ${scheduledFor.toISOString()}`);
            // Pause execution - will be resumed by scheduler
            execution.status = automation_execution_entity_1.ExecutionStatus.PENDING;
            await this.executionRepo.save(execution);
            return {
                scheduleId: schedule.id,
                scheduledFor,
                delayMinutes: duration,
            };
        }
        /**
         * Execute condition step
         */
        async executeCondition(step, subscriber) {
            const { condition } = step.config;
            if (!condition) {
                throw new Error('Condition not specified');
            }
            // Evaluate condition
            const conditionResult = this.evaluateCondition(condition, subscriber);
            this.logger.debug(`Condition "${condition}" evaluated to: ${conditionResult}`);
            return {
                condition,
                conditionResult,
            };
        }
        /**
         * Execute split step (A/B variant selection)
         */
        async executeSplit(step, subscriber) {
            const { splitPercentages } = step.config;
            if (!splitPercentages || !Array.isArray(splitPercentages)) {
                throw new Error('Split percentages not configured');
            }
            // Random variant selection based on percentages
            const random = Math.random() * 100;
            let cumulative = 0;
            let selectedPath = 0;
            for (let i = 0; i < splitPercentages.length; i++) {
                cumulative += splitPercentages[i];
                if (random <= cumulative) {
                    selectedPath = i;
                    break;
                }
            }
            this.logger.debug(`Split test: selected path ${selectedPath}`);
            return {
                selectedPath,
                splitPercentages,
                random,
            };
        }
        /**
         * Evaluate condition expression
         */
        evaluateCondition(condition, subscriber) {
            try {
                // Simple condition evaluation
                // Format: "field operator value" (e.g., "status equals active")
                const parts = condition.split(' ');
                if (parts.length !== 3) {
                    throw new Error('Invalid condition format');
                }
                const [field, operator, value] = parts;
                const subscriberValue = subscriber[field];
                switch (operator) {
                    case 'equals':
                        return subscriberValue === value;
                    case 'not_equals':
                        return subscriberValue !== value;
                    case 'contains':
                        return typeof subscriberValue === 'string' && subscriberValue.includes(value);
                    case 'greater_than':
                        return Number(subscriberValue) > Number(value);
                    case 'less_than':
                        return Number(subscriberValue) < Number(value);
                    default:
                        throw new Error(`Unknown operator: ${operator}`);
                }
            }
            catch (error) {
                this.logger.error(`Failed to evaluate condition "${condition}":`, error);
                return false;
            }
        }
        /**
         * Resume execution after delay
         */
        async resumeExecution(scheduleId) {
            const schedule = await this.scheduleRepo.findOne({
                where: { id: scheduleId },
            });
            if (!schedule) {
                this.logger.error(`Schedule ${scheduleId} not found`);
                return;
            }
            schedule.markAsProcessing();
            await this.scheduleRepo.save(schedule);
            try {
                // Find execution
                const execution = await this.executionRepo.findOne({
                    where: {
                        automationId: schedule.automationId,
                        subscriberId: schedule.subscriberId,
                        status: automation_execution_entity_1.ExecutionStatus.PENDING,
                    },
                });
                if (!execution) {
                    throw new Error('Execution not found');
                }
                // Resume processing
                execution.status = automation_execution_entity_1.ExecutionStatus.RUNNING;
                await this.executionRepo.save(execution);
                await this.processExecution(execution.id);
                schedule.markAsCompleted();
                await this.scheduleRepo.save(schedule);
            }
            catch (error) {
                this.logger.error(`Failed to resume execution from schedule ${scheduleId}:`, error);
                schedule.markAsFailed(error.message);
                await this.scheduleRepo.save(schedule);
            }
        }
        /**
         * Process pending schedules (cron job)
         */
        async processPendingSchedules() {
            const pendingSchedules = await this.scheduleRepo
                .createQueryBuilder('schedule')
                .where('schedule.status = :status', { status: automation_schedule_entity_1.ScheduleStatus.PENDING })
                .andWhere('schedule.scheduledFor <= :now', { now: new Date() })
                .limit(100)
                .getMany();
            this.logger.log(`Processing ${pendingSchedules.length} pending schedules`);
            for (const schedule of pendingSchedules) {
                await this.resumeExecution(schedule.id);
            }
        }
    };
    return WorkflowExecutorService = _classThis;
})();
exports.WorkflowExecutorService = WorkflowExecutorService;
//# sourceMappingURL=workflow-executor.service.js.map