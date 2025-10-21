import { CacheService } from '../../../shared/services/cache.service';
/**
 * Interface for IP reputation result
 */
export interface IpReputationResult {
    ip: string;
    isListed: boolean;
    reputation: 'clean' | 'listed' | 'unknown';
    confidence: number;
    listedOn?: string[];
    errors?: string[];
    details: string;
}
/**
 * Interface for domain reputation result
 */
export interface DomainReputationResult {
    domain: string;
    isSuspicious: boolean;
    reputation: 'good' | 'poor' | 'unknown';
    confidence: number;
    details: string;
}
export declare class IpReputationService {
    private readonly cacheService;
    private readonly logger;
    private readonly dnsblServers;
    private readonly DNS_TIMEOUT;
    constructor(cacheService: CacheService);
    /**
     * Checks if an IP address has a poor reputation by querying multiple DNSBLs
     * This is the main entry point for IP reputation checking
     *
     * @param ip The IP address to check
     * @returns IP reputation result with details
     */
    checkIpReputation(ip: string): Promise<IpReputationResult>;
    /**
     * Queries a specific DNSBL server with timeout
     * This method adds timeout functionality to prevent hanging DNS queries
     *
     * @param reversedIp The reversed IP address
     * @param dnsblServer The DNSBL server to query
     * @returns DNSBL query result
     */
    private queryDnsblWithTimeout;
    /**
     * Queries a specific DNSBL server
     * This is the core DNS lookup functionality
     *
     * @param reversedIp The reversed IP address
     * @param dnsblServer The DNSBL server to query
     * @returns DNSBL query result
     */
    private queryDnsbl;
    /**
     * Validates IP address format (IPv4 only for now)
     * This ensures we're working with valid IP addresses
     *
     * @param ip The IP address to validate
     * @returns True if valid IPv4 format, false otherwise
     */
    private isValidIpAddress;
    /**
     * Gets domain reputation by checking domain against various reputation services
     * This provides additional context beyond IP reputation
     *
     * @param domain The domain to check
     * @returns Domain reputation result
     */
    checkDomainReputation(domain: string): Promise<DomainReputationResult>;
}
//# sourceMappingURL=ip-reputation.service.d.ts.map