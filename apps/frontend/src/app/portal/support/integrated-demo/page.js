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
exports.default = IntegratedDemoPage;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
function IntegratedDemoPage() {
    const [viewMode, setViewMode] = (0, react_1.useState)('desktop');
    const getViewportClass = () => {
        switch (viewMode) {
            case 'mobile':
                return 'max-w-sm mx-auto';
            case 'tablet':
                return 'max-w-2xl mx-auto';
            default:
                return 'w-full';
        }
    };
    return (<div className="flex-1 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Portal Entegrasyonu Demo</h2>
          <p className="text-muted-foreground">
            Chatbox'ın portal destek sayfasına entegrasyonunun demo görünümü
          </p>
        </div>
        
        {/* Viewport Toggle */}
        <div className="flex items-center space-x-2">
          <button_1.Button variant={viewMode === 'desktop' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('desktop')}>
            <lucide_react_1.Monitor className="h-4 w-4 mr-2"/>
            Desktop
          </button_1.Button>
          <button_1.Button variant={viewMode === 'tablet' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('tablet')}>
            <lucide_react_1.Tablet className="h-4 w-4 mr-2"/>
            Tablet
          </button_1.Button>
          <button_1.Button variant={viewMode === 'mobile' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('mobile')}>
            <lucide_react_1.Smartphone className="h-4 w-4 mr-2"/>
            Mobile
          </button_1.Button>
        </div>
      </div>

      {/* Integration Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center space-x-2">
              <lucide_react_1.CheckCircle className="h-5 w-5 text-green-500"/>
              <span>Responsive Layout</span>
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <ul className="text-sm space-y-2">
              <li>• Desktop: Side-by-side form ve chat</li>
              <li>• Tablet: Stacked layout</li>
              <li>• Mobile: Tab-based navigation</li>
              <li>• Floating chat button</li>
            </ul>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center space-x-2">
              <lucide_react_1.CheckCircle className="h-5 w-5 text-green-500"/>
              <span>State Management</span>
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <ul className="text-sm space-y-2">
              <li>• LocalStorage persistence</li>
              <li>• Tab state korunması</li>
              <li>• Chat visibility toggle</li>
              <li>• Session management</li>
            </ul>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center space-x-2">
              <lucide_react_1.CheckCircle className="h-5 w-5 text-green-500"/>
              <span>User Experience</span>
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <ul className="text-sm space-y-2">
              <li>• Seamless form-chat geçiş</li>
              <li>• Quick action buttons</li>
              <li>• Contextual help</li>
              <li>• Progressive disclosure</li>
            </ul>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Demo Preview */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Entegrasyon Önizlemesi</card_1.CardTitle>
          <card_1.CardDescription>
            Gerçek portal sayfasının {viewMode} görünümü
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className={`transition-all duration-300 ${getViewportClass()}`}>
            <div className="border rounded-lg p-4 bg-background">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Destek Merkezi</h3>
                    <p className="text-sm text-muted-foreground">
                      Destek talebi oluşturun veya AI asistanımızla sohbet edin
                    </p>
                  </div>
                  {viewMode === 'desktop' && (<button_1.Button variant="outline" size="sm">
                      <lucide_react_1.MessageCircle className="h-4 w-4 mr-2"/>
                      AI Chat'i Göster
                    </button_1.Button>)}
                </div>

                {/* Tabs */}
                <tabs_1.Tabs defaultValue="form" className="w-full">
                  <tabs_1.TabsList className="grid w-full grid-cols-2">
                    <tabs_1.TabsTrigger value="form" className="flex items-center space-x-2">
                      <lucide_react_1.FileText className="h-4 w-4"/>
                      <span>Destek Formu</span>
                    </tabs_1.TabsTrigger>
                    <tabs_1.TabsTrigger value="chat" className="flex items-center space-x-2">
                      <lucide_react_1.MessageCircle className="h-4 w-4"/>
                      <span>AI Sohbet</span>
                      <badge_1.Badge variant="secondary" className="ml-2">Aktif</badge_1.Badge>
                    </tabs_1.TabsTrigger>
                  </tabs_1.TabsList>

                  <tabs_1.TabsContent value="form" className="mt-4">
                    <div className={`grid gap-4 ${viewMode === 'desktop' ? 'grid-cols-3' : 'grid-cols-1'}`}>
                      <div className={viewMode === 'desktop' ? 'col-span-2' : ''}>
                        <card_1.Card>
                          <card_1.CardHeader>
                            <card_1.CardTitle className="text-lg">Destek Talebi Formu</card_1.CardTitle>
                          </card_1.CardHeader>
                          <card_1.CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="h-4 bg-muted rounded w-16"></div>
                                <div className="h-10 bg-muted rounded"></div>
                              </div>
                              <div className="space-y-2">
                                <div className="h-4 bg-muted rounded w-20"></div>
                                <div className="h-10 bg-muted rounded"></div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="h-4 bg-muted rounded w-24"></div>
                              <div className="h-32 bg-muted rounded"></div>
                            </div>
                          </card_1.CardContent>
                        </card_1.Card>
                      </div>
                      
                      {viewMode === 'desktop' && (<div className="space-y-4">
                          <card_1.Card>
                            <card_1.CardHeader>
                              <card_1.CardTitle className="text-base flex items-center space-x-2">
                                <lucide_react_1.Lightbulb className="h-4 w-4 text-yellow-500"/>
                                <span>İpuçları</span>
                              </card_1.CardTitle>
                            </card_1.CardHeader>
                            <card_1.CardContent className="text-sm space-y-2">
                              <div className="h-3 bg-muted rounded w-full"></div>
                              <div className="h-3 bg-muted rounded w-3/4"></div>
                              <div className="h-3 bg-muted rounded w-5/6"></div>
                            </card_1.CardContent>
                          </card_1.Card>
                        </div>)}
                    </div>
                  </tabs_1.TabsContent>

                  <tabs_1.TabsContent value="chat" className="mt-4">
                    <div className={`grid gap-4 ${viewMode === 'desktop' ? 'grid-cols-4' : 'grid-cols-1'}`}>
                      <div className={viewMode === 'desktop' ? 'col-span-3' : ''}>
                        <card_1.Card>
                          <card_1.CardHeader>
                            <card_1.CardTitle className="text-lg flex items-center space-x-2">
                              <lucide_react_1.MessageCircle className="h-5 w-5"/>
                              <span>AI Destek Asistanı</span>
                            </card_1.CardTitle>
                          </card_1.CardHeader>
                          <card_1.CardContent>
                            <div className="h-96 bg-muted rounded flex items-center justify-center">
                              <div className="text-center space-y-2">
                                <lucide_react_1.MessageCircle className="h-12 w-12 mx-auto text-muted-foreground"/>
                                <p className="text-sm text-muted-foreground">
                                  Chatbox bileşeni burada görünür
                                </p>
                              </div>
                            </div>
                          </card_1.CardContent>
                        </card_1.Card>
                      </div>
                      
                      {viewMode === 'desktop' && (<div className="space-y-4">
                          <card_1.Card>
                            <card_1.CardHeader>
                              <card_1.CardTitle className="text-base">Özellikler</card_1.CardTitle>
                            </card_1.CardHeader>
                            <card_1.CardContent className="text-sm space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Real-time</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>Dosya yükleme</span>
                              </div>
                            </card_1.CardContent>
                          </card_1.Card>
                        </div>)}
                    </div>
                  </tabs_1.TabsContent>
                </tabs_1.Tabs>

                {/* Mobile floating button */}
                {viewMode === 'mobile' && (<div className="fixed bottom-4 right-4">
                    <button_1.Button className="rounded-full h-12 w-12 shadow-lg" size="icon">
                      <lucide_react_1.MessageCircle className="h-6 w-6"/>
                    </button_1.Button>
                  </div>)}
              </div>
            </div>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Implementation Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Teknik Detaylar</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Responsive Breakpoints</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Mobile: < /> 768px - Tab navigation</li>
                <li>• Tablet: 768px - 1024px - Stacked layout</li>
                <li>• Desktop: > 1024px - Side-by-side</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">State Persistence</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• localStorage için tab durumu</li>
                <li>• Chat visibility tercihi</li>
                <li>• Session bilgileri</li>
              </ul>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Kullanıcı Deneyimi</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Navigation Flow</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Form → Chat geçişi</li>
                <li>• Quick action buttons</li>
                <li>• Contextual help sidebar</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Accessibility</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keyboard navigation</li>
                <li>• Screen reader support</li>
                <li>• Focus management</li>
              </ul>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button_1.Button asChild>
          <a href="/portal/support/new">
            Gerçek Sayfayı Görüntüle
          </a>
        </button_1.Button>
        <button_1.Button variant="outline" asChild>
          <a href="/portal/support/chatbox-demo">
            Chatbox Demo
          </a>
        </button_1.Button>
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map