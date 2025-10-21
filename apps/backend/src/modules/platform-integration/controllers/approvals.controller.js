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
exports.ApprovalsController = void 0;
const common_1 = require("@nestjs/common");
const automation_approval_entity_1 = require("../entities/automation-approval.entity");
/**
 * Approvals Controller
 *
 * Manage automation approval requests.
 */
let ApprovalsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('automation/approvals')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _findAll_decorators;
    let _findPending_decorators;
    let _findOne_decorators;
    let _approve_decorators;
    let _reject_decorators;
    let _getStats_decorators;
    var ApprovalsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _findAll_decorators = [(0, common_1.Get)()];
            _findPending_decorators = [(0, common_1.Get)('pending')];
            _findOne_decorators = [(0, common_1.Get)(':id')];
            _approve_decorators = [(0, common_1.Post)(':id/approve')];
            _reject_decorators = [(0, common_1.Post)(':id/reject')];
            _getStats_decorators = [(0, common_1.Get)('stats/overview')];
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findPending_decorators, { kind: "method", name: "findPending", static: false, private: false, access: { has: obj => "findPending" in obj, get: obj => obj.findPending }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _approve_decorators, { kind: "method", name: "approve", static: false, private: false, access: { has: obj => "approve" in obj, get: obj => obj.approve }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _reject_decorators, { kind: "method", name: "reject", static: false, private: false, access: { has: obj => "reject" in obj, get: obj => obj.reject }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStats_decorators, { kind: "method", name: "getStats", static: false, private: false, access: { has: obj => "getStats" in obj, get: obj => obj.getStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ApprovalsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        approvalRepository = __runInitializers(this, _instanceExtraInitializers);
        executorService;
        constructor(approvalRepository, executorService) {
            this.approvalRepository = approvalRepository;
            this.executorService = executorService;
        }
        /**
         * Get all approval requests
         */
        async findAll() {
            return this.approvalRepository.find({
                order: { createdAt: 'DESC' },
                relations: ['rule'],
            });
        }
        /**
         * Get pending approval requests
         */
        async findPending() {
            return this.approvalRepository.find({
                where: { status: automation_approval_entity_1.ApprovalStatus.PENDING },
                order: { priority: 'ASC', createdAt: 'ASC' }, // Urgent first, then oldest
                relations: ['rule'],
            });
        }
        /**
         * Get approval request by ID
         */
        async findOne(id) {
            return this.approvalRepository.findOne({
                where: { id },
                relations: ['rule', 'event'],
            });
        }
        /**
         * Approve automation request
         */
        async approve(id, body) {
            const approval = await this.approvalRepository.findOne({
                where: { id },
                relations: ['rule', 'event'],
            });
            if (!approval) {
                throw new Error(`Approval not found: ${id}`);
            }
            if (!approval.canApprove()) {
                throw new Error(`Approval cannot be granted: ${approval.status}`);
            }
            // Add approval to chain
            approval.addApproval(body.userId, body.userName, 'approved', body.comment, 
            // In real app, get IP from request
            undefined);
            await this.approvalRepository.save(approval);
            // If fully approved, execute the automation
            if (approval.status === automation_approval_entity_1.ApprovalStatus.APPROVED) {
                await this.executorService.executeApprovedAutomation(id);
            }
            return approval;
        }
        /**
         * Reject automation request
         */
        async reject(id, body) {
            const approval = await this.approvalRepository.findOne({
                where: { id },
                relations: ['rule'],
            });
            if (!approval) {
                throw new Error(`Approval not found: ${id}`);
            }
            if (!approval.canApprove()) {
                throw new Error(`Approval cannot be rejected: ${approval.status}`);
            }
            // Add rejection to chain
            approval.addApproval(body.userId, body.userName, 'rejected', body.comment, undefined);
            await this.approvalRepository.save(approval);
            return approval;
        }
        /**
         * Get approval statistics
         */
        async getStats() {
            const all = await this.approvalRepository.find();
            const pending = all.filter(a => a.status === automation_approval_entity_1.ApprovalStatus.PENDING).length;
            const approved = all.filter(a => a.status === automation_approval_entity_1.ApprovalStatus.APPROVED).length;
            const rejected = all.filter(a => a.status === automation_approval_entity_1.ApprovalStatus.REJECTED).length;
            const expired = all.filter(a => a.status === automation_approval_entity_1.ApprovalStatus.EXPIRED).length;
            return {
                total: all.length,
                pending,
                approved,
                rejected,
                expired,
            };
        }
    };
    return ApprovalsController = _classThis;
})();
exports.ApprovalsController = ApprovalsController;
//# sourceMappingURL=approvals.controller.js.map