"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationResultsDisplay = ValidationResultsDisplay;
const react_1 = require("react");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const alert_1 = require("@/components/ui/alert");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const shared_types_1 = require("@affexai/shared-types");
const bulkImportService_1 = __importDefault(require("@/lib/api/bulkImportService"));
function ValidationResultsDisplay({ jobId, onClose }) {
    const [results, setResults] = (0, react_1.useState)([]);
    const [total, setTotal] = (0, react_1.useState)(0);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [filters, setFilters] = (0, react_1.useState)({
        status: 'all',
        search: '',
        page: 1,
        limit: 50
    });
    const [selectedResult, setSelectedResult] = (0, react_1.useState)(null);
    const fetchResults = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await bulkImportService_1.default.getImportResults(jobId, filters.page, filters.limit);
            // Filter results based on status and search
            let filteredResults = response.results;
            if (filters.status !== 'all') {
                filteredResults = filteredResults.filter(result => result.status === filters.status);
            }
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                filteredResults = filteredResults.filter(result => result.email.toLowerCase().includes(searchLower) ||
                    result.issues?.some(issue => issue.toLowerCase().includes(searchLower)) ||
                    result.suggestions?.some(suggestion => suggestion.toLowerCase().includes(searchLower)));
            }
            setResults(filteredResults);
            setTotal(response.total);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch results');
        }
        finally {
            setIsLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchResults();
    }, [jobId, filters.page, filters.limit]);
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: key !== 'page' ? 1 : value // Reset to page 1 when changing filters
        }));
    };
    const handleSearch = () => {
        fetchResults();
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case shared_types_1.ImportResultStatus.VALID:
                return <lucide_react_1.CheckCircle className="h-4 w-4 text-green-500"/>;
            case shared_types_1.ImportResultStatus.RISKY:
                return <lucide_react_1.AlertCircle className="h-4 w-4 text-yellow-500"/>;
            case shared_types_1.ImportResultStatus.INVALID:
                return <lucide_react_1.XCircle className="h-4 w-4 text-red-500"/>;
            case shared_types_1.ImportResultStatus.DUPLICATE:
                return <lucide_react_1.Info className="h-4 w-4 text-blue-500"/>;
            default:
                return <lucide_react_1.AlertCircle className="h-4 w-4 text-gray-500"/>;
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case shared_types_1.ImportResultStatus.VALID:
                return 'bg-green-100 text-green-800 border-green-200';
            case shared_types_1.ImportResultStatus.RISKY:
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case shared_types_1.ImportResultStatus.INVALID:
                return 'bg-red-100 text-red-800 border-red-200';
            case shared_types_1.ImportResultStatus.DUPLICATE:
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const totalPages = Math.ceil(total / filters.limit);
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Validation Results</h3>
          <p className="text-muted-foreground">
            Detailed validation results for each email address
          </p>
        </div>
        <div className="flex gap-2">
          <button_1.Button variant="outline" size="sm">
            <lucide_react_1.Download className="h-4 w-4 mr-2"/>
            Export Results
          </button_1.Button>
          {onClose && (<button_1.Button variant="outline" size="sm" onClick={onClose}>
              Close
            </button_1.Button>)}
        </div>
      </div>

      {/* Filters */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="text-base flex items-center gap-2">
            <lucide_react_1.Filter className="h-4 w-4"/>
            Filters
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex gap-2">
                <input_1.Input placeholder="Search emails, issues, or suggestions..." value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()}/>
                <button_1.Button onClick={handleSearch} size="sm">
                  <lucide_react_1.Search className="h-4 w-4"/>
                </button_1.Button>
              </div>
            </div>
            <div className="w-48">
              <select_1.Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue />
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="all">All Status</select_1.SelectItem>
                  <select_1.SelectItem value={shared_types_1.ImportResultStatus.VALID}>Valid</select_1.SelectItem>
                  <select_1.SelectItem value={shared_types_1.ImportResultStatus.RISKY}>Risky</select_1.SelectItem>
                  <select_1.SelectItem value={shared_types_1.ImportResultStatus.INVALID}>Invalid</select_1.SelectItem>
                  <select_1.SelectItem value={shared_types_1.ImportResultStatus.DUPLICATE}>Duplicate</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Results Table */}
      <card_1.Card>
        <card_1.CardHeader>
          <div className="flex items-center justify-between">
            <card_1.CardTitle className="text-base">
              Results ({total.toLocaleString()} total)
            </card_1.CardTitle>
            <button_1.Button variant="ghost" size="sm" onClick={fetchResults} disabled={isLoading}>
              <lucide_react_1.RefreshCw className={(0, utils_1.cn)("h-4 w-4", isLoading && "animate-spin")}/>
            </button_1.Button>
          </div>
        </card_1.CardHeader>
        <card_1.CardContent>
          {isLoading ? (<div className="flex items-center justify-center py-8">
              <lucide_react_1.RefreshCw className="h-6 w-6 animate-spin mr-2"/>
              <span>Loading results...</span>
            </div>) : error ? (<alert_1.Alert variant="destructive">
              <lucide_react_1.AlertCircle className="h-4 w-4"/>
              <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
            </alert_1.Alert>) : results.length === 0 ? (<div className="text-center py-8 text-muted-foreground">
              No results found matching your criteria.
            </div>) : (<div className="space-y-4">
              {/* Results List */}
              <div className="space-y-2">
                {results.map((result) => (<div key={result.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedResult(result)}>
                    <div className="flex items-center gap-3 flex-1">
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <div className="font-medium">{result.email}</div>
                        <div className="text-sm text-muted-foreground">
                          Row {result.rowNumber} • Confidence: {result.confidenceScore}%
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <badge_1.Badge className={(0, utils_1.cn)('border', getStatusColor(result.status))}>
                        {result.status}
                      </badge_1.Badge>
                      {result.imported && (<badge_1.Badge variant="secondary">Imported</badge_1.Badge>)}
                      <button_1.Button variant="ghost" size="sm">
                        <lucide_react_1.Eye className="h-4 w-4"/>
                      </button_1.Button>
                    </div>
                  </div>))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (<div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Page {filters.page} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button_1.Button variant="outline" size="sm" onClick={() => handleFilterChange('page', filters.page - 1)} disabled={filters.page <= 1}>
                      <lucide_react_1.ChevronLeft className="h-4 w-4"/>
                    </button_1.Button>
                    <button_1.Button variant="outline" size="sm" onClick={() => handleFilterChange('page', filters.page + 1)} disabled={filters.page >= totalPages}>
                      <lucide_react_1.ChevronRight className="h-4 w-4"/>
                    </button_1.Button>
                  </div>
                </div>)}
            </div>)}
        </card_1.CardContent>
      </card_1.Card>

      {/* Result Detail Modal */}
      {selectedResult && (<card_1.Card className="fixed inset-4 z-50 bg-white shadow-lg border max-w-2xl mx-auto my-8 overflow-y-auto">
          <card_1.CardHeader>
            <div className="flex items-center justify-between">
              <card_1.CardTitle className="flex items-center gap-2">
                {getStatusIcon(selectedResult.status)}
                Validation Details
              </card_1.CardTitle>
              <button_1.Button variant="ghost" size="sm" onClick={() => setSelectedResult(null)}>
                ×
              </button_1.Button>
            </div>
          </card_1.CardHeader>
          <card_1.CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Email Address</h4>
              <div className="p-3 bg-gray-50 rounded font-mono text-sm">
                {selectedResult.email}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Status</h4>
                <badge_1.Badge className={(0, utils_1.cn)('border', getStatusColor(selectedResult.status))}>
                  {selectedResult.status}
                </badge_1.Badge>
              </div>
              <div>
                <h4 className="font-medium mb-2">Confidence Score</h4>
                <div className="text-lg font-bold">{selectedResult.confidenceScore}%</div>
              </div>
            </div>

            {selectedResult.validationDetails && (<div>
                <h4 className="font-medium mb-2">Validation Checks</h4>
                <div className="space-y-2">
                  {Object.entries(selectedResult.validationDetails).map(([key, value]) => (<div key={key} className="flex items-center justify-between text-sm">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className={(0, utils_1.cn)("font-medium", typeof value === 'boolean'
                        ? value ? "text-green-600" : "text-red-600"
                        : "text-gray-600")}>
                        {typeof value === 'boolean' ? (value ? 'Pass' : 'Fail') : String(value)}
                      </span>
                    </div>))}
                </div>
              </div>)}

            {selectedResult.issues && selectedResult.issues.length > 0 && (<div>
                <h4 className="font-medium mb-2">Issues Found</h4>
                <ul className="space-y-1">
                  {selectedResult.issues.map((issue, index) => (<li key={index} className="text-sm text-red-600 flex items-start gap-2">
                      <lucide_react_1.XCircle className="h-3 w-3 mt-0.5 flex-shrink-0"/>
                      {issue}
                    </li>))}
                </ul>
              </div>)}

            {selectedResult.suggestions && selectedResult.suggestions.length > 0 && (<div>
                <h4 className="font-medium mb-2">Suggestions</h4>
                <ul className="space-y-1">
                  {selectedResult.suggestions.map((suggestion, index) => (<li key={index} className="text-sm text-blue-600 flex items-start gap-2">
                      <lucide_react_1.Info className="h-3 w-3 mt-0.5 flex-shrink-0"/>
                      {suggestion}
                    </li>))}
                </ul>
              </div>)}

            {selectedResult.error && (<div>
                <h4 className="font-medium mb-2">Error</h4>
                <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                  {selectedResult.error}
                </div>
              </div>)}
          </card_1.CardContent>
        </card_1.Card>)}

      {/* Backdrop for modal */}
      {selectedResult && (<div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSelectedResult(null)}/>)}
    </div>);
}
//# sourceMappingURL=validation-results-display.js.map