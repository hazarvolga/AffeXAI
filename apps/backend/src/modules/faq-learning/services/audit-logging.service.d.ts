import { Repository } from 'typeorm';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
export declare enum AuditAction {
    FAQ_CREATED = "faq_created",
    FAQ_UPDATED = "faq_updated",
    FAQ_DELETED = "faq_deleted",
    FAQ_APPROVED = "faq_approved",
    FAQ_REJECTED = "faq_rejected",
    FAQ_PUBLISHED = "faq_published",
    CONFIG_UPDATED = "config_updated",
    PROVIDER_SWITCHED = "provider_switched",
    BATCH_PROCESSED = "batch_processed",
    PATTERN_CREATED = "pattern_created",
    USER_ACCESS = "user_access",
    SECURITY_EVENT = "security_event"
}
export declare enum AuditSeverity {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
    CRITICAL = "critical"
}
export interface AuditLog {
    id: string;
    action: AuditAction;
    severity: AuditSeverity;
    userId?: string;
    userName?: string;
    resourceType: string;
    resourceId?: string;
    details: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
    timestamp: Date;
    success: boolean;
    errorMessage?: string;
}
export interface AccessControlCheck {
    allowed: boolean;
    reason?: string;
    requiredRole?: string;
    userRole?: string;
}
export declare class AuditLoggingService {
    private configRepository;
    private readonly logger;
    private auditLogs;
    private readonly MAX_LOGS;
    constructor(configRepository: Repository<FaqLearningConfig>);
    logAction(data: {
        action: AuditAction;
        severity?: AuditSeverity;
        userId?: string;
        userName?: string;
        resourceType: string;
        resourceId?: string;
        details?: Record<string, any>;
        ipAddress?: string;
        userAgent?: string;
        success?: boolean;
        errorMessage?: string;
    }): Promise<AuditLog>;
    checkAccess(data: {
        userId: string;
        userRole: string;
        action: string;
        resourceType: string;
        resourceId?: string;
    }): Promise<AccessControlCheck>;
    logSecurityEvent(data: {
        eventType: string;
        severity: AuditSeverity;
        userId?: string;
        details: Record<string, any>;
        ipAddress?: string;
    }): Promise<void>;
    getAuditLogs(filters?: {
        action?: AuditAction;
        userId?: string;
        resourceType?: string;
        severity?: AuditSeverity;
        startDate?: Date;
        endDate?: Date;
        limit?: number;
    }): AuditLog[];
    getAuditStatistics(period?: 'day' | 'week' | 'month'): {
        total: number;
        byAction: Record<string, number>;
        bySeverity: Record<string, number>;
        uniqueUsers: number;
        failedActions: number;
        successRate: number;
    };
    exportAuditLogs(filters?: {
        startDate?: Date;
        endDate?: Date;
        format?: 'json' | 'csv';
    }): Promise<string>;
    private getRolePermissions;
    private getRequiredRole;
    private hasPermission;
    private convertToCSV;
}
//# sourceMappingURL=audit-logging.service.d.ts.map