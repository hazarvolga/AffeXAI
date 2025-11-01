import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/enums/user-role.enum';
import { FormSubmissionService } from '../services/form-submission.service';
import { FormExportService } from '../services/form-export.service';
import {
  CreateFormSubmissionDto,
  UpdateFormSubmissionDto,
  ProcessSubmissionDto,
  FormSubmissionFiltersDto,
  ExportSubmissionsDto,
} from '../dto/form-submission.dto';

@ApiTags('Form Submissions')
@Controller('form-submissions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FormSubmissionController {
  constructor(
    private readonly submissionService: FormSubmissionService,
    private readonly exportService: FormExportService,
  ) {}

  /**
   * GET /form-submissions
   * Get all form submissions with filters
   */
  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Get all form submissions with filters' })
  @ApiResponse({ status: 200, description: 'Returns paginated submissions' })
  async findAll(@Query() filters: FormSubmissionFiltersDto) {
    // Convert string dates to Date objects
    const processedFilters = {
      ...filters,
      startDate: filters.startDate ? new Date(filters.startDate) : undefined,
      endDate: filters.endDate ? new Date(filters.endDate) : undefined,
    };
    return await this.submissionService.findAll(processedFilters);
  }

  /**
   * GET /form-submissions/stats
   * Get submission statistics
   */
  @Get('stats')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Get submission statistics' })
  @ApiResponse({ status: 200, description: 'Returns submission stats' })
  async getStats(@Query('formId') formId?: string) {
    return await this.submissionService.getStats(formId);
  }

  /**
   * GET /form-submissions/export/preview
   * Preview export data before downloading
   */
  @Get('export/preview')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Preview export data' })
  @ApiResponse({ status: 200, description: 'Returns export preview stats' })
  async getExportPreview(@Query() options: ExportSubmissionsDto) {
    // Convert string dates to Date objects
    const processedOptions = {
      ...options,
      startDate: options.startDate ? new Date(options.startDate) : undefined,
      endDate: options.endDate ? new Date(options.endDate) : undefined,
    };
    return await this.exportService.getExportPreview(processedOptions as any);
  }

  /**
   * GET /form-submissions/export
   * Export form submissions
   */
  @Get('export')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Export form submissions' })
  @ApiResponse({
    status: 200,
    description: 'Returns file download',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {},
      'text/csv': {},
      'application/json': {},
    },
  })
  async exportSubmissions(
    @Query() options: ExportSubmissionsDto,
    @Res() res: Response,
  ) {
    const { format, ...exportOptions } = options;

    // Convert string dates to Date objects
    const processedOptions = {
      ...exportOptions,
      startDate: exportOptions.startDate ? new Date(exportOptions.startDate) : undefined,
      endDate: exportOptions.endDate ? new Date(exportOptions.endDate) : undefined,
      format,
    };

    let filename: string;
    let contentType: string;
    let data: any;

    if (format === 'excel') {
      data = await this.exportService.exportToExcel(processedOptions as any);
      contentType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      filename = this.exportService.generateFilename(undefined, 'excel');
    } else if (format === 'csv') {
      data = await this.exportService.exportToCSV(processedOptions as any);
      contentType = 'text/csv';
      filename = this.exportService.generateFilename(undefined, 'csv');
    } else {
      // JSON
      data = await this.exportService.exportToJSON(processedOptions as any);
      contentType = 'application/json';
      filename = this.exportService.generateFilename(undefined, 'json');
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    if (format === 'json') {
      return res.status(HttpStatus.OK).json(data);
    } else {
      return res.status(HttpStatus.OK).send(data);
    }
  }

  /**
   * GET /form-submissions/:id
   * Get a single submission
   */
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Get a submission by ID' })
  @ApiResponse({ status: 200, description: 'Returns submission details' })
  @ApiResponse({ status: 404, description: 'Submission not found' })
  async findOne(@Param('id') id: string) {
    return await this.submissionService.findOne(id);
  }

  /**
   * POST /form-submissions
   * Create a new submission
   */
  @Post()
  @ApiOperation({ summary: 'Create a new form submission' })
  @ApiResponse({ status: 201, description: 'Submission created successfully' })
  async create(@Body() createDto: CreateFormSubmissionDto) {
    return await this.submissionService.create(createDto);
  }

  /**
   * PUT /form-submissions/:id
   * Update a submission
   */
  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Update a submission' })
  @ApiResponse({ status: 200, description: 'Submission updated successfully' })
  @ApiResponse({ status: 404, description: 'Submission not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateFormSubmissionDto,
  ) {
    return await this.submissionService.update(id, updateDto);
  }

  /**
   * POST /form-submissions/:id/process
   * Mark submission as processed
   */
  @Post(':id/process')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Mark submission as processed' })
  @ApiResponse({
    status: 200,
    description: 'Submission marked as processed',
  })
  async markAsProcessed(
    @Param('id') id: string,
    @Body() processDto: ProcessSubmissionDto,
  ) {
    return await this.submissionService.markAsProcessed(
      id,
      processDto.processedBy,
      processDto.processingNotes,
    );
  }

  /**
   * POST /form-submissions/:id/fail
   * Mark submission as failed
   */
  @Post(':id/fail')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Mark submission as failed' })
  @ApiResponse({ status: 200, description: 'Submission marked as failed' })
  async markAsFailed(
    @Param('id') id: string,
    @Body() body: { processingNotes: string },
  ) {
    return await this.submissionService.markAsFailed(id, body.processingNotes);
  }

  /**
   * POST /form-submissions/:id/archive
   * Archive a submission
   */
  @Post(':id/archive')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Archive a submission' })
  @ApiResponse({ status: 200, description: 'Submission archived' })
  async archive(@Param('id') id: string) {
    return await this.submissionService.archive(id);
  }

  /**
   * DELETE /form-submissions/:id
   * Delete a submission
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a submission' })
  @ApiResponse({ status: 200, description: 'Submission deleted successfully' })
  @ApiResponse({ status: 404, description: 'Submission not found' })
  async delete(@Param('id') id: string) {
    await this.submissionService.delete(id);
    return { message: 'Submission deleted successfully' };
  }
}
