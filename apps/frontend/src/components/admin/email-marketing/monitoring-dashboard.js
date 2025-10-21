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
exports.default = MonitoringDashboard;
/**
 * Monitoring Dashboard Component
 *
 * Comprehensive monitoring dashboard for bulk operations including:
 * - Real-time performance metrics
 * - System health indicators
 * - Alert management
 * - Audit trail visualization
 * - Compliance reporting
 */
const react_1 = __importStar(require("react"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const tabs_1 = require("@/components/ui/tabs");
const alert_1 = require("@/components/ui/alert");
const progress_1 = require("@/components/ui/progress");
const lucide_react_1 = require("lucide-react");
// ============================================================================
// Mock Data (In production, this would come from the metrics service)
// ============================================================================
const mockSystemMetrics = {
    timestamp: new Date(),
    memoryUsage: {
        used: 2147483648, // 2GB
        free: 2147483648, // 2GB
        total: 4294967296, // 4GB
        percentage: 50
    },
    cpuUsage: 35,
    activeConnections: 45,
    queueSize: 12
};
const mockBusinessMetrics = {
    timestamp: new Date(),
    totalImportsToday: 15,
    totalExportsToday: 8,
    totalRecordsProcessed: 125000,
    averageValidationRate: 94.5,
    averageProcessingTime: 2500,
    errorRate: 2.1,
    activeUsers: 12
};
const mockAlerts = [
    {
        id: '1',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        message: 'Memory usage above 85% threshold',
        severity: 'high',
        acknowledged: false
    },
    {
        id: '2',
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        message: 'Queue size exceeded 100 items',
        severity: 'medium',
        acknowledged: true
    }
];
const mockMetricsSummary = {
    timeRange: {
        start: new Date(Date.now() - 24 * 60 * 60 * 1000),
        end: new Date()
    },
    totalOperations: 45,
    successfulOperations: 42,
    failedOperations: 3,
    averageThroughput: 1250.5,
    peakThroughput: 2800.0,
    averageMemoryUsage: 52.3,
    peakMemoryUsage: 78.9,
    totalErrorCount: 8,
    mostCommonErrors: [
        { type: 'VALIDATION_FAILED', count: 3 },
        { type: 'FILE_PROCESSING_ERROR', count: 2 },
        { type: 'NETWORK_TIMEOUT', count: 2 },
        { type: 'PERMISSION_DENIED', count: 1 }
    ],
    performanceTrends: {
        throughputTrend: 'improving',
        errorRateTrend: 'stable',
        memoryUsageTrend: 'declining'
    }
};
const mockAuditEvents = [
    {
        id: '1',
        timestamp: new Date(Date.now() - 600000),
        eventType: 'DATA_IMPORT_COMPLETED',
        userId: 'user123',
        resource: 'bulk_import',
        action: 'import_subscribers',
        success: true,
        riskLevel: 'medium'
    },
    {
        id: '2',
        timestamp: new Date(Date.now() - 1200000),
        eventType: 'DATA_EXPORT_STARTED',
        userId: 'user456',
        resource: 'bulk_export',
        action: 'export_subscribers',
        success: true,
        riskLevel: 'low'
    }
];
// ============================================================================
// Component Implementation
// ============================================================================
function MonitoringDashboard() {
    const [systemMetrics, setSystemMetrics] = (0, react_1.useState)(mockSystemMetrics);
    const [businessMetrics, setBusinessMetrics] = (0, react_1.useState)(mockBusinessMetrics);
    const [alerts, setAlerts] = (0, react_1.useState)(mockAlerts);
    const [metricsSummary, setMetricsSummary] = (0, react_1.useState)(mockMetricsSummary);
    const [auditEvents, setAuditEvents] = (0, react_1.useState)(mockAuditEvents);
    const [selectedTimeRange, setSelectedTimeRange] = (0, react_1.useState)('24h');
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    // Simulate real-time updates
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            // Update system metrics with slight variations
            setSystemMetrics(prev => ({
                ...prev,
                timestamp: new Date(),
                memoryUsage: {
                    ...prev.memoryUsage,
                    percentage: Math.max(30, Math.min(90, prev.memoryUsage.percentage + (Math.random() - 0.5) * 5))
                },
                cpuUsage: Math.max(10, Math.min(95, prev.cpuUsage + (Math.random() - 0.5) * 10)),
                activeConnections: Math.max(5, Math.min(100, prev.activeConnections + Math.floor((Math.random() - 0.5) * 6))),
                queueSize: Math.max(0, Math.min(50, prev.queueSize + Math.floor((Math.random() - 0.5) * 4)))
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    const handleAcknowledgeAlert = (alertId) => {
        setAlerts(prev => prev.map(alert => alert.id === alertId ? { ...alert, acknowledged: true } : alert));
    };
    const handleGenerateReport = async (reportType) => {
        setIsLoading(true);
        // Simulate report generation
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        // In production, this would trigger actual report generation
        console.log(`Generating ${reportType} report...`);
    };
    const formatBytes = (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0)
            return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };
    const formatDuration = (ms) => {
        if (ms < 1000)
            return `${ms}ms`;
        if (ms < 60000)
            return `${Math.round(ms / 1000)}s`;
        return `${Math.round(ms / 60000)}m`;
    };
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical': return 'destructive';
            case 'high': return 'destructive';
            case 'medium': return 'default';
            case 'low': return 'secondary';
            default: return 'secondary';
        }
    };
    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'improving': return <lucide_react_1.TrendingUp className="h-4 w-4 text-green-500"/>;
            case 'declining': return <lucide_react_1.TrendingUp className="h-4 w-4 text-red-500 rotate-180"/>;
            default: return <lucide_react_1.Activity className="h-4 w-4 text-blue-500"/>;
        }
    };
    const activeAlerts = alerts.filter(alert => !alert.acknowledged && !alert.resolvedAt);
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monitoring Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring and analytics for bulk operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button_1.Button variant="outline" size="sm" onClick={() => handleGenerateReport('compliance')} disabled={isLoading}>
            <lucide_react_1.FileText className="h-4 w-4 mr-2"/>
            Generate Report
          </button_1.Button>
        </div>
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (<div className="space-y-2">
          {activeAlerts.map((alert) => (<alert_1.Alert key={alert.id} variant={alert.severity === 'critical' || alert.severity === 'high' ? 'destructive' : 'default'}>
              <lucide_react_1.AlertTriangle className="h-4 w-4"/>
              <alert_1.AlertTitle className="flex items-center justify-between">
                <span>{alert.severity.toUpperCase()} Alert</span>
                <button_1.Button variant="ghost" size="sm" onClick={() => handleAcknowledgeAlert(alert.id)}>
                  Acknowledge
                </button_1.Button>
              </alert_1.AlertTitle>
              <alert_1.AlertDescription>
                {alert.message}
                <div className="text-xs text-muted-foreground mt-1">
                  {alert.timestamp.toLocaleString()}
                </div>
              </alert_1.AlertDescription>
            </alert_1.Alert>))}
        </div>)}

      <tabs_1.Tabs defaultValue="overview" className="space-y-4">
        <tabs_1.TabsList>
          <tabs_1.TabsTrigger value="overview">Overview</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="performance">Performance</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="audit">Audit Trail</tabs_1.TabsTrigger>
          <tabs_1.TabsTrigger value="alerts">Alerts</tabs_1.TabsTrigger>
        </tabs_1.TabsList>

        {/* Overview Tab */}
        <tabs_1.TabsContent value="overview" className="space-y-4">
          {/* System Health Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Memory Usage</card_1.CardTitle>
                <lucide_react_1.Monitor className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">{systemMetrics.memoryUsage.percentage.toFixed(1)}%</div>
                <progress_1.Progress value={systemMetrics.memoryUsage.percentage} className="mt-2"/>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatBytes(systemMetrics.memoryUsage.used)} / {formatBytes(systemMetrics.memoryUsage.total)}
                </p>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">CPU Usage</card_1.CardTitle>
                <lucide_react_1.Activity className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">{systemMetrics.cpuUsage.toFixed(1)}%</div>
                <progress_1.Progress value={systemMetrics.cpuUsage} className="mt-2"/>
                <p className="text-xs text-muted-foreground mt-2">
                  Current load
                </p>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Queue Size</card_1.CardTitle>
                <lucide_react_1.Database className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">{systemMetrics.queueSize}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Pending jobs
                </p>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <card_1.CardTitle className="text-sm font-medium">Active Users</card_1.CardTitle>
                <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">{businessMetrics.activeUsers}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Currently online
                </p>
              </card_1.CardContent>
            </card_1.Card>
          </div>

          {/* Business Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="text-sm font-medium">Today's Operations</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Imports</span>
                  <span className="font-medium">{businessMetrics.totalImportsToday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Exports</span>
                  <span className="font-medium">{businessMetrics.totalExportsToday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Records Processed</span>
                  <span className="font-medium">{businessMetrics.totalRecordsProcessed.toLocaleString()}</span>
                </div>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="text-sm font-medium">Quality Metrics</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Validation Rate</span>
                  <span className="font-medium">{businessMetrics.averageValidationRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Error Rate</span>
                  <span className="font-medium">{businessMetrics.errorRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg Processing Time</span>
                  <span className="font-medium">{formatDuration(businessMetrics.averageProcessingTime)}</span>
                </div>
              </card_1.CardContent>
            </card_1.Card>

            <card_1.Card>
              <card_1.CardHeader>
                <card_1.CardTitle className="text-sm font-medium">Performance Trends</card_1.CardTitle>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Throughput</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metricsSummary.performanceTrends.throughputTrend)}
                    <span className="text-sm">{metricsSummary.performanceTrends.throughputTrend}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Error Rate</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metricsSummary.performanceTrends.errorRateTrend)}
                    <span className="text-sm">{metricsSummary.performanceTrends.errorRateTrend}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Memory Usage</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metricsSummary.performanceTrends.memoryUsageTrend)}
                    <span className="text-sm">{metricsSummary.performanceTrends.memoryUsageTrend}</span>
                  </div>
                </div>
              </card_1.CardContent>
            </card_1.Card>
          </div>
        </tabs_1.TabsContent>

        {/* Performance Tab */}
        <tabs_1.TabsContent value="performance" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Performance Summary</card_1.CardTitle>
              <card_1.CardDescription>
                Last 24 hours performance metrics
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Total Operations</p>
                  <p className="text-2xl font-bold">{metricsSummary.totalOperations}</p>
                  <p className="text-xs text-muted-foreground">
                    {metricsSummary.successfulOperations} successful, {metricsSummary.failedOperations} failed
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Average Throughput</p>
                  <p className="text-2xl font-bold">{metricsSummary.averageThroughput}</p>
                  <p className="text-xs text-muted-foreground">records/second</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Peak Throughput</p>
                  <p className="text-2xl font-bold">{metricsSummary.peakThroughput}</p>
                  <p className="text-xs text-muted-foreground">records/second</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Error Count</p>
                  <p className="text-2xl font-bold">{metricsSummary.totalErrorCount}</p>
                  <p className="text-xs text-muted-foreground">total errors</p>
                </div>
              </div>
            </card_1.CardContent>
          </card_1.Card>

          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Most Common Errors</card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-2">
                {metricsSummary.mostCommonErrors.map((error, index) => (<div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{error.type.replace(/_/g, ' ')}</span>
                    <badge_1.Badge variant="secondary">{error.count}</badge_1.Badge>
                  </div>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        {/* Audit Trail Tab */}
        <tabs_1.TabsContent value="audit" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Recent Audit Events</card_1.CardTitle>
              <card_1.CardDescription>
                Latest audit trail entries for compliance tracking
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                {auditEvents.map((event) => (<div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {event.success ? (<lucide_react_1.CheckCircle className="h-4 w-4 text-green-500"/>) : (<lucide_react_1.XCircle className="h-4 w-4 text-red-500"/>)}
                        <badge_1.Badge variant={getSeverityColor(event.riskLevel)}>
                          {event.riskLevel}
                        </badge_1.Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{event.eventType.replace(/_/g, ' ')}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.userId} • {event.action} • {event.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button_1.Button variant="ghost" size="sm">
                      <lucide_react_1.Eye className="h-4 w-4"/>
                    </button_1.Button>
                  </div>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>

        {/* Alerts Tab */}
        <tabs_1.TabsContent value="alerts" className="space-y-4">
          <card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle>Alert Management</card_1.CardTitle>
              <card_1.CardDescription>
                Configure and manage system alerts
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (<div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <lucide_react_1.AlertTriangle className={`h-4 w-4 ${alert.severity === 'critical' ? 'text-red-500' :
                alert.severity === 'high' ? 'text-orange-500' :
                    alert.severity === 'medium' ? 'text-yellow-500' :
                        'text-blue-500'}`}/>
                      <div>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {alert.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <badge_1.Badge variant={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </badge_1.Badge>
                      {alert.acknowledged ? (<badge_1.Badge variant="secondary">Acknowledged</badge_1.Badge>) : (<button_1.Button variant="outline" size="sm" onClick={() => handleAcknowledgeAlert(alert.id)}>
                          Acknowledge
                        </button_1.Button>)}
                    </div>
                  </div>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </tabs_1.TabsContent>
      </tabs_1.Tabs>
    </div>);
}
//# sourceMappingURL=monitoring-dashboard.js.map