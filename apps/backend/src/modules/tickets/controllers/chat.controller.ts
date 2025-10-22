import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ChatAiService, ChatRequest } from '../services/chat-ai.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { IsString, IsOptional, IsBoolean, IsNumber, Min, Max } from 'class-validator';

export class SendMessageDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  sessionId?: string;

  @IsOptional()
  context?: {
    currentPage?: string;
    userAgent?: string;
  };
}

export class ProvideFeedbackDto {
  @IsString()
  messageId: string;

  @IsBoolean()
  isHelpful: boolean;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class EndSessionDto {
  @IsString()
  sessionId: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  satisfactionRating?: number;

  @IsOptional()
  @IsString()
  satisfactionComment?: string;
}

/**
 * Chat Controller
 * Handles AI chat interactions
 */
@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatAiService: ChatAiService) {}

  /**
   * Send message to AI chat
   */
  @Post('message')
  @ApiOperation({ summary: 'Send message to AI chat' })
  @ApiResponse({ status: 200, description: 'Message processed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid message data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async sendMessage(
    @Body() dto: SendMessageDto,
    @CurrentUser('id') userId: string,
  ) {
    console.error('🤖 Chat API called:', { userId, message: dto.message, sessionId: dto.sessionId });
    
    if (!dto.message || dto.message.trim().length === 0) {
      throw new BadRequestException('Message cannot be empty');
    }

    if (dto.message.length > 1000) {
      throw new BadRequestException('Message too long (max 1000 characters)');
    }

    try {
      const request: ChatRequest = {
        message: dto.message.trim(),
        sessionId: dto.sessionId,
        context: dto.context,
      };

      const response = await this.chatAiService.processMessage(userId, request);

      return {
        success: true,
        data: response,
        aiAvailable: true,
      };
    } catch (error) {
      return {
        success: false,
        aiAvailable: false,
        message: 'AI chat şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.',
        error: error.message,
      };
    }
  }

  /**
   * Provide feedback on AI response
   */
  @Post('feedback')
  @ApiOperation({ summary: 'Provide feedback on AI response' })
  @ApiResponse({ status: 200, description: 'Feedback recorded successfully' })
  async provideFeedback(@Body() dto: ProvideFeedbackDto) {
    await this.chatAiService.provideFeedback(
      dto.messageId,
      dto.isHelpful,
      dto.comment,
    );

    return {
      success: true,
      message: 'Geri bildiriminiz kaydedildi. Teşekkürler!',
    };
  }

  /**
   * End chat session
   */
  @Post('session/end')
  @ApiOperation({ summary: 'End chat session' })
  @ApiResponse({ status: 200, description: 'Session ended successfully' })
  async endSession(
    @Body() dto: EndSessionDto,
    @CurrentUser('id') userId: string,
  ) {
    await this.chatAiService.endSession(dto.sessionId, userId);

    return {
      success: true,
      message: 'Chat oturumu sonlandırıldı.',
    };
  }

  /**
   * Get chat status
   */
  @Get('status')
  @ApiOperation({ summary: 'Get chat availability status' })
  @ApiResponse({ status: 200, description: 'Chat status retrieved' })
  async getChatStatus(@CurrentUser('id') userId: string) {
    // Check if user has AI preferences configured
    try {
      // Simple availability check - could be enhanced with more sophisticated logic
      return {
        available: true,
        reason: 'AI chat is available',
        estimatedWaitTime: 0,
        features: {
          knowledgeBase: true,
          faqSearch: true,
          documentSearch: false, // Will be enabled in Faz 2
          humanHandoff: false,
        },
      };
    } catch (error) {
      return {
        available: false,
        reason: 'AI chat is temporarily unavailable',
        estimatedWaitTime: null,
      };
    }
  }

  /**
   * Get suggested questions
   */
  @Post('suggestions')
  @ApiOperation({ summary: 'Get suggested questions' })
  @ApiResponse({ status: 200, description: 'Suggestions retrieved' })
  async getSuggestedQuestions(
    @Body() context?: { currentPage?: string; category?: string },
  ) {
    // Return contextual suggestions based on current page
    const suggestions = this.getContextualSuggestions(context?.currentPage);

    return {
      success: true,
      suggestions,
    };
  }

  /**
   * Get contextual suggestions based on current page
   */
  private getContextualSuggestions(currentPage?: string): string[] {
    const baseSuggestions = [
      'Nasıl destek talebi oluşturabilirim?',
      'Hesap ayarlarımı nasıl değiştirebilirim?',
      'Şifremi unuttum, ne yapmalıyım?',
    ];

    if (!currentPage) return baseSuggestions;

    // Page-specific suggestions
    if (currentPage.includes('/support')) {
      return [
        'Mevcut destek taleplerimi nasıl görebilirim?',
        'Destek talebimin durumu nedir?',
        'Destek ekibi ne zaman yanıt verir?',
        ...baseSuggestions,
      ];
    }

    if (currentPage.includes('/profile')) {
      return [
        'Profil bilgilerimi nasıl güncellerim?',
        'E-posta adresimi nasıl değiştirebilirim?',
        'Hesabımı nasıl silebilirim?',
        ...baseSuggestions,
      ];
    }

    if (currentPage.includes('/kb')) {
      return [
        'Aradığım bilgiyi bulamıyorum',
        'Bilgi bankasında nasıl arama yaparım?',
        'Hangi konularda yardım alabilir?',
        ...baseSuggestions,
      ];
    }

    return baseSuggestions;
  }
}