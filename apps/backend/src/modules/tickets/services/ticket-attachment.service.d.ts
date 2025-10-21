import { MediaService } from '../../media/media.service';
import { MediaType } from '@affexai/shared-types';
export interface TicketAttachment {
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    type: MediaType;
    uploadedAt: Date;
}
export declare class TicketAttachmentService {
    private readonly mediaService;
    private readonly logger;
    constructor(mediaService: MediaService);
    /**
     * Handle ticket attachment upload
     */
    uploadAttachment(file: Express.Multer.File, uploaderId: string): Promise<TicketAttachment>;
    /**
     * Get attachment by ID
     */
    getAttachment(id: string): Promise<TicketAttachment | null>;
    /**
     * Validate uploaded file
     */
    private validateFile;
    /**
     * Determine media type based on MIME type
     */
    private determineMediaType;
}
//# sourceMappingURL=ticket-attachment.service.d.ts.map