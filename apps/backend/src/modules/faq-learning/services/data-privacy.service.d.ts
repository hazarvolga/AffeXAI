export interface PIIDetectionResult {
    hasPII: boolean;
    detectedTypes: string[];
    locations: Array<{
        type: string;
        start: number;
        end: number;
        value: string;
    }>;
    confidence: number;
}
export interface AnonymizationResult {
    originalText: string;
    anonymizedText: string;
    replacements: Array<{
        type: string;
        original: string;
        replacement: string;
    }>;
}
export interface GDPRComplianceCheck {
    isCompliant: boolean;
    issues: string[];
    recommendations: string[];
}
export declare class DataPrivacyService {
    private readonly logger;
    private readonly PII_PATTERNS;
    detectPII(text: string): Promise<PIIDetectionResult>;
    anonymizeText(text: string, options?: {
        preserveFormat?: boolean;
        replacementChar?: string;
    }): Promise<AnonymizationResult>;
    filterSensitiveData(data: any): Promise<any>;
    checkGDPRCompliance(data: {
        hasUserConsent: boolean;
        dataRetentionPeriod?: number;
        allowsDataDeletion: boolean;
        hasPrivacyPolicy: boolean;
        encryptsData: boolean;
    }): Promise<GDPRComplianceCheck>;
    sanitizeForStorage(text: string): Promise<string>;
    validateDataSecurity(data: any): Promise<{
        isSecure: boolean;
        vulnerabilities: string[];
        recommendations: string[];
    }>;
    private generateFormattedReplacement;
    private isSensitiveField;
}
//# sourceMappingURL=data-privacy.service.d.ts.map