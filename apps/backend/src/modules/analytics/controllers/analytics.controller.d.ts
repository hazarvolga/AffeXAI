import { AnalyticsTrackingService, AnalyticsDashboardService, HeatmapService, ABTestingService } from '../services';
import { TrackEventDto, BatchTrackEventsDto, AnalyticsQueryDto, HeatmapQueryDto } from '../dto';
export declare class AnalyticsController {
    private readonly trackingService;
    private readonly dashboardService;
    private readonly heatmapService;
    private readonly abTestingService;
    constructor(trackingService: AnalyticsTrackingService, dashboardService: AnalyticsDashboardService, heatmapService: HeatmapService, abTestingService: ABTestingService);
    /**
     * Track a single event
     * POST /analytics/track
     */
    trackEvent(dto: TrackEventDto): Promise<void>;
    /**
     * Track multiple events (batch)
     * POST /analytics/track/batch
     */
    trackEventsBatch(dto: BatchTrackEventsDto): Promise<{
        success: boolean;
        count: number;
    }>;
    /**
     * Get dashboard data
     * GET /analytics/dashboard
     */
    getDashboard(query: AnalyticsQueryDto): Promise<import("../services/analytics-dashboard.service").DashboardData>;
    /**
     * Generate/Get heatmap
     * GET /analytics/heatmap
     */
    getHeatmap(query: HeatmapQueryDto): Promise<import("../entities").AnalyticsHeatmap>;
    /**
     * Get heatmaps for component
     * GET /analytics/heatmap/:componentId
     */
    getComponentHeatmaps(componentId: string, pageUrl?: string): Promise<import("../entities").AnalyticsHeatmap[]>;
    /**
     * Get variant for A/B test (for user assignment)
     * GET /analytics/ab-test/:testId/variant
     */
    getTestVariant(testId: string): Promise<import("../entities").ABTestVariant | null>;
    /**
     * Track A/B test impression
     * POST /analytics/ab-test/impression
     */
    trackTestImpression(variantId: string): Promise<void>;
    /**
     * Track A/B test conversion
     * POST /analytics/ab-test/conversion
     */
    trackTestConversion(variantId: string, engagementTime?: number): Promise<void>;
}
//# sourceMappingURL=analytics.controller.d.ts.map