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
exports.TicketAttachmentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let TicketAttachmentsController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Ticket Attachments'), (0, common_1.Controller)('tickets/attachments'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'))];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _uploadAttachment_decorators;
    let _getAttachment_decorators;
    var TicketAttachmentsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _uploadAttachment_decorators = [(0, common_1.Post)('upload'), (0, swagger_1.ApiOperation)({ summary: 'Upload a ticket attachment' }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
                    schema: {
                        type: 'object',
                        properties: {
                            file: {
                                type: 'string',
                                format: 'binary',
                            },
                        },
                    },
                }), (0, swagger_1.ApiResponse)({
                    status: 201,
                    description: 'Attachment uploaded successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            filename: { type: 'string' },
                            originalName: { type: 'string' },
                            mimeType: { type: 'string' },
                            size: { type: 'number' },
                            url: { type: 'string' },
                            type: { type: 'string' },
                            uploadedAt: { type: 'string', format: 'date-time' },
                        }
                    }
                }), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'))];
            _getAttachment_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get ticket attachment by ID' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Attachment retrieved successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            filename: { type: 'string' },
                            originalName: { type: 'string' },
                            mimeType: { type: 'string' },
                            size: { type: 'number' },
                            url: { type: 'string' },
                            type: { type: 'string' },
                            uploadedAt: { type: 'string', format: 'date-time' },
                        }
                    }
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Attachment not found' })];
            __esDecorate(this, null, _uploadAttachment_decorators, { kind: "method", name: "uploadAttachment", static: false, private: false, access: { has: obj => "uploadAttachment" in obj, get: obj => obj.uploadAttachment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getAttachment_decorators, { kind: "method", name: "getAttachment", static: false, private: false, access: { has: obj => "getAttachment" in obj, get: obj => obj.getAttachment }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TicketAttachmentsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        attachmentService = __runInitializers(this, _instanceExtraInitializers);
        constructor(attachmentService) {
            this.attachmentService = attachmentService;
        }
        async uploadAttachment(file, req) {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            // Get user ID from request (in real implementation, this would come from auth)
            const userId = req.user?.userId || 'anonymous';
            return this.attachmentService.uploadAttachment(file, userId);
        }
        async getAttachment(id) {
            const attachment = await this.attachmentService.getAttachment(id);
            if (!attachment) {
                throw new common_1.BadRequestException('Attachment not found');
            }
            return attachment;
        }
    };
    return TicketAttachmentsController = _classThis;
})();
exports.TicketAttachmentsController = TicketAttachmentsController;
//# sourceMappingURL=ticket-attachments.controller.js.map