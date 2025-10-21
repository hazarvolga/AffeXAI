import { FileUploadService } from '../services/file-upload.service';
import { EnhancedFileSecurityService } from '../services/enhanced-file-security.service';
import { FileProcessingService } from '../services/file-processing.service';
import { FileUploadOptionsDto, FileUploadResponseDto, FileValidationResponseDto, FileInfoResponseDto, UploadStatsResponseDto, CleanupResponseDto, MultipleFileUploadResponseDto } from '../dto/file-upload.dto';
export declare class FileUploadController {
    private readonly fileUploadService;
    private readonly securityService;
    private readonly fileProcessingService;
    private readonly logger;
    constructor(fileUploadService: FileUploadService, securityService: EnhancedFileSecurityService, fileProcessingService: FileProcessingService);
    uploadFile(file: any, options?: FileUploadOptionsDto): Promise<FileUploadResponseDto>;
    uploadMultipleFiles(files: any[], options?: FileUploadOptionsDto): Promise<MultipleFileUploadResponseDto>;
    validateFile(file: any): Promise<FileValidationResponseDto>;
    getFileInfo(jobId: string, fileName: string): Promise<FileInfoResponseDto>;
    deleteFile(jobId: string, fileName: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getUploadStats(): Promise<UploadStatsResponseDto>;
    cleanupOldFiles(maxAgeHours?: number): Promise<CleanupResponseDto>;
}
//# sourceMappingURL=file-upload.controller.d.ts.map