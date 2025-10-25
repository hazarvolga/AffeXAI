import { MonitoringAlertingService, AlertType, AlertSeverity } from '../services/monitoring-alerting.service';
export declare class MonitoringController {
    private readonly monitoringService;
    constructor(monitoringService: MonitoringAlertingService);
    getSystemHealth(): Promise<{
        success: boolean;
        data: import("../services/monitoring-alerting.service").SystemHealthStatus;
    }>;
    getAllAlerts(limit?: number): Promise<{
        success: boolean;
        data: import("../services/monitoring-alerting.service").Alert[];
    }>;
    getActiveAlerts(): Promise<{
        success: boolean;
        data: import("../services/monitoring-alerting.service").Alert[];
    }>;
    getAlertsByType(type: AlertType): Promise<{
        success: boolean;
        data: import("../services/monitoring-alerting.service").Alert[];
    }>;
    getAlertsBySeverity(severity: AlertSeverity): Promise<{
        success: boolean;
        data: import("../services/monitoring-alerting.service").Alert[];
    }>;
    getAlertStatistics(): Promise<{
        success: boolean;
        data: {
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
        };
    }>;
    resolveAlert(alertId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    clearResolvedAlerts(): Promise<{
        success: boolean;
        message: string;
        data: {
            clearedCount: number;
        };
    }>;
    triggerHealthCheck(): Promise<{
        success: boolean;
        message: string;
        data: import("../services/monitoring-alerting.service").SystemHealthStatus;
    }>;
    triggerPerformanceCheck(): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=monitoring.controller.d.ts.map