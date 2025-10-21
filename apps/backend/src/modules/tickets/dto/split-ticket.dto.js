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
exports.SplitTicketDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
/**
 * DTO for splitting a ticket
 */
let SplitTicketDto = (() => {
    let _originalTicketId_decorators;
    let _originalTicketId_initializers = [];
    let _originalTicketId_extraInitializers = [];
    let _newTicketSubject_decorators;
    let _newTicketSubject_initializers = [];
    let _newTicketSubject_extraInitializers = [];
    let _newTicketDescription_decorators;
    let _newTicketDescription_initializers = [];
    let _newTicketDescription_extraInitializers = [];
    let _newTicketPriority_decorators;
    let _newTicketPriority_initializers = [];
    let _newTicketPriority_extraInitializers = [];
    let _newTicketCategoryId_decorators;
    let _newTicketCategoryId_initializers = [];
    let _newTicketCategoryId_extraInitializers = [];
    let _messageIds_decorators;
    let _messageIds_initializers = [];
    let _messageIds_extraInitializers = [];
    let _splitNote_decorators;
    let _splitNote_initializers = [];
    let _splitNote_extraInitializers = [];
    return class SplitTicketDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _originalTicketId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID of the original ticket to split',
                    example: 'original-ticket-id',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _newTicketSubject_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Subject for the new ticket',
                    example: 'New issue from split ticket',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _newTicketDescription_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Description for the new ticket',
                    example: 'This is a new issue that was split from the original ticket',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _newTicketPriority_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Priority for the new ticket',
                    example: 'medium',
                    enum: ['low', 'medium', 'high', 'urgent'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _newTicketCategoryId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Category ID for the new ticket',
                    example: 'category-id',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _messageIds_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Array of message IDs to move to the new ticket',
                    example: ['message-id-1', 'message-id-2'],
                    type: [String],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _splitNote_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Optional note to add to the original ticket explaining the split',
                    example: 'Split ticket to separate unrelated issues',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _originalTicketId_decorators, { kind: "field", name: "originalTicketId", static: false, private: false, access: { has: obj => "originalTicketId" in obj, get: obj => obj.originalTicketId, set: (obj, value) => { obj.originalTicketId = value; } }, metadata: _metadata }, _originalTicketId_initializers, _originalTicketId_extraInitializers);
            __esDecorate(null, null, _newTicketSubject_decorators, { kind: "field", name: "newTicketSubject", static: false, private: false, access: { has: obj => "newTicketSubject" in obj, get: obj => obj.newTicketSubject, set: (obj, value) => { obj.newTicketSubject = value; } }, metadata: _metadata }, _newTicketSubject_initializers, _newTicketSubject_extraInitializers);
            __esDecorate(null, null, _newTicketDescription_decorators, { kind: "field", name: "newTicketDescription", static: false, private: false, access: { has: obj => "newTicketDescription" in obj, get: obj => obj.newTicketDescription, set: (obj, value) => { obj.newTicketDescription = value; } }, metadata: _metadata }, _newTicketDescription_initializers, _newTicketDescription_extraInitializers);
            __esDecorate(null, null, _newTicketPriority_decorators, { kind: "field", name: "newTicketPriority", static: false, private: false, access: { has: obj => "newTicketPriority" in obj, get: obj => obj.newTicketPriority, set: (obj, value) => { obj.newTicketPriority = value; } }, metadata: _metadata }, _newTicketPriority_initializers, _newTicketPriority_extraInitializers);
            __esDecorate(null, null, _newTicketCategoryId_decorators, { kind: "field", name: "newTicketCategoryId", static: false, private: false, access: { has: obj => "newTicketCategoryId" in obj, get: obj => obj.newTicketCategoryId, set: (obj, value) => { obj.newTicketCategoryId = value; } }, metadata: _metadata }, _newTicketCategoryId_initializers, _newTicketCategoryId_extraInitializers);
            __esDecorate(null, null, _messageIds_decorators, { kind: "field", name: "messageIds", static: false, private: false, access: { has: obj => "messageIds" in obj, get: obj => obj.messageIds, set: (obj, value) => { obj.messageIds = value; } }, metadata: _metadata }, _messageIds_initializers, _messageIds_extraInitializers);
            __esDecorate(null, null, _splitNote_decorators, { kind: "field", name: "splitNote", static: false, private: false, access: { has: obj => "splitNote" in obj, get: obj => obj.splitNote, set: (obj, value) => { obj.splitNote = value; } }, metadata: _metadata }, _splitNote_initializers, _splitNote_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        originalTicketId = __runInitializers(this, _originalTicketId_initializers, void 0);
        newTicketSubject = (__runInitializers(this, _originalTicketId_extraInitializers), __runInitializers(this, _newTicketSubject_initializers, void 0));
        newTicketDescription = (__runInitializers(this, _newTicketSubject_extraInitializers), __runInitializers(this, _newTicketDescription_initializers, void 0));
        newTicketPriority = (__runInitializers(this, _newTicketDescription_extraInitializers), __runInitializers(this, _newTicketPriority_initializers, void 0));
        newTicketCategoryId = (__runInitializers(this, _newTicketPriority_extraInitializers), __runInitializers(this, _newTicketCategoryId_initializers, void 0));
        messageIds = (__runInitializers(this, _newTicketCategoryId_extraInitializers), __runInitializers(this, _messageIds_initializers, void 0));
        splitNote = (__runInitializers(this, _messageIds_extraInitializers), __runInitializers(this, _splitNote_initializers, void 0));
        constructor() {
            __runInitializers(this, _splitNote_extraInitializers);
        }
    };
})();
exports.SplitTicketDto = SplitTicketDto;
//# sourceMappingURL=split-ticket.dto.js.map