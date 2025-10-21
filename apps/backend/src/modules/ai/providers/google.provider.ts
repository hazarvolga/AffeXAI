import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  IAiProvider,
  AiGenerationOptions,
  AiGenerationResult,
} from '../interfaces/ai-provider.interface';

@Injectable()
export class GoogleProvider implements IAiProvider {
  private readonly logger = new Logger(GoogleProvider.name);
  private clients: Map<string, GoogleGenerativeAI> = new Map();

  readonly name = 'google' as const;

  readonly supportedModels = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-2.0-flash-exp',
  ];

  /**
   * Get or create Google Generative AI client for specific API key
   */
  private getClient(apiKey: string): GoogleGenerativeAI {
    if (!this.clients.has(apiKey)) {
      this.clients.set(apiKey, new GoogleGenerativeAI(apiKey));
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
      const generativeModel = client.getGenerativeModel({
        model,
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
          topP: options.topP,
        },
      });

      this.logger.log(`Generating completion with Google model: ${model}`);

      // Build the prompt with system instructions if provided
      let fullPrompt = prompt;
      if (systemPrompt) {
        fullPrompt = `${systemPrompt}\n\n${prompt}`;
      }

      const result = await generativeModel.generateContent(fullPrompt);
      const response = result.response;
      const text = response.text();

      // Get usage metadata if available
      const usageMetadata = response.usageMetadata;
      const tokensUsed = usageMetadata
        ? (usageMetadata.promptTokenCount || 0) + (usageMetadata.candidatesTokenCount || 0)
        : 0;

      const aiResult: AiGenerationResult = {
        content: text,
        model: model,
        tokensUsed,
        finishReason: response.candidates?.[0]?.finishReason || 'STOP',
        provider: this.name,
      };

      this.logger.log(
        `Google completion generated: ${aiResult.tokensUsed} tokens used`,
      );

      return aiResult;
    } catch (error) {
      this.logger.error('Google AI API error:', error);

      if (error.message?.includes('API key')) {
        throw new Error('Invalid Google AI API key');
      }

      if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
        throw new Error('Google AI API rate limit exceeded');
      }

      if (error.status === 500 || error.status === 503) {
        throw new Error('Google AI service temporarily unavailable');
      }

      throw new Error(`Google AI generation failed: ${error.message}`);
    }
  }

  async testConnection(apiKey: string, model: string): Promise<boolean> {
    try {
      const client = this.getClient(apiKey);
      const generativeModel = client.getGenerativeModel({
        model,
        generationConfig: {
          maxOutputTokens: 10,
        },
      });

      // Make minimal API call
      await generativeModel.generateContent('test');

      return true;
    } catch (error) {
      this.logger.warn(`Google AI API key test failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Estimate cost for Google AI tokens
   * Prices as of 2025 (USD per 1M tokens)
   */
  estimateCost(tokens: number, model: string): number {
    const pricesPer1M: Record<string, { input: number; output: number }> = {
      'gemini-pro': { input: 0.5, output: 1.5 },
      'gemini-1.5-pro': { input: 3.5, output: 10.5 },
      'gemini-1.5-flash': { input: 0.35, output: 1.05 },
      'gemini-2.0-flash-exp': { input: 0.0, output: 0.0 }, // Free tier
    };

    const prices = pricesPer1M[model] || pricesPer1M['gemini-pro'];
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
