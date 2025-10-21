export interface MalwareScanResult {
    isClean: boolean;
    threats: string[];
    scanEngine: string;
    scanTime: Date;
    details?: any;
}
export interface FileSecurityReport {
    filePath: string;
    isSecure: boolean;
    malwareScan: MalwareScanResult;
    integrityCheck: boolean;
    permissionsSet: boolean;
    quarantined: boolean;
    issues: string[];
}
export interface SecurityConfig {
    enableAdvancedMalwareScanning: boolean;
    enableFileIntegrityChecking: boolean;
    quarantineDirectory: string;
    maxQuarantineRetentionDays: number;
    enableRealTimeScanning: boolean;
    trustedFileHashes: Set<string>;
}
export declare class EnhancedFileSecurityService {
    private readonly logger;
    private readonly config;
    private readonly MALWARE_SIGNATURES;
    private readonly SUSPICIOUS_PATTERNS;
    constructor();
    /**
     * Perform comprehensive malware scanning
     */
    performAdvancedMalwareScan(filePath: string): Promise<MalwareScanResult>;
    /**
     * Implement secure file storage with access controls
     */
    secureFileStorage(filePath: string, jobId: string): Promise<FileSecurityReport>;
    /**
     * Automatic cleanup of sensitive temporary files
     */
    automaticSensitiveFileCleanup(jobId?: string, maxAgeHours?: number): Promise<{
        cleanedFiles: number;
        errors: string[];
        totalSize: number;
    }>;
    /**
     * Verify file integrity using stored hashes
     */
    verifyFileIntegrity(filePath: string, jobId: string): Promise<boolean>;
    /**
     * Get security audit report for a job
     */
    getSecurityAuditReport(jobId: string): Promise<{
        jobId: string;
        totalFiles: number;
        secureFiles: number;
        quarantinedFiles: number;
        integrityViolations: number;
        threatsSummary: Record<string, number>;
        recommendations: string[];
    }>;
    private initializeSecurityService;
    private scanFileSignatures;
    private scanSuspiciousPatterns;
    private analyzeSuspiciousBehavior;
    private isExternalScannerAvailable;
    private performExternalScan;
    private analyzeFileEntropy;
    private calculateEntropy;
    private quarantineFile;
    private setSecurePermissions;
    private createFileIntegrityHash;
    private storeFileIntegrityHash;
    private getStoredFileIntegrityHash;
    private applyAccessControls;
    private cleanupDirectory;
    private cleanupQuarantineDirectory;
    private getAllFilesRecursively;
    private removeEmptyDirectories;
}
//# sourceMappingURL=enhanced-file-security.service.d.ts.map