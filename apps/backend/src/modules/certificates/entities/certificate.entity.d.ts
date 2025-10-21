import { User } from '../../users/entities/user.entity';
export declare enum CertificateStatus {
    DRAFT = "draft",
    ISSUED = "issued",
    SENT = "sent",
    REVOKED = "revoked"
}
export declare class Certificate {
    id: string;
    recipientName: string | null;
    recipientEmail: string | null;
    trainingTitle: string | null;
    description: string | null;
    templateId: string | null;
    logoUrl: string | null;
    logoMediaId: string | null;
    signatureUrl: string | null;
    imageUrl: string | null;
    pdfUrl: string | null;
    status: CertificateStatus;
    issuedAt: Date;
    validUntil: Date | null;
    sentAt: Date | null;
    name: string | null;
    issueDate: Date | null;
    expiryDate: Date | null;
    fileUrl: string | null;
    userId: string | null;
    user: User;
    eventId: string | null;
    createdAt: Date;
    updatedAt: Date;
    get certificateNumber(): string;
    get verificationUrl(): string;
}
//# sourceMappingURL=certificate.entity.d.ts.map