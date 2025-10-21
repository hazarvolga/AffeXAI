"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TrackingStats;
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
function TrackingStats({ stats, loading = false }) {
    if (loading) {
        return (<card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Email Tracking</card_1.CardTitle>
          <card_1.CardDescription>Gerçek zamanlı açılma ve tıklama verileri</card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </card_1.CardContent>
      </card_1.Card>);
    }
    const formatPercentage = (num) => `${num.toFixed(2)}%`;
    const formatNumber = (num) => num.toLocaleString();
    const getDeviceIcon = (device) => {
        switch (device.toLowerCase()) {
            case 'mobile':
                return <lucide_react_1.Smartphone className="h-4 w-4"/>;
            case 'tablet':
                return <lucide_react_1.Tablet className="h-4 w-4"/>;
            default:
                return <lucide_react_1.Monitor className="h-4 w-4"/>;
        }
    };
    return (<card_1.Card>
      <card_1.CardHeader>
        <card_1.CardTitle className="flex items-center gap-2">
          <lucide_react_1.Eye className="h-5 w-5"/>
          Email Tracking
        </card_1.CardTitle>
        <card_1.CardDescription>
          Gerçek zamanlı açılma ve tıklama verileri
        </card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        <tabs_1.Tabs defaultValue="overview" className="space-y-4">
          <tabs_1.TabsList>
            <tabs_1.TabsTrigger value="overview">Genel Bakış</tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="opens">Açılmalar</tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="clicks">Tıklamalar</tabs_1.TabsTrigger>
          </tabs_1.TabsList>

          <tabs_1.TabsContent value="overview" className="space-y-4">
            {/* Overview Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <card_1.Card>
                <card_1.CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <lucide_react_1.Mail className="h-4 w-4 text-blue-500"/>
                    <span className="text-sm font-medium">Gönderilen</span>
                  </div>
                  <p className="text-2xl font-bold">{formatNumber(stats.totalSent)}</p>
                </card_1.CardContent>
              </card_1.Card>

              <card_1.Card>
                <card_1.CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <lucide_react_1.Eye className="h-4 w-4 text-green-500"/>
                    <span className="text-sm font-medium">Açılan</span>
                  </div>
                  <p className="text-2xl font-bold">{formatNumber(stats.totalOpened)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPercentage(stats.openRate)}
                  </p>
                </card_1.CardContent>
              </card_1.Card>

              <card_1.Card>
                <card_1.CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <lucide_react_1.MousePointer className="h-4 w-4 text-purple-500"/>
                    <span className="text-sm font-medium">Tıklanan</span>
                  </div>
                  <p className="text-2xl font-bold">{formatNumber(stats.totalClicked)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPercentage(stats.clickRate)}
                  </p>
                </card_1.CardContent>
              </card_1.Card>

              <card_1.Card>
                <card_1.CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <lucide_react_1.TrendingUp className="h-4 w-4 text-orange-500"/>
                    <span className="text-sm font-medium">CTR</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {stats.totalOpened > 0
            ? formatPercentage((stats.totalClicked / stats.totalOpened) * 100)
            : '0.00%'}
                  </p>
                  <p className="text-xs text-muted-foreground">Click-through rate</p>
                </card_1.CardContent>
              </card_1.Card>
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <card_1.Card>
                <card_1.CardHeader>
                  <card_1.CardTitle className="text-lg">Performans</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Açılma Oranı</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(stats.openRate, 100)}%` }}/>
                      </div>
                      <span className="text-sm font-medium">{formatPercentage(stats.openRate)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tıklama Oranı</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(stats.clickRate * 5, 100)}%` }}/>
                      </div>
                      <span className="text-sm font-medium">{formatPercentage(stats.clickRate)}</span>
                    </div>
                  </div>
                </card_1.CardContent>
              </card_1.Card>

              <card_1.Card>
                <card_1.CardHeader>
                  <card_1.CardTitle className="text-lg">Etkileşim</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Benzersiz Açılma</span>
                    <badge_1.Badge variant="secondary">{formatNumber(stats.uniqueOpens)}</badge_1.Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Benzersiz Tıklama</span>
                    <badge_1.Badge variant="secondary">{formatNumber(stats.uniqueClicks)}</badge_1.Badge>
                  </div>
                </card_1.CardContent>
              </card_1.Card>
            </div>
          </tabs_1.TabsContent>

          <tabs_1.TabsContent value="opens" className="space-y-4">
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="text-lg">Son Açılmalar</card_1.CardTitle>
                <card_1.CardDescription>
                  En son email açan kullanıcılar
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                {stats.recentOpens.length === 0 ? (<div className="text-center py-8 text-muted-foreground">
                    <lucide_react_1.Eye className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                    <p>Henüz açılma kaydı yok</p>
                  </div>) : (<div className="space-y-3">
                    {stats.recentOpens.map((open, index) => (<div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <lucide_react_1.Eye className="h-4 w-4 text-green-600"/>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{open.recipientEmail}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(open.openedAt).toLocaleString('tr-TR')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(open.userAgent || 'desktop')}
                          <span className="text-xs text-muted-foreground">
                            {open.ipAddress || 'Unknown IP'}
                          </span>
                        </div>
                      </div>))}
                  </div>)}
              </card_1.CardContent>
            </card_1.Card>
          </tabs_1.TabsContent>

          <tabs_1.TabsContent value="clicks" className="space-y-4">
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="text-lg">Son Tıklamalar</card_1.CardTitle>
                <card_1.CardDescription>
                  En son link tıklayan kullanıcılar
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                {stats.recentClicks.length === 0 ? (<div className="text-center py-8 text-muted-foreground">
                    <lucide_react_1.MousePointer className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                    <p>Henüz tıklama kaydı yok</p>
                  </div>) : (<div className="space-y-3">
                    {stats.recentClicks.map((click, index) => (<div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <lucide_react_1.MousePointer className="h-4 w-4 text-purple-600"/>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{click.recipientEmail}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(click.clickedAt).toLocaleString('tr-TR')}
                            </p>
                            {click.originalUrl && (<p className="text-xs text-blue-600 truncate max-w-48">
                                {click.originalUrl}
                              </p>)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(click.userAgent || 'desktop')}
                          <span className="text-xs text-muted-foreground">
                            {click.ipAddress || 'Unknown IP'}
                          </span>
                        </div>
                      </div>))}
                  </div>)}
              </card_1.CardContent>
            </card_1.Card>
          </tabs_1.TabsContent>
        </tabs_1.Tabs>
      </card_1.CardContent>
    </card_1.Card>);
}
//# sourceMappingURL=TrackingStats.js.map