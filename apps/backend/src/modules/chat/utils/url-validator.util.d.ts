export interface UrlValidationResult {
    isValid: boolean;
    error?: string;
    normalizedUrl?: string;
    domain?: string;
    protocol?: string;
}
export declare class UrlValidator {
    private static readonly ALLOWED_PROTOCOLS;
    private static readonly BLOCKED_DOMAINS;
    private static readonly BLOCKED_EXTENSIONS;
    /**
     * Validate and normalize URL
     */
    static validate(url: string): UrlValidationResult;
    /**
     * Check if hostname is a private IP address
     */
    private static isPrivateIP;
    /**
     * Normalize URL for consistent caching
     */
    private static normalizeUrl;
    /**
     * Extract domain from URL
     */
    static extractDomain(url: string): string | null;
    /**
     * Check if URL is likely to be a web page (not a file download)
     */
    static isWebPage(url: string): boolean;
    /**
     * Validate multiple URLs
     */
    static validateBatch(urls: string[]): Array<UrlValidationResult & {
        originalUrl: string;
    }>;
    /**
     * Check if URL is safe for crawling (basic security checks)
     */
    static isSafeForCrawling(url: string): boolean;
    /**
     * Get URL metadata for display
     */
    static getUrlMetadata(url: string): {
        domain: string | null;
        protocol: string | null;
        path: string | null;
        isSecure: boolean;
    };
}
//# sourceMappingURL=url-validator.util.d.ts.map