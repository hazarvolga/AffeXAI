"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkOperationAudit = exports.BulkOperationAuditTrail = exports.DataCategory = exports.DataProcessingLegalBasis = exports.AuditEventType = void 0;
const bulk_operation_logger_1 = require("../logging/bulk-operation-logger");
// ============================================================================
// Types and Interfaces
// ============================================================================
var AuditEventType;
(function (AuditEventType) {
    // Data Processing Events
    AuditEventType["DATA_IMPORT_STARTED"] = "DATA_IMPORT_STARTED";
    AuditEventType["DATA_IMPORT_COMPLETED"] = "DATA_IMPORT_COMPLETED";
    AuditEventType["DATA_EXPORT_STARTED"] = "DATA_EXPORT_STARTED";
    AuditEventType["DATA_EXPORT_COMPLETED"] = "DATA_EXPORT_COMPLETED";
    AuditEventType["DATA_VALIDATION_PERFORMED"] = "DATA_VALIDATION_PERFORMED";
    // User Actions
    AuditEventType["USER_LOGIN"] = "USER_LOGIN";
    AuditEventType["USER_LOGOUT"] = "USER_LOGOUT";
    AuditEventType["USER_ACCESS_GRANTED"] = "USER_ACCESS_GRANTED";
    AuditEventType["USER_ACCESS_DENIED"] = "USER_ACCESS_DENIED";
    // Data Subject Rights (GDPR)
    AuditEventType["DATA_ACCESS_REQUEST"] = "DATA_ACCESS_REQUEST";
    AuditEventType["DATA_DELETION_REQUEST"] = "DATA_DELETION_REQUEST";
    AuditEventType["DATA_PORTABILITY_REQUEST"] = "DATA_PORTABILITY_REQUEST";
    AuditEventType["DATA_RECTIFICATION_REQUEST"] = "DATA_RECTIFICATION_REQUEST";
    AuditEventType["CONSENT_GRANTED"] = "CONSENT_GRANTED";
    AuditEventType["CONSENT_WITHDRAWN"] = "CONSENT_WITHDRAWN";
    // Security Events
    AuditEventType["SECURITY_BREACH_DETECTED"] = "SECURITY_BREACH_DETECTED";
    AuditEventType["UNAUTHORIZED_ACCESS_ATTEMPT"] = "UNAUTHORIZED_ACCESS_ATTEMPT";
    AuditEventType["MALWARE_DETECTED"] = "MALWARE_DETECTED";
    // System Events
    AuditEventType["SYSTEM_CONFIGURATION_CHANGED"] = "SYSTEM_CONFIGURATION_CHANGED";
    AuditEventType["DATA_RETENTION_POLICY_APPLIED"] = "DATA_RETENTION_POLICY_APPLIED";
    AuditEventType["BACKUP_CREATED"] = "BACKUP_CREATED";
    AuditEventType["BACKUP_RESTORED"] = "BACKUP_RESTORED";
})(AuditEventType || (exports.AuditEventType = AuditEventType = {}));
var DataProcessingLegalBasis;
(function (DataProcessingLegalBasis) {
    DataProcessingLegalBasis["CONSENT"] = "consent";
    DataProcessingLegalBasis["CONTRACT"] = "contract";
    DataProcessingLegalBasis["LEGAL_OBLIGATION"] = "legal_obligation";
    DataProcessingLegalBasis["VITAL_INTERESTS"] = "vital_interests";
    DataProcessingLegalBasis["PUBLIC_TASK"] = "public_task";
    DataProcessingLegalBasis["LEGITIMATE_INTERESTS"] = "legitimate_interests";
})(DataProcessingLegalBasis || (exports.DataProcessingLegalBasis = DataProcessingLegalBasis = {}));
var DataCategory;
(function (DataCategory) {
    DataCategory["PERSONAL_IDENTIFIERS"] = "personal_identifiers";
    DataCategory["CONTACT_INFORMATION"] = "contact_information";
    DataCategory["DEMOGRAPHIC_DATA"] = "demographic_data";
    DataCategory["BEHAVIORAL_DATA"] = "behavioral_data";
    DataCategory["TECHNICAL_DATA"] = "technical_data";
    DataCategory["SPECIAL_CATEGORY"] = "special_category";
})(DataCategory || (exports.DataCategory = DataCategory = {}));
// ============================================================================
// Audit Trail Implementation
// ============================================================================
class BulkOperationAuditTrail {
    auditEvents = new Map();
    dataProcessingActivities = new Map();
    encryptionKey = 'audit-encryption-key'; // In production, use proper key management
    /**
     * Log an audit event
     */
    logEvent(eventType, userId, resource, resourceId, action, details, options = {}) {
        const auditEvent = {
            id: this.generateAuditId(),
            timestamp: new Date(),
            eventType,
            userId,
            userRole: options.userRole,
            sessionId: options.sessionId,
            ipAddress: options.ipAddress,
            userAgent: options.userAgent,
            resource,
            resourceId,
            action,
            details: this.encryptSensitiveData(details),
            dataCategories: options.dataCategories,
            legalBasis: options.legalBasis,
            consentId: options.consentId,
            success: options.success ?? true,
            error: options.error,
            riskLevel: options.riskLevel ?? 'low',
            retentionPeriod: options.retentionPeriod ?? 2555, // 7 years default
            encrypted: this.containsSensitiveData(details)
        };
        this.auditEvents.set(auditEvent.id, auditEvent);
        // Log to the main logging system
        bulk_operation_logger_1.bulkOperationLogger.log(auditEvent.success ? bulk_operation_logger_1.LogLevel.INFO : bulk_operation_logger_1.LogLevel.WARN, bulk_operation_logger_1.LogCategory.AUDIT, `Audit event: ${eventType}`, { userId, operation: action, sessionId: options.sessionId }, {
            eventId: auditEvent.id,
            resource,
            resourceId,
            riskLevel: auditEvent.riskLevel,
            dataCategories: options.dataCategories,
            legalBasis: options.legalBasis
        });
        return auditEvent.id;
    }
    /**
     * Log data processing activity
     */
    logDataProcessingActivity(controller, purpose, legalBasis, dataCategories, dataSubjects, options = {}) {
        const activity = {
            id: this.generateAuditId(),
            timestamp: new Date(),
            controller,
            processor: options.processor,
            purpose,
            legalBasis,
            dataCategories,
            dataSubjects,
            recipients: options.recipients,
            thirdCountryTransfers: options.thirdCountryTransfers ?? false,
            retentionPeriod: options.retentionPeriod ?? 2555,
            securityMeasures: options.securityMeasures ?? ['encryption', 'access_control'],
            automatedDecisionMaking: options.automatedDecisionMaking ?? false,
            consentRequired: options.consentRequired ?? false,
            consentObtained: options.consentObtained,
            relatedAuditEvents: []
        };
        this.dataProcessingActivities.set(activity.id, activity);
        bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.INFO, bulk_operation_logger_1.LogCategory.AUDIT, `Data processing activity logged: ${purpose}`, { userId: controller }, {
            activityId: activity.id,
            legalBasis,
            dataCategories,
            dataSubjectCount: dataSubjects.length,
            consentRequired: activity.consentRequired
        });
        return activity.id;
    }
    /**
     * Log bulk import audit event
     */
    logBulkImportAudit(userId, jobId, fileName, recordCount, validRecords, invalidRecords, options = {}) {
        return this.logEvent(AuditEventType.DATA_IMPORT_COMPLETED, userId, 'bulk_import', jobId, 'import_subscribers', {
            fileName,
            totalRecords: recordCount,
            validRecords,
            invalidRecords,
            successRate: recordCount > 0 ? (validRecords / recordCount) * 100 : 0
        }, {
            ...options,
            dataCategories: [DataCategory.CONTACT_INFORMATION, DataCategory.PERSONAL_IDENTIFIERS],
            riskLevel: recordCount > 10000 ? 'high' : recordCount > 1000 ? 'medium' : 'low'
        });
    }
    /**
     * Log bulk export audit event
     */
    logBulkExportAudit(userId, jobId, recordCount, filters, options = {}) {
        return this.logEvent(AuditEventType.DATA_EXPORT_COMPLETED, userId, 'bulk_export', jobId, 'export_subscribers', {
            recordCount,
            filters,
            exportedFields: filters.fields || 'all'
        }, {
            ...options,
            dataCategories: [DataCategory.CONTACT_INFORMATION, DataCategory.PERSONAL_IDENTIFIERS],
            riskLevel: recordCount > 10000 ? 'high' : recordCount > 1000 ? 'medium' : 'low'
        });
    }
    /**
     * Log GDPR data subject request
     */
    logDataSubjectRequest(requestType, dataSubjectEmail, requestedBy, options = {}) {
        const eventTypeMap = {
            access: AuditEventType.DATA_ACCESS_REQUEST,
            deletion: AuditEventType.DATA_DELETION_REQUEST,
            portability: AuditEventType.DATA_PORTABILITY_REQUEST,
            rectification: AuditEventType.DATA_RECTIFICATION_REQUEST
        };
        return this.logEvent(eventTypeMap[requestType], requestedBy, 'data_subject_request', dataSubjectEmail, `${requestType}_request`, {
            dataSubjectEmail,
            requestType,
            requestDetails: options.requestDetails
        }, {
            ...options,
            dataCategories: [DataCategory.PERSONAL_IDENTIFIERS, DataCategory.CONTACT_INFORMATION],
            legalBasis: DataProcessingLegalBasis.LEGAL_OBLIGATION,
            riskLevel: 'high'
        });
    }
    /**
     * Log consent event
     */
    logConsentEvent(action, dataSubjectEmail, consentId, purpose, options = {}) {
        return this.logEvent(action === 'granted' ? AuditEventType.CONSENT_GRANTED : AuditEventType.CONSENT_WITHDRAWN, dataSubjectEmail, 'consent', consentId, `consent_${action}`, {
            dataSubjectEmail,
            purpose,
            consentDetails: options.consentDetails
        }, {
            ...options,
            dataCategories: [DataCategory.CONTACT_INFORMATION],
            legalBasis: DataProcessingLegalBasis.CONSENT,
            consentId,
            riskLevel: 'medium'
        });
    }
    /**
     * Get audit events by criteria
     */
    getAuditEvents(criteria) {
        let events = Array.from(this.auditEvents.values());
        // Apply filters
        if (criteria.eventType) {
            events = events.filter(e => e.eventType === criteria.eventType);
        }
        if (criteria.userId) {
            events = events.filter(e => e.userId === criteria.userId);
        }
        if (criteria.resource) {
            events = events.filter(e => e.resource === criteria.resource);
        }
        if (criteria.startTime) {
            events = events.filter(e => e.timestamp >= criteria.startTime);
        }
        if (criteria.endTime) {
            events = events.filter(e => e.timestamp <= criteria.endTime);
        }
        if (criteria.riskLevel) {
            events = events.filter(e => e.riskLevel === criteria.riskLevel);
        }
        if (criteria.success !== undefined) {
            events = events.filter(e => e.success === criteria.success);
        }
        // Sort by timestamp (newest first)
        events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        // Apply limit
        if (criteria.limit) {
            events = events.slice(0, criteria.limit);
        }
        return events;
    }
    /**
     * Get data processing activities
     */
    getDataProcessingActivities(criteria) {
        let activities = Array.from(this.dataProcessingActivities.values());
        // Apply filters
        if (criteria.controller) {
            activities = activities.filter(a => a.controller === criteria.controller);
        }
        if (criteria.legalBasis) {
            activities = activities.filter(a => a.legalBasis === criteria.legalBasis);
        }
        if (criteria.dataCategory) {
            activities = activities.filter(a => a.dataCategories.includes(criteria.dataCategory));
        }
        if (criteria.startTime) {
            activities = activities.filter(a => a.timestamp >= criteria.startTime);
        }
        if (criteria.endTime) {
            activities = activities.filter(a => a.timestamp <= criteria.endTime);
        }
        // Sort by timestamp (newest first)
        activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        // Apply limit
        if (criteria.limit) {
            activities = activities.slice(0, criteria.limit);
        }
        return activities;
    }
    /**
     * Generate compliance report
     */
    generateComplianceReport(reportType, timeRange, requestedBy) {
        const events = this.getAuditEvents({
            startTime: timeRange.start,
            endTime: timeRange.end
        });
        const activities = this.getDataProcessingActivities({
            startTime: timeRange.start,
            endTime: timeRange.end
        });
        // Filter events by report type
        let filteredEvents = events;
        if (reportType === 'gdpr') {
            const gdprEventTypes = [
                AuditEventType.DATA_ACCESS_REQUEST,
                AuditEventType.DATA_DELETION_REQUEST,
                AuditEventType.DATA_PORTABILITY_REQUEST,
                AuditEventType.DATA_RECTIFICATION_REQUEST,
                AuditEventType.CONSENT_GRANTED,
                AuditEventType.CONSENT_WITHDRAWN
            ];
            filteredEvents = events.filter(e => gdprEventTypes.includes(e.eventType));
        }
        else if (reportType === 'security') {
            const securityEventTypes = [
                AuditEventType.SECURITY_BREACH_DETECTED,
                AuditEventType.UNAUTHORIZED_ACCESS_ATTEMPT,
                AuditEventType.MALWARE_DETECTED
            ];
            filteredEvents = events.filter(e => securityEventTypes.includes(e.eventType));
        }
        // Calculate summary statistics
        const consentEvents = events.filter(e => e.eventType === AuditEventType.CONSENT_GRANTED ||
            e.eventType === AuditEventType.CONSENT_WITHDRAWN);
        const securityEvents = events.filter(e => e.eventType === AuditEventType.SECURITY_BREACH_DETECTED ||
            e.eventType === AuditEventType.UNAUTHORIZED_ACCESS_ATTEMPT ||
            e.eventType === AuditEventType.MALWARE_DETECTED);
        const dataSubjectRequests = events.filter(e => e.eventType === AuditEventType.DATA_ACCESS_REQUEST ||
            e.eventType === AuditEventType.DATA_DELETION_REQUEST ||
            e.eventType === AuditEventType.DATA_PORTABILITY_REQUEST ||
            e.eventType === AuditEventType.DATA_RECTIFICATION_REQUEST);
        // Generate findings
        const findings = [];
        // Check for high-risk events
        const highRiskEvents = events.filter(e => e.riskLevel === 'high' || e.riskLevel === 'critical');
        if (highRiskEvents.length > 0) {
            findings.push({
                category: 'High Risk Events',
                severity: 'warning',
                message: `${highRiskEvents.length} high-risk events detected`,
                count: highRiskEvents.length,
                recommendations: ['Review high-risk events for compliance', 'Implement additional security measures']
            });
        }
        // Check for failed events
        const failedEvents = events.filter(e => !e.success);
        if (failedEvents.length > 0) {
            findings.push({
                category: 'Failed Operations',
                severity: 'error',
                message: `${failedEvents.length} operations failed`,
                count: failedEvents.length,
                recommendations: ['Investigate failed operations', 'Improve error handling']
            });
        }
        // Check consent compliance
        const consentRequiredActivities = activities.filter(a => a.consentRequired);
        const consentObtainedActivities = consentRequiredActivities.filter(a => a.consentObtained);
        if (consentRequiredActivities.length > consentObtainedActivities.length) {
            findings.push({
                category: 'Consent Compliance',
                severity: 'error',
                message: 'Some activities require consent but consent was not obtained',
                count: consentRequiredActivities.length - consentObtainedActivities.length,
                recommendations: ['Obtain required consent', 'Review consent management process']
            });
        }
        const report = {
            id: this.generateAuditId(),
            generatedAt: new Date(),
            reportType,
            timeRange,
            requestedBy,
            summary: {
                totalEvents: events.length,
                dataProcessingActivities: activities.length,
                consentEvents: consentEvents.length,
                securityEvents: securityEvents.length,
                dataSubjectRequests: dataSubjectRequests.length
            },
            findings,
            events: filteredEvents,
            dataProcessingActivities: activities
        };
        // Log report generation
        this.logEvent(AuditEventType.SYSTEM_CONFIGURATION_CHANGED, requestedBy, 'compliance_report', report.id, 'generate_report', {
            reportType,
            timeRange,
            eventCount: filteredEvents.length,
            findingCount: findings.length
        }, {
            riskLevel: 'medium'
        });
        return report;
    }
    /**
     * Apply data retention policy
     */
    applyDataRetentionPolicy() {
        const now = new Date();
        let deletedCount = 0;
        // Delete expired audit events
        for (const [id, event] of this.auditEvents.entries()) {
            const retentionEndDate = new Date(event.timestamp);
            retentionEndDate.setDate(retentionEndDate.getDate() + (event.retentionPeriod || 2555));
            if (now > retentionEndDate) {
                this.auditEvents.delete(id);
                deletedCount++;
            }
        }
        // Delete expired data processing activities
        for (const [id, activity] of this.dataProcessingActivities.entries()) {
            const retentionEndDate = new Date(activity.timestamp);
            retentionEndDate.setDate(retentionEndDate.getDate() + activity.retentionPeriod);
            if (now > retentionEndDate) {
                this.dataProcessingActivities.delete(id);
            }
        }
        if (deletedCount > 0) {
            bulk_operation_logger_1.bulkOperationLogger.log(bulk_operation_logger_1.LogLevel.INFO, bulk_operation_logger_1.LogCategory.AUDIT, `Data retention policy applied: ${deletedCount} records deleted`, { userId: 'system' }, { deletedCount, retentionPolicyDate: now });
        }
        return deletedCount;
    }
    // ============================================================================
    // Private Methods
    // ============================================================================
    generateAuditId() {
        return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    containsSensitiveData(data) {
        const sensitiveKeys = ['email', 'phone', 'name', 'address', 'ssn', 'creditCard'];
        return Object.keys(data).some(key => sensitiveKeys.some(sensitiveKey => key.toLowerCase().includes(sensitiveKey.toLowerCase())));
    }
    encryptSensitiveData(data) {
        if (!this.containsSensitiveData(data)) {
            return data;
        }
        // In a real implementation, use proper encryption
        // For now, just mark sensitive fields as encrypted
        const encrypted = { ...data };
        const sensitiveKeys = ['email', 'phone', 'name', 'address', 'ssn', 'creditCard'];
        for (const [key, value] of Object.entries(encrypted)) {
            if (sensitiveKeys.some(sensitiveKey => key.toLowerCase().includes(sensitiveKey.toLowerCase()))) {
                encrypted[key] = `[ENCRYPTED:${typeof value}]`;
            }
        }
        return encrypted;
    }
}
exports.BulkOperationAuditTrail = BulkOperationAuditTrail;
// ============================================================================
// Singleton Instance
// ============================================================================
exports.bulkOperationAudit = new BulkOperationAuditTrail();
exports.default = exports.bulkOperationAudit;
//# sourceMappingURL=bulk-operation-audit.js.map