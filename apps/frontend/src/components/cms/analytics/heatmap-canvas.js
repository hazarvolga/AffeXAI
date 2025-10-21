"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatmapCanvas = HeatmapCanvas;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
function HeatmapCanvas({ data, isLoading }) {
    const canvasRef = (0, react_1.useRef)(null);
    const [dimensions, setDimensions] = (0, react_1.useState)({ width: 800, height: 600 });
    (0, react_1.useEffect)(() => {
        if (!data || !canvasRef.current)
            return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        // Set canvas dimensions
        const width = data.dimensionWidth || 800;
        const height = data.dimensionHeight || 600;
        setDimensions({ width, height });
        canvas.width = width;
        canvas.height = height;
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        // Draw heatmap points
        drawHeatmap(ctx, data.points, width, height);
    }, [data]);
    const drawHeatmap = (ctx, points, width, height) => {
        if (points.length === 0)
            return;
        // Find max intensity for normalization
        const maxIntensity = Math.max(...points.map(p => p.intensity), 1);
        // Draw each point as a radial gradient
        points.forEach((point) => {
            const normalizedIntensity = point.intensity / maxIntensity;
            const radius = 20; // Adjust for desired spread
            // Create radial gradient
            const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
            // Color based on intensity
            const hue = (1 - normalizedIntensity) * 240; // Blue (240) to Red (0)
            const alpha = Math.min(normalizedIntensity * 0.8, 0.8);
            gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, ${alpha})`);
            gradient.addColorStop(0.5, `hsla(${hue}, 100%, 50%, ${alpha * 0.5})`);
            gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
            // Draw gradient circle
            ctx.fillStyle = gradient;
            ctx.fillRect(point.x - radius, point.y - radius, radius * 2, radius * 2);
        });
        // Apply blend mode for overlapping
        ctx.globalCompositeOperation = 'screen';
    };
    if (isLoading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>
            <div className="h-6 w-48 bg-muted animate-pulse rounded"/>
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="h-[600px] bg-muted animate-pulse rounded"/>
        </card_1.CardContent>
      </card_1.Card>);
    }
    if (!data) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Heatmap Görselleştirme</card_1.CardTitle>
          <card_1.CardDescription>
            Component seçin ve zaman aralığı belirleyin
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="flex items-center justify-center h-[600px] text-muted-foreground">
            Heatmap verileri göstermek için filtreleri kullanın
          </div>
        </card_1.CardContent>
      </card_1.Card>);
    }
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Heatmap: {data.componentId}</card_1.CardTitle>
        <card_1.CardDescription>
          {data.totalInteractions.toLocaleString('tr-TR')} etkileşim -{' '}
          {data.uniqueUsers} benzersiz kullanıcı
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        <div className="relative border rounded-lg overflow-hidden bg-muted/10">
          <canvas ref={canvasRef} className="w-full h-auto" style={{ maxHeight: '600px' }}/>

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border shadow-lg">
            <div className="text-xs font-semibold mb-2">Yoğunluk</div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-3 rounded" style={{
            background: 'linear-gradient(to right, hsl(240, 100%, 50%), hsl(0, 100%, 50%))'
        }}/>
              <div className="flex justify-between w-full text-xs text-muted-foreground">
                <span>Düşük</span>
                <span>Yüksek</span>
              </div>
            </div>
          </div>

          {/* Stats overlay */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border shadow-lg">
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Toplam Tıklama:</span>
                <span className="font-semibold">{data.totalInteractions}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Benzersiz Kullanıcı:</span>
                <span className="font-semibold">{data.uniqueUsers}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Dönem:</span>
                <span className="font-semibold">
                  {new Date(data.periodStart).toLocaleDateString('tr-TR')} -{' '}
                  {new Date(data.periodEnd).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=heatmap-canvas.js.map