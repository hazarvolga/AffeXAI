import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TicketCategoryService } from '../services/ticket-category.service';
import { CreateTicketCategoryDto } from '../dto/create-ticket-category.dto';
import { UpdateTicketCategoryDto } from '../dto/update-ticket-category.dto';
import { ReorderCategoriesDto } from '../dto/reorder-categories.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/enums/user-role.enum';

@ApiTags('Ticket Categories')
@Controller('ticket-categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TicketCategoryController {
  constructor(private readonly categoryService: TicketCategoryService) {}

  /**
   * GET /ticket-categories
   * Get all categories with hierarchy
   */
  @Get()
  @ApiOperation({ summary: 'Get all ticket categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      success: true,
      data: categories,
      total: categories.length,
    };
  }

  /**
   * GET /ticket-categories/tree
   * Get hierarchical tree structure
   */
  @Get('tree')
  @ApiOperation({ summary: 'Get categories as tree structure' })
  @ApiResponse({ status: 200, description: 'Tree retrieved successfully' })
  async getTree() {
    const tree = await this.categoryService.getTree();
    return {
      success: true,
      data: tree,
    };
  }

  /**
   * GET /ticket-categories/:id
   * Get single category
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get single category by ID' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return {
      success: true,
      data: category,
    };
  }

  /**
   * POST /ticket-categories
   * Create new category
   */
  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async create(@Body() createDto: CreateTicketCategoryDto) {
    const category = await this.categoryService.create(createDto);
    return {
      success: true,
      message: 'Category created successfully',
      data: category,
    };
  }

  /**
   * PUT /ticket-categories/:id
   * Update existing category
   */
  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Update existing category' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateTicketCategoryDto) {
    const category = await this.categoryService.update(id, updateDto);
    return {
      success: true,
      message: 'Category updated successfully',
      data: category,
    };
  }

  /**
   * DELETE /ticket-categories/:id
   * Delete category
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 400, description: 'Cannot delete category with subcategories or tickets' })
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(id);
    return {
      success: true,
      message: 'Category deleted successfully',
    };
  }

  /**
   * PATCH /ticket-categories/reorder
   * Reorder multiple categories
   */
  @Patch('reorder')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Reorder multiple categories' })
  @ApiResponse({ status: 200, description: 'Categories reordered successfully' })
  async reorder(@Body() reorderDto: ReorderCategoriesDto) {
    const categories = await this.categoryService.reorder(reorderDto);
    return {
      success: true,
      message: 'Categories reordered successfully',
      data: categories,
    };
  }

  /**
   * PATCH /ticket-categories/:id/toggle-active
   * Toggle category active status
   */
  @Patch(':id/toggle-active')
  @Roles(UserRole.ADMIN, UserRole.SUPPORT_MANAGER)
  @ApiOperation({ summary: 'Toggle category active status' })
  @ApiResponse({ status: 200, description: 'Category status updated successfully' })
  async toggleActive(@Param('id') id: string, @Body('isActive') isActive: boolean) {
    const category = await this.categoryService.toggleActive(id, isActive);
    return {
      success: true,
      message: `Category ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: category,
    };
  }
}
