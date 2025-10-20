import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { AnalyticsSession } from './analytics-session.entity';

export enum InteractionType {
  CLICK = 'click',
  HOVER = 'hover',
  SCROLL = 'scroll',
  FOCUS = 'focus',
  INPUT = 'input',
  SUBMIT = 'submit',
  VIEW = 'view',
  EXIT = 'exit',
}

export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
}

@Entity('analytics_events')
@Index(['componentId', 'componentType'])
@Index(['sessionId'])
@Index(['interactionType', 'createdAt'])
@Index(['pageUrl', 'createdAt'])
export class AnalyticsEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  componentId: string;

  @Column()
  componentType: string;

  @Column({
    type: 'enum',
    enum: ['click', 'hover', 'scroll', 'focus', 'input', 'submit', 'view', 'exit'],
    enumName: 'interaction_type_enum',
  })
  interactionType: InteractionType;

  @Column('uuid')
  sessionId: string;

  @Column('uuid', { nullable: true })
  userId: string | null;

  @Column({ length: 500 })
  pageUrl: string;

  @Column({
    type: 'enum',
    enum: ['mobile', 'tablet', 'desktop'],
    enumName: 'device_type_enum',
  })
  deviceType: DeviceType;

  @Column({ nullable: true })
  browser: string | null;

  @Column({ type: 'int', nullable: true })
  viewportWidth: number | null;

  @Column({ type: 'int', nullable: true })
  viewportHeight: number | null;

  @Column({ type: 'int', nullable: true })
  coordinateX: number | null;

  @Column({ type: 'int', nullable: true })
  coordinateY: number | null;

  @Column({ type: 'int', nullable: true })
  relativeX: number | null;

  @Column({ type: 'int', nullable: true })
  relativeY: number | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any> | null;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ManyToOne(() => AnalyticsSession, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sessionId' })
  session?: AnalyticsSession;
}
