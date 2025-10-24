import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// Entities
import { ChatSession } from './entities/chat-session.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { ChatDocument } from './entities/chat-document.entity';
import { ChatContextSource } from './entities/chat-context-source.entity';
import { ChatSupportAssignment } from './entities/chat-support-assignment.entity';
import { ChatUrlCache } from './entities/chat-url-cache.entity';

// Services
import { ChatSessionService } from './services/chat-session.service';
import { ChatMessageService } from './services/chat-message.service';
import { DocumentProcessorService } from './services/document-processor.service';
import { FileValidatorService } from './services/file-validator.service';
import { ChatContextEngineService } from './services/chat-context-engine.service';

// Controllers
import { DocumentUploadController } from './controllers/document-upload.controller';

// Gateways
import { ChatGateway } from './gateways/chat.gateway';

// External entities
import { User } from '../users/entities/user.entity';
import { KnowledgeBaseArticle } from '../tickets/entities/knowledge-base-article.entity';
import { LearnedFaqEntry } from '../faq-learning/entities/learned-faq-entry.entity';
import { LearningPattern } from '../faq-learning/entities/learning-pattern.entity';

// External services
import { FaqEnhancedSearchService } from '../faq-learning/services/faq-enhanced-search.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Chat entities
      ChatSession,
      ChatMessage,
      ChatDocument,
      ChatContextSource,
      ChatSupportAssignment,
      ChatUrlCache,
      // External entities
      User,
      KnowledgeBaseArticle,
      LearnedFaqEntry,
      LearningPattern,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [
    DocumentUploadController,
  ],
  providers: [
    ChatSessionService,
    ChatMessageService,
    DocumentProcessorService,
    FileValidatorService,
    ChatContextEngineService,
    FaqEnhancedSearchService,
    ChatGateway,
  ],
  exports: [
    ChatSessionService,
    ChatMessageService,
    DocumentProcessorService,
    FileValidatorService,
    ChatContextEngineService,
    ChatGateway,
  ],
})
export class ChatModule {}