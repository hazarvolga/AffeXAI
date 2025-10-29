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
  Request,
} from '@nestjs/common';
import {
  TicketFieldLibraryService,
  CreateFieldLibraryDto,
  UpdateFieldLibraryDto,
  FieldLibraryFilters,
} from '../services/ticket-field-library.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/enums/user-role.enum';

@Controller('ticket-field-library')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketFieldLibraryController {
  constructor(
    private readonly fieldLibraryService: TicketFieldLibraryService,
  ) {}

  /**
   * GET /ticket-field-library
   * Get all field library entries
   * Accessible by: Admin, Support Manager
   */
  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  async findAll(@Query() filters: FieldLibraryFilters) {
    return await this.fieldLibraryService.findAll(filters);
  }

  /**
   * GET /ticket-field-library/tags
   * Get all unique tags
   * Accessible by: Admin, Support Manager
   */
  @Get('tags')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  async getAllTags() {
    const tags = await this.fieldLibraryService.getAllTags();
    return { tags };
  }

  /**
   * GET /ticket-field-library/:id
   * Get a single field library entry
   * Accessible by: Admin, Support Manager
   */
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  async findOne(@Param('id') id: string) {
    const field = await this.fieldLibraryService.findOne(id);
    return { field };
  }

  /**
   * POST /ticket-field-library
   * Create a new field library entry
   * Accessible by: Admin, Support Manager
   */
  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  async create(@Body() createDto: CreateFieldLibraryDto, @Request() req: any) {
    const userId = req.user?.id;
    const field = await this.fieldLibraryService.create(createDto, userId);
    return {
      success: true,
      message: 'Field library entry created successfully',
      field,
    };
  }

  /**
   * PUT /ticket-field-library/:id
   * Update a field library entry
   * Accessible by: Admin, Support Manager
   */
  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateFieldLibraryDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id;
    const field = await this.fieldLibraryService.update(id, updateDto, userId);
    return {
      success: true,
      message: 'Field library entry updated successfully',
      field,
    };
  }

  /**
   * DELETE /ticket-field-library/:id
   * Delete a field library entry
   * Accessible by: Admin, Support Manager
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  async remove(@Param('id') id: string) {
    await this.fieldLibraryService.remove(id);
    return {
      success: true,
      message: 'Field library entry deleted successfully',
    };
  }

  /**
   * POST /ticket-field-library/:id/toggle-active
   * Toggle field active status
   * Accessible by: Admin, Support Manager
   */
  @Post(':id/toggle-active')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  async toggleActive(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ) {
    const field = await this.fieldLibraryService.toggleActive(id, isActive);
    return {
      success: true,
      message: `Field ${isActive ? 'activated' : 'deactivated'} successfully`,
      field,
    };
  }
}
