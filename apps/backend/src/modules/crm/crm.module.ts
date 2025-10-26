import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmController } from './crm.controller';
import { CrmService } from './crm.service';
import { CrmCustomer } from './entities/crm-customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrmCustomer])],
  controllers: [CrmController],
  providers: [CrmService],
  exports: [CrmService], // Export for use in auth/signup
})
export class CrmModule {}
