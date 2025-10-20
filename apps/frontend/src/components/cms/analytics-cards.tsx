'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, MousePointer, Edit, FileCheck, TrendingUp, Activity } from 'lucide-react';
import { cmsMetricsService, type CMSMetrics } from '@/lib/api/cmsMetricsService';
import { Skeleton } from '@/components/ui/skeleton';

type Period = 'day' | 'week' | 'month';

export function AnalyticsCards() {
  const [metrics, setMetrics] = useState<CMSMetrics | null>(null);
  const [period, setPeriod] = useState<Period>('week');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMetrics();
  }, [period]);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cmsMetricsService.getMetrics(period);
      setMetrics(data);
    } catch (err) {
      setError('Metrikler yüklenemedi');
      console.error('Analytics load error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <Card className="bg-destructive/10">
        <CardContent className="pt-6">
          <p className="text-sm text-destructive">{error || 'Veri yüklenemedi'}</p>
        </CardContent>
      </Card>
    );
  }

  const statsCards = [
    {
      title: 'Toplam Görüntülenme',
      value: metrics.summary.totalViews.toLocaleString(),
      description: 'Benzersiz ziyaretçi',
      subValue: metrics.summary.uniqueVisitors.toLocaleString(),
      icon: Eye,
      iconColor: 'text-blue-500',
    },
    {
      title: 'Link Tıklamaları',
      value: metrics.summary.totalClicks.toLocaleString(),
      description: 'Benzersiz linkler',
      subValue: metrics.summary.uniqueLinks.toLocaleString(),
      icon: MousePointer,
      iconColor: 'text-green-500',
    },
    {
      title: 'Düzenleme',
      value: metrics.summary.edits.toLocaleString(),
      description: 'Sayfa düzenlemeleri',
      subValue: `${metrics.summary.edits} işlem`,
      icon: Edit,
      iconColor: 'text-orange-500',
    },
    {
      title: 'Yayınlama',
      value: metrics.summary.publishes.toLocaleString(),
      description: 'Yayınlanan sayfalar',
      subValue: `${metrics.summary.publishes} sayfa`,
      icon: FileCheck,
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">İçerik Analitiği</h2>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <TabsList>
            <TabsTrigger value="day">Bugün</TabsTrigger>
            <TabsTrigger value="week">Bu Hafta</TabsTrigger>
            <TabsTrigger value="month">Bu Ay</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.iconColor}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}: {stat.subValue}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Tables */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              En Çok Görüntülenen Sayfalar
            </CardTitle>
            <CardDescription>En popüler içerikler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.topPages.length === 0 ? (
                <p className="text-sm text-muted-foreground">Henüz veri yok</p>
              ) : (
                metrics.topPages.slice(0, 5).map((page, index) => (
                  <div key={page.pageId} className="flex items-center justify-between">
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
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              En Çok Tıklanan Linkler
            </CardTitle>
            <CardDescription>Kullanıcı etkileşimleri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.topLinks.length === 0 ? (
                <p className="text-sm text-muted-foreground">Henüz veri yok</p>
              ) : (
                metrics.topLinks.slice(0, 5).map((link, index) => (
                  <div key={link.linkUrl} className="flex items-center justify-between">
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
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Engagement */}
      <Card>
        <CardHeader>
          <CardTitle>Kategori Performansı</CardTitle>
          <CardDescription>Kategorilere göre kullanıcı etkileşimi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.categoryEngagement.length === 0 ? (
              <p className="text-sm text-muted-foreground">Henüz veri yok</p>
            ) : (
              metrics.categoryEngagement.map((cat) => {
                const totalInteractions = cat.views + cat.clicks;
                const viewPercentage = totalInteractions > 0 ? (cat.views / totalInteractions) * 100 : 0;

                return (
                  <div key={cat.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{cat.category}</p>
                      <p className="text-sm text-muted-foreground">
                        {cat.views} görüntülenme · {cat.clicks} tıklama
                      </p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${viewPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
