"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationAnalytics = AutomationAnalytics;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const select_1 = require("@/components/ui/select");
const table_1 = require("@/components/ui/table");
const lucide_react_1 = require("lucide-react");
const recharts_1 = require("recharts");
const utils_1 = require("@/lib/utils");
// Mock data - in production, fetch from API
const mockOverviewStats = {
    totalExecutions: 1247,
    successRate: 87.5,
    avgCompletionTime: '2h 15m',
    activeSubscribers: 892,
    trend: {
        executions: +12.3,
        successRate: +2.1,
        completionTime: -8.5,
        subscribers: +5.7,
    },
};
const mockTimelineData = [
    { date: 'Jan 1', executions: 42, successful: 38, failed: 4 },
    { date: 'Jan 5', executions: 58, successful: 52, failed: 6 },
    { date: 'Jan 10', executions: 73, successful: 65, failed: 8 },
    { date: 'Jan 15', executions: 65, successful: 59, failed: 6 },
    { date: 'Jan 20', executions: 81, successful: 72, failed: 9 },
    { date: 'Jan 25', executions: 95, successful: 84, failed: 11 },
    { date: 'Jan 30', executions: 108, successful: 96, failed: 12 },
];
const mockStepPerformance = [
    {
        stepName: 'Welcome Email',
        type: 'email',
        sent: 1247,
        opened: 892,
        clicked: 456,
        openRate: 71.5,
        clickRate: 36.6,
        status: 'active',
    },
    {
        stepName: 'Wait 2 Days',
        type: 'delay',
        entered: 1247,
        completed: 1180,
        completionRate: 94.6,
        avgWaitTime: '2d 3h',
        status: 'active',
    },
    {
        stepName: 'Check Engagement',
        type: 'condition',
        entered: 1180,
        trueBranch: 456,
        falseBranch: 724,
        truePercent: 38.6,
        falsePercent: 61.4,
        status: 'active',
    },
    {
        stepName: 'Follow-up Email',
        type: 'email',
        sent: 724,
        opened: 512,
        clicked: 203,
        openRate: 70.7,
        clickRate: 28.0,
        status: 'active',
    },
];
function AutomationAnalytics({ automationId, className, }) {
    const [dateRange, setDateRange] = (0, react_1.useState)('30d');
    const [isRefreshing, setIsRefreshing] = (0, react_1.useState)(false);
    const handleRefresh = () => {
        setIsRefreshing(true);
        // Simulate API call
        setTimeout(() => setIsRefreshing(false), 1000);
    };
    const handleExport = () => {
        // Export analytics data as CSV
        console.log('Exporting analytics for automation:', automationId);
    };
    const getTrendIcon = (trend) => {
        return trend > 0 ? '↑' : trend < 0 ? '↓' : '→';
    };
    const getTrendColor = (trend, inverse = false) => {
        if (inverse) {
            return trend < 0 ? 'text-green-600' : trend > 0 ? 'text-red-600' : 'text-gray-600';
        }
        return trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600';
    };
    return (<div className={(0, utils_1.cn)('space-y-6', className)}>
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track your automation performance and subscriber engagement
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select_1.Select value={dateRange} onValueChange={setDateRange}>
            <select_1.SelectTrigger className="w-[140px]">
              <lucide_react_1.Calendar className="h-4 w-4 mr-2"/>
              <select_1.SelectValue />
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="7d">Last 7 days</select_1.SelectItem>
              <select_1.SelectItem value="30d">Last 30 days</select_1.SelectItem>
              <select_1.SelectItem value="90d">Last 90 days</select_1.SelectItem>
              <select_1.SelectItem value="1y">Last year</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
          <button_1.Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <lucide_react_1.RefreshCw className={(0, utils_1.cn)('h-4 w-4 mr-2', isRefreshing && 'animate-spin')}/>
            Refresh
          </button_1.Button>
          <button_1.Button variant="outline" size="sm" onClick={handleExport}>
            <lucide_react_1.Download className="h-4 w-4 mr-2"/>
            Export
          </button_1.Button>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Executions */}
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Total Executions</card_1.CardTitle>
            <lucide_react_1.Activity className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">
              {mockOverviewStats.totalExecutions.toLocaleString()}
            </div>
            <p className={(0, utils_1.cn)('text-xs', getTrendColor(mockOverviewStats.trend.executions))}>
              {getTrendIcon(mockOverviewStats.trend.executions)}{' '}
              {Math.abs(mockOverviewStats.trend.executions)}% from last period
            </p>
          </card_1.CardContent>
        </card_1.Card>

        {/* Success Rate */}
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Success Rate</card_1.CardTitle>
            <lucide_react_1.TrendingUp className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{mockOverviewStats.successRate}%</div>
            <p className={(0, utils_1.cn)('text-xs', getTrendColor(mockOverviewStats.trend.successRate))}>
              {getTrendIcon(mockOverviewStats.trend.successRate)}{' '}
              {Math.abs(mockOverviewStats.trend.successRate)}% from last period
            </p>
          </card_1.CardContent>
        </card_1.Card>

        {/* Avg Completion Time */}
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Avg Completion Time</card_1.CardTitle>
            <lucide_react_1.Clock className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">{mockOverviewStats.avgCompletionTime}</div>
            <p className={(0, utils_1.cn)('text-xs', getTrendColor(mockOverviewStats.trend.completionTime, true))}>
              {getTrendIcon(mockOverviewStats.trend.completionTime)}{' '}
              {Math.abs(mockOverviewStats.trend.completionTime)}% from last period
            </p>
          </card_1.CardContent>
        </card_1.Card>

        {/* Active Subscribers */}
        <card_1.Card>
          <card_1.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <card_1.CardTitle className="text-sm font-medium">Active Subscribers</card_1.CardTitle>
            <lucide_react_1.Users className="h-4 w-4 text-muted-foreground"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="text-2xl font-bold">
              {mockOverviewStats.activeSubscribers.toLocaleString()}
            </div>
            <p className={(0, utils_1.cn)('text-xs', getTrendColor(mockOverviewStats.trend.subscribers))}>
              {getTrendIcon(mockOverviewStats.trend.subscribers)}{' '}
              {Math.abs(mockOverviewStats.trend.subscribers)}% from last period
            </p>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Timeline Chart */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Execution Timeline</card_1.CardTitle>
          <card_1.CardDescription>
            Daily automation executions over the selected period
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <recharts_1.ResponsiveContainer width="100%" height={300}>
            <recharts_1.AreaChart data={mockTimelineData}>
              <defs>
                <linearGradient id="colorExecutions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSuccessful" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <recharts_1.CartesianGrid strokeDasharray="3 3"/>
              <recharts_1.XAxis dataKey="date"/>
              <recharts_1.YAxis />
              <recharts_1.Tooltip />
              <recharts_1.Legend />
              <recharts_1.Area type="monotone" dataKey="executions" stroke="#3b82f6" fillOpacity={1} fill="url(#colorExecutions)" name="Total Executions"/>
              <recharts_1.Area type="monotone" dataKey="successful" stroke="#10b981" fillOpacity={1} fill="url(#colorSuccessful)" name="Successful"/>
            </recharts_1.AreaChart>
          </recharts_1.ResponsiveContainer>
        </card_1.CardContent>
      </card_1.Card>

      {/* Step Performance Table */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle>Step Performance</card_1.CardTitle>
          <card_1.CardDescription>
            Detailed metrics for each step in your automation workflow
          </card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <table_1.Table>
            <table_1.TableHeader>
              <table_1.TableRow>
                <table_1.TableHead>Step Name</table_1.TableHead>
                <table_1.TableHead>Type</table_1.TableHead>
                <table_1.TableHead className="text-right">Metrics</table_1.TableHead>
                <table_1.TableHead className="text-right">Performance</table_1.TableHead>
                <table_1.TableHead>Status</table_1.TableHead>
              </table_1.TableRow>
            </table_1.TableHeader>
            <table_1.TableBody>
              {mockStepPerformance.map((step, index) => (<table_1.TableRow key={index}>
                  <table_1.TableCell className="font-medium">{step.stepName}</table_1.TableCell>
                  <table_1.TableCell>
                    <badge_1.Badge variant="outline" className="capitalize">
                      {step.type}
                    </badge_1.Badge>
                  </table_1.TableCell>
                  <table_1.TableCell className="text-right text-sm">
                    {step.type === 'email' && (<div className="space-y-1">
                        <div>Sent: {step.sent?.toLocaleString()}</div>
                        <div>Opened: {step.opened?.toLocaleString()}</div>
                        <div>Clicked: {step.clicked?.toLocaleString()}</div>
                      </div>)}
                    {step.type === 'delay' && (<div className="space-y-1">
                        <div>Entered: {step.entered?.toLocaleString()}</div>
                        <div>Completed: {step.completed?.toLocaleString()}</div>
                        <div>Avg: {step.avgWaitTime}</div>
                      </div>)}
                    {step.type === 'condition' && (<div className="space-y-1">
                        <div>Entered: {step.entered?.toLocaleString()}</div>
                        <div>True: {step.trueBranch?.toLocaleString()}</div>
                        <div>False: {step.falseBranch?.toLocaleString()}</div>
                      </div>)}
                  </table_1.TableCell>
                  <table_1.TableCell className="text-right">
                    {step.type === 'email' && (<div className="space-y-1">
                        <div className="text-green-600 font-medium">
                          Open: {step.openRate}%
                        </div>
                        <div className="text-blue-600 font-medium">
                          Click: {step.clickRate}%
                        </div>
                      </div>)}
                    {step.type === 'delay' && (<div className="text-green-600 font-medium">
                        {step.completionRate}%
                      </div>)}
                    {step.type === 'condition' && (<div className="space-y-1">
                        <div className="text-green-600 font-medium">
                          True: {step.truePercent}%
                        </div>
                        <div className="text-amber-600 font-medium">
                          False: {step.falsePercent}%
                        </div>
                      </div>)}
                  </table_1.TableCell>
                  <table_1.TableCell>
                    <badge_1.Badge variant={step.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                      {step.status}
                    </badge_1.Badge>
                  </table_1.TableCell>
                </table_1.TableRow>))}
            </table_1.TableBody>
          </table_1.Table>
        </card_1.CardContent>
      </card_1.Card>

      {/* Additional Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Conversion Funnel */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Conversion Funnel</card_1.CardTitle>
            <card_1.CardDescription>Subscriber journey through automation</card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Started Workflow</span>
                <span className="font-medium">1,247 (100%)</span>
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '100%' }}/>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Opened First Email</span>
                <span className="font-medium">892 (71.5%)</span>
              </div>
              <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '71.5%' }}/>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Clicked Link</span>
                <span className="font-medium">456 (36.6%)</span>
              </div>
              <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: '36.6%' }}/>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Completed Workflow</span>
                <span className="font-medium">203 (16.3%)</span>
              </div>
              <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: '16.3%' }}/>
              </div>
            </div>
          </card_1.CardContent>
        </card_1.Card>

        {/* Top Performing Times */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Best Send Times</card_1.CardTitle>
            <card_1.CardDescription>When subscribers are most engaged</card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Tuesday, 10:00 AM</span>
              <badge_1.Badge variant="default">73% open rate</badge_1.Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Thursday, 2:00 PM</span>
              <badge_1.Badge variant="default">71% open rate</badge_1.Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Wednesday, 9:00 AM</span>
              <badge_1.Badge variant="default">69% open rate</badge_1.Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Monday, 11:00 AM</span>
              <badge_1.Badge variant="secondary">65% open rate</badge_1.Badge>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>
    </div>);
}
//# sourceMappingURL=automation-analytics.js.map