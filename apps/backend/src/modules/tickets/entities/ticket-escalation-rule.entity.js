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
exports.TicketEscalationRule = void 0;
const typeorm_1 = require("typeorm");
/**
 * Ticket Escalation Rule Entity
 *
 * Defines rules for automatic ticket escalation based on various conditions
 *
 * Example:
 * - When priority = "urgent" and no response in 2 hours → Escalate to Tier 2
 * - When category = "billing" and open for 24 hours → Escalate to Billing Manager
 */
let TicketEscalationRule = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)('ticket_escalation_rules')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _conditions_decorators;
    let _conditions_initializers = [];
    let _conditions_extraInitializers = [];
    let _actions_decorators;
    let _actions_initializers = [];
    let _actions_extraInitializers = [];
    let _priority_decorators;
    let _priority_initializers = [];
    let _priority_extraInitializers = [];
    let _maxApplications_decorators;
    let _maxApplications_initializers = [];
    let _maxApplications_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _updatedAt_decorators;
    let _updatedAt_initializers = [];
    let _updatedAt_extraInitializers = [];
    var TicketEscalationRule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
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
                })];
            _conditions_decorators = [(0, typeorm_1.Column)({
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
            _maxApplications_decorators = [(0, typeorm_1.Column)({
                    type: 'int',
                    default: 1,
                })];
            _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
            _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _conditions_decorators, { kind: "field", name: "conditions", static: false, private: false, access: { has: obj => "conditions" in obj, get: obj => obj.conditions, set: (obj, value) => { obj.conditions = value; } }, metadata: _metadata }, _conditions_initializers, _conditions_extraInitializers);
            __esDecorate(null, null, _actions_decorators, { kind: "field", name: "actions", static: false, private: false, access: { has: obj => "actions" in obj, get: obj => obj.actions, set: (obj, value) => { obj.actions = value; } }, metadata: _metadata }, _actions_initializers, _actions_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: obj => "priority" in obj, get: obj => obj.priority, set: (obj, value) => { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _maxApplications_decorators, { kind: "field", name: "maxApplications", static: false, private: false, access: { has: obj => "maxApplications" in obj, get: obj => obj.maxApplications, set: (obj, value) => { obj.maxApplications = value; } }, metadata: _metadata }, _maxApplications_initializers, _maxApplications_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: obj => "updatedAt" in obj, get: obj => obj.updatedAt, set: (obj, value) => { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketEscalationRule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        id = __runInitializers(this, _id_initializers, void 0);
        /**
         * Rule name
         */
        name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
        /**
         * Rule description
         */
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        /**
         * Is rule active?
         */
        isActive = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        /**
         * Conditions that must be met for rule to trigger
         *
         * Examples:
         * - { "priority": "urgent" } - Only if priority is urgent
         * - { "status": "new" } - Only if status is new
         * - { "hoursSinceCreation": { "$gte": 2 } } - Only if open for 2+ hours
         * - { "categoryId": "billing-category-id" } - Only if category is billing
         * - { "escalationLevel": 0 } - Only if not yet escalated
         */
        conditions = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _conditions_initializers, void 0));
        /**
         * Escalation actions to take when rule triggers
         *
         * Example:
         * {
         *   "assignToId": "manager-user-id",
         *   "setPriority": "high",
         *   "addNote": "Automatically escalated due to SLA breach",
         *   "notifySupervisors": true,
         *   "increaseEscalationLevel": true
         * }
         */
        actions = (__runInitializers(this, _conditions_extraInitializers), __runInitializers(this, _actions_initializers, void 0));
        /**
         * Priority (higher = executed first)
         */
        priority = (__runInitializers(this, _actions_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
        /**
         * Maximum number of times this rule can be applied to a ticket
         */
        maxApplications = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _maxApplications_initializers, void 0));
        createdAt = (__runInitializers(this, _maxApplications_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
        /**
         * Check if rule should trigger for given ticket and context
         */
        shouldTrigger(ticket, context) {
            // Check if rule is active
            if (!this.isActive) {
                return false;
            }
            // Check conditions
            return this.matchesConditions(ticket, context);
        }
        /**
         * Check if ticket and context match conditions
         */
        matchesConditions(ticket, context) {
            // If no conditions, always match
            if (!this.conditions || Object.keys(this.conditions).length === 0) {
                return true;
            }
            // Merge ticket and context for condition checking
            const data = { ...ticket, ...context };
            // Check each condition
            for (const [key, value] of Object.entries(this.conditions)) {
                // Handle nested properties (e.g., "metadata.customerTier")
                const dataValue = this.getNestedProperty(data, key);
                // Handle operators like $gt, $lt, etc.
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    for (const [operator, operandValue] of Object.entries(value)) {
                        switch (operator) {
                            case '$gt':
                                if (!(dataValue > operandValue))
                                    return false;
                                break;
                            case '$gte':
                                if (!(dataValue >= operandValue))
                                    return false;
                                break;
                            case '$lt':
                                if (!(dataValue < operandValue))
                                    return false;
                                break;
                            case '$lte':
                                if (!(dataValue <= operandValue))
                                    return false;
                                break;
                            case '$ne':
                                if (dataValue === operandValue)
                                    return false;
                                break;
                            case '$in':
                                if (!Array.isArray(operandValue) || !operandValue.includes(dataValue)) {
                                    return false;
                                }
                                break;
                            case '$nin':
                                if (Array.isArray(operandValue) && operandValue.includes(dataValue)) {
                                    return false;
                                }
                                break;
                            case '$regex':
                                if (typeof dataValue !== 'string' || !new RegExp(operandValue).test(dataValue)) {
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
                    if (dataValue !== value) {
                        return false;
                    }
                }
            }
            return true;
        }
        /**
         * Get nested property value using dot notation
         */
        getNestedProperty(obj, path) {
            return path.split('.').reduce((current, prop) => {
                return current && current[prop] !== undefined ? current[prop] : undefined;
            }, obj);
        }
        constructor() {
            __runInitializers(this, _updatedAt_extraInitializers);
        }
    };
    return TicketEscalationRule = _classThis;
})();
exports.TicketEscalationRule = TicketEscalationRule;
//# sourceMappingURL=ticket-escalation-rule.entity.js.map