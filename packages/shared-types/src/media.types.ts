/**
 * Media management types
 * Based on backend Media entity
 */

import { BaseEntity } from './common.types';

/**
 * Media type enum
 */
export enum MediaType {
  IMAGE = 'image',
  DOCUMENT = 'document',
  VIDEO = 'video',
  AUDIO = 'audio',
}

/**
 * Storage type enum
 */
export enum StorageType {
  LOCAL = 'local',
  CLOUD = 'cloud',
}

/**
 * Media entity
 */
export interface Media extends BaseEntity {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl: string | null;
  type: MediaType;
  storageType: StorageType;
  altText: string | null;
  title: string | null;
  description: string | null;
  isActive: boolean;
}

/**
 * Create media DTO
 */
export interface CreateMediaDto {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  type?: MediaType;
  storageType?: StorageType;
  altText?: string;
  title?: string;
  description?: string;
  isActive?: boolean;
}

/**
 * Update media DTO
 */
export interface UpdateMediaDto {
  filename?: string;
  originalName?: string;
  mimeType?: string;
  size?: number;
  url?: string;
  thumbnailUrl?: string;
  type?: MediaType;
  storageType?: StorageType;
  altText?: string;
  title?: string;
  description?: string;
  isActive?: boolean;
}

/**
 * Media upload response
 */
export interface MediaUploadResponse {
  media: Media;
  uploadUrl?: string;
}

/**
 * Media query parameters
 */
export interface MediaQueryParams {
  type?: MediaType;
  storageType?: StorageType;
  isActive?: boolean;
  page?: number;
  limit?: number;
  search?: string;
}
