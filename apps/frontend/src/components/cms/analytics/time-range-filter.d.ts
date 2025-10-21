import type { AnalyticsTimeRange } from '@/lib/api/cmsAnalyticsService';
interface TimeRangeFilterProps {
    timeRange: AnalyticsTimeRange;
    onTimeRangeChange: (range: AnalyticsTimeRange) => void;
    customStartDate?: Date;
    customEndDate?: Date;
    onCustomDateChange?: (start?: Date, end?: Date) => void;
}
export declare function TimeRangeFilter({ timeRange, onTimeRangeChange, customStartDate, customEndDate, onCustomDateChange, }: TimeRangeFilterProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=time-range-filter.d.ts.map