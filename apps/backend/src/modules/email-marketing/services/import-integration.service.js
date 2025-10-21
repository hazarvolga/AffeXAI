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
exports.ImportIntegrationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const import_result_entity_1 = require("../entities/import-result.entity");
let ImportIntegrationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ImportIntegrationService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ImportIntegrationService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        importResultRepository;
        subscriberRepository;
        subscriberService;
        groupService;
        segmentService;
        advancedEmailValidationService;
        logger = new common_1.Logger(ImportIntegrationService.name);
        constructor(importResultRepository, subscriberRepository, subscriberService, groupService, segmentService, advancedEmailValidationService) {
            this.importResultRepository = importResultRepository;
            this.subscriberRepository = subscriberRepository;
            this.subscriberService = subscriberService;
            this.groupService = groupService;
            this.segmentService = segmentService;
            this.advancedEmailValidationService = advancedEmailValidationService;
        }
        /**
         * Process validated import results and create/update subscribers
         */
        async processImportResults(jobId, options) {
            this.logger.log(`Processing import results for job ${jobId}`);
            const summary = {
                totalProcessed: 0,
                created: 0,
                updated: 0,
                skipped: 0,
                failed: 0,
                errors: []
            };
            try {
                // Get all valid and risky import results for the job
                const importResults = await this.importResultRepository.find({
                    where: {
                        importJobId: jobId,
                        status: (0, typeorm_1.In)([import_result_entity_1.ImportResultStatus.VALID, import_result_entity_1.ImportResultStatus.RISKY])
                    },
                    order: { rowNumber: 'ASC' }
                });
                this.logger.log(`Found ${importResults.length} results to process for job ${jobId}`);
                // Process results in batches to avoid memory issues
                const batchSize = 100;
                for (let i = 0; i < importResults.length; i += batchSize) {
                    const batch = importResults.slice(i, i + batchSize);
                    const batchSummary = await this.processBatch(batch, options);
                    // Merge batch summary into total summary
                    summary.totalProcessed += batchSummary.totalProcessed;
                    summary.created += batchSummary.created;
                    summary.updated += batchSummary.updated;
                    summary.skipped += batchSummary.skipped;
                    summary.failed += batchSummary.failed;
                    summary.errors.push(...batchSummary.errors);
                    this.logger.log(`Processed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(importResults.length / batchSize)} for job ${jobId}`);
                }
                this.logger.log(`Import processing completed for job ${jobId}. Created: ${summary.created}, Updated: ${summary.updated}, Skipped: ${summary.skipped}, Failed: ${summary.failed}`);
                return summary;
            }
            catch (error) {
                this.logger.error(`Failed to process import results for job ${jobId}:`, error);
                summary.errors.push(`Processing failed: ${error.message}`);
                return summary;
            }
        }
        /**
         * Process a batch of import results
         */
        async processBatch(importResults, options) {
            const summary = {
                totalProcessed: 0,
                created: 0,
                updated: 0,
                skipped: 0,
                failed: 0,
                errors: []
            };
            for (const result of importResults) {
                try {
                    const importResult = await this.processSubscriber(result, options);
                    // Update import result with subscriber info
                    await this.importResultRepository.update(result.id, {
                        imported: importResult.success,
                        subscriberId: importResult.subscriberId,
                        error: importResult.error
                    });
                    // Update summary
                    summary.totalProcessed++;
                    switch (importResult.action) {
                        case 'created':
                            summary.created++;
                            break;
                        case 'updated':
                            summary.updated++;
                            break;
                        case 'skipped':
                            summary.skipped++;
                            break;
                        case 'failed':
                            summary.failed++;
                            if (importResult.error) {
                                summary.errors.push(`Row ${result.rowNumber}: ${importResult.error}`);
                            }
                            break;
                    }
                }
                catch (error) {
                    this.logger.error(`Error processing import result ${result.id}:`, error);
                    summary.totalProcessed++;
                    summary.failed++;
                    summary.errors.push(`Row ${result.rowNumber}: ${error.message}`);
                    // Update import result with error
                    await this.importResultRepository.update(result.id, {
                        imported: false,
                        error: error.message
                    });
                }
            }
            return summary;
        }
        /**
         * Process a single subscriber from import result
         */
        async processSubscriber(importResult, options) {
            const email = importResult.email;
            const originalData = importResult.originalData || {};
            // Check if subscriber already exists
            const existingSubscriber = await this.subscriberRepository.findOne({
                where: { email }
            });
            if (existingSubscriber) {
                return await this.handleExistingSubscriber(existingSubscriber, originalData, options, importResult);
            }
            else {
                return await this.createNewSubscriber(originalData, options, importResult);
            }
        }
        /**
         * Handle existing subscriber based on duplicate handling strategy
         */
        async handleExistingSubscriber(existingSubscriber, originalData, options, importResult) {
            switch (options.duplicateHandling) {
                case 'skip':
                    return {
                        success: true,
                        subscriberId: existingSubscriber.id,
                        action: 'skipped'
                    };
                case 'update':
                    return await this.updateExistingSubscriber(existingSubscriber, originalData, options, false // Don't replace all data
                    );
                case 'replace':
                    return await this.updateExistingSubscriber(existingSubscriber, originalData, options, true // Replace all data
                    );
                default:
                    return {
                        success: false,
                        action: 'failed',
                        error: `Invalid duplicate handling strategy: ${options.duplicateHandling}`
                    };
            }
        }
        /**
         * Update existing subscriber
         */
        async updateExistingSubscriber(existingSubscriber, originalData, options, replaceAll) {
            try {
                const updateData = this.mapDataToSubscriber(originalData, options.columnMapping);
                // If not replacing all, only update non-empty fields
                if (!replaceAll) {
                    Object.keys(updateData).forEach(key => {
                        if (!updateData[key] || updateData[key] === '') {
                            delete updateData[key];
                        }
                    });
                }
                // Add groups and segments
                if (options.groupIds && options.groupIds.length > 0) {
                    const existingGroups = existingSubscriber.groups || [];
                    updateData.groups = [...new Set([...existingGroups, ...options.groupIds])];
                }
                if (options.segmentIds && options.segmentIds.length > 0) {
                    const existingSegments = existingSubscriber.segments || [];
                    updateData.segments = [...new Set([...existingSegments, ...options.segmentIds])];
                }
                const updatedSubscriber = await this.subscriberService.update(existingSubscriber.id, updateData);
                return {
                    success: true,
                    subscriberId: updatedSubscriber.id,
                    action: 'updated'
                };
            }
            catch (error) {
                return {
                    success: false,
                    action: 'failed',
                    error: `Failed to update subscriber: ${error.message}`
                };
            }
        }
        /**
         * Create new subscriber
         */
        async createNewSubscriber(originalData, options, importResult) {
            try {
                const subscriberData = this.mapDataToSubscriber(originalData, options.columnMapping);
                // Add groups and segments
                if (options.groupIds && options.groupIds.length > 0) {
                    subscriberData.groups = options.groupIds;
                }
                if (options.segmentIds && options.segmentIds.length > 0) {
                    subscriberData.segments = options.segmentIds;
                }
                // Set status based on validation result
                subscriberData.status = this.determineSubscriberStatus(importResult);
                // Use validation result for mailerCheckResult
                subscriberData.mailerCheckResult = this.getMailerCheckResult(importResult);
                const newSubscriber = await this.subscriberService.create(subscriberData);
                return {
                    success: true,
                    subscriberId: newSubscriber.id,
                    action: 'created'
                };
            }
            catch (error) {
                return {
                    success: false,
                    action: 'failed',
                    error: `Failed to create subscriber: ${error.message}`
                };
            }
        }
        /**
         * Map CSV data to subscriber fields based on column mapping
         */
        mapDataToSubscriber(originalData, columnMapping) {
            const subscriberData = {};
            Object.entries(columnMapping).forEach(([csvColumn, subscriberField]) => {
                const value = originalData[csvColumn];
                if (value !== undefined && value !== null && value !== '') {
                    // Handle specific field types
                    switch (subscriberField) {
                        case 'email':
                            subscriberData.email = String(value).toLowerCase().trim();
                            break;
                        case 'firstName':
                            subscriberData.firstName = String(value).trim();
                            break;
                        case 'lastName':
                            subscriberData.lastName = String(value).trim();
                            break;
                        case 'company':
                            subscriberData.company = String(value).trim();
                            break;
                        case 'phone':
                            subscriberData.phone = String(value).trim();
                            break;
                        case 'location':
                            subscriberData.location = String(value).trim();
                            break;
                        case 'customerStatus':
                            subscriberData.customerStatus = String(value).trim();
                            break;
                        case 'subscriptionType':
                            subscriberData.subscriptionType = String(value).trim();
                            break;
                        default:
                            // Handle custom fields or ignore unknown fields
                            break;
                    }
                }
            });
            return subscriberData;
        }
        /**
         * Determine subscriber status based on import result
         */
        determineSubscriberStatus(importResult) {
            switch (importResult.status) {
                case import_result_entity_1.ImportResultStatus.VALID:
                    return 'active';
                case import_result_entity_1.ImportResultStatus.RISKY:
                    return 'pending'; // Require manual review for risky emails
                case import_result_entity_1.ImportResultStatus.INVALID:
                    return 'bounced';
                case import_result_entity_1.ImportResultStatus.DUPLICATE:
                    return 'active';
                default:
                    return 'pending';
            }
        }
        /**
         * Get mailer check result from import validation
         */
        getMailerCheckResult(importResult) {
            if (importResult.validationDetails) {
                const details = importResult.validationDetails;
                if (!details.syntaxValid)
                    return 'invalid_syntax';
                if (!details.domainExists)
                    return 'domain_not_found';
                if (!details.mxRecordExists)
                    return 'no_mx_record';
                if (details.isDisposable)
                    return 'disposable';
                if (details.isRoleAccount)
                    return 'role_account';
                if (details.hasTypos)
                    return 'typo_detected';
                if (details.ipReputation === 'poor')
                    return 'poor_reputation';
                return 'valid';
            }
            return importResult.status === import_result_entity_1.ImportResultStatus.VALID ? 'valid' : 'risky';
        }
        /**
         * Validate groups and segments exist
         */
        async validateGroupsAndSegments(groupIds, segmentIds) {
            const errors = [];
            const validGroups = [];
            const validSegments = [];
            // Validate groups
            if (groupIds && groupIds.length > 0) {
                for (const groupId of groupIds) {
                    try {
                        await this.groupService.findOne(groupId);
                        validGroups.push(groupId);
                    }
                    catch (error) {
                        errors.push(`Group ${groupId} not found`);
                    }
                }
            }
            // Validate segments
            if (segmentIds && segmentIds.length > 0) {
                for (const segmentId of segmentIds) {
                    try {
                        await this.segmentService.findOne(segmentId);
                        validSegments.push(segmentId);
                    }
                    catch (error) {
                        errors.push(`Segment ${segmentId} not found`);
                    }
                }
            }
            return { validGroups, validSegments, errors };
        }
        /**
         * Get import integration statistics
         */
        async getIntegrationStatistics(jobId) {
            const [totalResults, processedResults, createdSubscribers, updatedSubscribers] = await Promise.all([
                this.importResultRepository.count({ where: { importJobId: jobId } }),
                this.importResultRepository.count({ where: { importJobId: jobId, imported: true } }),
                this.importResultRepository.count({
                    where: {
                        importJobId: jobId,
                        imported: true,
                        subscriberId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)())
                    }
                }),
                // This would need a more complex query to distinguish between created and updated
                0 // Placeholder for now
            ]);
            const skippedResults = await this.importResultRepository.count({
                where: {
                    importJobId: jobId,
                    status: import_result_entity_1.ImportResultStatus.DUPLICATE,
                    imported: false
                }
            });
            const failedResults = await this.importResultRepository.count({
                where: {
                    importJobId: jobId,
                    imported: false,
                    error: (0, typeorm_1.Not)((0, typeorm_1.IsNull)())
                }
            });
            return {
                totalResults,
                processedResults,
                createdSubscribers,
                updatedSubscribers,
                skippedResults,
                failedResults
            };
        }
    };
    return ImportIntegrationService = _classThis;
})();
exports.ImportIntegrationService = ImportIntegrationService;
//# sourceMappingURL=import-integration.service.js.map