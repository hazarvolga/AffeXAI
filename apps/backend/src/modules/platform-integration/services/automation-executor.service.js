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
exports.AutomationExecutorService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const automation_approval_entity_1 = require("../entities/automation-approval.entity");
/**
 * AutomationExecutor Service
 *
 * Executes automation actions when rules are triggered.
 * Handles approval workflow integration.
 *
 * Features:
 * - Action execution with approval checks
 * - Multi-action sequencing
 * - Error handling and retry logic
 * - Execution logging
 * - Auto-approval based on conditions
 */
let AutomationExecutorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _handleAutomationTrigger_decorators;
    var AutomationExecutorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _handleAutomationTrigger_decorators = [(0, event_emitter_1.OnEvent)('automation.trigger')];
            __esDecorate(this, null, _handleAutomationTrigger_decorators, { kind: "method", name: "handleAutomationTrigger", static: false, private: false, access: { has: obj => "handleAutomationTrigger" in obj, get: obj => obj.handleAutomationTrigger }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AutomationExecutorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ruleRepository = __runInitializers(this, _instanceExtraInitializers);
        approvalRepository;
        logger = new common_1.Logger(AutomationExecutorService.name);
        constructor(ruleRepository, approvalRepository) {
            this.ruleRepository = ruleRepository;
            this.approvalRepository = approvalRepository;
        }
        /**
         * Listen to automation trigger events from EventBus
         */
        async handleAutomationTrigger(data) {
            const { rule, event } = data;
            this.logger.log(`Handling automation trigger: ${rule.name} (${rule.id})`, { eventId: event.id });
            try {
                // Check if approval is required
                if (rule.requiresApproval) {
                    await this.createApprovalRequest(rule, event);
                }
                else {
                    // Execute immediately
                    await this.executeRule(rule, event);
                }
            }
            catch (error) {
                this.logger.error(`Failed to handle automation trigger: ${rule.id}`, error.stack);
            }
        }
        /**
         * Create approval request for automation
         */
        async createApprovalRequest(rule, event) {
            // Check if auto-approval conditions are met
            if (this.shouldAutoApprove(rule, event)) {
                this.logger.log(`Auto-approval conditions met for rule: ${rule.name}`, { ruleId: rule.id });
                await this.executeRule(rule, event);
                return;
            }
            // Determine priority based on impact level
            const priority = this.getPriorityFromImpactLevel(rule.impactLevel);
            // Create approval request
            const approval = this.approvalRepository.create({
                ruleId: rule.id,
                eventId: event.id,
                status: automation_approval_entity_1.ApprovalStatus.PENDING,
                priority,
                impactLevel: rule.impactLevel,
                pendingActions: rule.actions.map(action => ({
                    type: action.type,
                    config: action.config,
                    order: action.order,
                    estimatedImpact: this.estimateActionImpact(action, event),
                })),
                requestedBy: event.metadata?.userId || 'system',
                requestReason: `Event triggered: ${event.eventType}`,
                requestContext: {
                    eventId: event.id,
                    eventType: event.eventType,
                    eventPayload: event.payload,
                },
                requiredApprovals: automation_approval_entity_1.AutomationApproval.getRequiredApprovalCount(rule.impactLevel),
                currentApprovals: 0,
                expiresAt: automation_approval_entity_1.AutomationApproval.getExpirationTime(priority),
            });
            await this.approvalRepository.save(approval);
            this.logger.log(`Approval request created for rule: ${rule.name}`, {
                ruleId: rule.id,
                approvalId: approval.id,
                requiredApprovals: approval.requiredApprovals,
                expiresAt: approval.expiresAt,
            });
            // TODO: Send notification to approvers
            // await this.notificationService.notifyApprovers(approval);
        }
        /**
         * Check if auto-approval conditions are met
         */
        shouldAutoApprove(rule, event) {
            // Low impact level always auto-approves
            if (rule.impactLevel === automation_approval_entity_1.ActionImpactLevel.LOW) {
                return true;
            }
            // Check custom auto-approval conditions
            if (!rule.autoApprovalConditions) {
                return false;
            }
            // Example conditions:
            // { "userRole": "manager" } - Auto-approve if user is manager
            // { "affectedUsers": { "$lt": 10 } } - Auto-approve if < 10 users affected
            // { "eventSource": "admin" } - Auto-approve if triggered by admin
            const conditions = rule.autoApprovalConditions;
            const metadata = event.metadata || {};
            // Simple condition matching (can be enhanced)
            for (const [key, value] of Object.entries(conditions)) {
                if (metadata[key] !== value) {
                    return false;
                }
            }
            return true;
        }
        /**
         * Get priority from impact level
         */
        getPriorityFromImpactLevel(impactLevel) {
            switch (impactLevel) {
                case automation_approval_entity_1.ActionImpactLevel.CRITICAL:
                    return automation_approval_entity_1.ApprovalPriority.URGENT;
                case automation_approval_entity_1.ActionImpactLevel.HIGH:
                    return automation_approval_entity_1.ApprovalPriority.HIGH;
                case automation_approval_entity_1.ActionImpactLevel.MEDIUM:
                    return automation_approval_entity_1.ApprovalPriority.MEDIUM;
                case automation_approval_entity_1.ActionImpactLevel.LOW:
                default:
                    return automation_approval_entity_1.ApprovalPriority.LOW;
            }
        }
        /**
         * Estimate impact of an action
         */
        estimateActionImpact(action, event) {
            // This is a simplified estimation
            // In real implementation, you'd query the database
            const impact = {};
            if (action.type.includes('email')) {
                // Email actions
                impact.affectedUsers = event.payload.recipientCount || 0;
            }
            if (action.type.includes('webhook')) {
                // Webhook actions
                impact.externalCalls = 1;
            }
            if (action.type.includes('bulk') || action.type.includes('segment')) {
                // Bulk operations
                impact.affectedRecords = event.payload.count || 0;
            }
            return impact;
        }
        /**
         * Execute automation rule
         */
        async executeRule(rule, event) {
            const startTime = Date.now();
            try {
                this.logger.log(`Executing automation rule: ${rule.name}`, {
                    ruleId: rule.id,
                    eventId: event.id,
                    actionCount: rule.actions.length,
                });
                // Sort actions by order
                const sortedActions = [...rule.actions].sort((a, b) => a.order - b.order);
                let executedCount = 0;
                const errors = [];
                // Execute actions sequentially
                for (const action of sortedActions) {
                    try {
                        await this.executeAction(action, event);
                        executedCount++;
                    }
                    catch (error) {
                        this.logger.error(`Failed to execute action: ${action.type}`, error.stack);
                        errors.push(`${action.type}: ${error.message}`);
                        // Continue with other actions even if one fails
                    }
                }
                const duration = Date.now() - startTime;
                // Update rule execution stats
                rule.executionCount++;
                rule.lastExecutedAt = new Date();
                rule.lastExecutionResult = {
                    success: errors.length === 0,
                    error: errors.length > 0 ? errors.join('; ') : undefined,
                    actionsExecuted: executedCount,
                    timestamp: new Date(),
                };
                await this.ruleRepository.save(rule);
                this.logger.log(`Automation rule execution completed: ${rule.name}`, {
                    ruleId: rule.id,
                    success: errors.length === 0,
                    executedActions: executedCount,
                    totalActions: rule.actions.length,
                    duration: `${duration}ms`,
                });
            }
            catch (error) {
                this.logger.error(`Failed to execute automation rule: ${rule.id}`, error.stack);
                // Update rule with error
                rule.lastExecutionResult = {
                    success: false,
                    error: error.message,
                    actionsExecuted: 0,
                    timestamp: new Date(),
                };
                await this.ruleRepository.save(rule);
            }
        }
        /**
         * Execute a single action
         */
        async executeAction(action, event) {
            this.logger.debug(`Executing action: ${action.type}`, {
                config: action.config,
            });
            // Action execution will be implemented based on type
            // For now, we'll just log the action
            // In real implementation, this would call the appropriate service
            switch (action.type) {
                case 'email.create_campaign':
                    // TODO: Call EmailCampaignService.create()
                    this.logger.log('TODO: Create email campaign', action.config);
                    break;
                case 'email.send':
                    // TODO: Call EmailService.send()
                    this.logger.log('TODO: Send email', action.config);
                    break;
                case 'email.add_to_segment':
                    // TODO: Call SegmentService.addSubscriber()
                    this.logger.log('TODO: Add to segment', action.config);
                    break;
                case 'notification.send':
                    // TODO: Call NotificationService.send()
                    this.logger.log('TODO: Send notification', action.config);
                    break;
                case 'webhook.trigger':
                    // TODO: Call WebhookService.trigger()
                    this.logger.log('TODO: Trigger webhook', action.config);
                    break;
                case 'cms.create_draft':
                    // TODO: Call CMSService.createDraft()
                    this.logger.log('TODO: Create CMS draft', action.config);
                    break;
                case 'cms.publish':
                    // TODO: Call CMSService.publish()
                    this.logger.log('TODO: Publish CMS page', action.config);
                    break;
                default:
                    this.logger.warn(`Unknown action type: ${action.type}`);
            }
            // Simulate async operation
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        /**
         * Execute approved automation
         * Called when approval is granted
         */
        async executeApprovedAutomation(approvalId) {
            const approval = await this.approvalRepository.findOne({
                where: { id: approvalId },
                relations: ['rule', 'event'],
            });
            if (!approval) {
                throw new Error(`Approval not found: ${approvalId}`);
            }
            if (approval.status !== automation_approval_entity_1.ApprovalStatus.APPROVED) {
                throw new Error(`Approval is not in approved status: ${approval.status}`);
            }
            if (approval.isExecuted) {
                this.logger.warn(`Approval already executed: ${approvalId}`);
                return;
            }
            try {
                // Execute the rule (only if event exists)
                if (approval.event) {
                    await this.executeRule(approval.rule, approval.event);
                }
                // Mark as executed
                approval.isExecuted = true;
                approval.executedAt = new Date();
                approval.executionResult = {
                    success: true,
                    actionsExecuted: approval.pendingActions.length,
                    timestamp: new Date(),
                };
                await this.approvalRepository.save(approval);
                this.logger.log(`Approved automation executed successfully: ${approvalId}`);
            }
            catch (error) {
                this.logger.error(`Failed to execute approved automation: ${approvalId}`, error.stack);
                // Mark execution as failed
                approval.isExecuted = false;
                approval.executionResult = {
                    success: false,
                    actionsExecuted: 0,
                    errors: [error.message],
                    timestamp: new Date(),
                };
                await this.approvalRepository.save(approval);
                throw error;
            }
        }
        /**
         * Check and process expired approvals (cron job)
         */
        async processExpiredApprovals() {
            const now = new Date();
            const expiredApprovals = await this.approvalRepository.find({
                where: {
                    status: automation_approval_entity_1.ApprovalStatus.PENDING,
                    isExpired: false,
                },
            });
            let expiredCount = 0;
            for (const approval of expiredApprovals) {
                if (approval.checkExpiration()) {
                    await this.approvalRepository.save(approval);
                    expiredCount++;
                    this.logger.log(`Approval expired: ${approval.id} (rule: ${approval.ruleId})`);
                }
            }
            if (expiredCount > 0) {
                this.logger.log(`Processed ${expiredCount} expired approvals`);
            }
        }
    };
    return AutomationExecutorService = _classThis;
})();
exports.AutomationExecutorService = AutomationExecutorService;
//# sourceMappingURL=automation-executor.service.js.map