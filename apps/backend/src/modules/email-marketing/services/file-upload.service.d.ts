import { FileProcessingService } from './file-processing.service';
import { EnhancedFileSecurityService } from './enhanced-file-security.service';
export interface UploadResult {
    jobId: string;
    fileName: string;
    originalFileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    uploadedAt: Date;
}
export interface UploadOptions {
    maxFileSize?: number;
    allowedMimeTypes?: string[];
    generateJobId?: boolean;
    customPath?: string;
}
export interface SecureUploadConfig {
    uploadDir: string;
    maxFileSize: number;
    allowedMimeTypes: string[];
    enableMalwareScanning: boolean;
    autoCleanupHours: number;
}
export declare class FileUploadService {
    private readonly fileProcessingService;
    private readonly enhancedSecurityService;
    private readonly logger;
    private readonly config;
    constructor(fileProcessingService: FileProcessingService, enhancedSecurityService: EnhancedFileSecurityService);
    /**
     * Handle secure file upload with comprehensive validation
     */
    uploadFile(file: any, options?: UploadOptions): Promise<UploadResult>;
    /**
     * Upload multiple files with batch processing
     */
    uploadMultipleFiles(files: any[], options?: UploadOptions): Promise<UploadResult[]>;
    /**
     * Get file information without downloading
     */
    getFileInfo(filePath: string): Promise<{
        exists: boolean;
        size?: number;
        mimeType?: string;
        createdAt?: Date;
        isReadable?: boolean;
    }>;
    /**
     * Securely delete uploaded file
     */
    deleteFile(filePath: string): Promise<boolean>;
    /**
     * Clean up old files based on age
     */
    cleanupOldFiles(maxAgeHours?: number): Promise<number>;
    /**
     * Get upload statistics
     */
    getUploadStats(): Promise<{
        totalFiles: number;
        totalSize: number;
        oldestFile?: Date;
        newestFile?: Date;
    }>;
    /**
     * Validate uploaded file against security policies
     */
    private validateUploadedFile;
    /**
     * Generate secure file path with sanitization
     */
    private generateSecureFilePath;
    /**
     * Save file with secure permissions
     */
    private saveFileSecurely;
    /**
     * Set secure file permissions
     */
    private setSecureFilePermissions;
    /**
     * Generate unique job ID
     */
    private generateJobId;
    /**
     * Sanitize file name to prevent path traversal
     */
    private sanitizeFileName;
    /**
     * Sanitize path components
     */
    private sanitizePath;
    /**
     * Check if file name is secure
     */
    private isFileNameSecure;
    /**
     * Check if path is within allowed upload directory
     */
    private isPathSecure;
    /**
     * Check if file is readable
     */
    private checkFileReadability;
    /**
     * Ensure upload directory exists
     */
    private ensureUploadDirectoryExists;
    /**
     * Ensure specific directory exists
     */
    private ensureDirectoryExists;
    /**
     * Schedule file cleanup after specified hours
     */
    private scheduleFileCleanup;
    /**
     * Get all files recursively from directory
     */
    private getAllFilesRecursively;
    /**
     * Clean up single file
     */
    private cleanupFile;
}
//# sourceMappingURL=file-upload.service.d.ts.map