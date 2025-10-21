export interface GenerateEmailSubjectDto {
    campaignName: string;
    product?: string;
    targetAudience?: string;
    tone?: string;
    keywords?: string[];
}
export interface GenerateEmailBodyDto {
    campaignName: string;
    product?: string;
    targetAudience?: string;
    tone?: string;
    keywords?: string[];
    subject?: string;
}
export interface GenerateEmailBothDto {
    campaignName: string;
    product?: string;
    targetAudience?: string;
    tone?: string;
    keywords?: string[];
}
export interface GeneratedEmailSubject {
    subject: string;
    alternatives: string[];
}
export interface GeneratedEmailBody {
    bodyHtml: string;
    bodyText: string;
}
export interface GeneratedEmailBoth {
    subject: string;
    subjectAlternatives: string[];
    bodyHtml: string;
    bodyText: string;
}
declare class AiService {
    /**
     * Generate email subject using AI
     */
    generateEmailSubject(data: GenerateEmailSubjectDto): Promise<GeneratedEmailSubject>;
    /**
     * Generate email body using AI
     */
    generateEmailBody(data: GenerateEmailBodyDto): Promise<GeneratedEmailBody>;
    /**
     * Generate both subject and body using AI
     */
    generateEmailBoth(data: GenerateEmailBothDto): Promise<GeneratedEmailBoth>;
}
export declare const aiService: AiService;
export default aiService;
//# sourceMappingURL=aiService.d.ts.map