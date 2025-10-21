"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsStatsChart = CmsStatsChart;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const recharts_1 = require("recharts");
const cmsMetricsService_1 = require("@/lib/api/cmsMetricsService");
function CmsStatsChart() {
    const [topPages, setTopPages] = (0, react_1.useState)([]);
    const [stats, setStats] = (0, react_1.useState)({ published: 0, draft: 0, total: 0 });
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            setLoading(true);
            // Get real CMS metrics
            const metrics = await cmsMetricsService_1.cmsMetricsService.getMetrics('week');
            // Map top pages to chart data
            const topPagesData = metrics.topPages.slice(0, 5).map(page => ({
                page: page.pageTitle.length > 20 ? page.pageTitle.substring(0, 20) + '...' : page.pageTitle,
                views: page.viewCount,
                status: 'published',
            }));
            setTopPages(topPagesData.length > 0 ? topPagesData : [
                { page: 'Veri Yok', views: 0, status: 'published' }
            ]);
            // Calculate stats from summary (backend only tracks publishes and edits, no separate draft count)
            const summary = metrics.summary;
            setStats({
                published: summary.publishes,
                draft: summary.edits, // Show edits as draft count for now
                total: summary.publishes + summary.edits,
            });
        }
        catch (error) {
            console.error('Error loading CMS data:', error);
            // Fallback to empty state
            setTopPages([{ page: 'Veri Yüklenemedi', views: 0, status: 'published' }]);
            setStats({
                published: 0,
                draft: 0,
                total: 0,
            });
        }
        finally {
            setLoading(false);
        }
    };
    // Custom bar colors
    const getBarColor = (views) => {
        if (views > 1000)
            return 'hsl(142, 71%, 45%)'; // Green
        if (views > 700)
            return 'hsl(217, 91%, 60%)'; // Blue
        return 'hsl(271, 91%, 65%)'; // Purple
    };
    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (<div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold">{payload[0].payload.page}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <lucide_react_1.Eye className="h-3 w-3"/>
            {payload[0].value.toLocaleString('tr-TR')} görüntülenme
          </p>
        </div>);
        }
        return null;
    };
    if (loading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center gap-2">
            <lucide_react_1.FileText className="h-5 w-5"/>
            CMS İçerik Performansı
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Yükleniyor...</p>
        </card_1.CardContent>
      </card_1.Card>);
    }
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="flex items-center gap-2">
          <lucide_react_1.FileText className="h-5 w-5"/>
          CMS İçerik Performansı
        </card_1.CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          En çok okunan sayfalar
        </p>
      </card_1.CardHeader>
      <card_1.CardContent>
        {/* Bar Chart */}
        <recharts_1.ResponsiveContainer width="100%" height={200}>
          <recharts_1.BarChart data={topPages} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <recharts_1.CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
            <recharts_1.XAxis dataKey="page" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={11} angle={-15} textAnchor="end" height={60}/>
            <recharts_1.YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12}/>
            <recharts_1.Tooltip content={<CustomTooltip />}/>
            <recharts_1.Bar dataKey="views" radius={[4, 4, 0, 0]} animationDuration={1000} animationEasing="ease-out">
              {topPages.map((entry, index) => (<recharts_1.Cell key={`cell-${index}`} fill={getBarColor(entry.views)}/>))}
            </recharts_1.Bar>
          </recharts_1.BarChart>
        </recharts_1.ResponsiveContainer>

        {/* Stats Summary */}
        <div className="flex justify-around mt-4 border-t pt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{stats.published}</p>
            <p className="text-xs text-muted-foreground">Yayında</p>
          </div>
          <div className="h-12 w-px bg-border"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
            <p className="text-xs text-muted-foreground">Taslak</p>
          </div>
          <div className="h-12 w-px bg-border"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Toplam</p>
          </div>
        </div>
      </card_1.CardContent>
      <card_1.CardFooter>
        <button_1.Button asChild size="sm" variant="outline" className="w-full">
          <link_1.default href="/admin/cms">
            Tüm Sayfalar <lucide_react_1.ArrowUpRight className="h-4 w-4 ml-2"/>
          </link_1.default>
        </button_1.Button>
      </card_1.CardFooter>
    </card_1.Card>);
}
//# sourceMappingURL=cms-stats-chart.js.map