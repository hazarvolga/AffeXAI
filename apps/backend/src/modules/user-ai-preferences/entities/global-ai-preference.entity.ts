import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { AiProvider } from './user-ai-preference.entity';

/**
 * Global AI Preference Entity
 *
 * Stores a user's global AI configuration that applies to all modules
 * unless overridden by module-specific preferences.
 */
@Entity('global_ai_preferences')
@Index(['userId'], { unique: true })
export class GlobalAiPreference extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'uuid',
    name: 'user_id',
    comment: 'User ID',
  })
  userId: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Global AI provider: openai, anthropic, google, openrouter',
  })
  provider: AiProvider;

  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Default AI model for global use',
  })
  model: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Encrypted global API key (AES-256-GCM)',
  })
  apiKey: string | null;

  @Column({
    type: 'boolean',
    default: true,
    comment: 'Whether global preference is enabled',
  })
  enabled: boolean;
}
