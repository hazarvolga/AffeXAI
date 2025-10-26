import { Module } from '@nestjs/common';
import { SystemLogsController, FrontendErrorsController } from './system-logs.controller';
import { LoggingModule } from '../../common/logging/logging.module';

@Module({
  imports: [LoggingModule],
  controllers: [SystemLogsController, FrontendErrorsController],
})
export class SystemLogsModule {}
