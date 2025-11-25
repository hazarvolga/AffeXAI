import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { MediaType, StorageType, MediaModule, MediaCategory } from '@affexai/shared-types';

@Entity('media')
export class Media extends BaseEntity {
  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column({ type: 'bigint' })
  size: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  thumbnailUrl: string;

  @Column({
    type: 'enum',
    enum: MediaType,
    default: MediaType.IMAGE,
  })
  type: MediaType;

  @Column({
    type: 'enum',
    enum: StorageType,
    default: StorageType.LOCAL,
  })
  storageType: StorageType;

  @Column({
    type: 'enum',
    enum: MediaModule,
    default: MediaModule.GENERAL,
  })
  module: MediaModule;

  @Column({
    type: 'enum',
    enum: MediaCategory,
    default: MediaCategory.OTHER,
  })
  category: MediaCategory;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ nullable: true })
  altText: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  declare createdAt: Date;

  @UpdateDateColumn()
  declare updatedAt: Date;
}