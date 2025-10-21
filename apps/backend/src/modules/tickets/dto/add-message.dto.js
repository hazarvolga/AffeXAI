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
exports.AddMessageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
/**
 * DTO for adding a message to a ticket
 */
let AddMessageDto = (() => {
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _htmlContent_decorators;
    let _htmlContent_initializers = [];
    let _htmlContent_extraInitializers = [];
    let _isInternal_decorators;
    let _isInternal_initializers = [];
    let _isInternal_extraInitializers = [];
    let _attachmentIds_decorators;
    let _attachmentIds_initializers = [];
    let _attachmentIds_extraInitializers = [];
    let _contentType_decorators;
    let _contentType_initializers = [];
    let _contentType_extraInitializers = [];
    return class AddMessageDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _content_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message content (plain text)',
                    example: 'Merhaba, lütfen lisans anahtarınızı tekrar kontrol edin ve doğru girdiğinizden emin olun.',
                    minLength: 10,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MinLength)(10)];
            _htmlContent_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Message content (HTML formatted)',
                    example: '<p>Merhaba,</p><p>Lütfen <strong>lisans anahtarınızı</strong> tekrar kontrol edin.</p>',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _isInternal_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether this is an internal note (not visible to customer)',
                    example: false,
                    default: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _attachmentIds_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Array of attachment IDs (media files)',
                    example: ['123e4567-e89b-12d3-a456-426614174000'],
                }), (0, class_validator_1.IsOptional)()];
            _contentType_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Content type of the message',
                    example: 'html',
                    enum: ['plain', 'html'],
                }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _htmlContent_decorators, { kind: "field", name: "htmlContent", static: false, private: false, access: { has: obj => "htmlContent" in obj, get: obj => obj.htmlContent, set: (obj, value) => { obj.htmlContent = value; } }, metadata: _metadata }, _htmlContent_initializers, _htmlContent_extraInitializers);
            __esDecorate(null, null, _isInternal_decorators, { kind: "field", name: "isInternal", static: false, private: false, access: { has: obj => "isInternal" in obj, get: obj => obj.isInternal, set: (obj, value) => { obj.isInternal = value; } }, metadata: _metadata }, _isInternal_initializers, _isInternal_extraInitializers);
            __esDecorate(null, null, _attachmentIds_decorators, { kind: "field", name: "attachmentIds", static: false, private: false, access: { has: obj => "attachmentIds" in obj, get: obj => obj.attachmentIds, set: (obj, value) => { obj.attachmentIds = value; } }, metadata: _metadata }, _attachmentIds_initializers, _attachmentIds_extraInitializers);
            __esDecorate(null, null, _contentType_decorators, { kind: "field", name: "contentType", static: false, private: false, access: { has: obj => "contentType" in obj, get: obj => obj.contentType, set: (obj, value) => { obj.contentType = value; } }, metadata: _metadata }, _contentType_initializers, _contentType_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        content = __runInitializers(this, _content_initializers, void 0);
        htmlContent = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _htmlContent_initializers, void 0));
        isInternal = (__runInitializers(this, _htmlContent_extraInitializers), __runInitializers(this, _isInternal_initializers, void 0));
        attachmentIds = (__runInitializers(this, _isInternal_extraInitializers), __runInitializers(this, _attachmentIds_initializers, void 0));
        contentType = (__runInitializers(this, _attachmentIds_extraInitializers), __runInitializers(this, _contentType_initializers, void 0));
        constructor() {
            __runInitializers(this, _contentType_extraInitializers);
        }
    };
})();
exports.AddMessageDto = AddMessageDto;
//# sourceMappingURL=add-message.dto.js.map