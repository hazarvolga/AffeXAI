import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ChatSession } from './chat-session.entity';

export enum MessageType {
  USER = 'user',
  AGENT = 'agent',
  SYSTEM = 'system',
  BOT = 'bot'
}

export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed'
}

@Entity('chat_messages')
@Index(['sessionId', 'createdAt'])
@Index(['senderId'])
export class ChatMessage extends BaseEntity {
  @Column('uuid')
  @Index()
  sessionId: string;

  @Column('uuid', { nullable: true })
  senderId: string;

  @Column({
    type: 'enum',
    enum: MessageType,
    default: MessageType.USER
  })
  type: MessageType;

  @Column('text')
  content: string;

  @Column({
    type: 'enum',
    enum: MessageStatus,
    default: MessageStatus.SENT
  })
  status: MessageStatus;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date;

  @Column('jsonb', { nullable: true })
  metadata: {
    attachments?: Array<{
      type: string;
      url: string;
      name: string;
      size: number;
    }>;
    mentions?: string[];
    isEdited?: boolean;
    editedAt?: Date;
    replyTo?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
    confidence?: number;
  };

  @Column('boolean', { default: false })
  isHelpful: boolean;

  @Column('int', { nullable: true })
  helpfulnessScore: number; // 1-5

  // Relations
  @ManyToOne(() => ChatSession, session => session.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sessionId' })
  session: ChatSession;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  // Computed properties
  get isFromUser(): boolean {
    return this.type === MessageType.USER;
  }

  get isFromAgent(): boolean {
    return this.type === MessageType.AGENT;
  }

  get isFromBot(): boolean {
    return this.type === MessageType.BOT;
  }

  get hasAttachments(): boolean {
    return this.metadata?.attachments?.length > 0;
  }

  get wordCount(): number {
    return this.content.split(/\s+/).length;
  }
}