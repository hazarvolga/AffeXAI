import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('event_registrations')
export class EventRegistration extends BaseEntity {
  @ManyToOne('User', 'id')
  user: any;

  @ManyToOne('Event', 'id')
  event: any;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amountPaid: number;

  @Column({ type: 'jsonb', nullable: true })
  paymentDetails: Record<string, any>;

  @Column({ type: 'timestamp', nullable: true })
  checkedInAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  additionalInfo: Record<string, any>;
}