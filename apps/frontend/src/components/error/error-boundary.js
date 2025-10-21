"use strict";
/**
 * Error Boundary Component
 *
 * Catches React errors and displays fallback UI.
 * Logs errors for monitoring and debugging.
 */
'use client';
/**
 * Error Boundary Component
 *
 * Catches React errors and displays fallback UI.
 * Logs errors for monitoring and debugging.
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
exports.ErrorBoundary = void 0;
exports.withErrorBoundary = withErrorBoundary;
const react_1 = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
// ============================================================================
// Error Boundary Component
// ============================================================================
/**
 * Error Boundary
 *
 * Wraps components to catch and handle React errors gracefully.
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 *
 * // With custom fallback
 * <ErrorBoundary fallback={<CustomErrorPage />}>
 *   <App />
 * </ErrorBoundary>
 *
 * // With error callback
 * <ErrorBoundary onError={(error) => logToSentry(error)}>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }
    componentDidCatch(error, errorInfo) {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error);
            console.error('Error info:', errorInfo);
        }
        // Store error info in state
        this.setState({
            errorInfo,
        });
        // Call custom error handler if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
        // TODO: Log to error tracking service (Sentry, LogRocket, etc.)
        // logErrorToService(error, errorInfo);
    }
    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };
    handleReload = () => {
        window.location.reload();
    };
    handleGoHome = () => {
        window.location.href = '/';
    };
    render() {
        if (this.state.hasError) {
            // Custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }
            // Default error UI
            return (<div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <lucide_react_1.AlertTriangle className="h-12 w-12 text-destructive"/>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Bir Hata Oluştu</h1>
              <p className="text-muted-foreground">
                Üzgünüz, beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya ana sayfaya dönün.
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {this.props.showDetails && process.env.NODE_ENV === 'development' && this.state.error && (<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-left">
                <p className="mb-2 font-mono text-sm font-semibold text-destructive">
                  {this.state.error.name}: {this.state.error.message}
                </p>
                {this.state.errorInfo && (<pre className="overflow-auto text-xs text-muted-foreground">
                    {this.state.errorInfo.componentStack}
                  </pre>)}
              </div>)}

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button_1.Button onClick={this.handleReset} variant="default" className="w-full sm:w-auto">
                <lucide_react_1.RefreshCw className="mr-2 h-4 w-4"/>
                Tekrar Dene
              </button_1.Button>
              <button_1.Button onClick={this.handleReload} variant="outline" className="w-full sm:w-auto">
                Sayfayı Yenile
              </button_1.Button>
              <button_1.Button onClick={this.handleGoHome} variant="ghost" className="w-full sm:w-auto">
                <lucide_react_1.Home className="mr-2 h-4 w-4"/>
                Ana Sayfa
              </button_1.Button>
            </div>
          </div>
        </div>);
        }
        return this.props.children;
    }
}
exports.ErrorBoundary = ErrorBoundary;
// ============================================================================
// Hook Version (for functional components)
// ============================================================================
/**
 * withErrorBoundary HOC
 *
 * Wraps a component with ErrorBoundary
 *
 * @example
 * ```tsx
 * const ProtectedComponent = withErrorBoundary(MyComponent, {
 *   onError: (error) => logToSentry(error)
 * });
 * ```
 */
function withErrorBoundary(Component, errorBoundaryProps) {
    return function WithErrorBoundaryComponent(props) {
        return (<ErrorBoundary {...errorBoundaryProps}>
        <Component {...props}/>
      </ErrorBoundary>);
    };
}
// ============================================================================
// Exports
// ============================================================================
exports.default = ErrorBoundary;
//# sourceMappingURL=error-boundary.js.map