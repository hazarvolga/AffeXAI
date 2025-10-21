"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberGrowthChart = SubscriberGrowthChart;
const recharts_1 = require("recharts");
const card_1 = require("@/components/ui/card");
const newsletter_data_1 = require("@/lib/newsletter-data");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
// Helper to get last 6 months
const last6Months = Array.from({ length: 6 }, (_, i) => (0, date_fns_1.subMonths)(new Date(), i)).reverse();
// Process data
const monthlyData = last6Months.map(monthDate => {
    const month = (0, date_fns_1.getMonth)(monthDate);
    const year = (0, date_fns_1.getYear)(monthDate);
    const count = newsletter_data_1.subscribers.filter(sub => {
        const subDate = new Date(sub.subscribedAt);
        return (0, date_fns_1.getMonth)(subDate) === month && (0, date_fns_1.getYear)(subDate) === year;
    }).length;
    return {
        name: (0, date_fns_1.format)(monthDate, 'MMM', { locale: locale_1.tr }),
        "Yeni Aboneler": count
    };
});
function SubscriberGrowthChart() {
    return (<card_1.Card>
            <card_1.CardHeader>
                <card_1.CardTitle>Abone Büyüme Grafiği</card_1.CardTitle>
                <card_1.CardDescription>Son 6 aydaki yeni abone kayıtları.</card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
                <recharts_1.ResponsiveContainer width="100%" height={300}>
                    <recharts_1.BarChart data={monthlyData}>
                        <recharts_1.XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                        <recharts_1.YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`}/>
                         <recharts_1.Tooltip cursor={{ fill: "hsl(var(--muted))" }} contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}/>
                        <recharts_1.Bar dataKey="Yeni Aboneler" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}/>
                    </recharts_1.BarChart>
                </recharts_1.ResponsiveContainer>
            </card_1.CardContent>
        </card_1.Card>);
}
//# sourceMappingURL=subscriber-growth-chart.js.map