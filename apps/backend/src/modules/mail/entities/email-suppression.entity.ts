import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';
import { EmailWebhookEventType, BounceReason } from '../interfaces/webhook-event.interface';

/**
 * Email suppression list
 * Bounce, complaint, unsubscribe olan email'leri saklar
 * Bu listede olan emaillere email gönderilmez
 * 
 * Note: Index'ler migration'da oluşturulur (1760427888000-CreateEmailSuppressionTable.ts)
 */
@Entity('email_suppressions')
export class EmailSuppression {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'text' })
  reason: string;

  @Column({ type: 'varchar', length: 50 })
  provider: string;

  @Column({
    type: 'enum',
    enum: EmailWebhookEventType,
  })
  eventType: EmailWebhookEventType;

  @Column({
    type: 'enum',
    enum: BounceReason,
    nullable: true,
  })
  bounceReason?: BounceReason;

  @CreateDateColumn({ type: 'timestamp' })
  suppressedAt: Date;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;
}
