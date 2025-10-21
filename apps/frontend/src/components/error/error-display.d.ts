/**
 * Error Display Components
 *
 * Reusable components for displaying errors in different contexts.
 */
import React from 'react';
import type { ApiError } from '@/lib/api/http-client';
export interface ErrorDisplayProps {
    error: Error | ApiError | string | null;
    title?: string;
    showRetry?: boolean;
    onRetry?: () => void;
    onDismiss?: () => void;
    className?: string;
}
export interface InlineErrorProps {
    message: string;
    className?: string;
}
export interface EmptyStateProps {
    title?: string;
    message?: string;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}
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
export declare function ErrorDisplay({ error, title, showRetry, onRetry, onDismiss, className, }: ErrorDisplayProps): React.JSX.Element | null;
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
export declare function InlineError({ message, className }: InlineErrorProps): React.JSX.Element | null;
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
export declare function EmptyState({ title, message, icon, action, className, }: EmptyStateProps): React.JSX.Element;
export default ErrorDisplay;
//# sourceMappingURL=error-display.d.ts.map