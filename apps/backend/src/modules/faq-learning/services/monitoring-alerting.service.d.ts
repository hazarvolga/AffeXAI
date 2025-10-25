import { Repository } from 'typeorm';
import { FaqLearningConfig } from '../entities/faq-learning-config.entity';
import { LearningAnalyticsService } from './learning-analytics.service';
import { MailService } from '../../mail/mail.service';
export declare enum AlertSeverity {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
    CRITICAL = "critical"
}
export declare enum AlertType {
    SYSTEM_HEALTH = "system_health",
    PIPELINE_FAILURE = "pipeline_failure",
    PERFORMANCE_DEGRADATION = "performance_degradation",
    LOW_APPROVAL_RATE = "low_approval_rate",
    HIGH_ERROR_RATE = "high_error_rate",
    PROVIDER_FAILURE = "provider_failure",
    QUEUE_OVERFLOW = "queue_overflow"
}
export interface Alert {
    id: string;
    type: AlertType;
    severity: AlertSeverity;
    title: string;
    message: string;
    timestamp: Date;
    metadata?: Record<string, any>;
    resolved: boolean;
    resolvedAt?: Date;
}
export interface SystemHealthStatus {
    overall: 'healthy' | 'degraded' | 'critical';
    components: {
        learningPipeline: ComponentHealth;
        aiProviders: ComponentHealth;
        database: ComponentHealth;
        queue: ComponentHealth;
    };
    lastCheck: Date;
    alerts: Alert[];
}
export interface ComponentHealth {
    status: 'healthy' | 'degraded' | 'critical';
    message: string;
    metrics?: Record<string, any>;
}
export interface MonitoringThresholds {
    minApprovalRate: number;
    maxErrorRate: number;
    maxResponseTime: number;
    maxQueueSize: number;
    minDailyFaqs: number;
}
export declare class MonitoringAlertingService {
    private configRepository;
    private analyticsService;
    private mailService;
    private readonly logger;
    private alerts;
    private readonly MAX_ALERTS;
    constructor(configRepository: Repository<FaqLearningConfig>, analyticsService: LearningAnalyticsService, mailService: MailService);
    performHealthCheck(): Promise<void>;
    checkPerformanceMetrics(): Promise<void>;
    getSystemHealth(): Promise<SystemHealthStatus>;
    private checkLearningPipelineHealth;
    private checkAiProvidersHealth;
    private checkDatabaseHealth;
    private checkQueueHealth;
    createAlert(alertData: Omit<Alert, 'id' | 'timestamp' | 'resolved'>): Promise<Alert>;
    resolveAlert(alertId: string): Promise<boolean>;
    getActiveAlerts(): Alert[];
    getAllAlerts(limit?: number): Alert[];
    getAlertsByType(type: AlertType): Alert[];
    getAlertsBySeverity(severity: AlertSeverity): Alert[];
    clearResolvedAlerts(): number;
    private sendAlertNotification;
    private getAdminEmails;
    private getMonitoringThresholds;
    getAlertStatistics(): Promise<{
        total: number;
        active: number;
        resolved: number;
        last24h: number;
        bySeverity: {
            info: number;
            warning: number;
            error: number;
            critical: number;
        };
        byType: Record<string, number>;
    }>;
}
//# sourceMappingURL=monitoring-alerting.service.d.ts.map