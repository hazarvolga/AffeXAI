import { DocumentProcessorService } from '../services/document-processor.service';
import { UploadDocumentDto, DocumentUploadResponse, DocumentProcessingStatusDto } from '../dto/upload-document.dto';
import { ChatGateway } from '../gateways/chat.gateway';
export declare class DocumentUploadController {
    private readonly documentProcessor;
    private readonly chatGateway;
    constructor(documentProcessor: DocumentProcessorService, chatGateway: ChatGateway);
    uploadDocument(file: Express.Multer.File, uploadDto: UploadDocumentDto): Promise<DocumentUploadResponse>;
    getProcessingStatus(documentId: string): Promise<DocumentProcessingStatusDto>;
    getSessionDocuments(sessionId: string): Promise<DocumentProcessingStatusDto[]>;
}
//# sourceMappingURL=document-upload.controller.d.ts.map