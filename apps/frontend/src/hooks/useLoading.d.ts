import { useLoadingContext } from '@/contexts/LoadingContext';
/**
 * useLoading Hook Options
 */
export interface UseLoadingOptions {
    /** Unique identifier for this loading operation */
    id?: string;
    /** Auto-generate ID from component name */
    autoId?: boolean;
    /** Default loading message */
    message?: string;
    /** Source component/feature name */
    source?: string;
    /** Auto-stop loading on unmount */
    autoStopOnUnmount?: boolean;
}
/**
 * useLoading Hook Return Value
 */
export interface UseLoadingReturn {
    /** Whether this specific loading is active */
    isLoading: boolean;
    /** Start loading */
    start: (message?: string) => void;
    /** Stop loading */
    stop: () => void;
    /** Update progress (0-100) */
    setProgress: (progress: number) => void;
    /** Update message */
    setMessage: (message: string) => void;
    /** Current loading state */
    loadingState: ReturnType<typeof useLoadingContext>['getLoadingState'];
}
/**
 * Hook for managing loading state in a component
 *
 * Provides easy-to-use loading state management with automatic cleanup
 * and integration with global LoadingContext.
 *
 * @param options - Loading configuration options
 * @returns Loading state and control functions
 *
 * @example
 * ```tsx
 * // Basic usage
 * const { isLoading, start, stop } = useLoading({ id: 'fetch-users' });
 *
 * const fetchUsers = async () => {
 *   start('Kullanıcılar yükleniyor...');
 *   try {
 *     await api.getUsers();
 *   } finally {
 *     stop();
 *   }
 * };
 * ```
 *
 * @example
 * ```tsx
 * // With progress
 * const { isLoading, start, stop, setProgress } = useLoading({
 *   id: 'upload-file',
 *   source: 'FileUpload'
 * });
 *
 * const uploadFile = async (file: File) => {
 *   start('Dosya yükleniyor...');
 *
 *   const xhr = new XMLHttpRequest();
 *   xhr.upload.addEventListener('progress', (e) => {
 *     const progress = (e.loaded / e.total) * 100;
 *     setProgress(progress);
 *   });
 *
 *   // ... upload logic
 *
 *   stop();
 * };
 * ```
 *
 * @example
 * ```tsx
 * // Auto-generated ID
 * const { isLoading, start, stop } = useLoading({
 *   autoId: true,
 *   source: 'ProductList'
 * });
 * ```
 */
export declare function useLoading(options?: UseLoadingOptions): UseLoadingReturn;
/**
 * Hook for managing async operations with automatic loading state
 *
 * Wraps an async function with automatic loading start/stop and error handling.
 *
 * @param asyncFn - The async function to wrap
 * @param options - Loading configuration options
 * @returns Wrapped function and loading state
 *
 * @example
 * ```tsx
 * const { execute, isLoading } = useAsyncLoading(
 *   async () => {
 *     return await api.getUsers();
 *   },
 *   {
 *     id: 'fetch-users',
 *     message: 'Kullanıcılar yükleniyor...'
 *   }
 * );
 *
 * return (
 *   <button onClick={execute} disabled={isLoading}>
 *     {isLoading ? 'Yükleniyor...' : 'Kullanıcıları Getir'}
 *   </button>
 * );
 * ```
 */
export declare function useAsyncLoading<T extends (...args: any[]) => Promise<any>>(asyncFn: T, options?: UseLoadingOptions): {
    execute: T;
    isLoading: boolean;
    error: Error | null;
    reset: () => void;
};
//# sourceMappingURL=useLoading.d.ts.map