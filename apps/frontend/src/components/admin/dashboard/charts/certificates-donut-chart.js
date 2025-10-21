"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesDonutChart = CertificatesDonutChart;
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const recharts_1 = require("recharts");
const api_1 = require("@/lib/api");
function CertificatesDonutChart() {
    const [data, setData] = (0, react_1.useState)([]);
    const [total, setTotal] = (0, react_1.useState)(0);
    const [completionRate, setCompletionRate] = (0, react_1.useState)(0);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            setLoading(true);
            // Get real certificate statistics
            const stats = await api_1.certificatesService.getStatistics();
            // Map to chart data
            const chartData = [
                { name: 'Verildi', value: stats.issued + stats.sent, color: 'hsl(142, 71%, 45%)' }, // Green
                { name: 'Taslak', value: stats.draft, color: 'hsl(48, 96%, 53%)' }, // Yellow
            ];
            // Filter out items with 0 value
            const filteredData = chartData.filter(item => item.value > 0);
            setData(filteredData.length > 0 ? filteredData : [
                { name: 'Veri Yok', value: 1, color: 'hsl(var(--muted))' }
            ]);
            const totalCerts = stats.total;
            setTotal(totalCerts);
            const issuedCount = stats.issued + stats.sent;
            const rate = totalCerts > 0 ? (issuedCount / totalCerts) * 100 : 0;
            setCompletionRate(Math.round(rate));
        }
        catch (error) {
            console.error('Error loading certificates data:', error);
            // Fallback to empty state
            setData([{ name: 'Hata', value: 1, color: 'hsl(0, 84%, 60%)' }]);
            setTotal(0);
            setCompletionRate(0);
        }
        finally {
            setLoading(false);
        }
    };
    // Custom label in center
    const renderCustomLabel = () => {
        return (<text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
        <tspan x="50%" dy="-0.5em" fontSize="28" fontWeight="bold" fill="hsl(var(--foreground))">
          {completionRate}%
        </tspan>
        <tspan x="50%" dy="1.5em" fontSize="12" fill="hsl(var(--muted-foreground))">
          Tamamlandı
        </tspan>
      </text>);
    };
    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (<div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold">{payload[0].name}</p>
          <p className="text-xs text-muted-foreground">
            {payload[0].value} sertifika ({Math.round((payload[0].value / total) * 100)}%)
          </p>
        </div>);
        }
        return null;
    };
    if (loading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center gap-2">
            <lucide_react_1.Award className="h-5 w-5"/>
            Sertifika Dağılımı
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
          <lucide_react_1.Award className="h-5 w-5"/>
          Sertifika Dağılımı
        </card_1.CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Toplam {total} sertifika
        </p>
      </card_1.CardHeader>
      <card_1.CardContent>
        <recharts_1.ResponsiveContainer width="100%" height={250}>
          <recharts_1.PieChart>
            <recharts_1.Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" animationBegin={0} animationDuration={1000} animationEasing="ease-out">
              {data.map((entry, index) => (<recharts_1.Cell key={`cell-${index}`} fill={entry.color}/>))}
            </recharts_1.Pie>
            <recharts_1.Tooltip content={<CustomTooltip />}/>
            {renderCustomLabel()}
          </recharts_1.PieChart>
        </recharts_1.ResponsiveContainer>

        {/* Stats below chart */}
        <div className="flex justify-around mt-4 border-t pt-4">
          {data.map((item) => (<div key={item.name} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}/>
                <p className="text-xs text-muted-foreground">{item.name}</p>
              </div>
              <p className="text-lg font-bold">{item.value}</p>
            </div>))}
        </div>
      </card_1.CardContent>
      <card_1.CardFooter>
        <button_1.Button asChild size="sm" variant="outline" className="w-full">
          <link_1.default href="/admin/certificates">
            Tümünü Gör <lucide_react_1.ArrowUpRight className="h-4 w-4 ml-2"/>
          </link_1.default>
        </button_1.Button>
      </card_1.CardFooter>
    </card_1.Card>);
}
//# sourceMappingURL=certificates-donut-chart.js.map