import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { TemplateType } from '@affexai/shared-types';

// Re-export TemplateType for backward compatibility
export { TemplateType };

@Entity('email_templates')
export class EmailTemplate extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({ default: false })
  isDefault: boolean;

  @Column({
    type: 'enum',
    enum: TemplateType,
    default: TemplateType.FILE_BASED,
  })
  type: TemplateType | string;

  @Column({ nullable: true })
  fileTemplateName: string;

  @Column({ type: 'jsonb', nullable: true })
  variables: Record<string, any>;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  declare createdAt: Date;

  @UpdateDateColumn()
  declare updatedAt: Date;
}