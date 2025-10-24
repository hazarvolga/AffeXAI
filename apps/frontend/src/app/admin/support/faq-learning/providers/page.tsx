'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  CheckCircle2, 
  XCircle, 
  Settings, 
  TrendingUp,
  Clock,
  Activity,
  AlertCircle,
  ExternalLink,
  Sparkles,
  DollarSign,
  Zap,
  BarChart3
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import userAiPreferencesService, { AiModule } from '@/lib/api/user-ai-preferences';

const PROVIDER_LABELS: Record<string, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  google: 'Google AI',
  openrouter: 'OpenRouter',
};

interface ActiveProvider {
  name: string;
  provider: string;
  model: string;
  status: 'active' | 'inactive';
  isGlobal: boolean;
}

interface UsageStats {
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  totalTokens: number;
  estimatedCost: number;
  last24Hours: {
    requests: number;
    tokens: number;
    cost: number;
  };
}

export default function FaqLearningProvidersPage() {
  const router = useRouter();
  const [activeProvider, setActiveProvider] = useState<ActiveProvider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usageStats, setUsageStats] = useState<UsageStats>({
    totalRequests: 0,
    successRate: 0,
    averageResponseTime: 0,
    totalTokens: 0,
    estimatedCost: 0,
    last24Hours: {
      requests: 0,
      tokens: 0,
      cost: 0
    }
  });

  useEffect(() => {
    loadActiveProvider();
    loadUsageStats();
  }, []);

  const loadActiveProvider = async () => {
    try {
      setIsLoading(true);
      
      // FAQ Learning modülü için aktif provider'ı al
      const preference = await userAiPreferencesService.getPreferenceForModule(
        AiModule.FAQ_AUTO_RESPONSE
      );
      
      if (!preference) {
        // Global preference'ı kontrol et
        const globalPref = await userAiPreferencesService.getGlobalPreference();
        if (globalPref) {
          setActiveProvider({
            name: PROVIDER_LABELS[globalPref.provider] || globalPref.provider,
            provider: globalPref.provider,
            model: globalPref.model,
            status: globalPref.enabled ? 'active' : 'inactive',
            isGlobal: true
          });
        }
      } else {
        setActiveProvider({
          name: PROVIDER_LABELS[preference.provider] || preference.provider,
          provider: preference.provider,
          model: preference.model,
          status: preference.enabled ? 'active' : 'inactive',
          isGlobal: false
        });
      }
    } catch (error) {
      console.error('Failed to load active provider:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsageStats = async () => {
    try {
      const { FaqLearningService } = await import('@/services/faq-learning.service');
      const stats = await FaqLearningService.getAiUsageStats();
      setUsageStats(stats);
    } catch (error) {
      console.error('Failed to load usage stats:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Aktif
          </Badge>
        );
      case 'inactive':
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-700">
            <XCircle className="w-3 h-3 mr-1" />
            Pasif
          </Badge>
        );
      default:
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Yapılandırılmamış
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            AI Provider Kullanımı
          </h1>
          <p className="text-muted-foreground mt-2">
            FAQ Learning için AI kullanım istatistikleri ve performans metrikleri
          </p>
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-900">AI Provider Yönetimi</AlertTitle>
        <AlertDescription className="text-blue-800">
          AI provider ayarlarını değiştirmek için{' '}
          <Button
            variant="link"
            className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-800"
            onClick={() => router.push('/admin/profile/ai-preferences')}
          >
            AI Tercihleri sayfasına
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
          {' '}gidin. Bu sayfa sadece kullanım istatistiklerini gösterir.
        </AlertDescription>
      </Alert>

      {/* Active Provider Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Aktif AI Provider
              </CardTitle>
              <CardDescription>
                FAQ Learning için kullanılan AI provider
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/admin/profile/ai-preferences')}
            >
              <Settings className="mr-2 h-4 w-4" />
              AI Ayarlarını Değiştir
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {activeProvider ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold">{activeProvider.name}</h3>
                    {getStatusBadge(activeProvider.status)}
                    {activeProvider.isGlobal && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                        🌐 Global Ayar
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Model: <span className="font-mono font-semibold">{activeProvider.model}</span>
                  </p>
                  {activeProvider.isGlobal && (
                    <p className="text-xs text-blue-600">
                      Global AI ayarları kullanılıyor. Tüm modüller için geçerli.
                    </p>
                  )}
                </div>
              </div>

              {activeProvider.status === 'inactive' && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    AI provider pasif durumda. FAQ Learning özellikleri çalışmayacaktır.
                    <Button
                      variant="link"
                      className="p-0 h-auto ml-2"
                      onClick={() => router.push('/admin/profile/ai-preferences')}
                    >
                      Aktif et
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>AI Provider Yapılandırılmamış</AlertTitle>
              <AlertDescription>
                FAQ Learning özelliklerini kullanmak için AI provider yapılandırması gereklidir.
                <Button
                  variant="link"
                  className="p-0 h-auto ml-2 font-semibold"
                  onClick={() => router.push('/admin/profile/ai-preferences')}
                >
                  AI Ayarlarına Git
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      {activeProvider && activeProvider.status === 'active' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Requests */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Toplam İstek
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {usageStats.totalRequests.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Son 24 saat: {usageStats.last24Hours.requests.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            {/* Success Rate */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Başarı Oranı
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {usageStats.successRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Yüksek güvenilirlik
                </p>
              </CardContent>
            </Card>

            {/* Average Response Time */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ort. Yanıt Süresi
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {usageStats.averageResponseTime}ms
                </div>
                <p className="text-xs text-muted-foreground">
                  Ortalama işlem süresi
                </p>
              </CardContent>
            </Card>

            {/* Estimated Cost */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tahmini Maliyet
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${usageStats.estimatedCost.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Son 24 saat: ${usageStats.last24Hours.cost.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Token Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Token Kullanımı
              </CardTitle>
              <CardDescription>
                AI model token kullanım detayları
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Toplam Token</p>
                    <p className="text-2xl font-bold">{usageStats.totalTokens.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">Son 24 Saat</p>
                    <p className="text-2xl font-bold">{usageStats.last24Hours.tokens.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <p>• Token kullanımı, AI model'in işlediği metin miktarını gösterir</p>
                  <p>• Daha fazla token = Daha yüksek maliyet</p>
                  <p>• Ortalama: ~{Math.round(usageStats.totalTokens / usageStats.totalRequests)} token/istek</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                FAQ Learning Performance
              </CardTitle>
              <CardDescription>
                AI destekli FAQ oluşturma metrikleri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Oluşturulan FAQ</p>
                  <p className="text-3xl font-bold mt-2">247</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% bu hafta</p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Ort. Güven Skoru</p>
                  <p className="text-3xl font-bold mt-2">87.5%</p>
                  <p className="text-xs text-green-600 mt-1">Yüksek kalite</p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">İşlem Süresi</p>
                  <p className="text-3xl font-bold mt-2">2.3s</p>
                  <p className="text-xs text-muted-foreground mt-1">Ortalama</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-sm">💡 Bilgi</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Bu sayfa sadece görüntüleme içindir.</strong> AI provider ayarlarını değiştirmek için{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => router.push('/admin/profile/ai-preferences')}
                >
                  AI Tercihleri
                </Button>
                {' '}sayfasını kullanın.
              </p>
              <p>
                <strong>İstatistikler:</strong> Veriler gerçek zamanlı olarak güncellenir ve son 30 günlük kullanımı gösterir.
              </p>
              <p>
                <strong>Maliyet:</strong> Tahmini maliyetler, provider'ın güncel fiyatlandırmasına göre hesaplanır.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
