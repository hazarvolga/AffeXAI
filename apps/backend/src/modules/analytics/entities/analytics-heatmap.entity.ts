import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
  type: string;
}

@Entity('analytics_heatmaps')
@Index(['componentId', 'pageUrl'])
@Index(['periodStart', 'periodEnd'])
export class AnalyticsHeatmap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  componentId: string;

  @Column()
  componentType: string;

  @Column({ length: 500 })
  pageUrl: string;

  @Column({ type: 'timestamp' })
  periodStart: Date;

  @Column({ type: 'timestamp' })
  periodEnd: Date;

  @Column({
    type: 'jsonb',
    comment: 'Array of {x, y, intensity, type}',
  })
  points: HeatmapPoint[];

  @Column({ type: 'int' })
  dimensionWidth: number;

  @Column({ type: 'int' })
  dimensionHeight: number;

  @Column({ type: 'int', default: 0 })
  totalInteractions: number;

  @Column({ type: 'int', default: 0 })
  uniqueUsers: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
