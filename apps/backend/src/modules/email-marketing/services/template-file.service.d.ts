export declare class TemplateFileService {
    private readonly templatesPath;
    constructor();
    getAllTemplateFiles(): Promise<{
        id: string;
        name: string;
        fileName: string;
    }[]>;
    getTemplateFileContent(filename: string): Promise<string>;
    private formatTemplateName;
}
//# sourceMappingURL=template-file.service.d.ts.map