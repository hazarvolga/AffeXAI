import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PageService } from '../services/page.service';
import { CreatePageDto } from '../dto/create-page.dto';
import { UpdatePageDto } from '../dto/update-page.dto';
import { PageStatus } from '@affexai/shared-types';

@Controller('cms/pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  async create(@Body() createPageDto: CreatePageDto) {
    return this.pageService.create(createPageDto);
  }

  @Get()
  async findAll(@Query('status') status?: PageStatus) {
    return this.pageService.findAll(status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pageService.findOne(id);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.pageService.findBySlug(slug);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pageService.update(id, updatePageDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.pageService.remove(id);
  }

  @Post(':id/publish')
  async publish(@Param('id') id: string) {
    return this.pageService.publish(id);
  }

  @Post(':id/unpublish')
  async unpublish(@Param('id') id: string) {
    return this.pageService.unpublish(id);
  }

  @Post(':id/clone')
  async clone(@Param('id') id: string) {
    return this.pageService.clone(id);
  }
}