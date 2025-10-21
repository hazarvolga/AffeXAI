"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoading = useLoading;
exports.useAsyncLoading = useAsyncLoading;
const react_1 = require("react");
const LoadingContext_1 = require("@/contexts/LoadingContext");
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
function useLoading(options = {}) {
    const { id: providedId, autoId = false, message: defaultMessage, source, autoStopOnUnmount = true, } = options;
    const { startLoading, stopLoading, updateProgress, updateMessage, isLoadingId, getLoadingState, } = (0, LoadingContext_1.useLoadingContext)();
    // Generate or use provided ID
    const idRef = (0, react_1.useRef)(providedId || (autoId ? `loading-${Math.random().toString(36).substr(2, 9)}` : 'default'));
    const id = idRef.current;
    /**
     * Start loading
     */
    const start = (0, react_1.useCallback)((message) => {
        startLoading(id, {
            message: message || defaultMessage,
            source,
        });
    }, [id, defaultMessage, source, startLoading]);
    /**
     * Stop loading
     */
    const stop = (0, react_1.useCallback)(() => {
        stopLoading(id);
    }, [id, stopLoading]);
    /**
     * Set progress
     */
    const setProgress = (0, react_1.useCallback)((progress) => {
        updateProgress(id, progress);
    }, [id, updateProgress]);
    /**
     * Set message
     */
    const setMessage = (0, react_1.useCallback)((message) => {
        updateMessage(id, message);
    }, [id, updateMessage]);
    // Auto-stop on unmount
    (0, react_1.useEffect)(() => {
        return () => {
            if (autoStopOnUnmount) {
                stopLoading(id);
            }
        };
    }, [id, autoStopOnUnmount, stopLoading]);
    return {
        isLoading: isLoadingId(id),
        start,
        stop,
        setProgress,
        setMessage,
        loadingState: getLoadingState(id),
    };
}
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
function useAsyncLoading(asyncFn, options = {}) {
    const loading = useLoading(options);
    const [error, setError] = react_2.default.useState(null);
    const execute = (0, react_1.useCallback)(async (...args) => {
        loading.start();
        setError(null);
        try {
            const result = await asyncFn(...args);
            return result;
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            setError(error);
            throw error;
        }
        finally {
            loading.stop();
        }
    }, [asyncFn, loading]);
    const reset = (0, react_1.useCallback)(() => {
        setError(null);
        loading.stop();
    }, [loading]);
    return {
        execute,
        isLoading: loading.isLoading,
        error,
        reset,
    };
}
// React import for useState
const react_2 = __importDefault(require("react"));
//# sourceMappingURL=useLoading.js.map