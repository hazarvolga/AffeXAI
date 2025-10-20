import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { SegmentService } from './segment.service';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';
import { Segment } from './entities/segment.entity';

@Controller('email-marketing/segments')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Post()
  create(@Body() createSegmentDto: CreateSegmentDto): Promise<Segment> {
    return this.segmentService.create(createSegmentDto);
  }

  @Get()
  findAll(): Promise<Segment[]> {
    return this.segmentService.findAll();
  }

  @Get('import/options')
  async getImportOptions() {
    const segments = await this.segmentService.findAllForImport();
    return {
      success: true,
      data: segments
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Segment> {
    return this.segmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSegmentDto: UpdateSegmentDto): Promise<Segment> {
    return this.segmentService.update(id, updateSegmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.segmentService.remove(id);
  }
}