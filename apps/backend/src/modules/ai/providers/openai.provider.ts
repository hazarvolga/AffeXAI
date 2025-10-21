import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import {
  IAiProvider,
  AiGenerationOptions,
  AiGenerationResult,
} from '../interfaces/ai-provider.interface';

@Injectable()
export class OpenAIProvider implements IAiProvider {
  private readonly logger = new Logger(OpenAIProvider.name);
  private clients: Map<string, OpenAI> = new Map();

  readonly name = 'openai' as const;

  readonly supportedModels = [
    'gpt-4',
    'gpt-4-turbo',
    'gpt-4o',
    'gpt-3.5-turbo',
  ];

  /**
   * Get or create OpenAI client for specific API key
   */
  private getClient(apiKey: string): OpenAI {
    if (!this.clients.has(apiKey)) {
      this.clients.set(
        apiKey,
        new OpenAI({
          apiKey,
        }),
      );
    }
    return this.clients.get(apiKey)!;
  }

  async generateCompletion(
    apiKey: string,
    prompt: string,
    options: AiGenerationOptions,
  ): Promise<AiGenerationResult> {
    const {
      model,
      temperature = 0.7,
      maxTokens = 1000,
      systemPrompt,
    } = options;

    try {
      const client = this.getClient(apiKey);

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

      this.logger.log(`Generating completion with OpenAI model: ${model}`);

      const completion = await client.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        top_p: options.topP,
      });

      const result: AiGenerationResult = {
        content: completion.choices[0].message.content || '',
        model: completion.model,
        tokensUsed: completion.usage?.total_tokens || 0,
        finishReason: completion.choices[0].finish_reason,
        provider: this.name,
      };

      this.logger.log(
        `OpenAI completion generated: ${result.tokensUsed} tokens used`,
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

      throw new Error(`OpenAI generation failed: ${error.message}`);
    }
  }

  async testConnection(apiKey: string, model: string): Promise<boolean> {
    try {
      const client = this.getClient(apiKey);

      // Make minimal API call
      await client.chat.completions.create({
        model,
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 5,
      });

      return true;
    } catch (error) {
      this.logger.warn(`OpenAI API key test failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Estimate cost for OpenAI tokens
   * Prices as of 2025 (USD per 1K tokens)
   */
  estimateCost(tokens: number, model: string): number {
    const pricesPer1K: Record<string, { input: number; output: number }> = {
      'gpt-4': { input: 0.03, output: 0.06 },
      'gpt-4-turbo': { input: 0.01, output: 0.03 },
      'gpt-4o': { input: 0.005, output: 0.015 },
      'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
    };

    const prices = pricesPer1K[model] || pricesPer1K['gpt-4-turbo'];
    // Estimate: assume 50/50 split between input and output tokens
    return ((tokens / 1000) * (prices.input + prices.output)) / 2;
  }

  /**
   * Clear cached client for specific API key
   */
  clearCache(apiKey?: string): void {
    if (apiKey) {
      this.clients.delete(apiKey);
    } else {
      this.clients.clear();
    }
  }
}
