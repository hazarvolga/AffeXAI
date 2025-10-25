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
exports.default = FaqLearningDashboard;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const progress_1 = require("@/components/ui/progress");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
function FaqLearningDashboard() {
    const [stats, setStats] = (0, react_1.useState)({
        totalFaqs: 0,
        newFaqsToday: 0,
        pendingReview: 0,
        averageConfidence: 0,
        processingStatus: 'stopped'
    });
    const [learningProgress, setLearningProgress] = (0, react_1.useState)({
        fromChat: 0,
        fromTickets: 0,
        fromSuggestions: 0
    });
    const [qualityMetrics, setQualityMetrics] = (0, react_1.useState)({
        highConfidence: 0,
        mediumConfidence: 0,
        lowConfidence: 0
    });
    const [providers, setProviders] = (0, react_1.useState)([]);
    const [recentActivity, setRecentActivity] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        loadDashboardData();
        const interval = setInterval(loadDashboardData, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, []);
    const loadDashboardData = async () => {
        try {
            console.log('📊 Loading dashboard data...');
            const { FaqLearningService } = await Promise.resolve().then(() => __importStar(require('@/services/faq-learning.service')));
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
        }
        catch (error) {
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
            const { FaqLearningService } = await Promise.resolve().then(() => __importStar(require('@/services/faq-learning.service')));
            const result = await FaqLearningService.startPipeline();
            if (result.success) {
                console.log('Learning pipeline başlatıldı:', result.message);
                // Refresh dashboard data
                await loadDashboardData();
            }
        }
        catch (error) {
            console.error('Pipeline başlatılamadı:', error);
        }
    };
    const stopLearningPipeline = async () => {
        try {
            const { FaqLearningService } = await Promise.resolve().then(() => __importStar(require('@/services/faq-learning.service')));
            const result = await FaqLearningService.stopPipeline();
            if (result.success) {
                console.log('Learning pipeline durduruldu:', result.message);
                // Refresh dashboard data
                await loadDashboardData();
            }
        }
        catch (error) {
            console.error('Pipeline durdurulamadı:', error);
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'running': return 'text-green-600';
            case 'stopped': return 'text-yellow-600';
            case 'error': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'running': return <lucide_react_1.Play className="h-4 w-4"/>;
            case 'stopped': return <lucide_react_1.Pause className="h-4 w-4"/>;
            case 'error': return <lucide_react_1.AlertCircle className="h-4 w-4"/>;
            default: return <lucide_react_1.Clock className="h-4 w-4"/>;
        }
    };
    if (isLoading) {
        return (<div className="flex items-center justify-center h-64">
        <lucide_react_1.RefreshCw className="h-8 w-8 animate-spin"/>
        <span className="ml-2">Dashboard yükleniyor...</span>
      </div>);
    }
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">FAQ Öğrenme Sistemi</h1>
          <p className="text-muted-foreground">
            AI destekli otomatik FAQ oluşturma ve yönetim sistemi
          </p>
        </div>
        <div className="flex gap-2">
          <button_1.Button variant="outline" onClick={loadDashboardData}>
            <lucide_react_1.RefreshCw className="h-4 w-4 mr-2"/>
            Yenile
          </button_1.Button>
          <button_1.Button>
            <lucide_react_1.Settings className="h-4 w-4 mr-2"/>
            Ayarlar
          </button_1.Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Toplam FAQ</card_1.CardTitle>
            <lucide_react_1.MessageSquare className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{stats.totalFaqs}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newFaqsToday} bugün eklendi
            </p>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">İnceleme Bekleyen</card_1.CardTitle>
            <lucide_react_1.Clock className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{stats.pendingReview}</div>
            <p className="text-xs text-muted-foreground">
              Onay bekliyor
            </p>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Ortalama Güven</card_1.CardTitle>
            <lucide_react_1.TrendingUp className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{stats.averageConfidence}%</div>
            <progress_1.Progress value={stats.averageConfidence} className="mt-2"/>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Sistem Durumu</card_1.CardTitle>
            {getStatusIcon(stats.processingStatus)}
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className={`text-2xl font-bold capitalize ${getStatusColor(stats.processingStatus)}`}>
              {stats.processingStatus === 'running' ? 'Çalışıyor' :
            stats.processingStatus === 'stopped' ? 'Durduruldu' : 'Hata'}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.lastRun && `Son çalışma: ${stats.lastRun.toLocaleTimeString('tr-TR')}`}
            </p>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Main Content Tabs */}
      <tabs_1.Tabs defaultValue="overview" className="space-y-4">
        <tabs_1.TabsList>
          <tabs_1.TabsTrigger value="overview">Genel Bakış</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="pipeline">Pipeline Kontrolü</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="providers">AI Sağlayıcılar</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="activity">Son Aktiviteler</tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        <tabs_1.TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Progress */}
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="flex items-center gap-2">
                  <lucide_react_1.Brain className="h-5 w-5"/>
                  Öğrenme İlerlemesi
                </card_1.CardTitle>
                <card_1.CardDescription>
                  Son 7 günde oluşturulan FAQ'lar
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chat Verilerinden</span>
                    <span className="font-medium">{learningProgress.fromChat} FAQ</span>
                  </div>
                  <progress_1.Progress value={learningProgress.fromChat > 0 ? Math.min((learningProgress.fromChat / stats.totalFaqs) * 100, 100) : 0}/>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ticket Verilerinden</span>
                    <span className="font-medium">{learningProgress.fromTickets} FAQ</span>
                  </div>
                  <progress_1.Progress value={learningProgress.fromTickets > 0 ? Math.min((learningProgress.fromTickets / stats.totalFaqs) * 100, 100) : 0}/>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Kullanıcı Önerilerinden</span>
                    <span className="font-medium">{learningProgress.fromSuggestions} FAQ</span>
                  </div>
                  <progress_1.Progress value={learningProgress.fromSuggestions > 0 ? Math.min((learningProgress.fromSuggestions / stats.totalFaqs) * 100, 100) : 0}/>
                </div>
              </card_1.CardContent>
            </card_1.Card>

            {/* Quality Metrics */}
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="flex items-center gap-2">
                  <lucide_react_1.BarChart3 className="h-5 w-5"/>
                  Kalite Metrikleri
                </card_1.CardTitle>
                <card_1.CardDescription>
                  FAQ kalite dağılımı
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <badge_1.Badge variant="default" className="bg-green-100 text-green-800">
                        Yüksek Güven
                      </badge_1.Badge>
                      <span className="text-sm">(85%+)</span>
                    </div>
                    <span className="font-medium">{qualityMetrics.highConfidence} FAQ</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <badge_1.Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Orta Güven
                      </badge_1.Badge>
                      <span className="text-sm">(60-84%)</span>
                    </div>
                    <span className="font-medium">{qualityMetrics.mediumConfidence} FAQ</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <badge_1.Badge variant="destructive" className="bg-red-100 text-red-800">
                        Düşük Güven
                      </badge_1.Badge>
                      <span className="text-sm">(&lt;60%)</span>
                    </div>
                    <span className="font-medium">{qualityMetrics.lowConfidence} FAQ</span>
                  </div>
                </div>
              </card_1.CardContent>
            </card_1.Card>
          </div>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="pipeline" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Pipeline Kontrolü</card_1.CardTitle>
              <card_1.CardDescription>
                Öğrenme pipeline'ını başlatın, durdurun veya yapılandırın
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Otomatik Öğrenme</h3>
                  <p className="text-sm text-muted-foreground">
                    Sistem otomatik olarak yeni verilerden FAQ oluşturur
                  </p>
                </div>
                <div className="flex gap-2">
                  {stats.processingStatus === 'running' ? (<button_1.Button variant="outline" onClick={stopLearningPipeline}>
                      <lucide_react_1.Pause className="h-4 w-4 mr-2"/>
                      Durdur
                    </button_1.Button>) : (<button_1.Button onClick={startLearningPipeline}>
                      <lucide_react_1.Play className="h-4 w-4 mr-2"/>
                      Başlat
                    </button_1.Button>)}
                </div>
              </div>

              {stats.nextRun && (<alert_1.Alert>
                  <lucide_react_1.Clock className="h-4 w-4"/>
                  <alert_1.AlertDescription>
                    Sonraki otomatik çalışma: {stats.nextRun.toLocaleString('tr-TR')}
                  </alert_1.AlertDescription>
                </alert_1.Alert>)}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button_1.Button variant="outline" className="h-20 flex-col">
                  <lucide_react_1.Users className="h-6 w-6 mb-2"/>
                  Manuel Çalıştır
                </button_1.Button>
                <button_1.Button variant="outline" className="h-20 flex-col">
                  <lucide_react_1.Settings className="h-6 w-6 mb-2"/>
                  Ayarları Düzenle
                </button_1.Button>
                <button_1.Button variant="outline" className="h-20 flex-col">
                  <lucide_react_1.BarChart3 className="h-6 w-6 mb-2"/>
                  Raporları Görüntüle
                </button_1.Button>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="providers" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>AI Sağlayıcı Durumu</card_1.CardTitle>
              <card_1.CardDescription>
                Bağlı AI sağlayıcılarının durumu ve performansı
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                {providers.map((provider) => (<div key={provider.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${provider.available ? 'bg-green-500' : 'bg-red-500'}`}/>
                      <div>
                        <h3 className="font-medium">{provider.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {provider.available ? 'Aktif' : 'Bağlantı Yok'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {provider.responseTime && (<div className="text-sm font-medium">{provider.responseTime}ms</div>)}
                      <div className="text-xs text-muted-foreground">
                        {provider.lastChecked.toLocaleTimeString('tr-TR')}
                      </div>
                    </div>
                  </div>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        <tabs_1.TabsContent value="activity" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Son Aktiviteler</card_1.CardTitle>
              <card_1.CardDescription>
                Sistem tarafından gerçekleştirilen son işlemler
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (<div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.status === 'success' ? 'bg-green-500' :
                activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}/>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp.toLocaleString('tr-TR')}
                      </p>
                    </div>
                  </div>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>
    </div>);
}
//# sourceMappingURL=page.js.map