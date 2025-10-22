import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';

export enum ContentType {
  PDF = 'pdf',
  WORD = 'word',
  EXCEL = 'excel',
  TEXT = 'text',
  URL = 'url',
  MARKDOWN = 'markdown',
}

export enum ContentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
  FAILED = 'failed',
  ARCHIVED = 'archived',
}

/**
 * Chat Content Entity
 * Stores documents and URLs for AI chat context
 */
@Entity('chat_contents')
@Index('idx_chat_content_type', ['contentType'])
@Index('idx_chat_content_status', ['status'])
@Index('idx_chat_content_active', ['isActive'])
export class ChatContent extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ 
    type: 'enum', 
    enum: ContentType,
    name: 'content_type'
  })
  contentType: ContentType;

  @Column({ 
    type: 'enum', 
    enum: ContentStatus,
    default: ContentStatus.PENDING
  })
  status: ContentStatus;

  @Column({ type: 'text', nullable: true, name: 'source_url' })
  sourceUrl: string; // Original URL or file path

  @Column({ type: 'text', nullable: true, name: 'file_path' })
  filePath: string; // Stored file path

  @Column({ type: 'bigint', nullable: true, name: 'file_size' })
  fileSize: number; // File size in bytes

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'mime_type' })
  mimeType: string;

  @Column({ type: 'text', nullable: true, name: 'extracted_text' })
  extractedText: string; // Processed text content

  @Column({ type: 'text', array: true, default: '{}' })
  keywords: string[]; // Extracted keywords for search

  @Column({ type: 'text', nullable: true })
  summary: string; // AI-generated summary

  @Column({ type: 'int', default: 0, name: 'usage_count' })
  usageCount: number; // How many times referenced in chat

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_public' })
  isPublic: boolean; // Available for all users or specific roles

  @Column({ type: 'text', array: true, default: '{}', name: 'allowed_roles' })
  allowedRoles: string[]; // Roles that can access this content

  @Column({ type: 'uuid', name: 'uploaded_by_user_id' })
  uploadedByUserId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uploaded_by_user_id' })
  uploadedByUser: User;

  @Column({ type: 'timestamp', nullable: true, name: 'processed_at' })
  processedAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'last_accessed_at' })
  lastAccessedAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    pageCount?: number;
    language?: string;
    encoding?: string;
    processingTime?: number; // seconds
    errorMessage?: string;
    extractionMethod?: string; // 'ocr', 'text', 'api'
    confidence?: number; // extraction confidence 1-100
    chunks?: Array<{
      id: string;
      text: string;
      page?: number;
      position?: { x: number; y: number; width: number; height: number };
    }>;
  };

  /**
   * Check if content is accessible by user role
   */
  isAccessibleByRole(userRole: string): boolean {
    if (this.isPublic) return true;
    return this.allowedRoles.includes(userRole) || this.allowedRoles.includes('*');
  }

  /**
   * Update last accessed timestamp
   */
  markAccessed(): void {
    this.lastAccessedAt = new Date();
    this.usageCount++;
  }

  /**
   * Get content preview (first 200 chars)
   */
  get preview(): string {
    if (!this.extractedText) return '';
    return this.extractedText.length > 200 
      ? this.extractedText.substring(0, 200) + '...'
      : this.extractedText;
  }
}