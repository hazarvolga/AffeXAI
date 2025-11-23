import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { AnalyticsEvent } from './analytics-event.entity';
import { DeviceType } from './analytics-event.entity';

@Entity('analytics_sessions')
@Index(['userId'])
@Index(['startTime'])
@Index(['converted', 'conversionGoal'])
export class AnalyticsSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: true })
  userId: string | null;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date | null;

  @Column({ type: 'int', nullable: true, comment: 'Duration in milliseconds' })
  duration: number | null;

  @Column({ type: 'jsonb', default: '[]' })
  pagesVisited: string[];

  @Column({ type: 'int', default: 0 })
  totalInteractions: number;

  @Column({
    type: 'enum',
    enum: ['mobile', 'tablet', 'desktop'],
    enumName: 'device_type_enum',
  })
  deviceType: DeviceType;

  @Column({ nullable: true })
  browser: string | null;

  @Column({ nullable: true })
  os: string | null;

  @Column({ type: 'boolean', default: false })
  converted: boolean;

  @Column({ nullable: true })
  conversionGoal: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @OneToMany(() => AnalyticsEvent, (event) => event.session)
  events?: AnalyticsEvent[];
}
