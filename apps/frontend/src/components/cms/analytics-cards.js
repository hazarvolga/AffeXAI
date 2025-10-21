"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsCards = AnalyticsCards;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const cmsMetricsService_1 = require("@/lib/api/cmsMetricsService");
const skeleton_1 = require("@/components/ui/skeleton");
function AnalyticsCards() {
    const [metrics, setMetrics] = (0, react_1.useState)(null);
    const [period, setPeriod] = (0, react_1.useState)('week');
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        loadMetrics();
    }, [period]);
    const loadMetrics = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await cmsMetricsService_1.cmsMetricsService.getMetrics(period);
            setMetrics(data);
        }
        catch (err) {
            setError('Metrikler yüklenemedi');
            console.error('Analytics load error:', err);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (<card_1.Card key={i}>
            <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <skeleton_1.Skeleton className="h-4 w-24"/>
              <skeleton_1.Skeleton className="h-4 w-4"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <skeleton_1.Skeleton className="h-8 w-16 mb-2"/>
              <skeleton_1.Skeleton className="h-3 w-32"/>
            </card_1.CardContent>
          </card_1.Card>))}
      </div>);
    }
    if (error || !metrics) {
        return (<card_1.Card className="bg-destructive/10">
        <card_1.CardContent className="pt-6">
          <p className="text-sm text-destructive">{error || 'Veri yüklenemedi'}</p>
        </card_1.CardContent>
      </card_1.Card>);
    }
    const statsCards = [
        {
            title: 'Toplam Görüntülenme',
            value: metrics.summary.totalViews.toLocaleString(),
            description: 'Benzersiz ziyaretçi',
            subValue: metrics.summary.uniqueVisitors.toLocaleString(),
            icon: lucide_react_1.Eye,
            iconColor: 'text-blue-500',
        },
        {
            title: 'Link Tıklamaları',
            value: metrics.summary.totalClicks.toLocaleString(),
            description: 'Benzersiz linkler',
            subValue: metrics.summary.uniqueLinks.toLocaleString(),
            icon: lucide_react_1.MousePointer,
            iconColor: 'text-green-500',
        },
        {
            title: 'Düzenleme',
            value: metrics.summary.edits.toLocaleString(),
            description: 'Sayfa düzenlemeleri',
            subValue: `${metrics.summary.edits} işlem`,
            icon: lucide_react_1.Edit,
            iconColor: 'text-orange-500',
        },
        {
            title: 'Yayınlama',
            value: metrics.summary.publishes.toLocaleString(),
            description: 'Yayınlanan sayfalar',
            subValue: `${metrics.summary.publishes} sayfa`,
            icon: lucide_react_1.FileCheck,
            iconColor: 'text-purple-500',
        },
    ];
    return (<div className="space-y-6">
      {/* Period Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">İçerik Analitiği</h2>
        <tabs_1.Tabs value={period} onValueChange={(v) => setPeriod(v)}>
          <tabs_1.TabsList>
            <tabs_1.TabsTrigger value="day">Bugün</tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="week">Bu Hafta</tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="month">Bu Ay</tabs_1.TabsTrigger>
          </tabs_1.TabsList>
        </tabs_1.Tabs>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (<card_1.Card key={stat.title}>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">{stat.title}</card_1.CardTitle>
                <Icon className={`h-4 w-4 ${stat.iconColor}`}/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}: {stat.subValue}
                </p>
              </card_1.CardContent>
            </card_1.Card>);
        })}
      </div>

      {/* Detailed Tables */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Pages */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center gap-2">
              <lucide_react_1.TrendingUp className="h-5 w-5"/>
              En Çok Görüntülenen Sayfalar
            </card_1.CardTitle>
            <card_1.CardDescription>En popüler içerikler</card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="space-y-4">
              {metrics.topPages.length === 0 ? (<p className="text-sm text-muted-foreground">Henüz veri yok</p>) : (metrics.topPages.slice(0, 5).map((page, index) => (<div key={page.pageId} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">{page.pageTitle}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {page.uniqueVisitors} benzersiz ziyaretçi
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{page.viewCount}</p>
                      <p className="text-xs text-muted-foreground">görüntülenme</p>
                    </div>
                  </div>)))}
            </div>
          </card_1.CardContent>
        </card_1.Card>

        {/* Top Links */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center gap-2">
              <lucide_react_1.Activity className="h-5 w-5"/>
              En Çok Tıklanan Linkler
            </card_1.CardTitle>
            <card_1.CardDescription>Kullanıcı etkileşimleri</card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="space-y-4">
              {metrics.topLinks.length === 0 ? (<p className="text-sm text-muted-foreground">Henüz veri yok</p>) : (metrics.topLinks.slice(0, 5).map((link, index) => (<div key={link.linkUrl} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="max-w-[200px]">
                        <p className="text-sm font-medium leading-none truncate">{link.linkText || link.linkUrl}</p>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{link.linkUrl}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{link.clickCount}</p>
                      <p className="text-xs text-muted-foreground">tıklama</p>
                    </div>
                  </div>)))}
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Category Engagement */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Kategori Performansı</card_1.CardTitle>
          <card_1.CardDescription>Kategorilere göre kullanıcı etkileşimi</card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="space-y-3">
            {metrics.categoryEngagement.length === 0 ? (<p className="text-sm text-muted-foreground">Henüz veri yok</p>) : (metrics.categoryEngagement.map((cat) => {
            const totalInteractions = cat.views + cat.clicks;
            const viewPercentage = totalInteractions > 0 ? (cat.views / totalInteractions) * 100 : 0;
            return (<div key={cat.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{cat.category}</p>
                      <p className="text-sm text-muted-foreground">
                        {cat.views} görüntülenme · {cat.clicks} tıklama
                      </p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${viewPercentage}%` }}/>
                    </div>
                  </div>);
        }))}
          </div>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=analytics-cards.js.map