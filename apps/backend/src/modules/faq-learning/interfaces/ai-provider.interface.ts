export interface AiProviderConfig {
  provider: 'openai' | 'anthropic' | 'google' | 'openrouter';
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  timeout?: number;
  retryAttempts?: number;
}

export interface AiRequest {
  prompt: string;
  systemMessage?: string;
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface AiResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
  provider: string;
  processingTime: number;
  confidence?: number;
}

export interface FaqGenerationRequest {
  question: string;
  context?: string;
  category?: string;
  existingFaqs?: Array<{
    question: string;
    answer: string;
  }>;
  tone?: 'professional' | 'friendly' | 'technical';
  language?: string;
}

export interface FaqGenerationResponse {
  answer: string;
  confidence: number;
  category?: string;
  keywords: string[];
  relatedQuestions?: string[];
  metadata: {
    processingTime: number;
    model: string;
    provider: string;
    promptTokens?: number;
    completionTokens?: number;
  };
}

export interface AiProvider {
  name: string;
  isAvailable(): Promise<boolean>;
  generateFaqAnswer(request: FaqGenerationRequest): Promise<FaqGenerationResponse>;
  improveAnswer(originalAnswer: string, feedback: string): Promise<string>;
  categorizeQuestion(question: string, availableCategories: string[]): Promise<string>;
  extractKeywords(text: string): Promise<string[]>;
  generateRelatedQuestions(question: string, answer: string): Promise<string[]>;
  testConnection(): Promise<boolean>;
}