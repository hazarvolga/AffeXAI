import React from 'react';
import type { BlockInstance } from '@/types/cms-template';
interface TrackableBlockProps {
    block: BlockInstance;
    pageId: string;
    children: React.ReactNode;
    className?: string;
}
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
export declare function TrackableBlock({ block, pageId, children, className }: TrackableBlockProps): React.JSX.Element;
/**
 * withTracking - HOC to wrap any component with analytics tracking
 *
 * Usage:
 * ```tsx
 * const TrackedHero = withTracking(HeroBlock);
 * <TrackedHero block={blockInstance} pageId="home" />
 * ```
 */
export declare function withTracking<P extends {
    block: BlockInstance;
    pageId: string;
}>(Component: React.ComponentType<P>): (props: P) => React.JSX.Element;
export {};
//# sourceMappingURL=trackable-block.d.ts.map