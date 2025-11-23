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
exports.DocumentUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const upload_document_dto_1 = require("../dto/upload-document.dto");
let DocumentUploadController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Chat Documents'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('api/chat/documents'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _uploadDocument_decorators;
    let _getProcessingStatus_decorators;
    let _getSessionDocuments_decorators;
    var DocumentUploadController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _uploadDocument_decorators = [(0, common_1.Post)('upload'), (0, swagger_1.ApiOperation)({ summary: 'Upload document for chat session' }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiResponse)({
                    status: 201,
                    description: 'Document uploaded successfully',
                    type: upload_document_dto_1.DocumentUploadResponse
                }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid file or request' }), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
                    limits: {
                        fileSize: 10 * 1024 * 1024, // 10MB
                    },
                    fileFilter: (req, file, callback) => {
                        // Basic MIME type check - detailed validation happens in the service
                        const allowedMimes = [
                            'application/pdf',
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            'text/plain',
                            'text/markdown',
                            'application/octet-stream' // Allow generic binary for better validation in service
                        ];
                        if (allowedMimes.includes(file.mimetype)) {
                            callback(null, true);
                        }
                        else {
                            callback(new common_1.BadRequestException(`Unsupported MIME type: ${file.mimetype}`), false);
                        }
                    }
                }))];
            _getProcessingStatus_decorators = [(0, common_1.Get)(':documentId/status'), (0, swagger_1.ApiOperation)({ summary: 'Get document processing status' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Document processing status',
                    type: upload_document_dto_1.DocumentProcessingStatusDto
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' })];
            _getSessionDocuments_decorators = [(0, common_1.Get)('session/:sessionId'), (0, swagger_1.ApiOperation)({ summary: 'Get all documents for a chat session' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Session documents',
                    type: [upload_document_dto_1.DocumentProcessingStatusDto]
                })];
            __esDecorate(this, null, _uploadDocument_decorators, { kind: "method", name: "uploadDocument", static: false, private: false, access: { has: obj => "uploadDocument" in obj, get: obj => obj.uploadDocument }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getProcessingStatus_decorators, { kind: "method", name: "getProcessingStatus", static: false, private: false, access: { has: obj => "getProcessingStatus" in obj, get: obj => obj.getProcessingStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getSessionDocuments_decorators, { kind: "method", name: "getSessionDocuments", static: false, private: false, access: { has: obj => "getSessionDocuments" in obj, get: obj => obj.getSessionDocuments }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DocumentUploadController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        documentProcessor = __runInitializers(this, _instanceExtraInitializers);
        chatGateway;
        constructor(documentProcessor, chatGateway) {
            this.documentProcessor = documentProcessor;
            this.chatGateway = chatGateway;
        }
        async uploadDocument(file, uploadDto) {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            const processedDocument = await this.documentProcessor.processDocument(file.buffer, file.originalname, uploadDto.sessionId, uploadDto.messageId, file.mimetype);
            // Emit file processing status via WebSocket
            this.chatGateway.emitFileProcessingStatus(uploadDto.sessionId, {
                documentId: processedDocument.id,
                filename: processedDocument.filename,
                status: processedDocument.processingStatus,
                fileSize: processedDocument.fileSize
            });
            return {
                id: processedDocument.id,
                filename: processedDocument.filename,
                fileType: processedDocument.fileType,
                fileSize: processedDocument.fileSize,
                processingStatus: processedDocument.processingStatus,
                createdAt: new Date()
            };
        }
        async getProcessingStatus(documentId) {
            const document = await this.documentProcessor.getProcessingStatus(documentId);
            return {
                id: document.id,
                processingStatus: document.processingStatus,
                extractedContent: document.extractedContent,
                metadata: document.metadata,
                processedAt: document.processedAt
            };
        }
        async getSessionDocuments(sessionId) {
            const documents = await this.documentProcessor.getSessionDocuments(sessionId);
            return documents.map(doc => ({
                id: doc.id,
                processingStatus: doc.processingStatus,
                extractedContent: doc.extractedContent,
                metadata: doc.metadata,
                processedAt: doc.processedAt
            }));
        }
    };
    return DocumentUploadController = _classThis;
})();
exports.DocumentUploadController = DocumentUploadController;
//# sourceMappingURL=document-upload.controller.js.map