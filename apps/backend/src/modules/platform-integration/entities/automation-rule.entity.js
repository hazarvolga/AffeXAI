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
exports.AutomationRule = exports.AutomationActionType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const automation_approval_entity_1 = require("./automation-approval.entity");
/**
 * Automation Action Types
 */
var AutomationActionType;
(function (AutomationActionType) {
    // Email Marketing Actions
    AutomationActionType["CREATE_CAMPAIGN"] = "email.create_campaign";
    AutomationActionType["SEND_EMAIL"] = "email.send";
    AutomationActionType["ADD_TO_SEGMENT"] = "email.add_to_segment";
    AutomationActionType["REMOVE_FROM_SEGMENT"] = "email.remove_from_segment";
    // Notification Actions
    AutomationActionType["SEND_NOTIFICATION"] = "notification.send";
    AutomationActionType["SEND_SMS"] = "notification.sms";
    // Webhook Actions
    AutomationActionType["TRIGGER_WEBHOOK"] = "webhook.trigger";
    // CMS Actions
    AutomationActionType["CREATE_PAGE_DRAFT"] = "cms.create_draft";
    AutomationActionType["PUBLISH_PAGE"] = "cms.publish";
    AutomationActionType["ARCHIVE_PAGE"] = "cms.archive";
    // Future: Social Media (v2.0)
    // POST_TO_SOCIAL = 'social.post',
    // SCHEDULE_POST = 'social.schedule',
    // Future: Support (v2.0)
    // ASSIGN_TICKET = 'support.assign',
    // NOTIFY_AGENT = 'support.notify_agent',
})(AutomationActionType || (exports.AutomationActionType = AutomationActionType = {}));
/**
 * Automation Rule Entity
 *
 * Defines rules for automatic actions when platform events occur
 *
 * Example:
 * - When event.created → Create email campaign
 * - When certificate.issued → Send congratulations email
 * - When page.published → Add to email newsletter segment
 */
