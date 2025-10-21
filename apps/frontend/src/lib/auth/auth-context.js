"use strict";
/**
 * Authentication Context
 *
 * Provides authentication state and methods throughout the application.
 * Uses React Context API for global state management.
 */
'use client';
/**
 * Authentication Context
 *
 * Provides authentication state and methods throughout the application.
 * Uses React Context API for global state management.
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
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
const react_1 = __importStar(require("react"));
const authService_1 = require("../api/authService");
const token_storage_1 = require("./token-storage");
// ============================================================================
// Context
// ============================================================================
const AuthContext = (0, react_1.createContext)(undefined);
// ============================================================================
// Provider Component
// ============================================================================
/**
 * Authentication Provider
 *
 * Wraps the application to provide authentication state and methods.
 * Automatically restores session from stored tokens on mount.
 */
function AuthProvider({ children }) {
    // State
    const [user, setUser] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    // Computed state
    const isAuthenticated = user !== null;
    // ==========================================================================
    // Authentication Methods
    // ==========================================================================
    /**
     * Login with email and password
     */
    const login = (0, react_1.useCallback)(async (credentials) => {
        try {
            setIsLoading(true);
            setError(null);
            console.log('🔐 AuthContext: Starting login process');
            // Call auth service (this will handle token storage internally)
            const response = await authService_1.authService.login(credentials);
            console.log('🔐 AuthContext: Login response received:', {
                hasAccessToken: !!response.access_token,
                hasUser: !!response.user
            });
            console.log('🔐 AuthContext: Tokens stored by authService, updating user state');
            // Update user state
            setUser(response.user);
            // Return the response so login page can access user data
            return response;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    /**
     * Logout and clear session
     */
    const logout = (0, react_1.useCallback)(async () => {
        try {
            setIsLoading(true);
            setError(null);
            // Call auth service (this will handle token clearing)
            authService_1.authService.logout();
            // Clear tokens from tokenStorage as well
            token_storage_1.tokenStorage.clear();
            // Clear user state
            setUser(null);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Logout failed';
            setError(errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    /**
     * Refresh access token using refresh token
     */
    const refreshToken = (0, react_1.useCallback)(async () => {
        try {
            const refreshToken = token_storage_1.tokenStorage.getRefreshToken();
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }
            // Call auth service
            const response = await authService_1.authService.refreshToken({ refresh_token: refreshToken });
            // Update access token
            token_storage_1.tokenStorage.setAccessToken(response.access_token);
        }
        catch (err) {
            // Refresh failed, logout user
            console.error('Token refresh failed:', err);
            await logout();
            throw err;
        }
    }, [logout]);
    // ==========================================================================
    // User Management
    // ==========================================================================
    /**
     * Update user profile (optimistic update)
     */
    const updateUser = (0, react_1.useCallback)((updates) => {
        setUser((currentUser) => {
            if (!currentUser)
                return null;
            return { ...currentUser, ...updates };
        });
    }, []);
    // ==========================================================================
    // Authorization Helpers
    // ==========================================================================
    /**
     * Check if user has specific role
     */
    const hasRole = (0, react_1.useCallback)((role) => {
        return user?.roleId === role;
    }, [user]);
    /**
     * Check if user has any of the specified roles
     */
    const hasAnyRole = (0, react_1.useCallback)((roles) => {
        return user ? roles.includes(user.roleId) : false;
    }, [user]);
    // ==========================================================================
    // Error Management
    // ==========================================================================
    /**
     * Clear error state
     */
    const clearError = (0, react_1.useCallback)(() => {
        setError(null);
    }, []);
    // ==========================================================================
    // Session Restoration
    // ==========================================================================
    /**
     * Restore session from stored tokens on mount
     */
    (0, react_1.useEffect)(() => {
        const restoreSession = async () => {
            try {
                // Check if user is authenticated using authService
                const isAuth = authService_1.authService.isAuthenticated();
                console.log('🔐 Restoring session, user authenticated:', isAuth);
                if (!isAuth) {
                    console.log('🔐 No valid token found, user not authenticated');
                    setIsLoading(false);
                    return;
                }
                console.log('🔐 Validating token and getting current user...');
                // Validate token and get current user
                const currentUser = await authService_1.authService.getCurrentUser();
                console.log('🔐 Session restored successfully:', currentUser.email);
                setUser(currentUser);
            }
            catch (err) {
                console.error('🔐 Session restoration failed:', err);
                // Clear invalid tokens
                token_storage_1.tokenStorage.clear();
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('aluplan_access_token');
                }
            }
            finally {
                setIsLoading(false);
            }
        };
        restoreSession();
    }, []);
    /**
     * Listen for user sync updates from useUserSync hook
     * This ensures AuthContext stays in sync with backend
     */
    (0, react_1.useEffect)(() => {
        const handleUserSyncUpdate = (event) => {
            const freshUser = event.detail.user;
            console.log('🔄 AuthContext: Received user sync update', freshUser.email);
            setUser(freshUser);
        };
        window.addEventListener('user-sync-update', handleUserSyncUpdate);
        return () => {
            window.removeEventListener('user-sync-update', handleUserSyncUpdate);
        };
    }, []);
    /**
     * Proactive token refresh timer
     * Checks token expiry every minute and refreshes if needed
     */
    (0, react_1.useEffect)(() => {
        if (!isAuthenticated)
            return;
        const intervalId = setInterval(async () => {
            try {
                // Check if token needs refresh (expires in less than 5 minutes)
                const shouldRefresh = token_storage_1.tokenStorage.shouldRefreshToken(5);
                if (shouldRefresh) {
                    console.log('🔄 Token expiring soon, refreshing proactively...');
                    await refreshToken();
                    console.log('✅ Proactive token refresh successful');
                }
            }
            catch (error) {
                console.error('❌ Proactive token refresh failed:', error);
                // The error will be handled by the refreshToken function
                // which will logout the user if refresh fails
            }
        }, 60000); // Check every minute
        return () => clearInterval(intervalId);
    }, [isAuthenticated, refreshToken]);
    // ==========================================================================
    // Context Value
    // ==========================================================================
    const contextValue = {
        // State
        user,
        isAuthenticated,
        isLoading,
        error,
        // Authentication
        login,
        logout,
        refreshToken,
        // User management
        updateUser,
        // Authorization
        hasRole,
        hasAnyRole,
        // Error management
        clearError,
    };
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
// ============================================================================
// Hook
// ============================================================================
/**
 * Use authentication context
 *
 * @throws Error if used outside AuthProvider
 * @returns Authentication context value
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 *
 * if (isAuthenticated) {
 *   return <div>Welcome, {user.name}!</div>;
 * }
 * ```
 */
function useAuth() {
    const context = (0, react_1.useContext)(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
// ============================================================================
// Exports
// ============================================================================
exports.default = AuthContext;
//# sourceMappingURL=auth-context.js.map