"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignPerformanceChart = CampaignPerformanceChart;
const react_1 = require("react");
const recharts_1 = require("recharts");
const card_1 = require("@/components/ui/card");
const emailCampaignsService_1 = __importDefault(require("@/lib/api/emailCampaignsService"));
function CampaignPerformanceChart() {
    const [chartData, setChartData] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const campaigns = await emailCampaignsService_1.default.getAllCampaigns();
                const data = campaigns
                    .filter((c) => c.status === 'sent')
                    .slice(0, 5) // Get last 5 sent campaigns
                    .map((c) => {
                    // Calculate rates
                    const openRate = c.totalRecipients > 0 ? Math.round((c.openedCount / c.totalRecipients) * 100) : 0;
                    const clickRate = c.totalRecipients > 0 ? Math.round((c.clickedCount / c.totalRecipients) * 100) : 0;
                    return {
                        name: c.name.substring(0, 15) + (c.name.length > 15 ? '...' : ''), // Shorten name for chart
                        "Açılma Oranı (%)": openRate,
                        "Tıklanma Oranı (%)": clickRate,
                    };
                }).reverse(); // Reverse to show oldest first
                setChartData(data);
            }
            catch (error) {
                console.error('Error fetching campaign data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return (<card_1.Card>
                <card_1.CardHeader>
                    <card_1.CardTitle>Kampanya Performansı</card_1.CardTitle>
                    <card_1.CardDescription>Son gönderilen kampanyaların açılma ve tıklanma oranları.</card_1.CardDescription>
                </card_1.CardHeader>
                <card_1.CardContent>
                    <div className="flex items-center justify-center h-[300px]">
                        <div className="text-muted-foreground">Veriler yükleniyor...</div>
                    </div>
                </card_1.CardContent>
            </card_1.Card>);
    }
    return (<card_1.Card>
            <card_1.CardHeader>
                <card_1.CardTitle>Kampanya Performansı</card_1.CardTitle>
                <card_1.CardDescription>Son gönderilen kampanyaların açılma ve tıklanma oranları.</card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
                <recharts_1.ResponsiveContainer width="100%" height={300}>
                    <recharts_1.BarChart data={chartData}>
                        <recharts_1.XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                        <recharts_1.YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`}/>
                        <recharts_1.Tooltip cursor={{ fill: "hsl(var(--muted))" }} contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}/>
                        <recharts_1.Legend />
                        <recharts_1.Bar dataKey="Açılma Oranı (%)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}/>
                        <recharts_1.Bar dataKey="Tıklanma Oranı (%)" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]}/>
                    </recharts_1.BarChart>
                </recharts_1.ResponsiveContainer>
            </card_1.CardContent>
        </card_1.Card>);
}
//# sourceMappingURL=campaign-performance-chart.js.map