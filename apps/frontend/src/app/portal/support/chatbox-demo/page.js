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
exports.default = ChatboxDemoPage;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const chatbox_1 = require("@/components/support/chatbox");
function ChatboxDemoPage() {
    const [demoActive, setDemoActive] = (0, react_1.useState)(false);
    const [sessionType, setSessionType] = (0, react_1.useState)('support');
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [currentSession, setCurrentSession] = (0, react_1.useState)(null);
    const [connectionStatus, setConnectionStatus] = (0, react_1.useState)('disconnected');
    const handleSessionCreate = (session) => {
        setCurrentSession(session);
        console.log('Session created:', session);
    };
    const handleMessageSent = (message) => {
        setMessages(prev => [...prev, message]);
        console.log('Message sent:', message);
    };
    const resetDemo = () => {
        setMessages([]);
        setCurrentSession(null);
        setDemoActive(false);
    };
    const toggleDemo = () => {
        if (demoActive) {
            setDemoActive(false);
        }
        else {
            setDemoActive(true);
            setConnectionStatus('connecting');
            // Simulate connection
            setTimeout(() => {
                setConnectionStatus('connected');
            }, 1000);
        }
    };
    const demoFeatures = [
        {
            title: 'Real-time Mesajlaşma',
            description: 'WebSocket tabanlı anlık mesaj gönderme ve alma',
            status: 'implemented'
        },
        {
            title: 'AI Yanıtları',
            description: 'Context-aware AI yanıtları ve streaming desteği',
            status: 'implemented'
        },
        {
            title: 'Dosya Yükleme',
            description: 'Sürükle & bırak ile çoklu dosya yükleme',
            status: 'implemented'
        },
        {
            title: 'URL İşleme',
            description: 'Web sayfası analizi ve içerik çıkarma',
            status: 'implemented'
        },
        {
            title: 'Bağlam Görselleştirme',
            description: 'Kaynak alıntıları ve alaka düzeyi skorları',
            status: 'implemented'
        },
        {
            title: 'Destek Ekibi Entegrasyonu',
            description: 'Canlı destek ve chat transfer özellikleri',
            status: 'planned'
        }
    ];
    return (<div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <lucide_react_1.MessageCircle className="h-8 w-8 text-primary"/>
          <h1 className="text-3xl font-bold">AI Support Chatbox Demo</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          AI destekli destek chatbox sisteminin tüm özelliklerini test edin. 
          Real-time mesajlaşma, dosya yükleme, URL analizi ve daha fazlası.
        </p>
      </div>

      {/* Demo Controls */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center space-x-2">
            <lucide_react_1.Settings className="h-5 w-5"/>
            <span>Demo Kontrolleri</span>
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Demo Durumu:</span>
                <badge_1.Badge variant={demoActive ? 'default' : 'secondary'}>
                  {demoActive ? 'Aktif' : 'Pasif'}
                </badge_1.Badge>
                <badge_1.Badge variant={connectionStatus === 'connected' ? 'default' : 'secondary'}>
                  {connectionStatus === 'connected' ? 'Bağlı' :
            connectionStatus === 'connecting' ? 'Bağlanıyor...' : 'Bağlantı Yok'}
                </badge_1.Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Oturum Türü:</span>
                <tabs_1.Tabs value={sessionType} onValueChange={(value) => setSessionType(value)}>
                  <tabs_1.TabsList className="grid w-full grid-cols-2">
                    <tabs_1.TabsTrigger value="support">Destek</tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="general">Genel</tabs_1.TabsTrigger>
                  </tabs_1.TabsList>
                </tabs_1.Tabs>
              </div>
            </div>
            <div className="flex space-x-2">
              <button_1.Button onClick={toggleDemo} variant={demoActive ? 'destructive' : 'default'}>
                {demoActive ? (<>
                    <lucide_react_1.Pause className="mr-2 h-4 w-4"/>
                    Durdur
                  </>) : (<>
                    <lucide_react_1.Play className="mr-2 h-4 w-4"/>
                    Başlat
                  </>)}
              </button_1.Button>
              <button_1.Button onClick={resetDemo} variant="outline">
                <lucide_react_1.RotateCcw className="mr-2 h-4 w-4"/>
                Sıfırla
              </button_1.Button>
            </div>
          </div>

          {/* Session Info */}
          {currentSession && (<alert_1.Alert>
              <lucide_react_1.Info className="h-4 w-4"/>
              <alert_1.AlertDescription>
                <strong>Aktif Oturum:</strong> {currentSession.id.slice(0, 8)}... • 
                Tür: {currentSession.sessionType} • 
                Mesaj Sayısı: {messages.length} • 
                Durum: {currentSession.status}
              </alert_1.AlertDescription>
            </alert_1.Alert>)}
        </card_1.CardContent>
      </card_1.Card>

      {/* Feature Overview */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center space-x-2">
            <lucide_react_1.Bot className="h-5 w-5"/>
            <span>Özellik Durumu</span>
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoFeatures.map((feature, index) => (<div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                {feature.status === 'implemented' ? (<lucide_react_1.CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"/>) : (<lucide_react_1.AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5"/>)}
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <badge_1.Badge variant={feature.status === 'implemented' ? 'default' : 'secondary'} className="text-xs">
                    {feature.status === 'implemented' ? 'Tamamlandı' : 'Planlandı'}
                  </badge_1.Badge>
                </div>
              </div>))}
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Demo Instructions */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Demo Talimatları</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Temel Özellikler</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Sağ alt köşedeki chat butonuna tıklayın</li>
                <li>• Mesaj yazın ve Enter'a basın</li>
                <li>• AI yanıtlarını gerçek zamanlı olarak görün</li>
                <li>• Chat penceresini minimize/maximize edin</li>
                <li>• Mobil uyumlu responsive tasarımı test edin</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Gelişmiş Özellikler</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Dosya yükleme butonuna tıklayın (📎)</li>
                <li>• URL paylaşma butonuna tıklayın (🔗)</li>
                <li>• AI yanıtlarındaki kaynak alıntılarını inceleyin</li>
                <li>• Yazma göstergelerini gözlemleyin</li>
                <li>• Bağlam kaynaklarını genişletin</li>
              </ul>
            </div>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Demo Chatbox */}
      {demoActive && (<chatbox_1.ChatBox sessionType={sessionType} onSessionCreate={handleSessionCreate} onMessageSent={handleMessageSent} className="demo-chatbox"/>)}

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Bu demo sayfası geliştirme amaçlıdır. Gerçek AI yanıtları için backend bağlantısı gereklidir.</p>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map