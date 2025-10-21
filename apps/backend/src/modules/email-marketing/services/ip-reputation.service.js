"use strict";
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
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.IpReputationService = void 0;
const common_1 = require("@nestjs/common");
const dns = __importStar(require("dns"));
let IpReputationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IpReputationService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IpReputationService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        cacheService;
        logger = new common_1.Logger(IpReputationService.name);
        // Common DNSBL (DNS-based Blackhole List) servers
        // These are well-known blacklists for spam/malicious IP addresses
        dnsblServers = [
            'zen.spamhaus.org', // Spamhaus - one of the most reliable and widely used
            'bl.spamcop.net', // SpamCop - focuses on spam sources
            'b.barracudacentral.org', // Barracuda - commercial security provider
            'dnsbl-1.uceprotect.net', // UCEPROTECT - focuses on spam sources
            'dnsbl-2.uceprotect.net',
            'dnsbl-3.uceprotect.net',
            'spam.dnsbl.sorbs.net', // SORBS - Sender Policy Framework
            'dnsbl.dronebl.org' // DroneBL - focuses on open proxies and botnets
        ];
        // Timeout for DNS queries (in milliseconds)
        DNS_TIMEOUT = 5000;
        constructor(cacheService) {
            this.cacheService = cacheService;
        }
        /**
         * Checks if an IP address has a poor reputation by querying multiple DNSBLs
         * This is the main entry point for IP reputation checking
         *
         * @param ip The IP address to check
         * @returns IP reputation result with details
         */
        async checkIpReputation(ip) {
            try {
                // Validate IP format first
                if (!this.isValidIpAddress(ip)) {
                    return {
                        ip,
                        isListed: false,
                        reputation: 'unknown',
                        confidence: 0,
                        details: 'Invalid IP address format'
                    };
                }
                // Check cache first to avoid unnecessary DNS queries
                // This is important for performance and rate limiting
                const cachedResult = await this.cacheService.get(`ip_reputation_${ip}`);
                if (cachedResult) {
                    return cachedResult;
                }
                // Reverse IP for DNSBL queries (e.g., 192.168.1.1 becomes 1.1.168.192)
                // DNSBLs require the IP to be reversed for the query
                const reversedIp = ip.split('.').reverse().join('.');
                // Query multiple DNSBLs in parallel for better performance
                // Using Promise.allSettled to handle failures gracefully
                const dnsblResults = await Promise.allSettled(this.dnsblServers.map(server => this.queryDnsblWithTimeout(reversedIp, server)));
                // Process results from all DNSBL queries
                const listedServers = [];
                const errors = [];
                dnsblResults.forEach((result, index) => {
                    const server = this.dnsblServers[index];
                    if (result.status === 'fulfilled') {
                        // If the IP is listed on this DNSBL, add it to our list
                        if (result.value.isListed) {
                            listedServers.push(server);
                        }
                    }
                    else {
                        // Collect errors for debugging purposes
                        errors.push(`${server}: ${result.reason.message}`);
                    }
                });
                // Calculate reputation based on listings
                // The more blacklists that list the IP, the worse its reputation
                const isListed = listedServers.length > 0;
                const confidence = Math.min(100, Math.round((listedServers.length / this.dnsblServers.length) * 100));
                // Determine overall reputation status
                let reputation = 'unknown';
                if (listedServers.length === 0) {
                    reputation = 'clean';
                }
                else {
                    reputation = 'listed';
                }
                // Prepare the result object
                const result = {
                    ip,
                    isListed,
                    reputation,
                    confidence,
                    listedOn: listedServers,
                    errors: errors.length > 0 ? errors : undefined,
                    details: isListed
                        ? `IP listed on ${listedServers.length} blacklists`
                        : 'IP not listed on any major blacklists'
                };
                // Cache result for 24 hours (86400 seconds)
                // This prevents excessive DNS queries for the same IP and improves performance
                await this.cacheService.set(`ip_reputation_${ip}`, result, 86400);
                return result;
            }
            catch (error) {
                this.logger.error(`IP reputation check failed for ${ip}:`, error);
                return {
                    ip,
                    isListed: false,
                    reputation: 'unknown',
                    confidence: 0,
                    details: `IP reputation check failed: ${error.message}`
                };
            }
        }
        /**
         * Queries a specific DNSBL server with timeout
         * This method adds timeout functionality to prevent hanging DNS queries
         *
         * @param reversedIp The reversed IP address
         * @param dnsblServer The DNSBL server to query
         * @returns DNSBL query result
         */
        async queryDnsblWithTimeout(reversedIp, dnsblServer) {
            // Create a promise that rejects after the timeout period
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('DNS query timeout')), this.DNS_TIMEOUT);
            });
            // Create the actual DNS query promise
            const dnsQueryPromise = this.queryDnsbl(reversedIp, dnsblServer);
            // Race the DNS query against the timeout
            // This ensures we don't hang indefinitely on slow/unresponsive DNS servers
            return Promise.race([dnsQueryPromise, timeoutPromise]);
        }
        /**
         * Queries a specific DNSBL server
         * This is the core DNS lookup functionality
         *
         * @param reversedIp The reversed IP address
         * @param dnsblServer The DNSBL server to query
         * @returns DNSBL query result
         */
        async queryDnsbl(reversedIp, dnsblServer) {
            try {
                const query = `${reversedIp}.${dnsblServer}`;
                // Check cache first to avoid unnecessary DNS queries
                const cached = await this.cacheService.get(`dnsbl_${query}`);
                if (cached !== undefined) {
                    return { isListed: cached };
                }
                // Perform DNS lookup using Node.js built-in DNS module
                // If the IP is listed, we'll get a response with address information
                // If not listed, we'll get an ENOTFOUND or ENODATA error
                return new Promise((resolve, reject) => {
                    // Set a timeout for the DNS query to prevent hanging
                    const timeout = setTimeout(() => {
                        reject(new Error('DNS query timeout'));
                    }, this.DNS_TIMEOUT);
                    dns.resolve4(query, (err, addresses) => {
                        // Clear the timeout since we got a response
                        clearTimeout(timeout);
                        if (err) {
                            // NXDOMAIN (no record found) or NODATA means IP is NOT listed
                            // This is the expected response for clean IPs
                            if (err.code === 'ENOTFOUND' || err.code === 'ENODATA') {
                                // IP is NOT listed
                                this.cacheService.set(`dnsbl_${query}`, false, 86400);
                                resolve({ isListed: false });
                            }
                            else {
                                // Other errors might indicate network issues
                                // We'll treat these as "unknown" rather than assuming listed
                                this.logger.warn(`DNSBL query error for ${query}: ${err.message}`);
                                this.cacheService.set(`dnsbl_${query}`, false, 3600); // Cache for 1 hour
                                resolve({ isListed: false });
                            }
                        }
                        else {
                            // If we get addresses, the IP IS listed on this blacklist
                            if (addresses && addresses.length > 0) {
                                this.cacheService.set(`dnsbl_${query}`, true, 86400);
                                resolve({ isListed: true });
                            }
                            else {
                                // No addresses returned, treat as not listed
                                this.cacheService.set(`dnsbl_${query}`, false, 86400);
                                resolve({ isListed: false });
                            }
                        }
                    });
                });
            }
            catch (error) {
                // Handle any other unexpected errors
                this.logger.error(`Unexpected error in DNSBL query for ${reversedIp}.${dnsblServer}:`, error);
                // Cache negative result for 1 hour to prevent repeated failures
                const query = `${reversedIp}.${dnsblServer}`;
                await this.cacheService.set(`dnsbl_${query}`, false, 3600);
                return { isListed: false };
            }
        }
        /**
         * Validates IP address format (IPv4 only for now)
         * This ensures we're working with valid IP addresses
         *
         * @param ip The IP address to validate
         * @returns True if valid IPv4 format, false otherwise
         */
        isValidIpAddress(ip) {
            // Basic regex pattern for IPv4
            const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
            if (!ipv4Regex.test(ip)) {
                return false;
            }
            // Check that each octet is between 0 and 255
            const octets = ip.split('.').map(Number);
            return octets.every(octet => octet >= 0 && octet <= 255);
        }
        /**
         * Gets domain reputation by checking domain against various reputation services
         * This provides additional context beyond IP reputation
         *
         * @param domain The domain to check
         * @returns Domain reputation result
         */
        async checkDomainReputation(domain) {
            try {
                // Check cache first
                const cachedResult = await this.cacheService.get(`domain_reputation_${domain}`);
                if (cachedResult) {
                    return cachedResult;
                }
                // For now, we'll implement a simple check based on known problematic domains
                // In a production environment, you would integrate with domain reputation services
                const suspiciousDomains = [
                    'tempmail.com', 'guerrillamail.com', 'mailinator.com',
                    '10minutemail.com', 'yopmail.com', 'temp-mail.org'
                ];
                const isSuspicious = suspiciousDomains.some(d => domain.includes(d));
                const result = {
                    domain,
                    isSuspicious,
                    reputation: isSuspicious ? 'poor' : 'good',
                    confidence: isSuspicious ? 90 : 80,
                    details: isSuspicious
                        ? 'Domain associated with temporary email services'
                        : 'Domain appears legitimate'
                };
                // Cache result for 24 hours
                await this.cacheService.set(`domain_reputation_${domain}`, result, 86400);
                return result;
            }
            catch (error) {
                this.logger.error(`Domain reputation check failed for ${domain}:`, error);
                return {
                    domain,
                    isSuspicious: false,
                    reputation: 'unknown',
                    confidence: 0,
                    details: `Domain reputation check failed: ${error.message}`
                };
            }
        }
    };
    return IpReputationService = _classThis;
})();
exports.IpReputationService = IpReputationService;
//# sourceMappingURL=ip-reputation.service.js.map