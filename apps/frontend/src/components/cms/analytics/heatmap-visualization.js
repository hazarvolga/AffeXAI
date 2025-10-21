"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatmapVisualization = HeatmapVisualization;
exports.HeatmapComparison = HeatmapComparison;
/**
 * Heatmap Visualization Component
 *
 * Displays user interaction heatmaps on components:
 * - Click heatmaps
 * - Hover/scroll heatmaps
 * - Customizable intensity gradients
 * - Interactive overlay
 */
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const defaultGradient = {
    low: 'rgba(0, 255, 0, 0.3)',
    medium: 'rgba(255, 255, 0, 0.5)',
    high: 'rgba(255, 0, 0, 0.7)',
};
function HeatmapVisualization({ heatmap, interactionType, intensityThreshold = 0, gradient = defaultGradient, showControls = true, onPointClick, }) {
    const canvasRef = (0, react_1.useRef)(null);
    const [opacity, setOpacity] = (0, react_1.useState)(0.7);
    const [radius, setRadius] = (0, react_1.useState)(30);
    const [selectedType, setSelectedType] = (0, react_1.useState)('all');
    (0, react_1.useEffect)(() => {
        if (!canvasRef.current)
            return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        // Set canvas size
        canvas.width = heatmap.dimensions.width;
        canvas.height = heatmap.dimensions.height;
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Filter points
        const filteredPoints = heatmap.points.filter((point) => {
            if (interactionType && point.type !== interactionType)
                return false;
            if (selectedType !== 'all' && point.type !== selectedType)
                return false;
            if (point.intensity < intensityThreshold)
                return false;
            return true;
        });
        // Find max intensity for normalization
        const maxIntensity = Math.max(...filteredPoints.map((p) => p.intensity), 1);
        // Draw heatmap points
        filteredPoints.forEach((point) => {
            const normalizedIntensity = point.intensity / maxIntensity;
            // Create radial gradient
            const grad = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
            // Determine color based on intensity
            let color;
            if (normalizedIntensity < 0.33) {
                color = gradient.low;
            }
            else if (normalizedIntensity < 0.67) {
                color = gradient.medium;
            }
            else {
                color = gradient.high;
            }
            grad.addColorStop(0, color);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.globalAlpha = opacity * normalizedIntensity;
            ctx.fillStyle = grad;
            ctx.fillRect(point.x - radius, point.y - radius, radius * 2, radius * 2);
        });
        ctx.globalAlpha = 1;
    }, [heatmap, interactionType, selectedType, intensityThreshold, opacity, radius, gradient]);
    const handleCanvasClick = (event) => {
        if (!onPointClick)
            return;
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // Find nearest point
        const nearestPoint = heatmap.points.reduce((nearest, point) => {
            const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
            const nearestDistance = Math.sqrt(Math.pow(nearest.x - x, 2) + Math.pow(nearest.y - y, 2));
            return distance < nearestDistance ? point : nearest;
        });
        onPointClick(nearestPoint);
    };
    const interactionTypes = [
        'all',
        'click',
        'hover',
        'scroll',
        'view',
    ];
    return (<card_1.Card className="p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Heatmap Visualization</h3>
            <p className="text-sm text-muted-foreground">
              {heatmap.totalInteractions.toLocaleString()} interactions from{' '}
              {heatmap.uniqueUsers.toLocaleString()} users
            </p>
          </div>
          <div className="flex items-center gap-2">
            <badge_1.Badge variant="outline">
              {new Date(heatmap.period.start).toLocaleDateString()} -{' '}
              {new Date(heatmap.period.end).toLocaleDateString()}
            </badge_1.Badge>
          </div>
        </div>

        {/* Controls */}
        {showControls && (<div className="space-y-3 border-t pt-3">
            {/* Interaction type filter */}
            <div className="flex flex-wrap gap-2">
              {interactionTypes.map((type) => (<button_1.Button key={type} variant={selectedType === type ? 'default' : 'outline'} size="sm" onClick={() => setSelectedType(type)}>
                  {type}
                </button_1.Button>))}
            </div>

            {/* Opacity control */}
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Opacity: {Math.round(opacity * 100)}%
              </label>
              <input type="range" min="0" max="100" value={opacity * 100} onChange={(e) => setOpacity(Number(e.target.value) / 100)} className="w-full"/>
            </div>

            {/* Radius control */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Radius: {radius}px</label>
              <input type="range" min="10" max="100" value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full"/>
            </div>
          </div>)}

        {/* Canvas */}
        <div className="relative border rounded-lg overflow-hidden bg-muted/20">
          <canvas ref={canvasRef} onClick={handleCanvasClick} className="w-full h-auto cursor-crosshair" style={{
            maxHeight: '600px',
            objectFit: 'contain',
        }}/>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
            <div className="text-xs font-medium mb-2">Intensity</div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: gradient.low }}/>
              <span className="text-xs text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: gradient.medium }}/>
              <span className="text-xs text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: gradient.high }}/>
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 border-t pt-3">
          <div>
            <div className="text-sm text-muted-foreground">Total Points</div>
            <div className="text-2xl font-bold">{heatmap.points.length}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Avg Intensity</div>
            <div className="text-2xl font-bold">
              {(heatmap.points.reduce((sum, p) => sum + p.intensity, 0) /
            heatmap.points.length).toFixed(1)}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Peak Intensity</div>
            <div className="text-2xl font-bold">
              {Math.max(...heatmap.points.map((p) => p.intensity))}
            </div>
          </div>
        </div>
      </div>
    </card_1.Card>);
}
function HeatmapComparison({ heatmapA, heatmapB, labelA = 'Variant A', labelB = 'Variant B', showDifference = false, }) {
    return (<div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">{labelA}</h3>
          <HeatmapVisualization heatmap={heatmapA} showControls={false}/>
        </div>
        <div>
          <h3 className="font-semibold mb-2">{labelB}</h3>
          <HeatmapVisualization heatmap={heatmapB} showControls={false}/>
        </div>
      </div>

      {showDifference && (<card_1.Card className="p-4">
          <h3 className="font-semibold mb-2">Difference Analysis</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Interaction Difference</div>
              <div className="text-2xl font-bold">
                {((heatmapB.totalInteractions - heatmapA.totalInteractions) /
                heatmapA.totalInteractions *
                100).toFixed(1)}
                %
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">User Difference</div>
              <div className="text-2xl font-bold">
                {((heatmapB.uniqueUsers - heatmapA.uniqueUsers) /
                heatmapA.uniqueUsers *
                100).toFixed(1)}
                %
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Points Difference</div>
              <div className="text-2xl font-bold">
                {((heatmapB.points.length - heatmapA.points.length) /
                heatmapA.points.length *
                100).toFixed(1)}
                %
              </div>
            </div>
          </div>
        </card_1.Card>)}
    </div>);
}
//# sourceMappingURL=heatmap-visualization.js.map