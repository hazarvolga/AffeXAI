import { Repository } from 'typeorm';
import { ChatDocument, DocumentProcessingStatus } from '../entities/chat-document.entity';
import { FileValidatorService } from './file-validator.service';
export interface ProcessedDocument {
    id: string;
    filename: string;
    fileType: string;
    fileSize: number;
    extractedContent: string;
    metadata: Record<string, any>;
    processingStatus: DocumentProcessingStatus;
}
export interface DocumentMetadata {
    mimeType?: string;
    pageCount?: number;
    wordCount?: number;
    lineCount?: number;
    characterCount?: number;
    characterCountNoSpaces?: number;
    readingTimeMinutes?: number;
    extractionMethod?: string;
    processingError?: string;
    checksum?: string;
    contentChecksum?: string;
    language?: string;
    hasImages?: boolean;
    hasTables?: boolean;
}
export declare class DocumentProcessorService {
    private readonly documentRepository;
    private readonly fileValidator;
    private readonly logger;
    private readonly uploadDir;
    private readonly maxFileSize;
    readonly supportedFormats: string[];
    private readonly mimeTypes;
    constructor(documentRepository: Repository<ChatDocument>, fileValidator: FileValidatorService);
    /**
     * Process uploaded document and extract text content
     */
    processDocument(file: Buffer, filename: string, sessionId: string, messageId?: string, declaredMimeType?: string): Promise<ProcessedDocument>;
    /**
     * Extract text content from different file formats
     */
    extractText(file: Buffer, fileType: string): Promise<string>;
    /**
     * Generate metadata for processed document
     */
    generateMetadata(content: string, filename: string, fileType: string): DocumentMetadata;
    /**
     * Get document processing status
     */
    getProcessingStatus(documentId: string): Promise<ChatDocument>;
    /**
     * Get all documents for a session
     */
    getSessionDocuments(sessionId: string): Promise<ChatDocument[]>;
    private processDocumentAsync;
    /**
     * Notify processing completion via WebSocket
     */
    private notifyProcessingComplete;
    /**
     * Notify processing failure via WebSocket
     */
    private notifyProcessingFailed;
    private getFileExtension;
    private generateChecksum;
    private saveFile;
    private ensureUploadDirectory;
    private ensureDirectory;
    private getExtractionMethod;
    private extractFromPdf;
    private extractFromDocx;
    private extractFromXlsx;
    private extractFromTxt;
    private extractFromMarkdown;
    /**
     * Detect encoding and decode text content
     */
    private detectAndDecodeText;
    /**
     * Simple language detection based on common words
     */
    private detectLanguage;
    /**
     * Detect if content contains images (based on file type and content)
     */
    private detectImages;
    /**
     * Detect if content contains tables
     */
    private detectTables;
}
//# sourceMappingURL=document-processor.service.d.ts.map