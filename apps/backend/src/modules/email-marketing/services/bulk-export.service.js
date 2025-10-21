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
exports.BulkExportService = void 0;
const common_1 = require("@nestjs/common");
const export_job_entity_1 = require("../entities/export-job.entity");
const path = __importStar(require("path"));
const fs = __importStar(require("fs/promises"));
const csv_writer_1 = require("csv-writer");
const XLSX = __importStar(require("xlsx"));
let BulkExportService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BulkExportService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BulkExportService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        exportJobRepository;
        subscriberRepository;
        groupRepository;
        segmentRepository;
        complianceService;
        exportQueue;
        logger = new common_1.Logger(BulkExportService.name);
        exportDir = path.join(process.cwd(), 'temp', 'exports');
        constructor(exportJobRepository, subscriberRepository, groupRepository, segmentRepository, complianceService, exportQueue) {
            this.exportJobRepository = exportJobRepository;
            this.subscriberRepository = subscriberRepository;
            this.groupRepository = groupRepository;
            this.segmentRepository = segmentRepository;
            this.complianceService = complianceService;
            this.exportQueue = exportQueue;
            this.ensureExportDirectory();
        }
        async ensureExportDirectory() {
            try {
                await fs.access(this.exportDir);
            }
            catch {
                await fs.mkdir(this.exportDir, { recursive: true });
            }
        }
        /**
         * Create a new export job
         */
        async createExportJob(filters, options, userId) {
            try {
                // Validate filters and options
                await this.validateExportRequest(filters, options);
                // Generate unique filename
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const fileName = `subscribers-export-${timestamp}.${options.format}`;
                const filePath = path.join(this.exportDir, fileName);
                // Calculate expiration date (7 days from now)
                const expiresAt = new Date();
                expiresAt.setDate(expiresAt.getDate() + 7);
                // Create export job
                const exportJob = this.exportJobRepository.create({
                    fileName,
                    filePath,
                    status: export_job_entity_1.ExportJobStatus.PENDING,
                    filters,
                    options,
                    expiresAt,
                    userId,
                    totalRecords: 0,
                    processedRecords: 0,
                    progressPercentage: 0,
                });
                const savedJob = await this.exportJobRepository.save(exportJob);
                // Add job to queue for processing
                await this.exportQueue.add('process-export', {
                    jobId: savedJob.id,
                    filters,
                    options,
                }, {
                    attempts: 3,
                    backoff: {
                        type: 'exponential',
                        delay: 2000,
                    },
                });
                this.logger.log(`Created export job ${savedJob.id} for user ${userId}`);
                return savedJob;
            }
            catch (error) {
                this.logger.error(`Failed to create export job: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Get export job status
         */
        async getExportStatus(jobId) {
            const job = await this.exportJobRepository.findOne({ where: { id: jobId } });
            if (!job) {
                throw new common_1.NotFoundException(`Export job ${jobId} not found`);
            }
            return job;
        }
        /**
         * Build subscriber query with filters
         */
        async buildSubscriberQuery(filters) {
            const query = this.subscriberRepository.createQueryBuilder('subscriber');
            // Filter by status
            if (filters.status && filters.status.length > 0) {
                query.andWhere('subscriber.status IN (:...statuses)', { statuses: filters.status });
            }
            // Filter by groups
            if (filters.groupIds && filters.groupIds.length > 0) {
                query.andWhere('JSON_OVERLAPS(subscriber.groups, :groupIds)', {
                    groupIds: JSON.stringify(filters.groupIds),
                });
            }
            // Filter by segments
            if (filters.segmentIds && filters.segmentIds.length > 0) {
                query.andWhere('JSON_OVERLAPS(subscriber.segments, :segmentIds)', {
                    segmentIds: JSON.stringify(filters.segmentIds),
                });
            }
            // Filter by date range
            if (filters.dateRange) {
                if (filters.dateRange.start) {
                    query.andWhere('subscriber.subscribedAt >= :startDate', {
                        startDate: filters.dateRange.start,
                    });
                }
                if (filters.dateRange.end) {
                    query.andWhere('subscriber.subscribedAt <= :endDate', {
                        endDate: filters.dateRange.end,
                    });
                }
            }
            // Filter by validation status
            if (filters.validationStatus && filters.validationStatus.length > 0) {
                query.andWhere('subscriber.mailerCheckResult IN (:...validationStatuses)', {
                    validationStatuses: filters.validationStatus,
                });
            }
            return query;
        }
        /**
         * Format subscriber data for export
         */
        async formatSubscriberData(subscribers, options) {
            const formattedData = [];
            for (const subscriber of subscribers) {
                const row = {};
                // Add selected fields
                for (const field of options.fields) {
                    switch (field) {
                        case 'email':
                            row.email = subscriber.email;
                            break;
                        case 'firstName':
                            row.firstName = subscriber.firstName || '';
                            break;
                        case 'lastName':
                            row.lastName = subscriber.lastName || '';
                            break;
                        case 'company':
                            row.company = subscriber.company || '';
                            break;
                        case 'phone':
                            row.phone = subscriber.phone || '';
                            break;
                        case 'status':
                            row.status = subscriber.status;
                            break;
                        case 'customerStatus':
                            row.customerStatus = subscriber.customerStatus || '';
                            break;
                        case 'subscriptionType':
                            row.subscriptionType = subscriber.subscriptionType || '';
                            break;
                        case 'location':
                            row.location = subscriber.location || '';
                            break;
                        case 'sent':
                            row.sent = subscriber.sent;
                            break;
                        case 'opens':
                            row.opens = subscriber.opens;
                            break;
                        case 'clicks':
                            row.clicks = subscriber.clicks;
                            break;
                        case 'subscribedAt':
                            row.subscribedAt = subscriber.subscribedAt.toISOString();
                            break;
                        case 'lastUpdated':
                            row.lastUpdated = subscriber.lastUpdated.toISOString();
                            break;
                        case 'groups':
                            row.groups = Array.isArray(subscriber.groups)
                                ? subscriber.groups.join(';')
                                : '';
                            break;
                        case 'segments':
                            row.segments = Array.isArray(subscriber.segments)
                                ? subscriber.segments.join(';')
                                : '';
                            break;
                        default:
                            // Handle custom fields or metadata
                            if (options.includeMetadata && field.startsWith('metadata.')) {
                                const metadataKey = field.replace('metadata.', '');
                                // Note: This would require a metadata column in the subscriber entity
                                // For now, we'll skip unknown fields
                            }
                            break;
                    }
                }
                formattedData.push(row);
            }
            return formattedData;
        }
        /**
         * Generate CSV file
         */
        async generateCsvFile(data, filePath) {
            if (data.length === 0) {
                // Create empty file with headers
                const headers = ['email']; // Default header
                const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
                    path: filePath,
                    header: headers.map(h => ({ id: h, title: h })),
                });
                await csvWriter.writeRecords([]);
                return;
            }
            const headers = Object.keys(data[0]);
            const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
                path: filePath,
                header: headers.map(header => ({ id: header, title: header })),
            });
            await csvWriter.writeRecords(data);
        }
        /**
         * Generate Excel file
         */
        async generateExcelFile(data, filePath) {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscribers');
            XLSX.writeFile(workbook, filePath);
        }
        /**
         * Update export job progress
         */
        async updateExportProgress(jobId, processedRecords, totalRecords, status) {
            const progressPercentage = totalRecords > 0 ? (processedRecords / totalRecords) * 100 : 0;
            const updateData = {
                processedRecords,
                progressPercentage: Math.round(progressPercentage * 100) / 100,
            };
            if (status) {
                updateData.status = status;
                if (status === export_job_entity_1.ExportJobStatus.COMPLETED || status === export_job_entity_1.ExportJobStatus.FAILED) {
                    updateData.completedAt = new Date();
                }
            }
            await this.exportJobRepository.update(jobId, updateData);
        }
        /**
         * Mark export job as failed
         */
        async markExportAsFailed(jobId, error) {
            await this.exportJobRepository.update(jobId, {
                status: export_job_entity_1.ExportJobStatus.FAILED,
                error,
                completedAt: new Date(),
            });
        }
        /**
         * Get file size and update job
         */
        async updateFileSize(jobId, filePath) {
            try {
                const stats = await fs.stat(filePath);
                await this.exportJobRepository.update(jobId, {
                    fileSizeBytes: stats.size,
                });
            }
            catch (error) {
                this.logger.warn(`Failed to get file size for ${filePath}: ${error.message}`);
            }
        }
        /**
         * Validate export request
         */
        async validateExportRequest(filters, options) {
            // Validate format
            if (!['csv', 'xlsx'].includes(options.format)) {
                throw new common_1.BadRequestException('Invalid export format. Must be csv or xlsx');
            }
            // Validate fields
            if (!options.fields || options.fields.length === 0) {
                throw new common_1.BadRequestException('At least one field must be selected for export');
            }
            const validFields = [
                'email', 'firstName', 'lastName', 'company', 'phone', 'status',
                'customerStatus', 'subscriptionType', 'location', 'sent', 'opens',
                'clicks', 'subscribedAt', 'lastUpdated', 'groups', 'segments'
            ];
            const invalidFields = options.fields.filter(field => !validFields.includes(field) && !field.startsWith('metadata.'));
            if (invalidFields.length > 0) {
                throw new common_1.BadRequestException(`Invalid fields: ${invalidFields.join(', ')}`);
            }
            // Validate batch size
            if (options.batchSize && (options.batchSize < 100 || options.batchSize > 10000)) {
                throw new common_1.BadRequestException('Batch size must be between 100 and 10000');
            }
            // Validate group IDs exist
            if (filters.groupIds && filters.groupIds.length > 0) {
                const existingGroups = await this.groupRepository.findByIds(filters.groupIds);
                if (existingGroups.length !== filters.groupIds.length) {
                    throw new common_1.BadRequestException('One or more group IDs do not exist');
                }
            }
            // Validate segment IDs exist
            if (filters.segmentIds && filters.segmentIds.length > 0) {
                const existingSegments = await this.segmentRepository.findByIds(filters.segmentIds);
                if (existingSegments.length !== filters.segmentIds.length) {
                    throw new common_1.BadRequestException('One or more segment IDs do not exist');
                }
            }
            // Validate date range
            if (filters.dateRange) {
                if (filters.dateRange.start && filters.dateRange.end) {
                    if (filters.dateRange.start > filters.dateRange.end) {
                        throw new common_1.BadRequestException('Start date must be before end date');
                    }
                }
            }
        }
        /**
         * Get available export fields
         */
        getAvailableFields() {
            return [
                'email',
                'firstName',
                'lastName',
                'company',
                'phone',
                'status',
                'customerStatus',
                'subscriptionType',
                'location',
                'sent',
                'opens',
                'clicks',
                'subscribedAt',
                'lastUpdated',
                'groups',
                'segments'
            ];
        }
        /**
         * Clean up expired export files
         */
        async cleanupExpiredExports() {
            try {
                const expiredJobs = await this.exportJobRepository
                    .createQueryBuilder('job')
                    .where('job.expiresAt < :now', { now: new Date() })
                    .andWhere('job.status = :status', { status: export_job_entity_1.ExportJobStatus.COMPLETED })
                    .getMany();
                for (const job of expiredJobs) {
                    try {
                        // Delete file if it exists
                        await fs.unlink(job.filePath);
                        this.logger.log(`Deleted expired export file: ${job.filePath}`);
                    }
                    catch (error) {
                        this.logger.warn(`Failed to delete expired file ${job.filePath}: ${error.message}`);
                    }
                    // Update job status
                    await this.exportJobRepository.update(job.id, {
                        status: export_job_entity_1.ExportJobStatus.FAILED,
                        error: 'Export file expired and was deleted',
                    });
                }
                this.logger.log(`Cleaned up ${expiredJobs.length} expired export files`);
            }
            catch (error) {
                this.logger.error(`Failed to cleanup expired exports: ${error.message}`, error.stack);
            }
        }
        /**
         * List export jobs with pagination and filtering
         */
        async listExportJobs(options = {}) {
            const { userId, status, page = 1, limit = 20 } = options;
            const queryBuilder = this.exportJobRepository.createQueryBuilder('job');
            if (userId) {
                queryBuilder.andWhere('job.userId = :userId', { userId });
            }
            if (status) {
                queryBuilder.andWhere('job.status = :status', { status });
            }
            queryBuilder
                .orderBy('job.createdAt', 'DESC')
                .skip((page - 1) * limit)
                .take(limit);
            const [jobs, total] = await queryBuilder.getManyAndCount();
            return {
                jobs,
                total,
                page,
                limit
            };
        }
        /**
         * Create export job with GDPR compliance
         */
        async createExportJobWithGdprCompliance(filters, options, userId) {
            try {
                this.logger.log('Creating GDPR-compliant export job');
                // Validate GDPR compliance if required
                if (options.gdprCompliance) {
                    const complianceValidation = await this.complianceService.validateBulkExportCompliance(filters, options.gdprCompliance);
                    if (!complianceValidation.isCompliant) {
                        throw new common_1.BadRequestException(`Export failed GDPR compliance validation: ${complianceValidation.issues.join(', ')}`);
                    }
                    this.logger.log(`GDPR compliance validation passed for export`);
                }
                // Create the export job
                return await this.createExportJob(filters, options, userId);
            }
            catch (error) {
                this.logger.error(`Failed to create GDPR-compliant export job: ${error.message}`, error.stack);
                throw error;
            }
        }
        /**
         * Process export with GDPR compliance
         */
        async processExportWithGdprCompliance(jobId, complianceOptions) {
            try {
                this.logger.log(`Processing GDPR-compliant export for job ${jobId}`);
                const job = await this.exportJobRepository.findOne({ where: { id: jobId } });
                if (!job) {
                    throw new common_1.NotFoundException(`Export job ${jobId} not found`);
                }
                // Build query for subscribers
                const query = await this.buildSubscriberQuery(job.filters);
                const subscribers = await query.getMany();
                // Process with compliance service
                const { data: processedData, report } = await this.complianceService.processBulkExportWithCompliance(subscribers, complianceOptions, jobId);
                // Generate file with processed data
                const fileName = `export_${jobId}_${Date.now()}.${job.options.format}`;
                const filePath = path.join(this.exportDir, fileName);
                if (job.options.format === 'csv') {
                    await this.generateCsvFile(processedData, filePath);
                }
                else {
                    await this.generateExcelFile(processedData, filePath);
                }
                // Update job with compliance results
                await this.exportJobRepository.update(jobId, {
                    status: export_job_entity_1.ExportJobStatus.COMPLETED,
                    filePath,
                    fileName,
                    processedRecords: report.compliantRecords,
                    totalRecords: report.totalRecords,
                    progressPercentage: 100,
                    error: report.issues.length > 0 ? report.issues.join('; ') : undefined
                });
                this.logger.log(`GDPR-compliant export completed for job ${jobId}: ${report.compliantRecords}/${report.totalRecords} records`);
            }
            catch (error) {
                this.logger.error(`GDPR-compliant export failed for job ${jobId}:`, error);
                await this.exportJobRepository.update(jobId, {
                    status: export_job_entity_1.ExportJobStatus.FAILED,
                    error: `GDPR compliance processing failed: ${error.message}`,
                    progressPercentage: 100
                });
                throw error;
            }
        }
        /**
         * Cancel export job
         */
        async cancelExportJob(jobId) {
            const job = await this.exportJobRepository.findOne({ where: { id: jobId } });
            if (!job) {
                throw new common_1.NotFoundException(`Export job ${jobId} not found`);
            }
            if (job.status === export_job_entity_1.ExportJobStatus.COMPLETED || job.status === export_job_entity_1.ExportJobStatus.FAILED) {
                throw new common_1.BadRequestException(`Cannot cancel job in ${job.status} status`);
            }
            // Remove from queue if still pending
            if (job.status === export_job_entity_1.ExportJobStatus.PENDING) {
                // Note: Queue job removal would be implemented here
                // await this.exportQueue.removeJobs(jobId);
            }
            await this.exportJobRepository.update(jobId, {
                status: export_job_entity_1.ExportJobStatus.FAILED,
                error: 'Job cancelled by user',
                completedAt: new Date()
            });
            // Clean up partial file if it exists
            try {
                await fs.unlink(job.filePath);
            }
            catch (error) {
                // File might not exist yet, which is fine
                this.logger.debug(`Could not delete file during cancellation: ${error.message}`);
            }
            this.logger.log(`Export job ${jobId} cancelled`);
        }
        /**
         * Clean up old export jobs and files
         */
        async cleanupOldJobs(olderThanDays = 30) {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
            const oldJobs = await this.exportJobRepository.find({
                where: {
                    createdAt: { $lt: cutoffDate }
                }
            });
            let cleanedCount = 0;
            for (const job of oldJobs) {
                try {
                    // Clean up file
                    try {
                        await fs.unlink(job.filePath);
                    }
                    catch (error) {
                        // File might not exist, which is fine
                        this.logger.debug(`Could not delete file during cleanup: ${error.message}`);
                    }
                    // Delete job
                    await this.exportJobRepository.remove(job);
                    cleanedCount++;
                }
                catch (error) {
                    this.logger.warn(`Failed to cleanup export job ${job.id}: ${error.message}`);
                }
            }
            this.logger.log(`Cleaned up ${cleanedCount} old export jobs`);
            return cleanedCount;
        }
    };
    return BulkExportService = _classThis;
})();
exports.BulkExportService = BulkExportService;
//# sourceMappingURL=bulk-export.service.js.map