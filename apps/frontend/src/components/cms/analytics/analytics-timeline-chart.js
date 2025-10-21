"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsTimelineChart = AnalyticsTimelineChart;
const card_1 = require("@/components/ui/card");
const recharts_1 = require("recharts");
function AnalyticsTimelineChart({ data, isLoading }) {
    if (isLoading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>
            <div className="h-6 w-48 bg-muted animate-pulse rounded"/>
          </card_1.CardTitle>
          <card_1.CardDescription>
            <div className="h-4 w-64 bg-muted animate-pulse rounded mt-2"/>
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="h-[350px] bg-muted animate-pulse rounded"/>
        </card_1.CardContent>
      </card_1.Card>);
    }
    // Format data for chart
    const chartData = data.map((point) => ({
        date: new Date(point.timestamp).toLocaleDateString('tr-TR', {
            month: 'short',
            day: 'numeric',
        }),
        görüntülenme: point.views,
        etkileşim: point.interactions,
        dönüşüm: point.conversions,
    }));
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Etkileşim Trendi</card_1.CardTitle>
        <card_1.CardDescription>
          Zaman içindeki görüntülenme, etkileşim ve dönüşüm verileri
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        <recharts_1.ResponsiveContainer width="100%" height={350}>
          <recharts_1.LineChart data={chartData}>
            <recharts_1.CartesianGrid strokeDasharray="3 3" className="stroke-muted"/>
            <recharts_1.XAxis dataKey="date" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }}/>
            <recharts_1.YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }}/>
            <recharts_1.Tooltip contentStyle={{
            backgroundColor: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
        }} labelStyle={{ color: 'hsl(var(--popover-foreground))' }}/>
            <recharts_1.Legend />
            <recharts_1.Line type="monotone" dataKey="görüntülenme" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
            <recharts_1.Line type="monotone" dataKey="etkileşim" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
            <recharts_1.Line type="monotone" dataKey="dönüşüm" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
          </recharts_1.LineChart>
        </recharts_1.ResponsiveContainer>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=analytics-timeline-chart.js.map