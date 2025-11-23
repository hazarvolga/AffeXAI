"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileValidatorService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const document_processing_exceptions_1 = require("../exceptions/document-processing.exceptions");
let FileValidatorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FileValidatorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FileValidatorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = new common_1.Logger(FileValidatorService.name);
        // File type configurations
        supportedFormats = ['pdf', 'docx', 'xlsx', 'txt', 'md'];
        maxFileSize = 10 * 1024 * 1024; // 10MB
        // MIME type mappings with magic numbers
        fileSignatures = {
            'pdf': {
                mimeType: 'application/pdf',
                signatures: [Buffer.from([0x25, 0x50, 0x44, 0x46])] // %PDF
            },
            'docx': {
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                signatures: [Buffer.from([0x50, 0x4B, 0x03, 0x04])] // ZIP signature (DOCX is ZIP-based)
            },
            'xlsx': {
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                signatures: [Buffer.from([0x50, 0x4B, 0x03, 0x04])] // ZIP signature (XLSX is ZIP-based)
            },
            'txt': {
                mimeType: 'text/plain',
                signatures: [] // No specific signature for plain text
            },
            'md': {
                mimeType: 'text/markdown',
                signatures: [] // No specific signature for markdown
            }
        };
        // Suspicious patterns for security scanning
        suspiciousPatterns = [
            // JavaScript patterns
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /javascript:/gi,
            /vbscript:/gi,
            /onload\s*=/gi,
            /onerror\s*=/gi,
            // Executable patterns
            /\.exe\b/gi,
            /\.bat\b/gi,
            /\.cmd\b/gi,
            /\.scr\b/gi,
            /\.com\b/gi,
            // Macro patterns
            /Sub\s+\w+\(/gi,
            /Function\s+\w+\(/gi,
            /ActiveX/gi,
            /WScript/gi,
            /Shell\(/gi,
            // SQL injection patterns
            /union\s+select/gi,
            /drop\s+table/gi,
            /exec\s*\(/gi,
            // Path traversal patterns
            /\.\.\//g,
            /\.\.\\/g,
            // Base64 encoded executables (common in malware)
            /TVqQAAMAAAAEAAAA/g // MZ header in base64
        ];
        /**
         * Validate uploaded file comprehensively
         */
        async validateFile(file, filename, declaredMimeType) {
            this.logger.log(`Validating file: ${filename} (${file.length} bytes)`);
            // Basic validations
            this.validateFileSize(file);
            this.validateFilename(filename);
            const fileType = this.extractFileType(filename);
            this.validateFileType(fileType);
            // Generate checksum
            const checksum = this.generateChecksum(file);
            // Validate file signature
            const detectedMimeType = this.validateFileSignature(file, fileType, declaredMimeType);
            // Security checks
            const securityChecks = await this.performSecurityChecks(file, fileType);
            // Check for password protection
            const isPasswordProtected = this.checkPasswordProtection(file, fileType);
            securityChecks.isPasswordProtected = isPasswordProtected;
            const result = {
                isValid: true,
                fileType,
                mimeType: detectedMimeType,
                checksum,
                securityChecks
            };
            // Fail validation if security issues found
            if (securityChecks.hasExecutableContent ||
                securityChecks.hasScriptContent ||
                securityChecks.hasSuspiciousPatterns) {
                throw new document_processing_exceptions_1.FileSecurityException('File contains potentially malicious content');
            }
            if (isPasswordProtected) {
                throw new document_processing_exceptions_1.FileSecurityException('Password-protected files are not supported');
            }
            this.logger.log(`File validation successful: ${filename}`);
            return result;
        }
        /**
         * Validate file size
         */
        validateFileSize(file) {
            if (file.length > this.maxFileSize) {
                throw new document_processing_exceptions_1.FileSizeExceededException(file.length, this.maxFileSize);
            }
            if (file.length === 0) {
                throw new document_processing_exceptions_1.InvalidFileException('File is empty');
            }
        }
        /**
         * Validate filename
         */
        validateFilename(filename) {
            if (!filename || filename.trim().length === 0) {
                throw new document_processing_exceptions_1.InvalidFileException('Filename is required');
            }
            // Check for path traversal attempts
            if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
                throw new document_processing_exceptions_1.InvalidFileException('Filename contains invalid characters');
            }
            // Check filename length
            if (filename.length > 255) {
                throw new document_processing_exceptions_1.InvalidFileException('Filename is too long');
            }
            // Check for null bytes
            if (filename.includes('\0')) {
                throw new document_processing_exceptions_1.InvalidFileException('Filename contains null bytes');
            }
        }
        /**
         * Extract and validate file type from filename
         */
        extractFileType(filename) {
            const extension = filename.toLowerCase().split('.').pop();
            if (!extension) {
                throw new document_processing_exceptions_1.InvalidFileException('File has no extension');
            }
            return extension;
        }
        /**
         * Validate file type against supported formats
         */
        validateFileType(fileType) {
            if (!this.supportedFormats.includes(fileType)) {
                throw new document_processing_exceptions_1.UnsupportedFileTypeException(fileType, this.supportedFormats);
            }
        }
        /**
         * Validate file signature (magic numbers)
         */
        validateFileSignature(file, fileType, declaredMimeType) {
            const config = this.fileSignatures[fileType];
            if (!config) {
                throw new document_processing_exceptions_1.InvalidFileException(`No signature configuration for file type: ${fileType}`);
            }
            // For text files, skip signature validation
            if (fileType === 'txt' || fileType === 'md') {
                return config.mimeType;
            }
            // Check file signatures
            const hasValidSignature = config.signatures.some(signature => {
                if (file.length < signature.length)
                    return false;
                return file.subarray(0, signature.length).equals(signature);
            });
            if (!hasValidSignature && config.signatures.length > 0) {
                throw new document_processing_exceptions_1.InvalidFileException(`File signature does not match declared type: ${fileType}`);
            }
            // Validate declared MIME type if provided
            if (declaredMimeType && declaredMimeType !== config.mimeType) {
                this.logger.warn(`MIME type mismatch: declared=${declaredMimeType}, expected=${config.mimeType}`);
            }
            return config.mimeType;
        }
        /**
         * Perform comprehensive security checks
         */
        async performSecurityChecks(file, fileType) {
            const content = file.toString('utf-8', 0, Math.min(file.length, 1024 * 1024)); // Check first 1MB
            let hasExecutableContent = false;
            let hasScriptContent = false;
            let hasSuspiciousPatterns = false;
            // Check for suspicious patterns
            for (const pattern of this.suspiciousPatterns) {
                if (pattern.test(content)) {
                    hasSuspiciousPatterns = true;
                    this.logger.warn(`Suspicious pattern detected: ${pattern.source}`);
                    // Categorize the threat
                    if (pattern.source.includes('script') || pattern.source.includes('javascript')) {
                        hasScriptContent = true;
                    }
                    if (pattern.source.includes('exe') || pattern.source.includes('bat')) {
                        hasExecutableContent = true;
                    }
                }
            }
            // Additional checks for specific file types
            if (fileType === 'pdf') {
                // Check for PDF JavaScript
                if (content.includes('/JavaScript') || content.includes('/JS')) {
                    hasScriptContent = true;
                }
            }
            if (fileType === 'docx' || fileType === 'xlsx') {
                // Check for Office macros
                if (content.includes('vbaProject') || content.includes('macros')) {
                    hasExecutableContent = true;
                }
            }
            return {
                hasExecutableContent,
                hasScriptContent,
                hasSuspiciousPatterns,
                isPasswordProtected: false // Will be set separately
            };
        }
        /**
         * Check if file is password protected
         */
        checkPasswordProtection(file, fileType) {
            const content = file.toString('utf-8', 0, Math.min(file.length, 1024));
            switch (fileType) {
                case 'pdf':
                    // PDF encryption indicators
                    return content.includes('/Encrypt') || content.includes('/Filter/Standard');
                case 'docx':
                case 'xlsx':
                    // Office document encryption indicators
                    return content.includes('EncryptedPackage') ||
                        content.includes('Microsoft Office Encrypted Document');
                default:
                    return false;
            }
        }
        /**
         * Generate file checksum
         */
        generateChecksum(buffer) {
            return (0, crypto_1.createHash)('sha256').update(buffer).digest('hex');
        }
        /**
         * Get supported file formats
         */
        getSupportedFormats() {
            return [...this.supportedFormats];
        }
        /**
         * Get maximum file size
         */
        getMaxFileSize() {
            return this.maxFileSize;
        }
    };
    return FileValidatorService = _classThis;
})();
exports.FileValidatorService = FileValidatorService;
//# sourceMappingURL=file-validator.service.js.map