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
exports.TicketFiltersDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const ticket_status_enum_1 = require("../enums/ticket-status.enum");
const ticket_priority_enum_1 = require("../enums/ticket-priority.enum");
/**
 * DTO for filtering tickets
 */
let TicketFiltersDto = (() => {
    let _status_decorators;
    let _status_initializers = [];
    let _status_extraInitializers = [];
    let _priority_decorators;
    let _priority_initializers = [];
    let _priority_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _assignedToId_decorators;
    let _assignedToId_initializers = [];
    let _assignedToId_extraInitializers = [];
    let _categoryId_decorators;
    let _categoryId_initializers = [];
    let _categoryId_extraInitializers = [];
    let _search_decorators;
    let _search_initializers = [];
    let _search_extraInitializers = [];
    let _tags_decorators;
    let _tags_initializers = [];
    let _tags_extraInitializers = [];
    return class TicketFiltersDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by ticket status',
                    enum: ticket_status_enum_1.TicketStatus,
                    example: ticket_status_enum_1.TicketStatus.OPEN,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ticket_status_enum_1.TicketStatus)];
            _priority_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by ticket priority',
                    enum: ticket_priority_enum_1.TicketPriority,
                    example: ticket_priority_enum_1.TicketPriority.HIGH,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ticket_priority_enum_1.TicketPriority)];
            _userId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by user ID (ticket creator)',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _assignedToId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by assigned support agent ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _categoryId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by category ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _search_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Search in subject and description',
                    example: 'lisans',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _tags_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by tags',
                    example: ['license', 'urgent'],
                    type: [String],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: obj => "priority" in obj, get: obj => obj.priority, set: (obj, value) => { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _assignedToId_decorators, { kind: "field", name: "assignedToId", static: false, private: false, access: { has: obj => "assignedToId" in obj, get: obj => obj.assignedToId, set: (obj, value) => { obj.assignedToId = value; } }, metadata: _metadata }, _assignedToId_initializers, _assignedToId_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: obj => "categoryId" in obj, get: obj => obj.categoryId, set: (obj, value) => { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search, set: (obj, value) => { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: obj => "tags" in obj, get: obj => obj.tags, set: (obj, value) => { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        status = __runInitializers(this, _status_initializers, void 0);
        priority = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
        userId = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
        assignedToId = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _assignedToId_initializers, void 0));
        categoryId = (__runInitializers(this, _assignedToId_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
        search = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _search_initializers, void 0));
        tags = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
        constructor() {
            __runInitializers(this, _tags_extraInitializers);
        }
    };
})();
exports.TicketFiltersDto = TicketFiltersDto;
//# sourceMappingURL=ticket-filters.dto.js.map