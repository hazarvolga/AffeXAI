import { DataExtractor, ExtractedData, ExtractionCriteria } from '../interfaces/data-extraction.interface';
import { DataNormalizerService } from './data-normalizer.service';
/**
 * Ticket Data Extractor Service
 * Extracts learning data from resolved tickets
 * Currently simplified - will be enhanced when ticket system is fully integrated
 */
export declare class TicketDataExtractorService implements DataExtractor {
    private dataNormalizer;
    private readonly logger;
    constructor(dataNormalizer: DataNormalizerService);
    /**
     * Extract learning data from resolved tickets
     * Currently returns mock data - will be implemented when ticket system is ready
     */
    extract(criteria: ExtractionCriteria): Promise<ExtractedData[]>;
    /**
     * Validate extracted data
     */
    validateData(data: ExtractedData): boolean;
    /**
     * Extract data from specific ticket IDs
     */
    extractFromIds(ticketIds: string[], criteria: ExtractionCriteria): Promise<ExtractedData[]>;
    /**
     * Get extraction statistics
     */
    getExtractionStats(): Promise<{
        totalTickets: number;
        resolvedTickets: number;
        extractableTickets: number;
        lastExtraction: Date | null;
    }>;
}
//# sourceMappingURL=ticket-data-extractor.service.d.ts.map