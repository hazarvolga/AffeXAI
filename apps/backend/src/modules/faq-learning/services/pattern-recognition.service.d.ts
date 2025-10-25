import { Repository } from 'typeorm';
import { LearningPattern } from '../entities/learning-pattern.entity';
import { IPatternRecognitionService, PatternMatch, QuestionGroup, PatternAnalysisResult } from '../interfaces/pattern-recognition.interface';
import { ExtractedData } from '../interfaces/data-extraction.interface';
export declare class PatternRecognitionService implements IPatternRecognitionService {
    private patternRepository;
    private readonly logger;
    constructor(patternRepository: Repository<LearningPattern>);
    /**
     * Identify patterns from extracted data
     */
    identifyPatterns(data: ExtractedData[]): Promise<PatternMatch[]>;
    /**
     * Analyze extracted data to identify patterns
     */
    analyzePatterns(data: ExtractedData[]): Promise<PatternAnalysisResult>;
    /**
     * Extract questions from text
     */
    extractQuestions(text: string): Promise<string[]>;
    /**
     * Extract answers from text with context
     */
    extractAnswers(text: string, context: string): Promise<string[]>;
    /**
     * Extract keywords from text using advanced NLP techniques
     */
    extractKeywords(text: string): Promise<string[]>;
    /**
     * Find similar patterns in database
     */
    findSimilarPatterns(pattern: string, threshold?: number): Promise<PatternMatch[]>;
    /**
     * Group similar questions together
     */
    groupSimilarQuestions(questions: string[]): Promise<QuestionGroup[]>;
    /**
     * Calculate pattern confidence based on various factors
     */
    calculatePatternConfidence(pattern: LearningPattern): Promise<number>;
    /**
     * Calculate similarity score between two texts
     */
    calculateSimilarityScore(text1: string, text2: string): Promise<number>;
    /**
     * Identify question-answer pairs from conversation
     */
    identifyQuestionAnswerPairs(messages: Array<{
        content: string;
        type: 'user' | 'bot' | 'agent';
        timestamp: Date;
    }>): Promise<Array<{
        question: string;
        answer: string;
        confidence: number;
    }>>;
    private analyzeQuestionPatterns;
    private analyzeAnswerPatterns;
    private findDuplicates;
    private calculateStatistics;
    private splitIntoSentences;
    private isQuestion;
    private isAnswer;
    private normalizeText;
    private generateHash;
    private getStopWords;
    private extractNGrams;
    private calculateTermScore;
    private selectRepresentativeQuestion;
    private findCommonKeywords;
    private inferCategory;
    private calculateJaccardSimilarity;
    private calculateCosineSimilarity;
    private calculateLevenshteinSimilarity;
    private levenshteinDistance;
    private calculatePairConfidence;
    /**
     * Calculate similarity between two texts (required by interface)
     */
    calculateSimilarity(text1: string, text2: string): number;
}
//# sourceMappingURL=pattern-recognition.service.d.ts.map