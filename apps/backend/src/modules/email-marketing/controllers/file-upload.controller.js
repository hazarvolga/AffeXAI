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
exports.FileUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const file_upload_dto_1 = require("../dto/file-upload.dto");
let FileUploadController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('File Upload'), (0, common_1.Controller)('email-marketing/files'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _uploadFile_decorators;
    let _uploadMultipleFiles_decorators;
    let _validateFile_decorators;
    let _getFileInfo_decorators;
    let _deleteFile_decorators;
    let _getUploadStats_decorators;
    let _cleanupOldFiles_decorators;
    var FileUploadController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _uploadFile_decorators = [(0, common_1.Post)('upload'), (0, swagger_1.ApiOperation)({
                    summary: 'Upload a single file',
                    description: 'Upload a CSV or Excel file for bulk import processing with security validation'
                }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiResponse)({
                    status: 201,
                    description: 'File uploaded successfully',
                    type: file_upload_dto_1.FileUploadResponseDto
                }), (0, swagger_1.ApiResponse)({
                    status: 400,
                    description: 'Invalid file or upload parameters'
                }), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
                    limits: {
                        fileSize: 50 * 1024 * 1024, // 50MB
                        files: 1
                    },
                    fileFilter: (req, file, callback) => {
                        const allowedMimeTypes = [
                            'text/csv',
                            'application/csv',
                            'text/plain',
                            'application/vnd.ms-excel',
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        ];
                        if (allowedMimeTypes.includes(file.mimetype)) {
                            callback(null, true);
                        }
                        else {
                            callback(new common_1.BadRequestException(`File type ${file.mimetype} is not allowed`), false);
                        }
                    }
                }))];
            _uploadMultipleFiles_decorators = [(0, common_1.Post)('upload/multiple'), (0, swagger_1.ApiOperation)({
                    summary: 'Upload multiple files',
                    description: 'Upload multiple CSV or Excel files for batch processing'
                }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiResponse)({
                    status: 201,
                    description: 'Files processed (some may have failed)',
                    type: file_upload_dto_1.MultipleFileUploadResponseDto
                }), (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
                    limits: {
                        fileSize: 50 * 1024 * 1024, // 50MB per file
                        files: 10
                    }
                }))];
            _validateFile_decorators = [(0, common_1.Post)('validate'), (0, swagger_1.ApiOperation)({
                    summary: 'Validate file without uploading',
                    description: 'Validate file type, size, and security without storing the file'
                }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'File validation completed',
                    type: file_upload_dto_1.FileValidationResponseDto
                }), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
                    limits: {
                        fileSize: 50 * 1024 * 1024
                    }
                }))];
            _getFileInfo_decorators = [(0, common_1.Get)('info/:jobId/:fileName'), (0, swagger_1.ApiOperation)({
                    summary: 'Get file information',
                    description: 'Get information about an uploaded file without downloading it'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'File information retrieved',
                    type: file_upload_dto_1.FileInfoResponseDto
                })];
            _deleteFile_decorators = [(0, common_1.Delete)(':jobId/:fileName'), (0, swagger_1.ApiOperation)({
                    summary: 'Delete uploaded file',
                    description: 'Securely delete an uploaded file'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'File deleted successfully'
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'File not found'
                })];
            _getUploadStats_decorators = [(0, common_1.Get)('stats'), (0, swagger_1.ApiOperation)({
                    summary: 'Get upload statistics',
                    description: 'Get statistics about uploaded files'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Upload statistics retrieved',
                    type: file_upload_dto_1.UploadStatsResponseDto
                })];
            _cleanupOldFiles_decorators = [(0, common_1.Post)('cleanup'), (0, swagger_1.ApiOperation)({
                    summary: 'Clean up old files',
                    description: 'Remove uploaded files older than specified hours'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Cleanup completed',
                    type: file_upload_dto_1.CleanupResponseDto
                })];
            __esDecorate(this, null, _uploadFile_decorators, { kind: "method", name: "uploadFile", static: false, private: false, access: { has: obj => "uploadFile" in obj, get: obj => obj.uploadFile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _uploadMultipleFiles_decorators, { kind: "method", name: "uploadMultipleFiles", static: false, private: false, access: { has: obj => "uploadMultipleFiles" in obj, get: obj => obj.uploadMultipleFiles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _validateFile_decorators, { kind: "method", name: "validateFile", static: false, private: false, access: { has: obj => "validateFile" in obj, get: obj => obj.validateFile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getFileInfo_decorators, { kind: "method", name: "getFileInfo", static: false, private: false, access: { has: obj => "getFileInfo" in obj, get: obj => obj.getFileInfo }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteFile_decorators, { kind: "method", name: "deleteFile", static: false, private: false, access: { has: obj => "deleteFile" in obj, get: obj => obj.deleteFile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getUploadStats_decorators, { kind: "method", name: "getUploadStats", static: false, private: false, access: { has: obj => "getUploadStats" in obj, get: obj => obj.getUploadStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _cleanupOldFiles_decorators, { kind: "method", name: "cleanupOldFiles", static: false, private: false, access: { has: obj => "cleanupOldFiles" in obj, get: obj => obj.cleanupOldFiles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FileUploadController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        fileUploadService = __runInitializers(this, _instanceExtraInitializers);
        securityService;
        fileProcessingService;
        logger = new common_1.Logger(FileUploadController.name);
        constructor(fileUploadService, securityService, fileProcessingService) {
            this.fileUploadService = fileUploadService;
            this.securityService = securityService;
            this.fileProcessingService = fileProcessingService;
        }
        async uploadFile(file, options = {}) {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            this.logger.log(`File upload request: ${file.originalname} (${file.size} bytes)`);
            try {
                const result = await this.fileUploadService.uploadFile(file, options);
                this.logger.log(`File upload successful: ${result.jobId}`);
                return result;
            }
            catch (error) {
                this.logger.error(`File upload failed: ${error.message}`);
                throw error;
            }
        }
        async uploadMultipleFiles(files, options = {}) {
            if (!files || files.length === 0) {
                throw new common_1.BadRequestException('No files provided');
            }
            this.logger.log(`Multiple file upload request: ${files.length} files`);
            try {
                const results = await this.fileUploadService.uploadMultipleFiles(files, options);
                const response = {
                    successful: results,
                    failed: [], // FileUploadService handles failures internally
                    totalProcessed: files.length,
                    successCount: results.length,
                    failureCount: files.length - results.length
                };
                this.logger.log(`Multiple file upload completed: ${response.successCount}/${response.totalProcessed} successful`);
                return response;
            }
            catch (error) {
                this.logger.error(`Multiple file upload failed: ${error.message}`);
                throw error;
            }
        }
        async validateFile(file) {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            this.logger.log(`File validation request: ${file.originalname}`);
            try {
                const result = await this.fileProcessingService.validateFileType(file);
                this.logger.log(`File validation completed: ${result.isValid ? 'VALID' : 'INVALID'}`);
                return result;
            }
            catch (error) {
                this.logger.error(`File validation failed: ${error.message}`);
                throw error;
            }
        }
        async getFileInfo(jobId, fileName) {
            this.logger.log(`File info request: ${jobId}/${fileName}`);
            try {
                // Construct secure file path using FileProcessingService
                const filePath = this.fileProcessingService.generateSecureFilePath(fileName, jobId);
                const result = await this.fileUploadService.getFileInfo(filePath);
                this.logger.log(`File info retrieved: ${result.exists ? 'EXISTS' : 'NOT_FOUND'}`);
                return result;
            }
            catch (error) {
                this.logger.error(`File info retrieval failed: ${error.message}`);
                throw error;
            }
        }
        async deleteFile(jobId, fileName) {
            this.logger.log(`File deletion request: ${jobId}/${fileName}`);
            try {
                // Construct secure file path using FileProcessingService
                const filePath = this.fileProcessingService.generateSecureFilePath(fileName, jobId);
                const success = await this.fileUploadService.deleteFile(filePath);
                const message = success ? 'File deleted successfully' : 'File not found or could not be deleted';
                this.logger.log(`File deletion completed: ${success ? 'SUCCESS' : 'FAILED'}`);
                return { success, message };
            }
            catch (error) {
                this.logger.error(`File deletion failed: ${error.message}`);
                throw error;
            }
        }
        async getUploadStats() {
            this.logger.log('Upload stats request');
            try {
                const stats = await this.fileUploadService.getUploadStats();
                this.logger.log(`Upload stats retrieved: ${stats.totalFiles} files, ${stats.totalSize} bytes`);
                return stats;
            }
            catch (error) {
                this.logger.error(`Upload stats retrieval failed: ${error.message}`);
                throw error;
            }
        }
        async cleanupOldFiles(maxAgeHours = 24) {
            this.logger.log(`Cleanup request: files older than ${maxAgeHours} hours`);
            try {
                const cleanedCount = await this.fileUploadService.cleanupOldFiles(maxAgeHours);
                const response = {
                    cleanedCount,
                    cleanedAt: new Date()
                };
                this.logger.log(`Cleanup completed: ${cleanedCount} files removed`);
                return response;
            }
            catch (error) {
                this.logger.error(`Cleanup failed: ${error.message}`);
                throw error;
            }
        }
    };
    return FileUploadController = _classThis;
})();
exports.FileUploadController = FileUploadController;
//# sourceMappingURL=file-upload.controller.js.map