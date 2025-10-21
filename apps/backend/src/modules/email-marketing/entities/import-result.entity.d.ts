import { BaseEntity } from '../../../database/entities/base.entity';
import { ImportJob } from './import-job.entity';
export declare enum ImportResultStatus {
    VALID = "valid",
    INVALID = "invalid",
    RISKY = "risky",
    DUPLICATE = "duplicate"
}
export interface ValidationDetails {
    syntaxValid: boolean;
    domainExists: boolean;
    mxRecordExists: boolean;
    isDisposable: boolean;
    isRoleAccount: boolean;
    hasTypos: boolean;
    ipReputation: 'good' | 'poor' | 'unknown';
    confidenceScore: number;
    validationProvider: string;
    validatedAt: Date;
}
export declare class ImportResult extends BaseEntity {
    importJob: ImportJob;
    importJobId: string;
    email: string;
    status: ImportResultStatus;
    confidenceScore: number;
    validationDetails: ValidationDetails;
    issues: string[];
    suggestions: string[];
    imported: boolean;
    error: string;
    originalData: Record<string, any>;
    rowNumber: number;
    subscriberId: string;
}
//# sourceMappingURL=import-result.entity.d.ts.map