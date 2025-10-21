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
exports.BulkImportService = void 0;
const common_1 = require("@nestjs/common");
const import_job_entity_1 = require("../entities/import-job.entity");
let BulkImportService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BulkImportService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BulkImportService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        importJobRepository;
        importResultRepository;
        fileProcessingService;
        fileUploadService;
        complianceService;
        importQueue;
        logger = new common_1.Logger(BulkImportService.name);
        constructor(importJobRepository, importResultRepository, fileProcessingService, fileUploadService, complianceService, importQueue) {
            this.importJobRepository = importJobRepository;
            this.importResultRepository = importResultRepository;
            this.fileProcessingService = fileProcessingService;
            this.fileUploadService = fileUploadService;
            this.complianceService = complianceService;
            this.importQueue = importQueue;
        }
        /**
         * Create a new import job from uploaded file
         */
        async createImportJob(createDto) {
            this.logger.log(`Creating import job for file: ${createDto.file.originalname}`);
            try {
                // Step 1: Upload and validate file
                const uploadResult = await this.fileUploadService.uploadFile(createDto.file, {
                    generateJobId: true,
                    customPath: 'imports'
                });
                // Step 2: Parse CSV to get structure
                const parseResult = await this.fileProcessingService.parseCsvFile(uploadResult.filePath);
                if (parseResult.errors.length > 0) {
                    this.logger.warn(`CSV parsing warnings for ${uploadResult.jobId}:`, parseResult.errors);
                }
                // Step 3: Validate column mapping
                const isValidMapping = await this.fileProcessingService.validateColumnMapping(createDto.options.columnMapping);
                if (!isValidMapping) {
                    throw new common_1.BadRequestException('Invalid column mapping provided');
                }
                // Step 4: Create import job entity
                const importJob = this.importJobRepository.create({
                    fileName: uploadResult.fileName,
                    originalFileName: uploadResult.originalFileName,
                    filePath: uploadResult.filePath,
                    status: import_job_entity_1.ImportJobStatus.PENDING,
                    totalRecords: parseResult.totalRows,
                    options: createDto.options,
                    columnMapping: createDto.options.columnMapping,
                    userId: createDto.userId,
                    progressPercentage: 0
                });
                const savedJob = await this.importJobRepository.save(importJob);
                // Step 5: Validate GDPR compliance if required
                if (createDto.options.gdprCompliance) {
                    const complianceValidation = await this.complianceService.validateBulkImportCompliance(parseResult.data, createDto.options.gdprCompliance);
                    if (!complianceValidation.isCompliant) {
                        savedJob.status = import_job_entity_1.ImportJobStatus.FAILED;
                        savedJob.error = `GDPR compliance validation failed: ${complianceValidation.issues.join(', ')}`;
                        await this.importJobRepository.save(savedJob);
                        throw new common_1.BadRequestException(`Import failed GDPR compliance validation: ${complianceValidation.issues.join(', ')}`);
                    }
                    this.logger.log(`GDPR compliance validation passed for job ${savedJob.id}`);
                }
                // Step 5: Queue the job for processing
                await this.importQueue.add('process-import', {
                    jobId: savedJob.id,
                    filePath: uploadResult.filePath,
                    options: createDto.options
                }, {
                    attempts: 3,
                    backoff: {
                        type: 'exponential',
                        delay: 2000
                    }
                });
                this.logger.log(`Import job created successfully: ${savedJob.id}`);
                return this.mapToJobDetails(savedJob);
            }
            catch (error) {
                this.logger.error(`Failed to create import job: ${error.message}`, error);
                throw error;
            }
        }
        /**
         * Get import job by ID
         */
        async getImportJob(jobId) {
            const job = await this.importJobRepository.findOne({ where: { id: jobId } });
            if (!job) {
                throw new common_1.NotFoundException(`Import job ${jobId} not found`);
            }
            return this.mapToJobDetails(job);
        }
        /**
         * Get import job summary (lighter version)
         */
        async getImportJobSummary(jobId) {
            const job = await this.importJobRepository.findOne({ where: { id: jobId } });
            if (!job) {
                throw new common_1.NotFoundException(`Import job ${jobId} not found`);
            }
            return this.mapToJobSummary(job);
        }
        /**
         * List import jobs with pagination and filtering
         */
        async listImportJobs(options = {}) {
            const { userId, status, page = 1, limit = 20 } = options;
            const queryBuilder = this.importJobRepository.createQueryBuilder('job');
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
                jobs: jobs.map(job => this.mapToJobSummary(job)),
                total,
                page,
                limit
            };
        }
        /**
         * Update import job status and progress
         */
        async updateJobProgress(jobId, updates) {
            const updateData = { ...updates };
            if (updates.status === import_job_entity_1.ImportJobStatus.COMPLETED || updates.status === import_job_entity_1.ImportJobStatus.FAILED) {
                updateData.completedAt = new Date();
            }
            await this.importJobRepository.update(jobId, updateData);
            this.logger.log(`Updated job ${jobId} progress: ${updates.progressPercentage || 0}%`);
        }
        /**
         * Cancel import job
         */
        async cancelImportJob(jobId) {
            const job = await this.importJobRepository.findOne({ where: { id: jobId } });
            if (!job) {
                throw new common_1.NotFoundException(`Import job ${jobId} not found`);
            }
            if (job.status === import_job_entity_1.ImportJobStatus.COMPLETED || job.status === import_job_entity_1.ImportJobStatus.FAILED) {
                throw new common_1.BadRequestException(`Cannot cancel job in ${job.status} status`);
            }
            // Remove from queue if still pending
            if (job.status === import_job_entity_1.ImportJobStatus.PENDING) {
                // Note: Queue job removal would be implemented here
                // await this.importQueue.removeJobs(jobId);
            }
            await this.importJobRepository.update(jobId, {
                status: import_job_entity_1.ImportJobStatus.FAILED,
                error: 'Job cancelled by user',
                completedAt: new Date()
            });
            // Clean up uploaded file
            await this.fileProcessingService.cleanupTempFiles(jobId);
            this.logger.log(`Import job ${jobId} cancelled`);
        }
        /**
         * Get import results for a job with pagination
         */
        async getImportResults(jobId, options = {}) {
            const { status, page = 1, limit = 100 } = options;
            const queryBuilder = this.importResultRepository.createQueryBuilder('result')
                .where('result.importJobId = :jobId', { jobId });
            if (status) {
                queryBuilder.andWhere('result.status = :status', { status });
            }
            queryBuilder
                .orderBy('result.rowNumber', 'ASC')
                .skip((page - 1) * limit)
                .take(limit);
            const [results, total] = await queryBuilder.getManyAndCount();
            return {
                results,
                total,
                page,
                limit
            };
        }
        /**
         * Check for duplicate subscribers
         */
        async checkDuplicates(emails, duplicateHandling) {
            const results = new Map();
            // This would integrate with SubscriberService to check existing subscribers
            // For now, we'll implement a basic check
            for (const email of emails) {
                // TODO: Implement actual duplicate checking with SubscriberService
                results.set(email, {
                    isDuplicate: false,
                    duplicateType: 'none'
                });
            }
            return results;
        }
        /**
         * Validate CSV structure and suggest column mappings
         */
        async validateCsvStructure(filePath) {
            try {
                const parseResult = await this.fileProcessingService.parseCsvFile(filePath);
                const columnDetection = await this.fileProcessingService.detectColumns(parseResult.data);
                return {
                    isValid: parseResult.errors.length === 0,
                    headers: parseResult.headers,
                    sampleData: parseResult.data.slice(0, 5), // First 5 rows as sample
                    suggestions: columnDetection.suggestions,
                    errors: parseResult.errors.map(e => e.message)
                };
            }
            catch (error) {
                this.logger.error(`CSV structure validation failed: ${error.message}`);
                return {
                    isValid: false,
                    headers: [],
                    sampleData: [],
                    suggestions: [],
                    errors: [error.message]
                };
            }
        }
        /**
         * Get import statistics for dashboard
         */
        async getImportStatistics(userId) {
            const queryBuilder = this.importJobRepository.createQueryBuilder('job');
            if (userId) {
                queryBuilder.where('job.userId = :userId', { userId });
            }
            const jobs = await queryBuilder.getMany();
            const totalJobs = jobs.length;
            const completedJobs = jobs.filter(j => j.status === import_job_entity_1.ImportJobStatus.COMPLETED).length;
            const failedJobs = jobs.filter(j => j.status === import_job_entity_1.ImportJobStatus.FAILED).length;
            const totalRecordsProcessed = jobs.reduce((sum, j) => sum + j.processedRecords, 0);
            const totalValidRecords = jobs.reduce((sum, j) => sum + j.validRecords, 0);
            const averageSuccessRate = totalRecordsProcessed > 0 ? (totalValidRecords / totalRecordsProcessed) * 100 : 0;
            return {
                totalJobs,
                completedJobs,
                failedJobs,
                totalRecordsProcessed,
                totalValidRecords,
                averageSuccessRate
            };
        }
        /**
         * Clean up old import jobs and files
         */
        async cleanupOldJobs(olderThanDays = 30) {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
            const oldJobs = await this.importJobRepository.find({
                where: {
                    createdAt: { $lt: cutoffDate }
                }
            });
            let cleanedCount = 0;
            for (const job of oldJobs) {
                try {
                    // Clean up files
                    await this.fileProcessingService.cleanupTempFiles(job.id);
                    // Delete job and related results (cascade delete should handle results)
                    await this.importJobRepository.remove(job);
                    cleanedCount++;
                }
                catch (error) {
                    this.logger.warn(`Failed to cleanup job ${job.id}: ${error.message}`);
                }
            }
            this.logger.log(`Cleaned up ${cleanedCount} old import jobs`);
            return cleanedCount;
        }
        /**
         * Map ImportJob entity to JobDetails DTO
         */
        mapToJobDetails(job) {
            return {
                id: job.id,
                fileName: job.fileName,
                status: job.status,
                totalRecords: job.totalRecords,
                processedRecords: job.processedRecords,
                validRecords: job.validRecords,
                invalidRecords: job.invalidRecords,
                riskyRecords: job.riskyRecords,
                duplicateRecords: job.duplicateRecords,
                progressPercentage: job.progressPercentage,
                createdAt: job.createdAt,
                completedAt: job.completedAt,
                error: job.error,
                options: job.options,
                columnMapping: job.columnMapping,
                validationSummary: job.validationSummary,
                filePath: job.filePath
            };
        }
        /**
         * Map ImportJob entity to JobSummary DTO
         */
        mapToJobSummary(job) {
            return {
                id: job.id,
                fileName: job.fileName,
                status: job.status,
                totalRecords: job.totalRecords,
                processedRecords: job.processedRecords,
                validRecords: job.validRecords,
                invalidRecords: job.invalidRecords,
                riskyRecords: job.riskyRecords,
                duplicateRecords: job.duplicateRecords,
                progressPercentage: job.progressPercentage,
                createdAt: job.createdAt,
                completedAt: job.completedAt,
                error: job.error
            };
        }
        /**
         * Process import with GDPR compliance
         */
        async processImportWithGdprCompliance(jobId, subscriberData, complianceOptions) {
            try {
                this.logger.log(`Processing import with GDPR compliance for job ${jobId}`);
                // Process with compliance service
                const complianceReport = await this.complianceService.processBulkImportWithCompliance(subscriberData, complianceOptions, jobId);
                // Update job with compliance results
                await this.updateJobProgress(jobId, {
                    status: complianceReport.compliantRecords > 0 ? import_job_entity_1.ImportJobStatus.COMPLETED : import_job_entity_1.ImportJobStatus.FAILED,
                    processedRecords: complianceReport.totalRecords,
                    validRecords: complianceReport.compliantRecords,
                    invalidRecords: complianceReport.nonCompliantRecords,
                    progressPercentage: 100,
                    error: complianceReport.issues.length > 0 ? complianceReport.issues.join('; ') : undefined,
                    validationSummary: {
                        gdprCompliant: complianceReport.compliantRecords,
                        gdprNonCompliant: complianceReport.nonCompliantRecords,
                        consentTracked: complianceReport.consentTracked,
                        gdprRegionAffected: complianceReport.gdprRegionAffected
                    }
                });
                this.logger.log(`GDPR compliant import completed for job ${jobId}: ${complianceReport.compliantRecords}/${complianceReport.totalRecords} processed`);
            }
            catch (error) {
                this.logger.error(`GDPR compliant import failed for job ${jobId}:`, error);
                await this.updateJobProgress(jobId, {
                    status: import_job_entity_1.ImportJobStatus.FAILED,
                    error: `GDPR compliance processing failed: ${error.message}`,
                    progressPercentage: 100
                });
                throw error;
            }
        }
    };
    return BulkImportService = _classThis;
})();
exports.BulkImportService = BulkImportService;
//# sourceMappingURL=bulk-import.service.js.map