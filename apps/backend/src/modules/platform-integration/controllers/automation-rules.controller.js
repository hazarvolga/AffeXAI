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
exports.AutomationRulesController = void 0;
const common_1 = require("@nestjs/common");
/**
 * Automation Rules Controller
 *
 * CRUD operations for automation rules.
 */
let AutomationRulesController = (() => {
    let _classDecorators = [(0, common_1.Controller)('automation/rules')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _findAll_decorators;
    let _findActive_decorators;
    let _findOne_decorators;
    let _create_decorators;
    let _update_decorators;
    let _delete_decorators;
    let _toggle_decorators;
    var AutomationRulesController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _findAll_decorators = [(0, common_1.Get)()];
            _findActive_decorators = [(0, common_1.Get)('active')];
            _findOne_decorators = [(0, common_1.Get)(':id')];
            _create_decorators = [(0, common_1.Post)()];
            _update_decorators = [(0, common_1.Put)(':id')];
            _delete_decorators = [(0, common_1.Delete)(':id')];
            _toggle_decorators = [(0, common_1.Put)(':id/toggle')];
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findActive_decorators, { kind: "method", name: "findActive", static: false, private: false, access: { has: obj => "findActive" in obj, get: obj => obj.findActive }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _toggle_decorators, { kind: "method", name: "toggle", static: false, private: false, access: { has: obj => "toggle" in obj, get: obj => obj.toggle }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AutomationRulesController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ruleRepository = __runInitializers(this, _instanceExtraInitializers);
        constructor(ruleRepository) {
            this.ruleRepository = ruleRepository;
        }
        /**
         * Get all automation rules
         */
        async findAll() {
            return this.ruleRepository.find({
                order: { createdAt: 'DESC' },
            });
        }
        /**
         * Get active automation rules
         */
        async findActive() {
            return this.ruleRepository.find({
                where: { isActive: true },
                order: { priority: 'DESC' },
            });
        }
        /**
         * Get automation rule by ID
         */
        async findOne(id) {
            return this.ruleRepository.findOne({ where: { id } });
        }
        /**
         * Create new automation rule
         */
        async create(data) {
            const rule = this.ruleRepository.create(data);
            return this.ruleRepository.save(rule);
        }
        /**
         * Update automation rule
         */
        async update(id, data) {
            await this.ruleRepository.update(id, data);
            return this.ruleRepository.findOne({ where: { id } });
        }
        /**
         * Delete automation rule (soft delete)
         */
        async delete(id) {
            await this.ruleRepository.softDelete(id);
            return { success: true };
        }
        /**
         * Toggle rule active status
         */
        async toggle(id) {
            const rule = await this.ruleRepository.findOne({ where: { id } });
            if (!rule) {
                throw new Error(`Rule not found: ${id}`);
            }
            rule.isActive = !rule.isActive;
            return this.ruleRepository.save(rule);
        }
    };
    return AutomationRulesController = _classThis;
})();
exports.AutomationRulesController = AutomationRulesController;
//# sourceMappingURL=automation-rules.controller.js.map