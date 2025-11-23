import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ABTest } from './ab-test.entity';

@Entity('ab_test_variants')
@Index(['testId'])
export class ABTestVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  testId: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    type: 'jsonb',
    comment: 'Component configuration for this variant',
  })
  componentConfig: Record<string, any>;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    comment: 'Percentage of traffic (0-100)',
  })
  trafficAllocation: number;

  @Column({ type: 'int', default: 0 })
  impressions: number;

  @Column({ type: 'int', default: 0 })
  interactions: number;

  @Column({ type: 'int', default: 0 })
  conversions: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 4,
    default: 0,
    comment: 'Conversion rate (0-1)',
  })
  conversionRate: number;

  @Column({
    type: 'int',
    default: 0,
    comment: 'Average engagement time in milliseconds',
  })
  averageEngagementTime: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => ABTest, (test) => test.variants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testId' })
  test?: ABTest;
}
