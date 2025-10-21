import type { AnalyticsDashboard, AnalyticsTimeRange } from '@/types/cms-analytics';
export interface AnalyticsDashboardProps {
    /** Dashboard data */
    data: AnalyticsDashboard;
    /** Selected time range */
    timeRange: AnalyticsTimeRange;
    /** On time range change */
    onTimeRangeChange?: (range: AnalyticsTimeRange) => void;
    /** On component click */
    onComponentClick?: (componentId: string) => void;
    /** On test click */
    onTestClick?: (testId: string) => void;
}
export declare function AnalyticsDashboard({ data, timeRange, onTimeRangeChange, onComponentClick, onTestClick, }: AnalyticsDashboardProps): import("react").JSX.Element;
//# sourceMappingURL=analytics-dashboard.d.ts.map