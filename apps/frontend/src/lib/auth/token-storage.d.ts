/**
 * Token Storage Service
 *
 * Manages secure storage and retrieval of authentication tokens.
 * Uses localStorage for persistent sessions and sessionStorage for temporary sessions.
 */
export type StorageType = 'localStorage' | 'sessionStorage';
export interface TokenStorageConfig {
    accessTokenKey: string;
    refreshTokenKey: string;
    storageType: StorageType;
}
/**
 * Token Storage Service
 */
export declare class TokenStorage {
    private config;
    private storage;
    constructor(config?: Partial<TokenStorageConfig>);
    /**
     * Get access token from storage
     */
    getAccessToken(): string | null;
    /**
     * Set access token in storage
     */
    setAccessToken(token: string): void;
    /**
     * Remove access token from storage
     */
    removeAccessToken(): void;
    /**
     * Get refresh token from storage
     */
    getRefreshToken(): string | null;
    /**
     * Set refresh token in storage
     */
    setRefreshToken(token: string): void;
    /**
     * Remove refresh token from storage
     */
    removeRefreshToken(): void;
    /**
     * Check if access token exists
     */
    hasAccessToken(): boolean;
    /**
     * Check if refresh token exists
     */
    hasRefreshToken(): boolean;
    /**
     * Check if any token exists
     */
    hasTokens(): boolean;
    /**
     * Clear all tokens from storage
     */
    clear(): void;
    /**
     * Get storage type
     */
    getStorageType(): StorageType;
    /**
     * Switch storage type (e.g., from sessionStorage to localStorage)
     */
    switchStorageType(storageType: StorageType): void;
    /**
     * Decode JWT token (without verification)
     * Note: This is client-side only and should not be used for security decisions
     */
    decodeToken(token: string): any;
    /**
     * Check if token is expired
     */
    isTokenExpired(token: string): boolean;
    /**
     * Get token expiration time
     */
    getTokenExpiration(token: string): Date | null;
    /**
     * Get time until token expires (in milliseconds)
     */
    getTimeUntilExpiration(token: string): number | null;
    /**
     * Check if access token needs refresh (expires in less than 5 minutes)
     */
    shouldRefreshToken(bufferMinutes?: number): boolean;
}
/**
 * Default token storage instance
 */
export declare const tokenStorage: TokenStorage;
/**
 * Export as default for convenience
 */
export default tokenStorage;
//# sourceMappingURL=token-storage.d.ts.map