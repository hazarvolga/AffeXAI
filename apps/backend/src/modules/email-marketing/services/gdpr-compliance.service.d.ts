import { Repository } from 'typeorm';
import { Subscriber } from '../entities/subscriber.entity';
export interface ConsentRecord {
    id: string;
    subscriberId: string;
    email: string;
    consentType: ConsentType;
    consentStatus: ConsentStatus;
    consentDate: Date;
    ipAddress?: string;
    userAgent?: string;
    consentMethod: ConsentMethod;
    legalBasis: LegalBasis;
    dataProcessingPurposes: string[];
    retentionPeriod?: number;
    withdrawalDate?: Date;
    withdrawalReason?: string;
    metadata?: Record<string, any>;
}
export declare enum ConsentType {
    EMAIL_MARKETING = "EMAIL_MARKETING",
    DATA_PROCESSING = "DATA_PROCESSING",
    PROFILING = "PROFILING",
    THIRD_PARTY_SHARING = "THIRD_PARTY_SHARING",
    ANALYTICS = "ANALYTICS"
}
export declare enum ConsentStatus {
    GIVEN = "GIVEN",
    WITHDRAWN = "WITHDRAWN",
    EXPIRED = "EXPIRED",
    PENDING = "PENDING"
}
export declare enum ConsentMethod {
    EXPLICIT_OPT_IN = "EXPLICIT_OPT_IN",
    DOUBLE_OPT_IN = "DOUBLE_OPT_IN",
    IMPLIED_CONSENT = "IMPLIED_CONSENT",
    LEGITIMATE_INTEREST = "LEGITIMATE_INTEREST",
    IMPORT = "IMPORT"
}
export declare enum LegalBasis {
    CONSENT = "CONSENT",
    CONTRACT = "CONTRACT",
    LEGAL_OBLIGATION = "LEGAL_OBLIGATION",
    VITAL_INTERESTS = "VITAL_INTERESTS",
    PUBLIC_TASK = "PUBLIC_TASK",
    LEGITIMATE_INTERESTS = "LEGITIMATE_INTERESTS"
}
export interface DataSubjectRequest {
    id: string;
    email: string;
    requestType: DataSubjectRequestType;
    requestDate: Date;
    status: RequestStatus;
    completionDate?: Date;
    verificationMethod: string;
    requestDetails?: Record<string, any>;
    responseData?: any;
    notes?: string;
}
export declare enum DataSubjectRequestType {
    ACCESS = "ACCESS",// Article 15 - Right of access
    RECTIFICATION = "RECTIFICATION",// Article 16 - Right to rectification
    ERASURE = "ERASURE",// Article 17 - Right to erasure (right to be forgotten)
    RESTRICT_PROCESSING = "RESTRICT_PROCESSING",// Article 18 - Right to restriction of processing
    DATA_PORTABILITY = "DATA_PORTABILITY",// Article 20 - Right to data portability
    OBJECT = "OBJECT",// Article 21 - Right to object
    WITHDRAW_CONSENT = "WITHDRAW_CONSENT"
}
export declare enum RequestStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    REJECTED = "REJECTED",
    EXPIRED = "EXPIRED"
}
export interface AnonymizationConfig {
    preserveStatistics: boolean;
    anonymizationMethod: 'hash' | 'pseudonymize' | 'generalize' | 'suppress';
    fieldsToAnonymize: string[];
    retainAggregateData: boolean;
}
export interface ComplianceReport {
    reportDate: Date;
    totalSubscribers: number;
    consentedSubscribers: number;
    withdrawnConsents: number;
    pendingRequests: number;
    completedRequests: number;
    dataRetentionCompliance: {
        expiredRecords: number;
        scheduledDeletions: number;
    };
    anonymizationStats: {
        anonymizedRecords: number;
        lastAnonymizationDate: Date;
    };
    riskAssessment: {
        level: 'LOW' | 'MEDIUM' | 'HIGH';
        issues: string[];
        recommendations: string[];
    };
}
export declare class GdprComplianceService {
    private readonly subscriberRepository;
    private readonly logger;
    constructor(subscriberRepository: Repository<Subscriber>);
    /**
     * Track consent for GDPR compliance
     */
    trackConsent(email: string, consentType: ConsentType, consentMethod: ConsentMethod, legalBasis: LegalBasis, options: {
        ipAddress?: string;
        userAgent?: string;
        dataProcessingPurposes: string[];
        retentionPeriod?: number;
        metadata?: Record<string, any>;
    }): Promise<ConsentRecord>;
    /**
     * Withdraw consent for a subscriber
     */
    withdrawConsent(email: string, consentType: ConsentType, reason?: string): Promise<void>;
    /**
     * Check if subscriber has valid consent for specific purpose
     */
    hasValidConsent(email: string, consentType: ConsentType, purpose?: string): Promise<boolean>;
    /**
     * Handle data subject access request (Article 15)
     */
    handleAccessRequest(email: string): Promise<DataSubjectRequest>;
    /**
     * Handle right to be forgotten request (Article 17)
     */
    handleErasureRequest(email: string, retainStatistics?: boolean): Promise<DataSubjectRequest>;
    /**
     * Handle data portability request (Article 20)
     */
    handlePortabilityRequest(email: string): Promise<DataSubjectRequest>;
    /**
     * Anonymize subscriber data for exports
     */
    anonymizeDataForExport(subscribers: Subscriber[], config: AnonymizationConfig): Promise<any[]>;
    /**
     * Generate GDPR compliance report
     */
    generateComplianceReport(): Promise<ComplianceReport>;
    /**
     * Automated data retention cleanup
     */
    performDataRetentionCleanup(): Promise<{
        deletedRecords: number;
        anonymizedRecords: number;
        errors: string[];
    }>;
    private storeConsentRecord;
    private updateConsentRecord;
    private getConsentRecords;
    private getAllConsentRecords;
    private storeDataSubjectRequest;
    private getDataProcessingActivities;
    private getDataRetentionInfo;
    private getThirdPartySharing;
    private checkLegalGroundsForRetention;
    private anonymizeSubscriberData;
    private deleteSubscriberData;
    private findExpiredConsentSubscribers;
    private getExpiredRecordsCount;
    private assessComplianceRisk;
    private hashValue;
    private pseudonymizeValue;
    private generalizeValue;
}
//# sourceMappingURL=gdpr-compliance.service.d.ts.map