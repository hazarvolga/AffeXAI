"use strict";
/**
 * Unified Type-Safe HTTP Client
 *
 * Modern HTTP client with:
 * - Full TypeScript type safety using shared types
 * - Automatic authentication token injection
 * - Standardized error handling
 * - Request/Response logging
 * - Retry logic with exponential backoff
 * - Request cancellation support
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = exports.HttpClient = exports.ApiError = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * API Error class for standardized error handling
 */
class ApiError extends Error {
    status;
    statusText;
    code;
    data;
    isNetworkError;
    isTimeoutError;
    constructor(message, status = 0, statusText = '', data, isNetworkError = false, isTimeoutError = false, code) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.statusText = statusText;
        this.code = code || this.extractErrorCode(data) || `HTTP_${status}`;
        this.data = data;
        this.isNetworkError = isNetworkError;
        this.isTimeoutError = isTimeoutError;
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
    /**
     * Extract error code from response data
     */
    extractErrorCode(data) {
        if (data && typeof data === 'object') {
            return data.code || data.errorCode || data.error?.code;
        }
        return undefined;
    }
    /**
     * Get user-friendly error message using error messages module
     */
    getUserMessage() {
        // Dynamic import to avoid circular dependency
        try {
            const { getErrorMessage } = require('../errors/error-messages');
            return getErrorMessage(this.code, this.status);
        }
        catch {
            // Fallback to basic messages if error-messages module not available
            return this.getBasicMessage();
        }
    }
    /**
     * Get basic error message (fallback)
     */
    getBasicMessage() {
        if (this.isNetworkError) {
            return 'Network error. Please check your internet connection.';
        }
        if (this.isTimeoutError) {
            return 'Request timeout. The server is taking too long to respond.';
        }
        if (this.status === 401) {
            return 'Authentication required. Please log in.';
        }
        if (this.status === 403) {
            return 'Access denied. You do not have permission to perform this action.';
        }
        if (this.status === 404) {
            return 'Resource not found.';
        }
        if (this.status === 422) {
            return 'Validation error. Please check your input.';
        }
        if (this.status >= 500) {
            return 'Server error. Please try again later.';
        }
        return this.message || 'An unexpected error occurred.';
    }
}
exports.ApiError = ApiError;
// ============================================================================
// HTTP Client Implementation
// ============================================================================
/**
 * Unified HTTP Client class
 */
