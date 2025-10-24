import { ExtractedData } from './data-extraction.interface';
import { LearningPattern } from '../entities/learning-pattern.entity';

export interface FaqGenerationRequest {
  question: string;
  answer: string;
  context?: string;
  category?: string;
  keywords?: string[];
  sourceType: 'chat' | 'ticket';
  metadata?: any;
}

export interface FaqGenerationResult {
  question: string;
  answer: string;
  confidence: number;
  category: string;
  keywords: string[];
  metadata: {
    aiProvider: string;
    model: string;
    processingTime: number;
    tokensUsed: number;
    originalQuestion?: string;
    originalAnswer?: string;
    improvements?: string[];
  };
}

export interface FaqImprovementSuggestion {
  type: 'clarity' | 'completeness' | 'accuracy' | 'formatting';
  description: string;
  suggestedChange: string;
  confidence: number;
}

export interface PatternAnalysisRequest {
  patterns: LearningPattern[];
  extractedData: ExtractedData[];
  analysisType: 'similarity' | 'categorization' | 'quality' | 'deduplication';
}

export interface PatternAnalysisResult {
  analysisType: string;
  results: any;
  confidence: number;
  recommendations: string[];
  metadata: {
    aiProvider: string;
    model: string;
    processingTime: number;
    tokensUsed: number;
  };
}

export interface IFaqAiService {
  /**
   * Generate FAQ entry from extracted data using AI
   */
  generateFaqFromData(data: ExtractedData, provider?: string): Promise<FaqGenerationResult>;

  /**
   * Improve existing FAQ entry using AI
   */
  improveFaqEntry(
    question: string, 
    answer: string, 
    feedback?: string[], 
    provider?: string
  ): Promise<FaqGenerationResult>;

  /**
   * Analyze patterns using AI for better categorization
   */
  analyzePatterns(request: PatternAnalysisRequest, provider?: string): Promise<PatternAnalysisResult>;

  /**
   * Generate FAQ suggestions from conversation
   */
  generateFaqSuggestions(
    conversation: Array<{ role: 'user' | 'assistant'; content: string }>,
    provider?: string
  ): Promise<FaqGenerationResult[]>;

  /**
   * Validate FAQ quality using AI
   */
  validateFaqQuality(
    question: string, 
    answer: string, 
    provider?: string
  ): Promise<{
    score: number;
    issues: FaqImprovementSuggestion[];
    recommendations: string[];
  }>;

  /**
   * Categorize FAQ automatically using AI
   */
  categorizeFaq(
    question: string, 
    answer: string, 
    availableCategories: string[], 
    provider?: string
  ): Promise<{
    category: string;
    confidence: number;
    alternativeCategories: Array<{ category: string; confidence: number }>;
  }>;

  /**
   * Switch AI provider for FAQ generation
   */
  switchProvider(provider: 'openai' | 'anthropic' | 'google' | 'openrouter'): Promise<void>;

  /**
   * Get available AI providers and models
   */
  getAvailableProviders(): Promise<Array<{
    type: string;
    name: string;
    models: string[];
    isAvailable: boolean;
  }>>;

  /**
   * Test AI provider connection
   */
  testProviderConnection(provider: string, apiKey?: string): Promise<boolean>;
}