let AutomationRule = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('automation_rules'), (0, typeorm_1.Index)('idx_automation_rules_trigger', ['triggerEventType']), (0, typeorm_1.Index)('idx_automation_rules_active', ['isActive']), (0, typeorm_1.Index)('idx_automation_rules_deleted', ['deletedAt'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _triggerEventType_decorators;
    let _triggerEventType_initializers = [];
    let _triggerEventType_extraInitializers = [];
    let _triggerConditions_decorators;
    let _triggerConditions_initializers = [];
    let _triggerConditions_extraInitializers = [];
    let _actions_decorators;
    let _actions_initializers = [];
    let _actions_extraInitializers = [];
    let _priority_decorators;
    let _priority_initializers = [];
    let _priority_extraInitializers = [];
    let _requiresApproval_decorators;
    let _requiresApproval_initializers = [];
    let _requiresApproval_extraInitializers = [];
    let _impactLevel_decorators;
    let _impactLevel_initializers = [];
    let _impactLevel_extraInitializers = [];
    let _autoApprovalConditions_decorators;
    let _autoApprovalConditions_initializers = [];
    let _autoApprovalConditions_extraInitializers = [];
    let _authorizedApprovers_decorators;
    let _authorizedApprovers_initializers = [];
    let _authorizedApprovers_extraInitializers = [];
    let _executionCount_decorators;
    let _executionCount_initializers = [];
    let _executionCount_extraInitializers = [];
    let _lastExecutedAt_decorators;
    let _lastExecutedAt_initializers = [];
    let _lastExecutedAt_extraInitializers = [];
    let _lastExecutionResult_decorators;
    let _lastExecutionResult_initializers = [];
    let _lastExecutionResult_extraInitializers = [];
    var AutomationRule = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _name_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 255,
                })];
            _description_decorators = [(0, typeorm_1.Column)({
                    type: 'text',
                    nullable: true,
                })];
            _isActive_decorators = [(0, typeorm_1.Column)({
                    type: 'boolean',
                    default: true,
                }), (0, typeorm_1.Index)()];
            _triggerEventType_decorators = [(0, typeorm_1.Column)({
                    type: 'varchar',
                    length: 100,
                }), (0, typeorm_1.Index)()];
            _triggerConditions_decorators = [(0, typeorm_1.Column)({
                    type: 'jsonb',
                    default: {},
                })];
            _actions_decorators = [(0, typeorm_1.Column)({
                    type: 'jsonb',
                })];
            _priority_decorators = [(0, typeorm_1.Column)({
                    type: 'int',
                    default: 0,
                })];
            _requiresApproval_decorators = [(0, typeorm_1.Column)({
                    type: 'boolean',
                    default: false,
                    name: 'requires_approval',
                })];
            _impactLevel_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: automation_approval_entity_1.ActionImpactLevel,
                    default: automation_approval_entity_1.ActionImpactLevel.MEDIUM,
                    name: 'impact_level',
                })];
            _autoApprovalConditions_decorators = [(0, typeorm_1.Column)({
                    type: 'jsonb',
                    nullable: true,
                    name: 'auto_approval_conditions',
                })];
            _authorizedApprovers_decorators = [(0, typeorm_1.Column)({
                    type: 'jsonb',
                    default: [],
                    name: 'authorized_approvers',
                })];
            _executionCount_decorators = [(0, typeorm_1.Column)({
                    type: 'int',
                    default: 0,
                })];
            _lastExecutedAt_decorators = [(0, typeorm_1.Column)({
                    type: 'timestamp',
                    nullable: true,
                })];
            _lastExecutionResult_decorators = [(0, typeorm_1.Column)({
                    type: 'jsonb',
                    nullable: true,
                })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _triggerEventType_decorators, { kind: "field", name: "triggerEventType", static: false, private: false, access: { has: obj => "triggerEventType" in obj, get: obj => obj.triggerEventType, set: (obj, value) => { obj.triggerEventType = value; } }, metadata: _metadata }, _triggerEventType_initializers, _triggerEventType_extraInitializers);
            __esDecorate(null, null, _triggerConditions_decorators, { kind: "field", name: "triggerConditions", static: false, private: false, access: { has: obj => "triggerConditions" in obj, get: obj => obj.triggerConditions, set: (obj, value) => { obj.triggerConditions = value; } }, metadata: _metadata }, _triggerConditions_initializers, _triggerConditions_extraInitializers);
            __esDecorate(null, null, _actions_decorators, { kind: "field", name: "actions", static: false, private: false, access: { has: obj => "actions" in obj, get: obj => obj.actions, set: (obj, value) => { obj.actions = value; } }, metadata: _metadata }, _actions_initializers, _actions_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: obj => "priority" in obj, get: obj => obj.priority, set: (obj, value) => { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _requiresApproval_decorators, { kind: "field", name: "requiresApproval", static: false, private: false, access: { has: obj => "requiresApproval" in obj, get: obj => obj.requiresApproval, set: (obj, value) => { obj.requiresApproval = value; } }, metadata: _metadata }, _requiresApproval_initializers, _requiresApproval_extraInitializers);
            __esDecorate(null, null, _impactLevel_decorators, { kind: "field", name: "impactLevel", static: false, private: false, access: { has: obj => "impactLevel" in obj, get: obj => obj.impactLevel, set: (obj, value) => { obj.impactLevel = value; } }, metadata: _metadata }, _impactLevel_initializers, _impactLevel_extraInitializers);
            __esDecorate(null, null, _autoApprovalConditions_decorators, { kind: "field", name: "autoApprovalConditions", static: false, private: false, access: { has: obj => "autoApprovalConditions" in obj, get: obj => obj.autoApprovalConditions, set: (obj, value) => { obj.autoApprovalConditions = value; } }, metadata: _metadata }, _autoApprovalConditions_initializers, _autoApprovalConditions_extraInitializers);
            __esDecorate(null, null, _authorizedApprovers_decorators, { kind: "field", name: "authorizedApprovers", static: false, private: false, access: { has: obj => "authorizedApprovers" in obj, get: obj => obj.authorizedApprovers, set: (obj, value) => { obj.authorizedApprovers = value; } }, metadata: _metadata }, _authorizedApprovers_initializers, _authorizedApprovers_extraInitializers);
            __esDecorate(null, null, _executionCount_decorators, { kind: "field", name: "executionCount", static: false, private: false, access: { has: obj => "executionCount" in obj, get: obj => obj.executionCount, set: (obj, value) => { obj.executionCount = value; } }, metadata: _metadata }, _executionCount_initializers, _executionCount_extraInitializers);
            __esDecorate(null, null, _lastExecutedAt_decorators, { kind: "field", name: "lastExecutedAt", static: false, private: false, access: { has: obj => "lastExecutedAt" in obj, get: obj => obj.lastExecutedAt, set: (obj, value) => { obj.lastExecutedAt = value; } }, metadata: _metadata }, _lastExecutedAt_initializers, _lastExecutedAt_extraInitializers);
            __esDecorate(null, null, _lastExecutionResult_decorators, { kind: "field", name: "lastExecutionResult", static: false, private: false, access: { has: obj => "lastExecutionResult" in obj, get: obj => obj.lastExecutionResult, set: (obj, value) => { obj.lastExecutionResult = value; } }, metadata: _metadata }, _lastExecutionResult_initializers, _lastExecutionResult_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AutomationRule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        /**
         * Rule name
         */
        name = __runInitializers(this, _name_initializers, void 0);
        /**
         * Rule description
         */
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        /**
         * Is rule active?
         */
        isActive = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        /**
         * Event type that triggers this rule
         */
        triggerEventType = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _triggerEventType_initializers, void 0));
        /**
         * Conditions that must be met for rule to trigger
         *
         * Examples:
         * - { "status": "published" } - Only if event status is published
         * - { "category": "blog" } - Only if page category is blog
         * - { "attendeeCount": { "$gt": 50 } } - Only if attendee count > 50
         */
        triggerConditions = (__runInitializers(this, _triggerEventType_extraInitializers), __runInitializers(this, _triggerConditions_initializers, void 0));
        /**
         * Actions to execute when rule triggers
         *
         * Example:
         * [
         *   {
         *     type: 'email.create_campaign',
         *     config: { templateId: 'xxx', segmentId: 'yyy' },
         *     order: 1
         *   },
         *   {
         *     type: 'notification.send',
         *     config: { recipients: ['admin'], message: 'New campaign created' },
         *     order: 2
         *   }
         * ]
         */
        actions = (__runInitializers(this, _triggerConditions_extraInitializers), __runInitializers(this, _actions_initializers, void 0));
        /**
         * Priority (higher = executed first)
         */
        priority = (__runInitializers(this, _actions_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
        /**
         * APPROVAL SETTINGS
         * Controls if and how this automation requires approval
         */
        /**
         * Does this rule require approval before execution?
         */
        requiresApproval = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _requiresApproval_initializers, void 0));
        /**
         * Impact level of this automation's actions
         * Determines approval requirements
         */
        impactLevel = (__runInitializers(this, _requiresApproval_extraInitializers), __runInitializers(this, _impactLevel_initializers, void 0));
        /**
         * Auto-approval conditions
         * If these conditions are met, approval can be skipped
         *
         * Examples:
         * - { "eventSource": "admin" } - Auto-approve if triggered by admin
         * - { "userRole": "manager" } - Auto-approve if user is manager
         * - { "affectedUsers": { "$lt": 10 } } - Auto-approve if < 10 users affected
         */
        autoApprovalConditions = (__runInitializers(this, _impactLevel_extraInitializers), __runInitializers(this, _autoApprovalConditions_initializers, void 0));
        /**
         * List of user IDs who can approve this automation
         * Empty array = any admin can approve
         */
        authorizedApprovers = (__runInitializers(this, _autoApprovalConditions_extraInitializers), __runInitializers(this, _authorizedApprovers_initializers, void 0));
        /**
         * Total number of times this rule has been executed
         */
        executionCount = (__runInitializers(this, _authorizedApprovers_extraInitializers), __runInitializers(this, _executionCount_initializers, void 0));
        /**
         * Last time this rule was executed
         */
        lastExecutedAt = (__runInitializers(this, _executionCount_extraInitializers), __runInitializers(this, _lastExecutedAt_initializers, void 0));
        /**
         * Last execution result
         */
        lastExecutionResult = (__runInitializers(this, _lastExecutedAt_extraInitializers), __runInitializers(this, _lastExecutionResult_initializers, void 0));
        // Timestamps inherited from BaseEntity
        // @CreateDateColumn() createdAt: Date
        // @UpdateDateColumn() updatedAt: Date
        // @DeleteDateColumn() deletedAt: Date | null
        /**
         * Check if rule should trigger for given event
         */
        shouldTrigger(event) {
            // Check if event type matches
            if (event.eventType !== this.triggerEventType) {
                return false;
            }
            // Check if rule is active
            if (!this.isActive) {
                return false;
            }
            // Check conditions
            return this.matchesConditions(event.payload);
        }
        /**
         * Check if event payload matches trigger conditions
         */
        matchesConditions(payload) {
            // If no conditions, always match
            if (!this.triggerConditions || Object.keys(this.triggerConditions).length === 0) {
                return true;
            }
            // Check each condition
            for (const [key, value] of Object.entries(this.triggerConditions)) {
                const payloadValue = payload[key];
                // Handle operators like $gt, $lt, etc.
                if (typeof value === 'object' && value !== null) {
                    for (const [operator, operandValue] of Object.entries(value)) {
                        switch (operator) {
                            case '$gt':
                                if (!(payloadValue > operandValue))
                                    return false;
                                break;
                            case '$gte':
                                if (!(payloadValue >= operandValue))
                                    return false;
                                break;
                            case '$lt':
                                if (!(payloadValue < operandValue))
                                    return false;
                                break;
                            case '$lte':
                                if (!(payloadValue <= operandValue))
                                    return false;
                                break;
                            case '$ne':
                                if (payloadValue === operandValue)
                                    return false;
                                break;
                            case '$in':
                                if (!Array.isArray(operandValue) || !operandValue.includes(payloadValue)) {
                                    return false;
                                }
                                break;
                            default:
                                // Unknown operator
                                return false;
                        }
                    }
                }
                else {
                    // Simple equality check
                    if (payloadValue !== value) {
                        return false;
                    }
                }
            }
            return true;
        }
        /**
         * Record execution
         */
        recordExecution(success, error, actionsExecuted) {
            this.executionCount++;
            this.lastExecutedAt = new Date();
            this.lastExecutionResult = {
                success,
                error,
                actionsExecuted: actionsExecuted || 0,
                timestamp: new Date(),
            };
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _lastExecutionResult_extraInitializers);
        }
    };
    return AutomationRule = _classThis;
})();
exports.AutomationRule = AutomationRule;
//# sourceMappingURL=automation-rule.entity.js.map