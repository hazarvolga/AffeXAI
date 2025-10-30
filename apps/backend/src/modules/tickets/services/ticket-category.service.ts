import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketCategory } from '../entities/ticket-category.entity';
import { CreateTicketCategoryDto } from '../dto/create-ticket-category.dto';
import { UpdateTicketCategoryDto } from '../dto/update-ticket-category.dto';
import { ReorderCategoriesDto } from '../dto/reorder-categories.dto';

@Injectable()
export class TicketCategoryService {
  constructor(
    @InjectRepository(TicketCategory)
    private readonly categoryRepository: Repository<TicketCategory>,
  ) {}

  /**
   * Get all categories with hierarchy
   */
  async findAll(): Promise<TicketCategory[]> {
    return this.categoryRepository.find({
      relations: ['parent', 'children'],
      order: {
        order: 'ASC',
        name: 'ASC',
      },
    });
  }

  /**
   * Get hierarchical tree structure
   */
  async getTree(): Promise<TicketCategory[]> {
    // Get all categories
    const allCategories = await this.findAll();

    // Build tree structure (only root categories)
    const rootCategories = allCategories.filter(cat => !cat.parentId);

    // Recursively build children
    const buildTree = (category: TicketCategory): TicketCategory => {
      const children = allCategories.filter(cat => cat.parentId === category.id);
      return {
        ...category,
        children: children.map(buildTree).sort((a, b) => a.order - b.order),
      };
    };

    return rootCategories.map(buildTree).sort((a, b) => a.order - b.order);
  }

  /**
   * Get single category by ID
   */
  async findOne(id: string): Promise<TicketCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  /**
   * Create new category
   */
  async create(createDto: CreateTicketCategoryDto): Promise<TicketCategory> {
    // If parentId provided, verify parent exists
    if (createDto.parentId) {
      const parent = await this.categoryRepository.findOne({
        where: { id: createDto.parentId },
      });

      if (!parent) {
        throw new NotFoundException(`Parent category with ID ${createDto.parentId} not found`);
      }
    }

    // If order not provided, get max order + 1
    if (createDto.order === undefined) {
      const maxOrder = await this.categoryRepository
        .createQueryBuilder('category')
        .select('MAX(category.order)', 'max')
        .where(createDto.parentId ? 'category.parentId = :parentId' : 'category.parentId IS NULL', {
          parentId: createDto.parentId,
        })
        .getRawOne();

      createDto.order = (maxOrder?.max ?? -1) + 1;
    }

    const category = this.categoryRepository.create(createDto);
    return this.categoryRepository.save(category);
  }

  /**
   * Update existing category
   */
  async update(id: string, updateDto: UpdateTicketCategoryDto): Promise<TicketCategory> {
    const category = await this.findOne(id);

    // If changing parent, verify new parent exists and prevent circular reference
    if (updateDto.parentId !== undefined && updateDto.parentId !== category.parentId) {
      if (updateDto.parentId) {
        // Check parent exists
        const parent = await this.categoryRepository.findOne({
          where: { id: updateDto.parentId },
        });

        if (!parent) {
          throw new NotFoundException(`Parent category with ID ${updateDto.parentId} not found`);
        }

        // Prevent circular reference
        if (updateDto.parentId === id) {
          throw new BadRequestException('Category cannot be its own parent');
        }

        // Check if new parent is a descendant of current category
        const isDescendant = await this.isDescendant(id, updateDto.parentId);
        if (isDescendant) {
          throw new BadRequestException('Cannot set a descendant category as parent');
        }
      }
    }

    Object.assign(category, updateDto);
    return this.categoryRepository.save(category);
  }

  /**
   * Delete category
   */
  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);

    // Check if category has children
    if (category.children && category.children.length > 0) {
      throw new BadRequestException('Cannot delete category with subcategories. Delete or move subcategories first.');
    }

    // Check if category has tickets
    if (category.ticketCount > 0) {
      throw new BadRequestException(`Cannot delete category with ${category.ticketCount} tickets. Reassign tickets first.`);
    }

    await this.categoryRepository.remove(category);
  }

  /**
   * Reorder multiple categories
   */
  async reorder(reorderDto: ReorderCategoriesDto): Promise<TicketCategory[]> {
    const { categories } = reorderDto;

    // Update all categories in a transaction
    await this.categoryRepository.manager.transaction(async transactionalEntityManager => {
      for (const item of categories) {
        await transactionalEntityManager.update(TicketCategory, item.id, {
          order: item.order,
          ...(item.parentId !== undefined && { parentId: item.parentId }),
        });
      }
    });

    // Return updated categories
    return this.findAll();
  }

  /**
   * Toggle active status
   */
  async toggleActive(id: string, isActive: boolean): Promise<TicketCategory> {
    const category = await this.findOne(id);
    category.isActive = isActive;
    return this.categoryRepository.save(category);
  }

  /**
   * Check if targetId is a descendant of sourceId
   */
  private async isDescendant(sourceId: string, targetId: string): Promise<boolean> {
    const target = await this.categoryRepository.findOne({
      where: { id: targetId },
      relations: ['parent'],
    });

    if (!target) {
      return false;
    }

    if (!target.parentId) {
      return false;
    }

    if (target.parentId === sourceId) {
      return true;
    }

    return this.isDescendant(sourceId, target.parentId);
  }
}
