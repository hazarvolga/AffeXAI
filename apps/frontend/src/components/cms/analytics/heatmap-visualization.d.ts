import type { ComponentHeatmap, HeatmapPoint, InteractionType } from '@/types/cms-analytics';
export interface HeatmapVisualizationProps {
    /** Heatmap data */
    heatmap: ComponentHeatmap;
    /** Filter by interaction type */
    interactionType?: InteractionType;
    /** Intensity threshold (0-1) */
    intensityThreshold?: number;
    /** Gradient colors */
    gradient?: {
        low: string;
        medium: string;
        high: string;
    };
    /** Show overlay controls */
    showControls?: boolean;
    /** On point click */
    onPointClick?: (point: HeatmapPoint) => void;
}
export declare function HeatmapVisualization({ heatmap, interactionType, intensityThreshold, gradient, showControls, onPointClick, }: HeatmapVisualizationProps): import("react").JSX.Element;
/**
 * Heatmap Comparison Component
 * Compare two heatmaps side by side (e.g., A/B test variants)
 */
export interface HeatmapComparisonProps {
    /** First heatmap */
    heatmapA: ComponentHeatmap;
    /** Second heatmap */
    heatmapB: ComponentHeatmap;
    /** Label for heatmap A */
    labelA?: string;
    /** Label for heatmap B */
    labelB?: string;
    /** Show difference heatmap */
    showDifference?: boolean;
}
export declare function HeatmapComparison({ heatmapA, heatmapB, labelA, labelB, showDifference, }: HeatmapComparisonProps): import("react").JSX.Element;
//# sourceMappingURL=heatmap-visualization.d.ts.map