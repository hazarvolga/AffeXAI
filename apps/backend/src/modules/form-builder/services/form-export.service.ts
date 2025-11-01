import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormSubmission } from '../entities/form-submission.entity';
import { FormDefinition } from '../entities/form-definition.entity';
import * as XLSX from 'xlsx';

export interface ExportOptions {
  formId?: string;
  sourceModule?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  format: 'excel' | 'csv' | 'json';
  includeMetadata?: boolean;
}

@Injectable()
export class FormExportService {
  constructor(
    @InjectRepository(FormSubmission)
    private readonly submissionRepository: Repository<FormSubmission>,
    @InjectRepository(FormDefinition)
    private readonly formDefinitionRepository: Repository<FormDefinition>,
  ) {}

  /**
   * Export form submissions to Excel
   */
  async exportToExcel(options: ExportOptions): Promise<Buffer> {
    const submissions = await this.getSubmissionsForExport(options);
    const form = options.formId
      ? await this.formDefinitionRepository.findOne({
          where: { id: options.formId },
        })
      : null;

    // Prepare data for Excel
    const data = this.prepareDataForExport(submissions, options);

    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Add submissions sheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');

    // Add metadata sheet if requested
    if (options.includeMetadata && form) {
      const metadataSheet = XLSX.utils.json_to_sheet([
        {
          'Form Name': form.name,
          'Form Description': form.description,
          Module: form.module,
          'Form Type': form.formType,
          'Total Submissions': submissions.length,
          'Export Date': new Date().toISOString(),
        },
      ]);
      XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Metadata');
    }

    // Convert to buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    return buffer;
  }

  /**
   * Export form submissions to CSV
   */
  async exportToCSV(options: ExportOptions): Promise<string> {
    const submissions = await this.getSubmissionsForExport(options);
    const data = this.prepareDataForExport(submissions, options);

    // Create workbook and convert to CSV
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    return csv;
  }

  /**
   * Export form submissions to JSON
   */
  async exportToJSON(options: ExportOptions): Promise<any> {
    const submissions = await this.getSubmissionsForExport(options);
    const form = options.formId
      ? await this.formDefinitionRepository.findOne({
          where: { id: options.formId },
        })
      : null;

    const exportData = {
      metadata: options.includeMetadata
        ? {
            formName: form?.name,
            formDescription: form?.description,
            module: form?.module,
            formType: form?.formType,
            totalSubmissions: submissions.length,
            exportDate: new Date().toISOString(),
            filters: {
              formId: options.formId,
              sourceModule: options.sourceModule,
              status: options.status,
              startDate: options.startDate,
              endDate: options.endDate,
            },
          }
        : undefined,
      submissions: submissions.map((submission) => ({
        id: submission.id,
        formId: submission.formId,
        formName: submission.form?.name,
        submittedData: submission.submittedData,
        sourceModule: submission.sourceModule,
        sourceRecordId: submission.sourceRecordId,
        status: submission.status,
        submittedAt: submission.submittedAt,
        submittedBy: submission.submittedBy,
        submitterEmail: submission.submitter?.email,
        submitterName: submission.submitter
          ? `${submission.submitter.firstName} ${submission.submitter.lastName}`
          : null,
        processedAt: submission.processedAt,
        processedBy: submission.processedBy,
        processingNotes: submission.processingNotes,
      })),
    };

    return exportData;
  }

  /**
   * Get submissions for export based on filters
   */
  private async getSubmissionsForExport(
    options: ExportOptions,
  ): Promise<FormSubmission[]> {
    const queryBuilder = this.submissionRepository
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.form', 'form')
      .leftJoinAndSelect('submission.submitter', 'user');

    if (options.formId) {
      queryBuilder.andWhere('submission.formId = :formId', {
        formId: options.formId,
      });
    }

    if (options.sourceModule) {
      queryBuilder.andWhere('submission.sourceModule = :sourceModule', {
        sourceModule: options.sourceModule,
      });
    }

    if (options.status) {
      queryBuilder.andWhere('submission.status = :status', {
        status: options.status,
      });
    }

    if (options.startDate) {
      queryBuilder.andWhere('submission.submittedAt >= :startDate', {
        startDate: options.startDate,
      });
    }

    if (options.endDate) {
      queryBuilder.andWhere('submission.submittedAt <= :endDate', {
        endDate: options.endDate,
      });
    }

    return await queryBuilder
      .orderBy('submission.submittedAt', 'DESC')
      .getMany();
  }

  /**
   * Prepare data for export (flatten nested data)
   */
  private prepareDataForExport(
    submissions: FormSubmission[],
    options: ExportOptions,
  ): any[] {
    return submissions.map((submission) => {
      const flatData: any = {
        'Submission ID': submission.id,
        'Form Name': submission.form?.name || 'N/A',
        Module: submission.sourceModule,
        'Source Record ID': submission.sourceRecordId || 'N/A',
        Status: submission.status,
        'Submitted At': submission.submittedAt
          ? new Date(submission.submittedAt).toLocaleString()
          : 'N/A',
        'Submitted By': submission.submitter
          ? `${submission.submitter.firstName} ${submission.submitter.lastName}`
          : 'Anonymous',
        'Submitter Email': submission.submitter?.email || 'N/A',
      };

      // Flatten submitted data
      if (submission.submittedData) {
        Object.keys(submission.submittedData).forEach((key) => {
          const value = submission.submittedData[key];
          flatData[`Field: ${key}`] =
            typeof value === 'object' ? JSON.stringify(value) : value;
        });
      }

      // Add processing info if available
      if (submission.processedAt) {
        flatData['Processed At'] = new Date(
          submission.processedAt,
        ).toLocaleString();
        flatData['Processed By'] = submission.processedBy || 'N/A';
        flatData['Processing Notes'] = submission.processingNotes || 'N/A';
      }

      return flatData;
    });
  }

  /**
   * Generate filename for export
   */
  generateFilename(
    formName: string | undefined,
    format: 'excel' | 'csv' | 'json',
  ): string {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-')
      .split('T')[0];
    const name = formName ? formName.replace(/[^a-z0-9]/gi, '_') : 'submissions';
    const extension = format === 'excel' ? 'xlsx' : format;

    return `${name}_export_${timestamp}.${extension}`;
  }

  /**
   * Get export statistics
   */
  async getExportPreview(options: ExportOptions) {
    const submissions = await this.getSubmissionsForExport(options);

    return {
      totalRecords: submissions.length,
      dateRange: {
        earliest: submissions.length
          ? submissions[submissions.length - 1].submittedAt
          : null,
        latest: submissions.length ? submissions[0].submittedAt : null,
      },
      statusBreakdown: submissions.reduce(
        (acc, sub) => {
          acc[sub.status] = (acc[sub.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
    };
  }
}
