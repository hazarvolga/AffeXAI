"use strict";
'use client';
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
exports.LoadingProvider = LoadingProvider;
exports.useLoadingContext = useLoadingContext;
const react_1 = __importStar(require("react"));
/**
 * Loading Context
 * Provides global loading state management across the application
 */
const LoadingContext = (0, react_1.createContext)(undefined);
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
function LoadingProvider({ children, autoStopTimeout = 30000 // 30 seconds default
 }) {
    const [loadingStates, setLoadingStates] = (0, react_1.useState)([]);
    const timeoutRefs = (0, react_1.useRef)(new Map());
    /**
     * Start a new loading operation
     */
    const startLoading = (0, react_1.useCallback)((id, options) => {
        setLoadingStates(prev => {
            // If already loading with this ID, update it
            const existing = prev.find(state => state.id === id);
            if (existing) {
                return prev.map(state => state.id === id
                    ? { ...state, ...options, startedAt: Date.now() }
                    : state);
            }
            // Add new loading state
            return [...prev, {
                    id,
                    message: options?.message,
                    source: options?.source,
                    startedAt: Date.now(),
                }];
        });
        // Set auto-stop timeout
        if (autoStopTimeout > 0) {
            // Clear existing timeout if any
            const existingTimeout = timeoutRefs.current.get(id);
            if (existingTimeout) {
                clearTimeout(existingTimeout);
            }
            // Set new timeout
            const timeout = setTimeout(() => {
                console.warn(`Loading operation "${id}" auto-stopped after ${autoStopTimeout}ms`);
                stopLoading(id);
            }, autoStopTimeout);
            timeoutRefs.current.set(id, timeout);
        }
    }, [autoStopTimeout]);
    /**
     * Stop a loading operation
     */
    const stopLoading = (0, react_1.useCallback)((id) => {
        setLoadingStates(prev => prev.filter(state => state.id !== id));
        // Clear timeout
        const timeout = timeoutRefs.current.get(id);
        if (timeout) {
            clearTimeout(timeout);
            timeoutRefs.current.delete(id);
        }
    }, []);
    /**
     * Update loading progress
     */
    const updateProgress = (0, react_1.useCallback)((id, progress) => {
        setLoadingStates(prev => prev.map(state => state.id === id
            ? { ...state, progress: Math.max(0, Math.min(100, progress)) }
            : state));
    }, []);
    /**
     * Update loading message
     */
    const updateMessage = (0, react_1.useCallback)((id, message) => {
        setLoadingStates(prev => prev.map(state => state.id === id
            ? { ...state, message }
            : state));
    }, []);
    /**
     * Stop all loading operations
     */
    const stopAllLoading = (0, react_1.useCallback)(() => {
        setLoadingStates([]);
        // Clear all timeouts
        timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
        timeoutRefs.current.clear();
    }, []);
    /**
     * Check if specific loading is active
     */
    const isLoadingId = (0, react_1.useCallback)((id) => {
        return loadingStates.some(state => state.id === id);
    }, [loadingStates]);
    /**
     * Get loading state by ID
     */
    const getLoadingState = (0, react_1.useCallback)((id) => {
        return loadingStates.find(state => state.id === id);
    }, [loadingStates]);
    const value = {
        loadingStates,
        isLoading: loadingStates.length > 0,
        loadingCount: loadingStates.length,
        startLoading,
        stopLoading,
        updateProgress,
        updateMessage,
        stopAllLoading,
        isLoadingId,
        getLoadingState,
    };
    return (<LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>);
}
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
function useLoadingContext() {
    const context = (0, react_1.useContext)(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoadingContext must be used within LoadingProvider');
    }
    return context;
}
//# sourceMappingURL=LoadingContext.js.map