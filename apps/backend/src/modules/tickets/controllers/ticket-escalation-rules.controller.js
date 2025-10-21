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
exports.TicketEscalationRulesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
let TicketEscalationRulesController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Ticket Escalation Rules'), (0, common_1.Controller)('tickets/escalation-rules'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.SUPPORT_MANAGER)];
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
    var TicketEscalationRulesController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all ticket escalation rules' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all ticket escalation rules.' })];
            _findActive_decorators = [(0, common_1.Get)('active'), (0, swagger_1.ApiOperation)({ summary: 'Get active ticket escalation rules' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Return active ticket escalation rules.' })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get ticket escalation rule by ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Return ticket escalation rule.' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket escalation rule not found.' })];
            _create_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({ summary: 'Create new ticket escalation rule' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Ticket escalation rule created successfully.' })];
            _update_decorators = [(0, common_1.Put)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Update ticket escalation rule' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket escalation rule updated successfully.' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket escalation rule not found.' })];
            _delete_decorators = [(0, common_1.Delete)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Delete ticket escalation rule' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket escalation rule deleted successfully.' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket escalation rule not found.' })];
            _toggle_decorators = [(0, common_1.Put)(':id/toggle'), (0, swagger_1.ApiOperation)({ summary: 'Toggle ticket escalation rule active status' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket escalation rule status toggled successfully.' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket escalation rule not found.' })];
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findActive_decorators, { kind: "method", name: "findActive", static: false, private: false, access: { has: obj => "findActive" in obj, get: obj => obj.findActive }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _toggle_decorators, { kind: "method", name: "toggle", static: false, private: false, access: { has: obj => "toggle" in obj, get: obj => obj.toggle }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketEscalationRulesController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        escalationRulesService = __runInitializers(this, _instanceExtraInitializers);
        constructor(escalationRulesService) {
            this.escalationRulesService = escalationRulesService;
        }
        async findAll() {
            return this.escalationRulesService.findAll();
        }
        async findActive() {
            return this.escalationRulesService.getActiveRules();
        }
        async findOne(id) {
            return this.escalationRulesService.findOne(id);
        }
        async create(data) {
            return this.escalationRulesService.create(data);
        }
        async update(id, data) {
            return this.escalationRulesService.update(id, data);
        }
        async delete(id) {
            return this.escalationRulesService.delete(id);
        }
        async toggle(id) {
            return this.escalationRulesService.toggle(id);
        }
    };
    return TicketEscalationRulesController = _classThis;
})();
exports.TicketEscalationRulesController = TicketEscalationRulesController;
//# sourceMappingURL=ticket-escalation-rules.controller.js.map