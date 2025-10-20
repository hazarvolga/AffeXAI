import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Page } from './page.entity';
import { ComponentType } from '@affexai/shared-types';

@Entity('cms_components')
export class Component {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'page_id' })
  pageId!: string;

  @Column({ type: 'uuid', name: 'parent_id', nullable: true })
  parentId!: string | null;

  @Column({ type: 'enum', enum: ComponentType })
  type!: ComponentType;

  @Column({ type: 'jsonb' })
  props!: any;

  @Column({ type: 'integer', name: 'order_index', default: 0 })
  orderIndex!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => Page, (page: Page) => page.components, { onDelete: 'CASCADE' })
  page!: Page;

  @OneToMany(() => Component, (component: Component) => component.parent)
  children!: Component[];

  @ManyToOne(() => Component, (component: Component) => component.children, { onDelete: 'CASCADE' })
  parent!: Component;
}