import { CacheService } from '../../../shared/services/cache.service';
import { IpReputationService } from './ip-reputation.service';
export declare class AdvancedEmailValidationService {
    private readonly cacheService;
    private readonly ipReputationService;
    private readonly logger;
    private readonly disposableDomains;
    private readonly roleAccounts;
    private readonly commonTypos;
    constructor(cacheService: CacheService, ipReputationService: IpReputationService);
    /**
     * Main validation method that runs all checks
     * @param email The email address to validate
     * @param senderIp Optional IP address of the sender for reputation checking
     * @returns Detailed validation result with confidence score
     */
    validateEmail(email: string, senderIp?: string): Promise<EmailValidationResult>;
    /**
     * Validates email syntax using RFC 5322 compliant regex
     */
    private validateSyntax;
    /**
     * Validates domain existence
     */
    private validateDomain;
    /**
     * Checks MX records for the domain
     */
    private checkMXRecords;
    /**
     * Checks if domain is disposable/temporary
     */
    private checkDisposable;
    /**
     * Checks if email is a role account
     */
    private checkRoleAccount;
    /**
     * Checks for common typos in domain names
     */
    private checkTypos;
    /**
     * Calculates confidence score based on all checks
     */
    private calculateConfidence;
    /**
     * Optional SMTP verification (use with caution)
     * WARNING: This can be slow and may be blocked by mail servers
     */
    private verifySMTP;
}
interface ValidationCheck {
    isValid: boolean;
    details: string;
}
interface IpReputationCheck extends ValidationCheck {
    reputation: 'good' | 'neutral' | 'poor' | 'unknown';
    confidence: number;
}
interface DomainReputationCheck extends ValidationCheck {
    reputation: 'good' | 'poor' | 'unknown';
    confidence: number;
    isSuspicious?: boolean;
}
interface EmailValidationResult {
    email: string;
    isValid: boolean;
    status: 'valid' | 'invalid' | 'risky' | 'unknown';
    confidence: number;
    checks?: {
        syntax?: ValidationCheck;
        domain?: ValidationCheck;
        mx?: ValidationCheck;
        disposable?: ValidationCheck;
        roleAccount?: ValidationCheck;
        typo?: ValidationCheck & {
            suggestion?: string;
        };
        smtp?: ValidationCheck;
        ipReputation?: IpReputationCheck;
        domainReputation?: DomainReputationCheck;
    };
    error?: string;
}
export {};
//# sourceMappingURL=advanced-email-validation.service.d.ts.map