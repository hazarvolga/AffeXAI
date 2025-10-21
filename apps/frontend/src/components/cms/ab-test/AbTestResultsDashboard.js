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
exports.default = AbTestResultsDashboard;
const react_1 = __importStar(require("react"));
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const progress_1 = require("@/components/ui/progress");
const skeleton_1 = require("@/components/ui/skeleton");
const alert_1 = require("@/components/ui/alert");
const dialog_1 = require("@/components/ui/dialog");
const use_toast_1 = require("@/components/ui/use-toast");
const recharts_1 = require("recharts");
const lucide_react_1 = require("lucide-react");
const VARIANT_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#ec4899'];
const TEST_TYPE_LABELS = {
    subject: 'Subject Line',
    content: 'Email Content',
    send_time: 'Send Time',
    from_name: 'From Name',
    combined: 'Combined Test',
};
const WINNER_CRITERIA_LABELS = {
    open_rate: 'Open Rate',
    click_rate: 'Click Rate',
    conversion_rate: 'Conversion Rate',
    revenue: 'Revenue',
};
function AbTestResultsDashboard({ campaignId, autoRefresh = true, refreshInterval = 30000, // 30 seconds
 }) {
    const router = (0, navigation_1.useRouter)();
    const [results, setResults] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [refreshing, setRefreshing] = (0, react_1.useState)(false);
    const [showWinnerDialog, setShowWinnerDialog] = (0, react_1.useState)(false);
    const [selectedWinnerVariantId, setSelectedWinnerVariantId] = (0, react_1.useState)(null);
    const [isSelectingWinner, setIsSelectingWinner] = (0, react_1.useState)(false);
    // Fetch results
    const fetchResults = async (isRefresh = false) => {
        if (isRefresh) {
            setRefreshing(true);
        }
        else {
            setLoading(true);
        }
        try {
            const response = await fetch(`/api/email-marketing/ab-test/${campaignId}/results`);
            if (!response.ok) {
                throw new Error('Failed to fetch A/B test results');
            }
            const data = await response.json();
            setResults(data);
        }
        catch (error) {
            console.error('Error fetching results:', error);
            (0, use_toast_1.toast)({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to load A/B test results',
            });
        }
        finally {
            setLoading(false);
            setRefreshing(false);
        }
    };
    // Initial load
    (0, react_1.useEffect)(() => {
        fetchResults();
    }, [campaignId]);
    // Auto-refresh for active tests
    (0, react_1.useEffect)(() => {
        if (!autoRefresh || !results || results.campaign.testStatus !== 'testing') {
            return;
        }
        const interval = setInterval(() => {
            fetchResults(true);
        }, refreshInterval);
        return () => clearInterval(interval);
    }, [autoRefresh, refreshInterval, results?.campaign.testStatus]);
    // Select winner
    const handleSelectWinner = async () => {
        if (!selectedWinnerVariantId)
            return;
        setIsSelectingWinner(true);
        try {
            const response = await fetch(`/api/email-marketing/ab-test/${campaignId}/select-winner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ variantId: selectedWinnerVariantId }),
            });
            if (!response.ok) {
                throw new Error('Failed to select winner');
            }
            (0, use_toast_1.toast)({
                title: 'Winner Selected',
                description: 'The winning variant has been applied to the campaign',
            });
            setShowWinnerDialog(false);
            fetchResults();
        }
        catch (error) {
            console.error('Error selecting winner:', error);
            (0, use_toast_1.toast)({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to select winner',
            });
        }
        finally {
            setIsSelectingWinner(false);
        }
    };
    // Export results
    const handleExport = () => {
        if (!results)
            return;
        const csvData = [
            ['Variant', 'Subject', 'Sent', 'Opened', 'Clicked', 'Converted', 'Revenue', 'Open Rate', 'Click Rate', 'Conversion Rate'],
            ...results.variants.map((v) => [
                v.label,
                v.subject,
                v.sentCount,
                v.openedCount,
                v.clickedCount,
                v.conversionCount,
                v.revenue,
                `${(v.openRate * 100).toFixed(2)}%`,
                `${(v.clickRate * 100).toFixed(2)}%`,
                `${(v.conversionRate * 100).toFixed(2)}%`,
            ]),
        ];
        const csv = csvData.map((row) => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ab-test-results-${campaignId}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };
    // Calculate time remaining
    const getTimeRemaining = () => {
        if (!results)
            return null;
        const createdAt = new Date(results.campaign.createdAt);
        const endTime = new Date(createdAt.getTime() + results.campaign.testDuration * 60 * 60 * 1000);
        const now = new Date();
        const remaining = endTime.getTime() - now.getTime();
        if (remaining <= 0)
            return 'Completed';
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };
    // Prepare chart data
    const getChartData = () => {
        if (!results)
            return [];
        return results.variants.map((v, index) => ({
            name: `Variant ${v.label}`,
            openRate: (v.openRate * 100).toFixed(2),
            clickRate: (v.clickRate * 100).toFixed(2),
            conversionRate: (v.conversionRate * 100).toFixed(2),
            color: VARIANT_COLORS[index],
        }));
    };
    // Prepare confidence interval data
    const getConfidenceIntervalData = () => {
        if (!results)
            return [];
        return results.confidenceIntervals.map((ci, index) => ({
            name: `Variant ${ci.variantLabel}`,
            rate: ci.rate * 100,
            lower: ci.lower * 100,
            upper: ci.upper * 100,
            color: VARIANT_COLORS[index],
        }));
    };
    // Prepare pie chart data
    const getPieChartData = () => {
        if (!results)
            return [];
        return results.variants.map((v, index) => ({
            name: `Variant ${v.label}`,
            value: v.splitPercentage,
            color: VARIANT_COLORS[index],
        }));
    };
    if (loading) {
        return (<div className="space-y-6">
        <skeleton_1.Skeleton className="h-32 w-full"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <skeleton_1.Skeleton className="h-64"/>
          <skeleton_1.Skeleton className="h-64"/>
          <skeleton_1.Skeleton className="h-64"/>
        </div>
      </div>);
    }
    if (!results) {
        return (<alert_1.Alert variant="destructive">
        <lucide_react_1.AlertTriangle className="h-4 w-4"/>
        <alert_1.AlertDescription>Failed to load A/B test results</alert_1.AlertDescription>
      </alert_1.Alert>);
    }
    const winner = results.variants.find((v) => v.id === results.campaign.selectedWinnerId);
    const timeRemaining = getTimeRemaining();
    return (<div className="space-y-6">
      {/* Header */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <card_1.CardTitle className="text-2xl">{results.campaign.name}</card_1.CardTitle>
              <card_1.CardDescription className="mt-2 flex items-center gap-4">
                <span>
                  {TEST_TYPE_LABELS[results.campaign.testType]} |{' '}
                  {WINNER_CRITERIA_LABELS[results.campaign.winnerCriteria]}
                </span>
                <badge_1.Badge variant={results.campaign.testStatus === 'completed'
            ? 'default'
            : results.campaign.testStatus === 'testing'
                ? 'secondary'
                : 'outline'}>
                  {results.campaign.testStatus.toUpperCase()}
                </badge_1.Badge>
              </card_1.CardDescription>
            </div>
            <div className="flex gap-2">
              <button_1.Button variant="outline" size="sm" onClick={() => fetchResults(true)} disabled={refreshing}>
                <lucide_react_1.RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}/>
              </button_1.Button>
              <button_1.Button variant="outline" size="sm" onClick={handleExport}>
                <lucide_react_1.Download className="h-4 w-4 mr-2"/>
                Export
              </button_1.Button>
            </div>
          </div>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <lucide_react_1.Clock className="h-8 w-8 text-muted-foreground"/>
              <div>
                <p className="text-sm text-muted-foreground">Time Remaining</p>
                <p className="text-lg font-semibold">{timeRemaining}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <lucide_react_1.Users className="h-8 w-8 text-muted-foreground"/>
              <div>
                <p className="text-sm text-muted-foreground">Total Sent</p>
                <p className="text-lg font-semibold">
                  {results.variants.reduce((sum, v) => sum + v.sentCount, 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <lucide_react_1.TrendingUp className="h-8 w-8 text-muted-foreground"/>
              <div>
                <p className="text-sm text-muted-foreground">Confidence Level</p>
                <p className="text-lg font-semibold">{results.campaign.confidenceLevel}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <lucide_react_1.Trophy className="h-8 w-8 text-muted-foreground"/>
              <div>
                <p className="text-sm text-muted-foreground">Winner</p>
                <p className="text-lg font-semibold">
                  {winner ? `Variant ${winner.label}` : 'Not Selected'}
                </p>
              </div>
            </div>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Statistical Significance */}
      {results.statistics && (<alert_1.Alert variant={results.statistics.isSignificant ? 'default' : 'destructive'}>
          {results.statistics.isSignificant ? (<lucide_react_1.CheckCircle2 className="h-4 w-4"/>) : (<lucide_react_1.AlertTriangle className="h-4 w-4"/>)}
          <alert_1.AlertDescription>
            {results.statistics.isSignificant ? (<>
                <strong>Statistically Significant!</strong> Chi-square: {results.statistics.chiSquare.toFixed(2)}, 
                p-value: {results.statistics.pValue.toFixed(4)} (threshold: {(1 - results.campaign.confidenceLevel / 100).toFixed(4)})
              </>) : (<>
                <strong>Not Statistically Significant</strong> - Chi-square: {results.statistics.chiSquare.toFixed(2)}, 
                p-value: {results.statistics.pValue.toFixed(4)} (needs &lt; {(1 - results.campaign.confidenceLevel / 100).toFixed(4)})
              </>)}
          </alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Variant Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.variants.map((variant, index) => {
            const isWinner = variant.id === results.campaign.selectedWinnerId;
            const isLoser = variant.status === 'loser';
            return (<card_1.Card key={variant.id} className={`border-l-4 ${isWinner ? 'border-l-green-500' : isLoser ? 'border-l-red-500' : ''}`} style={{ borderLeftColor: isWinner ? undefined : isLoser ? undefined : VARIANT_COLORS[index] }}>
              <card_1.CardHeader>
                <div className="flex items-center justify-between">
                  <badge_1.Badge style={{ backgroundColor: VARIANT_COLORS[index] }}>
                    Variant {variant.label}
                  </badge_1.Badge>
                  {isWinner && (<badge_1.Badge variant="default" className="bg-green-500">
                      <lucide_react_1.Trophy className="h-3 w-3 mr-1"/>
                      Winner
                    </badge_1.Badge>)}
                  {isLoser && (<badge_1.Badge variant="destructive">
                      <lucide_react_1.XCircle className="h-3 w-3 mr-1"/>
                      Loser
                    </badge_1.Badge>)}
                </div>
                <card_1.CardTitle className="text-base mt-2">{variant.subject}</card_1.CardTitle>
                <card_1.CardDescription>{variant.splitPercentage}% traffic split</card_1.CardDescription>
              </card_1.CardHeader>
              <card_1.CardContent className="space-y-3">
                {/* Counts */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Sent</p>
                    <p className="font-semibold">{variant.sentCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Opened</p>
                    <p className="font-semibold">{variant.openedCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Clicked</p>
                    <p className="font-semibold">{variant.clickedCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Converted</p>
                    <p className="font-semibold">{variant.conversionCount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Rates */}
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Open Rate</span>
                      <span className="font-semibold">{(variant.openRate * 100).toFixed(2)}%</span>
                    </div>
                    <progress_1.Progress value={variant.openRate * 100} className="h-2"/>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Click Rate</span>
                      <span className="font-semibold">{(variant.clickRate * 100).toFixed(2)}%</span>
                    </div>
                    <progress_1.Progress value={variant.clickRate * 100} className="h-2"/>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Conversion Rate</span>
                      <span className="font-semibold">{(variant.conversionRate * 100).toFixed(2)}%</span>
                    </div>
                    <progress_1.Progress value={variant.conversionRate * 100} className="h-2"/>
                  </div>
                </div>

                {/* Sample Size Check */}
                {variant.sentCount < results.campaign.minSampleSize && (<alert_1.Alert variant="destructive" className="py-2">
                    <lucide_react_1.AlertTriangle className="h-3 w-3"/>
                    <alert_1.AlertDescription className="text-xs">
                      Need {results.campaign.minSampleSize - variant.sentCount} more samples
                    </alert_1.AlertDescription>
                  </alert_1.Alert>)}
              </card_1.CardContent>
            </card_1.Card>);
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rate Comparison */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Rate Comparison</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <recharts_1.ResponsiveContainer width="100%" height={300}>
              <recharts_1.BarChart data={getChartData()}>
                <recharts_1.CartesianGrid strokeDasharray="3 3"/>
                <recharts_1.XAxis dataKey="name"/>
                <recharts_1.YAxis />
                <recharts_1.Tooltip />
                <recharts_1.Legend />
                <recharts_1.Bar dataKey="openRate" fill="#3b82f6" name="Open Rate %"/>
                <recharts_1.Bar dataKey="clickRate" fill="#10b981" name="Click Rate %"/>
                <recharts_1.Bar dataKey="conversionRate" fill="#8b5cf6" name="Conversion Rate %"/>
              </recharts_1.BarChart>
            </recharts_1.ResponsiveContainer>
          </card_1.CardContent>
        </card_1.Card>

        {/* Confidence Intervals */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Confidence Intervals ({results.campaign.confidenceLevel}%)</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <recharts_1.ResponsiveContainer width="100%" height={300}>
              <recharts_1.LineChart data={getConfidenceIntervalData()}>
                <recharts_1.CartesianGrid strokeDasharray="3 3"/>
                <recharts_1.XAxis dataKey="name"/>
                <recharts_1.YAxis />
                <recharts_1.Tooltip />
                <recharts_1.Legend />
                <recharts_1.Line type="monotone" dataKey="rate" stroke="#3b82f6" name="Rate %" strokeWidth={2}/>
                <recharts_1.Line type="monotone" dataKey="lower" stroke="#ef4444" name="Lower Bound" strokeDasharray="5 5"/>
                <recharts_1.Line type="monotone" dataKey="upper" stroke="#10b981" name="Upper Bound" strokeDasharray="5 5"/>
              </recharts_1.LineChart>
            </recharts_1.ResponsiveContainer>
          </card_1.CardContent>
        </card_1.Card>

        {/* Traffic Distribution */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Traffic Distribution</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent>
            <recharts_1.ResponsiveContainer width="100%" height={300}>
              <recharts_1.PieChart>
                <recharts_1.Pie data={getPieChartData()} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {getPieChartData().map((entry, index) => (<recharts_1.Cell key={`cell-${index}`} fill={entry.color}/>))}
                </recharts_1.Pie>
                <recharts_1.Tooltip />
              </recharts_1.PieChart>
            </recharts_1.ResponsiveContainer>
          </card_1.CardContent>
        </card_1.Card>

        {/* Sample Sizes */}
        <card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Sample Size Progress</card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-3">
            {results.variants.map((variant, index) => (<div key={variant.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span>Variant {variant.label}</span>
                  <span className="font-semibold">
                    {variant.sentCount} / {results.campaign.minSampleSize}
                  </span>
                </div>
                <progress_1.Progress value={(variant.sentCount / results.campaign.minSampleSize) * 100} className="h-2" style={{
                // @ts-ignore
                '--progress-background': VARIANT_COLORS[index]
            }}/>
              </div>))}
          </card_1.CardContent>
        </card_1.Card>
      </div>

      {/* Actions */}
      {results.campaign.testStatus === 'testing' &&
            !results.campaign.selectedWinnerId &&
            results.canDeclareWinner && (<card_1.Card>
            <card_1.CardHeader>
              <card_1.CardTitle className="flex items-center gap-2">
                <lucide_react_1.Trophy className="h-5 w-5 text-yellow-500"/>
                Ready to Declare Winner
              </card_1.CardTitle>
              <card_1.CardDescription>
                The test has reached statistical significance. You can now select a winner.
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="flex gap-2">
                {results.variants.map((variant, index) => (<button_1.Button key={variant.id} variant={variant.id === results.recommendedWinner ? 'default' : 'outline'} onClick={() => {
                    setSelectedWinnerVariantId(variant.id);
                    setShowWinnerDialog(true);
                }}>
                    {variant.id === results.recommendedWinner && (<lucide_react_1.Trophy className="h-4 w-4 mr-2"/>)}
                    Select Variant {variant.label}
                  </button_1.Button>))}
              </div>
            </card_1.CardContent>
          </card_1.Card>)}

      {/* Winner Dialog */}
      <dialog_1.Dialog open={showWinnerDialog} onOpenChange={setShowWinnerDialog}>
        <dialog_1.DialogContent>
          <dialog_1.DialogHeader>
            <dialog_1.DialogTitle>Confirm Winner Selection</dialog_1.DialogTitle>
            <dialog_1.DialogDescription>
              Are you sure you want to select this variant as the winner? This will update the
              campaign with the winning variant's content.
            </dialog_1.DialogDescription>
          </dialog_1.DialogHeader>
          {selectedWinnerVariantId && (<div className="py-4">
              {results.variants
                .filter((v) => v.id === selectedWinnerVariantId)
                .map((variant) => (<card_1.Card key={variant.id}>
                    <card_1.CardHeader>
                      <badge_1.Badge style={{ backgroundColor: VARIANT_COLORS[results.variants.indexOf(variant)] }}>
                        Variant {variant.label}
                      </badge_1.Badge>
                      <card_1.CardTitle className="text-base mt-2">{variant.subject}</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="text-sm space-y-1">
                      <p>Open Rate: {(variant.openRate * 100).toFixed(2)}%</p>
                      <p>Click Rate: {(variant.clickRate * 100).toFixed(2)}%</p>
                      <p>Conversion Rate: {(variant.conversionRate * 100).toFixed(2)}%</p>
                    </card_1.CardContent>
                  </card_1.Card>))}
            </div>)}
          <dialog_1.DialogFooter>
            <button_1.Button variant="outline" onClick={() => setShowWinnerDialog(false)}>
              Cancel
            </button_1.Button>
            <button_1.Button onClick={handleSelectWinner} disabled={isSelectingWinner}>
              {isSelectingWinner && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
              Confirm Winner
            </button_1.Button>
          </dialog_1.DialogFooter>
        </dialog_1.DialogContent>
      </dialog_1.Dialog>
    </div>);
}
//# sourceMappingURL=AbTestResultsDashboard.js.map