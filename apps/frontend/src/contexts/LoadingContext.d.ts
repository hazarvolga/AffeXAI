import React from 'react';
/**
 * Loading State Interface
 * Defines the structure of a loading operation
 */
export interface LoadingState {
    /** Unique identifier for the loading operation */
    id: string;
    /** Human-readable message (optional) */
    message?: string;
    /** Progress percentage (0-100) */
    progress?: number;
    /** Component or feature triggering the loading */
    source?: string;
    /** Timestamp when loading started */
    startedAt: number;
}
/**
 * Loading Context Value Interface
 * Provides all loading state management functionality
 */
interface LoadingContextValue {
    /** All active loading operations */
    loadingStates: LoadingState[];
    /** Whether any loading is in progress */
    isLoading: boolean;
    /** Number of active loading operations */
    loadingCount: number;
    /** Start a new loading operation */
    startLoading: (id: string, options?: {
        message?: string;
        source?: string;
    }) => void;
    /** Stop a loading operation */
    stopLoading: (id: string) => void;
    /** Update loading progress */
    updateProgress: (id: string, progress: number) => void;
    /** Update loading message */
    updateMessage: (id: string, message: string) => void;
    /** Stop all loading operations */
    stopAllLoading: () => void;
    /** Check if specific loading is active */
    isLoadingId: (id: string) => boolean;
    /** Get loading state by ID */
    getLoadingState: (id: string) => LoadingState | undefined;
}
/**
 * Loading Provider Props
 */
interface LoadingProviderProps {
    children: React.ReactNode;
    /** Auto-stop loading after timeout (ms) to prevent stuck states */
    autoStopTimeout?: number;
}
/**
 * Loading Provider Component
 * Manages global loading states and provides context to children
 *
 * @example
 * ```tsx
 * <LoadingProvider autoStopTimeout={30000}>
 *   <App />
 * </LoadingProvider>
 * ```
 */
export declare function LoadingProvider({ children, autoStopTimeout }: LoadingProviderProps): React.JSX.Element;
/**
 * Hook to access loading context
 * Must be used within LoadingProvider
 *
 * @example
 * ```tsx
 * const { startLoading, stopLoading, isLoading } = useLoadingContext();
 *
 * // Start loading
 * startLoading('fetch-users', {
 *   message: 'Kullanıcılar yükleniyor...',
 *   source: 'UserList'
 * });
 *
 * // Stop loading
 * stopLoading('fetch-users');
 * ```
 */
export declare function useLoadingContext(): LoadingContextValue;
export {};
//# sourceMappingURL=LoadingContext.d.ts.map