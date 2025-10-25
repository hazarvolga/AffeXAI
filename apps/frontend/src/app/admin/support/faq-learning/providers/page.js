"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProvidersPage;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
const PROVIDER_LABELS = {
    openai: 'OpenAI',
    anthropic: 'Anthropic',
    google: 'Google AI',
    openrouter: 'OpenRouter',
};
function ProvidersPage() {
    const router = (0, navigation_1.useRouter)();
    const [providerStatus, setProviderStatus] = (0, react_1.useState)(null);
    const [usageStats, setUsageStats] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [refreshing, setRefreshing] = (0, react_1.useState)(false);
    const loadProviderData = async () => {
        try {
            setRefreshing(true);
            // Get current provider status from FAQ learning API
            const statusResponse = await fetch('/api/faq-learning/provider-status');
            if (statusResponse.ok) {
                const status = await statusResponse.json();
                setProviderStatus(status.data);
            }
            // Get usage statistics
            const statsResponse = await fetch('/api/faq-learning/ai-usage-stats');
            if (statsResponse.ok) {
                const stats = await statsResponse.json();
                setUsageStats(stats.data);
            }
        }
        catch (error) {
            console.error('Failed to load provider data:', error);
        }
        finally {
            setLoading(false);
            setRefreshing(false);
        }
    };
    (0, react_1.useEffect)(() => {
        loadProviderData();
    }, []);
    const handleRefresh = () => {
        loadProviderData();
    };
    const handleConfigureAI = () => {
        router.push('/admin/ai-settings');
    };
    if (loading) {
        return (<div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">AI Provider Status</h1>
        </div>
        <div className="grid gap-6">
          <card_1.Card>
            <card_1.CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </div>
      </div>);
    }
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Provider Status</h1>
          <p className="text-muted-foreground mt-2">
            Monitor AI provider performance and usage statistics for FAQ Learning
          </p>
        </div>
        <div className="flex gap-2">
          <button_1.Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <lucide_react_1.RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`}/>
            Refresh
          </button_1.Button>
          <button_1.Button onClick={handleConfigureAI}>
            <lucide_react_1.Settings className="h-4 w-4 mr-2"/>
            Configure AI Settings
          </button_1.Button>
        </div>
      </div>

      <alert_1.Alert>
        <lucide_react_1.AlertCircle className="h-4 w-4"/>
        <alert_1.AlertTitle>Global AI Configuration</alert_1.AlertTitle>
        <alert_1.AlertDescription>
          FAQ Learning uses the global AI provider settings. To change the AI provider or model, 
          use the AI Settings page in the main navigation.
        </alert_1.AlertDescription>
      </alert_1.Alert>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Provider Status */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center gap-2">
              <lucide_react_1.Zap className="h-5 w-5"/>
              Current AI Provider
            </card_1.CardTitle>
            <card_1.CardDescription>
              Active AI provider and model for FAQ generation
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            {providerStatus ? (<>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Provider:</span>
                  <badge_1.Badge variant={providerStatus.available ? "default" : "destructive"}>
                    {PROVIDER_LABELS[providerStatus.provider] || providerStatus.provider}
                  </badge_1.Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Model:</span>
                  <span className="text-sm font-mono">{providerStatus.model}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status:</span>
                  <div className="flex items-center gap-2">
                    {providerStatus.available ? (<lucide_react_1.CheckCircle2 className="h-4 w-4 text-green-500"/>) : (<lucide_react_1.XCircle className="h-4 w-4 text-red-500"/>)}
                    <span className="text-sm">
                      {providerStatus.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
                {providerStatus.responseTime && (<div className="flex items-center justify-between">
                    <span className="font-medium">Response Time:</span>
                    <span className="text-sm">{providerStatus.responseTime}ms</span>
                  </div>)}
              </>) : (<div className="text-center py-4 text-muted-foreground">
                Unable to load provider status
              </div>)}
          </card_1.CardContent>
        </card_1.Card>

        {/* Usage Statistics */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center gap-2">
              <lucide_react_1.BarChart3 className="h-5 w-5"/>
              Usage Statistics
            </card_1.CardTitle>
            <card_1.CardDescription>
              AI usage metrics for FAQ Learning
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            {usageStats ? (<>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{usageStats.totalRequests}</div>
                    <div className="text-sm text-muted-foreground">Total Requests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{usageStats.successRate}%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{usageStats.averageResponseTime}ms</div>
                    <div className="text-sm text-muted-foreground">Avg Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{usageStats.totalTokens.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Tokens</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Estimated Cost:</span>
                    <span className="text-lg font-bold">${usageStats.estimatedCost.toFixed(2)}</span>
                  </div>
                </div>
              </>) : (<div className="text-center py-4 text-muted-foreground">
                No usage statistics available
              </div>)}
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Last 24 Hours Stats */}
      {usageStats?.last24Hours && (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center gap-2">
              <lucide_react_1.Clock className="h-5 w-5"/>
              Last 24 Hours
            </card_1.CardTitle>
            <card_1.CardDescription>
              Recent AI usage activity
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {usageStats.last24Hours.requests}
                </div>
                <div className="text-sm text-muted-foreground">Requests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {usageStats.last24Hours.tokens.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Tokens</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  ${usageStats.last24Hours.cost.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Cost</div>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>)}

      {/* Configuration Help */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="flex items-center gap-2">
            <lucide_react_1.Settings className="h-5 w-5"/>
            Configuration
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            FAQ Learning uses the global AI configuration from the AI Settings page. 
            You can configure AI providers, models, and API keys there.
          </p>
          <button_1.Button variant="outline" onClick={handleConfigureAI} className="w-full">
            <lucide_react_1.ExternalLink className="h-4 w-4 mr-2"/>
            Open AI Settings
          </button_1.Button>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=page.js.map