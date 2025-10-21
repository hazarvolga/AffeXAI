"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceDashboard = PerformanceDashboard;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const performance_1 = require("@/lib/performance");
const lucide_react_1 = require("lucide-react");
/**
 * Performance Dashboard Component
 *
 * Displays Web Vitals metrics and performance statistics.
 * Useful for development and performance analysis.
 *
 * @example
 * ```tsx
 * // In a development page
 * import { PerformanceDashboard } from '@/components/performance/performance-dashboard';
 *
 * export default function DevPage() {
 *   return <PerformanceDashboard />;
 * }
 * ```
 */
function PerformanceDashboard() {
    const [data, setData] = (0, react_1.useState)(null);
    const [resources, setResources] = (0, react_1.useState)(null);
    const loadData = () => {
        setData((0, performance_1.getDashboardData)());
        setResources((0, performance_1.getResourceSummary)());
    };
    (0, react_1.useEffect)(() => {
        loadData();
        // Refresh every 5 seconds
        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, []);
    const getRatingColor = (rating) => {
        switch (rating) {
            case 'good':
                return 'bg-green-500';
            case 'needs-improvement':
                return 'bg-yellow-500';
            case 'poor':
                return 'bg-red-500';
        }
    };
    const getStatusIcon = (status) => {
        return status === 'pass' ? (<lucide_react_1.TrendingUp className="h-4 w-4 text-green-500"/>) : (<lucide_react_1.TrendingDown className="h-4 w-4 text-red-500"/>);
    };
    if (!data) {
        return (<card_1.Card>
        <card_1.CardContent className="p-6">
          <p className="text-muted-foreground">Loading performance data...</p>
        </card_1.CardContent>
      </card_1.Card>);
    }
    return (<div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Performance Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Core Web Vitals and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <button_1.Button onClick={() => (0, performance_1.logPerformanceSummary)()} variant="outline" size="sm">
            <lucide_react_1.Activity className="h-4 w-4 mr-2"/>
            Log Summary
          </button_1.Button>
          <button_1.Button onClick={loadData} variant="outline" size="sm">
            <lucide_react_1.RefreshCw className="h-4 w-4 mr-2"/>
            Refresh
          </button_1.Button>
        </div>
      </div>

      {/* Budget Status */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Performance Budget Status</card_1.CardTitle>
          <card_1.CardDescription>
            Metrics compared against performance budgets
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.budgetStatus.map((budget) => (<div key={budget.metric} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{budget.metric}</span>
                  {getStatusIcon(budget.status)}
                </div>
                <div className="text-2xl font-bold">
                  {(0, performance_1.formatMetricValue)(budget.metric, budget.average)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Budget: {(0, performance_1.formatMetricValue)(budget.metric, budget.budget)}
                </div>
              </div>))}
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Web Vitals Details */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(data.summary).map(([name, stats]) => {
            if (!stats)
                return null;
            const metric = name;
            const goodPercent = ((stats.goodCount / stats.count) * 100).toFixed(1);
            const poorPercent = ((stats.poorCount / stats.count) * 100).toFixed(1);
            return (<card_1.Card key={metric}>
              <card_1.CardHeader>
                <card_1.CardTitle className="text-lg">{metric}</card_1.CardTitle>
                <card_1.CardDescription>
                  {stats.count} measurements
                </card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Average</span>
                    <span className="font-medium">
                      {(0, performance_1.formatMetricValue)(metric, stats.average)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Median</span>
                    <span className="font-medium">
                      {(0, performance_1.formatMetricValue)(metric, stats.median)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">P95</span>
                    <span className="font-medium">
                      {(0, performance_1.formatMetricValue)(metric, stats.p95)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex gap-1">
                    <div className="h-2 bg-green-500 rounded-l" style={{ width: `${goodPercent}%` }}/>
                    <div className="h-2 bg-yellow-500" style={{ width: `${(stats.needsImprovementCount / stats.count) * 100}%` }}/>
                    <div className="h-2 bg-red-500 rounded-r" style={{ width: `${poorPercent}%` }}/>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{goodPercent}% good</span>
                    <span>{poorPercent}% poor</span>
                  </div>
                </div>
              </card_1.CardContent>
            </card_1.Card>);
        })}
      </div>

      {/* Resource Summary */}
      {resources && (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Resource Loading Summary</card_1.CardTitle>
            <card_1.CardDescription>
              Breakdown of loaded resources by type
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(resources).map(([type, data]) => (<div key={type} className="space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{type}</span>
                    <badge_1.Badge variant="secondary">{data.count}</badge_1.Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Size</span>
                      <span>{(data.totalSize / 1024).toFixed(1)} KB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Time</span>
                      <span>{(data.totalDuration / data.count).toFixed(0)}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cached</span>
                      <span>{data.cached}/{data.count}</span>
                    </div>
                  </div>
                </div>))}
            </div>
          </card_1.CardContent>
        </card_1.Card>)}

      {/* Recent Metrics */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Recent Measurements</card_1.CardTitle>
          <card_1.CardDescription>
            Last 10 performance measurements
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="space-y-2">
            {data.recentMetrics.slice(-10).reverse().map((entry, index) => (<div key={index} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-3">
                  <badge_1.Badge variant="outline">{entry.name}</badge_1.Badge>
                  <span className="text-sm font-medium">
                    {(0, performance_1.formatMetricValue)(entry.name, entry.value)}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${getRatingColor(entry.rating)}`}/>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>))}
          </div>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
//# sourceMappingURL=performance-dashboard.js.map