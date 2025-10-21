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
exports.BulkImportController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const bulk_import_dto_1 = require("../dto/bulk-import.dto");
let BulkImportController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Bulk Import'), (0, common_1.Controller)('email-marketing/import'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _uploadAndCreateImportJob_decorators;
    let _getImportJobStatus_decorators;
    let _getImportResults_decorators;
    let _getImportJobDetails_decorators;
    let _validateCsvStructure_decorators;
    let _listImportJobs_decorators;
    let _cancelImportJob_decorators;
    let _getImportStatistics_decorators;
    var BulkImportController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _uploadAndCreateImportJob_decorators = [(0, common_1.Post)('upload'), (0, swagger_1.ApiOperation)({
                    summary: 'Upload CSV file and create import job',
                    description: 'Upload a CSV file for bulk subscriber import with validation and processing options'
                }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiResponse)({
                    status: 201,
                    description: 'Import job created successfully',
                    type: bulk_import_dto_1.ImportJobDetailsDto
                }), (0, swagger_1.ApiResponse)({
                    status: 400,
                    description: 'Invalid file or import parameters'
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
            _getImportJobStatus_decorators = [(0, common_1.Get)(':jobId/status'), (0, swagger_1.ApiOperation)({
                    summary: 'Get import job status',
                    description: 'Get current status and progress of an import job'
                }), (0, swagger_1.ApiParam)({
                    name: 'jobId',
                    description: 'Import job ID',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Import job status retrieved',
                    type: bulk_import_dto_1.ImportJobSummaryDto
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'Import job not found'
                })];
            _getImportResults_decorators = [(0, common_1.Get)(':jobId/results'), (0, swagger_1.ApiOperation)({
                    summary: 'Get import validation results',
                    description: 'Get detailed validation results for an import job with pagination'
                }), (0, swagger_1.ApiParam)({
                    name: 'jobId',
                    description: 'Import job ID',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, swagger_1.ApiQuery)({
                    name: 'status',
                    required: false,
                    enum: ['valid', 'invalid', 'risky', 'duplicate'],
                    description: 'Filter results by validation status'
                }), (0, swagger_1.ApiQuery)({
                    name: 'page',
                    required: false,
                    type: Number,
                    description: 'Page number for pagination',
                    example: 1
                }), (0, swagger_1.ApiQuery)({
                    name: 'limit',
                    required: false,
                    type: Number,
                    description: 'Number of results per page',
                    example: 100
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Import results retrieved',
                    type: bulk_import_dto_1.ImportResultListDto
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'Import job not found'
                })];
            _getImportJobDetails_decorators = [(0, common_1.Get)(':jobId/details'), (0, swagger_1.ApiOperation)({
                    summary: 'Get detailed import job information',
                    description: 'Get comprehensive information about an import job including configuration and validation summary'
                }), (0, swagger_1.ApiParam)({
                    name: 'jobId',
                    description: 'Import job ID',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Import job details retrieved',
                    type: bulk_import_dto_1.ImportJobDetailsDto
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'Import job not found'
                })];
            _validateCsvStructure_decorators = [(0, common_1.Post)('validate-csv'), (0, swagger_1.ApiOperation)({
                    summary: 'Validate CSV structure without creating import job',
                    description: 'Upload and validate CSV file structure, get column suggestions without processing'
                }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'CSV validation completed',
                    type: bulk_import_dto_1.CsvValidationDto
                }), (0, swagger_1.ApiResponse)({
                    status: 400,
                    description: 'Invalid file or validation failed'
                }), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
                    limits: {
                        fileSize: 50 * 1024 * 1024, // 50MB
                        files: 1
                    },
                    fileFilter: (req, file, callback) => {
                        const allowedMimeTypes = [
                            'text/csv',
                            'application/csv',
                            'text/plain'
                        ];
                        if (allowedMimeTypes.includes(file.mimetype)) {
                            callback(null, true);
                        }
                        else {
                            callback(new common_1.BadRequestException(`File type ${file.mimetype} is not allowed for CSV validation`), false);
                        }
                    }
                }))];
            _listImportJobs_decorators = [(0, common_1.Get)('jobs'), (0, swagger_1.ApiOperation)({
                    summary: 'List import jobs',
                    description: 'Get paginated list of import jobs with optional filtering'
                }), (0, swagger_1.ApiQuery)({
                    name: 'userId',
                    required: false,
                    type: String,
                    description: 'Filter by user ID'
                }), (0, swagger_1.ApiQuery)({
                    name: 'status',
                    required: false,
                    enum: ['pending', 'processing', 'completed', 'failed'],
                    description: 'Filter by job status'
                }), (0, swagger_1.ApiQuery)({
                    name: 'page',
                    required: false,
                    type: Number,
                    description: 'Page number for pagination',
                    example: 1
                }), (0, swagger_1.ApiQuery)({
                    name: 'limit',
                    required: false,
                    type: Number,
                    description: 'Number of jobs per page',
                    example: 20
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Import jobs list retrieved',
                    type: bulk_import_dto_1.ImportJobListDto
                })];
            _cancelImportJob_decorators = [(0, common_1.Delete)(':jobId'), (0, swagger_1.ApiOperation)({
                    summary: 'Cancel import job',
                    description: 'Cancel a pending or processing import job and clean up associated files'
                }), (0, swagger_1.ApiParam)({
                    name: 'jobId',
                    description: 'Import job ID',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Import job cancelled successfully'
                }), (0, swagger_1.ApiResponse)({
                    status: 400,
                    description: 'Job cannot be cancelled (already completed or failed)'
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'Import job not found'
                })];
            _getImportStatistics_decorators = [(0, common_1.Get)('statistics'), (0, swagger_1.ApiOperation)({
                    summary: 'Get import statistics',
                    description: 'Get overall statistics about import operations'
                }), (0, swagger_1.ApiQuery)({
                    name: 'userId',
                    required: false,
                    type: String,
                    description: 'Filter statistics by user ID'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Import statistics retrieved',
                    type: bulk_import_dto_1.ImportStatisticsDto
                })];
            __esDecorate(this, null, _uploadAndCreateImportJob_decorators, { kind: "method", name: "uploadAndCreateImportJob", static: false, private: false, access: { has: obj => "uploadAndCreateImportJob" in obj, get: obj => obj.uploadAndCreateImportJob }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getImportJobStatus_decorators, { kind: "method", name: "getImportJobStatus", static: false, private: false, access: { has: obj => "getImportJobStatus" in obj, get: obj => obj.getImportJobStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getImportResults_decorators, { kind: "method", name: "getImportResults", static: false, private: false, access: { has: obj => "getImportResults" in obj, get: obj => obj.getImportResults }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getImportJobDetails_decorators, { kind: "method", name: "getImportJobDetails", static: false, private: false, access: { has: obj => "getImportJobDetails" in obj, get: obj => obj.getImportJobDetails }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _validateCsvStructure_decorators, { kind: "method", name: "validateCsvStructure", static: false, private: false, access: { has: obj => "validateCsvStructure" in obj, get: obj => obj.validateCsvStructure }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listImportJobs_decorators, { kind: "method", name: "listImportJobs", static: false, private: false, access: { has: obj => "listImportJobs" in obj, get: obj => obj.listImportJobs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _cancelImportJob_decorators, { kind: "method", name: "cancelImportJob", static: false, private: false, access: { has: obj => "cancelImportJob" in obj, get: obj => obj.cancelImportJob }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getImportStatistics_decorators, { kind: "method", name: "getImportStatistics", static: false, private: false, access: { has: obj => "getImportStatistics" in obj, get: obj => obj.getImportStatistics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BulkImportController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        bulkImportService = __runInitializers(this, _instanceExtraInitializers);
        logger = new common_1.Logger(BulkImportController.name);
        constructor(bulkImportService) {
            this.bulkImportService = bulkImportService;
        }
        async uploadAndCreateImportJob(file, body) {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            this.logger.log(`Import job creation request: ${file.originalname} (${file.size} bytes)`);
            try {
                // Parse options from JSON string if needed
                let options;
                if (typeof body.options === 'string') {
                    try {
                        options = JSON.parse(body.options);
                    }
                    catch (e) {
                        throw new common_1.BadRequestException('Invalid options format. Expected valid JSON.');
                    }
                }
                else {
                    options = body.options;
                }
                if (!options || !options.columnMapping) {
                    throw new common_1.BadRequestException('Missing required field: options.columnMapping');
                }
                const result = await this.bulkImportService.createImportJob({
                    file,
                    options: options,
                    userId: body.userId
                });
                this.logger.log(`Import job created successfully: ${result.id}`);
                return result;
            }
            catch (error) {
                this.logger.error(`Import job creation failed: ${error.message}`);
                throw error;
            }
        }
        async getImportJobStatus(jobId) {
            this.logger.log(`Import job status request: ${jobId}`);
            try {
                const result = await this.bulkImportService.getImportJobSummary(jobId);
                this.logger.log(`Import job status retrieved: ${result.status} (${result.progressPercentage}%)`);
                return result;
            }
            catch (error) {
                this.logger.error(`Import job status retrieval failed: ${error.message}`);
                throw error;
            }
        }
        async getImportResults(jobId, query) {
            this.logger.log(`Import results request: ${jobId} (page: ${query.page || 1}, limit: ${query.limit || 100})`);
            try {
                const result = await this.bulkImportService.getImportResults(jobId, {
                    status: query.status ? query.status : undefined,
                    page: query.page || 1,
                    limit: query.limit || 100
                });
                this.logger.log(`Import results retrieved: ${result.results.length} results (${result.total} total)`);
                return result;
            }
            catch (error) {
                this.logger.error(`Import results retrieval failed: ${error.message}`);
                throw error;
            }
        }
        async getImportJobDetails(jobId) {
            this.logger.log(`Import job details request: ${jobId}`);
            try {
                const result = await this.bulkImportService.getImportJob(jobId);
                this.logger.log(`Import job details retrieved: ${result.fileName} (${result.status})`);
                return result;
            }
            catch (error) {
                this.logger.error(`Import job details retrieval failed: ${error.message}`);
                throw error;
            }
        }
        async validateCsvStructure(file) {
            if (!file) {
                throw new common_1.BadRequestException('No file provided');
            }
            this.logger.log(`CSV validation request: ${file.originalname}`);
            try {
                // Create temporary file path for validation
                const tempPath = `/tmp/csv-validation-${Date.now()}-${file.originalname}`;
                // This would typically involve saving the file temporarily
                // For now, we'll use the file buffer directly
                const result = await this.bulkImportService.validateCsvStructure(tempPath);
                this.logger.log(`CSV validation completed: ${result.isValid ? 'VALID' : 'INVALID'} (${result.headers.length} columns)`);
                return result;
            }
            catch (error) {
                this.logger.error(`CSV validation failed: ${error.message}`);
                throw error;
            }
        }
        async listImportJobs(query) {
            this.logger.log(`Import jobs list request: page ${query.page || 1}, limit ${query.limit || 20}`);
            try {
                const result = await this.bulkImportService.listImportJobs({
                    userId: query.userId,
                    status: query.status,
                    page: query.page || 1,
                    limit: query.limit || 20
                });
                this.logger.log(`Import jobs list retrieved: ${result.jobs.length} jobs (${result.total} total)`);
                return result;
            }
            catch (error) {
                this.logger.error(`Import jobs list retrieval failed: ${error.message}`);
                throw error;
            }
        }
        async cancelImportJob(jobId) {
            this.logger.log(`Import job cancellation request: ${jobId}`);
            try {
                await this.bulkImportService.cancelImportJob(jobId);
                const message = 'Import job cancelled successfully';
                this.logger.log(`Import job cancelled: ${jobId}`);
                return { success: true, message };
            }
            catch (error) {
                this.logger.error(`Import job cancellation failed: ${error.message}`);
                throw error;
            }
        }
        async getImportStatistics(userId) {
            this.logger.log(`Import statistics request${userId ? ` for user: ${userId}` : ''}`);
            try {
                const result = await this.bulkImportService.getImportStatistics(userId);
                this.logger.log(`Import statistics retrieved: ${result.totalJobs} jobs, ${result.averageSuccessRate}% success rate`);
                return result;
            }
            catch (error) {
                this.logger.error(`Import statistics retrieval failed: ${error.message}`);
                throw error;
            }
        }
    };
    return BulkImportController = _classThis;
})();
exports.BulkImportController = BulkImportController;
//# sourceMappingURL=bulk-import.controller.js.map