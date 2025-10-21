import { MediaType, StorageType } from '@affexai/shared-types';
export declare class CreateMediaDto {
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
//# sourceMappingURL=create-media.dto.d.ts.map