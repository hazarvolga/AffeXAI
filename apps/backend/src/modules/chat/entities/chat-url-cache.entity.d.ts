import { BaseEntity } from '../../../database/entities/base.entity';
export declare enum UrlProcessingStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    FAILED = "failed"
}
export declare class ChatUrlCache extends BaseEntity {
    urlHash: string;
    originalUrl: string;
    title: string;
    content: string;
    metadata: {
        description?: string;
        author?: string;
        publishedDate?: Date;
        imageUrl?: string;
        siteName?: string;
        contentType?: string;
        wordCount?: number;
        extractionMethod?: string;
        robotsAllowed?: boolean;
        statusCode?: number;
        processingError?: string;
    };
    processingStatus: UrlProcessingStatus;
    expiresAt: Date;
    get isExpired(): boolean;
    get isProcessed(): boolean;
    get hasFailed(): boolean;
    get hasContent(): boolean;
    get domain(): string;
    get contentPreview(): string;
}
//# sourceMappingURL=chat-url-cache.entity.d.ts.map