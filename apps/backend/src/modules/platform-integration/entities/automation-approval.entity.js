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
exports.AutomationApproval = exports.ActionImpactLevel = exports.ApprovalPriority = exports.ApprovalStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entities/base.entity");
const automation_rule_entity_1 = require("./automation-rule.entity");
const platform_event_entity_1 = require("./platform-event.entity");
/**
 * Approval Status for Automation Actions
 * Tracks the lifecycle of an automation that requires approval
 */
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["PENDING"] = "pending";
    ApprovalStatus["APPROVED"] = "approved";
    ApprovalStatus["REJECTED"] = "rejected";
    ApprovalStatus["AUTO_APPROVED"] = "auto_approved";
    ApprovalStatus["EXPIRED"] = "expired";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
/**
 * Approval Priority
 * Determines urgency of approval request
 */
var ApprovalPriority;
(function (ApprovalPriority) {
    ApprovalPriority["LOW"] = "low";
    ApprovalPriority["MEDIUM"] = "medium";
    ApprovalPriority["HIGH"] = "high";
    ApprovalPriority["URGENT"] = "urgent";
})(ApprovalPriority || (exports.ApprovalPriority = ApprovalPriority = {}));
/**
 * Action Type Categories
 * Groups actions by their impact level
 */
var ActionImpactLevel;
(function (ActionImpactLevel) {
    ActionImpactLevel["LOW"] = "low";
    ActionImpactLevel["MEDIUM"] = "medium";
    ActionImpactLevel["HIGH"] = "high";
    ActionImpactLevel["CRITICAL"] = "critical";
})(ActionImpactLevel || (exports.ActionImpactLevel = ActionImpactLevel = {}));
/**
 * Automation Approval Entity
 *
 * Manages approval workflow for automation actions.
 * Prevents accidental/unwanted content publication.
 *
 * Use Cases:
 * - Email campaign sending (prevent wrong content to wrong audience)
 * - Event publishing (prevent draft events going live)
 * - CMS page publishing (prevent unreviewed content)
 * - Certificate sending (prevent wrong certificates to wrong users)
 * - Webhook triggers to external systems
 *
 * Features:
 * - Multi-level approval (single, double, senior)
 * - Auto-approval rules based on conditions
 * - Approval expiration (timeout)
 * - Approval history and audit trail
 * - Notification to approvers
 */
