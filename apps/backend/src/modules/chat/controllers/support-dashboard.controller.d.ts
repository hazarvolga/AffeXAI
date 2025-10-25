import { SupportDashboardService } from '../services/support-dashboard.service';
import { DashboardStatsResponseDto, SupportAgentStatsResponseDto, SessionOverviewResponseDto, EscalationAlertResponseDto, RealTimeMetricsResponseDto, DashboardQueryDto, SessionOverviewQueryDto } from '../dto/support-dashboard.dto';
export declare class SupportDashboardController {
    private readonly supportDashboardService;
    constructor(supportDashboardService: SupportDashboardService);
    getDashboardStats(query: DashboardQueryDto): Promise<DashboardStatsResponseDto>;
    getSupportAgentStats(query: DashboardQueryDto): Promise<SupportAgentStatsResponseDto[]>;
    getMyStats(req: any): Promise<SupportAgentStatsResponseDto[]>;
    getSessionOverview(query: SessionOverviewQueryDto): Promise<SessionOverviewResponseDto[]>;
    getMySessions(query: SessionOverviewQueryDto, req: any): Promise<SessionOverviewResponseDto[]>;
    getEscalationAlerts(): Promise<EscalationAlertResponseDto[]>;
    getRealTimeMetrics(): Promise<RealTimeMetricsResponseDto>;
    getQueueSessions(query: SessionOverviewQueryDto): Promise<SessionOverviewResponseDto[]>;
}
//# sourceMappingURL=support-dashboard.controller.d.ts.map