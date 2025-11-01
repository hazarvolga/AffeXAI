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
import { FormDefinition, FormSchema } from './form-definition.entity';

@Entity('form_versions')
@Index('IDX_form_versions_form_version_unique', ['formDefinitionId', 'version'], { unique: true })
export class FormVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  @Index('IDX_form_versions_form_definition_id')
  formDefinitionId: string;

  @ManyToOne(() => FormDefinition, formDefinition => formDefinition.versions)
  @JoinColumn({ name: 'formDefinitionId' })
  formDefinition: FormDefinition;

  @Column({ type: 'int' })
  version: number;

  @Column({ type: 'jsonb' })
  schema: FormSchema;

  @Column({ type: 'text', nullable: true })
  changeLog: string;

  @CreateDateColumn()
  @Index('IDX_form_versions_created_at')
  createdAt: Date;

  @Column({ type: 'uuid', nullable: true })
  createdBy: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  creator: User;
}
