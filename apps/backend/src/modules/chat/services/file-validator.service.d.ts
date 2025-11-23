export interface FileValidationResult {
    isValid: boolean;
    fileType: string;
    mimeType: string;
    checksum: string;
    securityChecks: {
        hasExecutableContent: boolean;
        hasScriptContent: boolean;
        hasSuspiciousPatterns: boolean;
        isPasswordProtected: boolean;
    };
}
export declare class FileValidatorService {
    private readonly logger;
    private readonly supportedFormats;
    private readonly maxFileSize;
    private readonly fileSignatures;
    private readonly suspiciousPatterns;
    /**
     * Validate uploaded file comprehensively
     */
    validateFile(file: Buffer, filename: string, declaredMimeType?: string): Promise<FileValidationResult>;
    /**
     * Validate file size
     */
    private validateFileSize;
    /**
     * Validate filename
     */
    private validateFilename;
    /**
     * Extract and validate file type from filename
     */
    private extractFileType;
    /**
     * Validate file type against supported formats
     */
    private validateFileType;
    /**
     * Validate file signature (magic numbers)
     */
    private validateFileSignature;
    /**
     * Perform comprehensive security checks
     */
    private performSecurityChecks;
    /**
     * Check if file is password protected
     */
    private checkPasswordProtection;
    /**
     * Generate file checksum
     */
    private generateChecksum;
    /**
     * Get supported file formats
     */
    getSupportedFormats(): string[];
    /**
     * Get maximum file size
     */
    getMaxFileSize(): number;
}
//# sourceMappingURL=file-validator.service.d.ts.map