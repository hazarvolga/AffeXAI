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
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
let FileUploadService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FileUploadService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            FileUploadService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        fileProcessingService;
        enhancedSecurityService;
        logger = new common_1.Logger(FileUploadService.name);
        config = {
            uploadDir: path.join(process.cwd(), 'temp', 'uploads'),
            maxFileSize: 50 * 1024 * 1024, // 50MB
            allowedMimeTypes: [
                'text/csv',
                'application/csv',
                'text/plain',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ],
            enableMalwareScanning: true,
            autoCleanupHours: 24
        };
        constructor(fileProcessingService, enhancedSecurityService) {
            this.fileProcessingService = fileProcessingService;
            this.enhancedSecurityService = enhancedSecurityService;
            this.ensureUploadDirectoryExists();
        }
        /**
         * Handle secure file upload with comprehensive validation
         */
        async uploadFile(file, options = {}) {
            const jobId = options.generateJobId !== false ? this.generateJobId() : '';
            try {
                // Step 1: Validate file
                await this.validateUploadedFile(file, options);
                // Step 2: Generate secure file path
                const secureFilePath = this.generateSecureFilePath(file.originalname, jobId, options.customPath);
                // Step 3: Ensure directory exists
                await this.ensureDirectoryExists(path.dirname(secureFilePath));
                // Step 4: Save file securely
                await this.saveFileSecurely(file, secureFilePath);
                // Step 5: Perform comprehensive security processing
                if (this.config.enableMalwareScanning) {
                    const securityReport = await this.fileProcessingService.secureFileProcessing(secureFilePath, jobId);
                    if (!securityReport.isSecure) {
                        // File has been quarantined by the security service
                        throw new common_1.BadRequestException(`File failed security validation: ${securityReport.issues.join(', ')}`);
                    }
                    this.logger.log(`File security validation passed for ${file.originalname}`);
                }
                const result = {
                    jobId,
                    fileName: path.basename(secureFilePath),
                    originalFileName: file.originalname,
                    filePath: secureFilePath,
                    fileSize: file.size,
                    mimeType: file.mimetype,
                    uploadedAt: new Date()
                };
                this.logger.log(`File uploaded successfully: ${file.originalname} -> ${secureFilePath}`);
                // Schedule cleanup
                this.scheduleFileCleanup(secureFilePath, this.config.autoCleanupHours);
                return result;
            }
            catch (error) {
                this.logger.error(`File upload failed for ${file.originalname}:`, error);
                throw error;
            }
        }
        /**
         * Upload multiple files with batch processing
         */
        async uploadMultipleFiles(files, options = {}) {
            const results = [];
            const errors = [];
            for (const file of files) {
                try {
                    const result = await this.uploadFile(file, options);
                    results.push(result);
                }
                catch (error) {
                    errors.push(`${file.originalname}: ${error.message}`);
                }
            }
            if (errors.length > 0 && results.length === 0) {
                throw new common_1.BadRequestException(`All file uploads failed: ${errors.join(', ')}`);
            }
            if (errors.length > 0) {
                this.logger.warn(`Some files failed to upload: ${errors.join(', ')}`);
            }
            return results;
        }
        /**
         * Get file information without downloading
         */
        async getFileInfo(filePath) {
            try {
                const stats = await fs_1.promises.stat(filePath);
                const isReadable = await this.checkFileReadability(filePath);
                return {
                    exists: true,
                    size: stats.size,
                    createdAt: stats.birthtime,
                    isReadable
                };
            }
            catch (error) {
                return { exists: false };
            }
        }
        /**
         * Securely delete uploaded file
         */
        async deleteFile(filePath) {
            try {
                // Verify file is in allowed upload directory
                if (!this.isPathSecure(filePath)) {
                    throw new common_1.BadRequestException('File path is not secure');
                }
                await fs_1.promises.unlink(filePath);
                this.logger.log(`File deleted: ${filePath}`);
                return true;
            }
            catch (error) {
                this.logger.error(`Failed to delete file ${filePath}:`, error);
                return false;
            }
        }
        /**
         * Clean up old files based on age
         */
        async cleanupOldFiles(maxAgeHours = 24) {
            let cleanedCount = 0;
            try {
                const uploadDir = this.config.uploadDir;
                const cutoffTime = new Date(Date.now() - (maxAgeHours * 60 * 60 * 1000));
                const files = await this.getAllFilesRecursively(uploadDir);
                for (const filePath of files) {
                    try {
                        const stats = await fs_1.promises.stat(filePath);
                        if (stats.birthtime < cutoffTime) {
                            await fs_1.promises.unlink(filePath);
                            cleanedCount++;
                        }
                    }
                    catch (error) {
                        // File might have been deleted already, continue
                        continue;
                    }
                }
                this.logger.log(`Cleaned up ${cleanedCount} old files`);
            }
            catch (error) {
                this.logger.error('Error during file cleanup:', error);
            }
            return cleanedCount;
        }
        /**
         * Get upload statistics
         */
        async getUploadStats() {
            try {
                const files = await this.getAllFilesRecursively(this.config.uploadDir);
                let totalSize = 0;
                let oldestFile;
                let newestFile;
                for (const filePath of files) {
                    try {
                        const stats = await fs_1.promises.stat(filePath);
                        totalSize += stats.size;
                        if (!oldestFile || stats.birthtime < oldestFile) {
                            oldestFile = stats.birthtime;
                        }
                        if (!newestFile || stats.birthtime > newestFile) {
                            newestFile = stats.birthtime;
                        }
                    }
                    catch (error) {
                        continue;
                    }
                }
                return {
                    totalFiles: files.length,
                    totalSize,
                    oldestFile,
                    newestFile
                };
            }
            catch (error) {
                this.logger.error('Error getting upload stats:', error);
                return { totalFiles: 0, totalSize: 0 };
            }
        }
        /**
         * Validate uploaded file against security policies
         */
        async validateUploadedFile(file, options) {
            const maxSize = options.maxFileSize || this.config.maxFileSize;
            const allowedTypes = options.allowedMimeTypes || this.config.allowedMimeTypes;
            // Check file size
            if (file.size > maxSize) {
                throw new common_1.BadRequestException(`File size ${file.size} bytes exceeds maximum allowed size of ${maxSize} bytes`);
            }
            // Check MIME type
            if (!allowedTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException(`File type ${file.mimetype} is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
            }
            // Validate file name
            if (!this.isFileNameSecure(file.originalname)) {
                throw new common_1.BadRequestException('File name contains invalid characters');
            }
            // Additional validation using FileProcessingService
            const validationResult = await this.fileProcessingService.validateFileType(file);
            if (!validationResult.isValid) {
                throw new common_1.BadRequestException(`File validation failed: ${validationResult.errors.join(', ')}`);
            }
        }
        /**
         * Generate secure file path with sanitization
         */
        generateSecureFilePath(originalFileName, jobId, customPath) {
            const sanitizedName = this.sanitizeFileName(originalFileName);
            const timestamp = Date.now();
            const randomSuffix = crypto.randomBytes(4).toString('hex');
            const secureFileName = `${timestamp}-${randomSuffix}-${sanitizedName}`;
            if (customPath) {
                return path.join(this.config.uploadDir, this.sanitizePath(customPath), secureFileName);
            }
            if (jobId) {
                return path.join(this.config.uploadDir, 'imports', jobId, secureFileName);
            }
            return path.join(this.config.uploadDir, 'general', secureFileName);
        }
        /**
         * Save file with secure permissions
         */
        async saveFileSecurely(file, filePath) {
            try {
                await fs_1.promises.writeFile(filePath, file.buffer, { mode: 0o600 }); // Read/write for owner only
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(`Failed to save file: ${error.message}`);
            }
        }
        /**
         * Set secure file permissions
         */
        async setSecureFilePermissions(filePath) {
            try {
                await fs_1.promises.chmod(filePath, 0o600); // Read/write for owner only
            }
            catch (error) {
                this.logger.warn(`Failed to set file permissions for ${filePath}:`, error);
            }
        }
        /**
         * Generate unique job ID
         */
        generateJobId() {
            const timestamp = Date.now().toString(36);
            const randomBytes = crypto.randomBytes(6).toString('hex');
            return `${timestamp}-${randomBytes}`;
        }
        /**
         * Sanitize file name to prevent path traversal
         */
        sanitizeFileName(fileName) {
            return fileName
                .replace(/[\/\\:*?"<>|]/g, '_')
                .replace(/\.\./g, '_')
                .replace(/^\.+/, '')
                .replace(/\s+/g, '_')
                .substring(0, 100);
        }
        /**
         * Sanitize path components
         */
        sanitizePath(pathStr) {
            return pathStr
                .split(path.sep)
                .map(segment => segment.replace(/[\/\\:*?"<>|]/g, '_'))
                .filter(segment => segment !== '..' && segment !== '.')
                .join(path.sep);
        }
        /**
         * Check if file name is secure
         */
        isFileNameSecure(fileName) {
            // Check for path traversal attempts
            if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
                return false;
            }
            // Check for null bytes
            if (fileName.includes('\0')) {
                return false;
            }
            // Check for control characters
            if (/[\x00-\x1f\x7f-\x9f]/.test(fileName)) {
                return false;
            }
            return true;
        }
        /**
         * Check if path is within allowed upload directory
         */
        isPathSecure(filePath) {
            const resolvedPath = path.resolve(filePath);
            const resolvedUploadDir = path.resolve(this.config.uploadDir);
            return resolvedPath.startsWith(resolvedUploadDir);
        }
        /**
         * Check if file is readable
         */
        async checkFileReadability(filePath) {
            try {
                await fs_1.promises.access(filePath, fs_1.promises.constants.R_OK);
                return true;
            }
            catch {
                return false;
            }
        }
        /**
         * Ensure upload directory exists
         */
        async ensureUploadDirectoryExists() {
            try {
                await fs_1.promises.mkdir(this.config.uploadDir, { recursive: true });
            }
            catch (error) {
                this.logger.error('Failed to create upload directory:', error);
                throw new common_1.InternalServerErrorException('Upload directory initialization failed');
            }
        }
        /**
         * Ensure specific directory exists
         */
        async ensureDirectoryExists(dirPath) {
            try {
                await fs_1.promises.mkdir(dirPath, { recursive: true });
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(`Failed to create directory: ${error.message}`);
            }
        }
        /**
         * Schedule file cleanup after specified hours
         */
        scheduleFileCleanup(filePath, hours) {
            setTimeout(async () => {
                try {
                    await this.deleteFile(filePath);
                }
                catch (error) {
                    this.logger.warn(`Scheduled cleanup failed for ${filePath}:`, error);
                }
            }, hours * 60 * 60 * 1000);
        }
        /**
         * Get all files recursively from directory
         */
        async getAllFilesRecursively(dir) {
            const files = [];
            try {
                const entries = await fs_1.promises.readdir(dir, { withFileTypes: true });
                for (const entry of entries) {
                    const fullPath = path.join(dir, entry.name);
                    if (entry.isDirectory()) {
                        const subFiles = await this.getAllFilesRecursively(fullPath);
                        files.push(...subFiles);
                    }
                    else {
                        files.push(fullPath);
                    }
                }
            }
            catch (error) {
                // Directory might not exist or be accessible
            }
            return files;
        }
        /**
         * Clean up single file
         */
        async cleanupFile(filePath) {
            try {
                await fs_1.promises.unlink(filePath);
            }
            catch (error) {
                this.logger.warn(`Failed to cleanup file ${filePath}:`, error);
            }
        }
    };
    return FileUploadService = _classThis;
})();
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file-upload.service.js.map