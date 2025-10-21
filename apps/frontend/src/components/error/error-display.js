"use strict";
/**
 * Error Display Components
 *
 * Reusable components for displaying errors in different contexts.
 */
'use client';
/**
 * Error Display Components
 *
 * Reusable components for displaying errors in different contexts.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorDisplay = ErrorDisplay;
exports.InlineError = InlineError;
exports.EmptyState = EmptyState;
const react_1 = __importDefault(require("react"));
const alert_1 = require("@/components/ui/alert");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const error_messages_1 = require("@/lib/errors/error-messages");
// ============================================================================
// Error Display Component
// ============================================================================
/**
 * Error Display
 *
 * Full error display with optional retry button.
 *
 * @example
 * ```tsx
 * <ErrorDisplay
 *   error={error}
 *   onRetry={() => refetch()}
 *   showRetry
 * />
 * ```
 */
function ErrorDisplay({ error, title = 'Hata Oluştu', showRetry = false, onRetry, onDismiss, className, }) {
    if (!error)
        return null;
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    const errorCode = errorObj.code;
    const statusCode = errorObj.status || errorObj.statusCode;
    const message = (0, error_messages_1.getErrorMessage)(errorCode, statusCode);
    return (<alert_1.Alert variant="destructive" className={className}>
      <lucide_react_1.AlertCircle className="h-4 w-4"/>
      <alert_1.AlertTitle className="flex items-center justify-between">
        {title}
        {onDismiss && (<button_1.Button variant="ghost" size="sm" onClick={onDismiss} className="h-auto p-1">
            <lucide_react_1.XCircle className="h-4 w-4"/>
          </button_1.Button>)}
      </alert_1.AlertTitle>
      <alert_1.AlertDescription className="space-y-2">
        <p>{message}</p>
        {showRetry && onRetry && (<button_1.Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
            <lucide_react_1.RefreshCw className="mr-2 h-4 w-4"/>
            Tekrar Dene
          </button_1.Button>)}
      </alert_1.AlertDescription>
    </alert_1.Alert>);
}
// ============================================================================
// Inline Error Component
// ============================================================================
/**
 * Inline Error
 *
 * Small inline error message for forms and inputs.
 *
 * @example
 * ```tsx
 * <InlineError message="Bu alan zorunludur" />
 * ```
 */
function InlineError({ message, className }) {
    if (!message)
        return null;
    return (<p className={`text-sm font-medium text-destructive ${className || ''}`}>
      {message}
    </p>);
}
// ============================================================================
// Empty State Component
// ============================================================================
/**
 * Empty State
 *
 * Display when no data is available or error prevents loading.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   title="Kullanıcı Bulunamadı"
 *   message="Arama kriterlerinize uygun kullanıcı bulunamadı."
 *   action={{ label: 'Yeni Kullanıcı Ekle', onClick: () => router.push('/users/new') }}
 * />
 * ```
 */
function EmptyState({ title = 'Veri Bulunamadı', message = 'Görüntülenecek veri bulunmuyor.', icon, action, className, }) {
    return (<div className={`flex flex-col items-center justify-center py-12 text-center ${className || ''}`}>
      <div className="mb-4">
        {icon || <lucide_react_1.AlertCircle className="h-12 w-12 text-muted-foreground"/>}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{message}</p>
      {action && (<button_1.Button onClick={action.onClick} variant="outline">
          {action.label}
        </button_1.Button>)}
    </div>);
}
// ============================================================================
// Exports
// ============================================================================
exports.default = ErrorDisplay;
//# sourceMappingURL=error-display.js.map