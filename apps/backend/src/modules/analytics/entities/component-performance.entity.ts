import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('component_performance')
@Index(['componentId', 'pageUrl'])
@Index(['periodStart', 'periodEnd'])
export class ComponentPerformance {
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

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  renderTimeAvg: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  renderTimeMin: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  renderTimeMax: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  renderTimeP50: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  renderTimeP95: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  renderTimeP99: number | null;

  @Column({ type: 'decimal', precision: 5, scale: 4, default: 0 })
  errorRate: number;

  @Column({ type: 'int', default: 0 })
  totalRenders: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
