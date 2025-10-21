export declare class EmailValidationService {
    /**
     * Validates an email address using regex pattern
     * @param email The email address to validate
     * @returns 'valid' if the email is valid, 'invalid' otherwise
     */
    validateEmailFormat(email: string): 'valid' | 'invalid';
    /**
     * Performs a more comprehensive email validation
     * This is a simplified version - in a real application, you would integrate with a service like MailerCheck
     * @param email The email address to validate
     * @returns Validation result string
     */
    validateEmail(email: string): Promise<string>;
}
//# sourceMappingURL=email-validation.service.d.ts.map