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
exports.TicketMacroController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
/**
 * Ticket Macro Controller
 * Manages bulk actions and predefined workflows
 */
let TicketMacroController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Ticket Macros'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('tickets/macros'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createMacro_decorators;
    let _updateMacro_decorators;
    let _deleteMacro_decorators;
    let _getMacro_decorators;
    let _getAllMacros_decorators;
    let _executeMacro_decorators;
    let _getPopularMacros_decorators;
    let _getStatistics_decorators;
    var TicketMacroController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createMacro_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Create a new ticket macro' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Macro created successfully' })];
            _updateMacro_decorators = [(0, common_1.Patch)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Update a ticket macro' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Macro updated successfully' })];
            _deleteMacro_decorators = [(0, common_1.Delete)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Delete a ticket macro' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Macro deleted successfully' })];
            _getMacro_decorators = [(0, common_1.Get)(':id'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get macro by ID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Macro retrieved successfully' })];
            _getAllMacros_decorators = [(0, common_1.Get)(), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get all macros' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Macros retrieved successfully' })];
            _executeMacro_decorators = [(0, common_1.Post)(':id/execute'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Execute macro on tickets' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Macro executed successfully' })];
            _getPopularMacros_decorators = [(0, common_1.Get)('popular/list'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get popular macros' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Popular macros retrieved' })];
            _getStatistics_decorators = [(0, common_1.Get)('stats/overview'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN), (0, swagger_1.ApiOperation)({ summary: 'Get macro statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved' })];
            __esDecorate(this, null, _createMacro_decorators, { kind: "method", name: "createMacro", static: false, private: false, access: { has: obj => "createMacro" in obj, get: obj => obj.createMacro }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateMacro_decorators, { kind: "method", name: "updateMacro", static: false, private: false, access: { has: obj => "updateMacro" in obj, get: obj => obj.updateMacro }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteMacro_decorators, { kind: "method", name: "deleteMacro", static: false, private: false, access: { has: obj => "deleteMacro" in obj, get: obj => obj.deleteMacro }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getMacro_decorators, { kind: "method", name: "getMacro", static: false, private: false, access: { has: obj => "getMacro" in obj, get: obj => obj.getMacro }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAllMacros_decorators, { kind: "method", name: "getAllMacros", static: false, private: false, access: { has: obj => "getAllMacros" in obj, get: obj => obj.getAllMacros }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _executeMacro_decorators, { kind: "method", name: "executeMacro", static: false, private: false, access: { has: obj => "executeMacro" in obj, get: obj => obj.executeMacro }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getPopularMacros_decorators, { kind: "method", name: "getPopularMacros", static: false, private: false, access: { has: obj => "getPopularMacros" in obj, get: obj => obj.getPopularMacros }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStatistics_decorators, { kind: "method", name: "getStatistics", static: false, private: false, access: { has: obj => "getStatistics" in obj, get: obj => obj.getStatistics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketMacroController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        macroService = __runInitializers(this, _instanceExtraInitializers);
        constructor(macroService) {
            this.macroService = macroService;
        }
        /**
         * Create a new macro (ADMIN/EDITOR only)
         */
        async createMacro(dto, userId) {
            return await this.macroService.createMacro(userId, dto);
        }
        /**
         * Update a macro (ADMIN/EDITOR only)
         */
        async updateMacro(id, updates) {
            return await this.macroService.updateMacro(id, updates);
        }
        /**
         * Delete a macro (ADMIN only)
         */
        async deleteMacro(id) {
            await this.macroService.deleteMacro(id);
            return { message: 'Macro deleted successfully' };
        }
        /**
         * Get macro by ID
         */
        async getMacro(id) {
            return await this.macroService.getMacro(id);
        }
        /**
         * Get all macros
         */
        async getAllMacros(userId) {
            return await this.macroService.getAllMacros(userId);
        }
        /**
         * Execute macro on tickets
         */
        async executeMacro(id, body, userId) {
            return await this.macroService.executeMacro(id, body.ticketIds, userId);
        }
        /**
         * Get popular macros
         */
        async getPopularMacros(limit) {
            return await this.macroService.getPopularMacros(limit ? parseInt(limit, 10) : 10);
        }
        /**
         * Get macro statistics
         */
        async getStatistics() {
            return await this.macroService.getStatistics();
        }
    };
    return TicketMacroController = _classThis;
})();
exports.TicketMacroController = TicketMacroController;
//# sourceMappingURL=ticket-macro.controller.js.map