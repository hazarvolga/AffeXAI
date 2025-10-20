import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { EmailLog } from './email-log.entity';
import { EmailCampaignVariant } from './email-campaign-variant.entity';
import { CampaignStatus } from '@affexai/shared-types';

@Entity('email_campaigns')
export class EmailCampaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  subject: string;

  @Column('text')
  content: string;

  @Column({ default: 'draft' })
  status: CampaignStatus | string;

  @Column({ type: 'timestamp', nullable: true })
  scheduledAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  sentAt: Date;

  @Column({ type: 'int', default: 0 })
  totalRecipients: number;

  @Column({ type: 'int', default: 0 })
  sentCount: number;

  @Column({ type: 'int', default: 0 })
  openedCount: number;

  @Column({ type: 'int', default: 0 })
  clickedCount: number;

  @Column({ type: 'int', default: 0 })
  bounceCount: number;

  // A/B Testing fields
  @Column({ default: false })
  isAbTest: boolean;

  @Column({ nullable: true, length: 50, comment: 'subject, content, send_time, from_name, combined' })
  testType: string;

  @Column({ nullable: true, length: 50, comment: 'open_rate, click_rate, conversion_rate, revenue' })
  winnerCriteria: string;

  @Column({ default: true })
  autoSelectWinner: boolean;

  @Column({ type: 'timestamp', nullable: true })
  winnerSelectionDate: Date;

  @Column({ nullable: true })
  selectedWinnerId: string;

  @ManyToOne(() => EmailCampaignVariant, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'selectedWinnerId' })
  selectedWinner: EmailCampaignVariant;

  @Column({ type: 'int', nullable: true, comment: 'Duration in hours' })
  testDuration: number;

  @Column('decimal', { precision: 5, scale: 2, default: 95.0, comment: '95%, 99%, etc.' })
  confidenceLevel: number;

  @Column({ type: 'int', default: 100, comment: 'Minimum sends per variant' })
  minSampleSize: number;

  @Column({ nullable: true, length: 20, default: 'draft', comment: 'draft, testing, completed, winner_sent' })
  testStatus: string;

  @OneToMany(() => EmailCampaignVariant, (variant) => variant.campaign)
  variants: EmailCampaignVariant[];

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EmailLog, log => log.campaign)
  logs: EmailLog[];

  /**
   * Check if campaign is an A/B test
   */
  isAbTestCampaign(): boolean {
    return this.isAbTest === true;
  }

  /**
   * Check if A/B test has a winner
   */
  hasWinner(): boolean {
    return this.selectedWinnerId !== null && this.selectedWinnerId !== undefined;
  }

  /**
   * Check if A/B test is completed
   */
  isTestCompleted(): boolean {
    return this.testStatus === 'completed';
  }

  /**
   * Get the winning variant
   */
  getWinner(): EmailCampaignVariant | null {
    if (!this.hasWinner() || !this.variants) {
      return null;
    }
    return this.variants.find(v => v.id === this.selectedWinnerId) || null;
  }
}