"use strict";
/**
 * Bulk Operation Error Display Component
 *
 * User-friendly error display with suggestions and recovery options
 */
'use client';
/**
 * Bulk Operation Error Display Component
 *
 * User-friendly error display with suggestions and recovery options
 */
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
exports.BulkOperationErrorDisplay = void 0;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const bulk_operation_errors_1 = require("@/lib/errors/bulk-operation-errors");
const bulk_operation_notifications_1 = require("@/lib/notifications/bulk-operation-notifications");
// ============================================================================
// Error Severity Configuration
// ============================================================================
const getErrorSeverity = (errorType) => {
    const severityMap = {
        // Critical errors
        [bulk_operation_errors_1.BulkOperationErrorType.FILE_MALWARE_DETECTED]: {
            level: 'critical',
            color: 'text-red-800',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-red-600"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.AUTHENTICATION_FAILED]: {
            level: 'critical',
            color: 'text-red-800',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-red-600"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.PERMISSION_DENIED]: {
            level: 'critical',
            color: 'text-red-800',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-red-600"/>
        },
        // High severity errors
        [bulk_operation_errors_1.BulkOperationErrorType.FILE_CORRUPTED]: {
            level: 'high',
            color: 'text-red-700',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-red-500"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.DATABASE_CONNECTION_FAILED]: {
            level: 'high',
            color: 'text-red-700',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-red-500"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.MEMORY_LIMIT_EXCEEDED]: {
            level: 'high',
            color: 'text-red-700',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-red-500"/>
        },
        // Medium severity errors
        [bulk_operation_errors_1.BulkOperationErrorType.FILE_INVALID_FORMAT]: {
            level: 'medium',
            color: 'text-orange-700',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-orange-500"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.FILE_TOO_LARGE]: {
            level: 'medium',
            color: 'text-orange-700',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-orange-500"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.VALIDATION_PARTIAL_FAILURE]: {
            level: 'medium',
            color: 'text-orange-700',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-orange-500"/>
        },
        // Low severity errors (retryable)
        [bulk_operation_errors_1.BulkOperationErrorType.NETWORK_ERROR]: {
            level: 'low',
            color: 'text-yellow-700',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            icon: <lucide_react_1.RefreshCw className="h-5 w-5 text-yellow-500"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.TIMEOUT_ERROR]: {
            level: 'low',
            color: 'text-yellow-700',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            icon: <lucide_react_1.RefreshCw className="h-5 w-5 text-yellow-500"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.VALIDATION_SERVICE_UNAVAILABLE]: {
            level: 'low',
            color: 'text-yellow-700',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            icon: <lucide_react_1.RefreshCw className="h-5 w-5 text-yellow-500"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.VALIDATION_RATE_LIMIT_EXCEEDED]: {
            level: 'low',
            color: 'text-yellow-700',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            icon: <lucide_react_1.RefreshCw className="h-5 w-5 text-yellow-500"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.QUEUE_PROCESSING_FAILED]: {
            level: 'low',
            color: 'text-yellow-700',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            icon: <lucide_react_1.RefreshCw className="h-5 w-5 text-yellow-500"/>
        },
        // Default for unknown errors
        [bulk_operation_errors_1.BulkOperationErrorType.UNKNOWN_ERROR]: {
            level: 'medium',
            color: 'text-gray-700',
            bgColor: 'bg-gray-50',
            borderColor: 'border-gray-200',
            icon: <lucide_react_1.HelpCircle className="h-5 w-5 text-gray-500"/>
        },
        // Business logic errors
        [bulk_operation_errors_1.BulkOperationErrorType.BATCH_PROCESSING_FAILED]: {
            level: 'medium',
            color: 'text-orange-700',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-orange-500"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.DUPLICATE_HANDLING_FAILED]: {
            level: 'medium',
            color: 'text-orange-700',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-orange-500"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.SUBSCRIBER_CREATION_FAILED]: {
            level: 'medium',
            color: 'text-orange-700',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-orange-500"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.GROUP_ASSIGNMENT_FAILED]: {
            level: 'medium',
            color: 'text-orange-700',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            icon: <lucide_react_1.AlertTriangle className="h-5 w-5 text-orange-500"/>
        },
        [bulk_operation_errors_1.BulkOperationErrorType.VALIDATION_TIMEOUT]: {
            level: 'low',
            color: 'text-yellow-700',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            icon: <lucide_react_1.RefreshCw className="h-5 w-5 text-yellow-500"/>
        }
    };
    return severityMap[errorType] || severityMap[bulk_operation_errors_1.BulkOperationErrorType.UNKNOWN_ERROR];
};
// ============================================================================
// Main Component
// ============================================================================
const BulkOperationErrorDisplay = ({ error, onRetry, onDismiss, showDetails = true, showSuggestions = true, className = '' }) => {
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const [isRetrying, setIsRetrying] = (0, react_1.useState)(false);
    const severity = getErrorSeverity(error.type);
    const userMessage = bulk_operation_notifications_1.bulkOperationNotificationService.getUserFriendlyMessage(error);
    const suggestions = bulk_operation_notifications_1.bulkOperationNotificationService.getErrorSuggestions(error);
    const handleRetry = async () => {
        if (!onRetry || !error.retryable)
            return;
        setIsRetrying(true);
        try {
            await onRetry();
        }
        finally {
            setIsRetrying(false);
        }
    };
    const formatTimestamp = (timestamp) => {
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'medium'
        }).format(timestamp);
    };
    return (<div className={`rounded-lg border ${severity.borderColor} ${severity.bgColor} p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {severity.icon}
          </div>
          <div className="flex-1">
            <h3 className={`text-sm font-medium ${severity.color}`}>
              {getErrorTitle(error.type)}
            </h3>
            <p className={`mt-1 text-sm ${severity.color}`}>
              {userMessage}
            </p>
            {error.timestamp && (<p className="mt-1 text-xs text-gray-500">
                Occurred at {formatTimestamp(error.timestamp)}
              </p>)}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Retry button */}
          {error.retryable && onRetry && (<button onClick={handleRetry} disabled={isRetrying} className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              {isRetrying ? (<>
                  <lucide_react_1.RefreshCw className="h-3 w-3 mr-1 animate-spin"/>
                  Retrying...
                </>) : (<>
                  <lucide_react_1.RefreshCw className="h-3 w-3 mr-1"/>
                  Retry
                </>)}
            </button>)}

          {/* Expand/collapse button */}
          {(showDetails || showSuggestions) && (<button onClick={() => setIsExpanded(!isExpanded)} className="inline-flex items-center px-2 py-1 text-xs text-gray-500 hover:text-gray-700">
              {isExpanded ? (<lucide_react_1.ChevronUp className="h-4 w-4"/>) : (<lucide_react_1.ChevronDown className="h-4 w-4"/>)}
            </button>)}

          {/* Dismiss button */}
          {onDismiss && (<button onClick={onDismiss} className="inline-flex items-center px-2 py-1 text-xs text-gray-400 hover:text-gray-600">
              <lucide_react_1.X className="h-4 w-4"/>
            </button>)}
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (<div className="mt-4 space-y-4">
          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (<div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Suggested solutions:
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {suggestions.map((suggestion, index) => (<li key={index} className="text-sm text-gray-700">
                    {suggestion}
                  </li>))}
              </ul>
            </div>)}

          {/* Error details */}
          {showDetails && (<div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Technical details:
              </h4>
              <div className="bg-gray-100 rounded p-3 text-xs font-mono">
                <div className="space-y-1">
                  <div><span className="font-semibold">Error Type:</span> {error.type}</div>
                  <div><span className="font-semibold">Retryable:</span> {error.retryable ? 'Yes' : 'No'}</div>
                  <div><span className="font-semibold">Recoverable:</span> {error.recoverable ? 'Yes' : 'No'}</div>
                  {error.batchIndex !== undefined && (<div><span className="font-semibold">Batch Index:</span> {error.batchIndex}</div>)}
                  {error.recordIndex !== undefined && (<div><span className="font-semibold">Record Index:</span> {error.recordIndex}</div>)}
                  {error.email && (<div><span className="font-semibold">Email:</span> {error.email}</div>)}
                  {error.details && (<div>
                      <span className="font-semibold">Details:</span>
                      <pre className="mt-1 whitespace-pre-wrap">
                        {typeof error.details === 'string'
                        ? error.details
                        : JSON.stringify(error.details, null, 2)}
                      </pre>
                    </div>)}
                </div>
              </div>
            </div>)}

          {/* Help links */}
          <div className="flex items-center space-x-4 text-sm">
            <a href="/admin/support" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <lucide_react_1.HelpCircle className="h-4 w-4 mr-1"/>
              Get Help
            </a>
            <a href="/docs/bulk-operations" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <lucide_react_1.ExternalLink className="h-4 w-4 mr-1"/>
              Documentation
            </a>
          </div>
        </div>)}
    </div>);
};
exports.BulkOperationErrorDisplay = BulkOperationErrorDisplay;
// ============================================================================
// Helper Functions
// ============================================================================
const getErrorTitle = (errorType) => {
    const titles = {
        [bulk_operation_errors_1.BulkOperationErrorType.FILE_INVALID_FORMAT]: 'Invalid File Format',
        [bulk_operation_errors_1.BulkOperationErrorType.FILE_TOO_LARGE]: 'File Too Large',
        [bulk_operation_errors_1.BulkOperationErrorType.FILE_CORRUPTED]: 'File Corrupted',
        [bulk_operation_errors_1.BulkOperationErrorType.FILE_MALWARE_DETECTED]: 'Security Threat Detected',
        [bulk_operation_errors_1.BulkOperationErrorType.VALIDATION_SERVICE_UNAVAILABLE]: 'Validation Service Unavailable',
        [bulk_operation_errors_1.BulkOperationErrorType.VALIDATION_RATE_LIMIT_EXCEEDED]: 'Rate Limit Exceeded',
        [bulk_operation_errors_1.BulkOperationErrorType.VALIDATION_TIMEOUT]: 'Validation Timeout',
        [bulk_operation_errors_1.BulkOperationErrorType.VALIDATION_PARTIAL_FAILURE]: 'Validation Issues',
        [bulk_operation_errors_1.BulkOperationErrorType.BATCH_PROCESSING_FAILED]: 'Processing Failed',
        [bulk_operation_errors_1.BulkOperationErrorType.QUEUE_PROCESSING_FAILED]: 'Queue Processing Error',
        [bulk_operation_errors_1.BulkOperationErrorType.DATABASE_CONNECTION_FAILED]: 'Database Error',
        [bulk_operation_errors_1.BulkOperationErrorType.MEMORY_LIMIT_EXCEEDED]: 'Memory Limit Exceeded',
        [bulk_operation_errors_1.BulkOperationErrorType.NETWORK_ERROR]: 'Network Error',
        [bulk_operation_errors_1.BulkOperationErrorType.TIMEOUT_ERROR]: 'Request Timeout',
        [bulk_operation_errors_1.BulkOperationErrorType.AUTHENTICATION_FAILED]: 'Authentication Failed',
        [bulk_operation_errors_1.BulkOperationErrorType.PERMISSION_DENIED]: 'Access Denied',
        [bulk_operation_errors_1.BulkOperationErrorType.DUPLICATE_HANDLING_FAILED]: 'Duplicate Handling Error',
        [bulk_operation_errors_1.BulkOperationErrorType.SUBSCRIBER_CREATION_FAILED]: 'Subscriber Creation Failed',
        [bulk_operation_errors_1.BulkOperationErrorType.GROUP_ASSIGNMENT_FAILED]: 'Group Assignment Failed',
        [bulk_operation_errors_1.BulkOperationErrorType.UNKNOWN_ERROR]: 'Unknown Error'
    };
    return titles[errorType] || 'Error';
};
exports.default = exports.BulkOperationErrorDisplay;
//# sourceMappingURL=bulk-operation-error-display.js.map