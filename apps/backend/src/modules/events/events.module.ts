import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventRegistration } from './entities/event-registration.entity';
import { SharedModule } from '../../shared/shared.module';
import { CertificatesModule } from '../certificates/certificates.module';
import { PlatformIntegrationModule } from '../platform-integration/platform-integration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventRegistration]),
    SharedModule,
    CertificatesModule, // Import to use BulkCertificateService
    PlatformIntegrationModule, // Import to use EventBusService
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService, TypeOrmModule],
})
export class EventsModule {}