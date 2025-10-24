import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { ChatMessage } from './chat-message.entity';

export enum ChatSessionStatus {
  ACTIVE = 'active',
  ENDED = 'ended',
  TRANSFERRED = 'transferred'
}

@Entity('chat_sessions')
export class ChatSession extends BaseEntity {
  @Column({ length: 255, nullable: true })
  sessionId: string;

  @Column('uuid', { nullable: true })
  userId: string;

  @Column('uuid', { nullable: true })
  agentId: string;

  @Column({
    type: 'enum',
    enum: ChatSessionStatus,
    default: ChatSessionStatus.ACTIVE
  })
  status: ChatSessionStatus;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  endedAt: Date;

  @Column('int', { nullable: true })
  duration: number; // in seconds

  @Column('int', { nullable: true, default: null })
  satisfactionScore: number; // 1-5

  @Column('text', { nullable: true })
  feedback: string;

  @Column('jsonb', { nullable: true })
  metadata: {
    userAgent?: string;
    ipAddress?: string;
    referrer?: string;
    tags?: string[];
  };

  // Relations
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'agentId' })
  agent: User;

  @OneToMany(() => ChatMessage, message => message.session)
  messages: ChatMessage[];

  // Computed properties
  get messageCount(): number {
    return this.messages?.length || 0;
  }

  get isResolved(): boolean {
    return this.status === ChatSessionStatus.ENDED && this.satisfactionScore >= 4;
  }

  get hasPositiveFeedback(): boolean {
    return this.satisfactionScore >= 4;
  }
}