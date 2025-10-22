import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ChatMessage } from './chat-message.entity';

export enum ChatSessionStatus {
  ACTIVE = 'active',
  ENDED = 'ended',
  ARCHIVED = 'archived',
}

/**
 * Chat Session Entity
 * Represents a conversation session between user and AI
 */
@Entity('chat_sessions')
@Index('idx_chat_session_user', ['userId'])
@Index('idx_chat_session_status', ['status'])
@Index('idx_chat_session_created', ['createdAt'])
export class ChatSession extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ChatMessage, message => message.session, { cascade: true })
  messages: ChatMessage[];

  @Column({ 
    type: 'enum', 
    enum: ChatSessionStatus,
    default: ChatSessionStatus.ACTIVE
  })
  status: ChatSessionStatus;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'start_page' })
  startPage: string; // Page where chat was initiated

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'user_agent' })
  userAgent: string;

  @Column({ type: 'int', default: 0, name: 'message_count' })
  messageCount: number;

  @Column({ type: 'timestamp', nullable: true, name: 'ended_at' })
  endedAt: Date;

  @Column({ type: 'int', nullable: true, name: 'duration_seconds' })
  durationSeconds: number; // Session duration in seconds

  @Column({ type: 'int', nullable: true, name: 'satisfaction_rating' })
  satisfactionRating: number; // 1-5 rating

  @Column({ type: 'text', nullable: true, name: 'satisfaction_comment' })
  satisfactionComment: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    avgResponseTime?: number; // Average AI response time in ms
    totalTokensUsed?: number;
    resolvedIssues?: number;
    escalatedToHuman?: boolean;
    tags?: string[];
    deviceInfo?: {
      platform?: string;
      browser?: string;
      screenSize?: string;
    };
    conversationSummary?: string;
  };

  /**
   * End the chat session
   */
  endSession(): void {
    this.status = ChatSessionStatus.ENDED;
    this.endedAt = new Date();
    
    if (this.createdAt) {
      this.durationSeconds = Math.floor(
        (this.endedAt.getTime() - this.createdAt.getTime()) / 1000
      );
    }
  }

  /**
   * Check if session is active
   */
  get isActive(): boolean {
    return this.status === ChatSessionStatus.ACTIVE;
  }

  /**
   * Get session duration in minutes
   */
  get durationMinutes(): number {
    return this.durationSeconds ? Math.floor(this.durationSeconds / 60) : 0;
  }

  /**
   * Update message count
   */
  incrementMessageCount(): void {
    this.messageCount++;
  }
}