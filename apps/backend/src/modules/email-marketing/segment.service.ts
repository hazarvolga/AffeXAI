import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Segment } from './entities/segment.entity';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';

@Injectable()
export class SegmentService {
  constructor(
    @InjectRepository(Segment)
    private segmentsRepository: Repository<Segment>,
  ) {}

  async create(createSegmentDto: CreateSegmentDto): Promise<Segment> {
    const segment = this.segmentsRepository.create(createSegmentDto);
    return this.segmentsRepository.save(segment);
  }

  async findAll(): Promise<Segment[]> {
    return this.segmentsRepository.find({
      order: { name: 'ASC' }
    });
  }

  async findAllForImport(): Promise<Array<{ 
    id: string; 
    name: string; 
    description: string; 
    subscriberCount: number;
    openRate: number;
    clickRate: number;
  }>> {
    const segments = await this.segmentsRepository.find({
      select: ['id', 'name', 'description', 'subscriberCount', 'openRate', 'clickRate'],
      order: { name: 'ASC' }
    });
    
    return segments.map(segment => ({
      id: segment.id,
      name: segment.name,
      description: segment.description || '',
      subscriberCount: segment.subscriberCount,
      openRate: Number(segment.openRate),
      clickRate: Number(segment.clickRate)
    }));
  }

  async findOne(id: string): Promise<Segment> {
    const segment = await this.segmentsRepository.findOne({ where: { id } });
    if (!segment) {
      throw new NotFoundException(`Segment with ID ${id} not found`);
    }
    return segment;
  }

  async update(id: string, updateSegmentDto: UpdateSegmentDto): Promise<Segment> {
    const segment = await this.findOne(id);
    Object.assign(segment, updateSegmentDto);
    return this.segmentsRepository.save(segment);
  }

  async remove(id: string): Promise<void> {
    const segment = await this.findOne(id);
    await this.segmentsRepository.remove(segment);
  }
}