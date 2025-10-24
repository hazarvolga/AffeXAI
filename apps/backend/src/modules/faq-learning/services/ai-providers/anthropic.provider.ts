import { Injectable, Logger } from '@nestjs/common';
import { AiProvider, AiProviderConfig, FaqGenerationRequest, FaqGenerationResponse } from '../../interfaces/ai-provider.interface';

@Injectable()
export class AnthropicProvider implements AiProvider {
  public readonly name = 'anthropic';
  private readonly logger = new Logger(AnthropicProvider.name);
  private config: AiProviderConfig;

  constructor(config: AiProviderConfig) {
    this.config = config;
  }

  async isAvailable(): Promise<boolean> {
    try {
      return await this.testConnection();
    } catch (error) {
      this.logger.warn('Anthropic provider not available:', error.message);
      return false;
    }
  }

  async generateFaqAnswer(request: FaqGenerationRequest): Promise<FaqGenerationResponse> {
    const startTime = Date.now();
    
    try {
      const prompt = this.buildFaqPrompt(request);
      const response = await this.makeApiCall(prompt);
      
      const processingTime = Date.now() - startTime;
      const parsedResponse = this.parseAiResponse(response.content);
      
      return {
        answer: parsedResponse.answer,
        confidence: parsedResponse.confidence || 80,
        category: parsedResponse.category || request.category,
        keywords: parsedResponse.keywords || [],
        relatedQuestions: parsedResponse.relatedQuestions || [],
        metadata: {
          processingTime,
          model: this.config.model,
          provider: this.name,
          promptTokens: response.usage?.promptTokens,
          completionTokens: response.usage?.completionTokens
        }
      };
    } catch (error) {
      this.logger.error('Failed to generate FAQ answer:', error);
      throw new Error(`Anthropic FAQ generation failed: ${error.message}`);
    }
  }

  async improveAnswer(originalAnswer: string, feedback: string): Promise<string> {
    const prompt = `Human: Improve this FAQ answer based on feedback:
Original: ${originalAnswer}
Feedback: ${feedback}
Assistant: Here is the improved answer:`;
    try {
      const response = await this.makeApiCall(prompt);
      return response.content.trim();
    } catch (error) {
      this.logger.error('Failed to improve answer:', error);
      throw new Error(`Answer improvement failed: ${error.message}`);
    }
  }

  async categorizeQuestion(question: string, availableCategories: string[]): Promise<string> {
    const prompt = `Human: Categorize this question: "${question}"
Available categories: ${availableCategories.join(', ')}
Return only the category name. If none fit, return "General".
Assistant:`;
    try {
      const response = await this.makeApiCall(prompt);
      const category = response.content.trim();
      if (availableCategories.includes(category)) {
        return category;
      }
      return 'General';
    } catch (error) {
      this.logger.error('Failed to categorize question:', error);
      return 'General';
    }
  }

  async extractKeywords(text: string): Promise<string[]> {
    const prompt = `Human: Extract 3-8 keywords from: "${text}"
Return as comma-separated list.
Assistant:`;
    try {
      const response = await this.makeApiCall(prompt);
      const keywordsText = response.content.trim();
      return keywordsText.split(',').map(k => k.trim().toLowerCase()).filter(k => k.length > 2).slice(0, 8);
    } catch (error) {
      this.logger.error('Failed to extract keywords:', error);
      return [];
    }
  }

  async generateRelatedQuestions(question: string, answer: string): Promise<string[]> {
    const prompt = `Human: Generate 3-5 related questions for:
Q: ${question}
A: ${answer}
Return as numbered list.
Assistant:`;
    try {
      const response = await this.makeApiCall(prompt);
      const questionsText = response.content.trim();
      return questionsText.split('\n').map(line => line.replace(/^\d+\.\s*/, '').trim()).filter(q => q.length > 10).slice(0, 5);
    } catch (error) {
      this.logger.error('Failed to generate related questions:', error);
      return [];
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.makeApiCall('Human: Test. Respond with OK. Assistant:');
      return response.content.toLowerCase().includes('ok');
    } catch (error) {
      this.logger.error('Anthropic connection test failed:', error);
      return false;
    }
  }

  private buildFaqPrompt(request: FaqGenerationRequest): string {
    let prompt = `Human: You are an expert FAQ assistant. Generate a comprehensive answer for:

Question: ${request.question}`;
    if (request.context) {
      prompt += `\nContext: ${request.context}`;
    }
    if (request.category) {
      prompt += `\nCategory: ${request.category}`;
    }
    if (request.existingFaqs && request.existingFaqs.length > 0) {
      prompt += `\nExisting FAQs:\n`;
      request.existingFaqs.forEach((faq, index) => {
        prompt += `${index + 1}. Q: ${faq.question}\n   A: ${faq.answer}\n`;
      });
    }
    const tone = request.tone || 'professional';
    const language = request.language || 'English';
    prompt += `\nProvide a ${tone} answer in ${language}. Format as JSON:
{"answer":"...","confidence":85,"category":"...","keywords":["..."],"relatedQuestions":["..."]}
Assistant:`;
    return prompt;
  }

  private async makeApiCall(prompt: string): Promise<any> {
    const mockResponse = {
      content: JSON.stringify({
        answer: "This is a mock answer from Anthropic provider.",
        confidence: 80,
        category: "General",
        keywords: ["mock", "answer", "anthropic"],
        relatedQuestions: ["What is Anthropic?", "How does Claude work?"]
      }),
      usage: {
        promptTokens: 150,
        completionTokens: 100,
        totalTokens: 250
      }
    };
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockResponse;
  }

  private parseAiResponse(content: string): any {
    try {
      return JSON.parse(content);
    } catch (error) {
      return {
        answer: content,
        confidence: 70,
        keywords: [],
        relatedQuestions: []
      };
    }
  }
}
