import { Injectable, Logger } from '@nestjs/common';
import { AiProvider, AiProviderConfig, FaqGenerationRequest, FaqGenerationResponse } from '../../interfaces/ai-provider.interface';

@Injectable()
export class OpenAiProvider implements AiProvider {
  public readonly name = 'openai';
  private readonly logger = new Logger(OpenAiProvider.name);
  private config: AiProviderConfig;

  constructor(config: AiProviderConfig) {
    this.config = config;
  }

  async isAvailable(): Promise<boolean> {
    try {
      return await this.testConnection();
    } catch (error) {
      this.logger.warn('OpenAI provider not available:', error.message);
      return false;
    }
  }

  async generateFaqAnswer(request: FaqGenerationRequest): Promise<FaqGenerationResponse> {
    const startTime = Date.now();
    
    try {
      const prompt = this.buildFaqPrompt(request);
      const response = await this.makeApiCall(prompt);
      
      const processingTime = Date.now() - startTime;
      
      // Parse the response to extract structured data
      const parsedResponse = this.parseAiResponse(response.content);
      
      return {
        answer: parsedResponse.answer,
        confidence: parsedResponse.confidence || 75,
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
      throw new Error(`OpenAI FAQ generation failed: ${error.message}`);
    }
  }

  async improveAnswer(originalAnswer: string, feedback: string): Promise<string> {
    const prompt = `
Improve the following FAQ answer based on the feedback provided:

Original Answer: ${originalAnswer}

Feedback: ${feedback}

Please provide an improved version that addresses the feedback while maintaining accuracy and helpfulness.

Improved Answer:`;

    try {
      const response = await this.makeApiCall(prompt);
      return response.content.trim();
    } catch (error) {
      this.logger.error('Failed to improve answer:', error);
      throw new Error(`Answer improvement failed: ${error.message}`);
    }
  }

  async categorizeQuestion(question: string, availableCategories: string[]): Promise<string> {
    const prompt = `
Categorize the following question into one of the available categories:

Question: ${question}

Available Categories: ${availableCategories.join(', ')}

Return only the category name that best fits the question. If none fit well, return "General".

Category:`;

    try {
      const response = await this.makeApiCall(prompt);
      const category = response.content.trim();
      
      // Validate that the returned category is in the available list
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
    const prompt = `
Extract the most important keywords from the following text. Return 3-8 keywords that best represent the main topics and concepts.

Text: ${text}

Return the keywords as a comma-separated list:

Keywords:`;

    try {
      const response = await this.makeApiCall(prompt);
      const keywordsText = response.content.trim();
      
      return keywordsText
        .split(',')
        .map(k => k.trim().toLowerCase())
        .filter(k => k.length > 2)
        .slice(0, 8);
    } catch (error) {
      this.logger.error('Failed to extract keywords:', error);
      return [];
    }
  }

  async generateRelatedQuestions(question: string, answer: string): Promise<string[]> {
    const prompt = `
Based on the following FAQ, generate 3-5 related questions that users might also ask:

Question: ${question}
Answer: ${answer}

Generate questions that are related but different from the original. Return them as a numbered list:

Related Questions:`;

    try {
      const response = await this.makeApiCall(prompt);
      const questionsText = response.content.trim();
      
      return questionsText
        .split('\n')
        .map(line => line.replace(/^\d+\.\s*/, '').trim())
        .filter(q => q.length > 10)
        .slice(0, 5);
    } catch (error) {
      this.logger.error('Failed to generate related questions:', error);
      return [];
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.makeApiCall('Test connection. Respond with "OK".');
      return response.content.toLowerCase().includes('ok');
    } catch (error) {
      this.logger.error('OpenAI connection test failed:', error);
      return false;
    }
  }

  private buildFaqPrompt(request: FaqGenerationRequest): string {
    let prompt = `
You are an expert FAQ assistant. Generate a comprehensive, helpful answer for the following question.

Question: ${request.question}`;

    if (request.context) {
      prompt += `\n\nContext: ${request.context}`;
    }

    if (request.category) {
      prompt += `\n\nCategory: ${request.category}`;
    }

    if (request.existingFaqs && request.existingFaqs.length > 0) {
      prompt += `\n\nExisting related FAQs for reference:\n`;
      request.existingFaqs.forEach((faq, index) => {
        prompt += `${index + 1}. Q: ${faq.question}\n   A: ${faq.answer}\n`;
      });
    }

    const tone = request.tone || 'professional';
    const language = request.language || 'English';

    prompt += `\n\nPlease provide a ${tone} answer in ${language}. The response should be:
- Clear and concise
- Helpful and actionable
- Accurate and informative
- Appropriate for the ${tone} tone

Also provide:
- A confidence score (1-100) for the answer quality
- 3-5 relevant keywords
- A suggested category if not provided
- 2-3 related questions users might ask

Format your response as JSON:
{
  "answer": "Your detailed answer here",
  "confidence": 85,
  "category": "suggested category",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "relatedQuestions": ["Related question 1?", "Related question 2?"]
}`;

    return prompt;
  }

  private async makeApiCall(prompt: string): Promise<any> {
    // This is a mock implementation - in real implementation, you would use the OpenAI SDK
    // For now, we'll simulate the API call
    
    const mockResponse = {
      content: JSON.stringify({
        answer: "This is a mock answer generated by the OpenAI provider. In a real implementation, this would be the actual AI-generated response.",
        confidence: 85,
        category: "General",
        keywords: ["mock", "answer", "openai"],
        relatedQuestions: ["What is a mock response?", "How does the OpenAI provider work?"]
      }),
      usage: {
        promptTokens: 150,
        completionTokens: 100,
        totalTokens: 250
      }
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockResponse;
  }

  private parseAiResponse(content: string): any {
    try {
      return JSON.parse(content);
    } catch (error) {
      // Fallback parsing if JSON is malformed
      return {
        answer: content,
        confidence: 70,
        keywords: [],
        relatedQuestions: []
      };
    }
  }
}