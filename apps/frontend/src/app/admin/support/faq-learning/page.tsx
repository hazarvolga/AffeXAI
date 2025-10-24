'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Brain,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Play,
  Pause,
  RefreshCw,
  BarChart3,
  Users,
  MessageSquare,
  Zap
} from 'lucide-react';

interface DashboardStats {
  totalFaqs: number;
  newFaqsToday: number;
  pendingReview: number;
  averageConfidence: number;
  processingStatus: 'running' | 'stopped' | 'error';
  lastRun?: Date;
  nextRun?: Date;
}

interface ProviderStatus {
  name: string;
  available: boolean;
  responseTime?: number;
  lastChecked: Date;
}

interface RecentActivity {
  id: string;
  type: 'faq_generated' | 'review_completed' | 'feedback_received';
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error';
}

interface LearningProgress {
  fromChat: number;
  fromTickets: number;
  fromSuggestions: number;
}

interface QualityMetrics {
  highConfidence: number;
  mediumConfidence: number;
  lowConfidence: number;
}

export default function FaqLearningDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalFaqs: 0,
    newFaqsToday: 0,
    pendingReview: 0,
    averageConfidence: 0,
    processingStatus: 'stopped'
  });

  const [learningProgress, setLearningProgress] = useState<LearningProgress>({
    fromChat: 0,
    fromTickets: 0,
    fromSuggestions: 0
  });

  const [qualityMetrics, setQualityMetrics] = useState<QualityMetrics>({
    highConfidence: 0,
    mediumConfidence: 0,
    lowConfidence: 0
  });

  const [providers, setProviders] = useState<ProviderStatus[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      console.log('📊 Loading dashboard data...');
      const { FaqLearningService } = await import('@/services/faq-learning.service');
      const data = await FaqLearningService.getDashboardStats();

      console.log('📊 Dashboard data received:', data);
      console.log('📊 Data type:', typeof data);
      console.log('📊 Data keys:', data ? Object.keys(data) : 'null');
      console.log('📊 Stats:', data?.stats);
      console.log('📊 Learning Progress:', data?.learningProgress);

      // Ensure data structure is correct
      if (!data) {
        throw new Error('No data received from API');
      }

      if (!data.stats) {
        console.error('📊 Missing stats in data. Full data:', JSON.stringify(data, null, 2));
        throw new Error('Invalid dashboard data structure - missing stats');
      }

      setStats(data.stats);
      setLearningProgress(data.learningProgress || { fromChat: 0, fromTickets: 0, fromSuggestions: 0 });
      setQualityMetrics(data.qualityMetrics || { highConfidence: 0, mediumConfidence: 0, lowConfidence: 0 });
      setProviders(data.providers || []);
      setRecentActivity(data.recentActivity || []);
      setIsLoading(false);
    } catch (error) {
      console.error('❌ Dashboard verisi yüklenemedi:', error);
      console.error('❌ Error details:', error instanceof Error ? error.message : 'Unknown error');
      // Fallback to empty data on error
      setStats({
        totalFaqs: 0,
        newFaqsToday: 0,
        pendingReview: 0,
        averageConfidence: 0,
        processingStatus: 'stopped'
      });
      setLearningProgress({
        fromChat: 0,
        fromTickets: 0,
        fromSuggestions: 0
      });
      setQualityMetrics({
        highConfidence: 0,
        mediumConfidence: 0,
        lowConfidence: 0
      });
      setProviders([]);
      setRecentActivity([]);
      setIsLoading(false);
    }
  };

  const startLearningPipeline = async () => {
    try {
      const { FaqLearningService } = await import('@/services/faq-learning.service');
      const result = await FaqLearningService.startPipeline();

      if (result.success) {
        console.log('Learning pipeline başlatıldı:', result.message);
        // Refresh dashboard data
        await loadDashboardData();
      }
    } catch (error) {
      console.error('Pipeline başlatılamadı:', error);
    }
  };

  const stopLearningPipeline = async () => {
    try {
      const { FaqLearningService } = await import('@/services/faq-learning.service');
      const result = await FaqLearningService.stopPipeline();

      if (result.success) {
        console.log('Learning pipeline durduruldu:', result.message);
        // Refresh dashboard data
        await loadDashboardData();
      }
    } catch (error) {
      console.error('Pipeline durdurulamadı:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-600';
      case 'stopped': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="h-4 w-4" />;
      case 'stopped': return <Pause className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Dashboard yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">FAQ Öğrenme Sistemi</h1>
          <p className="text-muted-foreground">
            AI destekli otomatik FAQ oluşturma ve yönetim sistemi
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadDashboardData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Yenile
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Ayarlar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam FAQ</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFaqs}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newFaqsToday} bugün eklendi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İnceleme Bekleyen</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReview}</div>
            <p className="text-xs text-muted-foreground">
              Onay bekliyor
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Güven</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageConfidence}%</div>
            <Progress value={stats.averageConfidence} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sistem Durumu</CardTitle>
            {getStatusIcon(stats.processingStatus)}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold capitalize ${getStatusColor(stats.processingStatus)}`}>
              {stats.processingStatus === 'running' ? 'Çalışıyor' :
                stats.processingStatus === 'stopped' ? 'Durduruldu' : 'Hata'}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.lastRun && `Son çalışma: ${stats.lastRun.toLocaleTimeString('tr-TR')}`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline Kontrolü</TabsTrigger>
          <TabsTrigger value="providers">AI Sağlayıcılar</TabsTrigger>
          <TabsTrigger value="activity">Son Aktiviteler</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Öğrenme İlerlemesi
                </CardTitle>
                <CardDescription>
                  Son 7 günde oluşturulan FAQ'lar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chat Verilerinden</span>
                    <span className="font-medium">{learningProgress.fromChat} FAQ</span>
                  </div>
                  <Progress value={learningProgress.fromChat > 0 ? Math.min((learningProgress.fromChat / stats.totalFaqs) * 100, 100) : 0} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ticket Verilerinden</span>
                    <span className="font-medium">{learningProgress.fromTickets} FAQ</span>
                  </div>
                  <Progress value={learningProgress.fromTickets > 0 ? Math.min((learningProgress.fromTickets / stats.totalFaqs) * 100, 100) : 0} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Kullanıcı Önerilerinden</span>
                    <span className="font-medium">{learningProgress.fromSuggestions} FAQ</span>
                  </div>
                  <Progress value={learningProgress.fromSuggestions > 0 ? Math.min((learningProgress.fromSuggestions / stats.totalFaqs) * 100, 100) : 0} />
                </div>
              </CardContent>
            </Card>

            {/* Quality Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Kalite Metrikleri
                </CardTitle>
                <CardDescription>
                  FAQ kalite dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        Yüksek Güven
                      </Badge>
                      <span className="text-sm">(85%+)</span>
                    </div>
                    <span className="font-medium">{qualityMetrics.highConfidence} FAQ</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Orta Güven
                      </Badge>
                      <span className="text-sm">(60-84%)</span>
                    </div>
                    <span className="font-medium">{qualityMetrics.mediumConfidence} FAQ</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="bg-red-100 text-red-800">
                        Düşük Güven
                      </Badge>
                      <span className="text-sm">(&lt;60%)</span>
                    </div>
                    <span className="font-medium">{qualityMetrics.lowConfidence} FAQ</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Kontrolü</CardTitle>
              <CardDescription>
                Öğrenme pipeline'ını başlatın, durdurun veya yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Otomatik Öğrenme</h3>
                  <p className="text-sm text-muted-foreground">
                    Sistem otomatik olarak yeni verilerden FAQ oluşturur
                  </p>
                </div>
                <div className="flex gap-2">
                  {stats.processingStatus === 'running' ? (
                    <Button variant="outline" onClick={stopLearningPipeline}>
                      <Pause className="h-4 w-4 mr-2" />
                      Durdur
                    </Button>
                  ) : (
                    <Button onClick={startLearningPipeline}>
                      <Play className="h-4 w-4 mr-2" />
                      Başlat
                    </Button>
                  )}
                </div>
              </div>

              {stats.nextRun && (
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    Sonraki otomatik çalışma: {stats.nextRun.toLocaleString('tr-TR')}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Manuel Çalıştır
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Settings className="h-6 w-6 mb-2" />
                  Ayarları Düzenle
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  Raporları Görüntüle
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Sağlayıcı Durumu</CardTitle>
              <CardDescription>
                Bağlı AI sağlayıcılarının durumu ve performansı
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {providers.map((provider) => (
                  <div key={provider.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${provider.available ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <h3 className="font-medium">{provider.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {provider.available ? 'Aktif' : 'Bağlantı Yok'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {provider.responseTime && (
                        <div className="text-sm font-medium">{provider.responseTime}ms</div>
                      )}
                      <div className="text-xs text-muted-foreground">
                        {provider.lastChecked.toLocaleTimeString('tr-TR')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Son Aktiviteler</CardTitle>
              <CardDescription>
                Sistem tarafından gerçekleştirilen son işlemler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp.toLocaleString('tr-TR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}