interface EmailValidationResult {
    email: string;
    isValid: boolean;
    status: 'valid' | 'invalid' | 'risky' | 'unknown';
    confidence: number;
    checks?: {
        syntax?: {
            isValid: boolean;
            details: string;
        };
        domain?: {
            isValid: boolean;
            details: string;
        };
        mx?: {
            isValid: boolean;
            details: string;
        };
        disposable?: {
            isValid: boolean;
            details: string;
        };
        roleAccount?: {
            isValid: boolean;
            details: string;
        };
        typo?: {
            isValid: boolean;
            details: string;
            suggestion?: string;
        };
        ipReputation?: {
            isValid: boolean;
            details: string;
            reputation: string;
            confidence: number;
        };
        domainReputation?: {
            isValid: boolean;
            details: string;
            reputation: string;
            confidence: number;
        };
    };
    error?: string;
}
/**
 * Email Validation Service
 * Handles email validation operations
 */
declare class EmailValidationService {
    validateEmail(email: string, ip?: string): Promise<EmailValidationResult>;
}
export declare const emailValidationService: EmailValidationService;
export default emailValidationService;
//# sourceMappingURL=emailValidationService.d.ts.map