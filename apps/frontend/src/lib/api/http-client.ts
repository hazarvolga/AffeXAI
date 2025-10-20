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

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import type { ApiResponse } from '@affexai/shared-types';

// ============================================================================
// Types
// ============================================================================

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
export class ApiError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly code: string;
  public readonly data?: any;
  public readonly isNetworkError: boolean;
  public readonly isTimeoutError: boolean;

  constructor(
    message: string,
    status: number = 0,
    statusText: string = '',
    data?: any,
    isNetworkError: boolean = false,
    isTimeoutError: boolean = false,
    code?: string
  ) {
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
  private extractErrorCode(data: any): string | undefined {
    if (data && typeof data === 'object') {
      return data.code || data.errorCode || data.error?.code;
    }
    return undefined;
  }

  /**
   * Get user-friendly error message using error messages module
   */
  getUserMessage(): string {
    // Dynamic import to avoid circular dependency
    try {
      const { getErrorMessage } = require('../errors/error-messages');
      return getErrorMessage(this.code, this.status);
    } catch {
      // Fallback to basic messages if error-messages module not available
      return this.getBasicMessage();
    }
  }

  /**
   * Get basic error message (fallback)
   */
  private getBasicMessage(): string {
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

/**
 * Request/Response logger interface
 */
interface RequestLogger {
  logRequest(config: InternalAxiosRequestConfig): void;
  logResponse(response: AxiosResponse): void;
  logError(error: AxiosError): void;
}

// ============================================================================
// HTTP Client Implementation
// ============================================================================

/**
 * Unified HTTP Client class
 */
export class HttpClient {
  private instance: AxiosInstance;
  private config: Required<HttpClientConfig>;
  private logger?: RequestLogger;
  private authToken: string | null = null;

  constructor(config?: HttpClientConfig) {
    // Default configuration
    this.config = {
      baseURL: config?.baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9005',
      timeout: config?.timeout || 30000, // 30 seconds
      headers: config?.headers || {},
      withCredentials: config?.withCredentials ?? true,
      enableLogging: config?.enableLogging ?? process.env.NODE_ENV === 'development',
      retryAttempts: config?.retryAttempts || 3,
      retryDelay: config?.retryDelay || 1000,
    };

    // Create axios instance
    this.instance = axios.create({
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

  private createDefaultLogger(): RequestLogger {
    return {
      logRequest: (config: InternalAxiosRequestConfig) => {
        console.log(`[HTTP] → ${config.method?.toUpperCase()} ${config.url}`);
        if (config.data) {
          console.log('[HTTP] Request data:', config.data);
        }
      },
      logResponse: (response: AxiosResponse) => {
        console.log(
          `[HTTP] ← ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`
        );
      },
      logError: (error: AxiosError) => {
        console.error(
          `[HTTP] ✗ ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
          error.message
        );
        if (error.response) {
          console.error('[HTTP] Response:', error.response.status, error.response.data);
        }
      },
    };
  }

  // ==========================================================================
  // Interceptors
  // ==========================================================================

  private setupRequestInterceptor(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
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
            } catch (error) {
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
        } else {
          console.log('🔐 HTTP Client: No token available for request');
          console.log('🔐 HTTP Client: Debug - localStorage keys:', Object.keys(localStorage));
        }

        // Log request
        if (this.logger) {
          this.logger.logRequest(config);
        }

        return config;
      },
      (error: AxiosError) => {
        if (this.logger) {
          this.logger.logError(error);
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  // Track refresh state to prevent concurrent refresh attempts
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  private onTokenRefreshed(newToken: string): void {
    this.refreshSubscribers.forEach((callback) => callback(newToken));
    this.refreshSubscribers = [];
  }

  private addRefreshSubscriber(callback: (token: string) => void): void {
    this.refreshSubscribers.push(callback);
  }

  private setupResponseInterceptor(): void {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
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
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

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
              this.addRefreshSubscriber((newToken: string) => {
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
            let refreshToken: string | null = null;
            if (typeof window !== 'undefined') {
              try {
                const tokenStorageModule = require('../auth/token-storage');
                const tokenStorage = tokenStorageModule.tokenStorage || tokenStorageModule.default;
                refreshToken = tokenStorage?.getRefreshToken();
                console.log('🔄 Refresh token found:', !!refreshToken);
              } catch (error) {
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
              } catch (error) {
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
          } catch (refreshError) {
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
      }
    );
  }

  private async handleRefreshFailure(): Promise<void> {
    // Clear all tokens
    if (typeof window !== 'undefined') {
      try {
        const tokenStorageModule = require('../auth/token-storage');
        const tokenStorage = tokenStorageModule.tokenStorage || tokenStorageModule.default;
        tokenStorage?.clear();
        localStorage.removeItem('auth_token');
        localStorage.removeItem('aluplan_access_token');
      } catch (error) {
        console.error('Error clearing tokens:', error);
      }

      // Redirect to login
      window.location.href = '/login';
    }
  }

  // ==========================================================================
  // Error Handling
  // ==========================================================================

  private handleError(error: AxiosError): ApiError {
    // Network error (no response from server)
    if (!error.response) {
      const isTimeoutError = error.code === 'ECONNABORTED';
      const isNetworkError = error.code === 'ERR_NETWORK' || error.message.includes('Network Error');

      return new ApiError(
        error.message || 'Network error occurred',
        0,
        '',
        undefined,
        isNetworkError,
        isTimeoutError
      );
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

    return new ApiError(
      message,
      response.status,
      response.statusText,
      response.data,
      false,
      false
    );
  }

  private extractErrorMessage(data: any): string {
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
      } catch {
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
  public setAuthToken(token: string | null): void {
    console.log('🔐 HttpClient: Setting auth token:', !!token);
    this.authToken = token;
    // Save to localStorage (client-side only)
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('aluplan_access_token', token);
        console.log('🔐 HttpClient: Token saved to localStorage');
      } else {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('aluplan_access_token');
        console.log('🔐 HttpClient: Token removed from localStorage');
      }
    }
  }

  /**
   * Get current authentication token
   */
  public getAuthToken(): string | null {
    return this.authToken;
  }

  /**
   * Clear authentication token
   */
  public clearAuthToken(): void {
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
  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.request<T>(config);
      return response.data;
    } catch (error) {
      throw error; // Already handled by interceptor
    }
  }

  /**
   * GET request
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      method: 'GET',
      url,
      ...config,
    });
  }

  /**
   * POST request
   */
  public async post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({
      method: 'POST',
      url,
      data,
      ...config,
    });
  }

  /**
   * PUT request
   */
  public async put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({
      method: 'PUT',
      url,
      data,
      ...config,
    });
  }

  /**
   * PATCH request
   */
  public async patch<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({
      method: 'PATCH',
      url,
      data,
      ...config,
    });
  }

  /**
   * DELETE request
   */
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
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
  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }

  /**
   * Update base URL
   */
  public setBaseURL(baseURL: string): void {
    this.config.baseURL = baseURL;
    this.instance.defaults.baseURL = baseURL;
  }

  /**
   * Set custom logger
   */
  public setLogger(logger: RequestLogger): void {
    this.logger = logger;
  }

  /**
   * Disable logging
   */
  public disableLogging(): void {
    this.logger = undefined;
  }

  /**
   * Enable logging
   */
  public enableLogging(): void {
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
  public async getWrapped<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const { unwrapResponse } = await import('./response-utils');
      const response = await this.get<any>(url, config);
      
      if (this.config.enableLogging) {
        console.log(`[HTTP Client] getWrapped for ${url}:`, {
          responseType: typeof response,
          isArray: Array.isArray(response),
          hasSuccess: response && typeof response === 'object' && 'success' in response,
        });
      }
      
      return unwrapResponse<T>(response);
    } catch (error) {
      if (this.config.enableLogging) {
        console.error(`[HTTP Client] getWrapped error for ${url}:`, error);
      }
      throw error;
    }
  }

  /**
   * POST request with automatic ApiResponse unwrapping
   */
  public async postWrapped<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { unwrapResponse } = await import('./response-utils');
    const response = await this.post<any, D>(url, data, config);
    return unwrapResponse<T>(response);
  }

  /**
   * PUT request with automatic ApiResponse unwrapping
   */
  public async putWrapped<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { unwrapResponse } = await import('./response-utils');
    const response = await this.put<any, D>(url, data, config);
    return unwrapResponse<T>(response);
  }

  /**
   * PATCH request with automatic ApiResponse unwrapping
   */
  public async patchWrapped<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const { unwrapResponse } = await import('./response-utils');
    const response = await this.patch<any, D>(url, data, config);
    return unwrapResponse<T>(response);
  }

  /**
   * DELETE request with automatic ApiResponse unwrapping
   */
  public async deleteWrapped<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { unwrapResponse } = await import('./response-utils');
    const response = await this.delete<any>(url, config);
    return unwrapResponse<T>(response);
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

/**
 * Default HTTP client instance
 */
export const httpClient = new HttpClient();

/**
 * Export as default for convenience
 */
export default httpClient;
