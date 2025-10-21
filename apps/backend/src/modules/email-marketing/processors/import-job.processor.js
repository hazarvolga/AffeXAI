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
exports.ImportJobProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const import_job_entity_1 = require("../entities/import-job.entity");
const import_result_entity_1 = require("../entities/import-result.entity");
let ImportJobProcessor = (() => {
    let _classDecorators = [(0, bullmq_1.Processor)('import'), (0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = bullmq_1.WorkerHost;
    let _instanceExtraInitializers = [];
    let _onCompleted_decorators;
    let _onFailed_decorators;
    let _onProgress_decorators;
    var ImportJobProcessor = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _onCompleted_decorators = [(0, bullmq_1.OnWorkerEvent)('completed')];
            _onFailed_decorators = [(0, bullmq_1.OnWorkerEvent)('failed')];
            _onProgress_decorators = [(0, bullmq_1.OnWorkerEvent)('progress')];
            __esDecorate(this, null, _onCompleted_decorators, { kind: "method", name: "onCompleted", static: false, private: false, access: { has: obj => "onCompleted" in obj, get: obj => obj.onCompleted }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onFailed_decorators, { kind: "method", name: "onFailed", static: false, private: false, access: { has: obj => "onFailed" in obj, get: obj => obj.onFailed }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _onProgress_decorators, { kind: "method", name: "onProgress", static: false, private: false, access: { has: obj => "onProgress" in obj, get: obj => obj.onProgress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ImportJobProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        bulkImportService = __runInitializers(this, _instanceExtraInitializers);
        fileProcessingService;
        emailValidationService;
        importIntegrationService;
        importResultRepository;
        logger = new common_1.Logger(ImportJobProcessor.name);
        constructor(bulkImportService, fileProcessingService, emailValidationService, importIntegrationService, importResultRepository) {
            super();
            this.bulkImportService = bulkImportService;
            this.fileProcessingService = fileProcessingService;
            this.emailValidationService = emailValidationService;
            this.importIntegrationService = importIntegrationService;
            this.importResultRepository = importResultRepository;
        }
        async process(job) {
            const { jobId, filePath, options } = job.data;
            this.logger.log(`Processing import job ${jobId}`);
            try {
                // Update job status to processing
                await this.bulkImportService.updateJobProgress(jobId, {
                    status: import_job_entity_1.ImportJobStatus.PROCESSING,
                    progressPercentage: 0
                });
                // Step 1: Parse CSV file
                const parseResult = await this.fileProcessingService.parseCsvFile(filePath);
                if (parseResult.errors.length > 0) {
                    this.logger.warn(`CSV parsing warnings for job ${jobId}:`, parseResult.errors);
                }
                // Step 2: Process data in batches
                const batchSize = options.batchSize || 100;
                const totalRows = parseResult.data.length;
                let processedCount = 0;
                let validCount = 0;
                let invalidCount = 0;
                let riskyCount = 0;
                let duplicateCount = 0;
                this.logger.log(`Processing ${totalRows} records in batches of ${batchSize}`);
                for (let i = 0; i < totalRows; i += batchSize) {
                    const batch = parseResult.data.slice(i, i + batchSize);
                    // Process batch
                    const batchResults = await this.processBatch(jobId, batch, options, i + 1);
                    // Update counters
                    batchResults.forEach(result => {
                        switch (result.status) {
                            case import_result_entity_1.ImportResultStatus.VALID:
                                validCount++;
                                break;
                            case import_result_entity_1.ImportResultStatus.INVALID:
                                invalidCount++;
                                break;
                            case import_result_entity_1.ImportResultStatus.RISKY:
                                riskyCount++;
                                break;
                            case import_result_entity_1.ImportResultStatus.DUPLICATE:
                                duplicateCount++;
                                break;
                        }
                    });
                    processedCount += batch.length;
                    const progressPercentage = (processedCount / totalRows) * 100;
                    // Update job progress
                    await this.bulkImportService.updateJobProgress(jobId, {
                        processedRecords: processedCount,
                        validRecords: validCount,
                        invalidRecords: invalidCount,
                        riskyRecords: riskyCount,
                        duplicateRecords: duplicateCount,
                        progressPercentage
                    });
                    this.logger.log(`Job ${jobId}: Processed ${processedCount}/${totalRows} records (${progressPercentage.toFixed(1)}%)`);
                    // Small delay to prevent overwhelming the system
                    if (i + batchSize < totalRows) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                }
                // Step 3: Generate validation summary
                const validationSummary = {
                    totalProcessed: processedCount,
                    validEmails: validCount,
                    invalidEmails: invalidCount,
                    riskyEmails: riskyCount,
                    duplicates: duplicateCount,
                    averageConfidenceScore: await this.calculateAverageConfidence(jobId),
                    processingTimeMs: Date.now() - job.timestamp
                };
                // Step 4: Process valid results and create/update subscribers
                this.logger.log(`Processing ${validCount} valid records for subscriber creation/update`);
                const integrationSummary = await this.importIntegrationService.processImportResults(jobId, {
                    groupIds: options.groupIds,
                    segmentIds: options.segmentIds,
                    duplicateHandling: options.duplicateHandling,
                    validationThreshold: options.validationThreshold,
                    columnMapping: options.columnMapping
                });
                this.logger.log(`Integration completed: Created ${integrationSummary.created}, Updated ${integrationSummary.updated}, Skipped ${integrationSummary.skipped}, Failed ${integrationSummary.failed}`);
                // Step 5: Complete the job
                await this.bulkImportService.updateJobProgress(jobId, {
                    status: import_job_entity_1.ImportJobStatus.COMPLETED,
                    progressPercentage: 100,
                    validationSummary
                });
                // Step 6: Clean up temporary files
                await this.fileProcessingService.cleanupTempFiles(jobId);
                this.logger.log(`Import job ${jobId} completed successfully. Valid: ${validCount}, Invalid: ${invalidCount}, Risky: ${riskyCount}, Duplicates: ${duplicateCount}`);
            }
            catch (error) {
                this.logger.error(`Import job ${jobId} failed:`, error);
                await this.bulkImportService.updateJobProgress(jobId, {
                    status: import_job_entity_1.ImportJobStatus.FAILED,
                    error: error.message
                });
                // Clean up on failure
                await this.fileProcessingService.cleanupTempFiles(jobId);
                throw error;
            }
        }
        /**
         * Process a batch of records
         */
        async processBatch(jobId, batch, options, startRowNumber) {
            const results = [];
            for (let i = 0; i < batch.length; i++) {
                const row = batch[i];
                const rowNumber = startRowNumber + i;
                try {
                    const result = await this.processRecord(jobId, row, options, rowNumber);
                    results.push(result);
                }
                catch (error) {
                    this.logger.error(`Error processing row ${rowNumber} in job ${jobId}:`);
                    this.logger.error(error);
                    // Find email column for error reporting
                    const emailColumn = Object.keys(options.columnMapping).find(col => options.columnMapping[col] === 'email');
                    // Create error result
                    const errorResult = this.importResultRepository.create({
                        importJobId: jobId,
                        email: (emailColumn ? row[emailColumn] : null) || 'unknown',
                        status: import_result_entity_1.ImportResultStatus.INVALID,
                        confidenceScore: 0,
                        imported: false,
                        error: error.message,
                        originalData: row,
                        rowNumber
                    });
                    results.push(await this.importResultRepository.save(errorResult));
                }
            }
            return results;
        }
        /**
         * Process a single record
         */
        async processRecord(jobId, row, options, rowNumber) {
            // Find CSV column mapped to 'email' field
            // columnMapping format: { 'CSV Column Name': 'fieldKey' }
            const emailColumn = Object.keys(options.columnMapping).find(col => options.columnMapping[col] === 'email');
            const email = emailColumn ? row[emailColumn] : null;
            // DEBUG: Log first row to see mapping
            if (rowNumber === 1) {
                this.logger.debug(`Row data keys: ${Object.keys(row).join(', ')}`);
                this.logger.debug(`Column mapping: ${JSON.stringify(options.columnMapping)}`);
                this.logger.debug(`Email column found: ${emailColumn}`);
                this.logger.debug(`Email value: ${email}`);
            }
            if (!email) {
                throw new Error('Email field is required');
            }
            // Step 1: Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return this.createImportResult(jobId, {
                    email,
                    status: import_result_entity_1.ImportResultStatus.INVALID,
                    confidenceScore: 0,
                    issues: ['Invalid email format'],
                    imported: false,
                    originalData: row,
                    rowNumber
                });
            }
            // Step 2: Advanced email validation
            let validationResult;
            try {
                validationResult = await this.emailValidationService.validateEmail(email);
            }
            catch (error) {
                this.logger.warn(`Email validation service failed for ${email}:`, error);
                // Fallback to basic validation
                validationResult = {
                    isValid: true,
                    confidenceScore: 50,
                    details: {
                        syntaxValid: true,
                        domainExists: true,
                        mxRecordExists: true,
                        isDisposable: false,
                        isRoleAccount: false,
                        hasTypos: false,
                        ipReputation: 'unknown',
                        confidenceScore: 50,
                        validationProvider: 'fallback',
                        validatedAt: new Date()
                    }
                };
            }
            // Step 3: Determine status based on validation and threshold
            let status;
            const confidenceScore = validationResult.confidenceScore;
            if (!validationResult.isValid || confidenceScore < options.validationThreshold) {
                status = import_result_entity_1.ImportResultStatus.INVALID;
            }
            else if (confidenceScore < 80) {
                status = import_result_entity_1.ImportResultStatus.RISKY;
            }
            else {
                // Check for duplicates
                const duplicateCheck = await this.bulkImportService.checkDuplicates([email], options.duplicateHandling);
                const isDuplicate = duplicateCheck.get(email)?.isDuplicate || false;
                status = isDuplicate ? import_result_entity_1.ImportResultStatus.DUPLICATE : import_result_entity_1.ImportResultStatus.VALID;
            }
            // Step 4: Create import result
            return this.createImportResult(jobId, {
                email,
                status,
                confidenceScore,
                validationDetails: validationResult.details,
                issues: this.extractIssues(validationResult),
                suggestions: this.extractSuggestions(validationResult),
                imported: false, // Will be updated in integration step
                originalData: row,
                rowNumber
            });
        }
        /**
         * Create and save import result
         */
        async createImportResult(jobId, data) {
            const result = this.importResultRepository.create({
                importJobId: jobId,
                ...data
            });
            return await this.importResultRepository.save(result);
        }
        /**
         * Extract issues from validation result
         */
        extractIssues(validationResult) {
            const issues = [];
            if (validationResult.details) {
                const details = validationResult.details;
                if (!details.syntaxValid) {
                    issues.push('Invalid email syntax');
                }
                if (!details.domainExists) {
                    issues.push('Domain does not exist');
                }
                if (!details.mxRecordExists) {
                    issues.push('No MX record found for domain');
                }
                if (details.isDisposable) {
                    issues.push('Disposable email address');
                }
                if (details.isRoleAccount) {
                    issues.push('Role-based email address');
                }
                if (details.hasTypos) {
                    issues.push('Possible typo in email address');
                }
                if (details.ipReputation === 'poor') {
                    issues.push('Domain has poor reputation');
                }
            }
            return issues;
        }
        /**
         * Extract suggestions from validation result
         */
        extractSuggestions(validationResult) {
            const suggestions = [];
            if (validationResult.suggestion) {
                suggestions.push(`Did you mean: ${validationResult.suggestion}?`);
            }
            if (validationResult.details?.hasTypos && validationResult.correctedEmail) {
                suggestions.push(`Consider using: ${validationResult.correctedEmail}`);
            }
            return suggestions;
        }
        /**
         * Calculate average confidence score for the job
         */
        async calculateAverageConfidence(jobId) {
            const result = await this.importResultRepository
                .createQueryBuilder('result')
                .select('AVG(result.confidenceScore)', 'average')
                .where('result.importJobId = :jobId', { jobId })
                .getRawOne();
            return Math.round(result?.average || 0);
        }
        onCompleted(job) {
            this.logger.log(`Import job ${job.data.jobId} completed`);
        }
        onFailed(job, error) {
            this.logger.error(`Import job ${job.data.jobId} failed:`, error);
        }
        onProgress(job, progress) {
            this.logger.debug(`Import job ${job.data.jobId} progress: ${progress}%`);
        }
    };
    return ImportJobProcessor = _classThis;
})();
exports.ImportJobProcessor = ImportJobProcessor;
//# sourceMappingURL=import-job.processor.js.map