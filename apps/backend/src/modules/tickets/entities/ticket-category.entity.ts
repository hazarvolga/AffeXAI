import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

/**
 * TicketCategory Entity
 * Represents a hierarchical category for organizing tickets
 */
@Entity('ticket_categories')
export class TicketCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'uuid', nullable: true })
  parentId: string;

  @ManyToOne(() => TicketCategory, (category) => category.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent: TicketCategory;

  @OneToMany(() => TicketCategory, (category) => category.parent)
  children: TicketCategory[];

  @Column({ type: 'integer', default: 0 })
  ticketCount: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
