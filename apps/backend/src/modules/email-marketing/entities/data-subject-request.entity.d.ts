import { BaseEntity } from '../../../database/entities/base.entity';
import { DataSubjectRequestType, RequestStatus } from '../services/gdpr-compliance.service';
export declare class DataSubjectRequest extends BaseEntity {
    email: string;
    requestType: DataSubjectRequestType;
    requestDate: Date;
    status: RequestStatus;
    completionDate: Date;
    verificationMethod: string;
    requestDetails: Record<string, any>;
    responseData: any;
    notes: string;
    verificationToken: string;
    verificationExpiry: Date;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=data-subject-request.entity.d.ts.map