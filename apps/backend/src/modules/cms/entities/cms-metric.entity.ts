import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

export enum MetricType {
  VIEW = 'view',
  CLICK = 'click',
  EDIT = 'edit',
  PUBLISH = 'publish',
}

@Entity('cms_metrics')
@Index(['pageId', 'metricType', 'createdAt'])
@Index(['metricType', 'createdAt'])
export class CmsMetric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MetricType })
  @Index()
  metricType: MetricType;

  @Column({ nullable: true })
  @Index()
  pageId: string;

  @Column({ nullable: true })
  pageTitle: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  linkUrl: string;

  @Column({ nullable: true })
  linkText: string;

  @Column({ nullable: true })
  visitorId: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
