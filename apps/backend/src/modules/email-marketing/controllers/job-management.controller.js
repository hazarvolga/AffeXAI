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
exports.JobManagementController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../auth/guards/jwt-auth.guard");
const job_management_dto_1 = require("../dto/job-management.dto");
let JobManagementController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Job Management'), (0, common_1.Controller)('email-marketing/jobs'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _listAllJobs_decorators;
    let _cancelJob_decorators;
    let _cleanupOldJobs_decorators;
    let _getJobStatistics_decorators;
    let _getJobDetails_decorators;
    var JobManagementController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _listAllJobs_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({
                    summary: 'List all jobs',
                    description: 'Get paginated list of both import and export jobs with optional filtering'
                }), (0, swagger_1.ApiQuery)({
                    name: 'type',
                    required: false,
                    enum: ['import', 'export'],
                    description: 'Filter by job type'
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
                    description: 'Jobs list retrieved successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            jobs: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'string' },
                                        type: { type: 'string', enum: ['import', 'export'] },
                                        fileName: { type: 'string' },
                                        status: { type: 'string' },
                                        totalRecords: { type: 'number' },
                                        processedRecords: { type: 'number' },
                                        progressPercentage: { type: 'number' },
                                        createdAt: { type: 'string', format: 'date-time' },
                                        completedAt: { type: 'string', format: 'date-time', nullable: true },
                                        error: { type: 'string', nullable: true }
                                    }
                                }
                            },
                            total: { type: 'number' },
                            page: { type: 'number' },
                            limit: { type: 'number' }
                        }
                    }
                })];
            _cancelJob_decorators = [(0, common_1.Delete)(':jobId'), (0, swagger_1.ApiOperation)({
                    summary: 'Cancel job',
                    description: 'Cancel a pending or processing job and clean up associated files'
                }), (0, swagger_1.ApiParam)({
                    name: 'jobId',
                    description: 'Job ID (import or export)',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Job cancelled successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            jobType: { type: 'string', enum: ['import', 'export'] }
                        }
                    }
                }), (0, swagger_1.ApiResponse)({
                    status: 400,
                    description: 'Job cannot be cancelled (already completed or failed)'
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'Job not found'
                })];
            _cleanupOldJobs_decorators = [(0, common_1.Post)('cleanup'), (0, swagger_1.ApiOperation)({
                    summary: 'Clean up old jobs',
                    description: 'Remove old completed/failed jobs and their associated files'
                }), (0, swagger_1.ApiQuery)({
                    name: 'olderThanDays',
                    required: false,
                    type: Number,
                    description: 'Remove jobs older than specified days',
                    example: 30
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Cleanup completed successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            cleanedJobs: { type: 'number' },
                            cleanedFiles: { type: 'number' },
                            cleanedAt: { type: 'string', format: 'date-time' }
                        }
                    }
                })];
            _getJobStatistics_decorators = [(0, common_1.Get)('statistics'), (0, swagger_1.ApiOperation)({
                    summary: 'Get job statistics',
                    description: 'Get overall statistics about import and export operations'
                }), (0, swagger_1.ApiQuery)({
                    name: 'userId',
                    required: false,
                    type: String,
                    description: 'Filter statistics by user ID'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Job statistics retrieved successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            totalJobs: { type: 'number' },
                            importJobs: { type: 'number' },
                            exportJobs: { type: 'number' },
                            completedJobs: { type: 'number' },
                            failedJobs: { type: 'number' },
                            processingJobs: { type: 'number' },
                            pendingJobs: { type: 'number' },
                            totalRecordsProcessed: { type: 'number' },
                            averageProcessingTime: { type: 'number' }
                        }
                    }
                })];
            _getJobDetails_decorators = [(0, common_1.Get)(':jobId/details'), (0, swagger_1.ApiOperation)({
                    summary: 'Get job details',
                    description: 'Get detailed information about a specific job (import or export)'
                }), (0, swagger_1.ApiParam)({
                    name: 'jobId',
                    description: 'Job ID (import or export)',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                }), (0, swagger_1.ApiResponse)({
                    status: 200,
                    description: 'Job details retrieved successfully',
                    schema: {
                        oneOf: [
                            { $ref: '#/components/schemas/ImportJobDetailsDto' },
                            { $ref: '#/components/schemas/ExportJobResponseDto' }
                        ]
                    }
                }), (0, swagger_1.ApiResponse)({
                    status: 404,
                    description: 'Job not found'
                })];
            __esDecorate(this, null, _listAllJobs_decorators, { kind: "method", name: "listAllJobs", static: false, private: false, access: { has: obj => "listAllJobs" in obj, get: obj => obj.listAllJobs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _cancelJob_decorators, { kind: "method", name: "cancelJob", static: false, private: false, access: { has: obj => "cancelJob" in obj, get: obj => obj.cancelJob }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _cleanupOldJobs_decorators, { kind: "method", name: "cleanupOldJobs", static: false, private: false, access: { has: obj => "cleanupOldJobs" in obj, get: obj => obj.cleanupOldJobs }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getJobStatistics_decorators, { kind: "method", name: "getJobStatistics", static: false, private: false, access: { has: obj => "getJobStatistics" in obj, get: obj => obj.getJobStatistics }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getJobDetails_decorators, { kind: "method", name: "getJobDetails", static: false, private: false, access: { has: obj => "getJobDetails" in obj, get: obj => obj.getJobDetails }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            JobManagementController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        bulkImportService = __runInitializers(this, _instanceExtraInitializers);
        bulkExportService;
        exportCleanupService;
        logger = new common_1.Logger(JobManagementController.name);
        constructor(bulkImportService, bulkExportService, exportCleanupService) {
            this.bulkImportService = bulkImportService;
            this.bulkExportService = bulkExportService;
            this.exportCleanupService = exportCleanupService;
        }
        async listAllJobs(type, status, page, limit, user) {
            const actualPage = page || 1;
            const actualLimit = limit || 20;
            this.logger.log(`Jobs list request: type=${type}, status=${status}, page=${actualPage}, limit=${actualLimit}`);
            try {
                const jobs = [];
                let totalJobs = 0;
                // Fetch import jobs if requested or no type filter
                if (!type || type === 'import') {
                    const importResult = await this.bulkImportService.listImportJobs({
                        userId: user?.id,
                        status: status,
                        page: 1,
                        limit: 1000 // Get all for now, we'll implement proper pagination later
                    });
                    const importJobs = importResult.jobs.map(job => ({
                        id: job.id,
                        type: job_management_dto_1.JobType.IMPORT,
                        fileName: job.fileName,
                        status: job.status,
                        totalRecords: job.totalRecords,
                        processedRecords: job.processedRecords,
                        progressPercentage: job.progressPercentage,
                        createdAt: job.createdAt,
                        completedAt: job.completedAt
                    }));
                    jobs.push(...importJobs);
                    totalJobs += importResult.total;
                }
                // Fetch export jobs if requested or no type filter
                if (!type || type === 'export') {
                    const exportResult = await this.bulkExportService.listExportJobs({
                        userId: user?.id,
                        status,
                        page: 1,
                        limit: 1000 // Get all for now, we'll implement proper pagination later
                    });
                    const exportJobs = exportResult.jobs.map(job => ({
                        id: job.id,
                        type: job_management_dto_1.JobType.EXPORT,
                        fileName: job.fileName,
                        status: job.status,
                        totalRecords: job.totalRecords,
                        processedRecords: job.processedRecords,
                        progressPercentage: job.progressPercentage,
                        createdAt: job.createdAt,
                        completedAt: job.completedAt
                    }));
                    jobs.push(...exportJobs);
                    totalJobs += exportResult.total;
                }
                // Sort by creation date (newest first)
                jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                // Apply pagination
                const startIndex = (actualPage - 1) * actualLimit;
                const endIndex = startIndex + actualLimit;
                const paginatedJobs = jobs.slice(startIndex, endIndex);
                this.logger.log(`Jobs list retrieved: ${paginatedJobs.length} jobs (${totalJobs} total)`);
                return {
                    jobs: paginatedJobs,
                    total: totalJobs,
                    page: actualPage,
                    limit: actualLimit
                };
            }
            catch (error) {
                this.logger.error(`Jobs list retrieval failed: ${error.message}`);
                throw error;
            }
        }
        async cancelJob(jobId) {
            this.logger.log(`Job cancellation request: ${jobId}`);
            try {
                // Try to find and cancel as import job first
                try {
                    await this.bulkImportService.cancelImportJob(jobId);
                    const message = 'Import job cancelled successfully';
                    this.logger.log(`Import job cancelled: ${jobId}`);
                    return { success: true, message, jobType: 'import' };
                }
                catch (importError) {
                    // If not found as import job, try as export job
                    if (importError instanceof common_1.NotFoundException) {
                        try {
                            await this.bulkExportService.cancelExportJob(jobId);
                            const message = 'Export job cancelled successfully';
                            this.logger.log(`Export job cancelled: ${jobId}`);
                            return { success: true, message, jobType: 'export' };
                        }
                        catch (exportError) {
                            if (exportError instanceof common_1.NotFoundException) {
                                throw new common_1.NotFoundException(`Job ${jobId} not found`);
                            }
                            throw exportError;
                        }
                    }
                    throw importError;
                }
            }
            catch (error) {
                this.logger.error(`Job cancellation failed: ${error.message}`);
                throw error;
            }
        }
        async cleanupOldJobs(olderThanDays = 30) {
            this.logger.log(`Job cleanup request: older than ${olderThanDays} days`);
            try {
                // Clean up import jobs
                const cleanedImportJobs = await this.bulkImportService.cleanupOldJobs(olderThanDays);
                // Clean up export jobs
                const cleanedExportJobs = await this.bulkExportService.cleanupOldJobs(olderThanDays);
                const totalCleanedJobs = cleanedImportJobs + cleanedExportJobs;
                const totalCleanedFiles = totalCleanedJobs; // Assuming 1 file per job
                const response = {
                    cleanedCount: totalCleanedJobs,
                    cleanedJobs: totalCleanedJobs,
                    cleanedAt: new Date()
                };
                this.logger.log(`Job cleanup completed: ${totalCleanedJobs} jobs, ${totalCleanedFiles} files`);
                return response;
            }
            catch (error) {
                this.logger.error(`Job cleanup failed: ${error.message}`);
                throw error;
            }
        }
        async getJobStatistics(userId, user) {
            this.logger.log(`Job statistics request${userId ? ` for user: ${userId}` : ''}`);
            try {
                // Use current user if no userId specified
                const targetUserId = userId || user?.id;
                // Get import statistics
                const importStats = await this.bulkImportService.getImportStatistics(targetUserId);
                // Get export statistics (assuming similar method exists)
                // For now, we'll create a basic structure
                const exportStats = {
                    totalJobs: 0,
                    completedJobs: 0,
                    failedJobs: 0,
                    totalRecordsProcessed: 0,
                    totalValidRecords: 0,
                    averageSuccessRate: 0
                };
                // Combine statistics
                const totalJobs = importStats.totalJobs + exportStats.totalJobs;
                const completedJobs = importStats.completedJobs + exportStats.completedJobs;
                const failedJobs = importStats.failedJobs + exportStats.failedJobs;
                const totalRecordsProcessed = importStats.totalRecordsProcessed + exportStats.totalRecordsProcessed;
                // Calculate derived statistics
                const processingJobs = 0; // Would need to query current processing jobs
                const pendingJobs = 0; // Would need to query current pending jobs
                const averageProcessingTime = 0; // Would need to calculate from job completion times
                const statistics = {
                    totalJobs,
                    totalImportJobs: importStats.totalJobs,
                    activeImportJobs: 0, // Would need to query current active jobs
                    completedImportJobs: importStats.completedJobs,
                    failedImportJobs: importStats.failedJobs,
                    totalExportJobs: exportStats.totalJobs,
                    activeExportJobs: 0, // Would need to query current active jobs
                    completedExportJobs: exportStats.completedJobs,
                    failedExportJobs: exportStats.failedJobs,
                    totalRecordsProcessed,
                    completedJobs,
                    failedJobs,
                    processingJobs,
                    pendingJobs,
                    averageProcessingTime
                };
                this.logger.log(`Job statistics retrieved: ${totalJobs} total jobs, ${completedJobs} completed`);
                return statistics;
            }
            catch (error) {
                this.logger.error(`Job statistics retrieval failed: ${error.message}`);
                throw error;
            }
        }
        async getJobDetails(jobId) {
            this.logger.log(`Job details request: ${jobId}`);
            try {
                // Try to find as import job first
                try {
                    const importJob = await this.bulkImportService.getImportJob(jobId);
                    this.logger.log(`Import job details retrieved: ${importJob.fileName}`);
                    return { ...importJob, jobType: 'import' };
                }
                catch (importError) {
                    // If not found as import job, try as export job
                    if (importError instanceof common_1.NotFoundException) {
                        try {
                            const exportJob = await this.bulkExportService.getExportStatus(jobId);
                            this.logger.log(`Export job details retrieved: ${exportJob.fileName}`);
                            return { ...exportJob, jobType: 'export' };
                        }
                        catch (exportError) {
                            if (exportError instanceof common_1.NotFoundException) {
                                throw new common_1.NotFoundException(`Job ${jobId} not found`);
                            }
                            throw exportError;
                        }
                    }
                    throw importError;
                }
            }
            catch (error) {
                this.logger.error(`Job details retrieval failed: ${error.message}`);
                throw error;
            }
        }
    };
    return JobManagementController = _classThis;
})();
exports.JobManagementController = JobManagementController;
//# sourceMappingURL=job-management.controller.js.map