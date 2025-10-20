import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Page } from '../entities/page.entity';
import { PageStatus } from '@affexai/shared-types';
import { Component } from '../entities/component.entity';
import { CreatePageDto } from '../dto/create-page.dto';
import { UpdatePageDto } from '../dto/update-page.dto';
import { EventBusService } from '../../platform-integration/services/event-bus.service';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
    private eventBusService: EventBusService,
  ) {}

  async create(createPageDto: CreatePageDto): Promise<Page> {
    const page = this.pageRepository.create(createPageDto);
    return this.pageRepository.save(page);
  }

  async findAll(status?: PageStatus): Promise<Page[]> {
    const queryBuilder = this.pageRepository.createQueryBuilder('page');
    
    if (status) {
      queryBuilder.where('page.status = :status', { status });
    }
    
    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Page | null> {
    const page = await this.pageRepository.findOne({
      where: { id },
      relations: ['components'],
    });
    
    // Explicitly ensure components are loaded
    if (page && (!page.components || page.components.length === 0)) {
      page.components = await this.pageRepository.manager
        .createQueryBuilder(Component, 'component')
        .where('component.pageId = :pageId', { pageId: id })
        .getMany() as Component[];
    }
    
    return page;
  }

  async findBySlug(slug: string): Promise<Page | null> {
    const page = await this.pageRepository.findOne({
      where: { slug },
      relations: ['components'],
    });
    
    // Explicitly ensure components are loaded
    if (page && (!page.components || page.components.length === 0)) {
      page.components = await this.pageRepository.manager
        .createQueryBuilder(Component, 'component')
        .where('component.pageId = :pageId', { pageId: page.id })
        .getMany() as Component[];
    }
    
    return page;
  }

  async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
    await this.pageRepository.update(id, updatePageDto);
    const page = await this.findOne(id);
    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }
    return page;
  }

  async remove(id: string): Promise<void> {
    await this.pageRepository.delete(id);
  }

  async publish(id: string): Promise<Page> {
    const page = await this.findOne(id);
    if (!page) {
      throw new Error('Page not found');
    }
    
    page.status = PageStatus.PUBLISHED;
    page.publishedAt = new Date();
    
    const publishedPage = await this.pageRepository.save(page);
    
    // Publish platform event
    await this.eventBusService.publishPagePublished(
      publishedPage.id,
      publishedPage.slug,
      'system', // TODO: Get actual user ID from context
    );
    
    return publishedPage;
  }

  async unpublish(id: string): Promise<Page> {
    const page = await this.findOne(id);
    if (!page) {
      throw new Error('Page not found');
    }
    
    page.status = PageStatus.DRAFT;
    page.publishedAt = null;
    
    return this.pageRepository.save(page);
  }
}