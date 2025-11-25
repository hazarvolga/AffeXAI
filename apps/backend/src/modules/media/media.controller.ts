import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  Query,
  Inject,
} from '@nestjs/common';
import { MediaService, MediaQueryOptions } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
import { MediaType, StorageType, MediaModule, MediaCategory } from '@affexai/shared-types';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import type { Multer } from 'multer';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createMediaDto: CreateMediaDto): Promise<Media> {
    return this.mediaService.create(createMediaDto);
  }

  @Get()
  findAll(
    @Query('type') type?: string,
    @Query('module') module?: MediaModule,
    @Query('category') category?: MediaCategory,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<Media[] | { data: Media[]; total: number }> {
    // If any advanced filter is provided, use the filtered query
    if (module || category || search || page || limit) {
      return this.mediaService.findWithFilters({
        type: type as MediaType,
        module,
        category,
        search,
        page: page ? parseInt(page, 10) : 1,
        limit: limit ? parseInt(limit, 10) : 50,
      });
    }

    // Legacy support: just type filter
    if (type) {
      return this.mediaService.findByType(type);
    }
    return this.mediaService.findAll();
  }

  @Get('modules')
  getModulesWithCount() {
    return this.mediaService.getModulesWithCount();
  }

  @Get('categories')
  getCategoriesWithCount() {
    return this.mediaService.getCategoriesWithCount();
  }

  @Get('by-module/:module')
  findByModule(@Param('module') module: MediaModule): Promise<Media[]> {
    return this.mediaService.findByModule(module);
  }

  @Get('by-category/:category')
  findByCategory(@Param('category') category: MediaCategory): Promise<Media[]> {
    return this.mediaService.findByCategory(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Media> {
    return this.mediaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ): Promise<Media> {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.mediaService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Use absolute path to ensure files are saved in correct location
          const uploadPath = join(process.cwd(), 'uploads');
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          // Generate SEO-friendly filename: original-name-uuid.ext
          const uniqueSuffix = uuidv4().split('-')[0]; // Use first part of UUID (8 chars)
          const ext = extname(file.originalname);
          const basename = file.originalname.replace(ext, '');
          
          // Slugify: lowercase, replace spaces/special chars with dash, remove turkish chars
          const slug = basename
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
          
          const filename = `${slug}-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
          return cb(
            new Error('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: any,
    @Query('module') module?: MediaModule,
    @Query('category') category?: MediaCategory,
    @Query('tags') tags?: string,
  ) {
    if (!file) {
      throw new NotFoundException('File not found');
    }

    // Store relative URL - full URL will be constructed on frontend
    const createMediaDto: CreateMediaDto = {
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`,
      type: MediaType.IMAGE, // Default to image for now
      storageType: StorageType.LOCAL,
      module: module || MediaModule.GENERAL,
      category: category || MediaCategory.OTHER,
      tags: tags ? tags.split(',').map((t) => t.trim()) : undefined,
      isActive: true,
    };

    return this.mediaService.create(createMediaDto);
  }
}