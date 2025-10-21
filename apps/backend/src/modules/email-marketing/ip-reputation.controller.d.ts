import { IpReputationService, IpReputationResult } from './services/ip-reputation.service';
/**
 * Controller for IP reputation checking endpoints
 * This provides RESTful API endpoints for checking IP reputation
 */
export declare class IpReputationController {
    private readonly ipReputationService;
    constructor(ipReputationService: IpReputationService);
    /**
     * Check the reputation of an IP address
     * This endpoint allows external services to check if an IP is listed on spam blacklists
     *
     * @param ip The IP address to check
     * @returns IP reputation result
     */
    checkIpReputation(ip: string, detailed?: boolean): Promise<IpReputationResult>;
    /**
     * Validates IP address format (IPv4 only)
     * This is a helper method to validate IP addresses in the controller
     *
     * @param ip The IP address to validate
     * @returns True if valid IPv4 format, false otherwise
     */
    private isValidIpAddress;
}
//# sourceMappingURL=ip-reputation.controller.d.ts.map