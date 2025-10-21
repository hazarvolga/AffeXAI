import React from 'react';
/**
 * Loading Overlay Props
 */
interface LoadingOverlayProps {
    /** Show overlay only for specific loading ID */
    loadingId?: string;
    /** Custom loading message */
    message?: string;
    /** Show progress bar */
    showProgress?: boolean;
    /** Overlay blur effect */
    blur?: boolean;
    /** Custom className */
    className?: string;
    /** Custom spinner size */
    spinnerSize?: 'sm' | 'md' | 'lg' | 'xl';
}
/**
 * Loading Overlay Component
 *
 * Displays a full-screen or container-level loading overlay with spinner and message.
 * Automatically shows/hides based on global loading state or specific loading ID.
 *
 * @example
 * ```tsx
 * // Global loading overlay (shows when any loading is active)
 * <LoadingOverlay />
 * ```
 *
 * @example
 * ```tsx
 * // Specific loading ID
 * <LoadingOverlay
 *   loadingId="fetch-users"
 *   message="Kullanıcılar yükleniyor..."
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With progress bar
 * <LoadingOverlay
 *   loadingId="upload-file"
 *   showProgress
 *   blur
 * />
 * ```
 */
export declare function LoadingOverlay({ loadingId, message, showProgress, blur, className, spinnerSize, }: LoadingOverlayProps): React.JSX.Element | null;
/**
 * Inline Loading Spinner
 *
 * Small loading spinner for inline use in buttons, cards, etc.
 *
 * @example
 * ```tsx
 * <button disabled={isLoading}>
 *   {isLoading ? <LoadingSpinner /> : 'Kaydet'}
 * </button>
 * ```
 */
interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
export declare function LoadingSpinner({ size, className }: LoadingSpinnerProps): React.JSX.Element;
/**
 * Container Loading Overlay
 *
 * Loading overlay that covers a specific container instead of full screen.
 * Useful for loading specific sections of a page.
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   <ContainerLoadingOverlay isLoading={isLoading} message="Veriler yükleniyor..." />
 *   <YourContent />
 * </div>
 * ```
 */
interface ContainerLoadingOverlayProps {
    isLoading: boolean;
    message?: string;
    showProgress?: boolean;
    progress?: number;
    blur?: boolean;
    className?: string;
}
export declare function ContainerLoadingOverlay({ isLoading, message, showProgress, progress, blur, className, }: ContainerLoadingOverlayProps): React.JSX.Element | null;
export {};
//# sourceMappingURL=loading-overlay.d.ts.map