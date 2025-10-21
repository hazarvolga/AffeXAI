declare class CustomerDataDto {
    customerNumber?: string;
    companyName?: string;
    taxNumber?: string;
    companyPhone?: string;
    companyAddress?: string;
    companyCity?: string;
}
declare class StudentDataDto {
    schoolName?: string;
    studentId?: string;
}
declare class NewsletterPreferencesDto {
    email?: boolean;
    productUpdates?: boolean;
    eventUpdates?: boolean;
}
export declare class CompleteProfileDto {
    firstName?: string;
    lastName?: string;
    phone?: string;
    customerData?: CustomerDataDto;
    studentData?: StudentDataDto;
    newsletterPreferences?: NewsletterPreferencesDto;
    metadata?: Record<string, any>;
}
export {};
//# sourceMappingURL=complete-profile.dto.d.ts.map