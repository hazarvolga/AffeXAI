import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { Ticket } from './ticket.entity';
import { User } from '../../users/entities/user.entity';

/**
 * AI FAQ Entry Entity
 * Stores learned Q&A pairs from ticket interactions for AI training
 */
@Entity('ai_faq_entries')
@Index('idx_ai_faq_question_hash', ['questionHash'])
@Index('idx_ai_faq_category', ['category'])
@Index('idx_ai_faq_confidence', ['confidence'])
export class AiFaqEntry extends BaseEntity {
  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ type: 'varchar', length: 64, name: 'question_hash' })
  questionHash: string; // MD5 hash of normalized question for deduplication

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @Column({ type: 'text', array: true, default: '{}' })
  keywords: string[]; // Extracted keywords for matching

  @Column({ type: 'int', default: 1 })
  confidence: number; // 1-100, increases with validation

  @Column({ type: 'int', default: 0, name: 'usage_count' })
  usageCount: number; // How many times this FAQ was used

  @Column({ type: 'int', default: 0, name: 'helpful_count' })
  helpfulCount: number; // Positive feedback count

  @Column({ type: 'int', default: 0, name: 'not_helpful_count' })
  notHelpfulCount: number; // Negative feedback count

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_verified' })
  isVerified: boolean; // Manually verified by support team

  @Column({ type: 'uuid', nullable: true, name: 'source_ticket_id' })
  sourceTicketId: string;

  @ManyToOne(() => Ticket, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'source_ticket_id' })
  sourceTicket: Ticket;

  @Column({ type: 'uuid', nullable: true, name: 'created_by_user_id' })
  createdByUserId: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by_user_id' })
  createdByUser: User;

  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    originalTicketTitle?: string;
    resolutionTime?: number; // minutes
    customerSatisfaction?: number; // 1-5
    tags?: string[];
    relatedArticleIds?: string[];
  };

  /**
   * Calculate helpfulness ratio
   */
  get helpfulnessRatio(): number {
    const total = this.helpfulCount + this.notHelpfulCount;
    return total > 0 ? Math.round((this.helpfulCount / total) * 100) : 0;
  }

  /**
   * Update confidence based on feedback
   */
  updateConfidence(): void {
    const baseConfidence = this.isVerified ? 80 : 50;
    const feedbackBonus = Math.min(this.helpfulnessRatio * 0.3, 30);
    const usageBonus = Math.min(this.usageCount * 2, 20);
    
    this.confidence = Math.min(baseConfidence + feedbackBonus + usageBonus, 100);
  }
}