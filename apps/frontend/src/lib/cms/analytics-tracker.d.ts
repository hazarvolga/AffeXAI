/**
 * CMS Analytics Tracker
 *
 * Core tracking system for component-level analytics:
 * - Event collection and buffering
 * - Session management
 * - Heatmap data aggregation
 * - Performance monitoring
 */
import type { InteractionType } from '@/types/cms-analytics';
/**
 * Analytics Tracker Configuration
 */
export interface AnalyticsTrackerConfig {
    /** Enable tracking */
    enabled: boolean;
    /** Buffer size before sending to server */
    bufferSize: number;
    /** Buffer timeout (ms) */
    bufferTimeout: number;
    /** Enable session recording */
    enableSessionRecording: boolean;
    /** Enable heatmap tracking */
    enableHeatmaps: boolean;
    /** Enable performance monitoring */
    enablePerformanceMonitoring: boolean;
    /** Sample rate (0-1, for performance) */
    sampleRate: number;
    /** API endpoint for sending events */
    apiEndpoint: string;
    /** Exclude tracking for certain components */
    excludeComponents?: string[];
    /** Privacy mode (anonymize data) */
    privacyMode: boolean;
}
/**
 * Analytics Tracker Class
 */
export declare class AnalyticsTracker {
    private config;
    private eventBuffer;
    private sessionId;
    private sessionStartTime;
    private currentSession;
    private performanceObserver;
    private bufferTimer;
    constructor(config?: Partial<AnalyticsTrackerConfig>);
    /**
     * Initialize tracker
     */
    private initialize;
    /**
     * Start new session
     */
    private startSession;
    /**
     * Track component interaction
     */
    trackInteraction(componentId: string, componentType: string, interactionType: InteractionType, metadata?: Record<string, any>): void;
    /**
     * Track click with coordinates
     */
    trackClick(componentId: string, componentType: string, event: MouseEvent, metadata?: Record<string, any>): void;
    /**
     * Track component view (impression)
     */
    trackView(componentId: string, componentType: string): void;
    /**
     * Track component hover
     */
    trackHover(componentId: string, componentType: string, event: MouseEvent): void;
    /**
     * Track scroll depth
     */
    trackScroll(componentId: string, componentType: string, scrollDepth: number): void;
    /**
     * Track conversion
     */
    trackConversion(componentId: string, componentType: string, conversionGoal: string, value?: number): void;
    /**
     * Flush event buffer to server
     */
    flushBuffer(): Promise<void>;
    /**
     * Setup buffer timer
     */
    private setupBufferTimer;
    /**
     * Setup performance monitoring
     */
    private setupPerformanceMonitoring;
    /**
     * Track performance metric
     */
    private trackPerformance;
    /**
     * Handle visibility change
     */
    private handleVisibilityChange;
    /**
     * Handle before unload
     */
    private handleBeforeUnload;
    /**
     * Generate unique session ID
     */
    private generateSessionId;
    /**
     * Generate unique event ID
     */
    private generateEventId;
    /**
     * Get user ID (if authenticated)
     */
    private getUserId;
    /**
     * Get device type
     */
    private getDeviceType;
    /**
     * Get browser information
     */
    private getBrowser;
    /**
     * Get device information
     */
    private getDeviceInfo;
    /**
     * Get operating system
     */
    private getOS;
    /**
     * Anonymize metadata for privacy
     */
    private anonymizeMetadata;
    /**
     * Destroy tracker
     */
    destroy(): void;
}
/**
 * Initialize global analytics tracker
 */
export declare function initializeAnalytics(config?: Partial<AnalyticsTrackerConfig>): AnalyticsTracker;
/**
 * Get global tracker instance
 */
export declare function getAnalytics(): AnalyticsTracker | null;
/**
 * Destroy global tracker
 */
export declare function destroyAnalytics(): void;
//# sourceMappingURL=analytics-tracker.d.ts.map