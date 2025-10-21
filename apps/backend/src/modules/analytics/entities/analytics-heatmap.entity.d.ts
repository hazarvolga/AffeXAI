export interface HeatmapPoint {
    x: number;
    y: number;
    intensity: number;
    type: string;
}
export declare class AnalyticsHeatmap {
    id: string;
    componentId: string;
    componentType: string;
    pageUrl: string;
    periodStart: Date;
    periodEnd: Date;
    points: HeatmapPoint[];
    dimensionWidth: number;
    dimensionHeight: number;
    totalInteractions: number;
    uniqueUsers: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=analytics-heatmap.entity.d.ts.map