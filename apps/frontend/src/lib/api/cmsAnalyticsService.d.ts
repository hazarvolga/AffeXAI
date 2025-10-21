export declare enum InteractionType {
    CLICK = "click",
    HOVER = "hover",
    SCROLL = "scroll",
    FOCUS = "focus",
    INPUT = "input",
    SUBMIT = "submit",
    VIEW = "view",
    EXIT = "exit"
}
export declare enum DeviceType {
    MOBILE = "mobile",
    TABLET = "tablet",
    DESKTOP = "desktop"
}
export declare enum ABTestStatus {
    DRAFT = "draft",
    RUNNING = "running",
    PAUSED = "paused",
    COMPLETED = "completed"
}
export type AnalyticsTimeRange = 'today' | 'yesterday' | 'last7days' | 'last30days' | 'last90days' | 'custom';
export interface ViewportDto {
    width: number;
    height: number;
}
export interface CoordinatesDto {
    x: number;
    y: number;
    relativeX: number;
    relativeY: number;
}
export interface TrackEventDto {
    componentId: string;
    componentType: string;
    interactionType: InteractionType;
    sessionId: string;
    userId?: string;
    pageUrl: string;
    deviceType: DeviceType;
    browser?: string;
    viewport: ViewportDto;
    coordinates?: CoordinatesDto;
    metadata?: Record<string, any>;
}
export interface SessionDto {
    id: string;
    startTime: string;
    deviceType: DeviceType;
    browser: string;
    os: string;
    userId?: string;
}
export interface BatchTrackEventsDto {
    events: TrackEventDto[];
    session?: SessionDto;
}
export interface AnalyticsQueryDto {
    timeRange: AnalyticsTimeRange;
    customStartDate?: string;
    customEndDate?: string;
    pageUrl?: string;
    componentType?: string;
    deviceTypes?: DeviceType[];
}
export interface HeatmapQueryDto {
    componentId: string;
    pageUrl?: string;
    timeRange: AnalyticsTimeRange;
    customStartDate?: string;
    customEndDate?: string;
}
export interface OverviewMetrics {
    totalViews: number;
    totalInteractions: number;
    averageEngagementTime: number;
    conversionRate: number;
    changeFromPrevious: {
        views: number;
        interactions: number;
        engagementTime: number;
        conversionRate: number;
    };
}
export interface ComponentRanking {
    componentId: string;
    componentType: string;
    pageUrl: string;
    interactionRate: number;
    conversions: number;
}
export interface TimelineDataPoint {
    timestamp: string;
    views: number;
    interactions: number;
    conversions: number;
}
export interface DashboardData {
    overview: OverviewMetrics;
    topComponents: ComponentRanking[];
    timeline: TimelineDataPoint[];
    deviceDistribution: Record<DeviceType, number>;
    recentSessions: any[];
}
export interface HeatmapPoint {
    x: number;
    y: number;
    intensity: number;
    type: InteractionType;
}
export interface HeatmapData {
    id: string;
    componentId: string;
    componentType: string;
    pageUrl: string;
    periodStart: string;
    periodEnd: string;
    points: HeatmapPoint[];
    dimensionWidth: number;
    dimensionHeight: number;
    totalInteractions: number;
    uniqueUsers: number;
}
export interface ABTestVariant {
    id: string;
    name: string;
    description?: string;
    componentConfig: Record<string, any>;
    trafficAllocation: number;
    impressions: number;
    interactions: number;
    conversions: number;
    conversionRate: number;
}
export interface ABTest {
    id: string;
    name: string;
    description?: string;
    componentId: string;
    componentType: string;
    status: ABTestStatus;
    periodStart: string;
    periodEnd: string;
    conversionGoal: string;
    targetAudience?: Record<string, any>;
    variants: ABTestVariant[];
    winnerVariantId?: string;
    confidenceLevel?: number;
    sampleSize?: number;
}
export interface CreateABTestDto {
    name: string;
    description?: string;
    componentId: string;
    componentType: string;
    status: ABTestStatus;
    periodStart: string;
    periodEnd: string;
    conversionGoal: string;
    targetAudience?: Record<string, any>;
    variants: Array<{
        name: string;
        description?: string;
        componentConfig: Record<string, any>;
        trafficAllocation: number;
    }>;
}
export interface UpdateABTestDto {
    name?: string;
    description?: string;
    status?: ABTestStatus;
    periodEnd?: string;
    winnerVariantId?: string;
    confidenceLevel?: number;
}
/**
 * CMS Analytics Service
 * Handles CMS component event tracking, dashboard data, heatmaps, and A/B testing
 */
declare class CmsAnalyticsService {
    private readonly endpoint;
    private readonly abTestEndpoint;
    trackEvent(dto: TrackEventDto): Promise<void>;
    trackEventsBatch(dto: BatchTrackEventsDto): Promise<{
        success: boolean;
        count: number;
    }>;
    getVariantForUser(testId: string): Promise<ABTestVariant>;
    trackImpression(variantId: string): Promise<void>;
    trackConversion(variantId: string, engagementTime?: number): Promise<void>;
    getDashboardData(query: AnalyticsQueryDto): Promise<DashboardData>;
    getHeatmap(query: HeatmapQueryDto): Promise<HeatmapData>;
    createABTest(dto: CreateABTestDto): Promise<ABTest>;
    getAllABTests(status?: ABTestStatus): Promise<ABTest[]>;
    getABTestById(id: string): Promise<ABTest>;
    updateABTest(id: string, dto: UpdateABTestDto): Promise<ABTest>;
    deleteABTest(id: string): Promise<{
        message: string;
    }>;
    startABTest(id: string): Promise<ABTest>;
    pauseABTest(id: string): Promise<ABTest>;
    completeABTest(id: string, winnerVariantId?: string): Promise<ABTest>;
}
export declare const cmsAnalyticsService: CmsAnalyticsService;
export {};
//# sourceMappingURL=cmsAnalyticsService.d.ts.map