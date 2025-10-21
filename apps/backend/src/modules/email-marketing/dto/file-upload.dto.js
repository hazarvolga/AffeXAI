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
exports.MultipleFileUploadResponseDto = exports.CleanupResponseDto = exports.UploadStatsResponseDto = exports.FileInfoResponseDto = exports.FileValidationResponseDto = exports.FileUploadResponseDto = exports.FileUploadOptionsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let FileUploadOptionsDto = (() => {
    let _maxFileSize_decorators;
    let _maxFileSize_initializers = [];
    let _maxFileSize_extraInitializers = [];
    let _allowedMimeTypes_decorators;
    let _allowedMimeTypes_initializers = [];
    let _allowedMimeTypes_extraInitializers = [];
    let _generateJobId_decorators;
    let _generateJobId_initializers = [];
    let _generateJobId_extraInitializers = [];
    let _customPath_decorators;
    let _customPath_initializers = [];
    let _customPath_extraInitializers = [];
    return class FileUploadOptionsDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _maxFileSize_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Maximum file size in bytes',
                    example: 52428800,
                    minimum: 1024,
                    maximum: 104857600
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1024), (0, class_validator_1.Max)(104857600)];
            _allowedMimeTypes_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Allowed MIME types for upload',
                    example: ['text/csv', 'application/csv'],
                    type: [String]
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            _generateJobId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether to generate a job ID for this upload',
                    example: true
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _customPath_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Custom path within upload directory',
                    example: 'imports/bulk-subscribers'
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _maxFileSize_decorators, { kind: "field", name: "maxFileSize", static: false, private: false, access: { has: obj => "maxFileSize" in obj, get: obj => obj.maxFileSize, set: (obj, value) => { obj.maxFileSize = value; } }, metadata: _metadata }, _maxFileSize_initializers, _maxFileSize_extraInitializers);
            __esDecorate(null, null, _allowedMimeTypes_decorators, { kind: "field", name: "allowedMimeTypes", static: false, private: false, access: { has: obj => "allowedMimeTypes" in obj, get: obj => obj.allowedMimeTypes, set: (obj, value) => { obj.allowedMimeTypes = value; } }, metadata: _metadata }, _allowedMimeTypes_initializers, _allowedMimeTypes_extraInitializers);
            __esDecorate(null, null, _generateJobId_decorators, { kind: "field", name: "generateJobId", static: false, private: false, access: { has: obj => "generateJobId" in obj, get: obj => obj.generateJobId, set: (obj, value) => { obj.generateJobId = value; } }, metadata: _metadata }, _generateJobId_initializers, _generateJobId_extraInitializers);
            __esDecorate(null, null, _customPath_decorators, { kind: "field", name: "customPath", static: false, private: false, access: { has: obj => "customPath" in obj, get: obj => obj.customPath, set: (obj, value) => { obj.customPath = value; } }, metadata: _metadata }, _customPath_initializers, _customPath_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        maxFileSize = __runInitializers(this, _maxFileSize_initializers, void 0);
        allowedMimeTypes = (__runInitializers(this, _maxFileSize_extraInitializers), __runInitializers(this, _allowedMimeTypes_initializers, void 0));
        generateJobId = (__runInitializers(this, _allowedMimeTypes_extraInitializers), __runInitializers(this, _generateJobId_initializers, void 0));
        customPath = (__runInitializers(this, _generateJobId_extraInitializers), __runInitializers(this, _customPath_initializers, void 0));
        constructor() {
            __runInitializers(this, _customPath_extraInitializers);
        }
    };
})();
exports.FileUploadOptionsDto = FileUploadOptionsDto;
let FileUploadResponseDto = (() => {
    let _jobId_decorators;
    let _jobId_initializers = [];
    let _jobId_extraInitializers = [];
    let _fileName_decorators;
    let _fileName_initializers = [];
    let _fileName_extraInitializers = [];
    let _originalFileName_decorators;
    let _originalFileName_initializers = [];
    let _originalFileName_extraInitializers = [];
    let _filePath_decorators;
    let _filePath_initializers = [];
    let _filePath_extraInitializers = [];
    let _fileSize_decorators;
    let _fileSize_initializers = [];
    let _fileSize_extraInitializers = [];
    let _mimeType_decorators;
    let _mimeType_initializers = [];
    let _mimeType_extraInitializers = [];
    let _uploadedAt_decorators;
    let _uploadedAt_initializers = [];
    let _uploadedAt_extraInitializers = [];
    return class FileUploadResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _jobId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Generated job ID for the upload',
                    example: 'lm8n9o0p-1a2b3c4d'
                })];
            _fileName_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Generated secure file name',
                    example: '1640995200000-a1b2c3d4-subscribers.csv'
                })];
            _originalFileName_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Original file name as uploaded',
                    example: 'subscribers.csv'
                })];
            _filePath_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Secure file path on server',
                    example: '/temp/uploads/imports/lm8n9o0p-1a2b3c4d/1640995200000-a1b2c3d4-subscribers.csv'
                })];
            _fileSize_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File size in bytes',
                    example: 1048576
                })];
            _mimeType_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'MIME type of the uploaded file',
                    example: 'text/csv'
                })];
            _uploadedAt_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Upload timestamp',
                    example: '2024-01-01T12:00:00.000Z'
                })];
            __esDecorate(null, null, _jobId_decorators, { kind: "field", name: "jobId", static: false, private: false, access: { has: obj => "jobId" in obj, get: obj => obj.jobId, set: (obj, value) => { obj.jobId = value; } }, metadata: _metadata }, _jobId_initializers, _jobId_extraInitializers);
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: obj => "fileName" in obj, get: obj => obj.fileName, set: (obj, value) => { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _originalFileName_decorators, { kind: "field", name: "originalFileName", static: false, private: false, access: { has: obj => "originalFileName" in obj, get: obj => obj.originalFileName, set: (obj, value) => { obj.originalFileName = value; } }, metadata: _metadata }, _originalFileName_initializers, _originalFileName_extraInitializers);
            __esDecorate(null, null, _filePath_decorators, { kind: "field", name: "filePath", static: false, private: false, access: { has: obj => "filePath" in obj, get: obj => obj.filePath, set: (obj, value) => { obj.filePath = value; } }, metadata: _metadata }, _filePath_initializers, _filePath_extraInitializers);
            __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: obj => "fileSize" in obj, get: obj => obj.fileSize, set: (obj, value) => { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
            __esDecorate(null, null, _mimeType_decorators, { kind: "field", name: "mimeType", static: false, private: false, access: { has: obj => "mimeType" in obj, get: obj => obj.mimeType, set: (obj, value) => { obj.mimeType = value; } }, metadata: _metadata }, _mimeType_initializers, _mimeType_extraInitializers);
            __esDecorate(null, null, _uploadedAt_decorators, { kind: "field", name: "uploadedAt", static: false, private: false, access: { has: obj => "uploadedAt" in obj, get: obj => obj.uploadedAt, set: (obj, value) => { obj.uploadedAt = value; } }, metadata: _metadata }, _uploadedAt_initializers, _uploadedAt_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        jobId = __runInitializers(this, _jobId_initializers, void 0);
        fileName = (__runInitializers(this, _jobId_extraInitializers), __runInitializers(this, _fileName_initializers, void 0));
        originalFileName = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _originalFileName_initializers, void 0));
        filePath = (__runInitializers(this, _originalFileName_extraInitializers), __runInitializers(this, _filePath_initializers, void 0));
        fileSize = (__runInitializers(this, _filePath_extraInitializers), __runInitializers(this, _fileSize_initializers, void 0));
        mimeType = (__runInitializers(this, _fileSize_extraInitializers), __runInitializers(this, _mimeType_initializers, void 0));
        uploadedAt = (__runInitializers(this, _mimeType_extraInitializers), __runInitializers(this, _uploadedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _uploadedAt_extraInitializers);
        }
    };
})();
exports.FileUploadResponseDto = FileUploadResponseDto;
let FileValidationResponseDto = (() => {
    let _isValid_decorators;
    let _isValid_initializers = [];
    let _isValid_extraInitializers = [];
    let _fileType_decorators;
    let _fileType_initializers = [];
    let _fileType_extraInitializers = [];
    let _fileSize_decorators;
    let _fileSize_initializers = [];
    let _fileSize_extraInitializers = [];
    let _errors_decorators;
    let _errors_initializers = [];
    let _errors_extraInitializers = [];
    let _warnings_decorators;
    let _warnings_initializers = [];
    let _warnings_extraInitializers = [];
    return class FileValidationResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _isValid_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether the file passed validation',
                    example: true
                })];
            _fileType_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Detected or declared file type',
                    example: 'text/csv'
                })];
            _fileSize_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File size in bytes',
                    example: 1048576
                })];
            _errors_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Validation errors if any',
                    example: [],
                    type: [String]
                })];
            _warnings_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Validation warnings if any',
                    example: ['File extension differs from MIME type'],
                    type: [String]
                })];
            __esDecorate(null, null, _isValid_decorators, { kind: "field", name: "isValid", static: false, private: false, access: { has: obj => "isValid" in obj, get: obj => obj.isValid, set: (obj, value) => { obj.isValid = value; } }, metadata: _metadata }, _isValid_initializers, _isValid_extraInitializers);
            __esDecorate(null, null, _fileType_decorators, { kind: "field", name: "fileType", static: false, private: false, access: { has: obj => "fileType" in obj, get: obj => obj.fileType, set: (obj, value) => { obj.fileType = value; } }, metadata: _metadata }, _fileType_initializers, _fileType_extraInitializers);
            __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: obj => "fileSize" in obj, get: obj => obj.fileSize, set: (obj, value) => { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
            __esDecorate(null, null, _errors_decorators, { kind: "field", name: "errors", static: false, private: false, access: { has: obj => "errors" in obj, get: obj => obj.errors, set: (obj, value) => { obj.errors = value; } }, metadata: _metadata }, _errors_initializers, _errors_extraInitializers);
            __esDecorate(null, null, _warnings_decorators, { kind: "field", name: "warnings", static: false, private: false, access: { has: obj => "warnings" in obj, get: obj => obj.warnings, set: (obj, value) => { obj.warnings = value; } }, metadata: _metadata }, _warnings_initializers, _warnings_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        isValid = __runInitializers(this, _isValid_initializers, void 0);
        fileType = (__runInitializers(this, _isValid_extraInitializers), __runInitializers(this, _fileType_initializers, void 0));
        fileSize = (__runInitializers(this, _fileType_extraInitializers), __runInitializers(this, _fileSize_initializers, void 0));
        errors = (__runInitializers(this, _fileSize_extraInitializers), __runInitializers(this, _errors_initializers, void 0));
        warnings = (__runInitializers(this, _errors_extraInitializers), __runInitializers(this, _warnings_initializers, void 0));
        constructor() {
            __runInitializers(this, _warnings_extraInitializers);
        }
    };
})();
exports.FileValidationResponseDto = FileValidationResponseDto;
let FileInfoResponseDto = (() => {
    let _exists_decorators;
    let _exists_initializers = [];
    let _exists_extraInitializers = [];
    let _size_decorators;
    let _size_initializers = [];
    let _size_extraInitializers = [];
    let _mimeType_decorators;
    let _mimeType_initializers = [];
    let _mimeType_extraInitializers = [];
    let _createdAt_decorators;
    let _createdAt_initializers = [];
    let _createdAt_extraInitializers = [];
    let _isReadable_decorators;
    let _isReadable_initializers = [];
    let _isReadable_extraInitializers = [];
    return class FileInfoResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _exists_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether the file exists',
                    example: true
                })];
            _size_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'File size in bytes',
                    example: 1048576
                })];
            _mimeType_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'MIME type of the file',
                    example: 'text/csv'
                })];
            _createdAt_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'File creation timestamp',
                    example: '2024-01-01T12:00:00.000Z'
                })];
            _isReadable_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether the file is readable',
                    example: true
                })];
            __esDecorate(null, null, _exists_decorators, { kind: "field", name: "exists", static: false, private: false, access: { has: obj => "exists" in obj, get: obj => obj.exists, set: (obj, value) => { obj.exists = value; } }, metadata: _metadata }, _exists_initializers, _exists_extraInitializers);
            __esDecorate(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: obj => "size" in obj, get: obj => obj.size, set: (obj, value) => { obj.size = value; } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
            __esDecorate(null, null, _mimeType_decorators, { kind: "field", name: "mimeType", static: false, private: false, access: { has: obj => "mimeType" in obj, get: obj => obj.mimeType, set: (obj, value) => { obj.mimeType = value; } }, metadata: _metadata }, _mimeType_initializers, _mimeType_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: obj => "createdAt" in obj, get: obj => obj.createdAt, set: (obj, value) => { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _isReadable_decorators, { kind: "field", name: "isReadable", static: false, private: false, access: { has: obj => "isReadable" in obj, get: obj => obj.isReadable, set: (obj, value) => { obj.isReadable = value; } }, metadata: _metadata }, _isReadable_initializers, _isReadable_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        exists = __runInitializers(this, _exists_initializers, void 0);
        size = (__runInitializers(this, _exists_extraInitializers), __runInitializers(this, _size_initializers, void 0));
        mimeType = (__runInitializers(this, _size_extraInitializers), __runInitializers(this, _mimeType_initializers, void 0));
        createdAt = (__runInitializers(this, _mimeType_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
        isReadable = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _isReadable_initializers, void 0));
        constructor() {
            __runInitializers(this, _isReadable_extraInitializers);
        }
    };
})();
exports.FileInfoResponseDto = FileInfoResponseDto;
let UploadStatsResponseDto = (() => {
    let _totalFiles_decorators;
    let _totalFiles_initializers = [];
    let _totalFiles_extraInitializers = [];
    let _totalSize_decorators;
    let _totalSize_initializers = [];
    let _totalSize_extraInitializers = [];
    let _oldestFile_decorators;
    let _oldestFile_initializers = [];
    let _oldestFile_extraInitializers = [];
    let _newestFile_decorators;
    let _newestFile_initializers = [];
    let _newestFile_extraInitializers = [];
    return class UploadStatsResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _totalFiles_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total number of uploaded files',
                    example: 150
                })];
            _totalSize_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total size of all uploaded files in bytes',
                    example: 157286400
                })];
            _oldestFile_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Timestamp of the oldest file',
                    example: '2024-01-01T12:00:00.000Z'
                })];
            _newestFile_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Timestamp of the newest file',
                    example: '2024-01-15T18:30:00.000Z'
                })];
            __esDecorate(null, null, _totalFiles_decorators, { kind: "field", name: "totalFiles", static: false, private: false, access: { has: obj => "totalFiles" in obj, get: obj => obj.totalFiles, set: (obj, value) => { obj.totalFiles = value; } }, metadata: _metadata }, _totalFiles_initializers, _totalFiles_extraInitializers);
            __esDecorate(null, null, _totalSize_decorators, { kind: "field", name: "totalSize", static: false, private: false, access: { has: obj => "totalSize" in obj, get: obj => obj.totalSize, set: (obj, value) => { obj.totalSize = value; } }, metadata: _metadata }, _totalSize_initializers, _totalSize_extraInitializers);
            __esDecorate(null, null, _oldestFile_decorators, { kind: "field", name: "oldestFile", static: false, private: false, access: { has: obj => "oldestFile" in obj, get: obj => obj.oldestFile, set: (obj, value) => { obj.oldestFile = value; } }, metadata: _metadata }, _oldestFile_initializers, _oldestFile_extraInitializers);
            __esDecorate(null, null, _newestFile_decorators, { kind: "field", name: "newestFile", static: false, private: false, access: { has: obj => "newestFile" in obj, get: obj => obj.newestFile, set: (obj, value) => { obj.newestFile = value; } }, metadata: _metadata }, _newestFile_initializers, _newestFile_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        totalFiles = __runInitializers(this, _totalFiles_initializers, void 0);
        totalSize = (__runInitializers(this, _totalFiles_extraInitializers), __runInitializers(this, _totalSize_initializers, void 0));
        oldestFile = (__runInitializers(this, _totalSize_extraInitializers), __runInitializers(this, _oldestFile_initializers, void 0));
        newestFile = (__runInitializers(this, _oldestFile_extraInitializers), __runInitializers(this, _newestFile_initializers, void 0));
        constructor() {
            __runInitializers(this, _newestFile_extraInitializers);
        }
    };
})();
exports.UploadStatsResponseDto = UploadStatsResponseDto;
let CleanupResponseDto = (() => {
    let _cleanedCount_decorators;
    let _cleanedCount_initializers = [];
    let _cleanedCount_extraInitializers = [];
    let _cleanedAt_decorators;
    let _cleanedAt_initializers = [];
    let _cleanedAt_extraInitializers = [];
    return class CleanupResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _cleanedCount_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of files cleaned up',
                    example: 25
                })];
            _cleanedAt_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Cleanup operation timestamp',
                    example: '2024-01-15T18:30:00.000Z'
                })];
            __esDecorate(null, null, _cleanedCount_decorators, { kind: "field", name: "cleanedCount", static: false, private: false, access: { has: obj => "cleanedCount" in obj, get: obj => obj.cleanedCount, set: (obj, value) => { obj.cleanedCount = value; } }, metadata: _metadata }, _cleanedCount_initializers, _cleanedCount_extraInitializers);
            __esDecorate(null, null, _cleanedAt_decorators, { kind: "field", name: "cleanedAt", static: false, private: false, access: { has: obj => "cleanedAt" in obj, get: obj => obj.cleanedAt, set: (obj, value) => { obj.cleanedAt = value; } }, metadata: _metadata }, _cleanedAt_initializers, _cleanedAt_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        cleanedCount = __runInitializers(this, _cleanedCount_initializers, void 0);
        cleanedAt = (__runInitializers(this, _cleanedCount_extraInitializers), __runInitializers(this, _cleanedAt_initializers, void 0));
        constructor() {
            __runInitializers(this, _cleanedAt_extraInitializers);
        }
    };
})();
exports.CleanupResponseDto = CleanupResponseDto;
let MultipleFileUploadResponseDto = (() => {
    let _successful_decorators;
    let _successful_initializers = [];
    let _successful_extraInitializers = [];
    let _failed_decorators;
    let _failed_initializers = [];
    let _failed_extraInitializers = [];
    let _totalProcessed_decorators;
    let _totalProcessed_initializers = [];
    let _totalProcessed_extraInitializers = [];
    let _successCount_decorators;
    let _successCount_initializers = [];
    let _successCount_extraInitializers = [];
    let _failureCount_decorators;
    let _failureCount_initializers = [];
    let _failureCount_extraInitializers = [];
    return class MultipleFileUploadResponseDto {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _successful_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Successfully uploaded files',
                    type: [FileUploadResponseDto]
                })];
            _failed_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Failed uploads with error messages',
                    example: [
                        { fileName: 'invalid.txt', error: 'File type not allowed' }
                    ]
                })];
            _totalProcessed_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total number of files processed',
                    example: 5
                })];
            _successCount_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of successful uploads',
                    example: 4
                })];
            _failureCount_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of failed uploads',
                    example: 1
                })];
            __esDecorate(null, null, _successful_decorators, { kind: "field", name: "successful", static: false, private: false, access: { has: obj => "successful" in obj, get: obj => obj.successful, set: (obj, value) => { obj.successful = value; } }, metadata: _metadata }, _successful_initializers, _successful_extraInitializers);
            __esDecorate(null, null, _failed_decorators, { kind: "field", name: "failed", static: false, private: false, access: { has: obj => "failed" in obj, get: obj => obj.failed, set: (obj, value) => { obj.failed = value; } }, metadata: _metadata }, _failed_initializers, _failed_extraInitializers);
            __esDecorate(null, null, _totalProcessed_decorators, { kind: "field", name: "totalProcessed", static: false, private: false, access: { has: obj => "totalProcessed" in obj, get: obj => obj.totalProcessed, set: (obj, value) => { obj.totalProcessed = value; } }, metadata: _metadata }, _totalProcessed_initializers, _totalProcessed_extraInitializers);
            __esDecorate(null, null, _successCount_decorators, { kind: "field", name: "successCount", static: false, private: false, access: { has: obj => "successCount" in obj, get: obj => obj.successCount, set: (obj, value) => { obj.successCount = value; } }, metadata: _metadata }, _successCount_initializers, _successCount_extraInitializers);
            __esDecorate(null, null, _failureCount_decorators, { kind: "field", name: "failureCount", static: false, private: false, access: { has: obj => "failureCount" in obj, get: obj => obj.failureCount, set: (obj, value) => { obj.failureCount = value; } }, metadata: _metadata }, _failureCount_initializers, _failureCount_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        successful = __runInitializers(this, _successful_initializers, void 0);
        failed = (__runInitializers(this, _successful_extraInitializers), __runInitializers(this, _failed_initializers, void 0));
        totalProcessed = (__runInitializers(this, _failed_extraInitializers), __runInitializers(this, _totalProcessed_initializers, void 0));
        successCount = (__runInitializers(this, _totalProcessed_extraInitializers), __runInitializers(this, _successCount_initializers, void 0));
        failureCount = (__runInitializers(this, _successCount_extraInitializers), __runInitializers(this, _failureCount_initializers, void 0));
        constructor() {
            __runInitializers(this, _failureCount_extraInitializers);
        }
    };
})();
exports.MultipleFileUploadResponseDto = MultipleFileUploadResponseDto;
//# sourceMappingURL=file-upload.dto.js.map