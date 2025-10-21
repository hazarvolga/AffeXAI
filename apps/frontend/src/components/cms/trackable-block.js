"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackableBlock = TrackableBlock;
exports.withTracking = withTracking;
const react_1 = __importStar(require("react"));
const useCMSAnalytics_1 = require("@/hooks/useCMSAnalytics");
/**
 * TrackableBlock - Wrapper component for CMS blocks with analytics tracking
 *
 * Features:
 * - Automatic view tracking when block enters viewport
 * - Click tracking for interactive elements
 * - Engagement time tracking
 * - Scroll depth tracking within block
 * - Component performance metrics
 *
 * Usage:
 * ```tsx
 * <TrackableBlock block={blockInstance} pageId="home-page">
 *   <YourBlockComponent {...blockInstance.properties} />
 * </TrackableBlock>
 * ```
 */
function TrackableBlock({ block, pageId, children, className }) {
    const blockRef = (0, react_1.useRef)(null);
    const { trackEvent, startEngagementTracking, stopEngagementTracking } = (0, useCMSAnalytics_1.useAnalyticsTracker)();
    const viewTrackedRef = (0, react_1.useRef)(false);
    const engagementTimerRef = (0, react_1.useRef)(null);
    // Track block view when it enters viewport
    (0, react_1.useEffect)(() => {
        if (!blockRef.current || viewTrackedRef.current)
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !viewTrackedRef.current) {
                    // Track view event
                    trackEvent({
                        type: 'component_view',
                        componentId: block.id,
                        componentType: block.type,
                        pageId,
                        metadata: {
                            category: block.category,
                            label: block.metadata?.label || block.type,
                            variant: block.properties.variant || 'default',
                            position: block.metadata?.position || 'unknown'
                        }
                    });
                    viewTrackedRef.current = true;
                    // Start engagement tracking after 2 seconds of visibility
                    engagementTimerRef.current = setTimeout(() => {
                        startEngagementTracking(block.id);
                    }, 2000);
                }
                else if (!entry.isIntersecting && viewTrackedRef.current) {
                    // Stop engagement tracking when block leaves viewport
                    if (engagementTimerRef.current) {
                        clearTimeout(engagementTimerRef.current);
                    }
                    stopEngagementTracking(block.id);
                }
            });
        }, {
            threshold: 0.5, // Track when 50% of block is visible
            rootMargin: '0px'
        });
        observer.observe(blockRef.current);
        return () => {
            observer.disconnect();
            if (engagementTimerRef.current) {
                clearTimeout(engagementTimerRef.current);
            }
            stopEngagementTracking(block.id);
        };
    }, [block.id, block.type, block.category, pageId, trackEvent, startEngagementTracking, stopEngagementTracking]);
    // Track clicks within the block
    const handleBlockClick = (event) => {
        const target = event.target;
        const clickedElement = target.tagName.toLowerCase();
        // Track button clicks
        if (clickedElement === 'button' || target.closest('button')) {
            const button = target.closest('button');
            trackEvent({
                type: 'button_click',
                componentId: block.id,
                componentType: block.type,
                pageId,
                metadata: {
                    buttonText: button?.textContent || 'unknown',
                    buttonVariant: button?.getAttribute('data-variant') || 'default',
                    category: block.category
                }
            });
        }
        // Track link clicks
        if (clickedElement === 'a' || target.closest('a')) {
            const link = target.closest('a');
            trackEvent({
                type: 'link_click',
                componentId: block.id,
                componentType: block.type,
                pageId,
                metadata: {
                    linkText: link?.textContent || 'unknown',
                    linkHref: link?.getAttribute('href') || 'unknown',
                    category: block.category
                }
            });
        }
        // Track CTA interactions
        if (target.dataset.cta === 'true' || target.closest('[data-cta="true"]')) {
            trackEvent({
                type: 'cta_click',
                componentId: block.id,
                componentType: block.type,
                pageId,
                metadata: {
                    ctaText: target.textContent || 'unknown',
                    ctaType: target.dataset.ctaType || 'primary',
                    category: block.category
                }
            });
        }
    };
    // Track scroll depth within block
    const handleScroll = () => {
        if (!blockRef.current)
            return;
        const element = blockRef.current;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight - element.clientHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        // Track at 25%, 50%, 75%, 100% milestones
        const milestones = [25, 50, 75, 100];
        milestones.forEach((milestone) => {
            if (scrollPercent >= milestone && !element.dataset[`scrolled${milestone}`]) {
                element.dataset[`scrolled${milestone}`] = 'true';
                trackEvent({
                    type: 'scroll_depth',
                    componentId: block.id,
                    componentType: block.type,
                    pageId,
                    metadata: {
                        depth: milestone,
                        category: block.category
                    }
                });
            }
        });
    };
    return (<div ref={blockRef} className={className} onClick={handleBlockClick} onScroll={handleScroll} data-block-id={block.id} data-block-type={block.type} data-trackable="true">
      {children}
    </div>);
}
/**
 * withTracking - HOC to wrap any component with analytics tracking
 *
 * Usage:
 * ```tsx
 * const TrackedHero = withTracking(HeroBlock);
 * <TrackedHero block={blockInstance} pageId="home" />
 * ```
 */
function withTracking(Component) {
    return function TrackedComponent(props) {
        return (<TrackableBlock block={props.block} pageId={props.pageId}>
        <Component {...props}/>
      </TrackableBlock>);
    };
}
//# sourceMappingURL=trackable-block.js.map