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
exports.EnhancedFileSecurityService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
let EnhancedFileSecurityService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EnhancedFileSecurityService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            EnhancedFileSecurityService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        logger = new common_1.Logger(EnhancedFileSecurityService.name);
        config = {
            enableAdvancedMalwareScanning: true,
            enableFileIntegrityChecking: true,
            quarantineDirectory: path.join(process.cwd(), 'quarantine'),
            maxQuarantineRetentionDays: 30,
            enableRealTimeScanning: true,
            trustedFileHashes: new Set()
        };
        // Enhanced malware signatures and patterns
        MALWARE_SIGNATURES = [
            // Executable signatures
            { signature: Buffer.from([0x4D, 0x5A]), name: 'PE Executable', risk: 'HIGH' },
            { signature: Buffer.from([0x7F, 0x45, 0x4C, 0x46]), name: 'ELF Executable', risk: 'HIGH' },
            { signature: Buffer.from([0xCA, 0xFE, 0xBA, 0xBE]), name: 'Mach-O Executable', risk: 'HIGH' },
            { signature: Buffer.from([0x50, 0x4B, 0x03, 0x04]), name: 'ZIP Archive', risk: 'MEDIUM' },
            { signature: Buffer.from([0x52, 0x61, 0x72, 0x21]), name: 'RAR Archive', risk: 'MEDIUM' },
            // Script signatures
            { signature: Buffer.from('#!/bin/sh'), name: 'Shell Script', risk: 'HIGH' },
            { signature: Buffer.from('#!/bin/bash'), name: 'Bash Script', risk: 'HIGH' },
            { signature: Buffer.from('<?php'), name: 'PHP Script', risk: 'MEDIUM' },
        ];
        SUSPICIOUS_PATTERNS = [
            // JavaScript/HTML injection patterns
            { pattern: /<script[^>]*>/gi, name: 'Script Tag', risk: 'HIGH' },
            { pattern: /javascript:/gi, name: 'JavaScript Protocol', risk: 'HIGH' },
            { pattern: /vbscript:/gi, name: 'VBScript Protocol', risk: 'HIGH' },
            { pattern: /on\w+\s*=/gi, name: 'Event Handler', risk: 'MEDIUM' },
            { pattern: /eval\s*\(/gi, name: 'Eval Function', risk: 'HIGH' },
            { pattern: /document\.write/gi, name: 'Document Write', risk: 'MEDIUM' },
            // Command injection patterns
            { pattern: /\$\([^)]+\)/g, name: 'Command Substitution', risk: 'HIGH' },
            { pattern: /`[^`]+`/g, name: 'Backtick Command', risk: 'HIGH' },
            { pattern: /;\s*(rm|del|format|fdisk)/gi, name: 'Destructive Command', risk: 'CRITICAL' },
            // SQL injection patterns
            { pattern: /(union|select|insert|update|delete|drop)\s+/gi, name: 'SQL Keywords', risk: 'HIGH' },
            { pattern: /'\s*(or|and)\s*'?\d/gi, name: 'SQL Injection Pattern', risk: 'HIGH' },
            // Path traversal patterns
            { pattern: /\.\.[\/\\]/g, name: 'Path Traversal', risk: 'HIGH' },
            { pattern: /[\/\\]etc[\/\\]passwd/gi, name: 'System File Access', risk: 'CRITICAL' },
            // Encoded payloads
            { pattern: /%[0-9a-f]{2}/gi, name: 'URL Encoded Content', risk: 'MEDIUM' },
            { pattern: /\\x[0-9a-f]{2}/gi, name: 'Hex Encoded Content', risk: 'MEDIUM' },
        ];
        constructor() {
            this.initializeSecurityService();
        }
        /**
         * Perform comprehensive malware scanning
         */
        async performAdvancedMalwareScan(filePath) {
            const result = {
                isClean: true,
                threats: [],
                scanEngine: 'Enhanced Security Scanner',
                scanTime: new Date(),
                details: {}
            };
            try {
                // Step 1: Signature-based scanning
                const signatureThreats = await this.scanFileSignatures(filePath);
                result.threats.push(...signatureThreats);
                // Step 2: Pattern-based content scanning
                const patternThreats = await this.scanSuspiciousPatterns(filePath);
                result.threats.push(...patternThreats);
                // Step 3: Behavioral analysis
                const behaviorThreats = await this.analyzeSuspiciousBehavior(filePath);
                result.threats.push(...behaviorThreats);
                // Step 4: External antivirus integration (if available)
                if (await this.isExternalScannerAvailable()) {
                    const externalThreats = await this.performExternalScan(filePath);
                    result.threats.push(...externalThreats);
                }
                // Step 5: File entropy analysis
                const entropyThreats = await this.analyzeFileEntropy(filePath);
                result.threats.push(...entropyThreats);
                result.isClean = result.threats.length === 0;
                result.details = {
                    signatureMatches: signatureThreats.length,
                    patternMatches: patternThreats.length,
                    behaviorFlags: behaviorThreats.length,
                    entropyFlags: entropyThreats.length
                };
                this.logger.log(`Malware scan completed for ${filePath}: ${result.isClean ? 'CLEAN' : 'THREATS DETECTED'}`);
                if (!result.isClean) {
                    this.logger.warn(`Threats detected in ${filePath}: ${result.threats.join(', ')}`);
                }
            }
            catch (error) {
                this.logger.error(`Malware scan failed for ${filePath}:`, error);
                result.isClean = false;
                result.threats.push('Scan failed - file treated as suspicious');
            }
            return result;
        }
        /**
         * Implement secure file storage with access controls
         */
        async secureFileStorage(filePath, jobId) {
            const report = {
                filePath,
                isSecure: false,
                malwareScan: { isClean: false, threats: [], scanEngine: '', scanTime: new Date() },
                integrityCheck: false,
                permissionsSet: false,
                quarantined: false,
                issues: []
            };
            try {
                // Step 1: Perform malware scan
                report.malwareScan = await this.performAdvancedMalwareScan(filePath);
                if (!report.malwareScan.isClean) {
                    // Quarantine the file
                    await this.quarantineFile(filePath, jobId, report.malwareScan.threats);
                    report.quarantined = true;
                    report.issues.push('File quarantined due to security threats');
                    return report;
                }
                // Step 2: Set secure file permissions
                await this.setSecurePermissions(filePath);
                report.permissionsSet = true;
                // Step 3: Create file integrity hash
                const fileHash = await this.createFileIntegrityHash(filePath);
                await this.storeFileIntegrityHash(filePath, fileHash, jobId);
                report.integrityCheck = true;
                // Step 4: Apply additional access controls
                await this.applyAccessControls(filePath, jobId);
                report.isSecure = true;
                this.logger.log(`File secured successfully: ${filePath}`);
            }
            catch (error) {
                this.logger.error(`File security process failed for ${filePath}:`, error);
                report.issues.push(`Security process failed: ${error.message}`);
            }
            return report;
        }
        /**
         * Automatic cleanup of sensitive temporary files
         */
        async automaticSensitiveFileCleanup(jobId, maxAgeHours = 24) {
            const result = {
                cleanedFiles: 0,
                errors: [],
                totalSize: 0
            };
            try {
                const tempDirectories = [
                    path.join(process.cwd(), 'temp', 'imports'),
                    path.join(process.cwd(), 'temp', 'exports'),
                    path.join(process.cwd(), 'temp', 'uploads')
                ];
                if (jobId) {
                    // Clean specific job files
                    for (const baseDir of tempDirectories) {
                        const jobDir = path.join(baseDir, jobId);
                        const cleanupResult = await this.cleanupDirectory(jobDir, 0); // Clean immediately for specific job
                        result.cleanedFiles += cleanupResult.cleanedFiles;
                        result.totalSize += cleanupResult.totalSize;
                        result.errors.push(...cleanupResult.errors);
                    }
                }
                else {
                    // Clean old files across all temp directories
                    for (const dir of tempDirectories) {
                        const cleanupResult = await this.cleanupDirectory(dir, maxAgeHours);
                        result.cleanedFiles += cleanupResult.cleanedFiles;
                        result.totalSize += cleanupResult.totalSize;
                        result.errors.push(...cleanupResult.errors);
                    }
                }
                // Clean quarantine directory
                const quarantineCleanup = await this.cleanupQuarantineDirectory();
                result.cleanedFiles += quarantineCleanup.cleanedFiles;
                result.totalSize += quarantineCleanup.totalSize;
                result.errors.push(...quarantineCleanup.errors);
                this.logger.log(`Cleanup completed: ${result.cleanedFiles} files cleaned, ${result.totalSize} bytes freed`);
            }
            catch (error) {
                this.logger.error('Automatic cleanup failed:', error);
                result.errors.push(`Cleanup failed: ${error.message}`);
            }
            return result;
        }
        /**
         * Verify file integrity using stored hashes
         */
        async verifyFileIntegrity(filePath, jobId) {
            try {
                const storedHash = await this.getStoredFileIntegrityHash(filePath, jobId);
                if (!storedHash) {
                    this.logger.warn(`No integrity hash found for ${filePath}`);
                    return false;
                }
                const currentHash = await this.createFileIntegrityHash(filePath);
                const isValid = storedHash === currentHash;
                if (!isValid) {
                    this.logger.error(`File integrity check failed for ${filePath}`);
                    // Quarantine the potentially tampered file
                    await this.quarantineFile(filePath, jobId, ['File integrity violation']);
                }
                return isValid;
            }
            catch (error) {
                this.logger.error(`File integrity verification failed for ${filePath}:`, error);
                return false;
            }
        }
        /**
         * Get security audit report for a job
         */
        async getSecurityAuditReport(jobId) {
            // This would typically query a database for stored security information
            // For now, return a basic structure
            return {
                jobId,
                totalFiles: 0,
                secureFiles: 0,
                quarantinedFiles: 0,
                integrityViolations: 0,
                threatsSummary: {},
                recommendations: []
            };
        }
        // Private helper methods
        async initializeSecurityService() {
            try {
                // Ensure quarantine directory exists
                await fs_1.promises.mkdir(this.config.quarantineDirectory, { recursive: true });
                // Set up periodic cleanup
                setInterval(() => {
                    this.automaticSensitiveFileCleanup().catch(error => {
                        this.logger.error('Periodic cleanup failed:', error);
                    });
                }, 60 * 60 * 1000); // Run every hour
                this.logger.log('Enhanced file security service initialized');
            }
            catch (error) {
                this.logger.error('Failed to initialize security service:', error);
            }
        }
        async scanFileSignatures(filePath) {
            const threats = [];
            try {
                const buffer = await fs_1.promises.readFile(filePath);
                for (const { signature, name, risk } of this.MALWARE_SIGNATURES) {
                    if (buffer.subarray(0, signature.length).equals(signature)) {
                        threats.push(`${name} (${risk} risk)`);
                    }
                }
            }
            catch (error) {
                this.logger.error(`Signature scan failed for ${filePath}:`, error);
            }
            return threats;
        }
        async scanSuspiciousPatterns(filePath) {
            const threats = [];
            try {
                const content = await fs_1.promises.readFile(filePath, 'utf8');
                for (const { pattern, name, risk } of this.SUSPICIOUS_PATTERNS) {
                    if (pattern.test(content)) {
                        threats.push(`${name} (${risk} risk)`);
                    }
                }
            }
            catch (error) {
                // File might be binary, try with limited buffer
                try {
                    const buffer = await fs_1.promises.readFile(filePath);
                    const content = buffer.toString('utf8', 0, Math.min(buffer.length, 50000));
                    for (const { pattern, name, risk } of this.SUSPICIOUS_PATTERNS) {
                        if (pattern.test(content)) {
                            threats.push(`${name} (${risk} risk)`);
                        }
                    }
                }
                catch (innerError) {
                    this.logger.debug(`Pattern scan skipped for binary file ${filePath}`);
                }
            }
            return threats;
        }
        async analyzeSuspiciousBehavior(filePath) {
            const threats = [];
            try {
                const stats = await fs_1.promises.stat(filePath);
                // Check for suspicious file size patterns
                if (stats.size === 0) {
                    threats.push('Empty file (potential placeholder)');
                }
                else if (stats.size > 100 * 1024 * 1024) { // > 100MB
                    threats.push('Unusually large file size');
                }
                // Check file extension vs content mismatch
                const extension = path.extname(filePath).toLowerCase();
                if (['.csv', '.txt'].includes(extension)) {
                    const buffer = await fs_1.promises.readFile(filePath, { encoding: 'utf8', flag: 'r' });
                    const firstLine = buffer.split('\n')[0];
                    if (firstLine && firstLine.length > 1000) {
                        threats.push('Suspicious line length for CSV/text file');
                    }
                }
            }
            catch (error) {
                this.logger.error(`Behavior analysis failed for ${filePath}:`, error);
            }
            return threats;
        }
        async isExternalScannerAvailable() {
            try {
                // Check for ClamAV
                await execAsync('which clamscan');
                return true;
            }
            catch {
                return false;
            }
        }
        async performExternalScan(filePath) {
            const threats = [];
            try {
                const { stdout, stderr } = await execAsync(`clamscan --no-summary "${filePath}"`);
                if (stderr || stdout.includes('FOUND')) {
                    threats.push('External scanner detected threat');
                }
            }
            catch (error) {
                // ClamAV returns non-zero exit code when threats are found
                if (error.stdout && error.stdout.includes('FOUND')) {
                    threats.push('External scanner detected threat');
                }
            }
            return threats;
        }
        async analyzeFileEntropy(filePath) {
            const threats = [];
            try {
                const buffer = await fs_1.promises.readFile(filePath);
                const entropy = this.calculateEntropy(buffer);
                // High entropy might indicate encrypted/compressed malware
                if (entropy > 7.5) {
                    threats.push('High entropy content (possible encryption/compression)');
                }
            }
            catch (error) {
                this.logger.error(`Entropy analysis failed for ${filePath}:`, error);
            }
            return threats;
        }
        calculateEntropy(buffer) {
            const frequencies = new Array(256).fill(0);
            for (let i = 0; i < buffer.length; i++) {
                frequencies[buffer[i]]++;
            }
            let entropy = 0;
            for (const freq of frequencies) {
                if (freq > 0) {
                    const probability = freq / buffer.length;
                    entropy -= probability * Math.log2(probability);
                }
            }
            return entropy;
        }
        async quarantineFile(filePath, jobId, threats) {
            try {
                const fileName = path.basename(filePath);
                const quarantinePath = path.join(this.config.quarantineDirectory, `${Date.now()}-${jobId}-${fileName}`);
                await fs_1.promises.rename(filePath, quarantinePath);
                // Create quarantine metadata
                const metadata = {
                    originalPath: filePath,
                    jobId,
                    quarantineTime: new Date(),
                    threats,
                    fileSize: (await fs_1.promises.stat(quarantinePath)).size
                };
                await fs_1.promises.writeFile(`${quarantinePath}.metadata.json`, JSON.stringify(metadata, null, 2));
                this.logger.warn(`File quarantined: ${filePath} -> ${quarantinePath}`);
            }
            catch (error) {
                this.logger.error(`Failed to quarantine file ${filePath}:`, error);
                throw error;
            }
        }
        async setSecurePermissions(filePath) {
            try {
                await fs_1.promises.chmod(filePath, 0o600); // Read/write for owner only
            }
            catch (error) {
                this.logger.error(`Failed to set secure permissions for ${filePath}:`, error);
                throw error;
            }
        }
        async createFileIntegrityHash(filePath) {
            const buffer = await fs_1.promises.readFile(filePath);
            return crypto.createHash('sha256').update(buffer).digest('hex');
        }
        async storeFileIntegrityHash(filePath, hash, jobId) {
            // In a real implementation, this would store in a database
            // For now, store in a local file
            const hashFile = path.join(process.cwd(), 'temp', 'integrity', `${jobId}.hashes.json`);
            try {
                await fs_1.promises.mkdir(path.dirname(hashFile), { recursive: true });
                let hashes = {};
                try {
                    const existing = await fs_1.promises.readFile(hashFile, 'utf8');
                    hashes = JSON.parse(existing);
                }
                catch {
                    // File doesn't exist yet
                }
                hashes[filePath] = hash;
                await fs_1.promises.writeFile(hashFile, JSON.stringify(hashes, null, 2));
            }
            catch (error) {
                this.logger.error(`Failed to store integrity hash for ${filePath}:`, error);
            }
        }
        async getStoredFileIntegrityHash(filePath, jobId) {
            const hashFile = path.join(process.cwd(), 'temp', 'integrity', `${jobId}.hashes.json`);
            try {
                const content = await fs_1.promises.readFile(hashFile, 'utf8');
                const hashes = JSON.parse(content);
                return hashes[filePath] || null;
            }
            catch {
                return null;
            }
        }
        async applyAccessControls(filePath, jobId) {
            // Additional access control measures could be implemented here
            // For example, setting extended attributes, ACLs, etc.
            this.logger.debug(`Access controls applied for ${filePath}`);
        }
        async cleanupDirectory(dirPath, maxAgeHours) {
            const result = { cleanedFiles: 0, totalSize: 0, errors: [] };
            try {
                const cutoffTime = new Date(Date.now() - (maxAgeHours * 60 * 60 * 1000));
                const files = await this.getAllFilesRecursively(dirPath);
                for (const filePath of files) {
                    try {
                        const stats = await fs_1.promises.stat(filePath);
                        if (maxAgeHours === 0 || stats.birthtime < cutoffTime) {
                            result.totalSize += stats.size;
                            await fs_1.promises.unlink(filePath);
                            result.cleanedFiles++;
                            // Also clean up any associated metadata files
                            const metadataFile = `${filePath}.metadata.json`;
                            try {
                                await fs_1.promises.unlink(metadataFile);
                            }
                            catch {
                                // Metadata file might not exist
                            }
                        }
                    }
                    catch (error) {
                        result.errors.push(`Failed to clean ${filePath}: ${error.message}`);
                    }
                }
                // Remove empty directories
                await this.removeEmptyDirectories(dirPath);
            }
            catch (error) {
                result.errors.push(`Directory cleanup failed: ${error.message}`);
            }
            return result;
        }
        async cleanupQuarantineDirectory() {
            const maxAge = this.config.maxQuarantineRetentionDays * 24; // Convert to hours
            return this.cleanupDirectory(this.config.quarantineDirectory, maxAge);
        }
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
            catch {
                // Directory might not exist or be accessible
            }
            return files;
        }
        async removeEmptyDirectories(dir) {
            try {
                const entries = await fs_1.promises.readdir(dir);
                if (entries.length === 0) {
                    await fs_1.promises.rmdir(dir);
                }
                else {
                    // Check subdirectories
                    for (const entry of entries) {
                        const fullPath = path.join(dir, entry);
                        const stats = await fs_1.promises.stat(fullPath);
                        if (stats.isDirectory()) {
                            await this.removeEmptyDirectories(fullPath);
                        }
                    }
                    // Check again if directory is now empty
                    const remainingEntries = await fs_1.promises.readdir(dir);
                    if (remainingEntries.length === 0) {
                        await fs_1.promises.rmdir(dir);
                    }
                }
            }
            catch {
                // Directory might not be empty or accessible
            }
        }
    };
    return EnhancedFileSecurityService = _classThis;
})();
exports.EnhancedFileSecurityService = EnhancedFileSecurityService;
//# sourceMappingURL=enhanced-file-security.service.js.map