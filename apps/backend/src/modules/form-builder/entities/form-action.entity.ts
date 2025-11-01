import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { FormDefinition } from './form-definition.entity';

/**
 * FormAction Entity
 *
 * Defines automated actions that execute when form events occur.
 * Supports webhooks, notifications, integrations, and custom automations.
 *
 * Examples:
 * - Webhook: Send form data to external API on submission
 * - Email: Send notification to admin when form submitted
 * - Integration: Create record in CRM when registration form submitted
 * - Automation: Assign ticket to team member based on form field values
 */
@Entity('form_actions')
export class FormAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  @Index('IDX_form_actions_form_id')
  formId: string;

  @ManyToOne(() => FormDefinition, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'formId' })
  form: FormDefinition;

  @Column({ type: 'varchar', length: 100 })
  name: string; // Human-readable name (e.g., "Send to CRM")

  @Column({ type: 'text', nullable: true })
  description: string;

  // Trigger configuration
  @Column({ type: 'varchar', length: 50 })
  triggerEvent: string; // 'on_submit', 'on_approve', 'on_reject', 'on_update'

  @Column({ type: 'jsonb', nullable: true })
  triggerConditions: any; // JsonLogic expression (e.g., only if priority === 'high')

  // Action configuration
  @Column({ type: 'varchar', length: 50 })
  actionType: string; // 'webhook', 'email', 'slack', 'api_call', 'create_record', etc.

  @Column({ type: 'jsonb' })
  actionConfig: any; // Action-specific configuration (URL, headers, payload template, etc.)

  // Status
  @Column({ type: 'boolean', default: true })
  @Index('IDX_form_actions_is_active')
  isActive: boolean;

  @Column({ type: 'int', default: 0 })
  executionOrder: number; // Order of execution when multiple actions exist

  // Statistics
  @Column({ type: 'int', default: 0 })
  totalExecutions: number;

  @Column({ type: 'int', default: 0 })
  successfulExecutions: number;

  @Column({ type: 'int', default: 0 })
  failedExecutions: number;

  @Column({ type: 'timestamp', nullable: true })
  lastExecutedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
