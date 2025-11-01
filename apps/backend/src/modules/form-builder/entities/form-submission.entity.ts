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
import { FormDefinition } from './form-definition.entity';

/**
 * FormSubmission Entity
 *
 * Centralized storage for all form submissions across modules.
 * Stores submitted data as JSONB for flexibility while maintaining
 * relationships for querying and analytics.
 *
 * Examples:
 * - Ticket form submission (source_module: 'tickets', source_record_id: ticket.id)
 * - Event registration (source_module: 'events', source_record_id: event.id)
 * - Contact form (source_module: 'cms', source_record_id: null)
 */
@Entity('form_submissions')
export class FormSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  @Index('IDX_form_submissions_form_id')
  formId: string;

  @ManyToOne(() => FormDefinition, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'formId' })
  form: FormDefinition;

  @Column({ type: 'jsonb' })
  submittedData: any; // The actual form data (flexible JSONB)

  // Source tracking - which module/record is this submission for?
  @Column({ type: 'varchar', length: 50 })
  @Index('IDX_form_submissions_source_module')
  sourceModule: string; // 'tickets', 'events', 'cms', 'certificates', etc.

  @Column({ type: 'uuid', nullable: true })
  @Index('IDX_form_submissions_source_record')
  sourceRecordId: string; // FK to source record (ticket.id, event.id, etc.)

  // User tracking
  @Column({ type: 'uuid', nullable: true })
  @Index('IDX_form_submissions_submitted_by')
  submittedBy: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'submittedBy' })
  submitter: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Index('IDX_form_submissions_submitted_at')
  submittedAt: Date;

  // Processing status
  @Column({ type: 'varchar', length: 50, default: 'pending' })
  @Index('IDX_form_submissions_status')
  status: string; // 'pending', 'processed', 'failed', 'archived'

  @Column({ type: 'timestamp', nullable: true })
  processedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  processedBy: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'processedBy' })
  processor: User;

  // Metadata
  @Column({ type: 'jsonb', default: '{}' })
  metadata: any; // Additional context (referrer, utm params, etc.)

  @Column({ type: 'varchar', length: 45, nullable: true })
  ipAddress: string; // IPv4 or IPv6

  @Column({ type: 'text', nullable: true })
  userAgent: string;

  @Column({ type: 'text', nullable: true })
  processingNotes: string; // Notes added when processing the submission

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// Composite index for common queries
@Index('IDX_form_submissions_module_status', ['sourceModule', 'status'])
export class FormSubmissionCompositeIndex {}
