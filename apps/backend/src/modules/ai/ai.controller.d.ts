import { AiEmailService } from './ai-email.service';
export declare class GenerateSubjectDto {
    campaignName?: string;
    targetAudience?: string;
    productName?: string;
    productDescription?: string;
    callToAction?: string;
    tone?: 'professional' | 'casual' | 'enthusiastic' | 'urgent' | 'friendly';
    keywords?: string[];
    count?: number;
}
export declare class GenerateBodyDto {
    subject: string;
    campaignName?: string;
    targetAudience?: string;
    productName?: string;
    productDescription?: string;
    callToAction?: string;
    tone?: 'professional' | 'casual' | 'enthusiastic' | 'urgent' | 'friendly';
}
export declare class AiController {
    private readonly aiEmailService;
    constructor(aiEmailService: AiEmailService);
    /**
     * Generate email subject lines using AI
     * POST /api/ai/email/generate-subject
     */
    generateSubject(dto: GenerateSubjectDto): Promise<{
        success: boolean;
        data: {
            subjects: string[];
            count: number;
        };
    }>;
    /**
     * Generate email body content using AI
     * POST /api/ai/email/generate-body
     */
    generateBody(dto: GenerateBodyDto): Promise<{
        success: boolean;
        data: {
            htmlBody: string;
            plainTextBody: string;
            tokensUsed: number;
        };
    }>;
    /**
     * Generate both subject and body in one request
     * POST /api/ai/email/generate-complete
     */
    generateComplete(dto: GenerateSubjectDto): Promise<{
        success: boolean;
        data: {
            subjects: string[];
            selectedSubject: string;
            htmlBody: string;
            plainTextBody: string;
            tokensUsed: number;
        };
    }>;
}
//# sourceMappingURL=ai.controller.d.ts.map