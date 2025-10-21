"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubscriberGrowthChart;
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
function SubscriberGrowthChart({ data, showDetails = false }) {
    if (!data || data.length === 0) {
        return (<div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <lucide_react_1.Users className="h-12 w-12 mx-auto mb-4 opacity-50"/>
          <p>Abone büyüme verisi bulunamadı</p>
        </div>
      </div>);
    }
    const latestData = data[data.length - 1];
    const previousData = data[data.length - 2];
    const growthTrend = latestData && previousData
        ? latestData.totalSubscribers > previousData.totalSubscribers
        : true;
    const formatNumber = (num) => {
        return new Intl.NumberFormat('tr-TR').format(num);
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            month: 'short',
            day: 'numeric',
        });
    };
    return (<div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <card_1.Card className="p-4">
          <div className="flex items-center gap-2">
            <lucide_react_1.Users className="h-4 w-4 text-blue-500"/>
            <span className="text-sm font-medium">Toplam</span>
          </div>
          <p className="text-2xl font-bold">{formatNumber(latestData?.totalSubscribers || 0)}</p>
        </card_1.Card>

        <card_1.Card className="p-4">
          <div className="flex items-center gap-2">
            <lucide_react_1.UserPlus className="h-4 w-4 text-green-500"/>
            <span className="text-sm font-medium">Yeni</span>
          </div>
          <p className="text-2xl font-bold">{formatNumber(latestData?.newSubscribers || 0)}</p>
        </card_1.Card>

        <card_1.Card className="p-4">
          <div className="flex items-center gap-2">
            <lucide_react_1.UserMinus className="h-4 w-4 text-red-500"/>
            <span className="text-sm font-medium">Ayrılan</span>
          </div>
          <p className="text-2xl font-bold">{formatNumber(latestData?.unsubscribes || 0)}</p>
        </card_1.Card>
      </div>

      {/* Simple Chart Visualization */}
      <div className="h-64 border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Abone Büyümesi</h4>
          <div className="flex items-center gap-2 text-sm">
            {growthTrend ? (<lucide_react_1.TrendingUp className="h-4 w-4 text-green-500"/>) : (<lucide_react_1.TrendingDown className="h-4 w-4 text-red-500"/>)}
            <span className={growthTrend ? 'text-green-500' : 'text-red-500'}>
              {latestData?.growthRate.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Simple bar chart representation */}
        <div className="space-y-2">
          {data.slice(-7).map((item, index) => {
            const maxValue = Math.max(...data.map(d => d.totalSubscribers));
            const width = (item.totalSubscribers / maxValue) * 100;
            return (<div key={item.date} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-16">
                  {formatDate(item.date)}
                </span>
                <div className="flex-1 bg-muted rounded-full h-4 relative">
                  <div className="bg-primary rounded-full h-4 transition-all duration-300" style={{ width: `${width}%` }}/>
                </div>
                <span className="text-xs font-medium w-16 text-right">
                  {formatNumber(item.totalSubscribers)}
                </span>
              </div>);
        })}
        </div>
      </div>

      {showDetails && (<div className="grid grid-cols-2 gap-4">
          <card_1.Card className="p-4">
            <h4 className="font-medium mb-2">Net Büyüme</h4>
            <p className="text-2xl font-bold">{formatNumber(latestData?.netGrowth || 0)}</p>
            <p className="text-sm text-muted-foreground">Son dönem</p>
          </card_1.Card>

          <card_1.Card className="p-4">
            <h4 className="font-medium mb-2">Büyüme Oranı</h4>
            <p className="text-2xl font-bold">{latestData?.growthRate.toFixed(2)}%</p>
            <p className="text-sm text-muted-foreground">Aylık ortalama</p>
          </card_1.Card>
        </div>)}
    </div>);
}
//# sourceMappingURL=SubscriberGrowthChart.js.map