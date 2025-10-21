/**
 * Bulk Operation Audit Trail System
 *
 * Comprehensive audit logging for compliance requirements including:
 * - GDPR compliance tracking
 * - Data processing activity logs
 * - User action auditing
 * - Compliance reporting
 * - Data retention management
 */
export declare enum AuditEventType {
    DATA_IMPORT_STARTED = "DATA_IMPORT_STARTED",
    DATA_IMPORT_COMPLETED = "DATA_IMPORT_COMPLETED",
    DATA_EXPORT_STARTED = "DATA_EXPORT_STARTED",
    DATA_EXPORT_COMPLETED = "DATA_EXPORT_COMPLETED",
    DATA_VALIDATION_PERFORMED = "DATA_VALIDATION_PERFORMED",
    USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT",
    USER_ACCESS_GRANTED = "USER_ACCESS_GRANTED",
    USER_ACCESS_DENIED = "USER_ACCESS_DENIED",
    DATA_ACCESS_REQUEST = "DATA_ACCESS_REQUEST",
    DATA_DELETION_REQUEST = "DATA_DELETION_REQUEST",
    DATA_PORTABILITY_REQUEST = "DATA_PORTABILITY_REQUEST",
    DATA_RECTIFICATION_REQUEST = "DATA_RECTIFICATION_REQUEST",
    CONSENT_GRANTED = "CONSENT_GRANTED",
    CONSENT_WITHDRAWN = "CONSENT_WITHDRAWN",
    SECURITY_BREACH_DETECTED = "SECURITY_BREACH_DETECTED",
    UNAUTHORIZED_ACCESS_ATTEMPT = "UNAUTHORIZED_ACCESS_ATTEMPT",
    MALWARE_DETECTED = "MALWARE_DETECTED",
    SYSTEM_CONFIGURATION_CHANGED = "SYSTEM_CONFIGURATION_CHANGED",
    DATA_RETENTION_POLICY_APPLIED = "DATA_RETENTION_POLICY_APPLIED",
    BACKUP_CREATED = "BACKUP_CREATED",
    BACKUP_RESTORED = "BACKUP_RESTORED"
}
export declare enum DataProcessingLegalBasis {
    CONSENT = "consent",
    CONTRACT = "contract",
    LEGAL_OBLIGATION = "legal_obligation",
    VITAL_INTERESTS = "vital_interests",
    PUBLIC_TASK = "public_task",
    LEGITIMATE_INTERESTS = "legitimate_interests"
}
export declare enum DataCategory {
    PERSONAL_IDENTIFIERS = "personal_identifiers",
    CONTACT_INFORMATION = "contact_information",
    DEMOGRAPHIC_DATA = "demographic_data",
    BEHAVIORAL_DATA = "behavioral_data",
    TECHNICAL_DATA = "technical_data",
    SPECIAL_CATEGORY = "special_category"
}
export interface AuditEvent {
    id: string;
    timestamp: Date;
    eventType: AuditEventType;
    userId: string;
    userRole?: string;
    sessionId?: string;
    ipAddress?: string;
    userAgent?: string;
    resource: string;
    resourceId: string;
    action: string;
    details: Record<string, any>;
    dataCategories?: DataCategory[];
    legalBasis?: DataProcessingLegalBasis;
    consentId?: string;
    success: boolean;
    error?: string;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    retentionPeriod?: number;
    encrypted: boolean;
}
export interface DataProcessingActivity {
    id: string;
    timestamp: Date;
    controller: string;
    processor?: string;
    purpose: string;
    legalBasis: DataProcessingLegalBasis;
    dataCategories: DataCategory[];
    dataSubjects: string[];
    recipients?: string[];
    thirdCountryTransfers?: boolean;
    retentionPeriod: number;
    securityMeasures: string[];
    automatedDecisionMaking?: boolean;
    consentRequired: boolean;
    consentObtained?: boolean;
    relatedAuditEvents: string[];
}
export interface ComplianceReport {
    id: string;
    generatedAt: Date;
    reportType: 'gdpr' | 'audit_trail' | 'data_processing' | 'security';
    timeRange: {
        start: Date;
        end: Date;
    };
    requestedBy: string;
    summary: {
        totalEvents: number;
        dataProcessingActivities: number;
        consentEvents: number;
        securityEvents: number;
        dataSubjectRequests: number;
    };
    findings: Array<{
        category: string;
        severity: 'info' | 'warning' | 'error';
        message: string;
        count: number;
        recommendations?: string[];
    }>;
    events: AuditEvent[];
    dataProcessingActivities: DataProcessingActivity[];
}
export declare class BulkOperationAuditTrail {
    private auditEvents;
    private dataProcessingActivities;
    private encryptionKey;
    /**
     * Log an audit event
     */
    logEvent(eventType: AuditEventType, userId: string, resource: string, resourceId: string, action: string, details: Record<string, any>, options?: {
        userRole?: string;
        sessionId?: string;
        ipAddress?: string;
        userAgent?: string;
        dataCategories?: DataCategory[];
        legalBasis?: DataProcessingLegalBasis;
        consentId?: string;
        success?: boolean;
        error?: string;
        riskLevel?: 'low' | 'medium' | 'high' | 'critical';
        retentionPeriod?: number;
    }): string;
    /**
     * Log data processing activity
     */
    logDataProcessingActivity(controller: string, purpose: string, legalBasis: DataProcessingLegalBasis, dataCategories: DataCategory[], dataSubjects: string[], options?: {
        processor?: string;
        recipients?: string[];
        thirdCountryTransfers?: boolean;
        retentionPeriod?: number;
        securityMeasures?: string[];
        automatedDecisionMaking?: boolean;
        consentRequired?: boolean;
        consentObtained?: boolean;
    }): string;
    /**
     * Log bulk import audit event
     */
    logBulkImportAudit(userId: string, jobId: string, fileName: string, recordCount: number, validRecords: number, invalidRecords: number, options?: {
        sessionId?: string;
        ipAddress?: string;
        userAgent?: string;
        legalBasis?: DataProcessingLegalBasis;
        consentId?: string;
    }): string;
    /**
     * Log bulk export audit event
     */
    logBulkExportAudit(userId: string, jobId: string, recordCount: number, filters: Record<string, any>, options?: {
        sessionId?: string;
        ipAddress?: string;
        userAgent?: string;
        legalBasis?: DataProcessingLegalBasis;
    }): string;
    /**
     * Log GDPR data subject request
     */
    logDataSubjectRequest(requestType: 'access' | 'deletion' | 'portability' | 'rectification', dataSubjectEmail: string, requestedBy: string, options?: {
        sessionId?: string;
        ipAddress?: string;
        userAgent?: string;
        requestDetails?: Record<string, any>;
        success?: boolean;
        error?: string;
    }): string;
    /**
     * Log consent event
     */
    logConsentEvent(action: 'granted' | 'withdrawn', dataSubjectEmail: string, consentId: string, purpose: string, options?: {
        sessionId?: string;
        ipAddress?: string;
        userAgent?: string;
        consentDetails?: Record<string, any>;
    }): string;
    /**
     * Get audit events by criteria
     */
    getAuditEvents(criteria: {
        eventType?: AuditEventType;
        userId?: string;
        resource?: string;
        startTime?: Date;
        endTime?: Date;
        riskLevel?: 'low' | 'medium' | 'high' | 'critical';
        success?: boolean;
        limit?: number;
    }): AuditEvent[];
    /**
     * Get data processing activities
     */
    getDataProcessingActivities(criteria: {
        controller?: string;
        legalBasis?: DataProcessingLegalBasis;
        dataCategory?: DataCategory;
        startTime?: Date;
        endTime?: Date;
        limit?: number;
    }): DataProcessingActivity[];
    /**
     * Generate compliance report
     */
    generateComplianceReport(reportType: 'gdpr' | 'audit_trail' | 'data_processing' | 'security', timeRange: {
        start: Date;
        end: Date;
    }, requestedBy: string): ComplianceReport;
    /**
     * Apply data retention policy
     */
    applyDataRetentionPolicy(): number;
    private generateAuditId;
    private containsSensitiveData;
    private encryptSensitiveData;
}
export declare const bulkOperationAudit: BulkOperationAuditTrail;
export default bulkOperationAudit;
//# sourceMappingURL=bulk-operation-audit.d.ts.map