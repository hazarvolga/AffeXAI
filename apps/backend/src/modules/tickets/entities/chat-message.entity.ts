import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ChatSession } from './chat-session.entity';

export enum MessageType {
  USER = 'user',
  BOT = 'bot',
  SYSTEM = 'system',
}

export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

/**
 * Chat Message Entity
 * Individual messages within a chat session
 */
@Entity('chat_messages')
@Index('idx_chat_message_session', ['sessionId'])
@Index('idx_chat_message_type', ['messageType'])
@Index('idx_chat_message_created', ['createdAt'])
export class ChatMessage extends BaseEntity {
  @Column({ type: 'uuid', name: 'session_id' })
  sessionId: string;

  @ManyToOne(() => ChatSession, session => session.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session: ChatSession;

  @Column({ type: 'uuid', nullable: true, name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ 
    type: 'enum', 
    enum: MessageType,
    name: 'message_type'
  })
  messageType: MessageType;

  @Column({ type: 'text' })
  content: string;

  @Column({ 
    type: 'enum', 
    enum: MessageStatus,
    default: MessageStatus.SENT
  })
  status: MessageStatus;

  @Column({ type: 'int', nullable: true, name: 'response_time_ms' })
  responseTimeMs: number; // Time taken to generate response (for bot messages)

  @Column({ type: 'int', nullable: true, name: 'tokens_used' })
  tokensUsed: number; // AI tokens consumed

  @Column({ type: 'int', nullable: true, name: 'confidence_score' })
  confidenceScore: number; // AI confidence 1-100

  @Column({ type: 'boolean', default: false, name: 'is_helpful' })
  isHelpful: boolean; // User feedback

  @Column({ type: 'boolean', default: false, name: 'is_not_helpful' })
  isNotHelpful: boolean; // User feedback

  @Column({ type: 'text', nullable: true, name: 'feedback_comment' })
  feedbackComment: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    sources?: Array<{
      type: 'kb' | 'faq' | 'document' | 'url';
      id: string;
      title: string;
      excerpt?: string;
      relevanceScore?: number;
    }>;
    suggestedActions?: string[];
    relatedTickets?: Array<{
      id: string;
      subject: string;
      status: string;
    }>;
    aiModel?: string;
    aiProvider?: string;
    processingSteps?: Array<{
      step: string;
      duration: number;
      success: boolean;
    }>;
    userContext?: {
      currentPage?: string;
      previousQuestions?: string[];
      sessionHistory?: string[];
    };
  };

  /**
   * Mark message as helpful
   */
  markHelpful(comment?: string): void {
    this.isHelpful = true;
    this.isNotHelpful = false;
    if (comment) {
      this.feedbackComment = comment;
    }
  }

  /**
   * Mark message as not helpful
   */
  markNotHelpful(comment?: string): void {
    this.isHelpful = false;
    this.isNotHelpful = true;
    if (comment) {
      this.feedbackComment = comment;
    }
  }

  /**
   * Check if message is from bot
   */
  get isBot(): boolean {
    return this.messageType === MessageType.BOT;
  }

  /**
   * Check if message is from user
   */
  get isUser(): boolean {
    return this.messageType === MessageType.USER;
  }

  /**
   * Get helpfulness ratio (for analytics)
   */
  get helpfulnessRatio(): number {
    if (!this.isHelpful && !this.isNotHelpful) return 0;
    return this.isHelpful ? 100 : 0;
  }
}