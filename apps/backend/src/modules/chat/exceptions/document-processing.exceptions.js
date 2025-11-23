"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSecurityException = exports.TextExtractionException = exports.InvalidFileException = exports.FileSizeExceededException = exports.UnsupportedFileTypeException = exports.DocumentProcessingException = void 0;
const common_1 = require("@nestjs/common");
class DocumentProcessingException extends common_1.InternalServerErrorException {
    constructor(message, cause) {
        super({
            message,
            error: 'Document Processing Failed',
            cause: cause?.message
        });
    }
}
exports.DocumentProcessingException = DocumentProcessingException;
class UnsupportedFileTypeException extends common_1.BadRequestException {
    constructor(fileType, supportedTypes) {
        super({
            message: `Unsupported file type: ${fileType}`,
            error: 'Unsupported File Type',
            supportedTypes
        });
    }
}
exports.UnsupportedFileTypeException = UnsupportedFileTypeException;
class FileSizeExceededException extends common_1.BadRequestException {
    constructor(fileSize, maxSize) {
        super({
            message: `File size ${Math.round(fileSize / (1024 * 1024) * 100) / 100}MB exceeds maximum allowed size of ${Math.round(maxSize / (1024 * 1024))}MB`,
            error: 'File Size Exceeded',
            fileSize,
            maxSize
        });
    }
}
exports.FileSizeExceededException = FileSizeExceededException;
class InvalidFileException extends common_1.BadRequestException {
    constructor(reason) {
        super({
            message: `Invalid file: ${reason}`,
            error: 'Invalid File',
            reason
        });
    }
}
exports.InvalidFileException = InvalidFileException;
class TextExtractionException extends DocumentProcessingException {
    constructor(fileType, cause) {
        super(`Failed to extract text from ${fileType} file`, cause);
    }
}
exports.TextExtractionException = TextExtractionException;
class FileSecurityException extends common_1.BadRequestException {
    constructor(reason) {
        super({
            message: `File security check failed: ${reason}`,
            error: 'File Security Check Failed',
            reason
        });
    }
}
exports.FileSecurityException = FileSecurityException;
//# sourceMappingURL=document-processing.exceptions.js.map