import { Injectable, Logger } from '@nestjs/common';
import {
  IAiProvider,
  AiGenerationOptions,
  AiGenerationResult,
} from '../interfaces/ai-provider.interface';

/**
 * OpenRouter Provider
 *
 * Provides unified access to 100+ AI models through OpenRouter API
 * https://openrouter.ai/
 */
@Injectable()
export class OpenRouterProvider implements IAiProvider {
  private readonly logger = new Logger(OpenRouterProvider.name);
  private readonly baseUrl = 'https://openrouter.ai/api/v1';

  readonly name = 'openrouter' as const;

  // Popular models available through OpenRouter
  readonly supportedModels = [
    // OpenAI models
    'openai/gpt-4-turbo',
    'openai/gpt-4',
    'openai/gpt-3.5-turbo',
    'openai/gpt-4o',
    // Anthropic models
    'anthropic/claude-3-opus',
    'anthropic/claude-3-sonnet',
    'anthropic/claude-3-haiku',
    'anthropic/claude-2',
    // Google models
    'google/gemini-pro',
    'google/gemini-pro-vision',
    'google/palm-2-chat-bison',
    // Meta models
    'meta-llama/llama-2-70b-chat',
    'meta-llama/llama-3-70b-instruct',
    // Mistral models
    'mistralai/mistral-7b-instruct',
    'mistralai/mixtral-8x7b-instruct',
    // Cohere models
    'cohere/command',
    'cohere/command-light',
    // Perplexity models
    'perplexity/pplx-70b-online',
    'perplexity/pplx-7b-chat',
    // Open source models
    'openrouter/auto',
  ];

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
      const messages: Array<{ role: string; content: string }> = [];

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

      this.logger.log(`Generating completion with OpenRouter model: ${model}`);

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://affexai.com', // Optional: your app URL
          'X-Title': 'Affexai', // Optional: your app name
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
          top_p: options.topP,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `OpenRouter API error (${response.status}): ${errorData.error?.message || response.statusText}`,
        );
      }

      const data = await response.json();

      const result: AiGenerationResult = {
        content: data.choices[0]?.message?.content || '',
        model: data.model || model,
        tokensUsed: data.usage?.total_tokens || 0,
        finishReason: data.choices[0]?.finish_reason || 'unknown',
        provider: this.name,
      };

      this.logger.log(
        `OpenRouter completion generated: ${result.tokensUsed} tokens used (model: ${result.model})`,
      );

      return result;
    } catch (error) {
      this.logger.error('OpenRouter API error:', error);

      if (error.message?.includes('401')) {
        throw new Error('Invalid OpenRouter API key');
      }

      if (error.message?.includes('429')) {
        throw new Error('OpenRouter API rate limit exceeded');
      }

      if (error.message?.includes('503') || error.message?.includes('500')) {
        throw new Error('OpenRouter service temporarily unavailable');
      }

      throw new Error(`OpenRouter generation failed: ${error.message}`);
    }
  }

  async testConnection(apiKey: string, model: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://affexai.com',
          'X-Title': 'Affexai',
        },
        body: JSON.stringify({
          model: model || 'openai/gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'test' }],
          max_tokens: 5,
        }),
      });

      return response.ok;
    } catch (error) {
      this.logger.warn(`OpenRouter API key test failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Estimate cost for OpenRouter tokens
   * Note: OpenRouter has dynamic pricing per model
   * This provides rough estimates based on average pricing
   */
  estimateCost(tokens: number, model: string): number {
    // Average pricing estimates (USD per 1M tokens)
    const avgPricesPer1M: Record<string, { input: number; output: number }> = {
      'openai/gpt-4': { input: 30, output: 60 },
      'openai/gpt-4-turbo': { input: 10, output: 30 },
      'openai/gpt-3.5-turbo': { input: 0.5, output: 1.5 },
      'anthropic/claude-3-opus': { input: 15, output: 75 },
      'anthropic/claude-3-sonnet': { input: 3, output: 15 },
      'anthropic/claude-3-haiku': { input: 0.25, output: 1.25 },
      'google/gemini-pro': { input: 0.5, output: 1.5 },
      'meta-llama/llama-3-70b-instruct': { input: 0.81, output: 0.81 },
      'mistralai/mixtral-8x7b-instruct': { input: 0.24, output: 0.24 },
    };

    const prices = avgPricesPer1M[model] || { input: 1, output: 2 };
    // Estimate: assume 50/50 split between input and output tokens
    return ((tokens / 1_000_000) * (prices.input + prices.output)) / 2;
  }
}
