import { Repository } from 'typeorm';
import { CmsMetric } from '../entities/cms-metric.entity';
import { TrackPageViewDto, TrackLinkClickDto, TrackActivityDto, CmsMetricsResponseDto } from '../dto/cms-metrics.dto';
export declare class CmsMetricsService {
    private readonly metricsRepository;
    constructor(metricsRepository: Repository<CmsMetric>);
    trackPageView(dto: TrackPageViewDto): Promise<CmsMetric>;
    trackLinkClick(dto: TrackLinkClickDto): Promise<CmsMetric>;
    trackActivity(dto: TrackActivityDto): Promise<CmsMetric>;
    getMetrics(period: 'day' | 'week' | 'month'): Promise<CmsMetricsResponseDto>;
    private getStartDate;
    private getSummary;
    private getTopPages;
    private getTopLinks;
    private getCategoryEngagement;
}
//# sourceMappingURL=cms-metrics.service.d.ts.map