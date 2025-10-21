export declare enum EmailProvider {
    RESEND = "resend",
    SENDGRID = "sendgrid",
    POSTMARK = "postmark",
    MAILGUN = "mailgun",
    SES = "ses",
    SMTP = "smtp"
}
export declare class TransactionalEmailDto {
    domain: string;
    fromName: string;
    fromEmail: string;
    replyToEmail?: string;
}
export declare class MarketingEmailDto {
    domain: string;
    fromName: string;
    fromEmail: string;
    replyToEmail?: string;
}
export declare class TrackingSettingsDto {
    clickTracking?: boolean;
    openTracking?: boolean;
}
export declare class RateLimitDto {
    transactional: number;
    marketing: number;
}
export declare class ResendConfigDto {
    apiKey: string;
}
export declare class SendGridConfigDto {
    apiKey: string;
}
export declare class PostmarkConfigDto {
    apiKey: string;
}
export declare class MailgunConfigDto {
    apiKey: string;
    domain: string;
}
export declare class SESConfigDto {
    accessKey: string;
    secretKey: string;
    region: string;
}
export declare class SMTPConfigDto {
    host: string;
    port: number;
    user: string;
    password: string;
    secure: boolean;
}
export declare class EmailSettingsDto {
    provider: EmailProvider;
    transactional: TransactionalEmailDto;
    marketing: MarketingEmailDto;
    tracking?: TrackingSettingsDto;
    rateLimit?: RateLimitDto;
    resend?: ResendConfigDto;
    sendgrid?: SendGridConfigDto;
    postmark?: PostmarkConfigDto;
    mailgun?: MailgunConfigDto;
    ses?: SESConfigDto;
    smtp?: SMTPConfigDto;
}
/**
 * Masked version for client (API keys hidden)
 */
export declare class EmailSettingsMaskedDto {
    provider: EmailProvider;
    transactional: TransactionalEmailDto;
    marketing: MarketingEmailDto;
    tracking: TrackingSettingsDto;
    rateLimit: RateLimitDto;
    resend?: {
        apiKey: string;
    };
    sendgrid?: {
        apiKey: string;
    };
    postmark?: {
        apiKey: string;
    };
    mailgun?: {
        apiKey: string;
        domain: string;
    };
    ses?: {
        accessKey: string;
        secretKey: string;
        region: string;
    };
    smtp?: {
        host: string;
        port: number;
        user: string;
        password: string;
        secure: boolean;
    };
    /**
     * Mask sensitive fields
     */
    static mask(settings: EmailSettingsDto): EmailSettingsMaskedDto;
}
//# sourceMappingURL=email-settings.dto.d.ts.map