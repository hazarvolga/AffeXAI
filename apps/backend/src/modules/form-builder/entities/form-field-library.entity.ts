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
import { User } from '../../users/entities/user.entity';
import { FormField } from './form-definition.entity';

/**
 * FormFieldLibrary Entity
 *
 * Stores reusable field templates that can be added to forms across any module.
 * This acts as a library of pre-configured fields that admins can manage
 * and quickly add to any form without recreating them each time.
 *
 * Examples:
 * - "Product Selection" dropdown (for tickets, events, etc.)
 * - "File Upload" field (for support, applications)
 * - "Version Selector" (for tickets, downloads)
 */
@Entity('form_field_library')
export class FormFieldLibrary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  @Index('IDX_form_field_library_name')
  name: string; // Field name for internal use (e.g., "product_selector")

  @Column({ type: 'jsonb' })
  fieldConfig: FormField; // Complete field configuration

  @Column({ type: 'text', nullable: true })
  description: string; // Description of what this field is for

  @Column({ type: 'boolean', default: true })
  @Index('IDX_form_field_library_is_active')
  isActive: boolean; // Can be used in forms

  @Column({ type: 'boolean', default: false })
  isSystemField: boolean; // System-defined fields cannot be deleted

  @Column({ type: 'varchar', array: true, default: '{}' })
  tags: string[]; // Tags for categorization/filtering (e.g., ['support', 'events'])

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  createdBy: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  creator: User;

  @Column({ type: 'uuid', nullable: true })
  updatedBy: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedBy' })
  updater: User;
}
