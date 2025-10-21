"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportProgressTracker = ImportProgressTracker;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const progress_1 = require("@/components/ui/progress");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const shared_types_1 = require("@affexai/shared-types");
const bulkImportService_1 = __importDefault(require("@/lib/api/bulkImportService"));
function ImportProgressTracker({ jobId, onComplete, onError, autoRefresh = true, refreshInterval = 2000 }) {
    const [job, setJob] = (0, react_1.useState)(null);
    const [stats, setStats] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [lastUpdate, setLastUpdate] = (0, react_1.useState)(null);
    const [processingRate, setProcessingRate] = (0, react_1.useState)(0);
    const calculateStats = (0, react_1.useCallback)((currentJob) => {
        const processed = currentJob.processedRecords;
        const total = currentJob.totalRecords;
        const percentage = total > 0 ? (processed / total) * 100 : 0;
        // Calculate processing rate (records per second)
        let rate = 0;
        let estimatedTimeRemaining = 0;
        if (lastUpdate && job) {
            const timeDiff = (new Date().getTime() - lastUpdate.getTime()) / 1000;
            const recordsDiff = processed - job.processedRecords;
            if (timeDiff > 0) {
                rate = recordsDiff / timeDiff;
                setProcessingRate(rate);
            }
        }
        if (rate > 0 && processed < total) {
            estimatedTimeRemaining = (total - processed) / rate;
        }
        return {
            processed,
            total,
            valid: currentJob.validRecords,
            invalid: currentJob.invalidRecords,
            risky: currentJob.riskyRecords,
            duplicates: currentJob.duplicateRecords,
            percentage,
            rate: processingRate,
            estimatedTimeRemaining
        };
    }, [job, lastUpdate, processingRate]);
    const fetchJobStatus = (0, react_1.useCallback)(async () => {
        try {
            setError(null);
            const updatedJob = await bulkImportService_1.default.getImportStatus(jobId);
            setJob(prevJob => {
                setLastUpdate(new Date());
                return updatedJob;
            });
            const newStats = calculateStats(updatedJob);
            setStats(newStats);
            // Handle job completion or failure
            if (updatedJob.status === shared_types_1.ImportJobStatus.COMPLETED) {
                onComplete?.(updatedJob);
            }
            else if (updatedJob.status === shared_types_1.ImportJobStatus.FAILED) {
                const errorMsg = updatedJob.error || 'Import job failed';
                setError(errorMsg);
                onError?.(errorMsg);
            }
        }
        catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to fetch job status';
            setError(errorMsg);
            onError?.(errorMsg);
        }
        finally {
            setIsLoading(false);
        }
    }, [jobId, calculateStats, onComplete, onError]);
    // Auto-refresh effect
    (0, react_1.useEffect)(() => {
        if (!autoRefresh || !job || job.status === shared_types_1.ImportJobStatus.COMPLETED || job.status === shared_types_1.ImportJobStatus.FAILED) {
            return;
        }
        const interval = setInterval(fetchJobStatus, refreshInterval);
        return () => clearInterval(interval);
    }, [autoRefresh, refreshInterval, fetchJobStatus, job]);
    // Initial fetch
    (0, react_1.useEffect)(() => {
        fetchJobStatus();
    }, [fetchJobStatus]);
    const formatTime = (seconds) => {
        if (seconds < 60)
            return `${Math.round(seconds)}s`;
        if (seconds < 3600)
            return `${Math.round(seconds / 60)}m`;
        return `${Math.round(seconds / 3600)}h`;
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case shared_types_1.ImportJobStatus.COMPLETED:
                return <lucide_react_1.CheckCircle className="h-5 w-5 text-green-500"/>;
            case shared_types_1.ImportJobStatus.FAILED:
                return <lucide_react_1.XCircle className="h-5 w-5 text-red-500"/>;
            case shared_types_1.ImportJobStatus.PROCESSING:
                return <lucide_react_1.RefreshCw className="h-5 w-5 text-blue-500 animate-spin"/>;
            default:
                return <lucide_react_1.Clock className="h-5 w-5 text-yellow-500"/>;
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case shared_types_1.ImportJobStatus.COMPLETED:
                return 'bg-green-100 text-green-800 border-green-200';
            case shared_types_1.ImportJobStatus.FAILED:
                return 'bg-red-100 text-red-800 border-red-200';
            case shared_types_1.ImportJobStatus.PROCESSING:
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };
    if (isLoading && !job) {
        return (<card_1.Card>
        <card_1.CardContent className="flex items-center justify-center py-8">
          <lucide_react_1.RefreshCw className="h-6 w-6 animate-spin mr-2"/>
          <span>Loading import status...</span>
        </card_1.CardContent>
      </card_1.Card>);
    }
    if (!job) {
        return (<alert_1.Alert variant="destructive">
        <lucide_react_1.AlertCircle className="h-4 w-4"/>
        <alert_1.AlertDescription>Failed to load import job information.</alert_1.AlertDescription>
      </alert_1.Alert>);
    }
    return (<div className="space-y-6">
      {/* Status Header */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(job.status)}
              <div>
                <card_1.CardTitle className="text-lg">{job.fileName}</card_1.CardTitle>
                <card_1.CardDescription>
                  Import Job • Started {new Date(job.createdAt).toLocaleString()}
                </card_1.CardDescription>
              </div>
            </div>
            <badge_1.Badge className={(0, utils_1.cn)('border', getStatusColor(job.status))}>
              {job.status.toUpperCase()}
            </badge_1.Badge>
          </div>
        </card_1.CardHeader>
      </card_1.Card>

      {/* Progress Overview */}
      {stats && (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle className="flex items-center gap-2">
              <lucide_react_1.Activity className="h-5 w-5"/>
              Processing Progress
            </card_1.CardTitle>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">
                {stats.processed.toLocaleString()} / {stats.total.toLocaleString()} records
              </span>
            </div>
            
            <progress_1.Progress value={stats.percentage} className="h-3"/>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{stats.percentage.toFixed(1)}% complete</span>
              {job.status === shared_types_1.ImportJobStatus.PROCESSING && stats.rate > 0 && (<span className="flex items-center gap-1">
                  <lucide_react_1.Zap className="h-3 w-3"/>
                  {stats.rate.toFixed(0)} records/sec
                </span>)}
            </div>

            {job.status === shared_types_1.ImportJobStatus.PROCESSING && stats.estimatedTimeRemaining > 0 && (<div className="text-sm text-muted-foreground text-center">
                Estimated time remaining: {formatTime(stats.estimatedTimeRemaining)}
              </div>)}
          </card_1.CardContent>
        </card_1.Card>)}

      {/* Validation Results */}
      {stats && (<card_1.Card>
          <card_1.CardHeader>
            <card_1.CardTitle>Validation Results</card_1.CardTitle>
            <card_1.CardDescription>
              Email validation breakdown and statistics
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <lucide_react_1.CheckCircle className="h-4 w-4 text-green-600"/>
                  <span className="text-sm font-medium text-green-700">Valid</span>
                </div>
                <div className="text-2xl font-bold text-green-600">{stats.valid.toLocaleString()}</div>
                <div className="text-xs text-green-600">
                  {stats.total > 0 ? ((stats.valid / stats.total) * 100).toFixed(1) : 0}%
                </div>
              </div>

              <div className="text-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <lucide_react_1.AlertCircle className="h-4 w-4 text-yellow-600"/>
                  <span className="text-sm font-medium text-yellow-700">Risky</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600">{stats.risky.toLocaleString()}</div>
                <div className="text-xs text-yellow-600">
                  {stats.total > 0 ? ((stats.risky / stats.total) * 100).toFixed(1) : 0}%
                </div>
              </div>

              <div className="text-center p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <lucide_react_1.XCircle className="h-4 w-4 text-red-600"/>
                  <span className="text-sm font-medium text-red-700">Invalid</span>
                </div>
                <div className="text-2xl font-bold text-red-600">{stats.invalid.toLocaleString()}</div>
                <div className="text-xs text-red-600">
                  {stats.total > 0 ? ((stats.invalid / stats.total) * 100).toFixed(1) : 0}%
                </div>
              </div>

              <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <lucide_react_1.TrendingUp className="h-4 w-4 text-blue-600"/>
                  <span className="text-sm font-medium text-blue-700">Duplicates</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{stats.duplicates.toLocaleString()}</div>
                <div className="text-xs text-blue-600">
                  {stats.total > 0 ? ((stats.duplicates / stats.total) * 100).toFixed(1) : 0}%
                </div>
              </div>
            </div>

            {/* Quality Score */}
            {stats.total > 0 && (<div className="mt-6 p-4 rounded-lg bg-gray-50 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Quality Score</span>
                  <div className="flex items-center gap-1">
                    {((stats.valid / stats.total) * 100) >= 80 ? (<lucide_react_1.TrendingUp className="h-4 w-4 text-green-500"/>) : (<lucide_react_1.TrendingDown className="h-4 w-4 text-red-500"/>)}
                    <span className="font-bold">
                      {((stats.valid / stats.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <progress_1.Progress value={(stats.valid / stats.total) * 100} className="h-2"/>
                <div className="text-xs text-muted-foreground mt-1">
                  Based on valid email addresses vs total processed
                </div>
              </div>)}
          </card_1.CardContent>
        </card_1.Card>)}

      {/* Error Display */}
      {error && (<alert_1.Alert variant="destructive">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
        </alert_1.Alert>)}

      {/* Manual Refresh */}
      {!autoRefresh && (<div className="flex justify-center">
          <button_1.Button variant="outline" onClick={fetchJobStatus} disabled={isLoading}>
            {isLoading ? (<lucide_react_1.RefreshCw className="h-4 w-4 mr-2 animate-spin"/>) : (<lucide_react_1.RefreshCw className="h-4 w-4 mr-2"/>)}
            Refresh Status
          </button_1.Button>
        </div>)}
    </div>);
}
//# sourceMappingURL=import-progress-tracker.js.map