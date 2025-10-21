/**
 * DTO for adding a message to a ticket
 */
export declare class AddMessageDto {
    content: string;
    htmlContent?: string;
    isInternal?: boolean;
    attachmentIds?: string[];
    contentType?: 'plain' | 'html';
}
//# sourceMappingURL=add-message.dto.d.ts.map