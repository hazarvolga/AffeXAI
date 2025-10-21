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
exports.FileProcessingService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = __importStar(require("path"));
const Papa = __importStar(require("papaparse"));
const file_type_1 = require("file-type");
const crypto = __importStar(require("crypto"));
let FileProcessingService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FileProcessingService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FileProcessingService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        enhancedSecurityService;
        customFieldService;
        logger = new common_1.Logger(FileProcessingService.name);
        constructor(enhancedSecurityService, customFieldService) {
            this.enhancedSecurityService = enhancedSecurityService;
            this.customFieldService = customFieldService;
        }
        // Allowed file types for upload
        ALLOWED_MIME_TYPES = [
            'text/csv',
            'application/csv',
            'text/plain',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        // Maximum file size (50MB)
        MAX_FILE_SIZE = 50 * 1024 * 1024;
        // Known field mappings for auto-detection
        FIELD_PATTERNS = {
            email: [
                /^e?-?mail$/i,
                /^email.*address$/i,
                /^contact.*email$/i,
                /^user.*email$/i,
                /^subscriber.*email$/i
            ],
            firstName: [
                /^first.*name$/i,
                /^fname$/i,
                /^given.*name$/i,
                /^forename$/i
            ],
            lastName: [
                /^last.*name$/i,
                /^lname$/i,
                /^surname$/i,
                /^family.*name$/i
            ],
            phone: [
                /^phone$/i,
                /^telephone$/i,
                /^mobile$/i,
                /^cell$/i,
                /^contact.*number$/i
            ],
            company: [
                /^company$/i,
                /^organization$/i,
                /^org$/i,
                /^business$/i,
                /^employer$/i
            ]
        };
        /**
         * Validate file type and basic security checks
         */
        async validateFileType(file) {
            const result = {
                isValid: true,
                fileType: file.mimetype,
                fileSize: file.size,
                errors: [],
                warnings: []
            };
            try {
                // Check file size
                if (file.size > this.MAX_FILE_SIZE) {
                    result.errors.push(`File size ${file.size} bytes exceeds maximum allowed size of ${this.MAX_FILE_SIZE} bytes`);
                    result.isValid = false;
                }
                // Check MIME type
                if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
                    result.errors.push(`File type ${file.mimetype} is not allowed. Allowed types: ${this.ALLOWED_MIME_TYPES.join(', ')}`);
                    result.isValid = false;
                }
                // Verify actual file type matches MIME type
                if (file.buffer) {
                    const detectedType = await (0, file_type_1.fileTypeFromBuffer)(file.buffer);
                    if (detectedType && !this.isCompatibleFileType(file.mimetype, detectedType.mime)) {
                        result.warnings.push(`Detected file type ${detectedType.mime} differs from declared type ${file.mimetype}`);
                    }
                }
                // Check file extension
                const extension = path.extname(file.originalname).toLowerCase();
                if (!['.csv', '.txt', '.xls', '.xlsx'].includes(extension)) {
                    result.warnings.push(`File extension ${extension} may not be compatible`);
                }
                this.logger.log(`File validation completed for ${file.originalname}: ${result.isValid ? 'VALID' : 'INVALID'}`);
            }
            catch (error) {
                this.logger.error(`Error validating file ${file.originalname}:`, error);
                result.errors.push(`File validation failed: ${error.message}`);
                result.isValid = false;
            }
            return result;
        }
        /**
         * Enhanced malware scanning using advanced security service
         */
        async scanForMalware(filePath) {
            try {
                const scanResult = await this.enhancedSecurityService.performAdvancedMalwareScan(filePath);
                if (!scanResult.isClean) {
                    this.logger.warn(`Malware detected in ${filePath}: ${scanResult.threats.join(', ')}`);
                }
                return scanResult.isClean;
            }
            catch (error) {
                this.logger.error(`Error scanning file for malware: ${error.message}`);
                return false;
            }
        }
        /**
         * Perform comprehensive security validation and storage
         */
        async secureFileProcessing(filePath, jobId) {
            try {
                return await this.enhancedSecurityService.secureFileStorage(filePath, jobId);
            }
            catch (error) {
                this.logger.error(`Secure file processing failed for ${filePath}:`, error);
                throw new common_1.BadRequestException(`File security processing failed: ${error.message}`);
            }
        }
        /**
         * Parse CSV file with comprehensive error handling
         */
        async parseCsvFile(filePath) {
            const result = {
                headers: [],
                data: [],
                totalRows: 0,
                errors: []
            };
            try {
                const fileContent = await fs_1.promises.readFile(filePath, 'utf8');
                return new Promise((resolve, reject) => {
                    Papa.parse(fileContent, {
                        header: true,
                        skipEmptyLines: true,
                        transformHeader: (header) => header.trim(),
                        transform: (value) => value.trim(),
                        complete: (results) => {
                            result.headers = results.meta.fields || [];
                            result.data = results.data;
                            result.totalRows = results.data.length;
                            // Convert Papa Parse errors to our format
                            if (results.errors && results.errors.length > 0) {
                                result.errors = results.errors.map(error => ({
                                    row: error.row || 0,
                                    message: error.message,
                                    code: error.code || 'PARSE_ERROR'
                                }));
                            }
                            this.logger.log(`CSV parsing completed: ${result.totalRows} rows, ${result.headers.length} columns, ${result.errors.length} errors`);
                            resolve(result);
                        },
                        error: (error) => {
                            this.logger.error(`CSV parsing failed: ${error.message}`);
                            reject(new common_1.BadRequestException(`Failed to parse CSV file: ${error.message}`));
                        }
                    });
                });
            }
            catch (error) {
                this.logger.error(`Error reading CSV file: ${error.message}`);
                throw new common_1.BadRequestException(`Failed to read CSV file: ${error.message}`);
            }
        }
        /**
         * Detect column types and suggest field mappings
         */
        async detectColumns(csvData) {
            if (!csvData || csvData.length === 0) {
                return {
                    detectedColumns: [],
                    suggestions: [],
                    confidence: 0
                };
            }
            const headers = Object.keys(csvData[0]);
            const detectedColumns = [];
            const suggestions = [];
            // Analyze each column
            for (const header of headers) {
                const column = await this.analyzeColumn(header, csvData);
                detectedColumns.push(column);
                // Generate field mapping suggestions
                const suggestion = this.suggestFieldMapping(header, column);
                if (suggestion) {
                    suggestions.push(suggestion);
                }
            }
            // Calculate overall confidence based on successful mappings
            const successfulMappings = suggestions.filter(s => s.confidence > 0.7).length;
            const confidence = headers.length > 0 ? successfulMappings / headers.length : 0;
            return {
                detectedColumns,
                suggestions,
                confidence
            };
        }
        /**
         * Validate column mapping configuration with custom fields support
         */
        async validateColumnMapping(mapping) {
            const requiredFields = ['email'];
            // Get available fields including custom fields
            const availableFields = await this.customFieldService.getFieldsForMapping();
            const validFieldKeys = availableFields.map(field => field.key);
            // Check if required fields are mapped
            for (const field of requiredFields) {
                const isMapped = Object.values(mapping).includes(field);
                if (!isMapped) {
                    this.logger.warn(`Required field '${field}' is not mapped`);
                    return false;
                }
            }
            // Check if mapped fields are valid
            for (const [csvColumn, field] of Object.entries(mapping)) {
                if (!validFieldKeys.includes(field)) {
                    this.logger.warn(`Invalid field mapping: '${field}' is not a valid field`);
                    return false;
                }
            }
            return true;
        }
        /**
         * Process subscriber data with custom fields
         */
        async processSubscriberData(csvData, columnMapping) {
            const processedData = [];
            const errors = [];
            // Get custom fields for validation
            const customFields = await this.customFieldService.findAll(true);
            for (let i = 0; i < csvData.length; i++) {
                const row = csvData[i];
                const subscriberData = {
                    customFields: {}
                };
                try {
                    // Process each mapped column
                    for (const [csvColumn, fieldKey] of Object.entries(columnMapping)) {
                        const value = row[csvColumn];
                        if (fieldKey.startsWith('custom_')) {
                            // Handle custom field
                            const customFieldName = fieldKey.replace('custom_', '');
                            const customField = customFields.find(f => f.name === customFieldName);
                            if (customField) {
                                const validation = await this.customFieldService.validateCustomFieldValue(customField, value);
                                if (!validation.isValid) {
                                    errors.push(`Row ${i + 1}, ${customField.label}: ${validation.error}`);
                                    continue;
                                }
                                subscriberData.customFields[customFieldName] = value;
                            }
                        }
                        else {
                            // Handle standard field
                            subscriberData[fieldKey] = value;
                        }
                    }
                    processedData.push(subscriberData);
                }
                catch (error) {
                    errors.push(`Row ${i + 1}: ${error.message}`);
                }
            }
            return { processedData, errors };
        }
        /**
         * Enhanced cleanup of temporary files with security considerations
         */
        async cleanupTempFiles(jobId) {
            try {
                // Use enhanced security service for secure cleanup
                const cleanupResult = await this.enhancedSecurityService.automaticSensitiveFileCleanup(jobId);
                this.logger.log(`Secure cleanup completed for job ${jobId}: ${cleanupResult.cleanedFiles} files, ${cleanupResult.totalSize} bytes`);
                if (cleanupResult.errors.length > 0) {
                    this.logger.warn(`Cleanup errors for job ${jobId}: ${cleanupResult.errors.join(', ')}`);
                }
            }
            catch (error) {
                this.logger.error(`Error cleaning up temporary files for job ${jobId}:`, error);
            }
        }
        /**
         * Verify file integrity before processing
         */
        async verifyFileIntegrity(filePath, jobId) {
            try {
                return await this.enhancedSecurityService.verifyFileIntegrity(filePath, jobId);
            }
            catch (error) {
                this.logger.error(`File integrity verification failed for ${filePath}:`, error);
                return false;
            }
        }
        /**
         * Generate secure file path for uploaded files
         */
        generateSecureFilePath(originalFileName, jobId) {
            const sanitizedName = this.sanitizeFileName(originalFileName);
            const timestamp = Date.now();
            const hash = crypto.createHash('md5').update(`${jobId}-${timestamp}`).digest('hex').substring(0, 8);
            return path.join('temp', 'imports', jobId, `${timestamp}-${hash}-${sanitizedName}`);
        }
        /**
         * Sanitize file name to prevent path traversal attacks
         */
        sanitizeFileName(fileName) {
            // Remove path separators and dangerous characters
            return fileName
                .replace(/[\/\\:*?"<>|]/g, '_')
                .replace(/\.\./g, '_')
                .replace(/^\.+/, '')
                .substring(0, 100); // Limit length
        }
        /**
         * Check if detected file type is compatible with declared MIME type
         */
        isCompatibleFileType(declaredType, detectedType) {
            const compatibilityMap = {
                'text/csv': ['text/plain'],
                'application/csv': ['text/plain', 'text/csv'],
                'text/plain': ['text/csv', 'application/csv']
            };
            return declaredType === detectedType ||
                (compatibilityMap[declaredType] && compatibilityMap[declaredType].includes(detectedType));
        }
        /**
         * Analyze individual column to determine type and characteristics
         */
        async analyzeColumn(header, data) {
            const values = data.map(row => row[header]).filter(val => val != null && val !== '');
            const samples = values.slice(0, 5);
            const nullCount = data.length - values.length;
            const uniqueCount = new Set(values).size;
            // Determine column type
            let type = 'unknown';
            if (this.isEmailColumn(values)) {
                type = 'email';
            }
            else if (this.isNumberColumn(values)) {
                type = 'number';
            }
            else if (this.isDateColumn(values)) {
                type = 'date';
            }
            else {
                type = 'text';
            }
            return {
                name: header,
                type,
                samples,
                nullCount,
                uniqueCount
            };
        }
        /**
         * Check if column contains email addresses
         */
        isEmailColumn(values) {
            if (values.length === 0)
                return false;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailCount = values.filter(val => emailRegex.test(val)).length;
            return emailCount / values.length > 0.8; // 80% of values should be valid emails
        }
        /**
         * Check if column contains numbers
         */
        isNumberColumn(values) {
            if (values.length === 0)
                return false;
            const numberCount = values.filter(val => !isNaN(Number(val))).length;
            return numberCount / values.length > 0.8;
        }
        /**
         * Check if column contains dates
         */
        isDateColumn(values) {
            if (values.length === 0)
                return false;
            const dateCount = values.filter(val => !isNaN(Date.parse(val))).length;
            return dateCount / values.length > 0.8;
        }
        /**
         * Suggest field mapping based on column name and content
         */
        suggestFieldMapping(columnName, column) {
            // Check against known patterns
            for (const [fieldName, patterns] of Object.entries(this.FIELD_PATTERNS)) {
                for (const pattern of patterns) {
                    if (pattern.test(columnName)) {
                        return {
                            csvColumn: columnName,
                            suggestedField: fieldName,
                            confidence: 0.9,
                            reason: `Column name matches ${fieldName} pattern`
                        };
                    }
                }
            }
            // Check based on column type
            if (column.type === 'email') {
                return {
                    csvColumn: columnName,
                    suggestedField: 'email',
                    confidence: 0.8,
                    reason: 'Column contains email addresses'
                };
            }
            return null;
        }
    };
    return FileProcessingService = _classThis;
})();
exports.FileProcessingService = FileProcessingService;
//# sourceMappingURL=file-processing.service.js.map