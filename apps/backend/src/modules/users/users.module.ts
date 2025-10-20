import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRolesService } from './user-roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { Role } from '../roles/entities/role.entity';
import { SharedModule } from '../../shared/shared.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole, Role]),
    SharedModule,
    forwardRef(() => RolesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRolesService],
  exports: [UsersService, UserRolesService, TypeOrmModule],
})
export class UsersModule {}