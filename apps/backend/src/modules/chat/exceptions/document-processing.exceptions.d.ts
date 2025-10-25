import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
export declare class DocumentProcessingException extends InternalServerErrorException {
    constructor(message: string, cause?: Error);
}
export declare class UnsupportedFileTypeException extends BadRequestException {
    constructor(fileType: string, supportedTypes: string[]);
}
export declare class FileSizeExceededException extends BadRequestException {
    constructor(fileSize: number, maxSize: number);
}
export declare class InvalidFileException extends BadRequestException {
    constructor(reason: string);
}
export declare class TextExtractionException extends DocumentProcessingException {
    constructor(fileType: string, cause?: Error);
}
export declare class FileSecurityException extends BadRequestException {
    constructor(reason: string);
}
//# sourceMappingURL=document-processing.exceptions.d.ts.map