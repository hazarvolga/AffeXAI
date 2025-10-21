"use strict";
/**
 * CMS Analytics Tracker
 *
 * Core tracking system for component-level analytics:
 * - Event collection and buffering
 * - Session management
 * - Heatmap data aggregation
 * - Performance monitoring
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsTracker = void 0;
exports.initializeAnalytics = initializeAnalytics;
exports.getAnalytics = getAnalytics;
exports.destroyAnalytics = destroyAnalytics;
const cmsAnalyticsService_1 = require("@/lib/api/cmsAnalyticsService");
/**
 * Default configuration
 */
const defaultConfig = {
    enabled: true,
    bufferSize: 50,
    bufferTimeout: 5000,
    enableSessionRecording: false,
    enableHeatmaps: true,
    enablePerformanceMonitoring: true,
    sampleRate: 1.0,
    apiEndpoint: '/api/cms-analytics',
    privacyMode: false,
};
/**
 * Analytics Tracker Class
 */
class AnalyticsTracker {
    config;
    eventBuffer = [];
    sessionId;
    sessionStartTime;
    currentSession = null;
    performanceObserver = null;
    bufferTimer = null;
    constructor(config = {}) {
        this.config = { ...defaultConfig, ...config };
        this.sessionId = this.generateSessionId();
        this.sessionStartTime = new Date();
        if (this.config.enabled) {
            this.initialize();
        }
    }
    /**
     * Initialize tracker
     */
    initialize() {
        // Start session
        this.startSession();
        // Setup buffer timer
        this.setupBufferTimer();
        // Setup performance monitoring
        if (this.config.enablePerformanceMonitoring && typeof window !== 'undefined') {
            this.setupPerformanceMonitoring();
        }
        // Setup page visibility listener
        if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', this.handleVisibilityChange);
        }
        // Setup beforeunload listener
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', this.handleBeforeUnload);
        }
    }
    /**
     * Start new session
     */
    startSession() {
        this.currentSession = {
            id: this.sessionId,
            startTime: this.sessionStartTime,
            pagesVisited: [window.location.href],
            totalInteractions: 0,
            device: this.getDeviceInfo(),
        };
    }
    /**
     * Track component interaction
     */
    trackInteraction(componentId, componentType, interactionType, metadata) {
        if (!this.config.enabled)
            return;
        if (this.config.excludeComponents?.includes(componentId))
            return;
        if (Math.random() > this.config.sampleRate)
            return;
        const interaction = {
            id: this.generateEventId(),
            componentId,
            componentType,
            interactionType,
            timestamp: new Date(),
            sessionId: this.sessionId,
            userId: this.getUserId(),
            pageUrl: window.location.href,
            deviceType: this.getDeviceType(),
            browser: this.getBrowser(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
            metadata: this.config.privacyMode ? this.anonymizeMetadata(metadata) : metadata,
        };
        // Add to buffer
        this.eventBuffer.push(interaction);
        // Update session
        if (this.currentSession) {
            this.currentSession.totalInteractions++;
        }
        // Check if buffer is full
        if (this.eventBuffer.length >= this.config.bufferSize) {
            this.flushBuffer();
        }
    }
    /**
     * Track click with coordinates
     */
    trackClick(componentId, componentType, event, metadata) {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        const interaction = {
            id: this.generateEventId(),
            componentId,
            componentType,
            interactionType: 'click',
            timestamp: new Date(),
            sessionId: this.sessionId,
            userId: this.getUserId(),
            pageUrl: window.location.href,
            deviceType: this.getDeviceType(),
            browser: this.getBrowser(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
            coordinates: {
                x: event.clientX,
                y: event.clientY,
                relativeX: event.clientX - rect.left,
                relativeY: event.clientY - rect.top,
            },
            metadata: this.config.privacyMode ? this.anonymizeMetadata(metadata) : metadata,
        };
        this.eventBuffer.push(interaction);
        if (this.currentSession) {
            this.currentSession.totalInteractions++;
        }
        if (this.eventBuffer.length >= this.config.bufferSize) {
            this.flushBuffer();
        }
    }
    /**
     * Track component view (impression)
     */
    trackView(componentId, componentType) {
        this.trackInteraction(componentId, componentType, 'view');
    }
    /**
     * Track component hover
     */
    trackHover(componentId, componentType, event) {
        this.trackClick(componentId, componentType, event, { type: 'hover' });
    }
    /**
     * Track scroll depth
     */
    trackScroll(componentId, componentType, scrollDepth) {
        this.trackInteraction(componentId, componentType, 'scroll', { scrollDepth });
    }
    /**
     * Track conversion
     */
    trackConversion(componentId, componentType, conversionGoal, value) {
        this.trackInteraction(componentId, componentType, 'submit', {
            conversion: true,
            conversionGoal,
            value,
        });
        if (this.currentSession) {
            this.currentSession.converted = true;
            this.currentSession.conversionGoal = conversionGoal;
        }
    }
    /**
     * Flush event buffer to server
     */
    async flushBuffer() {
        if (this.eventBuffer.length === 0)
            return;
        const events = [...this.eventBuffer];
        this.eventBuffer = [];
        try {
            // Transform events to match API DTO format
            const batchDto = {
                events: events.map(event => ({
                    componentId: event.componentId,
                    componentType: event.componentType,
                    interactionType: event.interactionType,
                    sessionId: event.sessionId,
                    userId: event.userId,
                    pageUrl: event.pageUrl,
                    deviceType: event.deviceType,
                    browser: event.browser,
                    viewport: event.viewport,
                    coordinates: event.coordinates,
                    metadata: event.metadata,
                })),
                session: this.currentSession ? {
                    id: this.currentSession.id,
                    startTime: this.currentSession.startTime.toISOString(),
                    deviceType: this.currentSession.device.type,
                    browser: this.currentSession.device.browser || 'Unknown',
                    os: this.currentSession.device.os || 'Unknown',
                    userId: this.getUserId(),
                } : undefined,
            };
            await cmsAnalyticsService_1.cmsAnalyticsService.trackEventsBatch(batchDto);
        }
        catch (error) {
            console.error('Failed to send analytics events:', error);
            // Re-add events to buffer if send fails
            this.eventBuffer.unshift(...events);
        }
    }
    /**
     * Setup buffer timer
     */
    setupBufferTimer() {
        this.bufferTimer = setInterval(() => {
            this.flushBuffer();
        }, this.config.bufferTimeout);
    }
    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        if (!window.PerformanceObserver)
            return;
        this.performanceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'measure') {
                    // Track component render time
                    this.trackPerformance(entry);
                }
            }
        });
        this.performanceObserver.observe({ entryTypes: ['measure'] });
    }
    /**
     * Track performance metric
     */
    trackPerformance(entry) {
        // Extract component ID from mark name
        const match = entry.name.match(/component-render-(.*)/);
        if (!match)
            return;
        const componentId = match[1];
        this.trackInteraction(componentId, 'unknown', 'view', {
            performanceMetric: {
                name: entry.name,
                duration: entry.duration,
                startTime: entry.startTime,
            },
        });
    }
    /**
     * Handle visibility change
     */
    handleVisibilityChange = () => {
        if (document.hidden) {
            // Flush buffer when page becomes hidden
            this.flushBuffer();
        }
    };
    /**
     * Handle before unload
     */
    handleBeforeUnload = () => {
        // End session
        if (this.currentSession) {
            this.currentSession.endTime = new Date();
            this.currentSession.duration =
                this.currentSession.endTime.getTime() - this.currentSession.startTime.getTime();
        }
        // Flush buffer
        this.flushBuffer();
    };
    /**
     * Generate unique session ID
     */
    generateSessionId() {
        return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    /**
     * Generate unique event ID
     */
    generateEventId() {
        return `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    /**
     * Get user ID (if authenticated)
     */
    getUserId() {
        // Check if user is authenticated
        // This should integrate with your auth system
        if (typeof window !== 'undefined') {
            // Example: get from localStorage or cookie
            return localStorage.getItem('userId') || undefined;
        }
        return undefined;
    }
    /**
     * Get device type
     */
    getDeviceType() {
        if (typeof window === 'undefined')
            return 'desktop';
        const width = window.innerWidth;
        if (width < 768)
            return 'mobile';
        if (width < 1024)
            return 'tablet';
        return 'desktop';
    }
    /**
     * Get browser information
     */
    getBrowser() {
        if (typeof navigator === 'undefined')
            return 'unknown';
        return navigator.userAgent;
    }
    /**
     * Get device information
     */
    getDeviceInfo() {
        return {
            type: this.getDeviceType(),
            browser: this.getBrowser(),
            os: this.getOS(),
        };
    }
    /**
     * Get operating system
     */
    getOS() {
        if (typeof navigator === 'undefined')
            return 'unknown';
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf('Win') !== -1)
            return 'Windows';
        if (userAgent.indexOf('Mac') !== -1)
            return 'macOS';
        if (userAgent.indexOf('Linux') !== -1)
            return 'Linux';
        if (userAgent.indexOf('Android') !== -1)
            return 'Android';
        if (userAgent.indexOf('iOS') !== -1)
            return 'iOS';
        return 'unknown';
    }
    /**
     * Anonymize metadata for privacy
     */
    anonymizeMetadata(metadata) {
        if (!metadata)
            return undefined;
        // Remove sensitive fields
        const { email, phone, name, address, ...safe } = metadata;
        return safe;
    }
    /**
     * Destroy tracker
     */
    destroy() {
        // Flush remaining events
        this.flushBuffer();
        // Clear buffer timer
        if (this.bufferTimer) {
            clearInterval(this.bufferTimer);
        }
        // Disconnect performance observer
        if (this.performanceObserver) {
            this.performanceObserver.disconnect();
        }
        // Remove event listeners
        if (typeof document !== 'undefined') {
            document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        }
        if (typeof window !== 'undefined') {
            window.removeEventListener('beforeunload', this.handleBeforeUnload);
        }
    }
}
exports.AnalyticsTracker = AnalyticsTracker;
/**
 * Global tracker instance
 */
let globalTracker = null;
/**
 * Initialize global analytics tracker
 */
function initializeAnalytics(config = {}) {
    if (globalTracker) {
        globalTracker.destroy();
    }
    globalTracker = new AnalyticsTracker(config);
    return globalTracker;
}
/**
 * Get global tracker instance
 */
function getAnalytics() {
    return globalTracker;
}
/**
 * Destroy global tracker
 */
function destroyAnalytics() {
    if (globalTracker) {
        globalTracker.destroy();
        globalTracker = null;
    }
}
//# sourceMappingURL=analytics-tracker.js.map