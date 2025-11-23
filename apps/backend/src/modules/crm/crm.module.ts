import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmController } from './crm.controller';
import { CrmService } from './crm.service';
import { CrmCustomer } from './entities/crm-customer.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CrmCustomer]),
    forwardRef(() => UsersModule), // Use forwardRef to avoid circular dependency
  ],
  controllers: [CrmController],
  providers: [CrmService],
  exports: [CrmService], // Export for use in auth/signup
})
export class CrmModule {}
