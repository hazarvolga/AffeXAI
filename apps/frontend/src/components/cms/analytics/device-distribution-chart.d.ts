import type { DeviceType } from '@/lib/api/cmsAnalyticsService';
interface DeviceDistributionChartProps {
    distribution: Record<DeviceType, number>;
    isLoading?: boolean;
}
export declare function DeviceDistributionChart({ distribution, isLoading }: DeviceDistributionChartProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=device-distribution-chart.d.ts.map