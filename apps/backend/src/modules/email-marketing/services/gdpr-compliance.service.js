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
exports.GdprComplianceService = exports.RequestStatus = exports.DataSubjectRequestType = exports.LegalBasis = exports.ConsentMethod = exports.ConsentStatus = exports.ConsentType = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
var ConsentType;
(function (ConsentType) {
    ConsentType["EMAIL_MARKETING"] = "EMAIL_MARKETING";
    ConsentType["DATA_PROCESSING"] = "DATA_PROCESSING";
    ConsentType["PROFILING"] = "PROFILING";
    ConsentType["THIRD_PARTY_SHARING"] = "THIRD_PARTY_SHARING";
    ConsentType["ANALYTICS"] = "ANALYTICS";
})(ConsentType || (exports.ConsentType = ConsentType = {}));
var ConsentStatus;
(function (ConsentStatus) {
    ConsentStatus["GIVEN"] = "GIVEN";
    ConsentStatus["WITHDRAWN"] = "WITHDRAWN";
    ConsentStatus["EXPIRED"] = "EXPIRED";
    ConsentStatus["PENDING"] = "PENDING";
})(ConsentStatus || (exports.ConsentStatus = ConsentStatus = {}));
var ConsentMethod;
(function (ConsentMethod) {
    ConsentMethod["EXPLICIT_OPT_IN"] = "EXPLICIT_OPT_IN";
    ConsentMethod["DOUBLE_OPT_IN"] = "DOUBLE_OPT_IN";
    ConsentMethod["IMPLIED_CONSENT"] = "IMPLIED_CONSENT";
    ConsentMethod["LEGITIMATE_INTEREST"] = "LEGITIMATE_INTEREST";
    ConsentMethod["IMPORT"] = "IMPORT";
})(ConsentMethod || (exports.ConsentMethod = ConsentMethod = {}));
var LegalBasis;
(function (LegalBasis) {
    LegalBasis["CONSENT"] = "CONSENT";
    LegalBasis["CONTRACT"] = "CONTRACT";
    LegalBasis["LEGAL_OBLIGATION"] = "LEGAL_OBLIGATION";
    LegalBasis["VITAL_INTERESTS"] = "VITAL_INTERESTS";
    LegalBasis["PUBLIC_TASK"] = "PUBLIC_TASK";
    LegalBasis["LEGITIMATE_INTERESTS"] = "LEGITIMATE_INTERESTS";
})(LegalBasis || (exports.LegalBasis = LegalBasis = {}));
var DataSubjectRequestType;
(function (DataSubjectRequestType) {
    DataSubjectRequestType["ACCESS"] = "ACCESS";
    DataSubjectRequestType["RECTIFICATION"] = "RECTIFICATION";
    DataSubjectRequestType["ERASURE"] = "ERASURE";
    DataSubjectRequestType["RESTRICT_PROCESSING"] = "RESTRICT_PROCESSING";
    DataSubjectRequestType["DATA_PORTABILITY"] = "DATA_PORTABILITY";
    DataSubjectRequestType["OBJECT"] = "OBJECT";
    DataSubjectRequestType["WITHDRAW_CONSENT"] = "WITHDRAW_CONSENT"; // Withdraw consent
})(DataSubjectRequestType || (exports.DataSubjectRequestType = DataSubjectRequestType = {}));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["PENDING"] = "PENDING";
    RequestStatus["IN_PROGRESS"] = "IN_PROGRESS";
    RequestStatus["COMPLETED"] = "COMPLETED";
    RequestStatus["REJECTED"] = "REJECTED";
    RequestStatus["EXPIRED"] = "EXPIRED";
})(RequestStatus || (exports.RequestStatus = RequestStatus = {}));
let GdprComplianceService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var GdprComplianceService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GdprComplianceService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        subscriberRepository;
        logger = new common_1.Logger(GdprComplianceService.name);
        constructor(subscriberRepository) {
            this.subscriberRepository = subscriberRepository;
        }
        /**
         * Track consent for GDPR compliance
         */
        async trackConsent(email, consentType, consentMethod, legalBasis, options) {
            const subscriber = await this.subscriberRepository.findOne({ where: { email } });
            const consentRecord = {
                id: crypto.randomUUID(),
                subscriberId: subscriber?.id || '',
                email,
                consentType,
                consentStatus: ConsentStatus.GIVEN,
                consentDate: new Date(),
                ipAddress: options.ipAddress,
                userAgent: options.userAgent,
                consentMethod,
                legalBasis,
                dataProcessingPurposes: options.dataProcessingPurposes,
                retentionPeriod: options.retentionPeriod,
                metadata: options.metadata
            };
            // In a real implementation, this would be stored in a dedicated consent table
            await this.storeConsentRecord(consentRecord);
            this.logger.log(`Consent tracked for ${email}: ${consentType} via ${consentMethod}`);
            return consentRecord;
        }
        /**
         * Withdraw consent for a subscriber
         */
        async withdrawConsent(email, consentType, reason) {
            const consentRecords = await this.getConsentRecords(email, consentType);
            for (const record of consentRecords) {
                if (record.consentStatus === ConsentStatus.GIVEN) {
                    record.consentStatus = ConsentStatus.WITHDRAWN;
                    record.withdrawalDate = new Date();
                    record.withdrawalReason = reason;
                    await this.updateConsentRecord(record);
                }
            }
            // Update subscriber status if marketing consent is withdrawn
            if (consentType === ConsentType.EMAIL_MARKETING) {
                await this.subscriberRepository.update({ email }, { status: 'UNSUBSCRIBED' });
            }
            this.logger.log(`Consent withdrawn for ${email}: ${consentType}`);
        }
        /**
         * Check if subscriber has valid consent for specific purpose
         */
        async hasValidConsent(email, consentType, purpose) {
            const consentRecords = await this.getConsentRecords(email, consentType);
            const validConsent = consentRecords.find(record => {
                // Check if consent is currently valid
                if (record.consentStatus !== ConsentStatus.GIVEN) {
                    return false;
                }
                // Check if consent has expired
                if (record.retentionPeriod) {
                    const expiryDate = new Date(record.consentDate);
                    expiryDate.setMonth(expiryDate.getMonth() + record.retentionPeriod);
                    if (new Date() > expiryDate) {
                        return false;
                    }
                }
                // Check if purpose matches
                if (purpose && !record.dataProcessingPurposes.includes(purpose)) {
                    return false;
                }
                return true;
            });
            return !!validConsent;
        }
        /**
         * Handle data subject access request (Article 15)
         */
        async handleAccessRequest(email) {
            const request = {
                id: crypto.randomUUID(),
                email,
                requestType: DataSubjectRequestType.ACCESS,
                requestDate: new Date(),
                status: RequestStatus.IN_PROGRESS,
                verificationMethod: 'email_verification'
            };
            try {
                // Collect all data for the subscriber
                const subscriber = await this.subscriberRepository.findOne({ where: { email } });
                const consentRecords = await this.getAllConsentRecords(email);
                const responseData = {
                    personalData: subscriber,
                    consentHistory: consentRecords,
                    dataProcessingActivities: await this.getDataProcessingActivities(email),
                    dataRetentionInfo: await this.getDataRetentionInfo(email),
                    thirdPartySharing: await this.getThirdPartySharing(email)
                };
                request.responseData = responseData;
                request.status = RequestStatus.COMPLETED;
                request.completionDate = new Date();
                await this.storeDataSubjectRequest(request);
                this.logger.log(`Access request completed for ${email}`);
                return request;
            }
            catch (error) {
                request.status = RequestStatus.REJECTED;
                request.notes = `Error processing request: ${error.message}`;
                await this.storeDataSubjectRequest(request);
                throw error;
            }
        }
        /**
         * Handle right to be forgotten request (Article 17)
         */
        async handleErasureRequest(email, retainStatistics = true) {
            const request = {
                id: crypto.randomUUID(),
                email,
                requestType: DataSubjectRequestType.ERASURE,
                requestDate: new Date(),
                status: RequestStatus.IN_PROGRESS,
                verificationMethod: 'email_verification',
                requestDetails: { retainStatistics }
            };
            try {
                // Check if we have legal grounds to retain the data
                const hasLegalGrounds = await this.checkLegalGroundsForRetention(email);
                if (hasLegalGrounds) {
                    request.status = RequestStatus.REJECTED;
                    request.notes = 'Data retention required for legal compliance';
                    await this.storeDataSubjectRequest(request);
                    return request;
                }
                if (retainStatistics) {
                    // Anonymize instead of delete
                    await this.anonymizeSubscriberData(email, {
                        preserveStatistics: true,
                        anonymizationMethod: 'hash',
                        fieldsToAnonymize: ['email', 'firstName', 'lastName', 'phone', 'company'],
                        retainAggregateData: true
                    });
                }
                else {
                    // Complete deletion
                    await this.deleteSubscriberData(email);
                }
                request.status = RequestStatus.COMPLETED;
                request.completionDate = new Date();
                await this.storeDataSubjectRequest(request);
                this.logger.log(`Erasure request completed for ${email}`);
                return request;
            }
            catch (error) {
                request.status = RequestStatus.REJECTED;
                request.notes = `Error processing erasure request: ${error.message}`;
                await this.storeDataSubjectRequest(request);
                throw error;
            }
        }
        /**
         * Handle data portability request (Article 20)
         */
        async handlePortabilityRequest(email) {
            const request = {
                id: crypto.randomUUID(),
                email,
                requestType: DataSubjectRequestType.DATA_PORTABILITY,
                requestDate: new Date(),
                status: RequestStatus.IN_PROGRESS,
                verificationMethod: 'email_verification'
            };
            try {
                const subscriber = await this.subscriberRepository.findOne({ where: { email } });
                if (!subscriber) {
                    request.status = RequestStatus.REJECTED;
                    request.notes = 'No data found for the provided email';
                    await this.storeDataSubjectRequest(request);
                    return request;
                }
                // Create portable data format
                const portableData = {
                    personalInformation: {
                        email: subscriber.email,
                        firstName: subscriber.firstName,
                        lastName: subscriber.lastName,
                        company: subscriber.company,
                        phone: subscriber.phone,
                        subscribedAt: subscriber.subscribedAt
                    },
                    preferences: {
                        groups: subscriber.groups,
                        segments: subscriber.segments,
                        status: subscriber.status
                    },
                    engagementData: {
                        emailsSent: subscriber.sent,
                        emailsOpened: subscriber.opens,
                        linksClicked: subscriber.clicks
                    },
                    consentHistory: await this.getAllConsentRecords(email)
                };
                request.responseData = portableData;
                request.status = RequestStatus.COMPLETED;
                request.completionDate = new Date();
                await this.storeDataSubjectRequest(request);
                this.logger.log(`Data portability request completed for ${email}`);
                return request;
            }
            catch (error) {
                request.status = RequestStatus.REJECTED;
                request.notes = `Error processing portability request: ${error.message}`;
                await this.storeDataSubjectRequest(request);
                throw error;
            }
        }
        /**
         * Anonymize subscriber data for exports
         */
        async anonymizeDataForExport(subscribers, config) {
            return subscribers.map(subscriber => {
                const anonymized = { ...subscriber };
                for (const field of config.fieldsToAnonymize) {
                    if (anonymized[field]) {
                        switch (config.anonymizationMethod) {
                            case 'hash':
                                anonymized[field] = this.hashValue(anonymized[field]);
                                break;
                            case 'pseudonymize':
                                anonymized[field] = this.pseudonymizeValue(anonymized[field]);
                                break;
                            case 'generalize':
                                anonymized[field] = this.generalizeValue(anonymized[field], field);
                                break;
                            case 'suppress':
                                anonymized[field] = '[REDACTED]';
                                break;
                        }
                    }
                }
                // Remove sensitive metadata if not preserving statistics
                if (!config.preserveStatistics) {
                    delete anonymized.id;
                    delete anonymized.lastUpdated;
                }
                return anonymized;
            });
        }
        /**
         * Generate GDPR compliance report
         */
        async generateComplianceReport() {
            const totalSubscribers = await this.subscriberRepository.count();
            const consentedSubscribers = await this.subscriberRepository.count({
                where: { status: 'ACTIVE' }
            });
            // These would typically come from dedicated tables
            const withdrawnConsents = 0; // await this.getWithdrawnConsentsCount();
            const pendingRequests = 0; // await this.getPendingRequestsCount();
            const completedRequests = 0; // await this.getCompletedRequestsCount();
            const report = {
                reportDate: new Date(),
                totalSubscribers,
                consentedSubscribers,
                withdrawnConsents,
                pendingRequests,
                completedRequests,
                dataRetentionCompliance: {
                    expiredRecords: await this.getExpiredRecordsCount(),
                    scheduledDeletions: 0
                },
                anonymizationStats: {
                    anonymizedRecords: 0,
                    lastAnonymizationDate: new Date()
                },
                riskAssessment: await this.assessComplianceRisk()
            };
            this.logger.log('GDPR compliance report generated');
            return report;
        }
        /**
         * Automated data retention cleanup
         */
        async performDataRetentionCleanup() {
            const result = {
                deletedRecords: 0,
                anonymizedRecords: 0,
                errors: []
            };
            try {
                // Find subscribers with expired consent
                const expiredSubscribers = await this.findExpiredConsentSubscribers();
                for (const subscriber of expiredSubscribers) {
                    try {
                        const hasLegalGrounds = await this.checkLegalGroundsForRetention(subscriber.email);
                        if (hasLegalGrounds) {
                            // Anonymize instead of delete
                            await this.anonymizeSubscriberData(subscriber.email, {
                                preserveStatistics: true,
                                anonymizationMethod: 'hash',
                                fieldsToAnonymize: ['email', 'firstName', 'lastName', 'phone'],
                                retainAggregateData: true
                            });
                            result.anonymizedRecords++;
                        }
                        else {
                            // Delete completely
                            await this.deleteSubscriberData(subscriber.email);
                            result.deletedRecords++;
                        }
                    }
                    catch (error) {
                        result.errors.push(`Failed to process ${subscriber.email}: ${error.message}`);
                    }
                }
                this.logger.log(`Data retention cleanup completed: ${result.deletedRecords} deleted, ${result.anonymizedRecords} anonymized`);
            }
            catch (error) {
                this.logger.error('Data retention cleanup failed:', error);
                result.errors.push(`Cleanup failed: ${error.message}`);
            }
            return result;
        }
        // Private helper methods
        async storeConsentRecord(record) {
            // In a real implementation, store in dedicated consent_records table
            this.logger.debug(`Storing consent record for ${record.email}`);
        }
        async updateConsentRecord(record) {
            // In a real implementation, update in dedicated consent_records table
            this.logger.debug(`Updating consent record for ${record.email}`);
        }
        async getConsentRecords(email, consentType) {
            // In a real implementation, query from dedicated consent_records table
            return [];
        }
        async getAllConsentRecords(email) {
            // In a real implementation, query all consent records for email
            return [];
        }
        async storeDataSubjectRequest(request) {
            // In a real implementation, store in dedicated data_subject_requests table
            this.logger.debug(`Storing data subject request for ${request.email}`);
        }
        async getDataProcessingActivities(email) {
            // Return list of data processing activities for this subscriber
            return [
                {
                    activity: 'Email Marketing',
                    purpose: 'Send promotional emails',
                    legalBasis: LegalBasis.CONSENT,
                    dataCategories: ['email', 'name', 'preferences']
                }
            ];
        }
        async getDataRetentionInfo(email) {
            return {
                retentionPeriod: '24 months',
                lastReviewDate: new Date(),
                scheduledDeletion: null
            };
        }
        async getThirdPartySharing(email) {
            return []; // List of third parties data is shared with
        }
        async checkLegalGroundsForRetention(email) {
            // Check if there are legal grounds to retain data (e.g., accounting, legal obligations)
            return false;
        }
        async anonymizeSubscriberData(email, config) {
            const subscriber = await this.subscriberRepository.findOne({ where: { email } });
            if (!subscriber) {
                return;
            }
            const updates = {};
            for (const field of config.fieldsToAnonymize) {
                if (subscriber[field]) {
                    switch (config.anonymizationMethod) {
                        case 'hash':
                            updates[field] = this.hashValue(subscriber[field]);
                            break;
                        case 'pseudonymize':
                            updates[field] = this.pseudonymizeValue(subscriber[field]);
                            break;
                        case 'generalize':
                            updates[field] = this.generalizeValue(subscriber[field], field);
                            break;
                        case 'suppress':
                            updates[field] = null;
                            break;
                    }
                }
            }
            await this.subscriberRepository.update({ email }, updates);
            this.logger.log(`Anonymized data for ${email}`);
        }
        async deleteSubscriberData(email) {
            await this.subscriberRepository.delete({ email });
            // Also delete from related tables (consent records, requests, etc.)
            this.logger.log(`Deleted all data for ${email}`);
        }
        async findExpiredConsentSubscribers() {
            // In a real implementation, this would join with consent records to find expired consents
            return [];
        }
        async getExpiredRecordsCount() {
            // Count records that have exceeded retention period
            return 0;
        }
        async assessComplianceRisk() {
            const issues = [];
            const recommendations = [];
            // Check for common compliance issues
            const totalSubscribers = await this.subscriberRepository.count();
            const activeSubscribers = await this.subscriberRepository.count({
                where: { status: 'ACTIVE' }
            });
            if (activeSubscribers / totalSubscribers < 0.5) {
                issues.push('High percentage of inactive subscribers');
                recommendations.push('Review consent status and clean up inactive subscribers');
            }
            const level = issues.length === 0 ? 'LOW' : issues.length < 3 ? 'MEDIUM' : 'HIGH';
            return { level, issues, recommendations };
        }
        hashValue(value) {
            return crypto.createHash('sha256').update(value).digest('hex').substring(0, 16);
        }
        pseudonymizeValue(value) {
            // Create a consistent pseudonym for the value
            const hash = crypto.createHash('md5').update(value).digest('hex');
            return `pseudo_${hash.substring(0, 8)}`;
        }
        generalizeValue(value, field) {
            switch (field) {
                case 'email':
                    return value.split('@')[1] ? `***@${value.split('@')[1]}` : '***@***.***';
                case 'phone':
                    return value.replace(/\d/g, '*');
                case 'firstName':
                case 'lastName':
                    return value.charAt(0) + '*'.repeat(value.length - 1);
                default:
                    return '***';
            }
        }
    };
    return GdprComplianceService = _classThis;
})();
exports.GdprComplianceService = GdprComplianceService;
//# sourceMappingURL=gdpr-compliance.service.js.map