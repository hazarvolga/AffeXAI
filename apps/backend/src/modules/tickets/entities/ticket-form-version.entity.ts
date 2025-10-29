import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TicketFormDefinition, FormSchema } from './ticket-form-definition.entity';

@Entity('ticket_form_versions')
@Index('IDX_ticket_form_versions_form_version_unique', ['formDefinitionId', 'version'], { unique: true })
export class TicketFormVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  @Index('IDX_ticket_form_versions_form_definition_id')
  formDefinitionId: string;

  @ManyToOne(() => TicketFormDefinition, formDefinition => formDefinition.versions)
  @JoinColumn({ name: 'formDefinitionId' })
  formDefinition: TicketFormDefinition;

  @Column({ type: 'int' })
  version: number;

  @Column({ type: 'jsonb' })
  schema: FormSchema;

  @Column({ type: 'text', nullable: true })
  changeLog: string;

  @CreateDateColumn()
  @Index('IDX_ticket_form_versions_created_at')
  createdAt: Date;

  @Column({ type: 'uuid', nullable: true })
  createdBy: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  creator: User;
}
