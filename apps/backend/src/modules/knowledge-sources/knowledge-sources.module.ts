import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { CompanyKnowledgeSource } from './entities/company-knowledge-source.entity';

// External entities (dependencies)
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyKnowledgeSource,
      User,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class KnowledgeSourcesModule {}
