"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const import_job_entity_1 = require("../import-job.entity");
const export_job_entity_1 = require("../export-job.entity");
const import_result_entity_1 = require("../import-result.entity");
const shared_types_1 = require("@affexai/shared-types");
describe('Bulk Import/Export Entities', () => {
    describe('ImportJob Entity', () => {
        it('should create an ImportJob instance with default values', () => {
            const importJob = new import_job_entity_1.ImportJob();
            importJob.fileName = 'test-import.csv';
            importJob.originalFileName = 'subscribers.csv';
            importJob.filePath = '/uploads/test-import.csv';
            importJob.status = import_job_entity_1.ImportJobStatus.PENDING;
            expect(importJob.fileName).toBe('test-import.csv');
            expect(importJob.originalFileName).toBe('subscribers.csv');
            expect(importJob.filePath).toBe('/uploads/test-import.csv');
            expect(importJob.status).toBe(import_job_entity_1.ImportJobStatus.PENDING);
            expect(importJob.totalRecords).toBe(0);
            expect(importJob.processedRecords).toBe(0);
            expect(importJob.validRecords).toBe(0);
            expect(importJob.invalidRecords).toBe(0);
            expect(importJob.riskyRecords).toBe(0);
            expect(importJob.duplicateRecords).toBe(0);
            expect(importJob.progressPercentage).toBe(0);
        });
        it('should handle options and column mapping', () => {
            const importJob = new import_job_entity_1.ImportJob();
            importJob.options = {
                groupIds: ['group1', 'group2'],
                segmentIds: ['segment1'],
                duplicateHandling: 'update',
                validationThreshold: 80,
                batchSize: 1000,
                columnMapping: { 'Email': 'email', 'First Name': 'firstName' }
            };
            importJob.columnMapping = { 'Email': 'email', 'First Name': 'firstName' };
            expect(importJob.options?.groupIds).toEqual(['group1', 'group2']);
            expect(importJob.options?.duplicateHandling).toBe('update');
            expect(importJob.options?.validationThreshold).toBe(80);
            expect(importJob.columnMapping).toEqual({ 'Email': 'email', 'First Name': 'firstName' });
        });
    });
    describe('ExportJob Entity', () => {
        it('should create an ExportJob instance with default values', () => {
            const exportJob = new export_job_entity_1.ExportJob();
            exportJob.fileName = 'export-subscribers.csv';
            exportJob.filePath = '/exports/export-subscribers.csv';
            exportJob.status = export_job_entity_1.ExportJobStatus.PENDING;
            exportJob.filters = { status: [shared_types_1.SubscriberStatus.ACTIVE] };
            exportJob.options = { fields: ['email', 'firstName'], format: 'csv', includeMetadata: false, batchSize: 1000 };
            exportJob.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
            expect(exportJob.fileName).toBe('export-subscribers.csv');
            expect(exportJob.filePath).toBe('/exports/export-subscribers.csv');
            expect(exportJob.status).toBe(export_job_entity_1.ExportJobStatus.PENDING);
            expect(exportJob.totalRecords).toBe(0);
            expect(exportJob.processedRecords).toBe(0);
            expect(exportJob.progressPercentage).toBe(0);
            expect(exportJob.filters).toEqual({ status: ['active'] });
            expect(exportJob.options.format).toBe('csv');
            expect(exportJob.options.fields).toEqual(['email', 'firstName']);
        });
    });
    describe('ImportResult Entity', () => {
        it('should create an ImportResult instance', () => {
            const importResult = new import_result_entity_1.ImportResult();
            importResult.importJobId = 'job-123';
            importResult.email = 'test@example.com';
            importResult.status = import_result_entity_1.ImportResultStatus.VALID;
            importResult.confidenceScore = 95;
            importResult.issues = [];
            importResult.suggestions = [];
            importResult.imported = false;
            importResult.rowNumber = 1;
            expect(importResult.importJobId).toBe('job-123');
            expect(importResult.email).toBe('test@example.com');
            expect(importResult.status).toBe(import_result_entity_1.ImportResultStatus.VALID);
            expect(importResult.confidenceScore).toBe(95);
            expect(importResult.imported).toBe(false);
            expect(importResult.rowNumber).toBe(1);
        });
        it('should handle validation details', () => {
            const importResult = new import_result_entity_1.ImportResult();
            importResult.validationDetails = {
                syntaxValid: true,
                domainExists: true,
                mxRecordExists: true,
                isDisposable: false,
                isRoleAccount: false,
                hasTypos: false,
                ipReputation: 'good',
                confidenceScore: 95,
                validationProvider: 'advanced-validation',
                validatedAt: new Date()
            };
            expect(importResult.validationDetails?.syntaxValid).toBe(true);
            expect(importResult.validationDetails?.domainExists).toBe(true);
            expect(importResult.validationDetails?.ipReputation).toBe('good');
            expect(importResult.validationDetails?.confidenceScore).toBe(95);
        });
    });
});
//# sourceMappingURL=bulk-import-export-entities.test.js.map