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
import { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
/**
 * HTTP Client configuration options
 */
export interface HttpClientConfig {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
    withCredentials?: boolean;
    enableLogging?: boolean;
    retryAttempts?: number;
    retryDelay?: number;
}
/**
 * API Error class for standardized error handling
 */
export declare class ApiError extends Error {
    readonly status: number;
    readonly statusText: string;
    readonly code: string;
    readonly data?: any;
    readonly isNetworkError: boolean;
    readonly isTimeoutError: boolean;
    constructor(message: string, status?: number, statusText?: string, data?: any, isNetworkError?: boolean, isTimeoutError?: boolean, code?: string);
    /**
     * Extract error code from response data
     */
    private extractErrorCode;
    /**
     * Get user-friendly error message using error messages module
     */
    getUserMessage(): string;
    /**
     * Get basic error message (fallback)
     */
    private getBasicMessage;
}
/**
 * Request/Response logger interface
 */
interface RequestLogger {
    logRequest(config: InternalAxiosRequestConfig): void;
    logResponse(response: AxiosResponse): void;
    logError(error: AxiosError): void;
}
/**
 * Unified HTTP Client class
 */
export declare class HttpClient {
    private instance;
    private config;
    private logger?;
    private authToken;
    constructor(config?: HttpClientConfig);
    private createDefaultLogger;
    private setupRequestInterceptor;
    private isRefreshing;
    private refreshSubscribers;
    private onTokenRefreshed;
    private addRefreshSubscriber;
    private setupResponseInterceptor;
    private handleRefreshFailure;
    private handleError;
    private extractErrorMessage;
    /**
     * Set authentication token
     */
    setAuthToken(token: string | null): void;
    /**
     * Get current authentication token
     */
    getAuthToken(): string | null;
    /**
     * Clear authentication token
     */
    clearAuthToken(): void;
    /**
     * Generic request method with full type safety
     */
    request<T>(config: AxiosRequestConfig): Promise<T>;
    /**
     * GET request
     */
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    /**
     * POST request
     */
    post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>;
    /**
     * PUT request
     */
    put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>;
    /**
     * PATCH request
     */
    patch<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>;
    /**
     * DELETE request
     */
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    /**
     * Get axios instance for advanced usage
     */
    getAxiosInstance(): AxiosInstance;
    /**
     * Update base URL
     */
    setBaseURL(baseURL: string): void;
    /**
     * Set custom logger
     */
    setLogger(logger: RequestLogger): void;
    /**
     * Disable logging
     */
    disableLogging(): void;
    /**
     * Enable logging
     */
    enableLogging(): void;
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
    getWrapped<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    /**
     * POST request with automatic ApiResponse unwrapping
     */
    postWrapped<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>;
    /**
     * PUT request with automatic ApiResponse unwrapping
     */
    putWrapped<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>;
    /**
     * PATCH request with automatic ApiResponse unwrapping
     */
    patchWrapped<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>;
    /**
     * DELETE request with automatic ApiResponse unwrapping
     */
    deleteWrapped<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}
/**
 * Default HTTP client instance
 */
export declare const httpClient: HttpClient;
/**
 * Export as default for convenience
 */
export default httpClient;
//# sourceMappingURL=http-client.d.ts.map