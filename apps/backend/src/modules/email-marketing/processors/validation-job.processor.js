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
exports.ValidationJobProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const import_result_entity_1 = require("../entities/import-result.entity");
let ValidationJobProcessor = (() => {
    let _classDecorators = [(0, bullmq_1.Processor)('validation'), (0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = bullmq_1.WorkerHost;
    let _instanceExtraInitializers = [];
    let _onCompleted_decorators;
    let _onFailed_decorators;
    let _onProgress_decorators;
    var ValidationJobProcessor = class extends _classSuper {
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
            ValidationJobProcessor = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        emailValidationService = __runInitializers(this, _instanceExtraInitializers);
        importResultRepository;
        logger = new common_1.Logger(ValidationJobProcessor.name);
        constructor(emailValidationService, importResultRepository) {
            super();
            this.emailValidationService = emailValidationService;
            this.importResultRepository = importResultRepository;
        }
        async process(job) {
            const { jobId, resultIds, options } = job.data;
            this.logger.log(`Processing validation job for import ${jobId} with ${resultIds.length} records`);
            try {
                // Get import results to validate
                const importResults = await this.importResultRepository.findByIds(resultIds);
                if (importResults.length === 0) {
                    this.logger.warn(`No import results found for validation job ${jobId}`);
                    return;
                }
                // Process in batches to avoid overwhelming the validation service
                const batchSize = options.batchSize || 50;
                const totalResults = importResults.length;
                let processedCount = 0;
                for (let i = 0; i < totalResults; i += batchSize) {
                    const batch = importResults.slice(i, i + batchSize);
                    // Validate batch
                    const validationResults = await this.validateBatch(batch, options);
                    // Update import results with validation data
                    await this.updateImportResults(validationResults);
                    processedCount += batch.length;
                    const progress = (processedCount / totalResults) * 100;
                    // Update job progress
                    await job.updateProgress(progress);
                    this.logger.log(`Validation job ${jobId}: Processed ${processedCount}/${totalResults} records (${progress.toFixed(1)}%)`);
                    // Small delay between batches to prevent rate limiting
                    if (i + batchSize < totalResults) {
                        await new Promise(resolve => setTimeout(resolve, 200));
                    }
                }
                this.logger.log(`Validation job for import ${jobId} completed successfully`);
            }
            catch (error) {
                this.logger.error(`Validation job for import ${jobId} failed:`, error);
                throw error;
            }
        }
        /**
         * Validate a batch of import results
         */
        async validateBatch(importResults, options) {
            const results = [];
            // Process each email in the batch
            for (const importResult of importResults) {
                try {
                    const validationResult = await this.validateSingleEmail(importResult.email, options);
                    results.push({
                        resultId: importResult.id,
                        email: importResult.email,
                        ...validationResult
                    });
                }
                catch (error) {
                    this.logger.error(`Failed to validate email ${importResult.email}:`, error);
                    // Create fallback result for failed validation
                    results.push({
                        resultId: importResult.id,
                        email: importResult.email,
                        isValid: false,
                        confidenceScore: 0,
                        details: null,
                        issues: ['Validation service failed'],
                        suggestions: [],
                        status: import_result_entity_1.ImportResultStatus.INVALID
                    });
                }
            }
            return results;
        }
        /**
         * Validate a single email address
         */
        async validateSingleEmail(email, options) {
            // Basic email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return {
                    isValid: false,
                    confidenceScore: 0,
                    details: null,
                    issues: ['Invalid email format'],
                    suggestions: [],
                    status: import_result_entity_1.ImportResultStatus.INVALID
                };
            }
            // Advanced validation using the email validation service
            let validationResult;
            try {
                validationResult = await this.emailValidationService.validateEmail(email);
            }
            catch (error) {
                // Fallback to basic validation if service fails
                this.logger.warn(`Email validation service failed for ${email}, using fallback`);
                return {
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
                    },
                    issues: ['Validation service unavailable'],
                    suggestions: [],
                    status: import_result_entity_1.ImportResultStatus.RISKY
                };
            }
            // Determine status based on validation result and threshold
            const confidenceScore = validationResult.confidenceScore;
            let status;
            if (!validationResult.isValid || confidenceScore < options.validationThreshold) {
                status = import_result_entity_1.ImportResultStatus.INVALID;
            }
            else if (confidenceScore < 80) {
                status = import_result_entity_1.ImportResultStatus.RISKY;
            }
            else {
                status = import_result_entity_1.ImportResultStatus.VALID;
            }
            return {
                isValid: validationResult.isValid,
                confidenceScore,
                details: validationResult.details,
                issues: this.extractIssues(validationResult),
                suggestions: this.extractSuggestions(validationResult),
                status
            };
        }
        /**
         * Update import results with validation data
         */
        async updateImportResults(validationResults) {
            const updatePromises = validationResults.map(result => {
                return this.importResultRepository.update(result.resultId, {
                    status: result.status,
                    confidenceScore: result.confidenceScore,
                    validationDetails: result.details,
                    issues: result.issues,
                    suggestions: result.suggestions
                });
            });
            await Promise.all(updatePromises);
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
        onCompleted(job) {
            this.logger.log(`Validation job for import ${job.data.jobId} completed`);
        }
        onFailed(job, error) {
            this.logger.error(`Validation job for import ${job.data.jobId} failed:`, error);
        }
        onProgress(job, progress) {
            this.logger.debug(`Validation job for import ${job.data.jobId} progress: ${progress}%`);
        }
    };
    return ValidationJobProcessor = _classThis;
})();
exports.ValidationJobProcessor = ValidationJobProcessor;
//# sourceMappingURL=validation-job.processor.js.map