import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { DataSubjectRequestType, RequestStatus } from '../services/gdpr-compliance.service';

@Entity('data_subject_requests')
export class DataSubjectRequest extends BaseEntity {
  @Column()
  email: string;

  @Column({ type: 'enum', enum: DataSubjectRequestType })
  requestType: DataSubjectRequestType;

  @Column({ type: 'timestamp' })
  requestDate: Date;

  @Column({ type: 'enum', enum: RequestStatus })
  status: RequestStatus;

  @Column({ type: 'timestamp', nullable: true })
  completionDate: Date;

  @Column()
  verificationMethod: string;

  @Column({ type: 'json', nullable: true })
  requestDetails: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  responseData: any;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  verificationToken: string;

  @Column({ type: 'timestamp', nullable: true })
  verificationExpiry: Date;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @CreateDateColumn()
  declare createdAt: Date;

  @UpdateDateColumn()
  declare updatedAt: Date;
}