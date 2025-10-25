import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { CompanyKnowledgeSource } from './entities/company-knowledge-source.entity';

// External entities (dependencies)
import { User } from '../users/entities/user.entity';

// Services
import { KnowledgeSourcesService } from './services/knowledge-sources.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyKnowledgeSource,
      User,
    ]),
  ],
  controllers: [],
  providers: [
    KnowledgeSourcesService,
  ],
  exports: [
    KnowledgeSourcesService,
  ],
})
export class KnowledgeSourcesModule {}
