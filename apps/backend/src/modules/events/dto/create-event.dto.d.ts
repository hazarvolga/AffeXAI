export declare class CertificateConfigDto {
    enabled: boolean;
    templateId?: string | null;
    logoMediaId?: string | null;
    description?: string | null;
    validityDays?: number | null;
    autoGenerate?: boolean;
}
export declare class CreateEventDto {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    capacity: number;
    price: number;
    metadata?: Record<string, any>;
    certificateConfig?: CertificateConfigDto | null;
    grantsCertificate?: boolean;
    certificateTitle?: string | null;
    status?: string;
}
//# sourceMappingURL=create-event.dto.d.ts.map