import { Module } from '@nestjs/common';
import { SystemLogsController, FrontendErrorsController } from './system-logs.controller';
import { LoggingModule } from '../../common/logging/logging.module';
import { AuthModule } from '../../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [LoggingModule, AuthModule, UsersModule],
  controllers: [SystemLogsController, FrontendErrorsController],
})
export class SystemLogsModule {}
