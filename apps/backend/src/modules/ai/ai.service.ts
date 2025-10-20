import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { AiModel } from '../settings/dto/ai-settings.dto';

export interface AiGenerationOptions {
  model?: AiModel;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface AiGenerationResult {
  content: string;
  model: string;
  tokensUsed: number;
  finishReason: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openaiClients: Map<string, OpenAI> = new Map();

  /**
   * Get or create OpenAI client for specific API key
   * Caches clients to avoid recreation
   */
  private getOpenAiClient(apiKey: string): OpenAI {
    if (!this.openaiClients.has(apiKey)) {
      this.openaiClients.set(
        apiKey,
        new OpenAI({
          apiKey,
        }),
      );
    }
    return this.openaiClients.get(apiKey)!; // ! operator - we just set it above
  }

  /**
   * Generate text completion using OpenAI
   * 
   * @param apiKey - OpenAI API key
   * @param prompt - User prompt
   * @param options - Generation options
   * @returns Generated content with metadata
   */
  async generateCompletion(
    apiKey: string,
    prompt: string,
    options: AiGenerationOptions = {},
  ): Promise<AiGenerationResult> {
    const {
      model = AiModel.GPT_4_TURBO,
      temperature = 0.7,
      maxTokens = 1000,
      systemPrompt,
    } = options;

    try {
      const client = this.getOpenAiClient(apiKey);

      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];
      
      if (systemPrompt) {
        messages.push({
          role: 'system',
          content: systemPrompt,
        });
      }

      messages.push({
        role: 'user',
        content: prompt,
      });

      this.logger.log(`Generating completion with model: ${model}`);

      const completion = await client.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      });

      const result: AiGenerationResult = {
        content: completion.choices[0].message.content || '',
        model: completion.model,
        tokensUsed: completion.usage?.total_tokens || 0,
        finishReason: completion.choices[0].finish_reason,
      };

      this.logger.log(
        `Completion generated: ${result.tokensUsed} tokens used`,
      );

      return result;
    } catch (error) {
      this.logger.error('OpenAI API error:', error);
      
      if (error.status === 401) {
        throw new Error('Invalid OpenAI API key');
      }
      
      if (error.status === 429) {
        throw new Error('OpenAI API rate limit exceeded');
      }
      
      if (error.status === 500 || error.status === 503) {
        throw new Error('OpenAI service temporarily unavailable');
      }

      throw new Error(`AI generation failed: ${error.message}`);
    }
  }

  /**
   * Test OpenAI API key validity
   * Makes a minimal API call to verify the key works
   */
  async testApiKey(apiKey: string, model: AiModel = AiModel.GPT_4_TURBO): Promise<boolean> {
    try {
      const client = this.getOpenAiClient(apiKey);
      
      // Make minimal API call
      await client.chat.completions.create({
        model,
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 5,
      });

      return true;
    } catch (error) {
      this.logger.warn(`API key test failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Clear cached OpenAI client for specific API key
   * Useful when API key is updated
   */
  clearClientCache(apiKey?: string): void {
    if (apiKey) {
      this.openaiClients.delete(apiKey);
    } else {
      this.openaiClients.clear();
    }
  }
}
