"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentProcessorService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const crypto_1 = require("crypto");
const pdfParse = require('pdf-parse');
const mammoth = __importStar(require("mammoth"));
const XLSX = __importStar(require("xlsx"));
const chat_document_entity_1 = require("../entities/chat-document.entity");
const document_processing_exceptions_1 = require("../exceptions/document-processing.exceptions");
let DocumentProcessorService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DocumentProcessorService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DocumentProcessorService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        documentRepository;
        fileValidator;
        logger = new common_1.Logger(DocumentProcessorService.name);
        uploadDir = process.env.UPLOAD_DIR || 'uploads/chat-documents';
        maxFileSize = 10 * 1024 * 1024; // 10MB
        // Supported file formats
        supportedFormats = ['pdf', 'docx', 'xlsx', 'txt', 'md'];
        // MIME type mappings
        mimeTypes = {
            'pdf': 'application/pdf',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'txt': 'text/plain',
            'md': 'text/markdown'
        };
        constructor(documentRepository, fileValidator) {
            this.documentRepository = documentRepository;
            this.fileValidator = fileValidator;
            this.ensureUploadDirectory();
        }
        /**
         * Process uploaded document and extract text content
         */
        async processDocument(file, filename, sessionId, messageId, declaredMimeType) {
            this.logger.log(`Processing document: ${filename} for session: ${sessionId}`);
            try {
                // Comprehensive file validation
                const validationResult = await this.fileValidator.validateFile(file, filename, declaredMimeType);
                const storagePath = await this.saveFile(file, filename, sessionId, validationResult.checksum);
                // Create document record with validation results
                const document = this.documentRepository.create({
                    sessionId,
                    messageId,
                    filename,
                    fileType: validationResult.fileType,
                    fileSize: file.length,
                    storagePath,
                    processingStatus: chat_document_entity_1.DocumentProcessingStatus.PROCESSING,
                    metadata: {
                        mimeType: validationResult.mimeType,
                        checksum: validationResult.checksum,
                        extractionMethod: this.getExtractionMethod(validationResult.fileType),
                        validationTimestamp: new Date().toISOString(),
                        // Store security checks as part of metadata
                        ...validationResult.securityChecks
                    }
                });
                const savedDocument = await this.documentRepository.save(document);
                // Process document asynchronously
                this.processDocumentAsync(savedDocument.id, file, validationResult.fileType);
                return {
                    id: savedDocument.id,
                    filename: savedDocument.filename,
                    fileType: savedDocument.fileType,
                    fileSize: savedDocument.fileSize,
                    extractedContent: '',
                    metadata: savedDocument.metadata,
                    processingStatus: savedDocument.processingStatus
                };
            }
            catch (error) {
                this.logger.error(`Document processing failed for ${filename}:`, error);
                // If it's a validation error, re-throw it
                if (error instanceof common_1.BadRequestException) {
                    throw error;
                }
                // Otherwise, wrap in DocumentProcessingException
                throw new document_processing_exceptions_1.DocumentProcessingException(`Failed to process document: ${filename}`, error);
            }
        }
        /**
         * Extract text content from different file formats
         */
        async extractText(file, fileType) {
            this.logger.log(`Extracting text from ${fileType} file`);
            try {
                switch (fileType.toLowerCase()) {
                    case 'pdf':
                        return await this.extractFromPdf(file);
                    case 'docx':
                        return await this.extractFromDocx(file);
                    case 'xlsx':
                        return await this.extractFromXlsx(file);
                    case 'txt':
                        return await this.extractFromTxt(file);
                    case 'md':
                        return await this.extractFromMarkdown(file);
                    default:
                        throw new Error(`Unsupported file type: ${fileType}`);
                }
            }
            catch (error) {
                this.logger.error(`Text extraction failed for ${fileType}: ${error.message}`);
                throw error;
            }
        }
        /**
         * Generate metadata for processed document
         */
        generateMetadata(content, filename, fileType) {
            const words = content.split(/\s+/).filter(word => word.length > 0);
            const lines = content.split('\n').length;
            const characters = content.length;
            const charactersNoSpaces = content.replace(/\s/g, '').length;
            // Estimate reading time (average 200 words per minute)
            const readingTimeMinutes = Math.ceil(words.length / 200);
            return {
                mimeType: this.mimeTypes[fileType],
                wordCount: words.length,
                lineCount: lines,
                characterCount: characters,
                characterCountNoSpaces: charactersNoSpaces,
                readingTimeMinutes,
                extractionMethod: this.getExtractionMethod(fileType),
                contentChecksum: this.generateChecksum(Buffer.from(content, 'utf-8')),
                language: this.detectLanguage(content),
                hasImages: this.detectImages(content, fileType),
                hasTables: this.detectTables(content, fileType)
            };
        }
        /**
         * Get document processing status
         */
        async getProcessingStatus(documentId) {
            const document = await this.documentRepository.findOne({
                where: { id: documentId }
            });
            if (!document) {
                throw new common_1.BadRequestException('Document not found');
            }
            return document;
        }
        /**
         * Get all documents for a session
         */
        async getSessionDocuments(sessionId) {
            return this.documentRepository.find({
                where: { sessionId },
                order: { createdAt: 'DESC' }
            });
        }
        // Private methods
        async processDocumentAsync(documentId, file, fileType) {
            const startTime = Date.now();
            try {
                this.logger.log(`Starting async processing for document ID: ${documentId}`);
                // Extract text content
                const extractedContent = await this.extractText(file, fileType);
                if (!extractedContent || extractedContent.trim().length === 0) {
                    throw new document_processing_exceptions_1.TextExtractionException(fileType, new Error('No text content extracted'));
                }
                // Generate comprehensive metadata
                const metadata = this.generateMetadata(extractedContent, '', fileType);
                const processingTime = Date.now() - startTime;
                // Get current metadata and merge with new data
                const currentDocument = await this.documentRepository.findOne({
                    where: { id: documentId }
                });
                const updatedMetadata = {
                    ...currentDocument?.metadata,
                    ...metadata,
                    processingTimeMs: processingTime,
                    processingCompletedAt: new Date().toISOString(),
                    extractionSuccess: true
                };
                await this.documentRepository.update(documentId, {
                    extractedContent,
                    processingStatus: chat_document_entity_1.DocumentProcessingStatus.COMPLETED,
                    metadata: updatedMetadata,
                    processedAt: new Date()
                });
                this.logger.log(`Document processing completed for ID: ${documentId} in ${processingTime}ms`);
                // Emit processing completion via WebSocket if available
                await this.notifyProcessingComplete(documentId, currentDocument?.sessionId);
            }
            catch (error) {
                const processingTime = Date.now() - startTime;
                this.logger.error(`Document processing failed for ID: ${documentId} after ${processingTime}ms:`, error);
                // Get current metadata to preserve validation results
                const currentDocument = await this.documentRepository.findOne({
                    where: { id: documentId }
                });
                const errorMetadata = {
                    ...currentDocument?.metadata,
                    processingError: error.message,
                    processingTimeMs: processingTime,
                    processingFailedAt: new Date().toISOString(),
                    extractionSuccess: false,
                    errorType: error.constructor.name
                };
                await this.documentRepository.update(documentId, {
                    processingStatus: chat_document_entity_1.DocumentProcessingStatus.FAILED,
                    metadata: errorMetadata,
                    processedAt: new Date()
                });
                // Emit processing failure via WebSocket if available
                await this.notifyProcessingFailed(documentId, currentDocument?.sessionId, error.message);
            }
        }
        /**
         * Notify processing completion via WebSocket
         */
        async notifyProcessingComplete(documentId, sessionId) {
            if (!sessionId)
                return;
            try {
                // This would be injected in a real implementation
                // For now, we'll emit via a global event or service
                this.logger.log(`Document processing completed notification for session: ${sessionId}`);
            }
            catch (error) {
                this.logger.error('Failed to send processing completion notification:', error);
            }
        }
        /**
         * Notify processing failure via WebSocket
         */
        async notifyProcessingFailed(documentId, sessionId, errorMessage) {
            if (!sessionId)
                return;
            try {
                // This would be injected in a real implementation
                // For now, we'll emit via a global event or service
                this.logger.log(`Document processing failed notification for session: ${sessionId}, error: ${errorMessage}`);
            }
            catch (error) {
                this.logger.error('Failed to send processing failure notification:', error);
            }
        }
        getFileExtension(filename) {
            return (0, path_1.extname)(filename).toLowerCase().substring(1);
        }
        generateChecksum(buffer) {
            return (0, crypto_1.createHash)('sha256').update(buffer).digest('hex');
        }
        async saveFile(file, filename, sessionId, checksum) {
            const sessionDir = (0, path_1.join)(this.uploadDir, sessionId);
            await this.ensureDirectory(sessionDir);
            const fileExtension = (0, path_1.extname)(filename);
            const baseName = (0, path_1.basename)(filename, fileExtension);
            const safeFilename = `${baseName}-${checksum.substring(0, 8)}${fileExtension}`;
            const filePath = (0, path_1.join)(sessionDir, safeFilename);
            await fs_1.promises.writeFile(filePath, file);
            return filePath;
        }
        async ensureUploadDirectory() {
            await this.ensureDirectory(this.uploadDir);
        }
        async ensureDirectory(dirPath) {
            try {
                await fs_1.promises.access(dirPath);
            }
            catch {
                await fs_1.promises.mkdir(dirPath, { recursive: true });
            }
        }
        getExtractionMethod(fileType) {
            const methods = {
                'pdf': 'pdf-parse',
                'docx': 'mammoth',
                'xlsx': 'xlsx',
                'txt': 'utf-8-decode',
                'md': 'utf-8-decode'
            };
            return methods[fileType] || 'unknown';
        }
        // Text extraction methods
        async extractFromPdf(file) {
            try {
                const data = await pdfParse(file, {
                    // PDF parsing options
                    max: 0, // No page limit
                    version: 'v1.10.100' // Use specific version for consistency
                });
                if (!data.text || data.text.trim().length === 0) {
                    throw new document_processing_exceptions_1.TextExtractionException('pdf', new Error('No text content found in PDF'));
                }
                return data.text.trim();
            }
            catch (error) {
                this.logger.error(`PDF extraction failed: ${error.message}`);
                if (error instanceof document_processing_exceptions_1.TextExtractionException) {
                    throw error;
                }
                throw new document_processing_exceptions_1.TextExtractionException('pdf', error);
            }
        }
        async extractFromDocx(file) {
            try {
                const result = await mammoth.extractRawText({
                    buffer: file
                });
                if (result.messages && result.messages.length > 0) {
                    this.logger.warn('DOCX extraction warnings:', result.messages);
                }
                if (!result.value || result.value.trim().length === 0) {
                    throw new document_processing_exceptions_1.TextExtractionException('docx', new Error('No text content found in DOCX'));
                }
                return result.value.trim();
            }
            catch (error) {
                this.logger.error(`DOCX extraction failed: ${error.message}`);
                if (error instanceof document_processing_exceptions_1.TextExtractionException) {
                    throw error;
                }
                throw new document_processing_exceptions_1.TextExtractionException('docx', error);
            }
        }
        async extractFromXlsx(file) {
            try {
                const workbook = XLSX.read(file, {
                    type: 'buffer',
                    cellText: true,
                    cellDates: true
                });
                if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
                    throw new document_processing_exceptions_1.TextExtractionException('xlsx', new Error('No sheets found in XLSX file'));
                }
                let content = '';
                let totalCells = 0;
                workbook.SheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    if (!worksheet) {
                        this.logger.warn(`Empty sheet found: ${sheetName}`);
                        return;
                    }
                    // Convert to CSV for better text representation
                    const sheetData = XLSX.utils.sheet_to_csv(worksheet);
                    if (sheetData.trim()) {
                        content += `=== Sheet: ${sheetName} ===\n${sheetData}\n\n`;
                        totalCells += sheetData.split('\n').length;
                    }
                });
                if (totalCells === 0) {
                    throw new document_processing_exceptions_1.TextExtractionException('xlsx', new Error('No data found in XLSX file'));
                }
                return content.trim();
            }
            catch (error) {
                this.logger.error(`XLSX extraction failed: ${error.message}`);
                if (error instanceof document_processing_exceptions_1.TextExtractionException) {
                    throw error;
                }
                throw new document_processing_exceptions_1.TextExtractionException('xlsx', error);
            }
        }
        async extractFromTxt(file) {
            try {
                // Try to detect encoding
                const content = this.detectAndDecodeText(file);
                if (!content || content.trim().length === 0) {
                    throw new document_processing_exceptions_1.TextExtractionException('txt', new Error('No text content found in file'));
                }
                return content.trim();
            }
            catch (error) {
                this.logger.error(`TXT extraction failed: ${error.message}`);
                if (error instanceof document_processing_exceptions_1.TextExtractionException) {
                    throw error;
                }
                throw new document_processing_exceptions_1.TextExtractionException('txt', error);
            }
        }
        async extractFromMarkdown(file) {
            try {
                const content = this.detectAndDecodeText(file);
                if (!content || content.trim().length === 0) {
                    throw new document_processing_exceptions_1.TextExtractionException('md', new Error('No text content found in markdown file'));
                }
                return content.trim();
            }
            catch (error) {
                this.logger.error(`Markdown extraction failed: ${error.message}`);
                if (error instanceof document_processing_exceptions_1.TextExtractionException) {
                    throw error;
                }
                throw new document_processing_exceptions_1.TextExtractionException('md', error);
            }
        }
        /**
         * Detect encoding and decode text content
         */
        detectAndDecodeText(buffer) {
            // Try UTF-8 first (most common)
            try {
                const utf8Content = buffer.toString('utf-8');
                // Check if it contains replacement characters (indicates invalid UTF-8)
                if (!utf8Content.includes('\uFFFD')) {
                    return utf8Content;
                }
            }
            catch (error) {
                this.logger.debug('UTF-8 decoding failed, trying other encodings');
            }
            // Try UTF-16 (with BOM detection)
            if (buffer.length >= 2) {
                const bom = buffer.readUInt16LE(0);
                if (bom === 0xFEFF || bom === 0xFFFE) {
                    try {
                        return buffer.toString('utf16le');
                    }
                    catch (error) {
                        this.logger.debug('UTF-16 decoding failed');
                    }
                }
            }
            // Try Latin1 (ISO-8859-1) as fallback
            try {
                return buffer.toString('latin1');
            }
            catch (error) {
                this.logger.debug('Latin1 decoding failed');
            }
            // Final fallback to ASCII
            try {
                return buffer.toString('ascii');
            }
            catch (error) {
                throw new Error('Unable to decode text content with any supported encoding');
            }
        }
        /**
         * Simple language detection based on common words
         */
        detectLanguage(content) {
            const text = content.toLowerCase();
            // Turkish indicators
            const turkishWords = ['ve', 'bir', 'bu', 'için', 'ile', 'olan', 'olarak', 'çok', 'daha', 'şu'];
            const turkishChars = /[çğıöşü]/g;
            // English indicators
            const englishWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had'];
            // German indicators
            const germanWords = ['und', 'der', 'die', 'das', 'ist', 'mit', 'für', 'auf', 'von', 'zu'];
            const germanChars = /[äöüß]/g;
            let turkishScore = 0;
            let englishScore = 0;
            let germanScore = 0;
            // Check for specific characters
            const turkishCharMatches = text.match(turkishChars);
            if (turkishCharMatches)
                turkishScore += turkishCharMatches.length * 2;
            const germanCharMatches = text.match(germanChars);
            if (germanCharMatches)
                germanScore += germanCharMatches.length * 2;
            // Check for common words
            turkishWords.forEach(word => {
                const regex = new RegExp(`\\b${word}\\b`, 'g');
                const matches = text.match(regex);
                if (matches)
                    turkishScore += matches.length;
            });
            englishWords.forEach(word => {
                const regex = new RegExp(`\\b${word}\\b`, 'g');
                const matches = text.match(regex);
                if (matches)
                    englishScore += matches.length;
            });
            germanWords.forEach(word => {
                const regex = new RegExp(`\\b${word}\\b`, 'g');
                const matches = text.match(regex);
                if (matches)
                    germanScore += matches.length;
            });
            // Determine language
            if (turkishScore > englishScore && turkishScore > germanScore) {
                return 'tr';
            }
            else if (germanScore > englishScore && germanScore > turkishScore) {
                return 'de';
            }
            else if (englishScore > 0) {
                return 'en';
            }
            return 'unknown';
        }
        /**
         * Detect if content contains images (based on file type and content)
         */
        detectImages(content, fileType) {
            if (fileType === 'pdf') {
                // PDF might contain images, but we can't detect from text content
                return false; // Conservative approach
            }
            if (fileType === 'docx') {
                // Mammoth might include image references
                return content.includes('[image]') || content.includes('image');
            }
            if (fileType === 'md') {
                // Markdown image syntax
                return /!\[.*?\]\(.*?\)/.test(content);
            }
            return false;
        }
        /**
         * Detect if content contains tables
         */
        detectTables(content, fileType) {
            if (fileType === 'xlsx') {
                return true; // XLSX is inherently tabular
            }
            if (fileType === 'md') {
                // Markdown table syntax
                return /\|.*\|/.test(content);
            }
            // Look for CSV-like patterns
            const lines = content.split('\n');
            let tableLines = 0;
            for (const line of lines.slice(0, 10)) { // Check first 10 lines
                if (line.includes(',') || line.includes('\t') || line.includes('|')) {
                    const separators = (line.match(/[,\t|]/g) || []).length;
                    if (separators >= 2) {
                        tableLines++;
                    }
                }
            }
            return tableLines >= 3; // At least 3 lines with table-like structure
        }
    };
    return DocumentProcessorService = _classThis;
})();
exports.DocumentProcessorService = DocumentProcessorService;
//# sourceMappingURL=document-processor.service.js.map