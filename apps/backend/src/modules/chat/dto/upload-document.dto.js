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
exports.DocumentProcessingStatusDto = exports.DocumentUploadResponse = exports.UploadDocumentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let UploadDocumentDto = (() => {
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _messageId_decorators;
    let _messageId_initializers = [];
    let _messageId_extraInitializers = [];
    return class UploadDocumentDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Chat session ID' }), (0, class_validator_1.IsUUID)()];
            _messageId_decorators = [(0, swagger_1.ApiProperty)({ description: 'Message ID (optional)', required: false }), (0, class_validator_1.IsUUID)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _messageId_decorators, { kind: "field", name: "messageId", static: false, private: false, access: { has: obj => "messageId" in obj, get: obj => obj.messageId, set: (obj, value) => { obj.messageId = value; } }, metadata: _metadata }, _messageId_initializers, _messageId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        sessionId = __runInitializers(this, _sessionId_initializers, void 0);
        messageId = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _messageId_initializers, void 0));
        constructor() {
            __runInitializers(this, _messageId_extraInitializers);
        }
    };
})();
exports.UploadDocumentDto = UploadDocumentDto;
let DocumentUploadResponse = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _filename_decorators;
    let _filename_initializers = [];
    let _filename_extraInitializers = [];
    let _fileType_decorators;
    let _fileType_initializers = [];
    let _fileType_extraInitializers = [];
    let _fileSize_decorators;
    let _fileSize_initializers = [];
    let _fileSize_extraInitializers = [];
    let _processingStatus_decorators;
    let _processingStatus_initializers = [];
    let _processingStatus_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    return class DocumentUploadResponse {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Document ID' })];
            _filename_decorators = [(0, swagger_1.ApiProperty)({ description: 'Original filename' })];
            _fileType_decorators = [(0, swagger_1.ApiProperty)({ description: 'File type' })];
            _fileSize_decorators = [(0, swagger_1.ApiProperty)({ description: 'File size in bytes' })];
            _processingStatus_decorators = [(0, swagger_1.ApiProperty)({ description: 'Processing status' })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Upload timestamp' })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _filename_decorators, { kind: "field", name: "filename", static: false, private: false, access: { has: obj => "filename" in obj, get: obj => obj.filename, set: (obj, value) => { obj.filename = value; } }, metadata: _metadata }, _filename_initializers, _filename_extraInitializers);
            __esDecorate(null, null, _fileType_decorators, { kind: "field", name: "fileType", static: false, private: false, access: { has: obj => "fileType" in obj, get: obj => obj.fileType, set: (obj, value) => { obj.fileType = value; } }, metadata: _metadata }, _fileType_initializers, _fileType_extraInitializers);
            __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: obj => "fileSize" in obj, get: obj => obj.fileSize, set: (obj, value) => { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
            __esDecorate(null, null, _processingStatus_decorators, { kind: "field", name: "processingStatus", static: false, private: false, access: { has: obj => "processingStatus" in obj, get: obj => obj.processingStatus, set: (obj, value) => { obj.processingStatus = value; } }, metadata: _metadata }, _processingStatus_initializers, _processingStatus_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        filename = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _filename_initializers, void 0));
        fileType = (__runInitializers(this, _filename_extraInitializers), __runInitializers(this, _fileType_initializers, void 0));
        fileSize = (__runInitializers(this, _fileType_extraInitializers), __runInitializers(this, _fileSize_initializers, void 0));
        processingStatus = (__runInitializers(this, _fileSize_extraInitializers), __runInitializers(this, _processingStatus_initializers, void 0));
        createdAt = (__runInitializers(this, _processingStatus_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _createdAt_extraInitializers);
        }
    };
})();
exports.DocumentUploadResponse = DocumentUploadResponse;
let DocumentProcessingStatusDto = (() => {
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _processingStatus_decorators;
    let _processingStatus_initializers = [];
    let _processingStatus_extraInitializers = [];
    let _extractedContent_decorators;
    let _extractedContent_initializers = [];
    let _extractedContent_extraInitializers = [];
    let _metadata_decorators;
    let _metadata_initializers = [];
    let _metadata_extraInitializers = [];
    let _processedAt_decorators;
    let _processedAt_initializers = [];
    let _processedAt_extraInitializers = [];
    return class DocumentProcessingStatusDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Document ID' })];
            _processingStatus_decorators = [(0, swagger_1.ApiProperty)({ description: 'Processing status' })];
            _extractedContent_decorators = [(0, swagger_1.ApiProperty)({ description: 'Extracted content (if completed)', required: false })];
            _metadata_decorators = [(0, swagger_1.ApiProperty)({ description: 'Processing metadata', required: false })];
            _processedAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Processing completion timestamp', required: false })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _processingStatus_decorators, { kind: "field", name: "processingStatus", static: false, private: false, access: { has: obj => "processingStatus" in obj, get: obj => obj.processingStatus, set: (obj, value) => { obj.processingStatus = value; } }, metadata: _metadata }, _processingStatus_initializers, _processingStatus_extraInitializers);
            __esDecorate(null, null, _extractedContent_decorators, { kind: "field", name: "extractedContent", static: false, private: false, access: { has: obj => "extractedContent" in obj, get: obj => obj.extractedContent, set: (obj, value) => { obj.extractedContent = value; } }, metadata: _metadata }, _extractedContent_initializers, _extractedContent_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: obj => "metadata" in obj, get: obj => obj.metadata, set: (obj, value) => { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _processedAt_decorators, { kind: "field", name: "processedAt", static: false, private: false, access: { has: obj => "processedAt" in obj, get: obj => obj.processedAt, set: (obj, value) => { obj.processedAt = value; } }, metadata: _metadata }, _processedAt_initializers, _processedAt_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        id = __runInitializers(this, _id_initializers, void 0);
        processingStatus = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _processingStatus_initializers, void 0));
        extractedContent = (__runInitializers(this, _processingStatus_extraInitializers), __runInitializers(this, _extractedContent_initializers, void 0));
        metadata = (__runInitializers(this, _extractedContent_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
        processedAt = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _processedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _processedAt_extraInitializers);
        }
    };
})();
exports.DocumentProcessingStatusDto = DocumentProcessingStatusDto;
//# sourceMappingURL=upload-document.dto.js.map