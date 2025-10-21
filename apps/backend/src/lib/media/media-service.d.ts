import { Media, MediaType, CreateMediaDto, UpdateMediaDto } from './types';
export declare class MediaService {
    private request;
    getAllMedia(type?: MediaType): Promise<Media[]>;
    getMediaById(id: string): Promise<Media>;
    createMedia(data: CreateMediaDto): Promise<Media>;
    updateMedia(id: string, data: UpdateMediaDto): Promise<Media>;
    deleteMedia(id: string): Promise<void>;
    uploadFile(file: File): Promise<Media>;
}
export declare const mediaService: MediaService;
//# sourceMappingURL=media-service.d.ts.map