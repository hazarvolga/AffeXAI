import { Module } from '@nestjs/common';
import { AuthUtilsService } from './auth-utils.service';
import { CacheService } from './services/cache.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [AuthUtilsService, CacheService],
  exports: [AuthUtilsService, CacheService],
})
export class SharedModule {}