"use strict";
/**
 * Token Storage Service
 *
 * Manages secure storage and retrieval of authentication tokens.
 * Uses localStorage for persistent sessions and sessionStorage for temporary sessions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenStorage = exports.TokenStorage = void 0;
// ============================================================================
// Token Storage Class
// ============================================================================
/**
 * Token Storage Service
 */
class TokenStorage {
    config;
    storage = null;
    constructor(config) {
        this.config = {
            accessTokenKey: config?.accessTokenKey || 'aluplan_access_token',
            refreshTokenKey: config?.refreshTokenKey || 'aluplan_refresh_token',
            storageType: config?.storageType || 'localStorage',
        };
        // Initialize storage (client-side only)
        if (typeof window !== 'undefined') {
            this.storage =
                this.config.storageType === 'localStorage' ? window.localStorage : window.sessionStorage;
        }
    }
    // ==========================================================================
    // Access Token Methods
    // ==========================================================================
    /**
     * Get access token from storage
     */
    getAccessToken() {
        if (!this.storage)
            return null;
        return this.storage.getItem(this.config.accessTokenKey);
    }
    /**
     * Set access token in storage
     */
    setAccessToken(token) {
        if (!this.storage)
            return;
        this.storage.setItem(this.config.accessTokenKey, token);
    }
    /**
     * Remove access token from storage
     */
    removeAccessToken() {
        if (!this.storage)
            return;
        this.storage.removeItem(this.config.accessTokenKey);
    }
    // ==========================================================================
    // Refresh Token Methods
    // ==========================================================================
    /**
     * Get refresh token from storage
     */
    getRefreshToken() {
        if (!this.storage)
            return null;
        return this.storage.getItem(this.config.refreshTokenKey);
    }
    /**
     * Set refresh token in storage
     */
    setRefreshToken(token) {
        if (!this.storage)
            return;
        this.storage.setItem(this.config.refreshTokenKey, token);
    }
    /**
     * Remove refresh token from storage
     */
    removeRefreshToken() {
        if (!this.storage)
            return;
        this.storage.removeItem(this.config.refreshTokenKey);
    }
    // ==========================================================================
    // Utility Methods
    // ==========================================================================
    /**
     * Check if access token exists
     */
    hasAccessToken() {
        return this.getAccessToken() !== null;
    }
    /**
     * Check if refresh token exists
     */
    hasRefreshToken() {
        return this.getRefreshToken() !== null;
    }
    /**
     * Check if any token exists
     */
    hasTokens() {
        return this.hasAccessToken() || this.hasRefreshToken();
    }
    /**
     * Clear all tokens from storage
     */
    clear() {
        this.removeAccessToken();
        this.removeRefreshToken();
    }
    /**
     * Get storage type
     */
    getStorageType() {
        return this.config.storageType;
    }
    /**
     * Switch storage type (e.g., from sessionStorage to localStorage)
     */
    switchStorageType(storageType) {
        if (typeof window === 'undefined')
            return;
        // Get current tokens before switching
        const accessToken = this.getAccessToken();
        const refreshToken = this.getRefreshToken();
        // Clear old storage
        this.clear();
        // Update storage type
        this.config.storageType = storageType;
        this.storage = storageType === 'localStorage' ? window.localStorage : window.sessionStorage;
        // Restore tokens in new storage
        if (accessToken)
            this.setAccessToken(accessToken);
        if (refreshToken)
            this.setRefreshToken(refreshToken);
    }
    /**
     * Decode JWT token (without verification)
     * Note: This is client-side only and should not be used for security decisions
     */
    decodeToken(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join(''));
            return JSON.parse(jsonPayload);
        }
        catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    }
    /**
     * Check if token is expired
     */
    isTokenExpired(token) {
        const decoded = this.decodeToken(token);
        if (!decoded || !decoded.exp)
            return true;
        const expirationTime = decoded.exp * 1000; // Convert to milliseconds
        return Date.now() >= expirationTime;
    }
    /**
     * Get token expiration time
     */
    getTokenExpiration(token) {
        const decoded = this.decodeToken(token);
        if (!decoded || !decoded.exp)
            return null;
        return new Date(decoded.exp * 1000);
    }
    /**
     * Get time until token expires (in milliseconds)
     */
    getTimeUntilExpiration(token) {
        const expirationDate = this.getTokenExpiration(token);
        if (!expirationDate)
            return null;
        return expirationDate.getTime() - Date.now();
    }
    /**
     * Check if access token needs refresh (expires in less than 5 minutes)
     */
    shouldRefreshToken(bufferMinutes = 5) {
        const accessToken = this.getAccessToken();
        if (!accessToken)
            return false;
        const timeUntilExpiration = this.getTimeUntilExpiration(accessToken);
        if (timeUntilExpiration === null)
            return false;
        const bufferMs = bufferMinutes * 60 * 1000;
        return timeUntilExpiration < bufferMs;
    }
}
exports.TokenStorage = TokenStorage;
// ============================================================================
// Singleton Instance
// ============================================================================
/**
 * Default token storage instance
 */
exports.tokenStorage = new TokenStorage();
/**
 * Export as default for convenience
 */
exports.default = exports.tokenStorage;
//# sourceMappingURL=token-storage.js.map