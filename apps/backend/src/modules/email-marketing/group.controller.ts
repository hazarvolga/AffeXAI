import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Controller('email-marketing/groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Get('import/options')
  async getImportOptions() {
    const groups = await this.groupService.findAllForImport();
    return {
      success: true,
      data: groups
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto): Promise<Group> {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.groupService.remove(id);
  }
}