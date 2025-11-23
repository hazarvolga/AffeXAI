import { DataExtractor, ExtractedData, ExtractionCriteria } from '../interfaces/data-extraction.interface';
import { DataNormalizerService } from './data-normalizer.service';
/**
 * Chat Data Extractor Service
 * Extracts learning data from successful chat sessions
 * Currently simplified - will be enhanced when chat system is fully integrated
 */
export declare class ChatDataExtractorService implements DataExtractor {
    private dataNormalizer;
    private readonly logger;
    constructor(dataNormalizer: DataNormalizerService);
    /**
     * Extract learning data from successful chat sessions
     * Currently returns mock data - will be implemented when chat system is ready
     */
    extract(criteria: ExtractionCriteria): Promise<ExtractedData[]>;
    /**
     * Validate extracted data
     */
    validateData(data: ExtractedData): boolean;
    /**
     * Get extraction statistics
     */
    getExtractionStats(): Promise<{
        totalSessions: number;
        successfulSessions: number;
        extractableSessions: number;
        lastExtraction: Date | null;
    }>;
}
//# sourceMappingURL=chat-data-extractor.service.d.ts.map