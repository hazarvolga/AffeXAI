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
 * IP Reputation Service
 * Handles IP reputation checking operations
 */
declare class IpReputationService {
    /**
     * Check the reputation of an IP address
     * @param ip The IP address to check
     * @returns IP reputation result
     */
    checkIpReputation(ip: string): Promise<IpReputationResult>;
}
export declare const ipReputationService: IpReputationService;
export default ipReputationService;
//# sourceMappingURL=ipReputationService.d.ts.map