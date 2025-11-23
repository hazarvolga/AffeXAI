export declare class UploadDocumentDto {
    sessionId: string;
    messageId?: string;
}
export declare class DocumentUploadResponse {
    id: string;
    filename: string;
    fileType: string;
    fileSize: number;
    processingStatus: string;
    createdAt: Date;
}
export declare class DocumentProcessingStatusDto {
    id: string;
    processingStatus: string;
    extractedContent?: string;
    metadata?: Record<string, any>;
    processedAt?: Date;
}
//# sourceMappingURL=upload-document.dto.d.ts.map