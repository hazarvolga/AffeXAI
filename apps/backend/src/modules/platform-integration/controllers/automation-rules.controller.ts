import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutomationRule } from '../entities/automation-rule.entity';

/**
 * Automation Rules Controller
 * 
 * CRUD operations for automation rules.
 */
@Controller('automation/rules')
export class AutomationRulesController {
  constructor(
    @InjectRepository(AutomationRule)
    private readonly ruleRepository: Repository<AutomationRule>,
  ) {}

  /**
   * Get all automation rules
   */
  @Get()
  async findAll() {
    return this.ruleRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get active automation rules
   */
  @Get('active')
  async findActive() {
    return this.ruleRepository.find({
      where: { isActive: true },
      order: { priority: 'DESC' },
    });
  }

  /**
   * Get automation rule by ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ruleRepository.findOne({ where: { id } });
  }

  /**
   * Create new automation rule
   */
  @Post()
  async create(@Body() data: Partial<AutomationRule>) {
    const rule = this.ruleRepository.create(data);
    return this.ruleRepository.save(rule);
  }

  /**
   * Update automation rule
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<AutomationRule>,
  ) {
    await this.ruleRepository.update(id, data);
    return this.ruleRepository.findOne({ where: { id } });
  }

  /**
   * Delete automation rule (soft delete)
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.ruleRepository.softDelete(id);
    return { success: true };
  }

  /**
   * Toggle rule active status
   */
  @Put(':id/toggle')
  async toggle(@Param('id') id: string) {
    const rule = await this.ruleRepository.findOne({ where: { id } });
    if (!rule) {
      throw new Error(`Rule not found: ${id}`);
    }

    rule.isActive = !rule.isActive;
    return this.ruleRepository.save(rule);
  }
}
