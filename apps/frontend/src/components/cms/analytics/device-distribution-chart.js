"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceDistributionChart = DeviceDistributionChart;
const card_1 = require("@/components/ui/card");
const recharts_1 = require("recharts");
const lucide_react_1 = require("lucide-react");
const COLORS = {
    mobile: 'hsl(var(--chart-1))',
    tablet: 'hsl(var(--chart-2))',
    desktop: 'hsl(var(--chart-3))',
};
const DEVICE_ICONS = {
    mobile: lucide_react_1.Smartphone,
    tablet: lucide_react_1.Tablet,
    desktop: lucide_react_1.Monitor,
};
const DEVICE_LABELS = {
    mobile: 'Mobil',
    tablet: 'Tablet',
    desktop: 'Masaüstü',
};
function DeviceDistributionChart({ distribution, isLoading }) {
    if (isLoading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>
            <div className="h-6 w-40 bg-muted animate-pulse rounded"/>
          </card_1.CardTitle>
          <card_1.CardDescription>
            <div className="h-4 w-56 bg-muted animate-pulse rounded mt-2"/>
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="h-[300px] bg-muted animate-pulse rounded"/>
        </card_1.CardContent>
      </card_1.Card>);
    }
    const total = Object.values(distribution).reduce((sum, val) => sum + val, 0);
    const chartData = Object.entries(distribution).map(([device, value]) => ({
        name: DEVICE_LABELS[device],
        value,
        percentage: total > 0 ? ((value / total) * 100).toFixed(1) : '0.0',
        device: device,
    }));
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle>Cihaz Dağılımı</card_1.CardTitle>
        <card_1.CardDescription>
          Kullanıcıların cihaz tiplerine göre dağılımı
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        <div className="flex flex-col gap-4">
          <recharts_1.ResponsiveContainer width="100%" height={250}>
            <recharts_1.PieChart>
              <recharts_1.Pie data={chartData} cx="50%" cy="50%" labelLine={false} label={({ percentage }) => `${percentage}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                {chartData.map((entry) => (<recharts_1.Cell key={entry.name} fill={COLORS[entry.device]}/>))}
              </recharts_1.Pie>
              <recharts_1.Tooltip contentStyle={{
            backgroundColor: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
        }}/>
            </recharts_1.PieChart>
          </recharts_1.ResponsiveContainer>

          <div className="space-y-2">
            {chartData.map((item) => {
            const Icon = DEVICE_ICONS[item.device];
            return (<div key={item.device} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[item.device] }}/>
                    <Icon className="h-4 w-4 text-muted-foreground"/>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {item.value.toLocaleString('tr-TR')}
                    </span>
                    <span className="text-sm font-medium w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>);
        })}
          </div>
        </div>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=device-distribution-chart.js.map