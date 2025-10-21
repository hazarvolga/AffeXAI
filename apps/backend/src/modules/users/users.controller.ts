import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
  Request,
  ForbiddenException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { ChangeUserRoleDto } from './dto/change-user-role.dto';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { UserRolesService } from './user-roles.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { UserRole } from './enums/user-role.enum';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRolesService: UserRolesService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get all users with filters and pagination' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  findAll(@Query() filterDto: FilterUsersDto) {
    return this.usersService.findAll(filterDto);
  }

  @Get('stats')
  @Roles(UserRole.ADMIN, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get user statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  getStats() {
    return this.usersService.getStats();
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile (self-service)' })
  @ApiResponse({ status: 200, description: 'Current user retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getCurrentUser(@CurrentUser('id') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('complete-profile')
  @ApiOperation({ summary: 'Complete user profile after registration (self-service)' })
  @ApiResponse({ status: 200, description: 'Profile completed successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  completeProfile(@CurrentUser('id') userId: string, @Body() completeProfileDto: CompleteProfileDto) {
    return this.usersService.completeProfile(userId, completeProfileDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user (self-service or admin)' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  @ApiResponse({ status: 403, description: 'Forbidden - can only update own profile or admin required' })
  update(
    @CurrentUser('id') currentUserId: string,
    @CurrentUser('role') currentUserRole: string,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log('🎯 PATCH /users/:id - Request received:', {
      currentUserId,
      currentUserRole,
      targetUserId: id,
      updateData: updateUserDto,
      isSelfUpdate: currentUserId === id,
      isAdmin: currentUserRole === UserRole.ADMIN,
    });

    // Allow users to update their own profile, or admins to update any profile
    if (currentUserId !== id && currentUserRole !== UserRole.ADMIN) {
      console.log('❌ AUTHORIZATION FAILED: User not allowed to update this profile');
      throw new ForbiddenException('You can only update your own profile');
    }

    console.log('✅ AUTHORIZATION PASSED: Proceeding with update');
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/role')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Change user role' })
  @ApiResponse({ status: 200, description: 'User role changed successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  changeRole(@Param('id') id: string, @Body() changeRoleDto: ChangeUserRoleDto) {
    return this.usersService.changeRole(id, changeRoleDto);
  }

  @Patch(':id/toggle-active')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Toggle user active status' })
  @ApiResponse({ status: 200, description: 'User status toggled successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  toggleActive(@Param('id') id: string) {
    return this.usersService.toggleActive(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a user (can be restored)' })
  @ApiResponse({ status: 204, description: 'User soft deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Delete(':id/permanent')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Permanently delete a user (CANNOT be restored)' })
  @ApiResponse({ status: 204, description: 'User permanently deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  hardDelete(@Param('id') id: string) {
    return this.usersService.hardDelete(id);
  }

  @Post(':id/restore')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Restore a soft-deleted user' })
  @ApiResponse({ status: 200, description: 'User restored successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'User is not deleted' })
  restore(@Param('id') id: string) {
    return this.usersService.restore(id);
  }

  // NEW: Multi-role endpoints
  @Post(':id/roles')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Assign multiple roles to a user' })
  @ApiResponse({ status: 200, description: 'Roles assigned successfully' })
  @ApiResponse({ status: 404, description: 'User or role not found' })
  @ApiResponse({ status: 400, description: 'Invalid role assignment' })
  async assignRoles(
    @Param('id') userId: string,
    @Body() assignRolesDto: AssignRolesDto,
    @CurrentUser('id') currentUserId: string,
  ) {
    return this.userRolesService.assignRoles(
      userId,
      assignRolesDto.primaryRoleId,
      assignRolesDto.additionalRoleIds || [],
      assignRolesDto.replaceExisting ?? true,
      currentUserId,
    );
  }

  @Get(':id/roles')
  @Roles(UserRole.ADMIN, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get all roles for a user' })
  @ApiResponse({ status: 200, description: 'User roles retrieved successfully' })
  async getUserRoles(@Param('id') userId: string) {
    return this.userRolesService.getUserRoles(userId);
  }

  @Delete(':id/roles/:roleId')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a specific role from a user' })
  @ApiResponse({ status: 204, description: 'Role removed successfully' })
  @ApiResponse({ status: 400, description: 'Cannot remove primary role' })
  async removeRole(
    @Param('id') userId: string,
    @Param('roleId') roleId: string,
  ) {
    await this.userRolesService.removeRole(userId, roleId);
  }
}