let AutomationApproval = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('automation_approvals'), (0, typeorm_1.Index)('idx_approval_status', ['status', 'createdAt']), (0, typeorm_1.Index)('idx_approval_rule', ['ruleId', 'status']), (0, typeorm_1.Index)('idx_approval_event', ['eventId']), (0, typeorm_1.Index)('idx_approval_requester', ['requestedBy']), (0, typeorm_1.Index)('idx_approval_expires', ['expiresAt']), (0, typeorm_1.Index)('idx_approval_deleted', ['deletedAt'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_entity_1.BaseEntity;
    let _ruleId_decorators;
    let _ruleId_initializers = [];
    let _ruleId_extraInitializers = [];
    let _rule_decorators;
    let _rule_initializers = [];
    let _rule_extraInitializers = [];
    let _eventId_decorators;
    let _eventId_initializers = [];
    let _eventId_extraInitializers = [];
    let _event_decorators;
    let _event_initializers = [];
    let _event_extraInitializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _priority_decorators;
    let _priority_initializers = [];
    let _priority_extraInitializers = [];
    let _impactLevel_decorators;
    let _impactLevel_initializers = [];
    let _impactLevel_extraInitializers = [];
    let _pendingActions_decorators;
    let _pendingActions_initializers = [];
    let _pendingActions_extraInitializers = [];
    let _requestedBy_decorators;
    let _requestedBy_initializers = [];
    let _requestedBy_extraInitializers = [];
    let _requestReason_decorators;
    let _requestReason_initializers = [];
    let _requestReason_extraInitializers = [];
    let _requestContext_decorators;
    let _requestContext_initializers = [];
    let _requestContext_extraInitializers = [];
    let _approvedBy_decorators;
    let _approvedBy_initializers = [];
    let _approvedBy_extraInitializers = [];
    let _approvedAt_decorators;
    let _approvedAt_initializers = [];
    let _approvedAt_extraInitializers = [];
    let _approvalComment_decorators;
    let _approvalComment_initializers = [];
    let _approvalComment_extraInitializers = [];
    let _approvalChain_decorators;
    let _approvalChain_initializers = [];
    let _approvalChain_extraInitializers = [];
    let _requiredApprovals_decorators;
    let _requiredApprovals_initializers = [];
    let _requiredApprovals_extraInitializers = [];
    let _currentApprovals_decorators;
    let _currentApprovals_initializers = [];
    let _currentApprovals_extraInitializers = [];
    let _expiresAt_decorators;
    let _expiresAt_initializers = [];
    let _expiresAt_extraInitializers = [];
    let _isExpired_decorators;
    let _isExpired_initializers = [];
    let _isExpired_extraInitializers = [];
    let _isExecuted_decorators;
    let _isExecuted_initializers = [];
    let _isExecuted_extraInitializers = [];
    let _executedAt_decorators;
    let _executedAt_initializers = [];
    let _executedAt_extraInitializers = [];
    let _executionResult_decorators;
    let _executionResult_initializers = [];
    let _executionResult_extraInitializers = [];
    let _approversNotified_decorators;
    let _approversNotified_initializers = [];
    let _approversNotified_extraInitializers = [];
    let _notifiedUsers_decorators;
    let _notifiedUsers_initializers = [];
    let _notifiedUsers_extraInitializers = [];
    var AutomationApproval = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _ruleId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', name: 'rule_id' })];
            _rule_decorators = [(0, typeorm_1.ManyToOne)(() => automation_rule_entity_1.AutomationRule, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'rule_id' })];
            _eventId_decorators = [(0, typeorm_1.Column)({ type: 'uuid', name: 'event_id', nullable: true })];
            _event_decorators = [(0, typeorm_1.ManyToOne)(() => platform_event_entity_1.PlatformEvent, { onDelete: 'SET NULL' }), (0, typeorm_1.JoinColumn)({ name: 'event_id' })];
            _status_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ApprovalStatus,
                    default: ApprovalStatus.PENDING,
                })];
            _priority_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ApprovalPriority,
                    default: ApprovalPriority.MEDIUM,
                })];
            _impactLevel_decorators = [(0, typeorm_1.Column)({
                    type: 'enum',
                    enum: ActionImpactLevel,
                    default: ActionImpactLevel.MEDIUM,
                    name: 'impact_level',
                })];
            _pendingActions_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', name: 'pending_actions' })];
            _requestedBy_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'requested_by' })];
            _requestReason_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'request_reason' })];
            _requestContext_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true, name: 'request_context' })];
            _approvedBy_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true, name: 'approved_by' })];
            _approvedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'approved_at' })];
            _approvalComment_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'approval_comment' })];
            _approvalChain_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true, name: 'approval_chain' })];
            _requiredApprovals_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 1, name: 'required_approvals' })];
            _currentApprovals_decorators = [(0, typeorm_1.Column)({ type: 'int', default: 0, name: 'current_approvals' })];
            _expiresAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'expires_at' })];
            _isExpired_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'is_expired' })];
            _isExecuted_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'is_executed' })];
            _executedAt_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'executed_at' })];
            _executionResult_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true, name: 'execution_result' })];
            _approversNotified_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'approvers_notified' })];
            _notifiedUsers_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true, name: 'notified_users' })];
            __esDecorate(null, null, _ruleId_decorators, { kind: "field", name: "ruleId", static: false, private: false, access: { has: obj => "ruleId" in obj, get: obj => obj.ruleId, set: (obj, value) => { obj.ruleId = value; } }, metadata: _metadata }, _ruleId_initializers, _ruleId_extraInitializers);
            __esDecorate(null, null, _rule_decorators, { kind: "field", name: "rule", static: false, private: false, access: { has: obj => "rule" in obj, get: obj => obj.rule, set: (obj, value) => { obj.rule = value; } }, metadata: _metadata }, _rule_initializers, _rule_extraInitializers);
            __esDecorate(null, null, _eventId_decorators, { kind: "field", name: "eventId", static: false, private: false, access: { has: obj => "eventId" in obj, get: obj => obj.eventId, set: (obj, value) => { obj.eventId = value; } }, metadata: _metadata }, _eventId_initializers, _eventId_extraInitializers);
            __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: obj => "event" in obj, get: obj => obj.event, set: (obj, value) => { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: obj => "priority" in obj, get: obj => obj.priority, set: (obj, value) => { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _impactLevel_decorators, { kind: "field", name: "impactLevel", static: false, private: false, access: { has: obj => "impactLevel" in obj, get: obj => obj.impactLevel, set: (obj, value) => { obj.impactLevel = value; } }, metadata: _metadata }, _impactLevel_initializers, _impactLevel_extraInitializers);
            __esDecorate(null, null, _pendingActions_decorators, { kind: "field", name: "pendingActions", static: false, private: false, access: { has: obj => "pendingActions" in obj, get: obj => obj.pendingActions, set: (obj, value) => { obj.pendingActions = value; } }, metadata: _metadata }, _pendingActions_initializers, _pendingActions_extraInitializers);
            __esDecorate(null, null, _requestedBy_decorators, { kind: "field", name: "requestedBy", static: false, private: false, access: { has: obj => "requestedBy" in obj, get: obj => obj.requestedBy, set: (obj, value) => { obj.requestedBy = value; } }, metadata: _metadata }, _requestedBy_initializers, _requestedBy_extraInitializers);
            __esDecorate(null, null, _requestReason_decorators, { kind: "field", name: "requestReason", static: false, private: false, access: { has: obj => "requestReason" in obj, get: obj => obj.requestReason, set: (obj, value) => { obj.requestReason = value; } }, metadata: _metadata }, _requestReason_initializers, _requestReason_extraInitializers);
            __esDecorate(null, null, _requestContext_decorators, { kind: "field", name: "requestContext", static: false, private: false, access: { has: obj => "requestContext" in obj, get: obj => obj.requestContext, set: (obj, value) => { obj.requestContext = value; } }, metadata: _metadata }, _requestContext_initializers, _requestContext_extraInitializers);
            __esDecorate(null, null, _approvedBy_decorators, { kind: "field", name: "approvedBy", static: false, private: false, access: { has: obj => "approvedBy" in obj, get: obj => obj.approvedBy, set: (obj, value) => { obj.approvedBy = value; } }, metadata: _metadata }, _approvedBy_initializers, _approvedBy_extraInitializers);
            __esDecorate(null, null, _approvedAt_decorators, { kind: "field", name: "approvedAt", static: false, private: false, access: { has: obj => "approvedAt" in obj, get: obj => obj.approvedAt, set: (obj, value) => { obj.approvedAt = value; } }, metadata: _metadata }, _approvedAt_initializers, _approvedAt_extraInitializers);
            __esDecorate(null, null, _approvalComment_decorators, { kind: "field", name: "approvalComment", static: false, private: false, access: { has: obj => "approvalComment" in obj, get: obj => obj.approvalComment, set: (obj, value) => { obj.approvalComment = value; } }, metadata: _metadata }, _approvalComment_initializers, _approvalComment_extraInitializers);
            __esDecorate(null, null, _approvalChain_decorators, { kind: "field", name: "approvalChain", static: false, private: false, access: { has: obj => "approvalChain" in obj, get: obj => obj.approvalChain, set: (obj, value) => { obj.approvalChain = value; } }, metadata: _metadata }, _approvalChain_initializers, _approvalChain_extraInitializers);
            __esDecorate(null, null, _requiredApprovals_decorators, { kind: "field", name: "requiredApprovals", static: false, private: false, access: { has: obj => "requiredApprovals" in obj, get: obj => obj.requiredApprovals, set: (obj, value) => { obj.requiredApprovals = value; } }, metadata: _metadata }, _requiredApprovals_initializers, _requiredApprovals_extraInitializers);
            __esDecorate(null, null, _currentApprovals_decorators, { kind: "field", name: "currentApprovals", static: false, private: false, access: { has: obj => "currentApprovals" in obj, get: obj => obj.currentApprovals, set: (obj, value) => { obj.currentApprovals = value; } }, metadata: _metadata }, _currentApprovals_initializers, _currentApprovals_extraInitializers);
            __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: obj => "expiresAt" in obj, get: obj => obj.expiresAt, set: (obj, value) => { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
            __esDecorate(null, null, _isExpired_decorators, { kind: "field", name: "isExpired", static: false, private: false, access: { has: obj => "isExpired" in obj, get: obj => obj.isExpired, set: (obj, value) => { obj.isExpired = value; } }, metadata: _metadata }, _isExpired_initializers, _isExpired_extraInitializers);
            __esDecorate(null, null, _isExecuted_decorators, { kind: "field", name: "isExecuted", static: false, private: false, access: { has: obj => "isExecuted" in obj, get: obj => obj.isExecuted, set: (obj, value) => { obj.isExecuted = value; } }, metadata: _metadata }, _isExecuted_initializers, _isExecuted_extraInitializers);
            __esDecorate(null, null, _executedAt_decorators, { kind: "field", name: "executedAt", static: false, private: false, access: { has: obj => "executedAt" in obj, get: obj => obj.executedAt, set: (obj, value) => { obj.executedAt = value; } }, metadata: _metadata }, _executedAt_initializers, _executedAt_extraInitializers);
            __esDecorate(null, null, _executionResult_decorators, { kind: "field", name: "executionResult", static: false, private: false, access: { has: obj => "executionResult" in obj, get: obj => obj.executionResult, set: (obj, value) => { obj.executionResult = value; } }, metadata: _metadata }, _executionResult_initializers, _executionResult_extraInitializers);
            __esDecorate(null, null, _approversNotified_decorators, { kind: "field", name: "approversNotified", static: false, private: false, access: { has: obj => "approversNotified" in obj, get: obj => obj.approversNotified, set: (obj, value) => { obj.approversNotified = value; } }, metadata: _metadata }, _approversNotified_initializers, _approversNotified_extraInitializers);
            __esDecorate(null, null, _notifiedUsers_decorators, { kind: "field", name: "notifiedUsers", static: false, private: false, access: { has: obj => "notifiedUsers" in obj, get: obj => obj.notifiedUsers, set: (obj, value) => { obj.notifiedUsers = value; } }, metadata: _metadata }, _notifiedUsers_initializers, _notifiedUsers_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AutomationApproval = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        // Relationship: Which automation rule triggered this
        ruleId = __runInitializers(this, _ruleId_initializers, void 0);
        rule = (__runInitializers(this, _ruleId_extraInitializers), __runInitializers(this, _rule_initializers, void 0));
        // Relationship: Which event triggered this
        eventId = (__runInitializers(this, _rule_extraInitializers), __runInitializers(this, _eventId_initializers, void 0));
        event = (__runInitializers(this, _eventId_extraInitializers), __runInitializers(this, _event_initializers, void 0));
        // Approval Details
        status = (__runInitializers(this, _event_extraInitializers), __runInitializers(this, _status_initializers, void 0));
        priority = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
        impactLevel = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _impactLevel_initializers, void 0));
        // What action will be executed if approved
        pendingActions = (__runInitializers(this, _impactLevel_extraInitializers), __runInitializers(this, _pendingActions_initializers, void 0));
        // Request Information
        requestedBy = (__runInitializers(this, _pendingActions_extraInitializers), __runInitializers(this, _requestedBy_initializers, void 0)); // User ID or 'system'
        requestReason = (__runInitializers(this, _requestedBy_extraInitializers), __runInitializers(this, _requestReason_initializers, void 0)); // Why this automation was triggered
        requestContext = (__runInitializers(this, _requestReason_extraInitializers), __runInitializers(this, _requestContext_initializers, void 0)); // Event payload, metadata
        // Approval Information
        approvedBy = (__runInitializers(this, _requestContext_extraInitializers), __runInitializers(this, _approvedBy_initializers, void 0)); // User ID who approved/rejected
        approvedAt = (__runInitializers(this, _approvedBy_extraInitializers), __runInitializers(this, _approvedAt_initializers, void 0));
        approvalComment = (__runInitializers(this, _approvedAt_extraInitializers), __runInitializers(this, _approvalComment_initializers, void 0)); // Approver's comment/reason
        // Multi-Approval Support
        approvalChain = (__runInitializers(this, _approvalComment_extraInitializers), __runInitializers(this, _approvalChain_initializers, void 0));
        requiredApprovals = (__runInitializers(this, _approvalChain_extraInitializers), __runInitializers(this, _requiredApprovals_initializers, void 0)); // How many approvals needed
        currentApprovals = (__runInitializers(this, _requiredApprovals_extraInitializers), __runInitializers(this, _currentApprovals_initializers, void 0)); // How many approvals received
        // Expiration
        expiresAt = (__runInitializers(this, _currentApprovals_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
        isExpired = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _isExpired_initializers, void 0));
        // Execution Result (after approval)
        isExecuted = (__runInitializers(this, _isExpired_extraInitializers), __runInitializers(this, _isExecuted_initializers, void 0));
        executedAt = (__runInitializers(this, _isExecuted_extraInitializers), __runInitializers(this, _executedAt_initializers, void 0));
        executionResult = (__runInitializers(this, _executedAt_extraInitializers), __runInitializers(this, _executionResult_initializers, void 0));
        // Notification Status
        approversNotified = (__runInitializers(this, _executionResult_extraInitializers), __runInitializers(this, _approversNotified_initializers, void 0));
        notifiedUsers = (__runInitializers(this, _approversNotified_extraInitializers), __runInitializers(this, _notifiedUsers_initializers, void 0)); // User IDs who were notified
        /**
         * Check if approval can be granted
         */
        canApprove() {
            return (this.status === ApprovalStatus.PENDING &&
                !this.isExpired &&
                !this.isExecuted);
        }
        /**
         * Check if approval has expired
         */
        checkExpiration() {
            if (!this.expiresAt)
                return false;
            const now = new Date();
            const expired = now > this.expiresAt;
            if (expired && !this.isExpired) {
                this.isExpired = true;
                this.status = ApprovalStatus.EXPIRED;
            }
            return expired;
        }
        /**
         * Add approval to chain
         */
        addApproval(userId, userName, action, comment, ipAddress) {
            if (!this.approvalChain) {
                this.approvalChain = [];
            }
            this.approvalChain.push({
                userId,
                userName,
                action,
                comment,
                timestamp: new Date(),
                ipAddress,
            });
            if (action === 'approved') {
                this.currentApprovals += 1;
                // Check if we have enough approvals
                if (this.currentApprovals >= this.requiredApprovals) {
                    this.status = ApprovalStatus.APPROVED;
                    this.approvedBy = userId;
                    this.approvedAt = new Date();
                    if (comment)
                        this.approvalComment = comment;
                }
            }
            else if (action === 'rejected') {
                this.status = ApprovalStatus.REJECTED;
                this.approvedBy = userId;
                this.approvedAt = new Date();
                if (comment)
                    this.approvalComment = comment;
            }
        }
        /**
         * Calculate remaining time until expiration
         */
        getRemainingTime() {
            if (!this.expiresAt)
                return null;
            const now = new Date();
            const remaining = this.expiresAt.getTime() - now.getTime();
            return remaining > 0 ? remaining : 0;
        }
        /**
         * Get approval summary
         */
        getSummary() {
            const timeRemaining = this.getRemainingTime();
            let timeRemainingStr = null;
            if (timeRemaining !== null) {
                const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                timeRemainingStr = `${hours}h ${minutes}m`;
            }
            return {
                status: this.status,
                progress: `${this.currentApprovals}/${this.requiredApprovals}`,
                isUrgent: this.priority === ApprovalPriority.URGENT || this.priority === ApprovalPriority.HIGH,
                timeRemaining: timeRemainingStr,
            };
        }
        /**
         * Determine if action requires approval based on impact level
         */
        static requiresApproval(impactLevel) {
            return impactLevel !== ActionImpactLevel.LOW;
        }
        /**
         * Get required approval count based on impact level
         */
        static getRequiredApprovalCount(impactLevel) {
            switch (impactLevel) {
                case ActionImpactLevel.LOW:
                    return 0; // Auto-approve
                case ActionImpactLevel.MEDIUM:
                    return 1; // Single approval
                case ActionImpactLevel.HIGH:
                    return 2; // Double approval
                case ActionImpactLevel.CRITICAL:
                    return 3; // Triple approval (senior + 2 others)
                default:
                    return 1;
            }
        }
        /**
         * Calculate expiration time based on priority
         */
        static getExpirationTime(priority) {
            const now = new Date();
            switch (priority) {
                case ApprovalPriority.URGENT:
                    // 1 hour
                    return new Date(now.getTime() + 60 * 60 * 1000);
                case ApprovalPriority.HIGH:
                    // 4 hours
                    return new Date(now.getTime() + 4 * 60 * 60 * 1000);
                case ApprovalPriority.MEDIUM:
                    // 24 hours
                    return new Date(now.getTime() + 24 * 60 * 60 * 1000);
                case ApprovalPriority.LOW:
                    // 72 hours
                    return new Date(now.getTime() + 72 * 60 * 60 * 1000);
                default:
                    return new Date(now.getTime() + 24 * 60 * 60 * 1000);
            }
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _notifiedUsers_extraInitializers);
        }
    };
    return AutomationApproval = _classThis;
})();
exports.AutomationApproval = AutomationApproval;
//# sourceMappingURL=automation-approval.entity.js.map