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

// Controllers
import { DocumentUploadController } from './controllers/document-upload.controller';

// Gateways
import { ChatGateway } from './gateways/chat.gateway';

// External entities
import { User } from '../users/entities/user.entity';

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
    ChatGateway,
  ],
  exports: [
    ChatSessionService,
    ChatMessageService,
    DocumentProcessorService,
    FileValidatorService,
    ChatGateway,
  ],
})
export class ChatModule {}