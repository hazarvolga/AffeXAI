import { CmsMetricsService } from '../services/cms-metrics.service';
import { TrackPageViewDto, TrackLinkClickDto, TrackActivityDto, GetMetricsQueryDto, CmsMetricsResponseDto } from '../dto/cms-metrics.dto';
export declare class CmsMetricsController {
    private readonly metricsService;
    constructor(metricsService: CmsMetricsService);
    getMetrics(query: GetMetricsQueryDto): Promise<CmsMetricsResponseDto>;
    trackPageView(dto: TrackPageViewDto): Promise<{
        success: boolean;
        message: string;
    }>;
    trackLinkClick(dto: TrackLinkClickDto): Promise<{
        success: boolean;
        message: string;
    }>;
    trackActivity(dto: TrackActivityDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=cms-metrics.controller.d.ts.map