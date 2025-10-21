import { TicketAttachmentService } from '../services/ticket-attachment.service';
import type { Request } from 'express';
export declare class TicketAttachmentsController {
    private readonly attachmentService;
    constructor(attachmentService: TicketAttachmentService);
    uploadAttachment(file: Express.Multer.File, req?: Request): Promise<import("../services/ticket-attachment.service").TicketAttachment>;
    getAttachment(id: string): Promise<import("../services/ticket-attachment.service").TicketAttachment>;
}
//# sourceMappingURL=ticket-attachments.controller.d.ts.map