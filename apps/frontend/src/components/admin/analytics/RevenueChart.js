"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RevenueChart;
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
function RevenueChart({ data }) {
    if (!data || data.length === 0) {
        return (<div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <lucide_react_1.DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50"/>
          <p>Gelir verisi bulunamadı</p>
        </div>
      </div>);
    }
    const latestData = data[data.length - 1];
    const previousData = data[data.length - 2];
    const revenueTrend = latestData && previousData
        ? latestData.revenue > previousData.revenue
        : true;
    const formatCurrency = (num) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
        }).format(num);
    };
    const formatNumber = (num) => {
        return new Intl.NumberFormat('tr-TR').format(num);
    };
    const formatPercentage = (num) => {
        return `${num.toFixed(2)}%`;
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
            <lucide_react_1.DollarSign className="h-4 w-4 text-green-500"/>
            <span className="text-sm font-medium">Toplam Gelir</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(latestData?.revenue || 0)}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {revenueTrend ? (<lucide_react_1.TrendingUp className="h-3 w-3 text-green-500"/>) : (<lucide_react_1.TrendingDown className="h-3 w-3 text-red-500"/>)}
            <span>Son dönem</span>
          </div>
        </card_1.Card>

        <card_1.Card className="p-4">
          <div className="flex items-center gap-2">
            <lucide_react_1.Target className="h-4 w-4 text-blue-500"/>
            <span className="text-sm font-medium">Dönüşümler</span>
          </div>
          <p className="text-2xl font-bold">{formatNumber(latestData?.conversions || 0)}</p>
          <p className="text-xs text-muted-foreground">
            {formatPercentage(latestData?.conversionRate || 0)} oran
          </p>
        </card_1.Card>

        <card_1.Card className="p-4">
          <div className="flex items-center gap-2">
            <lucide_react_1.DollarSign className="h-4 w-4 text-purple-500"/>
            <span className="text-sm font-medium">Ort. Sipariş</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(latestData?.averageOrderValue || 0)}</p>
          <p className="text-xs text-muted-foreground">
            Email başına: {formatCurrency(latestData?.revenuePerEmail || 0)}
          </p>
        </card_1.Card>
      </div>

      {/* Revenue Chart */}
      <div className="h-64 border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Gelir Trendi</h4>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Gelir</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Dönüşüm</span>
            </div>
          </div>
        </div>

        {/* Simple bar chart representation */}
        <div className="space-y-4">
          {data.slice(-7).map((item, index) => {
            const maxRevenue = Math.max(...data.map(d => d.revenue));
            const maxConversions = Math.max(...data.map(d => d.conversions));
            const revenueWidth = (item.revenue / maxRevenue) * 100;
            const conversionWidth = (item.conversions / maxConversions) * 100;
            return (<div key={item.date} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{formatDate(item.date)}</span>
                  <span className="font-medium">{formatCurrency(item.revenue)}</span>
                </div>
                
                {/* Revenue Bar */}
                <div className="flex items-center gap-2">
                  <lucide_react_1.DollarSign className="h-3 w-3 text-green-500"/>
                  <div className="flex-1 bg-muted rounded-full h-3">
                    <div className="bg-green-500 rounded-full h-3 transition-all duration-300" style={{ width: `${revenueWidth}%` }}/>
                  </div>
                </div>
                
                {/* Conversion Bar */}
                <div className="flex items-center gap-2">
                  <lucide_react_1.Target className="h-3 w-3 text-blue-500"/>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2 transition-all duration-300" style={{ width: `${conversionWidth}%` }}/>
                  </div>
                  <span className="text-xs font-medium">
                    {formatNumber(item.conversions)}
                  </span>
                </div>
              </div>);
        })}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=RevenueChart.js.map