import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';

export enum AiProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE = 'google',
}

export enum AiModule {
  EMAIL = 'email',
  SOCIAL = 'social',
  SUPPORT_AGENT = 'support_agent',      // Internal support agent for admin panel
  SUPPORT_CHATBOT = 'support_chatbot',  // Public website chatbot
  ANALYTICS = 'analytics',
  FAQ_AUTO_RESPONSE = 'faq_auto_response', // Automatic FAQ generation from tickets
}

@Entity('user_ai_preferences')
@Index('idx_user_module_unique', ['userId', 'module'], { unique: true })
@Index('idx_user_ai_preferences_user_id', ['userId'])
export class UserAiPreference extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'AI module: email, social, support_agent, support_chatbot, analytics, faq_auto_response',
  })
  module: AiModule;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'AI provider: openai, anthropic, google',
  })
  provider: AiProvider;

  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Specific model: gpt-4, claude-3-sonnet, gemini-pro',
  })
  model: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Encrypted API key (user-specific, optional)',
  })
  apiKey: string | null;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;
}
