import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
import { ConfigService } from '@nestjs/config';
export declare class MediaController {
    private readonly mediaService;
    private readonly configService;
    constructor(mediaService: MediaService, configService: ConfigService);
    create(createMediaDto: CreateMediaDto): Promise<Media>;
    findAll(type?: string): Promise<Media[]>;
    findOne(id: string): Promise<Media>;
    update(id: string, updateMediaDto: UpdateMediaDto): Promise<Media>;
    remove(id: string): Promise<void>;
    uploadFile(file: any): Promise<Media>;
}
//# sourceMappingURL=media.controller.d.ts.map