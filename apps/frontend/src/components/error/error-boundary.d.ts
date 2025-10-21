/**
 * Error Boundary Component
 *
 * Catches React errors and displays fallback UI.
 * Logs errors for monitoring and debugging.
 */
import React, { Component, ReactNode, ErrorInfo } from 'react';
interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    showDetails?: boolean;
}
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}
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
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState>;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    handleReset: () => void;
    handleReload: () => void;
    handleGoHome: () => void;
    render(): ReactNode;
}
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
export declare function withErrorBoundary<P extends object>(Component: React.ComponentType<P>, errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>): (props: P) => React.JSX.Element;
export default ErrorBoundary;
//# sourceMappingURL=error-boundary.d.ts.map