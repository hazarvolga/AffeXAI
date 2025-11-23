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
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../users/enums/user-role.enum");
/**
 * Tickets Controller
 * RESTful API endpoints for ticket management
 * Protected with JWT authentication
 */
let TicketsController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Tickets'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('tickets'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _findOne_decorators;
    let _updateStatus_decorators;
    let _assign_decorators;
    let _addMessage_decorators;
    let _getStats_decorators;
    let _escalateTicket_decorators;
    let _getCategories_decorators;
    let _mergeTickets_decorators;
    let _splitTicket_decorators;
    var TicketsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)(), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CUSTOMER, user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Create a new support ticket' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Ticket created successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all tickets with filters' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Tickets retrieved successfully' })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get ticket details by ID' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Ticket UUID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Not your ticket' })];
            _updateStatus_decorators = [(0, common_1.Patch)(':id/status'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Update ticket status' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Ticket UUID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Status updated successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _assign_decorators = [(0, common_1.Patch)(':id/assign'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Assign ticket to a support agent' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Ticket UUID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket assigned successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _addMessage_decorators = [(0, common_1.Post)(':id/messages'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Add a message to a ticket' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Ticket UUID' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Message added successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Not authorized to message this ticket' })];
            _getStats_decorators = [(0, common_1.Get)('stats/overview'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Get ticket statistics' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' })];
            _escalateTicket_decorators = [(0, common_1.Post)(':id/escalate'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Manually escalate a ticket' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'Ticket UUID' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket escalated successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Escalation failed' })];
            _getCategories_decorators = [(0, common_1.Get)('categories/list'), (0, swagger_1.ApiOperation)({ summary: 'Get all ticket categories' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Categories retrieved successfully' })];
            _mergeTickets_decorators = [(0, common_1.Post)('merge'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Merge multiple tickets into one' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Tickets merged successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'One or more tickets not found' })];
            _splitTicket_decorators = [(0, common_1.Post)('split'), (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.EDITOR), (0, swagger_1.ApiOperation)({ summary: 'Split a ticket into two tickets' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Ticket split successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }), (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket not found' })];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateStatus_decorators, { kind: "method", name: "updateStatus", static: false, private: false, access: { has: obj => "updateStatus" in obj, get: obj => obj.updateStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _assign_decorators, { kind: "method", name: "assign", static: false, private: false, access: { has: obj => "assign" in obj, get: obj => obj.assign }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _addMessage_decorators, { kind: "method", name: "addMessage", static: false, private: false, access: { has: obj => "addMessage" in obj, get: obj => obj.addMessage }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStats_decorators, { kind: "method", name: "getStats", static: false, private: false, access: { has: obj => "getStats" in obj, get: obj => obj.getStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _escalateTicket_decorators, { kind: "method", name: "escalateTicket", static: false, private: false, access: { has: obj => "escalateTicket" in obj, get: obj => obj.escalateTicket }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getCategories_decorators, { kind: "method", name: "getCategories", static: false, private: false, access: { has: obj => "getCategories" in obj, get: obj => obj.getCategories }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _mergeTickets_decorators, { kind: "method", name: "mergeTickets", static: false, private: false, access: { has: obj => "mergeTickets" in obj, get: obj => obj.mergeTickets }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _splitTicket_decorators, { kind: "method", name: "splitTicket", static: false, private: false, access: { has: obj => "splitTicket" in obj, get: obj => obj.splitTicket }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ticketsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(ticketsService) {
            this.ticketsService = ticketsService;
        }
        /**
         * Create a new support ticket
         * Available to: CUSTOMER role and above
         */
        async create(createTicketDto, userId) {
            return this.ticketsService.create(userId, createTicketDto);
        }
        /**
         * Get all tickets with filters
         * Role-based access:
         * - CUSTOMER: Only their own tickets
         * - ADMIN/EDITOR: All tickets
         */
        async findAll(filters, user) {
            // If user is CUSTOMER, only show their tickets
            if (user.roleEntity?.name === user_role_enum_1.UserRole.CUSTOMER) {
                filters.userId = user.id;
            }
            return this.ticketsService.findAll(filters);
        }
        /**
         * Get a single ticket by ID
         * Customers can only view their own tickets
         */
        async findOne(id, user) {
            const ticket = await this.ticketsService.findOne(id);
            // Customers can only view their own tickets
            if (user.roleEntity?.name === user_role_enum_1.UserRole.CUSTOMER && ticket.userId !== user.id) {
                throw new common_1.ForbiddenException('You can only view your own tickets');
            }
            return ticket;
        }
        /**
         * Update ticket status
         * Available to: ADMIN and EDITOR roles only
         */
        async updateStatus(id, updateStatusDto, userId) {
            return this.ticketsService.updateStatus(id, updateStatusDto.status, userId);
        }
        /**
         * Assign ticket to a support agent
         * Available to: ADMIN and EDITOR roles only
         */
        async assign(id, assignTicketDto, req) {
            return this.ticketsService.assignTo(id, assignTicketDto.assignedToId, req.user.id);
        }
        /**
         * Add a message to a ticket
         * All authenticated users can add messages to tickets they have access to
         */
        async addMessage(id, addMessageDto, user) {
            const ticket = await this.ticketsService.findOne(id);
            // Check if user has access to this ticket
            if (user.roleEntity?.name === user_role_enum_1.UserRole.CUSTOMER && ticket.userId !== user.id) {
                throw new common_1.ForbiddenException('You can only add messages to your own tickets');
            }
            return this.ticketsService.addMessage(id, user.id, addMessageDto);
        }
        /**
         * Get ticket statistics
         * Available to: ADMIN and EDITOR roles only
         */
        async getStats() {
            return this.ticketsService.getStats();
        }
        /**
         * Manually escalate a ticket
         * Available to: ADMIN and EDITOR roles only
         */
        async escalateTicket(id, body, req) {
            return this.ticketsService.escalateTicket(id, req.user.id, body.reason, body.escalateTo);
        }
        /**
         * Get all ticket categories
         */
        async getCategories() {
            return this.ticketsService.findAllCategories();
        }
        /**
         * Merge tickets
         * Available to: ADMIN and EDITOR roles only
         */
        async mergeTickets(mergeTicketsDto, userId) {
            return this.ticketsService.mergeTickets(mergeTicketsDto.ticketIds, mergeTicketsDto.targetTicketId, userId, mergeTicketsDto.mergeNote);
        }
        /**
         * Split ticket
         * Available to: ADMIN and EDITOR roles only
         */
        async splitTicket(splitTicketDto, userId) {
            // Validate required fields
            if (!splitTicketDto.newTicketPriority) {
                throw new common_1.BadRequestException('newTicketPriority is required');
            }
            if (!splitTicketDto.messageIds || splitTicketDto.messageIds.length === 0) {
                throw new common_1.BadRequestException('messageIds is required and must not be empty');
            }
            return this.ticketsService.splitTicket(splitTicketDto.originalTicketId, {
                newTicketSubject: splitTicketDto.newTicketSubject,
                newTicketDescription: splitTicketDto.newTicketDescription,
                newTicketPriority: splitTicketDto.newTicketPriority,
                newTicketCategoryId: splitTicketDto.newTicketCategoryId,
                messageIds: splitTicketDto.messageIds,
                splitNote: splitTicketDto.splitNote,
            }, userId);
        }
    };
    return TicketsController = _classThis;
})();
exports.TicketsController = TicketsController;
//# sourceMappingURL=tickets.controller.js.map