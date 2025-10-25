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
exports.default = IntegrationTestPage;
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
// Mock components for testing
const MockChatBox = ({ embedded, showHeader, height, className }) => (<div className={(0, utils_1.cn)("bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center", className)} style={{ height }}>
    <div className="text-center">
      <lucide_react_1.MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-400"/>
      <p className="text-sm text-gray-500">ChatBox Component</p>
      <p className="text-xs text-gray-400">Embedded: {embedded ? 'Yes' : 'No'}</p>
      <p className="text-xs text-gray-400">Header: {showHeader ? 'Yes' : 'No'}</p>
    </div>
  </div>);
const MockForm = () => (<div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-6 h-full flex items-center justify-center">
    <div className="text-center">
      <lucide_react_1.FileText className="h-8 w-8 mx-auto mb-2 text-blue-400"/>
      <p className="text-sm text-blue-600">Support Form Component</p>
      <p className="text-xs text-blue-400">Form fields would be here</p>
    </div>
  </div>);
function IntegrationTestPage() {
    const [activeTab, setActiveTab] = (0, react_1.useState)('form');
    const [isChatVisible, setIsChatVisible] = (0, react_1.useState)(false);
    const [isChatMinimized, setIsChatMinimized] = (0, react_1.useState)(false);
    const [chatSession, setChatSession] = (0, react_1.useState)(null);
    const toggleChatVisibility = () => {
        const newVisibility = !isChatVisible;
        setIsChatVisible(newVisibility);
        if (newVisibility) {
            setIsChatMinimized(false);
            if (activeTab === 'form') {
                setActiveTab('both');
            }
        }
        else {
            if (activeTab === 'both') {
                setActiveTab('form');
            }
        }
    };
    const toggleChatMinimized = () => {
        setIsChatMinimized(!isChatMinimized);
    };
    const handleTabChange = (value) => {
        const newTab = value;
        setActiveTab(newTab);
        if ((newTab === 'chat' || newTab === 'both') && !isChatVisible) {
            setIsChatVisible(true);
        }
        if (newTab === 'form' && isChatVisible) {
            setIsChatVisible(false);
        }
    };
    return (<div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal Support Integration Test</h1>
          <p className="text-muted-foreground">
            Testing the chatbox integration with side-by-side layout and toggle functionality.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button_1.Button variant={activeTab === 'both' ? "default" : "outline"} onClick={() => handleTabChange(activeTab === 'both' ? 'form' : 'both')} className="flex items-center space-x-2">
            <lucide_react_1.MessageCircle className="h-4 w-4"/>
            <span>{activeTab === 'both' ? 'Yan Yana Görünüm' : 'Form + Chat'}</span>
          </button_1.Button>
          <button_1.Button variant={isChatVisible ? "default" : "outline"} onClick={toggleChatVisibility} className="flex items-center space-x-2">
            {isChatVisible ? <lucide_react_1.EyeOff className="h-4 w-4"/> : <lucide_react_1.Eye className="h-4 w-4"/>}
            <span>{isChatVisible ? 'Chat\'i Gizle' : 'AI Chat\'i Göster'}</span>
          </button_1.Button>
        </div>
      </div>

      {/* Status Display */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Current State</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium">Active Tab</p>
              <badge_1.Badge variant="outline">{activeTab}</badge_1.Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Chat Visible</p>
              <badge_1.Badge variant={isChatVisible ? "default" : "secondary"}>
                {isChatVisible ? 'Yes' : 'No'}
              </badge_1.Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Chat Minimized</p>
              <badge_1.Badge variant={isChatMinimized ? "default" : "secondary"}>
                {isChatMinimized ? 'Yes' : 'No'}
              </badge_1.Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Chat Session</p>
              <badge_1.Badge variant={chatSession ? "default" : "secondary"}>
                {chatSession ? 'Active' : 'None'}
              </badge_1.Badge>
            </div>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Tabs */}
      <tabs_1.Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <tabs_1.TabsList className="grid w-full grid-cols-3">
          <tabs_1.TabsTrigger value="form" className="flex items-center space-x-2">
            <lucide_react_1.FileText className="h-4 w-4"/>
            <span>Destek Formu</span>
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="chat" className="flex items-center space-x-2">
            <lucide_react_1.MessageCircle className="h-4 w-4"/>
            <span>AI Sohbet</span>
            {chatSession && (<badge_1.Badge variant="secondary" className="ml-2">
                Aktif
              </badge_1.Badge>)}
          </tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="both" className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <lucide_react_1.FileText className="h-3 w-3"/>
              <lucide_react_1.MessageCircle className="h-3 w-3"/>
            </div>
            <span>Yan Yana</span>
          </tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        {/* Form Tab */}
        <tabs_1.TabsContent value="form" className="mt-6">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Support Form Only</card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              <MockForm />
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        {/* Chat Tab */}
        <tabs_1.TabsContent value="chat" className="mt-6">
          <card_1.Card className="h-[600px]">
            <card_1.CardHeader>
              <card_1.CardTitle>AI Chat Only</card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent className="p-0 h-full">
              <MockChatBox embedded={true} showHeader={false} height="100%" className="w-full h-full"/>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        {/* Side-by-Side Tab */}
        <tabs_1.TabsContent value="both" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[800px]">
            {/* Form Section */}
            <div className="flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <lucide_react_1.FileText className="h-5 w-5"/>
                  <span>Destek Talebi Formu</span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Detaylı destek talebi oluşturun
                </p>
              </div>
              
              <card_1.Card className="flex-1">
                <card_1.CardContent className="p-6 h-full">
                  <MockForm />
                </card_1.CardContent>
              </card_1.Card>
            </div>

            {/* Chat Section */}
            <div className="flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <lucide_react_1.MessageCircle className="h-5 w-5"/>
                    <span>AI Destek Asistanı</span>
                    {chatSession && (<badge_1.Badge variant="outline" className="ml-2">
                        Aktif
                      </badge_1.Badge>)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Anında yardım alın veya destek ekibiyle iletişime geçin
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <button_1.Button variant="ghost" size="icon" onClick={toggleChatMinimized} className="h-8 w-8">
                    {isChatMinimized ? <lucide_react_1.Maximize2 className="h-4 w-4"/> : <lucide_react_1.Minimize2 className="h-4 w-4"/>}
                  </button_1.Button>
                </div>
              </div>
              
              <card_1.Card className={(0, utils_1.cn)("flex-1 transition-all duration-300", isChatMinimized ? "h-16" : "h-full")}>
                {isChatMinimized ? (<card_1.CardContent className="flex items-center justify-center h-full">
                    <button_1.Button variant="ghost" onClick={toggleChatMinimized} className="flex items-center space-x-2">
                      <lucide_react_1.MessageCircle className="h-4 w-4"/>
                      <span>Chat'i Genişlet</span>
                    </button_1.Button>
                  </card_1.CardContent>) : (<card_1.CardContent className="p-0 h-full">
                    <MockChatBox embedded={true} showHeader={false} height="100%" className="w-full h-full"/>
                  </card_1.CardContent>)}
              </card_1.Card>
            </div>
          </div>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>

      {/* Floating Buttons (Mobile) */}
      {(!isChatVisible || (activeTab !== 'chat' && activeTab !== 'both')) && (<div className="fixed bottom-4 right-4 z-40 lg:hidden">
          <button_1.Button onClick={() => {
                if (!isChatVisible) {
                    toggleChatVisibility();
                }
                handleTabChange('chat');
            }} className="rounded-full h-14 w-14 shadow-lg" size="icon">
            <lucide_react_1.MessageCircle className="h-6 w-6"/>
          </button_1.Button>
          {chatSession && (<badge_1.Badge variant="secondary" className="absolute -top-2 -left-2 text-xs">
              Aktif
            </badge_1.Badge>)}
        </div>)}

      {isChatVisible && activeTab === 'both' && (<div className="fixed bottom-4 left-4 z-40 lg:hidden">
          <button_1.Button onClick={toggleChatMinimized} variant="outline" className="rounded-full h-12 w-12 shadow-lg" size="icon">
            {isChatMinimized ? <lucide_react_1.Maximize2 className="h-5 w-5"/> : <lucide_react_1.Minimize2 className="h-5 w-5"/>}
          </button_1.Button>
        </div>)}
    </div>);
}
//# sourceMappingURL=page.js.map