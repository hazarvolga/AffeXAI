import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';

export enum CustomFieldType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
  SELECT = 'SELECT',
  MULTI_SELECT = 'MULTI_SELECT'
}

@Entity('custom_fields')
export class CustomField extends BaseEntity {
  @Column()
  name: string;

  @Column()
  label: string;

  @Column({ type: 'enum', enum: CustomFieldType })
  type: CustomFieldType;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  required: boolean;

  @Column({ type: 'json', nullable: true })
  options: string[]; // For SELECT and MULTI_SELECT types

  @Column({ nullable: true })
  defaultValue: string;

  @Column({ nullable: true })
  placeholder: string;

  @Column({ type: 'json', nullable: true })
  validation: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  declare createdAt: Date;

  @UpdateDateColumn()
  declare updatedAt: Date;
}