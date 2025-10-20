import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { SubscriberStatus } from '@affexai/shared-types';

@Entity('subscribers')
export class Subscriber extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: SubscriberStatus, default: SubscriberStatus.PENDING })
  status: SubscriberStatus | string;

  @Column({ type: 'json', nullable: true })
  groups: string[]; // Array of group IDs

  @Column({ type: 'json', nullable: true })
  segments: string[]; // Array of segment names

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  customerStatus: string;

  @Column({ nullable: true })
  subscriptionType: string;

  @Column({ nullable: true })
  mailerCheckResult: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'int', default: 0 })
  sent: number;

  @Column({ type: 'int', default: 0 })
  opens: number;

  @Column({ type: 'int', default: 0 })
  clicks: number;

  @Column({ type: 'json', nullable: true })
  customFields: Record<string, any>; // Dynamic custom fields

  // Opt-in/Opt-out fields
  @Column({ default: false })
  isDoubleOptIn: boolean; // Has confirmed subscription via email

  @Column({ nullable: true })
  optInToken: string; // Token for email confirmation

  @Column({ type: 'timestamp', nullable: true })
  optInDate: Date; // When user confirmed subscription

  @Column({ type: 'timestamp', nullable: true })
  optOutDate: Date; // When user unsubscribed

  @Column({ nullable: true })
  optOutReason: string; // Why user unsubscribed

  @Column({ nullable: true })
  optInIp: string; // IP address when opted in

  @Column({ nullable: true })
  optOutIp: string; // IP address when opted out

  @Column({ default: true })
  emailNotifications: boolean; // Wants to receive emails

  @Column({ default: true })
  marketingEmails: boolean; // Wants marketing emails

  @Column({ default: true })
  transactionalEmails: boolean; // Wants transactional emails (always true)

  @Column({ nullable: true })
  unsubscribeToken: string; // Unique token for one-click unsubscribe

  @CreateDateColumn()
  subscribedAt: Date;

  @UpdateDateColumn()
  lastUpdated: Date;
}