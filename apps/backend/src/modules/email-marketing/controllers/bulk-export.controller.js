"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkExportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const bulk_export_dto_1 = require("../dto/bulk-export.dto");
const fs = __importStar(require("fs/promises"));
const common_2 = require("@nestjs/common");
let BulkExportController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Bulk Export'), (0, common_1.Controller)('email-marketing/export'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createExportJob_decorators;
    let _getExportStatus_decorators;
    let _listExportJobs_decorators;
    let _downloadExportFile_decorators;
    let _getExportResults_decorators;
    let _getExportDetails_decorators;
    let _deleteExportJob_decorators;
    let _previewExport_decorators;
    let _uploadExportFile_decorators;
    var BulkExportController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createExportJob_decorators = [(0, common_1.Post)(), (0, swagger_1.ApiOperation)({
                    summary: 'Create export job',
                    description: 'Create a new export job with specified filters and options'
                }), (0, swagger_1.ApiResponse)({
                    status: 201,
                    description: 'Export job created successfully',
                    type: bulk_export_dto_1.ExportJobSummaryDto,
                }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid export parameters' })];
            _getExportStatus_decorators = [(0, common_1.Get)(':jobId/status'), (0, swagger_1.ApiOperation)({
                    summary: 'Get export job status',
                    description: 'Get current status and progress of an export job'
                }), (0, swagger_1.ApiParam)({
                    name: 'jobId',
                    description: 'Export job ID',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Export job status retrieved successfully',
                    type: bulk_export_dto_1.ExportJobSummaryDto,
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Export job not found' })];
            _listExportJobs_decorators = [(0, common_1.Get)('jobs'), (0, swagger_1.ApiOperation)({
                    summary: 'List export jobs',
                    description: 'Get paginated list of export jobs with optional filtering'
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
                }), (0, swagger_1.ApiQuery)({
                    name: 'status',
                    required: false,
                    enum: ['pending', 'processing', 'completed', 'failed'],
                    description: 'Filter by job status'
                }), (0, swagger_1.ApiQuery)({
                    name: 'userId',
                    required: false,
                    type: String,
                    description: 'Filter by user ID'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Export jobs retrieved successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            jobs: { type: 'array', items: { $ref: '#/components/schemas/ExportJobSummaryDto' } },
                            total: { type: 'number' },
                            page: { type: 'number' },
                            limit: { type: 'number' }
                        }
                    }
                })];
            _downloadExportFile_decorators = [(0, common_1.Get)(':jobId/download'), (0, swagger_1.ApiOperation)({
                    summary: 'Download export file',
                    description: 'Download the generated export file for a completed export job'
                }), (0, swagger_1.ApiParam)({
                    name: 'jobId',
                    description: 'Export job ID',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, swagger_1.ApiResponse)({ status: 200, description: 'File downloaded successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Export job or file not found' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Export not ready for download' })];
            _getExportResults_decorators = [(0, common_1.Get)(':jobId/results'), (0, swagger_1.ApiOperation)({
                    summary: 'Get export results',
                    description: 'Get paginated list of export results with optional filtering'
                }), (0, swagger_1.ApiParam)({
                    name: 'jobId',
                    description: 'Export job ID',
                    example: '123e4567-e89b-12d3-a456-426614174000'
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
                    example: 20
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Export results retrieved successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            results: { type: 'array', items: { type: 'object' } },
                            total: { type: 'number' },
                            page: { type: 'number' },
                            limit: { type: 'number' }
                        }
                    }
                })];
            _getExportDetails_decorators = [(0, common_1.Get)(':jobId/details'), (0, swagger_1.ApiOperation)({
                    summary: 'Get export job details',
                    description: 'Get detailed information about an export job'
                }), (0, swagger_1.ApiParam)({
                    name: 'jobId',
                    description: 'Export job ID',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Export job details retrieved successfully',
                    type: bulk_export_dto_1.ExportJobDetailsDto,
                }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Export job not found' })];
            _deleteExportJob_decorators = [(0, common_1.Delete)(':jobId'), (0, swagger_1.ApiOperation)({
                    summary: 'Delete export job',
                    description: 'Delete an export job and its associated data'
                }), (0, swagger_1.ApiParam)({
                    name: 'jobId',
                    description: 'Export job ID',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, swagger_1.ApiResponse)({ status: 204, description: 'Export job deleted successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Export job not found' })];
            _previewExport_decorators = [(0, common_1.Post)('preview'), (0, swagger_1.ApiOperation)({ summary: 'Preview export statistics' }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Export preview generated successfully',
                    type: bulk_export_dto_1.ExportStatisticsDto,
                })];
            _uploadExportFile_decorators = [(0, common_1.Post)('upload'), (0, swagger_1.ApiOperation)({ summary: 'Upload export file' }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiParam)({
                    name: 'file',
                    description: 'Export file to upload',
                    type: 'string',
                    format: 'binary',
                }), (0, swagger_1.ApiResponse)({
                    status: 201,
                    description: 'Export file uploaded successfully',
                    type: bulk_export_dto_1.ExportJobSummaryDto,
                }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid file' })];
            __esDecorate(this, null, _createExportJob_decorators, { kind: "method", name: "createExportJob", static: false, private: false, access: { has: obj => "createExportJob" in obj, get: obj => obj.createExportJob }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getExportStatus_decorators, { kind: "method", name: "getExportStatus", static: false, private: false, access: { has: obj => "getExportStatus" in obj, get: obj => obj.getExportStatus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listExportJobs_decorators, { kind: "method", name: "listExportJobs", static: false, private: false, access: { has: obj => "listExportJobs" in obj, get: obj => obj.listExportJobs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _downloadExportFile_decorators, { kind: "method", name: "downloadExportFile", static: false, private: false, access: { has: obj => "downloadExportFile" in obj, get: obj => obj.downloadExportFile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getExportResults_decorators, { kind: "method", name: "getExportResults", static: false, private: false, access: { has: obj => "getExportResults" in obj, get: obj => obj.getExportResults }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getExportDetails_decorators, { kind: "method", name: "getExportDetails", static: false, private: false, access: { has: obj => "getExportDetails" in obj, get: obj => obj.getExportDetails }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deleteExportJob_decorators, { kind: "method", name: "deleteExportJob", static: false, private: false, access: { has: obj => "deleteExportJob" in obj, get: obj => obj.deleteExportJob }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _previewExport_decorators, { kind: "method", name: "previewExport", static: false, private: false, access: { has: obj => "previewExport" in obj, get: obj => obj.previewExport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _uploadExportFile_decorators, { kind: "method", name: "uploadExportFile", static: false, private: false, access: { has: obj => "uploadExportFile" in obj, get: obj => obj.uploadExportFile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BulkExportController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        bulkExportService = __runInitializers(this, _instanceExtraInitializers);
        logger = new common_1.Logger(BulkExportController.name);
        constructor(bulkExportService) {
            this.bulkExportService = bulkExportService;
        }
        async createExportJob(createExportDto) {
            this.logger.log(`Export job creation request`);
            try {
                // Build filters from DTO - cast to ExportFilters type
                const filters = {
                    status: createExportDto.status,
                    groupIds: createExportDto.groupIds,
                    segmentIds: createExportDto.segmentIds,
                    validationStatus: createExportDto.validationStatus,
                };
                // Add date range if provided
                if (createExportDto.dateRange) {
                    filters.dateRange = {
                        start: createExportDto.dateRange.start,
                        end: createExportDto.dateRange.end,
                    };
                }
                // Build options from DTO
                const options = {
                    fields: createExportDto.fields,
                    format: createExportDto.format,
                    includeMetadata: createExportDto.includeMetadata || false,
                    batchSize: createExportDto.batchSize || 1000,
                };
                const exportJob = await this.bulkExportService.createExportJob(filters, options);
                this.logger.log(`Export job created successfully: ${exportJob.id}`);
                return this.mapToSummaryDto(exportJob);
            }
            catch (error) {
                this.logger.error(`Export job creation failed: ${error.message}`);
                if (error instanceof common_1.BadRequestException) {
                    throw error;
                }
                throw new common_1.BadRequestException(`Failed to create export job: ${error.message}`);
            }
        }
        async getExportStatus(jobId) {
            this.logger.log(`Export job status request: ${jobId}`);
            try {
                const exportJob = await this.bulkExportService.getExportStatus(jobId);
                this.logger.log(`Export job status retrieved: ${exportJob.status} (${exportJob.progressPercentage}%)`);
                return this.mapToSummaryDto(exportJob);
            }
            catch (error) {
                this.logger.error(`Export job status retrieval failed: ${error.message}`);
                throw error;
            }
        }
        async listExportJobs(query) {
            this.logger.log(`Export jobs list request: page ${query.page || 1}, limit ${query.limit || 20}`);
            try {
                const result = await this.bulkExportService.listExportJobs({
                    userId: query.userId,
                    status: query.status,
                    page: query.page || 1,
                    limit: query.limit || 20
                });
                this.logger.log(`Export jobs list retrieved: ${result.jobs.length} jobs (${result.total} total)`);
                return {
                    jobs: result.jobs.map(job => this.mapToSummaryDto(job)),
                    total: result.total,
                    page: result.page,
                    limit: result.limit
                };
            }
            catch (error) {
                this.logger.error(`Export jobs list retrieval failed: ${error.message}`);
                throw error;
            }
        }
        async downloadExportFile(jobId, res) {
            this.logger.log(`Export file download request: ${jobId}`);
            try {
                const exportJob = await this.bulkExportService.getExportStatus(jobId);
                // Check if export is completed
                if (exportJob.status !== 'completed') {
                    throw new common_1.BadRequestException('Export is not ready for download');
                }
                // Check if file exists
                try {
                    await fs.access(exportJob.filePath);
                }
                catch {
                    throw new common_2.NotFoundException('Export file not found or has expired');
                }
                // Set appropriate headers
                const fileName = exportJob.fileName;
                const mimeType = exportJob.options.format === 'csv'
                    ? 'text/csv'
                    : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                res.setHeader('Content-Type', mimeType);
                res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.setHeader('Pragma', 'no-cache');
                res.setHeader('Expires', '0');
                this.logger.log(`Streaming export file: ${fileName} (${mimeType})`);
                // Stream the file
                const fileStream = require('fs').createReadStream(exportJob.filePath);
                fileStream.pipe(res);
                fileStream.on('end', () => {
                    this.logger.log(`Export file download completed: ${jobId}`);
                });
                fileStream.on('error', (error) => {
                    this.logger.error(`Export file streaming error: ${error.message}`);
                    if (!res.headersSent) {
                        res.status(500).json({ error: 'File streaming failed' });
                    }
                });
            }
            catch (error) {
                this.logger.error(`Export file download failed: ${error.message}`);
                if (error instanceof common_2.NotFoundException || error instanceof common_1.BadRequestException) {
                    throw error;
                }
                throw new common_1.BadRequestException(`Failed to download export file: ${error.message}`);
            }
        }
        async getExportResults(jobId, query) {
            this.logger.log(`Export results request: ${jobId}, page ${query.page || 1}, limit ${query.limit || 20}`);
            try {
                // Get export job status for now
                const exportJob = await this.bulkExportService.getExportStatus(jobId);
                this.logger.log(`Export results retrieved for job ${jobId}`);
                return {
                    results: [],
                    total: exportJob.totalRecords || 0,
                    page: query.page || 1,
                    limit: query.limit || 20
                };
            }
            catch (error) {
                this.logger.error(`Export results retrieval failed: ${error.message}`);
                throw error;
            }
        }
        async getExportDetails(jobId) {
            this.logger.log(`Export job details request: ${jobId}`);
            try {
                const exportJob = await this.bulkExportService.getExportStatus(jobId);
                this.logger.log(`Export job details retrieved: ${exportJob.status} (${exportJob.progressPercentage}%)`);
                return this.mapToDetailsDto(exportJob);
            }
            catch (error) {
                this.logger.error(`Export job details retrieval failed: ${error.message}`);
                throw error;
            }
        }
        async deleteExportJob(jobId) {
            this.logger.log(`Export job deletion request: ${jobId}`);
            try {
                await this.bulkExportService.cancelExportJob(jobId);
                this.logger.log(`Export job deleted successfully: ${jobId}`);
            }
            catch (error) {
                this.logger.error(`Export job deletion failed: ${error.message}`);
                throw error;
            }
        }
        async previewExport(createExportDto) {
            try {
                // Build filters from DTO - cast to ExportFilters type
                const filters = {
                    status: createExportDto.status,
                    groupIds: createExportDto.groupIds,
                    segmentIds: createExportDto.segmentIds,
                    validationStatus: createExportDto.validationStatus,
                };
                // Add date range if provided
                if (createExportDto.dateRange) {
                    filters.dateRange = {
                        start: createExportDto.dateRange.start,
                        end: createExportDto.dateRange.end,
                    };
                }
                // Get count of matching subscribers
                const query = await this.bulkExportService.buildSubscriberQuery(filters);
                const totalSubscribers = await query.getCount();
                // Estimate file size (rough calculation)
                const avgFieldSize = 20; // Average bytes per field
                const fieldCount = createExportDto.fields.length;
                const estimatedFileSizeBytes = totalSubscribers * fieldCount * avgFieldSize;
                // Estimate processing time (rough calculation)
                const recordsPerSecond = 1000; // Estimated processing speed
                const estimatedProcessingTimeSeconds = Math.ceil(totalSubscribers / recordsPerSecond);
                return {
                    totalSubscribers,
                    estimatedFileSizeBytes,
                    estimatedProcessingTimeSeconds,
                    totalExports: 0,
                    activeExports: 0,
                    completedExports: 0,
                    failedExports: 0,
                    totalRecordsExported: 0,
                };
            }
            catch (error) {
                throw new common_1.BadRequestException(`Failed to generate export preview: ${error.message}`);
            }
        }
        async uploadExportFile(file) {
            this.logger.log(`Export file upload request`);
            try {
                // For now, return a placeholder response
                // This endpoint needs proper implementation
                throw new common_1.BadRequestException('Export file upload not yet implemented');
            }
            catch (error) {
                this.logger.error(`Export file upload failed: ${error.message}`);
                if (error instanceof common_1.BadRequestException) {
                    throw error;
                }
                throw new common_1.BadRequestException(`Failed to upload export file: ${error.message}`);
            }
        }
        /**
         * Map export job entity to summary DTO
         */
        mapToSummaryDto(exportJob) {
            return {
                id: exportJob.id,
                fileName: exportJob.fileName,
                status: exportJob.status,
                totalRecords: exportJob.totalRecords,
                processedRecords: exportJob.processedRecords,
                progressPercentage: exportJob.progressPercentage,
                createdAt: exportJob.createdAt,
                completedAt: exportJob.completedAt,
                error: exportJob.error
            };
        }
        /**
         * Map export job entity to details DTO
         */
        mapToDetailsDto(exportJob) {
            return {
                id: exportJob.id,
                fileName: exportJob.fileName,
                status: exportJob.status,
                totalRecords: exportJob.totalRecords,
                processedRecords: exportJob.processedRecords,
                progressPercentage: exportJob.progressPercentage,
                createdAt: exportJob.createdAt,
                completedAt: exportJob.completedAt,
                error: exportJob.error,
                filters: exportJob.filters,
                options: exportJob.options,
                filePath: exportJob.filePath,
                userId: exportJob.userId
            };
        }
    };
    return BulkExportController = _classThis;
})();
exports.BulkExportController = BulkExportController;
//# sourceMappingURL=bulk-export.controller.js.map