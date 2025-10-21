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
exports.CreateTemplateDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const ticket_priority_enum_1 = require("../enums/ticket-priority.enum");
/**
 * DTO for creating a ticket template
 */
let CreateTemplateDto = (() => {
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _subject_decorators;
    let _subject_initializers = [];
    let _subject_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _priority_decorators;
    let _priority_initializers = [];
    let _priority_extraInitializers = [];
    let _categoryId_decorators;
    let _categoryId_initializers = [];
    let _categoryId_extraInitializers = [];
    let _defaultTags_decorators;
    let _defaultTags_initializers = [];
    let _defaultTags_extraInitializers = [];
    let _customFields_decorators;
    let _customFields_initializers = [];
    let _customFields_extraInitializers = [];
    let _isPublic_decorators;
    let _isPublic_initializers = [];
    let _isPublic_extraInitializers = [];
    return class CreateTemplateDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Template name',
                    example: 'Password Reset Request',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Template description',
                    example: 'Template for password reset requests',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _subject_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Default ticket subject',
                    example: 'Unable to reset password',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _content_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Default ticket content/description',
                    example: 'I am unable to reset my password using the reset link.',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _priority_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Default priority',
                    enum: ticket_priority_enum_1.TicketPriority,
                    example: ticket_priority_enum_1.TicketPriority.MEDIUM,
                }), (0, class_validator_1.IsEnum)(ticket_priority_enum_1.TicketPriority), (0, class_validator_1.IsOptional)()];
            _categoryId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Default category ID',
                    example: 'category-uuid',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _defaultTags_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Default tags',
                    example: ['password', 'authentication'],
                    type: [String],
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)()];
            _customFields_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Custom fields for the template',
                    example: { affectedSystem: 'Login System' },
                }), (0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            _isPublic_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Is template publicly available',
                    example: true,
                }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: obj => "subject" in obj, get: obj => obj.subject, set: (obj, value) => { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: obj => "priority" in obj, get: obj => obj.priority, set: (obj, value) => { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: obj => "categoryId" in obj, get: obj => obj.categoryId, set: (obj, value) => { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _defaultTags_decorators, { kind: "field", name: "defaultTags", static: false, private: false, access: { has: obj => "defaultTags" in obj, get: obj => obj.defaultTags, set: (obj, value) => { obj.defaultTags = value; } }, metadata: _metadata }, _defaultTags_initializers, _defaultTags_extraInitializers);
            __esDecorate(null, null, _customFields_decorators, { kind: "field", name: "customFields", static: false, private: false, access: { has: obj => "customFields" in obj, get: obj => obj.customFields, set: (obj, value) => { obj.customFields = value; } }, metadata: _metadata }, _customFields_initializers, _customFields_extraInitializers);
            __esDecorate(null, null, _isPublic_decorators, { kind: "field", name: "isPublic", static: false, private: false, access: { has: obj => "isPublic" in obj, get: obj => obj.isPublic, set: (obj, value) => { obj.isPublic = value; } }, metadata: _metadata }, _isPublic_initializers, _isPublic_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        name = __runInitializers(this, _name_initializers, void 0);
        description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
        subject = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
        content = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _content_initializers, void 0));
        priority = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
        categoryId = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
        defaultTags = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _defaultTags_initializers, void 0));
        customFields = (__runInitializers(this, _defaultTags_extraInitializers), __runInitializers(this, _customFields_initializers, void 0));
        isPublic = (__runInitializers(this, _customFields_extraInitializers), __runInitializers(this, _isPublic_initializers, void 0));
        constructor() {
            __runInitializers(this, _isPublic_extraInitializers);
        }
    };
})();
exports.CreateTemplateDto = CreateTemplateDto;
//# sourceMappingURL=create-template.dto.js.map