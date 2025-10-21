import { BaseEntity } from '../../../database/entities/base.entity';
import { MediaType, StorageType } from '@affexai/shared-types';
export declare class Media extends BaseEntity {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl: string;
    type: MediaType;
    storageType: StorageType;
    altText: string;
    title: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=media.entity.d.ts.map