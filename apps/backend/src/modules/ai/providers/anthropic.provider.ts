import { Injectable, Logger } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import {
  IAiProvider,
  AiGenerationOptions,
  AiGenerationResult,
} from '../interfaces/ai-provider.interface';

@Injectable()
export class AnthropicProvider implements IAiProvider {
  private readonly logger = new Logger(AnthropicProvider.name);
  private clients: Map<string, Anthropic> = new Map();

  readonly name = 'anthropic' as const;

  readonly supportedModels = [
    'claude-3-opus-20240229',
    'claude-3-sonnet-20240229',
    'claude-3-haiku-20240307',
    'claude-3-5-sonnet-20241022',
  ];

  /**
   * Get or create Anthropic client for specific API key
   */
  private getClient(apiKey: string): Anthropic {
    if (!this.clients.has(apiKey)) {
      this.clients.set(
        apiKey,
        new Anthropic({
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

      this.logger.log(`Generating completion with Anthropic model: ${model}`);

      const message = await client.messages.create({
        model,
        max_tokens: maxTokens,
        temperature,
        top_p: options.topP,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const result: AiGenerationResult = {
        content:
          message.content[0].type === 'text' ? message.content[0].text : '',
        model: message.model,
        tokensUsed: message.usage.input_tokens + message.usage.output_tokens,
        finishReason: message.stop_reason || 'end_turn',
        provider: this.name,
      };

      this.logger.log(
        `Anthropic completion generated: ${result.tokensUsed} tokens used (in: ${message.usage.input_tokens}, out: ${message.usage.output_tokens})`,
      );

      return result;
    } catch (error) {
      this.logger.error('Anthropic API error:', error);

      if (error.status === 401) {
        throw new Error('Invalid Anthropic API key');
      }

      if (error.status === 429) {
        throw new Error('Anthropic API rate limit exceeded');
      }

      if (error.status === 500 || error.status === 503) {
        throw new Error('Anthropic service temporarily unavailable');
      }

      throw new Error(`Anthropic generation failed: ${error.message}`);
    }
  }

  async testConnection(apiKey: string, model: string): Promise<boolean> {
    try {
      const client = this.getClient(apiKey);

      // Make minimal API call
      await client.messages.create({
        model,
        max_tokens: 10,
        messages: [
          {
            role: 'user',
            content: 'test',
          },
        ],
      });

      return true;
    } catch (error) {
      this.logger.warn(`Anthropic API key test failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Estimate cost for Anthropic tokens
   * Prices as of 2025 (USD per 1M tokens)
   */
  estimateCost(tokens: number, model: string): number {
    const pricesPer1M: Record<
      string,
      { input: number; output: number }
    > = {
      'claude-3-opus-20240229': { input: 15, output: 75 },
      'claude-3-sonnet-20240229': { input: 3, output: 15 },
      'claude-3-haiku-20240307': { input: 0.25, output: 1.25 },
      'claude-3-5-sonnet-20241022': { input: 3, output: 15 },
    };

    const prices =
      pricesPer1M[model] || pricesPer1M['claude-3-sonnet-20240229'];
    // Estimate: assume 50/50 split between input and output tokens
    return ((tokens / 1000000) * (prices.input + prices.output)) / 2;
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
