"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsOverviewCards = AnalyticsOverviewCards;
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
function AnalyticsOverviewCards({ metrics, isLoading }) {
    if (isLoading) {
        return (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (<card_1.Card key={i}>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium">
                <div className="h-4 w-24 bg-muted animate-pulse rounded"/>
              </card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="h-8 w-32 bg-muted animate-pulse rounded mb-2"/>
              <div className="h-3 w-20 bg-muted animate-pulse rounded"/>
            </card_1.CardContent>
          </card_1.Card>))}
      </div>);
    }
    const cards = [
        {
            title: 'Toplam Görüntülenme',
            value: metrics.totalViews.toLocaleString('tr-TR'),
            change: metrics.changeFromPrevious.views,
            icon: lucide_react_1.Eye,
            description: 'Sayfa görüntülenmeleri',
        },
        {
            title: 'Toplam Etkileşim',
            value: metrics.totalInteractions.toLocaleString('tr-TR'),
            change: metrics.changeFromPrevious.interactions,
            icon: lucide_react_1.MousePointer,
            description: 'Tıklama, hover, scroll vb.',
        },
        {
            title: 'Ortalama Etkileşim Süresi',
            value: `${Math.round(metrics.averageEngagementTime / 1000)}s`,
            change: metrics.changeFromPrevious.engagementTime,
            icon: lucide_react_1.Clock,
            description: 'Kullanıcı etkileşim süresi',
        },
        {
            title: 'Dönüşüm Oranı',
            value: `${metrics.conversionRate.toFixed(2)}%`,
            change: metrics.changeFromPrevious.conversionRate,
            icon: lucide_react_1.TrendingUp,
            description: 'Hedef dönüşüm oranı',
        },
    ];
    const getTrendIcon = (change) => {
        if (change > 0)
            return lucide_react_1.TrendingUp;
        if (change < 0)
            return lucide_react_1.TrendingDown;
        return lucide_react_1.Minus;
    };
    const getTrendColor = (change) => {
        if (change > 0)
            return 'text-green-600 dark:text-green-400';
        if (change < 0)
            return 'text-red-600 dark:text-red-400';
        return 'text-muted-foreground';
    };
    const formatChange = (change) => {
        const sign = change > 0 ? '+' : '';
        return `${sign}${change.toFixed(1)}%`;
    };
    return (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
            const Icon = card.icon;
            const TrendIcon = getTrendIcon(card.change);
            const trendColor = getTrendColor(card.change);
            return (<card_1.Card key={card.title}>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <card_1.CardTitle className="text-sm font-medium">{card.title}</card_1.CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendIcon className={`h-3 w-3 ${trendColor}`}/>
                <p className={`text-xs ${trendColor}`}>
                  {formatChange(card.change)}
                </p>
                <p className="text-xs text-muted-foreground ml-1">
                  önceki döneme göre
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </card_1.CardContent>
          </card_1.Card>);
        })}
    </div>);
}
//# sourceMappingURL=analytics-overview-cards.js.map