import { ExtractedData } from '../interfaces/data-extraction.interface';
export declare class DataNormalizerService {
    /**
     * Normalize extracted data to standard format
     */
    normalize(data: ExtractedData[]): Promise<ExtractedData[]>;
    /**
     * Clean and preprocess text content
     */
    cleanText(text: string): string;
    /**
     * Extract keywords from text using simple NLP techniques
     */
    extractKeywords(text: string): string[];
    /**
     * Calculate confidence score based on various factors
     */
    calculateConfidence(data: ExtractedData): number;
    /**
     * Detect and filter out sensitive information
     */
    private filterSensitiveInfo;
    /**
     * Validate data quality
     */
    validateDataQuality(data: ExtractedData): boolean;
}
//# sourceMappingURL=data-normalizer.service.d.ts.map