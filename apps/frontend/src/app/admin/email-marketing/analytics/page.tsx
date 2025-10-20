'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Mail,
  MousePointer,
  DollarSign,
  Target,
  Trophy,
  TestTube,
  Download,
  RefreshCw,
  Calendar,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import analyticsService, { 
  AnalyticsDashboardData, 
  OverviewMetrics 
} from '@/lib/api/analyticsService';
import { useToast } from '@/hooks/use-toast';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';

// Chart components
import SubscriberGrowthChart from '@/components/admin/analytics/SubscriberGrowthChart';
import EngagementChart from '@/components/admin/analytics/EngagementChart';
import RevenueChart from '@/components/admin/analytics/RevenueChart';
import CampaignPerformanceTable from '@/components/admin/analytics/CampaignPerformanceTable';

export default function AnalyticsPage() {
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState<AnalyticsDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Date range state
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'quarter' | 'year'>('day');

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange, period]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const startDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined;
      const endDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined;
      
      const data = await analyticsService.getDashboardData(startDate, endDate, period);
      setDashboardData(data);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError('Analytics verileri yüklenirken bir hata oluştu.');
      toast({
        title: 'Hata',
        description: 'Analytics verileri yüklenemedi.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
    
    toast({
      title: 'Güncellendi',
      description: 'Analytics verileri başarıyla güncellendi.',
    });
  };

  const handleExport = async (type: 'campaigns' | 'subscribers' | 'engagement' | 'revenue') => {
    try {
      const startDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined;
      const endDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined;
      
      const blob = await analyticsService.exportData(type, 'csv', startDate, endDate);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${type}-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: 'İndirildi',
        description: `${type} verileri başarıyla indirildi.`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Hata',
        description: 'Veri indirme işlemi başarısız.',
        variant: 'destructive',
      });
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('tr-TR').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(num);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/email-marketing">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Email marketing performans analizi</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Analytics yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/email-marketing">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Email marketing performans analizi</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-sm text-red-500">{error || 'Veri yüklenemedi'}</p>
            <Button variant="outline" className="mt-2" onClick={fetchDashboardData}>
              Tekrar Dene
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/email-marketing">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Email marketing performans analizi</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
          <Select value={period} onValueChange={(value: any) => setPeriod(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Günlük</SelectItem>
              <SelectItem value="week">Haftalık</SelectItem>
              <SelectItem value="month">Aylık</SelectItem>
              <SelectItem value="quarter">Çeyreklik</SelectItem>
              <SelectItem value="year">Yıllık</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange
            date={dateRange}
            onDateChange={setDateRange}
          />
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kampanya</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(dashboardData.overview.totalCampaigns)}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.overview.activeCampaigns} aktif kampanya
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Abone</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(dashboardData.overview.totalSubscribers)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(dashboardData.overview.engagementTrend)}
              <span className="ml-1">{formatPercentage(dashboardData.overview.subscriberGrowthRate)} büyüme</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Açılma Oranı</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(dashboardData.overview.averageOpenRate)}</div>
            <p className="text-xs text-muted-foreground">
              Tıklama: {formatPercentage(dashboardData.overview.averageClickRate)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(dashboardData.overview.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.overview.activeAbTests} aktif A/B test
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="campaigns">Kampanyalar</TabsTrigger>
          <TabsTrigger value="subscribers">Aboneler</TabsTrigger>
          <TabsTrigger value="engagement">Etkileşim</TabsTrigger>
          <TabsTrigger value="revenue">Gelir</TabsTrigger>
          <TabsTrigger value="abtests">A/B Testler</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Abone Büyümesi</CardTitle>
                <CardDescription>
                  Son {period === 'day' ? '30 gün' : period === 'week' ? '12 hafta' : '12 ay'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SubscriberGrowthChart data={dashboardData.subscriberGrowth} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Etkileşimi</CardTitle>
                <CardDescription>
                  Açılma ve tıklama oranları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EngagementChart data={dashboardData.emailEngagement} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>En İyi Performans Gösteren Kampanyalar</CardTitle>
                  <CardDescription>
                    Performans skoruna göre sıralanmış
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleExport('campaigns')}>
                  <Download className="h-4 w-4 mr-2" />
                  İndir
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CampaignPerformanceTable campaigns={dashboardData.topCampaigns} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Kampanya Performansı</CardTitle>
                  <CardDescription>
                    Tüm kampanyaların detaylı analizi
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleExport('campaigns')}>
                  <Download className="h-4 w-4 mr-2" />
                  İndir
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CampaignPerformanceTable 
                campaigns={dashboardData.campaignAnalytics.map(c => ({
                  campaignId: c.campaignId,
                  campaignName: c.campaignName,
                  sentAt: c.sentAt,
                  openRate: c.openRate,
                  clickRate: c.clickRate,
                  conversionRate: c.conversionRate,
                  revenue: c.revenue,
                  score: (c.openRate + c.clickRate + c.conversionRate) / 3
                }))} 
                showAllColumns={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Abone Büyüme Analizi</CardTitle>
                  <CardDescription>
                    Abone sayısı değişimleri ve trendler
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleExport('subscribers')}>
                  <Download className="h-4 w-4 mr-2" />
                  İndir
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <SubscriberGrowthChart data={dashboardData.subscriberGrowth} showDetails={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Etkileşim Metrikleri</CardTitle>
                  <CardDescription>
                    Açılma, tıklama ve etkileşim analizi
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleExport('engagement')}>
                  <Download className="h-4 w-4 mr-2" />
                  İndir
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <EngagementChart data={dashboardData.emailEngagement} showDetails={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gelir Analizi</CardTitle>
                  <CardDescription>
                    Email marketing gelir performansı
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleExport('revenue')}>
                  <Download className="h-4 w-4 mr-2" />
                  İndir
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <RevenueChart data={dashboardData.revenueMetrics} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abtests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>A/B Test Özeti</CardTitle>
              <CardDescription>
                Aktif ve tamamlanmış A/B testlerin performansı
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.abTestSummary.length === 0 ? (
                  <div className="text-center py-8">
                    <TestTube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Henüz A/B test bulunamadı</p>
                  </div>
                ) : (
                  dashboardData.abTestSummary.map((test) => (
                    <div key={test.testId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{test.campaignName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {test.testType} testi - {format(new Date(test.createdAt), 'dd MMM yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {test.status === 'completed' && test.improvementPercentage && (
                          <Badge variant="default" className="bg-green-500">
                            <Trophy className="w-3 h-3 mr-1" />
                            +{test.improvementPercentage.toFixed(1)}% iyileşme
                          </Badge>
                        )}
                        <Badge variant={test.status === 'completed' ? 'default' : 'secondary'}>
                          {test.status === 'completed' ? 'Tamamlandı' : 'Aktif'}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}