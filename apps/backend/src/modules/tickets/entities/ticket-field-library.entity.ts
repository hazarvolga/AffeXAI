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
import { FormField } from './ticket-form-definition.entity';

/**
 * TicketFieldLibrary Entity
 *
 * Stores reusable field templates that can be added to ticket forms.
 * This acts as a library of pre-configured fields that admins can manage
 * and quickly add to any form without recreating them each time.
 *
 * Examples:
 * - "Ürün Seçiniz" (Product Selection dropdown)
 * - "Hotinfo Dosyasını Yükle" (Hotinfo file upload)
 * - "Allplan Versiyon" (Version selector)
 */
@Entity('ticket_field_library')
export class TicketFieldLibrary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  @Index('IDX_ticket_field_library_name')
  name: string; // Field name for internal use (e.g., "product_selector")

  @Column({ type: 'jsonb' })
  fieldConfig: FormField; // Complete field configuration

  @Column({ type: 'text', nullable: true })
  description: string; // Description of what this field is for

  @Column({ type: 'boolean', default: true })
  @Index('IDX_ticket_field_library_is_active')
  isActive: boolean; // Can be used in forms

  @Column({ type: 'boolean', default: false })
  isSystemField: boolean; // System-defined fields cannot be deleted

  @Column({ type: 'varchar', array: true, default: '{}' })
  tags: string[]; // Tags for categorization/filtering

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
