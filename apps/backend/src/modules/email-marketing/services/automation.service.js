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
exports.AutomationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const email_automation_entity_1 = require("../entities/email-automation.entity");
const automation_execution_entity_1 = require("../entities/automation-execution.entity");
const automation_trigger_entity_1 = require("../entities/automation-trigger.entity");
/**
 * Automation Service
 * Manages email automation workflows
 */
let AutomationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AutomationService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AutomationService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        automationRepo;
        executionRepo;
        triggerRepo;
        subscriberRepo;
        triggerEvaluator;
        logger = new common_1.Logger(AutomationService.name);
        constructor(automationRepo, executionRepo, triggerRepo, subscriberRepo, triggerEvaluator) {
            this.automationRepo = automationRepo;
            this.executionRepo = executionRepo;
            this.triggerRepo = triggerRepo;
            this.subscriberRepo = subscriberRepo;
            this.triggerEvaluator = triggerEvaluator;
        }
        /**
         * Create automation
         */
        async create(dto) {
            // Validate workflow steps
            this.validateWorkflowSteps(dto.workflowSteps);
            const automation = this.automationRepo.create({
                name: dto.name,
                description: dto.description,
                triggerType: dto.triggerType,
                triggerConfig: dto.triggerConfig,
                workflowSteps: dto.workflowSteps,
                segmentId: dto.segmentId,
                status: email_automation_entity_1.AutomationStatus.DRAFT,
                isActive: false,
            });
            const saved = await this.automationRepo.save(automation);
            this.logger.log(`Created automation: ${saved.id}`);
            return saved;
        }
        /**
         * Find all automations
         */
        async findAll() {
            return this.automationRepo.find({
                order: { createdAt: 'DESC' },
            });
        }
        /**
         * Find automation by ID
         */
        async findOne(id) {
            const automation = await this.automationRepo.findOne({
                where: { id },
                relations: ['segment'],
            });
            if (!automation) {
                throw new common_1.NotFoundException(`Automation ${id} not found`);
            }
            return automation;
        }
        /**
         * Update automation
         */
        async update(id, dto) {
            const automation = await this.findOne(id);
            // Prevent editing active automations
            if (automation.isActive && dto.workflowSteps) {
                throw new common_1.BadRequestException('Cannot modify workflow of active automation');
            }
            // Validate workflow steps if provided
            if (dto.workflowSteps) {
                this.validateWorkflowSteps(dto.workflowSteps);
            }
            Object.assign(automation, dto);
            const updated = await this.automationRepo.save(automation);
            this.logger.log(`Updated automation: ${id}`);
            return updated;
        }
        /**
         * Delete automation
         */
        async remove(id) {
            const automation = await this.findOne(id);
            if (automation.isActive) {
                throw new common_1.BadRequestException('Cannot delete active automation. Pause it first.');
            }
            await this.automationRepo.softRemove(automation);
            this.logger.log(`Deleted automation: ${id}`);
        }
        /**
         * Activate automation
         */
        async activate(id, registerExisting = false) {
            const automation = await this.findOne(id);
            if (!automation.canBeActivated()) {
                throw new common_1.BadRequestException('Automation cannot be activated. Check workflow steps.');
            }
            automation.activate();
            const activated = await this.automationRepo.save(automation);
            // Register existing subscribers if requested
            if (registerExisting) {
                await this.registerExistingSubscribers(automation);
            }
            this.logger.log(`Activated automation: ${id}`);
            return activated;
        }
        /**
         * Pause automation
         */
        async pause(id, cancelPending = false) {
            const automation = await this.findOne(id);
            automation.pause();
            const paused = await this.automationRepo.save(automation);
            // Cancel pending executions if requested
            if (cancelPending) {
                await this.executionRepo.update({
                    automationId: id,
                    status: (0, typeorm_1.In)([automation_execution_entity_1.ExecutionStatus.PENDING, automation_execution_entity_1.ExecutionStatus.RUNNING]),
                }, { status: automation_execution_entity_1.ExecutionStatus.CANCELLED });
            }
            this.logger.log(`Paused automation: ${id}`);
            return paused;
        }
        /**
         * Get executions with pagination
         */
        async getExecutions(query) {
            const { automationId, subscriberId, status, page = 1, limit = 20 } = query;
            const qb = this.executionRepo
                .createQueryBuilder('execution')
                .leftJoinAndSelect('execution.automation', 'automation')
                .leftJoinAndSelect('execution.subscriber', 'subscriber');
            if (automationId) {
                qb.andWhere('execution.automationId = :automationId', { automationId });
            }
            if (subscriberId) {
                qb.andWhere('execution.subscriberId = :subscriberId', { subscriberId });
            }
            if (status) {
                qb.andWhere('execution.status = :status', { status });
            }
            const total = await qb.getCount();
            const executions = await qb
                .orderBy('execution.createdAt', 'DESC')
                .skip((page - 1) * limit)
                .take(limit)
                .getMany();
            return {
                executions,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        /**
         * Get automation analytics
         */
        async getAnalytics(automationId, startDate, endDate) {
            const automation = await this.findOne(automationId);
            const qb = this.executionRepo
                .createQueryBuilder('execution')
                .where('execution.automationId = :automationId', { automationId });
            if (startDate) {
                qb.andWhere('execution.createdAt >= :startDate', { startDate });
            }
            if (endDate) {
                qb.andWhere('execution.createdAt <= :endDate', { endDate });
            }
            const executions = await qb.getMany();
            const totalExecutions = executions.length;
            const completedExecutions = executions.filter((e) => e.status === automation_execution_entity_1.ExecutionStatus.COMPLETED).length;
            const failedExecutions = executions.filter((e) => e.status === automation_execution_entity_1.ExecutionStatus.FAILED).length;
            const successRate = totalExecutions > 0 ? (completedExecutions / totalExecutions) * 100 : 0;
            const avgExecutionTime = executions.length > 0
                ? executions.reduce((sum, e) => sum + (e.executionTime || 0), 0) /
                    executions.length
                : 0;
            // Step performance
            const stepPerformance = this.calculateStepPerformance(executions, automation.workflowSteps);
            // Timeline (group by day)
            const timeline = this.calculateTimeline(executions);
            return {
                automationId: automation.id,
                automationName: automation.name,
                totalExecutions,
                completedExecutions,
                failedExecutions,
                successRate: Math.round(successRate * 100) / 100,
                avgExecutionTime: Math.round(avgExecutionTime),
                totalSubscribers: automation.subscriberCount,
                activeSubscribers: await this.getActiveSubscriberCount(automationId),
                stepPerformance,
                timeline,
            };
        }
        /**
         * Test automation with a subscriber
         */
        async test(automationId, subscriberId, dryRun = true) {
            const automation = await this.findOne(automationId);
            const subscriber = await this.subscriberRepo.findOne({
                where: { id: subscriberId },
            });
            if (!subscriber) {
                throw new common_1.NotFoundException(`Subscriber ${subscriberId} not found`);
            }
            if (dryRun) {
                // Simulate execution without actually sending emails
                return {
                    automation: {
                        id: automation.id,
                        name: automation.name,
                    },
                    subscriber: {
                        id: subscriber.id,
                        email: subscriber.email,
                    },
                    steps: automation.workflowSteps.map((step) => ({
                        id: step.id,
                        type: step.type,
                        config: step.config,
                        status: 'simulated',
                    })),
                    message: 'Test simulation completed successfully',
                };
            }
            // Create actual test execution
            const execution = this.executionRepo.create({
                automationId,
                subscriberId,
                status: automation_execution_entity_1.ExecutionStatus.PENDING,
            });
            await this.executionRepo.save(execution);
            return {
                executionId: execution.id,
                message: 'Test execution created',
            };
        }
        /**
         * Private: Validate workflow steps
         */
        validateWorkflowSteps(steps) {
            if (!steps || steps.length === 0) {
                throw new common_1.BadRequestException('Workflow must have at least one step');
            }
            // Check unique step IDs
            const stepIds = steps.map((s) => s.id);
            const uniqueIds = new Set(stepIds);
            if (stepIds.length !== uniqueIds.size) {
                throw new common_1.BadRequestException('Workflow steps must have unique IDs');
            }
            // Validate step references
            for (const step of steps) {
                if (step.nextStepId && !stepIds.includes(step.nextStepId)) {
                    throw new common_1.BadRequestException(`Invalid nextStepId reference: ${step.nextStepId}`);
                }
                if (step.conditionalPaths) {
                    for (const path of step.conditionalPaths) {
                        if (!stepIds.includes(path.nextStepId)) {
                            throw new common_1.BadRequestException(`Invalid conditional path nextStepId: ${path.nextStepId}`);
                        }
                    }
                }
                // Validate step config based on type
                this.validateStepConfig(step);
            }
        }
        /**
         * Private: Validate step configuration
         */
        validateStepConfig(step) {
            switch (step.type) {
                case 'send_email':
                    if (!step.config.templateId && !step.config.subject) {
                        throw new common_1.BadRequestException(`send_email step ${step.id} requires templateId or subject`);
                    }
                    break;
                case 'delay':
                    if (!step.config.duration || typeof step.config.duration !== 'number') {
                        throw new common_1.BadRequestException(`delay step ${step.id} requires duration (number in minutes)`);
                    }
                    break;
                case 'condition':
                    if (!step.config.condition || !step.conditionalPaths) {
                        throw new common_1.BadRequestException(`condition step ${step.id} requires condition and conditionalPaths`);
                    }
                    break;
                case 'split':
                    if (!step.conditionalPaths || step.conditionalPaths.length < 2) {
                        throw new common_1.BadRequestException(`split step ${step.id} requires at least 2 conditional paths`);
                    }
                    break;
                case 'exit':
                    // No specific validation for exit step
                    break;
                default:
                    throw new common_1.BadRequestException(`Invalid step type: ${step.type}`);
            }
        }
        /**
         * Private: Register existing subscribers
         */
        async registerExistingSubscribers(automation) {
            let subscribers;
            if (automation.segmentId) {
                subscribers = await this.subscriberRepo
                    .createQueryBuilder('subscriber')
                    .where('subscriber.status = :status', { status: 'active' })
                    .andWhere(':segmentId = ANY(subscriber.segments)', {
                    segmentId: automation.segmentId,
                })
                    .getMany();
            }
            else {
                subscribers = await this.subscriberRepo.find({
                    where: { status: 'active' },
                });
            }
            for (const subscriber of subscribers) {
                const existingTrigger = await this.triggerRepo.findOne({
                    where: {
                        automationId: automation.id,
                        subscriberId: subscriber.id,
                    },
                });
                if (!existingTrigger) {
                    const trigger = this.triggerRepo.create({
                        automationId: automation.id,
                        subscriberId: subscriber.id,
                        triggerType: automation.triggerType,
                        triggerData: { source: 'existing_subscribers' },
                        status: automation_trigger_entity_1.TriggerStatus.PENDING,
                    });
                    await this.triggerRepo.save(trigger);
                }
            }
            this.logger.log(`Registered ${subscribers.length} existing subscribers to automation ${automation.id}`);
        }
        /**
         * Private: Calculate step performance
         */
        calculateStepPerformance(executions, workflowSteps) {
            const stepStats = new Map();
            for (const step of workflowSteps) {
                stepStats.set(step.id, {
                    stepId: step.id,
                    stepType: step.type,
                    totalExecutions: 0,
                    successfulExecutions: 0,
                    failedExecutions: 0,
                    totalTime: 0,
                });
            }
            for (const execution of executions) {
                for (const result of execution.stepResults || []) {
                    const stats = stepStats.get(result.stepId);
                    if (stats) {
                        stats.totalExecutions++;
                        if (result.status === 'completed') {
                            stats.successfulExecutions++;
                        }
                        else if (result.status === 'failed') {
                            stats.failedExecutions++;
                        }
                        stats.totalTime += result.executionTime || 0;
                    }
                }
            }
            return Array.from(stepStats.values()).map((stats) => ({
                ...stats,
                avgExecutionTime: stats.totalExecutions > 0
                    ? Math.round(stats.totalTime / stats.totalExecutions)
                    : 0,
            }));
        }
        /**
         * Private: Calculate timeline
         */
        calculateTimeline(executions) {
            const timeline = new Map();
            for (const execution of executions) {
                const date = execution.createdAt.toISOString().split('T')[0];
                const stats = timeline.get(date) || {
                    date,
                    executions: 0,
                    completed: 0,
                    failed: 0,
                };
                stats.executions++;
                if (execution.status === automation_execution_entity_1.ExecutionStatus.COMPLETED) {
                    stats.completed++;
                }
                else if (execution.status === automation_execution_entity_1.ExecutionStatus.FAILED) {
                    stats.failed++;
                }
                timeline.set(date, stats);
            }
            return Array.from(timeline.values()).sort((a, b) => a.date.localeCompare(b.date));
        }
        /**
         * Private: Get active subscriber count
         */
        async getActiveSubscriberCount(automationId) {
            return this.executionRepo.count({
                where: {
                    automationId,
                    status: (0, typeorm_1.In)([automation_execution_entity_1.ExecutionStatus.PENDING, automation_execution_entity_1.ExecutionStatus.RUNNING]),
                },
            });
        }
    };
    return AutomationService = _classThis;
})();
exports.AutomationService = AutomationService;
//# sourceMappingURL=automation.service.js.map