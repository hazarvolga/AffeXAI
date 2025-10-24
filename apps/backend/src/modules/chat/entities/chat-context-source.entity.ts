import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { ChatSession } from './chat-session.entity';
import { ChatMessage } from './chat-message.entity';

export enum ContextSourceType {
  KNOWLEDGE_BASE = 'knowledge_base',
  FAQ_LEARNING = 'faq_learning',
  DOCUMENT = 'document',
  URL = 'url'
}

@Entity('chat_context_sources')
@Index(['sessionId'])
@Index(['sourceType'])
@Index(['relevanceScore'])
export class ChatContextSource extends BaseEntity {
  @Column('uuid')
  @Index()
  sessionId: string;

  @Column('uuid', { nullable: true })
  messageId: string;

  @Column({
    type: 'enum',
    enum: ContextSourceType
  })
  sourceType: ContextSourceType;

  @Column({ length: 255, nullable: true })
  sourceId: string; // KB article ID, FAQ entry ID, document ID, URL

  @Column('text')
  content: string;

  @Column('float', { default: 0.0 })
  relevanceScore: number;

  @Column('jsonb', { default: {} })
  metadata: {
    title?: string;
    url?: string;
    author?: string;
    category?: string;
    tags?: string[];
    extractedAt?: Date;
    confidence?: number;
    matchedKeywords?: string[];
  };

  // Relations
  @ManyToOne(() => ChatSession, session => session, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sessionId' })
  session: ChatSession;

  @ManyToOne(() => ChatMessage, message => message.contextSources, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'messageId' })
  message: ChatMessage;

  // Computed properties
  get isHighRelevance(): boolean {
    return this.relevanceScore >= 0.8;
  }

  get isMediumRelevance(): boolean {
    return this.relevanceScore >= 0.5 && this.relevanceScore < 0.8;
  }

  get isLowRelevance(): boolean {
    return this.relevanceScore < 0.5;
  }

  get sourceDisplayName(): string {
    switch (this.sourceType) {
      case ContextSourceType.KNOWLEDGE_BASE:
        return 'Knowledge Base';
      case ContextSourceType.FAQ_LEARNING:
        return 'FAQ';
      case ContextSourceType.DOCUMENT:
        return 'Document';
      case ContextSourceType.URL:
        return 'Web Content';
      default:
        return 'Unknown';
    }
  }
}