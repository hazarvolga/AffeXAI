import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Component } from '../entities/component.entity';
import { CreateComponentDto } from '../dto/create-component.dto';
import { UpdateComponentDto } from '../dto/update-component.dto';

@Injectable()
export class ComponentService {
  constructor(
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,
  ) {}

  async create(createComponentDto: CreateComponentDto): Promise<Component> {
    const component = this.componentRepository.create(createComponentDto);
    return this.componentRepository.save(component);
  }

  async findAll(pageId?: string): Promise<Component[]> {
    const queryBuilder = this.componentRepository.createQueryBuilder('component');
    
    if (pageId) {
      queryBuilder.where('component.pageId = :pageId', { pageId });
    }
    
    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Component | null> {
    return this.componentRepository.findOne({
      where: { id },
      relations: ['children', 'parent'],
    });
  }

  async update(id: string, updateComponentDto: UpdateComponentDto): Promise<Component> {
    await this.componentRepository.update(id, updateComponentDto);
    const component = await this.findOne(id);
    if (!component) {
      throw new NotFoundException(`Component with ID ${id} not found`);
    }
    return component;
  }

  async remove(id: string): Promise<void> {
    await this.componentRepository.delete(id);
  }

  async removeByPageId(pageId: string): Promise<void> {
    await this.componentRepository.delete({ pageId });
  }

  async reorderComponents(componentIds: string[], orderIndexes: number[]): Promise<Component[]> {
    const components: Component[] = [];
    
    for (let i = 0; i < componentIds.length; i++) {
      const component = await this.update(componentIds[i], { orderIndex: orderIndexes[i] });
      if (component) {
        components.push(component);
      }
    }
    
    return components;
  }
}