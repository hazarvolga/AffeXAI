import { EnhancedFileSecurityService, FileSecurityReport } from './enhanced-file-security.service';
import { CustomFieldService } from './custom-field.service';
export interface CsvParseResult {
    headers: string[];
    data: any[];
    totalRows: number;
    errors: ParseError[];
}
export interface ParseError {
    row: number;
    message: string;
    code: string;
}
export interface ColumnDetectionResult {
    detectedColumns: DetectedColumn[];
    suggestions: ColumnSuggestion[];
    confidence: number;
}
export interface DetectedColumn {
    name: string;
    type: 'email' | 'text' | 'number' | 'date' | 'unknown';
    samples: string[];
    nullCount: number;
    uniqueCount: number;
}
export interface ColumnSuggestion {
    csvColumn: string;
    suggestedField: string;
    confidence: number;
    reason: string;
}
export interface FileValidationResult {
    isValid: boolean;
    fileType: string;
    fileSize: number;
    errors: string[];
    warnings: string[];
}
export declare class FileProcessingService {
    private readonly enhancedSecurityService;
    private readonly customFieldService;
    private readonly logger;
    constructor(enhancedSecurityService: EnhancedFileSecurityService, customFieldService: CustomFieldService);
    private readonly ALLOWED_MIME_TYPES;
    private readonly MAX_FILE_SIZE;
    private readonly FIELD_PATTERNS;
    /**
     * Validate file type and basic security checks
     */
    validateFileType(file: any): Promise<FileValidationResult>;
    /**
     * Enhanced malware scanning using advanced security service
     */
    scanForMalware(filePath: string): Promise<boolean>;
    /**
     * Perform comprehensive security validation and storage
     */
    secureFileProcessing(filePath: string, jobId: string): Promise<FileSecurityReport>;
    /**
     * Parse CSV file with comprehensive error handling
     */
    parseCsvFile(filePath: string): Promise<CsvParseResult>;
    /**
     * Detect column types and suggest field mappings
     */
    detectColumns(csvData: any[]): Promise<ColumnDetectionResult>;
    /**
     * Validate column mapping configuration with custom fields support
     */
    validateColumnMapping(mapping: Record<string, string>): Promise<boolean>;
    /**
     * Process subscriber data with custom fields
     */
    processSubscriberData(csvData: any[], columnMapping: Record<string, string>): Promise<{
        processedData: any[];
        errors: string[];
    }>;
    /**
     * Enhanced cleanup of temporary files with security considerations
     */
    cleanupTempFiles(jobId: string): Promise<void>;
    /**
     * Verify file integrity before processing
     */
    verifyFileIntegrity(filePath: string, jobId: string): Promise<boolean>;
    /**
     * Generate secure file path for uploaded files
     */
    generateSecureFilePath(originalFileName: string, jobId: string): string;
    /**
     * Sanitize file name to prevent path traversal attacks
     */
    private sanitizeFileName;
    /**
     * Check if detected file type is compatible with declared MIME type
     */
    private isCompatibleFileType;
    /**
     * Analyze individual column to determine type and characteristics
     */
    private analyzeColumn;
    /**
     * Check if column contains email addresses
     */
    private isEmailColumn;
    /**
     * Check if column contains numbers
     */
    private isNumberColumn;
    /**
     * Check if column contains dates
     */
    private isDateColumn;
    /**
     * Suggest field mapping based on column name and content
     */
    private suggestFieldMapping;
}
//# sourceMappingURL=file-processing.service.d.ts.map