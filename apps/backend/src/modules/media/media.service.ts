import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { EventBusService } from '../platform-integration/services/event-bus.service';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private eventBusService: EventBusService,
  ) {}

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    try {
      const media = this.mediaRepository.create(createMediaDto);
      const savedMedia = await this.mediaRepository.save(media);
      
      // Publish platform event
      await this.eventBusService.publishMediaUploaded(
        savedMedia.id,
        savedMedia.filename,
        savedMedia.size,
        'system', // TODO: Get from auth context
      );
      
      return savedMedia;
    } catch (error) {
      this.logger.error('Error creating media', error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Media[]> {
    try {
      return await this.mediaRepository.find({
        where: { isActive: true },
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error('Error fetching media', error.stack);
      throw error;
    }
  }

  async findOne(id: string): Promise<Media> {
    try {
      const media = await this.mediaRepository.findOne({ where: { id } });
      if (!media) {
        throw new NotFoundException(`Media with ID ${id} not found`);
      }
      return media;
    } catch (error) {
      this.logger.error(`Error fetching media with ID ${id}`, error.stack);
      throw error;
    }
  }

  async update(id: string, updateMediaDto: UpdateMediaDto): Promise<Media> {
    try {
      const media = await this.findOne(id);
      Object.assign(media, updateMediaDto);
      return await this.mediaRepository.save(media);
    } catch (error) {
      this.logger.error(`Error updating media with ID ${id}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const media = await this.findOne(id);
      // Instead of deleting, we mark as inactive
      await this.update(id, { isActive: false });
    } catch (error) {
      this.logger.error(`Error removing media with ID ${id}`, error.stack);
      throw error;
    }
  }

  async findByType(type: string): Promise<Media[]> {
    try {
      return await this.mediaRepository.find({
        where: { type: type as any, isActive: true },
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error(`Error fetching media by type ${type}`, error.stack);
      throw error;
    }
  }
}