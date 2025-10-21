import { Repository } from 'typeorm';
import { Subscriber } from '../entities/subscriber.entity';
import { ConsentRecord } from '../entities/consent-record.entity';
import { DataSubjectRequest } from '../entities/data-subject-request.entity';
import { GdprComplianceService, ConsentMethod, LegalBasis, AnonymizationConfig } from './gdpr-compliance.service';
export interface BulkImportComplianceOptions {
    requireExplicitConsent: boolean;
    consentMethod: ConsentMethod;
    legalBasis: LegalBasis;
    dataProcessingPurposes: string[];
    retentionPeriod?: number;
    sourceMetadata?: Record<string, any>;
    gdprRegion?: boolean;
}
export interface BulkExportComplianceOptions {
    anonymizeData: boolean;
    anonymizationConfig?: AnonymizationConfig;
    includeConsentHistory: boolean;
    onlyConsentedSubscribers: boolean;
    excludeWithdrawnConsent: boolean;
    auditExport: boolean;
}
export interface ComplianceValidationResult {
    isCompliant: boolean;
    issues: string[];
    warnings: string[];
    recommendations: string[];
    affectedSubscribers: number;
}
export interface BulkComplianceReport {
    operation: 'import' | 'export';
    timestamp: Date;
    totalRecords: number;
    compliantRecords: number;
    nonCompliantRecords: number;
    consentTracked: number;
    anonymizedRecords: number;
    issues: string[];
    gdprRegionAffected: boolean;
}
export declare class BulkOperationsComplianceService {
    private readonly subscriberRepository;
    private readonly consentRepository;
    private readonly requestRepository;
    private readonly gdprService;
    private readonly logger;
    constructor(subscriberRepository: Repository<Subscriber>, consentRepository: Repository<ConsentRecord>, requestRepository: Repository<DataSubjectRequest>, gdprService: GdprComplianceService);
    /**
     * Validate bulk import for GDPR compliance
     */
    validateBulkImportCompliance(subscriberData: any[], options: BulkImportComplianceOptions): Promise<ComplianceValidationResult>;
    /**
     * Process bulk import with GDPR compliance
     */
    processBulkImportWithCompliance(subscriberData: any[], options: BulkImportComplianceOptions, jobId: string): Promise<BulkComplianceReport>;
    /**
     * Validate bulk export for GDPR compliance
     */
    validateBulkExportCompliance(exportFilters: any, options: BulkExportComplianceOptions): Promise<ComplianceValidationResult>;
    /**
     * Process bulk export with GDPR compliance
     */
    processBulkExportWithCompliance(subscribers: Subscriber[], options: BulkExportComplianceOptions, jobId: string): Promise<{
        data: any[];
        report: BulkComplianceReport;
    }>;
    /**
     * Handle data subject requests during bulk operations
     */
    handleDataSubjectRequestsForBulkOperation(emails: string[], operationType: 'import' | 'export'): Promise<{
        blockedEmails: string[];
        pendingRequests: string[];
        warnings: string[];
    }>;
    private checkWithdrawnConsents;
    private hasWithdrawnConsent;
    private identifyUnnecessaryFields;
    private createOrUpdateSubscriber;
    private getConsentedSubscribersCount;
    private getWithdrawnConsentCount;
    private filterConsentedSubscribers;
    private filterWithdrawnConsents;
    private getConsentHistory;
    private createExportAuditRecord;
}
//# sourceMappingURL=bulk-operations-compliance.service.d.ts.map