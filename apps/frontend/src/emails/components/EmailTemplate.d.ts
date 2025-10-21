import * as React from "react";
export interface EmailTemplateProps {
    preview: string;
    children: React.ReactNode;
    companyName: string;
    logoUrl: string;
    contactInfo: {
        address: string;
        phone: string;
        email: string;
    };
    socialMediaLinks: {
        [key: string]: string;
    };
    showUnsubscribeLink?: boolean;
    unsubscribeToken?: string;
    showTagline?: boolean;
    tagline?: string;
    locale?: 'tr' | 'en';
}
export declare const EmailTemplate: ({ preview, children, companyName, logoUrl, contactInfo, socialMediaLinks, showUnsubscribeLink, unsubscribeToken, showTagline, tagline, locale, }: EmailTemplateProps) => React.JSX.Element;
export declare const main: {
    backgroundColor: string;
    fontFamily: string;
};
export declare const container: {
    backgroundColor: string;
    margin: string;
    padding: string;
    borderRadius: string;
    maxWidth: string;
    boxShadow: string;
};
export declare const content: {
    padding: string;
};
export declare const title: {
    color: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    margin: string;
};
export declare const paragraph: {
    color: string;
    fontSize: string;
    lineHeight: string;
    margin: string;
};
export declare const button: {
    backgroundColor: string;
    borderRadius: string;
    color: string;
    display: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    padding: string;
    textAlign: "center";
    textDecoration: string;
};
export declare const buttonContainer: {
    margin: string;
};
//# sourceMappingURL=EmailTemplate.d.ts.map