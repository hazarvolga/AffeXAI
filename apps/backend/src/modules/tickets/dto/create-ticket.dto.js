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
exports.CreateTicketDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const ticket_priority_enum_1 = require("../enums/ticket-priority.enum");
/**
 * DTO for creating a new support ticket
 */
let CreateTicketDto = (() => {
    let _subject_decorators;
    let _subject_initializers = [];
    let _subject_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _categoryId_decorators;
    let _categoryId_initializers = [];
    let _categoryId_extraInitializers = [];
    let _priority_decorators;
    let _priority_initializers = [];
    let _priority_extraInitializers = [];
    let _companyName_decorators;
    let _companyName_initializers = [];
    let _companyName_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _tags_decorators;
    let _tags_initializers = [];
    let _tags_extraInitializers = [];
    let _customFields_decorators;
    let _customFields_initializers = [];
    let _customFields_extraInitializers = [];
    return class CreateTicketDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _subject_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Ticket subject/title',
                    example: 'Lisans anahtarım çalışmıyor',
                    minLength: 5,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MinLength)(5)];
            _description_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Detailed description of the issue',
                    example: 'Yeni satın aldığım Allplan 2024 lisans anahtarını girdiğimde "geçersiz anahtar" hatası alıyorum.',
                    minLength: 20,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MinLength)(20)];
            _categoryId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Category ID for ticket classification',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _priority_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Priority level of the ticket',
                    enum: ticket_priority_enum_1.TicketPriority,
                    example: ticket_priority_enum_1.TicketPriority.MEDIUM,
                    default: ticket_priority_enum_1.TicketPriority.MEDIUM,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ticket_priority_enum_1.TicketPriority)];
            _companyName_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Company name of the user',
                    example: 'Vural Mimarlık',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _metadata_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Additional metadata (e.g., AI analysis results)',
                    example: { aiSuggestion: 'Check graphics card drivers', aiPriority: 'high' },
                }), (0, class_validator_1.IsOptional)()];
            _tags_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Tags for categorizing tickets',
                    example: ['license', 'installation', 'urgent'],
                    type: [String],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _customFields_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Custom fields for additional ticket information',
                    example: { softwareVersion: '2024.1', operatingSystem: 'Windows 11' },
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: obj => "subject" in obj, get: obj => obj.subject, set: (obj, value) => { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: obj => "categoryId" in obj, get: obj => obj.categoryId, set: (obj, value) => { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: obj => "priority" in obj, get: obj => obj.priority, set: (obj, value) => { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _companyName_decorators, { kind: "field", name: "companyName", static: false, private: false, access: { has: obj => "companyName" in obj, get: obj => obj.companyName, set: (obj, value) => { obj.companyName = value; } }, metadata: _metadata }, _companyName_initializers, _companyName_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: obj => "tags" in obj, get: obj => obj.tags, set: (obj, value) => { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: obj => "customFields" in obj, get: obj => obj.customFields, set: (obj, value) => { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        subject = __runInitializers(this, _subject_initializers, void 0);
        description = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        categoryId = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
        priority = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
        companyName = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _companyName_initializers, void 0));
        metadata = (__runInitializers(this, _companyName_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        tags = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
        customFields = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _customFields_initializers, void 0));
        constructor() {
            __runInitializers(this, _customFields_extraInitializers);
        }
    };
})();
exports.CreateTicketDto = CreateTicketDto;
//# sourceMappingURL=create-ticket.dto.js.map