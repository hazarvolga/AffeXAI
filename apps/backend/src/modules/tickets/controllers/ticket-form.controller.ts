import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TicketFormService } from '../services/ticket-form.service';
import {
  CreateTicketFormDto,
  UpdateTicketFormDto,
  ToggleFormActiveDto,
  RevertToVersionDto,
  GetFormDefinitionsDto,
  GetFormVersionsDto,
} from '../dto/ticket-form.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/enums/user-role.enum';

@Controller('ticket-forms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketFormController {
  constructor(private readonly ticketFormService: TicketFormService) {}

  /**
   * GET /ticket-forms
   * Get all form definitions with pagination and filtering
   * Accessible by: Admin, Support Team
   */
  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_AGENT)
  async findAll(@Query() query: GetFormDefinitionsDto) {
    return await this.ticketFormService.findAll(query);
  }

  /**
   * GET /ticket-forms/default
   * Get the default form definition
   * Accessible by: All authenticated users
   */
  @Get('default')
  async findDefault() {
    const formDefinition = await this.ticketFormService.findDefault();
    return { formDefinition };
  }

  /**
   * GET /ticket-forms/:id
   * Get a single form definition by ID
   * Accessible by: Admin, Support Team
   */
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_AGENT)
  async findOne(@Param('id') id: string) {
    const formDefinition = await this.ticketFormService.findOne(id);
    return { formDefinition };
  }

  /**
   * POST /ticket-forms
   * Create a new form definition
   * Accessible by: Admin only
   */
  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createDto: CreateTicketFormDto, @Request() req: any) {
    const userId = req.user?.id;
    const formDefinition = await this.ticketFormService.create(createDto, userId);
    return {
      success: true,
      message: 'Form definition created successfully',
      formDefinition,
    };
  }

  /**
   * PUT /ticket-forms/:id
   * Update an existing form definition
   * Accessible by: Admin only
   */
  @Put(':id')
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateTicketFormDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id;
    const formDefinition = await this.ticketFormService.update(id, updateDto, userId);
    return {
      success: true,
      message: 'Form definition updated successfully',
      formDefinition,
    };
  }

  /**
   * DELETE /ticket-forms/:id
   * Delete a form definition
   * Accessible by: Admin only
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.ticketFormService.remove(id);
  }

  /**
   * POST /ticket-forms/:id/set-default
   * Set a form as the default
   * Accessible by: Admin only
   */
  @Post(':id/set-default')
  @Roles(UserRole.ADMIN)
  async setAsDefault(@Param('id') id: string) {
    return await this.ticketFormService.setAsDefault(id);
  }

  /**
   * PATCH /ticket-forms/:id/active
   * Toggle form active status
   * Accessible by: Admin only
   */
  @Patch(':id/active')
  @Roles(UserRole.ADMIN)
  async toggleActive(@Param('id') id: string, @Body() toggleDto: ToggleFormActiveDto) {
    const formDefinition = await this.ticketFormService.toggleActive(id, toggleDto.isActive);
    return {
      success: true,
      message: `Form ${toggleDto.isActive ? 'activated' : 'deactivated'} successfully`,
      formDefinition,
    };
  }

  /**
   * GET /ticket-forms/:id/versions
   * Get version history for a form definition
   * Accessible by: Admin, Support Team
   */
  @Get(':id/versions')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_AGENT)
  async getVersions(@Param('id') id: string, @Query() query: GetFormVersionsDto) {
    return await this.ticketFormService.getVersions(id, query);
  }

  /**
   * GET /ticket-forms/:id/versions/:version
   * Get a specific version of a form definition
   * Accessible by: Admin, Support Team
   */
  @Get(':id/versions/:version')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_AGENT)
  async getVersion(@Param('id') id: string, @Param('version') version: string) {
    const versionNumber = parseInt(version, 10);
    const formVersion = await this.ticketFormService.getVersion(id, versionNumber);
    return { version: formVersion };
  }

  /**
   * POST /ticket-forms/:id/versions/:version/revert
   * Revert form to a previous version
   * Accessible by: Admin only
   */
  @Post(':id/versions/:version/revert')
  @Roles(UserRole.ADMIN)
  async revertToVersion(
    @Param('id') id: string,
    @Param('version') version: string,
    @Body() revertDto: RevertToVersionDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id;
    const versionNumber = parseInt(version, 10);
    const formDefinition = await this.ticketFormService.revertToVersion(
      id,
      versionNumber,
      revertDto.changeLog,
      userId,
    );
    return {
      success: true,
      message: `Form reverted to version ${versionNumber} successfully`,
      formDefinition,
    };
  }
}
