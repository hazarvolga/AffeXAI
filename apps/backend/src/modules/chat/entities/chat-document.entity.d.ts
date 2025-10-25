import { BaseEntity } from '../../../database/entities/base.entity';
import { ChatSession } from './chat-session.entity';
import { ChatMessage } from './chat-message.entity';
export declare enum DocumentProcessingStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    COMPLETED = "completed",
    FAILED = "failed"
}
export declare class ChatDocument extends BaseEntity {
    sessionId: string;
    messageId: string;
    filename: string;
    fileType: string;
    fileSize: number;
    storagePath: string;
    extractedContent: string;
    processingStatus: DocumentProcessingStatus;
    metadata: Record<string, any>;
    processedAt: Date;
    session: ChatSession;
    message: ChatMessage;
    get isProcessed(): boolean;
    get hasFailed(): boolean;
    get isProcessing(): boolean;
    get fileSizeInMB(): number;
    get hasContent(): boolean;
}
//# sourceMappingURL=chat-document.entity.d.ts.map