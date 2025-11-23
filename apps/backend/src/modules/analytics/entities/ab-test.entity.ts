import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { ABTestVariant } from './ab-test-variant.entity';

export enum ABTestStatus {
  DRAFT = 'draft',
  RUNNING = 'running',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export interface TargetAudience {
  countries?: string[];
  devices?: ('mobile' | 'tablet' | 'desktop')[];
  userSegments?: string[];
}

@Entity('ab_tests')
@Index(['componentId'])
@Index(['status'])
export class ABTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column()
  componentId: string;

  @Column()
  componentType: string;

  @Column({
    type: 'enum',
    enum: ['draft', 'running', 'paused', 'completed'],
    enumName: 'ab_test_status_enum',
    default: 'draft',
  })
  status: ABTestStatus;

  @Column({ type: 'timestamp' })
  periodStart: Date;

  @Column({ type: 'timestamp', nullable: true })
  periodEnd: Date | null;

  @Column()
  conversionGoal: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    comment: 'Countries, devices, user segments',
  })
  targetAudience: TargetAudience | null;

  @Column('uuid', { nullable: true })
  winnerVariantId: string | null;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
    comment: 'Statistical confidence (0-100)',
  })
  confidenceLevel: number | null;

  @Column({ type: 'int', nullable: true })
  sampleSize: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => ABTestVariant, (variant) => variant.test, {
    cascade: true,
  })
  variants?: ABTestVariant[];
}