class HttpClient {
    instance;
    config;
    logger;
    authToken = null;
    constructor(config) {
        // Default configuration - FORCE PORT 9006
        const apiUrl = 'http://localhost:9006/api';
        this.config = {
            baseURL: config?.baseURL || apiUrl,
            timeout: config?.timeout || 30000, // 30 seconds
            headers: config?.headers || {},
            withCredentials: config?.withCredentials ?? true,
            enableLogging: config?.enableLogging ?? process.env.NODE_ENV === 'development',
            retryAttempts: config?.retryAttempts || 3,
            retryDelay: config?.retryDelay || 1000,
        };
        // DEBUG: Log the baseURL being used
        console.log('🔧 HTTP Client initialized with baseURL:', this.config.baseURL);
        console.log('🔧 FORCED API URL (ignoring env):', apiUrl);
        // Create axios instance
        this.instance = axios_1.default.create({
            baseURL: this.config.baseURL,
            timeout: this.config.timeout,
            headers: {
                'Content-Type': 'application/json',
                ...this.config.headers,
            },
            withCredentials: this.config.withCredentials,
        });
        // Setup logger if logging is enabled
        if (this.config.enableLogging) {
            this.logger = this.createDefaultLogger();
        }
        // Setup interceptors
        this.setupRequestInterceptor();
        this.setupResponseInterceptor();
        // Load auth token from localStorage (client-side only)
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('auth_token');
            if (storedToken) {
                this.authToken = storedToken;
            }
        }
    }
    // ==========================================================================
    // Logger
    // ==========================================================================
    createDefaultLogger() {
        return {
            logRequest: (config) => {
                console.log(`[HTTP] → ${config.method?.toUpperCase()} ${config.url}`);
                if (config.data) {
                    console.log('[HTTP] Request data:', config.data);
                }
            },
            logResponse: (response) => {
                console.log(`[HTTP] ← ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
            },
            logError: (error) => {
                console.error(`[HTTP] ✗ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.message);
                if (error.response) {
                    console.error('[HTTP] Response:', error.response.status, error.response.data);
                }
            },
        };
    }
    // ==========================================================================
    // Interceptors
    // ==========================================================================
    setupRequestInterceptor() {
        this.instance.interceptors.request.use((config) => {
            // Inject authentication token from storage or manually set token
            let token = this.authToken;
            // If no manual token, try multiple sources
            if (!token && typeof window !== 'undefined') {
                // Try localStorage first (primary source)
                token = localStorage.getItem('auth_token');
                console.log('🔐 HTTP Client: Token from localStorage:', !!token);
                // If still no token, try tokenStorage
                if (!token) {
                    try {
                        const tokenStorageModule = require('../auth/token-storage');
                        const tokenStorage = tokenStorageModule.tokenStorage || tokenStorageModule.default;
                        token = tokenStorage?.getAccessToken();
                        console.log('🔐 HTTP Client: Token from tokenStorage:', !!token);
                    }
                    catch (error) {
                        console.log('🔐 HTTP Client: TokenStorage not available');
                    }
                }
                // Update internal token if found
                if (token) {
                    this.authToken = token;
                }
            }
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log('🔐 HTTP Client: Added Authorization header');
            }
            else {
                console.log('🔐 HTTP Client: No token available for request');
                console.log('🔐 HTTP Client: Debug - localStorage keys:', Object.keys(localStorage));
            }
            // Log request
            if (this.logger) {
                this.logger.logRequest(config);
            }
            return config;
        }, (error) => {
            if (this.logger) {
                this.logger.logError(error);
            }
            return Promise.reject(this.handleError(error));
        });
    }
    // Track refresh state to prevent concurrent refresh attempts
    isRefreshing = false;
    refreshSubscribers = [];
    onTokenRefreshed(newToken) {
        this.refreshSubscribers.forEach((callback) => callback(newToken));
        this.refreshSubscribers = [];
    }
    addRefreshSubscriber(callback) {
        this.refreshSubscribers.push(callback);
    }
    setupResponseInterceptor() {
        this.instance.interceptors.response.use((response) => {
            // Log successful response
            if (this.logger) {
                this.logger.logResponse(response);
            }
            // Debug: Log response data structure
            if (this.config.enableLogging) {
                console.log('[HTTP Client] Response data type:', typeof response.data);
                console.log('[HTTP Client] Response data:', response.data);
            }
            // Don't auto-unwrap here - let the getWrapped method handle it
            // This allows both wrapped and unwrapped responses to work
            return response;
        }, async (error) => {
            const originalRequest = error.config;
            // If 401 error and not already retried, attempt token refresh
            if (error.response?.status === 401 && !originalRequest._retry) {
                // Check if this is the refresh endpoint itself (avoid infinite loop)
                if (originalRequest.url?.includes('/auth/refresh')) {
                    console.error('🔄 Refresh endpoint failed, logging out');
                    await this.handleRefreshFailure();
                    return Promise.reject(this.handleError(error));
                }
                // If already refreshing, wait for the refresh to complete
                if (this.isRefreshing) {
                    console.log('🔄 Token refresh in progress, queuing request');
                    return new Promise((resolve) => {
                        this.addRefreshSubscriber((newToken) => {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            resolve(this.instance(originalRequest));
                        });
                    });
                }
                originalRequest._retry = true;
                this.isRefreshing = true;
                try {
                    console.log('🔄 Token expired, attempting refresh...');
                    // Get refresh token from storage
                    let refreshToken = null;
                    if (typeof window !== 'undefined') {
                        try {
                            const tokenStorageModule = require('../auth/token-storage');
                            const tokenStorage = tokenStorageModule.tokenStorage || tokenStorageModule.default;
                            refreshToken = tokenStorage?.getRefreshToken();
                            console.log('🔄 Refresh token found:', !!refreshToken);
                        }
                        catch (error) {
                            console.error('Error accessing tokenStorage:', error);
                        }
                    }
                    if (!refreshToken) {
                        throw new Error('No refresh token available');
                    }
                    // Call refresh endpoint
                    const response = await this.instance.post('/auth/refresh', {
                        refresh_token: refreshToken,
                    });
                    const data = response.data.data || response.data;
                    const { access_token, refresh_token: newRefreshToken } = data;
                    if (!access_token) {
                        throw new Error('No access token in refresh response');
                    }
                    // Update tokens in storage
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('auth_token', access_token);
                        try {
                            const tokenStorageModule = require('../auth/token-storage');
                            const tokenStorage = tokenStorageModule.tokenStorage || tokenStorageModule.default;
                            tokenStorage?.setAccessToken(access_token);
                            if (newRefreshToken) {
                                tokenStorage?.setRefreshToken(newRefreshToken);
                            }
                        }
                        catch (error) {
                            console.error('Error storing refreshed tokens:', error);
                        }
                    }
                    // Update instance default header
                    this.authToken = access_token;
                    this.instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                    // Update the failed request with new token
                    originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    // Notify all queued requests
                    this.onTokenRefreshed(access_token);
                    this.isRefreshing = false;
                    console.log('✅ Token refreshed successfully');
                    // Retry the original request
                    return this.instance(originalRequest);
                }
                catch (refreshError) {
                    this.isRefreshing = false;
                    this.refreshSubscribers = [];
                    console.error('❌ Token refresh failed:', refreshError);
                    await this.handleRefreshFailure();
                    return Promise.reject(this.handleError(error));
                }
            }
            // Log error
            if (this.logger) {
                this.logger.logError(error);
            }
            // Handle error
            return Promise.reject(this.handleError(error));
        });
    }
    async handleRefreshFailure() {
        // Clear all tokens
        if (typeof window !== 'undefined') {
            try {
                const tokenStorageModule = require('../auth/token-storage');
                const tokenStorage = tokenStorageModule.tokenStorage || tokenStorageModule.default;
                tokenStorage?.clear();
                localStorage.removeItem('auth_token');
                localStorage.removeItem('aluplan_access_token');
            }
            catch (error) {
                console.error('Error clearing tokens:', error);
            }
            // Redirect to login
            window.location.href = '/login';
        }
    }
    // ==========================================================================
    // Error Handling
    // ==========================================================================
    handleError(error) {
        // Network error (no response from server)
        if (!error.response) {
            const isTimeoutError = error.code === 'ECONNABORTED';
            const isNetworkError = error.code === 'ERR_NETWORK' || error.message.includes('Network Error');
            return new ApiError(error.message || 'Network error occurred', 0, '', undefined, isNetworkError, isTimeoutError);
        }
        // HTTP error response
        const response = error.response;
        // Debug: Log response data to identify the issue
        if (this.config.enableLogging) {
            console.log('[HTTP Client] Error response data:', {
                data: response.data,
                dataType: typeof response.data,
                status: response.status,
            });
        }
        const message = this.extractErrorMessage(response.data);
        // Debug: Verify extracted message is actually a string
        if (this.config.enableLogging && typeof message !== 'string') {
            console.error('[HTTP Client] extractErrorMessage returned non-string:', {
                message,
                messageType: typeof message,
            });
        }
        return new ApiError(message, response.status, response.statusText, response.data, false, false);
    }
    extractErrorMessage(data) {
        // Return string directly
        if (typeof data === 'string') {
            return data;
        }
        // Extract message from object
        if (data && typeof data === 'object') {
            // Check common error message properties - ensure they are strings
            if (data.message && typeof data.message === 'string') {
                return data.message;
            }
            if (data.error) {
                // If error is a string, return it
                if (typeof data.error === 'string') {
                    return data.error;
                }
                // If error is an object with a message, return that
                if (typeof data.error === 'object' && typeof data.error.message === 'string') {
                    return data.error.message;
                }
            }
            if (data.detail && typeof data.detail === 'string') {
                return data.detail;
            }
            // Try to stringify the object if no clear message found
            try {
                const jsonString = JSON.stringify(data);
                if (jsonString && jsonString !== '{}') {
                    return `Server error: ${jsonString.substring(0, 200)}`;
                }
            }
            catch {
                // JSON stringify failed, continue to fallback
            }
            // Fallback for objects without clear message
            return 'An error occurred while processing your request';
        }
        // Fallback for null/undefined/other types
        return 'An unexpected error occurred';
    }
    // ==========================================================================
    // Authentication
    // ==========================================================================
    /**
     * Set authentication token
     */
    setAuthToken(token) {
        console.log('🔐 HttpClient: Setting auth token:', !!token);
        this.authToken = token;
        // Save to localStorage (client-side only)
        if (typeof window !== 'undefined') {
            if (token) {
                localStorage.setItem('auth_token', token);
                localStorage.setItem('aluplan_access_token', token);
                console.log('🔐 HttpClient: Token saved to localStorage');
            }
            else {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('aluplan_access_token');
                console.log('🔐 HttpClient: Token removed from localStorage');
            }
        }
    }
    /**
     * Get current authentication token
     */
    getAuthToken() {
        return this.authToken;
    }
    /**
     * Clear authentication token
     */
    clearAuthToken() {
        this.authToken = null;
        // Remove from localStorage (client-side only)
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
        }
    }
    // ==========================================================================
    // HTTP Methods
    // ==========================================================================
    /**
     * Generic request method with full type safety
     */
    async request(config) {
        try {
            const response = await this.instance.request(config);
            return response.data;
        }
        catch (error) {
            throw error; // Already handled by interceptor
        }
    }
    /**
     * GET request
     */
    async get(url, config) {
        return this.request({
            method: 'GET',
            url,
            ...config,
        });
    }
    /**
     * POST request
     */
    async post(url, data, config) {
        return this.request({
            method: 'POST',
            url,
            data,
            ...config,
        });
    }
    /**
     * PUT request
     */
    async put(url, data, config) {
        return this.request({
            method: 'PUT',
            url,
            data,
            ...config,
        });
    }
    /**
     * PATCH request
     */
    async patch(url, data, config) {
        return this.request({
            method: 'PATCH',
            url,
            data,
            ...config,
        });
    }
    /**
     * DELETE request
     */
    async delete(url, config) {
        return this.request({
            method: 'DELETE',
            url,
            ...config,
        });
    }
    // ==========================================================================
    // Utility Methods
    // ==========================================================================
    /**
     * Get axios instance for advanced usage
     */
    getAxiosInstance() {
        return this.instance;
    }
    /**
     * Update base URL
     */
    setBaseURL(baseURL) {
        this.config.baseURL = baseURL;
        this.instance.defaults.baseURL = baseURL;
    }
    /**
     * Set custom logger
     */
    setLogger(logger) {
        this.logger = logger;
    }
    /**
     * Disable logging
     */
    disableLogging() {
        this.logger = undefined;
    }
    /**
     * Enable logging
     */
    enableLogging() {
        if (!this.logger) {
            this.logger = this.createDefaultLogger();
        }
    }
    // ==========================================================================
    // Wrapped Response Methods (with ApiResponse<T> unwrapping)
    // ==========================================================================
    /**
     * GET request with automatic ApiResponse unwrapping
     * Use this when backend returns ApiResponse<T>
     *
     * @example
     * ```ts
     * const user = await httpClient.getWrapped<User>('/users/123');
     * // Backend returns: { success: true, data: { id: '123', ... } }
     * // This method returns: { id: '123', ... }
     * ```
     */
    async getWrapped(url, config) {
        try {
            const { unwrapResponse } = await Promise.resolve().then(() => __importStar(require('./response-utils')));
            const response = await this.get(url, config);
            if (this.config.enableLogging) {
                console.log(`[HTTP Client] getWrapped for ${url}:`, {
                    responseType: typeof response,
                    isArray: Array.isArray(response),
                    hasSuccess: response && typeof response === 'object' && 'success' in response,
                });
            }
            return unwrapResponse(response);
        }
        catch (error) {
            if (this.config.enableLogging) {
                console.error(`[HTTP Client] getWrapped error for ${url}:`, error);
            }
            throw error;
        }
    }
    /**
     * POST request with automatic ApiResponse unwrapping
     */
    async postWrapped(url, data, config) {
        const { unwrapResponse } = await Promise.resolve().then(() => __importStar(require('./response-utils')));
        const response = await this.post(url, data, config);
        return unwrapResponse(response);
    }
    /**
     * PUT request with automatic ApiResponse unwrapping
     */
    async putWrapped(url, data, config) {
        const { unwrapResponse } = await Promise.resolve().then(() => __importStar(require('./response-utils')));
        const response = await this.put(url, data, config);
        return unwrapResponse(response);
    }
    /**
     * PATCH request with automatic ApiResponse unwrapping
     */
    async patchWrapped(url, data, config) {
        const { unwrapResponse } = await Promise.resolve().then(() => __importStar(require('./response-utils')));
        const response = await this.patch(url, data, config);
        return unwrapResponse(response);
    }
    /**
     * DELETE request with automatic ApiResponse unwrapping
     */
    async deleteWrapped(url, config) {
        const { unwrapResponse } = await Promise.resolve().then(() => __importStar(require('./response-utils')));
        const response = await this.delete(url, config);
        return unwrapResponse(response);
    }
}
exports.HttpClient = HttpClient;
// ============================================================================
// Singleton Instance
// ============================================================================
/**
 * Default HTTP client instance
 */
exports.httpClient = new HttpClient();
/**
 * Export as default for convenience
 */
exports.default = exports.httpClient;
//# sourceMappingURL=http-client.js.map