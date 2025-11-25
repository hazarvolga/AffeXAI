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
  Req,
} from '@nestjs/common';
import { Request } from 'express';
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

  @Get('slug/*')
  async findBySlug(@Req() req: Request) {
    // Extract slug from URL path after '/cms/pages/slug/' or '/api/cms/pages/slug/'
    // e.g., /api/cms/pages/slug/solutions/building-design/architecture → slug = "solutions/building-design/architecture"
    // e.g., /api/cms/pages/slug/home → slug = "home" (homepage)
    const fullPath = req.path;
    const slug = fullPath.replace(/^\/?(api\/)?cms\/pages\/slug\//, ''); // Remove prefix (with optional /api/)

    console.log('Finding page by slug:', slug, 'from path:', fullPath);
    return this.pageService.findBySlug(slug);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pageService.findOne(id);
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