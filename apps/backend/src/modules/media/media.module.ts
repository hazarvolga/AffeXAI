import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { S3Service } from './s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { MulterModule } from '@nestjs/platform-express';
import { PlatformIntegrationModule } from '../platform-integration/platform-integration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
    MulterModule.register({
      dest: './uploads',
    }),
    PlatformIntegrationModule,
  ],
  providers: [MediaService, S3Service],
  controllers: [MediaController],
  exports: [S3Service, MediaService],
})
export class MediaModule {}