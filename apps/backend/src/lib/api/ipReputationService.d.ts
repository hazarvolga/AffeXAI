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
declare class IpReputationService {
    /**
     * Check the reputation of an IP address
     * @param ip The IP address to check
     * @returns IP reputation result
     */
    checkIpReputation(ip: string): Promise<IpReputationResult>;
}
declare const _default: IpReputationService;
export default _default;
//# sourceMappingURL=ipReputationService.d.ts.map