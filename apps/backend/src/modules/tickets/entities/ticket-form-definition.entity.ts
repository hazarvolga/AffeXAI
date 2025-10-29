import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TicketFormVersion } from './ticket-form-version.entity';
import { Ticket } from './ticket.entity';

export interface FormField {
  id: string;
  name: string;
  label: string;
  labelEn?: string;
  type:
    | 'text'
    | 'textarea'
    | 'number'
    | 'email'
    | 'url'
    | 'date'
    | 'datetime'
    | 'time'
    | 'select'
    | 'multiselect'
    | 'radio'
    | 'checkbox'
    | 'file'
    | 'file-multiple'
    | 'file-single'
    | 'richtext'
    | 'html'
    | 'edd-order'
    | 'edd-product';
  required: boolean;
  placeholder?: string;
  placeholderEn?: string;
  helpText?: string;
  helpTextEn?: string;
  defaultValue?: any;
  options?: Array<{ label: string; labelEn?: string; value: string | number | boolean }>;
  dataSource?: string; // e.g., 'categories', 'users'
  accept?: string; // For file type
  multiple?: boolean; // For file and select types

  // Ticket Fields specific properties
  loadAfter?: string; // Field ID to load after
  autoFill?: boolean; // Auto-fill in ticket form if default value provided
  ticketListWidth?: number; // Column width in ticket list (px)
  dateDisplayAs?: 'date' | 'relative'; // "2025-01-15" vs "2 days ago"
  dateFormat?: string; // "Y-m-d H:i:s" - custom date format
  hasPersonalInfo?: boolean; // GDPR compliance - contains personal data

  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    maxFiles?: number;
    maxFileSize?: number;
  };
  conditional?: {
    visibleIf?: any; // JsonLogic expression
    requiredIf?: any;
    enabledIf?: any;
  };
  metadata?: {
    order: number;
    width?: 'full' | 'half' | 'third';
    category?: string;
    agentOnly?: boolean;
    rows?: number; // For textarea
  };
}

export interface FormSchema {
  formId: string;
  formName: string;
  version: number;
  fields: FormField[];
  conditionalLogic?: Array<{
    id: string;
    name: string;
    condition: any; // JsonLogic expression
    actions: Array<{
      type: 'show' | 'hide' | 'require' | 'enable' | 'disable' | 'setValue';
      targetFieldIds: string[];
      value?: any;
    }>;
  }>;
}

@Entity('ticket_form_definitions')
export class TicketFormDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  @Index('IDX_ticket_form_definitions_name')
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column({ type: 'jsonb' })
  schema: FormSchema;

  @Column({ type: 'boolean', default: true })
  @Index('IDX_ticket_form_definitions_is_active')
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  @Index('IDX_ticket_form_definitions_is_default')
  isDefault: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'uuid', nullable: true })
  createdBy: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  creator: User;

  @OneToMany(() => TicketFormVersion, version => version.formDefinition)
  versions: TicketFormVersion[];

  @OneToMany(() => Ticket, ticket => ticket.formDefinition)
  tickets: Ticket[];
}
