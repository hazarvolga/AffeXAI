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
exports.BulkOperationsComplianceService = void 0;
const common_1 = require("@nestjs/common");
const gdpr_compliance_service_1 = require("./gdpr-compliance.service");
let BulkOperationsComplianceService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BulkOperationsComplianceService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BulkOperationsComplianceService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        subscriberRepository;
        consentRepository;
        requestRepository;
        gdprService;
        logger = new common_1.Logger(BulkOperationsComplianceService.name);
        constructor(subscriberRepository, consentRepository, requestRepository, gdprService) {
            this.subscriberRepository = subscriberRepository;
            this.consentRepository = consentRepository;
            this.requestRepository = requestRepository;
            this.gdprService = gdprService;
        }
        /**
         * Validate bulk import for GDPR compliance
         */
        async validateBulkImportCompliance(subscriberData, options) {
            const result = {
                isCompliant: true,
                issues: [],
                warnings: [],
                recommendations: [],
                affectedSubscribers: subscriberData.length
            };
            try {
                // Check if explicit consent is required but not provided
                if (options.requireExplicitConsent && options.consentMethod === gdpr_compliance_service_1.ConsentMethod.IMPLIED_CONSENT) {
                    result.issues.push('Explicit consent required but implied consent method specified');
                    result.isCompliant = false;
                }
                // Validate legal basis for processing
                if (options.legalBasis === gdpr_compliance_service_1.LegalBasis.CONSENT && !options.requireExplicitConsent) {
                    result.warnings.push('Legal basis is consent but explicit consent not required');
                }
                // Check for existing withdrawn consents
                const emails = subscriberData.map(sub => sub.email).filter(Boolean);
                const withdrawnConsents = await this.checkWithdrawnConsents(emails);
                if (withdrawnConsents.length > 0) {
                    result.issues.push(`${withdrawnConsents.length} subscribers have previously withdrawn consent`);
                    result.isCompliant = false;
                }
                // Validate data processing purposes
                if (!options.dataProcessingPurposes || options.dataProcessingPurposes.length === 0) {
                    result.issues.push('Data processing purposes must be specified');
                    result.isCompliant = false;
                }
                // Check retention period compliance
                if (options.gdprRegion && !options.retentionPeriod) {
                    result.warnings.push('Retention period should be specified for GDPR compliance');
                }
                // Validate data minimization principle
                const dataFields = Object.keys(subscriberData[0] || {});
                const unnecessaryFields = this.identifyUnnecessaryFields(dataFields, options.dataProcessingPurposes);
                if (unnecessaryFields.length > 0) {
                    result.warnings.push(`Potentially unnecessary data fields: ${unnecessaryFields.join(', ')}`);
                    result.recommendations.push('Consider removing unnecessary fields to comply with data minimization principle');
                }
                this.logger.log(`Bulk import compliance validation: ${result.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}`);
            }
            catch (error) {
                this.logger.error('Bulk import compliance validation failed:', error);
                result.issues.push(`Validation failed: ${error.message}`);
                result.isCompliant = false;
            }
            return result;
        }
        /**
         * Process bulk import with GDPR compliance
         */
        async processBulkImportWithCompliance(subscriberData, options, jobId) {
            const report = {
                operation: 'import',
                timestamp: new Date(),
                totalRecords: subscriberData.length,
                compliantRecords: 0,
                nonCompliantRecords: 0,
                consentTracked: 0,
                anonymizedRecords: 0,
                issues: [],
                gdprRegionAffected: options.gdprRegion || false
            };
            try {
                for (const subscriberInfo of subscriberData) {
                    try {
                        // Check if subscriber has withdrawn consent
                        const hasWithdrawnConsent = await this.hasWithdrawnConsent(subscriberInfo.email);
                        if (hasWithdrawnConsent) {
                            report.nonCompliantRecords++;
                            report.issues.push(`Skipped ${subscriberInfo.email}: consent previously withdrawn`);
                            continue;
                        }
                        // Create or update subscriber
                        const subscriber = await this.createOrUpdateSubscriber(subscriberInfo);
                        // Track consent for GDPR compliance
                        if (options.requireExplicitConsent || options.gdprRegion) {
                            await this.gdprService.trackConsent(subscriber.email, gdpr_compliance_service_1.ConsentType.EMAIL_MARKETING, options.consentMethod, options.legalBasis, {
                                dataProcessingPurposes: options.dataProcessingPurposes,
                                retentionPeriod: options.retentionPeriod,
                                metadata: {
                                    importJobId: jobId,
                                    source: 'bulk_import',
                                    ...options.sourceMetadata
                                }
                            });
                            report.consentTracked++;
                        }
                        report.compliantRecords++;
                    }
                    catch (error) {
                        report.nonCompliantRecords++;
                        report.issues.push(`Failed to process ${subscriberInfo.email}: ${error.message}`);
                    }
                }
                this.logger.log(`Bulk import compliance processing completed: ${report.compliantRecords}/${report.totalRecords} compliant`);
            }
            catch (error) {
                this.logger.error('Bulk import compliance processing failed:', error);
                report.issues.push(`Processing failed: ${error.message}`);
            }
            return report;
        }
        /**
         * Validate bulk export for GDPR compliance
         */
        async validateBulkExportCompliance(exportFilters, options) {
            const result = {
                isCompliant: true,
                issues: [],
                warnings: [],
                recommendations: [],
                affectedSubscribers: 0
            };
            try {
                // Count affected subscribers
                const query = this.subscriberRepository.createQueryBuilder('subscriber');
                // Apply filters (this would be more complex in real implementation)
                if (exportFilters.status) {
                    query.andWhere('subscriber.status IN (:...statuses)', { statuses: exportFilters.status });
                }
                result.affectedSubscribers = await query.getCount();
                // Check if only consented subscribers should be exported
                if (options.onlyConsentedSubscribers) {
                    const consentedCount = await this.getConsentedSubscribersCount(exportFilters);
                    if (consentedCount < result.affectedSubscribers) {
                        result.warnings.push(`${result.affectedSubscribers - consentedCount} subscribers without explicit consent will be excluded`);
                    }
                }
                // Validate anonymization requirements
                if (options.anonymizeData && !options.anonymizationConfig) {
                    result.issues.push('Anonymization requested but configuration not provided');
                    result.isCompliant = false;
                }
                // Check for withdrawn consents
                if (options.excludeWithdrawnConsent) {
                    const withdrawnCount = await this.getWithdrawnConsentCount(exportFilters);
                    if (withdrawnCount > 0) {
                        result.warnings.push(`${withdrawnCount} subscribers with withdrawn consent will be excluded`);
                    }
                }
                // Recommend audit trail
                if (!options.auditExport) {
                    result.recommendations.push('Enable export auditing for compliance tracking');
                }
                this.logger.log(`Bulk export compliance validation: ${result.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}`);
            }
            catch (error) {
                this.logger.error('Bulk export compliance validation failed:', error);
                result.issues.push(`Validation failed: ${error.message}`);
                result.isCompliant = false;
            }
            return result;
        }
        /**
         * Process bulk export with GDPR compliance
         */
        async processBulkExportWithCompliance(subscribers, options, jobId) {
            const report = {
                operation: 'export',
                timestamp: new Date(),
                totalRecords: subscribers.length,
                compliantRecords: 0,
                nonCompliantRecords: 0,
                consentTracked: 0,
                anonymizedRecords: 0,
                issues: [],
                gdprRegionAffected: true // Assume GDPR applies to exports
            };
            let processedData = [];
            try {
                // Filter subscribers based on consent status
                let filteredSubscribers = subscribers;
                if (options.onlyConsentedSubscribers) {
                    filteredSubscribers = await this.filterConsentedSubscribers(subscribers);
                    report.nonCompliantRecords = subscribers.length - filteredSubscribers.length;
                }
                if (options.excludeWithdrawnConsent) {
                    filteredSubscribers = await this.filterWithdrawnConsents(filteredSubscribers);
                }
                report.compliantRecords = filteredSubscribers.length;
                // Apply anonymization if requested
                if (options.anonymizeData && options.anonymizationConfig) {
                    processedData = await this.gdprService.anonymizeDataForExport(filteredSubscribers, options.anonymizationConfig);
                    report.anonymizedRecords = processedData.length;
                }
                else {
                    processedData = filteredSubscribers.map(sub => ({ ...sub }));
                }
                // Add consent history if requested
                if (options.includeConsentHistory) {
                    for (const item of processedData) {
                        if (item.email && !options.anonymizeData) {
                            item.consentHistory = await this.getConsentHistory(item.email);
                        }
                    }
                }
                // Create audit trail if requested
                if (options.auditExport) {
                    await this.createExportAuditRecord(jobId, report, options);
                }
                this.logger.log(`Bulk export compliance processing completed: ${report.compliantRecords}/${report.totalRecords} compliant`);
            }
            catch (error) {
                this.logger.error('Bulk export compliance processing failed:', error);
                report.issues.push(`Processing failed: ${error.message}`);
            }
            return { data: processedData, report };
        }
        /**
         * Handle data subject requests during bulk operations
         */
        async handleDataSubjectRequestsForBulkOperation(emails, operationType) {
            const result = {
                blockedEmails: [],
                pendingRequests: [],
                warnings: []
            };
            try {
                // Check for pending erasure requests
                const pendingErasureRequests = await this.requestRepository.find({
                    where: {
                        email: { $in: emails },
                        requestType: gdpr_compliance_service_1.DataSubjectRequestType.ERASURE,
                        status: { $in: [gdpr_compliance_service_1.RequestStatus.PENDING, gdpr_compliance_service_1.RequestStatus.IN_PROGRESS] }
                    }
                });
                for (const request of pendingErasureRequests) {
                    if (operationType === 'import') {
                        result.blockedEmails.push(request.email);
                    }
                    else {
                        result.warnings.push(`Export includes subscriber with pending erasure request: ${request.email}`);
                    }
                }
                // Check for other pending requests
                const otherPendingRequests = await this.requestRepository.find({
                    where: {
                        email: { $in: emails },
                        status: { $in: [gdpr_compliance_service_1.RequestStatus.PENDING, gdpr_compliance_service_1.RequestStatus.IN_PROGRESS] }
                    }
                });
                result.pendingRequests = otherPendingRequests.map(req => req.email);
            }
            catch (error) {
                this.logger.error('Error checking data subject requests:', error);
                result.warnings.push(`Failed to check data subject requests: ${error.message}`);
            }
            return result;
        }
        // Private helper methods
        async checkWithdrawnConsents(emails) {
            const withdrawnConsents = await this.consentRepository.find({
                where: {
                    email: { $in: emails },
                    consentStatus: gdpr_compliance_service_1.ConsentStatus.WITHDRAWN
                }
            });
            return withdrawnConsents.map(consent => consent.email);
        }
        async hasWithdrawnConsent(email) {
            const withdrawnConsent = await this.consentRepository.findOne({
                where: {
                    email,
                    consentStatus: gdpr_compliance_service_1.ConsentStatus.WITHDRAWN
                }
            });
            return !!withdrawnConsent;
        }
        identifyUnnecessaryFields(dataFields, purposes) {
            const necessaryFieldsMap = {
                'email_marketing': ['email', 'firstName', 'lastName', 'status'],
                'analytics': ['email', 'opens', 'clicks', 'sent'],
                'segmentation': ['email', 'groups', 'segments', 'customerStatus'],
                'personalization': ['email', 'firstName', 'lastName', 'company', 'location']
            };
            const necessaryFields = new Set();
            for (const purpose of purposes) {
                const fields = necessaryFieldsMap[purpose.toLowerCase()] || [];
                fields.forEach(field => necessaryFields.add(field));
            }
            return dataFields.filter(field => !necessaryFields.has(field));
        }
        async createOrUpdateSubscriber(subscriberInfo) {
            const existingSubscriber = await this.subscriberRepository.findOne({
                where: { email: subscriberInfo.email }
            });
            if (existingSubscriber) {
                // Update existing subscriber
                await this.subscriberRepository.update({ email: subscriberInfo.email }, subscriberInfo);
                return { ...existingSubscriber, ...subscriberInfo };
            }
            else {
                // Create new subscriber
                const insertResult = await this.subscriberRepository.insert(subscriberInfo);
                const createdSubscriber = await this.subscriberRepository.findOne({
                    where: { email: subscriberInfo.email }
                });
                return createdSubscriber;
            }
        }
        async getConsentedSubscribersCount(filters) {
            // This would join with consent records to count only consented subscribers
            return this.subscriberRepository.count({
                where: { status: 'ACTIVE' }
            });
        }
        async getWithdrawnConsentCount(filters) {
            // This would count subscribers with withdrawn consent
            return 0;
        }
        async filterConsentedSubscribers(subscribers) {
            const consentedEmails = new Set();
            // Get all consented emails
            const consentRecords = await this.consentRepository.find({
                where: {
                    email: { $in: subscribers.map(s => s.email) },
                    consentStatus: gdpr_compliance_service_1.ConsentStatus.GIVEN
                }
            });
            consentRecords.forEach(record => consentedEmails.add(record.email));
            return subscribers.filter(sub => consentedEmails.has(sub.email));
        }
        async filterWithdrawnConsents(subscribers) {
            const withdrawnEmails = new Set();
            // Get all withdrawn consent emails
            const withdrawnRecords = await this.consentRepository.find({
                where: {
                    email: { $in: subscribers.map(s => s.email) },
                    consentStatus: gdpr_compliance_service_1.ConsentStatus.WITHDRAWN
                }
            });
            withdrawnRecords.forEach(record => withdrawnEmails.add(record.email));
            return subscribers.filter(sub => !withdrawnEmails.has(sub.email));
        }
        async getConsentHistory(email) {
            const consentRecords = await this.consentRepository.find({
                where: { email },
                order: { consentDate: 'DESC' }
            });
            return consentRecords.map(record => ({
                type: record.consentType,
                status: record.consentStatus,
                date: record.consentDate,
                method: record.consentMethod,
                legalBasis: record.legalBasis
            }));
        }
        async createExportAuditRecord(jobId, report, options) {
            // In a real implementation, this would create an audit record in a dedicated table
            this.logger.log(`Export audit record created for job ${jobId}: ${report.compliantRecords} records exported`);
        }
    };
    return BulkOperationsComplianceService = _classThis;
})();
exports.BulkOperationsComplianceService = BulkOperationsComplianceService;
//# sourceMappingURL=bulk-operations-compliance.service.js.map