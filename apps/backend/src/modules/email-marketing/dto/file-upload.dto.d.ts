export declare class FileUploadOptionsDto {
    maxFileSize?: number;
    allowedMimeTypes?: string[];
    generateJobId?: boolean;
    customPath?: string;
}
export declare class FileUploadResponseDto {
    jobId: string;
    fileName: string;
    originalFileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    uploadedAt: Date;
}
export declare class FileValidationResponseDto {
    isValid: boolean;
    fileType: string;
    fileSize: number;
    errors: string[];
    warnings: string[];
}
export declare class FileInfoResponseDto {
    exists: boolean;
    size?: number;
    mimeType?: string;
    createdAt?: Date;
    isReadable?: boolean;
}
export declare class UploadStatsResponseDto {
    totalFiles: number;
    totalSize: number;
    oldestFile?: Date;
    newestFile?: Date;
}
export declare class CleanupResponseDto {
    cleanedCount: number;
    cleanedAt: Date;
}
export declare class MultipleFileUploadResponseDto {
    successful: FileUploadResponseDto[];
    failed: Array<{
        fileName: string;
        error: string;
    }>;
    totalProcessed: number;
    successCount: number;
    failureCount: number;
}
//# sourceMappingURL=file-upload.dto.d.ts.map