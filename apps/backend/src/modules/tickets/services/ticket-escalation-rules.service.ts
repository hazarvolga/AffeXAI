import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEscalationRule } from '../entities/ticket-escalation-rule.entity';
import { Ticket } from '../entities/ticket.entity';

/**
 * Ticket Escalation Rules Service
 * 
 * Manages ticket escalation rules and executes automatic escalations
 */
@Injectable()
export class TicketEscalationRulesService {
  private readonly logger = new Logger(TicketEscalationRulesService.name);

  constructor(
    @InjectRepository(TicketEscalationRule)
    private readonly ruleRepository: Repository<TicketEscalationRule>,
  ) {}

  /**
   * Get all active escalation rules ordered by priority
   */
  async getActiveRules(): Promise<TicketEscalationRule[]> {
    return this.ruleRepository.find({
      where: { isActive: true },
      order: { priority: 'DESC' },
    });
  }

  /**
   * Get escalation rule by ID
   */
  async findOne(id: string): Promise<TicketEscalationRule> {
    const rule = await this.ruleRepository.findOne({ where: { id } });
    if (!rule) {
      throw new Error(`Ticket escalation rule not found: ${id}`);
    }
    return rule;
  }

  /**
   * Create new escalation rule
   */
  async create(data: Partial<TicketEscalationRule>): Promise<TicketEscalationRule> {
    const rule = this.ruleRepository.create(data);
    return this.ruleRepository.save(rule);
  }

  /**
   * Update escalation rule
   */
  async update(id: string, data: Partial<TicketEscalationRule>): Promise<TicketEscalationRule> {
    await this.ruleRepository.update(id, data);
    const rule = await this.ruleRepository.findOne({ where: { id } });
    if (!rule) {
      throw new Error(`Ticket escalation rule not found: ${id}`);
    }
    return rule;
  }

  /**
   * Delete escalation rule
   */
  async delete(id: string): Promise<void> {
    await this.ruleRepository.delete(id);
  }

  /**
   * Toggle rule active status
   */
  async toggle(id: string): Promise<TicketEscalationRule> {
    const rule = await this.ruleRepository.findOne({ where: { id } });
    if (!rule) {
      throw new Error(`Rule not found: ${id}`);
    }

    rule.isActive = !rule.isActive;
    return this.ruleRepository.save(rule);
  }

  /**
   * Get all escalation rules
   */
  async findAll(): Promise<TicketEscalationRule[]> {
    return this.ruleRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Check if rule has already been applied to ticket max times
   */
  hasReachedMaxApplications(rule: TicketEscalationRule, ticket: Ticket): boolean {
    if (!ticket.escalationHistory) {
      return false;
    }

    // Count applications by matching rule ID in escalation history
    // Note: We store the rule ID in the escalation history, not the level number
    const applications = ticket.escalationHistory.filter(
      entry => entry['ruleId'] === rule.id
    ).length;

    return applications >= rule.maxApplications;
  }
}