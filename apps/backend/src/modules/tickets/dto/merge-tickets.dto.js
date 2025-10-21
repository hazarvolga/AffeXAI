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
exports.MergeTicketsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
/**
 * DTO for merging tickets
 */
let MergeTicketsDto = (() => {
    let _ticketIds_decorators;
    let _ticketIds_initializers = [];
    let _ticketIds_extraInitializers = [];
    let _targetTicketId_decorators;
    let _targetTicketId_initializers = [];
    let _targetTicketId_extraInitializers = [];
    let _mergeNote_decorators;
    let _mergeNote_initializers = [];
    let _mergeNote_extraInitializers = [];
    return class MergeTicketsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _ticketIds_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Array of ticket IDs to merge into the target ticket',
                    example: ['ticket-id-1', 'ticket-id-2'],
                    type: [String],
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsNotEmpty)({ each: true })];
            _targetTicketId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Target ticket ID where other tickets will be merged into',
                    example: 'target-ticket-id',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _mergeNote_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Optional note to add to the target ticket explaining the merge',
                    example: 'Merged duplicate tickets for the same issue',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _ticketIds_decorators, { kind: "field", name: "ticketIds", static: false, private: false, access: { has: obj => "ticketIds" in obj, get: obj => obj.ticketIds, set: (obj, value) => { obj.ticketIds = value; } }, metadata: _metadata }, _ticketIds_initializers, _ticketIds_extraInitializers);
            __esDecorate(null, null, _targetTicketId_decorators, { kind: "field", name: "targetTicketId", static: false, private: false, access: { has: obj => "targetTicketId" in obj, get: obj => obj.targetTicketId, set: (obj, value) => { obj.targetTicketId = value; } }, metadata: _metadata }, _targetTicketId_initializers, _targetTicketId_extraInitializers);
            __esDecorate(null, null, _mergeNote_decorators, { kind: "field", name: "mergeNote", static: false, private: false, access: { has: obj => "mergeNote" in obj, get: obj => obj.mergeNote, set: (obj, value) => { obj.mergeNote = value; } }, metadata: _metadata }, _mergeNote_initializers, _mergeNote_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        ticketIds = __runInitializers(this, _ticketIds_initializers, void 0);
        targetTicketId = (__runInitializers(this, _ticketIds_extraInitializers), __runInitializers(this, _targetTicketId_initializers, void 0));
        mergeNote = (__runInitializers(this, _targetTicketId_extraInitializers), __runInitializers(this, _mergeNote_initializers, void 0));
        constructor() {
            __runInitializers(this, _mergeNote_extraInitializers);
        }
    };
})();
exports.MergeTicketsDto = MergeTicketsDto;
//# sourceMappingURL=merge-tickets.dto.js.map