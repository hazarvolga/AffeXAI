import { GdprComplianceService, ConsentType, ConsentMethod, LegalBasis, DataSubjectRequestType } from '../services/gdpr-compliance.service';
import { BulkOperationsComplianceService } from '../services/bulk-operations-compliance.service';
export declare class TrackConsentDto {
    email: string;
    consentType: ConsentType;
    consentMethod: ConsentMethod;
    legalBasis: LegalBasis;
    dataProcessingPurposes: string[];
    retentionPeriod?: number;
    ipAddress?: string;
    userAgent?: string;
    metadata?: Record<string, any>;
}
export declare class WithdrawConsentDto {
    email: string;
    consentType: ConsentType;
    reason?: string;
}
export declare class DataSubjectRequestDto {
    email: string;
    requestType: DataSubjectRequestType;
    verificationMethod?: string;
    requestDetails?: Record<string, any>;
}
export declare class BulkComplianceValidationDto {
    operation: 'import' | 'export';
    subscriberData?: any[];
    exportFilters?: any;
    complianceOptions: any;
}
export declare class GdprComplianceController {
    private readonly gdprService;
    private readonly bulkComplianceService;
    private readonly logger;
    constructor(gdprService: GdprComplianceService, bulkComplianceService: BulkOperationsComplianceService);
    trackConsent(dto: TrackConsentDto): Promise<{
        success: boolean;
        message: string;
        data: import("../services/gdpr-compliance.service").ConsentRecord;
    }>;
    withdrawConsent(dto: WithdrawConsentDto): Promise<{
        success: boolean;
        message: string;
    }>;
    checkConsent(email: string, consentType: ConsentType, purpose?: string): Promise<{
        success: boolean;
        data: {
            email: string;
            consentType: ConsentType;
            purpose: string | undefined;
            hasValidConsent: boolean;
        };
    }>;
    handleAccessRequest(dto: {
        email: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            requestId: string;
            status: import("../services/gdpr-compliance.service").RequestStatus;
            responseData: any;
        };
    }>;
    handleErasureRequest(dto: {
        email: string;
        retainStatistics?: boolean;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            requestId: string;
            status: import("../services/gdpr-compliance.service").RequestStatus;
        };
    }>;
    handlePortabilityRequest(dto: {
        email: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            requestId: string;
            status: import("../services/gdpr-compliance.service").RequestStatus;
            portableData: any;
        };
    }>;
    generateComplianceReport(): Promise<{
        success: boolean;
        data: import("../services/gdpr-compliance.service").ComplianceReport;
    }>;
    performDataRetentionCleanup(): Promise<{
        success: boolean;
        message: string;
        data: {
            deletedRecords: number;
            anonymizedRecords: number;
            errors: string[];
        };
    }>;
    validateBulkOperationCompliance(dto: BulkComplianceValidationDto): Promise<{
        success: boolean;
        data: import("../services/bulk-operations-compliance.service").ComplianceValidationResult;
    }>;
    previewAnonymization(emails: string, method?: 'hash' | 'pseudonymize' | 'generalize' | 'suppress'): Promise<{
        success: boolean;
        data: {
            method: "hash" | "pseudonymize" | "generalize" | "suppress";
            preview: {
                original: string;
                anonymized: string;
            }[];
        };
    }>;
    immediateGdprErasure(email: string, retainStatistics?: boolean): Promise<{
        success: boolean;
        message: string;
        data: {
            requestId: string;
            status: import("../services/gdpr-compliance.service").RequestStatus;
            retainedStatistics: boolean;
        };
    }>;
}
//# sourceMappingURL=gdpr-compliance.controller.d.ts.map