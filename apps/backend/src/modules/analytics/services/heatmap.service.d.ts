import { Repository } from 'typeorm';
import { AnalyticsHeatmap, AnalyticsEvent } from '../entities';
import { HeatmapQueryDto } from '../dto';
export declare class HeatmapService {
    private readonly heatmapRepository;
    private readonly eventRepository;
    constructor(heatmapRepository: Repository<AnalyticsHeatmap>, eventRepository: Repository<AnalyticsEvent>);
    /**
     * Generate heatmap from events
     */
    generateHeatmap(query: HeatmapQueryDto): Promise<AnalyticsHeatmap>;
    /**
     * Get heatmap by ID
     */
    getHeatmapById(id: string): Promise<AnalyticsHeatmap | null>;
    /**
     * Get heatmaps for component
     */
    getHeatmapsForComponent(componentId: string, pageUrl?: string): Promise<AnalyticsHeatmap[]>;
    /**
     * Delete old heatmaps
     */
    deleteOldHeatmaps(daysToKeep?: number): Promise<number>;
    /**
     * Helper: Get date range from query
     */
    private getDateRange;
}
//# sourceMappingURL=heatmap.service.d.ts.map